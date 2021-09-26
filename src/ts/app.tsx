import msgpack from "@ygoe/msgpack";

import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Row, Col, Container, Button, InputGroup, SplitButton, ToggleButton, FormText, FormControl, Spinner } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import CanvasDraw from 'react-canvas-draw';
import { Firebase, Auth } from './main';
import { getAuth } from 'firebase/auth';

interface PromptMsg {
  prompts: string[];
  cutn?: number;
  cut_pow?: number;
  mse_weight?: number;
  mse_decay?: number;
  mse_decay_every?: number;
  step_size?: number;
  noise_fac?: number;
  clip_name?: string;
  vqgan_name?: string;
  start_img?: Uint8Array;
  width?: number;
  height?: number;
}

const API_ENDPOINT = "wss://api.doodlebot.ai/api/run";

const PromptApp: React.FC<{}> = () => {

  const [running, setRunning] = useState<boolean>(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [image_src, setSrc] = useState<string>("");
  const [brush, setBrush] = useState<{size: number, color: string}>({size: 10, color: "#000000"});


  useEffect(() => {
    return () => {
      if(ws){
        ws?.close();
        setWs(null);
        setRunning(false);
      }
    }
  }, [ws]);

  let pref: PromptForm | undefined;
  let cnv: any | undefined;

  const user = Auth.currentUser;

  if(user == null){
    console.error("Must be logged in");
    console.log(Auth);
    //window.location.replace('/login');
  }

  return <Container>
    <Row className="justify-content-center">
      <Col lg="8">
        <div className="header-hero-content text-center">

        </div>
        <Row>
          <Col lg="6">
            <div className="subscribe-content mt-45">
              <h2 className="subscribe-title">We recommend plain English<span>With many keywords</span></h2>
            </div>
          </Col>
          <Col lg="6">
            <PromptForm ref={r => {pref = (r == null ? undefined : r)}} running={running} onSubmit={(evt: ParamState) => {
              user?.getIdToken().then((token) => {
                let api = new URL(API_ENDPOINT);
                api.searchParams.set("token", token);
                let ws = new WebSocket(api);

                ws.onmessage = msg => {
                  let data_bytes = msg.data as Blob;
                  let png_bytes = data_bytes.slice(0,data_bytes.size, "image/png");
                  let src = URL.createObjectURL(png_bytes);
                  if (image_src.length > 0) {
                    URL.revokeObjectURL(image_src);
                  }
                  setSrc(src);
                }
            
                ws.onerror = err => {
                  console.error("Websocket errored: ", err);
                  ws?.close();
                  setWs(null);
                  setRunning(false);
                }

                setWs(ws);
                setRunning(true);

                if(cnv?.canvas.drawing){
                  let cv : HTMLCanvasElement = cnv?.canvas.drawing as HTMLCanvasElement;
                  cv.toBlob(blob => {
                    if(blob == null){
                      console.error("Error converting input image to raw blob data");
                      return;
                    }
                    blob.arrayBuffer().then(buf => {
                      
                      const msg: PromptMsg = {
                        width: evt.width,
                        height: evt.height,
                        prompts: evt.prompts.filter((e) => e.enabled).map((a) => a.value),
                        cutn: evt.cutn,
                        cut_pow: evt.cut_pow,
                        mse_weight: evt.mse_weight,
                        mse_decay: evt.mse_decay,
                        mse_decay_every: evt.mse_decay_every,
                        step_size: evt.step_size,
                        noise_fac: evt.noise_fac,
                        clip_name: evt.clip_name,
                        vqgan_name: evt.vqgan_name,
                        start_img: new Uint8Array(buf),
                      };
                      ws.onopen = evt => {
                        const bin = msgpack.serialize(msg);
                        ws?.send(bin);
                      };
                    });
                  }, "image/png");
                  return;
                }
                const msg: PromptMsg = {
                  width: evt.width,
                  height: evt.height,
                  prompts: evt.prompts.filter((e) => e.enabled).map((a) => a.value),
                  cutn: evt.cutn,
                  cut_pow: evt.cut_pow,
                  mse_weight: evt.mse_weight,
                  mse_decay: evt.mse_decay,
                  mse_decay_every: evt.mse_decay_every,
                  step_size: evt.step_size,
                  noise_fac: evt.noise_fac,
                  clip_name: evt.clip_name,
                  vqgan_name: evt.vqgan_name
                };
                ws.onopen = evt => {
                  const bin = msgpack.serialize(msg);
                  ws?.send(bin);
                };
              }).catch(err => {
                console.error(err);
              }).finally(() => {
                ws?.close();
                setRunning(false);
                setWs(null);
              })
            }} />
          </Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <div>
      <Form.Control type="color" defaultValue="#000000" onChange={e => setBrush({...brush, color: e.target.value})}/>
      <Form.Control type="number" defaultValue={10} onChange={e => {
        let n = Number.parseInt(e.target.value);
        if(n) setBrush({...brush, size: n})
        }}/>
      </div>
      <CanvasDraw ref={r => {
        cnv = (r == null ? undefined : r)
      }} canvasWidth={pref?.state.width || 1000} canvasHeight={pref?.state.height || 1000} brushRadius={brush.size} brushColor={brush.color}>
      </CanvasDraw>
    </Row>
    <Row className="justify-content-center">
      <div hidden={ws == null && image_src.length == 0}>
        <Button disabled={!(ws?.readyState == WebSocket.OPEN)} size="lg" onClick={() => {
          if(ws?.readyState == WebSocket.OPEN){
            ws?.close();
            setWs(null);
            setRunning(false);
          }
        }}>{ws?.readyState == WebSocket.OPEN ? "Stop" : <span><Spinner animation="border" role="status"/> ...Loading</span> }</Button>
        <img hidden={image_src.length == 0} src={image_src}></img>
      </div>
    </Row>
  </Container>;
}

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

interface PromptTextProps {
  key: number
  showCheckbox: boolean;
  showButton: boolean;
  isAdd: boolean;
  state: PromptTextState;
  disabled: boolean;
  onCheckChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFormChange?: (event: React.ChangeEvent<FormControlElement>) => void;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface PromptTextState {
  enabled: boolean;
  value: string;
}

class PromptText extends Component<PromptTextProps, {}> {

  _onCheck(evt: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.onCheckChange)
      this.props.onCheckChange(evt);
  }

  _onForm(evt: React.ChangeEvent<FormControlElement>) {
    if (this.props.onFormChange)
      this.props.onFormChange(evt);
  }

  _onButton(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (this.props.onButtonClick)
      this.props.onButtonClick(evt);
  }

  render() {
    return <InputGroup>
      {this.props.showCheckbox &&
        <InputGroup.Checkbox disabled={this.props.disabled} hidden={!this.props.showCheckbox} checked={this.props.state.enabled} onChange={this._onCheck.bind(this)} />
      }
      <FormControl placeholder="A new prompt" disabled={this.props.disabled} onChange={this._onForm.bind(this)} value={this.props.state.value} />
      <Button variant="secondary" disabled={this.props.disabled} hidden={!this.props.showButton} onClick={this._onButton.bind(this)}>
        <FontAwesomeIcon icon={this.props.isAdd ? faPlus : faMinus} />
      </Button>
    </InputGroup>
  }
}

interface ParamState {
  prompts: PromptTextState[];
  cutn?: number;
  cut_pow?: number;
  mse_weight?: number;
  mse_decay?: number;
  mse_decay_every?: number;
  step_size?: number;
  noise_fac?: number;
  clip_name?: string;
  vqgan_name: string;
  width: number;
  height: number;
}

interface PromptFormProps {
  running: boolean;
  onSubmit: (state: ParamState) => void;
}

class PromptForm extends Component<PromptFormProps, ParamState> {
  state: ParamState = {
    prompts: [
      { enabled: false, value: "" }
    ],
    vqgan_name: "vqgan_imagenet_f16_16384",
    cutn: 32,
    mse_weight: 0.1,
    step_size: 0.25,
    width: 512,
    height: 512,
  }

  togglePrompt(index: number, changed: React.ChangeEvent<HTMLInputElement>) {
    const prompts = this.state.prompts;
    const prompt = prompts[index];
    if (prompt) {
      prompt.enabled = !prompt.enabled;
      changed.target.checked = prompt.enabled;
    }
    this.setState({ ...this.state, prompts: prompts });
  }

  updatePrompt(index: number, event: React.ChangeEvent<FormControlElement>) {
    const prompts = this.state.prompts;
    const prompt = prompts[index];
    if (prompt) {
      let input = event.target.value;
      if (input.length == 0) {
        prompt.enabled = false;
      } else if (!prompt.enabled && prompt.value.length == 0 && input.length > 0) {
        prompt.enabled = true;
      }
      prompt.value = input;
    }
    this.setState({ ...this.state, prompts: prompts });
  }
  addsubPrompt(index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const prompts = this.state.prompts;
    const prompt = prompts[index];
    if (!prompt) return;
    if (index === prompts.length - 1) {
      prompts.push({ enabled: false, value: "" });
    } else {
      prompts.splice(index, 1);
    }
    this.setState({ ...this.state, prompts: prompts });
  }


  render() {

    return <Form>
      {this.state.prompts.map((st, idx) =>
        <PromptText key={idx}
          showCheckbox={true}
          showButton={true}
          isAdd={idx === this.state.prompts.length - 1}
          state={st}
          disabled={this.props.running}
          onCheckChange={this.togglePrompt.bind(this, idx)}
          onFormChange={this.updatePrompt.bind(this, idx)}
          onButtonClick={this.addsubPrompt.bind(this, idx)}
        />
      )}
      <Form.Group >
        <Form.Label>CUT NUMBER</Form.Label>
        <Form.Control type="number" defaultValue={32}
          disabled={this.props.running}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => { evt.preventDefault(); this.setState({ ...this.state, cutn: Number.parseInt(evt.target.value) }) }} />
      </Form.Group>
      <Form.Group>
        <Form.Label>MSE WEIGHT</Form.Label>
        <Form.Control type="number" defaultValue={0.1}
          disabled={this.props.running}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => { evt.preventDefault(); this.setState({ ...this.state, mse_weight: Number.parseFloat(evt.target.value) }) }} />
      </Form.Group>
      <Form.Group>
        <Form.Label>STEP SIZE</Form.Label>
        <Form.Control type="number" defaultValue={0.25}
          disabled={this.props.running}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => { evt.preventDefault(); this.setState({ ...this.state, step_size: Number.parseFloat(evt.target.value) }) }} />
      </Form.Group>
      <Form.Group>
        <Form.Label>RESOLUTION</Form.Label>
        <InputGroup>
          <Form.Control type="number"
            value={this.state.width}
            disabled={this.props.running}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              evt.preventDefault();
              this.setState({ ...this.state, width: Number.parseInt(evt.target.value) });
            }} />
          <InputGroup.Text>x</InputGroup.Text>
          <Form.Control type="number"
            value={this.state.height}
            disabled={this.props.running}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              evt.preventDefault();
              this.setState({ ...this.state, height: Number.parseInt(evt.target.value) });
            }} />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label>VQGAN Mode</Form.Label>
        <Form.Control as="select" custom defaultValue="vqgan_imagenet_f16_16384" onChange={evt => {
          this.setState({...this.state, vqgan_name: evt.target.value})
        }}>
          <option value="vqgan_imagenet_f16_16384">Imagenet</option>
          <option value="vqgan_wikiart_f16_16384">WikiArt</option>
          <option value="vqgan_gumbel_f8_8192">Gumbel</option>
        </Form.Control>
      </Form.Group>
      <Form.Control type="button" className="main-btn" value="Submit"
        hidden={!this.state.prompts.some((s) => s.value.length > 0 && s.enabled)}
        disabled={this.props.running}
        onClick={(evt: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
          evt.preventDefault();
          this.props.onSubmit(this.state);
        }}></Form.Control>
    </Form>
  }

}

let pc = document.getElementById("prompt_app");
let p = <PromptApp></PromptApp>
if (pc) {
  ReactDOM.render(p, pc);
}
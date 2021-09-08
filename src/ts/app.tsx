import msgpack from "@ygoe/msgpack";

import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Row, Col, Container, Button, Form, InputGroup, SplitButton, ToggleButton, FormText, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

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
  width?: number;
  height?: number;
}

const API_ENDPOINT = "wss://api.doodlebot.ai/api/run";

const PromptApp: React.FC<{}> = () => {

  const [running, setRunning] = useState<boolean>(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [image_src, setSrc] = useState<string>("");

  useEffect(() => {
    if (ws == null) {
      console.error("Websocket not initialized");
      return () => { };
    }

    ws.onmessage = msg => {
      let png_bytes = msg.data as Blob;
      let src = URL.createObjectURL(png_bytes.slice(undefined, undefined, "image/png"));
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

    return () => {
      ws?.close();
      setWs(null);
      setRunning(false);
    }
  }, [ws]);


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
            <PromptForm running={running} onSubmit={(evt: ParamState) => {
              let ws = new WebSocket(API_ENDPOINT);
              setWs(ws);
              setRunning(true);
              const msg: PromptMsg = {
                width: evt.width,
                height: evt.height,
                prompts: evt.prompts.filter((e) => e.enabled).map((a) => a.value),
              };
              ws.onopen = evt => {
                const bin = msgpack.serialize(msg);
                ws?.send(bin);
              };
            }} />
          </Col>
        </Row>
      </Col>
    </Row>
    <Row className="justify-content-center">
      {ws != null && <div id="output">{ws?.readyState == WebSocket.OPEN ? <img src={image_src} /> : "Loading..."}</div>}
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
  cutn: number;
  cut_pow: number;
  mse_weight: number;
  mse_decay: number;
  mse_decay_every: number;
  step_size: number;
  noise_fac: number;
  clip_name: string;
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
    cutn: 0,
    cut_pow: 0,
    mse_weight: 0,
    mse_decay: 0,
    mse_decay_every: 0,
    step_size: 0,
    noise_fac: 0,
    clip_name: "",
    vqgan_name: "vqgan_imagenet_f16_16384",
    width: 1000,
    height: 1000,
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
        <Form.Control type="range" defaultValue="0"
          disabled={this.props.running}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => { evt.preventDefault(); this.setState({ ...this.state, cutn: Number.parseInt(evt.target.value) }) }} />
        <Form.Label>{this.state.cutn}</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>CUT POWER</Form.Label>
        <Form.Control type="range" defaultValue="0"
          disabled={this.props.running}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => { evt.preventDefault(); this.setState({ ...this.state, cut_pow: Number.parseFloat(evt.target.value) }) }} />
        <Form.Label>{this.state.cut_pow}</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>MSE WEIGHT</Form.Label>
        <Form.Control type="range" defaultValue="0"
          disabled={this.props.running}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => { evt.preventDefault(); this.setState({ ...this.state, mse_weight: Number.parseFloat(evt.target.value) }) }} />
        <Form.Label>{this.state.mse_weight}</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>MSE DECAY</Form.Label>
        <Form.Control type="range" defaultValue="0"
          disabled={this.props.running}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => { evt.preventDefault(); this.setState({ ...this.state, mse_decay: Number.parseFloat(evt.target.value) }) }} />
        <Form.Label>{this.state.mse_decay}</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>MSE DECAY EVERY</Form.Label>
        <Form.Control type="range" defaultValue="0"
          disabled={this.props.running}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => { evt.preventDefault(); this.setState({ ...this.state, mse_decay_every: Number.parseFloat(evt.target.value) }) }} />
        <Form.Label>{this.state.mse_decay_every}</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>STEP SIZE</Form.Label>
        <Form.Control type="range" defaultValue="0"
          disabled={this.props.running}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => { evt.preventDefault(); this.setState({ ...this.state, step_size: Number.parseFloat(evt.target.value) }) }} />
        <Form.Label>{this.state.step_size}</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>NOISE FACTOR</Form.Label>
        <Form.Control type="range" defaultValue="0"
          disabled={this.props.running}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => { evt.preventDefault(); this.setState({ ...this.state, noise_fac: Number.parseFloat(evt.target.value) }) }} />
        <Form.Label>{this.state.noise_fac}</Form.Label>
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
} else {
  console.error("Could not find container to bind app");
}
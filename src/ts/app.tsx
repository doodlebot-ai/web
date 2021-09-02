import msgpack from "@ygoe/msgpack";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import {Row, Col, Container, Button, Form, InputGroup, SplitButton, ToggleButton, FormText, FormControl} from "react-bootstrap";
import { Toggle } from "react-bootstrap/lib/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { toHtml } from "@fortawesome/fontawesome-svg-core";

class PromptApp extends Component {
    render() {
        return <Container>
        <Row className="justify-content-center">
        <Col lg="8">
          <div className="header-hero-content text-center">
            <h2 className="header-title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.5s">Work with Alicia</h2>
            <h3 className="header-sub-title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s"><br/>Ask her to create an image for you.</h3>
          </div>
          <Row>
            <Col lg="6">
              <div className="subscribe-content mt-45">
                <h2 className="subscribe-title">We recommend plain English<span>With many keywords</span></h2>
              </div>
            </Col>
            <Col lg="6">
              <PromptForm/>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <code><div id="output"><img/></div></code>
      </Row>
      </Container>
    }
}

type PromptTextEvt = {
  key: number
}

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

interface PromptTextProps{
  key: number
  showCheckbox: boolean;
  showButton: boolean;
  isAdd: boolean;
  state: PromptTextState;
  onCheckChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFormChange?: (event: React.ChangeEvent<FormControlElement>) => void;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface PromptTextState{
  enabled: boolean;
  value: string;
}

class PromptText extends Component<PromptTextProps, {}> {

  _onCheck(evt: React.ChangeEvent<HTMLInputElement>) {
    if(this.props.onCheckChange)
      this.props.onCheckChange(evt); 
  }
  
  _onForm(evt: React.ChangeEvent<FormControlElement>){
    if(this.props.onFormChange)
      this.props.onFormChange(evt); 
  }

  _onButton(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    if(this.props.onButtonClick)
      this.props.onButtonClick(evt); 
  }

  render() {
    return <InputGroup>
      {this.props.showCheckbox &&
        <InputGroup.Checkbox hidden={!this.props.showCheckbox} checked={this.props.state.enabled} onChange={this._onCheck.bind(this)} />
      }
      <FormControl placeholder="A new prompt" onChange={this._onForm.bind(this)} value={this.props.state.value}/>
      <Button variant="secondary" hidden={!this.props.showButton} onClick={this._onButton.bind(this)}>
        <FontAwesomeIcon icon={this.props.isAdd ? faPlus : faMinus}/>
      </Button>
    </InputGroup>
  }
}

interface ParamState {
  prompts: PromptTextState[];
}

class PromptForm extends Component<{}, ParamState> {
  state: ParamState = {
    prompts: [
      {enabled: true, value: ""},
      {enabled: true, value: ""}
    ],
  }

  togglePrompt(index: number, changed: React.ChangeEvent<HTMLInputElement>) {
    const prompts = this.state.prompts;
    const prompt = prompts[index];
    if(prompt){
      prompt.enabled = !prompt.enabled;
      changed.target.checked = prompt.enabled;
    }
    this.setState({...this.state, prompts: prompts});
  }

  updatePrompt(index: number, event: React.ChangeEvent<FormControlElement>) {
    const prompts = this.state.prompts;
    const prompt = prompts[index];
    if(prompt){
      prompt.value = event.target.value;
    }
    this.setState({...this.state, prompts: prompts});
  }
  addsubPrompt(index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const prompts = this.state.prompts;
    const prompt = prompts[index];
    if(!prompt) return;
    if(index === prompts.length - 1){
      prompts.push({enabled: true, value: ""});
    } else {
      prompts.splice(index, 1);
    }
    this.setState({...this.state, prompts: prompts});
  }


  render() {
    return <Form>
      {this.state.prompts.map((st,idx) => 
        <PromptText key={idx} showCheckbox={idx > 0} 
          showButton={true} 
          isAdd={idx === this.state.prompts.length - 1}
          state={st} 
          onCheckChange={this.togglePrompt.bind(this,idx)}
          onFormChange={this.updatePrompt.bind(this,idx)}
          onButtonClick={this.addsubPrompt.bind(this,idx)}
        />
      )}
      <Form.Control type="button" className="main-btn" hidden value="Submit"></Form.Control>
    </Form>
  }

}

// `use strict`;
// $(() => {

//     const ws_endpoint = "ws://api.doodlebot.ai/api/run";
//     var global_ws: WebSocket | null = null;

//     $("#prompt").submit(async (evt) => {
//         evt.preventDefault();
//         $("#prompt button").attr("disabled","");
//         try {
//             global_ws = new WebSocket(ws_endpoint);
//             console.log("Websiocket connected");
//         } catch(err) {
//             global_ws = null;
//             console.error("Websocket connection failed");
//             console.error(err);
//             return;
//         }
//         var prompt = $("#prompt input").val();

//         var obj = { prompts: [prompt+" by james gurney"] };
//         var msg = msgpack.serialize(obj);
//         global_ws.addEventListener("open", () => {
//             global_ws?.send(msg);
//             console.log("Sent: ",obj,msg);
//             $("#stop_btn").fadeIn("fast");
//         });


//         const imgs = $("#output img").toArray() as HTMLImageElement[];
//         let [cur, last] = [0, imgs.length - 1];


//         global_ws.addEventListener('message', function (event) {
//           var png_bytes = event.data;
//           png_bytes.type = "image/png";
//           console.log(`Recv'd: ${png_bytes.size} bytes`);
        
//           //$(imgs[last]).hide();
//           var img = imgs[cur];
//           // TODO: whatever
//           img.src = URL.createObjectURL(png_bytes);
//           //$(imgs[cur]).show();
//           [last, cur] = [cur, (cur + 1) % imgs.length];
//         });
//       });

//     $("#stop_btn").click((evt) => {
//         if(global_ws != null){
//             global_ws.close();
//             global_ws = null;
//             $(evt.target).attr("disabled", "");
//             console.log("Websocket closed");
//         } else {
//             console.error("Could not close websocket");
//         }
//     });
// });

let pc = document.getElementById("prompt_app");
let p = <PromptApp></PromptApp>
if(pc){
    ReactDOM.render(p, pc);
} else {
    console.error("Could not find container to bind app");
}
import msgpack from "@ygoe/msgpack";

import React, { Component } from "react";
import ReactDOM from "react-dom";

class PromptApp extends Component {
    render() {
        return <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="header-hero-content text-center">
            <h2 className="header-title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.5s">Work with Alicia</h2>
            <h3 className="header-sub-title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s"><br/>Ask her to create an image for you.</h3>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="subscribe-content mt-45">
                <h2 className="subscribe-title">We recommend plain English<span>With many keywords</span></h2>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="subscribe-form mt-50">
                <form id="prompt">
                  <ol className="prompt_list">
                    <input type="text" placeholder="Painting of flowers"/>
                  </ol>
                  <button className="main-btn" autoComplete="off">Submit</button>
                </form>                 
              </div>
              <div className="mt-20">
                <button id="stop_btn" className="main-btn" autoComplete="off" style={{display: "none", width: "100%"}}>Stop</button>
              </div>
            </div>
          </div>
        </div>
        <code><div id="output"><img/></div></code>
      </div>;
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
if(pc){
    ReactDOM.render(<PromptApp></PromptApp>, pc);
} else {
    console.error("Could not find container to bind app");
}
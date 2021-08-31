`use strict`;
$(() => {

    const ws_endpoint = "ws://api.doodlebot.ai/api/run";
    var global_ws = null;

    $("#prompt").submit(async (evt) => {
        evt.preventDefault();
        $("#prompt button").attr("disabled",true);
        try {
            global_ws = new WebSocket(ws_endpoint);
            console.log("Websiocket connected");
        } catch(err) {
            global_ws = null;
            console.error("Websocket connection failed");
            console.error(err);
            return;
        }
        var prompt = $("#prompt input").val();

        var obj = { prompts: [prompt+" by james gurney"] };
        var msg = msgpack.serialize(obj);
        global_ws.addEventListener("open", () => {
            global_ws.send(msg);
            console.log("Sent: ",obj,msg);
            $("#stop_btn").fadeIn("fast");
        });


        const imgs = $("#output img");
        let [cur, last] = [0, imgs.length - 1];


        global_ws.addEventListener('message', function (event) {
          var png_bytes = event.data;
          png_bytes.type = "image/png";
          console.log(`Recv'd: ${png_bytes.size} bytes`);
        
          //$(imgs[last]).hide();
          var img = imgs[cur];
          // TODO: whatever
          img.src = URL.createObjectURL(png_bytes);
          //$(imgs[cur]).show();
          [last, cur] = [cur, (cur + 1) % imgs.length];
        });
      });

    $("#stop_btn").click((evt) => {
        if(global_ws != null){
            global_ws.close();
            global_ws = null;
            $(evt.target).attr("disabled", true);
            console.log("Websocket closed");
        } else {
            console.error("Could not close websocket");
        }
    });


    // function openSocket(url) {
    //     if (typeof ws !== 'undefined') {
    //       ws.close();
    //     }

    //     ws = new WebSocket(url);
    //     ws.binaryType = 'arraybuffer';

    //     ws.onopen = function () {
    //       document.getElementById('output').innerHTML = 'connected!<br>';
    //     };

    //     ws.onmessage = function (e) {
    //       document.getElementById('output').innerHTML += 'in :' + e.data + '<br>';
    //     };

    //     ws.onclose = function () {
    //       document.getElementById('output').innerHTML = 'closed!<br>';
    //     };
    //     return false;
    //   }

    //   function send(data) {
    //     if (typeof ws === 'undefined') {
    //       document.getElementById('output').innerHTML = 'not connected!<br>';
    //     } else {
    //       document.getElementById('output').innerHTML += 'out:' + data + '<br>';
    //       ws.send(data);
    //     }
    //   }

});
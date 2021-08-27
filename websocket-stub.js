var ws = new WebSocket("ws://135.181.63.205/api/run");

var obj = {prompts: ["your prompt here"]};
var msg = msgpack.serialize(obj);
ws.send(msg);
console.log("buzz");

ws.addEventListener('message', function (event) {
  var png_bytes = new Blob(event.data, {type: "image/png"});
  // TODO: whatever
  img_link.href = URL.createObjectUrl(png_bytes)
});

window.location.replace = '/app.html'; //relative to domain

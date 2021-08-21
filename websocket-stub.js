var ws = new WebSocket("ws://3.144.116.72/api/run");

var obj = {prompts: ["your prompt here"]};
var msg = msgpack.serialize(obj);
ws.send(msg);

ws.addEventListener('message', function (event) {
  var obj = msgpack.deserialize(event.data);
  var png_bytes = new Blob(obj["img"], {type: "image/png"});
  var iter = obj["iter"];
  var score = obj["score"];
  // TODO: whatever
  img_link.href = URL.createObjectUrl(png_bytes)
});

(()=>{"use strict";var e,t={2968:(e,t,n)=>{var a=n(7326),r=n(5671),o=n(3144),l=n(9340),i=n(6215),s=n(1120),c=n(4942),u=n(8152),p=n(461),d=n.n(p),m=n(7294),h=n(3935),f=n(682),b=n(4051),v=n(1555),g=n(3754),y=n(6968),_=n(2318),w=n(4716),E=n(2258),k=n(7625),C=n(1436),Z=n(387);function F(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,s.Z)(e);if(t){var r=(0,s.Z)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return(0,i.Z)(this,n)}}function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){(0,c.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j=function(){var e,t,n,a,r=(0,m.useState)(!1),o=(0,u.Z)(r,2),l=o[0],i=o[1],s=(0,m.useState)(null),c=(0,u.Z)(s,2),p=c[0],h=c[1],_=(0,m.useState)(""),w=(0,u.Z)(_,2),k=w[0],C=w[1],F=(0,m.useState)({size:10,color:"#000000"}),O=(0,u.Z)(F,2),j=O[0],P=O[1];return(0,m.useEffect)((function(){return null==p?(console.error("Websocket not initialized"),function(){}):(p.onmessage=function(e){var t=e.data,n=t.slice(0,t.size,"image/png"),a=URL.createObjectURL(n);k.length>0&&URL.revokeObjectURL(k),C(a)},p.onerror=function(e){console.error("Websocket errored: ",e),null==p||p.close(),h(null),i(!1)},function(){null==p||p.close(),h(null),i(!1)})}),[p]),m.createElement(f.Z,null,m.createElement(b.Z,{className:"justify-content-center"},m.createElement(v.Z,{lg:"8"},m.createElement("div",{className:"header-hero-content text-center"}),m.createElement(b.Z,null,m.createElement(v.Z,{lg:"6"},m.createElement("div",{className:"subscribe-content mt-45"},m.createElement("h2",{className:"subscribe-title"},"We recommend plain English",m.createElement("span",null,"With many keywords")))),m.createElement(v.Z,{lg:"6"},m.createElement(z,{ref:function(e){n=null==e?void 0:e},running:l,onSubmit:function(e){var t,n=new WebSocket("wss://api.doodlebot.ai/api/run");if(h(n),i(!0),null!==(t=a)&&void 0!==t&&t.canvas.drawing){var r;(null===(r=a)||void 0===r?void 0:r.canvas.drawing).toBlob((function(t){null!=t?t.arrayBuffer().then((function(t){var a={width:e.width,height:e.height,prompts:e.prompts.filter((function(e){return e.enabled})).map((function(e){return e.value})),cutn:e.cutn,cut_pow:e.cut_pow,mse_weight:e.mse_weight,mse_decay:e.mse_decay,mse_decay_every:e.mse_decay_every,step_size:e.step_size,noise_fac:e.noise_fac,clip_name:e.clip_name,vqgan_name:e.vqgan_name,start_img:new Uint8Array(t)};n.onopen=function(e){var t=d().serialize(a);null==n||n.send(t)}})):console.error("Error converting input image to raw blob data")}),"image/png")}else{var o={width:e.width,height:e.height,prompts:e.prompts.filter((function(e){return e.enabled})).map((function(e){return e.value})),cutn:e.cutn,cut_pow:e.cut_pow,mse_weight:e.mse_weight,mse_decay:e.mse_decay,mse_decay_every:e.mse_decay_every,step_size:e.step_size,noise_fac:e.noise_fac,clip_name:e.clip_name,vqgan_name:e.vqgan_name};n.onopen=function(e){var t=d().serialize(o);null==n||n.send(t)}}}}))))),m.createElement(b.Z,null,m.createElement("div",null,m.createElement(E.Z.Control,{type:"color",defaultValue:"#000000",onChange:function(e){return P(S(S({},j),{},{color:e.target.value}))}}),m.createElement(E.Z.Control,{type:"number",defaultValue:10,onChange:function(e){var t=Number.parseInt(e.target.value);t&&P(S(S({},j),{},{size:t}))}})),m.createElement(Z.Z,{ref:function(e){a=null==e?void 0:e},canvasWidth:(null===(e=n)||void 0===e?void 0:e.state.width)||1e3,canvasHeight:(null===(t=n)||void 0===t?void 0:t.state.height)||1e3,brushRadius:j.size,brushColor:j.color})),m.createElement(b.Z,{className:"justify-content-center"},m.createElement("div",{hidden:null==p&&0==k.length},m.createElement(g.Z,{disabled:!((null==p?void 0:p.readyState)==WebSocket.OPEN),size:"lg",onClick:function(){(null==p?void 0:p.readyState)==WebSocket.OPEN&&(null==p||p.close(),h(null),i(!1))}},(null==p?void 0:p.readyState)==WebSocket.OPEN?"Stop":m.createElement("span",null,m.createElement(y.Z,{animation:"border",role:"status"})," ...Loading")),m.createElement("img",{hidden:0==k.length,src:k}))))},P=function(e){(0,l.Z)(n,e);var t=F(n);function n(){return(0,r.Z)(this,n),t.apply(this,arguments)}return(0,o.Z)(n,[{key:"_onCheck",value:function(e){this.props.onCheckChange&&this.props.onCheckChange(e)}},{key:"_onForm",value:function(e){this.props.onFormChange&&this.props.onFormChange(e)}},{key:"_onButton",value:function(e){this.props.onButtonClick&&this.props.onButtonClick(e)}},{key:"render",value:function(){return m.createElement(_.Z,null,this.props.showCheckbox&&m.createElement(_.Z.Checkbox,{disabled:this.props.disabled,hidden:!this.props.showCheckbox,checked:this.props.state.enabled,onChange:this._onCheck.bind(this)}),m.createElement(w.Z,{placeholder:"A new prompt",disabled:this.props.disabled,onChange:this._onForm.bind(this),value:this.props.state.value}),m.createElement(g.Z,{variant:"secondary",disabled:this.props.disabled,hidden:!this.props.showButton,onClick:this._onButton.bind(this)},m.createElement(k.G,{icon:this.props.isAdd?C.r8p:C.Kl4})))}}]),n}(m.Component),z=function(e){(0,l.Z)(n,e);var t=F(n);function n(){var e;(0,r.Z)(this,n);for(var o=arguments.length,l=new Array(o),i=0;i<o;i++)l[i]=arguments[i];return e=t.call.apply(t,[this].concat(l)),(0,c.Z)((0,a.Z)(e),"state",{prompts:[{enabled:!1,value:""}],vqgan_name:"vqgan_imagenet_f16_16384",cutn:32,mse_weight:.1,step_size:.25,width:512,height:512}),e}return(0,o.Z)(n,[{key:"togglePrompt",value:function(e,t){var n=this.state.prompts,a=n[e];a&&(a.enabled=!a.enabled,t.target.checked=a.enabled),this.setState(S(S({},this.state),{},{prompts:n}))}},{key:"updatePrompt",value:function(e,t){var n=this.state.prompts,a=n[e];if(a){var r=t.target.value;0==r.length?a.enabled=!1:!a.enabled&&0==a.value.length&&r.length>0&&(a.enabled=!0),a.value=r}this.setState(S(S({},this.state),{},{prompts:n}))}},{key:"addsubPrompt",value:function(e,t){var n=this.state.prompts;n[e]&&(e===n.length-1?n.push({enabled:!1,value:""}):n.splice(e,1),this.setState(S(S({},this.state),{},{prompts:n})))}},{key:"render",value:function(){var e=this;return m.createElement(E.Z,null,this.state.prompts.map((function(t,n){return m.createElement(P,{key:n,showCheckbox:!0,showButton:!0,isAdd:n===e.state.prompts.length-1,state:t,disabled:e.props.running,onCheckChange:e.togglePrompt.bind(e,n),onFormChange:e.updatePrompt.bind(e,n),onButtonClick:e.addsubPrompt.bind(e,n)})})),m.createElement(E.Z.Group,null,m.createElement(E.Z.Label,null,"CUT NUMBER"),m.createElement(E.Z.Control,{type:"number",defaultValue:32,disabled:this.props.running,onChange:function(t){t.preventDefault(),e.setState(S(S({},e.state),{},{cutn:Number.parseInt(t.target.value)}))}})),m.createElement(E.Z.Group,null,m.createElement(E.Z.Label,null,"MSE WEIGHT"),m.createElement(E.Z.Control,{type:"number",defaultValue:.1,disabled:this.props.running,onChange:function(t){t.preventDefault(),e.setState(S(S({},e.state),{},{mse_weight:Number.parseFloat(t.target.value)}))}})),m.createElement(E.Z.Group,null,m.createElement(E.Z.Label,null,"STEP SIZE"),m.createElement(E.Z.Control,{type:"number",defaultValue:.25,disabled:this.props.running,onChange:function(t){t.preventDefault(),e.setState(S(S({},e.state),{},{step_size:Number.parseFloat(t.target.value)}))}})),m.createElement(E.Z.Group,null,m.createElement(E.Z.Label,null,"RESOLUTION"),m.createElement(_.Z,null,m.createElement(E.Z.Control,{type:"number",value:this.state.width,disabled:this.props.running,onChange:function(t){t.preventDefault(),e.setState(S(S({},e.state),{},{width:Number.parseInt(t.target.value)}))}}),m.createElement(_.Z.Text,null,"x"),m.createElement(E.Z.Control,{type:"number",value:this.state.height,disabled:this.props.running,onChange:function(t){t.preventDefault(),e.setState(S(S({},e.state),{},{height:Number.parseInt(t.target.value)}))}}))),m.createElement(E.Z.Group,null,m.createElement(E.Z.Label,null,"VQGAN Mode"),m.createElement(E.Z.Control,{as:"select",custom:!0,defaultValue:"vqgan_imagenet_f16_16384",onChange:function(t){e.setState(S(S({},e.state),{},{vqgan_name:t.target.value}))}},m.createElement("option",{value:"vqgan_imagenet_f16_16384"},"Imagenet"),m.createElement("option",{value:"vqgan_wikiart_f16_16384"},"WikiArt"),m.createElement("option",{value:"vqgan_gumbel_f8_8192"},"Gumbel"))),m.createElement(E.Z.Control,{type:"button",className:"main-btn",value:"Submit",hidden:!this.state.prompts.some((function(e){return e.value.length>0&&e.enabled})),disabled:this.props.running,onClick:function(t){t.preventDefault(),e.props.onSubmit(e.state)}}))}}]),n}(m.Component),x=document.getElementById("prompt_app"),N=m.createElement(j,null);x&&h.render(N,x);var T=n(9019),B=n.n(T),D=n(9755),I=n.n(D),R=(n(7388),n(5169),n(3521));I()((function(){var e,t,n;I()(".preloader").delay(500).fadeOut(200),I()(window).on("scroll",(function(e){var t=I()(window).scrollTop();t&&(t<20?(I()(".navbar-area").removeClass("sticky"),I()(".navbar .navbar-brand img").attr("src",R)):(I()(".navbar-area").addClass("sticky"),I()(".navbar .navbar-brand img").attr("src",R)))}));var a=I()(".page-scroll");I()(window).scroll((function(){var e=I()(this).scrollTop();a.each((function(){if(e){var t=I()(this).offset();t&&t.top-73<=e&&(I()(this).parent().addClass("active"),I()(this).parent().siblings().removeClass("active"))}}))})),I()(".navbar-nav a").on("click",(function(){I()(".navbar-collapse").removeClass("show")})),I()(".navbar-toggler").on("click",(function(){I()(this).toggleClass("active")})),I()(".navbar-nav a").on("click",(function(){I()(".navbar-toggler").removeClass("active")})),I().ajaxSetup({crossDomain:!0,xhrFields:{withCredentials:!0}}),null===(e=I()("#loginform"))||void 0===e||e.on("submit",(function(e){e.preventDefault(),I().ajax({url:"https://api.doodlebot.ai/api/auth/login",method:"POST",data:I()("#loginform").serialize()}).done((function(e){console.log(e),window.location.replace("/app")})).fail((function(e){var t;I()("#err_popup").show(),null!==(t=e.responseJSON)&&void 0!==t&&t.msg&&I()("#err_msg").text(e.responseJSON.msg),console.error(e)}))})),null===(t=I()("#registerform"))||void 0===t||t.on("submit",(function(e){e.preventDefault(),I().ajax({url:"https://api.doodlebot.ai/api/auth/register",method:"POST",data:I()("#registerform").serialize()}).done((function(e){console.log(e),window.location.replace("/login")})).fail((function(e){I()("#err_popup").show(),console.error(e)}))})),null===(n=I()("#demo_register"))||void 0===n||n.on("submit",(function(e){e.preventDefault(),I().ajax({url:"https://api.doodlebot.ai/api/signup",method:"POST",data:I()("#demo_register").serialize()}).done((function(e){console.log(e),window.location.replace("/demo2")})).fail((function(e){console.error(e)}))})),I()(window).on("scroll",(function(e){var t=I()(this).scrollTop();null!=t&&(t>600?I()(".back-to-top").fadeIn(200):I()(".back-to-top").fadeOut(200))})),I()(".back-to-top").on("click",(function(e){e.preventDefault(),I()("html, body").animate({scrollTop:0},1500)})),(new(B())).init(),document.getElementById("particles-1")&&particlesJS("particles-1",{particles:{number:{value:40,density:{enable:!0,value_area:4e3}},color:{value:["#FFFFFF","#FFFFFF","#FFFFFF"]},shape:{type:"circle",stroke:{width:0,color:"#fff"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:33,height:33}},opacity:{value:.15,random:!0,anim:{enable:!0,speed:.2,opacity_min:.15,sync:!1}},size:{value:50,random:!0,anim:{enable:!0,speed:2,size_min:5,sync:!1}},line_linked:{enable:!1,distance:150,color:"#ffffff",opacity:.4,width:1},move:{enable:!0,speed:1,direction:"top",random:!0,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:600}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!1,mode:"bubble"},onclick:{enable:!1,mode:"repulse"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:250,size:0,duration:2,opacity:0,speed:3},repulse:{distance:400,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0}),document.getElementById("particles-2")&&particlesJS("particles-2",{particles:{number:{value:40,density:{enable:!0,value_area:4e3}},color:{value:["#FFFFFF","#FFFFFF","#FFFFFF"]},shape:{type:"circle",stroke:{width:0,color:"#fff"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:33,height:33}},opacity:{value:.15,random:!0,anim:{enable:!0,speed:.2,opacity_min:.15,sync:!1}},size:{value:50,random:!0,anim:{enable:!0,speed:2,size_min:5,sync:!1}},line_linked:{enable:!1,distance:150,color:"#ffffff",opacity:.4,width:1},move:{enable:!0,speed:1,direction:"top",random:!0,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:600}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!1,mode:"bubble"},onclick:{enable:!1,mode:"repulse"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:250,size:0,duration:2,opacity:0,speed:3},repulse:{distance:400,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0})}))},3521:(e,t,n)=>{e.exports=n.p+"ab82b763284e9ff644d5.png"}},n={};function a(e){var r=n[e];if(void 0!==r)return r.exports;var o=n[e]={id:e,loaded:!1,exports:{}};return t[e].call(o.exports,o,o.exports,a),o.loaded=!0,o.exports}a.m=t,e=[],a.O=(t,n,r,o)=>{if(!n){var l=1/0;for(u=0;u<e.length;u++){for(var[n,r,o]=e[u],i=!0,s=0;s<n.length;s++)(!1&o||l>=o)&&Object.keys(a.O).every((e=>a.O[e](n[s])))?n.splice(s--,1):(i=!1,o<l&&(l=o));if(i){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,r,o]},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),a.p="./",(()=>{var e={179:0};a.O.j=t=>0===e[t];var t=(t,n)=>{var r,o,[l,i,s]=n,c=0;if(l.some((t=>0!==e[t]))){for(r in i)a.o(i,r)&&(a.m[r]=i[r]);if(s)var u=s(a)}for(t&&t(n);c<l.length;c++)o=l[c],a.o(e,o)&&e[o]&&e[o][0](),e[l[c]]=0;return a.O(u)},n=self.webpackChunkdoodlebot_web=self.webpackChunkdoodlebot_web||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=a.O(void 0,[829],(()=>a(2968)));r=a.O(r)})();
//# sourceMappingURL=main.js.map
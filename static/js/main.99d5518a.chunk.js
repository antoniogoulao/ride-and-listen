(this["webpackJsonpride-and-listen"]=this["webpackJsonpride-and-listen"]||[]).push([[0],{112:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(26),o=a.n(r),i=(a(90),a(6)),l=a(14),d=a(76),s=[{id:0,url:"https://mcrscast1.mcr.iol.pt/comercial.mp3",name:"Comercial"},{id:1,url:"https://centova.radios.pt/proxy/435?mp=/stream/1/",name:"SBSR"},{id:2,url:"https://21273.live.streamtheworld.com/RFM_SC",name:"RFM"},{id:3,url:"https://mcrscast.mcr.iol.pt/m80",name:"M80"},{id:4,url:"https://20863.live.streamtheworld.com/MEGA_HITS_SC",name:"Mega Hits"},{id:5,url:"https://centova.radios.pt/proxy/500?mp=/stream/1/",name:"Hiper FM"},{id:6,url:"https://centova.radios.pt/proxy/495?mp=/stream/1/",name:"Meo SW"},{id:7,url:"https://mcrscast.mcr.iol.pt/cidadefm",name:"Cidade"},{id:8,url:"https://tsfdirecto.tsf.pt/tsfdirecto.mp3",name:"TSF"},{id:9,url:"https://centova.radios.pt/proxy/401?mp=/stream/1/",name:"Orbital"},{id:10,url:"http://www.hostsetubal.com:9956/;",name:"105.4"}],j=[{name:"Portagem (Marv\xe3o) -> Castelo de Vide, Alentejo",videoId:"rFshlSZQ7cU"},{name:"Gl\xf3ria -> Santar\xe9m, Ribatejo",videoId:"wcFrsemxPu8"},{name:"Caldas da Rainha -> Ferraria de S\xe3o Jo\xe3o, Centro",videoId:"HQpDZfXMIu4"},{name:"Estoril -> Cabo da Roca",videoId:"439qquhh2Mg"}],u=Object(l.b)({key:"showBottomBarState",default:!0}),b=Object(l.b)({key:"selectedVideoState",default:j[Math.floor(Math.random()*j.length)].videoId}),m=Object(l.b)({key:"videosState",default:j}),O=Object(l.b)({key:"selectedRadioState",default:s[0]}),x=Object(l.b)({key:"radiosState",default:s}),h=Object(l.b)({key:"radioVolumeState",default:50}),f=Object(l.b)({key:"radioPlayState",default:!1}),p=Object(l.b)({key:"videoMuteState",default:1}),v=Object(l.b)({key:"videoSpeedState",default:1}),g=Object(l.c)({key:"radioSelector",get:function(e){return(0,e.get)(O)},set:function(e,t){return(0,e.set)(O,s.find((function(e){return e.id===t})))}}),y=a(2),C=function(){var e=Object(l.d)(b),t=Object(l.e)(b),a=Object(l.d)(p),c=Object(l.d)(v),r=Object(n.useState)(),o=Object(i.a)(r,2),s=o[0],u=o[1];Object(n.useEffect)((function(){null!==s&&void 0!==s&&s.isMuted()?null===s||void 0===s||s.unMute():null===s||void 0===s||s.mute()}),[a,s]),Object(n.useEffect)((function(){null===s||void 0===s||s.setPlaybackRate(c),null===s||void 0===s||s.playVideo()}),[s,c]);return Object(y.jsx)(d.a,{videoId:e,containerClassName:"youtube-player",onReady:function(e){u(e.target)},onEnd:function(){var a=j.findIndex((function(t){return t.videoId===e}));t(j[(a+1)%j.length].videoId)},opts:{height:"100%",width:"100%",playerVars:{autoplay:1,controls:0,loop:1}}})},k=a(176),S=function(){var e=Object(l.d)(h),t=Object(l.d)(f),a=Object(l.d)(O),c=Object(n.createRef)();return Object(n.useEffect)((function(){var t=c.current;null!==t&&(t.volume=e/100)}),[c,e]),Object(n.useEffect)((function(){var e=c.current;null!==e&&(t?e.play():e.pause())}),[c,t]),Object(y.jsx)("audio",{ref:c,autoPlay:!0,id:"audio",preload:"metadata",src:null===a||void 0===a?void 0:a.url,title:null===a||void 0===a?void 0:a.name,children:Object(y.jsxs)(k.a,{children:["Your browser does not support the ",Object(y.jsx)("code",{children:"audio"})," element."]})})},M=a(161),I=a(162),w=a(163),F=a(164),E=a(165),P=a(160),R=a(166),X=a(167),B=a(25),V=a(179),D=a(180),H=a(181),T=a(158),W=a(150),A=a(177),G=a(151),J=a(152),L=a(153),_=a(154),q=function(){return Object(y.jsxs)(W.a,{sx:{display:"flex",alignItems:"center",flexDirection:"column",minWidth:"max-content",marginX:2},children:[Object(y.jsx)(k.a,{children:"Ant\xf3nio Goul\xe3o"}),Object(y.jsxs)(W.a,{children:[Object(y.jsx)(A.a,{marginX:.25,"aria-label":"project github repo",target:"blank",href:"https://github.com/antoniogoulao/ride-and-listen",children:Object(y.jsx)(G.a,{color:"secondary"})}),Object(y.jsx)(A.a,{marginX:.25,"aria-label":"twitter account",target:"blank",href:"https://twitter.com/toniomg",children:Object(y.jsx)(J.a,{color:"secondary"})}),Object(y.jsx)(A.a,{marginX:.25,"aria-label":"email address",target:"blank",href:"mailto:antoniomgoulao@gmail.com",children:Object(y.jsx)(L.a,{color:"secondary"})}),Object(y.jsx)(A.a,{marginX:.25,"aria-label":"personal website",target:"blank",href:"https://antoniogoulao.dev",children:Object(y.jsx)(_.a,{color:"secondary"})})]})]})},Q=a(173),Z=a(169),z=a(172),N=function(){var e=Object(l.d)(x),t=Object(l.d)(O),a=Object(l.e)(g);return Object(y.jsx)(Q.a,{sx:{margin:1,minWidth:120},children:Object(y.jsx)(Z.a,{value:null===t||void 0===t?void 0:t.id,onChange:function(e){return a(e.target.value)},displayEmpty:!0,inputProps:{"aria-label":"Select radio"},children:e.map((function(e){var t=e.id,a=e.name;return Object(y.jsx)(z.a,{value:t,children:Object(y.jsx)(k.a,{children:a})},t)}))})})},U=function(){var e=Object(l.d)(m),t=Object(l.d)(b),a=Object(l.e)(b);return Object(y.jsx)(Q.a,{sx:{margin:1,minWidth:120},children:Object(y.jsx)(Z.a,{value:t,onChange:function(e){return a(e.target.value)},displayEmpty:!0,inputProps:{"aria-label":"Select video"},children:e.map((function(e){var t=e.videoId,a=e.name;return Object(y.jsx)(z.a,{value:t,children:Object(y.jsx)(k.a,{children:a})},t)}))})})},Y=a(171),K=a(159),$=function(e){return function(t,a){a>100&&(a=100),a<0&&(a=0),e(a)}},ee=function(){var e=Object(l.d)(h),t=Object(l.e)(h);return Object(y.jsxs)(T.a,{sx:{width:200},display:"flex",alignItems:"center",children:[Object(y.jsx)(V.a,{onClick:function(){return $(t)(null,e-10)},"aria-label":"volume down",children:Object(y.jsx)(K.a,{color:"secondary"})}),Object(y.jsx)(Y.a,{min:0,max:100,value:e,onChange:$(t),"aria-labelledby":"Volume",color:"secondary"}),Object(y.jsx)(V.a,{onClick:function(){return $(t)(null,e+10)},"aria-label":"volume up",children:Object(y.jsx)(P.a,{color:"secondary"})})]})},te=function(){var e=Object(l.d)(u),t=Object(l.d)(f),a=Object(l.e)(u),c=Object(l.e)(f),r=Object(l.d)(p),o=Object(l.e)(p),i=Object(B.a)(),d=Object(n.useContext)(oe);return e?Object(y.jsx)(D.a,{position:"fixed",color:"primary",sx:{top:"auto",bottom:0,overflowX:"scroll"},children:Object(y.jsxs)(H.a,{sx:{flex:1,justifyContent:"space-between",paddingBottom:1},children:[Object(y.jsxs)(T.a,{sx:{display:"flex",alignItems:"center"},children:[Object(y.jsxs)(T.a,{display:"flex",flexDirection:"column",alignItems:"center",children:[Object(y.jsx)(V.a,{"aria-label":"hide controls bar",onClick:function(){return a(!1)},children:Object(y.jsx)(I.a,{color:"secondary"})}),Object(y.jsx)(k.a,{color:"secondary",children:"Hide"})]}),Object(y.jsxs)(T.a,{display:"flex",flexDirection:"column",alignItems:"center",marginX:2,minWidth:"max-content",children:[Object(y.jsx)(V.a,{sx:{ml:1},onClick:d.toggleColorMode,"aria-label":"enable/disable dark mode",children:"dark"===i.palette.mode?Object(y.jsx)(w.a,{color:"secondary"}):Object(y.jsx)(F.a,{color:"secondary"})}),Object(y.jsxs)(k.a,{color:"secondary",textTransform:"capitalize",children:[i.palette.mode," mode"]})]}),Object(y.jsx)(U,{}),Object(y.jsx)(V.a,{"aria-label":"mute video sound",onClick:function(){1===r&&c(!1),o(1===r?0:1)},children:1===r?Object(y.jsx)(E.a,{color:"secondary"}):Object(y.jsx)(P.a,{color:"secondary"})})]}),Object(y.jsx)(q,{}),Object(y.jsxs)(T.a,{sx:{display:"flex",alignItems:"center"},children:[Object(y.jsx)(V.a,{"aria-label":"play/pause radio",onClick:function(){return c(!t)},children:t?Object(y.jsx)(R.a,{color:"secondary"}):Object(y.jsx)(X.a,{color:"secondary"})}),Object(y.jsx)(N,{}),Object(y.jsx)(ee,{})]})]})}):Object(y.jsx)(T.a,{sx:{position:"absolute",bottom:0,left:0,marginLeft:6,marginBottom:3},children:Object(y.jsx)(V.a,{"aria-label":"open controls bar",onClick:function(){return a(!0)},sx:{backgroundColor:"#ffffff40"},children:Object(y.jsx)(M.a,{})})})},ae=a(168),ne=a(37),ce=a(69),re=a(175),oe=Object(n.createContext)({toggleColorMode:function(){}}),ie=function(){var e=Object(n.useState)("light"),t=Object(i.a)(e,2),a=t[0],c=t[1],r=Object(n.useMemo)((function(){return{toggleColorMode:function(){c((function(e){return"light"===e?"dark":"light"}))}}}),[]),o=Object(n.useMemo)((function(){return Object(ce.a)({palette:{mode:a,primary:{main:ae.a[700]},secondary:{main:ne.a[900]},text:{primary:ne.a[900]}}})}),[a]);return Object(y.jsx)(oe.Provider,{value:r,children:Object(y.jsx)(re.a,{theme:o,children:Object(y.jsx)(l.a,{children:Object(y.jsxs)(W.a,{sx:{height:"100vh",display:"flex"},children:[Object(y.jsx)(C,{}),Object(y.jsx)(te,{}),Object(y.jsx)(S,{})]})})})})},le=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,182)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,o=t.getTTFB;a(e),n(e),c(e),r(e),o(e)}))};o.a.render(Object(y.jsx)(c.a.StrictMode,{children:Object(y.jsx)(ie,{})}),document.getElementById("root")),le()},90:function(e,t,a){}},[[112,1,2]]]);
//# sourceMappingURL=main.99d5518a.chunk.js.map
(this.webpackJsonpjwflix=this.webpackJsonpjwflix||[]).push([[0],{125:function(n,e,t){"use strict";t.r(e);var i=t(11),r=t(99),c=t(10),o=t(54),a=t(13);var l=function(){return null},s=t(5),d=t(60);function h(){return fetch("".concat("https://api.themoviedb.org/3","/movie/now_playing?api_key=").concat("4bc5f53a3e7b9a35ef5fbd55f9f2b964")).then((function(n){return n.json()}))}function b(n,e){return"https://image.tmdb.org/t/p/".concat(e||"original","/").concat(n)}var j,u,p,x,g,v,f,O,m,w,y,k,z=t(128),S=t(129),q=t(0),L=t.n(q),C=t(3),M=c.c.div(j||(j=Object(i.a)(["\n  background: black;\n  height: 200vh;\n"]))),H=c.c.div(u||(u=Object(i.a)(["\n  height: 20vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]))),E=c.c.div(p||(p=Object(i.a)(["\n  height: 100vh;\n  background-color: red;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 60px;\n  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)),\n    url(",");\n  background-size: cover;\n"])),(function(n){return n.bgPhoto})),P=c.c.h2(x||(x=Object(i.a)(["\n  font-size: 50px;\n"]))),F=c.c.p(g||(g=Object(i.a)(["\n  font-size: 20px;\n  width: 50%;\n  margin-top: 20px;\n"]))),B=Object(c.c)(z.a.div)(v||(v=Object(i.a)(["\n  position: relative;\n  bottom: 170px;\n  display: flex;\n  flex-direction: column;\n"]))),I=Object(c.c)(z.a.div)(f||(f=Object(i.a)(["\n  display: grid;\n  gap: 5px;\n  grid-template-columns: repeat(5, 1fr);\n  position: absolute;\n  width: 100%;\n  padding-left: 20px;\n"]))),_=Object(c.c)(z.a.div)(O||(O=Object(i.a)(["\n  background-color: white;\n  height: 200px;\n  &:first-child {\n    transform-origin: center left;\n  }\n  &:last-child {\n    transform-origin: center right;\n  }\n  img {\n    width: 100%;\n    height: 200px;\n  }\n"]))),Q=Object(c.c)(z.a.div)(m||(m=Object(i.a)(["\n  position: absolute;\n  right: 0;\n  width: 50px;\n  height: 200px;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  cursor: pointer;\n  z-index: 1;\n"]))),T=Object(c.c)(z.a.svg)(w||(w=Object(i.a)(["\n  width: 20px;\n"]))),J={hidden:{x:window.outerWidth+10},visible:{x:0},exit:{x:-window.outerWidth-10}},R={normal:{scale:1},hover:{scale:1.3,y:-90,transition:{delay:.5,duaration:.1,type:"tween"}}},W={hover:{opacity:1,transition:{delay:.5,duaration:.1,type:"tween"}}},X=Object(c.c)(z.a.h5)(y||(y=Object(i.a)(["\n  position: absolute;\n  bottom: 0px;\n  color: ",";\n  font-weight: 800;\n"])),(function(n){return n.theme.white.darker})),A={hover:{opacity:0,transition:{delay:.5,duration:0}}},D=Object(c.c)(z.a.div)(k||(k=Object(i.a)(["\n  padding: 10px;\n  background-color: rgba(0, 0, 0, 0.8);\n  opacity: 0;\n  width: 100%;\n  position: relative;\n  bottom: 5px;\n  h4 {\n    text-align: center;\n    font-size: 15px;\n  }\n"])));var N=function(){var n=Object(d.useQuery)(["movies","nowPlaying"],h),e=n.data,t=n.isLoading,i=Object(q.useState)(!1),r=Object(s.a)(i,2),c=r[0],o=r[1],a=function(){o((function(n){return!n}))},l=Object(q.useState)(0),j=Object(s.a)(l,2),u=j[0],p=j[1];return Object(C.jsx)(M,{children:t?Object(C.jsx)(H,{children:"Loading..."}):Object(C.jsxs)(C.Fragment,{children:[Object(C.jsxs)(E,{bgPhoto:b((null===e||void 0===e?void 0:e.results[0].backdrop_path)||""),children:[Object(C.jsx)(P,{children:null===e||void 0===e?void 0:e.results[0].title}),Object(C.jsx)(F,{children:null===e||void 0===e?void 0:e.results[0].overview})]}),Object(C.jsxs)(B,{onHoverStart:a,onHoverEnd:a,children:[Object(C.jsx)(S.a,{initial:!1,children:Object(C.jsx)(I,{variants:J,initial:"hidden",animate:"visible",exit:"exit",transition:{type:"tween",duration:1},children:null===e||void 0===e?void 0:e.results.slice(1).slice(5*u,5*u+5).map((function(n){return Object(C.jsxs)(_,{whileHover:"hover",initial:"normal",variants:R,transition:{type:"tween"},children:[Object(C.jsx)(z.a.img,{src:b(n.backdrop_path,"w500"),style:{objectFit:"cover"}}),Object(C.jsx)(X,{variants:A,children:n.title}),Object(C.jsx)(D,{variants:W,children:Object(C.jsx)("h4",{children:n.title})})]},n.id)}))},u)}),!0===c?Object(C.jsx)(Q,{children:Object(C.jsx)(T,{onClick:function(){if(e){var n=(null===e||void 0===e?void 0:e.results.length)-1,t=Math.floor(n/5)-1;p((function(n){return n===t?0:n+1}))}},layoutId:"rowbtn","aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"chevron-right",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 320 512",className:"svg-inline--fa fa-chevron-right fa-w-10 fa-3x",children:Object(C.jsx)("path",{fill:"white",d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"})})}):null]})]})})};var Y,G,K,U,V,Z,$,nn,en=function(){return null},tn=t(130),rn=t(131),cn=Object(c.c)(z.a.nav)(Y||(Y=Object(i.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: fixed;\n  width: 100%;\n  top: 0;\n  background-color: black;\n  font-size: 14px;\n  padding: 20px 60px;\n  color: white;\n"]))),on=c.c.div(G||(G=Object(i.a)(["\n  display: flex;\n  align-items: center;\n"]))),an=Object(c.c)(z.a.svg)(K||(K=Object(i.a)(["\n  margin-right: 50px;\n  width: 95px;\n  height: 25px;\n  fill: #d81f26;\n\n  path {\n    stroke-width: 4px;\n    stroke: white;\n  }\n"]))),ln=c.c.ul(U||(U=Object(i.a)(["\n  display: flex;\n  align-items: center;\n"]))),sn=c.c.li(V||(V=Object(i.a)(["\n  margin-right: 20px;\n  color: ",";\n  transition: color 0.3s ease-in-out;\n  position: relative;\n  &:hover {\n    color: ",";\n  }\n"])),(function(n){return n.theme.white.darker}),(function(n){return n.theme.white.lighter})),dn=c.c.span(Z||(Z=Object(i.a)(["\n  position: relative;\n  color: white;\n  display: flex;\n  align-items: center;\n  svg {\n    height: 25px;\n  }\n"]))),hn=Object(c.c)(z.a.input)($||($=Object(i.a)(["\n  position: absolute;\n  left: -180px;\n  transform-origin: right;\n  padding: 5px 10px;\n  padding-left: 40px;\n  z-index: -1;\n  background-color: transparent;\n  color: white;\n  font-weight: 700;\n  border: 1px solid ",";\n"])),(function(n){return n.theme.white.lighter})),bn=Object(c.c)(z.a.div)(nn||(nn=Object(i.a)(["\n  height: 5px;\n  width: 5px;\n  border-radius: 5px;\n  background-color: #d81f26;\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin: 0 auto;\n  bottom: -10px;\n"]))),jn={start:{pathLength:0,fill:"rgba(0,0,0,0)"},end:{pathLength:1,fill:"#d81f26"},hover:{stroke:"10px"}},un={top:{backgroundColor:"rgba(0,0,0,0)"},scroll:{backgroundColor:"black"}};var pn=function(){var n=Object(a.f)("/"),e=Object(a.f)("/tv"),t=Object(q.useState)(!1),i=Object(s.a)(t,2),r=i[0],c=i[1],l=Object(tn.a)(),d=Object(rn.a)().scrollY;return Object(q.useEffect)((function(){d.onChange((function(){d.get()>95?l.start("scroll"):l.start("top")}))})),Object(C.jsxs)(cn,{variants:un,animate:l,initial:"top",children:[Object(C.jsxs)(on,{children:[Object(C.jsx)(o.b,{to:"/",children:Object(C.jsx)(an,{xmlns:"http://www.w3.org/2000/svg",width:"1024",height:"276.742",viewBox:"0 0 1024 276.742",whileHover:{fillOpacity:.8},animate:{fillOpacity:1},children:Object(C.jsx)(z.a.path,{initial:"start",animate:"end",transition:{duration:3},variants:jn,d:"M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"})})}),Object(C.jsxs)(ln,{children:[Object(C.jsx)(sn,{children:Object(C.jsxs)(o.b,{to:"/tv",children:["Tv Shows",!0===(null===e||void 0===e?void 0:e.isExact)?Object(C.jsx)(bn,{layoutId:"circle"}):null]})}),Object(C.jsx)(sn,{children:Object(C.jsxs)(o.b,{to:"/",children:["Home",!0===(null===n||void 0===n?void 0:n.isExact)?Object(C.jsx)(bn,{layoutId:"circle"}):null]})})]})]}),Object(C.jsx)(on,{children:Object(C.jsxs)(dn,{children:[Object(C.jsx)(z.a.svg,{style:{cursor:"pointer"},onClick:function(){return c((function(n){return!n}))},animate:{x:r?-180:0},transition:{type:"linear"},fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:Object(C.jsx)("path",{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"})}),Object(C.jsx)(hn,{placeholder:"Search here!",initial:{scaleX:0},animate:{scaleX:r?1:0},transition:{type:"linear"}})]})})]})};var xn,gn=function(){return Object(C.jsxs)(o.a,{children:[Object(C.jsx)(pn,{}),Object(C.jsxs)(a.c,{children:[Object(C.jsx)(a.a,{path:"/",children:Object(C.jsx)(N,{})}),Object(C.jsx)(a.a,{path:"/tv",children:Object(C.jsx)(l,{})}),Object(C.jsx)(a.a,{path:"/search",children:Object(C.jsx)(en,{})})]})]})},vn=t(47),fn=t.n(vn),On=Object(c.b)(xn||(xn=Object(i.a)(["\n@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, menu, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmain, menu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, main, menu, nav, section {\n  display: block;\n}\n/* HTML5 hidden-attribute fix for newer browsers */\n*[hidden] {\n    display: none;\n}\nbody {\n  line-height: 1;\n}\nmenu, ol, ul {\n  list-style: none;\n}\nblockquote, q {\n  quotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n* {\n  box-sizing: border-box;\n}\nbody {\n  font-weight: 300;\n  font-family: 'Source Sans Pro', sans-serif;\n  color:",";\n  line-height: 1.2;\n  \n}\na {\n  text-decoration:none;\n  color:inherit;\n}\n"])),(function(n){return n.theme.white.darker})),mn=new d.QueryClient;fn.a.render(Object(C.jsx)(L.a.StrictMode,{children:Object(C.jsx)(r.a,{children:Object(C.jsx)(d.QueryClientProvider,{client:mn,children:Object(C.jsxs)(c.a,{theme:{red:"#E51013",black:{veryDark:"#141414",darker:"#181818",lighter:"#2F2F2F"},white:{lighter:"#fff",darker:"#e5e5e5"}},children:[Object(C.jsx)(On,{}),Object(C.jsx)(gn,{})]})})})}),document.getElementById("root"))}},[[125,1,2]]]);
//# sourceMappingURL=main.271b4a21.chunk.js.map
"use strict";(()=>{var e={};e.id=44,e.ids=[44,660],e.modules={9464:(e,r,t)=>{t.a(e,async(e,s)=>{try{t.r(r),t.d(r,{config:()=>h,default:()=>f,getServerSideProps:()=>m,getStaticPaths:()=>g,getStaticProps:()=>x,reportWebVitals:()=>b,routeModule:()=>q,unstable_getServerProps:()=>v,unstable_getServerSideProps:()=>j,unstable_getStaticParams:()=>w,unstable_getStaticPaths:()=>$,unstable_getStaticProps:()=>y});var i=t(7093),o=t(5244),n=t(1323),a=t(5290),l=t.n(a),c=t(3802),p=t.n(c),u=t(667),d=e([u]);u=(d.then?(await d)():d)[0];let f=(0,n.l)(u,"default"),x=(0,n.l)(u,"getStaticProps"),g=(0,n.l)(u,"getStaticPaths"),m=(0,n.l)(u,"getServerSideProps"),h=(0,n.l)(u,"config"),b=(0,n.l)(u,"reportWebVitals"),y=(0,n.l)(u,"unstable_getStaticProps"),$=(0,n.l)(u,"unstable_getStaticPaths"),w=(0,n.l)(u,"unstable_getStaticParams"),v=(0,n.l)(u,"unstable_getServerProps"),j=(0,n.l)(u,"unstable_getServerSideProps"),q=new i.PagesRouteModule({definition:{kind:o.x.PAGES,page:"/Auth/signin",pathname:"/Auth/signin",bundlePath:"",filename:""},components:{App:p(),Document:l()},userland:u});s()}catch(e){s(e)}})},563:(e,r,t)=>{t.d(r,{Z:()=>s});let s=(0,t(6689).createContext)({})},8235:(e,r,t)=>{t.d(r,{Z:()=>d});var s=t(6689),i=t(9003),o=t.n(i),n=t(7399),a=t(563),l=t(4916),c=function(e,r){var t={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&0>r.indexOf(s)&&(t[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,s=Object.getOwnPropertySymbols(e);i<s.length;i++)0>r.indexOf(s[i])&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(t[s[i]]=e[s[i]]);return t};function p(e){return"number"==typeof e?`${e} ${e} auto`:/^\d+(\.\d+)?(px|em|rem|%)$/.test(e)?`0 0 ${e}`:e}let u=["xs","sm","md","lg","xl","xxl"],d=s.forwardRef((e,r)=>{let{getPrefixCls:t,direction:i}=s.useContext(n.E_),{gutter:d,wrap:f}=s.useContext(a.Z),{prefixCls:x,span:g,order:m,offset:h,push:b,pull:y,className:$,children:w,flex:v,style:j}=e,q=c(e,["prefixCls","span","order","offset","push","pull","className","children","flex","style"]),C=t("col",x),[S,O,P]=(0,l.cG)(C),k={},I={};u.forEach(r=>{let t={},s=e[r];"number"==typeof s?t.span=s:"object"==typeof s&&(t=s||{}),delete q[r],I=Object.assign(Object.assign({},I),{[`${C}-${r}-${t.span}`]:void 0!==t.span,[`${C}-${r}-order-${t.order}`]:t.order||0===t.order,[`${C}-${r}-offset-${t.offset}`]:t.offset||0===t.offset,[`${C}-${r}-push-${t.push}`]:t.push||0===t.push,[`${C}-${r}-pull-${t.pull}`]:t.pull||0===t.pull,[`${C}-rtl`]:"rtl"===i}),t.flex&&(I[`${C}-${r}-flex`]=!0,k[`--${C}-${r}-flex`]=p(t.flex))});let E=o()(C,{[`${C}-${g}`]:void 0!==g,[`${C}-order-${m}`]:m,[`${C}-offset-${h}`]:h,[`${C}-push-${b}`]:b,[`${C}-pull-${y}`]:y},$,I,O,P),D={};if(d&&d[0]>0){let e=d[0]/2;D.paddingLeft=e,D.paddingRight=e}return v&&(D.flex=p(v),!1!==f||D.minWidth||(D.minWidth=0)),S(s.createElement("div",Object.assign({},q,{style:Object.assign(Object.assign(Object.assign({},D),j),k),className:E,ref:r}),w))})},9338:(e,r,t)=>{t.d(r,{Z:()=>d});var s=t(6689),i=t(9003),o=t.n(i),n=t(8153),a=t(7399),l=t(563),c=t(4916),p=function(e,r){var t={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&0>r.indexOf(s)&&(t[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,s=Object.getOwnPropertySymbols(e);i<s.length;i++)0>r.indexOf(s[i])&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(t[s[i]]=e[s[i]]);return t};function u(e,r){let[t,i]=s.useState("string"==typeof e?e:""),o=()=>{if("string"==typeof e&&i(e),"object"==typeof e)for(let t=0;t<n.c4.length;t++){let s=n.c4[t];if(!r[s])continue;let o=e[s];if(void 0!==o){i(o);return}}};return s.useEffect(()=>{o()},[JSON.stringify(e),r]),t}let d=s.forwardRef((e,r)=>{let{prefixCls:t,justify:i,align:d,className:f,style:x,children:g,gutter:m=0,wrap:h}=e,b=p(e,["prefixCls","justify","align","className","style","children","gutter","wrap"]),{getPrefixCls:y,direction:$}=s.useContext(a.E_),[w,v]=s.useState({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),[j,q]=s.useState({xs:!1,sm:!1,md:!1,lg:!1,xl:!1,xxl:!1}),C=u(d,j),S=u(i,j),O=s.useRef(m),P=(0,n.ZP)();s.useEffect(()=>{let e=P.subscribe(e=>{q(e);let r=O.current||0;(!Array.isArray(r)&&"object"==typeof r||Array.isArray(r)&&("object"==typeof r[0]||"object"==typeof r[1]))&&v(e)});return()=>P.unsubscribe(e)},[]);let k=y("row",t),[I,E,D]=(0,c.VM)(k),N=(()=>{let e=[void 0,void 0];return(Array.isArray(m)?m:[m,void 0]).forEach((r,t)=>{if("object"==typeof r)for(let s=0;s<n.c4.length;s++){let i=n.c4[s];if(w[i]&&void 0!==r[i]){e[t]=r[i];break}}else e[t]=r}),e})(),A=o()(k,{[`${k}-no-wrap`]:!1===h,[`${k}-${S}`]:S,[`${k}-${C}`]:C,[`${k}-rtl`]:"rtl"===$},f,E,D),Z={},M=null!=N[0]&&N[0]>0?-(N[0]/2):void 0;M&&(Z.marginLeft=M,Z.marginRight=M);let[L,_]=N;Z.rowGap=_;let F=s.useMemo(()=>({gutter:[L,_],wrap:h}),[L,_,h]);return I(s.createElement(l.Z.Provider,{value:F},s.createElement("div",Object.assign({},b,{className:A,style:Object.assign(Object.assign({},Z),x),ref:r}),g)))})},4916:(e,r,t)=>{t.d(r,{VM:()=>p,cG:()=>u});var s=t(2727),i=t(2317),o=t(45);let n=e=>{let{componentCls:r}=e;return{[r]:{position:"relative",maxWidth:"100%",minHeight:1}}},a=(e,r)=>{let{prefixCls:t,componentCls:s,gridColumns:i}=e,o={};for(let e=i;e>=0;e--)0===e?(o[`${s}${r}-${e}`]={display:"none"},o[`${s}-push-${e}`]={insetInlineStart:"auto"},o[`${s}-pull-${e}`]={insetInlineEnd:"auto"},o[`${s}${r}-push-${e}`]={insetInlineStart:"auto"},o[`${s}${r}-pull-${e}`]={insetInlineEnd:"auto"},o[`${s}${r}-offset-${e}`]={marginInlineStart:0},o[`${s}${r}-order-${e}`]={order:0}):(o[`${s}${r}-${e}`]=[{"--ant-display":"block",display:"block"},{display:"var(--ant-display)",flex:`0 0 ${e/i*100}%`,maxWidth:`${e/i*100}%`}],o[`${s}${r}-push-${e}`]={insetInlineStart:`${e/i*100}%`},o[`${s}${r}-pull-${e}`]={insetInlineEnd:`${e/i*100}%`},o[`${s}${r}-offset-${e}`]={marginInlineStart:`${e/i*100}%`},o[`${s}${r}-order-${e}`]={order:e});return o[`${s}${r}-flex`]={flex:`var(--${t}${r}-flex)`},o},l=(e,r)=>a(e,r),c=(e,r,t)=>({[`@media (min-width: ${(0,s.unit)(r)})`]:Object.assign({},l(e,t))}),p=(0,i.I$)("Grid",e=>{let{componentCls:r}=e;return{[r]:{display:"flex",flexFlow:"row wrap",minWidth:0,"&::before, &::after":{display:"flex"},"&-no-wrap":{flexWrap:"nowrap"},"&-start":{justifyContent:"flex-start"},"&-center":{justifyContent:"center"},"&-end":{justifyContent:"flex-end"},"&-space-between":{justifyContent:"space-between"},"&-space-around":{justifyContent:"space-around"},"&-space-evenly":{justifyContent:"space-evenly"},"&-top":{alignItems:"flex-start"},"&-middle":{alignItems:"center"},"&-bottom":{alignItems:"flex-end"}}}},()=>({})),u=(0,i.I$)("Grid",e=>{let r=(0,o.mergeToken)(e,{gridColumns:24}),t={"-sm":r.screenSMMin,"-md":r.screenMDMin,"-lg":r.screenLGMin,"-xl":r.screenXLMin,"-xxl":r.screenXXLMin};return[n(r),l(r,""),l(r,"-xs"),Object.keys(t).map(e=>c(r,t[e],e)).reduce((e,r)=>Object.assign(Object.assign({},e),r),{})]},()=>({}))},16:(e,r,t)=>{t.a(e,async(e,s)=>{try{t.d(r,{V:()=>c}),t(997);var i=t(401),o=t(6689),n=t(4205),a=t(1492);t(3308);var l=e([i,n,a]);[i,n,a]=l.then?(await l)():l;let c=(0,o.createContext)();s()}catch(e){s(e)}})},667:(e,r,t)=>{t.a(e,async(e,s)=>{try{t.r(r),t.d(r,{default:()=>g});var i=t(997),o=t(6689),n=t(6939),a=t(827),l=t(8993),c=t(6723),p=t(401),u=t(4205),d=t(3308),f=t(16),x=e([p,u,f,a]);[p,u,f,a]=x.then?(await x)():x;let g=()=>{let e=(0,d.useNavigate)(),{user:r}=(0,o.useContext)(f.V),[t,s]=(0,o.useState)(!1),x=async e=>{s(!0);try{await (0,p.signInWithEmailAndPassword)(u.I,e.email,e.password),console.log("Login successful"),n.ZP.success("Login successful!")}catch(e){console.error("Login failed:",e),n.ZP.error("Login failed: "+e.message)}finally{s(!1)}};(0,o.useEffect)(()=>{r.isLogin&&("admin"===r.role?e("/admin/users"):"counteruser"===r.role?e("/counteruser"):e("/"))},[r,e]);let g=e=>{navigator.clipboard.writeText(e).then(()=>{n.ZP.success("Copied to clipboard!")}).catch(e=>{n.ZP.error("Failed to copy: "+e)})};return(0,i.jsxs)("div",{className:"sign-in-container",children:[i.jsx("style",{children:`
          .sign-in-container {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            background-color: #080710;
          }

          .background {
            width: 100%;
            height: 100%;
            position: absolute;
            overflow: hidden;
          }

          .shape {
            height: 30vw;
            width: 30vw;
            position: absolute;
            border-radius: 50%;
          }

          .shape:first-child {
            background: linear-gradient(#1845ad, #23a2f6);
            left: -15vw;
            top: -15vw;
          }

          .shape:last-child {
            background: linear-gradient(to right, #ff512f, #f09819);
            right: -10vw;
            bottom: -15vw;
          }

          .login-form {
            max-width: 400px;
            width: 90%;
            background-color: rgba(255, 255, 255, 0.15);
            position: relative;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
            padding: 50px 35px;
            z-index: 1;
            color: #fff;
          }

          .login-form h3 {
            font-size: 2rem;
            font-weight: 500;
            line-height: 42px;
            text-align: center;
            color: #ffffff;
          }

          .ant-form-item-label > label {
            color: white;
            font-weight: bold;
          }

          .ant-input {
            color: orange;
            border-color: orange;
          }

          .ant-input:focus {
            border-color: orange;
            box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.5);
          }

          .ant-input-password {
            color: orange;
            border-color: orange;
          }

          .ant-input-password:focus {
            border-color: orange;
            box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.5);
          }

          .info-div {
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: rgba(255, 255, 255, 0.1);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
          }

          .info-div h4 {
            margin-bottom: 10px;
          }

          .copy-icon {
            cursor: pointer;
            margin-left: 5px;
            color: orange;
          }

          .social {
            margin-top: 30px;
            display: flex;
            justify-content: center;
          }

          .social div {
            background-color: rgba(255, 255, 255, 0.27);
            color: #eaf0fb;
            text-align: center;
            border-radius: 3px;
            padding: 5px 10px;
            margin: 0 10px;
            cursor: pointer;
          }

          .social div:hover {
            background-color: rgba(255, 255, 255, 0.47);
          }

          .social i {
            margin-right: 4px;
          }

          @media (max-width: 768px) {
            .shape {
              height: 40vw;
              width: 40vw;
            }

            .login-form {
              padding: 30px 20px;
            }

            .login-form h3 {
              font-size: 1.5rem;
            }
          }

          @media (max-width: 480px) {
            .shape {
              height: 50vw;
              width: 50vw;
            }

            .login-form {
              max-width: 90%;
            }

            .login-form h3 {
              font-size: 1.25rem;
            }
          }
        `}),(0,i.jsxs)("div",{className:"background",children:[i.jsx("div",{className:"shape"}),i.jsx("div",{className:"shape"})]}),(0,i.jsxs)("div",{className:"info-div",children:[i.jsx("h4",{children:"Admin Credentials"}),(0,i.jsxs)("p",{children:["Email: owner@pos.com ",i.jsx("span",{className:"copy-icon",onClick:()=>g("owner@pos.com"),children:"\uD83D\uDCCB"})]}),(0,i.jsxs)("p",{children:["Password: 123456789 ",i.jsx("span",{className:"copy-icon",onClick:()=>g("123456789"),children:"\uD83D\uDCCB"})]}),i.jsx("h4",{children:"Local User Credentials"}),(0,i.jsxs)("p",{children:["Email: test@pos.com ",i.jsx("span",{className:"copy-icon",onClick:()=>g("test@pos.com"),children:"\uD83D\uDCCB"})]}),(0,i.jsxs)("p",{children:["Password: test123 ",i.jsx("span",{className:"copy-icon",onClick:()=>g("test123"),children:"\uD83D\uDCCB"})]})]}),(0,i.jsxs)(a.Z,{name:"basic",className:"login-form",labelCol:{span:24},wrapperCol:{span:24},initialValues:{remember:!0},onFinish:x,onFinishFailed:e=>{console.log("Failed:",e)},autoComplete:"off",children:[i.jsx("h3",{children:"POS Login"}),i.jsx(a.Z.Item,{label:"Email",name:"email",rules:[{required:!0,message:"Please input your email!"}],children:i.jsx(l.Z,{placeholder:"Email"})}),i.jsx(a.Z.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}],children:i.jsx(l.Z.Password,{placeholder:"Password"})}),i.jsx(a.Z.Item,{wrapperCol:{offset:0,span:24},children:i.jsx(c.ZP,{type:"primary",htmlType:"submit",className:"w-full",loading:t,children:"Log In"})})]})]})};s()}catch(e){s(e)}})},4053:e=>{e.exports=require("@ant-design/colors")},2727:e=>{e.exports=require("@ant-design/cssinjs")},45:e=>{e.exports=require("@ant-design/cssinjs-utils")},8333:e=>{e.exports=require("@ant-design/icons/es/components/Context")},4405:e=>{e.exports=require("@ant-design/icons/es/icons/CheckCircleFilled")},8815:e=>{e.exports=require("@ant-design/icons/es/icons/CloseCircleFilled")},8737:e=>{e.exports=require("@ant-design/icons/es/icons/CloseOutlined")},5818:e=>{e.exports=require("@ant-design/icons/es/icons/ExclamationCircleFilled")},9825:e=>{e.exports=require("@ant-design/icons/es/icons/EyeInvisibleOutlined")},2488:e=>{e.exports=require("@ant-design/icons/es/icons/EyeOutlined")},6938:e=>{e.exports=require("@ant-design/icons/es/icons/InfoCircleFilled")},7811:e=>{e.exports=require("@ant-design/icons/es/icons/LoadingOutlined")},4867:e=>{e.exports=require("@ant-design/icons/es/icons/QuestionCircleOutlined")},3955:e=>{e.exports=require("@ant-design/icons/es/icons/SearchOutlined")},566:e=>{e.exports=require("@ctrl/tinycolor")},8810:e=>{e.exports=require("@rc-component/color-picker")},9003:e=>{e.exports=require("classnames")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},7118:e=>{e.exports=require("rc-field-form")},4326:e=>{e.exports=require("rc-input")},4290:e=>{e.exports=require("rc-motion")},8858:e=>{e.exports=require("rc-notification")},3853:e=>{e.exports=require("rc-pagination/es/locale/en_US")},2815:e=>{e.exports=require("rc-picker/es/locale/en_US")},8880:e=>{e.exports=require("rc-textarea")},3283:e=>{e.exports=require("rc-tooltip")},1601:e=>{e.exports=require("rc-util")},4248:e=>{e.exports=require("rc-util/es/Children/toArray")},3164:e=>{e.exports=require("rc-util/es/Dom/canUseDom")},943:e=>{e.exports=require("rc-util/es/Dom/dynamicCSS")},9826:e=>{e.exports=require("rc-util/es/Dom/findDOMNode")},2947:e=>{e.exports=require("rc-util/es/Dom/isVisible")},3050:e=>{e.exports=require("rc-util/es/React/render")},1423:e=>{e.exports=require("rc-util/es/hooks/useLayoutEffect")},4187:e=>{e.exports=require("rc-util/es/hooks/useMemo")},5092:e=>{e.exports=require("rc-util/es/hooks/useMergedState")},3187:e=>{e.exports=require("rc-util/es/hooks/useState")},2462:e=>{e.exports=require("rc-util/es/isEqual")},5514:e=>{e.exports=require("rc-util/es/omit")},2724:e=>{e.exports=require("rc-util/es/pickAttrs")},340:e=>{e.exports=require("rc-util/es/raf")},5927:e=>{e.exports=require("rc-util/es/ref")},9528:e=>{e.exports=require("rc-util/es/utils/set")},3966:e=>{e.exports=require("rc-util/es/warning")},6689:e=>{e.exports=require("react")},3308:e=>{e.exports=require("react-router")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")},3745:e=>{e.exports=import("firebase/app")},401:e=>{e.exports=import("firebase/auth")},1492:e=>{e.exports=import("firebase/firestore")},8751:e=>{e.exports=import("scroll-into-view-if-needed")},4205:(e,r,t)=>{t.a(e,async(e,s)=>{try{t.d(r,{I:()=>c,db:()=>p});var i=t(3745),o=t(401),n=t(1492),a=e([i,o,n]);[i,o,n]=a.then?(await a)():a;let l=(0,i.initializeApp)({apiKey:"AIzaSyCuQ3wNmtDNAZMhZe9MRjpTn1kAvDp4SOA",authDomain:"point-of-sale-8a42d.firebaseapp.com",projectId:"point-of-sale-8a42d",storageBucket:"point-of-sale-8a42d.appspot.com",messagingSenderId:"283428202868",appId:"1:283428202868:web:0c99ca55251c4294136421",measurementId:"G-Q0928NKHEQ"}),c=(0,o.getAuth)(l),p=(0,n.getFirestore)(l);s()}catch(e){s(e)}})}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[290,931,853,993,2],()=>t(9464));module.exports=s})();
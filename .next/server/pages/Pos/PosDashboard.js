"use strict";(()=>{var e={};e.id=135,e.ids=[135,660],e.modules={4891:(e,r,t)=>{t.a(e,async(e,s)=>{try{t.r(r),t.d(r,{config:()=>f,default:()=>x,getServerSideProps:()=>h,getStaticPaths:()=>m,getStaticProps:()=>g,reportWebVitals:()=>q,routeModule:()=>k,unstable_getServerProps:()=>v,unstable_getServerSideProps:()=>S,unstable_getStaticParams:()=>j,unstable_getStaticPaths:()=>y,unstable_getStaticProps:()=>b});var i=t(7093),o=t(5244),n=t(1323),a=t(5290),c=t.n(a),u=t(3802),l=t.n(u),d=t(8452),p=e([d]);d=(p.then?(await p)():p)[0];let x=(0,n.l)(d,"default"),g=(0,n.l)(d,"getStaticProps"),m=(0,n.l)(d,"getStaticPaths"),h=(0,n.l)(d,"getServerSideProps"),f=(0,n.l)(d,"config"),q=(0,n.l)(d,"reportWebVitals"),b=(0,n.l)(d,"unstable_getStaticProps"),y=(0,n.l)(d,"unstable_getStaticPaths"),j=(0,n.l)(d,"unstable_getStaticParams"),v=(0,n.l)(d,"unstable_getServerProps"),S=(0,n.l)(d,"unstable_getServerSideProps"),k=new i.PagesRouteModule({definition:{kind:o.x.PAGES,page:"/Pos/PosDashboard",pathname:"/Pos/PosDashboard",bundlePath:"",filename:""},components:{App:l(),Document:c()},userland:d});s()}catch(e){s(e)}})},8452:(e,r,t)=>{t.a(e,async(e,s)=>{try{t.r(r),t.d(r,{default:()=>Z});var i=t(997);t(6689);var o=t(6877),n=t(5166),a=t(253),c=t(7899),u=t(506),l=t(5965),d=t(6791),p=t(6939),x=t(8025),g=t(6723),m=t(876),h=t(6954),f=t(4661),q=t(401),b=t(4205),y=e([q,b]);[q,b]=y.then?(await y)():y;let{Header:j,Content:v,Footer:S,Sider:k}=u.default,{Text:P}=l.default,C=[{key:"/counteruser/poscountersale",icon:i.jsx(o.Z,{}),label:"Transactions",children:[{key:"/counteruser/poscountersale",label:"Counter Sale"},{key:"/counteruser/posreturn",label:"Counter Return Sale"}]}],Z=()=>{let e=(0,f.useNavigate)(),r=(0,f.useLocation)(),{token:t}=d.Z.useToken(),s=async()=>{try{await (0,q.signOut)(b.I),p.ZP.success("Logged out successfully"),e("/signin")}catch(e){p.ZP.error("Failed to log out")}},o=(0,i.jsxs)(x.Z,{children:[i.jsx(x.Z.Item,{children:"Profile"},"profile"),i.jsx(x.Z.Item,{children:"Settings"},"settings"),i.jsx(x.Z.Divider,{}),i.jsx(x.Z.Item,{onClick:s,icon:i.jsx(n.Z,{}),children:"Logout"},"logout")]});return(0,i.jsxs)(u.default,{style:{minHeight:"100vh",overflow:"hidden"},children:[i.jsx("style",{children:`
          .sidebar {
            background: #001529;
            overflow: hidden; /* Ensure no scrollbar on sidebar */
          }

          .menu .ant-menu-item {
            color: #fff;
          }

          .menu .ant-menu-item:hover {
            background: rgba(255, 255, 255, 0.2);
            color: #fca311;
          }

          .menu .ant-menu-item-selected {
            background: rgba(255, 255, 255, 0.2);
            color: #fca311;
          }

          .menu .ant-menu-submenu {
            background: #001529;
          }

          .menu .ant-menu-submenu-title {
            color: #fff;
          }

          .menu .ant-menu-submenu-title:hover {
            background: rgba(255, 255, 255, 0.2);
            color: #fca311;
          }

          .user-button {
            margin-left: 16px;
          }

          .user-button .ant-avatar {
            background: #fca311;
          }

          .user-button .ant-typography {
            color: #fff;
          }

          .ant-layout-footer {
            background: #001529;
            color: #fff;
          }

          .refresh-button {
            margin-right: 16px;
            color: #fca311;
          }

          .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
          }

          .content {
            padding: 24px;
            background: ${t.colorBgContainer};
            border-radius: ${t.borderRadiusLG};
            overflow-y: auto; /* Allow inner scrolling */
            height: calc(100vh - 64px - 50px); /* Adjust height to avoid footer and header */
          }

          @media (max-width: 768px) {
            .sidebar {
              width: 200px; /* Adjust for smaller screens */
            }
          }
        `}),i.jsx(j,{children:(0,i.jsxs)("div",{className:"header-content",children:[i.jsx("img",{style:{height:"60px"},src:"https://img.icons8.com/?size=160&id=I2iJf1544eWE&format=png",alt:"Logo",className:"logo"}),(0,i.jsxs)("div",{children:[i.jsx(g.ZP,{type:"text",className:"refresh-button",icon:i.jsx(a.Z,{}),onClick:()=>{p.ZP.success("Data refreshed!")},title:"Refresh Data"}),i.jsx(m.Z,{overlay:o,trigger:["click"],children:(0,i.jsxs)(g.ZP,{type:"text",className:"user-button",children:[i.jsx(h.C,{icon:i.jsx(c.Z,{})}),i.jsx(P,{style:{marginLeft:8},children:"Counter User"})]})})]})]})}),(0,i.jsxs)(u.default,{children:[i.jsx(k,{width:240,className:"sidebar",children:i.jsx(x.Z,{mode:"inline",selectedKeys:[r.pathname],onClick:r=>e(r.key),className:"menu",children:C.map(e=>i.jsx(x.Z.SubMenu,{icon:e.icon,title:e.label,children:e.children.map(e=>i.jsx(x.Z.Item,{children:e.label},e.key))},e.key))})}),i.jsx(u.default,{style:{marginLeft:0},children:i.jsx(v,{className:"content",children:i.jsx(f.Outlet,{})})})]})]})};s()}catch(e){s(e)}})},4053:e=>{e.exports=require("@ant-design/colors")},2727:e=>{e.exports=require("@ant-design/cssinjs")},45:e=>{e.exports=require("@ant-design/cssinjs-utils")},1171:e=>{e.exports=require("@ant-design/icons-svg/es/asn/LaptopOutlined")},5532:e=>{e.exports=require("@ant-design/icons-svg/es/asn/LogoutOutlined")},6024:e=>{e.exports=require("@ant-design/icons-svg/es/asn/ReloadOutlined")},6242:e=>{e.exports=require("@ant-design/icons-svg/es/asn/UserOutlined")},8333:e=>{e.exports=require("@ant-design/icons/es/components/Context")},7669:e=>{e.exports=require("@ant-design/icons/es/icons/BarsOutlined")},4405:e=>{e.exports=require("@ant-design/icons/es/icons/CheckCircleFilled")},7150:e=>{e.exports=require("@ant-design/icons/es/icons/CheckOutlined")},8815:e=>{e.exports=require("@ant-design/icons/es/icons/CloseCircleFilled")},8737:e=>{e.exports=require("@ant-design/icons/es/icons/CloseOutlined")},9469:e=>{e.exports=require("@ant-design/icons/es/icons/CopyOutlined")},5416:e=>{e.exports=require("@ant-design/icons/es/icons/EditOutlined")},7653:e=>{e.exports=require("@ant-design/icons/es/icons/EllipsisOutlined")},1119:e=>{e.exports=require("@ant-design/icons/es/icons/EnterOutlined")},5818:e=>{e.exports=require("@ant-design/icons/es/icons/ExclamationCircleFilled")},6938:e=>{e.exports=require("@ant-design/icons/es/icons/InfoCircleFilled")},2121:e=>{e.exports=require("@ant-design/icons/es/icons/LeftOutlined")},7811:e=>{e.exports=require("@ant-design/icons/es/icons/LoadingOutlined")},196:e=>{e.exports=require("@ant-design/icons/es/icons/RightOutlined")},566:e=>{e.exports=require("@ctrl/tinycolor")},8810:e=>{e.exports=require("@rc-component/color-picker")},9003:e=>{e.exports=require("classnames")},8887:e=>{e.exports=require("copy-to-clipboard")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},9291:e=>{e.exports=require("rc-dropdown")},7118:e=>{e.exports=require("rc-field-form")},4326:e=>{e.exports=require("rc-input")},9934:e=>{e.exports=require("rc-menu")},4290:e=>{e.exports=require("rc-motion")},8858:e=>{e.exports=require("rc-notification")},3853:e=>{e.exports=require("rc-pagination/es/locale/en_US")},2815:e=>{e.exports=require("rc-picker/es/locale/en_US")},1493:e=>{e.exports=require("rc-resize-observer")},8880:e=>{e.exports=require("rc-textarea")},3283:e=>{e.exports=require("rc-tooltip")},1601:e=>{e.exports=require("rc-util")},4248:e=>{e.exports=require("rc-util/es/Children/toArray")},3164:e=>{e.exports=require("rc-util/es/Dom/canUseDom")},943:e=>{e.exports=require("rc-util/es/Dom/dynamicCSS")},2947:e=>{e.exports=require("rc-util/es/Dom/isVisible")},8442:e=>{e.exports=require("rc-util/es/Dom/shadow")},6424:e=>{e.exports=require("rc-util/es/Dom/styleChecker")},2276:e=>{e.exports=require("rc-util/es/KeyCode")},3050:e=>{e.exports=require("rc-util/es/React/render")},1423:e=>{e.exports=require("rc-util/es/hooks/useLayoutEffect")},4187:e=>{e.exports=require("rc-util/es/hooks/useMemo")},5092:e=>{e.exports=require("rc-util/es/hooks/useMergedState")},2462:e=>{e.exports=require("rc-util/es/isEqual")},5514:e=>{e.exports=require("rc-util/es/omit")},340:e=>{e.exports=require("rc-util/es/raf")},5927:e=>{e.exports=require("rc-util/es/ref")},9528:e=>{e.exports=require("rc-util/es/utils/set")},3966:e=>{e.exports=require("rc-util/es/warning")},6689:e=>{e.exports=require("react")},4661:e=>{e.exports=require("react-router-dom")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")},3745:e=>{e.exports=import("firebase/app")},401:e=>{e.exports=import("firebase/auth")},1492:e=>{e.exports=import("firebase/firestore")},4205:(e,r,t)=>{t.a(e,async(e,s)=>{try{t.d(r,{I:()=>u,db:()=>l});var i=t(3745),o=t(401),n=t(1492),a=e([i,o,n]);[i,o,n]=a.then?(await a)():a;let c=(0,i.initializeApp)({apiKey:"AIzaSyCuQ3wNmtDNAZMhZe9MRjpTn1kAvDp4SOA",authDomain:"point-of-sale-8a42d.firebaseapp.com",projectId:"point-of-sale-8a42d",storageBucket:"point-of-sale-8a42d.appspot.com",messagingSenderId:"283428202868",appId:"1:283428202868:web:0c99ca55251c4294136421",measurementId:"G-Q0928NKHEQ"}),u=(0,o.getAuth)(c),l=(0,n.getFirestore)(c);s()}catch(e){s(e)}})}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[290,931,0,853,965,408],()=>t(4891));module.exports=s})();
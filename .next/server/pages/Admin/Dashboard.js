"use strict";(()=>{var e={};e.id=622,e.ids=[622,660],e.modules={3088:(e,r,i)=>{i.a(e,async(e,t)=>{try{i.r(r),i.d(r,{config:()=>f,default:()=>m,getServerSideProps:()=>h,getStaticPaths:()=>g,getStaticProps:()=>x,reportWebVitals:()=>b,routeModule:()=>P,unstable_getServerProps:()=>v,unstable_getServerSideProps:()=>j,unstable_getStaticParams:()=>k,unstable_getStaticPaths:()=>q,unstable_getStaticProps:()=>y});var s=i(7093),n=i(5244),o=i(1323),a=i(5290),l=i.n(a),c=i(3802),d=i.n(c),u=i(4374),p=e([u]);u=(p.then?(await p)():p)[0];let m=(0,o.l)(u,"default"),x=(0,o.l)(u,"getStaticProps"),g=(0,o.l)(u,"getStaticPaths"),h=(0,o.l)(u,"getServerSideProps"),f=(0,o.l)(u,"config"),b=(0,o.l)(u,"reportWebVitals"),y=(0,o.l)(u,"unstable_getStaticProps"),q=(0,o.l)(u,"unstable_getStaticPaths"),k=(0,o.l)(u,"unstable_getStaticParams"),v=(0,o.l)(u,"unstable_getServerProps"),j=(0,o.l)(u,"unstable_getServerSideProps"),P=new s.PagesRouteModule({definition:{kind:n.x.PAGES,page:"/Admin/Dashboard",pathname:"/Admin/Dashboard",bundlePath:"",filename:""},components:{App:d(),Document:l()},userland:u});t()}catch(e){t(e)}})},6659:(e,r,i)=>{i.d(r,{Z:()=>l});var t=i(7462),s=i(6689);let n=require("@ant-design/icons-svg/es/asn/NotificationOutlined");var o=i.n(n),a=i(9462);let l=s.forwardRef(function(e,r){return s.createElement(a.Z,(0,t.Z)({},e,{ref:r,icon:o()}))})},4374:(e,r,i)=>{i.a(e,async(e,t)=>{try{i.r(r),i.d(r,{default:()=>D});var s=i(997);i(6689);var n=i(7899),o=i(6877),a=i(6659),l=i(5166),c=i(253),d=i(506),u=i(5965),p=i(6791),m=i(6939),x=i(8025),g=i(6723),h=i(876),f=i(6954),b=i(4661),y=i(401),q=i(4205),k=e([y,q]);[y,q]=k.then?(await k)():k;let{Header:v,Content:j,Footer:P,Sider:S}=d.default,{Text:C}=u.default,Z=[{key:"/admin/users",icon:s.jsx(n.Z,{}),label:"Counter Users",children:[{key:"/admin/users",label:"View Users"}]},{key:"/admin/masterprofile",icon:s.jsx(n.Z,{}),label:"Master Profile",children:[{key:"/admin/additemprofile",label:"Add Item Profile"},{key:"/admin/addcompanyprofile",label:"Add Company Profile"},{key:"/admin/addgenericprofile",label:"Add Generic Profile"},{key:"/admin/addcategoryprofile",label:"Add Category Profile"},{key:"/admin/adddistributorprofile",label:"Add Distributor Profile"},{key:"/admin/editdistributorprofile",label:"Edit Distributor Profile"},{key:"/admin/editcompanyprofile",label:"Edit Company Profile"},{key:"/admin/edititemprofile",label:"Edit Item Profile"}]},{key:"/admin/",icon:s.jsx(o.Z,{}),label:"Transactions",children:[{key:"/admin/generateorder",label:"Generate Order"},{key:"/admin/addpurchaseprofile",label:"Purchase Invoice"},{key:"/admin/returnpurchaseprofile",label:"Purchase Return Invoice"},{key:"/admin/editpurchaseprofile",label:"Edit Purchase Invoice"},{key:"/admin/poscountersale",label:"Counter Sale"},{key:"/admin/posreturn",label:"Counter Return Sale"}]},{key:"/admin/inve",icon:s.jsx(o.Z,{}),label:"Management",children:[{key:"/admin/dummy1",label:"Dummy 1"},{key:"/admin/dummy2",label:"Dummy 2"}]},{key:"/admin/acc",icon:s.jsx(o.Z,{}),label:"Accounts",children:[{key:"/admin/purchaseofcash",label:"Add Cash Purchase Invoice"},{key:"/admin/purchaseofbank",label:"Add Cheque Purchase Invoice"}]},{key:"/admin/reports",icon:s.jsx(a.Z,{}),label:"Reports",children:[{key:"/admin/datewisesalereport",label:"Total Sales Reports"},{key:"/admin/paidinvoices",label:"Paid Invoices Reports"},{key:"/admin/expirydetector",label:"Expiry Detector"}]}],D=()=>{let e=(0,b.useNavigate)(),r=(0,b.useLocation)(),{token:i}=p.Z.useToken(),t=async()=>{try{await (0,y.signOut)(q.I),m.ZP.success("Logged out successfully"),e("/signin")}catch(e){m.ZP.error("Failed to log out")}},o=(0,s.jsxs)(x.Z,{children:[s.jsx(x.Z.Item,{children:"Profile"},"profile"),s.jsx(x.Z.Item,{children:"Settings"},"settings"),s.jsx(x.Z.Divider,{}),s.jsx(x.Z.Item,{onClick:t,icon:s.jsx(l.Z,{}),children:"Logout"},"logout")]});return(0,s.jsxs)(d.default,{style:{minHeight:"100vh",overflow:"hidden"},children:[s.jsx("style",{children:`
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

          // .logo {
          //   height: 32px;
          //   margin-right: 16px;
          // }

          .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        `}),s.jsx(v,{children:(0,s.jsxs)("div",{className:"header-content",children:[s.jsx("img",{style:{height:"60px"},src:"https://img.icons8.com/?size=160&id=I2iJf1544eWE&format=png",alt:"Logo",className:"logo"}),(0,s.jsxs)("div",{children:[s.jsx(g.ZP,{type:"text",className:"refresh-button",icon:s.jsx(c.Z,{}),onClick:()=>{m.ZP.success("Data refreshed!")},title:"Refresh Data"}),s.jsx(h.Z,{overlay:o,trigger:["click"],children:(0,s.jsxs)(g.ZP,{type:"text",className:"user-button",children:[s.jsx(f.C,{icon:s.jsx(n.Z,{})}),s.jsx(C,{style:{marginLeft:8},children:"Admin Dashboard"})]})})]})]})}),(0,s.jsxs)(d.default,{children:[s.jsx(S,{width:240,className:"sidebar",children:s.jsx(x.Z,{mode:"inline",selectedKeys:[r.pathname],onClick:r=>e(r.key),className:"menu",children:Z.map(e=>s.jsx(x.Z.SubMenu,{icon:e.icon,title:e.label,children:e.children.map(e=>s.jsx(x.Z.Item,{children:e.label},e.key))},e.key))})}),s.jsx(d.default,{style:{marginLeft:0,overflow:"hidden"},children:s.jsx(j,{style:{margin:0,minHeight:"75vh",background:i.colorBgContainer,padding:24,borderRadius:i.borderRadiusLG,overflowY:"auto"},children:s.jsx(b.Outlet,{})})})]})]})};t()}catch(e){t(e)}})},4053:e=>{e.exports=require("@ant-design/colors")},2727:e=>{e.exports=require("@ant-design/cssinjs")},45:e=>{e.exports=require("@ant-design/cssinjs-utils")},1171:e=>{e.exports=require("@ant-design/icons-svg/es/asn/LaptopOutlined")},5532:e=>{e.exports=require("@ant-design/icons-svg/es/asn/LogoutOutlined")},6024:e=>{e.exports=require("@ant-design/icons-svg/es/asn/ReloadOutlined")},6242:e=>{e.exports=require("@ant-design/icons-svg/es/asn/UserOutlined")},8333:e=>{e.exports=require("@ant-design/icons/es/components/Context")},7669:e=>{e.exports=require("@ant-design/icons/es/icons/BarsOutlined")},4405:e=>{e.exports=require("@ant-design/icons/es/icons/CheckCircleFilled")},7150:e=>{e.exports=require("@ant-design/icons/es/icons/CheckOutlined")},8815:e=>{e.exports=require("@ant-design/icons/es/icons/CloseCircleFilled")},8737:e=>{e.exports=require("@ant-design/icons/es/icons/CloseOutlined")},9469:e=>{e.exports=require("@ant-design/icons/es/icons/CopyOutlined")},5416:e=>{e.exports=require("@ant-design/icons/es/icons/EditOutlined")},7653:e=>{e.exports=require("@ant-design/icons/es/icons/EllipsisOutlined")},1119:e=>{e.exports=require("@ant-design/icons/es/icons/EnterOutlined")},5818:e=>{e.exports=require("@ant-design/icons/es/icons/ExclamationCircleFilled")},6938:e=>{e.exports=require("@ant-design/icons/es/icons/InfoCircleFilled")},2121:e=>{e.exports=require("@ant-design/icons/es/icons/LeftOutlined")},7811:e=>{e.exports=require("@ant-design/icons/es/icons/LoadingOutlined")},196:e=>{e.exports=require("@ant-design/icons/es/icons/RightOutlined")},566:e=>{e.exports=require("@ctrl/tinycolor")},8810:e=>{e.exports=require("@rc-component/color-picker")},9003:e=>{e.exports=require("classnames")},8887:e=>{e.exports=require("copy-to-clipboard")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},9291:e=>{e.exports=require("rc-dropdown")},7118:e=>{e.exports=require("rc-field-form")},4326:e=>{e.exports=require("rc-input")},9934:e=>{e.exports=require("rc-menu")},4290:e=>{e.exports=require("rc-motion")},8858:e=>{e.exports=require("rc-notification")},3853:e=>{e.exports=require("rc-pagination/es/locale/en_US")},2815:e=>{e.exports=require("rc-picker/es/locale/en_US")},1493:e=>{e.exports=require("rc-resize-observer")},8880:e=>{e.exports=require("rc-textarea")},3283:e=>{e.exports=require("rc-tooltip")},1601:e=>{e.exports=require("rc-util")},4248:e=>{e.exports=require("rc-util/es/Children/toArray")},3164:e=>{e.exports=require("rc-util/es/Dom/canUseDom")},943:e=>{e.exports=require("rc-util/es/Dom/dynamicCSS")},2947:e=>{e.exports=require("rc-util/es/Dom/isVisible")},8442:e=>{e.exports=require("rc-util/es/Dom/shadow")},6424:e=>{e.exports=require("rc-util/es/Dom/styleChecker")},2276:e=>{e.exports=require("rc-util/es/KeyCode")},3050:e=>{e.exports=require("rc-util/es/React/render")},1423:e=>{e.exports=require("rc-util/es/hooks/useLayoutEffect")},4187:e=>{e.exports=require("rc-util/es/hooks/useMemo")},5092:e=>{e.exports=require("rc-util/es/hooks/useMergedState")},2462:e=>{e.exports=require("rc-util/es/isEqual")},5514:e=>{e.exports=require("rc-util/es/omit")},340:e=>{e.exports=require("rc-util/es/raf")},5927:e=>{e.exports=require("rc-util/es/ref")},9528:e=>{e.exports=require("rc-util/es/utils/set")},3966:e=>{e.exports=require("rc-util/es/warning")},6689:e=>{e.exports=require("react")},4661:e=>{e.exports=require("react-router-dom")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")},3745:e=>{e.exports=import("firebase/app")},401:e=>{e.exports=import("firebase/auth")},1492:e=>{e.exports=import("firebase/firestore")},4205:(e,r,i)=>{i.a(e,async(e,t)=>{try{i.d(r,{I:()=>c,db:()=>d});var s=i(3745),n=i(401),o=i(1492),a=e([s,n,o]);[s,n,o]=a.then?(await a)():a;let l=(0,s.initializeApp)({apiKey:"AIzaSyCuQ3wNmtDNAZMhZe9MRjpTn1kAvDp4SOA",authDomain:"point-of-sale-8a42d.firebaseapp.com",projectId:"point-of-sale-8a42d",storageBucket:"point-of-sale-8a42d.appspot.com",messagingSenderId:"283428202868",appId:"1:283428202868:web:0c99ca55251c4294136421",measurementId:"G-Q0928NKHEQ"}),c=(0,n.getAuth)(l),d=(0,o.getFirestore)(l);t()}catch(e){t(e)}})}};var r=require("../../webpack-runtime.js");r.C(e);var i=e=>r(r.s=e),t=r.X(0,[290,931,0,853,965,408],()=>i(3088));module.exports=t})();
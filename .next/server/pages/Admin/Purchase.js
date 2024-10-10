"use strict";(()=>{var e={};e.id=532,e.ids=[532,660],e.modules={8270:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.r(t),r.d(t,{config:()=>h,default:()=>x,getServerSideProps:()=>g,getStaticPaths:()=>q,getStaticProps:()=>m,reportWebVitals:()=>y,routeModule:()=>S,unstable_getServerProps:()=>Z,unstable_getServerSideProps:()=>f,unstable_getStaticParams:()=>b,unstable_getStaticPaths:()=>j,unstable_getStaticProps:()=>P});var i=r(7093),n=r(5244),a=r(1323),o=r(5290),l=r.n(o),u=r(3802),c=r.n(u),d=r(3159),p=e([d]);d=(p.then?(await p)():p)[0];let x=(0,a.l)(d,"default"),m=(0,a.l)(d,"getStaticProps"),q=(0,a.l)(d,"getStaticPaths"),g=(0,a.l)(d,"getServerSideProps"),h=(0,a.l)(d,"config"),y=(0,a.l)(d,"reportWebVitals"),P=(0,a.l)(d,"unstable_getStaticProps"),j=(0,a.l)(d,"unstable_getStaticPaths"),b=(0,a.l)(d,"unstable_getStaticParams"),Z=(0,a.l)(d,"unstable_getServerProps"),f=(0,a.l)(d,"unstable_getServerSideProps"),S=new i.PagesRouteModule({definition:{kind:n.x.PAGES,page:"/Admin/Purchase",pathname:"/Admin/Purchase",bundlePath:"",filename:""},components:{App:c(),Document:l()},userland:d});s()}catch(e){s(e)}})},4201:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.d(t,{Z:()=>h});var i=r(997),n=r(6939),a=r(9529),o=r(827),l=r(8993),u=r(8265),c=r(6723),d=r(401),p=r(4205),x=r(1492),m=r(6689),q=r(8351),g=e([d,p,x,o]);[d,p,x,o]=g.then?(await g)():g;let h=function({open:e,onClose:t}){let[r]=(0,q.useForm)(),[s,d]=(0,m.useState)(!1),g=async e=>{console.log("Success:",e);try{d(!0);let s=(0,x.collection)(p.db,"products");await (0,x.addDoc)(s,e),r.resetFields(),d(!1),t(),n.ZP.success("Product ADDED Successfully")}catch(e){n.ZP.error(e.message),d(!1)}};return i.jsx(a.Z,{title:"Product Form",width:800,onClose:t,open:e,children:(0,i.jsxs)(o.Z,{name:"basic",form:r,layout:"vertical",initialValues:{remember:!0},onFinish:g,onFinishFailed:e=>{console.log("Failed:",e)},autoComplete:"off",children:[i.jsx(o.Z.Item,{label:"Product Name",name:"title",rules:[{required:!0,message:"Please input your username!"}],children:i.jsx(l.Z,{})}),i.jsx(o.Z.Item,{label:"Product Desc",name:"desc",rules:[{required:!0,message:"Please input your product Description"}],children:i.jsx(l.Z,{})}),i.jsx(o.Z.Item,{label:"Image",name:"image",rules:[{required:!0,message:"Please input image link"}],children:i.jsx(l.Z,{})}),i.jsx(o.Z.Item,{label:"Price",name:"price",rules:[{required:!0,message:"Please input price"}],children:i.jsx(l.Z,{})}),i.jsx(o.Z.Item,{label:"Quantity",name:"quantity",rules:[{required:!0,message:"Please input quantity"}],children:i.jsx(l.Z,{})}),i.jsx(o.Z.Item,{label:"Unit",name:"unit",rules:[{required:!0,message:"Please input quantity"}],children:(0,i.jsxs)(u.ZP.Group,{children:[i.jsx(u.ZP,{value:"kg",children:" Kg "}),i.jsx(u.ZP,{value:"pack",children:" Pack "})]})}),i.jsx(o.Z.Item,{wrapperCol:{offset:8,span:16},children:i.jsx(c.ZP,{loading:s,type:"primary",htmlType:"submit",children:"Submit"})})]})})};s()}catch(e){s(e)}})},7468:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.d(t,{Z:()=>y});var i=r(997),n=r(6939),a=r(9529),o=r(827),l=r(9175),u=r(8993),c=r(8265),d=r(6723),p=r(4205),x=r(1492),m=r(6689),q=r(8351),g=r(3255),h=e([p,x,g,o]);[p,x,g,o]=h.then?(await h)():h;let y=function({open:e,onClose:t}){let{products:r}=(0,m.useContext)(g.H),[s]=(0,q.useForm)(),[h,y]=(0,m.useState)(!1),P=async e=>{console.log("Success:",e);try{y(!0);let i=(0,x.collection)(p.db,"purchases"),a=r.find(t=>t.title===e.title),o=(0,x.doc)(p.db,"products",a.id);await (0,x.addDoc)(i,e),await (0,x.updateDoc)(o,{quantity:Number(a.quantity)+Number(e.quantity)}),s.resetFields(),y(!1),t(),n.ZP.success("Purchase Added Successfully")}catch(e){n.ZP.error(e.message),y(!1)}};return i.jsx(a.Z,{title:"Purchase Form",width:800,onClose:t,open:e,children:(0,i.jsxs)(o.Z,{name:"basic",form:s,layout:"vertical",initialValues:{remember:!0},onFinish:P,onFinishFailed:e=>{console.log("Failed:",e)},autoComplete:"off",children:[i.jsx(o.Z.Item,{label:"Product Name",name:"title",rules:[{required:!0,message:"Please input your username!"}],children:i.jsx(l.default,{children:r.map(e=>i.jsx(l.default.Option,{value:e.title,children:e.title},e.title))})}),i.jsx(o.Z.Item,{label:"Supplier",name:"desc",rules:[{required:!0,message:"Please input supplier"}],children:i.jsx(u.Z,{})}),i.jsx(o.Z.Item,{label:"Purchase Date ",name:"purchaseDate",rules:[{required:!0,message:"Please input purchase date"}],children:i.jsx(u.Z,{type:"date"})}),i.jsx(o.Z.Item,{label:"Bill Amount",name:"billAmount",rules:[{required:!0,message:"Please input bill Amount"}],children:i.jsx(u.Z,{})}),i.jsx(o.Z.Item,{label:"Price",name:"price",rules:[{required:!0,message:"Please input price"}],children:i.jsx(u.Z,{})}),i.jsx(o.Z.Item,{label:"Quantity",name:"quantity",rules:[{required:!0,message:"Please input quantity"}],children:i.jsx(u.Z,{})}),i.jsx(o.Z.Item,{label:"Unit",name:"unit",rules:[{required:!0,message:"Please input quantity"}],children:(0,i.jsxs)(c.ZP.Group,{children:[i.jsx(c.ZP,{value:"kg",children:" Kg "}),i.jsx(c.ZP,{value:"pack",children:" Pack "})]})}),i.jsx(o.Z.Item,{wrapperCol:{offset:8,span:16},children:i.jsx(d.ZP,{loading:h,type:"primary",htmlType:"submit",children:"Submit"})})]})})};s()}catch(e){s(e)}})},8470:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.d(t,{Z:()=>m});var i=r(997);r(6939);var n=r(8853),a=r(3857),o=r(1492),l=r(6689),u=r(4205),c=r(5342),d=r(3705),p=r(3255),x=e([o,u,p,a]);[o,u,p,a]=x.then?(await x)():x;let m=function(){let{products:e,setProducts:t}=(0,l.useContext)(p.H),[r,s]=(0,l.useState)(!1);return i.jsx(a.Z,{dataSource:e,columns:[{title:"Title",dataIndex:"title",key:"title"},{title:"Image",dataIndex:"image",key:"image",render:e=>i.jsx(n.Z,{src:e,height:50,width:50})},{title:"Price",dataIndex:"price",key:"price"},{title:"Unit",dataIndex:"unit",key:"unit"},{title:"Quantity",dataIndex:"quantity",key:"quantity"},{title:"Action",key:"action",render:()=>(0,i.jsxs)("div",{className:"flex gap-5",children:[i.jsx(c.Z,{className:"text-red-600"}),i.jsx(d.Z,{className:"text-blue-600"})]})}]})};s()}catch(e){s(e)}})},8921:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.d(t,{Z:()=>p});var i=r(997);r(6939);var n=r(3857),a=r(1492),o=r(6689),l=r(4205),u=r(5342),c=r(3705),d=e([a,l,n]);[a,l,n]=d.then?(await d)():d;let p=function(){let[e,t]=(0,o.useState)([]),[r,s]=(0,o.useState)(!1);return i.jsx(n.Z,{dataSource:e,columns:[{title:"Purchase Id",dataIndex:"id",key:"id"},{title:"Purchase Date",dataIndex:"purchaseDate",key:"purchaseDate"},{title:"Item",dataIndex:"title",key:"title"},{title:"Price",dataIndex:"price",key:"price"},{title:"Unit",dataIndex:"unit",key:"unit"},{title:"Quantity",dataIndex:"quantity",key:"quantity"},{title:"Action",key:"action",render:()=>(0,i.jsxs)("div",{className:"flex gap-5",children:[i.jsx(u.Z,{className:"text-red-600"}),i.jsx(c.Z,{className:"text-blue-600"})]})}]})};s()}catch(e){s(e)}})},3255:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.d(t,{H:()=>l}),r(997);var i=r(1492),n=r(6689),a=r(4205),o=e([i,a]);[i,a]=o.then?(await o)():o;let l=(0,n.createContext)();s()}catch(e){s(e)}})},3159:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.r(t),r.d(t,{default:()=>p});var i=r(997),n=r(6689),a=r(6723),o=r(4201),l=r(8470),u=r(7468),c=r(8921),d=e([o,l,u,c]);[o,l,u,c]=d.then?(await d)():d;let p=function(){let[e,t]=(0,n.useState)(!1);return(0,i.jsxs)("div",{children:[(0,i.jsxs)("div",{className:"flex justify-between mb-5",children:[i.jsx("h1",{children:"All Purchase"}),i.jsx(a.ZP,{type:"primary",onClick:()=>{t(!0)},children:"Add Purchases"})]}),i.jsx(u.Z,{onClose:()=>{t(!1)},open:e}),i.jsx(c.Z,{})]})};s()}catch(e){s(e)}})},4053:e=>{e.exports=require("@ant-design/colors")},2727:e=>{e.exports=require("@ant-design/cssinjs")},45:e=>{e.exports=require("@ant-design/cssinjs-utils")},3071:e=>{e.exports=require("@ant-design/icons-svg/es/asn/DeleteOutlined")},4103:e=>{e.exports=require("@ant-design/icons-svg/es/asn/EditOutlined")},8333:e=>{e.exports=require("@ant-design/icons/es/components/Context")},7669:e=>{e.exports=require("@ant-design/icons/es/icons/BarsOutlined")},6688:e=>{e.exports=require("@ant-design/icons/es/icons/CaretDownFilled")},6740:e=>{e.exports=require("@ant-design/icons/es/icons/CaretDownOutlined")},7341:e=>{e.exports=require("@ant-design/icons/es/icons/CaretUpOutlined")},4405:e=>{e.exports=require("@ant-design/icons/es/icons/CheckCircleFilled")},7150:e=>{e.exports=require("@ant-design/icons/es/icons/CheckOutlined")},8815:e=>{e.exports=require("@ant-design/icons/es/icons/CloseCircleFilled")},8737:e=>{e.exports=require("@ant-design/icons/es/icons/CloseOutlined")},5896:e=>{e.exports=require("@ant-design/icons/es/icons/DoubleLeftOutlined")},9880:e=>{e.exports=require("@ant-design/icons/es/icons/DoubleRightOutlined")},1102:e=>{e.exports=require("@ant-design/icons/es/icons/DownOutlined")},7653:e=>{e.exports=require("@ant-design/icons/es/icons/EllipsisOutlined")},5818:e=>{e.exports=require("@ant-design/icons/es/icons/ExclamationCircleFilled")},9825:e=>{e.exports=require("@ant-design/icons/es/icons/EyeInvisibleOutlined")},2488:e=>{e.exports=require("@ant-design/icons/es/icons/EyeOutlined")},6581:e=>{e.exports=require("@ant-design/icons/es/icons/FileOutlined")},6309:e=>{e.exports=require("@ant-design/icons/es/icons/FilterFilled")},2601:e=>{e.exports=require("@ant-design/icons/es/icons/FolderOpenOutlined")},1666:e=>{e.exports=require("@ant-design/icons/es/icons/FolderOutlined")},3047:e=>{e.exports=require("@ant-design/icons/es/icons/HolderOutlined")},6938:e=>{e.exports=require("@ant-design/icons/es/icons/InfoCircleFilled")},2121:e=>{e.exports=require("@ant-design/icons/es/icons/LeftOutlined")},7811:e=>{e.exports=require("@ant-design/icons/es/icons/LoadingOutlined")},8628:e=>{e.exports=require("@ant-design/icons/es/icons/MinusSquareOutlined")},7961:e=>{e.exports=require("@ant-design/icons/es/icons/PlusSquareOutlined")},4867:e=>{e.exports=require("@ant-design/icons/es/icons/QuestionCircleOutlined")},196:e=>{e.exports=require("@ant-design/icons/es/icons/RightOutlined")},5533:e=>{e.exports=require("@ant-design/icons/es/icons/RotateLeftOutlined")},5695:e=>{e.exports=require("@ant-design/icons/es/icons/RotateRightOutlined")},3955:e=>{e.exports=require("@ant-design/icons/es/icons/SearchOutlined")},1913:e=>{e.exports=require("@ant-design/icons/es/icons/SwapOutlined")},9859:e=>{e.exports=require("@ant-design/icons/es/icons/ZoomInOutlined")},8050:e=>{e.exports=require("@ant-design/icons/es/icons/ZoomOutOutlined")},566:e=>{e.exports=require("@ctrl/tinycolor")},8810:e=>{e.exports=require("@rc-component/color-picker")},8351:e=>{e.exports=require("antd/es/form/Form")},9003:e=>{e.exports=require("classnames")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},2090:e=>{e.exports=require("rc-checkbox")},5307:e=>{e.exports=require("rc-drawer")},9291:e=>{e.exports=require("rc-dropdown")},7118:e=>{e.exports=require("rc-field-form")},7571:e=>{e.exports=require("rc-image")},4326:e=>{e.exports=require("rc-input")},9934:e=>{e.exports=require("rc-menu")},4290:e=>{e.exports=require("rc-motion")},8858:e=>{e.exports=require("rc-notification")},3006:e=>{e.exports=require("rc-pagination")},3853:e=>{e.exports=require("rc-pagination/es/locale/en_US")},2815:e=>{e.exports=require("rc-picker/es/locale/en_US")},2463:e=>{e.exports=require("rc-select")},3345:e=>{e.exports=require("rc-table")},1890:e=>{e.exports=require("rc-table/es/hooks/useColumns")},8880:e=>{e.exports=require("rc-textarea")},3283:e=>{e.exports=require("rc-tooltip")},4593:e=>{e.exports=require("rc-tree")},6437:e=>{e.exports=require("rc-tree/es/util")},9011:e=>{e.exports=require("rc-tree/es/utils/conductUtil")},1839:e=>{e.exports=require("rc-tree/es/utils/treeUtil")},1601:e=>{e.exports=require("rc-util")},4248:e=>{e.exports=require("rc-util/es/Children/toArray")},3164:e=>{e.exports=require("rc-util/es/Dom/canUseDom")},943:e=>{e.exports=require("rc-util/es/Dom/dynamicCSS")},9826:e=>{e.exports=require("rc-util/es/Dom/findDOMNode")},2947:e=>{e.exports=require("rc-util/es/Dom/isVisible")},8442:e=>{e.exports=require("rc-util/es/Dom/shadow")},2276:e=>{e.exports=require("rc-util/es/KeyCode")},3050:e=>{e.exports=require("rc-util/es/React/render")},1423:e=>{e.exports=require("rc-util/es/hooks/useLayoutEffect")},4187:e=>{e.exports=require("rc-util/es/hooks/useMemo")},5092:e=>{e.exports=require("rc-util/es/hooks/useMergedState")},3187:e=>{e.exports=require("rc-util/es/hooks/useState")},2462:e=>{e.exports=require("rc-util/es/isEqual")},5514:e=>{e.exports=require("rc-util/es/omit")},2724:e=>{e.exports=require("rc-util/es/pickAttrs")},340:e=>{e.exports=require("rc-util/es/raf")},5927:e=>{e.exports=require("rc-util/es/ref")},9528:e=>{e.exports=require("rc-util/es/utils/set")},3966:e=>{e.exports=require("rc-util/es/warning")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")},3745:e=>{e.exports=import("firebase/app")},401:e=>{e.exports=import("firebase/auth")},1492:e=>{e.exports=import("firebase/firestore")},8751:e=>{e.exports=import("scroll-into-view-if-needed")},8592:e=>{e.exports=import("throttle-debounce")},4205:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.d(t,{I:()=>u,db:()=>c});var i=r(3745),n=r(401),a=r(1492),o=e([i,n,a]);[i,n,a]=o.then?(await o)():o;let l=(0,i.initializeApp)({apiKey:"AIzaSyCuQ3wNmtDNAZMhZe9MRjpTn1kAvDp4SOA",authDomain:"point-of-sale-8a42d.firebaseapp.com",projectId:"point-of-sale-8a42d",storageBucket:"point-of-sale-8a42d.appspot.com",messagingSenderId:"283428202868",appId:"1:283428202868:web:0c99ca55251c4294136421",measurementId:"G-Q0928NKHEQ"}),u=(0,n.getAuth)(l),c=(0,a.getFirestore)(l);s()}catch(e){s(e)}})}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[290,931,0,853,993,314,602,2,439],()=>r(8270));module.exports=s})();
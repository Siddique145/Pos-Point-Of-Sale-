(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[622],{43370:function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Admin/Dashboard",function(){return a(67077)}])},67077:function(e,n,a){"use strict";a.r(n),a.d(n,{default:function(){return N}});var i=a(85893),r=a(67294),t=a(44189),l=a(11669),o=a(87462),s={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 112c-3.8 0-7.7.7-11.6 2.3L292 345.9H128c-8.8 0-16 7.4-16 16.6v299c0 9.2 7.2 16.6 16 16.6h101.7c-3.7 11.6-5.7 23.9-5.7 36.4 0 65.9 53.8 119.5 120 119.5 55.4 0 102.1-37.6 115.9-88.4l408.6 164.2c3.9 1.5 7.8 2.3 11.6 2.3 16.9 0 32-14.2 32-33.2V145.2C912 126.2 897 112 880 112zM344 762.3c-26.5 0-48-21.4-48-47.8 0-11.2 3.9-21.9 11-30.4l84.9 34.1c-2 24.6-22.7 44.1-47.9 44.1zm496 58.4L318.8 611.3l-12.9-5.2H184V417.9h121.9l12.9-5.2L840 203.3v617.4z"}}]},name:"notification",theme:"outlined"},d=a(36936),c=r.forwardRef(function(e,n){return r.createElement(d.Z,(0,o.Z)({},e,{ref:n,icon:s}))}),u=a(72344),m=a(81218),f=a(30506),h=a(80861),b=a(86791),p=a(38761),y=a(28025),g=a(76964),k=a(50876),x=a(56954),j=a(89250),v=a(91259),Z=a(94205);let{Header:P,Content:w,Footer:I,Sider:C}=f.default,{Text:A}=h.default,E=[{key:"/admin/users",icon:(0,i.jsx)(t.Z,{}),label:"Counter Users",children:[{key:"/admin/users",label:"View Users"}]},{key:"/admin/masterprofile",icon:(0,i.jsx)(t.Z,{}),label:"Master Profile",children:[{key:"/admin/additemprofile",label:"Add Item Profile"},{key:"/admin/addcompanyprofile",label:"Add Company Profile"},{key:"/admin/addgenericprofile",label:"Add Generic Profile"},{key:"/admin/addcategoryprofile",label:"Add Category Profile"},{key:"/admin/adddistributorprofile",label:"Add Distributor Profile"},{key:"/admin/editdistributorprofile",label:"Edit Distributor Profile"},{key:"/admin/editcompanyprofile",label:"Edit Company Profile"},{key:"/admin/edititemprofile",label:"Edit Item Profile"}]},{key:"/admin/",icon:(0,i.jsx)(l.Z,{}),label:"Transactions",children:[{key:"/admin/generateorder",label:"Generate Order"},{key:"/admin/addpurchaseprofile",label:"Purchase Invoice"},{key:"/admin/returnpurchaseprofile",label:"Purchase Return Invoice"},{key:"/admin/editpurchaseprofile",label:"Edit Purchase Invoice"},{key:"/admin/poscountersale",label:"Counter Sale"},{key:"/admin/posreturn",label:"Counter Return Sale"}]},{key:"/admin/inve",icon:(0,i.jsx)(l.Z,{}),label:"Management",children:[{key:"/admin/dummy1",label:"Dummy 1"},{key:"/admin/dummy2",label:"Dummy 2"}]},{key:"/admin/acc",icon:(0,i.jsx)(l.Z,{}),label:"Accounts",children:[{key:"/admin/purchaseofcash",label:"Add Cash Purchase Invoice"},{key:"/admin/purchaseofbank",label:"Add Cheque Purchase Invoice"}]},{key:"/admin/reports",icon:(0,i.jsx)(c,{}),label:"Reports",children:[{key:"/admin/datewisesalereport",label:"Total Sales Reports"},{key:"/admin/paidinvoices",label:"Paid Invoices Reports"},{key:"/admin/expirydetector",label:"Expiry Detector"}]}];var N=()=>{let e=(0,j.s0)(),n=(0,j.TH)(),{token:a}=b.Z.useToken(),r=async()=>{try{await (0,v.w7)(Z.I),p.ZP.success("Logged out successfully"),e("/signin")}catch(e){p.ZP.error("Failed to log out")}},l=(0,i.jsxs)(y.Z,{children:[(0,i.jsx)(y.Z.Item,{children:"Profile"},"profile"),(0,i.jsx)(y.Z.Item,{children:"Settings"},"settings"),(0,i.jsx)(y.Z.Divider,{}),(0,i.jsx)(y.Z.Item,{onClick:r,icon:(0,i.jsx)(u.Z,{}),children:"Logout"},"logout")]});return(0,i.jsxs)(f.default,{style:{minHeight:"100vh",overflow:"hidden"},children:[(0,i.jsx)("style",{children:"\n          .sidebar {\n            background: #001529;\n            overflow: hidden; /* Ensure no scrollbar on sidebar */\n          }\n\n          .menu .ant-menu-item {\n            color: #fff;\n          }\n\n          .menu .ant-menu-item:hover {\n          \n             background: rgba(255, 255, 255, 0.2);\n            color: #fca311;\n          }\n\n          .menu .ant-menu-item-selected {\n            background: rgba(255, 255, 255, 0.2);\n            color: #fca311;\n          }\n\n          .menu .ant-menu-submenu {\n            background: #001529;\n          }\n\n          .menu .ant-menu-submenu-title {\n            color: #fff;\n          }\n\n          .menu .ant-menu-submenu-title:hover {\n            background: rgba(255, 255, 255, 0.2);\n            color: #fca311;\n          }\n\n          .user-button {\n            margin-left: 16px;\n          }\n\n          .user-button .ant-avatar {\n            background: #fca311;\n          }\n\n          .user-button .ant-typography {\n            color: #fff;\n          }\n\n          .ant-layout-footer {\n            background: #001529;\n            color: #fff;\n          }\n\n          .refresh-button {\n            margin-right: 16px;\n            color: #fca311;\n          }\n\n          // .logo {\n          //   height: 32px;\n          //   margin-right: 16px;\n          // }\n\n          .header-content {\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n          }\n        "}),(0,i.jsx)(P,{children:(0,i.jsxs)("div",{className:"header-content",children:[(0,i.jsx)("img",{style:{height:"60px"},src:"https://img.icons8.com/?size=160&id=I2iJf1544eWE&format=png",alt:"Logo",className:"logo"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(g.ZP,{type:"text",className:"refresh-button",icon:(0,i.jsx)(m.Z,{}),onClick:()=>{p.ZP.success("Data refreshed!")},title:"Refresh Data"}),(0,i.jsx)(k.Z,{overlay:l,trigger:["click"],children:(0,i.jsxs)(g.ZP,{type:"text",className:"user-button",children:[(0,i.jsx)(x.C,{icon:(0,i.jsx)(t.Z,{})}),(0,i.jsx)(A,{style:{marginLeft:8},children:"Admin Dashboard"})]})})]})]})}),(0,i.jsxs)(f.default,{children:[(0,i.jsx)(C,{width:240,className:"sidebar",children:(0,i.jsx)(y.Z,{mode:"inline",selectedKeys:[n.pathname],onClick:n=>e(n.key),className:"menu",children:E.map(e=>(0,i.jsx)(y.Z.SubMenu,{icon:e.icon,title:e.label,children:e.children.map(e=>(0,i.jsx)(y.Z.Item,{children:e.label},e.key))},e.key))})}),(0,i.jsx)(f.default,{style:{marginLeft:0,overflow:"hidden"},children:(0,i.jsx)(w,{style:{margin:0,minHeight:"75vh",background:a.colorBgContainer,padding:24,borderRadius:a.borderRadiusLG,overflowY:"auto"},children:(0,i.jsx)(j.j3,{})})})]})]})}},94205:function(e,n,a){"use strict";a.d(n,{I:function(){return o},db:function(){return s}});var i=a(83977),r=a(91259),t=a(39828);let l=(0,i.ZF)({apiKey:"AIzaSyCuQ3wNmtDNAZMhZe9MRjpTn1kAvDp4SOA",authDomain:"point-of-sale-8a42d.firebaseapp.com",projectId:"point-of-sale-8a42d",storageBucket:"point-of-sale-8a42d.appspot.com",messagingSenderId:"283428202868",appId:"1:283428202868:web:0c99ca55251c4294136421",measurementId:"G-Q0928NKHEQ"}),o=(0,r.v0)(l),s=(0,t.ad)(l)}},function(e){e.O(0,[16,257,644,837,825,761,861,250,483,888,774,179],function(){return e(e.s=43370)}),_N_E=e.O()}]);
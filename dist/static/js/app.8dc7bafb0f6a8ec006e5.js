webpackJsonp([1],{"/axM":function(e,t,a){e.exports=a.p+"static/img/flowers-7954719_1280.e4a6919.png"},"1zQH":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClElEQVR4nO2Zz4tOURzGv4MiiS3zI/kxjB8lTTb+ASSxslNjGsNI0pSys1I2s5GysGAyzGiShKwshqWsbCilZjCUN6QsRuaj0/u8uel97/vO63vve0/Np+7m3nue5/vUOeeec67ZIgUDOAi8J52vwDOgD2izIgJ8YGGMFTIMMJMocrrK8zagHTgB/NB7x6xoAAcUZhrYX+fdQQV5aTEDLAe+KMw2ixnKYyQwZDFDeawEJixmgC0K8rmQs1eTU3aPxQxwR0FOWcwAJxVk3GIG6FGQ2cVxUhSACVrPc48gQ61OAbz1CLJdYrP/LbZw75vyvughFlbFnyS41aXCBgBWaRU+D2z0Ep1UkEEXwQYA+uX51LwAzkj0tptoHcIAd98TATsl+tFNNAWgW13qO7DSvNA4CYvHQLebcA2AS/K6bt4A9yQ+4C6eAFiiXWxgr3kDnJX4LXfxBMA++bzJZFkE7JLBjLt49ZXEBcsCjZPKPn5TRh5rgJ/Ab6ArC4+K0X0F6c9I/7T0n2ShnzQ6J6PRjPRfSP9oFvpJo921DvgctHdIuwSs8NavNjUGo8AGZ+0R6V711E0zfCDDPkfNZdqFBnq9dOuZDsvwhqPmYWm+8tJsxLRXpu8ymA2HvTQbMV2q/yje/ALW5hZEYR46h5gHruQaQkHOq4BrFjPAHgV5bTFDeboMm55Au8UMf78nxy1mgAEFmbKYAVYnliuXgfVharYYAY4Ac47T8FQrwxxyDDIHrGtVkFEVET6SHboepf1XAcZT2ozln6JcVGXV2pG416V7pRptSiltvuVV+79FVb4nnY0WRRNtMidx3hW6Rqeux7o36dUmr9/YldOVJKH7bPZqY3mgwXpXXSZc4fQ+taBm2gT+AHVAko/0/qP/AAAAAElFTkSuQmCC"},"56L0":function(e,t,a){e.exports=a.p+"static/img/barbary-macaque-8142917_1280.cec8cf3.png"},"8S7r":function(e,t){},"EX/V":function(e,t,a){e.exports=a.p+"static/img/pexels-photo-5185446.8cf84eb.png"},ITUG:function(e,t,a){e.exports=a.p+"static/img/alley-8289479_1280.960198d.png"},Ik1s:function(e,t,a){e.exports=a.p+"static/img/free-photo-of-silueta-modelo-en-pie-esfera.ff5c642.png"},J6FR:function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("sWs5");var r=a("7+uW"),i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var s=a("VU/8")({name:"App"},i,!1,function(e){a("s347")},null,null).exports,o=a("/ocq"),n=a("Gu7T"),l=a.n(n),c=a("mtWM"),u={user:{available_money:0,password:null,username:null,email:null,profile_pic:null,biography:null,name:null,lastname:null,photos:[]}},d={name:"PostView",data:function(){return{selectedImage:null,selectedOption:"public",imageTitle:"",imagePrice:0,userId:u.user.username}},methods:{openFileSelector:function(){this.$refs.fileInput.click()},handleFileSelect:function(e){var t=e.target.files[0];t&&(this.selectedImage=URL.createObjectURL(t))},uploadImage:function(){var e={url:this.selectedImage,title:this.imageTitle,price:this.imagePrice,user_id:this.userId};console.log(e);c.a.post("/photos",e,{headers:{"Content-Type":"application/json"}}).then(function(e){console.log("Image posted successfully",e.data)}).catch(function(e){console.error("Error",e)}),this.$emit("cancel")},cancel:function(){this.$emit("cancel")}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main-container"},[a("div",{staticClass:"container"},[a("h2",{staticClass:"title"},[e._v("POST IMAGE")]),e._v(" "),a("input",{ref:"fileInput",staticStyle:{display:"none"},attrs:{type:"file"},on:{change:e.handleFileSelect}}),e._v(" "),a("button",{on:{click:e.openFileSelector}},[e._v("Seleccionar una imagen")]),e._v(" "),e.selectedImage?a("img",{staticClass:"max-width-image",attrs:{src:e.selectedImage,alt:"Imagen seleccionada"}}):e._e(),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.imageTitle,expression:"imageTitle"}],attrs:{type:"text",placeholder:"Título de la imagen"},domProps:{value:e.imageTitle},on:{input:function(t){t.target.composing||(e.imageTitle=t.target.value)}}}),e._v(" "),a("div",{staticClass:"checkboxes"},[a("label",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedOption,expression:"selectedOption"}],attrs:{type:"radio",value:"public"},domProps:{checked:e._q(e.selectedOption,"public")},on:{change:function(t){e.selectedOption="public"}}}),e._v(" Public\n      ")]),e._v(" "),a("label",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedOption,expression:"selectedOption"}],attrs:{type:"radio",value:"private"},domProps:{checked:e._q(e.selectedOption,"private")},on:{change:function(t){e.selectedOption="private"}}}),e._v(" Private\n      ")])]),e._v(" "),a("div",{staticClass:"botones"},[a("button",{on:{click:e.uploadImage}},[e._v("POST")]),e._v(" "),a("button",{on:{click:e.cancel}},[e._v("Cancel")])])])])},staticRenderFns:[]};var m=a("VU/8")(d,p,!1,function(e){a("t4uZ")},"data-v-781d5372",null).exports,v={name:"HeaderMenu",props:{title:String,money:Number},computed:{userState:function(){return u}},data:function(){return{showOverlay:!1}},components:{PostView:m},methods:{toggleOverlay:function(){this.showOverlay=!this.showOverlay}}},f={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("header",[r("div",{staticClass:"nav-bar"},[r("h1",[r("router-link",{attrs:{to:"/inicio"}},[e._v("OnlyPics")])],1),e._v(" "),e._m(0),e._v(" "),r("a",{staticClass:"buy-icon",attrs:{href:"#"}},[r("img",{staticClass:"buy-button",attrs:{src:a("1zQH"),alt:"Carro"}}),e._v(" "),r("p",{staticClass:"nav-money"},[e._v(e._s(e.money)+" €")])]),e._v(" "),r("button",{staticClass:"round-button",on:{click:function(t){return e.toggleOverlay()}}},[e._v("+")]),e._v(" "),e.showOverlay?r("PostView",{on:{cancel:function(t){return e.toggleOverlay()}}}):e._e(),e._v(" "),r("div",{staticClass:"dropdown"},[r("button",{staticClass:"dropbtn"},[e._v(e._s(e.userState.user.username)+" ")]),e._v(" "),r("div",{staticClass:"dropdown-content"},[r("router-link",{attrs:{to:"/profile"}},[e._v("Profile "),r("i",{staticClass:"fas fa-circle-user",staticStyle:{"margin-left":"20px"}})]),e._v(" "),r("router-link",{attrs:{to:"/settings"}},[e._v("Settings "),r("i",{staticClass:"fas fa-cog",staticStyle:{"margin-left":"10px"}})]),e._v(" "),e._m(1)],1)])],1),e._v(" "),r("div",{staticClass:"select-bar"},[r("h2",[e._v(e._s(e.title))]),e._v(" "),r("nav",[r("router-link",{attrs:{to:"/inicio"}},[e._v("Home")]),e._v(" /\n        "),r("router-link",{attrs:{to:"/account"}},[e._v("Search")]),e._v(" /\n        "),r("router-link",{attrs:{to:"/"}},[e._v(e._s(e.title))])],1)])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"search-bar"},[t("div",{staticClass:"search-bar"},[t("input",{staticClass:"search-input",attrs:{type:"text",placeholder:"Cerca..."}}),this._v(" "),t("button",{staticClass:"search-button"},[this._v("Cerca")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("a",{attrs:{href:"/"}},[this._v("Log Out "),t("i",{staticClass:"fas fa-sign-out-alt",staticStyle:{"margin-left":"13px"}})])}]};var _=a("VU/8")(v,f,!1,function(e){a("kdqx")},"data-v-ba04ad00",null).exports,g={name:"FooterView",computed:{userState:function(){return u}}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("footer",[a("div",{staticClass:"footer-content"},[a("div",{staticClass:"footer-section"},[a("h2",[e._v("Navigation")]),e._v(" "),a("ul",[a("li",[a("router-link",{attrs:{to:"/inicio"}},[e._v("Home  "),a("i",{staticClass:"fas fa-house",staticStyle:{"margin-left":"7px"}})])],1),e._v(" "),a("li",[a("router-link",{attrs:{to:"/profile"}},[e._v("Account "),a("i",{staticClass:"fas fa-circle-user",staticStyle:{"margin-left":"7px"}})])],1)])]),e._v(" "),a("div",{staticClass:"footer-section"},[a("h2",[e._v("Contact")]),e._v(" "),e._m(0),e._v(" "),a("p",{staticStyle:{"margin-left":"30px"}},[e._v(e._s(e.userState.user.email)+" "),a("i",{staticClass:"fa-solid fa-envelope",staticStyle:{"margin-left":"7px"}})])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Barcelona, Spain"),t("i",{staticClass:"fa-solid fa-location-dot",staticStyle:{"margin-left":"10px"}})])}]};var b=a("VU/8")(g,h,!1,function(e){a("PM07")},"data-v-07c291cd",null).exports,C={name:"PaginaInicio",components:{FooterView:b,HeaderMenu:_},data:function(){return{mostrarFiltros:!1,filtrar:null,orden:null,imagenesAleatorias:[{id:1,url:a("ITUG"),titulo:"Aslley",precio:50,likes:50},{id:2,url:a("56L0"),titulo:"Barbary macaque",precio:0,likes:30},{id:3,url:a("yfsa"),titulo:"Bear",precio:0,likes:25},{id:4,url:a("TjJz"),titulo:"Dragon fly",precio:15,likes:30},{id:5,url:a("/axM"),titulo:"Flowers",precio:0,likes:100},{id:6,url:a("S/M4"),titulo:"Frase",precio:96,likes:150},{id:7,url:a("qtws"),titulo:"Italia",precio:0,likes:0},{id:8,url:a("Ik1s"),titulo:"Esfera",precio:18,likes:46},{id:9,url:a("Y8iP"),titulo:"Mantis",precio:0,likes:22},{id:10,url:a("EX/V"),titulo:"Patos",precio:25,likes:15},{id:11,url:a("t7d0"),titulo:"Cúpula",precio:0,likes:36},{id:12,url:a("g1mU"),titulo:"Flores",precio:0,likes:150},{id:13,url:a("tTDl"),titulo:"Casa en la nieve",precio:12,likes:3e3},{id:14,url:a("umny"),titulo:"Mar",precio:56,likes:200},{id:15,url:a("W/8D"),titulo:"Wind surf",precio:44,likes:5},{id:16,url:a("u01K"),titulo:"Flores",precio:88,likes:1},{id:17,url:a("m9nq"),titulo:"Bizcocho",precio:0,likes:22},{id:18,url:a("ce/W"),titulo:"Montaña",precio:0,likes:43},{id:19,url:a("Zque"),titulo:"Oriental",precio:12,likes:189},{id:20,url:a("iOsn"),titulo:"Train",precio:22,likes:202}]}},methods:{mostrarFiltrosDialog:function(){this.mostrarFiltros=!0},aplicarFiltros:function(){this.mostrarFiltros=!1},mostrarImagenesFiltradas:function(){var e=[].concat(l()(this.imagenesAleatorias));return"publicas"===this.filtrar?e=e.filter(function(e){return 0===e.precio}):"privadas"===this.filtrar&&(e=e.filter(function(e){return e.precio>0})),"popularidad_as"===this.orden?e.sort(function(e,t){return e.likes-t.likes}):"popularidad_des"===this.orden?e.sort(function(e,t){return t.likes-e.likes}):"precio_as"===this.orden?e.sort(function(e,t){return e.precio-t.precio}):"precio_des"===this.orden&&e.sort(function(e,t){return t.precio-e.precio}),e}}},w={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("body",{staticStyle:{"background-color":"#EEA3FF"}},[a("HeaderMenu",{attrs:{title:"Random",money:"0.0"}}),e._v(" "),a("div",{staticClass:"header"},[a("div",{staticClass:"filter-button-container"},[this.mostrarFiltros?e._e():a("button",{on:{click:e.mostrarFiltrosDialog}},[e._v("Filtrar y Ordenar")]),e._v(" "),this.mostrarFiltros?a("div",{staticClass:"filter-modal"},[a("div",{staticClass:"filter-content"},[a("div",{staticClass:"filter-selection"},[a("h3",[e._v("Filtrar por")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.filtrar,expression:"filtrar"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.filtrar=t.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"publicas"}},[e._v("Públicas")]),e._v(" "),a("option",{attrs:{value:"privadas"}},[e._v("Privadas")]),e._v(" "),a("option",{attrs:{value:"ambas"}},[e._v("Ambas")])])]),e._v(" "),a("div",{staticClass:"filter-section"},[a("h3",[e._v("Ordenar por")]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.orden,expression:"orden"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.orden=t.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"popularidad_as"}},[e._v("Popularidad ascendente")]),e._v(" "),a("option",{attrs:{value:"popularidad_des"}},[e._v("Popularidad descendente")]),e._v(" "),"publicas"!=e.filtrar?a("option",{attrs:{value:"precio_as"}},[e._v("Precio ascendente")]):e._e(),e._v(" "),"publicas"!=e.filtrar?a("option",{attrs:{value:"precio_des"}},[e._v("Precio descendente")]):e._e()])]),e._v(" "),a("div",{staticClass:"button-filtrar"},[a("button",{on:{click:e.aplicarFiltros}},[e._v("Cerrar")])])])]):e._e()])]),e._v(" "),a("div",{staticClass:"gallery"},[a("div",{staticClass:"row"},e._l(e.mostrarImagenesFiltradas(),function(t){return a("div",{key:t.id,staticClass:"col-md-4"},[a("div",{staticClass:"card"},[e._m(0,!0),e._v(" "),a("img",{staticClass:"card-img-top",attrs:{src:t.url,alt:""}}),e._v(" "),a("div",{staticClass:"card-body"},[a("h5",{staticClass:"card-title"},[e._v(e._s(t.titulo))]),e._v(" "),a("p",{staticClass:"card-text"},[e._v(e._s(t.precio)+"🪙")]),e._v(" "),a("p",{staticClass:"card-text"},[e._v(e._s(t.likes)+"❤")])])])])}),0)]),e._v(" "),a("footer-view")],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"usuario-info"},[this._v("\n            👤 "),this._v(" "),t("span",[this._v("Usuario")])])}]};var x=a("VU/8")(C,w,!1,function(e){a("V00z")},"data-v-49640051",null).exports,y={name:"LogIn",data:function(){return{logged:!1,email:null,password:null,username:null,token:null,is_admin:null,creatingAccount:!1,money_available:null,addUserForm:{password:null,username:null,email:null},view:!0}},methods:{initCreateForm:function(){this.creatingAccount=!0,this.addUserForm.username=null,this.addUserForm.password=null,this.addUserForm.email=null},checkLogin:function(){var e=this,t="/userN/"+this.addUserForm.username;c.a.get(t).then(function(t){e.addUserForm.password===t.data.password?(u.user={username:t.data.username,password:t.data.password,available_money:t.data.available_money,email:t.data.email},e.$router.push({path:"/inicio"}),alert("Succesfully logged")):alert("Incorrect Password")}).catch(function(e){console.error(e),alert("Email or Password incorrect")})},goToMatches:function(){this.$router.push({path:"/"}),window.location.reload()},createUser:function(){var e=this,t={username:this.addUserForm.username,password:this.addUserForm.password,email:this.addUserForm.email,available_money:0};c.a.post("/user",t).then(function(t){console.log("Account created"),alert("Account created successfully"),e.$router.push({path:"/"}),window.location.reload()}).catch(function(e){console.log("Se ha producido un error"),console.log(e),alert("Error creating the account")})},toggleView:function(){this.view=!this.view}}},A={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[e._m(0),e._v(" "),a("div",{staticClass:"right-container"},[a("div",{staticClass:"col-md-6"},[e.view?a("div",{staticClass:"signin-form"},[a("h2",[e._v("Create new Account")]),e._v(" "),a("p",{staticClass:"text-center"},[e._v("\n          Already Registered? "),a("a",{attrs:{href:"#"},on:{click:e.toggleView}},[e._v("Log In")])]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"username"}},[e._v("Username")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.addUserForm.username,expression:"addUserForm.username"}],staticClass:"form-control smaller-input",attrs:{type:"text",id:"username",placeholder:"Username",required:""},domProps:{value:e.addUserForm.username},on:{input:function(t){t.target.composing||e.$set(e.addUserForm,"username",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"password"}},[e._v("Password")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.addUserForm.password,expression:"addUserForm.password"}],staticClass:"form-control smaller-input",attrs:{type:"password",id:"password",placeholder:"Password",required:""},domProps:{value:e.addUserForm.password},on:{input:function(t){t.target.composing||e.$set(e.addUserForm,"password",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"email"}},[e._v("Email")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.addUserForm.email,expression:"addUserForm.email"}],staticClass:"form-control smaller-input",attrs:{type:"email",id:"email",placeholder:"Email",required:""},domProps:{value:e.addUserForm.email},on:{input:function(t){t.target.composing||e.$set(e.addUserForm,"email",t.target.value)}}})]),e._v(" "),a("button",{staticClass:"btn btn-primary",on:{click:e.createUser}},[e._v("SIGN UP")])]):a("div",{staticClass:"signin-form"},[a("h2",[e._v("Log In")]),e._v(" "),a("p",{staticClass:"text-center"},[e._v("\n          New? "),a("a",{attrs:{href:"#"},on:{click:e.toggleView}},[e._v("Sign In")])]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"username"}},[e._v("Username")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.addUserForm.username,expression:"addUserForm.username"}],staticClass:"form-control smaller-input",attrs:{type:"username",id:"username",placeholder:"Username",required:""},domProps:{value:e.addUserForm.username},on:{input:function(t){t.target.composing||e.$set(e.addUserForm,"username",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"password"}},[e._v("Password")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.addUserForm.password,expression:"addUserForm.password"}],staticClass:"form-control smaller-input",attrs:{type:"password",id:"password",placeholder:"Password",required:""},domProps:{value:e.addUserForm.password},on:{input:function(t){t.target.composing||e.$set(e.addUserForm,"password",t.target.value)}}})]),e._v(" "),a("button",{staticClass:"btn btn-primary",on:{click:e.checkLogin}},[e._v("LOG IN")])])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"left-container"},[t("h1",{staticClass:"text-white"},[this._v("OnlyPics")])])}]};var F=a("VU/8")(y,A,!1,function(e){a("8S7r")},"data-v-51990770",null).exports,k={name:"Settings",data:function(){return{nombre:"",apellido:"",biografia:"",username:"",fechaNacimiento:"",perfil:"",email:""}},methods:{guardarInformacion:function(){var e={email:this.email,username:this.username};c.a.put("http://127.0.0.1:8000/user",e).then(function(e){console.log("Información guardada"),alert("Tu información ha sido actualizada exitosamente.")}).catch(function(e){console.error("Error al guardar la información",e),alert("Se produjo un error al guardar la información.")})},borrarCuenta:function(){var e=this.email;confirm("¿Estás seguro de que deseas eliminar tu cuenta?")&&c.a.delete("http://127.0.0.1:8000/user",{data:{email:e}}).then(function(e){console.log("Cuenta eliminada"),alert("Tu cuenta ha sido eliminada exitosamente.")}).catch(function(e){console.error("Error al eliminar la cuenta",e),alert("Se produjo un error al eliminar la cuenta.")})}}},U={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"bloque"},[a("div",{staticClass:"user-info-form"},[a("br"),e._v(" "),a("label",{attrs:{for:"username"}},[e._v("Username:")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",id:"username"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),e._v(" "),a("br"),e._v(" "),a("label",{attrs:{for:"nombre"}},[e._v("Nombre:")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.nombre,expression:"nombre"}],attrs:{type:"text",id:"nombre"},domProps:{value:e.nombre},on:{input:function(t){t.target.composing||(e.nombre=t.target.value)}}}),e._v(" "),a("br"),e._v(" "),a("label",{attrs:{for:"apellido"}},[e._v("Apellido:")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.apellido,expression:"apellido"}],attrs:{type:"text",id:"apellido"},domProps:{value:e.apellido},on:{input:function(t){t.target.composing||(e.apellido=t.target.value)}}}),e._v(" "),a("br"),e._v(" "),a("label",{attrs:{for:"email"}},[e._v("Email:")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{type:"email",id:"email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),e._v(" "),a("br"),e._v(" "),a("label",{attrs:{for:"biografia"}},[e._v("Biografía:")]),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.biografia,expression:"biografia"}],attrs:{id:"biografia",rows:"5"},domProps:{value:e.biografia},on:{input:function(t){t.target.composing||(e.biografia=t.target.value)}}}),e._v(" "),a("br"),e._v(" "),a("label",{attrs:{for:"fotoPerfil"}},[e._v("Foto de Perfil:")]),e._v(" "),a("input",{attrs:{type:"file",id:"fotoPerfil"},on:{change:e.handleFileUpload}}),e._v(" "),a("br"),e._v(" "),a("button",{on:{click:e.guardarInformacion}},[e._v("Guardar Información")]),e._v(" "),a("button",{on:{click:e.borrarCuenta}},[e._v("Borrar Cuenta")])])])])},staticRenderFns:[]};var P=a("VU/8")(k,U,!1,function(e){a("J6FR")},"data-v-15e49538",null).exports,S={name:"Profile",components:{HeaderMenu:_,FooterView:b},data:function(){return{userState:u,photos:[]}},methods:{fetchUserPhotos:function(e){var t=this;try{var a="/user/"+e+"/photos";c.a.get(a).then(function(e){200===e.status?(t.photos=e.data,console.log(t.photos),t.userState.user.photos=t.photos):console.error("Error fetching user photos: Invalid response status")}).catch(function(e){console.error("Error fetching user photos",e)})}catch(e){console.error("Error in the try-catch block",e)}}},created:function(){var e=u.user.username;this.fetchUserPhotos(e),console.log(u.user.photos)}},E={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"profile"},[a("HeaderMenu",{attrs:{title:"Profile",money:e.userState.user.available_money}}),e._v(" "),a("div",{staticClass:"profile-container"},[a("div",{staticClass:"profile-pic"},[a("img",{attrs:{src:e.userState.user.profile_pic||null}}),e._v(" "),e.userState.user.profile_pic?e._e():a("i",{staticClass:"fas fa-circle-user fa-10x"})]),e._v(" "),a("div",{staticClass:"user-info"},[a("h1",{staticClass:"username"},[e._v(" "+e._s(e.userState.user.username)+" ")]),e._v(" "),e.userState.user.biography?a("p",{staticClass:"biography"},[e._v(e._s(e.userState.user.biography))]):a("p",{staticClass:"biography"},[e._v("Biography")])])]),e._v(" "),e._m(0),e._v(" "),e.photos?a("div",{staticClass:"pics-grid"},e._l(e.photos,function(t){return a("div",{key:t.id,staticClass:"photo"},[a("img",{staticClass:"card-img-top",attrs:{src:t.url,alt:""}}),e._v(" "),a("div",{staticClass:"image-container"},[a("p",[e._v(e._s(t.title))])])])}),0):e._e(),e._v(" "),a("footer-view")],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("p",{staticClass:"text-latest"},[this._v(" Latest Pics ")])])}]};var I=a("VU/8")(S,E,!1,function(e){a("XjOe")},"data-v-848ffb52",null).exports;r.a.use(o.a);var O=new o.a({routes:[{path:"/",name:"Login",component:F},{path:"/inicio",name:"Inicio",component:x},{path:"/profile",name:"Profile",component:I},{path:"/settings",name:"Settings",component:P}]});r.a.config.productionTip=!1,u.user.available_money=0,new r.a({el:"#app",router:O,components:{App:s},template:"<App/>"})},PM07:function(e,t){},"S/M4":function(e,t,a){e.exports=a.p+"static/img/free-photo-of-corazon-firmar-pared-forma.6f1e24b.png"},TjJz:function(e,t,a){e.exports=a.p+"static/img/dragon-fly-8229773_640.bc9d951.png"},V00z:function(e,t){},"W/8D":function(e,t,a){e.exports=a.p+"static/img/pexels-photo-12809204.48dc3b1.png"},XjOe:function(e,t){},Y8iP:function(e,t,a){e.exports=a.p+"static/img/mantis-8194123_1280.8f5fd0b.png"},Zque:function(e,t,a){e.exports=a.p+"static/img/torii-8254663_1280.1c48c75.png"},"ce/W":function(e,t,a){e.exports=a.p+"static/img/residential-8278516_1280.b3bbe66.png"},g1mU:function(e,t,a){e.exports=a.p+"static/img/pexels-photo-10376281.0711406.png"},iOsn:function(e,t,a){e.exports=a.p+"static/img/train-8302635_640.f99a198.png"},kdqx:function(e,t){},m9nq:function(e,t,a){e.exports=a.p+"static/img/pexels-photo-18602619.cc03711.png"},qtws:function(e,t,a){e.exports=a.p+"static/img/free-photo-of-mar-ciudad-barco-italia.07313ec.png"},s347:function(e,t){},sWs5:function(e,t){},t4uZ:function(e,t){},t7d0:function(e,t,a){e.exports=a.p+"static/img/pexels-photo-10322825.27bb44c.png"},tTDl:function(e,t,a){e.exports=a.p+"static/img/pexels-photo-10870571.eb326db.png"},u01K:function(e,t,a){e.exports=a.p+"static/img/pexels-photo-14653888.04e2fa5.png"},umny:function(e,t,a){e.exports=a.p+"static/img/pexels-photo-12562449.b3d42b2.png"},yfsa:function(e,t,a){e.exports=a.p+"static/img/bear-8275920_640.068329d.png"}},["NHnr"]);
//# sourceMappingURL=app.8dc7bafb0f6a8ec006e5.js.map
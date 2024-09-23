var Be=Object.defineProperty;var je=(n,t,e)=>t in n?Be(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var b=(n,t,e)=>je(n,typeof t!="symbol"?t+"":t,e);var Y=window,G=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Wt=Symbol(),qt=new WeakMap,J=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Wt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(G&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=qt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&qt.set(e,t))}return t}toString(){return this.cssText}},Kt=n=>new J(typeof n=="string"?n:n+"",void 0,Wt);var mt=(n,t)=>{G?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{let s=document.createElement("style"),i=Y.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)})},Z=G?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Kt(e)})(n):n;var vt,X=window,Yt=X.trustedTypes,Ve=Yt?Yt.emptyScript:"",Jt=X.reactiveElementPolyfillSupport,gt={toAttribute(n,t){switch(t){case Boolean:n=n?Ve:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Gt=(n,t)=>t!==n&&(t==t||n==n),ft={attribute:!0,type:String,converter:gt,reflect:!1,hasChanged:Gt},$t="finalized",E=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach((e,s)=>{let i=this._$Ep(s,e);i!==void 0&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=ft){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){let s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){let r=this[t];this[e]=i,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||ft}static finalize(){if(this.hasOwnProperty($t))return!1;this[$t]=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(Z(i))}else t!==void 0&&e.push(Z(t));return e}static _$Ep(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;let e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return mt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=ft){var i;let r=this.constructor._$Ep(t,s);if(r!==void 0&&s.reflect===!0){let o=(((i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?s.converter:gt).toAttribute(e,s.type);this._$El=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(t,e){var s;let i=this.constructor,r=i._$Ev.get(t);if(r!==void 0&&this._$El!==r){let o=i.getPropertyOptions(r),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?o.converter:gt;this._$El=r,this[r]=l.fromAttribute(e,o.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||Gt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,r)=>this[r]=i),this._$Ei=void 0);let e=!1,s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var r;return(r=i.hostUpdate)===null||r===void 0?void 0:r.call(i)}),this.update(s)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};E[$t]=!0,E.elementProperties=new Map,E.elementStyles=[],E.shadowRootOptions={mode:"open"},Jt?.({ReactiveElement:E}),((vt=X.reactiveElementVersions)!==null&&vt!==void 0?vt:X.reactiveElementVersions=[]).push("1.6.3");var _t,Q=window,N=Q.trustedTypes,Zt=N?N.createPolicy("lit-html",{createHTML:n=>n}):void 0,At="$lit$",y=`lit$${(Math.random()+"").slice(9)}$`,ne="?"+y,ze=`<${ne}>`,C=document,tt=()=>C.createComment(""),I=n=>n===null||typeof n!="object"&&typeof n!="function",oe=Array.isArray,qe=n=>oe(n)||typeof n?.[Symbol.iterator]=="function",yt=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Xt=/-->/g,Qt=/>/g,S=RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,ee=/"/g,re=/^(?:script|style|textarea|title)$/i,ae=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),vs=ae(1),fs=ae(2),T=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),se=new WeakMap,w=C.createTreeWalker(C,129,null,!1);function le(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Zt!==void 0?Zt.createHTML(t):t}var We=(n,t)=>{let e=n.length-1,s=[],i,r=t===2?"<svg>":"",o=F;for(let l=0;l<e;l++){let a=n[l],c,h,d=-1,u=0;for(;u<a.length&&(o.lastIndex=u,h=o.exec(a),h!==null);)u=o.lastIndex,o===F?h[1]==="!--"?o=Xt:h[1]!==void 0?o=Qt:h[2]!==void 0?(re.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=S):h[3]!==void 0&&(o=S):o===S?h[0]===">"?(o=i??F,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?S:h[3]==='"'?ee:te):o===ee||o===te?o=S:o===Xt||o===Qt?o=F:(o=S,i=void 0);let m=o===S&&n[l+1].startsWith("/>")?" ":"";r+=o===F?a+ze:d>=0?(s.push(c),a.slice(0,d)+At+a.slice(d)+y+m):a+y+(d===-2?(s.push(void 0),l):m)}return[le(n,r+(n[e]||"<?>")+(t===2?"</svg>":"")),s]},B=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0,l=t.length-1,a=this.parts,[c,h]=We(t,e);if(this.el=n.createElement(c,s),w.currentNode=this.el.content,e===2){let d=this.el.content,u=d.firstChild;u.remove(),d.append(...u.childNodes)}for(;(i=w.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes()){let d=[];for(let u of i.getAttributeNames())if(u.endsWith(At)||u.startsWith(y)){let m=h[o++];if(d.push(u),m!==void 0){let pt=i.getAttribute(m.toLowerCase()+At).split(y),$=/([.?@])?(.*)/.exec(m);a.push({type:1,index:r,name:$[2],strings:pt,ctor:$[1]==="."?Et:$[1]==="?"?St:$[1]==="@"?wt:D})}else a.push({type:6,index:r})}for(let u of d)i.removeAttribute(u)}if(re.test(i.tagName)){let d=i.textContent.split(y),u=d.length-1;if(u>0){i.textContent=N?N.emptyScript:"";for(let m=0;m<u;m++)i.append(d[m],tt()),w.nextNode(),a.push({type:2,index:++r});i.append(d[u],tt())}}}else if(i.nodeType===8)if(i.data===ne)a.push({type:2,index:r});else{let d=-1;for(;(d=i.data.indexOf(y,d+1))!==-1;)a.push({type:7,index:r}),d+=y.length-1}r++}}static createElement(t,e){let s=C.createElement("template");return s.innerHTML=t,s}};function H(n,t,e=n,s){var i,r,o,l;if(t===T)return t;let a=s!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[s]:e._$Cl,c=I(t)?void 0:t._$litDirective$;return a?.constructor!==c&&((r=a?._$AO)===null||r===void 0||r.call(a,!1),c===void 0?a=void 0:(a=new c(n),a._$AT(n,e,s)),s!==void 0?((o=(l=e)._$Co)!==null&&o!==void 0?o:l._$Co=[])[s]=a:e._$Cl=a),a!==void 0&&(t=H(n,a._$AS(n,t.values),a,s)),t}var bt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;let{el:{content:s},parts:i}=this._$AD,r=((e=t?.creationScope)!==null&&e!==void 0?e:C).importNode(s,!0);w.currentNode=r;let o=w.nextNode(),l=0,a=0,c=i[0];for(;c!==void 0;){if(l===c.index){let h;c.type===2?h=new et(o,o.nextSibling,this,t):c.type===1?h=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(h=new Ct(o,this,t)),this._$AV.push(h),c=i[++a]}l!==c?.index&&(o=w.nextNode(),l++)}return w.currentNode=C,r}v(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},et=class n{constructor(t,e,s,i){var r;this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=(r=i?.isConnected)===null||r===void 0||r}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=H(this,t,e),I(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):qe(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==v&&I(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var e;let{values:s,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=B.createElement(le(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===r)this._$AH.v(s);else{let o=new bt(r,this),l=o.u(this.options);o.v(s),this.$(l),this._$AH=o}}_$AC(t){let e=se.get(t.strings);return e===void 0&&se.set(t.strings,e=new B(t)),e}T(t){oe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new n(this.k(tt()),this.k(tt()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},D=class{constructor(t,e,s,i,r){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){let r=this.strings,o=!1;if(r===void 0)t=H(this,t,e,0),o=!I(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else{let l=t,a,c;for(t=r[0],a=0;a<r.length-1;a++)c=H(this,l[s+a],e,a),c===T&&(c=this._$AH[a]),o||(o=!I(c)||c!==this._$AH[a]),c===v?t=v:t!==v&&(t+=(c??"")+r[a+1]),this._$AH[a]=c}o&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Et=class extends D{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}},Ke=N?N.emptyScript:"",St=class extends D{constructor(){super(...arguments),this.type=4}j(t){t&&t!==v?this.element.setAttribute(this.name,Ke):this.element.removeAttribute(this.name)}},wt=class extends D{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){var s;if((t=(s=H(this,t,e,0))!==null&&s!==void 0?s:v)===T)return;let i=this._$AH,r=t===v&&i!==v||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==v&&(i===v||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}},Ct=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){H(this,t)}};var ie=Q.litHtmlPolyfillSupport;ie?.(B,et),((_t=Q.litHtmlVersions)!==null&&_t!==void 0?_t:Q.litHtmlVersions=[]).push("2.8.0");var st=window,nt=st.ShadowRoot&&(st.ShadyCSS===void 0||st.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,he=Symbol(),ce=new WeakMap,it=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==he)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(nt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ce.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ce.set(e,t))}return t}toString(){return this.cssText}},de=n=>new it(typeof n=="string"?n:n+"",void 0,he);var Tt=(n,t)=>{nt?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{let s=document.createElement("style"),i=st.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)})},ot=nt?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return de(e)})(n):n;var xt,rt=window,ue=rt.trustedTypes,Ye=ue?ue.emptyScript:"",pe=rt.reactiveElementPolyfillSupport,Pt={toAttribute(n,t){switch(t){case Boolean:n=n?Ye:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},me=(n,t)=>t!==n&&(t==t||n==n),kt={attribute:!0,type:String,converter:Pt,reflect:!1,hasChanged:me},Ut="finalized",_=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach((e,s)=>{let i=this._$Ep(s,e);i!==void 0&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=kt){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){let s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){let r=this[t];this[e]=i,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||kt}static finalize(){if(this.hasOwnProperty(Ut))return!1;this[Ut]=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(ot(i))}else t!==void 0&&e.push(ot(t));return e}static _$Ep(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;let e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Tt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=kt){var i;let r=this.constructor._$Ep(t,s);if(r!==void 0&&s.reflect===!0){let o=(((i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?s.converter:Pt).toAttribute(e,s.type);this._$El=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(t,e){var s;let i=this.constructor,r=i._$Ev.get(t);if(r!==void 0&&this._$El!==r){let o=i.getPropertyOptions(r),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?o.converter:Pt;this._$El=r,this[r]=l.fromAttribute(e,o.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||me)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,r)=>this[r]=i),this._$Ei=void 0);let e=!1,s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var r;return(r=i.hostUpdate)===null||r===void 0?void 0:r.call(i)}),this.update(s)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};_[Ut]=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},pe?.({ReactiveElement:_}),((xt=rt.reactiveElementVersions)!==null&&xt!==void 0?xt:rt.reactiveElementVersions=[]).push("1.6.3");var Ot,at=window,L=at.trustedTypes,ve=L?L.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ht="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,be="?"+A,Je=`<${be}>`,P=document,V=()=>P.createComment(""),z=n=>n===null||typeof n!="object"&&typeof n!="function",Ee=Array.isArray,Ge=n=>Ee(n)||typeof n?.[Symbol.iterator]=="function",Nt=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,ge=/>/g,x=RegExp(`>|${Nt}(?:([^\\s"'>=/]+)(${Nt}*=${Nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$e=/'/g,_e=/"/g,Se=/^(?:script|style|textarea|title)$/i,we=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),f=we(1),Es=we(2),U=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ye=new WeakMap,k=P.createTreeWalker(P,129,null,!1);function Ce(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ve!==void 0?ve.createHTML(t):t}var Ze=(n,t)=>{let e=n.length-1,s=[],i,r=t===2?"<svg>":"",o=j;for(let l=0;l<e;l++){let a=n[l],c,h,d=-1,u=0;for(;u<a.length&&(o.lastIndex=u,h=o.exec(a),h!==null);)u=o.lastIndex,o===j?h[1]==="!--"?o=fe:h[1]!==void 0?o=ge:h[2]!==void 0?(Se.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=x):h[3]!==void 0&&(o=x):o===x?h[0]===">"?(o=i??j,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?x:h[3]==='"'?_e:$e):o===_e||o===$e?o=x:o===fe||o===ge?o=j:(o=x,i=void 0);let m=o===x&&n[l+1].startsWith("/>")?" ":"";r+=o===j?a+Je:d>=0?(s.push(c),a.slice(0,d)+Ht+a.slice(d)+A+m):a+A+(d===-2?(s.push(void 0),l):m)}return[Ce(n,r+(n[e]||"<?>")+(t===2?"</svg>":"")),s]},q=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0,l=t.length-1,a=this.parts,[c,h]=Ze(t,e);if(this.el=n.createElement(c,s),k.currentNode=this.el.content,e===2){let d=this.el.content,u=d.firstChild;u.remove(),d.append(...u.childNodes)}for(;(i=k.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes()){let d=[];for(let u of i.getAttributeNames())if(u.endsWith(Ht)||u.startsWith(A)){let m=h[o++];if(d.push(u),m!==void 0){let pt=i.getAttribute(m.toLowerCase()+Ht).split(A),$=/([.?@])?(.*)/.exec(m);a.push({type:1,index:r,name:$[2],strings:pt,ctor:$[1]==="."?Lt:$[1]==="?"?Rt:$[1]==="@"?Mt:M})}else a.push({type:6,index:r})}for(let u of d)i.removeAttribute(u)}if(Se.test(i.tagName)){let d=i.textContent.split(A),u=d.length-1;if(u>0){i.textContent=L?L.emptyScript:"";for(let m=0;m<u;m++)i.append(d[m],V()),k.nextNode(),a.push({type:2,index:++r});i.append(d[u],V())}}}else if(i.nodeType===8)if(i.data===be)a.push({type:2,index:r});else{let d=-1;for(;(d=i.data.indexOf(A,d+1))!==-1;)a.push({type:7,index:r}),d+=A.length-1}r++}}static createElement(t,e){let s=P.createElement("template");return s.innerHTML=t,s}};function R(n,t,e=n,s){var i,r,o,l;if(t===U)return t;let a=s!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[s]:e._$Cl,c=z(t)?void 0:t._$litDirective$;return a?.constructor!==c&&((r=a?._$AO)===null||r===void 0||r.call(a,!1),c===void 0?a=void 0:(a=new c(n),a._$AT(n,e,s)),s!==void 0?((o=(l=e)._$Co)!==null&&o!==void 0?o:l._$Co=[])[s]=a:e._$Cl=a),a!==void 0&&(t=R(n,a._$AS(n,t.values),a,s)),t}var Dt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;let{el:{content:s},parts:i}=this._$AD,r=((e=t?.creationScope)!==null&&e!==void 0?e:P).importNode(s,!0);k.currentNode=r;let o=k.nextNode(),l=0,a=0,c=i[0];for(;c!==void 0;){if(l===c.index){let h;c.type===2?h=new W(o,o.nextSibling,this,t):c.type===1?h=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(h=new Ft(o,this,t)),this._$AV.push(h),c=i[++a]}l!==c?.index&&(o=k.nextNode(),l++)}return k.currentNode=P,r}v(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},W=class n{constructor(t,e,s,i){var r;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=(r=i?.isConnected)===null||r===void 0||r}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=R(this,t,e),z(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==U&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Ge(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==p&&z(this._$AH)?this._$AA.nextSibling.data=t:this.$(P.createTextNode(t)),this._$AH=t}g(t){var e;let{values:s,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=q.createElement(Ce(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===r)this._$AH.v(s);else{let o=new Dt(r,this),l=o.u(this.options);o.v(s),this.$(l),this._$AH=o}}_$AC(t){let e=ye.get(t.strings);return e===void 0&&ye.set(t.strings,e=new q(t)),e}T(t){Ee(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new n(this.k(V()),this.k(V()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},M=class{constructor(t,e,s,i,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){let r=this.strings,o=!1;if(r===void 0)t=R(this,t,e,0),o=!z(t)||t!==this._$AH&&t!==U,o&&(this._$AH=t);else{let l=t,a,c;for(t=r[0],a=0;a<r.length-1;a++)c=R(this,l[s+a],e,a),c===U&&(c=this._$AH[a]),o||(o=!z(c)||c!==this._$AH[a]),c===p?t=p:t!==p&&(t+=(c??"")+r[a+1]),this._$AH[a]=c}o&&!i&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Lt=class extends M{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},Xe=L?L.emptyScript:"",Rt=class extends M{constructor(){super(...arguments),this.type=4}j(t){t&&t!==p?this.element.setAttribute(this.name,Xe):this.element.removeAttribute(this.name)}},Mt=class extends M{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){var s;if((t=(s=R(this,t,e,0))!==null&&s!==void 0?s:p)===U)return;let i=this._$AH,r=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==p&&(i===p||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}},Ft=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){R(this,t)}};var Ae=at.litHtmlPolyfillSupport;Ae?.(q,W),((Ot=at.litHtmlVersions)!==null&&Ot!==void 0?Ot:at.litHtmlVersions=[]).push("2.8.0");var Te=(n,t,e)=>{var s,i;let r=(s=e?.renderBefore)!==null&&s!==void 0?s:t,o=r._$litPart$;if(o===void 0){let l=(i=e?.renderBefore)!==null&&i!==void 0?i:null;r._$litPart$=o=new W(t.insertBefore(V(),l),l,void 0,e??{})}return o._$AI(n),o};var It,Bt;var g=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;let s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Te(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return U}};g.finalized=!0,g._$litElement$=!0,(It=globalThis.litElementHydrateSupport)===null||It===void 0||It.call(globalThis,{LitElement:g});var xe=globalThis.litElementPolyfillSupport;xe?.({LitElement:g});((Bt=globalThis.litElementVersions)!==null&&Bt!==void 0?Bt:globalThis.litElementVersions=[]).push("3.3.3");var ke="submit";var Pe="hashchange";function Qe(n=window.location.hash){let t=[],e=n.replace(/^#/,"").split("&");for(let s of e){let[i,r=""]=s.split("=");i&&t.push([i,decodeURIComponent(r.replace(/\+/g," "))])}return Object.fromEntries(t)}function jt(n){let t=new URLSearchParams(window.location.hash.slice(1));Object.entries(n).forEach(([i,r])=>{r?t.set(i,r):t.delete(i)}),t.sort();let e=t.toString();if(e===window.location.hash)return;let s=window.scrollY||document.documentElement.scrollTop;window.location.hash=e,window.scrollTo(0,s)}function Ue(n){let t=()=>{if(window.location.hash&&!window.location.hash.includes("="))return;let e=Qe(window.location.hash);n(e)};return t(),window.addEventListener(Pe,t),()=>{window.removeEventListener(Pe,t)}}var Oe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ne=n=>(...t)=>({_$litDirective$:n,values:t}),lt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var K=class extends lt{constructor(t){if(super(t),this.et=v,t.type!==Oe.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===v||t==null)return this.ft=void 0,this.et=t;if(t===T)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;let e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}};K.directiveName="unsafeHTML",K.resultType=1;var ct=Ne(K);var ts="/conf/mas/settings/dam/cfm/models/card",ht=class extends g{createRenderRoot(){return this}render(){if(this.fragment.model.path!==ts)return p;let t=Object.fromEntries(this.fragment.fields.map(e=>[e.name,e]));return f` <p>${this.fragment.path}</p>
            <sp-field-label for="card-variant">Variant</sp-field-label>
            <sp-picker
                id="card-variant"
                data-field="variant"
                value="${t.variant.values[0]}"
                @change="${this.updateFragment}"
            >
                <span slot="label">Choose a variant:</span>
                <sp-menu-item value="ccd-action">CCD Action</sp-menu-item>
                <sp-menu-item value="catalog">Catalog</sp-menu-item>
                <sp-menu-item value="special-offers"
                    >Special Offers</sp-menu-item
                >
                <sp-menu-item value="ah">AH</sp-menu-item>
            </sp-picker>
            <sp-field-label for="card-title">Title</sp-field-label>
            <sp-textfield
                placeholder="Enter card title"
                id="card-title"
                data-field="cardTitle"
                value="${t.cardTitle.values[0]}"
                @change="${this.updateFragment}"
            ></sp-textfield>
            <sp-field-label for="card-icon">Icons</sp-field-label>
            <sp-textfield
                placeholder="Enter icon URLs"
                id="card-icon"
                data-field="mnemonicIcon"
                multiline
                value="${t.mnemonicIcon.values.join(",")}"
                @change="${this.updateFragment}"
            ></sp-textfield>
            <sp-field-label for="card-icon">Background Image</sp-field-label>
            <sp-textfield
                placeholder="Enter backgroung image URL"
                id="background-title"
                data-field="backgroundImage"
                value="${t.backgroundImage.values[0]}"
                @change="${this.updateFragment}"
            ></sp-textfield>
            <sp-field-label for="horizontal"> Prices </sp-field-label>
            <sp-field-group horizontal id="horizontal">
                <rte-editor data-field="prices" @blur="${this.updateFragment}"
                    >${ct(t.prices.values[0])}</rte-editor
                >
            </sp-field-group>
            <sp-field-label for="horizontal"> Description </sp-field-label>
            <sp-field-group horizontal id="horizontal">
                <rte-editor
                    data-field="description"
                    @blur="${this.updateFragment}"
                    >${ct(t.description.values[0])}</rte-editor
                >
            </sp-field-group>
            <sp-field-label for="horizontal"> Footer </sp-field-label>
            <sp-field-group horizontal id="horizontal">
                <rte-editor data-field="ctas" @blur="${this.updateFragment}"
                    >${ct(t.ctas.values[0])}</rte-editor
                >
            </sp-field-group>`}updateFragment(t){this.dispatchEvent(new CustomEvent("update-fragment",{detail:t}))}};b(ht,"properties",{fragment:{type:Object}});customElements.define("merch-card-editor",ht);var Vt="[data-wcs-osi]",zt=class extends HTMLElement{constructor(){super(...arguments);b(this,"editor",null);b(this,"savedBookmark",null)}connectedCallback(){this.addEventListener("editor-action-click",this.handleEditorActionClick),window.tinymce.init({target:this,toolbar:"bold italic underline | link openlink unlink | ost",plugins:"link",license_key:"gpl",promotion:!1,branding:!1,extended_valid_elements:"a[is|href|class],span[is|class]",content_style:".price-strikethrough { text-decoration: line-through;}",setup:e=>{this.editor=e,e.on("blur",async s=>{this.savedBookmark=e.selection.getBookmark(2),[...e.contentDocument.querySelectorAll("p")].forEach(l=>{l.innerText.trim()===""&&l.remove()}),[...e.contentDocument.querySelectorAll("a")].forEach(l=>{Object.keys(l.dataset).forEach(a=>{/mce/.test(a)&&delete l.dataset[a]})});let i=[...e.contentDocument.querySelectorAll(Vt)];console.log("elements",i),i.forEach(l=>{l.dataset.wcsOsi&&(l.tagName==="A"?l.setAttribute("is","checkout-link"):l.tagName==="SPAN"&&l.setAttribute("is","inline-price"))}),e.contentDocument.body.innerHTML=`${e.contentDocument.body.innerHTML}`,i=[...e.contentDocument.querySelectorAll(Vt)],i.forEach(l=>{l.isInlinePrice&&(l.innerHTML=""),l.isCheckoutLink&&l.setAttribute("href",""),l.removeAttribute("class"),l.removeAttribute("contenteditable")}),es(e.contentDocument.body);let r=e.contentDocument.body.innerHTML;i.forEach(l=>{l.setAttribute("contenteditable","false"),l.render?.()});let o=new CustomEvent("blur",{bubbles:!0,composed:!0,detail:{value:r}});this.dispatchEvent(o)}),e.on("init",s=>{let i=document.querySelector('script[src$="mas.js"]')?.src??document.getElementById("mas-src").content;if(!i)return;let r=e.contentDocument.createElement("script");r.src=i,r.setAttribute("type","module"),e.contentDocument.head.appendChild(r);let o=e.contentDocument.createElement("script");o.innerHTML="window.process = { env: {} };",e.contentDocument.head.appendChild(o)}),e.on("SetContent",s=>{[...e.contentDocument.querySelectorAll("a[is],span[is]")].forEach(i=>{i.setAttribute("contenteditable","false")})}),e.ui.registry.addIcon("star-icon",`<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18">
  <title>Star</title>
  <rect id="ToDelete" fill="#ff13dc" opacity="0" width="18" height="18" /><path d="M9.24132.3l2.161,5.715,6.106.289a.255.255,0,0,1,.147.454l-4.77,3.823,1.612,5.9a.255.255,0,0,1-.386.28L9.00232,13.4l-5.11,3.358a.255.255,0,0,1-.386-.28l1.612-5.9-4.77-3.821a.255.255,0,0,1,.147-.457l6.107-.285L8.76332.3a.255.255,0,0,1,.478,0Z" />
</svg>`),e.ui.registry.addButton("ost",{icon:"star-icon",tooltip:"Open Offer Selector Tool",onAction:()=>{let s=new CustomEvent("ost-open",{bubbles:!0,composed:!0});this.dispatchEvent(s)}}),e.on("dblclick",s=>{s.preventDefault(),s.stopImmediatePropagation();let i=s.target.closest(Vt);if(i){let r=new CustomEvent("ost-open",{bubbles:!0,composed:!0,detail:{clickedElement:i}});this.dispatchEvent(r)}})}})}disconnectedCallback(){this.removeEventListener("editor-action-click",this.handleEditorActionClick)}appendContent(e,s){s&&s.remove(),this.editor&&(this.savedBookmark&&(this.editor.focus(),this.editor.selection.moveToBookmark(this.savedBookmark)),this.editor.insertContent(e))}};function es(n){let t=document.createTreeWalker(n,NodeFilter.SHOW_COMMENT,null,!1),e=[],s;for(;s=t.nextNode();)e.push(s);e.forEach(i=>i.parentNode.removeChild(i))}customElements.define("rte-editor",zt);var dt,De,Le,O,Re={"buy-now":"Buy now","free-trial":"Free trial","start-free-trial":"Start free trial","get-started":"Get started","choose-a-plan":"Choose a plan","learn-more":"Learn more","change-plan-team-plans":"Change Plan Team Plans",upgrade:"Upgrade","change-plan-team-payment":"Change Plan Team Payment","take-the-quiz":"Take the quiz","see-more":"See more","upgrade-now":"Upgrade now"},ss=["ccd-action","ah"],He={aosApiKey:"wcms-commerce-ims-user-prod",checkoutClientId:"creative",country:"US",environment:"PROD",landscape:"PUBLISHED",language:"en",searchParameters:{},searchOfferSelectorId:null,defaultPlaceholderOptions:{displayRecurrence:!0,displayPerUnit:!0,displayTax:!1,displayOldPrice:!1,forceTaxExclusive:!0},wcsApiKey:"wcms-commerce-ims-ro-user-cc",ctaTextOption:{ctaTexts:Object.entries(Re).map(([n,t])=>({id:n,name:t})),getDefaultText(){return this.ctaTexts[0].id},getTexts(){return this.ctaTexts},getSelectedText(n){let t=n.get("text");return t&&this.ctaTexts.find(e=>e.id===t)?t:this.getDefaultText()}}},is=(n,t,e,s,i)=>{if(!!t?.startsWith("checkout")){let o=document.createElement("a",{is:"checkout-link"});o.setAttribute("data-checkout-workflow",s.workflow),o.setAttribute("data-checkout-workflow-step",s.workflowStep??"segmentation"),o.setAttribute("data-promotion-code",i??""),o.setAttribute("data-quantity","1"),o.setAttribute("data-wcs-osi",n),o.href="#";let l=document.createElement("span"),a=s.ctaText??"buy-now";return ss.includes(Le)&&(a=Re[a]),l.textContent=a,o.appendChild(l),o}else{let o=document.createElement("span",{is:"inline-price"});return o.setAttribute("data-display-per-unit",s.displayPerUnit??"false"),o.setAttribute("data-quantity",e.ordering.max_quantity??"1"),o.setAttribute("data-template",t),o.setAttribute("data-wcs-osi",n),o.innerHTML="&nbsp;",o}};function ns(n,t,e,s,i){let r=is(n,t,e,s,i);console.log(`Use Link: ${r.outerHTML}`),O?O.outerHTML=r.outerHTML:De.appendContent(r.outerHTML),rs()}var Me=()=>document.getElementById("ostDialog"),os=()=>{Me().open=!0},rs=()=>{Me().open=!1};function Fe(){return f`
        <sp-overlay id="ostDialog" type="modal">
            <sp-dialog-wrapper dismissable underlay>
                <div id="ost"></div>
            </sp-dialog-wrapper>
        </overlay-trigger>
    `}function Ie(n,t,e){De=t,Le=e,O=n.detail?.clickedElement;let s;if(!dt||O){dt=document.getElementById("ost");let i=localStorage.getItem("masAccessToken")??window.adobeid.authorize(),r=new URLSearchParams,o={...He.defaultPlaceholderOptions};O&&(s=O.getAttribute("data-wcs-osi"),Object.assign(o,O.dataset)),window.ost.openOfferSelectorTool({...He,rootElement:dt,zIndex:20,aosAccessToken:i,searchParameters:r,searchOfferSelectorId:s,defaultPlaceholderOptions:o,onSelect:ns})}dt&&os()}var as="load-start",ls="load-end",ut=class extends g{constructor(){super(),this.newFragment=null,this.root="/content/dam/mas",this.variant="all",this.searchText="",this.path=""}connectedCallback(){super.connectedCallback(),this.registerListeners(),this.startDeeplink()}registerListeners(){this.addEventListener(as,()=>{this.requestUpdate(),this.updateDeeplink()}),this.addEventListener(ls,()=>this.requestUpdate()),document.addEventListener("keydown",t=>{t.key==="Escape"&&(this.closeFragmentEditor(),this.source.clearSelection(),this.contentNavigation.toggleSelectionMode(!1),document.activeElement.blur())}),this.addEventListener("select-fragment",t=>this.handleOpenFragment(t))}disconnectedCallback(){super.disconnectedCallback(),this.deeplinkDisposer&&this.deeplinkDisposer()}updateDeeplink(){let t={...this.source?.search};t.path===this.root&&(t.path=""),jt(t)}updated(t){(t.has("searchText")||t.has("path")||t.has("variant"))&&this.source?.sendSearch()}get search(){return this.querySelector("sp-search")}get picker(){return this.querySelector("sp-picker")}get source(){return this.querySelector("aem-fragments")}get contentNavigation(){return this.querySelector("content-navigation")}get fragment(){return this.source?.fragment}createRenderRoot(){return this}get selectFragmentDialog(){return f`
            ${this.newFragment?f`<sp-overlay type="modal" open>
                      <sp-dialog-wrapper
                          headline="You have unsaved changes!"
                          underlay
                          @confirm=${()=>this.saveAndEditFragment(this.newFragment)}
                          @secondary="${()=>this.editFragment(this.newFragment,!0)}"
                          @cancel="${this.closeConfirmSelect}"
                          confirm-label="Save"
                          secondary-label="Discard"
                          cancel-label="Cancel"
                      >
                          <p>
                              Do you want to save your changes before selecting
                              another merch card?
                          </p>
                      </sp-dialog-wrapper>
                  </sp-overlay>`:p}
        `}get fragmentEditorToolbar(){return f`<div id="actions" slot="heading">
            <sp-action-group
                aria-label="Fragment actions"
                role="group"
                size="l"
                compact
                emphasized
            >
                <sp-action-button
                    label="Save"
                    title="Save changes"
                    value="save"
                    @click="${this.saveFragment}"
                >
                    <sp-icon-save-floppy slot="icon"></sp-icon-save-floppy>
                </sp-action-button>
                <sp-action-button
                    label="Discard"
                    title="Discard changes"
                    value="discard"
                    @click="${this.discardChanges}"
                >
                    <sp-icon-undo slot="icon"></sp-icon-undo>
                </sp-action-button>
                <sp-action-button
                    label="Clone"
                    value="clone"
                    @click="${this.copyFragment}"
                >
                    <sp-icon-duplicate slot="icon"></sp-icon-duplicate>
                </sp-action-button>
                <sp-action-button
                    label="Publish"
                    value="publish"
                    @click="${this.publishFragment}"
                >
                    <sp-icon-publish-check slot="icon"></sp-icon-publish-check>
                </sp-action-button>
                <sp-action-button
                    label="Unpublish"
                    value="unpublish"
                    @click="${this.unpublishFragment}"
                >
                    <sp-icon-publish-remove
                        slot="icon"
                    ></sp-icon-publish-remove>
                </sp-action-button>
                <sp-action-button
                    label="Open in Odin"
                    value="open"
                    @click="${this.openFragmentInOdin}"
                >
                    <sp-icon-open-in slot="icon"></sp-icon-open-in>
                </sp-action-button>
                <sp-action-button
                    label="Use"
                    value="use"
                    @click="${this.copyToUse}"
                >
                    <sp-icon-code slot="icon"></sp-icon-code>
                </sp-action-button>
                <sp-action-button
                    label="Delete fragment"
                    value="delete"
                    @click="${this.deleteFragment}"
                >
                    <sp-icon-delete-outline
                        slot="icon"
                    ></sp-icon-delete-outline>
                </sp-action-button>
            </sp-action-group>
            <sp-divider vertical></sp-divider>
            <sp-action-group size="l">
                <sp-action-button
                    title="Close"
                    label="Close"
                    value="close"
                    @click="${this.closeFragmentEditor}"
                >
                    <sp-icon-close-circle slot="icon"></sp-icon-close-circle>
                </sp-action-button>
            </sp-action-group>
        </div>`}get fragmentEditor(){return f`<sp-overlay type="manual" ?open=${this.source?.fragment}>
            <sp-popover id="editor">
                <sp-dialog no-divider>
                    ${this.source?.fragment?f`
                              <merch-card-editor
                                  .fragment=${this.source?.fragment}
                                  @ost-open="${this.openOfferSelectorTool}"
                                  @update-fragment="${this.updateFragment}"
                              >
                              </merch-card-editor>
                              ${this.fragmentEditorToolbar}
                          `:p}
                </sp-dialog>
            </sp-popover>
        </sp-overlay>`}get content(){return f`
            <aem-fragments
                id="aem"
                base-url="${this.baseUrl}"
                root="${this.root}"
                path="${this.path}"
                search="${this.searchText}"
                bucket="${this.bucket}"
                variant="${this.variant}"
            ></aem-fragments>
            <content-navigation source="aem" ?disabled=${this.source?.fragment}>
                <table-view .customRenderItem=${this.customRenderItem}>
                    <sp-table-head-cell slot="headers"
                        >Variant</sp-table-head-cell
                    >
                </table-view>
                <render-view></render-view>
            </content-navigation>
        `}customRenderItem(t){return t?f` <sp-table-cell>${t.variant}</sp-table-cell>`:f`<sp-table-cell></sp-table-cell>`}render(){return f`
            <h1>Merch at Scale Studio</h1>
            <div>
                <sp-search
                    placeholder="Search"
                    @change="${this.handleSearch}"
                    @submit="${this.handleSearch}"
                    value=${this.searchText}
                    size="m"
                ></sp-search>
                <sp-picker
                    label="Card Variant"
                    size="m"
                    value=${this.variant}
                    @change="${this.handleVariantChange}"
                >
                    <sp-menu-item value="all">All</sp-menu-item>
                    <sp-menu-item value="special-offers"
                        >Special Offers</sp-menu-item
                    >
                    <sp-menu-item value="ccd-action">CCD Action</sp-menu-item>
                    <sp-menu-item value="catalog">Catalog</sp-menu-item>
                </sp-picker>
                <sp-button @click=${this.doSearch}>Search</sp-button>
            </div>
            ${this.content} ${this.fragmentEditor} ${this.selectFragmentDialog}
            ${this.toast} ${this.loadingIndicator} ${Fe()}
        `}get toast(){return f`<sp-toast timeout="6000" popover></sp-toast>`}get loadingIndicator(){return this.source?.loading?f`<sp-progress-circle
            indeterminate
            size="l"
        ></sp-progress-circle>`:p}get toastEl(){return this.querySelector("sp-toast")}startDeeplink(){this.deeplinkDisposer=Ue(({query:t,path:e})=>{this.searchText=t??"",this.path=e??""})}showToast(t,e="info"){let s=this.toastEl;s&&(s.textContent=t,s.variant=e,s.open=!0,s.showPopover())}async editFragment(t,e=!1){if(t&&t===this.fragment){this.requestUpdate();return}this.fragment?.hasChanges&&!e?this.newFragment=t:(this.newFragment=null,this.source?.setFragment(t)),this.requestUpdate()}async saveAndEditFragment(t){await this.saveFragment(),await this.editFragment(t,!0)}async adjustEditorPosition(t,e){await this.updateComplete;let s=window.innerWidth/2,i=t>s?"1em":"inherit",r=t<=s?"1em":"inherit";this.style.setProperty("--editor--left",i),this.style.setProperty("--editor--right",r);let o=window.innerHeight/2,l=e>o?"1em":"inherit",a=e<=o?"1em":"inherit";this.style.setProperty("--editor--top",l),this.style.setProperty("--editor--bottom",a)}async handleOpenFragment(t){let{x:e,y:s,fragment:i}=t.detail;await this.adjustEditorPosition(e,s),await this.editFragment(i)}updateFragment({detail:t}){let e=t.target.dataset.field,s=t.target.value||t.detail?.value;s=t.target.multiline?s?.split(","):[s??""],this.fragment.updateField(e,s)&&this.querySelector(`merch-datasource[path="${this.fragment.path}"]`)?.refresh(!1)}async saveFragment(){this.showToast("Saving fragment...");try{await this.source?.saveFragment(),this.showToast("Fragment saved","positive")}catch{this.showToast("Fragment could not be saved","negative")}}async discardChanges(){await this.source?.discardChanges(),this.showToast("Changes discarded","info")}async copyFragment(){this.showToast("Cloning fragment...");try{await this.source?.copyFragment(),this.showToast("Fragment cloned","positive")}catch{this.showToast("Fragment could not be cloned","negative")}}async closeFragmentEditor(){await this.source?.setFragment(null),this.requestUpdate()}closeConfirmSelect(){this.newFragment=null}handleSearch(t){this.searchText=this.search.value,this.searchText||jt({query:void 0,path:void 0}),t.type===ke&&(t.preventDefault(),this.source?.searchFragments())}handleVariantChange(t){this.variant=t.target.value}doSearch(){this.source?.searchFragments()}openFragmentInOdin(){window.open(`https://experience.adobe.com/?repo=${this.bucket}.adobeaemcloud.com#/@odin02/aem/cf/admin/?appId=aem-cf-admin&q=${this.fragment?.fragmentName}`,"_blank")}async publishFragment(){this.showToast("Publishing fragment...");try{await this.source?.publishFragment(),this.showToast("Fragment published","positive")}catch{this.showToast("Fragment could not be published","negative")}}async unpublishFragment(){this.showToast("Unpublishing fragment...");try{await this.source?.unpublishFragment(),this.showToast("Fragment unpublished","positive")}catch{this.showToast("Fragment could not be unpublished","negative")}}async deleteFragment(){if(confirm("Are you sure you want to delete this fragment?"))try{await this.source?.deleteFragment(),this.showToast("Fragment deleted","positive")}catch{this.showToast("Fragment could not be deleted","negative")}}async copyToUse(){let t=`<merch-card><merch-datasource path="${this.fragment?.path}"></merch-datasource></merch-card>`;try{await navigator.clipboard.writeText(t),this.showToast("Code copied to clipboard","positive")}catch{this.showToast("Failed to copy code to clipboard","negative")}}openOfferSelectorTool(t){Ie(t,t.target,this.fragment?.variant)}};b(ut,"properties",{bucket:{type:String,attribute:"aem-bucket"},searchText:{type:String,state:!0},baseUrl:{type:String,attribute:"base-url"},root:{type:String,state:!0},path:{type:String,state:!0},variant:{type:String,state:!0},newFragment:{type:Object,state:!0}});customElements.define("mas-studio",ut);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=studio.js.map

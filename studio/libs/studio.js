// ../node_modules/lit/node_modules/@lit/reactive-element/css-tag.js
var t = window;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var n = /* @__PURE__ */ new WeakMap();
var o = class {
  constructor(t6, e9, n8) {
    if (this._$cssResult$ = true, n8 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t6, this.t = e9;
  }
  get styleSheet() {
    let t6 = this.o;
    const s9 = this.t;
    if (e && void 0 === t6) {
      const e9 = void 0 !== s9 && 1 === s9.length;
      e9 && (t6 = n.get(s9)), void 0 === t6 && ((this.o = t6 = new CSSStyleSheet()).replaceSync(this.cssText), e9 && n.set(s9, t6));
    }
    return t6;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t6) => new o("string" == typeof t6 ? t6 : t6 + "", void 0, s);
var S = (s9, n8) => {
  e ? s9.adoptedStyleSheets = n8.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet) : n8.forEach((e9) => {
    const n9 = document.createElement("style"), o10 = t.litNonce;
    void 0 !== o10 && n9.setAttribute("nonce", o10), n9.textContent = e9.cssText, s9.appendChild(n9);
  });
};
var c = e ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
  let e9 = "";
  for (const s9 of t7.cssRules) e9 += s9.cssText;
  return r(e9);
})(t6) : t6;

// ../node_modules/lit/node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2 = window;
var r2 = e2.trustedTypes;
var h = r2 ? r2.emptyScript : "";
var o2 = e2.reactiveElementPolyfillSupport;
var n2 = { toAttribute(t6, i6) {
  switch (i6) {
    case Boolean:
      t6 = t6 ? h : null;
      break;
    case Object:
    case Array:
      t6 = null == t6 ? t6 : JSON.stringify(t6);
  }
  return t6;
}, fromAttribute(t6, i6) {
  let s9 = t6;
  switch (i6) {
    case Boolean:
      s9 = null !== t6;
      break;
    case Number:
      s9 = null === t6 ? null : Number(t6);
      break;
    case Object:
    case Array:
      try {
        s9 = JSON.parse(t6);
      } catch (t7) {
        s9 = null;
      }
  }
  return s9;
} };
var a = (t6, i6) => i6 !== t6 && (i6 == i6 || t6 == t6);
var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
var d = "finalized";
var u = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
  }
  static addInitializer(t6) {
    var i6;
    this.finalize(), (null !== (i6 = this.h) && void 0 !== i6 ? i6 : this.h = []).push(t6);
  }
  static get observedAttributes() {
    this.finalize();
    const t6 = [];
    return this.elementProperties.forEach((i6, s9) => {
      const e9 = this._$Ep(s9, i6);
      void 0 !== e9 && (this._$Ev.set(e9, s9), t6.push(e9));
    }), t6;
  }
  static createProperty(t6, i6 = l) {
    if (i6.state && (i6.attribute = false), this.finalize(), this.elementProperties.set(t6, i6), !i6.noAccessor && !this.prototype.hasOwnProperty(t6)) {
      const s9 = "symbol" == typeof t6 ? Symbol() : "__" + t6, e9 = this.getPropertyDescriptor(t6, s9, i6);
      void 0 !== e9 && Object.defineProperty(this.prototype, t6, e9);
    }
  }
  static getPropertyDescriptor(t6, i6, s9) {
    return { get() {
      return this[i6];
    }, set(e9) {
      const r8 = this[t6];
      this[i6] = e9, this.requestUpdate(t6, r8, s9);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t6) {
    return this.elementProperties.get(t6) || l;
  }
  static finalize() {
    if (this.hasOwnProperty(d)) return false;
    this[d] = true;
    const t6 = Object.getPrototypeOf(this);
    if (t6.finalize(), void 0 !== t6.h && (this.h = [...t6.h]), this.elementProperties = new Map(t6.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t7 = this.properties, i6 = [...Object.getOwnPropertyNames(t7), ...Object.getOwnPropertySymbols(t7)];
      for (const s9 of i6) this.createProperty(s9, t7[s9]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i6) {
    const s9 = [];
    if (Array.isArray(i6)) {
      const e9 = new Set(i6.flat(1 / 0).reverse());
      for (const i7 of e9) s9.unshift(c(i7));
    } else void 0 !== i6 && s9.push(c(i6));
    return s9;
  }
  static _$Ep(t6, i6) {
    const s9 = i6.attribute;
    return false === s9 ? void 0 : "string" == typeof s9 ? s9 : "string" == typeof t6 ? t6.toLowerCase() : void 0;
  }
  _$Eu() {
    var t6;
    this._$E_ = new Promise((t7) => this.enableUpdating = t7), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t6 = this.constructor.h) || void 0 === t6 || t6.forEach((t7) => t7(this));
  }
  addController(t6) {
    var i6, s9;
    (null !== (i6 = this._$ES) && void 0 !== i6 ? i6 : this._$ES = []).push(t6), void 0 !== this.renderRoot && this.isConnected && (null === (s9 = t6.hostConnected) || void 0 === s9 || s9.call(t6));
  }
  removeController(t6) {
    var i6;
    null === (i6 = this._$ES) || void 0 === i6 || i6.splice(this._$ES.indexOf(t6) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t6, i6) => {
      this.hasOwnProperty(i6) && (this._$Ei.set(i6, this[i6]), delete this[i6]);
    });
  }
  createRenderRoot() {
    var t6;
    const s9 = null !== (t6 = this.shadowRoot) && void 0 !== t6 ? t6 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s9, this.constructor.elementStyles), s9;
  }
  connectedCallback() {
    var t6;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t6 = this._$ES) || void 0 === t6 || t6.forEach((t7) => {
      var i6;
      return null === (i6 = t7.hostConnected) || void 0 === i6 ? void 0 : i6.call(t7);
    });
  }
  enableUpdating(t6) {
  }
  disconnectedCallback() {
    var t6;
    null === (t6 = this._$ES) || void 0 === t6 || t6.forEach((t7) => {
      var i6;
      return null === (i6 = t7.hostDisconnected) || void 0 === i6 ? void 0 : i6.call(t7);
    });
  }
  attributeChangedCallback(t6, i6, s9) {
    this._$AK(t6, s9);
  }
  _$EO(t6, i6, s9 = l) {
    var e9;
    const r8 = this.constructor._$Ep(t6, s9);
    if (void 0 !== r8 && true === s9.reflect) {
      const h5 = (void 0 !== (null === (e9 = s9.converter) || void 0 === e9 ? void 0 : e9.toAttribute) ? s9.converter : n2).toAttribute(i6, s9.type);
      this._$El = t6, null == h5 ? this.removeAttribute(r8) : this.setAttribute(r8, h5), this._$El = null;
    }
  }
  _$AK(t6, i6) {
    var s9;
    const e9 = this.constructor, r8 = e9._$Ev.get(t6);
    if (void 0 !== r8 && this._$El !== r8) {
      const t7 = e9.getPropertyOptions(r8), h5 = "function" == typeof t7.converter ? { fromAttribute: t7.converter } : void 0 !== (null === (s9 = t7.converter) || void 0 === s9 ? void 0 : s9.fromAttribute) ? t7.converter : n2;
      this._$El = r8, this[r8] = h5.fromAttribute(i6, t7.type), this._$El = null;
    }
  }
  requestUpdate(t6, i6, s9) {
    let e9 = true;
    void 0 !== t6 && (((s9 = s9 || this.constructor.getPropertyOptions(t6)).hasChanged || a)(this[t6], i6) ? (this._$AL.has(t6) || this._$AL.set(t6, i6), true === s9.reflect && this._$El !== t6 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t6, s9))) : e9 = false), !this.isUpdatePending && e9 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t7) {
      Promise.reject(t7);
    }
    const t6 = this.scheduleUpdate();
    return null != t6 && await t6, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t6;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t7, i7) => this[i7] = t7), this._$Ei = void 0);
    let i6 = false;
    const s9 = this._$AL;
    try {
      i6 = this.shouldUpdate(s9), i6 ? (this.willUpdate(s9), null === (t6 = this._$ES) || void 0 === t6 || t6.forEach((t7) => {
        var i7;
        return null === (i7 = t7.hostUpdate) || void 0 === i7 ? void 0 : i7.call(t7);
      }), this.update(s9)) : this._$Ek();
    } catch (t7) {
      throw i6 = false, this._$Ek(), t7;
    }
    i6 && this._$AE(s9);
  }
  willUpdate(t6) {
  }
  _$AE(t6) {
    var i6;
    null === (i6 = this._$ES) || void 0 === i6 || i6.forEach((t7) => {
      var i7;
      return null === (i7 = t7.hostUpdated) || void 0 === i7 ? void 0 : i7.call(t7);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t6)), this.updated(t6);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t6) {
    return true;
  }
  update(t6) {
    void 0 !== this._$EC && (this._$EC.forEach((t7, i6) => this._$EO(i6, this[i6], t7)), this._$EC = void 0), this._$Ek();
  }
  updated(t6) {
  }
  firstUpdated(t6) {
  }
};
u[d] = true, u.elementProperties = /* @__PURE__ */ new Map(), u.elementStyles = [], u.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: u }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.6.3");

// ../node_modules/lit/node_modules/lit-html/lit-html.js
var t2;
var i2 = window;
var s3 = i2.trustedTypes;
var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t6) => t6 }) : void 0;
var o3 = "$lit$";
var n3 = `lit$${(Math.random() + "").slice(9)}$`;
var l2 = "?" + n3;
var h2 = `<${l2}>`;
var r3 = document;
var u2 = () => r3.createComment("");
var d2 = (t6) => null === t6 || "object" != typeof t6 && "function" != typeof t6;
var c2 = Array.isArray;
var v = (t6) => c2(t6) || "function" == typeof (null == t6 ? void 0 : t6[Symbol.iterator]);
var a2 = "[ 	\n\f\r]";
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p = RegExp(`>|${a2}(?:([^\\s"'>=/]+)(${a2}*=${a2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y = /^(?:script|style|textarea|title)$/i;
var w = (t6) => (i6, ...s9) => ({ _$litType$: t6, strings: i6, values: s9 });
var x = w(1);
var b = w(2);
var T = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var E = /* @__PURE__ */ new WeakMap();
var C = r3.createTreeWalker(r3, 129, null, false);
function P(t6, i6) {
  if (!Array.isArray(t6) || !t6.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i6) : i6;
}
var V = (t6, i6) => {
  const s9 = t6.length - 1, e9 = [];
  let l7, r8 = 2 === i6 ? "<svg>" : "", u6 = f;
  for (let i7 = 0; i7 < s9; i7++) {
    const s10 = t6[i7];
    let d5, c7, v3 = -1, a6 = 0;
    for (; a6 < s10.length && (u6.lastIndex = a6, c7 = u6.exec(s10), null !== c7); ) a6 = u6.lastIndex, u6 === f ? "!--" === c7[1] ? u6 = _ : void 0 !== c7[1] ? u6 = m : void 0 !== c7[2] ? (y.test(c7[2]) && (l7 = RegExp("</" + c7[2], "g")), u6 = p) : void 0 !== c7[3] && (u6 = p) : u6 === p ? ">" === c7[0] ? (u6 = null != l7 ? l7 : f, v3 = -1) : void 0 === c7[1] ? v3 = -2 : (v3 = u6.lastIndex - c7[2].length, d5 = c7[1], u6 = void 0 === c7[3] ? p : '"' === c7[3] ? $ : g) : u6 === $ || u6 === g ? u6 = p : u6 === _ || u6 === m ? u6 = f : (u6 = p, l7 = void 0);
    const w3 = u6 === p && t6[i7 + 1].startsWith("/>") ? " " : "";
    r8 += u6 === f ? s10 + h2 : v3 >= 0 ? (e9.push(d5), s10.slice(0, v3) + o3 + s10.slice(v3) + n3 + w3) : s10 + n3 + (-2 === v3 ? (e9.push(void 0), i7) : w3);
  }
  return [P(t6, r8 + (t6[s9] || "<?>") + (2 === i6 ? "</svg>" : "")), e9];
};
var N = class _N {
  constructor({ strings: t6, _$litType$: i6 }, e9) {
    let h5;
    this.parts = [];
    let r8 = 0, d5 = 0;
    const c7 = t6.length - 1, v3 = this.parts, [a6, f4] = V(t6, i6);
    if (this.el = _N.createElement(a6, e9), C.currentNode = this.el.content, 2 === i6) {
      const t7 = this.el.content, i7 = t7.firstChild;
      i7.remove(), t7.append(...i7.childNodes);
    }
    for (; null !== (h5 = C.nextNode()) && v3.length < c7; ) {
      if (1 === h5.nodeType) {
        if (h5.hasAttributes()) {
          const t7 = [];
          for (const i7 of h5.getAttributeNames()) if (i7.endsWith(o3) || i7.startsWith(n3)) {
            const s9 = f4[d5++];
            if (t7.push(i7), void 0 !== s9) {
              const t8 = h5.getAttribute(s9.toLowerCase() + o3).split(n3), i8 = /([.?@])?(.*)/.exec(s9);
              v3.push({ type: 1, index: r8, name: i8[2], strings: t8, ctor: "." === i8[1] ? H : "?" === i8[1] ? L : "@" === i8[1] ? z : k });
            } else v3.push({ type: 6, index: r8 });
          }
          for (const i7 of t7) h5.removeAttribute(i7);
        }
        if (y.test(h5.tagName)) {
          const t7 = h5.textContent.split(n3), i7 = t7.length - 1;
          if (i7 > 0) {
            h5.textContent = s3 ? s3.emptyScript : "";
            for (let s9 = 0; s9 < i7; s9++) h5.append(t7[s9], u2()), C.nextNode(), v3.push({ type: 2, index: ++r8 });
            h5.append(t7[i7], u2());
          }
        }
      } else if (8 === h5.nodeType) if (h5.data === l2) v3.push({ type: 2, index: r8 });
      else {
        let t7 = -1;
        for (; -1 !== (t7 = h5.data.indexOf(n3, t7 + 1)); ) v3.push({ type: 7, index: r8 }), t7 += n3.length - 1;
      }
      r8++;
    }
  }
  static createElement(t6, i6) {
    const s9 = r3.createElement("template");
    return s9.innerHTML = t6, s9;
  }
};
function S2(t6, i6, s9 = t6, e9) {
  var o10, n8, l7, h5;
  if (i6 === T) return i6;
  let r8 = void 0 !== e9 ? null === (o10 = s9._$Co) || void 0 === o10 ? void 0 : o10[e9] : s9._$Cl;
  const u6 = d2(i6) ? void 0 : i6._$litDirective$;
  return (null == r8 ? void 0 : r8.constructor) !== u6 && (null === (n8 = null == r8 ? void 0 : r8._$AO) || void 0 === n8 || n8.call(r8, false), void 0 === u6 ? r8 = void 0 : (r8 = new u6(t6), r8._$AT(t6, s9, e9)), void 0 !== e9 ? (null !== (l7 = (h5 = s9)._$Co) && void 0 !== l7 ? l7 : h5._$Co = [])[e9] = r8 : s9._$Cl = r8), void 0 !== r8 && (i6 = S2(t6, r8._$AS(t6, i6.values), r8, e9)), i6;
}
var M = class {
  constructor(t6, i6) {
    this._$AV = [], this._$AN = void 0, this._$AD = t6, this._$AM = i6;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t6) {
    var i6;
    const { el: { content: s9 }, parts: e9 } = this._$AD, o10 = (null !== (i6 = null == t6 ? void 0 : t6.creationScope) && void 0 !== i6 ? i6 : r3).importNode(s9, true);
    C.currentNode = o10;
    let n8 = C.nextNode(), l7 = 0, h5 = 0, u6 = e9[0];
    for (; void 0 !== u6; ) {
      if (l7 === u6.index) {
        let i7;
        2 === u6.type ? i7 = new R(n8, n8.nextSibling, this, t6) : 1 === u6.type ? i7 = new u6.ctor(n8, u6.name, u6.strings, this, t6) : 6 === u6.type && (i7 = new Z(n8, this, t6)), this._$AV.push(i7), u6 = e9[++h5];
      }
      l7 !== (null == u6 ? void 0 : u6.index) && (n8 = C.nextNode(), l7++);
    }
    return C.currentNode = r3, o10;
  }
  v(t6) {
    let i6 = 0;
    for (const s9 of this._$AV) void 0 !== s9 && (void 0 !== s9.strings ? (s9._$AI(t6, s9, i6), i6 += s9.strings.length - 2) : s9._$AI(t6[i6])), i6++;
  }
};
var R = class _R {
  constructor(t6, i6, s9, e9) {
    var o10;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t6, this._$AB = i6, this._$AM = s9, this.options = e9, this._$Cp = null === (o10 = null == e9 ? void 0 : e9.isConnected) || void 0 === o10 || o10;
  }
  get _$AU() {
    var t6, i6;
    return null !== (i6 = null === (t6 = this._$AM) || void 0 === t6 ? void 0 : t6._$AU) && void 0 !== i6 ? i6 : this._$Cp;
  }
  get parentNode() {
    let t6 = this._$AA.parentNode;
    const i6 = this._$AM;
    return void 0 !== i6 && 11 === (null == t6 ? void 0 : t6.nodeType) && (t6 = i6.parentNode), t6;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t6, i6 = this) {
    t6 = S2(this, t6, i6), d2(t6) ? t6 === A || null == t6 || "" === t6 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t6 !== this._$AH && t6 !== T && this._(t6) : void 0 !== t6._$litType$ ? this.g(t6) : void 0 !== t6.nodeType ? this.$(t6) : v(t6) ? this.T(t6) : this._(t6);
  }
  k(t6) {
    return this._$AA.parentNode.insertBefore(t6, this._$AB);
  }
  $(t6) {
    this._$AH !== t6 && (this._$AR(), this._$AH = this.k(t6));
  }
  _(t6) {
    this._$AH !== A && d2(this._$AH) ? this._$AA.nextSibling.data = t6 : this.$(r3.createTextNode(t6)), this._$AH = t6;
  }
  g(t6) {
    var i6;
    const { values: s9, _$litType$: e9 } = t6, o10 = "number" == typeof e9 ? this._$AC(t6) : (void 0 === e9.el && (e9.el = N.createElement(P(e9.h, e9.h[0]), this.options)), e9);
    if ((null === (i6 = this._$AH) || void 0 === i6 ? void 0 : i6._$AD) === o10) this._$AH.v(s9);
    else {
      const t7 = new M(o10, this), i7 = t7.u(this.options);
      t7.v(s9), this.$(i7), this._$AH = t7;
    }
  }
  _$AC(t6) {
    let i6 = E.get(t6.strings);
    return void 0 === i6 && E.set(t6.strings, i6 = new N(t6)), i6;
  }
  T(t6) {
    c2(this._$AH) || (this._$AH = [], this._$AR());
    const i6 = this._$AH;
    let s9, e9 = 0;
    for (const o10 of t6) e9 === i6.length ? i6.push(s9 = new _R(this.k(u2()), this.k(u2()), this, this.options)) : s9 = i6[e9], s9._$AI(o10), e9++;
    e9 < i6.length && (this._$AR(s9 && s9._$AB.nextSibling, e9), i6.length = e9);
  }
  _$AR(t6 = this._$AA.nextSibling, i6) {
    var s9;
    for (null === (s9 = this._$AP) || void 0 === s9 || s9.call(this, false, true, i6); t6 && t6 !== this._$AB; ) {
      const i7 = t6.nextSibling;
      t6.remove(), t6 = i7;
    }
  }
  setConnected(t6) {
    var i6;
    void 0 === this._$AM && (this._$Cp = t6, null === (i6 = this._$AP) || void 0 === i6 || i6.call(this, t6));
  }
};
var k = class {
  constructor(t6, i6, s9, e9, o10) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t6, this.name = i6, this._$AM = e9, this.options = o10, s9.length > 2 || "" !== s9[0] || "" !== s9[1] ? (this._$AH = Array(s9.length - 1).fill(new String()), this.strings = s9) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t6, i6 = this, s9, e9) {
    const o10 = this.strings;
    let n8 = false;
    if (void 0 === o10) t6 = S2(this, t6, i6, 0), n8 = !d2(t6) || t6 !== this._$AH && t6 !== T, n8 && (this._$AH = t6);
    else {
      const e10 = t6;
      let l7, h5;
      for (t6 = o10[0], l7 = 0; l7 < o10.length - 1; l7++) h5 = S2(this, e10[s9 + l7], i6, l7), h5 === T && (h5 = this._$AH[l7]), n8 || (n8 = !d2(h5) || h5 !== this._$AH[l7]), h5 === A ? t6 = A : t6 !== A && (t6 += (null != h5 ? h5 : "") + o10[l7 + 1]), this._$AH[l7] = h5;
    }
    n8 && !e9 && this.j(t6);
  }
  j(t6) {
    t6 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t6 ? t6 : "");
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t6) {
    this.element[this.name] = t6 === A ? void 0 : t6;
  }
};
var I = s3 ? s3.emptyScript : "";
var L = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t6) {
    t6 && t6 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
  }
};
var z = class extends k {
  constructor(t6, i6, s9, e9, o10) {
    super(t6, i6, s9, e9, o10), this.type = 5;
  }
  _$AI(t6, i6 = this) {
    var s9;
    if ((t6 = null !== (s9 = S2(this, t6, i6, 0)) && void 0 !== s9 ? s9 : A) === T) return;
    const e9 = this._$AH, o10 = t6 === A && e9 !== A || t6.capture !== e9.capture || t6.once !== e9.once || t6.passive !== e9.passive, n8 = t6 !== A && (e9 === A || o10);
    o10 && this.element.removeEventListener(this.name, this, e9), n8 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
  }
  handleEvent(t6) {
    var i6, s9;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s9 = null === (i6 = this.options) || void 0 === i6 ? void 0 : i6.host) && void 0 !== s9 ? s9 : this.element, t6) : this._$AH.handleEvent(t6);
  }
};
var Z = class {
  constructor(t6, i6, s9) {
    this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i6, this.options = s9;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t6) {
    S2(this, t6);
  }
};
var j = { O: o3, P: n3, A: l2, C: 1, M: V, L: M, R: v, D: S2, I: R, V: k, H: L, N: z, U: H, F: Z };
var B = i2.litHtmlPolyfillSupport;
null == B || B(N, R), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.8.0");

// ../node_modules/lit-element/node_modules/@lit/reactive-element/css-tag.js
var t3 = window;
var e4 = t3.ShadowRoot && (void 0 === t3.ShadyCSS || t3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s4 = Symbol();
var n4 = /* @__PURE__ */ new WeakMap();
var o4 = class {
  constructor(t6, e9, n8) {
    if (this._$cssResult$ = true, n8 !== s4) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t6, this.t = e9;
  }
  get styleSheet() {
    let t6 = this.o;
    const s9 = this.t;
    if (e4 && void 0 === t6) {
      const e9 = void 0 !== s9 && 1 === s9.length;
      e9 && (t6 = n4.get(s9)), void 0 === t6 && ((this.o = t6 = new CSSStyleSheet()).replaceSync(this.cssText), e9 && n4.set(s9, t6));
    }
    return t6;
  }
  toString() {
    return this.cssText;
  }
};
var r4 = (t6) => new o4("string" == typeof t6 ? t6 : t6 + "", void 0, s4);
var S3 = (s9, n8) => {
  e4 ? s9.adoptedStyleSheets = n8.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet) : n8.forEach((e9) => {
    const n9 = document.createElement("style"), o10 = t3.litNonce;
    void 0 !== o10 && n9.setAttribute("nonce", o10), n9.textContent = e9.cssText, s9.appendChild(n9);
  });
};
var c3 = e4 ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
  let e9 = "";
  for (const s9 of t7.cssRules) e9 += s9.cssText;
  return r4(e9);
})(t6) : t6;

// ../node_modules/lit-element/node_modules/@lit/reactive-element/reactive-element.js
var s5;
var e5 = window;
var r5 = e5.trustedTypes;
var h3 = r5 ? r5.emptyScript : "";
var o5 = e5.reactiveElementPolyfillSupport;
var n5 = { toAttribute(t6, i6) {
  switch (i6) {
    case Boolean:
      t6 = t6 ? h3 : null;
      break;
    case Object:
    case Array:
      t6 = null == t6 ? t6 : JSON.stringify(t6);
  }
  return t6;
}, fromAttribute(t6, i6) {
  let s9 = t6;
  switch (i6) {
    case Boolean:
      s9 = null !== t6;
      break;
    case Number:
      s9 = null === t6 ? null : Number(t6);
      break;
    case Object:
    case Array:
      try {
        s9 = JSON.parse(t6);
      } catch (t7) {
        s9 = null;
      }
  }
  return s9;
} };
var a3 = (t6, i6) => i6 !== t6 && (i6 == i6 || t6 == t6);
var l3 = { attribute: true, type: String, converter: n5, reflect: false, hasChanged: a3 };
var d3 = "finalized";
var u3 = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
  }
  static addInitializer(t6) {
    var i6;
    this.finalize(), (null !== (i6 = this.h) && void 0 !== i6 ? i6 : this.h = []).push(t6);
  }
  static get observedAttributes() {
    this.finalize();
    const t6 = [];
    return this.elementProperties.forEach((i6, s9) => {
      const e9 = this._$Ep(s9, i6);
      void 0 !== e9 && (this._$Ev.set(e9, s9), t6.push(e9));
    }), t6;
  }
  static createProperty(t6, i6 = l3) {
    if (i6.state && (i6.attribute = false), this.finalize(), this.elementProperties.set(t6, i6), !i6.noAccessor && !this.prototype.hasOwnProperty(t6)) {
      const s9 = "symbol" == typeof t6 ? Symbol() : "__" + t6, e9 = this.getPropertyDescriptor(t6, s9, i6);
      void 0 !== e9 && Object.defineProperty(this.prototype, t6, e9);
    }
  }
  static getPropertyDescriptor(t6, i6, s9) {
    return { get() {
      return this[i6];
    }, set(e9) {
      const r8 = this[t6];
      this[i6] = e9, this.requestUpdate(t6, r8, s9);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t6) {
    return this.elementProperties.get(t6) || l3;
  }
  static finalize() {
    if (this.hasOwnProperty(d3)) return false;
    this[d3] = true;
    const t6 = Object.getPrototypeOf(this);
    if (t6.finalize(), void 0 !== t6.h && (this.h = [...t6.h]), this.elementProperties = new Map(t6.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t7 = this.properties, i6 = [...Object.getOwnPropertyNames(t7), ...Object.getOwnPropertySymbols(t7)];
      for (const s9 of i6) this.createProperty(s9, t7[s9]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i6) {
    const s9 = [];
    if (Array.isArray(i6)) {
      const e9 = new Set(i6.flat(1 / 0).reverse());
      for (const i7 of e9) s9.unshift(c3(i7));
    } else void 0 !== i6 && s9.push(c3(i6));
    return s9;
  }
  static _$Ep(t6, i6) {
    const s9 = i6.attribute;
    return false === s9 ? void 0 : "string" == typeof s9 ? s9 : "string" == typeof t6 ? t6.toLowerCase() : void 0;
  }
  _$Eu() {
    var t6;
    this._$E_ = new Promise((t7) => this.enableUpdating = t7), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t6 = this.constructor.h) || void 0 === t6 || t6.forEach((t7) => t7(this));
  }
  addController(t6) {
    var i6, s9;
    (null !== (i6 = this._$ES) && void 0 !== i6 ? i6 : this._$ES = []).push(t6), void 0 !== this.renderRoot && this.isConnected && (null === (s9 = t6.hostConnected) || void 0 === s9 || s9.call(t6));
  }
  removeController(t6) {
    var i6;
    null === (i6 = this._$ES) || void 0 === i6 || i6.splice(this._$ES.indexOf(t6) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t6, i6) => {
      this.hasOwnProperty(i6) && (this._$Ei.set(i6, this[i6]), delete this[i6]);
    });
  }
  createRenderRoot() {
    var t6;
    const s9 = null !== (t6 = this.shadowRoot) && void 0 !== t6 ? t6 : this.attachShadow(this.constructor.shadowRootOptions);
    return S3(s9, this.constructor.elementStyles), s9;
  }
  connectedCallback() {
    var t6;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t6 = this._$ES) || void 0 === t6 || t6.forEach((t7) => {
      var i6;
      return null === (i6 = t7.hostConnected) || void 0 === i6 ? void 0 : i6.call(t7);
    });
  }
  enableUpdating(t6) {
  }
  disconnectedCallback() {
    var t6;
    null === (t6 = this._$ES) || void 0 === t6 || t6.forEach((t7) => {
      var i6;
      return null === (i6 = t7.hostDisconnected) || void 0 === i6 ? void 0 : i6.call(t7);
    });
  }
  attributeChangedCallback(t6, i6, s9) {
    this._$AK(t6, s9);
  }
  _$EO(t6, i6, s9 = l3) {
    var e9;
    const r8 = this.constructor._$Ep(t6, s9);
    if (void 0 !== r8 && true === s9.reflect) {
      const h5 = (void 0 !== (null === (e9 = s9.converter) || void 0 === e9 ? void 0 : e9.toAttribute) ? s9.converter : n5).toAttribute(i6, s9.type);
      this._$El = t6, null == h5 ? this.removeAttribute(r8) : this.setAttribute(r8, h5), this._$El = null;
    }
  }
  _$AK(t6, i6) {
    var s9;
    const e9 = this.constructor, r8 = e9._$Ev.get(t6);
    if (void 0 !== r8 && this._$El !== r8) {
      const t7 = e9.getPropertyOptions(r8), h5 = "function" == typeof t7.converter ? { fromAttribute: t7.converter } : void 0 !== (null === (s9 = t7.converter) || void 0 === s9 ? void 0 : s9.fromAttribute) ? t7.converter : n5;
      this._$El = r8, this[r8] = h5.fromAttribute(i6, t7.type), this._$El = null;
    }
  }
  requestUpdate(t6, i6, s9) {
    let e9 = true;
    void 0 !== t6 && (((s9 = s9 || this.constructor.getPropertyOptions(t6)).hasChanged || a3)(this[t6], i6) ? (this._$AL.has(t6) || this._$AL.set(t6, i6), true === s9.reflect && this._$El !== t6 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t6, s9))) : e9 = false), !this.isUpdatePending && e9 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t7) {
      Promise.reject(t7);
    }
    const t6 = this.scheduleUpdate();
    return null != t6 && await t6, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t6;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t7, i7) => this[i7] = t7), this._$Ei = void 0);
    let i6 = false;
    const s9 = this._$AL;
    try {
      i6 = this.shouldUpdate(s9), i6 ? (this.willUpdate(s9), null === (t6 = this._$ES) || void 0 === t6 || t6.forEach((t7) => {
        var i7;
        return null === (i7 = t7.hostUpdate) || void 0 === i7 ? void 0 : i7.call(t7);
      }), this.update(s9)) : this._$Ek();
    } catch (t7) {
      throw i6 = false, this._$Ek(), t7;
    }
    i6 && this._$AE(s9);
  }
  willUpdate(t6) {
  }
  _$AE(t6) {
    var i6;
    null === (i6 = this._$ES) || void 0 === i6 || i6.forEach((t7) => {
      var i7;
      return null === (i7 = t7.hostUpdated) || void 0 === i7 ? void 0 : i7.call(t7);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t6)), this.updated(t6);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t6) {
    return true;
  }
  update(t6) {
    void 0 !== this._$EC && (this._$EC.forEach((t7, i6) => this._$EO(i6, this[i6], t7)), this._$EC = void 0), this._$Ek();
  }
  updated(t6) {
  }
  firstUpdated(t6) {
  }
};
u3[d3] = true, u3.elementProperties = /* @__PURE__ */ new Map(), u3.elementStyles = [], u3.shadowRootOptions = { mode: "open" }, null == o5 || o5({ ReactiveElement: u3 }), (null !== (s5 = e5.reactiveElementVersions) && void 0 !== s5 ? s5 : e5.reactiveElementVersions = []).push("1.6.3");

// ../node_modules/lit-element/node_modules/lit-html/lit-html.js
var t4;
var i4 = window;
var s6 = i4.trustedTypes;
var e6 = s6 ? s6.createPolicy("lit-html", { createHTML: (t6) => t6 }) : void 0;
var o6 = "$lit$";
var n6 = `lit$${(Math.random() + "").slice(9)}$`;
var l4 = "?" + n6;
var h4 = `<${l4}>`;
var r6 = document;
var u4 = () => r6.createComment("");
var d4 = (t6) => null === t6 || "object" != typeof t6 && "function" != typeof t6;
var c4 = Array.isArray;
var v2 = (t6) => c4(t6) || "function" == typeof (null == t6 ? void 0 : t6[Symbol.iterator]);
var a4 = "[ 	\n\f\r]";
var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _2 = /-->/g;
var m2 = />/g;
var p2 = RegExp(`>|${a4}(?:([^\\s"'>=/]+)(${a4}*=${a4}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g2 = /'/g;
var $2 = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var w2 = (t6) => (i6, ...s9) => ({ _$litType$: t6, strings: i6, values: s9 });
var x2 = w2(1);
var b2 = w2(2);
var T2 = Symbol.for("lit-noChange");
var A2 = Symbol.for("lit-nothing");
var E2 = /* @__PURE__ */ new WeakMap();
var C2 = r6.createTreeWalker(r6, 129, null, false);
function P2(t6, i6) {
  if (!Array.isArray(t6) || !t6.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e6 ? e6.createHTML(i6) : i6;
}
var V2 = (t6, i6) => {
  const s9 = t6.length - 1, e9 = [];
  let l7, r8 = 2 === i6 ? "<svg>" : "", u6 = f2;
  for (let i7 = 0; i7 < s9; i7++) {
    const s10 = t6[i7];
    let d5, c7, v3 = -1, a6 = 0;
    for (; a6 < s10.length && (u6.lastIndex = a6, c7 = u6.exec(s10), null !== c7); ) a6 = u6.lastIndex, u6 === f2 ? "!--" === c7[1] ? u6 = _2 : void 0 !== c7[1] ? u6 = m2 : void 0 !== c7[2] ? (y2.test(c7[2]) && (l7 = RegExp("</" + c7[2], "g")), u6 = p2) : void 0 !== c7[3] && (u6 = p2) : u6 === p2 ? ">" === c7[0] ? (u6 = null != l7 ? l7 : f2, v3 = -1) : void 0 === c7[1] ? v3 = -2 : (v3 = u6.lastIndex - c7[2].length, d5 = c7[1], u6 = void 0 === c7[3] ? p2 : '"' === c7[3] ? $2 : g2) : u6 === $2 || u6 === g2 ? u6 = p2 : u6 === _2 || u6 === m2 ? u6 = f2 : (u6 = p2, l7 = void 0);
    const w3 = u6 === p2 && t6[i7 + 1].startsWith("/>") ? " " : "";
    r8 += u6 === f2 ? s10 + h4 : v3 >= 0 ? (e9.push(d5), s10.slice(0, v3) + o6 + s10.slice(v3) + n6 + w3) : s10 + n6 + (-2 === v3 ? (e9.push(void 0), i7) : w3);
  }
  return [P2(t6, r8 + (t6[s9] || "<?>") + (2 === i6 ? "</svg>" : "")), e9];
};
var N2 = class _N {
  constructor({ strings: t6, _$litType$: i6 }, e9) {
    let h5;
    this.parts = [];
    let r8 = 0, d5 = 0;
    const c7 = t6.length - 1, v3 = this.parts, [a6, f4] = V2(t6, i6);
    if (this.el = _N.createElement(a6, e9), C2.currentNode = this.el.content, 2 === i6) {
      const t7 = this.el.content, i7 = t7.firstChild;
      i7.remove(), t7.append(...i7.childNodes);
    }
    for (; null !== (h5 = C2.nextNode()) && v3.length < c7; ) {
      if (1 === h5.nodeType) {
        if (h5.hasAttributes()) {
          const t7 = [];
          for (const i7 of h5.getAttributeNames()) if (i7.endsWith(o6) || i7.startsWith(n6)) {
            const s9 = f4[d5++];
            if (t7.push(i7), void 0 !== s9) {
              const t8 = h5.getAttribute(s9.toLowerCase() + o6).split(n6), i8 = /([.?@])?(.*)/.exec(s9);
              v3.push({ type: 1, index: r8, name: i8[2], strings: t8, ctor: "." === i8[1] ? H2 : "?" === i8[1] ? L2 : "@" === i8[1] ? z2 : k2 });
            } else v3.push({ type: 6, index: r8 });
          }
          for (const i7 of t7) h5.removeAttribute(i7);
        }
        if (y2.test(h5.tagName)) {
          const t7 = h5.textContent.split(n6), i7 = t7.length - 1;
          if (i7 > 0) {
            h5.textContent = s6 ? s6.emptyScript : "";
            for (let s9 = 0; s9 < i7; s9++) h5.append(t7[s9], u4()), C2.nextNode(), v3.push({ type: 2, index: ++r8 });
            h5.append(t7[i7], u4());
          }
        }
      } else if (8 === h5.nodeType) if (h5.data === l4) v3.push({ type: 2, index: r8 });
      else {
        let t7 = -1;
        for (; -1 !== (t7 = h5.data.indexOf(n6, t7 + 1)); ) v3.push({ type: 7, index: r8 }), t7 += n6.length - 1;
      }
      r8++;
    }
  }
  static createElement(t6, i6) {
    const s9 = r6.createElement("template");
    return s9.innerHTML = t6, s9;
  }
};
function S4(t6, i6, s9 = t6, e9) {
  var o10, n8, l7, h5;
  if (i6 === T2) return i6;
  let r8 = void 0 !== e9 ? null === (o10 = s9._$Co) || void 0 === o10 ? void 0 : o10[e9] : s9._$Cl;
  const u6 = d4(i6) ? void 0 : i6._$litDirective$;
  return (null == r8 ? void 0 : r8.constructor) !== u6 && (null === (n8 = null == r8 ? void 0 : r8._$AO) || void 0 === n8 || n8.call(r8, false), void 0 === u6 ? r8 = void 0 : (r8 = new u6(t6), r8._$AT(t6, s9, e9)), void 0 !== e9 ? (null !== (l7 = (h5 = s9)._$Co) && void 0 !== l7 ? l7 : h5._$Co = [])[e9] = r8 : s9._$Cl = r8), void 0 !== r8 && (i6 = S4(t6, r8._$AS(t6, i6.values), r8, e9)), i6;
}
var M2 = class {
  constructor(t6, i6) {
    this._$AV = [], this._$AN = void 0, this._$AD = t6, this._$AM = i6;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t6) {
    var i6;
    const { el: { content: s9 }, parts: e9 } = this._$AD, o10 = (null !== (i6 = null == t6 ? void 0 : t6.creationScope) && void 0 !== i6 ? i6 : r6).importNode(s9, true);
    C2.currentNode = o10;
    let n8 = C2.nextNode(), l7 = 0, h5 = 0, u6 = e9[0];
    for (; void 0 !== u6; ) {
      if (l7 === u6.index) {
        let i7;
        2 === u6.type ? i7 = new R2(n8, n8.nextSibling, this, t6) : 1 === u6.type ? i7 = new u6.ctor(n8, u6.name, u6.strings, this, t6) : 6 === u6.type && (i7 = new Z2(n8, this, t6)), this._$AV.push(i7), u6 = e9[++h5];
      }
      l7 !== (null == u6 ? void 0 : u6.index) && (n8 = C2.nextNode(), l7++);
    }
    return C2.currentNode = r6, o10;
  }
  v(t6) {
    let i6 = 0;
    for (const s9 of this._$AV) void 0 !== s9 && (void 0 !== s9.strings ? (s9._$AI(t6, s9, i6), i6 += s9.strings.length - 2) : s9._$AI(t6[i6])), i6++;
  }
};
var R2 = class _R {
  constructor(t6, i6, s9, e9) {
    var o10;
    this.type = 2, this._$AH = A2, this._$AN = void 0, this._$AA = t6, this._$AB = i6, this._$AM = s9, this.options = e9, this._$Cp = null === (o10 = null == e9 ? void 0 : e9.isConnected) || void 0 === o10 || o10;
  }
  get _$AU() {
    var t6, i6;
    return null !== (i6 = null === (t6 = this._$AM) || void 0 === t6 ? void 0 : t6._$AU) && void 0 !== i6 ? i6 : this._$Cp;
  }
  get parentNode() {
    let t6 = this._$AA.parentNode;
    const i6 = this._$AM;
    return void 0 !== i6 && 11 === (null == t6 ? void 0 : t6.nodeType) && (t6 = i6.parentNode), t6;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t6, i6 = this) {
    t6 = S4(this, t6, i6), d4(t6) ? t6 === A2 || null == t6 || "" === t6 ? (this._$AH !== A2 && this._$AR(), this._$AH = A2) : t6 !== this._$AH && t6 !== T2 && this._(t6) : void 0 !== t6._$litType$ ? this.g(t6) : void 0 !== t6.nodeType ? this.$(t6) : v2(t6) ? this.T(t6) : this._(t6);
  }
  k(t6) {
    return this._$AA.parentNode.insertBefore(t6, this._$AB);
  }
  $(t6) {
    this._$AH !== t6 && (this._$AR(), this._$AH = this.k(t6));
  }
  _(t6) {
    this._$AH !== A2 && d4(this._$AH) ? this._$AA.nextSibling.data = t6 : this.$(r6.createTextNode(t6)), this._$AH = t6;
  }
  g(t6) {
    var i6;
    const { values: s9, _$litType$: e9 } = t6, o10 = "number" == typeof e9 ? this._$AC(t6) : (void 0 === e9.el && (e9.el = N2.createElement(P2(e9.h, e9.h[0]), this.options)), e9);
    if ((null === (i6 = this._$AH) || void 0 === i6 ? void 0 : i6._$AD) === o10) this._$AH.v(s9);
    else {
      const t7 = new M2(o10, this), i7 = t7.u(this.options);
      t7.v(s9), this.$(i7), this._$AH = t7;
    }
  }
  _$AC(t6) {
    let i6 = E2.get(t6.strings);
    return void 0 === i6 && E2.set(t6.strings, i6 = new N2(t6)), i6;
  }
  T(t6) {
    c4(this._$AH) || (this._$AH = [], this._$AR());
    const i6 = this._$AH;
    let s9, e9 = 0;
    for (const o10 of t6) e9 === i6.length ? i6.push(s9 = new _R(this.k(u4()), this.k(u4()), this, this.options)) : s9 = i6[e9], s9._$AI(o10), e9++;
    e9 < i6.length && (this._$AR(s9 && s9._$AB.nextSibling, e9), i6.length = e9);
  }
  _$AR(t6 = this._$AA.nextSibling, i6) {
    var s9;
    for (null === (s9 = this._$AP) || void 0 === s9 || s9.call(this, false, true, i6); t6 && t6 !== this._$AB; ) {
      const i7 = t6.nextSibling;
      t6.remove(), t6 = i7;
    }
  }
  setConnected(t6) {
    var i6;
    void 0 === this._$AM && (this._$Cp = t6, null === (i6 = this._$AP) || void 0 === i6 || i6.call(this, t6));
  }
};
var k2 = class {
  constructor(t6, i6, s9, e9, o10) {
    this.type = 1, this._$AH = A2, this._$AN = void 0, this.element = t6, this.name = i6, this._$AM = e9, this.options = o10, s9.length > 2 || "" !== s9[0] || "" !== s9[1] ? (this._$AH = Array(s9.length - 1).fill(new String()), this.strings = s9) : this._$AH = A2;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t6, i6 = this, s9, e9) {
    const o10 = this.strings;
    let n8 = false;
    if (void 0 === o10) t6 = S4(this, t6, i6, 0), n8 = !d4(t6) || t6 !== this._$AH && t6 !== T2, n8 && (this._$AH = t6);
    else {
      const e10 = t6;
      let l7, h5;
      for (t6 = o10[0], l7 = 0; l7 < o10.length - 1; l7++) h5 = S4(this, e10[s9 + l7], i6, l7), h5 === T2 && (h5 = this._$AH[l7]), n8 || (n8 = !d4(h5) || h5 !== this._$AH[l7]), h5 === A2 ? t6 = A2 : t6 !== A2 && (t6 += (null != h5 ? h5 : "") + o10[l7 + 1]), this._$AH[l7] = h5;
    }
    n8 && !e9 && this.j(t6);
  }
  j(t6) {
    t6 === A2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t6 ? t6 : "");
  }
};
var H2 = class extends k2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t6) {
    this.element[this.name] = t6 === A2 ? void 0 : t6;
  }
};
var I2 = s6 ? s6.emptyScript : "";
var L2 = class extends k2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t6) {
    t6 && t6 !== A2 ? this.element.setAttribute(this.name, I2) : this.element.removeAttribute(this.name);
  }
};
var z2 = class extends k2 {
  constructor(t6, i6, s9, e9, o10) {
    super(t6, i6, s9, e9, o10), this.type = 5;
  }
  _$AI(t6, i6 = this) {
    var s9;
    if ((t6 = null !== (s9 = S4(this, t6, i6, 0)) && void 0 !== s9 ? s9 : A2) === T2) return;
    const e9 = this._$AH, o10 = t6 === A2 && e9 !== A2 || t6.capture !== e9.capture || t6.once !== e9.once || t6.passive !== e9.passive, n8 = t6 !== A2 && (e9 === A2 || o10);
    o10 && this.element.removeEventListener(this.name, this, e9), n8 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
  }
  handleEvent(t6) {
    var i6, s9;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s9 = null === (i6 = this.options) || void 0 === i6 ? void 0 : i6.host) && void 0 !== s9 ? s9 : this.element, t6) : this._$AH.handleEvent(t6);
  }
};
var Z2 = class {
  constructor(t6, i6, s9) {
    this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i6, this.options = s9;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t6) {
    S4(this, t6);
  }
};
var B2 = i4.litHtmlPolyfillSupport;
null == B2 || B2(N2, R2), (null !== (t4 = i4.litHtmlVersions) && void 0 !== t4 ? t4 : i4.litHtmlVersions = []).push("2.8.0");
var D = (t6, i6, s9) => {
  var e9, o10;
  const n8 = null !== (e9 = null == s9 ? void 0 : s9.renderBefore) && void 0 !== e9 ? e9 : i6;
  let l7 = n8._$litPart$;
  if (void 0 === l7) {
    const t7 = null !== (o10 = null == s9 ? void 0 : s9.renderBefore) && void 0 !== o10 ? o10 : null;
    n8._$litPart$ = l7 = new R2(i6.insertBefore(u4(), t7), t7, void 0, null != s9 ? s9 : {});
  }
  return l7._$AI(t6), l7;
};

// ../node_modules/lit-element/lit-element.js
var l5;
var o7;
var s7 = class extends u3 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t6, e9;
    const i6 = super.createRenderRoot();
    return null !== (t6 = (e9 = this.renderOptions).renderBefore) && void 0 !== t6 || (e9.renderBefore = i6.firstChild), i6;
  }
  update(t6) {
    const i6 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t6), this._$Do = D(i6, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t6;
    super.connectedCallback(), null === (t6 = this._$Do) || void 0 === t6 || t6.setConnected(true);
  }
  disconnectedCallback() {
    var t6;
    super.disconnectedCallback(), null === (t6 = this._$Do) || void 0 === t6 || t6.setConnected(false);
  }
  render() {
    return T2;
  }
};
s7.finalized = true, s7._$litElement$ = true, null === (l5 = globalThis.litElementHydrateSupport) || void 0 === l5 || l5.call(globalThis, { LitElement: s7 });
var n7 = globalThis.litElementPolyfillSupport;
null == n7 || n7({ LitElement: s7 });
(null !== (o7 = globalThis.litElementVersions) && void 0 !== o7 ? o7 : globalThis.litElementVersions = []).push("3.3.3");

// ../node_modules/lit/node_modules/lit-html/directive.js
var t5 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e7 = (t6) => (...e9) => ({ _$litDirective$: t6, values: e9 });
var i5 = class {
  constructor(t6) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t6, e9, i6) {
    this._$Ct = t6, this._$AM = e9, this._$Ci = i6;
  }
  _$AS(t6, e9) {
    return this.update(t6, e9);
  }
  update(t6, e9) {
    return this.render(...e9);
  }
};

// ../node_modules/lit/node_modules/lit-html/directives/unsafe-html.js
var e8 = class extends i5 {
  constructor(i6) {
    if (super(i6), this.et = A, i6.type !== t5.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r8) {
    if (r8 === A || null == r8) return this.ft = void 0, this.et = r8;
    if (r8 === T) return r8;
    if ("string" != typeof r8) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r8 === this.et) return this.ft;
    this.et = r8;
    const s9 = [r8];
    return s9.raw = s9, this.ft = { _$litType$: this.constructor.resultType, strings: s9, values: [] };
  }
};
e8.directiveName = "unsafeHTML", e8.resultType = 1;
var o8 = e7(e8);

// ../node_modules/mobx/dist/mobx.esm.js
function die(error) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  if (false) {
    var e9 = typeof error === "string" ? error : errors[error];
    if (typeof e9 === "function") e9 = e9.apply(null, args);
    throw new Error("[MobX] " + e9);
  }
  throw new Error(typeof error === "number" ? "[MobX] minified error nr: " + error + (args.length ? " " + args.map(String).join(",") : "") + ". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts" : "[MobX] " + error);
}
var mockGlobal = {};
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  return mockGlobal;
}
var assign = Object.assign;
var getDescriptor = Object.getOwnPropertyDescriptor;
var defineProperty = Object.defineProperty;
var objectPrototype = Object.prototype;
var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
var EMPTY_OBJECT = {};
Object.freeze(EMPTY_OBJECT);
var hasProxy = typeof Proxy !== "undefined";
var plainObjectString = /* @__PURE__ */ Object.toString();
function assertProxies() {
  if (!hasProxy) {
    die(false ? "`Proxy` objects are not available in the current environment. Please configure MobX to enable a fallback implementation.`" : "Proxy not available");
  }
}
function once(func) {
  var invoked = false;
  return function() {
    if (invoked) {
      return;
    }
    invoked = true;
    return func.apply(this, arguments);
  };
}
var noop = function noop2() {
};
function isFunction(fn) {
  return typeof fn === "function";
}
function isStringish(value) {
  var t6 = typeof value;
  switch (t6) {
    case "string":
    case "symbol":
    case "number":
      return true;
  }
  return false;
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isPlainObject(value) {
  if (!isObject(value)) {
    return false;
  }
  var proto = Object.getPrototypeOf(value);
  if (proto == null) {
    return true;
  }
  var protoConstructor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof protoConstructor === "function" && protoConstructor.toString() === plainObjectString;
}
function isGenerator(obj) {
  var constructor = obj == null ? void 0 : obj.constructor;
  if (!constructor) {
    return false;
  }
  if ("GeneratorFunction" === constructor.name || "GeneratorFunction" === constructor.displayName) {
    return true;
  }
  return false;
}
function addHiddenProp(object2, propName, value) {
  defineProperty(object2, propName, {
    enumerable: false,
    writable: true,
    configurable: true,
    value
  });
}
function addHiddenFinalProp(object2, propName, value) {
  defineProperty(object2, propName, {
    enumerable: false,
    writable: false,
    configurable: true,
    value
  });
}
function createInstanceofPredicate(name, theClass) {
  var propName = "isMobX" + name;
  theClass.prototype[propName] = true;
  return function(x3) {
    return isObject(x3) && x3[propName] === true;
  };
}
function isES6Map(thing) {
  return thing != null && Object.prototype.toString.call(thing) === "[object Map]";
}
function isPlainES6Map(thing) {
  var mapProto = Object.getPrototypeOf(thing);
  var objectProto = Object.getPrototypeOf(mapProto);
  var nullProto = Object.getPrototypeOf(objectProto);
  return nullProto === null;
}
function isES6Set(thing) {
  return thing != null && Object.prototype.toString.call(thing) === "[object Set]";
}
var hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== "undefined";
function getPlainObjectKeys(object2) {
  var keys = Object.keys(object2);
  if (!hasGetOwnPropertySymbols) {
    return keys;
  }
  var symbols = Object.getOwnPropertySymbols(object2);
  if (!symbols.length) {
    return keys;
  }
  return [].concat(keys, symbols.filter(function(s9) {
    return objectPrototype.propertyIsEnumerable.call(object2, s9);
  }));
}
var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : hasGetOwnPropertySymbols ? function(obj) {
  return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
} : (
  /* istanbul ignore next */
  Object.getOwnPropertyNames
);
function toPrimitive(value) {
  return value === null ? null : typeof value === "object" ? "" + value : value;
}
function hasProp(target, prop) {
  return objectPrototype.hasOwnProperty.call(target, prop);
}
var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(target) {
  var res = {};
  ownKeys(target).forEach(function(key) {
    res[key] = getDescriptor(target, key);
  });
  return res;
};
function getFlag(flags, mask) {
  return !!(flags & mask);
}
function setFlag(flags, mask, newValue) {
  if (newValue) {
    flags |= mask;
  } else {
    flags &= ~mask;
  }
  return flags;
}
function _arrayLikeToArray(r8, a6) {
  (null == a6 || a6 > r8.length) && (a6 = r8.length);
  for (var e9 = 0, n8 = Array(a6); e9 < a6; e9++) n8[e9] = r8[e9];
  return n8;
}
function _defineProperties(e9, r8) {
  for (var t6 = 0; t6 < r8.length; t6++) {
    var o10 = r8[t6];
    o10.enumerable = o10.enumerable || false, o10.configurable = true, "value" in o10 && (o10.writable = true), Object.defineProperty(e9, _toPropertyKey(o10.key), o10);
  }
}
function _createClass(e9, r8, t6) {
  return r8 && _defineProperties(e9.prototype, r8), t6 && _defineProperties(e9, t6), Object.defineProperty(e9, "prototype", {
    writable: false
  }), e9;
}
function _createForOfIteratorHelperLoose(r8, e9) {
  var t6 = "undefined" != typeof Symbol && r8[Symbol.iterator] || r8["@@iterator"];
  if (t6) return (t6 = t6.call(r8)).next.bind(t6);
  if (Array.isArray(r8) || (t6 = _unsupportedIterableToArray(r8)) || e9 && r8 && "number" == typeof r8.length) {
    t6 && (r8 = t6);
    var o10 = 0;
    return function() {
      return o10 >= r8.length ? {
        done: true
      } : {
        done: false,
        value: r8[o10++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n8) {
    for (var e9 = 1; e9 < arguments.length; e9++) {
      var t6 = arguments[e9];
      for (var r8 in t6) ({}).hasOwnProperty.call(t6, r8) && (n8[r8] = t6[r8]);
    }
    return n8;
  }, _extends.apply(null, arguments);
}
function _inheritsLoose(t6, o10) {
  t6.prototype = Object.create(o10.prototype), t6.prototype.constructor = t6, _setPrototypeOf(t6, o10);
}
function _setPrototypeOf(t6, e9) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t7, e10) {
    return t7.__proto__ = e10, t7;
  }, _setPrototypeOf(t6, e9);
}
function _toPrimitive(t6, r8) {
  if ("object" != typeof t6 || !t6) return t6;
  var e9 = t6[Symbol.toPrimitive];
  if (void 0 !== e9) {
    var i6 = e9.call(t6, r8 || "default");
    if ("object" != typeof i6) return i6;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r8 ? String : Number)(t6);
}
function _toPropertyKey(t6) {
  var i6 = _toPrimitive(t6, "string");
  return "symbol" == typeof i6 ? i6 : i6 + "";
}
function _unsupportedIterableToArray(r8, a6) {
  if (r8) {
    if ("string" == typeof r8) return _arrayLikeToArray(r8, a6);
    var t6 = {}.toString.call(r8).slice(8, -1);
    return "Object" === t6 && r8.constructor && (t6 = r8.constructor.name), "Map" === t6 || "Set" === t6 ? Array.from(r8) : "Arguments" === t6 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t6) ? _arrayLikeToArray(r8, a6) : void 0;
  }
}
var storedAnnotationsSymbol = /* @__PURE__ */ Symbol("mobx-stored-annotations");
function createDecoratorAnnotation(annotation) {
  function decorator(target, property) {
    if (is20223Decorator(property)) {
      return annotation.decorate_20223_(target, property);
    } else {
      storeAnnotation(target, property, annotation);
    }
  }
  return Object.assign(decorator, annotation);
}
function storeAnnotation(prototype, key, annotation) {
  if (!hasProp(prototype, storedAnnotationsSymbol)) {
    addHiddenProp(prototype, storedAnnotationsSymbol, _extends({}, prototype[storedAnnotationsSymbol]));
  }
  if (false) {
    var fieldName = prototype.constructor.name + ".prototype." + key.toString();
    die("'" + fieldName + "' is decorated with 'override', but no such decorated member was found on prototype.");
  }
  assertNotDecorated(prototype, annotation, key);
  if (!isOverride(annotation)) {
    prototype[storedAnnotationsSymbol][key] = annotation;
  }
}
function assertNotDecorated(prototype, annotation, key) {
  if (false) {
    var fieldName = prototype.constructor.name + ".prototype." + key.toString();
    var currentAnnotationType = prototype[storedAnnotationsSymbol][key].annotationType_;
    var requestedAnnotationType = annotation.annotationType_;
    die("Cannot apply '@" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already decorated with '@" + currentAnnotationType + "'.") + "\nRe-decorating fields is not allowed.\nUse '@override' decorator for methods overridden by subclass.");
  }
}
function is20223Decorator(context) {
  return typeof context == "object" && typeof context["kind"] == "string";
}
var $mobx = /* @__PURE__ */ Symbol("mobx administration");
var Atom = /* @__PURE__ */ function() {
  function Atom2(name_) {
    if (name_ === void 0) {
      name_ = false ? "Atom@" + getNextId() : "Atom";
    }
    this.name_ = void 0;
    this.flags_ = 0;
    this.observers_ = /* @__PURE__ */ new Set();
    this.lastAccessedBy_ = 0;
    this.lowestObserverState_ = IDerivationState_.NOT_TRACKING_;
    this.onBOL = void 0;
    this.onBUOL = void 0;
    this.name_ = name_;
  }
  var _proto = Atom2.prototype;
  _proto.onBO = function onBO() {
    if (this.onBOL) {
      this.onBOL.forEach(function(listener) {
        return listener();
      });
    }
  };
  _proto.onBUO = function onBUO() {
    if (this.onBUOL) {
      this.onBUOL.forEach(function(listener) {
        return listener();
      });
    }
  };
  _proto.reportObserved = function reportObserved$1() {
    return reportObserved(this);
  };
  _proto.reportChanged = function reportChanged() {
    startBatch();
    propagateChanged(this);
    endBatch();
  };
  _proto.toString = function toString2() {
    return this.name_;
  };
  return _createClass(Atom2, [{
    key: "isBeingObserved",
    get: function get3() {
      return getFlag(this.flags_, Atom2.isBeingObservedMask_);
    },
    set: function set4(newValue) {
      this.flags_ = setFlag(this.flags_, Atom2.isBeingObservedMask_, newValue);
    }
  }, {
    key: "isPendingUnobservation",
    get: function get3() {
      return getFlag(this.flags_, Atom2.isPendingUnobservationMask_);
    },
    set: function set4(newValue) {
      this.flags_ = setFlag(this.flags_, Atom2.isPendingUnobservationMask_, newValue);
    }
  }, {
    key: "diffValue",
    get: function get3() {
      return getFlag(this.flags_, Atom2.diffValueMask_) ? 1 : 0;
    },
    set: function set4(newValue) {
      this.flags_ = setFlag(this.flags_, Atom2.diffValueMask_, newValue === 1 ? true : false);
    }
  }]);
}();
Atom.isBeingObservedMask_ = 1;
Atom.isPendingUnobservationMask_ = 2;
Atom.diffValueMask_ = 4;
var isAtom = /* @__PURE__ */ createInstanceofPredicate("Atom", Atom);
function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
  if (onBecomeObservedHandler === void 0) {
    onBecomeObservedHandler = noop;
  }
  if (onBecomeUnobservedHandler === void 0) {
    onBecomeUnobservedHandler = noop;
  }
  var atom = new Atom(name);
  if (onBecomeObservedHandler !== noop) {
    onBecomeObserved(atom, onBecomeObservedHandler);
  }
  if (onBecomeUnobservedHandler !== noop) {
    onBecomeUnobserved(atom, onBecomeUnobservedHandler);
  }
  return atom;
}
function identityComparer(a6, b3) {
  return a6 === b3;
}
function structuralComparer(a6, b3) {
  return deepEqual(a6, b3);
}
function shallowComparer(a6, b3) {
  return deepEqual(a6, b3, 1);
}
function defaultComparer(a6, b3) {
  if (Object.is) {
    return Object.is(a6, b3);
  }
  return a6 === b3 ? a6 !== 0 || 1 / a6 === 1 / b3 : a6 !== a6 && b3 !== b3;
}
var comparer = {
  identity: identityComparer,
  structural: structuralComparer,
  "default": defaultComparer,
  shallow: shallowComparer
};
function deepEnhancer(v3, _3, name) {
  if (isObservable(v3)) {
    return v3;
  }
  if (Array.isArray(v3)) {
    return observable.array(v3, {
      name
    });
  }
  if (isPlainObject(v3)) {
    return observable.object(v3, void 0, {
      name
    });
  }
  if (isES6Map(v3)) {
    return observable.map(v3, {
      name
    });
  }
  if (isES6Set(v3)) {
    return observable.set(v3, {
      name
    });
  }
  if (typeof v3 === "function" && !isAction(v3) && !isFlow(v3)) {
    if (isGenerator(v3)) {
      return flow(v3);
    } else {
      return autoAction(name, v3);
    }
  }
  return v3;
}
function shallowEnhancer(v3, _3, name) {
  if (v3 === void 0 || v3 === null) {
    return v3;
  }
  if (isObservableObject(v3) || isObservableArray(v3) || isObservableMap(v3) || isObservableSet(v3)) {
    return v3;
  }
  if (Array.isArray(v3)) {
    return observable.array(v3, {
      name,
      deep: false
    });
  }
  if (isPlainObject(v3)) {
    return observable.object(v3, void 0, {
      name,
      deep: false
    });
  }
  if (isES6Map(v3)) {
    return observable.map(v3, {
      name,
      deep: false
    });
  }
  if (isES6Set(v3)) {
    return observable.set(v3, {
      name,
      deep: false
    });
  }
  if (false) {
    die("The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
  }
}
function referenceEnhancer(newValue) {
  return newValue;
}
function refStructEnhancer(v3, oldValue) {
  if (false) {
    die("observable.struct should not be used with observable values");
  }
  if (deepEqual(v3, oldValue)) {
    return oldValue;
  }
  return v3;
}
var OVERRIDE = "override";
function isOverride(annotation) {
  return annotation.annotationType_ === OVERRIDE;
}
function createActionAnnotation(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$1,
    extend_: extend_$1,
    decorate_20223_: decorate_20223_$1
  };
}
function make_$1(adm, key, descriptor, source) {
  var _this$options_;
  if ((_this$options_ = this.options_) != null && _this$options_.bound) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
  }
  if (source === adm.target_) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 2;
  }
  if (isAction(descriptor.value)) {
    return 1;
  }
  var actionDescriptor = createActionDescriptor(adm, this, key, descriptor, false);
  defineProperty(source, key, actionDescriptor);
  return 2;
}
function extend_$1(adm, key, descriptor, proxyTrap) {
  var actionDescriptor = createActionDescriptor(adm, this, key, descriptor);
  return adm.defineProperty_(key, actionDescriptor, proxyTrap);
}
function decorate_20223_$1(mthd, context) {
  if (false) {
    assert20223DecoratorType(context, ["method", "field"]);
  }
  var kind = context.kind, name = context.name, addInitializer = context.addInitializer;
  var ann = this;
  var _createAction = function _createAction2(m4) {
    var _ann$options_$name, _ann$options_, _ann$options_$autoAct, _ann$options_2;
    return createAction((_ann$options_$name = (_ann$options_ = ann.options_) == null ? void 0 : _ann$options_.name) != null ? _ann$options_$name : name.toString(), m4, (_ann$options_$autoAct = (_ann$options_2 = ann.options_) == null ? void 0 : _ann$options_2.autoAction) != null ? _ann$options_$autoAct : false);
  };
  if (kind == "field") {
    addInitializer(function() {
      storeAnnotation(this, name, ann);
    });
    return;
  }
  if (kind == "method") {
    var _this$options_2;
    if (!isAction(mthd)) {
      mthd = _createAction(mthd);
    }
    if ((_this$options_2 = this.options_) != null && _this$options_2.bound) {
      addInitializer(function() {
        var self2 = this;
        var bound = self2[name].bind(self2);
        bound.isMobxAction = true;
        self2[name] = bound;
      });
    }
    return mthd;
  }
  die("Cannot apply '" + ann.annotationType_ + "' to '" + String(name) + "' (kind: " + kind + "):" + ("\n'" + ann.annotationType_ + "' can only be used on properties with a function value."));
}
function assertActionDescriptor(adm, _ref, key, _ref2) {
  var annotationType_ = _ref.annotationType_;
  var value = _ref2.value;
  if (false) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a function value."));
  }
}
function createActionDescriptor(adm, annotation, key, descriptor, safeDescriptors) {
  var _annotation$options_, _annotation$options_$, _annotation$options_2, _annotation$options_$2, _annotation$options_3, _annotation$options_4, _adm$proxy_2;
  if (safeDescriptors === void 0) {
    safeDescriptors = globalState.safeDescriptors;
  }
  assertActionDescriptor(adm, annotation, key, descriptor);
  var value = descriptor.value;
  if ((_annotation$options_ = annotation.options_) != null && _annotation$options_.bound) {
    var _adm$proxy_;
    value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
  }
  return {
    value: createAction(
      (_annotation$options_$ = (_annotation$options_2 = annotation.options_) == null ? void 0 : _annotation$options_2.name) != null ? _annotation$options_$ : key.toString(),
      value,
      (_annotation$options_$2 = (_annotation$options_3 = annotation.options_) == null ? void 0 : _annotation$options_3.autoAction) != null ? _annotation$options_$2 : false,
      // https://github.com/mobxjs/mobx/discussions/3140
      (_annotation$options_4 = annotation.options_) != null && _annotation$options_4.bound ? (_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_ : void 0
    ),
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: safeDescriptors ? adm.isPlainObject_ : true,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: false,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: safeDescriptors ? false : true
  };
}
function createFlowAnnotation(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$2,
    extend_: extend_$2,
    decorate_20223_: decorate_20223_$2
  };
}
function make_$2(adm, key, descriptor, source) {
  var _this$options_;
  if (source === adm.target_) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 2;
  }
  if ((_this$options_ = this.options_) != null && _this$options_.bound && (!hasProp(adm.target_, key) || !isFlow(adm.target_[key]))) {
    if (this.extend_(adm, key, descriptor, false) === null) {
      return 0;
    }
  }
  if (isFlow(descriptor.value)) {
    return 1;
  }
  var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, false, false);
  defineProperty(source, key, flowDescriptor);
  return 2;
}
function extend_$2(adm, key, descriptor, proxyTrap) {
  var _this$options_2;
  var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, (_this$options_2 = this.options_) == null ? void 0 : _this$options_2.bound);
  return adm.defineProperty_(key, flowDescriptor, proxyTrap);
}
function decorate_20223_$2(mthd, context) {
  var _this$options_3;
  if (false) {
    assert20223DecoratorType(context, ["method"]);
  }
  var name = context.name, addInitializer = context.addInitializer;
  if (!isFlow(mthd)) {
    mthd = flow(mthd);
  }
  if ((_this$options_3 = this.options_) != null && _this$options_3.bound) {
    addInitializer(function() {
      var self2 = this;
      var bound = self2[name].bind(self2);
      bound.isMobXFlow = true;
      self2[name] = bound;
    });
  }
  return mthd;
}
function assertFlowDescriptor(adm, _ref, key, _ref2) {
  var annotationType_ = _ref.annotationType_;
  var value = _ref2.value;
  if (false) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a generator function value."));
  }
}
function createFlowDescriptor(adm, annotation, key, descriptor, bound, safeDescriptors) {
  if (safeDescriptors === void 0) {
    safeDescriptors = globalState.safeDescriptors;
  }
  assertFlowDescriptor(adm, annotation, key, descriptor);
  var value = descriptor.value;
  if (!isFlow(value)) {
    value = flow(value);
  }
  if (bound) {
    var _adm$proxy_;
    value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    value.isMobXFlow = true;
  }
  return {
    value,
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: safeDescriptors ? adm.isPlainObject_ : true,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: false,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: safeDescriptors ? false : true
  };
}
function createComputedAnnotation(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$3,
    extend_: extend_$3,
    decorate_20223_: decorate_20223_$3
  };
}
function make_$3(adm, key, descriptor) {
  return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
}
function extend_$3(adm, key, descriptor, proxyTrap) {
  assertComputedDescriptor(adm, this, key, descriptor);
  return adm.defineComputedProperty_(key, _extends({}, this.options_, {
    get: descriptor.get,
    set: descriptor.set
  }), proxyTrap);
}
function decorate_20223_$3(get3, context) {
  if (false) {
    assert20223DecoratorType(context, ["getter"]);
  }
  var ann = this;
  var key = context.name, addInitializer = context.addInitializer;
  addInitializer(function() {
    var adm = asObservableObject(this)[$mobx];
    var options = _extends({}, ann.options_, {
      get: get3,
      context: this
    });
    options.name || (options.name = false ? adm.name_ + "." + key.toString() : "ObservableObject." + key.toString());
    adm.values_.set(key, new ComputedValue(options));
  });
  return function() {
    return this[$mobx].getObservablePropValue_(key);
  };
}
function assertComputedDescriptor(adm, _ref, key, _ref2) {
  var annotationType_ = _ref.annotationType_;
  var get3 = _ref2.get;
  if (false) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on getter(+setter) properties."));
  }
}
function createObservableAnnotation(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$4,
    extend_: extend_$4,
    decorate_20223_: decorate_20223_$4
  };
}
function make_$4(adm, key, descriptor) {
  return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
}
function extend_$4(adm, key, descriptor, proxyTrap) {
  var _this$options_$enhanc, _this$options_;
  assertObservableDescriptor(adm, this, key, descriptor);
  return adm.defineObservableProperty_(key, descriptor.value, (_this$options_$enhanc = (_this$options_ = this.options_) == null ? void 0 : _this$options_.enhancer) != null ? _this$options_$enhanc : deepEnhancer, proxyTrap);
}
function decorate_20223_$4(desc, context) {
  if (false) {
    if (context.kind === "field") {
      throw die("Please use `@observable accessor " + String(context.name) + "` instead of `@observable " + String(context.name) + "`");
    }
    assert20223DecoratorType(context, ["accessor"]);
  }
  var ann = this;
  var kind = context.kind, name = context.name;
  var initializedObjects = /* @__PURE__ */ new WeakSet();
  function initializeObservable(target, value) {
    var _ann$options_$enhance, _ann$options_;
    var adm = asObservableObject(target)[$mobx];
    var observable2 = new ObservableValue(value, (_ann$options_$enhance = (_ann$options_ = ann.options_) == null ? void 0 : _ann$options_.enhancer) != null ? _ann$options_$enhance : deepEnhancer, false ? adm.name_ + "." + name.toString() : "ObservableObject." + name.toString(), false);
    adm.values_.set(name, observable2);
    initializedObjects.add(target);
  }
  if (kind == "accessor") {
    return {
      get: function get3() {
        if (!initializedObjects.has(this)) {
          initializeObservable(this, desc.get.call(this));
        }
        return this[$mobx].getObservablePropValue_(name);
      },
      set: function set4(value) {
        if (!initializedObjects.has(this)) {
          initializeObservable(this, value);
        }
        return this[$mobx].setObservablePropValue_(name, value);
      },
      init: function init(value) {
        if (!initializedObjects.has(this)) {
          initializeObservable(this, value);
        }
        return value;
      }
    };
  }
  return;
}
function assertObservableDescriptor(adm, _ref, key, descriptor) {
  var annotationType_ = _ref.annotationType_;
  if (false) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' cannot be used on getter/setter properties"));
  }
}
var AUTO = "true";
var autoAnnotation = /* @__PURE__ */ createAutoAnnotation();
function createAutoAnnotation(options) {
  return {
    annotationType_: AUTO,
    options_: options,
    make_: make_$5,
    extend_: extend_$5,
    decorate_20223_: decorate_20223_$5
  };
}
function make_$5(adm, key, descriptor, source) {
  var _this$options_3, _this$options_4;
  if (descriptor.get) {
    return computed.make_(adm, key, descriptor, source);
  }
  if (descriptor.set) {
    var set4 = createAction(key.toString(), descriptor.set);
    if (source === adm.target_) {
      return adm.defineProperty_(key, {
        configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
        set: set4
      }) === null ? 0 : 2;
    }
    defineProperty(source, key, {
      configurable: true,
      set: set4
    });
    return 2;
  }
  if (source !== adm.target_ && typeof descriptor.value === "function") {
    var _this$options_2;
    if (isGenerator(descriptor.value)) {
      var _this$options_;
      var flowAnnotation2 = (_this$options_ = this.options_) != null && _this$options_.autoBind ? flow.bound : flow;
      return flowAnnotation2.make_(adm, key, descriptor, source);
    }
    var actionAnnotation2 = (_this$options_2 = this.options_) != null && _this$options_2.autoBind ? autoAction.bound : autoAction;
    return actionAnnotation2.make_(adm, key, descriptor, source);
  }
  var observableAnnotation2 = ((_this$options_3 = this.options_) == null ? void 0 : _this$options_3.deep) === false ? observable.ref : observable;
  if (typeof descriptor.value === "function" && (_this$options_4 = this.options_) != null && _this$options_4.autoBind) {
    var _adm$proxy_;
    descriptor.value = descriptor.value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
  }
  return observableAnnotation2.make_(adm, key, descriptor, source);
}
function extend_$5(adm, key, descriptor, proxyTrap) {
  var _this$options_5, _this$options_6;
  if (descriptor.get) {
    return computed.extend_(adm, key, descriptor, proxyTrap);
  }
  if (descriptor.set) {
    return adm.defineProperty_(key, {
      configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
      set: createAction(key.toString(), descriptor.set)
    }, proxyTrap);
  }
  if (typeof descriptor.value === "function" && (_this$options_5 = this.options_) != null && _this$options_5.autoBind) {
    var _adm$proxy_2;
    descriptor.value = descriptor.value.bind((_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_);
  }
  var observableAnnotation2 = ((_this$options_6 = this.options_) == null ? void 0 : _this$options_6.deep) === false ? observable.ref : observable;
  return observableAnnotation2.extend_(adm, key, descriptor, proxyTrap);
}
function decorate_20223_$5(desc, context) {
  die("'" + this.annotationType_ + "' cannot be used as a decorator");
}
var OBSERVABLE = "observable";
var OBSERVABLE_REF = "observable.ref";
var OBSERVABLE_SHALLOW = "observable.shallow";
var OBSERVABLE_STRUCT = "observable.struct";
var defaultCreateObservableOptions = {
  deep: true,
  name: void 0,
  defaultDecorator: void 0,
  proxy: true
};
Object.freeze(defaultCreateObservableOptions);
function asCreateObservableOptions(thing) {
  return thing || defaultCreateObservableOptions;
}
var observableAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE);
var observableRefAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_REF, {
  enhancer: referenceEnhancer
});
var observableShallowAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_SHALLOW, {
  enhancer: shallowEnhancer
});
var observableStructAnnotation = /* @__PURE__ */ createObservableAnnotation(OBSERVABLE_STRUCT, {
  enhancer: refStructEnhancer
});
var observableDecoratorAnnotation = /* @__PURE__ */ createDecoratorAnnotation(observableAnnotation);
function getEnhancerFromOptions(options) {
  return options.deep === true ? deepEnhancer : options.deep === false ? referenceEnhancer : getEnhancerFromAnnotation(options.defaultDecorator);
}
function getAnnotationFromOptions(options) {
  var _options$defaultDecor;
  return options ? (_options$defaultDecor = options.defaultDecorator) != null ? _options$defaultDecor : createAutoAnnotation(options) : void 0;
}
function getEnhancerFromAnnotation(annotation) {
  var _annotation$options_$, _annotation$options_;
  return !annotation ? deepEnhancer : (_annotation$options_$ = (_annotation$options_ = annotation.options_) == null ? void 0 : _annotation$options_.enhancer) != null ? _annotation$options_$ : deepEnhancer;
}
function createObservable(v3, arg2, arg3) {
  if (is20223Decorator(arg2)) {
    return observableAnnotation.decorate_20223_(v3, arg2);
  }
  if (isStringish(arg2)) {
    storeAnnotation(v3, arg2, observableAnnotation);
    return;
  }
  if (isObservable(v3)) {
    return v3;
  }
  if (isPlainObject(v3)) {
    return observable.object(v3, arg2, arg3);
  }
  if (Array.isArray(v3)) {
    return observable.array(v3, arg2);
  }
  if (isES6Map(v3)) {
    return observable.map(v3, arg2);
  }
  if (isES6Set(v3)) {
    return observable.set(v3, arg2);
  }
  if (typeof v3 === "object" && v3 !== null) {
    return v3;
  }
  return observable.box(v3, arg2);
}
assign(createObservable, observableDecoratorAnnotation);
var observableFactories = {
  box: function box(value, options) {
    var o10 = asCreateObservableOptions(options);
    return new ObservableValue(value, getEnhancerFromOptions(o10), o10.name, true, o10.equals);
  },
  array: function array(initialValues, options) {
    var o10 = asCreateObservableOptions(options);
    return (globalState.useProxies === false || o10.proxy === false ? createLegacyArray : createObservableArray)(initialValues, getEnhancerFromOptions(o10), o10.name);
  },
  map: function map(initialValues, options) {
    var o10 = asCreateObservableOptions(options);
    return new ObservableMap(initialValues, getEnhancerFromOptions(o10), o10.name);
  },
  set: function set(initialValues, options) {
    var o10 = asCreateObservableOptions(options);
    return new ObservableSet(initialValues, getEnhancerFromOptions(o10), o10.name);
  },
  object: function object(props, decorators, options) {
    return initObservable(function() {
      return extendObservable(globalState.useProxies === false || (options == null ? void 0 : options.proxy) === false ? asObservableObject({}, options) : asDynamicObservableObject({}, options), props, decorators);
    });
  },
  ref: /* @__PURE__ */ createDecoratorAnnotation(observableRefAnnotation),
  shallow: /* @__PURE__ */ createDecoratorAnnotation(observableShallowAnnotation),
  deep: observableDecoratorAnnotation,
  struct: /* @__PURE__ */ createDecoratorAnnotation(observableStructAnnotation)
};
var observable = /* @__PURE__ */ assign(createObservable, observableFactories);
var COMPUTED = "computed";
var COMPUTED_STRUCT = "computed.struct";
var computedAnnotation = /* @__PURE__ */ createComputedAnnotation(COMPUTED);
var computedStructAnnotation = /* @__PURE__ */ createComputedAnnotation(COMPUTED_STRUCT, {
  equals: comparer.structural
});
var computed = function computed2(arg1, arg2) {
  if (is20223Decorator(arg2)) {
    return computedAnnotation.decorate_20223_(arg1, arg2);
  }
  if (isStringish(arg2)) {
    return storeAnnotation(arg1, arg2, computedAnnotation);
  }
  if (isPlainObject(arg1)) {
    return createDecoratorAnnotation(createComputedAnnotation(COMPUTED, arg1));
  }
  if (false) {
    if (!isFunction(arg1)) {
      die("First argument to `computed` should be an expression.");
    }
    if (isFunction(arg2)) {
      die("A setter as second argument is no longer supported, use `{ set: fn }` option instead");
    }
  }
  var opts = isPlainObject(arg2) ? arg2 : {};
  opts.get = arg1;
  opts.name || (opts.name = arg1.name || "");
  return new ComputedValue(opts);
};
Object.assign(computed, computedAnnotation);
computed.struct = /* @__PURE__ */ createDecoratorAnnotation(computedStructAnnotation);
var _getDescriptor$config;
var _getDescriptor;
var currentActionId = 0;
var nextActionId = 1;
var isFunctionNameConfigurable = (_getDescriptor$config = (_getDescriptor = /* @__PURE__ */ getDescriptor(function() {
}, "name")) == null ? void 0 : _getDescriptor.configurable) != null ? _getDescriptor$config : false;
var tmpNameDescriptor = {
  value: "action",
  configurable: true,
  writable: false,
  enumerable: false
};
function createAction(actionName, fn, autoAction2, ref) {
  if (autoAction2 === void 0) {
    autoAction2 = false;
  }
  if (false) {
    if (!isFunction(fn)) {
      die("`action` can only be invoked on functions");
    }
    if (typeof actionName !== "string" || !actionName) {
      die("actions should have valid names, got: '" + actionName + "'");
    }
  }
  function res() {
    return executeAction(actionName, autoAction2, fn, ref || this, arguments);
  }
  res.isMobxAction = true;
  res.toString = function() {
    return fn.toString();
  };
  if (isFunctionNameConfigurable) {
    tmpNameDescriptor.value = actionName;
    defineProperty(res, "name", tmpNameDescriptor);
  }
  return res;
}
function executeAction(actionName, canRunAsDerivation, fn, scope, args) {
  var runInfo = _startAction(actionName, canRunAsDerivation, scope, args);
  try {
    return fn.apply(scope, args);
  } catch (err) {
    runInfo.error_ = err;
    throw err;
  } finally {
    _endAction(runInfo);
  }
}
function _startAction(actionName, canRunAsDerivation, scope, args) {
  var notifySpy_ = false;
  var startTime_ = 0;
  if (false) {
    startTime_ = Date.now();
    var flattenedArgs = args ? Array.from(args) : EMPTY_ARRAY;
    spyReportStart({
      type: ACTION,
      name: actionName,
      object: scope,
      arguments: flattenedArgs
    });
  }
  var prevDerivation_ = globalState.trackingDerivation;
  var runAsAction = !canRunAsDerivation || !prevDerivation_;
  startBatch();
  var prevAllowStateChanges_ = globalState.allowStateChanges;
  if (runAsAction) {
    untrackedStart();
    prevAllowStateChanges_ = allowStateChangesStart(true);
  }
  var prevAllowStateReads_ = allowStateReadsStart(true);
  var runInfo = {
    runAsAction_: runAsAction,
    prevDerivation_,
    prevAllowStateChanges_,
    prevAllowStateReads_,
    notifySpy_,
    startTime_,
    actionId_: nextActionId++,
    parentActionId_: currentActionId
  };
  currentActionId = runInfo.actionId_;
  return runInfo;
}
function _endAction(runInfo) {
  if (currentActionId !== runInfo.actionId_) {
    die(30);
  }
  currentActionId = runInfo.parentActionId_;
  if (runInfo.error_ !== void 0) {
    globalState.suppressReactionErrors = true;
  }
  allowStateChangesEnd(runInfo.prevAllowStateChanges_);
  allowStateReadsEnd(runInfo.prevAllowStateReads_);
  endBatch();
  if (runInfo.runAsAction_) {
    untrackedEnd(runInfo.prevDerivation_);
  }
  if (false) {
    spyReportEnd({
      time: Date.now() - runInfo.startTime_
    });
  }
  globalState.suppressReactionErrors = false;
}
function allowStateChangesStart(allowStateChanges) {
  var prev = globalState.allowStateChanges;
  globalState.allowStateChanges = allowStateChanges;
  return prev;
}
function allowStateChangesEnd(prev) {
  globalState.allowStateChanges = prev;
}
var ObservableValue = /* @__PURE__ */ function(_Atom) {
  function ObservableValue2(value, enhancer, name_, notifySpy, equals) {
    var _this;
    if (name_ === void 0) {
      name_ = false ? "ObservableValue@" + getNextId() : "ObservableValue";
    }
    if (notifySpy === void 0) {
      notifySpy = true;
    }
    if (equals === void 0) {
      equals = comparer["default"];
    }
    _this = _Atom.call(this, name_) || this;
    _this.enhancer = void 0;
    _this.name_ = void 0;
    _this.equals = void 0;
    _this.hasUnreportedChange_ = false;
    _this.interceptors_ = void 0;
    _this.changeListeners_ = void 0;
    _this.value_ = void 0;
    _this.dehancer = void 0;
    _this.enhancer = enhancer;
    _this.name_ = name_;
    _this.equals = equals;
    _this.value_ = enhancer(value, void 0, name_);
    if (false) {
      spyReport({
        type: CREATE,
        object: _this,
        observableKind: "value",
        debugObjectName: _this.name_,
        newValue: "" + _this.value_
      });
    }
    return _this;
  }
  _inheritsLoose(ObservableValue2, _Atom);
  var _proto = ObservableValue2.prototype;
  _proto.dehanceValue = function dehanceValue(value) {
    if (this.dehancer !== void 0) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.set = function set4(newValue) {
    var oldValue = this.value_;
    newValue = this.prepareNewValue_(newValue);
    if (newValue !== globalState.UNCHANGED) {
      var notifySpy = isSpyEnabled();
      if (false) {
        spyReportStart({
          type: UPDATE,
          object: this,
          observableKind: "value",
          debugObjectName: this.name_,
          newValue,
          oldValue
        });
      }
      this.setNewValue_(newValue);
      if (false) {
        spyReportEnd();
      }
    }
  };
  _proto.prepareNewValue_ = function prepareNewValue_(newValue) {
    checkIfStateModificationsAreAllowed(this);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this,
        type: UPDATE,
        newValue
      });
      if (!change) {
        return globalState.UNCHANGED;
      }
      newValue = change.newValue;
    }
    newValue = this.enhancer(newValue, this.value_, this.name_);
    return this.equals(this.value_, newValue) ? globalState.UNCHANGED : newValue;
  };
  _proto.setNewValue_ = function setNewValue_(newValue) {
    var oldValue = this.value_;
    this.value_ = newValue;
    this.reportChanged();
    if (hasListeners(this)) {
      notifyListeners(this, {
        type: UPDATE,
        object: this,
        newValue,
        oldValue
      });
    }
  };
  _proto.get = function get3() {
    this.reportObserved();
    return this.dehanceValue(this.value_);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (fireImmediately) {
      listener({
        observableKind: "value",
        debugObjectName: this.name_,
        object: this,
        type: UPDATE,
        newValue: this.value_,
        oldValue: void 0
      });
    }
    return registerListener(this, listener);
  };
  _proto.raw = function raw() {
    return this.value_;
  };
  _proto.toJSON = function toJSON2() {
    return this.get();
  };
  _proto.toString = function toString2() {
    return this.name_ + "[" + this.value_ + "]";
  };
  _proto.valueOf = function valueOf() {
    return toPrimitive(this.get());
  };
  _proto[Symbol.toPrimitive] = function() {
    return this.valueOf();
  };
  return ObservableValue2;
}(Atom);
var ComputedValue = /* @__PURE__ */ function() {
  function ComputedValue2(options) {
    this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
    this.observing_ = [];
    this.newObserving_ = null;
    this.observers_ = /* @__PURE__ */ new Set();
    this.runId_ = 0;
    this.lastAccessedBy_ = 0;
    this.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
    this.unboundDepsCount_ = 0;
    this.value_ = new CaughtException(null);
    this.name_ = void 0;
    this.triggeredBy_ = void 0;
    this.flags_ = 0;
    this.derivation = void 0;
    this.setter_ = void 0;
    this.isTracing_ = TraceMode.NONE;
    this.scope_ = void 0;
    this.equals_ = void 0;
    this.requiresReaction_ = void 0;
    this.keepAlive_ = void 0;
    this.onBOL = void 0;
    this.onBUOL = void 0;
    if (!options.get) {
      die(31);
    }
    this.derivation = options.get;
    this.name_ = options.name || (false ? "ComputedValue@" + getNextId() : "ComputedValue");
    if (options.set) {
      this.setter_ = createAction(false ? this.name_ + "-setter" : "ComputedValue-setter", options.set);
    }
    this.equals_ = options.equals || (options.compareStructural || options.struct ? comparer.structural : comparer["default"]);
    this.scope_ = options.context;
    this.requiresReaction_ = options.requiresReaction;
    this.keepAlive_ = !!options.keepAlive;
  }
  var _proto = ComputedValue2.prototype;
  _proto.onBecomeStale_ = function onBecomeStale_() {
    propagateMaybeChanged(this);
  };
  _proto.onBO = function onBO() {
    if (this.onBOL) {
      this.onBOL.forEach(function(listener) {
        return listener();
      });
    }
  };
  _proto.onBUO = function onBUO() {
    if (this.onBUOL) {
      this.onBUOL.forEach(function(listener) {
        return listener();
      });
    }
  };
  _proto.get = function get3() {
    if (this.isComputing) {
      die(32, this.name_, this.derivation);
    }
    if (globalState.inBatch === 0 && // !globalState.trackingDerivatpion &&
    this.observers_.size === 0 && !this.keepAlive_) {
      if (shouldCompute(this)) {
        this.warnAboutUntrackedRead_();
        startBatch();
        this.value_ = this.computeValue_(false);
        endBatch();
      }
    } else {
      reportObserved(this);
      if (shouldCompute(this)) {
        var prevTrackingContext = globalState.trackingContext;
        if (this.keepAlive_ && !prevTrackingContext) {
          globalState.trackingContext = this;
        }
        if (this.trackAndCompute()) {
          propagateChangeConfirmed(this);
        }
        globalState.trackingContext = prevTrackingContext;
      }
    }
    var result = this.value_;
    if (isCaughtException(result)) {
      throw result.cause;
    }
    return result;
  };
  _proto.set = function set4(value) {
    if (this.setter_) {
      if (this.isRunningSetter) {
        die(33, this.name_);
      }
      this.isRunningSetter = true;
      try {
        this.setter_.call(this.scope_, value);
      } finally {
        this.isRunningSetter = false;
      }
    } else {
      die(34, this.name_);
    }
  };
  _proto.trackAndCompute = function trackAndCompute() {
    var oldValue = this.value_;
    var wasSuspended = (
      /* see #1208 */
      this.dependenciesState_ === IDerivationState_.NOT_TRACKING_
    );
    var newValue = this.computeValue_(true);
    var changed = wasSuspended || isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals_(oldValue, newValue);
    if (changed) {
      this.value_ = newValue;
      if (false) {
        spyReport({
          observableKind: "computed",
          debugObjectName: this.name_,
          object: this.scope_,
          type: "update",
          oldValue,
          newValue
        });
      }
    }
    return changed;
  };
  _proto.computeValue_ = function computeValue_(track) {
    this.isComputing = true;
    var prev = allowStateChangesStart(false);
    var res;
    if (track) {
      res = trackDerivedFunction(this, this.derivation, this.scope_);
    } else {
      if (globalState.disableErrorBoundaries === true) {
        res = this.derivation.call(this.scope_);
      } else {
        try {
          res = this.derivation.call(this.scope_);
        } catch (e9) {
          res = new CaughtException(e9);
        }
      }
    }
    allowStateChangesEnd(prev);
    this.isComputing = false;
    return res;
  };
  _proto.suspend_ = function suspend_() {
    if (!this.keepAlive_) {
      clearObserving(this);
      this.value_ = void 0;
      if (false) {
        console.log("[mobx.trace] Computed value '" + this.name_ + "' was suspended and it will recompute on the next access.");
      }
    }
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    var _this = this;
    var firstTime = true;
    var prevValue = void 0;
    return autorun(function() {
      var newValue = _this.get();
      if (!firstTime || fireImmediately) {
        var prevU = untrackedStart();
        listener({
          observableKind: "computed",
          debugObjectName: _this.name_,
          type: UPDATE,
          object: _this,
          newValue,
          oldValue: prevValue
        });
        untrackedEnd(prevU);
      }
      firstTime = false;
      prevValue = newValue;
    });
  };
  _proto.warnAboutUntrackedRead_ = function warnAboutUntrackedRead_() {
    if (true) {
      return;
    }
    if (this.isTracing_ !== TraceMode.NONE) {
      console.log("[mobx.trace] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute.");
    }
    if (typeof this.requiresReaction_ === "boolean" ? this.requiresReaction_ : globalState.computedRequiresReaction) {
      console.warn("[mobx] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute.");
    }
  };
  _proto.toString = function toString2() {
    return this.name_ + "[" + this.derivation.toString() + "]";
  };
  _proto.valueOf = function valueOf() {
    return toPrimitive(this.get());
  };
  _proto[Symbol.toPrimitive] = function() {
    return this.valueOf();
  };
  return _createClass(ComputedValue2, [{
    key: "isComputing",
    get: function get3() {
      return getFlag(this.flags_, ComputedValue2.isComputingMask_);
    },
    set: function set4(newValue) {
      this.flags_ = setFlag(this.flags_, ComputedValue2.isComputingMask_, newValue);
    }
  }, {
    key: "isRunningSetter",
    get: function get3() {
      return getFlag(this.flags_, ComputedValue2.isRunningSetterMask_);
    },
    set: function set4(newValue) {
      this.flags_ = setFlag(this.flags_, ComputedValue2.isRunningSetterMask_, newValue);
    }
  }, {
    key: "isBeingObserved",
    get: function get3() {
      return getFlag(this.flags_, ComputedValue2.isBeingObservedMask_);
    },
    set: function set4(newValue) {
      this.flags_ = setFlag(this.flags_, ComputedValue2.isBeingObservedMask_, newValue);
    }
  }, {
    key: "isPendingUnobservation",
    get: function get3() {
      return getFlag(this.flags_, ComputedValue2.isPendingUnobservationMask_);
    },
    set: function set4(newValue) {
      this.flags_ = setFlag(this.flags_, ComputedValue2.isPendingUnobservationMask_, newValue);
    }
  }, {
    key: "diffValue",
    get: function get3() {
      return getFlag(this.flags_, ComputedValue2.diffValueMask_) ? 1 : 0;
    },
    set: function set4(newValue) {
      this.flags_ = setFlag(this.flags_, ComputedValue2.diffValueMask_, newValue === 1 ? true : false);
    }
  }]);
}();
ComputedValue.isComputingMask_ = 1;
ComputedValue.isRunningSetterMask_ = 2;
ComputedValue.isBeingObservedMask_ = 4;
ComputedValue.isPendingUnobservationMask_ = 8;
ComputedValue.diffValueMask_ = 16;
var isComputedValue = /* @__PURE__ */ createInstanceofPredicate("ComputedValue", ComputedValue);
var IDerivationState_;
(function(IDerivationState_2) {
  IDerivationState_2[IDerivationState_2["NOT_TRACKING_"] = -1] = "NOT_TRACKING_";
  IDerivationState_2[IDerivationState_2["UP_TO_DATE_"] = 0] = "UP_TO_DATE_";
  IDerivationState_2[IDerivationState_2["POSSIBLY_STALE_"] = 1] = "POSSIBLY_STALE_";
  IDerivationState_2[IDerivationState_2["STALE_"] = 2] = "STALE_";
})(IDerivationState_ || (IDerivationState_ = {}));
var TraceMode;
(function(TraceMode2) {
  TraceMode2[TraceMode2["NONE"] = 0] = "NONE";
  TraceMode2[TraceMode2["LOG"] = 1] = "LOG";
  TraceMode2[TraceMode2["BREAK"] = 2] = "BREAK";
})(TraceMode || (TraceMode = {}));
var CaughtException = function CaughtException2(cause) {
  this.cause = void 0;
  this.cause = cause;
};
function isCaughtException(e9) {
  return e9 instanceof CaughtException;
}
function shouldCompute(derivation) {
  switch (derivation.dependenciesState_) {
    case IDerivationState_.UP_TO_DATE_:
      return false;
    case IDerivationState_.NOT_TRACKING_:
    case IDerivationState_.STALE_:
      return true;
    case IDerivationState_.POSSIBLY_STALE_: {
      var prevAllowStateReads = allowStateReadsStart(true);
      var prevUntracked = untrackedStart();
      var obs = derivation.observing_, l7 = obs.length;
      for (var i6 = 0; i6 < l7; i6++) {
        var obj = obs[i6];
        if (isComputedValue(obj)) {
          if (globalState.disableErrorBoundaries) {
            obj.get();
          } else {
            try {
              obj.get();
            } catch (e9) {
              untrackedEnd(prevUntracked);
              allowStateReadsEnd(prevAllowStateReads);
              return true;
            }
          }
          if (derivation.dependenciesState_ === IDerivationState_.STALE_) {
            untrackedEnd(prevUntracked);
            allowStateReadsEnd(prevAllowStateReads);
            return true;
          }
        }
      }
      changeDependenciesStateTo0(derivation);
      untrackedEnd(prevUntracked);
      allowStateReadsEnd(prevAllowStateReads);
      return false;
    }
  }
}
function checkIfStateModificationsAreAllowed(atom) {
  if (true) {
    return;
  }
  var hasObservers = atom.observers_.size > 0;
  if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === "always")) {
    console.warn("[MobX] " + (globalState.enforceActions ? "Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, a computed value or the render function of a React component? You can wrap side effects in 'runInAction' (or decorate functions with 'action') if needed. Tried to modify: ") + atom.name_);
  }
}
function checkIfStateReadsAreAllowed(observable2) {
  if (false) {
    console.warn("[mobx] Observable '" + observable2.name_ + "' being read outside a reactive context.");
  }
}
function trackDerivedFunction(derivation, f4, context) {
  var prevAllowStateReads = allowStateReadsStart(true);
  changeDependenciesStateTo0(derivation);
  derivation.newObserving_ = new Array(
    // Reserve constant space for initial dependencies, dynamic space otherwise.
    // See https://github.com/mobxjs/mobx/pull/3833
    derivation.runId_ === 0 ? 100 : derivation.observing_.length
  );
  derivation.unboundDepsCount_ = 0;
  derivation.runId_ = ++globalState.runId;
  var prevTracking = globalState.trackingDerivation;
  globalState.trackingDerivation = derivation;
  globalState.inBatch++;
  var result;
  if (globalState.disableErrorBoundaries === true) {
    result = f4.call(context);
  } else {
    try {
      result = f4.call(context);
    } catch (e9) {
      result = new CaughtException(e9);
    }
  }
  globalState.inBatch--;
  globalState.trackingDerivation = prevTracking;
  bindDependencies(derivation);
  warnAboutDerivationWithoutDependencies(derivation);
  allowStateReadsEnd(prevAllowStateReads);
  return result;
}
function warnAboutDerivationWithoutDependencies(derivation) {
  if (true) {
    return;
  }
  if (derivation.observing_.length !== 0) {
    return;
  }
  if (typeof derivation.requiresObservable_ === "boolean" ? derivation.requiresObservable_ : globalState.reactionRequiresObservable) {
    console.warn("[mobx] Derivation '" + derivation.name_ + "' is created/updated without reading any observable value.");
  }
}
function bindDependencies(derivation) {
  var prevObserving = derivation.observing_;
  var observing = derivation.observing_ = derivation.newObserving_;
  var lowestNewObservingDerivationState = IDerivationState_.UP_TO_DATE_;
  var i0 = 0, l7 = derivation.unboundDepsCount_;
  for (var i6 = 0; i6 < l7; i6++) {
    var dep = observing[i6];
    if (dep.diffValue === 0) {
      dep.diffValue = 1;
      if (i0 !== i6) {
        observing[i0] = dep;
      }
      i0++;
    }
    if (dep.dependenciesState_ > lowestNewObservingDerivationState) {
      lowestNewObservingDerivationState = dep.dependenciesState_;
    }
  }
  observing.length = i0;
  derivation.newObserving_ = null;
  l7 = prevObserving.length;
  while (l7--) {
    var _dep = prevObserving[l7];
    if (_dep.diffValue === 0) {
      removeObserver(_dep, derivation);
    }
    _dep.diffValue = 0;
  }
  while (i0--) {
    var _dep2 = observing[i0];
    if (_dep2.diffValue === 1) {
      _dep2.diffValue = 0;
      addObserver(_dep2, derivation);
    }
  }
  if (lowestNewObservingDerivationState !== IDerivationState_.UP_TO_DATE_) {
    derivation.dependenciesState_ = lowestNewObservingDerivationState;
    derivation.onBecomeStale_();
  }
}
function clearObserving(derivation) {
  var obs = derivation.observing_;
  derivation.observing_ = [];
  var i6 = obs.length;
  while (i6--) {
    removeObserver(obs[i6], derivation);
  }
  derivation.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
}
function untracked(action2) {
  var prev = untrackedStart();
  try {
    return action2();
  } finally {
    untrackedEnd(prev);
  }
}
function untrackedStart() {
  var prev = globalState.trackingDerivation;
  globalState.trackingDerivation = null;
  return prev;
}
function untrackedEnd(prev) {
  globalState.trackingDerivation = prev;
}
function allowStateReadsStart(allowStateReads) {
  var prev = globalState.allowStateReads;
  globalState.allowStateReads = allowStateReads;
  return prev;
}
function allowStateReadsEnd(prev) {
  globalState.allowStateReads = prev;
}
function changeDependenciesStateTo0(derivation) {
  if (derivation.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
    return;
  }
  derivation.dependenciesState_ = IDerivationState_.UP_TO_DATE_;
  var obs = derivation.observing_;
  var i6 = obs.length;
  while (i6--) {
    obs[i6].lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
  }
}
var MobXGlobals = function MobXGlobals2() {
  this.version = 6;
  this.UNCHANGED = {};
  this.trackingDerivation = null;
  this.trackingContext = null;
  this.runId = 0;
  this.mobxGuid = 0;
  this.inBatch = 0;
  this.pendingUnobservations = [];
  this.pendingReactions = [];
  this.isRunningReactions = false;
  this.allowStateChanges = false;
  this.allowStateReads = true;
  this.enforceActions = true;
  this.spyListeners = [];
  this.globalReactionErrorHandlers = [];
  this.computedRequiresReaction = false;
  this.reactionRequiresObservable = false;
  this.observableRequiresReaction = false;
  this.disableErrorBoundaries = false;
  this.suppressReactionErrors = false;
  this.useProxies = true;
  this.verifyProxies = false;
  this.safeDescriptors = true;
};
var canMergeGlobalState = true;
var isolateCalled = false;
var globalState = /* @__PURE__ */ function() {
  var global2 = /* @__PURE__ */ getGlobal();
  if (global2.__mobxInstanceCount > 0 && !global2.__mobxGlobals) {
    canMergeGlobalState = false;
  }
  if (global2.__mobxGlobals && global2.__mobxGlobals.version !== new MobXGlobals().version) {
    canMergeGlobalState = false;
  }
  if (!canMergeGlobalState) {
    setTimeout(function() {
      if (!isolateCalled) {
        die(35);
      }
    }, 1);
    return new MobXGlobals();
  } else if (global2.__mobxGlobals) {
    global2.__mobxInstanceCount += 1;
    if (!global2.__mobxGlobals.UNCHANGED) {
      global2.__mobxGlobals.UNCHANGED = {};
    }
    return global2.__mobxGlobals;
  } else {
    global2.__mobxInstanceCount = 1;
    return global2.__mobxGlobals = /* @__PURE__ */ new MobXGlobals();
  }
}();
function addObserver(observable2, node) {
  observable2.observers_.add(node);
  if (observable2.lowestObserverState_ > node.dependenciesState_) {
    observable2.lowestObserverState_ = node.dependenciesState_;
  }
}
function removeObserver(observable2, node) {
  observable2.observers_["delete"](node);
  if (observable2.observers_.size === 0) {
    queueForUnobservation(observable2);
  }
}
function queueForUnobservation(observable2) {
  if (observable2.isPendingUnobservation === false) {
    observable2.isPendingUnobservation = true;
    globalState.pendingUnobservations.push(observable2);
  }
}
function startBatch() {
  globalState.inBatch++;
}
function endBatch() {
  if (--globalState.inBatch === 0) {
    runReactions();
    var list = globalState.pendingUnobservations;
    for (var i6 = 0; i6 < list.length; i6++) {
      var observable2 = list[i6];
      observable2.isPendingUnobservation = false;
      if (observable2.observers_.size === 0) {
        if (observable2.isBeingObserved) {
          observable2.isBeingObserved = false;
          observable2.onBUO();
        }
        if (observable2 instanceof ComputedValue) {
          observable2.suspend_();
        }
      }
    }
    globalState.pendingUnobservations = [];
  }
}
function reportObserved(observable2) {
  checkIfStateReadsAreAllowed(observable2);
  var derivation = globalState.trackingDerivation;
  if (derivation !== null) {
    if (derivation.runId_ !== observable2.lastAccessedBy_) {
      observable2.lastAccessedBy_ = derivation.runId_;
      derivation.newObserving_[derivation.unboundDepsCount_++] = observable2;
      if (!observable2.isBeingObserved && globalState.trackingContext) {
        observable2.isBeingObserved = true;
        observable2.onBO();
      }
    }
    return observable2.isBeingObserved;
  } else if (observable2.observers_.size === 0 && globalState.inBatch > 0) {
    queueForUnobservation(observable2);
  }
  return false;
}
function propagateChanged(observable2) {
  if (observable2.lowestObserverState_ === IDerivationState_.STALE_) {
    return;
  }
  observable2.lowestObserverState_ = IDerivationState_.STALE_;
  observable2.observers_.forEach(function(d5) {
    if (d5.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
      if (false) {
        logTraceInfo(d5, observable2);
      }
      d5.onBecomeStale_();
    }
    d5.dependenciesState_ = IDerivationState_.STALE_;
  });
}
function propagateChangeConfirmed(observable2) {
  if (observable2.lowestObserverState_ === IDerivationState_.STALE_) {
    return;
  }
  observable2.lowestObserverState_ = IDerivationState_.STALE_;
  observable2.observers_.forEach(function(d5) {
    if (d5.dependenciesState_ === IDerivationState_.POSSIBLY_STALE_) {
      d5.dependenciesState_ = IDerivationState_.STALE_;
      if (false) {
        logTraceInfo(d5, observable2);
      }
    } else if (d5.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
      observable2.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
    }
  });
}
function propagateMaybeChanged(observable2) {
  if (observable2.lowestObserverState_ !== IDerivationState_.UP_TO_DATE_) {
    return;
  }
  observable2.lowestObserverState_ = IDerivationState_.POSSIBLY_STALE_;
  observable2.observers_.forEach(function(d5) {
    if (d5.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
      d5.dependenciesState_ = IDerivationState_.POSSIBLY_STALE_;
      d5.onBecomeStale_();
    }
  });
}
var Reaction = /* @__PURE__ */ function() {
  function Reaction2(name_, onInvalidate_, errorHandler_, requiresObservable_) {
    if (name_ === void 0) {
      name_ = false ? "Reaction@" + getNextId() : "Reaction";
    }
    this.name_ = void 0;
    this.onInvalidate_ = void 0;
    this.errorHandler_ = void 0;
    this.requiresObservable_ = void 0;
    this.observing_ = [];
    this.newObserving_ = [];
    this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
    this.runId_ = 0;
    this.unboundDepsCount_ = 0;
    this.flags_ = 0;
    this.isTracing_ = TraceMode.NONE;
    this.name_ = name_;
    this.onInvalidate_ = onInvalidate_;
    this.errorHandler_ = errorHandler_;
    this.requiresObservable_ = requiresObservable_;
  }
  var _proto = Reaction2.prototype;
  _proto.onBecomeStale_ = function onBecomeStale_() {
    this.schedule_();
  };
  _proto.schedule_ = function schedule_() {
    if (!this.isScheduled) {
      this.isScheduled = true;
      globalState.pendingReactions.push(this);
      runReactions();
    }
  };
  _proto.runReaction_ = function runReaction_() {
    if (!this.isDisposed) {
      startBatch();
      this.isScheduled = false;
      var prev = globalState.trackingContext;
      globalState.trackingContext = this;
      if (shouldCompute(this)) {
        this.isTrackPending = true;
        try {
          this.onInvalidate_();
          if (false) {
            spyReport({
              name: this.name_,
              type: "scheduled-reaction"
            });
          }
        } catch (e9) {
          this.reportExceptionInDerivation_(e9);
        }
      }
      globalState.trackingContext = prev;
      endBatch();
    }
  };
  _proto.track = function track(fn) {
    if (this.isDisposed) {
      return;
    }
    startBatch();
    var notify = isSpyEnabled();
    var startTime;
    if (false) {
      startTime = Date.now();
      spyReportStart({
        name: this.name_,
        type: "reaction"
      });
    }
    this.isRunning = true;
    var prevReaction = globalState.trackingContext;
    globalState.trackingContext = this;
    var result = trackDerivedFunction(this, fn, void 0);
    globalState.trackingContext = prevReaction;
    this.isRunning = false;
    this.isTrackPending = false;
    if (this.isDisposed) {
      clearObserving(this);
    }
    if (isCaughtException(result)) {
      this.reportExceptionInDerivation_(result.cause);
    }
    if (false) {
      spyReportEnd({
        time: Date.now() - startTime
      });
    }
    endBatch();
  };
  _proto.reportExceptionInDerivation_ = function reportExceptionInDerivation_(error) {
    var _this = this;
    if (this.errorHandler_) {
      this.errorHandler_(error, this);
      return;
    }
    if (globalState.disableErrorBoundaries) {
      throw error;
    }
    var message = false ? "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'" : "[mobx] uncaught error in '" + this + "'";
    if (!globalState.suppressReactionErrors) {
      console.error(message, error);
    } else if (false) {
      console.warn("[mobx] (error in reaction '" + this.name_ + "' suppressed, fix error of causing action below)");
    }
    if (false) {
      spyReport({
        type: "error",
        name: this.name_,
        message,
        error: "" + error
      });
    }
    globalState.globalReactionErrorHandlers.forEach(function(f4) {
      return f4(error, _this);
    });
  };
  _proto.dispose = function dispose() {
    if (!this.isDisposed) {
      this.isDisposed = true;
      if (!this.isRunning) {
        startBatch();
        clearObserving(this);
        endBatch();
      }
    }
  };
  _proto.getDisposer_ = function getDisposer_(abortSignal) {
    var _this2 = this;
    var dispose = function dispose2() {
      _this2.dispose();
      abortSignal == null || abortSignal.removeEventListener == null || abortSignal.removeEventListener("abort", dispose2);
    };
    abortSignal == null || abortSignal.addEventListener == null || abortSignal.addEventListener("abort", dispose);
    dispose[$mobx] = this;
    return dispose;
  };
  _proto.toString = function toString2() {
    return "Reaction[" + this.name_ + "]";
  };
  _proto.trace = function trace$1(enterBreakPoint) {
    if (enterBreakPoint === void 0) {
      enterBreakPoint = false;
    }
    trace(this, enterBreakPoint);
  };
  return _createClass(Reaction2, [{
    key: "isDisposed",
    get: function get3() {
      return getFlag(this.flags_, Reaction2.isDisposedMask_);
    },
    set: function set4(newValue) {
      this.flags_ = setFlag(this.flags_, Reaction2.isDisposedMask_, newValue);
    }
  }, {
    key: "isScheduled",
    get: function get3() {
      return getFlag(this.flags_, Reaction2.isScheduledMask_);
    },
    set: function set4(newValue) {
      this.flags_ = setFlag(this.flags_, Reaction2.isScheduledMask_, newValue);
    }
  }, {
    key: "isTrackPending",
    get: function get3() {
      return getFlag(this.flags_, Reaction2.isTrackPendingMask_);
    },
    set: function set4(newValue) {
      this.flags_ = setFlag(this.flags_, Reaction2.isTrackPendingMask_, newValue);
    }
  }, {
    key: "isRunning",
    get: function get3() {
      return getFlag(this.flags_, Reaction2.isRunningMask_);
    },
    set: function set4(newValue) {
      this.flags_ = setFlag(this.flags_, Reaction2.isRunningMask_, newValue);
    }
  }, {
    key: "diffValue",
    get: function get3() {
      return getFlag(this.flags_, Reaction2.diffValueMask_) ? 1 : 0;
    },
    set: function set4(newValue) {
      this.flags_ = setFlag(this.flags_, Reaction2.diffValueMask_, newValue === 1 ? true : false);
    }
  }]);
}();
Reaction.isDisposedMask_ = 1;
Reaction.isScheduledMask_ = 2;
Reaction.isTrackPendingMask_ = 4;
Reaction.isRunningMask_ = 8;
Reaction.diffValueMask_ = 16;
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function reactionScheduler2(f4) {
  return f4();
};
function runReactions() {
  if (globalState.inBatch > 0 || globalState.isRunningReactions) {
    return;
  }
  reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
  globalState.isRunningReactions = true;
  var allReactions = globalState.pendingReactions;
  var iterations = 0;
  while (allReactions.length > 0) {
    if (++iterations === MAX_REACTION_ITERATIONS) {
      console.error(false ? "Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]) : "[mobx] cycle in reaction: " + allReactions[0]);
      allReactions.splice(0);
    }
    var remainingReactions = allReactions.splice(0);
    for (var i6 = 0, l7 = remainingReactions.length; i6 < l7; i6++) {
      remainingReactions[i6].runReaction_();
    }
  }
  globalState.isRunningReactions = false;
}
var isReaction = /* @__PURE__ */ createInstanceofPredicate("Reaction", Reaction);
function isSpyEnabled() {
  return false;
}
function spy(listener) {
  if (true) {
    console.warn("[mobx.spy] Is a no-op in production builds");
    return function() {
    };
  } else {
    globalState.spyListeners.push(listener);
    return once(function() {
      globalState.spyListeners = globalState.spyListeners.filter(function(l7) {
        return l7 !== listener;
      });
    });
  }
}
var ACTION = "action";
var ACTION_BOUND = "action.bound";
var AUTOACTION = "autoAction";
var AUTOACTION_BOUND = "autoAction.bound";
var DEFAULT_ACTION_NAME = "<unnamed action>";
var actionAnnotation = /* @__PURE__ */ createActionAnnotation(ACTION);
var actionBoundAnnotation = /* @__PURE__ */ createActionAnnotation(ACTION_BOUND, {
  bound: true
});
var autoActionAnnotation = /* @__PURE__ */ createActionAnnotation(AUTOACTION, {
  autoAction: true
});
var autoActionBoundAnnotation = /* @__PURE__ */ createActionAnnotation(AUTOACTION_BOUND, {
  autoAction: true,
  bound: true
});
function createActionFactory(autoAction2) {
  var res = function action2(arg1, arg2) {
    if (isFunction(arg1)) {
      return createAction(arg1.name || DEFAULT_ACTION_NAME, arg1, autoAction2);
    }
    if (isFunction(arg2)) {
      return createAction(arg1, arg2, autoAction2);
    }
    if (is20223Decorator(arg2)) {
      return (autoAction2 ? autoActionAnnotation : actionAnnotation).decorate_20223_(arg1, arg2);
    }
    if (isStringish(arg2)) {
      return storeAnnotation(arg1, arg2, autoAction2 ? autoActionAnnotation : actionAnnotation);
    }
    if (isStringish(arg1)) {
      return createDecoratorAnnotation(createActionAnnotation(autoAction2 ? AUTOACTION : ACTION, {
        name: arg1,
        autoAction: autoAction2
      }));
    }
    if (false) {
      die("Invalid arguments for `action`");
    }
  };
  return res;
}
var action = /* @__PURE__ */ createActionFactory(false);
Object.assign(action, actionAnnotation);
var autoAction = /* @__PURE__ */ createActionFactory(true);
Object.assign(autoAction, autoActionAnnotation);
action.bound = /* @__PURE__ */ createDecoratorAnnotation(actionBoundAnnotation);
autoAction.bound = /* @__PURE__ */ createDecoratorAnnotation(autoActionBoundAnnotation);
function isAction(thing) {
  return isFunction(thing) && thing.isMobxAction === true;
}
function autorun(view, opts) {
  var _opts$name, _opts, _opts2, _opts3;
  if (opts === void 0) {
    opts = EMPTY_OBJECT;
  }
  if (false) {
    if (!isFunction(view)) {
      die("Autorun expects a function as first argument");
    }
    if (isAction(view)) {
      die("Autorun does not accept actions since actions are untrackable");
    }
  }
  var name = (_opts$name = (_opts = opts) == null ? void 0 : _opts.name) != null ? _opts$name : false ? view.name || "Autorun@" + getNextId() : "Autorun";
  var runSync = !opts.scheduler && !opts.delay;
  var reaction2;
  if (runSync) {
    reaction2 = new Reaction(name, function() {
      this.track(reactionRunner);
    }, opts.onError, opts.requiresObservable);
  } else {
    var scheduler = createSchedulerFromOptions(opts);
    var isScheduled = false;
    reaction2 = new Reaction(name, function() {
      if (!isScheduled) {
        isScheduled = true;
        scheduler(function() {
          isScheduled = false;
          if (!reaction2.isDisposed) {
            reaction2.track(reactionRunner);
          }
        });
      }
    }, opts.onError, opts.requiresObservable);
  }
  function reactionRunner() {
    view(reaction2);
  }
  if (!((_opts2 = opts) != null && (_opts2 = _opts2.signal) != null && _opts2.aborted)) {
    reaction2.schedule_();
  }
  return reaction2.getDisposer_((_opts3 = opts) == null ? void 0 : _opts3.signal);
}
var run = function run2(f4) {
  return f4();
};
function createSchedulerFromOptions(opts) {
  return opts.scheduler ? opts.scheduler : opts.delay ? function(f4) {
    return setTimeout(f4, opts.delay);
  } : run;
}
var ON_BECOME_OBSERVED = "onBO";
var ON_BECOME_UNOBSERVED = "onBUO";
function onBecomeObserved(thing, arg2, arg3) {
  return interceptHook(ON_BECOME_OBSERVED, thing, arg2, arg3);
}
function onBecomeUnobserved(thing, arg2, arg3) {
  return interceptHook(ON_BECOME_UNOBSERVED, thing, arg2, arg3);
}
function interceptHook(hook, thing, arg2, arg3) {
  var atom = typeof arg3 === "function" ? getAtom(thing, arg2) : getAtom(thing);
  var cb = isFunction(arg3) ? arg3 : arg2;
  var listenersKey = hook + "L";
  if (atom[listenersKey]) {
    atom[listenersKey].add(cb);
  } else {
    atom[listenersKey] = /* @__PURE__ */ new Set([cb]);
  }
  return function() {
    var hookListeners = atom[listenersKey];
    if (hookListeners) {
      hookListeners["delete"](cb);
      if (hookListeners.size === 0) {
        delete atom[listenersKey];
      }
    }
  };
}
function extendObservable(target, properties, annotations, options) {
  if (false) {
    if (arguments.length > 4) {
      die("'extendObservable' expected 2-4 arguments");
    }
    if (typeof target !== "object") {
      die("'extendObservable' expects an object as first argument");
    }
    if (isObservableMap(target)) {
      die("'extendObservable' should not be used on maps, use map.merge instead");
    }
    if (!isPlainObject(properties)) {
      die("'extendObservable' only accepts plain objects as second argument");
    }
    if (isObservable(properties) || isObservable(annotations)) {
      die("Extending an object with another observable (object) is not supported");
    }
  }
  var descriptors = getOwnPropertyDescriptors(properties);
  initObservable(function() {
    var adm = asObservableObject(target, options)[$mobx];
    ownKeys(descriptors).forEach(function(key) {
      adm.extend_(
        key,
        descriptors[key],
        // must pass "undefined" for { key: undefined }
        !annotations ? true : key in annotations ? annotations[key] : true
      );
    });
  });
  return target;
}
var generatorId = 0;
function FlowCancellationError() {
  this.message = "FLOW_CANCELLED";
}
FlowCancellationError.prototype = /* @__PURE__ */ Object.create(Error.prototype);
var flowAnnotation = /* @__PURE__ */ createFlowAnnotation("flow");
var flowBoundAnnotation = /* @__PURE__ */ createFlowAnnotation("flow.bound", {
  bound: true
});
var flow = /* @__PURE__ */ Object.assign(function flow2(arg1, arg2) {
  if (is20223Decorator(arg2)) {
    return flowAnnotation.decorate_20223_(arg1, arg2);
  }
  if (isStringish(arg2)) {
    return storeAnnotation(arg1, arg2, flowAnnotation);
  }
  if (false) {
    die("Flow expects single argument with generator function");
  }
  var generator = arg1;
  var name = generator.name || "<unnamed flow>";
  var res = function res2() {
    var ctx = this;
    var args = arguments;
    var runId = ++generatorId;
    var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
    var rejector;
    var pendingPromise = void 0;
    var promise = new Promise(function(resolve, reject) {
      var stepId = 0;
      rejector = reject;
      function onFulfilled(res3) {
        pendingPromise = void 0;
        var ret;
        try {
          ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res3);
        } catch (e9) {
          return reject(e9);
        }
        next(ret);
      }
      function onRejected(err) {
        pendingPromise = void 0;
        var ret;
        try {
          ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen["throw"]).call(gen, err);
        } catch (e9) {
          return reject(e9);
        }
        next(ret);
      }
      function next(ret) {
        if (isFunction(ret == null ? void 0 : ret.then)) {
          ret.then(next, reject);
          return;
        }
        if (ret.done) {
          return resolve(ret.value);
        }
        pendingPromise = Promise.resolve(ret.value);
        return pendingPromise.then(onFulfilled, onRejected);
      }
      onFulfilled(void 0);
    });
    promise.cancel = action(name + " - runid: " + runId + " - cancel", function() {
      try {
        if (pendingPromise) {
          cancelPromise(pendingPromise);
        }
        var _res = gen["return"](void 0);
        var yieldedPromise = Promise.resolve(_res.value);
        yieldedPromise.then(noop, noop);
        cancelPromise(yieldedPromise);
        rejector(new FlowCancellationError());
      } catch (e9) {
        rejector(e9);
      }
    });
    return promise;
  };
  res.isMobXFlow = true;
  return res;
}, flowAnnotation);
flow.bound = /* @__PURE__ */ createDecoratorAnnotation(flowBoundAnnotation);
function cancelPromise(promise) {
  if (isFunction(promise.cancel)) {
    promise.cancel();
  }
}
function isFlow(fn) {
  return (fn == null ? void 0 : fn.isMobXFlow) === true;
}
function _isObservable(value, property) {
  if (!value) {
    return false;
  }
  if (property !== void 0) {
    if (false) {
      return die("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
    }
    if (isObservableObject(value)) {
      return value[$mobx].values_.has(property);
    }
    return false;
  }
  return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
}
function isObservable(value) {
  if (false) {
    die("isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
  }
  return _isObservable(value);
}
function trace() {
  if (true) {
    return;
  }
  var enterBreakPoint = false;
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (typeof args[args.length - 1] === "boolean") {
    enterBreakPoint = args.pop();
  }
  var derivation = getAtomFromArgs(args);
  if (!derivation) {
    return die("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
  }
  if (derivation.isTracing_ === TraceMode.NONE) {
    console.log("[mobx.trace] '" + derivation.name_ + "' tracing enabled");
  }
  derivation.isTracing_ = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
}
function getAtomFromArgs(args) {
  switch (args.length) {
    case 0:
      return globalState.trackingDerivation;
    case 1:
      return getAtom(args[0]);
    case 2:
      return getAtom(args[0], args[1]);
  }
}
function transaction(action2, thisArg) {
  if (thisArg === void 0) {
    thisArg = void 0;
  }
  startBatch();
  try {
    return action2.apply(thisArg);
  } finally {
    endBatch();
  }
}
function getAdm(target) {
  return target[$mobx];
}
var objectProxyTraps = {
  has: function has(target, name) {
    if (false) {
      warnAboutProxyRequirement("detect new properties using the 'in' operator. Use 'has' from 'mobx' instead.");
    }
    return getAdm(target).has_(name);
  },
  get: function get(target, name) {
    return getAdm(target).get_(name);
  },
  set: function set2(target, name, value) {
    var _getAdm$set_;
    if (!isStringish(name)) {
      return false;
    }
    if (false) {
      warnAboutProxyRequirement("add a new observable property through direct assignment. Use 'set' from 'mobx' instead.");
    }
    return (_getAdm$set_ = getAdm(target).set_(name, value, true)) != null ? _getAdm$set_ : true;
  },
  deleteProperty: function deleteProperty(target, name) {
    var _getAdm$delete_;
    if (false) {
      warnAboutProxyRequirement("delete properties from an observable object. Use 'remove' from 'mobx' instead.");
    }
    if (!isStringish(name)) {
      return false;
    }
    return (_getAdm$delete_ = getAdm(target).delete_(name, true)) != null ? _getAdm$delete_ : true;
  },
  defineProperty: function defineProperty2(target, name, descriptor) {
    var _getAdm$definePropert;
    if (false) {
      warnAboutProxyRequirement("define property on an observable object. Use 'defineProperty' from 'mobx' instead.");
    }
    return (_getAdm$definePropert = getAdm(target).defineProperty_(name, descriptor)) != null ? _getAdm$definePropert : true;
  },
  ownKeys: function ownKeys2(target) {
    if (false) {
      warnAboutProxyRequirement("iterate keys to detect added / removed properties. Use 'keys' from 'mobx' instead.");
    }
    return getAdm(target).ownKeys_();
  },
  preventExtensions: function preventExtensions(target) {
    die(13);
  }
};
function asDynamicObservableObject(target, options) {
  var _target$$mobx, _target$$mobx$proxy_;
  assertProxies();
  target = asObservableObject(target, options);
  return (_target$$mobx$proxy_ = (_target$$mobx = target[$mobx]).proxy_) != null ? _target$$mobx$proxy_ : _target$$mobx.proxy_ = new Proxy(target, objectProxyTraps);
}
function hasInterceptors(interceptable) {
  return interceptable.interceptors_ !== void 0 && interceptable.interceptors_.length > 0;
}
function registerInterceptor(interceptable, handler) {
  var interceptors = interceptable.interceptors_ || (interceptable.interceptors_ = []);
  interceptors.push(handler);
  return once(function() {
    var idx = interceptors.indexOf(handler);
    if (idx !== -1) {
      interceptors.splice(idx, 1);
    }
  });
}
function interceptChange(interceptable, change) {
  var prevU = untrackedStart();
  try {
    var interceptors = [].concat(interceptable.interceptors_ || []);
    for (var i6 = 0, l7 = interceptors.length; i6 < l7; i6++) {
      change = interceptors[i6](change);
      if (change && !change.type) {
        die(14);
      }
      if (!change) {
        break;
      }
    }
    return change;
  } finally {
    untrackedEnd(prevU);
  }
}
function hasListeners(listenable) {
  return listenable.changeListeners_ !== void 0 && listenable.changeListeners_.length > 0;
}
function registerListener(listenable, handler) {
  var listeners = listenable.changeListeners_ || (listenable.changeListeners_ = []);
  listeners.push(handler);
  return once(function() {
    var idx = listeners.indexOf(handler);
    if (idx !== -1) {
      listeners.splice(idx, 1);
    }
  });
}
function notifyListeners(listenable, change) {
  var prevU = untrackedStart();
  var listeners = listenable.changeListeners_;
  if (!listeners) {
    return;
  }
  listeners = listeners.slice();
  for (var i6 = 0, l7 = listeners.length; i6 < l7; i6++) {
    listeners[i6](change);
  }
  untrackedEnd(prevU);
}
var keysSymbol = /* @__PURE__ */ Symbol("mobx-keys");
function makeAutoObservable(target, overrides, options) {
  if (false) {
    if (!isPlainObject(target) && !isPlainObject(Object.getPrototypeOf(target))) {
      die("'makeAutoObservable' can only be used for classes that don't have a superclass");
    }
    if (isObservableObject(target)) {
      die("makeAutoObservable can only be used on objects not already made observable");
    }
  }
  if (isPlainObject(target)) {
    return extendObservable(target, target, overrides, options);
  }
  initObservable(function() {
    var adm = asObservableObject(target, options)[$mobx];
    if (!target[keysSymbol]) {
      var proto = Object.getPrototypeOf(target);
      var keys = new Set([].concat(ownKeys(target), ownKeys(proto)));
      keys["delete"]("constructor");
      keys["delete"]($mobx);
      addHiddenProp(proto, keysSymbol, keys);
    }
    target[keysSymbol].forEach(function(key) {
      return adm.make_(
        key,
        // must pass "undefined" for { key: undefined }
        !overrides ? true : key in overrides ? overrides[key] : true
      );
    });
  });
  return target;
}
var SPLICE = "splice";
var UPDATE = "update";
var MAX_SPLICE_SIZE = 1e4;
var arrayTraps = {
  get: function get2(target, name) {
    var adm = target[$mobx];
    if (name === $mobx) {
      return adm;
    }
    if (name === "length") {
      return adm.getArrayLength_();
    }
    if (typeof name === "string" && !isNaN(name)) {
      return adm.get_(parseInt(name));
    }
    if (hasProp(arrayExtensions, name)) {
      return arrayExtensions[name];
    }
    return target[name];
  },
  set: function set3(target, name, value) {
    var adm = target[$mobx];
    if (name === "length") {
      adm.setArrayLength_(value);
    }
    if (typeof name === "symbol" || isNaN(name)) {
      target[name] = value;
    } else {
      adm.set_(parseInt(name), value);
    }
    return true;
  },
  preventExtensions: function preventExtensions2() {
    die(15);
  }
};
var ObservableArrayAdministration = /* @__PURE__ */ function() {
  function ObservableArrayAdministration2(name, enhancer, owned_, legacyMode_) {
    if (name === void 0) {
      name = false ? "ObservableArray@" + getNextId() : "ObservableArray";
    }
    this.owned_ = void 0;
    this.legacyMode_ = void 0;
    this.atom_ = void 0;
    this.values_ = [];
    this.interceptors_ = void 0;
    this.changeListeners_ = void 0;
    this.enhancer_ = void 0;
    this.dehancer = void 0;
    this.proxy_ = void 0;
    this.lastKnownLength_ = 0;
    this.owned_ = owned_;
    this.legacyMode_ = legacyMode_;
    this.atom_ = new Atom(name);
    this.enhancer_ = function(newV, oldV) {
      return enhancer(newV, oldV, false ? name + "[..]" : "ObservableArray[..]");
    };
  }
  var _proto = ObservableArrayAdministration2.prototype;
  _proto.dehanceValue_ = function dehanceValue_(value) {
    if (this.dehancer !== void 0) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.dehanceValues_ = function dehanceValues_(values) {
    if (this.dehancer !== void 0 && values.length > 0) {
      return values.map(this.dehancer);
    }
    return values;
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (fireImmediately === void 0) {
      fireImmediately = false;
    }
    if (fireImmediately) {
      listener({
        observableKind: "array",
        object: this.proxy_,
        debugObjectName: this.atom_.name_,
        type: "splice",
        index: 0,
        added: this.values_.slice(),
        addedCount: this.values_.length,
        removed: [],
        removedCount: 0
      });
    }
    return registerListener(this, listener);
  };
  _proto.getArrayLength_ = function getArrayLength_() {
    this.atom_.reportObserved();
    return this.values_.length;
  };
  _proto.setArrayLength_ = function setArrayLength_(newLength) {
    if (typeof newLength !== "number" || isNaN(newLength) || newLength < 0) {
      die("Out of range: " + newLength);
    }
    var currentLength = this.values_.length;
    if (newLength === currentLength) {
      return;
    } else if (newLength > currentLength) {
      var newItems = new Array(newLength - currentLength);
      for (var i6 = 0; i6 < newLength - currentLength; i6++) {
        newItems[i6] = void 0;
      }
      this.spliceWithArray_(currentLength, 0, newItems);
    } else {
      this.spliceWithArray_(newLength, currentLength - newLength);
    }
  };
  _proto.updateArrayLength_ = function updateArrayLength_(oldLength, delta) {
    if (oldLength !== this.lastKnownLength_) {
      die(16);
    }
    this.lastKnownLength_ += delta;
    if (this.legacyMode_ && delta > 0) {
      reserveArrayBuffer(oldLength + delta + 1);
    }
  };
  _proto.spliceWithArray_ = function spliceWithArray_(index, deleteCount, newItems) {
    var _this = this;
    checkIfStateModificationsAreAllowed(this.atom_);
    var length = this.values_.length;
    if (index === void 0) {
      index = 0;
    } else if (index > length) {
      index = length;
    } else if (index < 0) {
      index = Math.max(0, length + index);
    }
    if (arguments.length === 1) {
      deleteCount = length - index;
    } else if (deleteCount === void 0 || deleteCount === null) {
      deleteCount = 0;
    } else {
      deleteCount = Math.max(0, Math.min(deleteCount, length - index));
    }
    if (newItems === void 0) {
      newItems = EMPTY_ARRAY;
    }
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy_,
        type: SPLICE,
        index,
        removedCount: deleteCount,
        added: newItems
      });
      if (!change) {
        return EMPTY_ARRAY;
      }
      deleteCount = change.removedCount;
      newItems = change.added;
    }
    newItems = newItems.length === 0 ? newItems : newItems.map(function(v3) {
      return _this.enhancer_(v3, void 0);
    });
    if (this.legacyMode_ || false) {
      var lengthDelta = newItems.length - deleteCount;
      this.updateArrayLength_(length, lengthDelta);
    }
    var res = this.spliceItemsIntoValues_(index, deleteCount, newItems);
    if (deleteCount !== 0 || newItems.length !== 0) {
      this.notifyArraySplice_(index, newItems, res);
    }
    return this.dehanceValues_(res);
  };
  _proto.spliceItemsIntoValues_ = function spliceItemsIntoValues_(index, deleteCount, newItems) {
    if (newItems.length < MAX_SPLICE_SIZE) {
      var _this$values_;
      return (_this$values_ = this.values_).splice.apply(_this$values_, [index, deleteCount].concat(newItems));
    } else {
      var res = this.values_.slice(index, index + deleteCount);
      var oldItems = this.values_.slice(index + deleteCount);
      this.values_.length += newItems.length - deleteCount;
      for (var i6 = 0; i6 < newItems.length; i6++) {
        this.values_[index + i6] = newItems[i6];
      }
      for (var _i = 0; _i < oldItems.length; _i++) {
        this.values_[index + newItems.length + _i] = oldItems[_i];
      }
      return res;
    }
  };
  _proto.notifyArrayChildUpdate_ = function notifyArrayChildUpdate_(index, newValue, oldValue) {
    var notifySpy = !this.owned_ && isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      observableKind: "array",
      object: this.proxy_,
      type: UPDATE,
      debugObjectName: this.atom_.name_,
      index,
      newValue,
      oldValue
    } : null;
    if (false) {
      spyReportStart(change);
    }
    this.atom_.reportChanged();
    if (notify) {
      notifyListeners(this, change);
    }
    if (false) {
      spyReportEnd();
    }
  };
  _proto.notifyArraySplice_ = function notifyArraySplice_(index, added, removed) {
    var notifySpy = !this.owned_ && isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: SPLICE,
      index,
      removed,
      added,
      removedCount: removed.length,
      addedCount: added.length
    } : null;
    if (false) {
      spyReportStart(change);
    }
    this.atom_.reportChanged();
    if (notify) {
      notifyListeners(this, change);
    }
    if (false) {
      spyReportEnd();
    }
  };
  _proto.get_ = function get_(index) {
    if (this.legacyMode_ && index >= this.values_.length) {
      console.warn(false ? "[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + this.values_.length + "). Please check length first. Out of bound indices will not be tracked by MobX" : "[mobx] Out of bounds read: " + index);
      return void 0;
    }
    this.atom_.reportObserved();
    return this.dehanceValue_(this.values_[index]);
  };
  _proto.set_ = function set_(index, newValue) {
    var values = this.values_;
    if (this.legacyMode_ && index > values.length) {
      die(17, index, values.length);
    }
    if (index < values.length) {
      checkIfStateModificationsAreAllowed(this.atom_);
      var oldValue = values[index];
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: UPDATE,
          object: this.proxy_,
          // since "this" is the real array we need to pass its proxy
          index,
          newValue
        });
        if (!change) {
          return;
        }
        newValue = change.newValue;
      }
      newValue = this.enhancer_(newValue, oldValue);
      var changed = newValue !== oldValue;
      if (changed) {
        values[index] = newValue;
        this.notifyArrayChildUpdate_(index, newValue, oldValue);
      }
    } else {
      var newItems = new Array(index + 1 - values.length);
      for (var i6 = 0; i6 < newItems.length - 1; i6++) {
        newItems[i6] = void 0;
      }
      newItems[newItems.length - 1] = newValue;
      this.spliceWithArray_(values.length, 0, newItems);
    }
  };
  return ObservableArrayAdministration2;
}();
function createObservableArray(initialValues, enhancer, name, owned) {
  if (name === void 0) {
    name = false ? "ObservableArray@" + getNextId() : "ObservableArray";
  }
  if (owned === void 0) {
    owned = false;
  }
  assertProxies();
  return initObservable(function() {
    var adm = new ObservableArrayAdministration(name, enhancer, owned, false);
    addHiddenFinalProp(adm.values_, $mobx, adm);
    var proxy = new Proxy(adm.values_, arrayTraps);
    adm.proxy_ = proxy;
    if (initialValues && initialValues.length) {
      adm.spliceWithArray_(0, 0, initialValues);
    }
    return proxy;
  });
}
var arrayExtensions = {
  clear: function clear() {
    return this.splice(0);
  },
  replace: function replace(newItems) {
    var adm = this[$mobx];
    return adm.spliceWithArray_(0, adm.values_.length, newItems);
  },
  // Used by JSON.stringify
  toJSON: function toJSON() {
    return this.slice();
  },
  /*
   * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
   * since these functions alter the inner structure of the array, the have side effects.
   * Because the have side effects, they should not be used in computed function,
   * and for that reason the do not call dependencyState.notifyObserved
   */
  splice: function splice(index, deleteCount) {
    for (var _len = arguments.length, newItems = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      newItems[_key - 2] = arguments[_key];
    }
    var adm = this[$mobx];
    switch (arguments.length) {
      case 0:
        return [];
      case 1:
        return adm.spliceWithArray_(index);
      case 2:
        return adm.spliceWithArray_(index, deleteCount);
    }
    return adm.spliceWithArray_(index, deleteCount, newItems);
  },
  spliceWithArray: function spliceWithArray(index, deleteCount, newItems) {
    return this[$mobx].spliceWithArray_(index, deleteCount, newItems);
  },
  push: function push() {
    var adm = this[$mobx];
    for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      items[_key2] = arguments[_key2];
    }
    adm.spliceWithArray_(adm.values_.length, 0, items);
    return adm.values_.length;
  },
  pop: function pop() {
    return this.splice(Math.max(this[$mobx].values_.length - 1, 0), 1)[0];
  },
  shift: function shift() {
    return this.splice(0, 1)[0];
  },
  unshift: function unshift() {
    var adm = this[$mobx];
    for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      items[_key3] = arguments[_key3];
    }
    adm.spliceWithArray_(0, 0, items);
    return adm.values_.length;
  },
  reverse: function reverse() {
    if (globalState.trackingDerivation) {
      die(37, "reverse");
    }
    this.replace(this.slice().reverse());
    return this;
  },
  sort: function sort() {
    if (globalState.trackingDerivation) {
      die(37, "sort");
    }
    var copy = this.slice();
    copy.sort.apply(copy, arguments);
    this.replace(copy);
    return this;
  },
  remove: function remove(value) {
    var adm = this[$mobx];
    var idx = adm.dehanceValues_(adm.values_).indexOf(value);
    if (idx > -1) {
      this.splice(idx, 1);
      return true;
    }
    return false;
  }
};
addArrayExtension("at", simpleFunc);
addArrayExtension("concat", simpleFunc);
addArrayExtension("flat", simpleFunc);
addArrayExtension("includes", simpleFunc);
addArrayExtension("indexOf", simpleFunc);
addArrayExtension("join", simpleFunc);
addArrayExtension("lastIndexOf", simpleFunc);
addArrayExtension("slice", simpleFunc);
addArrayExtension("toString", simpleFunc);
addArrayExtension("toLocaleString", simpleFunc);
addArrayExtension("toSorted", simpleFunc);
addArrayExtension("toSpliced", simpleFunc);
addArrayExtension("with", simpleFunc);
addArrayExtension("every", mapLikeFunc);
addArrayExtension("filter", mapLikeFunc);
addArrayExtension("find", mapLikeFunc);
addArrayExtension("findIndex", mapLikeFunc);
addArrayExtension("findLast", mapLikeFunc);
addArrayExtension("findLastIndex", mapLikeFunc);
addArrayExtension("flatMap", mapLikeFunc);
addArrayExtension("forEach", mapLikeFunc);
addArrayExtension("map", mapLikeFunc);
addArrayExtension("some", mapLikeFunc);
addArrayExtension("toReversed", mapLikeFunc);
addArrayExtension("reduce", reduceLikeFunc);
addArrayExtension("reduceRight", reduceLikeFunc);
function addArrayExtension(funcName, funcFactory) {
  if (typeof Array.prototype[funcName] === "function") {
    arrayExtensions[funcName] = funcFactory(funcName);
  }
}
function simpleFunc(funcName) {
  return function() {
    var adm = this[$mobx];
    adm.atom_.reportObserved();
    var dehancedValues = adm.dehanceValues_(adm.values_);
    return dehancedValues[funcName].apply(dehancedValues, arguments);
  };
}
function mapLikeFunc(funcName) {
  return function(callback, thisArg) {
    var _this2 = this;
    var adm = this[$mobx];
    adm.atom_.reportObserved();
    var dehancedValues = adm.dehanceValues_(adm.values_);
    return dehancedValues[funcName](function(element, index) {
      return callback.call(thisArg, element, index, _this2);
    });
  };
}
function reduceLikeFunc(funcName) {
  return function() {
    var _this3 = this;
    var adm = this[$mobx];
    adm.atom_.reportObserved();
    var dehancedValues = adm.dehanceValues_(adm.values_);
    var callback = arguments[0];
    arguments[0] = function(accumulator, currentValue, index) {
      return callback(accumulator, currentValue, index, _this3);
    };
    return dehancedValues[funcName].apply(dehancedValues, arguments);
  };
}
var isObservableArrayAdministration = /* @__PURE__ */ createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray(thing) {
  return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
}
var ObservableMapMarker = {};
var ADD = "add";
var DELETE = "delete";
var ObservableMap = /* @__PURE__ */ function() {
  function ObservableMap2(initialData, enhancer_, name_) {
    var _this = this;
    if (enhancer_ === void 0) {
      enhancer_ = deepEnhancer;
    }
    if (name_ === void 0) {
      name_ = false ? "ObservableMap@" + getNextId() : "ObservableMap";
    }
    this.enhancer_ = void 0;
    this.name_ = void 0;
    this[$mobx] = ObservableMapMarker;
    this.data_ = void 0;
    this.hasMap_ = void 0;
    this.keysAtom_ = void 0;
    this.interceptors_ = void 0;
    this.changeListeners_ = void 0;
    this.dehancer = void 0;
    this.enhancer_ = enhancer_;
    this.name_ = name_;
    if (!isFunction(Map)) {
      die(18);
    }
    initObservable(function() {
      _this.keysAtom_ = createAtom(false ? _this.name_ + ".keys()" : "ObservableMap.keys()");
      _this.data_ = /* @__PURE__ */ new Map();
      _this.hasMap_ = /* @__PURE__ */ new Map();
      if (initialData) {
        _this.merge(initialData);
      }
    });
  }
  var _proto = ObservableMap2.prototype;
  _proto.has_ = function has_(key) {
    return this.data_.has(key);
  };
  _proto.has = function has2(key) {
    var _this2 = this;
    if (!globalState.trackingDerivation) {
      return this.has_(key);
    }
    var entry = this.hasMap_.get(key);
    if (!entry) {
      var newEntry = entry = new ObservableValue(this.has_(key), referenceEnhancer, false ? this.name_ + "." + stringifyKey(key) + "?" : "ObservableMap.key?", false);
      this.hasMap_.set(key, newEntry);
      onBecomeUnobserved(newEntry, function() {
        return _this2.hasMap_["delete"](key);
      });
    }
    return entry.get();
  };
  _proto.set = function set4(key, value) {
    var hasKey = this.has_(key);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: hasKey ? UPDATE : ADD,
        object: this,
        newValue: value,
        name: key
      });
      if (!change) {
        return this;
      }
      value = change.newValue;
    }
    if (hasKey) {
      this.updateValue_(key, value);
    } else {
      this.addValue_(key, value);
    }
    return this;
  };
  _proto["delete"] = function _delete(key) {
    var _this3 = this;
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: DELETE,
        object: this,
        name: key
      });
      if (!change) {
        return false;
      }
    }
    if (this.has_(key)) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var _change = notify || notifySpy ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: DELETE,
        object: this,
        oldValue: this.data_.get(key).value_,
        name: key
      } : null;
      if (false) {
        spyReportStart(_change);
      }
      transaction(function() {
        var _this3$hasMap_$get;
        _this3.keysAtom_.reportChanged();
        (_this3$hasMap_$get = _this3.hasMap_.get(key)) == null || _this3$hasMap_$get.setNewValue_(false);
        var observable2 = _this3.data_.get(key);
        observable2.setNewValue_(void 0);
        _this3.data_["delete"](key);
      });
      if (notify) {
        notifyListeners(this, _change);
      }
      if (false) {
        spyReportEnd();
      }
      return true;
    }
    return false;
  };
  _proto.updateValue_ = function updateValue_(key, newValue) {
    var observable2 = this.data_.get(key);
    newValue = observable2.prepareNewValue_(newValue);
    if (newValue !== globalState.UNCHANGED) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: UPDATE,
        object: this,
        oldValue: observable2.value_,
        name: key,
        newValue
      } : null;
      if (false) {
        spyReportStart(change);
      }
      observable2.setNewValue_(newValue);
      if (notify) {
        notifyListeners(this, change);
      }
      if (false) {
        spyReportEnd();
      }
    }
  };
  _proto.addValue_ = function addValue_(key, newValue) {
    var _this4 = this;
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    transaction(function() {
      var _this4$hasMap_$get;
      var observable2 = new ObservableValue(newValue, _this4.enhancer_, false ? _this4.name_ + "." + stringifyKey(key) : "ObservableMap.key", false);
      _this4.data_.set(key, observable2);
      newValue = observable2.value_;
      (_this4$hasMap_$get = _this4.hasMap_.get(key)) == null || _this4$hasMap_$get.setNewValue_(true);
      _this4.keysAtom_.reportChanged();
    });
    var notifySpy = isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      observableKind: "map",
      debugObjectName: this.name_,
      type: ADD,
      object: this,
      name: key,
      newValue
    } : null;
    if (false) {
      spyReportStart(change);
    }
    if (notify) {
      notifyListeners(this, change);
    }
    if (false) {
      spyReportEnd();
    }
  };
  _proto.get = function get3(key) {
    if (this.has(key)) {
      return this.dehanceValue_(this.data_.get(key).get());
    }
    return this.dehanceValue_(void 0);
  };
  _proto.dehanceValue_ = function dehanceValue_(value) {
    if (this.dehancer !== void 0) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.keys = function keys() {
    this.keysAtom_.reportObserved();
    return this.data_.keys();
  };
  _proto.values = function values() {
    var self2 = this;
    var keys = this.keys();
    return makeIterable({
      next: function next() {
        var _keys$next = keys.next(), done = _keys$next.done, value = _keys$next.value;
        return {
          done,
          value: done ? void 0 : self2.get(value)
        };
      }
    });
  };
  _proto.entries = function entries() {
    var self2 = this;
    var keys = this.keys();
    return makeIterable({
      next: function next() {
        var _keys$next2 = keys.next(), done = _keys$next2.done, value = _keys$next2.value;
        return {
          done,
          value: done ? void 0 : [value, self2.get(value)]
        };
      }
    });
  };
  _proto[Symbol.iterator] = function() {
    return this.entries();
  };
  _proto.forEach = function forEach(callback, thisArg) {
    for (var _iterator = _createForOfIteratorHelperLoose(this), _step; !(_step = _iterator()).done; ) {
      var _step$value = _step.value, key = _step$value[0], value = _step$value[1];
      callback.call(thisArg, value, key, this);
    }
  };
  _proto.merge = function merge(other) {
    var _this5 = this;
    if (isObservableMap(other)) {
      other = new Map(other);
    }
    transaction(function() {
      if (isPlainObject(other)) {
        getPlainObjectKeys(other).forEach(function(key) {
          return _this5.set(key, other[key]);
        });
      } else if (Array.isArray(other)) {
        other.forEach(function(_ref) {
          var key = _ref[0], value = _ref[1];
          return _this5.set(key, value);
        });
      } else if (isES6Map(other)) {
        if (!isPlainES6Map(other)) {
          die(19, other);
        }
        other.forEach(function(value, key) {
          return _this5.set(key, value);
        });
      } else if (other !== null && other !== void 0) {
        die(20, other);
      }
    });
    return this;
  };
  _proto.clear = function clear2() {
    var _this6 = this;
    transaction(function() {
      untracked(function() {
        for (var _iterator2 = _createForOfIteratorHelperLoose(_this6.keys()), _step2; !(_step2 = _iterator2()).done; ) {
          var key = _step2.value;
          _this6["delete"](key);
        }
      });
    });
  };
  _proto.replace = function replace2(values) {
    var _this7 = this;
    transaction(function() {
      var replacementMap = convertToMap(values);
      var orderedData = /* @__PURE__ */ new Map();
      var keysReportChangedCalled = false;
      for (var _iterator3 = _createForOfIteratorHelperLoose(_this7.data_.keys()), _step3; !(_step3 = _iterator3()).done; ) {
        var key = _step3.value;
        if (!replacementMap.has(key)) {
          var deleted = _this7["delete"](key);
          if (deleted) {
            keysReportChangedCalled = true;
          } else {
            var value = _this7.data_.get(key);
            orderedData.set(key, value);
          }
        }
      }
      for (var _iterator4 = _createForOfIteratorHelperLoose(replacementMap.entries()), _step4; !(_step4 = _iterator4()).done; ) {
        var _step4$value = _step4.value, _key = _step4$value[0], _value = _step4$value[1];
        var keyExisted = _this7.data_.has(_key);
        _this7.set(_key, _value);
        if (_this7.data_.has(_key)) {
          var _value2 = _this7.data_.get(_key);
          orderedData.set(_key, _value2);
          if (!keyExisted) {
            keysReportChangedCalled = true;
          }
        }
      }
      if (!keysReportChangedCalled) {
        if (_this7.data_.size !== orderedData.size) {
          _this7.keysAtom_.reportChanged();
        } else {
          var iter1 = _this7.data_.keys();
          var iter2 = orderedData.keys();
          var next1 = iter1.next();
          var next2 = iter2.next();
          while (!next1.done) {
            if (next1.value !== next2.value) {
              _this7.keysAtom_.reportChanged();
              break;
            }
            next1 = iter1.next();
            next2 = iter2.next();
          }
        }
      }
      _this7.data_ = orderedData;
    });
    return this;
  };
  _proto.toString = function toString2() {
    return "[object ObservableMap]";
  };
  _proto.toJSON = function toJSON2() {
    return Array.from(this);
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (false) {
      die("`observe` doesn't support fireImmediately=true in combination with maps.");
    }
    return registerListener(this, listener);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  return _createClass(ObservableMap2, [{
    key: "size",
    get: function get3() {
      this.keysAtom_.reportObserved();
      return this.data_.size;
    }
  }, {
    key: Symbol.toStringTag,
    get: function get3() {
      return "Map";
    }
  }]);
}();
var isObservableMap = /* @__PURE__ */ createInstanceofPredicate("ObservableMap", ObservableMap);
function convertToMap(dataStructure) {
  if (isES6Map(dataStructure) || isObservableMap(dataStructure)) {
    return dataStructure;
  } else if (Array.isArray(dataStructure)) {
    return new Map(dataStructure);
  } else if (isPlainObject(dataStructure)) {
    var map2 = /* @__PURE__ */ new Map();
    for (var key in dataStructure) {
      map2.set(key, dataStructure[key]);
    }
    return map2;
  } else {
    return die(21, dataStructure);
  }
}
var ObservableSetMarker = {};
var ObservableSet = /* @__PURE__ */ function() {
  function ObservableSet2(initialData, enhancer, name_) {
    var _this = this;
    if (enhancer === void 0) {
      enhancer = deepEnhancer;
    }
    if (name_ === void 0) {
      name_ = false ? "ObservableSet@" + getNextId() : "ObservableSet";
    }
    this.name_ = void 0;
    this[$mobx] = ObservableSetMarker;
    this.data_ = /* @__PURE__ */ new Set();
    this.atom_ = void 0;
    this.changeListeners_ = void 0;
    this.interceptors_ = void 0;
    this.dehancer = void 0;
    this.enhancer_ = void 0;
    this.name_ = name_;
    if (!isFunction(Set)) {
      die(22);
    }
    this.enhancer_ = function(newV, oldV) {
      return enhancer(newV, oldV, name_);
    };
    initObservable(function() {
      _this.atom_ = createAtom(_this.name_);
      if (initialData) {
        _this.replace(initialData);
      }
    });
  }
  var _proto = ObservableSet2.prototype;
  _proto.dehanceValue_ = function dehanceValue_(value) {
    if (this.dehancer !== void 0) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.clear = function clear2() {
    var _this2 = this;
    transaction(function() {
      untracked(function() {
        for (var _iterator = _createForOfIteratorHelperLoose(_this2.data_.values()), _step; !(_step = _iterator()).done; ) {
          var value = _step.value;
          _this2["delete"](value);
        }
      });
    });
  };
  _proto.forEach = function forEach(callbackFn, thisArg) {
    for (var _iterator2 = _createForOfIteratorHelperLoose(this), _step2; !(_step2 = _iterator2()).done; ) {
      var value = _step2.value;
      callbackFn.call(thisArg, value, value, this);
    }
  };
  _proto.add = function add(value) {
    var _this3 = this;
    checkIfStateModificationsAreAllowed(this.atom_);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: ADD,
        object: this,
        newValue: value
      });
      if (!change) {
        return this;
      }
    }
    if (!this.has(value)) {
      transaction(function() {
        _this3.data_.add(_this3.enhancer_(value, void 0));
        _this3.atom_.reportChanged();
      });
      var notifySpy = false;
      var notify = hasListeners(this);
      var _change = notify || notifySpy ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: ADD,
        object: this,
        newValue: value
      } : null;
      if (notifySpy && false) {
        spyReportStart(_change);
      }
      if (notify) {
        notifyListeners(this, _change);
      }
      if (notifySpy && false) {
        spyReportEnd();
      }
    }
    return this;
  };
  _proto["delete"] = function _delete(value) {
    var _this4 = this;
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: DELETE,
        object: this,
        oldValue: value
      });
      if (!change) {
        return false;
      }
    }
    if (this.has(value)) {
      var notifySpy = false;
      var notify = hasListeners(this);
      var _change2 = notify || notifySpy ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: DELETE,
        object: this,
        oldValue: value
      } : null;
      if (notifySpy && false) {
        spyReportStart(_change2);
      }
      transaction(function() {
        _this4.atom_.reportChanged();
        _this4.data_["delete"](value);
      });
      if (notify) {
        notifyListeners(this, _change2);
      }
      if (notifySpy && false) {
        spyReportEnd();
      }
      return true;
    }
    return false;
  };
  _proto.has = function has2(value) {
    this.atom_.reportObserved();
    return this.data_.has(this.dehanceValue_(value));
  };
  _proto.entries = function entries() {
    var nextIndex = 0;
    var keys = Array.from(this.keys());
    var values = Array.from(this.values());
    return makeIterable({
      next: function next() {
        var index = nextIndex;
        nextIndex += 1;
        return index < values.length ? {
          value: [keys[index], values[index]],
          done: false
        } : {
          done: true
        };
      }
    });
  };
  _proto.keys = function keys() {
    return this.values();
  };
  _proto.values = function values() {
    this.atom_.reportObserved();
    var self2 = this;
    var nextIndex = 0;
    var observableValues = Array.from(this.data_.values());
    return makeIterable({
      next: function next() {
        return nextIndex < observableValues.length ? {
          value: self2.dehanceValue_(observableValues[nextIndex++]),
          done: false
        } : {
          done: true
        };
      }
    });
  };
  _proto.intersection = function intersection(otherSet) {
    if (isES6Set(otherSet)) {
      return otherSet.intersection(this);
    } else {
      var dehancedSet = new Set(this);
      return dehancedSet.intersection(otherSet);
    }
  };
  _proto.union = function union(otherSet) {
    if (isES6Set(otherSet)) {
      return otherSet.union(this);
    } else {
      var dehancedSet = new Set(this);
      return dehancedSet.union(otherSet);
    }
  };
  _proto.difference = function difference(otherSet) {
    return new Set(this).difference(otherSet);
  };
  _proto.symmetricDifference = function symmetricDifference(otherSet) {
    if (isES6Set(otherSet)) {
      return otherSet.symmetricDifference(this);
    } else {
      var dehancedSet = new Set(this);
      return dehancedSet.symmetricDifference(otherSet);
    }
  };
  _proto.isSubsetOf = function isSubsetOf(otherSet) {
    return new Set(this).isSubsetOf(otherSet);
  };
  _proto.isSupersetOf = function isSupersetOf(otherSet) {
    return new Set(this).isSupersetOf(otherSet);
  };
  _proto.isDisjointFrom = function isDisjointFrom(otherSet) {
    if (isES6Set(otherSet)) {
      return otherSet.isDisjointFrom(this);
    } else {
      var dehancedSet = new Set(this);
      return dehancedSet.isDisjointFrom(otherSet);
    }
  };
  _proto.replace = function replace2(other) {
    var _this5 = this;
    if (isObservableSet(other)) {
      other = new Set(other);
    }
    transaction(function() {
      if (Array.isArray(other)) {
        _this5.clear();
        other.forEach(function(value) {
          return _this5.add(value);
        });
      } else if (isES6Set(other)) {
        _this5.clear();
        other.forEach(function(value) {
          return _this5.add(value);
        });
      } else if (other !== null && other !== void 0) {
        die("Cannot initialize set from " + other);
      }
    });
    return this;
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (false) {
      die("`observe` doesn't support fireImmediately=true in combination with sets.");
    }
    return registerListener(this, listener);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.toJSON = function toJSON2() {
    return Array.from(this);
  };
  _proto.toString = function toString2() {
    return "[object ObservableSet]";
  };
  _proto[Symbol.iterator] = function() {
    return this.values();
  };
  return _createClass(ObservableSet2, [{
    key: "size",
    get: function get3() {
      this.atom_.reportObserved();
      return this.data_.size;
    }
  }, {
    key: Symbol.toStringTag,
    get: function get3() {
      return "Set";
    }
  }]);
}();
var isObservableSet = /* @__PURE__ */ createInstanceofPredicate("ObservableSet", ObservableSet);
var descriptorCache = /* @__PURE__ */ Object.create(null);
var REMOVE = "remove";
var ObservableObjectAdministration = /* @__PURE__ */ function() {
  function ObservableObjectAdministration2(target_, values_, name_, defaultAnnotation_) {
    if (values_ === void 0) {
      values_ = /* @__PURE__ */ new Map();
    }
    if (defaultAnnotation_ === void 0) {
      defaultAnnotation_ = autoAnnotation;
    }
    this.target_ = void 0;
    this.values_ = void 0;
    this.name_ = void 0;
    this.defaultAnnotation_ = void 0;
    this.keysAtom_ = void 0;
    this.changeListeners_ = void 0;
    this.interceptors_ = void 0;
    this.proxy_ = void 0;
    this.isPlainObject_ = void 0;
    this.appliedAnnotations_ = void 0;
    this.pendingKeys_ = void 0;
    this.target_ = target_;
    this.values_ = values_;
    this.name_ = name_;
    this.defaultAnnotation_ = defaultAnnotation_;
    this.keysAtom_ = new Atom(false ? this.name_ + ".keys" : "ObservableObject.keys");
    this.isPlainObject_ = isPlainObject(this.target_);
    if (false) {
      die("defaultAnnotation must be valid annotation");
    }
    if (false) {
      this.appliedAnnotations_ = {};
    }
  }
  var _proto = ObservableObjectAdministration2.prototype;
  _proto.getObservablePropValue_ = function getObservablePropValue_(key) {
    return this.values_.get(key).get();
  };
  _proto.setObservablePropValue_ = function setObservablePropValue_(key, newValue) {
    var observable2 = this.values_.get(key);
    if (observable2 instanceof ComputedValue) {
      observable2.set(newValue);
      return true;
    }
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: UPDATE,
        object: this.proxy_ || this.target_,
        name: key,
        newValue
      });
      if (!change) {
        return null;
      }
      newValue = change.newValue;
    }
    newValue = observable2.prepareNewValue_(newValue);
    if (newValue !== globalState.UNCHANGED) {
      var notify = hasListeners(this);
      var notifySpy = false;
      var _change = notify || notifySpy ? {
        type: UPDATE,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        oldValue: observable2.value_,
        name: key,
        newValue
      } : null;
      if (false) {
        spyReportStart(_change);
      }
      observable2.setNewValue_(newValue);
      if (notify) {
        notifyListeners(this, _change);
      }
      if (false) {
        spyReportEnd();
      }
    }
    return true;
  };
  _proto.get_ = function get_(key) {
    if (globalState.trackingDerivation && !hasProp(this.target_, key)) {
      this.has_(key);
    }
    return this.target_[key];
  };
  _proto.set_ = function set_(key, value, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    if (hasProp(this.target_, key)) {
      if (this.values_.has(key)) {
        return this.setObservablePropValue_(key, value);
      } else if (proxyTrap) {
        return Reflect.set(this.target_, key, value);
      } else {
        this.target_[key] = value;
        return true;
      }
    } else {
      return this.extend_(key, {
        value,
        enumerable: true,
        writable: true,
        configurable: true
      }, this.defaultAnnotation_, proxyTrap);
    }
  };
  _proto.has_ = function has_(key) {
    if (!globalState.trackingDerivation) {
      return key in this.target_;
    }
    this.pendingKeys_ || (this.pendingKeys_ = /* @__PURE__ */ new Map());
    var entry = this.pendingKeys_.get(key);
    if (!entry) {
      entry = new ObservableValue(key in this.target_, referenceEnhancer, false ? this.name_ + "." + stringifyKey(key) + "?" : "ObservableObject.key?", false);
      this.pendingKeys_.set(key, entry);
    }
    return entry.get();
  };
  _proto.make_ = function make_(key, annotation) {
    if (annotation === true) {
      annotation = this.defaultAnnotation_;
    }
    if (annotation === false) {
      return;
    }
    assertAnnotable(this, annotation, key);
    if (!(key in this.target_)) {
      var _this$target_$storedA;
      if ((_this$target_$storedA = this.target_[storedAnnotationsSymbol]) != null && _this$target_$storedA[key]) {
        return;
      } else {
        die(1, annotation.annotationType_, this.name_ + "." + key.toString());
      }
    }
    var source = this.target_;
    while (source && source !== objectPrototype) {
      var descriptor = getDescriptor(source, key);
      if (descriptor) {
        var outcome = annotation.make_(this, key, descriptor, source);
        if (outcome === 0) {
          return;
        }
        if (outcome === 1) {
          break;
        }
      }
      source = Object.getPrototypeOf(source);
    }
    recordAnnotationApplied(this, annotation, key);
  };
  _proto.extend_ = function extend_(key, descriptor, annotation, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    if (annotation === true) {
      annotation = this.defaultAnnotation_;
    }
    if (annotation === false) {
      return this.defineProperty_(key, descriptor, proxyTrap);
    }
    assertAnnotable(this, annotation, key);
    var outcome = annotation.extend_(this, key, descriptor, proxyTrap);
    if (outcome) {
      recordAnnotationApplied(this, annotation, key);
    }
    return outcome;
  };
  _proto.defineProperty_ = function defineProperty_(key, descriptor, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    try {
      startBatch();
      var deleteOutcome = this.delete_(key);
      if (!deleteOutcome) {
        return deleteOutcome;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: ADD,
          newValue: descriptor.value
        });
        if (!change) {
          return null;
        }
        var newValue = change.newValue;
        if (descriptor.value !== newValue) {
          descriptor = _extends({}, descriptor, {
            value: newValue
          });
        }
      }
      if (proxyTrap) {
        if (!Reflect.defineProperty(this.target_, key, descriptor)) {
          return false;
        }
      } else {
        defineProperty(this.target_, key, descriptor);
      }
      this.notifyPropertyAddition_(key, descriptor.value);
    } finally {
      endBatch();
    }
    return true;
  };
  _proto.defineObservableProperty_ = function defineObservableProperty_(key, value, enhancer, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    try {
      startBatch();
      var deleteOutcome = this.delete_(key);
      if (!deleteOutcome) {
        return deleteOutcome;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: ADD,
          newValue: value
        });
        if (!change) {
          return null;
        }
        value = change.newValue;
      }
      var cachedDescriptor = getCachedObservablePropDescriptor(key);
      var descriptor = {
        configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
        enumerable: true,
        get: cachedDescriptor.get,
        set: cachedDescriptor.set
      };
      if (proxyTrap) {
        if (!Reflect.defineProperty(this.target_, key, descriptor)) {
          return false;
        }
      } else {
        defineProperty(this.target_, key, descriptor);
      }
      var observable2 = new ObservableValue(value, enhancer, false ? this.name_ + "." + key.toString() : "ObservableObject.key", false);
      this.values_.set(key, observable2);
      this.notifyPropertyAddition_(key, observable2.value_);
    } finally {
      endBatch();
    }
    return true;
  };
  _proto.defineComputedProperty_ = function defineComputedProperty_(key, options, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    try {
      startBatch();
      var deleteOutcome = this.delete_(key);
      if (!deleteOutcome) {
        return deleteOutcome;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: ADD,
          newValue: void 0
        });
        if (!change) {
          return null;
        }
      }
      options.name || (options.name = false ? this.name_ + "." + key.toString() : "ObservableObject.key");
      options.context = this.proxy_ || this.target_;
      var cachedDescriptor = getCachedObservablePropDescriptor(key);
      var descriptor = {
        configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
        enumerable: false,
        get: cachedDescriptor.get,
        set: cachedDescriptor.set
      };
      if (proxyTrap) {
        if (!Reflect.defineProperty(this.target_, key, descriptor)) {
          return false;
        }
      } else {
        defineProperty(this.target_, key, descriptor);
      }
      this.values_.set(key, new ComputedValue(options));
      this.notifyPropertyAddition_(key, void 0);
    } finally {
      endBatch();
    }
    return true;
  };
  _proto.delete_ = function delete_(key, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    if (!hasProp(this.target_, key)) {
      return true;
    }
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy_ || this.target_,
        name: key,
        type: REMOVE
      });
      if (!change) {
        return null;
      }
    }
    try {
      var _this$pendingKeys_;
      startBatch();
      var notify = hasListeners(this);
      var notifySpy = false;
      var observable2 = this.values_.get(key);
      var value = void 0;
      if (!observable2 && (notify || notifySpy)) {
        var _getDescriptor2;
        value = (_getDescriptor2 = getDescriptor(this.target_, key)) == null ? void 0 : _getDescriptor2.value;
      }
      if (proxyTrap) {
        if (!Reflect.deleteProperty(this.target_, key)) {
          return false;
        }
      } else {
        delete this.target_[key];
      }
      if (false) {
        delete this.appliedAnnotations_[key];
      }
      if (observable2) {
        this.values_["delete"](key);
        if (observable2 instanceof ObservableValue) {
          value = observable2.value_;
        }
        propagateChanged(observable2);
      }
      this.keysAtom_.reportChanged();
      (_this$pendingKeys_ = this.pendingKeys_) == null || (_this$pendingKeys_ = _this$pendingKeys_.get(key)) == null || _this$pendingKeys_.set(key in this.target_);
      if (notify || notifySpy) {
        var _change2 = {
          type: REMOVE,
          observableKind: "object",
          object: this.proxy_ || this.target_,
          debugObjectName: this.name_,
          oldValue: value,
          name: key
        };
        if (false) {
          spyReportStart(_change2);
        }
        if (notify) {
          notifyListeners(this, _change2);
        }
        if (false) {
          spyReportEnd();
        }
      }
    } finally {
      endBatch();
    }
    return true;
  };
  _proto.observe_ = function observe_(callback, fireImmediately) {
    if (false) {
      die("`observe` doesn't support the fire immediately property for observable objects.");
    }
    return registerListener(this, callback);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.notifyPropertyAddition_ = function notifyPropertyAddition_(key, value) {
    var _this$pendingKeys_2;
    var notify = hasListeners(this);
    var notifySpy = false;
    if (notify || notifySpy) {
      var change = notify || notifySpy ? {
        type: ADD,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        name: key,
        newValue: value
      } : null;
      if (false) {
        spyReportStart(change);
      }
      if (notify) {
        notifyListeners(this, change);
      }
      if (false) {
        spyReportEnd();
      }
    }
    (_this$pendingKeys_2 = this.pendingKeys_) == null || (_this$pendingKeys_2 = _this$pendingKeys_2.get(key)) == null || _this$pendingKeys_2.set(true);
    this.keysAtom_.reportChanged();
  };
  _proto.ownKeys_ = function ownKeys_() {
    this.keysAtom_.reportObserved();
    return ownKeys(this.target_);
  };
  _proto.keys_ = function keys_() {
    this.keysAtom_.reportObserved();
    return Object.keys(this.target_);
  };
  return ObservableObjectAdministration2;
}();
function asObservableObject(target, options) {
  var _options$name;
  if (false) {
    die("Options can't be provided for already observable objects.");
  }
  if (hasProp(target, $mobx)) {
    if (false) {
      die("Cannot convert '" + getDebugName(target) + "' into observable object:\nThe target is already observable of different type.\nExtending builtins is not supported.");
    }
    return target;
  }
  if (false) {
    die("Cannot make the designated object observable; it is not extensible");
  }
  var name = (_options$name = options == null ? void 0 : options.name) != null ? _options$name : false ? (isPlainObject(target) ? "ObservableObject" : target.constructor.name) + "@" + getNextId() : "ObservableObject";
  var adm = new ObservableObjectAdministration(target, /* @__PURE__ */ new Map(), String(name), getAnnotationFromOptions(options));
  addHiddenProp(target, $mobx, adm);
  return target;
}
var isObservableObjectAdministration = /* @__PURE__ */ createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
function getCachedObservablePropDescriptor(key) {
  return descriptorCache[key] || (descriptorCache[key] = {
    get: function get3() {
      return this[$mobx].getObservablePropValue_(key);
    },
    set: function set4(value) {
      return this[$mobx].setObservablePropValue_(key, value);
    }
  });
}
function isObservableObject(thing) {
  if (isObject(thing)) {
    return isObservableObjectAdministration(thing[$mobx]);
  }
  return false;
}
function recordAnnotationApplied(adm, annotation, key) {
  var _adm$target_$storedAn;
  if (false) {
    adm.appliedAnnotations_[key] = annotation;
  }
  (_adm$target_$storedAn = adm.target_[storedAnnotationsSymbol]) == null || delete _adm$target_$storedAn[key];
}
function assertAnnotable(adm, annotation, key) {
  if (false) {
    die("Cannot annotate '" + adm.name_ + "." + key.toString() + "': Invalid annotation.");
  }
  if (false) {
    var fieldName = adm.name_ + "." + key.toString();
    var currentAnnotationType = adm.appliedAnnotations_[key].annotationType_;
    var requestedAnnotationType = annotation.annotationType_;
    die("Cannot apply '" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already annotated with '" + currentAnnotationType + "'.") + "\nRe-annotating fields is not allowed.\nUse 'override' annotation for methods overridden by subclass.");
  }
}
var ENTRY_0 = /* @__PURE__ */ createArrayEntryDescriptor(0);
var safariPrototypeSetterInheritanceBug = /* @__PURE__ */ function() {
  var v3 = false;
  var p4 = {};
  Object.defineProperty(p4, "0", {
    set: function set4() {
      v3 = true;
    }
  });
  Object.create(p4)["0"] = 1;
  return v3 === false;
}();
var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
var StubArray = function StubArray2() {
};
function inherit(ctor, proto) {
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ctor.prototype, proto);
  } else if (ctor.prototype.__proto__ !== void 0) {
    ctor.prototype.__proto__ = proto;
  } else {
    ctor.prototype = proto;
  }
}
inherit(StubArray, Array.prototype);
var LegacyObservableArray = /* @__PURE__ */ function(_StubArray) {
  function LegacyObservableArray2(initialValues, enhancer, name, owned) {
    var _this;
    if (name === void 0) {
      name = false ? "ObservableArray@" + getNextId() : "ObservableArray";
    }
    if (owned === void 0) {
      owned = false;
    }
    _this = _StubArray.call(this) || this;
    initObservable(function() {
      var adm = new ObservableArrayAdministration(name, enhancer, owned, true);
      adm.proxy_ = _this;
      addHiddenFinalProp(_this, $mobx, adm);
      if (initialValues && initialValues.length) {
        _this.spliceWithArray(0, 0, initialValues);
      }
      if (safariPrototypeSetterInheritanceBug) {
        Object.defineProperty(_this, "0", ENTRY_0);
      }
    });
    return _this;
  }
  _inheritsLoose(LegacyObservableArray2, _StubArray);
  var _proto = LegacyObservableArray2.prototype;
  _proto.concat = function concat() {
    this[$mobx].atom_.reportObserved();
    for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
      arrays[_key] = arguments[_key];
    }
    return Array.prototype.concat.apply(
      this.slice(),
      //@ts-ignore
      arrays.map(function(a6) {
        return isObservableArray(a6) ? a6.slice() : a6;
      })
    );
  };
  _proto[Symbol.iterator] = function() {
    var self2 = this;
    var nextIndex = 0;
    return makeIterable({
      next: function next() {
        return nextIndex < self2.length ? {
          value: self2[nextIndex++],
          done: false
        } : {
          done: true,
          value: void 0
        };
      }
    });
  };
  return _createClass(LegacyObservableArray2, [{
    key: "length",
    get: function get3() {
      return this[$mobx].getArrayLength_();
    },
    set: function set4(newLength) {
      this[$mobx].setArrayLength_(newLength);
    }
  }, {
    key: Symbol.toStringTag,
    get: function get3() {
      return "Array";
    }
  }]);
}(StubArray);
Object.entries(arrayExtensions).forEach(function(_ref) {
  var prop = _ref[0], fn = _ref[1];
  if (prop !== "concat") {
    addHiddenProp(LegacyObservableArray.prototype, prop, fn);
  }
});
function createArrayEntryDescriptor(index) {
  return {
    enumerable: false,
    configurable: true,
    get: function get3() {
      return this[$mobx].get_(index);
    },
    set: function set4(value) {
      this[$mobx].set_(index, value);
    }
  };
}
function createArrayBufferItem(index) {
  defineProperty(LegacyObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
}
function reserveArrayBuffer(max) {
  if (max > OBSERVABLE_ARRAY_BUFFER_SIZE) {
    for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max + 100; index++) {
      createArrayBufferItem(index);
    }
    OBSERVABLE_ARRAY_BUFFER_SIZE = max;
  }
}
reserveArrayBuffer(1e3);
function createLegacyArray(initialValues, enhancer, name) {
  return new LegacyObservableArray(initialValues, enhancer, name);
}
function getAtom(thing, property) {
  if (typeof thing === "object" && thing !== null) {
    if (isObservableArray(thing)) {
      if (property !== void 0) {
        die(23);
      }
      return thing[$mobx].atom_;
    }
    if (isObservableSet(thing)) {
      return thing.atom_;
    }
    if (isObservableMap(thing)) {
      if (property === void 0) {
        return thing.keysAtom_;
      }
      var observable2 = thing.data_.get(property) || thing.hasMap_.get(property);
      if (!observable2) {
        die(25, property, getDebugName(thing));
      }
      return observable2;
    }
    if (isObservableObject(thing)) {
      if (!property) {
        return die(26);
      }
      var _observable = thing[$mobx].values_.get(property);
      if (!_observable) {
        die(27, property, getDebugName(thing));
      }
      return _observable;
    }
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
      return thing;
    }
  } else if (isFunction(thing)) {
    if (isReaction(thing[$mobx])) {
      return thing[$mobx];
    }
  }
  die(28);
}
function getAdministration(thing, property) {
  if (!thing) {
    die(29);
  }
  if (property !== void 0) {
    return getAdministration(getAtom(thing, property));
  }
  if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
    return thing;
  }
  if (isObservableMap(thing) || isObservableSet(thing)) {
    return thing;
  }
  if (thing[$mobx]) {
    return thing[$mobx];
  }
  die(24, thing);
}
function getDebugName(thing, property) {
  var named;
  if (property !== void 0) {
    named = getAtom(thing, property);
  } else if (isAction(thing)) {
    return thing.name;
  } else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing)) {
    named = getAdministration(thing);
  } else {
    named = getAtom(thing);
  }
  return named.name_;
}
function initObservable(cb) {
  var derivation = untrackedStart();
  var allowStateChanges = allowStateChangesStart(true);
  startBatch();
  try {
    return cb();
  } finally {
    endBatch();
    allowStateChangesEnd(allowStateChanges);
    untrackedEnd(derivation);
  }
}
var toString = objectPrototype.toString;
function deepEqual(a6, b3, depth) {
  if (depth === void 0) {
    depth = -1;
  }
  return eq(a6, b3, depth);
}
function eq(a6, b3, depth, aStack, bStack) {
  if (a6 === b3) {
    return a6 !== 0 || 1 / a6 === 1 / b3;
  }
  if (a6 == null || b3 == null) {
    return false;
  }
  if (a6 !== a6) {
    return b3 !== b3;
  }
  var type = typeof a6;
  if (type !== "function" && type !== "object" && typeof b3 != "object") {
    return false;
  }
  var className = toString.call(a6);
  if (className !== toString.call(b3)) {
    return false;
  }
  switch (className) {
    case "[object RegExp]":
    case "[object String]":
      return "" + a6 === "" + b3;
    case "[object Number]":
      if (+a6 !== +a6) {
        return +b3 !== +b3;
      }
      return +a6 === 0 ? 1 / +a6 === 1 / b3 : +a6 === +b3;
    case "[object Date]":
    case "[object Boolean]":
      return +a6 === +b3;
    case "[object Symbol]":
      return typeof Symbol !== "undefined" && Symbol.valueOf.call(a6) === Symbol.valueOf.call(b3);
    case "[object Map]":
    case "[object Set]":
      if (depth >= 0) {
        depth++;
      }
      break;
  }
  a6 = unwrap(a6);
  b3 = unwrap(b3);
  var areArrays = className === "[object Array]";
  if (!areArrays) {
    if (typeof a6 != "object" || typeof b3 != "object") {
      return false;
    }
    var aCtor = a6.constructor, bCtor = b3.constructor;
    if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a6 && "constructor" in b3) {
      return false;
    }
  }
  if (depth === 0) {
    return false;
  } else if (depth < 0) {
    depth = -1;
  }
  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;
  while (length--) {
    if (aStack[length] === a6) {
      return bStack[length] === b3;
    }
  }
  aStack.push(a6);
  bStack.push(b3);
  if (areArrays) {
    length = a6.length;
    if (length !== b3.length) {
      return false;
    }
    while (length--) {
      if (!eq(a6[length], b3[length], depth - 1, aStack, bStack)) {
        return false;
      }
    }
  } else {
    var keys = Object.keys(a6);
    var key;
    length = keys.length;
    if (Object.keys(b3).length !== length) {
      return false;
    }
    while (length--) {
      key = keys[length];
      if (!(hasProp(b3, key) && eq(a6[key], b3[key], depth - 1, aStack, bStack))) {
        return false;
      }
    }
  }
  aStack.pop();
  bStack.pop();
  return true;
}
function unwrap(a6) {
  if (isObservableArray(a6)) {
    return a6.slice();
  }
  if (isES6Map(a6) || isObservableMap(a6)) {
    return Array.from(a6.entries());
  }
  if (isES6Set(a6) || isObservableSet(a6)) {
    return Array.from(a6.entries());
  }
  return a6;
}
function makeIterable(iterator) {
  iterator[Symbol.iterator] = getSelf;
  return iterator;
}
function getSelf() {
  return this;
}
["Symbol", "Map", "Set"].forEach(function(m4) {
  var g3 = getGlobal();
  if (typeof g3[m4] === "undefined") {
    die("MobX requires global '" + m4 + "' to be available or polyfilled");
  }
});
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
  __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
    spy,
    extras: {
      getDebugName
    },
    $mobx
  });
}

// src/store/Fragment.js
var Fragment = class {
  path = "";
  type = "";
  model = {
    id: "",
    path: ""
  };
  /**
   * @param {Object} props - common properties of a fragment as a search result
   * @param {string} props.path - cf path
   * @param {string} props.type - merch web component type (e.g: merch-card)
   * @param {Object} props.model - cf model
   * @param {string} props.model.id - cf model id
   * @param {string} props.model.path - cf model path
   */
  constructor(props) {
    Object.assign(this, props);
  }
  get hasChanges() {
    return true;
  }
};

// src/store/Search.js
var Search = class {
  /** @type {string|undefined} Search query (the text the user entered) */
  query;
  /** @type {string|undefined} Path of the request (e.g., the URL on a website) */
  path;
  /** @type {string|undefined} Locale */
  locale;
  /** @type {string|undefined} Content Fragment variant, e.g: merch-card */
  variant;
  /** @type {string|undefined} Content Fragment Model ID */
  modelId;
  /** @type {boolean|undefined} Whether the Content Fragment is published */
  published;
  /**
   * @type {Array<Fragment>}
   */
  result = [];
  constructor() {
    makeAutoObservable(this);
  }
  /**
   *
   * @param {Array<Fragment>} result
   */
  setResult(result) {
    this.result = result;
  }
  update(props) {
    Object.assign(this, props);
  }
};

// ../../milo/libs/features/mas/web-components/src/aem.js
var accessToken = window.adobeid.authorize();
var headers = {
  Authorization: `Bearer ${accessToken}`,
  pragma: "no-cache",
  "cache-control": "no-cache"
};
async function searchFragment({ path, query }) {
  const filter = {};
  if (path) {
    filter.path = path;
  }
  if (query) {
    filter.fullText = {
      text: encodeURIComponent(query),
      queryMode: "EXACT_WORDS"
    };
  }
  const searchParams = new URLSearchParams({
    query: JSON.stringify({ filter })
  }).toString();
  return fetch(`${this.cfSearchUrl}?${searchParams}`, {
    headers
  }).then((res) => res.json()).then(({ items }) => {
    return items.map((item) => {
      const data = item.fields.reduce(
        (acc, { name, multiple, values }) => {
          acc[name] = multiple ? values : values[0];
          return acc;
        },
        {}
      );
      data.path = item.path;
      data.model = item.model;
      return data;
    });
  });
}
async function getFragmentByPath(path) {
  return fetch(`${this.cfFragmentsUrl}?path=${path}`, {
    headers
  }).then((res) => res.json()).then(({ items: [item] }) => item);
}
async function saveFragment(fragment) {
}
var AEM = class {
  sites = {
    cf: {
      fragments: {
        search: searchFragment.bind(this),
        getCfByPath: getFragmentByPath.bind(this),
        save: saveFragment.bind(this)
      }
    }
  };
  constructor(bucket) {
    const baseUrl = `https://${bucket}.adobeaemcloud.com`;
    const sitesUrl = `${baseUrl}/adobe/sites`;
    this.cfFragmentsUrl = `${sitesUrl}/cf/fragments`;
    this.cfSearchUrl = `${this.cfFragmentsUrl}/search`;
  }
};

// src/store/Store.js
var merchDataSourceCache;
var Store = class {
  /**
   * @type {Search}
   */
  search = new Search();
  /**
   * @type {import('@adobe/mas-commons').AEM}
   */
  aem;
  /**
   * Selected fragment
   * @type {Fragment}
   */
  fragment;
  /**
   * @param {string} bucket
   */
  constructor(bucket) {
    if (!bucket) throw new Error("bucket is required");
    makeAutoObservable(this, {
      aem: false
    });
    this.aem = new AEM(bucket);
    merchDataSourceCache = document.createElement("merch-datasource").cache;
  }
  async doSearch(props) {
    this.search.update(props);
    const fragments = await this.aem.sites.cf.fragments.search(this.search).then((items) => {
      return items.map((item) => new Fragment(item));
    });
    merchDataSourceCache?.add(...fragments);
    this.search.setResult(fragments);
  }
  /**
   * @param {FocusEvent} fragment
   */
  selectFragment(fragment) {
    this.fragment = fragment;
  }
};

// src/events.js
var EVENT_SUBMIT = "submit";

// ../node_modules/lit/node_modules/lit-html/directive-helpers.js
var { I: l6 } = j;
var r7 = () => document.createComment("");
var c5 = (o10, i6, n8) => {
  var t6;
  const v3 = o10._$AA.parentNode, d5 = void 0 === i6 ? o10._$AB : i6._$AA;
  if (void 0 === n8) {
    const i7 = v3.insertBefore(r7(), d5), t7 = v3.insertBefore(r7(), d5);
    n8 = new l6(i7, t7, o10, o10.options);
  } else {
    const l7 = n8._$AB.nextSibling, i7 = n8._$AM, u6 = i7 !== o10;
    if (u6) {
      let l8;
      null === (t6 = n8._$AQ) || void 0 === t6 || t6.call(n8, o10), n8._$AM = o10, void 0 !== n8._$AP && (l8 = o10._$AU) !== i7._$AU && n8._$AP(l8);
    }
    if (l7 !== d5 || u6) {
      let o11 = n8._$AA;
      for (; o11 !== l7; ) {
        const l8 = o11.nextSibling;
        v3.insertBefore(o11, d5), o11 = l8;
      }
    }
  }
  return n8;
};
var f3 = (o10, l7, i6 = o10) => (o10._$AI(l7, i6), o10);
var s8 = {};
var a5 = (o10, l7 = s8) => o10._$AH = l7;
var m3 = (o10) => o10._$AH;
var p3 = (o10) => {
  var l7;
  null === (l7 = o10._$AP) || void 0 === l7 || l7.call(o10, false, true);
  let i6 = o10._$AA;
  const n8 = o10._$AB.nextSibling;
  for (; i6 !== n8; ) {
    const o11 = i6.nextSibling;
    i6.remove(), i6 = o11;
  }
};

// ../node_modules/lit/node_modules/lit-html/directives/repeat.js
var u5 = (e9, s9, t6) => {
  const r8 = /* @__PURE__ */ new Map();
  for (let l7 = s9; l7 <= t6; l7++) r8.set(e9[l7], l7);
  return r8;
};
var c6 = e7(class extends i5 {
  constructor(e9) {
    if (super(e9), e9.type !== t5.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  ct(e9, s9, t6) {
    let r8;
    void 0 === t6 ? t6 = s9 : void 0 !== s9 && (r8 = s9);
    const l7 = [], o10 = [];
    let i6 = 0;
    for (const s10 of e9) l7[i6] = r8 ? r8(s10, i6) : i6, o10[i6] = t6(s10, i6), i6++;
    return { values: o10, keys: l7 };
  }
  render(e9, s9, t6) {
    return this.ct(e9, s9, t6).values;
  }
  update(s9, [t6, r8, c7]) {
    var d5;
    const a6 = m3(s9), { values: p4, keys: v3 } = this.ct(t6, r8, c7);
    if (!Array.isArray(a6)) return this.ut = v3, p4;
    const h5 = null !== (d5 = this.ut) && void 0 !== d5 ? d5 : this.ut = [], m4 = [];
    let y3, x3, j2 = 0, k3 = a6.length - 1, w3 = 0, A3 = p4.length - 1;
    for (; j2 <= k3 && w3 <= A3; ) if (null === a6[j2]) j2++;
    else if (null === a6[k3]) k3--;
    else if (h5[j2] === v3[w3]) m4[w3] = f3(a6[j2], p4[w3]), j2++, w3++;
    else if (h5[k3] === v3[A3]) m4[A3] = f3(a6[k3], p4[A3]), k3--, A3--;
    else if (h5[j2] === v3[A3]) m4[A3] = f3(a6[j2], p4[A3]), c5(s9, m4[A3 + 1], a6[j2]), j2++, A3--;
    else if (h5[k3] === v3[w3]) m4[w3] = f3(a6[k3], p4[w3]), c5(s9, a6[j2], a6[k3]), k3--, w3++;
    else if (void 0 === y3 && (y3 = u5(v3, w3, A3), x3 = u5(h5, j2, k3)), y3.has(h5[j2])) if (y3.has(h5[k3])) {
      const e9 = x3.get(v3[w3]), t7 = void 0 !== e9 ? a6[e9] : null;
      if (null === t7) {
        const e10 = c5(s9, a6[j2]);
        f3(e10, p4[w3]), m4[w3] = e10;
      } else m4[w3] = f3(t7, p4[w3]), c5(s9, a6[j2], t7), a6[e9] = null;
      w3++;
    } else p3(a6[k3]), k3--;
    else p3(a6[j2]), j2++;
    for (; w3 <= A3; ) {
      const e9 = c5(s9, m4[A3 + 1]);
      f3(e9, p4[w3]), m4[w3++] = e9;
    }
    for (; j2 <= k3; ) {
      const e9 = a6[j2++];
      null !== e9 && p3(e9);
    }
    return this.ut = v3, a5(s9, m4), T;
  }
});

// ../node_modules/@adobe/lit-mobx/lib/mixin-custom.js
var reaction = Symbol("LitMobxRenderReaction");
var cachedRequestUpdate = Symbol("LitMobxRequestUpdate");
function MobxReactionUpdateCustom(constructor, ReactionConstructor) {
  var _a, _b;
  return _b = class MobxReactingElement extends constructor {
    constructor() {
      super(...arguments);
      this[_a] = () => {
        this.requestUpdate();
      };
    }
    connectedCallback() {
      super.connectedCallback();
      const name = this.constructor.name || this.nodeName;
      this[reaction] = new ReactionConstructor(`${name}.update()`, this[cachedRequestUpdate]);
      if (this.hasUpdated)
        this.requestUpdate();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      if (this[reaction]) {
        this[reaction].dispose();
        this[reaction] = void 0;
      }
    }
    update(changedProperties) {
      if (this[reaction]) {
        this[reaction].track(super.update.bind(this, changedProperties));
      } else {
        super.update(changedProperties);
      }
    }
  }, _a = cachedRequestUpdate, _b;
}

// ../../milo/libs/features/mas/web-components/src/deeplink.js
var EVENT_HASHCHANGE = "hashchange";
function parseState(hash = window.location.hash) {
  const result = [];
  const keyValuePairs = hash.replace(/^#/, "").split("&");
  for (const pair of keyValuePairs) {
    const [key, value = ""] = pair.split("=");
    if (key) {
      result.push([key, decodeURIComponent(value.replace(/\+/g, " "))]);
    }
  }
  return Object.fromEntries(result);
}
function pushState(state) {
  const hash = new URLSearchParams(window.location.hash.slice(1));
  Object.entries(state).forEach(([key, value2]) => {
    if (value2) {
      hash.set(key, value2);
    } else {
      hash.delete(key);
    }
  });
  hash.sort();
  const value = hash.toString();
  if (value === window.location.hash) return;
  let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
  window.location.hash = value;
  window.scrollTo(0, lastScrollTop);
}
function deeplink(callback) {
  const handler = () => {
    if (!window.location.hash.includes("=")) return;
    const state = parseState(window.location.hash);
    callback(state);
  };
  handler();
  window.addEventListener(EVENT_HASHCHANGE, handler);
  return () => {
    window.removeEventListener(EVENT_HASHCHANGE, handler);
  };
}

// src/rte-editor.js
var RteEditor = class extends HTMLElement {
  constructor() {
    super();
    this.editor = null;
  }
  get value() {
    return this.editor.getContent();
  }
  connectedCallback() {
    window.tinymce.init({
      target: this,
      toolbar: "bold italic underline | link openlink unlink",
      plugins: "link",
      license_key: "gpl",
      extended_valid_elements: "a[is|href|class],span[is|class]",
      noneditable_class: "placeholder-resolved",
      content_style: ".price-strikethrough { text-decoration: line-through;}",
      setup: (editor) => {
        this.editor = editor;
        editor.on("blur", () => this.handleBlur());
      }
    });
  }
  handleBlur() {
    const content = this.editor.getContent();
    const changeEvent = new CustomEvent("blur", {
      bubbles: true,
      composed: true,
      detail: { content }
    });
    this.dispatchEvent(changeEvent);
  }
};
customElements.define("rte-editor", RteEditor);

// ../node_modules/lit/node_modules/lit-html/directives/class-map.js
var o9 = e7(class extends i5 {
  constructor(t6) {
    var i6;
    if (super(t6), t6.type !== t5.ATTRIBUTE || "class" !== t6.name || (null === (i6 = t6.strings) || void 0 === i6 ? void 0 : i6.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t6) {
    return " " + Object.keys(t6).filter((i6) => t6[i6]).join(" ") + " ";
  }
  update(i6, [s9]) {
    var r8, o10;
    if (void 0 === this.it) {
      this.it = /* @__PURE__ */ new Set(), void 0 !== i6.strings && (this.nt = new Set(i6.strings.join(" ").split(/\s/).filter((t6) => "" !== t6)));
      for (const t6 in s9) s9[t6] && !(null === (r8 = this.nt) || void 0 === r8 ? void 0 : r8.has(t6)) && this.it.add(t6);
      return this.render(s9);
    }
    const e9 = i6.element.classList;
    this.it.forEach((t6) => {
      t6 in s9 || (e9.remove(t6), this.it.delete(t6));
    });
    for (const t6 in s9) {
      const i7 = !!s9[t6];
      i7 === this.it.has(t6) || (null === (o10 = this.nt) || void 0 === o10 ? void 0 : o10.has(t6)) || (i7 ? (e9.add(t6), this.it.add(t6)) : (e9.remove(t6), this.it.delete(t6)));
    }
    return T;
  }
});

// src/studio.js
var models = {
  merchCard: {
    path: "/conf/sandbox/settings/dam/cfm/models/merch-card",
    name: "Merch Card"
  }
};
var MasStudio = class extends MobxReactionUpdateCustom(s7, Reaction) {
  static properties = {
    store: { type: Object, state: true },
    bucket: { type: String, attribute: "aem-bucket" },
    searchText: { type: String, state: true },
    confirmSelect: {
      type: Boolean,
      state: true
    },
    fragment: {
      type: Object,
      state: true
    },
    fragmentOffsets: {
      type: Object,
      state: true
    }
  };
  #ostRoot;
  constructor() {
    super();
    this.confirmSelect = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.store = new Store(this.bucket);
    this.startDeeplink();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.deeplinkDisposer();
  }
  get search() {
    return this.querySelector("sp-search");
  }
  get picker() {
    return this.querySelector("sp-picker");
  }
  createRenderRoot() {
    return this;
  }
  get selectFragmentDialog() {
    if (!this.confirmSelect) return A2;
    return x2`
            <sp-underlay open></sp-underlay>
            <sp-dialog size="m">
                <h1 slot="heading">You have unsaved changes!</h1>
                <p>
                    Do you want to save your changes before selecting another
                    merch card?
                </p>
                <sp-button
                    slot="button"
                    @click="${() => this.editFragment(null, this.fragment, true)}"
                >
                    Save
                </sp-button>
                <sp-button
                    slot="button"
                    variant="primary"
                    @click="${() => this.editFragment(null, this.fragment, true)}"
                >
                    Discard
                </sp-button>
                <sp-button
                    slot="button"
                    variant="secondary"
                    @click="${this.closeConfirmSelect}"
                >
                    Cancel
                </sp-button>
            </sp-dialog>
        `;
  }
  get fragmentEditorToolbar() {
    if (!this.store.fragment) return A2;
    return x2`<div id="actions">
            <sp-action-group
                aria-label="Fragment actions"
                role="group"
                compact
                emphasized
            >
                <sp-action-button
                    label="Save"
                    title="Save changes"
                    value="save"
                >
                    <sp-icon-save-floppy slot="icon"></sp-icon-save-floppy>
                </sp-action-button>
                <sp-action-button
                    label="Discard"
                    title="Discard changes"
                    value="discard"
                >
                    <sp-icon-undo slot="icon"></sp-icon-undo>
                </sp-action-button>
                <sp-action-button label="Clone" value="clone">
                    <sp-icon-duplicate slot="icon"></sp-icon-duplicate>
                </sp-action-button>
                <sp-action-button label="Publish" value="publish">
                    <sp-icon-publish-check slot="icon"></sp-icon-publish-check>
                </sp-action-button>
                <sp-action-button label="Unpublish" value="unpublish">
                    <sp-icon-publish-remove
                        slot="icon"
                    ></sp-icon-publish-remove>
                </sp-action-button>
            </sp-action-group>
            <sp-divider vertical></sp-divider>
            <sp-action-group>
                <overlay-trigger type="modal" receive-focus="true">
                    <sp-dialog-base underlay slot="click-content">
                        <sp-dialog
                            size="l"
                            no-divider
                            dismissable
                            mode="fullscreen"
                        >
                            <div id="ost"></div>
                        </sp-dialog>
                    </sp-dialog-base>
                    <sp-action-button
                        slot="trigger"
                        title="Offer Selector Tool"
                        label="Offer Selector Tool"
                        value="offer-selector"
                        @click="${this.editorActionClickHandler}"
                    >
                        <sp-icon-star slot="icon"></sp-icon-star>
                    </sp-action-button>
                </overlay-trigger>
            </sp-action-group>
            <sp-divider vertical></sp-divider>
            <sp-action-group>
                <sp-action-button title="Close" label="Close" value="close">
                    <sp-icon-close-circle slot="icon"></sp-icon-close-circle>
                </sp-action-button>
            </sp-action-group>
        </div>`;
  }
  get fragmentEditor() {
    const classes = { open: this.store.fragment };
    return x2`<div id="editor" class=${o9(classes)}>
            ${this.merchCardFragmentEditor} ${this.fragmentEditorToolbar}
        </div>`;
  }
  get merchCardFragmentEditor() {
    const { fragment } = this.store;
    if (!fragment) return A2;
    return x2`<sp-field-label for="card-variant">Variant</sp-field-label>
            <sp-picker id="card-variant" value="${fragment.variant}">
                <span slot="label">Choose a variant:</span>
                <sp-menu-item value="ccd-action">CCD Action</sp-menu-item>
                <sp-menu-item>CCH</sp-menu-item>
                <sp-menu-item>Plans</sp-menu-item>
                <sp-menu-item>Catalog</sp-menu-item>
            </sp-picker>
            <sp-field-label for="card-title">Title</sp-field-label>
            <sp-textfield
                placeholder="Enter card title"
                id="card-title"
                data-field="title"
                value="${fragment.title}"
                @change="${this.updateFragment}"
            ></sp-textfield>
            <sp-field-label for="card-icon">Icons</sp-field-label>
            <sp-textfield
                placeholder="Enter icon URLs"
                id="card-icon"
                multiline
                data-field="icon"
                value="${fragment.icon}"
                @change="${this.updateFragment}"
            ></sp-textfield>
            <sp-field-label for="horizontal"> Prices </sp-field-label>
            <sp-field-group horizontal id="horizontal">
                <rte-editor data-field="prices" @blur="${this.updateFragment}"
                    >${o8(fragment.prices)}</rte-editor
                >
            </sp-field-group>
            <sp-field-label for="horizontal"> Description </sp-field-label>
            <sp-field-group horizontal id="horizontal">
                <rte-editor
                    data-field="description"
                    @blur="${this.updateFragment}"
                    >${o8(fragment.description)}</rte-editor
                >
            </sp-field-group>
            <sp-field-label for="horizontal"> Footer </sp-field-label>
            <sp-field-group horizontal id="horizontal">
                <rte-editor data-field="ctas" @blur="${this.updateFragment}"
                    >${o8(fragment.ctas)}</rte-editor
                >
            </sp-field-group> `;
  }
  get fragmentEditorEl() {
    return this.querySelector("#editor");
  }
  get result() {
    if (this.store.search.result.length === 0) return A2;
    return x2`<ul id="result">
            ${c6(
      this.store.search.result,
      (item) => item.path,
      (item) => {
        switch (item.model.path) {
          case models.merchCard.path:
            return x2`<merch-card
                                @dblclick="${(e9) => this.editFragment(e9, item)}"
                            >
                                <merch-datasource
                                    odin
                                    source="odin-author"
                                    path="${item.path}"
                                ></merch-datasource>
                            </merch-card>`;
          default:
            return A2;
        }
      }
    )}
        </ul>`;
  }
  render() {
    return x2`
            <h1>Merch at Scale Studio</h1>
            <div>
                <sp-search
                    placeholder="Search"
                    @input="${this.handleSearch}"
                    @submit="${this.handleSearch}"
                    value=${this.searchText}
                    size="m"
                ></sp-search>
                <sp-picker
                    label="Fragment model"
                    size="m"
                    value=${this.store.search.modelId}
                >
                    <sp-menu-item value="all">All</sp-menu-item>
                    <sp-menu-item
                        value="L2NvbmYvc2FuZGJveC9zZXR0aW5ncy9kYW0vY2ZtL21vZGVscy9tZXJjaC1jYXJk"
                        >Merch Card</sp-menu-item
                    >
                </sp-picker>
                <sp-button
                    ?disabled="${!this.searchText}"
                    @click=${this.doSearch}
                    >Search</sp-button
                >
            </div>
            ${this.result} ${this.fragmentEditor} ${this.selectFragmentDialog}
        `;
  }
  async startDeeplink() {
    this.deeplinkDisposer = deeplink(({ path, modelId, query }) => {
      this.searchText = query;
      this.store.search.update({ path, modelId });
    });
    if (this.searchText) {
      await this.updateComplete;
      this.doSearch();
    } else {
      this.store.search.setResult([]);
    }
  }
  /**
   * @param {Event} e click event, maybe null
   * @param {Fragment} fragment
   * @param {boolean} force - discard unsaved changes
   */
  async editFragment(e9, fragment, force = false) {
    if (e9) {
      const merchCard = e9.target.closest("merch-card");
      const { offsetTop, offsetLeft, offsetWidth } = merchCard;
      this.fragmentOffsets = [
        `${offsetTop}px`,
        `${offsetLeft + offsetWidth + 32}px`
      ];
    }
    if (fragment && fragment === this.store.fragment) return;
    if (this.store.fragment?.hasChanges && !force) {
      this.fragment = fragment;
      this.confirmSelect = true;
    } else {
      this.store.selectFragment(fragment);
      this.fragment = void 0;
      this.confirmSelect = false;
      await this.updateComplete;
      this.fragmentEditorEl.style.top = this.fragmentOffsets[0];
      this.fragmentEditorEl.style.left = this.fragmentOffsets[1];
    }
  }
  updateFragment(e9) {
    const fieldName = e9.target.dataset.field;
    let { value } = e9.target;
    if (e9.target.multiline) {
      value = value.split("\n");
    }
    this.store.fragment[fieldName] = value;
    const merchDataSource = this.querySelector(
      `merch-datasource[path="${this.store.fragment.path}"]`
    );
    merchDataSource.refresh(false);
  }
  closeConfirmSelect() {
    this.confirmSelect = false;
  }
  /**
   * @param {Event} e;
   */
  handleSearch(e9) {
    this.searchText = this.search.value;
    if (e9.type === EVENT_SUBMIT) {
      e9.preventDefault();
      this.doSearch();
    }
  }
  async doSearch() {
    const query = this.searchText;
    const modelId = this.picker.value.replace("all", "");
    const path = "/content/dam/sandbox/mas";
    const search = { query, path, modelId };
    pushState(search);
    this.store.doSearch(search);
  }
  async editorActionClickHandler(e9) {
    if (this.#ostRoot) return;
    this.#ostRoot = document.getElementById("ost");
    const accessToken2 = window.adobeid.authorize();
    const searchParameters = new URLSearchParams();
    window.ost.openOfferSelectorTool({
      rootElement: this.#ostRoot,
      zIndex: 20,
      aosAccessToken: accessToken2,
      searchParameters,
      onSelect: (offer) => {
        console.log("Offer selected:", offer);
      }
    });
  }
};
customElements.define("mas-studio", MasStudio);
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

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=studio.js.map

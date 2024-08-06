// ../node_modules/@dexter/offer-selector-tool/lib/module.js
var e = { 1764: function(e2, t2, r2) {
  var n2 = this && this.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.fetch = t2.TimeoutError = void 0;
  const i2 = n2(r2(6279)), o2 = r2(7445), s = r2(6340), a = n2(r2(2113));
  class l extends Error {
    constructor(e3) {
      super(`fetch timed out after ${e3} milliseconds`), this.name = "ETIMEOUT";
    }
  }
  t2.TimeoutError = l, t2.fetch = (...e3) => {
    var t3, r3;
    let n3 = i2.default;
    const c = null === (t3 = e3[1]) || void 0 === t3 ? void 0 : t3.logger, u = null === (r3 = e3[1]) || void 0 === r3 ? void 0 : r3.timeout;
    return u && (n3 = (...e4) => (0, a.default)((0, i2.default)(...e4), u, new l(u))), c && (n3 = (0, o2.intercept)(new s.LoggingInterceptor({ logger: c }), n3)), n3(...e3);
  };
}, 7268: (e2, t2, r2) => {
  t2.he = void 0;
  var n2 = r2(1764);
  Object.defineProperty(t2, "he", { enumerable: true, get: function() {
    return n2.fetch;
  } });
  r2(7445), r2(6340);
}, 7445: (e2, t2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.intercept = void 0, t2.intercept = (e3, t3) => (...r2) => {
    let n2 = Promise.resolve(r2);
    e3.request && (n2 = n2.then((t4) => e3.request(...t4)));
    let i2 = n2.then((e4) => t3(...e4));
    return (e3.response || e3.error) && (i2 = i2.then(e3.response, e3.error)), i2;
  };
}, 2363: (e2, t2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.isJWTRegex = t2.imsEmailRegex = t2.unsafeQueryParams = t2.commonHeaders = void 0;
  t2.commonHeaders = /* @__PURE__ */ new Set(["content-length", "x-adobe-clientsession", "x-adobe-status", "x-cip", "x-debug-id", "x-request-id"]), t2.unsafeQueryParams = /* @__PURE__ */ new Set(["access_token", "code", "state", "client_secret"]), t2.imsEmailRegex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+(?:[a-z]*)\\b$", "i"), t2.isJWTRegex = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
}, 6340: (e2, t2, r2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.LoggingInterceptor = void 0;
  const n2 = r2(2363), i2 = r2(6279), o2 = r2(4469), s = "network", a = "Invalid URL scheme";
  t2.LoggingInterceptor = class {
    constructor({ logger: e3, excludeUrls: t3 = [], printHeaderNames: r3 = n2.commonHeaders, sanitizeParameterNames: o3 = n2.unsafeQueryParams, meta: s2 = {} }) {
      this.context = { url: void 0 }, this.request = (...e4) => {
        this.context.requestStartTime = Date.now();
        try {
          const [t4, r4] = e4;
          this.context.logMeta = Object.assign(Object.assign({}, this.context.logMeta), null == r4 ? void 0 : r4.logMeta);
          const n3 = "string" == typeof t4 ? new i2.Request(t4, r4) : t4;
          this.context.url = n3.url, this.context.method = n3.method, this.context.headers = n3.headers, this.context.shouldLog = !this.excludeUrls.some((e5) => -1 !== this.context.url.indexOf(e5)), this.parseUrl(), this.context.shouldLog && this.logger.info(this.getRequestInfo());
        } catch (e5) {
          if (e5.message === a) throw e5;
        }
        return e4;
      }, this.response = (e4) => {
        try {
          this.context.shouldLog && this.logger.info(this.getResponseInfo(e4));
        } catch (e5) {
        }
        return e4;
      }, this.error = (e4) => {
        try {
          if (this.context.shouldLog) {
            const t4 = this.getRequestInfo();
            e4.message === a && (t4.url = this.context.url), t4.error = e4, t4.event = "ERROR", t4.duration = this.getResponseTime(), this.logger.error(t4);
          }
        } catch (e5) {
        }
        throw e4;
      }, this.logger = e3, this.excludeUrls = t3, this.commonHeaders = new Set([...r3].map((e4) => e4.toLowerCase())), this.sanitizeParameterNames = new Set(o3), this.context.logMeta = Object.assign({}, s2);
    }
    parseUrl() {
      if (!/^http(s)?:/.test(this.context.url)) throw new Error(a);
      try {
        this.context.parsedUrl = new URL(this.context.url);
      } catch (e4) {
        throw new Error(a);
      }
      const { searchParams: e3 } = this.context.parsedUrl, t3 = {};
      for (const [r3] of e3) {
        const n3 = e3.getAll(r3);
        t3[r3] = n3.length > 1 ? n3 : n3[0];
      }
      this.context.parsedUrl.query = (0, o2.sanitizeParameters)(t3, this.sanitizeParameterNames), this.context.parsedUrl.pathname = (0, o2.sanitizePath)(this.context.parsedUrl.pathname);
    }
    headerToObject(e3) {
      const t3 = {}, r3 = e3.keys();
      for (const n3 of r3) this.commonHeaders.has(n3) && e3.has(n3) && (t3[n3] = e3.get(n3));
      return t3;
    }
    getResponseTime() {
      return Date.now() - this.context.requestStartTime;
    }
    getRequestInfo() {
      var e3, t3, r3, n3;
      const i3 = this.context.headers;
      return Object.assign({ label: s, event: "REQUEST", method: this.context.method, protocol: null === (e3 = this.context.parsedUrl) || void 0 === e3 ? void 0 : e3.protocol, dest: null === (t3 = this.context.parsedUrl) || void 0 === t3 ? void 0 : t3.hostname, path: null === (r3 = this.context.parsedUrl) || void 0 === r3 ? void 0 : r3.pathname, headers: this.headerToObject(i3), query: null === (n3 = this.context.parsedUrl) || void 0 === n3 ? void 0 : n3.query }, this.context.logMeta);
    }
    getResponseInfo(e3) {
      const t3 = e3.headers;
      return Object.assign({ label: s, event: "RESPONSE", method: this.context.method, protocol: this.context.parsedUrl.protocol, dest: this.context.parsedUrl.hostname, path: this.context.parsedUrl.pathname, headers: this.headerToObject(t3), query: this.context.parsedUrl.query, status: e3.status, duration: this.getResponseTime() }, this.context.logMeta);
    }
  };
}, 4469: (e2, t2, r2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.sanitizePath = t2.sanitizeParameters = void 0;
  const n2 = r2(2363);
  function i2(e3) {
    let t3 = n2.isJWTRegex.test(e3);
    if (t3) try {
      const t4 = e3.substring(0, e3.indexOf(".")), r3 = "undefined" == typeof window ? Buffer.from(t4, "base64").toString("utf-8") : atob(t4);
      JSON.parse(r3);
    } catch (e4) {
      t3 = false;
    }
    return t3;
  }
  t2.sanitizeParameters = function(e3, t3) {
    if (!e3 || !Object.keys(e3).length) return;
    const r3 = Object.assign({}, e3);
    return Object.keys(r3).forEach((e4) => {
      const o2 = r3[e4];
      (t3.has(e4) && o2 || n2.imsEmailRegex.test(o2) || i2(o2)) && (r3[e4] = "REDACTED");
    }), r3;
  }, t2.sanitizePath = function(e3) {
    return null == e3 ? void 0 : e3.replace(/\/([^/]*)/g, (e4, t3) => i2(t3) ? "/REDACTED" : e4);
  };
}, 6763: function(e2, t2, r2) {
  var n2 = this && this.__assign || function() {
    return n2 = Object.assign || function(e3) {
      for (var t3, r3 = 1, n3 = arguments.length; r3 < n3; r3++) for (var i3 in t3 = arguments[r3]) Object.prototype.hasOwnProperty.call(t3, i3) && (e3[i3] = t3[i3]);
      return e3;
    }, n2.apply(this, arguments);
  }, i2 = this && this.__createBinding || (Object.create ? function(e3, t3, r3, n3) {
    void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
      return t3[r3];
    } });
  } : function(e3, t3, r3, n3) {
    void 0 === n3 && (n3 = r3), e3[n3] = t3[r3];
  }), o2 = this && this.__setModuleDefault || (Object.create ? function(e3, t3) {
    Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
  } : function(e3, t3) {
    e3.default = t3;
  }), s = this && this.__importStar || function(e3) {
    if (e3 && e3.__esModule) return e3;
    var t3 = {};
    if (null != e3) for (var r3 in e3) "default" !== r3 && Object.prototype.hasOwnProperty.call(e3, r3) && i2(t3, e3, r3);
    return o2(t3, e3), t3;
  }, a = this && this.__rest || function(e3, t3) {
    var r3 = {};
    for (var n3 in e3) Object.prototype.hasOwnProperty.call(e3, n3) && t3.indexOf(n3) < 0 && (r3[n3] = e3[n3]);
    if (null != e3 && "function" == typeof Object.getOwnPropertySymbols) {
      var i3 = 0;
      for (n3 = Object.getOwnPropertySymbols(e3); i3 < n3.length; i3++) t3.indexOf(n3[i3]) < 0 && Object.prototype.propertyIsEnumerable.call(e3, n3[i3]) && (r3[n3[i3]] = e3[n3[i3]]);
    }
    return r3;
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.ContentEntryProvider = t2.ContentEntrySelector = void 0;
  var l = s(r2(2261)), c = r2(9800), u = r2(5044);
  t2.ContentEntrySelector = function(e3) {
    var t3 = e3.selector, r3 = e3.useRootContent, i3 = void 0 === r3 || r3, o3 = e3.model, s2 = a(e3, ["selector", "useRootContent", "model"]), d = l.useContext(c.ContentContext), p = d.root || d, f = i3 ? p : d, m = o3 || (t3 ? void 0 : f.model), h = u.useSelector(f.model, o3, t3), g = l.useMemo(function() {
      var e4 = h(f.content);
      return { locale: f.locale, model: m, content: e4, root: p, usePlaceholderContent: f.usePlaceholderContent };
    }, [f, m, p, h]);
    return l.default.createElement(c.ContentContext.Provider, n2({ value: g }, s2));
  }, t2.ContentEntryProvider = function(e3) {
    var t3 = e3.locale, r3 = e3.value, i3 = e3.usePlaceholderContent, o3 = e3.model, s2 = a(e3, ["locale", "value", "usePlaceholderContent", "model"]), d = u.useLocale(t3);
    return l.default.createElement(c.ContentContext.Consumer, null, function(e4) {
      var t4 = { locale: d, root: e4.root, model: e4.model, content: e4.content, usePlaceholderContent: void 0 === i3 ? e4.usePlaceholderContent : i3 };
      return "object" == typeof r3 && (t4.content = r3, t4.root = void 0, t4.model = o3), l.default.createElement(c.ContentContext.Provider, n2({ value: t4 }, s2));
    });
  };
}, 1336: function(e2, t2, r2) {
  var n2 = this && this.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.createContentEntry = t2.defineContents = t2.ContentEntry = void 0;
  var i2 = r2(2167), o2 = n2(r2(795)), s = function() {
    function e3(e4, t3, r3) {
      this.fields = e4, this.locale = t3 || "en-US", this.model = r3;
    }
    return e3.prototype.getRaw = function() {
      return this.fields;
    }, e3.prototype.get = function(e4) {
      return "string" == typeof e4 ? this.fields[e4] : this.fields[e4.id];
    }, e3.prototype.format = function(e4, t3) {
      var r3 = this, n3 = this.get(e4);
      return "string" == typeof n3 ? new o2.default(n3, this.locale).format(t3) : Array.isArray(n3) ? n3.map(function(e5) {
        return new o2.default(e5, r3.locale).format(t3);
      }) : "";
    }, e3.prototype.search = function(e4) {
      var t3 = this;
      if (this.model) {
        var r3 = i2.generateSelector(this.model, e4)(this.fields);
        if (Array.isArray(r3)) return r3.map(function(r4) {
          return c(e4, r4, t3.locale);
        });
        if (r3) return [c(e4, r3, this.locale)];
      }
      return [];
    }, e3;
  }();
  t2.ContentEntry = s;
  var a = function() {
    function e3(e4) {
      var t3 = e4.id, r3 = e4.placeholderContent, n3 = e4.description, i3 = e4.type, o3 = e4.isArray, s2 = void 0 !== o3 && o3;
      this.id = t3, this.description = n3, this.type = i3, this.isArray = s2, this.placeholderContent = this.normalize(r3, true);
    }
    return e3.prototype.normalize = function(e4, t3) {
      if ("string" == typeof this.type) {
        if (void 0 !== (r3 = this._normalizeValuesWithPrimitiveType(e4, this.type))) return r3;
      } else {
        if (!this.type) return;
        var r3;
        if (void 0 !== (r3 = this._normalizaValuesWithType(e4, t3))) return r3;
      }
      if (t3) return this.placeholderContent;
    }, e3.prototype._normalizeValuesWithPrimitiveType = function(e4, t3) {
      return typeof e4 !== t3 || this.isArray ? Array.isArray(e4) && this.isArray ? e4.filter(function(e5) {
        return typeof e5 === t3;
      }) : void 0 : e4;
    }, e3.prototype._normalizaValuesWithType = function(e4, t3) {
      var r3 = this;
      return Array.isArray(e4) && this.isArray ? e4.map(function(e5) {
        return l(r3.type, e5, t3);
      }) : Array.isArray(e4) || this.isArray ? void 0 : l(this.type, e4 || (t3 ? this.placeholderContent : void 0), t3);
    }, e3;
  }();
  t2.defineContents = function(e3, t3) {
    var r3 = { __contentType: e3, fields: {} };
    for (var n3 in t3) {
      var i3 = t3[n3];
      r3.fields[n3] = r3[n3] = new a(i3);
    }
    return r3.createEntry = function(e4, t4, n4) {
      return void 0 === e4 && (e4 = {}), void 0 === t4 && (t4 = "en-US"), void 0 === n4 && (n4 = false), new s(l(r3, e4, n4), t4, r3);
    }, r3;
  };
  var l = function(e3, t3, r3) {
    var n3 = {};
    if (void 0 !== t3 || r3) for (var i3 in e3.fields) {
      var o3 = e3.fields[i3], s2 = o3.id;
      s2 && (n3[s2] = o3.normalize(null == t3 ? void 0 : t3[s2], r3));
    }
    return n3;
  };
  function c(e3, t3, r3, n3) {
    return void 0 !== e3 ? e3.createEntry(t3, r3, n3) : new s(t3, r3, e3);
  }
  t2.createContentEntry = c;
}, 9800: function(e2, t2, r2) {
  var n2 = this && this.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.ContentContext = void 0;
  var i2 = n2(r2(2261));
  t2.ContentContext = i2.default.createContext({ locale: "en-US", content: {}, root: void 0, model: void 0 });
}, 5863: function(e2, t2) {
  var r2 = this && this.__values || function(e3) {
    var t3 = "function" == typeof Symbol && Symbol.iterator, r3 = t3 && e3[t3], n3 = 0;
    if (r3) return r3.call(e3);
    if (e3 && "number" == typeof e3.length) return { next: function() {
      return e3 && n3 >= e3.length && (e3 = void 0), { value: e3 && e3[n3++], done: !e3 };
    } };
    throw new TypeError(t3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.keyFormatter = t2.valueParser = t2.valueFormatter = void 0;
  var n2 = /^\$[A-Za-z_]\w*\s*(:\s*[A-Za-z]\w*)?\s*$/, i2 = /^[A-Za-z_]\w*\s*(:\s*[A-Za-z]\w*)?\s*$/;
  t2.valueFormatter = function(e3) {
    return null == e3 ? void 0 : Array.isArray(e3) ? "[ " + e3.map(t2.valueFormatter).join(", ") + " ]" : "object" == typeof e3 ? "{ " + Object.keys(e3).map(function(r3) {
      return "_operator" !== r3 ? r3 + ": " + t2.valueFormatter(e3[r3]) : r3 + ": " + e3[r3];
    }).join(", ") + " }" : "string" == typeof e3 ? n2.test(e3) ? e3.split(":")[0].trim() : '"' + e3 + '"' : "number" == typeof e3 && isNaN(e3) ? void 0 : "" + e3;
  }, t2.valueParser = function(e3, i3) {
    var o2, s;
    if (void 0 === i3 && (i3 = /* @__PURE__ */ new Set()), Array.isArray(e3)) try {
      for (var a = r2(e3), l = a.next(); !l.done; l = a.next()) {
        var c = l.value;
        t2.valueParser(c, i3);
      }
    } catch (e4) {
      o2 = { error: e4 };
    } finally {
      try {
        l && !l.done && (s = a.return) && s.call(a);
      } finally {
        if (o2) throw o2.error;
      }
    }
    else if ("object" == typeof e3) for (var u in e3) t2.valueParser(e3[u], i3);
    else if ("string" == typeof e3 && "$" === e3[0]) {
      if (!n2.test(e3)) throw new Error("Invalid argument name: " + e3);
      i3.add(t2.keyFormatter(e3.substring(1)));
    }
    return i3;
  }, t2.keyFormatter = function(e3) {
    if (i2.test(e3)) return e3.replace(/\s/g, "");
    throw new Error("Invalid argument name: " + e3);
  };
}, 9937: function(e2, t2, r2) {
  var n2 = this && this.__read || function(e3, t3) {
    var r3 = "function" == typeof Symbol && e3[Symbol.iterator];
    if (!r3) return e3;
    var n3, i3, o3 = r3.call(e3), s2 = [];
    try {
      for (; (void 0 === t3 || t3-- > 0) && !(n3 = o3.next()).done; ) s2.push(n3.value);
    } catch (e4) {
      i3 = { error: e4 };
    } finally {
      try {
        n3 && !n3.done && (r3 = o3.return) && r3.call(o3);
      } finally {
        if (i3) throw i3.error;
      }
    }
    return s2;
  }, i2 = this && this.__spreadArray || function(e3, t3) {
    for (var r3 = 0, n3 = t3.length, i3 = e3.length; r3 < n3; r3++, i3++) e3[i3] = t3[r3];
    return e3;
  }, o2 = this && this.__values || function(e3) {
    var t3 = "function" == typeof Symbol && Symbol.iterator, r3 = t3 && e3[t3], n3 = 0;
    if (r3) return r3.call(e3);
    if (e3 && "number" == typeof e3.length) return { next: function() {
      return e3 && n3 >= e3.length && (e3 = void 0), { value: e3 && e3[n3++], done: !e3 };
    } };
    throw new TypeError(t3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.QueryableContentModelCollection = void 0;
  var s = r2(5863), a = r2(68), l = function() {
    function e3(e4, t3, r3, o3, a2, l2) {
      if (void 0 === r3 && (r3 = []), this.model = t3, this.argNames = r3.map(s.keyFormatter), this.key = s.keyFormatter(e4), this.argLength = r3.length, void 0 !== o3) {
        this.preFilledValues = o3;
        var c2 = s.valueParser(this.preFilledValues);
        this.argNames = i2(i2([], n2(this.argNames)), n2(c2));
      }
      this.asArray = a2 || false, this.valueFormatter = l2 || s.valueFormatter;
    }
    return e3.prototype.toString = function(e4) {
      var t3, r3 = this, n3 = this.argNames.slice(0, this.argLength), i3 = null === (t3 = this.preFilledValues) || void 0 === t3 ? void 0 : t3.map(function(e5) {
        return r3.valueFormatter(e5);
      }), o3 = a.printResolverWithArgs(this.key, n3, i3);
      return this.model instanceof u ? this.model.toString(o3, e4 + 1) : c(this.model, o3, e4 + 1);
    }, e3.prototype.toEntryObject = function() {
      var e4;
      return e4 = this.model instanceof u ? this.model.toEntryObject() : this.model.createEntry(void 0, void 0, true).getRaw(), this.asArray ? [e4] : e4;
    }, e3;
  }(), c = function(e3, t3, r3) {
    var n3 = e3.fields, i3 = [];
    for (var o3 in n3) n3[o3].id && (n3[o3].type && "string" != typeof n3[o3].type ? i3.push(c(n3[o3].type, n3[o3].id, r3 + 1)) : i3.push(n3[o3].id));
    return a.printInBrackets(t3, i3, r3);
  }, u = function() {
    function e3() {
      this.argNames = /* @__PURE__ */ new Set(), this.models = /* @__PURE__ */ new Map();
    }
    return e3.prototype.addContentModel = function(e4, t3) {
      for (var r3 = [], o3 = 2; o3 < arguments.length; o3++) r3[o3 - 2] = arguments[o3];
      var s2 = d.apply(void 0, i2([], n2(r3))), a2 = s2.argNames, c2 = s2.preFilledValues, u2 = s2.asArray, p = s2.valueFormatter;
      this.add(new l(e4, t3, a2, c2, u2, p));
    }, e3.prototype.addContentModelWithSubResolver = function(t3, r3, o3) {
      for (var s2 = [], a2 = 3; a2 < arguments.length; a2++) s2[a2 - 3] = arguments[a2];
      var l2 = d.apply(void 0, i2([], n2(s2))), c2 = l2.argNames, u2 = l2.preFilledValues, p = l2.asArray, f = l2.valueFormatter, m = new e3();
      m.addContentModel(r3, o3, p), this.addContentModel(t3, m, c2, u2, f);
    }, e3.prototype.merge = function(e4) {
      var t3 = this;
      e4.models.forEach(function(e5) {
        return t3.add(e5);
      });
    }, e3.prototype.add = function(e4) {
      var t3 = e4.key;
      if (this.models.has(t3)) throw new Error("Existing Alias Name: " + t3.split(":")[0]);
      this.models.set(t3, e4), this.addArgNames(e4);
    }, e3.prototype.addArgNames = function(e4) {
      var t3, r3 = this;
      e4.argNames.slice(null === (t3 = e4.preFilledValues) || void 0 === t3 ? void 0 : t3.length).forEach(function(e5) {
        r3.argNames.add(e5);
      });
    }, e3.prototype.toQuery = function() {
      return this.toString(a.printQueryWithArgs(i2([], n2(this.argNames))));
    }, e3.prototype.toString = function(e4, t3) {
      void 0 === e4 && (e4 = ""), void 0 === t3 && (t3 = 0);
      var r3 = i2([], n2(this.models.values())).map(function(e5) {
        return e5.toString(t3);
      });
      return a.printInBrackets(e4, r3, t3);
    }, e3.prototype.toEntryObject = function() {
      var e4, t3, r3 = {};
      try {
        for (var i3 = o2(this.models.entries()), s2 = i3.next(); !s2.done; s2 = i3.next()) {
          var a2 = n2(s2.value, 2), l2 = a2[0], c2 = a2[1];
          r3[l2.split(":")[0]] = c2.toEntryObject();
        }
      } catch (t4) {
        e4 = { error: t4 };
      } finally {
        try {
          s2 && !s2.done && (t3 = i3.return) && t3.call(i3);
        } finally {
          if (e4) throw e4.error;
        }
      }
      return r3;
    }, e3;
  }();
  function d() {
    for (var e3, t3, r3, n3, i3 = [], o3 = 0; o3 < arguments.length; o3++) i3[o3] = arguments[o3];
    for (; i3.length > 0; ) {
      var s2 = i3.shift();
      Array.isArray(s2) && void 0 === r3 ? e3 ? t3 = t3 || s2 : e3 = s2 : "boolean" != typeof s2 || n3 ? "function" == typeof s2 && t3 && (n3 = s2) : r3 = s2;
    }
    return { argNames: e3, preFilledValues: t3, asArray: r3, valueFormatter: n3 };
  }
  t2.QueryableContentModelCollection = u;
}, 68: function(e2, t2) {
  var r2 = this && this.__read || function(e3, t3) {
    var r3 = "function" == typeof Symbol && e3[Symbol.iterator];
    if (!r3) return e3;
    var n3, i3, o2 = r3.call(e3), s = [];
    try {
      for (; (void 0 === t3 || t3-- > 0) && !(n3 = o2.next()).done; ) s.push(n3.value);
    } catch (e4) {
      i3 = { error: e4 };
    } finally {
      try {
        n3 && !n3.done && (r3 = o2.return) && r3.call(o2);
      } finally {
        if (i3) throw i3.error;
      }
    }
    return s;
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.printQueryWithArgs = t2.printResolverWithArgs = t2.printArgument = t2.printInBrackets = void 0;
  var n2 = ":";
  t2.printInBrackets = function(e3, t3, r3) {
    var n3 = Array(r3 + 1).join("  "), i3 = n3 + "  ", o2 = "{\n" + i3 + t3.join("\n" + i3) + "\n" + n3 + "}";
    return e3 ? e3 + " " + o2 : n3 + o2;
  }, t2.printArgument = function(e3, t3, i3) {
    if (void 0 === i3 && (i3 = false), i3) return (s = e3.split(n2)[0]) + n2 + " " + (t3 || "$" + s);
    var o2 = r2(e3.split(n2), 2), s = o2[0], a = o2[1];
    return "$" + s + ": " + (void 0 === a ? "String" : a) + "!";
  };
  var i2 = function(e3, t3) {
    return e3.replace(n2, ": ") + " " + function(e4) {
      return e4.length ? "(" + e4.join(", ") + ")" : "";
    }(t3);
  };
  t2.printResolverWithArgs = function(e3, r3, n3) {
    return i2(e3, r3.map(function(e4, r4) {
      return t2.printArgument(e4, null == n3 ? void 0 : n3[r4], true);
    }));
  }, t2.printQueryWithArgs = function(e3) {
    return i2("query", e3.map(function(e4) {
      return t2.printArgument(e4);
    }));
  };
}, 5044: (e2, t2, r2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.useNestedContentEntry = t2.useContentEntry = t2.useSelector = t2.useLocale = void 0;
  var n2 = r2(2261), i2 = r2(9800), o2 = r2(1336), s = r2(2167), a = function(e3) {
    return Array.isArray(e3) ? e3[0] : e3;
  };
  function l(e3, t3, r3) {
    void 0 === r3 && (r3 = a);
    var i3 = n2.useMemo(function() {
      return e3 && t3 ? s.generateSelector(e3, t3) : function(e4) {
        return e4;
      };
    }, [e3, t3]);
    return n2.useMemo(function() {
      return function(e4) {
        return r3(i3(e4));
      };
    }, [i3, r3]);
  }
  t2.useLocale = function(e3) {
    var t3 = n2.useContext(i2.ContentContext);
    return (e3 || t3.locale).replace(/_/g, "-");
  }, t2.useSelector = l, t2.useContentEntry = function(e3, t3) {
    void 0 === t3 && (t3 = false);
    var r3 = n2.useContext(i2.ContentContext), s2 = t3 && r3.root || r3, a2 = l(s2.model, e3);
    return n2.useMemo(function() {
      var t4 = a2(s2.content);
      return o2.createContentEntry(e3, t4, s2.locale, s2.usePlaceholderContent);
    }, [a2, e3, s2]);
  }, t2.useNestedContentEntry = function(e3, t3) {
    var r3 = n2.useContext(i2.ContentContext), s2 = r3.locale, a2 = r3.content, l2 = void 0 === a2 ? {} : a2, c = r3.usePlaceholderContent, u = n2.useMemo(function() {
      return e3(l2);
    }, [e3, l2]);
    return Array.isArray(u) ? u.map(function(e4) {
      return o2.createContentEntry(t3, e4, s2, c);
    }) : o2.createContentEntry(t3, u, s2, c);
  };
}, 7069: (e2, t2, r2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.QueryableContentModelCollection = t2.ContentContext = t2.defineContents = t2.ContentEntry = t2.useNestedContentEntry = t2.useLocale = t2.useContentEntry = t2.ContentEntrySelector = t2.ContentEntryProvider = void 0;
  var n2 = r2(6763);
  Object.defineProperty(t2, "ContentEntryProvider", { enumerable: true, get: function() {
    return n2.ContentEntryProvider;
  } }), Object.defineProperty(t2, "ContentEntrySelector", { enumerable: true, get: function() {
    return n2.ContentEntrySelector;
  } });
  var i2 = r2(5044);
  Object.defineProperty(t2, "useContentEntry", { enumerable: true, get: function() {
    return i2.useContentEntry;
  } }), Object.defineProperty(t2, "useLocale", { enumerable: true, get: function() {
    return i2.useLocale;
  } }), Object.defineProperty(t2, "useNestedContentEntry", { enumerable: true, get: function() {
    return i2.useNestedContentEntry;
  } });
  var o2 = r2(1336);
  Object.defineProperty(t2, "ContentEntry", { enumerable: true, get: function() {
    return o2.ContentEntry;
  } }), Object.defineProperty(t2, "defineContents", { enumerable: true, get: function() {
    return o2.defineContents;
  } });
  var s = r2(9800);
  Object.defineProperty(t2, "ContentContext", { enumerable: true, get: function() {
    return s.ContentContext;
  } });
  var a = r2(9937);
  Object.defineProperty(t2, "QueryableContentModelCollection", { enumerable: true, get: function() {
    return a.QueryableContentModelCollection;
  } });
}, 2167: function(e2, t2, r2) {
  var n2 = this && this.__values || function(e3) {
    var t3 = "function" == typeof Symbol && Symbol.iterator, r3 = t3 && e3[t3], n3 = 0;
    if (r3) return r3.call(e3);
    if (e3 && "number" == typeof e3.length) return { next: function() {
      return e3 && n3 >= e3.length && (e3 = void 0), { value: e3 && e3[n3++], done: !e3 };
    } };
    throw new TypeError(t3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }, i2 = this && this.__read || function(e3, t3) {
    var r3 = "function" == typeof Symbol && e3[Symbol.iterator];
    if (!r3) return e3;
    var n3, i3, o3 = r3.call(e3), s2 = [];
    try {
      for (; (void 0 === t3 || t3-- > 0) && !(n3 = o3.next()).done; ) s2.push(n3.value);
    } catch (e4) {
      i3 = { error: e4 };
    } finally {
      try {
        n3 && !n3.done && (r3 = o3.return) && r3.call(o3);
      } finally {
        if (i3) throw i3.error;
      }
    }
    return s2;
  }, o2 = this && this.__spreadArray || function(e3, t3) {
    for (var r3 = 0, n3 = t3.length, i3 = e3.length; r3 < n3; r3++, i3++) e3[i3] = t3[r3];
    return e3;
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.generateSelector = t2.selectorGenerator = t2.search = void 0;
  var s = r2(9937);
  function a(e3, t3) {
    return e3 instanceof s.QueryableContentModelCollection ? function(e4, t4) {
      var r3 = [];
      return function e5(o3) {
        var a2, l2;
        try {
          for (var c = n2(o3.models.entries()), u = c.next(); !u.done; u = c.next()) {
            var d = i2(u.value, 2), p = d[0], f = d[1];
            if (r3.push({ name: p.split(":")[0], isArray: f.asArray }), f.model instanceof s.QueryableContentModelCollection) {
              if (e5(f.model)) return true;
            } else if (f.model === t4) return true;
            r3.pop();
          }
        } catch (e6) {
          a2 = { error: e6 };
        } finally {
          try {
            u && !u.done && (l2 = c.return) && l2.call(c);
          } finally {
            if (a2) throw a2.error;
          }
        }
        return false;
      }(e4), r3.length ? r3 : void 0;
    }(e3, t3) : function(e4, t4) {
      if (e4 === t4) return [];
      var r3 = [];
      return function e5(n3) {
        for (var i3 in n3.fields) {
          var o3 = n3.fields[i3], s2 = o3.type;
          if (s2 && "string" != typeof s2) {
            if (r3.push({ name: o3.id, isArray: o3.isArray }), s2 === t4 || e5(s2)) return true;
            r3.pop();
          }
        }
        return false;
      }(e4), r3.length ? r3 : void 0;
    }(e3, t3);
  }
  function l(e3) {
    return function(t3) {
      if ("object" == typeof t3 && !Array.isArray(t3) && t3 && e3) {
        if (0 === e3.length) return t3;
        for (var r3 = t3, n3 = o2([], i2(e3)), s2 = function() {
          var e4 = n3.shift(), t4 = e4.name, i3 = e4.isArray, o3 = r3[t4];
          if (void 0 === o3 || Array.isArray(o3) || i3) {
            if (Array.isArray(o3) && i3) {
              var s3 = l(n3.splice(0, n3.length));
              return { value: o3.map(function(e5) {
                return s3(e5);
              }) };
            }
            return { value: void 0 };
          }
          r3 = o3;
        }; n3.length; ) {
          var a2 = s2();
          if ("object" == typeof a2) return a2.value;
        }
        return r3;
      }
    };
  }
  t2.search = a, t2.selectorGenerator = l, t2.generateSelector = function(e3, t3) {
    return l(a(e3, t3));
  };
}, 903: (e2, t2, r2) => {
  t2.tA = void 0;
  r2(1118), r2(2434), r2(7512), r2(1581), r2(6596);
  const n2 = r2(1581), i2 = r2(6596), o2 = r2(5699), s = r2(2183), a = r2(376), l = r2(2563), c = r2(7583), u = r2(276), d = r2(9050);
  t2.tA = i2.withA11yLabel(n2.buildAccessiblePrice)(o2.Price), i2.withA11yLabel(n2.buildAccessibleFree)(s.FreePrice), i2.withA11yLabel(n2.buildAccessiblePrice)(a.StyledPrice), i2.withA11yLabel(n2.buildAccessiblePrice)(l.InlinePrice), i2.withA11yLabel(n2.buildAccessiblePrice)(c.SpotlightPrice), i2.withA11yLabel(n2.buildAccessiblePrice)(u.SpotlightSmallPrice), i2.withA11yLabel(n2.buildAccessibleStrikethroughPrice)(d.StrikethroughPrice);
}, 6596: function(e2, t2, r2) {
  var n2 = this && this.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.withA11yLabel = void 0;
  const i2 = n2(r2(2261)), o2 = r2(7069), s = r2(2434);
  t2.withA11yLabel = function(e3) {
    return (t3) => {
      const r3 = (r4) => {
        const n3 = o2.useContentEntry(s.PriceContentModel);
        return i2.default.createElement("span", { "aria-label": e3(r4, n3) }, i2.default.createElement(t3, Object.assign({}, r4)));
      };
      return r3.displayName = "withA11yLabel", r3;
    };
  };
}, 1581: function(e2, t2, r2) {
  var n2 = this && this.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.buildAccessibleFree = t2.buildAccessibleStrikethroughPrice = t2.buildAccessibleSinglePrice = t2.buildAccessiblePriceWithAlternative = t2.buildAccessiblePrice = void 0;
  const i2 = r2(7512), o2 = r2(2434), s = r2(1118), a = r2(4113), l = r2(7153), c = r2(291), u = r2(5628), d = n2(r2(9850)), p = " ";
  function f(e3, t3) {
    const { data: r3, options: n3 = {} } = e3, { formatString: o3, perUnit: s2, price: a2, recurrenceTerm: l2 } = r3, { showAlternativePrice: p2 } = n3;
    if (!u.shouldRenderPrice(c.determinePrice(r3), o3)) return "";
    if (u.shouldRenderPriceWithAlternative(a2, p2)) {
      const e4 = i2.AlternativeRecurrenceTermMap[l2], n4 = d.default(r3);
      return n4.recurrenceTerm = e4, n4.perUnit = s2, m(r3, n4, t3);
    }
    return h(r3, t3, (e4, t4) => t4);
  }
  function m(e3, t3, r3) {
    let n3 = h(e3, r3, (e4, t4) => t4);
    return n3 += p + h(t3, r3, a.formatAlternativePriceAriaLabel), n3 = n3.trim(), n3;
  }
  function h(e3, t3, r3) {
    var n3;
    const { perUnit: i3, recurrenceTerm: a2 } = e3;
    let c2 = s.formatPrice(e3);
    const u2 = t3.format(o2.PriceContentModel.recurrenceAriaLabel, { recurrenceTerm: a2 });
    c2 += p + (null != u2 ? u2 : ""), c2 = c2.trim();
    const d2 = t3.format(o2.PriceContentModel.perUnitAriaLabel, { perUnit: i3 });
    return c2 += p + (null != d2 ? d2 : ""), c2 = c2.trim(), c2 += p + (null !== (n3 = l.getTaxInclusivityLabel(e3, t3)) && void 0 !== n3 ? n3 : ""), c2 = c2.trim(), r3(t3, c2);
  }
  t2.buildAccessiblePrice = f, t2.buildAccessiblePriceWithAlternative = m, t2.buildAccessibleSinglePrice = h, t2.buildAccessibleStrikethroughPrice = function(e3, t3) {
    const r3 = f(e3, t3);
    return a.formatStrikethroughPriceAriaLabel(t3, r3);
  }, t2.buildAccessibleFree = function(e3, t3) {
    const r3 = t3.format(o2.PriceContentModel.freeAriaLabel);
    return (null != r3 ? r3 : "").trim();
  };
}, 2183: function(e2, t2, r2) {
  var n2 = this && this.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.FreePrice = void 0;
  const i2 = n2(r2(2261));
  r2(4131);
  const o2 = n2({ priceFreeDisplay: "Free__priceFreeDisplay___3rMUa" }), s = r2(7069), a = r2(2434);
  t2.FreePrice = () => {
    const e3 = s.useContentEntry(a.PriceContentModel).get(a.PriceContentModel.freeLabel);
    return e3 ? i2.default.createElement("div", { className: o2.default.priceFreeDisplay, "data-testid": "free-price-label" }, e3) : null;
  };
}, 2563: function(e2, t2, r2) {
  var n2 = this && this.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.InlinePrice = void 0;
  const i2 = n2(r2(2261));
  r2(6360);
  const o2 = n2({ priceFullDisplay: "InlinePrice__priceFullDisplay___2TTaE", priceTaxInclusivity: "InlinePrice__priceTaxInclusivity___1wUJM" }), s = r2(376);
  t2.InlinePrice = ({ data: e3, options: t3 = {} }) => {
    const r3 = { data: e3, options: Object.assign(Object.assign({}, t3), { defaultStyles: o2.default }) };
    return i2.default.createElement(s.StyledPrice, Object.assign({}, r3));
  };
}, 5699: function(e2, t2, r2) {
  var n2 = this && this.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.Price = void 0;
  const i2 = r2(1118), o2 = r2(7512), s = n2(r2(2261)), a = n2(r2(6914)), l = r2(7069), c = r2(2434), u = r2(7153), d = r2(291), p = r2(5628), f = n2(r2(9850));
  function m(e3) {
    const { currencySymbol: t3, isBeforePrice: r3, styles: n3 } = e3, i3 = "price-currency-symbol-" + (r3 ? "before" : "after");
    return s.default.createElement(a.default, { className: n3.priceCurrencySymbol, html: t3, dataTestId: i3 });
  }
  function h(e3) {
    const { styles: t3 } = e3;
    return s.default.createElement("span", { className: t3.priceCurrencySpace, "data-testid": "price-currency-space" }, "\xA0");
  }
  function g(e3) {
    const { integer: t3, styles: r3 } = e3;
    return s.default.createElement("span", { className: r3.priceInteger, "data-testid": "price-integer" }, t3);
  }
  function y(e3) {
    const { decimalsDelimiter: t3, styles: r3 } = e3;
    return t3 ? s.default.createElement("span", { className: r3.priceDecimalsDelimiter, "data-testid": "price-decimals-delimiter" }, t3) : null;
  }
  function v(e3) {
    const { decimals: t3, styles: r3 } = e3;
    return t3 ? s.default.createElement("span", { className: r3.priceDecimals, "data-testid": "price-decimals" }, t3) : null;
  }
  function b(e3) {
    const { recurrenceTerm: t3, content: r3, styles: n3 } = e3, i3 = r3.format(c.PriceContentModel.recurrenceLabel, { recurrenceTerm: t3 });
    return i3 ? s.default.createElement("span", { className: n3.priceRecurrence, "data-testid": "price-recurrence" }, i3) : null;
  }
  function E(e3) {
    const { perUnit: t3, content: r3, styles: n3 } = e3, i3 = r3.format(c.PriceContentModel.perUnitLabel, { perUnit: t3 });
    return i3 ? s.default.createElement("span", { className: n3.perUnit, "data-testid": "price-unit-type" }, "\xA0", i3) : null;
  }
  function _(e3) {
    const { taxInclusivityLabel: t3, styles: r3 } = e3;
    return t3 ? s.default.createElement(s.default.Fragment, null, s.default.createElement("span", { className: r3.priceTaxInclusivitySpace }, "\xA0"), s.default.createElement("span", { className: r3.priceTaxInclusivity, "data-testid": "price-tax-inclusivity" }, t3)) : null;
  }
  function T(e3) {
    const { price: t3, formatString: r3, recurrenceTerm: n3, perUnit: o3, usePrecision: a2, styles: u2 } = e3, { integer: d2, decimals: p2, decimalsDelimiter: f2 } = i2.getPriceDetails(r3, t3, a2), { currencySymbol: _2, isCurrencyFirst: T2, hasCurrencySpace: S2 } = i2.getCurrencySymbolDetails(r3), P2 = l.useContentEntry(c.PriceContentModel);
    return s.default.createElement(s.default.Fragment, null, T2 && s.default.createElement(m, Object.assign({ isBeforePrice: true }, { currencySymbol: _2, styles: u2 })), T2 && S2 && s.default.createElement(h, Object.assign({}, { styles: u2 })), s.default.createElement(g, Object.assign({}, { integer: d2, styles: u2 })), s.default.createElement(y, Object.assign({}, { decimalsDelimiter: f2, styles: u2 })), s.default.createElement(v, Object.assign({}, { decimals: p2, styles: u2 })), !T2 && S2 && s.default.createElement(h, Object.assign({}, { styles: u2 })), !T2 && s.default.createElement(m, Object.assign({ isBeforePrice: false }, { currencySymbol: _2, styles: u2 })), s.default.createElement(b, Object.assign({}, { recurrenceTerm: n3, content: P2, styles: u2 })), o3 && s.default.createElement(E, Object.assign({}, { perUnit: o3, content: P2, styles: u2 })));
  }
  function S(e3) {
    const { price: t3, formatString: r3, recurrenceTerm: n3, perUnit: i3, taxInclusivityLabel: o3, usePrecision: a2, styles: l2 } = e3;
    return s.default.createElement("div", { className: l2.priceFullDisplay, "data-testid": "price-full-display" }, s.default.createElement(T, Object.assign({}, { price: t3, formatString: r3, recurrenceTerm: n3, perUnit: i3, usePrecision: a2, styles: l2 })), s.default.createElement(_, Object.assign({}, { taxInclusivityLabel: o3, styles: l2 })));
  }
  function P(e3) {
    const { price: t3, alternativePrice: r3, formatString: n3, recurrenceTerm: i3, perUnit: o3, alternativeRecurrenceTerm: a2, taxInclusivityLabel: l2, usePrecision: c2, styles: u2 } = e3, d2 = { price: r3, formatString: n3, recurrenceTerm: a2, perUnit: o3, usePrecision: c2, styles: {} };
    return s.default.createElement("div", { className: `${u2.priceFullDisplay}${l2 && u2.priceWithTaxTerm ? ` ${u2.priceWithTaxTerm}` : ""}`, "data-testid": "price-full-display" }, s.default.createElement("span", { className: u2.priceMainPrice, "data-testid": "price-main-price" }, s.default.createElement(T, Object.assign({}, { price: t3, formatString: n3, recurrenceTerm: i3, perUnit: o3, usePrecision: c2, styles: u2 })), s.default.createElement(_, Object.assign({}, { taxInclusivityLabel: l2, styles: u2 }))), " ", s.default.createElement("span", { className: u2.priceAltPrice, "data-testid": "price-alt-price" }, "(", s.default.createElement(T, Object.assign({}, d2)), !l2 && ")", l2 && s.default.createElement("span", { className: u2.priceAltTaxInclusivity, "data-testid": "price-alt-tax-inclusivity" }, s.default.createElement(_, Object.assign({}, { taxInclusivityLabel: l2, styles: u2 })), ")")));
  }
  t2.Price = ({ data: e3, options: t3 = {} }) => {
    const { price: r3, formatString: n3, recurrenceTerm: i3, perUnit: a2 } = e3, { usePrecision: m2, showAlternativePrice: h2, styles: g2 = {} } = t3, y2 = l.useContentEntry(c.PriceContentModel), v2 = u.getTaxInclusivityLabel(e3, y2), b2 = d.determinePrice(e3);
    if (!p.shouldRenderPrice(b2, n3)) return null;
    if (p.shouldRenderPriceWithAlternative(r3, h2)) {
      const t4 = o2.AlternativeRecurrenceTermMap[i3], r4 = f.default(e3);
      r4.recurrenceTerm = t4;
      const l2 = d.determinePrice(r4);
      if (void 0 !== l2) return s.default.createElement(P, Object.assign({}, { price: b2, alternativePrice: l2, formatString: n3, recurrenceTerm: i3, perUnit: a2, alternativeRecurrenceTerm: t4, taxInclusivityLabel: v2, usePrecision: m2, styles: g2 }));
    }
    return s.default.createElement(S, Object.assign({}, { price: b2, formatString: n3, recurrenceTerm: i3, perUnit: a2, taxInclusivityLabel: v2, usePrecision: m2, styles: g2 }));
  };
}, 7583: function(e2, t2, r2) {
  var n2 = this && this.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.SpotlightPrice = void 0;
  const i2 = n2(r2(2261)), o2 = r2(376);
  r2(9078);
  const s = n2({ priceFullDisplay: "SpotlightPrice__priceFullDisplay___mNdAk", priceTaxInclusivity: "SpotlightPrice__priceTaxInclusivity___3hKPg", priceCurrencySymbol: "SpotlightPrice__priceCurrencySymbol___1CBgM", priceDecimals: "SpotlightPrice__priceDecimals___2IXPO", priceDecimalsDelimiter: "SpotlightPrice__priceDecimalsDelimiter___L0_N9", priceInteger: "SpotlightPrice__priceInteger___2BTZq", priceAltPrice: "SpotlightPrice__priceAltPrice___1ONMu", priceWithTaxTerm: "SpotlightPrice__priceWithTaxTerm___HrBnm" });
  t2.SpotlightPrice = ({ data: e3, options: t3 = {} }) => {
    const r3 = { data: e3, options: Object.assign(Object.assign({}, t3), { defaultStyles: s.default }) };
    return i2.default.createElement(o2.StyledPrice, Object.assign({}, r3));
  };
}, 276: function(e2, t2, r2) {
  var n2 = this && this.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.SpotlightSmallPrice = void 0;
  const i2 = n2(r2(2261)), o2 = r2(376);
  r2(3224);
  const s = n2({ priceFullDisplay: "SpotlightSmallPrice__priceFullDisplay___1dcS4", priceCurrencySymbol: "SpotlightSmallPrice__priceCurrencySymbol___1jKFo", priceDecimals: "SpotlightSmallPrice__priceDecimals___3Nv_a", priceDecimalsDelimiter: "SpotlightSmallPrice__priceDecimalsDelimiter___3838X", priceInteger: "SpotlightSmallPrice__priceInteger___3lcEs", priceTaxInclusivitySpace: "SpotlightSmallPrice__priceTaxInclusivitySpace___1suAW", priceTaxInclusivity: "SpotlightSmallPrice__priceTaxInclusivity___2YGAx", priceAltTaxInclusivity: "SpotlightSmallPrice__priceAltTaxInclusivity___1Dn8o", priceAltPrice: "SpotlightSmallPrice__priceAltPrice___3xCjI" });
  t2.SpotlightSmallPrice = ({ data: e3, options: t3 = {} }) => {
    const r3 = { data: e3, options: Object.assign(Object.assign({}, t3), { defaultStyles: s.default }) };
    return i2.default.createElement(o2.StyledPrice, Object.assign({}, r3));
  };
}, 9050: function(e2, t2, r2) {
  var n2 = this && this.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.StrikethroughPrice = void 0;
  const i2 = n2(r2(2261)), o2 = r2(376);
  r2(1598);
  const s = n2({ priceFullDisplay: "StrikethroughPrice__priceFullDisplay___37itX", priceTaxInclusivity: "StrikethroughPrice__priceTaxInclusivity___MZvpQ" });
  t2.StrikethroughPrice = ({ data: e3, options: t3 = {} }) => {
    const r3 = { data: e3, options: Object.assign(Object.assign({}, t3), { defaultStyles: s.default }) };
    return i2.default.createElement(o2.StyledPrice, Object.assign({}, r3));
  };
}, 376: function(e2, t2, r2) {
  var n2 = this && this.__rest || function(e3, t3) {
    var r3 = {};
    for (var n3 in e3) Object.prototype.hasOwnProperty.call(e3, n3) && t3.indexOf(n3) < 0 && (r3[n3] = e3[n3]);
    if (null != e3 && "function" == typeof Object.getOwnPropertySymbols) {
      var i3 = 0;
      for (n3 = Object.getOwnPropertySymbols(e3); i3 < n3.length; i3++) t3.indexOf(n3[i3]) < 0 && Object.prototype.propertyIsEnumerable.call(e3, n3[i3]) && (r3[n3[i3]] = e3[n3[i3]]);
    }
    return r3;
  }, i2 = this && this.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.StyledPrice = void 0;
  const o2 = r2(5699), s = i2(r2(2261));
  t2.StyledPrice = ({ data: e3, options: t3 = {} }) => {
    const { defaultStyles: r3 } = t3, i3 = n2(t3, ["defaultStyles"]);
    i3.styles = function(e4 = {}, t4 = {}) {
      const r4 = {};
      return Object.keys({ priceFullDisplay: "", priceCurrencySymbol: "", priceCurrencySpace: "", priceInteger: "", priceDecimalsDelimiter: "", priceDecimals: "", priceRecurrence: "", priceTaxInclusivitySpace: "", perUnit: "", priceTaxInclusivity: "", priceAltPrice: "", priceAltTaxInclusivity: "", priceMainPrice: "", priceWithTaxTerm: "" }).forEach((n3) => {
        e4[n3] && t4[n3] ? r4[n3] = `${e4[n3]} ${t4[n3]}` : e4[n3] ? r4[n3] = e4[n3] : t4[n3] && (r4[n3] = t4[n3]);
      }), r4;
    }(r3, t3.styles);
    const a = { data: e3, options: i3 };
    return s.default.createElement(o2.Price, Object.assign({}, a));
  };
}, 2434: (e2, t2, r2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.PriceContentModel = void 0;
  const n2 = r2(7069);
  t2.PriceContentModel = n2.defineContents("main", { recurrenceLabel: { id: "recurrenceLabel", type: "string", placeholderContent: "{recurrenceTerm, select, MONTH {/mo} YEAR {/yr} other {}}" }, recurrenceAriaLabel: { id: "recurrenceAriaLabel", type: "string", placeholderContent: "{recurrenceTerm, select, MONTH {per month} YEAR {per year} other {}}" }, perUnitLabel: { id: "perUnitLabel", type: "string", placeholderContent: "{perUnit, select, LICENSE {per license} other {}}" }, perUnitAriaLabel: { id: "perUnitAriaLabel", type: "string", placeholderContent: "{perUnit, select, LICENSE {per license} other {}}" }, freeLabel: { id: "freeLabel", type: "string", placeholderContent: "Free" }, freeAriaLabel: { id: "freeAriaLabel", type: "string", placeholderContent: "Free" }, taxExclusiveLabel: { id: "taxExclusiveLabel", type: "string", placeholderContent: "{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} other {}}" }, taxInclusiveLabel: { id: "taxInclusiveLabel", type: "string", placeholderContent: "{taxTerm, select, GST {incl. GST} VAT {incl. VAT} TAX {incl. tax} other {}}" }, alternativePriceAriaLabel: { id: "alternativePriceAriaLabel", type: "string", placeholderContent: "Alternatively at {alternativePrice}" }, strikethroughAriaLabel: { id: "strikethroughAriaLabel", type: "string", placeholderContent: "Regularly at {strikethroughPrice}" } });
}, 8915: (e2, t2, r2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.toComputedPrice = void 0;
  const n2 = r2(1477);
  t2.toComputedPrice = function(e3) {
    return n2.instanceOfComputedPrice(e3) ? e3 : n2.instanceOfComputedDeltaPrice(e3) ? { perMonthWithTax: e3.monthlyDeltaWithTax, perMonthWithoutTax: e3.monthlyDeltaWithoutTax, perYearWithTax: e3.annualDeltaWithTax, perYearWithoutTax: e3.annualDeltaWithoutTax } : void 0;
  };
}, 1477: (e2, t2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.instanceOfComputedDeltaPrice = t2.instanceOfComputedPrice = void 0, t2.instanceOfComputedPrice = function(e3) {
    return !!e3 && ("perMonthWithTax" in e3 || "perMonthWithoutTax" in e3 || "perYearWithTax" in e3 || "perYearWithoutTax" in e3);
  }, t2.instanceOfComputedDeltaPrice = function(e3) {
    return !!e3 && ("monthlyDeltaWithTax" in e3 || "monthlyDeltaWithoutTax" in e3 || "annualDeltaWithTax" in e3 || "annualDeltaWithoutTax" in e3);
  };
}, 7512: (e2, t2) => {
  var r2;
  Object.defineProperty(t2, "__esModule", { value: true }), t2.AlternativeRecurrenceTermMap = t2.UnitType = t2.RecurrenceTerm = void 0, function(e3) {
    e3.MONTH = "MONTH", e3.YEAR = "YEAR";
  }(r2 = t2.RecurrenceTerm || (t2.RecurrenceTerm = {})), (t2.UnitType || (t2.UnitType = {})).LICENSE = "LICENSE", t2.AlternativeRecurrenceTermMap = { [r2.MONTH]: r2.YEAR, [r2.YEAR]: r2.MONTH };
}, 1899: (e2, t2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.currencyIsFirstChar = t2.getPossibleDecimalsDelimiter = t2.findDecimalsDelimiter = t2.extractNumberMask = t2.findCurrencySymbol = void 0, t2.findCurrencySymbol = (e3) => {
    const t3 = e3.match(/'(.*?)'/);
    return t3 && t3[1] || "";
  }, t2.extractNumberMask = (e3, r2 = true) => {
    let n2 = e3.replace(/'.*?'/, "").trim();
    const i2 = t2.findDecimalsDelimiter(n2);
    return i2 ? r2 || (n2 = n2.replace(/[,\.]0+/, i2)) : n2 = n2.replace(/\s?(#.*0)(?!\s)?/, "$&" + t2.getPossibleDecimalsDelimiter(e3)), n2;
  }, t2.findDecimalsDelimiter = (e3) => {
    const t3 = e3.match(/0(.?)0/);
    return t3 && t3[1] || "";
  }, t2.getPossibleDecimalsDelimiter = (e3) => {
    const t3 = e3.match(/#(.?)#/);
    return "." === (t3 && t3[1]) ? "," : ".";
  }, t2.currencyIsFirstChar = (e3, t3) => 0 === e3.indexOf(`'${t3}'`);
}, 291: (e2, t2, r2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.determinePrice = void 0;
  const n2 = r2(1118);
  t2.determinePrice = function(e3) {
    const { price: t3, recurrenceTerm: r3, isTaxInclusive: i2 } = e3;
    return "number" == typeof t3 || void 0 === t3 ? t3 : n2.getPriceFromComputedPrice(t3, r3, i2);
  };
}, 4113: (e2, t2, r2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.formatTaxInclusivityLabel = t2.formatAlternativePriceAriaLabel = t2.formatStrikethroughPriceAriaLabel = void 0;
  const n2 = r2(2434);
  t2.formatStrikethroughPriceAriaLabel = function(e3, t3) {
    return e3.format(n2.PriceContentModel.strikethroughAriaLabel, { strikethroughPrice: t3 });
  }, t2.formatAlternativePriceAriaLabel = function(e3, t3) {
    return e3.format(n2.PriceContentModel.alternativePriceAriaLabel, { alternativePrice: t3 });
  }, t2.formatTaxInclusivityLabel = function(e3, t3, r3) {
    const i2 = e3 ? n2.PriceContentModel.taxInclusiveLabel : n2.PriceContentModel.taxExclusiveLabel;
    return r3.format(i2, { taxTerm: t3 });
  };
}, 5628: (e2, t2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.shouldRenderPriceWithAlternative = t2.shouldRenderPrice = void 0, t2.shouldRenderPrice = function(e3, t3) {
    return void 0 !== e3 && void 0 !== t3;
  }, t2.shouldRenderPriceWithAlternative = function(e3, t3) {
    return e3 && "number" != typeof e3 && t3;
  };
}, 7153: (e2, t2, r2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.getTaxInclusivityLabel = void 0;
  const n2 = r2(4113);
  t2.getTaxInclusivityLabel = function(e3, t3) {
    const { isTaxInclusive: r3, taxTerm: i2 } = e3;
    return function(e4) {
      const { isTaxInclusive: t4, taxTerm: r4 } = e4;
      return !!r4 && "boolean" == typeof t4;
    }(e3) ? n2.formatTaxInclusivityLabel(r3, i2, t3) : void 0;
  };
}, 1118: function(e2, t2, r2) {
  var n2 = this && this.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(t2, "__esModule", { value: true }), t2.formatPrice = t2.getCurrencySymbolDetails = t2.getPriceDetails = t2.getPriceFromComputedPrice = void 0;
  const i2 = n2(r2(9791)), o2 = r2(7512), s = r2(1899), a = r2(8915);
  t2.getPriceFromComputedPrice = (e3, t3, r3) => {
    if (!e3) return;
    const { perMonthWithTax: n3, perMonthWithoutTax: i3, perYearWithTax: s2, perYearWithoutTax: l2 } = a.toComputedPrice(e3);
    switch (t3) {
      case o2.RecurrenceTerm.MONTH:
        return r3 ? n3 : i3;
      case o2.RecurrenceTerm.YEAR:
        return r3 ? s2 : l2;
      default:
        return;
    }
  }, t2.getPriceDetails = (e3, t3, r3 = true) => {
    const n3 = s.extractNumberMask(e3, r3), o3 = i2.default(n3, t3).toString(), a2 = r3 ? s.findDecimalsDelimiter(e3) : "", l2 = r3 ? o3.lastIndexOf(a2) : o3.length;
    return { integer: o3.substring(0, l2), decimals: o3.substring(l2 + 1), decimalsDelimiter: a2 };
  }, t2.getCurrencySymbolDetails = (e3) => {
    const t3 = s.findCurrencySymbol(e3), r3 = s.currencyIsFirstChar(e3, t3), n3 = e3.replace(/'.*?'/, "");
    return { currencySymbol: t3, isCurrencyFirst: r3, hasCurrencySpace: /^\s|\s$/.test(n3) };
  }, t2.formatPrice = (e3) => {
    if (!e3) return "";
    let r3;
    const { formatString: n3, usePrecision: o3 } = e3;
    if ("number" == typeof e3.price) r3 = e3.price;
    else {
      const { price: n4, recurrenceTerm: i3, isTaxInclusive: o4 } = e3;
      r3 = t2.getPriceFromComputedPrice(n4, i3, o4);
    }
    if (!n3) return String(r3);
    const a2 = s.findCurrencySymbol(n3), c = s.extractNumberMask(n3, o3), u = i2.default(c, r3);
    return l(n3, u, a2);
  };
  const l = (e3, t3, r3) => e3.replace(/'.*?'/, "SYMBOL").replace(/#.*0/, t3).replace(/SYMBOL/, r3);
}, 6914: (e2, t2, r2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e3) {
    return n2.default.createElement(o2.default, Object.assign({}, e3, { sanitizer: i2.default }));
  };
  var n2 = s(r2(2261)), i2 = s(r2(5368)), o2 = s(r2(9925));
  function s(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  }
}, 9925: (e2, t2, r2) => {
  Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  t2.default = ({ html: e3, useDiv: t3, dataTestId: r3, className: n3, options: o2, sanitizer: s }) => {
    const a = s.sanitize(e3, o2);
    return t3 ? i2.default.createElement("div", { className: n3, dangerouslySetInnerHTML: { __html: a }, "data-testid": r3 }) : i2.default.createElement("span", { className: n3, dangerouslySetInnerHTML: { __html: a }, "data-testid": r3 });
  };
}, 9631: (e2, t2, r2) => {
  t2.R = s;
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign || function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
  function s(e3) {
    var t3 = e3.scale, r3 = void 0 === t3 ? "M" : t3, n3 = function(e4, t4) {
      if (null == e4) return {};
      var r4, n4, i3 = function(e5, t5) {
        if (null == e5) return {};
        var r5, n5, i4 = {}, o4 = Object.keys(e5);
        for (n5 = 0; n5 < o4.length; n5++) r5 = o4[n5], t5.indexOf(r5) >= 0 || (i4[r5] = e5[r5]);
        return i4;
      }(e4, t4);
      if (Object.getOwnPropertySymbols) {
        var o3 = Object.getOwnPropertySymbols(e4);
        for (n4 = 0; n4 < o3.length; n4++) r4 = o3[n4], t4.indexOf(r4) >= 0 || Object.prototype.propertyIsEnumerable.call(e4, r4) && (i3[r4] = e4[r4]);
      }
      return i3;
    }(e3, ["scale"]);
    return i2.default.createElement("svg", o2({}, n3, n3), "L" === r3 && i2.default.createElement("path", { d: "M10.563 2.206l-9.249 16.55a.5.5 0 0 0 .436.744h18.5a.5.5 0 0 0 .436-.744l-9.251-16.55a.5.5 0 0 0-.872 0zm1.436 15.044a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-1.5a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25zm0-3.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-6a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25z" }), "M" === r3 && i2.default.createElement("path", { d: "M8.564 1.289L.2 16.256A.5.5 0 0 0 .636 17h16.728a.5.5 0 0 0 .436-.744L9.436 1.289a.5.5 0 0 0-.872 0zM10 14.75a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-1.5a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25zm0-3a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-6a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25z" }));
  }
  s.displayName = "AlertMedium";
}, 7911: (e2, t2, r2) => {
  t2.d = s;
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign || function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
  function s(e3) {
    var t3 = e3.scale, r3 = void 0 === t3 ? "M" : t3, n3 = function(e4, t4) {
      if (null == e4) return {};
      var r4, n4, i3 = function(e5, t5) {
        if (null == e5) return {};
        var r5, n5, i4 = {}, o4 = Object.keys(e5);
        for (n5 = 0; n5 < o4.length; n5++) r5 = o4[n5], t5.indexOf(r5) >= 0 || (i4[r5] = e5[r5]);
        return i4;
      }(e4, t4);
      if (Object.getOwnPropertySymbols) {
        var o3 = Object.getOwnPropertySymbols(e4);
        for (n4 = 0; n4 < o3.length; n4++) r4 = o3[n4], t4.indexOf(r4) >= 0 || Object.prototype.propertyIsEnumerable.call(e4, r4) && (i3[r4] = e4[r4]);
      }
      return i3;
    }(e3, ["scale"]);
    return i2.default.createElement("svg", o2({}, n3, n3), "L" === r3 && i2.default.createElement("path", { d: "M7.867 7.872c.061.062.103.145 0 .228l-1.283.827c-.104.061-.145.02-.186-.083L4.804 6.07l-2.09 2.297c-.021.042-.083.083-.145 0l-.994-1.035c-.103-.062-.082-.124 0-.186l2.36-1.966-2.691-1.014c-.042 0-.104-.083-.062-.186l.703-1.41a.11.11 0 0 1 .187-.04L4.43 4.06l.145-3.02A.109.109 0 0 1 4.7.917l1.718.227c.104 0 .124.042.104.145l-.808 2.96 2.734-.828c.061-.042.124-.042.165.082l.27 1.532c.02.103 0 .145-.084.145l-2.856.227z" }), "M" === r3 && i2.default.createElement("path", { d: "M6.573 6.558c.056.055.092.13 0 .204l-1.148.74c-.093.056-.13.02-.167-.073L3.832 4.947l-1.87 2.055c-.02.037-.075.074-.13 0l-.889-.926c-.092-.055-.074-.111 0-.167l2.111-1.76-2.408-.906c-.037 0-.092-.074-.055-.167l.63-1.259a.097.097 0 0 1 .166-.036l2.111 1.37.13-2.704a.097.097 0 0 1 .111-.11L5.277.54c.092 0 .11.037.092.13l-.722 2.647 2.444-.74c.056-.038.111-.038.148.073l.241 1.37c.019.093 0 .13-.074.13l-2.556.204z" }));
  }
  s.displayName = "Asterisk";
}, 2367: (e2, t2, r2) => {
  t2.p = s;
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign || function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
  function s(e3) {
    var t3 = e3.scale, r3 = void 0 === t3 ? "M" : t3, n3 = function(e4, t4) {
      if (null == e4) return {};
      var r4, n4, i3 = function(e5, t5) {
        if (null == e5) return {};
        var r5, n5, i4 = {}, o4 = Object.keys(e5);
        for (n5 = 0; n5 < o4.length; n5++) r5 = o4[n5], t5.indexOf(r5) >= 0 || (i4[r5] = e5[r5]);
        return i4;
      }(e4, t4);
      if (Object.getOwnPropertySymbols) {
        var o3 = Object.getOwnPropertySymbols(e4);
        for (n4 = 0; n4 < o3.length; n4++) r4 = o3[n4], t4.indexOf(r4) >= 0 || Object.prototype.propertyIsEnumerable.call(e4, r4) && (i3[r4] = e4[r4]);
      }
      return i3;
    }(e3, ["scale"]);
    return i2.default.createElement("svg", o2({}, n3, n3), "L" === r3 && i2.default.createElement("path", { d: "M6 14a1 1 0 0 1-.789-.385l-4-5a1 1 0 1 1 1.577-1.23L6 11.376l7.213-8.99a1 1 0 1 1 1.576 1.23l-8 10a1 1 0 0 1-.789.384z" }), "M" === r3 && i2.default.createElement("path", { d: "M4.5 10a1.022 1.022 0 0 1-.799-.384l-2.488-3a1 1 0 0 1 1.576-1.233L4.5 7.376l4.712-5.991a1 1 0 1 1 1.576 1.23l-5.51 7A.978.978 0 0 1 4.5 10z" }));
  }
  s.displayName = "CheckmarkMedium";
}, 863: (e2, t2, r2) => {
  t2.K = s;
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign || function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
  function s(e3) {
    var t3 = e3.scale, r3 = void 0 === t3 ? "M" : t3, n3 = function(e4, t4) {
      if (null == e4) return {};
      var r4, n4, i3 = function(e5, t5) {
        if (null == e5) return {};
        var r5, n5, i4 = {}, o4 = Object.keys(e5);
        for (n5 = 0; n5 < o4.length; n5++) r5 = o4[n5], t5.indexOf(r5) >= 0 || (i4[r5] = e5[r5]);
        return i4;
      }(e4, t4);
      if (Object.getOwnPropertySymbols) {
        var o3 = Object.getOwnPropertySymbols(e4);
        for (n4 = 0; n4 < o3.length; n4++) r4 = o3[n4], t4.indexOf(r4) >= 0 || Object.prototype.propertyIsEnumerable.call(e4, r4) && (i3[r4] = e4[r4]);
      }
      return i3;
    }(e3, ["scale"]);
    return i2.default.createElement("svg", o2({}, n3, n3), "L" === r3 && i2.default.createElement("path", { d: "M4.5 11a.999.999 0 0 1-.788-.385l-3-4a1 1 0 1 1 1.576-1.23L4.5 8.376l5.212-6.99a1 1 0 1 1 1.576 1.23l-6 8A.999.999 0 0 1 4.5 11z" }), "M" === r3 && i2.default.createElement("path", { d: "M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1 1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712 6A.999.999 0 0 1 3.788 9z" }));
  }
  s.displayName = "CheckmarkSmall";
}, 3043: (e2, t2, r2) => {
  t2.F = s;
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign || function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
  function s(e3) {
    var t3 = e3.scale, r3 = void 0 === t3 ? "M" : t3, n3 = function(e4, t4) {
      if (null == e4) return {};
      var r4, n4, i3 = function(e5, t5) {
        if (null == e5) return {};
        var r5, n5, i4 = {}, o4 = Object.keys(e5);
        for (n5 = 0; n5 < o4.length; n5++) r5 = o4[n5], t5.indexOf(r5) >= 0 || (i4[r5] = e5[r5]);
        return i4;
      }(e4, t4);
      if (Object.getOwnPropertySymbols) {
        var o3 = Object.getOwnPropertySymbols(e4);
        for (n4 = 0; n4 < o3.length; n4++) r4 = o3[n4], t4.indexOf(r4) >= 0 || Object.prototype.propertyIsEnumerable.call(e4, r4) && (i3[r4] = e4[r4]);
      }
      return i3;
    }(e3, ["scale"]);
    return i2.default.createElement("svg", o2({}, n3, n3), "L" === r3 && i2.default.createElement("path", { d: "M11.99 1.51a1 1 0 0 0-1.707-.707L6 5.086 1.717.803A1 1 0 1 0 .303 2.217l4.99 4.99a1 1 0 0 0 1.414 0l4.99-4.99a.997.997 0 0 0 .293-.707z" }), "M" === r3 && i2.default.createElement("path", { d: "M9.99 1.01A1 1 0 0 0 8.283.303L5 3.586 1.717.303A1 1 0 1 0 .303 1.717l3.99 3.98a1 1 0 0 0 1.414 0l3.99-3.98a.997.997 0 0 0 .293-.707z" }));
  }
  s.displayName = "ChevronDownMedium";
}, 6240: (e2, t2, r2) => {
  t2.B = s;
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign || function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
  function s(e3) {
    var t3 = e3.scale, r3 = void 0 === t3 ? "M" : t3, n3 = function(e4, t4) {
      if (null == e4) return {};
      var r4, n4, i3 = function(e5, t5) {
        if (null == e5) return {};
        var r5, n5, i4 = {}, o4 = Object.keys(e5);
        for (n5 = 0; n5 < o4.length; n5++) r5 = o4[n5], t5.indexOf(r5) >= 0 || (i4[r5] = e5[r5]);
        return i4;
      }(e4, t4);
      if (Object.getOwnPropertySymbols) {
        var o3 = Object.getOwnPropertySymbols(e4);
        for (n4 = 0; n4 < o3.length; n4++) r4 = o3[n4], t4.indexOf(r4) >= 0 || Object.prototype.propertyIsEnumerable.call(e4, r4) && (i3[r4] = e4[r4]);
      }
      return i3;
    }(e3, ["scale"]);
    return i2.default.createElement("svg", o2({}, n3, n3), "L" === r3 && i2.default.createElement("path", { d: "M5.74.01a.25.25 0 0 0-.177.073l-5.48 5.48a.25.25 0 0 0 .177.427h5.48a.25.25 0 0 0 .25-.25V.26a.25.25 0 0 0-.25-.25z" }), "M" === r3 && i2.default.createElement("path", { d: "M4.74.01a.25.25 0 0 0-.177.073l-4.48 4.48a.25.25 0 0 0 .177.427h4.48a.25.25 0 0 0 .25-.25V.26a.25.25 0 0 0-.25-.25z" }));
  }
  s.displayName = "CornerTriangle";
}, 4509: (e2, t2, r2) => {
  t2.U = s;
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign || function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
  function s(e3) {
    var t3 = e3.scale, r3 = void 0 === t3 ? "M" : t3, n3 = function(e4, t4) {
      if (null == e4) return {};
      var r4, n4, i3 = function(e5, t5) {
        if (null == e5) return {};
        var r5, n5, i4 = {}, o4 = Object.keys(e5);
        for (n5 = 0; n5 < o4.length; n5++) r5 = o4[n5], t5.indexOf(r5) >= 0 || (i4[r5] = e5[r5]);
        return i4;
      }(e4, t4);
      if (Object.getOwnPropertySymbols) {
        var o3 = Object.getOwnPropertySymbols(e4);
        for (n4 = 0; n4 < o3.length; n4++) r4 = o3[n4], t4.indexOf(r4) >= 0 || Object.prototype.propertyIsEnumerable.call(e4, r4) && (i3[r4] = e4[r4]);
      }
      return i3;
    }(e3, ["scale"]);
    return i2.default.createElement("svg", o2({}, n3, n3), "L" === r3 && i2.default.createElement("path", { d: "M15.697 14.283L9.414 8l6.283-6.283A1 1 0 1 0 14.283.303L8 6.586 1.717.303A1 1 0 1 0 .303 1.717L6.586 8 .303 14.283a1 1 0 1 0 1.414 1.414L8 9.414l6.283 6.283a1 1 0 1 0 1.414-1.414z" }), "M" === r3 && i2.default.createElement("path", { d: "M11.697 10.283L7.414 6l4.283-4.283A1 1 0 1 0 10.283.303L6 4.586 1.717.303A1 1 0 1 0 .303 1.717L4.586 6 .303 10.283a1 1 0 1 0 1.414 1.414L6 7.414l4.283 4.283a1 1 0 1 0 1.414-1.414z" }));
  }
  s.displayName = "CrossLarge";
}, 6692: (e2, t2, r2) => {
  t2.z = s;
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign || function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
  function s(e3) {
    var t3 = e3.scale, r3 = void 0 === t3 ? "M" : t3, n3 = function(e4, t4) {
      if (null == e4) return {};
      var r4, n4, i3 = function(e5, t5) {
        if (null == e5) return {};
        var r5, n5, i4 = {}, o4 = Object.keys(e5);
        for (n5 = 0; n5 < o4.length; n5++) r5 = o4[n5], t5.indexOf(r5) >= 0 || (i4[r5] = e5[r5]);
        return i4;
      }(e4, t4);
      if (Object.getOwnPropertySymbols) {
        var o3 = Object.getOwnPropertySymbols(e4);
        for (n4 = 0; n4 < o3.length; n4++) r4 = o3[n4], t4.indexOf(r4) >= 0 || Object.prototype.propertyIsEnumerable.call(e4, r4) && (i3[r4] = e4[r4]);
      }
      return i3;
    }(e3, ["scale"]);
    return i2.default.createElement("svg", o2({}, n3, n3), "L" === r3 && i2.default.createElement("path", { d: "M10.99 5H1.01a1 1 0 0 0 0 2h9.98a1 1 0 1 0 0-2z" }), "M" === r3 && i2.default.createElement("path", { d: "M8 4H2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z" }));
  }
  s.displayName = "DashSmall";
}, 7213: (e2, t2, r2) => {
  t2.n = function(e3) {
    var t3 = o2({}, e3);
    return i2.default.createElement("svg", o2({ viewBox: "0 0 36 36" }, t3, t3), i2.default.createElement("path", { fillRule: "evenodd", d: "M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2ZM30,18a11.943,11.943,0,0,1-2.219,6.953L11.047,8.219A12,12,0,0,1,30,18ZM6,18a11.945,11.945,0,0,1,2.219-6.953L24.953,27.782A12,12,0,0,1,6,18Z" }));
  };
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign ? Object.assign.bind() : function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
}, 7616: (e2, t2, r2) => {
  t2.s = function(e3) {
    var t3 = o2({}, e3);
    return i2.default.createElement("svg", o2({ viewBox: "0 0 36 36" }, t3, t3), i2.default.createElement("path", { fillRule: "evenodd", d: "M6,18v0a1.988,1.988,0,0,0,.585,1.409l7.983,7.98a2,2,0,1,0,2.871-2.772l-.049-.049L10.819,18l6.572-6.57a2,2,0,0,0-2.773-2.87l-.049.049-7.983,7.98A1.988,1.988,0,0,0,6,18Z" }), i2.default.createElement("path", { fillRule: "evenodd", d: "M18,18v0a1.988,1.988,0,0,0,.585,1.409l7.983,7.98a2,2,0,1,0,2.871-2.772l-.049-.049L22.819,18l6.572-6.57a2,2,0,0,0-2.773-2.87l-.049.049-7.983,7.98A1.988,1.988,0,0,0,18,18Z", "data-name": "S_MillerColumnsChevronPrevious" }));
  };
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign ? Object.assign.bind() : function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
}, 2730: (e2, t2, r2) => {
  t2.g = function(e3) {
    var t3 = o2({}, e3);
    return i2.default.createElement("svg", o2({ viewBox: "0 0 36 36" }, t3, t3), i2.default.createElement("path", { fillRule: "evenodd", d: "M30,18v0a1.988,1.988,0,0,1-.585,1.409l-7.983,7.98a2,2,0,1,1-2.871-2.772l.049-.049L25.181,18l-6.572-6.57a2,2,0,0,1,2.773-2.87l.049.049,7.983,7.98A1.988,1.988,0,0,1,30,18Z" }), i2.default.createElement("path", { fillRule: "evenodd", d: "M18,18v0a1.988,1.988,0,0,1-.585,1.409l-7.983,7.98A2,2,0,1,1,6.56,24.619l.049-.049L13.181,18,6.609,11.43A2,2,0,0,1,9.383,8.56l.049.049,7.983,7.98A1.988,1.988,0,0,1,18,18Z", "data-name": "S_MillerColumnsChevronPrevious" }));
  };
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign ? Object.assign.bind() : function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
}, 8014: (e2, t2, r2) => {
  t2.o = function(e3) {
    var t3 = o2({}, e3);
    return i2.default.createElement("svg", o2({ viewBox: "0 0 36 36" }, t3, t3), i2.default.createElement("path", { fillRule: "evenodd", d: "M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm9.7,11.918L16.449,25.167a.732.732,0,0,1-.309.185c-1.076.323-7.141,2.436-7.347,2.483-.014,0-.045,0-.045,0-.241,0-.668-.353-.583-.633l2.482-7.342a.738.738,0,0,1,.187-.313L22.082,8.3a1.019,1.019,0,0,1,.69-.3H22.8a.905.905,0,0,1,.645.263l4.292,4.292a.911.911,0,0,1,.261.706A1.022,1.022,0,0,1,27.7,13.918Z" }), i2.default.createElement("path", { fillRule: "evenodd", d: "M10.822,25.184c1.025-.306,2.814-1.059,4-1.416L12.23,21.183Z" }));
  };
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign ? Object.assign.bind() : function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
}, 5445: (e2, t2, r2) => {
  t2.T = function(e3) {
    var t3 = o2({}, e3);
    return i2.default.createElement("svg", o2({ viewBox: "0 0 36 36" }, t3, t3), i2.default.createElement("path", { fillRule: "evenodd", d: "M33.173,30.215,25.4,22.443A12.826,12.826,0,1,0,22.443,25.4l7.772,7.772a2.1,2.1,0,0,0,2.958-2.958ZM6,15a9,9,0,1,1,9,9A9,9,0,0,1,6,15Z" }));
  };
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign ? Object.assign.bind() : function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
}, 1092: (e2, t2, r2) => {
  t2.C = function(e3) {
    var t3 = o2({}, e3);
    return i2.default.createElement("svg", o2({ viewBox: "0 0 36 36" }, t3, t3), i2.default.createElement("path", { fillRule: "evenodd", d: "M30.663,12.542A10.391,10.391,0,0,0,23.671,10L11,10V4.8a.8.8,0,0,0-.8-.8.787.787,0,0,0-.527.2L2.144,11.649a.5.5,0,0,0,0,.7L9.668,19.8a.787.787,0,0,0,.527.2.8.8,0,0,0,.8-.8V14H23.877A6.139,6.139,0,0,1,30.1,19.8,5.889,5.889,0,0,1,24,26H17a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1h6.526a10.335,10.335,0,0,0,10.426-9.013A9.947,9.947,0,0,0,30.663,12.542Z" }));
  };
  var n2, i2 = (n2 = r2(2261)) && n2.__esModule ? n2 : { default: n2 };
  function o2() {
    return o2 = Object.assign ? Object.assign.bind() : function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r3 = arguments[t3];
        for (var n3 in r3) Object.prototype.hasOwnProperty.call(r3, n3) && (e3[n3] = r3[n3]);
      }
      return e3;
    }, o2.apply(this, arguments);
  }
}, 6279: function(e2, t2) {
  var r2 = "undefined" != typeof self ? self : this, n2 = function() {
    function e3() {
      this.fetch = false, this.DOMException = r2.DOMException;
    }
    return e3.prototype = r2, new e3();
  }();
  !function(e3) {
    !function(t3) {
      var r3 = "URLSearchParams" in e3, n3 = "Symbol" in e3 && "iterator" in Symbol, i3 = "FileReader" in e3 && "Blob" in e3 && function() {
        try {
          return new Blob(), true;
        } catch (e4) {
          return false;
        }
      }(), o2 = "FormData" in e3, s = "ArrayBuffer" in e3;
      if (s) var a = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"], l = ArrayBuffer.isView || function(e4) {
        return e4 && a.indexOf(Object.prototype.toString.call(e4)) > -1;
      };
      function c(e4) {
        if ("string" != typeof e4 && (e4 = String(e4)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e4)) throw new TypeError("Invalid character in header field name");
        return e4.toLowerCase();
      }
      function u(e4) {
        return "string" != typeof e4 && (e4 = String(e4)), e4;
      }
      function d(e4) {
        var t4 = { next: function() {
          var t5 = e4.shift();
          return { done: void 0 === t5, value: t5 };
        } };
        return n3 && (t4[Symbol.iterator] = function() {
          return t4;
        }), t4;
      }
      function p(e4) {
        this.map = {}, e4 instanceof p ? e4.forEach(function(e5, t4) {
          this.append(t4, e5);
        }, this) : Array.isArray(e4) ? e4.forEach(function(e5) {
          this.append(e5[0], e5[1]);
        }, this) : e4 && Object.getOwnPropertyNames(e4).forEach(function(t4) {
          this.append(t4, e4[t4]);
        }, this);
      }
      function f(e4) {
        if (e4.bodyUsed) return Promise.reject(new TypeError("Already read"));
        e4.bodyUsed = true;
      }
      function m(e4) {
        return new Promise(function(t4, r4) {
          e4.onload = function() {
            t4(e4.result);
          }, e4.onerror = function() {
            r4(e4.error);
          };
        });
      }
      function h(e4) {
        var t4 = new FileReader(), r4 = m(t4);
        return t4.readAsArrayBuffer(e4), r4;
      }
      function g(e4) {
        if (e4.slice) return e4.slice(0);
        var t4 = new Uint8Array(e4.byteLength);
        return t4.set(new Uint8Array(e4)), t4.buffer;
      }
      function y() {
        return this.bodyUsed = false, this._initBody = function(e4) {
          var t4;
          this._bodyInit = e4, e4 ? "string" == typeof e4 ? this._bodyText = e4 : i3 && Blob.prototype.isPrototypeOf(e4) ? this._bodyBlob = e4 : o2 && FormData.prototype.isPrototypeOf(e4) ? this._bodyFormData = e4 : r3 && URLSearchParams.prototype.isPrototypeOf(e4) ? this._bodyText = e4.toString() : s && i3 && (t4 = e4) && DataView.prototype.isPrototypeOf(t4) ? (this._bodyArrayBuffer = g(e4.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : s && (ArrayBuffer.prototype.isPrototypeOf(e4) || l(e4)) ? this._bodyArrayBuffer = g(e4) : this._bodyText = e4 = Object.prototype.toString.call(e4) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e4 ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : r3 && URLSearchParams.prototype.isPrototypeOf(e4) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, i3 && (this.blob = function() {
          var e4 = f(this);
          if (e4) return e4;
          if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData) throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }, this.arrayBuffer = function() {
          return this._bodyArrayBuffer ? f(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(h);
        }), this.text = function() {
          var e4, t4, r4, n4 = f(this);
          if (n4) return n4;
          if (this._bodyBlob) return e4 = this._bodyBlob, r4 = m(t4 = new FileReader()), t4.readAsText(e4), r4;
          if (this._bodyArrayBuffer) return Promise.resolve(function(e5) {
            for (var t5 = new Uint8Array(e5), r5 = new Array(t5.length), n5 = 0; n5 < t5.length; n5++) r5[n5] = String.fromCharCode(t5[n5]);
            return r5.join("");
          }(this._bodyArrayBuffer));
          if (this._bodyFormData) throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, o2 && (this.formData = function() {
          return this.text().then(E);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      p.prototype.append = function(e4, t4) {
        e4 = c(e4), t4 = u(t4);
        var r4 = this.map[e4];
        this.map[e4] = r4 ? r4 + ", " + t4 : t4;
      }, p.prototype.delete = function(e4) {
        delete this.map[c(e4)];
      }, p.prototype.get = function(e4) {
        return e4 = c(e4), this.has(e4) ? this.map[e4] : null;
      }, p.prototype.has = function(e4) {
        return this.map.hasOwnProperty(c(e4));
      }, p.prototype.set = function(e4, t4) {
        this.map[c(e4)] = u(t4);
      }, p.prototype.forEach = function(e4, t4) {
        for (var r4 in this.map) this.map.hasOwnProperty(r4) && e4.call(t4, this.map[r4], r4, this);
      }, p.prototype.keys = function() {
        var e4 = [];
        return this.forEach(function(t4, r4) {
          e4.push(r4);
        }), d(e4);
      }, p.prototype.values = function() {
        var e4 = [];
        return this.forEach(function(t4) {
          e4.push(t4);
        }), d(e4);
      }, p.prototype.entries = function() {
        var e4 = [];
        return this.forEach(function(t4, r4) {
          e4.push([r4, t4]);
        }), d(e4);
      }, n3 && (p.prototype[Symbol.iterator] = p.prototype.entries);
      var v = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function b(e4, t4) {
        var r4, n4, i4 = (t4 = t4 || {}).body;
        if (e4 instanceof b) {
          if (e4.bodyUsed) throw new TypeError("Already read");
          this.url = e4.url, this.credentials = e4.credentials, t4.headers || (this.headers = new p(e4.headers)), this.method = e4.method, this.mode = e4.mode, this.signal = e4.signal, i4 || null == e4._bodyInit || (i4 = e4._bodyInit, e4.bodyUsed = true);
        } else this.url = String(e4);
        if (this.credentials = t4.credentials || this.credentials || "same-origin", !t4.headers && this.headers || (this.headers = new p(t4.headers)), this.method = (n4 = (r4 = t4.method || this.method || "GET").toUpperCase(), v.indexOf(n4) > -1 ? n4 : r4), this.mode = t4.mode || this.mode || null, this.signal = t4.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i4) throw new TypeError("Body not allowed for GET or HEAD requests");
        this._initBody(i4);
      }
      function E(e4) {
        var t4 = new FormData();
        return e4.trim().split("&").forEach(function(e5) {
          if (e5) {
            var r4 = e5.split("="), n4 = r4.shift().replace(/\+/g, " "), i4 = r4.join("=").replace(/\+/g, " ");
            t4.append(decodeURIComponent(n4), decodeURIComponent(i4));
          }
        }), t4;
      }
      function _(e4, t4) {
        t4 || (t4 = {}), this.type = "default", this.status = void 0 === t4.status ? 200 : t4.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t4 ? t4.statusText : "OK", this.headers = new p(t4.headers), this.url = t4.url || "", this._initBody(e4);
      }
      b.prototype.clone = function() {
        return new b(this, { body: this._bodyInit });
      }, y.call(b.prototype), y.call(_.prototype), _.prototype.clone = function() {
        return new _(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new p(this.headers), url: this.url });
      }, _.error = function() {
        var e4 = new _(null, { status: 0, statusText: "" });
        return e4.type = "error", e4;
      };
      var T = [301, 302, 303, 307, 308];
      _.redirect = function(e4, t4) {
        if (-1 === T.indexOf(t4)) throw new RangeError("Invalid status code");
        return new _(null, { status: t4, headers: { location: e4 } });
      }, t3.DOMException = e3.DOMException;
      try {
        new t3.DOMException();
      } catch (e4) {
        t3.DOMException = function(e5, t4) {
          this.message = e5, this.name = t4;
          var r4 = Error(e5);
          this.stack = r4.stack;
        }, t3.DOMException.prototype = Object.create(Error.prototype), t3.DOMException.prototype.constructor = t3.DOMException;
      }
      function S(e4, r4) {
        return new Promise(function(n4, o3) {
          var s2 = new b(e4, r4);
          if (s2.signal && s2.signal.aborted) return o3(new t3.DOMException("Aborted", "AbortError"));
          var a2 = new XMLHttpRequest();
          function l2() {
            a2.abort();
          }
          a2.onload = function() {
            var e5, t4, r5 = { status: a2.status, statusText: a2.statusText, headers: (e5 = a2.getAllResponseHeaders() || "", t4 = new p(), e5.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(e6) {
              var r6 = e6.split(":"), n5 = r6.shift().trim();
              if (n5) {
                var i5 = r6.join(":").trim();
                t4.append(n5, i5);
              }
            }), t4) };
            r5.url = "responseURL" in a2 ? a2.responseURL : r5.headers.get("X-Request-URL");
            var i4 = "response" in a2 ? a2.response : a2.responseText;
            n4(new _(i4, r5));
          }, a2.onerror = function() {
            o3(new TypeError("Network request failed"));
          }, a2.ontimeout = function() {
            o3(new TypeError("Network request failed"));
          }, a2.onabort = function() {
            o3(new t3.DOMException("Aborted", "AbortError"));
          }, a2.open(s2.method, s2.url, true), "include" === s2.credentials ? a2.withCredentials = true : "omit" === s2.credentials && (a2.withCredentials = false), "responseType" in a2 && i3 && (a2.responseType = "blob"), s2.headers.forEach(function(e5, t4) {
            a2.setRequestHeader(t4, e5);
          }), s2.signal && (s2.signal.addEventListener("abort", l2), a2.onreadystatechange = function() {
            4 === a2.readyState && s2.signal.removeEventListener("abort", l2);
          }), a2.send(void 0 === s2._bodyInit ? null : s2._bodyInit);
        });
      }
      S.polyfill = true, e3.fetch || (e3.fetch = S, e3.Headers = p, e3.Request = b, e3.Response = _), t3.Headers = p, t3.Request = b, t3.Response = _, t3.fetch = S, Object.defineProperty(t3, "__esModule", { value: true });
    }({});
  }(n2), n2.fetch.ponyfill = true, delete n2.fetch.polyfill;
  var i2 = n2;
  (t2 = i2.fetch).default = i2.fetch, t2.fetch = i2.fetch, t2.Headers = i2.Headers, t2.Request = i2.Request, t2.Response = i2.Response, e2.exports = t2;
}, 5368: function(e2) {
  e2.exports = function() {
    const { entries: e3, setPrototypeOf: t2, isFrozen: r2, getPrototypeOf: n2, getOwnPropertyDescriptor: i2 } = Object;
    let { freeze: o2, seal: s, create: a } = Object, { apply: l, construct: c } = "undefined" != typeof Reflect && Reflect;
    o2 || (o2 = function(e4) {
      return e4;
    }), s || (s = function(e4) {
      return e4;
    }), l || (l = function(e4, t3, r3) {
      return e4.apply(t3, r3);
    }), c || (c = function(e4, t3) {
      return new e4(...t3);
    });
    const u = P(Array.prototype.forEach), d = P(Array.prototype.pop), p = P(Array.prototype.push), f = P(String.prototype.toLowerCase), m = P(String.prototype.toString), h = P(String.prototype.match), g = P(String.prototype.replace), y = P(String.prototype.indexOf), v = P(String.prototype.trim), b = P(Object.prototype.hasOwnProperty), E = P(RegExp.prototype.test), _ = (S = TypeError, function() {
      for (var e4 = arguments.length, t3 = new Array(e4), r3 = 0; r3 < e4; r3++) t3[r3] = arguments[r3];
      return c(S, t3);
    }), T = P(Number.isNaN);
    var S;
    function P(e4) {
      return function(t3) {
        for (var r3 = arguments.length, n3 = new Array(r3 > 1 ? r3 - 1 : 0), i3 = 1; i3 < r3; i3++) n3[i3 - 1] = arguments[i3];
        return l(e4, t3, n3);
      };
    }
    function w(e4, n3) {
      let i3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : f;
      t2 && t2(e4, null);
      let o3 = n3.length;
      for (; o3--; ) {
        let t3 = n3[o3];
        if ("string" == typeof t3) {
          const e5 = i3(t3);
          e5 !== t3 && (r2(n3) || (n3[o3] = e5), t3 = e5);
        }
        e4[t3] = true;
      }
      return e4;
    }
    function C(e4) {
      for (let t3 = 0; t3 < e4.length; t3++) b(e4, t3) || (e4[t3] = null);
      return e4;
    }
    function x(t3) {
      const r3 = a(null);
      for (const [n3, i3] of e3(t3)) b(t3, n3) && (Array.isArray(i3) ? r3[n3] = C(i3) : i3 && "object" == typeof i3 && i3.constructor === Object ? r3[n3] = x(i3) : r3[n3] = i3);
      return r3;
    }
    function O(e4, t3) {
      for (; null !== e4; ) {
        const r3 = i2(e4, t3);
        if (r3) {
          if (r3.get) return P(r3.get);
          if ("function" == typeof r3.value) return P(r3.value);
        }
        e4 = n2(e4);
      }
      return function() {
        return null;
      };
    }
    const I = o2(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), R = o2(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), A = o2(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), M = o2(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), L = o2(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), N = o2(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), F = o2(["#text"]), k = o2(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), D = o2(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), U = o2(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), j = o2(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), B = s(/\{\{[\w\W]*|[\w\W]*\}\}/gm), K = s(/<%[\w\W]*|[\w\W]*%>/gm), z = s(/\${[\w\W]*}/gm), W = s(/^data-[\-\w.\u00B7-\uFFFF]/), V = s(/^aria-[\-\w]+$/), H = s(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), G = s(/^(?:\w+script|data):/i), q = s(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), $ = s(/^html$/i), Y = s(/^[a-z][.\w]*(-[.\w]+)+$/i);
    var X = Object.freeze({ __proto__: null, MUSTACHE_EXPR: B, ERB_EXPR: K, TMPLIT_EXPR: z, DATA_ATTR: W, ARIA_ATTR: V, IS_ALLOWED_URI: H, IS_SCRIPT_OR_DATA: G, ATTR_WHITESPACE: q, DOCTYPE_NAME: $, CUSTOM_ELEMENT: Y });
    const Q = 1, Z = 3, J = 7, ee = 8, te = 9, re = function() {
      return "undefined" == typeof window ? null : window;
    };
    return function t3() {
      let r3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : re();
      const n3 = (e4) => t3(e4);
      if (n3.version = "3.1.3", n3.removed = [], !r3 || !r3.document || r3.document.nodeType !== te) return n3.isSupported = false, n3;
      let { document: i3 } = r3;
      const s2 = i3, l2 = s2.currentScript, { DocumentFragment: c2, HTMLTemplateElement: S2, Node: P2, Element: C2, NodeFilter: B2, NamedNodeMap: K2 = r3.NamedNodeMap || r3.MozNamedAttrMap, HTMLFormElement: z2, DOMParser: W2, trustedTypes: V2 } = r3, G2 = C2.prototype, q2 = O(G2, "cloneNode"), Y2 = O(G2, "nextSibling"), ne = O(G2, "childNodes"), ie = O(G2, "parentNode");
      if ("function" == typeof S2) {
        const e4 = i3.createElement("template");
        e4.content && e4.content.ownerDocument && (i3 = e4.content.ownerDocument);
      }
      let oe, se = "";
      const { implementation: ae, createNodeIterator: le, createDocumentFragment: ce, getElementsByTagName: ue } = i3, { importNode: de } = s2;
      let pe = {};
      n3.isSupported = "function" == typeof e3 && "function" == typeof ie && ae && void 0 !== ae.createHTMLDocument;
      const { MUSTACHE_EXPR: fe, ERB_EXPR: me, TMPLIT_EXPR: he, DATA_ATTR: ge, ARIA_ATTR: ye, IS_SCRIPT_OR_DATA: ve, ATTR_WHITESPACE: be, CUSTOM_ELEMENT: Ee } = X;
      let { IS_ALLOWED_URI: _e } = X, Te = null;
      const Se = w({}, [...I, ...R, ...A, ...L, ...F]);
      let Pe = null;
      const we = w({}, [...k, ...D, ...U, ...j]);
      let Ce = Object.seal(a(null, { tagNameCheck: { writable: true, configurable: false, enumerable: true, value: null }, attributeNameCheck: { writable: true, configurable: false, enumerable: true, value: null }, allowCustomizedBuiltInElements: { writable: true, configurable: false, enumerable: true, value: false } })), xe = null, Oe = null, Ie = true, Re = true, Ae = false, Me = true, Le = false, Ne = true, Fe = false, ke = false, De = false, Ue = false, je = false, Be = false, Ke = true, ze = false, We = true, Ve = false, He = {}, Ge = null;
      const qe = w({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
      let $e = null;
      const Ye = w({}, ["audio", "video", "img", "source", "image", "track"]);
      let Xe = null;
      const Qe = w({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Ze = "http://www.w3.org/1998/Math/MathML", Je = "http://www.w3.org/2000/svg", et = "http://www.w3.org/1999/xhtml";
      let tt = et, rt = false, nt = null;
      const it = w({}, [Ze, Je, et], m);
      let ot = null;
      const st = ["application/xhtml+xml", "text/html"];
      let at = null, lt = null;
      const ct = i3.createElement("form"), ut = function(e4) {
        return e4 instanceof RegExp || e4 instanceof Function;
      }, dt = function() {
        let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (!lt || lt !== e4) {
          if (e4 && "object" == typeof e4 || (e4 = {}), e4 = x(e4), ot = -1 === st.indexOf(e4.PARSER_MEDIA_TYPE) ? "text/html" : e4.PARSER_MEDIA_TYPE, at = "application/xhtml+xml" === ot ? m : f, Te = b(e4, "ALLOWED_TAGS") ? w({}, e4.ALLOWED_TAGS, at) : Se, Pe = b(e4, "ALLOWED_ATTR") ? w({}, e4.ALLOWED_ATTR, at) : we, nt = b(e4, "ALLOWED_NAMESPACES") ? w({}, e4.ALLOWED_NAMESPACES, m) : it, Xe = b(e4, "ADD_URI_SAFE_ATTR") ? w(x(Qe), e4.ADD_URI_SAFE_ATTR, at) : Qe, $e = b(e4, "ADD_DATA_URI_TAGS") ? w(x(Ye), e4.ADD_DATA_URI_TAGS, at) : Ye, Ge = b(e4, "FORBID_CONTENTS") ? w({}, e4.FORBID_CONTENTS, at) : qe, xe = b(e4, "FORBID_TAGS") ? w({}, e4.FORBID_TAGS, at) : {}, Oe = b(e4, "FORBID_ATTR") ? w({}, e4.FORBID_ATTR, at) : {}, He = !!b(e4, "USE_PROFILES") && e4.USE_PROFILES, Ie = false !== e4.ALLOW_ARIA_ATTR, Re = false !== e4.ALLOW_DATA_ATTR, Ae = e4.ALLOW_UNKNOWN_PROTOCOLS || false, Me = false !== e4.ALLOW_SELF_CLOSE_IN_ATTR, Le = e4.SAFE_FOR_TEMPLATES || false, Ne = false !== e4.SAFE_FOR_XML, Fe = e4.WHOLE_DOCUMENT || false, Ue = e4.RETURN_DOM || false, je = e4.RETURN_DOM_FRAGMENT || false, Be = e4.RETURN_TRUSTED_TYPE || false, De = e4.FORCE_BODY || false, Ke = false !== e4.SANITIZE_DOM, ze = e4.SANITIZE_NAMED_PROPS || false, We = false !== e4.KEEP_CONTENT, Ve = e4.IN_PLACE || false, _e = e4.ALLOWED_URI_REGEXP || H, tt = e4.NAMESPACE || et, Ce = e4.CUSTOM_ELEMENT_HANDLING || {}, e4.CUSTOM_ELEMENT_HANDLING && ut(e4.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (Ce.tagNameCheck = e4.CUSTOM_ELEMENT_HANDLING.tagNameCheck), e4.CUSTOM_ELEMENT_HANDLING && ut(e4.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (Ce.attributeNameCheck = e4.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), e4.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e4.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (Ce.allowCustomizedBuiltInElements = e4.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Le && (Re = false), je && (Ue = true), He && (Te = w({}, F), Pe = [], true === He.html && (w(Te, I), w(Pe, k)), true === He.svg && (w(Te, R), w(Pe, D), w(Pe, j)), true === He.svgFilters && (w(Te, A), w(Pe, D), w(Pe, j)), true === He.mathMl && (w(Te, L), w(Pe, U), w(Pe, j))), e4.ADD_TAGS && (Te === Se && (Te = x(Te)), w(Te, e4.ADD_TAGS, at)), e4.ADD_ATTR && (Pe === we && (Pe = x(Pe)), w(Pe, e4.ADD_ATTR, at)), e4.ADD_URI_SAFE_ATTR && w(Xe, e4.ADD_URI_SAFE_ATTR, at), e4.FORBID_CONTENTS && (Ge === qe && (Ge = x(Ge)), w(Ge, e4.FORBID_CONTENTS, at)), We && (Te["#text"] = true), Fe && w(Te, ["html", "head", "body"]), Te.table && (w(Te, ["tbody"]), delete xe.tbody), e4.TRUSTED_TYPES_POLICY) {
            if ("function" != typeof e4.TRUSTED_TYPES_POLICY.createHTML) throw _('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
            if ("function" != typeof e4.TRUSTED_TYPES_POLICY.createScriptURL) throw _('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
            oe = e4.TRUSTED_TYPES_POLICY, se = oe.createHTML("");
          } else void 0 === oe && (oe = function(e5, t4) {
            if ("object" != typeof e5 || "function" != typeof e5.createPolicy) return null;
            let r4 = null;
            const n4 = "data-tt-policy-suffix";
            t4 && t4.hasAttribute(n4) && (r4 = t4.getAttribute(n4));
            const i4 = "dompurify" + (r4 ? "#" + r4 : "");
            try {
              return e5.createPolicy(i4, { createHTML: (e6) => e6, createScriptURL: (e6) => e6 });
            } catch (e6) {
              return console.warn("TrustedTypes policy " + i4 + " could not be created."), null;
            }
          }(V2, l2)), null !== oe && "string" == typeof se && (se = oe.createHTML(""));
          o2 && o2(e4), lt = e4;
        }
      }, pt = w({}, ["mi", "mo", "mn", "ms", "mtext"]), ft = w({}, ["foreignobject", "annotation-xml"]), mt = w({}, ["title", "style", "font", "a", "script"]), ht = w({}, [...R, ...A, ...M]), gt = w({}, [...L, ...N]), yt = function(e4) {
        p(n3.removed, { element: e4 });
        try {
          e4.parentNode.removeChild(e4);
        } catch (t4) {
          e4.remove();
        }
      }, vt = function(e4, t4) {
        try {
          p(n3.removed, { attribute: t4.getAttributeNode(e4), from: t4 });
        } catch (e5) {
          p(n3.removed, { attribute: null, from: t4 });
        }
        if (t4.removeAttribute(e4), "is" === e4 && !Pe[e4]) if (Ue || je) try {
          yt(t4);
        } catch (e5) {
        }
        else try {
          t4.setAttribute(e4, "");
        } catch (e5) {
        }
      }, bt = function(e4) {
        let t4 = null, r4 = null;
        if (De) e4 = "<remove></remove>" + e4;
        else {
          const t5 = h(e4, /^[\r\n\t ]+/);
          r4 = t5 && t5[0];
        }
        "application/xhtml+xml" === ot && tt === et && (e4 = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e4 + "</body></html>");
        const n4 = oe ? oe.createHTML(e4) : e4;
        if (tt === et) try {
          t4 = new W2().parseFromString(n4, ot);
        } catch (e5) {
        }
        if (!t4 || !t4.documentElement) {
          t4 = ae.createDocument(tt, "template", null);
          try {
            t4.documentElement.innerHTML = rt ? se : n4;
          } catch (e5) {
          }
        }
        const o3 = t4.body || t4.documentElement;
        return e4 && r4 && o3.insertBefore(i3.createTextNode(r4), o3.childNodes[0] || null), tt === et ? ue.call(t4, Fe ? "html" : "body")[0] : Fe ? t4.documentElement : o3;
      }, Et = function(e4) {
        return le.call(e4.ownerDocument || e4, e4, B2.SHOW_ELEMENT | B2.SHOW_COMMENT | B2.SHOW_TEXT | B2.SHOW_PROCESSING_INSTRUCTION | B2.SHOW_CDATA_SECTION, null);
      }, _t = function(e4) {
        return e4 instanceof z2 && (void 0 !== e4.__depth && "number" != typeof e4.__depth || void 0 !== e4.__removalCount && "number" != typeof e4.__removalCount || "string" != typeof e4.nodeName || "string" != typeof e4.textContent || "function" != typeof e4.removeChild || !(e4.attributes instanceof K2) || "function" != typeof e4.removeAttribute || "function" != typeof e4.setAttribute || "string" != typeof e4.namespaceURI || "function" != typeof e4.insertBefore || "function" != typeof e4.hasChildNodes);
      }, Tt = function(e4) {
        return "function" == typeof P2 && e4 instanceof P2;
      }, St = function(e4, t4, r4) {
        pe[e4] && u(pe[e4], (e5) => {
          e5.call(n3, t4, r4, lt);
        });
      }, Pt = function(e4) {
        let t4 = null;
        if (St("beforeSanitizeElements", e4, null), _t(e4)) return yt(e4), true;
        const r4 = at(e4.nodeName);
        if (St("uponSanitizeElement", e4, { tagName: r4, allowedTags: Te }), e4.hasChildNodes() && !Tt(e4.firstElementChild) && E(/<[/\w]/g, e4.innerHTML) && E(/<[/\w]/g, e4.textContent)) return yt(e4), true;
        if (e4.nodeType === J) return yt(e4), true;
        if (Ne && e4.nodeType === ee && E(/<[/\w]/g, e4.data)) return yt(e4), true;
        if (!Te[r4] || xe[r4]) {
          if (!xe[r4] && Ct(r4)) {
            if (Ce.tagNameCheck instanceof RegExp && E(Ce.tagNameCheck, r4)) return false;
            if (Ce.tagNameCheck instanceof Function && Ce.tagNameCheck(r4)) return false;
          }
          if (We && !Ge[r4]) {
            const t5 = ie(e4) || e4.parentNode, r5 = ne(e4) || e4.childNodes;
            if (r5 && t5) for (let n4 = r5.length - 1; n4 >= 0; --n4) {
              const i4 = q2(r5[n4], true);
              i4.__removalCount = (e4.__removalCount || 0) + 1, t5.insertBefore(i4, Y2(e4));
            }
          }
          return yt(e4), true;
        }
        return e4 instanceof C2 && !function(e5) {
          let t5 = ie(e5);
          t5 && t5.tagName || (t5 = { namespaceURI: tt, tagName: "template" });
          const r5 = f(e5.tagName), n4 = f(t5.tagName);
          return !!nt[e5.namespaceURI] && (e5.namespaceURI === Je ? t5.namespaceURI === et ? "svg" === r5 : t5.namespaceURI === Ze ? "svg" === r5 && ("annotation-xml" === n4 || pt[n4]) : Boolean(ht[r5]) : e5.namespaceURI === Ze ? t5.namespaceURI === et ? "math" === r5 : t5.namespaceURI === Je ? "math" === r5 && ft[n4] : Boolean(gt[r5]) : e5.namespaceURI === et ? !(t5.namespaceURI === Je && !ft[n4]) && !(t5.namespaceURI === Ze && !pt[n4]) && !gt[r5] && (mt[r5] || !ht[r5]) : !("application/xhtml+xml" !== ot || !nt[e5.namespaceURI]));
        }(e4) ? (yt(e4), true) : "noscript" !== r4 && "noembed" !== r4 && "noframes" !== r4 || !E(/<\/no(script|embed|frames)/i, e4.innerHTML) ? (Le && e4.nodeType === Z && (t4 = e4.textContent, u([fe, me, he], (e5) => {
          t4 = g(t4, e5, " ");
        }), e4.textContent !== t4 && (p(n3.removed, { element: e4.cloneNode() }), e4.textContent = t4)), St("afterSanitizeElements", e4, null), false) : (yt(e4), true);
      }, wt = function(e4, t4, r4) {
        if (Ke && ("id" === t4 || "name" === t4) && (r4 in i3 || r4 in ct || "__depth" === r4 || "__removalCount" === r4)) return false;
        if (Re && !Oe[t4] && E(ge, t4)) ;
        else if (Ie && E(ye, t4)) ;
        else if (!Pe[t4] || Oe[t4]) {
          if (!(Ct(e4) && (Ce.tagNameCheck instanceof RegExp && E(Ce.tagNameCheck, e4) || Ce.tagNameCheck instanceof Function && Ce.tagNameCheck(e4)) && (Ce.attributeNameCheck instanceof RegExp && E(Ce.attributeNameCheck, t4) || Ce.attributeNameCheck instanceof Function && Ce.attributeNameCheck(t4)) || "is" === t4 && Ce.allowCustomizedBuiltInElements && (Ce.tagNameCheck instanceof RegExp && E(Ce.tagNameCheck, r4) || Ce.tagNameCheck instanceof Function && Ce.tagNameCheck(r4)))) return false;
        } else if (Xe[t4]) ;
        else if (E(_e, g(r4, be, ""))) ;
        else if ("src" !== t4 && "xlink:href" !== t4 && "href" !== t4 || "script" === e4 || 0 !== y(r4, "data:") || !$e[e4]) {
          if (Ae && !E(ve, g(r4, be, ""))) ;
          else if (r4) return false;
        }
        return true;
      }, Ct = function(e4) {
        return "annotation-xml" !== e4 && h(e4, Ee);
      }, xt = function(e4) {
        St("beforeSanitizeAttributes", e4, null);
        const { attributes: t4 } = e4;
        if (!t4) return;
        const r4 = { attrName: "", attrValue: "", keepAttr: true, allowedAttributes: Pe };
        let i4 = t4.length;
        for (; i4--; ) {
          const o3 = t4[i4], { name: s3, namespaceURI: a2, value: l3 } = o3, c3 = at(s3);
          let p2 = "value" === s3 ? l3 : v(l3);
          if (r4.attrName = c3, r4.attrValue = p2, r4.keepAttr = true, r4.forceKeepAttr = void 0, St("uponSanitizeAttribute", e4, r4), p2 = r4.attrValue, r4.forceKeepAttr) continue;
          if (vt(s3, e4), !r4.keepAttr) continue;
          if (!Me && E(/\/>/i, p2)) {
            vt(s3, e4);
            continue;
          }
          if (Ne && E(/((--!?|])>)|<\/(style|title)/i, p2)) {
            vt(s3, e4);
            continue;
          }
          Le && u([fe, me, he], (e5) => {
            p2 = g(p2, e5, " ");
          });
          const f2 = at(e4.nodeName);
          if (wt(f2, c3, p2)) {
            if (!ze || "id" !== c3 && "name" !== c3 || (vt(s3, e4), p2 = "user-content-" + p2), oe && "object" == typeof V2 && "function" == typeof V2.getAttributeType) if (a2) ;
            else switch (V2.getAttributeType(f2, c3)) {
              case "TrustedHTML":
                p2 = oe.createHTML(p2);
                break;
              case "TrustedScriptURL":
                p2 = oe.createScriptURL(p2);
            }
            try {
              a2 ? e4.setAttributeNS(a2, s3, p2) : e4.setAttribute(s3, p2), _t(e4) ? yt(e4) : d(n3.removed);
            } catch (e5) {
            }
          }
        }
        St("afterSanitizeAttributes", e4, null);
      }, Ot = function e4(t4) {
        let r4 = null;
        const n4 = Et(t4);
        for (St("beforeSanitizeShadowDOM", t4, null); r4 = n4.nextNode(); ) {
          if (St("uponSanitizeShadowNode", r4, null), Pt(r4)) continue;
          const t5 = ie(r4);
          r4.nodeType === Q && (t5 && t5.__depth ? r4.__depth = (r4.__removalCount || 0) + t5.__depth + 1 : r4.__depth = 1), (r4.__depth >= 255 || r4.__depth < 0 || T(r4.__depth)) && yt(r4), r4.content instanceof c2 && (r4.content.__depth = r4.__depth, e4(r4.content)), xt(r4);
        }
        St("afterSanitizeShadowDOM", t4, null);
      };
      return n3.sanitize = function(e4) {
        let t4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r4 = null, i4 = null, o3 = null, a2 = null;
        if (rt = !e4, rt && (e4 = "<!-->"), "string" != typeof e4 && !Tt(e4)) {
          if ("function" != typeof e4.toString) throw _("toString is not a function");
          if ("string" != typeof (e4 = e4.toString())) throw _("dirty is not a string, aborting");
        }
        if (!n3.isSupported) return e4;
        if (ke || dt(t4), n3.removed = [], "string" == typeof e4 && (Ve = false), Ve) {
          if (e4.nodeName) {
            const t5 = at(e4.nodeName);
            if (!Te[t5] || xe[t5]) throw _("root node is forbidden and cannot be sanitized in-place");
          }
        } else if (e4 instanceof P2) r4 = bt("<!---->"), i4 = r4.ownerDocument.importNode(e4, true), i4.nodeType === Q && "BODY" === i4.nodeName || "HTML" === i4.nodeName ? r4 = i4 : r4.appendChild(i4);
        else {
          if (!Ue && !Le && !Fe && -1 === e4.indexOf("<")) return oe && Be ? oe.createHTML(e4) : e4;
          if (r4 = bt(e4), !r4) return Ue ? null : Be ? se : "";
        }
        r4 && De && yt(r4.firstChild);
        const l3 = Et(Ve ? e4 : r4);
        for (; o3 = l3.nextNode(); ) {
          if (Pt(o3)) continue;
          const e5 = ie(o3);
          o3.nodeType === Q && (e5 && e5.__depth ? o3.__depth = (o3.__removalCount || 0) + e5.__depth + 1 : o3.__depth = 1), (o3.__depth >= 255 || o3.__depth < 0 || T(o3.__depth)) && yt(o3), o3.content instanceof c2 && (o3.content.__depth = o3.__depth, Ot(o3.content)), xt(o3);
        }
        if (Ve) return e4;
        if (Ue) {
          if (je) for (a2 = ce.call(r4.ownerDocument); r4.firstChild; ) a2.appendChild(r4.firstChild);
          else a2 = r4;
          return (Pe.shadowroot || Pe.shadowrootmode) && (a2 = de.call(s2, a2, true)), a2;
        }
        let d2 = Fe ? r4.outerHTML : r4.innerHTML;
        return Fe && Te["!doctype"] && r4.ownerDocument && r4.ownerDocument.doctype && r4.ownerDocument.doctype.name && E($, r4.ownerDocument.doctype.name) && (d2 = "<!DOCTYPE " + r4.ownerDocument.doctype.name + ">\n" + d2), Le && u([fe, me, he], (e5) => {
          d2 = g(d2, e5, " ");
        }), oe && Be ? oe.createHTML(d2) : d2;
      }, n3.setConfig = function() {
        dt(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}), ke = true;
      }, n3.clearConfig = function() {
        lt = null, ke = false;
      }, n3.isValidAttribute = function(e4, t4, r4) {
        lt || dt({});
        const n4 = at(e4), i4 = at(t4);
        return wt(n4, i4, r4);
      }, n3.addHook = function(e4, t4) {
        "function" == typeof t4 && (pe[e4] = pe[e4] || [], p(pe[e4], t4));
      }, n3.removeHook = function(e4) {
        if (pe[e4]) return d(pe[e4]);
      }, n3.removeHooks = function(e4) {
        pe[e4] && (pe[e4] = []);
      }, n3.removeAllHooks = function() {
        pe = {};
      }, n3;
    }();
  }();
}, 795: (e2, t2, r2) => {
  r2.r(t2), r2.d(t2, { ErrorCode: () => me, FormatError: () => ve, IntlMessageFormat: () => we, InvalidValueError: () => be, InvalidValueTypeError: () => Ee, MissingValueError: () => _e, PART_TYPE: () => ye, default: () => Ce, formatToParts: () => Se, isFormatXMLElementFn: () => Te });
  var n2 = function(e3, t3) {
    return n2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
      e4.__proto__ = t4;
    } || function(e4, t4) {
      for (var r3 in t4) Object.prototype.hasOwnProperty.call(t4, r3) && (e4[r3] = t4[r3]);
    }, n2(e3, t3);
  };
  function i2(e3, t3) {
    if ("function" != typeof t3 && null !== t3) throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
    function r3() {
      this.constructor = e3;
    }
    n2(e3, t3), e3.prototype = null === t3 ? Object.create(t3) : (r3.prototype = t3.prototype, new r3());
  }
  var o2, s, a, l = function() {
    return l = Object.assign || function(e3) {
      for (var t3, r3 = 1, n3 = arguments.length; r3 < n3; r3++) for (var i3 in t3 = arguments[r3]) Object.prototype.hasOwnProperty.call(t3, i3) && (e3[i3] = t3[i3]);
      return e3;
    }, l.apply(this, arguments);
  };
  function c(e3, t3, r3) {
    if (r3 || 2 === arguments.length) for (var n3, i3 = 0, o3 = t3.length; i3 < o3; i3++) !n3 && i3 in t3 || (n3 || (n3 = Array.prototype.slice.call(t3, 0, i3)), n3[i3] = t3[i3]);
    return e3.concat(n3 || Array.prototype.slice.call(t3));
  }
  function u(e3) {
    return e3.type === s.literal;
  }
  function d(e3) {
    return e3.type === s.argument;
  }
  function p(e3) {
    return e3.type === s.number;
  }
  function f(e3) {
    return e3.type === s.date;
  }
  function m(e3) {
    return e3.type === s.time;
  }
  function h(e3) {
    return e3.type === s.select;
  }
  function g(e3) {
    return e3.type === s.plural;
  }
  function y(e3) {
    return e3.type === s.pound;
  }
  function v(e3) {
    return e3.type === s.tag;
  }
  function b(e3) {
    return !(!e3 || "object" != typeof e3 || e3.type !== a.number);
  }
  function E(e3) {
    return !(!e3 || "object" != typeof e3 || e3.type !== a.dateTime);
  }
  Object.create, Object.create, "function" == typeof SuppressedError && SuppressedError, function(e3) {
    e3[e3.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", e3[e3.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", e3[e3.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", e3[e3.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", e3[e3.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", e3[e3.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", e3[e3.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", e3[e3.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", e3[e3.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", e3[e3.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", e3[e3.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", e3[e3.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", e3[e3.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", e3[e3.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", e3[e3.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", e3[e3.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", e3[e3.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", e3[e3.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", e3[e3.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", e3[e3.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", e3[e3.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", e3[e3.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", e3[e3.INVALID_TAG = 23] = "INVALID_TAG", e3[e3.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", e3[e3.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", e3[e3.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
  }(o2 || (o2 = {})), function(e3) {
    e3[e3.literal = 0] = "literal", e3[e3.argument = 1] = "argument", e3[e3.number = 2] = "number", e3[e3.date = 3] = "date", e3[e3.time = 4] = "time", e3[e3.select = 5] = "select", e3[e3.plural = 6] = "plural", e3[e3.pound = 7] = "pound", e3[e3.tag = 8] = "tag";
  }(s || (s = {})), function(e3) {
    e3[e3.number = 0] = "number", e3[e3.dateTime = 1] = "dateTime";
  }(a || (a = {}));
  var _ = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/, T = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
  function S(e3) {
    var t3 = {};
    return e3.replace(T, function(e4) {
      var r3 = e4.length;
      switch (e4[0]) {
        case "G":
          t3.era = 4 === r3 ? "long" : 5 === r3 ? "narrow" : "short";
          break;
        case "y":
          t3.year = 2 === r3 ? "2-digit" : "numeric";
          break;
        case "Y":
        case "u":
        case "U":
        case "r":
          throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
        case "q":
        case "Q":
          throw new RangeError("`q/Q` (quarter) patterns are not supported");
        case "M":
        case "L":
          t3.month = ["numeric", "2-digit", "short", "long", "narrow"][r3 - 1];
          break;
        case "w":
        case "W":
          throw new RangeError("`w/W` (week) patterns are not supported");
        case "d":
          t3.day = ["numeric", "2-digit"][r3 - 1];
          break;
        case "D":
        case "F":
        case "g":
          throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
        case "E":
          t3.weekday = 4 === r3 ? "short" : 5 === r3 ? "narrow" : "short";
          break;
        case "e":
          if (r3 < 4) throw new RangeError("`e..eee` (weekday) patterns are not supported");
          t3.weekday = ["short", "long", "narrow", "short"][r3 - 4];
          break;
        case "c":
          if (r3 < 4) throw new RangeError("`c..ccc` (weekday) patterns are not supported");
          t3.weekday = ["short", "long", "narrow", "short"][r3 - 4];
          break;
        case "a":
          t3.hour12 = true;
          break;
        case "b":
        case "B":
          throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
        case "h":
          t3.hourCycle = "h12", t3.hour = ["numeric", "2-digit"][r3 - 1];
          break;
        case "H":
          t3.hourCycle = "h23", t3.hour = ["numeric", "2-digit"][r3 - 1];
          break;
        case "K":
          t3.hourCycle = "h11", t3.hour = ["numeric", "2-digit"][r3 - 1];
          break;
        case "k":
          t3.hourCycle = "h24", t3.hour = ["numeric", "2-digit"][r3 - 1];
          break;
        case "j":
        case "J":
        case "C":
          throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
        case "m":
          t3.minute = ["numeric", "2-digit"][r3 - 1];
          break;
        case "s":
          t3.second = ["numeric", "2-digit"][r3 - 1];
          break;
        case "S":
        case "A":
          throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
        case "z":
          t3.timeZoneName = r3 < 4 ? "short" : "long";
          break;
        case "Z":
        case "O":
        case "v":
        case "V":
        case "X":
        case "x":
          throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
      }
      return "";
    }), t3;
  }
  var P, w = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i, C = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g, x = /^(@+)?(\+|#+)?$/g, O = /(\*)(0+)|(#+)(0+)|(0+)/g, I = /^(0+)$/;
  function R(e3) {
    var t3 = {};
    return e3.replace(x, function(e4, r3, n3) {
      return "string" != typeof n3 ? (t3.minimumSignificantDigits = r3.length, t3.maximumSignificantDigits = r3.length) : "+" === n3 ? t3.minimumSignificantDigits = r3.length : "#" === r3[0] ? t3.maximumSignificantDigits = r3.length : (t3.minimumSignificantDigits = r3.length, t3.maximumSignificantDigits = r3.length + ("string" == typeof n3 ? n3.length : 0)), "";
    }), t3;
  }
  function A(e3) {
    switch (e3) {
      case "sign-auto":
        return { signDisplay: "auto" };
      case "sign-accounting":
      case "()":
        return { currencySign: "accounting" };
      case "sign-always":
      case "+!":
        return { signDisplay: "always" };
      case "sign-accounting-always":
      case "()!":
        return { signDisplay: "always", currencySign: "accounting" };
      case "sign-except-zero":
      case "+?":
        return { signDisplay: "exceptZero" };
      case "sign-accounting-except-zero":
      case "()?":
        return { signDisplay: "exceptZero", currencySign: "accounting" };
      case "sign-never":
      case "+_":
        return { signDisplay: "never" };
    }
  }
  function M(e3) {
    var t3;
    if ("E" === e3[0] && "E" === e3[1] ? (t3 = { notation: "engineering" }, e3 = e3.slice(2)) : "E" === e3[0] && (t3 = { notation: "scientific" }, e3 = e3.slice(1)), t3) {
      var r3 = e3.slice(0, 2);
      if ("+!" === r3 ? (t3.signDisplay = "always", e3 = e3.slice(2)) : "+?" === r3 && (t3.signDisplay = "exceptZero", e3 = e3.slice(2)), !I.test(e3)) throw new Error("Malformed concise eng/scientific notation");
      t3.minimumIntegerDigits = e3.length;
    }
    return t3;
  }
  function L(e3) {
    return A(e3) || {};
  }
  function N(e3) {
    for (var t3 = {}, r3 = 0, n3 = e3; r3 < n3.length; r3++) {
      var i3 = n3[r3];
      switch (i3.stem) {
        case "percent":
        case "%":
          t3.style = "percent";
          continue;
        case "%x100":
          t3.style = "percent", t3.scale = 100;
          continue;
        case "currency":
          t3.style = "currency", t3.currency = i3.options[0];
          continue;
        case "group-off":
        case ",_":
          t3.useGrouping = false;
          continue;
        case "precision-integer":
        case ".":
          t3.maximumFractionDigits = 0;
          continue;
        case "measure-unit":
        case "unit":
          t3.style = "unit", t3.unit = i3.options[0].replace(/^(.*?)-/, "");
          continue;
        case "compact-short":
        case "K":
          t3.notation = "compact", t3.compactDisplay = "short";
          continue;
        case "compact-long":
        case "KK":
          t3.notation = "compact", t3.compactDisplay = "long";
          continue;
        case "scientific":
          t3 = l(l(l({}, t3), { notation: "scientific" }), i3.options.reduce(function(e4, t4) {
            return l(l({}, e4), L(t4));
          }, {}));
          continue;
        case "engineering":
          t3 = l(l(l({}, t3), { notation: "engineering" }), i3.options.reduce(function(e4, t4) {
            return l(l({}, e4), L(t4));
          }, {}));
          continue;
        case "notation-simple":
          t3.notation = "standard";
          continue;
        case "unit-width-narrow":
          t3.currencyDisplay = "narrowSymbol", t3.unitDisplay = "narrow";
          continue;
        case "unit-width-short":
          t3.currencyDisplay = "code", t3.unitDisplay = "short";
          continue;
        case "unit-width-full-name":
          t3.currencyDisplay = "name", t3.unitDisplay = "long";
          continue;
        case "unit-width-iso-code":
          t3.currencyDisplay = "symbol";
          continue;
        case "scale":
          t3.scale = parseFloat(i3.options[0]);
          continue;
        case "integer-width":
          if (i3.options.length > 1) throw new RangeError("integer-width stems only accept a single optional option");
          i3.options[0].replace(O, function(e4, r4, n4, i4, o4, s3) {
            if (r4) t3.minimumIntegerDigits = n4.length;
            else {
              if (i4 && o4) throw new Error("We currently do not support maximum integer digits");
              if (s3) throw new Error("We currently do not support exact integer digits");
            }
            return "";
          });
          continue;
      }
      if (I.test(i3.stem)) t3.minimumIntegerDigits = i3.stem.length;
      else if (C.test(i3.stem)) {
        if (i3.options.length > 1) throw new RangeError("Fraction-precision stems only accept a single optional option");
        i3.stem.replace(C, function(e4, r4, n4, i4, o4, s3) {
          return "*" === n4 ? t3.minimumFractionDigits = r4.length : i4 && "#" === i4[0] ? t3.maximumFractionDigits = i4.length : o4 && s3 ? (t3.minimumFractionDigits = o4.length, t3.maximumFractionDigits = o4.length + s3.length) : (t3.minimumFractionDigits = r4.length, t3.maximumFractionDigits = r4.length), "";
        }), i3.options.length && (t3 = l(l({}, t3), R(i3.options[0])));
      } else if (x.test(i3.stem)) t3 = l(l({}, t3), R(i3.stem));
      else {
        var o3 = A(i3.stem);
        o3 && (t3 = l(l({}, t3), o3));
        var s2 = M(i3.stem);
        s2 && (t3 = l(l({}, t3), s2));
      }
    }
    return t3;
  }
  var F = new RegExp("^" + _.source + "*"), k = new RegExp(_.source + "*$");
  function D(e3, t3) {
    return { start: e3, end: t3 };
  }
  var U = !!String.prototype.startsWith, j = !!String.fromCodePoint, B = !!Object.fromEntries, K = !!String.prototype.codePointAt, z = !!String.prototype.trimStart, W = !!String.prototype.trimEnd, V = Number.isSafeInteger ? Number.isSafeInteger : function(e3) {
    return "number" == typeof e3 && isFinite(e3) && Math.floor(e3) === e3 && Math.abs(e3) <= 9007199254740991;
  }, H = true;
  try {
    H = "a" === (null === (P = J("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu").exec("a")) || void 0 === P ? void 0 : P[0]);
  } catch (e3) {
    H = false;
  }
  var G, q = U ? function(e3, t3, r3) {
    return e3.startsWith(t3, r3);
  } : function(e3, t3, r3) {
    return e3.slice(r3, r3 + t3.length) === t3;
  }, $ = j ? String.fromCodePoint : function() {
    for (var e3 = [], t3 = 0; t3 < arguments.length; t3++) e3[t3] = arguments[t3];
    for (var r3, n3 = "", i3 = e3.length, o3 = 0; i3 > o3; ) {
      if ((r3 = e3[o3++]) > 1114111) throw RangeError(r3 + " is not a valid code point");
      n3 += r3 < 65536 ? String.fromCharCode(r3) : String.fromCharCode(55296 + ((r3 -= 65536) >> 10), r3 % 1024 + 56320);
    }
    return n3;
  }, Y = B ? Object.fromEntries : function(e3) {
    for (var t3 = {}, r3 = 0, n3 = e3; r3 < n3.length; r3++) {
      var i3 = n3[r3], o3 = i3[0], s2 = i3[1];
      t3[o3] = s2;
    }
    return t3;
  }, X = K ? function(e3, t3) {
    return e3.codePointAt(t3);
  } : function(e3, t3) {
    var r3 = e3.length;
    if (!(t3 < 0 || t3 >= r3)) {
      var n3, i3 = e3.charCodeAt(t3);
      return i3 < 55296 || i3 > 56319 || t3 + 1 === r3 || (n3 = e3.charCodeAt(t3 + 1)) < 56320 || n3 > 57343 ? i3 : n3 - 56320 + (i3 - 55296 << 10) + 65536;
    }
  }, Q = z ? function(e3) {
    return e3.trimStart();
  } : function(e3) {
    return e3.replace(F, "");
  }, Z = W ? function(e3) {
    return e3.trimEnd();
  } : function(e3) {
    return e3.replace(k, "");
  };
  function J(e3, t3) {
    return new RegExp(e3, t3);
  }
  if (H) {
    var ee = J("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
    G = function(e3, t3) {
      var r3;
      return ee.lastIndex = t3, null !== (r3 = ee.exec(e3)[1]) && void 0 !== r3 ? r3 : "";
    };
  } else G = function(e3, t3) {
    for (var r3 = []; ; ) {
      var n3 = X(e3, t3);
      if (void 0 === n3 || ne(n3) || ie(n3)) break;
      r3.push(n3), t3 += n3 >= 65536 ? 2 : 1;
    }
    return $.apply(void 0, r3);
  };
  var te = function() {
    function e3(e4, t3) {
      void 0 === t3 && (t3 = {}), this.message = e4, this.position = { offset: 0, line: 1, column: 1 }, this.ignoreTag = !!t3.ignoreTag, this.requiresOtherClause = !!t3.requiresOtherClause, this.shouldParseSkeletons = !!t3.shouldParseSkeletons;
    }
    return e3.prototype.parse = function() {
      if (0 !== this.offset()) throw Error("parser can only be used once");
      return this.parseMessage(0, "", false);
    }, e3.prototype.parseMessage = function(e4, t3, r3) {
      for (var n3 = []; !this.isEOF(); ) {
        var i3 = this.char();
        if (123 === i3) {
          if ((a2 = this.parseArgument(e4, r3)).err) return a2;
          n3.push(a2.val);
        } else {
          if (125 === i3 && e4 > 0) break;
          if (35 !== i3 || "plural" !== t3 && "selectordinal" !== t3) {
            if (60 === i3 && !this.ignoreTag && 47 === this.peek()) {
              if (r3) break;
              return this.error(o2.UNMATCHED_CLOSING_TAG, D(this.clonePosition(), this.clonePosition()));
            }
            if (60 === i3 && !this.ignoreTag && re(this.peek() || 0)) {
              if ((a2 = this.parseTag(e4, t3)).err) return a2;
              n3.push(a2.val);
            } else {
              var a2;
              if ((a2 = this.parseLiteral(e4, t3)).err) return a2;
              n3.push(a2.val);
            }
          } else {
            var l2 = this.clonePosition();
            this.bump(), n3.push({ type: s.pound, location: D(l2, this.clonePosition()) });
          }
        }
      }
      return { val: n3, err: null };
    }, e3.prototype.parseTag = function(e4, t3) {
      var r3 = this.clonePosition();
      this.bump();
      var n3 = this.parseTagName();
      if (this.bumpSpace(), this.bumpIf("/>")) return { val: { type: s.literal, value: "<" + n3 + "/>", location: D(r3, this.clonePosition()) }, err: null };
      if (this.bumpIf(">")) {
        var i3 = this.parseMessage(e4 + 1, t3, true);
        if (i3.err) return i3;
        var a2 = i3.val, l2 = this.clonePosition();
        if (this.bumpIf("</")) {
          if (this.isEOF() || !re(this.char())) return this.error(o2.INVALID_TAG, D(l2, this.clonePosition()));
          var c2 = this.clonePosition();
          return n3 !== this.parseTagName() ? this.error(o2.UNMATCHED_CLOSING_TAG, D(c2, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? { val: { type: s.tag, value: n3, children: a2, location: D(r3, this.clonePosition()) }, err: null } : this.error(o2.INVALID_TAG, D(l2, this.clonePosition())));
        }
        return this.error(o2.UNCLOSED_TAG, D(r3, this.clonePosition()));
      }
      return this.error(o2.INVALID_TAG, D(r3, this.clonePosition()));
    }, e3.prototype.parseTagName = function() {
      var e4, t3 = this.offset();
      for (this.bump(); !this.isEOF() && (45 === (e4 = this.char()) || 46 === e4 || e4 >= 48 && e4 <= 57 || 95 === e4 || e4 >= 97 && e4 <= 122 || e4 >= 65 && e4 <= 90 || 183 == e4 || e4 >= 192 && e4 <= 214 || e4 >= 216 && e4 <= 246 || e4 >= 248 && e4 <= 893 || e4 >= 895 && e4 <= 8191 || e4 >= 8204 && e4 <= 8205 || e4 >= 8255 && e4 <= 8256 || e4 >= 8304 && e4 <= 8591 || e4 >= 11264 && e4 <= 12271 || e4 >= 12289 && e4 <= 55295 || e4 >= 63744 && e4 <= 64975 || e4 >= 65008 && e4 <= 65533 || e4 >= 65536 && e4 <= 983039); ) this.bump();
      return this.message.slice(t3, this.offset());
    }, e3.prototype.parseLiteral = function(e4, t3) {
      for (var r3 = this.clonePosition(), n3 = ""; ; ) {
        var i3 = this.tryParseQuote(t3);
        if (i3) n3 += i3;
        else {
          var o3 = this.tryParseUnquoted(e4, t3);
          if (o3) n3 += o3;
          else {
            var a2 = this.tryParseLeftAngleBracket();
            if (!a2) break;
            n3 += a2;
          }
        }
      }
      var l2 = D(r3, this.clonePosition());
      return { val: { type: s.literal, value: n3, location: l2 }, err: null };
    }, e3.prototype.tryParseLeftAngleBracket = function() {
      return this.isEOF() || 60 !== this.char() || !this.ignoreTag && (re(e4 = this.peek() || 0) || 47 === e4) ? null : (this.bump(), "<");
      var e4;
    }, e3.prototype.tryParseQuote = function(e4) {
      if (this.isEOF() || 39 !== this.char()) return null;
      switch (this.peek()) {
        case 39:
          return this.bump(), this.bump(), "'";
        case 123:
        case 60:
        case 62:
        case 125:
          break;
        case 35:
          if ("plural" === e4 || "selectordinal" === e4) break;
          return null;
        default:
          return null;
      }
      this.bump();
      var t3 = [this.char()];
      for (this.bump(); !this.isEOF(); ) {
        var r3 = this.char();
        if (39 === r3) {
          if (39 !== this.peek()) {
            this.bump();
            break;
          }
          t3.push(39), this.bump();
        } else t3.push(r3);
        this.bump();
      }
      return $.apply(void 0, t3);
    }, e3.prototype.tryParseUnquoted = function(e4, t3) {
      if (this.isEOF()) return null;
      var r3 = this.char();
      return 60 === r3 || 123 === r3 || 35 === r3 && ("plural" === t3 || "selectordinal" === t3) || 125 === r3 && e4 > 0 ? null : (this.bump(), $(r3));
    }, e3.prototype.parseArgument = function(e4, t3) {
      var r3 = this.clonePosition();
      if (this.bump(), this.bumpSpace(), this.isEOF()) return this.error(o2.EXPECT_ARGUMENT_CLOSING_BRACE, D(r3, this.clonePosition()));
      if (125 === this.char()) return this.bump(), this.error(o2.EMPTY_ARGUMENT, D(r3, this.clonePosition()));
      var n3 = this.parseIdentifierIfPossible().value;
      if (!n3) return this.error(o2.MALFORMED_ARGUMENT, D(r3, this.clonePosition()));
      if (this.bumpSpace(), this.isEOF()) return this.error(o2.EXPECT_ARGUMENT_CLOSING_BRACE, D(r3, this.clonePosition()));
      switch (this.char()) {
        case 125:
          return this.bump(), { val: { type: s.argument, value: n3, location: D(r3, this.clonePosition()) }, err: null };
        case 44:
          return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(o2.EXPECT_ARGUMENT_CLOSING_BRACE, D(r3, this.clonePosition())) : this.parseArgumentOptions(e4, t3, n3, r3);
        default:
          return this.error(o2.MALFORMED_ARGUMENT, D(r3, this.clonePosition()));
      }
    }, e3.prototype.parseIdentifierIfPossible = function() {
      var e4 = this.clonePosition(), t3 = this.offset(), r3 = G(this.message, t3), n3 = t3 + r3.length;
      return this.bumpTo(n3), { value: r3, location: D(e4, this.clonePosition()) };
    }, e3.prototype.parseArgumentOptions = function(e4, t3, r3, n3) {
      var i3, c2 = this.clonePosition(), u2 = this.parseIdentifierIfPossible().value, d2 = this.clonePosition();
      switch (u2) {
        case "":
          return this.error(o2.EXPECT_ARGUMENT_TYPE, D(c2, d2));
        case "number":
        case "date":
        case "time":
          this.bumpSpace();
          var p2 = null;
          if (this.bumpIf(",")) {
            this.bumpSpace();
            var f2 = this.clonePosition();
            if ((E2 = this.parseSimpleArgStyleIfPossible()).err) return E2;
            if (0 === (g2 = Z(E2.val)).length) return this.error(o2.EXPECT_ARGUMENT_STYLE, D(this.clonePosition(), this.clonePosition()));
            p2 = { style: g2, styleLocation: D(f2, this.clonePosition()) };
          }
          if ((_2 = this.tryParseArgumentClose(n3)).err) return _2;
          var m2 = D(n3, this.clonePosition());
          if (p2 && q(null == p2 ? void 0 : p2.style, "::", 0)) {
            var h2 = Q(p2.style.slice(2));
            if ("number" === u2) return (E2 = this.parseNumberSkeletonFromString(h2, p2.styleLocation)).err ? E2 : { val: { type: s.number, value: r3, location: m2, style: E2.val }, err: null };
            if (0 === h2.length) return this.error(o2.EXPECT_DATE_TIME_SKELETON, m2);
            var g2 = { type: a.dateTime, pattern: h2, location: p2.styleLocation, parsedOptions: this.shouldParseSkeletons ? S(h2) : {} };
            return { val: { type: "date" === u2 ? s.date : s.time, value: r3, location: m2, style: g2 }, err: null };
          }
          return { val: { type: "number" === u2 ? s.number : "date" === u2 ? s.date : s.time, value: r3, location: m2, style: null !== (i3 = null == p2 ? void 0 : p2.style) && void 0 !== i3 ? i3 : null }, err: null };
        case "plural":
        case "selectordinal":
        case "select":
          var y2 = this.clonePosition();
          if (this.bumpSpace(), !this.bumpIf(",")) return this.error(o2.EXPECT_SELECT_ARGUMENT_OPTIONS, D(y2, l({}, y2)));
          this.bumpSpace();
          var v2 = this.parseIdentifierIfPossible(), b2 = 0;
          if ("select" !== u2 && "offset" === v2.value) {
            if (!this.bumpIf(":")) return this.error(o2.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, D(this.clonePosition(), this.clonePosition()));
            var E2;
            if (this.bumpSpace(), (E2 = this.tryParseDecimalInteger(o2.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, o2.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE)).err) return E2;
            this.bumpSpace(), v2 = this.parseIdentifierIfPossible(), b2 = E2.val;
          }
          var _2, T2 = this.tryParsePluralOrSelectOptions(e4, u2, t3, v2);
          if (T2.err) return T2;
          if ((_2 = this.tryParseArgumentClose(n3)).err) return _2;
          var P2 = D(n3, this.clonePosition());
          return "select" === u2 ? { val: { type: s.select, value: r3, options: Y(T2.val), location: P2 }, err: null } : { val: { type: s.plural, value: r3, options: Y(T2.val), offset: b2, pluralType: "plural" === u2 ? "cardinal" : "ordinal", location: P2 }, err: null };
        default:
          return this.error(o2.INVALID_ARGUMENT_TYPE, D(c2, d2));
      }
    }, e3.prototype.tryParseArgumentClose = function(e4) {
      return this.isEOF() || 125 !== this.char() ? this.error(o2.EXPECT_ARGUMENT_CLOSING_BRACE, D(e4, this.clonePosition())) : (this.bump(), { val: true, err: null });
    }, e3.prototype.parseSimpleArgStyleIfPossible = function() {
      for (var e4 = 0, t3 = this.clonePosition(); !this.isEOF(); ) switch (this.char()) {
        case 39:
          this.bump();
          var r3 = this.clonePosition();
          if (!this.bumpUntil("'")) return this.error(o2.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, D(r3, this.clonePosition()));
          this.bump();
          break;
        case 123:
          e4 += 1, this.bump();
          break;
        case 125:
          if (!(e4 > 0)) return { val: this.message.slice(t3.offset, this.offset()), err: null };
          e4 -= 1;
          break;
        default:
          this.bump();
      }
      return { val: this.message.slice(t3.offset, this.offset()), err: null };
    }, e3.prototype.parseNumberSkeletonFromString = function(e4, t3) {
      var r3 = [];
      try {
        r3 = function(e5) {
          if (0 === e5.length) throw new Error("Number skeleton cannot be empty");
          for (var t4 = [], r4 = 0, n3 = e5.split(w).filter(function(e6) {
            return e6.length > 0;
          }); r4 < n3.length; r4++) {
            var i3 = n3[r4].split("/");
            if (0 === i3.length) throw new Error("Invalid number skeleton");
            for (var o3 = i3[0], s2 = i3.slice(1), a2 = 0, l2 = s2; a2 < l2.length; a2++) if (0 === l2[a2].length) throw new Error("Invalid number skeleton");
            t4.push({ stem: o3, options: s2 });
          }
          return t4;
        }(e4);
      } catch (e5) {
        return this.error(o2.INVALID_NUMBER_SKELETON, t3);
      }
      return { val: { type: a.number, tokens: r3, location: t3, parsedOptions: this.shouldParseSkeletons ? N(r3) : {} }, err: null };
    }, e3.prototype.tryParsePluralOrSelectOptions = function(e4, t3, r3, n3) {
      for (var i3, s2 = false, a2 = [], l2 = /* @__PURE__ */ new Set(), c2 = n3.value, u2 = n3.location; ; ) {
        if (0 === c2.length) {
          var d2 = this.clonePosition();
          if ("select" === t3 || !this.bumpIf("=")) break;
          var p2 = this.tryParseDecimalInteger(o2.EXPECT_PLURAL_ARGUMENT_SELECTOR, o2.INVALID_PLURAL_ARGUMENT_SELECTOR);
          if (p2.err) return p2;
          u2 = D(d2, this.clonePosition()), c2 = this.message.slice(d2.offset, this.offset());
        }
        if (l2.has(c2)) return this.error("select" === t3 ? o2.DUPLICATE_SELECT_ARGUMENT_SELECTOR : o2.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, u2);
        "other" === c2 && (s2 = true), this.bumpSpace();
        var f2 = this.clonePosition();
        if (!this.bumpIf("{")) return this.error("select" === t3 ? o2.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : o2.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, D(this.clonePosition(), this.clonePosition()));
        var m2 = this.parseMessage(e4 + 1, t3, r3);
        if (m2.err) return m2;
        var h2 = this.tryParseArgumentClose(f2);
        if (h2.err) return h2;
        a2.push([c2, { value: m2.val, location: D(f2, this.clonePosition()) }]), l2.add(c2), this.bumpSpace(), c2 = (i3 = this.parseIdentifierIfPossible()).value, u2 = i3.location;
      }
      return 0 === a2.length ? this.error("select" === t3 ? o2.EXPECT_SELECT_ARGUMENT_SELECTOR : o2.EXPECT_PLURAL_ARGUMENT_SELECTOR, D(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !s2 ? this.error(o2.MISSING_OTHER_CLAUSE, D(this.clonePosition(), this.clonePosition())) : { val: a2, err: null };
    }, e3.prototype.tryParseDecimalInteger = function(e4, t3) {
      var r3 = 1, n3 = this.clonePosition();
      this.bumpIf("+") || this.bumpIf("-") && (r3 = -1);
      for (var i3 = false, o3 = 0; !this.isEOF(); ) {
        var s2 = this.char();
        if (!(s2 >= 48 && s2 <= 57)) break;
        i3 = true, o3 = 10 * o3 + (s2 - 48), this.bump();
      }
      var a2 = D(n3, this.clonePosition());
      return i3 ? V(o3 *= r3) ? { val: o3, err: null } : this.error(t3, a2) : this.error(e4, a2);
    }, e3.prototype.offset = function() {
      return this.position.offset;
    }, e3.prototype.isEOF = function() {
      return this.offset() === this.message.length;
    }, e3.prototype.clonePosition = function() {
      return { offset: this.position.offset, line: this.position.line, column: this.position.column };
    }, e3.prototype.char = function() {
      var e4 = this.position.offset;
      if (e4 >= this.message.length) throw Error("out of bound");
      var t3 = X(this.message, e4);
      if (void 0 === t3) throw Error("Offset " + e4 + " is at invalid UTF-16 code unit boundary");
      return t3;
    }, e3.prototype.error = function(e4, t3) {
      return { val: null, err: { kind: e4, message: this.message, location: t3 } };
    }, e3.prototype.bump = function() {
      if (!this.isEOF()) {
        var e4 = this.char();
        10 === e4 ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += e4 < 65536 ? 1 : 2);
      }
    }, e3.prototype.bumpIf = function(e4) {
      if (q(this.message, e4, this.offset())) {
        for (var t3 = 0; t3 < e4.length; t3++) this.bump();
        return true;
      }
      return false;
    }, e3.prototype.bumpUntil = function(e4) {
      var t3 = this.offset(), r3 = this.message.indexOf(e4, t3);
      return r3 >= 0 ? (this.bumpTo(r3), true) : (this.bumpTo(this.message.length), false);
    }, e3.prototype.bumpTo = function(e4) {
      if (this.offset() > e4) throw Error("targetOffset " + e4 + " must be greater than or equal to the current offset " + this.offset());
      for (e4 = Math.min(e4, this.message.length); ; ) {
        var t3 = this.offset();
        if (t3 === e4) break;
        if (t3 > e4) throw Error("targetOffset " + e4 + " is at invalid UTF-16 code unit boundary");
        if (this.bump(), this.isEOF()) break;
      }
    }, e3.prototype.bumpSpace = function() {
      for (; !this.isEOF() && ne(this.char()); ) this.bump();
    }, e3.prototype.peek = function() {
      if (this.isEOF()) return null;
      var e4 = this.char(), t3 = this.offset(), r3 = this.message.charCodeAt(t3 + (e4 >= 65536 ? 2 : 1));
      return null != r3 ? r3 : null;
    }, e3;
  }();
  function re(e3) {
    return e3 >= 97 && e3 <= 122 || e3 >= 65 && e3 <= 90;
  }
  function ne(e3) {
    return e3 >= 9 && e3 <= 13 || 32 === e3 || 133 === e3 || e3 >= 8206 && e3 <= 8207 || 8232 === e3 || 8233 === e3;
  }
  function ie(e3) {
    return e3 >= 33 && e3 <= 35 || 36 === e3 || e3 >= 37 && e3 <= 39 || 40 === e3 || 41 === e3 || 42 === e3 || 43 === e3 || 44 === e3 || 45 === e3 || e3 >= 46 && e3 <= 47 || e3 >= 58 && e3 <= 59 || e3 >= 60 && e3 <= 62 || e3 >= 63 && e3 <= 64 || 91 === e3 || 92 === e3 || 93 === e3 || 94 === e3 || 96 === e3 || 123 === e3 || 124 === e3 || 125 === e3 || 126 === e3 || 161 === e3 || e3 >= 162 && e3 <= 165 || 166 === e3 || 167 === e3 || 169 === e3 || 171 === e3 || 172 === e3 || 174 === e3 || 176 === e3 || 177 === e3 || 182 === e3 || 187 === e3 || 191 === e3 || 215 === e3 || 247 === e3 || e3 >= 8208 && e3 <= 8213 || e3 >= 8214 && e3 <= 8215 || 8216 === e3 || 8217 === e3 || 8218 === e3 || e3 >= 8219 && e3 <= 8220 || 8221 === e3 || 8222 === e3 || 8223 === e3 || e3 >= 8224 && e3 <= 8231 || e3 >= 8240 && e3 <= 8248 || 8249 === e3 || 8250 === e3 || e3 >= 8251 && e3 <= 8254 || e3 >= 8257 && e3 <= 8259 || 8260 === e3 || 8261 === e3 || 8262 === e3 || e3 >= 8263 && e3 <= 8273 || 8274 === e3 || 8275 === e3 || e3 >= 8277 && e3 <= 8286 || e3 >= 8592 && e3 <= 8596 || e3 >= 8597 && e3 <= 8601 || e3 >= 8602 && e3 <= 8603 || e3 >= 8604 && e3 <= 8607 || 8608 === e3 || e3 >= 8609 && e3 <= 8610 || 8611 === e3 || e3 >= 8612 && e3 <= 8613 || 8614 === e3 || e3 >= 8615 && e3 <= 8621 || 8622 === e3 || e3 >= 8623 && e3 <= 8653 || e3 >= 8654 && e3 <= 8655 || e3 >= 8656 && e3 <= 8657 || 8658 === e3 || 8659 === e3 || 8660 === e3 || e3 >= 8661 && e3 <= 8691 || e3 >= 8692 && e3 <= 8959 || e3 >= 8960 && e3 <= 8967 || 8968 === e3 || 8969 === e3 || 8970 === e3 || 8971 === e3 || e3 >= 8972 && e3 <= 8991 || e3 >= 8992 && e3 <= 8993 || e3 >= 8994 && e3 <= 9e3 || 9001 === e3 || 9002 === e3 || e3 >= 9003 && e3 <= 9083 || 9084 === e3 || e3 >= 9085 && e3 <= 9114 || e3 >= 9115 && e3 <= 9139 || e3 >= 9140 && e3 <= 9179 || e3 >= 9180 && e3 <= 9185 || e3 >= 9186 && e3 <= 9254 || e3 >= 9255 && e3 <= 9279 || e3 >= 9280 && e3 <= 9290 || e3 >= 9291 && e3 <= 9311 || e3 >= 9472 && e3 <= 9654 || 9655 === e3 || e3 >= 9656 && e3 <= 9664 || 9665 === e3 || e3 >= 9666 && e3 <= 9719 || e3 >= 9720 && e3 <= 9727 || e3 >= 9728 && e3 <= 9838 || 9839 === e3 || e3 >= 9840 && e3 <= 10087 || 10088 === e3 || 10089 === e3 || 10090 === e3 || 10091 === e3 || 10092 === e3 || 10093 === e3 || 10094 === e3 || 10095 === e3 || 10096 === e3 || 10097 === e3 || 10098 === e3 || 10099 === e3 || 10100 === e3 || 10101 === e3 || e3 >= 10132 && e3 <= 10175 || e3 >= 10176 && e3 <= 10180 || 10181 === e3 || 10182 === e3 || e3 >= 10183 && e3 <= 10213 || 10214 === e3 || 10215 === e3 || 10216 === e3 || 10217 === e3 || 10218 === e3 || 10219 === e3 || 10220 === e3 || 10221 === e3 || 10222 === e3 || 10223 === e3 || e3 >= 10224 && e3 <= 10239 || e3 >= 10240 && e3 <= 10495 || e3 >= 10496 && e3 <= 10626 || 10627 === e3 || 10628 === e3 || 10629 === e3 || 10630 === e3 || 10631 === e3 || 10632 === e3 || 10633 === e3 || 10634 === e3 || 10635 === e3 || 10636 === e3 || 10637 === e3 || 10638 === e3 || 10639 === e3 || 10640 === e3 || 10641 === e3 || 10642 === e3 || 10643 === e3 || 10644 === e3 || 10645 === e3 || 10646 === e3 || 10647 === e3 || 10648 === e3 || e3 >= 10649 && e3 <= 10711 || 10712 === e3 || 10713 === e3 || 10714 === e3 || 10715 === e3 || e3 >= 10716 && e3 <= 10747 || 10748 === e3 || 10749 === e3 || e3 >= 10750 && e3 <= 11007 || e3 >= 11008 && e3 <= 11055 || e3 >= 11056 && e3 <= 11076 || e3 >= 11077 && e3 <= 11078 || e3 >= 11079 && e3 <= 11084 || e3 >= 11085 && e3 <= 11123 || e3 >= 11124 && e3 <= 11125 || e3 >= 11126 && e3 <= 11157 || 11158 === e3 || e3 >= 11159 && e3 <= 11263 || e3 >= 11776 && e3 <= 11777 || 11778 === e3 || 11779 === e3 || 11780 === e3 || 11781 === e3 || e3 >= 11782 && e3 <= 11784 || 11785 === e3 || 11786 === e3 || 11787 === e3 || 11788 === e3 || 11789 === e3 || e3 >= 11790 && e3 <= 11798 || 11799 === e3 || e3 >= 11800 && e3 <= 11801 || 11802 === e3 || 11803 === e3 || 11804 === e3 || 11805 === e3 || e3 >= 11806 && e3 <= 11807 || 11808 === e3 || 11809 === e3 || 11810 === e3 || 11811 === e3 || 11812 === e3 || 11813 === e3 || 11814 === e3 || 11815 === e3 || 11816 === e3 || 11817 === e3 || e3 >= 11818 && e3 <= 11822 || 11823 === e3 || e3 >= 11824 && e3 <= 11833 || e3 >= 11834 && e3 <= 11835 || e3 >= 11836 && e3 <= 11839 || 11840 === e3 || 11841 === e3 || 11842 === e3 || e3 >= 11843 && e3 <= 11855 || e3 >= 11856 && e3 <= 11857 || 11858 === e3 || e3 >= 11859 && e3 <= 11903 || e3 >= 12289 && e3 <= 12291 || 12296 === e3 || 12297 === e3 || 12298 === e3 || 12299 === e3 || 12300 === e3 || 12301 === e3 || 12302 === e3 || 12303 === e3 || 12304 === e3 || 12305 === e3 || e3 >= 12306 && e3 <= 12307 || 12308 === e3 || 12309 === e3 || 12310 === e3 || 12311 === e3 || 12312 === e3 || 12313 === e3 || 12314 === e3 || 12315 === e3 || 12316 === e3 || 12317 === e3 || e3 >= 12318 && e3 <= 12319 || 12320 === e3 || 12336 === e3 || 64830 === e3 || 64831 === e3 || e3 >= 65093 && e3 <= 65094;
  }
  function oe(e3) {
    e3.forEach(function(e4) {
      if (delete e4.location, h(e4) || g(e4)) for (var t3 in e4.options) delete e4.options[t3].location, oe(e4.options[t3].value);
      else p(e4) && b(e4.style) || (f(e4) || m(e4)) && E(e4.style) ? delete e4.style.location : v(e4) && oe(e4.children);
    });
  }
  function se(e3, t3) {
    void 0 === t3 && (t3 = {}), t3 = l({ shouldParseSkeletons: true, requiresOtherClause: true }, t3);
    var r3 = new te(e3, t3).parse();
    if (r3.err) {
      var n3 = SyntaxError(o2[r3.err.kind]);
      throw n3.location = r3.err.location, n3.originalMessage = r3.err.message, n3;
    }
    return (null == t3 ? void 0 : t3.captureLocation) || oe(r3.val), r3.val;
  }
  function ae(e3, t3) {
    var r3 = t3 && t3.cache ? t3.cache : he, n3 = t3 && t3.serializer ? t3.serializer : pe;
    return (t3 && t3.strategy ? t3.strategy : de)(e3, { cache: r3, serializer: n3 });
  }
  function le(e3, t3, r3, n3) {
    var i3, o3 = null == (i3 = n3) || "number" == typeof i3 || "boolean" == typeof i3 ? n3 : r3(n3), s2 = t3.get(o3);
    return void 0 === s2 && (s2 = e3.call(this, n3), t3.set(o3, s2)), s2;
  }
  function ce(e3, t3, r3) {
    var n3 = Array.prototype.slice.call(arguments, 3), i3 = r3(n3), o3 = t3.get(i3);
    return void 0 === o3 && (o3 = e3.apply(this, n3), t3.set(i3, o3)), o3;
  }
  function ue(e3, t3, r3, n3, i3) {
    return r3.bind(t3, e3, n3, i3);
  }
  function de(e3, t3) {
    return ue(e3, this, 1 === e3.length ? le : ce, t3.cache.create(), t3.serializer);
  }
  var pe = function() {
    return JSON.stringify(arguments);
  };
  function fe() {
    this.cache = /* @__PURE__ */ Object.create(null);
  }
  fe.prototype.get = function(e3) {
    return this.cache[e3];
  }, fe.prototype.set = function(e3, t3) {
    this.cache[e3] = t3;
  };
  var me, he = { create: function() {
    return new fe();
  } }, ge = { variadic: function(e3, t3) {
    return ue(e3, this, ce, t3.cache.create(), t3.serializer);
  }, monadic: function(e3, t3) {
    return ue(e3, this, le, t3.cache.create(), t3.serializer);
  } };
  !function(e3) {
    e3.MISSING_VALUE = "MISSING_VALUE", e3.INVALID_VALUE = "INVALID_VALUE", e3.MISSING_INTL_API = "MISSING_INTL_API";
  }(me || (me = {}));
  var ye, ve = function(e3) {
    function t3(t4, r3, n3) {
      var i3 = e3.call(this, t4) || this;
      return i3.code = r3, i3.originalMessage = n3, i3;
    }
    return i2(t3, e3), t3.prototype.toString = function() {
      return "[formatjs Error: " + this.code + "] " + this.message;
    }, t3;
  }(Error), be = function(e3) {
    function t3(t4, r3, n3, i3) {
      return e3.call(this, 'Invalid values for "' + t4 + '": "' + r3 + '". Options are "' + Object.keys(n3).join('", "') + '"', me.INVALID_VALUE, i3) || this;
    }
    return i2(t3, e3), t3;
  }(ve), Ee = function(e3) {
    function t3(t4, r3, n3) {
      return e3.call(this, 'Value for "' + t4 + '" must be of type ' + r3, me.INVALID_VALUE, n3) || this;
    }
    return i2(t3, e3), t3;
  }(ve), _e = function(e3) {
    function t3(t4, r3) {
      return e3.call(this, 'The intl string context variable "' + t4 + '" was not provided to the string "' + r3 + '"', me.MISSING_VALUE, r3) || this;
    }
    return i2(t3, e3), t3;
  }(ve);
  function Te(e3) {
    return "function" == typeof e3;
  }
  function Se(e3, t3, r3, n3, i3, o3, s2) {
    if (1 === e3.length && u(e3[0])) return [{ type: ye.literal, value: e3[0].value }];
    for (var a2 = [], l2 = 0, c2 = e3; l2 < c2.length; l2++) {
      var _2 = c2[l2];
      if (u(_2)) a2.push({ type: ye.literal, value: _2.value });
      else if (y(_2)) "number" == typeof o3 && a2.push({ type: ye.literal, value: r3.getNumberFormat(t3).format(o3) });
      else {
        var T2 = _2.value;
        if (!i3 || !(T2 in i3)) throw new _e(T2, s2);
        var S2 = i3[T2];
        if (d(_2)) S2 && "string" != typeof S2 && "number" != typeof S2 || (S2 = "string" == typeof S2 || "number" == typeof S2 ? String(S2) : ""), a2.push({ type: "string" == typeof S2 ? ye.literal : ye.object, value: S2 });
        else if (f(_2)) {
          var P2 = "string" == typeof _2.style ? n3.date[_2.style] : E(_2.style) ? _2.style.parsedOptions : void 0;
          a2.push({ type: ye.literal, value: r3.getDateTimeFormat(t3, P2).format(S2) });
        } else if (m(_2)) P2 = "string" == typeof _2.style ? n3.time[_2.style] : E(_2.style) ? _2.style.parsedOptions : void 0, a2.push({ type: ye.literal, value: r3.getDateTimeFormat(t3, P2).format(S2) });
        else if (p(_2)) (P2 = "string" == typeof _2.style ? n3.number[_2.style] : b(_2.style) ? _2.style.parsedOptions : void 0) && P2.scale && (S2 *= P2.scale || 1), a2.push({ type: ye.literal, value: r3.getNumberFormat(t3, P2).format(S2) });
        else {
          if (v(_2)) {
            var w2 = _2.children, C2 = _2.value, x2 = i3[C2];
            if (!Te(x2)) throw new Ee(C2, "function", s2);
            var O2 = x2(Se(w2, t3, r3, n3, i3, o3).map(function(e4) {
              return e4.value;
            }));
            Array.isArray(O2) || (O2 = [O2]), a2.push.apply(a2, O2.map(function(e4) {
              return { type: "string" == typeof e4 ? ye.literal : ye.object, value: e4 };
            }));
          }
          if (h(_2)) {
            if (!(I2 = _2.options[S2] || _2.options.other)) throw new be(_2.value, S2, Object.keys(_2.options), s2);
            a2.push.apply(a2, Se(I2.value, t3, r3, n3, i3));
          } else if (g(_2)) {
            var I2;
            if (!(I2 = _2.options["=" + S2])) {
              if (!Intl.PluralRules) throw new ve('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', me.MISSING_INTL_API, s2);
              var R2 = r3.getPluralRules(t3, { type: _2.pluralType }).select(S2 - (_2.offset || 0));
              I2 = _2.options[R2] || _2.options.other;
            }
            if (!I2) throw new be(_2.value, S2, Object.keys(_2.options), s2);
            a2.push.apply(a2, Se(I2.value, t3, r3, n3, i3, S2 - (_2.offset || 0)));
          }
        }
      }
    }
    return (A2 = a2).length < 2 ? A2 : A2.reduce(function(e4, t4) {
      var r4 = e4[e4.length - 1];
      return r4 && r4.type === ye.literal && t4.type === ye.literal ? r4.value += t4.value : e4.push(t4), e4;
    }, []);
    var A2;
  }
  function Pe(e3) {
    return { create: function() {
      return { get: function(t3) {
        return e3[t3];
      }, set: function(t3, r3) {
        e3[t3] = r3;
      } };
    } };
  }
  !function(e3) {
    e3[e3.literal = 0] = "literal", e3[e3.object = 1] = "object";
  }(ye || (ye = {}));
  var we = function() {
    function e3(t3, r3, n3, i3) {
      var o3, s2, a2, u2 = this;
      if (void 0 === r3 && (r3 = e3.defaultLocale), this.formatterCache = { number: {}, dateTime: {}, pluralRules: {} }, this.format = function(e4) {
        var t4 = u2.formatToParts(e4);
        if (1 === t4.length) return t4[0].value;
        var r4 = t4.reduce(function(e5, t5) {
          return e5.length && t5.type === ye.literal && "string" == typeof e5[e5.length - 1] ? e5[e5.length - 1] += t5.value : e5.push(t5.value), e5;
        }, []);
        return r4.length <= 1 ? r4[0] || "" : r4;
      }, this.formatToParts = function(e4) {
        return Se(u2.ast, u2.locales, u2.formatters, u2.formats, e4, void 0, u2.message);
      }, this.resolvedOptions = function() {
        return { locale: Intl.NumberFormat.supportedLocalesOf(u2.locales)[0] };
      }, this.getAst = function() {
        return u2.ast;
      }, "string" == typeof t3) {
        if (this.message = t3, !e3.__parse) throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
        this.ast = e3.__parse(t3, { ignoreTag: null == i3 ? void 0 : i3.ignoreTag });
      } else this.ast = t3;
      if (!Array.isArray(this.ast)) throw new TypeError("A message must be provided as a String or AST.");
      this.formats = (s2 = e3.formats, (a2 = n3) ? Object.keys(s2).reduce(function(e4, t4) {
        var r4, n4;
        return e4[t4] = (r4 = s2[t4], (n4 = a2[t4]) ? l(l(l({}, r4 || {}), n4 || {}), Object.keys(r4).reduce(function(e5, t5) {
          return e5[t5] = l(l({}, r4[t5]), n4[t5] || {}), e5;
        }, {})) : r4), e4;
      }, l({}, s2)) : s2), this.locales = r3, this.formatters = i3 && i3.formatters || (void 0 === (o3 = this.formatterCache) && (o3 = { number: {}, dateTime: {}, pluralRules: {} }), { getNumberFormat: ae(function() {
        for (var e4, t4 = [], r4 = 0; r4 < arguments.length; r4++) t4[r4] = arguments[r4];
        return new ((e4 = Intl.NumberFormat).bind.apply(e4, c([void 0], t4)))();
      }, { cache: Pe(o3.number), strategy: ge.variadic }), getDateTimeFormat: ae(function() {
        for (var e4, t4 = [], r4 = 0; r4 < arguments.length; r4++) t4[r4] = arguments[r4];
        return new ((e4 = Intl.DateTimeFormat).bind.apply(e4, c([void 0], t4)))();
      }, { cache: Pe(o3.dateTime), strategy: ge.variadic }), getPluralRules: ae(function() {
        for (var e4, t4 = [], r4 = 0; r4 < arguments.length; r4++) t4[r4] = arguments[r4];
        return new ((e4 = Intl.PluralRules).bind.apply(e4, c([void 0], t4)))();
      }, { cache: Pe(o3.pluralRules), strategy: ge.variadic }) });
    }
    return Object.defineProperty(e3, "defaultLocale", { get: function() {
      return e3.memoizedDefaultLocale || (e3.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), e3.memoizedDefaultLocale;
    }, enumerable: false, configurable: true }), e3.memoizedDefaultLocale = null, e3.__parse = se, e3.formats = { number: { integer: { maximumFractionDigits: 0 }, currency: { style: "currency" }, percent: { style: "percent" } }, date: { short: { month: "numeric", day: "numeric", year: "2-digit" }, medium: { month: "short", day: "numeric", year: "numeric" }, long: { month: "long", day: "numeric", year: "numeric" }, full: { weekday: "long", month: "long", day: "numeric", year: "numeric" } }, time: { short: { hour: "numeric", minute: "numeric" }, medium: { hour: "numeric", minute: "numeric", second: "numeric" }, long: { hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short" }, full: { hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short" } } }, e3;
  }();
  const Ce = we;
}, 594: (e2, t2, r2) => {
  var n2 = /^\s+|\s+$/g, i2 = /^[-+]0x[0-9a-f]+$/i, o2 = /^0b[01]+$/i, s = /^0o[0-7]+$/i, a = parseInt, l = "object" == typeof r2.g && r2.g && r2.g.Object === Object && r2.g, c = "object" == typeof self && self && self.Object === Object && self, u = l || c || Function("return this")(), d = Object.prototype.toString, p = Math.max, f = Math.min, m = function() {
    return u.Date.now();
  };
  function h(e3) {
    var t3 = typeof e3;
    return !!e3 && ("object" == t3 || "function" == t3);
  }
  function g(e3) {
    if ("number" == typeof e3) return e3;
    if (function(e4) {
      return "symbol" == typeof e4 || /* @__PURE__ */ function(e5) {
        return !!e5 && "object" == typeof e5;
      }(e4) && "[object Symbol]" == d.call(e4);
    }(e3)) return NaN;
    if (h(e3)) {
      var t3 = "function" == typeof e3.valueOf ? e3.valueOf() : e3;
      e3 = h(t3) ? t3 + "" : t3;
    }
    if ("string" != typeof e3) return 0 === e3 ? e3 : +e3;
    e3 = e3.replace(n2, "");
    var r3 = o2.test(e3);
    return r3 || s.test(e3) ? a(e3.slice(2), r3 ? 2 : 8) : i2.test(e3) ? NaN : +e3;
  }
  e2.exports = function(e3, t3, r3) {
    var n3, i3, o3, s2, a2, l2, c2 = 0, u2 = false, d2 = false, y = true;
    if ("function" != typeof e3) throw new TypeError("Expected a function");
    function v(t4) {
      var r4 = n3, o4 = i3;
      return n3 = i3 = void 0, c2 = t4, s2 = e3.apply(o4, r4);
    }
    function b(e4) {
      var r4 = e4 - l2;
      return void 0 === l2 || r4 >= t3 || r4 < 0 || d2 && e4 - c2 >= o3;
    }
    function E() {
      var e4 = m();
      if (b(e4)) return _(e4);
      a2 = setTimeout(E, function(e5) {
        var r4 = t3 - (e5 - l2);
        return d2 ? f(r4, o3 - (e5 - c2)) : r4;
      }(e4));
    }
    function _(e4) {
      return a2 = void 0, y && n3 ? v(e4) : (n3 = i3 = void 0, s2);
    }
    function T() {
      var e4 = m(), r4 = b(e4);
      if (n3 = arguments, i3 = this, l2 = e4, r4) {
        if (void 0 === a2) return function(e5) {
          return c2 = e5, a2 = setTimeout(E, t3), u2 ? v(e5) : s2;
        }(l2);
        if (d2) return a2 = setTimeout(E, t3), v(l2);
      }
      return void 0 === a2 && (a2 = setTimeout(E, t3)), s2;
    }
    return t3 = g(t3) || 0, h(r3) && (u2 = !!r3.leading, o3 = (d2 = "maxWait" in r3) ? p(g(r3.maxWait) || 0, t3) : o3, y = "trailing" in r3 ? !!r3.trailing : y), T.cancel = function() {
      void 0 !== a2 && clearTimeout(a2), c2 = 0, n3 = l2 = i3 = a2 = void 0;
    }, T.flush = function() {
      return void 0 === a2 ? s2 : _(m());
    }, T;
  };
}, 9515: (e2, t2, r2) => {
  var n2 = r2(8761)(r2(7772), "DataView");
  e2.exports = n2;
}, 9612: (e2, t2, r2) => {
  var n2 = r2(2118), i2 = r2(6909), o2 = r2(8138), s = r2(4174), a = r2(7942);
  function l(e3) {
    var t3 = -1, r3 = null == e3 ? 0 : e3.length;
    for (this.clear(); ++t3 < r3; ) {
      var n3 = e3[t3];
      this.set(n3[0], n3[1]);
    }
  }
  l.prototype.clear = n2, l.prototype.delete = i2, l.prototype.get = o2, l.prototype.has = s, l.prototype.set = a, e2.exports = l;
}, 235: (e2, t2, r2) => {
  var n2 = r2(3945), i2 = r2(1846), o2 = r2(8028), s = r2(2344), a = r2(4769);
  function l(e3) {
    var t3 = -1, r3 = null == e3 ? 0 : e3.length;
    for (this.clear(); ++t3 < r3; ) {
      var n3 = e3[t3];
      this.set(n3[0], n3[1]);
    }
  }
  l.prototype.clear = n2, l.prototype.delete = i2, l.prototype.get = o2, l.prototype.has = s, l.prototype.set = a, e2.exports = l;
}, 326: (e2, t2, r2) => {
  var n2 = r2(8761)(r2(7772), "Map");
  e2.exports = n2;
}, 6738: (e2, t2, r2) => {
  var n2 = r2(2411), i2 = r2(6417), o2 = r2(6928), s = r2(9493), a = r2(4150);
  function l(e3) {
    var t3 = -1, r3 = null == e3 ? 0 : e3.length;
    for (this.clear(); ++t3 < r3; ) {
      var n3 = e3[t3];
      this.set(n3[0], n3[1]);
    }
  }
  l.prototype.clear = n2, l.prototype.delete = i2, l.prototype.get = o2, l.prototype.has = s, l.prototype.set = a, e2.exports = l;
}, 2760: (e2, t2, r2) => {
  var n2 = r2(8761)(r2(7772), "Promise");
  e2.exports = n2;
}, 2143: (e2, t2, r2) => {
  var n2 = r2(8761)(r2(7772), "Set");
  e2.exports = n2;
}, 6571: (e2, t2, r2) => {
  var n2 = r2(235), i2 = r2(5243), o2 = r2(2858), s = r2(4417), a = r2(8605), l = r2(1418);
  function c(e3) {
    var t3 = this.__data__ = new n2(e3);
    this.size = t3.size;
  }
  c.prototype.clear = i2, c.prototype.delete = o2, c.prototype.get = s, c.prototype.has = a, c.prototype.set = l, e2.exports = c;
}, 857: (e2, t2, r2) => {
  var n2 = r2(7772).Symbol;
  e2.exports = n2;
}, 9162: (e2, t2, r2) => {
  var n2 = r2(7772).Uint8Array;
  e2.exports = n2;
}, 3215: (e2, t2, r2) => {
  var n2 = r2(8761)(r2(7772), "WeakMap");
  e2.exports = n2;
}, 2517: (e2) => {
  e2.exports = function(e3, t2) {
    for (var r2 = -1, n2 = null == e3 ? 0 : e3.length; ++r2 < n2 && false !== t2(e3[r2], r2, e3); ) ;
    return e3;
  };
}, 7552: (e2) => {
  e2.exports = function(e3, t2) {
    for (var r2 = -1, n2 = null == e3 ? 0 : e3.length, i2 = 0, o2 = []; ++r2 < n2; ) {
      var s = e3[r2];
      t2(s, r2, e3) && (o2[i2++] = s);
    }
    return o2;
  };
}, 1634: (e2, t2, r2) => {
  var n2 = r2(6473), i2 = r2(2838), o2 = r2(6152), s = r2(3226), a = r2(9045), l = r2(7598), c = Object.prototype.hasOwnProperty;
  e2.exports = function(e3, t3) {
    var r3 = o2(e3), u = !r3 && i2(e3), d = !r3 && !u && s(e3), p = !r3 && !u && !d && l(e3), f = r3 || u || d || p, m = f ? n2(e3.length, String) : [], h = m.length;
    for (var g in e3) !t3 && !c.call(e3, g) || f && ("length" == g || d && ("offset" == g || "parent" == g) || p && ("buffer" == g || "byteLength" == g || "byteOffset" == g) || a(g, h)) || m.push(g);
    return m;
  };
}, 5067: (e2) => {
  e2.exports = function(e3, t2) {
    for (var r2 = -1, n2 = t2.length, i2 = e3.length; ++r2 < n2; ) e3[i2 + r2] = t2[r2];
    return e3;
  };
}, 91: (e2, t2, r2) => {
  var n2 = r2(3940), i2 = r2(1225), o2 = Object.prototype.hasOwnProperty;
  e2.exports = function(e3, t3, r3) {
    var s = e3[t3];
    o2.call(e3, t3) && i2(s, r3) && (void 0 !== r3 || t3 in e3) || n2(e3, t3, r3);
  };
}, 2218: (e2, t2, r2) => {
  var n2 = r2(1225);
  e2.exports = function(e3, t3) {
    for (var r3 = e3.length; r3--; ) if (n2(e3[r3][0], t3)) return r3;
    return -1;
  };
}, 7993: (e2, t2, r2) => {
  var n2 = r2(752), i2 = r2(249);
  e2.exports = function(e3, t3) {
    return e3 && n2(t3, i2(t3), e3);
  };
}, 5906: (e2, t2, r2) => {
  var n2 = r2(752), i2 = r2(8582);
  e2.exports = function(e3, t3) {
    return e3 && n2(t3, i2(t3), e3);
  };
}, 3940: (e2, t2, r2) => {
  var n2 = r2(5840);
  e2.exports = function(e3, t3, r3) {
    "__proto__" == t3 && n2 ? n2(e3, t3, { configurable: true, enumerable: true, value: r3, writable: true }) : e3[t3] = r3;
  };
}, 8874: (e2, t2, r2) => {
  var n2 = r2(6571), i2 = r2(2517), o2 = r2(91), s = r2(7993), a = r2(5906), l = r2(2175), c = r2(1522), u = r2(7680), d = r2(9987), p = r2(3483), f = r2(6939), m = r2(940), h = r2(9917), g = r2(8222), y = r2(8725), v = r2(6152), b = r2(3226), E = r2(4714), _ = r2(9259), T = r2(3679), S = r2(249), P = r2(8582), w = "[object Arguments]", C = "[object Function]", x = "[object Object]", O = {};
  O[w] = O["[object Array]"] = O["[object ArrayBuffer]"] = O["[object DataView]"] = O["[object Boolean]"] = O["[object Date]"] = O["[object Float32Array]"] = O["[object Float64Array]"] = O["[object Int8Array]"] = O["[object Int16Array]"] = O["[object Int32Array]"] = O["[object Map]"] = O["[object Number]"] = O[x] = O["[object RegExp]"] = O["[object Set]"] = O["[object String]"] = O["[object Symbol]"] = O["[object Uint8Array]"] = O["[object Uint8ClampedArray]"] = O["[object Uint16Array]"] = O["[object Uint32Array]"] = true, O["[object Error]"] = O[C] = O["[object WeakMap]"] = false, e2.exports = function e3(t3, r3, I, R, A, M) {
    var L, N = 1 & r3, F = 2 & r3, k = 4 & r3;
    if (I && (L = A ? I(t3, R, A, M) : I(t3)), void 0 !== L) return L;
    if (!_(t3)) return t3;
    var D = v(t3);
    if (D) {
      if (L = h(t3), !N) return c(t3, L);
    } else {
      var U = m(t3), j = U == C || "[object GeneratorFunction]" == U;
      if (b(t3)) return l(t3, N);
      if (U == x || U == w || j && !A) {
        if (L = F || j ? {} : y(t3), !N) return F ? d(t3, a(L, t3)) : u(t3, s(L, t3));
      } else {
        if (!O[U]) return A ? t3 : {};
        L = g(t3, U, N);
      }
    }
    M || (M = new n2());
    var B = M.get(t3);
    if (B) return B;
    M.set(t3, L), T(t3) ? t3.forEach(function(n3) {
      L.add(e3(n3, r3, I, n3, t3, M));
    }) : E(t3) && t3.forEach(function(n3, i3) {
      L.set(i3, e3(n3, r3, I, i3, t3, M));
    });
    var K = D ? void 0 : (k ? F ? f : p : F ? P : S)(t3);
    return i2(K || t3, function(n3, i3) {
      K && (n3 = t3[i3 = n3]), o2(L, i3, e3(n3, r3, I, i3, t3, M));
    }), L;
  };
}, 9413: (e2, t2, r2) => {
  var n2 = r2(9259), i2 = Object.create, o2 = /* @__PURE__ */ function() {
    function e3() {
    }
    return function(t3) {
      if (!n2(t3)) return {};
      if (i2) return i2(t3);
      e3.prototype = t3;
      var r3 = new e3();
      return e3.prototype = void 0, r3;
    };
  }();
  e2.exports = o2;
}, 1897: (e2, t2, r2) => {
  var n2 = r2(5067), i2 = r2(6152);
  e2.exports = function(e3, t3, r3) {
    var o2 = t3(e3);
    return i2(e3) ? o2 : n2(o2, r3(e3));
  };
}, 3366: (e2, t2, r2) => {
  var n2 = r2(857), i2 = r2(2107), o2 = r2(7157), s = n2 ? n2.toStringTag : void 0;
  e2.exports = function(e3) {
    return null == e3 ? void 0 === e3 ? "[object Undefined]" : "[object Null]" : s && s in Object(e3) ? i2(e3) : o2(e3);
  };
}, 5183: (e2, t2, r2) => {
  var n2 = r2(3366), i2 = r2(5125);
  e2.exports = function(e3) {
    return i2(e3) && "[object Arguments]" == n2(e3);
  };
}, 4511: (e2, t2, r2) => {
  var n2 = r2(940), i2 = r2(5125);
  e2.exports = function(e3) {
    return i2(e3) && "[object Map]" == n2(e3);
  };
}, 6840: (e2, t2, r2) => {
  var n2 = r2(1049), i2 = r2(7394), o2 = r2(9259), s = r2(7035), a = /^\[object .+?Constructor\]$/, l = Function.prototype, c = Object.prototype, u = l.toString, d = c.hasOwnProperty, p = RegExp("^" + u.call(d).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  e2.exports = function(e3) {
    return !(!o2(e3) || i2(e3)) && (n2(e3) ? p : a).test(s(e3));
  };
}, 8436: (e2, t2, r2) => {
  var n2 = r2(940), i2 = r2(5125);
  e2.exports = function(e3) {
    return i2(e3) && "[object Set]" == n2(e3);
  };
}, 5522: (e2, t2, r2) => {
  var n2 = r2(3366), i2 = r2(1158), o2 = r2(5125), s = {};
  s["[object Float32Array]"] = s["[object Float64Array]"] = s["[object Int8Array]"] = s["[object Int16Array]"] = s["[object Int32Array]"] = s["[object Uint8Array]"] = s["[object Uint8ClampedArray]"] = s["[object Uint16Array]"] = s["[object Uint32Array]"] = true, s["[object Arguments]"] = s["[object Array]"] = s["[object ArrayBuffer]"] = s["[object Boolean]"] = s["[object DataView]"] = s["[object Date]"] = s["[object Error]"] = s["[object Function]"] = s["[object Map]"] = s["[object Number]"] = s["[object Object]"] = s["[object RegExp]"] = s["[object Set]"] = s["[object String]"] = s["[object WeakMap]"] = false, e2.exports = function(e3) {
    return o2(e3) && i2(e3.length) && !!s[n2(e3)];
  };
}, 6411: (e2, t2, r2) => {
  var n2 = r2(6001), i2 = r2(4248), o2 = Object.prototype.hasOwnProperty;
  e2.exports = function(e3) {
    if (!n2(e3)) return i2(e3);
    var t3 = [];
    for (var r3 in Object(e3)) o2.call(e3, r3) && "constructor" != r3 && t3.push(r3);
    return t3;
  };
}, 8390: (e2, t2, r2) => {
  var n2 = r2(9259), i2 = r2(6001), o2 = r2(2966), s = Object.prototype.hasOwnProperty;
  e2.exports = function(e3) {
    if (!n2(e3)) return o2(e3);
    var t3 = i2(e3), r3 = [];
    for (var a in e3) ("constructor" != a || !t3 && s.call(e3, a)) && r3.push(a);
    return r3;
  };
}, 6473: (e2) => {
  e2.exports = function(e3, t2) {
    for (var r2 = -1, n2 = Array(e3); ++r2 < e3; ) n2[r2] = t2(r2);
    return n2;
  };
}, 7826: (e2) => {
  e2.exports = function(e3) {
    return function(t2) {
      return e3(t2);
    };
  };
}, 9882: (e2, t2, r2) => {
  var n2 = r2(9162);
  e2.exports = function(e3) {
    var t3 = new e3.constructor(e3.byteLength);
    return new n2(t3).set(new n2(e3)), t3;
  };
}, 2175: (e2, t2, r2) => {
  e2 = r2.nmd(e2);
  var n2 = r2(7772), i2 = t2 && !t2.nodeType && t2, o2 = i2 && e2 && !e2.nodeType && e2, s = o2 && o2.exports === i2 ? n2.Buffer : void 0, a = s ? s.allocUnsafe : void 0;
  e2.exports = function(e3, t3) {
    if (t3) return e3.slice();
    var r3 = e3.length, n3 = a ? a(r3) : new e3.constructor(r3);
    return e3.copy(n3), n3;
  };
}, 4727: (e2, t2, r2) => {
  var n2 = r2(9882);
  e2.exports = function(e3, t3) {
    var r3 = t3 ? n2(e3.buffer) : e3.buffer;
    return new e3.constructor(r3, e3.byteOffset, e3.byteLength);
  };
}, 6058: (e2) => {
  var t2 = /\w*$/;
  e2.exports = function(e3) {
    var r2 = new e3.constructor(e3.source, t2.exec(e3));
    return r2.lastIndex = e3.lastIndex, r2;
  };
}, 169: (e2, t2, r2) => {
  var n2 = r2(857), i2 = n2 ? n2.prototype : void 0, o2 = i2 ? i2.valueOf : void 0;
  e2.exports = function(e3) {
    return o2 ? Object(o2.call(e3)) : {};
  };
}, 6190: (e2, t2, r2) => {
  var n2 = r2(9882);
  e2.exports = function(e3, t3) {
    var r3 = t3 ? n2(e3.buffer) : e3.buffer;
    return new e3.constructor(r3, e3.byteOffset, e3.length);
  };
}, 1522: (e2) => {
  e2.exports = function(e3, t2) {
    var r2 = -1, n2 = e3.length;
    for (t2 || (t2 = Array(n2)); ++r2 < n2; ) t2[r2] = e3[r2];
    return t2;
  };
}, 752: (e2, t2, r2) => {
  var n2 = r2(91), i2 = r2(3940);
  e2.exports = function(e3, t3, r3, o2) {
    var s = !r3;
    r3 || (r3 = {});
    for (var a = -1, l = t3.length; ++a < l; ) {
      var c = t3[a], u = o2 ? o2(r3[c], e3[c], c, r3, e3) : void 0;
      void 0 === u && (u = e3[c]), s ? i2(r3, c, u) : n2(r3, c, u);
    }
    return r3;
  };
}, 7680: (e2, t2, r2) => {
  var n2 = r2(752), i2 = r2(633);
  e2.exports = function(e3, t3) {
    return n2(e3, i2(e3), t3);
  };
}, 9987: (e2, t2, r2) => {
  var n2 = r2(752), i2 = r2(2680);
  e2.exports = function(e3, t3) {
    return n2(e3, i2(e3), t3);
  };
}, 4019: (e2, t2, r2) => {
  var n2 = r2(7772)["__core-js_shared__"];
  e2.exports = n2;
}, 5840: (e2, t2, r2) => {
  var n2 = r2(8761), i2 = function() {
    try {
      var e3 = n2(Object, "defineProperty");
      return e3({}, "", {}), e3;
    } catch (e4) {
    }
  }();
  e2.exports = i2;
}, 1242: (e2, t2, r2) => {
  var n2 = "object" == typeof r2.g && r2.g && r2.g.Object === Object && r2.g;
  e2.exports = n2;
}, 3483: (e2, t2, r2) => {
  var n2 = r2(1897), i2 = r2(633), o2 = r2(249);
  e2.exports = function(e3) {
    return n2(e3, o2, i2);
  };
}, 6939: (e2, t2, r2) => {
  var n2 = r2(1897), i2 = r2(2680), o2 = r2(8582);
  e2.exports = function(e3) {
    return n2(e3, o2, i2);
  };
}, 7937: (e2, t2, r2) => {
  var n2 = r2(8304);
  e2.exports = function(e3, t3) {
    var r3 = e3.__data__;
    return n2(t3) ? r3["string" == typeof t3 ? "string" : "hash"] : r3.map;
  };
}, 8761: (e2, t2, r2) => {
  var n2 = r2(6840), i2 = r2(8109);
  e2.exports = function(e3, t3) {
    var r3 = i2(e3, t3);
    return n2(r3) ? r3 : void 0;
  };
}, 7353: (e2, t2, r2) => {
  var n2 = r2(241)(Object.getPrototypeOf, Object);
  e2.exports = n2;
}, 2107: (e2, t2, r2) => {
  var n2 = r2(857), i2 = Object.prototype, o2 = i2.hasOwnProperty, s = i2.toString, a = n2 ? n2.toStringTag : void 0;
  e2.exports = function(e3) {
    var t3 = o2.call(e3, a), r3 = e3[a];
    try {
      e3[a] = void 0;
      var n3 = true;
    } catch (e4) {
    }
    var i3 = s.call(e3);
    return n3 && (t3 ? e3[a] = r3 : delete e3[a]), i3;
  };
}, 633: (e2, t2, r2) => {
  var n2 = r2(7552), i2 = r2(981), o2 = Object.prototype.propertyIsEnumerable, s = Object.getOwnPropertySymbols, a = s ? function(e3) {
    return null == e3 ? [] : (e3 = Object(e3), n2(s(e3), function(t3) {
      return o2.call(e3, t3);
    }));
  } : i2;
  e2.exports = a;
}, 2680: (e2, t2, r2) => {
  var n2 = r2(5067), i2 = r2(7353), o2 = r2(633), s = r2(981), a = Object.getOwnPropertySymbols ? function(e3) {
    for (var t3 = []; e3; ) n2(t3, o2(e3)), e3 = i2(e3);
    return t3;
  } : s;
  e2.exports = a;
}, 940: (e2, t2, r2) => {
  var n2 = r2(9515), i2 = r2(326), o2 = r2(2760), s = r2(2143), a = r2(3215), l = r2(3366), c = r2(7035), u = "[object Map]", d = "[object Promise]", p = "[object Set]", f = "[object WeakMap]", m = "[object DataView]", h = c(n2), g = c(i2), y = c(o2), v = c(s), b = c(a), E = l;
  (n2 && E(new n2(new ArrayBuffer(1))) != m || i2 && E(new i2()) != u || o2 && E(o2.resolve()) != d || s && E(new s()) != p || a && E(new a()) != f) && (E = function(e3) {
    var t3 = l(e3), r3 = "[object Object]" == t3 ? e3.constructor : void 0, n3 = r3 ? c(r3) : "";
    if (n3) switch (n3) {
      case h:
        return m;
      case g:
        return u;
      case y:
        return d;
      case v:
        return p;
      case b:
        return f;
    }
    return t3;
  }), e2.exports = E;
}, 8109: (e2) => {
  e2.exports = function(e3, t2) {
    return null == e3 ? void 0 : e3[t2];
  };
}, 2118: (e2, t2, r2) => {
  var n2 = r2(9191);
  e2.exports = function() {
    this.__data__ = n2 ? n2(null) : {}, this.size = 0;
  };
}, 6909: (e2) => {
  e2.exports = function(e3) {
    var t2 = this.has(e3) && delete this.__data__[e3];
    return this.size -= t2 ? 1 : 0, t2;
  };
}, 8138: (e2, t2, r2) => {
  var n2 = r2(9191), i2 = Object.prototype.hasOwnProperty;
  e2.exports = function(e3) {
    var t3 = this.__data__;
    if (n2) {
      var r3 = t3[e3];
      return "__lodash_hash_undefined__" === r3 ? void 0 : r3;
    }
    return i2.call(t3, e3) ? t3[e3] : void 0;
  };
}, 4174: (e2, t2, r2) => {
  var n2 = r2(9191), i2 = Object.prototype.hasOwnProperty;
  e2.exports = function(e3) {
    var t3 = this.__data__;
    return n2 ? void 0 !== t3[e3] : i2.call(t3, e3);
  };
}, 7942: (e2, t2, r2) => {
  var n2 = r2(9191);
  e2.exports = function(e3, t3) {
    var r3 = this.__data__;
    return this.size += this.has(e3) ? 0 : 1, r3[e3] = n2 && void 0 === t3 ? "__lodash_hash_undefined__" : t3, this;
  };
}, 9917: (e2) => {
  var t2 = Object.prototype.hasOwnProperty;
  e2.exports = function(e3) {
    var r2 = e3.length, n2 = new e3.constructor(r2);
    return r2 && "string" == typeof e3[0] && t2.call(e3, "index") && (n2.index = e3.index, n2.input = e3.input), n2;
  };
}, 8222: (e2, t2, r2) => {
  var n2 = r2(9882), i2 = r2(4727), o2 = r2(6058), s = r2(169), a = r2(6190);
  e2.exports = function(e3, t3, r3) {
    var l = e3.constructor;
    switch (t3) {
      case "[object ArrayBuffer]":
        return n2(e3);
      case "[object Boolean]":
      case "[object Date]":
        return new l(+e3);
      case "[object DataView]":
        return i2(e3, r3);
      case "[object Float32Array]":
      case "[object Float64Array]":
      case "[object Int8Array]":
      case "[object Int16Array]":
      case "[object Int32Array]":
      case "[object Uint8Array]":
      case "[object Uint8ClampedArray]":
      case "[object Uint16Array]":
      case "[object Uint32Array]":
        return a(e3, r3);
      case "[object Map]":
      case "[object Set]":
        return new l();
      case "[object Number]":
      case "[object String]":
        return new l(e3);
      case "[object RegExp]":
        return o2(e3);
      case "[object Symbol]":
        return s(e3);
    }
  };
}, 8725: (e2, t2, r2) => {
  var n2 = r2(9413), i2 = r2(7353), o2 = r2(6001);
  e2.exports = function(e3) {
    return "function" != typeof e3.constructor || o2(e3) ? {} : n2(i2(e3));
  };
}, 9045: (e2) => {
  var t2 = /^(?:0|[1-9]\d*)$/;
  e2.exports = function(e3, r2) {
    var n2 = typeof e3;
    return !!(r2 = null == r2 ? 9007199254740991 : r2) && ("number" == n2 || "symbol" != n2 && t2.test(e3)) && e3 > -1 && e3 % 1 == 0 && e3 < r2;
  };
}, 8304: (e2) => {
  e2.exports = function(e3) {
    var t2 = typeof e3;
    return "string" == t2 || "number" == t2 || "symbol" == t2 || "boolean" == t2 ? "__proto__" !== e3 : null === e3;
  };
}, 7394: (e2, t2, r2) => {
  var n2, i2 = r2(4019), o2 = (n2 = /[^.]+$/.exec(i2 && i2.keys && i2.keys.IE_PROTO || "")) ? "Symbol(src)_1." + n2 : "";
  e2.exports = function(e3) {
    return !!o2 && o2 in e3;
  };
}, 6001: (e2) => {
  var t2 = Object.prototype;
  e2.exports = function(e3) {
    var r2 = e3 && e3.constructor;
    return e3 === ("function" == typeof r2 && r2.prototype || t2);
  };
}, 3945: (e2) => {
  e2.exports = function() {
    this.__data__ = [], this.size = 0;
  };
}, 1846: (e2, t2, r2) => {
  var n2 = r2(2218), i2 = Array.prototype.splice;
  e2.exports = function(e3) {
    var t3 = this.__data__, r3 = n2(t3, e3);
    return !(r3 < 0 || (r3 == t3.length - 1 ? t3.pop() : i2.call(t3, r3, 1), --this.size, 0));
  };
}, 8028: (e2, t2, r2) => {
  var n2 = r2(2218);
  e2.exports = function(e3) {
    var t3 = this.__data__, r3 = n2(t3, e3);
    return r3 < 0 ? void 0 : t3[r3][1];
  };
}, 2344: (e2, t2, r2) => {
  var n2 = r2(2218);
  e2.exports = function(e3) {
    return n2(this.__data__, e3) > -1;
  };
}, 4769: (e2, t2, r2) => {
  var n2 = r2(2218);
  e2.exports = function(e3, t3) {
    var r3 = this.__data__, i2 = n2(r3, e3);
    return i2 < 0 ? (++this.size, r3.push([e3, t3])) : r3[i2][1] = t3, this;
  };
}, 2411: (e2, t2, r2) => {
  var n2 = r2(9612), i2 = r2(235), o2 = r2(326);
  e2.exports = function() {
    this.size = 0, this.__data__ = { hash: new n2(), map: new (o2 || i2)(), string: new n2() };
  };
}, 6417: (e2, t2, r2) => {
  var n2 = r2(7937);
  e2.exports = function(e3) {
    var t3 = n2(this, e3).delete(e3);
    return this.size -= t3 ? 1 : 0, t3;
  };
}, 6928: (e2, t2, r2) => {
  var n2 = r2(7937);
  e2.exports = function(e3) {
    return n2(this, e3).get(e3);
  };
}, 9493: (e2, t2, r2) => {
  var n2 = r2(7937);
  e2.exports = function(e3) {
    return n2(this, e3).has(e3);
  };
}, 4150: (e2, t2, r2) => {
  var n2 = r2(7937);
  e2.exports = function(e3, t3) {
    var r3 = n2(this, e3), i2 = r3.size;
    return r3.set(e3, t3), this.size += r3.size == i2 ? 0 : 1, this;
  };
}, 9191: (e2, t2, r2) => {
  var n2 = r2(8761)(Object, "create");
  e2.exports = n2;
}, 4248: (e2, t2, r2) => {
  var n2 = r2(241)(Object.keys, Object);
  e2.exports = n2;
}, 2966: (e2) => {
  e2.exports = function(e3) {
    var t2 = [];
    if (null != e3) for (var r2 in Object(e3)) t2.push(r2);
    return t2;
  };
}, 4146: (e2, t2, r2) => {
  e2 = r2.nmd(e2);
  var n2 = r2(1242), i2 = t2 && !t2.nodeType && t2, o2 = i2 && e2 && !e2.nodeType && e2, s = o2 && o2.exports === i2 && n2.process, a = function() {
    try {
      return o2 && o2.require && o2.require("util").types || s && s.binding && s.binding("util");
    } catch (e3) {
    }
  }();
  e2.exports = a;
}, 7157: (e2) => {
  var t2 = Object.prototype.toString;
  e2.exports = function(e3) {
    return t2.call(e3);
  };
}, 241: (e2) => {
  e2.exports = function(e3, t2) {
    return function(r2) {
      return e3(t2(r2));
    };
  };
}, 7772: (e2, t2, r2) => {
  var n2 = r2(1242), i2 = "object" == typeof self && self && self.Object === Object && self, o2 = n2 || i2 || Function("return this")();
  e2.exports = o2;
}, 5243: (e2, t2, r2) => {
  var n2 = r2(235);
  e2.exports = function() {
    this.__data__ = new n2(), this.size = 0;
  };
}, 2858: (e2) => {
  e2.exports = function(e3) {
    var t2 = this.__data__, r2 = t2.delete(e3);
    return this.size = t2.size, r2;
  };
}, 4417: (e2) => {
  e2.exports = function(e3) {
    return this.__data__.get(e3);
  };
}, 8605: (e2) => {
  e2.exports = function(e3) {
    return this.__data__.has(e3);
  };
}, 1418: (e2, t2, r2) => {
  var n2 = r2(235), i2 = r2(326), o2 = r2(6738);
  e2.exports = function(e3, t3) {
    var r3 = this.__data__;
    if (r3 instanceof n2) {
      var s = r3.__data__;
      if (!i2 || s.length < 199) return s.push([e3, t3]), this.size = ++r3.size, this;
      r3 = this.__data__ = new o2(s);
    }
    return r3.set(e3, t3), this.size = r3.size, this;
  };
}, 7035: (e2) => {
  var t2 = Function.prototype.toString;
  e2.exports = function(e3) {
    if (null != e3) {
      try {
        return t2.call(e3);
      } catch (e4) {
      }
      try {
        return e3 + "";
      } catch (e4) {
      }
    }
    return "";
  };
}, 9850: (e2, t2, r2) => {
  var n2 = r2(8874);
  e2.exports = function(e3) {
    return n2(e3, 5);
  };
}, 1225: (e2) => {
  e2.exports = function(e3, t2) {
    return e3 === t2 || e3 != e3 && t2 != t2;
  };
}, 2838: (e2, t2, r2) => {
  var n2 = r2(5183), i2 = r2(5125), o2 = Object.prototype, s = o2.hasOwnProperty, a = o2.propertyIsEnumerable, l = n2(/* @__PURE__ */ function() {
    return arguments;
  }()) ? n2 : function(e3) {
    return i2(e3) && s.call(e3, "callee") && !a.call(e3, "callee");
  };
  e2.exports = l;
}, 6152: (e2) => {
  var t2 = Array.isArray;
  e2.exports = t2;
}, 7878: (e2, t2, r2) => {
  var n2 = r2(1049), i2 = r2(1158);
  e2.exports = function(e3) {
    return null != e3 && i2(e3.length) && !n2(e3);
  };
}, 3226: (e2, t2, r2) => {
  e2 = r2.nmd(e2);
  var n2 = r2(7772), i2 = r2(6330), o2 = t2 && !t2.nodeType && t2, s = o2 && e2 && !e2.nodeType && e2, a = s && s.exports === o2 ? n2.Buffer : void 0, l = (a ? a.isBuffer : void 0) || i2;
  e2.exports = l;
}, 1049: (e2, t2, r2) => {
  var n2 = r2(3366), i2 = r2(9259);
  e2.exports = function(e3) {
    if (!i2(e3)) return false;
    var t3 = n2(e3);
    return "[object Function]" == t3 || "[object GeneratorFunction]" == t3 || "[object AsyncFunction]" == t3 || "[object Proxy]" == t3;
  };
}, 1158: (e2) => {
  e2.exports = function(e3) {
    return "number" == typeof e3 && e3 > -1 && e3 % 1 == 0 && e3 <= 9007199254740991;
  };
}, 4714: (e2, t2, r2) => {
  var n2 = r2(4511), i2 = r2(7826), o2 = r2(4146), s = o2 && o2.isMap, a = s ? i2(s) : n2;
  e2.exports = a;
}, 9259: (e2) => {
  e2.exports = function(e3) {
    var t2 = typeof e3;
    return null != e3 && ("object" == t2 || "function" == t2);
  };
}, 5125: (e2) => {
  e2.exports = function(e3) {
    return null != e3 && "object" == typeof e3;
  };
}, 3679: (e2, t2, r2) => {
  var n2 = r2(8436), i2 = r2(7826), o2 = r2(4146), s = o2 && o2.isSet, a = s ? i2(s) : n2;
  e2.exports = a;
}, 7598: (e2, t2, r2) => {
  var n2 = r2(5522), i2 = r2(7826), o2 = r2(4146), s = o2 && o2.isTypedArray, a = s ? i2(s) : n2;
  e2.exports = a;
}, 249: (e2, t2, r2) => {
  var n2 = r2(1634), i2 = r2(6411), o2 = r2(7878);
  e2.exports = function(e3) {
    return o2(e3) ? n2(e3) : i2(e3);
  };
}, 8582: (e2, t2, r2) => {
  var n2 = r2(1634), i2 = r2(8390), o2 = r2(7878);
  e2.exports = function(e3) {
    return o2(e3) ? n2(e3, true) : i2(e3);
  };
}, 981: (e2) => {
  e2.exports = function() {
    return [];
  };
}, 6330: (e2) => {
  e2.exports = function() {
    return false;
  };
}, 56: () => {
}, 4131: () => {
}, 6360: () => {
}, 9078: () => {
}, 3224: () => {
}, 1598: () => {
}, 5878: () => {
}, 6178: () => {
}, 7316: () => {
}, 5706: () => {
}, 5944: () => {
}, 9422: () => {
}, 7411: () => {
}, 4959: () => {
}, 2077: () => {
}, 7292: () => {
}, 2093: () => {
}, 5374: () => {
}, 7673: () => {
}, 4494: () => {
}, 3156: () => {
}, 2810: () => {
}, 4912: () => {
}, 3614: () => {
}, 8356: () => {
}, 7021: () => {
}, 2651: () => {
}, 6393: () => {
}, 4106: () => {
}, 6882: () => {
}, 2151: () => {
}, 9741: () => {
}, 2124: () => {
}, 3820: () => {
}, 4599: () => {
}, 3713: () => {
}, 3708: () => {
}, 3173: () => {
}, 9791: function(e2) {
  e2.exports = /* @__PURE__ */ function() {
    const e3 = /[0-9\-+#]/, t2 = /[^\d\-+#]/g;
    function r2(t3) {
      return t3.search(e3);
    }
    return (e4, n2, i2 = {}) => {
      if (!e4 || isNaN(Number(n2))) return n2;
      const o2 = function(e5 = "#.##") {
        const n3 = {}, i3 = e5.length, o3 = r2(e5);
        n3.prefix = o3 > 0 ? e5.substring(0, o3) : "";
        const s2 = r2(e5.split("").reverse().join("")), a = i3 - s2, l = e5.substring(a, a + 1), c = a + ("." === l || "," === l ? 1 : 0);
        n3.suffix = s2 > 0 ? e5.substring(c, i3) : "", n3.mask = e5.substring(o3, c), n3.maskHasNegativeSign = "-" === n3.mask.charAt(0), n3.maskHasPositiveSign = "+" === n3.mask.charAt(0);
        let u = n3.mask.match(t2);
        return n3.decimal = u && u[u.length - 1] || ".", n3.separator = u && u[1] && u[0] || ",", u = n3.mask.split(n3.decimal), n3.integer = u[0], n3.fraction = u[1], n3;
      }(e4), s = function(e5, t3, r3) {
        let n3 = false;
        const i3 = { value: e5 };
        e5 < 0 && (n3 = true, i3.value = -i3.value), i3.sign = n3 ? "-" : "", i3.value = Number(i3.value).toFixed(t3.fraction && t3.fraction.length), i3.value = Number(i3.value).toString();
        const o3 = t3.fraction && t3.fraction.lastIndexOf("0");
        let [s2 = "0", a = ""] = i3.value.split(".");
        return (!a || a && a.length <= o3) && (a = o3 < 0 ? "" : Number("0." + a).toFixed(o3 + 1).replace("0.", "")), i3.integer = s2, i3.fraction = a, function(e6, t4) {
          e6.result = "";
          const r4 = t4.integer.split(t4.separator), n4 = r4.join(""), i4 = n4 && n4.indexOf("0");
          if (i4 > -1) for (; e6.integer.length < n4.length - i4; ) e6.integer = "0" + e6.integer;
          else 0 === Number(e6.integer) && (e6.integer = "");
          const o4 = r4[1] && r4[r4.length - 1].length;
          if (o4) {
            const r5 = e6.integer.length, n5 = r5 % o4;
            for (let i5 = 0; i5 < r5; i5++) e6.result += e6.integer.charAt(i5), !((i5 - n5 + 1) % o4) && i5 < r5 - o4 && (e6.result += t4.separator);
          } else e6.result = e6.integer;
          e6.result += t4.fraction && e6.fraction ? t4.decimal + e6.fraction : "";
        }(i3, t3), "0" !== i3.result && "" !== i3.result || (n3 = false, i3.sign = ""), !n3 && t3.maskHasPositiveSign ? i3.sign = "+" : n3 && t3.maskHasPositiveSign ? i3.sign = "-" : n3 && (i3.sign = r3 && r3.enforceMaskSign && !t3.maskHasNegativeSign ? "" : "-"), i3;
      }(n2, o2, i2);
      return o2.prefix + s.sign + s.result + o2.suffix;
    };
  }();
}, 7866: (e2) => {
  e2.exports = (e3, t2) => (t2 = t2 || (() => {
  }), e3.then((e4) => new Promise((e5) => {
    e5(t2());
  }).then(() => e4), (e4) => new Promise((e5) => {
    e5(t2());
  }).then(() => {
    throw e4;
  })));
}, 2113: (e2, t2, r2) => {
  const n2 = r2(7866);
  class i2 extends Error {
    constructor(e3) {
      super(e3), this.name = "TimeoutError";
    }
  }
  const o2 = (e3, t3, r3) => new Promise((o3, s) => {
    if ("number" != typeof t3 || t3 < 0) throw new TypeError("Expected `milliseconds` to be a positive number");
    if (t3 === 1 / 0) return void o3(e3);
    const a = setTimeout(() => {
      if ("function" == typeof r3) {
        try {
          o3(r3());
        } catch (e4) {
          s(e4);
        }
        return;
      }
      const n3 = r3 instanceof Error ? r3 : new i2("string" == typeof r3 ? r3 : `Promise timed out after ${t3} milliseconds`);
      "function" == typeof e3.cancel && e3.cancel(), s(n3);
    }, t3);
    n2(e3.then(o3, s), () => {
      clearTimeout(a);
    });
  });
  e2.exports = o2, e2.exports.default = o2, e2.exports.TimeoutError = i2;
}, 8262: (e2, t2, r2) => {
  var n2 = r2(3586);
  function i2() {
  }
  function o2() {
  }
  o2.resetWarningCache = i2, e2.exports = function() {
    function e3(e4, t4, r4, i3, o3, s) {
      if (s !== n2) {
        var a = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        throw a.name = "Invariant Violation", a;
      }
    }
    function t3() {
      return e3;
    }
    e3.isRequired = e3;
    var r3 = { array: e3, bigint: e3, bool: e3, func: e3, number: e3, object: e3, string: e3, symbol: e3, any: e3, arrayOf: t3, element: e3, elementType: e3, instanceOf: t3, node: e3, objectOf: t3, oneOf: t3, oneOfType: t3, shape: t3, exact: t3, checkPropTypes: o2, resetWarningCache: i2 };
    return r3.PropTypes = r3, r3;
  };
}, 3980: (e2, t2, r2) => {
  e2.exports = r2(8262)();
}, 3586: (e2) => {
  e2.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
}, 2261: (e2) => {
  e2.exports = window.react;
} };
var t = {};
function r(n2) {
  var i2 = t[n2];
  if (void 0 !== i2) return i2.exports;
  var o2 = t[n2] = { id: n2, loaded: false, exports: {} };
  return e[n2].call(o2.exports, o2, o2.exports, r), o2.loaded = true, o2.exports;
}
r.n = (e2) => {
  var t2 = e2 && e2.__esModule ? () => e2.default : () => e2;
  return r.d(t2, { a: t2 }), t2;
}, r.d = (e2, t2) => {
  for (var n2 in t2) r.o(t2, n2) && !r.o(e2, n2) && Object.defineProperty(e2, n2, { enumerable: true, get: t2[n2] });
}, r.g = function() {
  if ("object" == typeof globalThis) return globalThis;
  try {
    return this || new Function("return this")();
  } catch (e2) {
    if ("object" == typeof window) return window;
  }
}(), r.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), r.r = (e2) => {
  "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
}, r.nmd = (e2) => (e2.paths = [], e2.children || (e2.children = []), e2);
var n = {};
(() => {
  r.d(n, { M: () => DE, c: () => BT });
  var e2 = r(2261), t2 = r.n(e2), i2 = r(3980), o2 = r.n(i2);
  function s(...e3) {
    return (...t3) => {
      for (let r2 of e3) "function" == typeof r2 && r2(...t3);
    };
  }
  const a = "undefined" != typeof document ? e2.useLayoutEffect : () => {
  };
  function l(t3) {
    const r2 = (0, e2.useRef)(null);
    return a(() => {
      r2.current = t3;
    }, [t3]), (0, e2.useCallback)((...e3) => {
      const t4 = r2.current;
      return null == t4 ? void 0 : t4(...e3);
    }, []);
  }
  const c = { prefix: String(Math.round(1e10 * Math.random())), current: 0 }, u = e2.createContext(c), d = e2.createContext(false);
  let p = Boolean("undefined" != typeof window && window.document && window.document.createElement), f = /* @__PURE__ */ new WeakMap();
  const m = "function" == typeof e2.useId ? function(t3) {
    let r2 = e2.useId(), [n2] = (0, e2.useState)(v());
    return t3 || `${n2 ? "react-aria" : `react-aria${c.prefix}`}-${r2}`;
  } : function(t3) {
    let r2 = (0, e2.useContext)(u);
    r2 !== c || p || console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");
    let n2 = function(t4 = false) {
      let r3 = (0, e2.useContext)(u), n3 = (0, e2.useRef)(null);
      if (null === n3.current && !t4) {
        var i4, o3;
        let t5 = null === (o3 = e2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) || void 0 === o3 || null === (i4 = o3.ReactCurrentOwner) || void 0 === i4 ? void 0 : i4.current;
        if (t5) {
          let e3 = f.get(t5);
          null == e3 ? f.set(t5, { id: r3.current, state: t5.memoizedState }) : t5.memoizedState !== e3.state && (r3.current = e3.id, f.delete(t5));
        }
        n3.current = ++r3.current;
      }
      return n3.current;
    }(!!t3), i3 = `react-aria${r2.prefix}`;
    return t3 || `${i3}-${n2}`;
  };
  function h() {
    return false;
  }
  function g() {
    return true;
  }
  function y(e3) {
    return () => {
    };
  }
  function v() {
    return "function" == typeof e2.useSyncExternalStore ? e2.useSyncExternalStore(y, h, g) : (0, e2.useContext)(d);
  }
  let b = Boolean("undefined" != typeof window && window.document && window.document.createElement), E = /* @__PURE__ */ new Map();
  function _(t3) {
    let [r2, n2] = (0, e2.useState)(t3), i3 = (0, e2.useRef)(null), o3 = m(r2), s2 = (0, e2.useCallback)((e3) => {
      i3.current = e3;
    }, []);
    return b && E.set(o3, s2), a(() => {
      let e3 = o3;
      return () => {
        E.delete(e3);
      };
    }, [o3]), (0, e2.useEffect)(() => {
      let e3 = i3.current;
      e3 && (i3.current = null, n2(e3));
    }), o3;
  }
  function T(e3, t3) {
    if (e3 === t3) return e3;
    let r2 = E.get(e3);
    if (r2) return r2(t3), t3;
    let n2 = E.get(t3);
    return n2 ? (n2(e3), e3) : t3;
  }
  function S(t3 = []) {
    let r2 = _(), [n2, i3] = function(t4) {
      let [r3, n3] = (0, e2.useState)(t4), i4 = (0, e2.useRef)(null), o4 = l(() => {
        if (!i4.current) return;
        let e3 = i4.current.next();
        e3.done ? i4.current = null : r3 === e3.value ? o4() : n3(e3.value);
      });
      a(() => {
        i4.current && o4();
      });
      let s2 = l((e3) => {
        i4.current = e3(r3), o4();
      });
      return [r3, s2];
    }(r2), o3 = (0, e2.useCallback)(() => {
      i3(function* () {
        yield r2, yield document.getElementById(r2) ? r2 : void 0;
      });
    }, [r2, i3]);
    return a(o3, [r2, o3, ...t3]), n2;
  }
  function P(e3) {
    var t3, r2, n2 = "";
    if ("string" == typeof e3 || "number" == typeof e3) n2 += e3;
    else if ("object" == typeof e3) if (Array.isArray(e3)) {
      var i3 = e3.length;
      for (t3 = 0; t3 < i3; t3++) e3[t3] && (r2 = P(e3[t3])) && (n2 && (n2 += " "), n2 += r2);
    } else for (r2 in e3) e3[r2] && (n2 && (n2 += " "), n2 += r2);
    return n2;
  }
  const w = function() {
    for (var e3, t3, r2 = 0, n2 = "", i3 = arguments.length; r2 < i3; r2++) (e3 = arguments[r2]) && (t3 = P(e3)) && (n2 && (n2 += " "), n2 += t3);
    return n2;
  };
  function C(...e3) {
    let t3 = { ...e3[0] };
    for (let r2 = 1; r2 < e3.length; r2++) {
      let n2 = e3[r2];
      for (let e4 in n2) {
        let r3 = t3[e4], i3 = n2[e4];
        "function" == typeof r3 && "function" == typeof i3 && "o" === e4[0] && "n" === e4[1] && e4.charCodeAt(2) >= 65 && e4.charCodeAt(2) <= 90 ? t3[e4] = s(r3, i3) : "className" !== e4 && "UNSAFE_className" !== e4 || "string" != typeof r3 || "string" != typeof i3 ? "id" === e4 && r3 && i3 ? t3.id = T(r3, i3) : t3[e4] = void 0 !== i3 ? i3 : r3 : t3[e4] = w(r3, i3);
      }
    }
    return t3;
  }
  let x = e2.createContext(null);
  function O(t3, r2) {
    let n2 = t3.slot || r2, { [n2]: i3 = {} } = (0, e2.useContext)(x) || {};
    return C(t3, C(i3, { id: t3.id }));
  }
  function I(t3) {
    let r2 = (0, e2.useContext)(x) || {}, { slots: n2 = {}, children: i3 } = t3, o3 = (0, e2.useMemo)(() => Object.keys(r2).concat(Object.keys(n2)).reduce((e3, t4) => ({ ...e3, [t4]: C(r2[t4] || {}, n2[t4] || {}) }), {}), [r2, n2]);
    return e2.createElement(x.Provider, { value: o3 }, i3);
  }
  function R(t3) {
    let { children: r2, ...n2 } = t3, i3 = r2;
    return e2.Children.toArray(r2).length <= 1 && "function" == typeof r2 && (i3 = e2.cloneElement(e2.Children.only(r2), n2)), e2.createElement(x.Provider, { value: {} }, i3);
  }
  const A = e2.createContext(null);
  function M(t3) {
    let { children: r2, matchedBreakpoints: n2 } = t3;
    return e2.createElement(A.Provider, { value: { matchedBreakpoints: n2 } }, r2);
  }
  function L() {
    return (0, e2.useContext)(A);
  }
  A.displayName = "BreakpointContext";
  const N = /* @__PURE__ */ new Set(["Arab", "Syrc", "Samr", "Mand", "Thaa", "Mend", "Nkoo", "Adlm", "Rohg", "Hebr"]), F = /* @__PURE__ */ new Set(["ae", "ar", "arc", "bcc", "bqi", "ckb", "dv", "fa", "glk", "he", "ku", "mzn", "nqo", "pnb", "ps", "sd", "ug", "ur", "yi"]);
  function k(e3) {
    if (Intl.Locale) {
      let t4 = new Intl.Locale(e3).maximize(), r2 = "function" == typeof t4.getTextInfo ? t4.getTextInfo() : t4.textInfo;
      if (r2) return "rtl" === r2.direction;
      if (t4.script) return N.has(t4.script);
    }
    let t3 = e3.split("-")[0];
    return F.has(t3);
  }
  const D = Symbol.for("react-aria.i18n.locale");
  function U() {
    let e3 = "undefined" != typeof window && window[D] || "undefined" != typeof navigator && (navigator.language || navigator.userLanguage) || "en-US";
    try {
      Intl.DateTimeFormat.supportedLocalesOf([e3]);
    } catch (t3) {
      e3 = "en-US";
    }
    return { locale: e3, direction: k(e3) ? "rtl" : "ltr" };
  }
  let j = U(), B = /* @__PURE__ */ new Set();
  function K() {
    j = U();
    for (let e3 of B) e3(j);
  }
  function z() {
    let t3 = v(), [r2, n2] = (0, e2.useState)(j);
    return (0, e2.useEffect)(() => (0 === B.size && window.addEventListener("languagechange", K), B.add(n2), () => {
      B.delete(n2), 0 === B.size && window.removeEventListener("languagechange", K);
    }), []), t3 ? { locale: "en-US", direction: "ltr" } : r2;
  }
  const W = e2.createContext(null);
  function V(t3) {
    let { locale: r2, children: n2 } = t3, i3 = z(), o3 = r2 ? { locale: r2, direction: k(r2) ? "rtl" : "ltr" } : i3;
    return e2.createElement(W.Provider, { value: o3 }, n2);
  }
  function H() {
    let t3 = z();
    return (0, e2.useContext)(W) || t3;
  }
  const G = { margin: ["margin", J], marginStart: [Y("marginLeft", "marginRight"), J], marginEnd: [Y("marginRight", "marginLeft"), J], marginTop: ["marginTop", J], marginBottom: ["marginBottom", J], marginX: [["marginLeft", "marginRight"], J], marginY: [["marginTop", "marginBottom"], J], width: ["width", J], height: ["height", J], minWidth: ["minWidth", J], minHeight: ["minHeight", J], maxWidth: ["maxWidth", J], maxHeight: ["maxHeight", J], isHidden: ["display", function(e3) {
    return e3 ? "none" : void 0;
  }], alignSelf: ["alignSelf", ae], justifySelf: ["justifySelf", ae], position: ["position", oe], zIndex: ["zIndex", oe], top: ["top", J], bottom: ["bottom", J], start: [Y("left", "right"), J], end: [Y("right", "left"), J], left: ["left", J], right: ["right", J], order: ["order", oe], flex: ["flex", function(e3) {
    return "boolean" == typeof e3 ? e3 ? "1" : void 0 : "" + e3;
  }], flexGrow: ["flexGrow", ae], flexShrink: ["flexShrink", ae], flexBasis: ["flexBasis", ae], gridArea: ["gridArea", ae], gridColumn: ["gridColumn", ae], gridColumnEnd: ["gridColumnEnd", ae], gridColumnStart: ["gridColumnStart", ae], gridRow: ["gridRow", ae], gridRowEnd: ["gridRowEnd", ae], gridRowStart: ["gridRowStart", ae] }, q = { ...G, backgroundColor: ["backgroundColor", function(e3, t3 = 5) {
    return e3 ? `var(--spectrum-alias-background-color-${e3}, ${te(e3, "background", t3)})` : void 0;
  }], borderWidth: ["borderWidth", ne], borderStartWidth: [Y("borderLeftWidth", "borderRightWidth"), ne], borderEndWidth: [Y("borderRightWidth", "borderLeftWidth"), ne], borderLeftWidth: ["borderLeftWidth", ne], borderRightWidth: ["borderRightWidth", ne], borderTopWidth: ["borderTopWidth", ne], borderBottomWidth: ["borderBottomWidth", ne], borderXWidth: [["borderLeftWidth", "borderRightWidth"], ne], borderYWidth: [["borderTopWidth", "borderBottomWidth"], ne], borderColor: ["borderColor", re], borderStartColor: [Y("borderLeftColor", "borderRightColor"), re], borderEndColor: [Y("borderRightColor", "borderLeftColor"), re], borderLeftColor: ["borderLeftColor", re], borderRightColor: ["borderRightColor", re], borderTopColor: ["borderTopColor", re], borderBottomColor: ["borderBottomColor", re], borderXColor: [["borderLeftColor", "borderRightColor"], re], borderYColor: [["borderTopColor", "borderBottomColor"], re], borderRadius: ["borderRadius", ie], borderTopStartRadius: [Y("borderTopLeftRadius", "borderTopRightRadius"), ie], borderTopEndRadius: [Y("borderTopRightRadius", "borderTopLeftRadius"), ie], borderBottomStartRadius: [Y("borderBottomLeftRadius", "borderBottomRightRadius"), ie], borderBottomEndRadius: [Y("borderBottomRightRadius", "borderBottomLeftRadius"), ie], borderTopLeftRadius: ["borderTopLeftRadius", ie], borderTopRightRadius: ["borderTopRightRadius", ie], borderBottomLeftRadius: ["borderBottomLeftRadius", ie], borderBottomRightRadius: ["borderBottomRightRadius", ie], padding: ["padding", J], paddingStart: [Y("paddingLeft", "paddingRight"), J], paddingEnd: [Y("paddingRight", "paddingLeft"), J], paddingLeft: ["paddingLeft", J], paddingRight: ["paddingRight", J], paddingTop: ["paddingTop", J], paddingBottom: ["paddingBottom", J], paddingX: [["paddingLeft", "paddingRight"], J], paddingY: [["paddingTop", "paddingBottom"], J], overflow: ["overflow", ae] }, $ = { borderWidth: "borderStyle", borderLeftWidth: "borderLeftStyle", borderRightWidth: "borderRightStyle", borderTopWidth: "borderTopStyle", borderBottomWidth: "borderBottomStyle" };
  function Y(e3, t3) {
    return (r2) => "rtl" === r2 ? t3 : e3;
  }
  const X = /(%|px|em|rem|vw|vh|auto|cm|mm|in|pt|pc|ex|ch|rem|vmin|vmax|fr)$/, Q = /^\s*\w+\(/, Z = /(static-)?size-\d+|single-line-(height|width)/g;
  function J(e3) {
    return "number" == typeof e3 ? e3 + "px" : e3 ? X.test(e3) ? e3 : Q.test(e3) ? e3.replace(Z, "var(--spectrum-global-dimension-$&, var(--spectrum-alias-$&))") : `var(--spectrum-global-dimension-${e3}, var(--spectrum-alias-${e3}))` : void 0;
  }
  function ee(e3, t3) {
    return J(e3 = le(e3, t3));
  }
  function te(e3, t3 = "default", r2 = 5) {
    return r2 > 5 ? `var(--spectrum-${e3}, var(--spectrum-semantic-${e3}-color-${t3}))` : `var(--spectrum-legacy-color-${e3}, var(--spectrum-global-color-${e3}, var(--spectrum-semantic-${e3}-color-${t3})))`;
  }
  function re(e3, t3 = 5) {
    if (e3) return "default" === e3 ? "var(--spectrum-alias-border-color)" : `var(--spectrum-alias-border-color-${e3}, ${te(e3, "border", t3)})`;
  }
  function ne(e3) {
    return e3 && "none" !== e3 ? `var(--spectrum-alias-border-size-${e3})` : "0";
  }
  function ie(e3) {
    if (e3) return `var(--spectrum-alias-border-radius-${e3})`;
  }
  function oe(e3) {
    return e3;
  }
  function se(e3, t3 = G, r2 = {}) {
    let { UNSAFE_className: n2, UNSAFE_style: i3, ...o3 } = e3, s2 = L(), { direction: a2 } = H(), { matchedBreakpoints: l2 = (null == s2 ? void 0 : s2.matchedBreakpoints) || ["base"] } = r2, c2 = function(e4, t4, r3, n3) {
      let i4 = {};
      for (let o4 in e4) {
        let s3 = t4[o4];
        if (!s3 || null == e4[o4]) continue;
        let [a3, l3] = s3;
        "function" == typeof a3 && (a3 = a3(r3));
        let c3 = l3(le(e4[o4], n3), e4.colorVersion);
        if (Array.isArray(a3)) for (let e5 of a3) i4[e5] = c3;
        else i4[a3] = c3;
      }
      for (let e5 in $) i4[e5] && (i4[$[e5]] = "solid", i4.boxSizing = "border-box");
      return i4;
    }(e3, t3, a2, l2), u2 = { ...i3, ...c2 };
    o3.className && console.warn("The className prop is unsafe and is unsupported in React Spectrum v3. Please use style props with Spectrum variables, or UNSAFE_className if you absolutely must do something custom. Note that this may break in future versions due to DOM structure changes."), o3.style && console.warn("The style prop is unsafe and is unsupported in React Spectrum v3. Please use style props with Spectrum variables, or UNSAFE_style if you absolutely must do something custom. Note that this may break in future versions due to DOM structure changes.");
    let d2 = { style: u2, className: n2 };
    return le(e3.isHidden, l2) && (d2.hidden = true), { styleProps: d2 };
  }
  function ae(e3) {
    return e3;
  }
  function le(e3, t3) {
    if (e3 && "object" == typeof e3 && !Array.isArray(e3)) {
      for (let r2 = 0; r2 < t3.length; r2++) {
        let n2 = t3[r2];
        if (null != e3[n2]) return e3[n2];
      }
      return e3.base;
    }
    return e3;
  }
  function ce(e3) {
    return { UNSAFE_getDOMNode: () => e3.current };
  }
  function ue(e3, t3 = e3) {
    return { ...ce(e3), focus() {
      t3.current && t3.current.focus();
    } };
  }
  function de(t3) {
    let r2 = (0, e2.useRef)(null);
    return (0, e2.useImperativeHandle)(t3, () => ce(r2)), r2;
  }
  function pe(t3, r2) {
    let n2 = (0, e2.useRef)(null);
    return (0, e2.useImperativeHandle)(t3, () => ue(n2, r2)), n2;
  }
  function fe(e3) {
    return { get current() {
      return e3.current && e3.current.UNSAFE_getDOMNode();
    } };
  }
  const me = /* @__PURE__ */ new Set(["id"]), he = /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-describedby", "aria-details"]), ge = /* @__PURE__ */ new Set(["href", "hrefLang", "target", "rel", "download", "ping", "referrerPolicy"]), ye = /^(data-.*)$/;
  function ve(e3, t3 = {}) {
    let { labelable: r2, isLink: n2, propNames: i3 } = t3, o3 = {};
    for (const t4 in e3) Object.prototype.hasOwnProperty.call(e3, t4) && (me.has(t4) || r2 && he.has(t4) || n2 && ge.has(t4) || (null == i3 ? void 0 : i3.has(t4)) || ye.test(t4)) && (o3[t4] = e3[t4]);
    return o3;
  }
  function be(t3, r2) {
    t3 = O(t3);
    let { elementType: n2 = "div", children: i3, ...o3 } = t3, { styleProps: s2 } = se(t3, q), a2 = de(r2);
    return e2.createElement(n2, { ...ve(o3), ...s2, ref: a2 }, e2.createElement(R, null, i3));
  }
  const Ee = (0, e2.forwardRef)(be);
  function _e(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(9741);
  var Te, Se, Pe, we, Ce, xe, Oe, Ie, Re, Ae, Me, Le, Ne, Fe, ke, De, Ue, je, Be, Ke, ze, We, Ve, He, Ge, qe, $e = {};
  _e($e, "focus-ring", () => Te, (e3) => Te = e3), _e($e, "i18nFontFamily", () => Se, (e3) => Se = e3), _e($e, "is-disabled", () => Pe, (e3) => Pe = e3), _e($e, "is-hovered", () => we, (e3) => we = e3), _e($e, "is-selected", () => Ce, (e3) => Ce = e3), _e($e, "spectrum-FocusRing-ring", () => xe, (e3) => xe = e3), _e($e, "spectrum-FocusRing", () => Oe, (e3) => Oe = e3), _e($e, "spectrum-FocusRing--quiet", () => Ie, (e3) => Ie = e3), _e($e, "spectrum-Icon", () => Re, (e3) => Re = e3), _e($e, "spectrum-Tabs", () => Ae, (e3) => Ae = e3), _e($e, "spectrum-Tabs--compact", () => Me, (e3) => Me = e3), _e($e, "spectrum-Tabs--emphasized", () => Le, (e3) => Le = e3), _e($e, "spectrum-Tabs--horizontal", () => Ne, (e3) => Ne = e3), _e($e, "spectrum-Tabs--isCollapsed", () => Fe, (e3) => Fe = e3), _e($e, "spectrum-Tabs--quiet", () => ke, (e3) => ke = e3), _e($e, "spectrum-Tabs--vertical", () => De, (e3) => De = e3), _e($e, "spectrum-Tabs-item", () => Ue, (e3) => Ue = e3), _e($e, "spectrum-Tabs-itemLabel", () => je, (e3) => je = e3), _e($e, "spectrum-Tabs-picker", () => Be, (e3) => Be = e3), _e($e, "spectrum-Tabs-selectionIndicator", () => Ke, (e3) => Ke = e3), _e($e, "spectrum-TabsPanel", () => ze, (e3) => ze = e3), _e($e, "spectrum-TabsPanel--horizontal", () => We, (e3) => We = e3), _e($e, "spectrum-TabsPanel--vertical", () => Ve, (e3) => Ve = e3), _e($e, "spectrum-TabsPanel-collapseWrapper", () => He, (e3) => He = e3), _e($e, "spectrum-TabsPanel-tabpanel", () => Ge, (e3) => Ge = e3), _e($e, "spectrum-TabsPanel-tabs", () => qe, (e3) => qe = e3), Te = "FzVSrW_focus-ring", Se = "FzVSrW_i18nFontFamily", Pe = "FzVSrW_is-disabled", we = "FzVSrW_is-hovered", Ce = "FzVSrW_is-selected", Oe = "FzVSrW_spectrum-FocusRing " + (xe = "FzVSrW_spectrum-FocusRing-ring"), Ie = "FzVSrW_spectrum-FocusRing--quiet", Re = "FzVSrW_spectrum-Icon", Ae = "FzVSrW_spectrum-Tabs", Me = "FzVSrW_spectrum-Tabs--compact", Le = "FzVSrW_spectrum-Tabs--emphasized", Ne = "FzVSrW_spectrum-Tabs--horizontal", Fe = "FzVSrW_spectrum-Tabs--isCollapsed", ke = "FzVSrW_spectrum-Tabs--quiet", De = "FzVSrW_spectrum-Tabs--vertical", Ue = "FzVSrW_spectrum-Tabs-item", je = "FzVSrW_spectrum-Tabs-itemLabel", Be = "FzVSrW_spectrum-Tabs-picker", Ke = "FzVSrW_spectrum-Tabs-selectionIndicator", ze = "FzVSrW_spectrum-TabsPanel", We = "FzVSrW_spectrum-TabsPanel--horizontal", Ve = "FzVSrW_spectrum-TabsPanel--vertical", He = "FzVSrW_spectrum-TabsPanel-collapseWrapper", Ge = "FzVSrW_spectrum-TabsPanel-tabpanel", qe = "FzVSrW_spectrum-TabsPanel-tabs";
  let Ye = false;
  function Xe(e3, ...t3) {
    let r2 = [];
    for (let n2 of t3) if ("object" == typeof n2 && n2) {
      let t4 = {};
      for (let r3 in n2) e3[r3] && (t4[e3[r3]] = n2[r3]), !Ye && e3[r3] || (t4[r3] = n2[r3]);
      r2.push(t4);
    } else "string" == typeof n2 ? (e3[n2] && r2.push(e3[n2]), !Ye && e3[n2] || r2.push(n2)) : r2.push(n2);
    return w(...r2);
  }
  function Qe(t3) {
    const { ref: r2, onResize: n2 } = t3;
    (0, e2.useEffect)(() => {
      let e3 = null == r2 ? void 0 : r2.current;
      if (e3) {
        if (void 0 === window.ResizeObserver) return window.addEventListener("resize", n2, false), () => {
          window.removeEventListener("resize", n2, false);
        };
        {
          const t4 = new window.ResizeObserver((e4) => {
            e4.length && n2();
          });
          return t4.observe(e3), () => {
            e3 && t4.unobserve(e3);
          };
        }
      }
    }, [n2, r2]);
  }
  function Ze(e3) {
    var t3;
    return "undefined" != typeof window && null != window.navigator && ((null === (t3 = window.navigator.userAgentData) || void 0 === t3 ? void 0 : t3.brands.some((t4) => e3.test(t4.brand))) || e3.test(window.navigator.userAgent));
  }
  function Je(e3) {
    var t3;
    return "undefined" != typeof window && null != window.navigator && e3.test((null === (t3 = window.navigator.userAgentData) || void 0 === t3 ? void 0 : t3.platform) || window.navigator.platform);
  }
  function et() {
    return Je(/^Mac/i);
  }
  function tt() {
    return Je(/^iPad/i) || et() && navigator.maxTouchPoints > 1;
  }
  function rt() {
    return Je(/^iPhone/i) || tt();
  }
  function nt() {
    return et() || rt();
  }
  function it() {
    return Ze(/AppleWebKit/i) && !Ze(/Chrome/i);
  }
  function ot() {
    return Ze(/Android/i);
  }
  function st() {
    return Ze(/Firefox/i);
  }
  function at(e3) {
    return !(0 !== e3.mozInputSource || !e3.isTrusted) || (ot() && e3.pointerType ? "click" === e3.type && 1 === e3.buttons : 0 === e3.detail && !e3.pointerType);
  }
  const lt = (e3) => {
    var t3;
    return null !== (t3 = null == e3 ? void 0 : e3.ownerDocument) && void 0 !== t3 ? t3 : document;
  }, ct = (e3) => e3 && "window" in e3 && e3.window === e3 ? e3 : lt(e3).defaultView || window;
  let ut = null, dt = /* @__PURE__ */ new Set(), pt = /* @__PURE__ */ new Map(), ft = false, mt = false;
  const ht = { Tab: true, Escape: true };
  function gt(e3, t3) {
    for (let r2 of dt) r2(e3, t3);
  }
  function yt(e3) {
    ft = true, function(e4) {
      return !(e4.metaKey || !et() && e4.altKey || e4.ctrlKey || "Control" === e4.key || "Shift" === e4.key || "Meta" === e4.key);
    }(e3) && (ut = "keyboard", gt("keyboard", e3));
  }
  function vt(e3) {
    ut = "pointer", "mousedown" !== e3.type && "pointerdown" !== e3.type || (ft = true, gt("pointer", e3));
  }
  function bt(e3) {
    at(e3) && (ft = true, ut = "virtual");
  }
  function Et(e3) {
    e3.target !== window && e3.target !== document && (ft || mt || (ut = "virtual", gt("virtual", e3)), ft = false, mt = false);
  }
  function _t() {
    ft = false, mt = true;
  }
  function Tt(e3) {
    if ("undefined" == typeof window || pt.get(ct(e3))) return;
    const t3 = ct(e3), r2 = lt(e3);
    let n2 = t3.HTMLElement.prototype.focus;
    t3.HTMLElement.prototype.focus = function() {
      ft = true, n2.apply(this, arguments);
    }, r2.addEventListener("keydown", yt, true), r2.addEventListener("keyup", yt, true), r2.addEventListener("click", bt, true), t3.addEventListener("focus", Et, true), t3.addEventListener("blur", _t, false), "undefined" != typeof PointerEvent ? (r2.addEventListener("pointerdown", vt, true), r2.addEventListener("pointermove", vt, true), r2.addEventListener("pointerup", vt, true)) : (r2.addEventListener("mousedown", vt, true), r2.addEventListener("mousemove", vt, true), r2.addEventListener("mouseup", vt, true)), t3.addEventListener("beforeunload", () => {
      St(e3);
    }, { once: true }), pt.set(t3, { focus: n2 });
  }
  const St = (e3, t3) => {
    const r2 = ct(e3), n2 = lt(e3);
    t3 && n2.removeEventListener("DOMContentLoaded", t3), pt.has(r2) && (r2.HTMLElement.prototype.focus = pt.get(r2).focus, n2.removeEventListener("keydown", yt, true), n2.removeEventListener("keyup", yt, true), n2.removeEventListener("click", bt, true), r2.removeEventListener("focus", Et, true), r2.removeEventListener("blur", _t, false), "undefined" != typeof PointerEvent ? (n2.removeEventListener("pointerdown", vt, true), n2.removeEventListener("pointermove", vt, true), n2.removeEventListener("pointerup", vt, true)) : (n2.removeEventListener("mousedown", vt, true), n2.removeEventListener("mousemove", vt, true), n2.removeEventListener("mouseup", vt, true)), pt.delete(r2));
  };
  function Pt() {
    return "pointer" !== ut;
  }
  function wt() {
    return ut;
  }
  function Ct(e3) {
    ut = e3, gt(e3, null);
  }
  "undefined" != typeof document && function(e3) {
    const t3 = lt(e3);
    let r2;
    "loading" !== t3.readyState ? Tt(e3) : (r2 = () => {
      Tt(e3);
    }, t3.addEventListener("DOMContentLoaded", r2));
  }();
  const xt = /* @__PURE__ */ new Set(["checkbox", "radio", "range", "color", "file", "image", "button", "submit", "reset"]);
  class Ot {
    isDefaultPrevented() {
      return this.nativeEvent.defaultPrevented;
    }
    preventDefault() {
      this.defaultPrevented = true, this.nativeEvent.preventDefault();
    }
    stopPropagation() {
      this.nativeEvent.stopPropagation(), this.isPropagationStopped = () => true;
    }
    isPropagationStopped() {
      return false;
    }
    persist() {
    }
    constructor(e3, t3) {
      this.nativeEvent = t3, this.target = t3.target, this.currentTarget = t3.currentTarget, this.relatedTarget = t3.relatedTarget, this.bubbles = t3.bubbles, this.cancelable = t3.cancelable, this.defaultPrevented = t3.defaultPrevented, this.eventPhase = t3.eventPhase, this.isTrusted = t3.isTrusted, this.timeStamp = t3.timeStamp, this.type = e3;
    }
  }
  function It(t3) {
    let r2 = (0, e2.useRef)({ isFocused: false, observer: null });
    a(() => {
      const e3 = r2.current;
      return () => {
        e3.observer && (e3.observer.disconnect(), e3.observer = null);
      };
    }, []);
    let n2 = l((e3) => {
      null == t3 || t3(e3);
    });
    return (0, e2.useCallback)((e3) => {
      if (e3.target instanceof HTMLButtonElement || e3.target instanceof HTMLInputElement || e3.target instanceof HTMLTextAreaElement || e3.target instanceof HTMLSelectElement) {
        r2.current.isFocused = true;
        let t4 = e3.target, i3 = (e4) => {
          r2.current.isFocused = false, t4.disabled && n2(new Ot("blur", e4)), r2.current.observer && (r2.current.observer.disconnect(), r2.current.observer = null);
        };
        t4.addEventListener("focusout", i3, { once: true }), r2.current.observer = new MutationObserver(() => {
          if (r2.current.isFocused && t4.disabled) {
            var e4;
            null === (e4 = r2.current.observer) || void 0 === e4 || e4.disconnect();
            let n3 = t4 === document.activeElement ? null : document.activeElement;
            t4.dispatchEvent(new FocusEvent("blur", { relatedTarget: n3 })), t4.dispatchEvent(new FocusEvent("focusout", { bubbles: true, relatedTarget: n3 }));
          }
        }), r2.current.observer.observe(t4, { attributes: true, attributeFilter: ["disabled"] });
      }
    }, [n2]);
  }
  function Rt(t3) {
    let { isDisabled: r2, onFocus: n2, onBlur: i3, onFocusChange: o3 } = t3;
    const s2 = (0, e2.useCallback)((e3) => {
      if (e3.target === e3.currentTarget) return i3 && i3(e3), o3 && o3(false), true;
    }, [i3, o3]), a2 = It(s2), l2 = (0, e2.useCallback)((e3) => {
      const t4 = lt(e3.target);
      e3.target === e3.currentTarget && t4.activeElement === e3.target && (n2 && n2(e3), o3 && o3(true), a2(e3));
    }, [o3, n2, a2]);
    return { focusProps: { onFocus: !r2 && (n2 || o3 || i3) ? l2 : void 0, onBlur: r2 || !i3 && !o3 ? void 0 : s2 } };
  }
  function At(t3) {
    let { isDisabled: r2, onBlurWithin: n2, onFocusWithin: i3, onFocusWithinChange: o3 } = t3, s2 = (0, e2.useRef)({ isFocusWithin: false }), a2 = (0, e2.useCallback)((e3) => {
      s2.current.isFocusWithin && !e3.currentTarget.contains(e3.relatedTarget) && (s2.current.isFocusWithin = false, n2 && n2(e3), o3 && o3(false));
    }, [n2, o3, s2]), l2 = It(a2), c2 = (0, e2.useCallback)((e3) => {
      s2.current.isFocusWithin || document.activeElement !== e3.target || (i3 && i3(e3), o3 && o3(true), s2.current.isFocusWithin = true, l2(e3));
    }, [i3, o3, l2]);
    return r2 ? { focusWithinProps: { onFocus: void 0, onBlur: void 0 } } : { focusWithinProps: { onFocus: c2, onBlur: a2 } };
  }
  function Mt(t3 = {}) {
    let { autoFocus: r2 = false, isTextInput: n2, within: i3 } = t3, o3 = (0, e2.useRef)({ isFocused: false, isFocusVisible: r2 || Pt() }), [s2, a2] = (0, e2.useState)(false), [l2, c2] = (0, e2.useState)(() => o3.current.isFocused && o3.current.isFocusVisible), u2 = (0, e2.useCallback)(() => c2(o3.current.isFocused && o3.current.isFocusVisible), []), d2 = (0, e2.useCallback)((e3) => {
      o3.current.isFocused = e3, a2(e3), u2();
    }, [u2]);
    var p2, f2, m2;
    p2 = (e3) => {
      o3.current.isFocusVisible = e3, u2();
    }, f2 = [], m2 = { isTextInput: n2 }, Tt(), (0, e2.useEffect)(() => {
      let e3 = (e4, t4) => {
        (function(e5, t5, r3) {
          var n3;
          const i4 = "undefined" != typeof window ? ct(null == r3 ? void 0 : r3.target).HTMLInputElement : HTMLInputElement, o4 = "undefined" != typeof window ? ct(null == r3 ? void 0 : r3.target).HTMLTextAreaElement : HTMLTextAreaElement, s3 = "undefined" != typeof window ? ct(null == r3 ? void 0 : r3.target).HTMLElement : HTMLElement, a3 = "undefined" != typeof window ? ct(null == r3 ? void 0 : r3.target).KeyboardEvent : KeyboardEvent;
          return !((e5 = e5 || (null == r3 ? void 0 : r3.target) instanceof i4 && !xt.has(null == r3 || null === (n3 = r3.target) || void 0 === n3 ? void 0 : n3.type) || (null == r3 ? void 0 : r3.target) instanceof o4 || (null == r3 ? void 0 : r3.target) instanceof s3 && (null == r3 ? void 0 : r3.target.isContentEditable)) && "keyboard" === t5 && r3 instanceof a3 && !ht[r3.key]);
        })(!!(null == m2 ? void 0 : m2.isTextInput), e4, t4) && p2(Pt());
      };
      return dt.add(e3), () => {
        dt.delete(e3);
      };
    }, f2);
    let { focusProps: h2 } = Rt({ isDisabled: i3, onFocusChange: d2 }), { focusWithinProps: g2 } = At({ isDisabled: !i3, onFocusWithinChange: d2 });
    return { isFocused: s2, isFocusVisible: l2, focusProps: i3 ? g2 : h2 };
  }
  function Lt(t3) {
    let { children: r2, focusClass: n2, focusRingClass: i3 } = t3, { isFocused: o3, isFocusVisible: s2, focusProps: a2 } = Mt(t3), l2 = e2.Children.only(r2);
    return e2.cloneElement(l2, C(l2.props, { ...a2, className: w({ [n2 || ""]: o3, [i3 || ""]: s2 }) }));
  }
  var Nt;
  function Ft(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  Nt = { "ar-AE": { loading: "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644...", placeholder: "\u062D\u062F\u062F \u062E\u064A\u0627\u0631\u064B\u0627..." }, "bg-BG": { loading: "\u0417\u0430\u0440\u0435\u0436\u0434\u0430\u043D\u0435...", placeholder: "\u0418\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u043E\u043F\u0446\u0438\u044F" }, "cs-CZ": { loading: "Na\u010D\xEDt\xE1n\xED...", placeholder: "Vyberte vhodnou mo\u017Enost..." }, "da-DK": { loading: "Indl\xE6ser ...", placeholder: "V\xE6lg en mulighed ..." }, "de-DE": { loading: "Laden...", placeholder: "Option ausw\xE4hlen..." }, "el-GR": { loading: "\u03A6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7...", placeholder: "\u0395\u03C0\u03B9\u03BB\u03AD\u03BE\u03C4\u03B5\u2026" }, "en-US": { placeholder: "Select an option\u2026", loading: "Loading\u2026" }, "es-ES": { loading: "Cargando\u2026", placeholder: "Seleccione una opci\xF3n\u2026" }, "et-EE": { loading: "Laadimine...", placeholder: "Valige valikuline..." }, "fi-FI": { loading: "Ladataan\u2026", placeholder: "Valitse vaihtoehto..." }, "fr-FR": { loading: "Chargement...", placeholder: "S\xE9lectionnez une option..." }, "he-IL": { loading: "\u05D8\u05D5\u05E2\u05DF...", placeholder: "\u05D1\u05D7\u05E8 \u05D0\u05E4\u05E9\u05E8\u05D5\u05EA..." }, "hr-HR": { loading: "U\u010Ditavam...", placeholder: "Odaberite opciju" }, "hu-HU": { loading: "Bet\xF6lt\xE9s folyamatban\u2026", placeholder: "V\xE1lasszon egy opci\xF3t\u2026" }, "it-IT": { loading: "Caricamento...", placeholder: "Seleziona un\u2019opzione..." }, "ja-JP": { loading: "\u8AAD\u307F\u8FBC\u307F\u4E2D...", placeholder: "\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u9078\u629E..." }, "ko-KR": { loading: "\uB85C\uB4DC \uC911", placeholder: "\uC120\uD0DD \uC0AC\uD56D \uC120\uD0DD" }, "lt-LT": { loading: "\u012Ekeliama...", placeholder: "Pasirinkite parinkt\u012F..." }, "lv-LV": { loading: "Notiek iel\u0101de...", placeholder: "Atlasiet opciju..." }, "nb-NO": { loading: "Laster inn ...", placeholder: "Velg et alternativ..." }, "nl-NL": { loading: "Laden...", placeholder: "Optie selecteren..." }, "pl-PL": { loading: "\u0141adowanie...", placeholder: "Wybierz opcj\u0119..." }, "pt-BR": { loading: "Carregando...", placeholder: "Selecione uma op\xE7\xE3o..." }, "pt-PT": { loading: "A carregar...", placeholder: "Selecionar uma op\xE7\xE3o..." }, "ro-RO": { loading: "Se \xEEncarc\u0103...", placeholder: "Selecta\u021Bi o op\u021Biune" }, "ru-RU": { loading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...", placeholder: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440..." }, "sk-SK": { loading: "Na\u010D\xEDtava sa...", placeholder: "Vyberte mo\u017Enos\u0165..." }, "sl-SI": { loading: "Nalaganje...", placeholder: "Izberite mo\u017Enost" }, "sr-SP": { loading: "U\u010Ditavam...", placeholder: "Izaberite opciju" }, "sv-SE": { loading: "L\xE4ser in...", placeholder: "V\xE4lj ett alternativ..." }, "tr-TR": { loading: "Y\xFCkleniyor...", placeholder: "Bir se\xE7im yap\u0131n\u2026" }, "uk-UA": { loading: "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F\u2026", placeholder: "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u043E\u043F\u0446\u0456\u044E..." }, "zh-CN": { loading: "\u6B63\u5728\u52A0\u8F7D...", placeholder: "\u9009\u62E9\u4E00\u4E2A\u9009\u9879..." }, "zh-TW": { loading: "\u6B63\u5728\u8F09\u5165", placeholder: "\u9078\u53D6\u4E00\u500B\u9078\u9805" } }, r(7021);
  var kt, Dt, Ut, jt, Bt, Kt, zt, Wt, Vt, Ht, Gt, qt, $t, Yt, Xt, Qt, Zt, Jt, er, tr, rr, nr, ir, or = {};
  function sr() {
    return sr = Object.assign ? Object.assign.bind() : function(e3) {
      for (var t3 = 1; t3 < arguments.length; t3++) {
        var r2 = arguments[t3];
        for (var n2 in r2) Object.prototype.hasOwnProperty.call(r2, n2) && (e3[n2] = r2[n2]);
      }
      return e3;
    }, sr.apply(this, arguments);
  }
  Ft(or, "focus-ring", () => kt, (e3) => kt = e3), Ft(or, "i18nFontFamily", () => Dt, (e3) => Dt = e3), Ft(or, "is-disabled", () => Ut, (e3) => Ut = e3), Ft(or, "is-hovered", () => jt, (e3) => jt = e3), Ft(or, "is-invalid", () => Bt, (e3) => Bt = e3), Ft(or, "is-placeholder", () => Kt, (e3) => Kt = e3), Ft(or, "is-selected", () => zt, (e3) => zt = e3), Ft(or, "spectrum-Dropdown", () => Wt, (e3) => Wt = e3), Ft(or, "spectrum-Dropdown--quiet", () => Vt, (e3) => Vt = e3), Ft(or, "spectrum-Dropdown-avatar", () => Ht, (e3) => Ht = e3), Ft(or, "spectrum-Dropdown-chevron", () => Gt, (e3) => Gt = e3), Ft(or, "spectrum-Dropdown-fieldWrapper--positionSide", () => qt, (e3) => qt = e3), Ft(or, "spectrum-Dropdown-fieldWrapper--quiet", () => $t, (e3) => $t = e3), Ft(or, "spectrum-Dropdown-invalidIcon", () => Yt, (e3) => Yt = e3), Ft(or, "spectrum-Dropdown-label", () => Xt, (e3) => Xt = e3), Ft(or, "spectrum-Dropdown-popover--quiet", () => Qt, (e3) => Qt = e3), Ft(or, "spectrum-Dropdown-progressCircle", () => Zt, (e3) => Zt = e3), Ft(or, "spectrum-Dropdown-trigger", () => Jt, (e3) => Jt = e3), Ft(or, "spectrum-Field", () => er, (e3) => er = e3), Ft(or, "spectrum-FocusRing-ring", () => tr, (e3) => tr = e3), Ft(or, "spectrum-FocusRing", () => rr, (e3) => rr = e3), Ft(or, "spectrum-FocusRing--quiet", () => nr, (e3) => nr = e3), Ft(or, "spectrum-Icon", () => ir, (e3) => ir = e3), kt = "PBsjDW_focus-ring", Dt = "PBsjDW_i18nFontFamily", Ut = "PBsjDW_is-disabled", jt = "PBsjDW_is-hovered", Bt = "PBsjDW_is-invalid", Kt = "PBsjDW_is-placeholder", zt = "PBsjDW_is-selected", Wt = "PBsjDW_spectrum-Dropdown", Vt = "PBsjDW_spectrum-Dropdown--quiet", Ht = "PBsjDW_spectrum-Dropdown-avatar", Gt = "PBsjDW_spectrum-Dropdown-chevron", qt = "PBsjDW_spectrum-Dropdown-fieldWrapper--positionSide", $t = "PBsjDW_spectrum-Dropdown-fieldWrapper--quiet", Yt = "PBsjDW_spectrum-Dropdown-invalidIcon", Xt = "PBsjDW_spectrum-Dropdown-label", Qt = "PBsjDW_spectrum-Dropdown-popover--quiet", Zt = "PBsjDW_spectrum-Dropdown-progressCircle", Jt = "PBsjDW_spectrum-Dropdown-trigger", er = "PBsjDW_spectrum-Field", rr = "PBsjDW_spectrum-FocusRing " + (tr = "PBsjDW_spectrum-FocusRing-ring"), nr = "PBsjDW_spectrum-FocusRing--quiet", ir = "PBsjDW_spectrum-Icon";
  var ar = r(9631);
  function lr(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(4959);
  var cr, ur, dr, pr, fr, mr, hr, gr, yr, vr, br, Er, _r, Tr, Sr, Pr, wr, Cr, xr, Or, Ir, Rr, Ar, Mr, Lr, Nr, Fr, kr, Dr, Ur, jr, Br, Kr, zr, Wr, Vr, Hr, Gr, qr, $r, Yr, Xr, Qr, Zr, Jr, en, tn, rn, nn = {};
  lr(nn, "spectrum--large", () => cr, (e3) => cr = e3), lr(nn, "spectrum--medium", () => ur, (e3) => ur = e3), lr(nn, "spectrum-Icon", () => dr, (e3) => dr = e3), lr(nn, "spectrum-Icon--sizeL", () => pr, (e3) => pr = e3), lr(nn, "spectrum-Icon--sizeM", () => fr, (e3) => fr = e3), lr(nn, "spectrum-Icon--sizeS", () => mr, (e3) => mr = e3), lr(nn, "spectrum-Icon--sizeXL", () => hr, (e3) => hr = e3), lr(nn, "spectrum-Icon--sizeXS", () => gr, (e3) => gr = e3), lr(nn, "spectrum-Icon--sizeXXL", () => yr, (e3) => yr = e3), lr(nn, "spectrum-Icon--sizeXXS", () => vr, (e3) => vr = e3), lr(nn, "spectrum-UIIcon", () => br, (e3) => br = e3), lr(nn, "spectrum-UIIcon--large", () => Er, (e3) => Er = e3), lr(nn, "spectrum-UIIcon--medium", () => _r, (e3) => _r = e3), lr(nn, "spectrum-UIIcon-AlertMedium", () => Tr, (e3) => Tr = e3), lr(nn, "spectrum-UIIcon-AlertSmall", () => Sr, (e3) => Sr = e3), lr(nn, "spectrum-UIIcon-ArrowDownSmall", () => Pr, (e3) => Pr = e3), lr(nn, "spectrum-UIIcon-ArrowLeftMedium", () => wr, (e3) => wr = e3), lr(nn, "spectrum-UIIcon-Asterisk", () => Cr, (e3) => Cr = e3), lr(nn, "spectrum-UIIcon-CheckmarkMedium", () => xr, (e3) => xr = e3), lr(nn, "spectrum-UIIcon-CheckmarkSmall", () => Or, (e3) => Or = e3), lr(nn, "spectrum-UIIcon-ChevronDownMedium", () => Ir, (e3) => Ir = e3), lr(nn, "spectrum-UIIcon-ChevronDownSmall", () => Rr, (e3) => Rr = e3), lr(nn, "spectrum-UIIcon-ChevronLeftLarge", () => Ar, (e3) => Ar = e3), lr(nn, "spectrum-UIIcon-ChevronLeftMedium", () => Mr, (e3) => Mr = e3), lr(nn, "spectrum-UIIcon-ChevronRightLarge", () => Lr, (e3) => Lr = e3), lr(nn, "spectrum-UIIcon-ChevronRightMedium", () => Nr, (e3) => Nr = e3), lr(nn, "spectrum-UIIcon-ChevronRightSmall", () => Fr, (e3) => Fr = e3), lr(nn, "spectrum-UIIcon-ChevronUpSmall", () => kr, (e3) => kr = e3), lr(nn, "spectrum-UIIcon-CornerTriangle", () => Dr, (e3) => Dr = e3), lr(nn, "spectrum-UIIcon-CrossLarge", () => Ur, (e3) => Ur = e3), lr(nn, "spectrum-UIIcon-CrossMedium", () => jr, (e3) => jr = e3), lr(nn, "spectrum-UIIcon-CrossSmall", () => Br, (e3) => Br = e3), lr(nn, "spectrum-UIIcon-DashSmall", () => Kr, (e3) => Kr = e3), lr(nn, "spectrum-UIIcon-DoubleGripper", () => zr, (e3) => zr = e3), lr(nn, "spectrum-UIIcon-FolderBreadcrumb", () => Wr, (e3) => Wr = e3), lr(nn, "spectrum-UIIcon-HelpMedium", () => Vr, (e3) => Vr = e3), lr(nn, "spectrum-UIIcon-HelpSmall", () => Hr, (e3) => Hr = e3), lr(nn, "spectrum-UIIcon-InfoMedium", () => Gr, (e3) => Gr = e3), lr(nn, "spectrum-UIIcon-InfoSmall", () => qr, (e3) => qr = e3), lr(nn, "spectrum-UIIcon-ListGripper", () => $r, (e3) => $r = e3), lr(nn, "spectrum-UIIcon-Magnifier", () => Yr, (e3) => Yr = e3), lr(nn, "spectrum-UIIcon-SkipLeft", () => Xr, (e3) => Xr = e3), lr(nn, "spectrum-UIIcon-SkipRight", () => Qr, (e3) => Qr = e3), lr(nn, "spectrum-UIIcon-Star", () => Zr, (e3) => Zr = e3), lr(nn, "spectrum-UIIcon-StarOutline", () => Jr, (e3) => Jr = e3), lr(nn, "spectrum-UIIcon-SuccessMedium", () => en, (e3) => en = e3), lr(nn, "spectrum-UIIcon-SuccessSmall", () => tn, (e3) => tn = e3), lr(nn, "spectrum-UIIcon-TripleGripper", () => rn, (e3) => rn = e3), cr = "yxBNXG_spectrum--large", ur = "yxBNXG_spectrum--medium", dr = "yxBNXG_spectrum-Icon", pr = "yxBNXG_spectrum-Icon--sizeL", fr = "yxBNXG_spectrum-Icon--sizeM", mr = "yxBNXG_spectrum-Icon--sizeS", hr = "yxBNXG_spectrum-Icon--sizeXL", gr = "yxBNXG_spectrum-Icon--sizeXS", yr = "yxBNXG_spectrum-Icon--sizeXXL", vr = "yxBNXG_spectrum-Icon--sizeXXS", br = "yxBNXG_spectrum-UIIcon", Er = "yxBNXG_spectrum-UIIcon--large", _r = "yxBNXG_spectrum-UIIcon--medium", Tr = "yxBNXG_spectrum-UIIcon-AlertMedium", Sr = "yxBNXG_spectrum-UIIcon-AlertSmall", Pr = "yxBNXG_spectrum-UIIcon-ArrowDownSmall", wr = "yxBNXG_spectrum-UIIcon-ArrowLeftMedium", Cr = "yxBNXG_spectrum-UIIcon-Asterisk", xr = "yxBNXG_spectrum-UIIcon-CheckmarkMedium", Or = "yxBNXG_spectrum-UIIcon-CheckmarkSmall", Ir = "yxBNXG_spectrum-UIIcon-ChevronDownMedium", Rr = "yxBNXG_spectrum-UIIcon-ChevronDownSmall", Ar = "yxBNXG_spectrum-UIIcon-ChevronLeftLarge", Mr = "yxBNXG_spectrum-UIIcon-ChevronLeftMedium", Lr = "yxBNXG_spectrum-UIIcon-ChevronRightLarge", Nr = "yxBNXG_spectrum-UIIcon-ChevronRightMedium", Fr = "yxBNXG_spectrum-UIIcon-ChevronRightSmall", kr = "yxBNXG_spectrum-UIIcon-ChevronUpSmall", Dr = "yxBNXG_spectrum-UIIcon-CornerTriangle", Ur = "yxBNXG_spectrum-UIIcon-CrossLarge", jr = "yxBNXG_spectrum-UIIcon-CrossMedium", Br = "yxBNXG_spectrum-UIIcon-CrossSmall", Kr = "yxBNXG_spectrum-UIIcon-DashSmall", zr = "yxBNXG_spectrum-UIIcon-DoubleGripper", Wr = "yxBNXG_spectrum-UIIcon-FolderBreadcrumb", Vr = "yxBNXG_spectrum-UIIcon-HelpMedium", Hr = "yxBNXG_spectrum-UIIcon-HelpSmall", Gr = "yxBNXG_spectrum-UIIcon-InfoMedium", qr = "yxBNXG_spectrum-UIIcon-InfoSmall", $r = "yxBNXG_spectrum-UIIcon-ListGripper", Yr = "yxBNXG_spectrum-UIIcon-Magnifier", Xr = "yxBNXG_spectrum-UIIcon-SkipLeft", Qr = "yxBNXG_spectrum-UIIcon-SkipRight", Zr = "yxBNXG_spectrum-UIIcon-Star", Jr = "yxBNXG_spectrum-UIIcon-StarOutline", en = "yxBNXG_spectrum-UIIcon-SuccessMedium", tn = "yxBNXG_spectrum-UIIcon-SuccessSmall", rn = "yxBNXG_spectrum-UIIcon-TripleGripper";
  const on = e2.createContext(null);
  function sn(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  on.displayName = "ProviderContext", r(4106);
  var an, ln, cn, un, dn, pn, fn = {};
  function mn(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  sn(fn, "focus-ring", () => an, (e3) => an = e3), sn(fn, "i18nFontFamily", () => ln, (e3) => ln = e3), sn(fn, "spectrum", () => cn, (e3) => cn = e3), sn(fn, "spectrum-FocusRing-ring", () => un, (e3) => un = e3), sn(fn, "spectrum-FocusRing", () => dn, (e3) => dn = e3), sn(fn, "spectrum-FocusRing--quiet", () => pn, (e3) => pn = e3), an = "JuTe6q_focus-ring", ln = "JuTe6q_i18nFontFamily", cn = "JuTe6q_spectrum", dn = "JuTe6q_spectrum-FocusRing " + (un = "JuTe6q_spectrum-FocusRing-ring"), pn = "JuTe6q_spectrum-FocusRing--quiet", r(6393);
  var hn, gn, yn, vn, bn, En, _n, Tn, Sn, Pn = {};
  function wn(t3) {
    let r2 = "undefined" != typeof window && "function" == typeof window.matchMedia, [n2, i3] = (0, e2.useState)(() => !!r2 && window.matchMedia(t3).matches);
    return (0, e2.useEffect)(() => {
      if (!r2) return;
      let e3 = window.matchMedia(t3), n3 = (e4) => {
        i3(e4.matches);
      };
      return e3.addListener(n3), () => {
        e3.removeListener(n3);
      };
    }, [r2, t3]), !v() && n2;
  }
  function Cn(e3) {
    if (function() {
      if (null == xn) {
        xn = false;
        try {
          document.createElement("div").focus({ get preventScroll() {
            return xn = true, true;
          } });
        } catch (e4) {
        }
      }
      return xn;
    }()) e3.focus({ preventScroll: true });
    else {
      let t3 = function(e4) {
        let t4 = e4.parentNode, r2 = [], n2 = document.scrollingElement || document.documentElement;
        for (; t4 instanceof HTMLElement && t4 !== n2; ) (t4.offsetHeight < t4.scrollHeight || t4.offsetWidth < t4.scrollWidth) && r2.push({ element: t4, scrollTop: t4.scrollTop, scrollLeft: t4.scrollLeft }), t4 = t4.parentNode;
        return n2 instanceof HTMLElement && r2.push({ element: n2, scrollTop: n2.scrollTop, scrollLeft: n2.scrollLeft }), r2;
      }(e3);
      e3.focus(), function(e4) {
        for (let { element: t4, scrollTop: r2, scrollLeft: n2 } of e4) t4.scrollTop = r2, t4.scrollLeft = n2;
      }(t3);
    }
  }
  mn(Pn, "focus-ring", () => hn, (e3) => hn = e3), mn(Pn, "i18nFontFamily", () => gn, (e3) => gn = e3), mn(Pn, "spectrum", () => yn, (e3) => yn = e3), mn(Pn, "spectrum-Body", () => vn, (e3) => vn = e3), mn(Pn, "spectrum-Body--italic", () => bn, (e3) => bn = e3), mn(Pn, "spectrum-FocusRing-ring", () => En, (e3) => En = e3), mn(Pn, "spectrum-FocusRing", () => _n, (e3) => _n = e3), mn(Pn, "spectrum-FocusRing--quiet", () => Tn, (e3) => Tn = e3), hn = "_5QszkG_focus-ring", yn = "_5QszkG_spectrum " + (gn = "_5QszkG_i18nFontFamily"), vn = "_5QszkG_spectrum-Body", bn = "_5QszkG_spectrum-Body--italic", _n = "_5QszkG_spectrum-FocusRing " + (En = "_5QszkG_spectrum-FocusRing-ring"), Tn = "_5QszkG_spectrum-FocusRing--quiet", Sn = JSON.parse('{"name":"@react-spectrum/provider","version":"3.9.6","description":"Spectrum UI components in React","license":"Apache-2.0","main":"dist/main.js","module":"dist/module.js","exports":{"types":"./dist/types.d.ts","import":"./dist/import.mjs","require":"./dist/main.js"},"types":"dist/types.d.ts","source":"src/index.ts","files":["dist","src"],"sideEffects":["*.css"],"targets":{"main":{"includeNodeModules":["@adobe/spectrum-css-temp"]},"module":{"includeNodeModules":["@adobe/spectrum-css-temp"]}},"repository":{"type":"git","url":"https://github.com/adobe/react-spectrum"},"dependencies":{"@react-aria/i18n":"^3.11.0","@react-aria/overlays":"^3.22.0","@react-aria/utils":"^3.24.0","@react-spectrum/utils":"^3.11.6","@react-types/provider":"^3.8.0","@react-types/shared":"^3.23.0","@swc/helpers":"^0.5.0","clsx":"^2.0.0"},"devDependencies":{"@adobe/spectrum-css-temp":"3.0.0-alpha.1"},"peerDependencies":{"react":"^16.8.0 || ^17.0.0-rc.1 || ^18.0.0","react-dom":"^16.8.0 || ^17.0.0-rc.1 || ^18.0.0"},"publishConfig":{"access":"public"}}');
  let xn = null;
  const On = (0, e2.createContext)({ isNative: true, open: function(e3, t3) {
    Ln(e3, (e4) => Mn(e4, t3));
  }, useHref: (e3) => e3 });
  function In(t3) {
    let { children: r2, navigate: n2, useHref: i3 } = t3, o3 = (0, e2.useMemo)(() => ({ isNative: false, open: (e3, t4, r3, i4) => {
      Ln(e3, (e4) => {
        An(e4, t4) ? n2(r3, i4) : Mn(e4, t4);
      });
    }, useHref: i3 || ((e3) => e3) }), [n2, i3]);
    return e2.createElement(On.Provider, { value: o3 }, r2);
  }
  function Rn() {
    return (0, e2.useContext)(On);
  }
  function An(e3, t3) {
    let r2 = e3.getAttribute("target");
    return !(r2 && "_self" !== r2 || e3.origin !== location.origin || e3.hasAttribute("download") || t3.metaKey || t3.ctrlKey || t3.altKey || t3.shiftKey);
  }
  function Mn(e3, t3, r2 = true) {
    var n2, i3;
    let { metaKey: o3, ctrlKey: s2, altKey: a2, shiftKey: l2 } = t3;
    st() && (null === (i3 = window.event) || void 0 === i3 || null === (n2 = i3.type) || void 0 === n2 ? void 0 : n2.startsWith("key")) && "_blank" === e3.target && (et() ? o3 = true : s2 = true);
    let c2 = it() && et() && !tt() ? new KeyboardEvent("keydown", { keyIdentifier: "Enter", metaKey: o3, ctrlKey: s2, altKey: a2, shiftKey: l2 }) : new MouseEvent("click", { metaKey: o3, ctrlKey: s2, altKey: a2, shiftKey: l2, bubbles: true, cancelable: true });
    Mn.isOpening = r2, Cn(e3), e3.dispatchEvent(c2), Mn.isOpening = false;
  }
  function Ln(e3, t3) {
    if (e3 instanceof HTMLAnchorElement) t3(e3);
    else if (e3.hasAttribute("data-href")) {
      let r2 = document.createElement("a");
      r2.href = e3.getAttribute("data-href"), e3.hasAttribute("data-target") && (r2.target = e3.getAttribute("data-target")), e3.hasAttribute("data-rel") && (r2.rel = e3.getAttribute("data-rel")), e3.hasAttribute("data-download") && (r2.download = e3.getAttribute("data-download")), e3.hasAttribute("data-ping") && (r2.ping = e3.getAttribute("data-ping")), e3.hasAttribute("data-referrer-policy") && (r2.referrerPolicy = e3.getAttribute("data-referrer-policy")), e3.appendChild(r2), t3(r2), e3.removeChild(r2);
    }
  }
  function Nn(e3) {
    let t3 = Rn();
    return { href: (null == e3 ? void 0 : e3.href) ? t3.useHref(null == e3 ? void 0 : e3.href) : void 0, target: null == e3 ? void 0 : e3.target, rel: null == e3 ? void 0 : e3.rel, download: null == e3 ? void 0 : e3.download, ping: null == e3 ? void 0 : e3.ping, referrerPolicy: null == e3 ? void 0 : e3.referrerPolicy };
  }
  Mn.isOpening = false;
  const Fn = window["react-dom"];
  var kn = r.n(Fn);
  const Dn = e2.createContext(null);
  function Un(t3) {
    let { children: r2 } = t3, n2 = (0, e2.useContext)(Dn), [i3, o3] = (0, e2.useState)(0), s2 = (0, e2.useMemo)(() => ({ parent: n2, modalCount: i3, addModal() {
      o3((e3) => e3 + 1), n2 && n2.addModal();
    }, removeModal() {
      o3((e3) => e3 - 1), n2 && n2.removeModal();
    } }), [n2, i3]);
    return e2.createElement(Dn.Provider, { value: s2 }, r2);
  }
  function jn(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  const Bn = { S: 640, M: 768, L: 1024, XL: 1280, XXL: 1536 };
  function Kn(t3, r2) {
    let n2 = Vn(), i3 = n2 && n2.colorScheme, o3 = n2 && n2.breakpoints, { theme: s2 = n2 && n2.theme, defaultColorScheme: a2 } = t3;
    if (!s2) throw new Error("theme not found, the parent provider must have a theme provided");
    let l2 = function(e3, t4) {
      let r3 = wn("(prefers-color-scheme: dark)"), n3 = wn("(prefers-color-scheme: light)");
      return e3.dark && r3 ? "dark" : e3.light && n3 ? "light" : e3.dark && "dark" === t4 ? "dark" : e3.light && "light" === t4 ? "light" : e3.dark ? e3.light ? "light" : "dark" : "light";
    }(s2, a2), c2 = function(e3) {
      return wn("(any-pointer: fine)") && e3.medium ? "medium" : e3.large ? "large" : "medium";
    }(s2), { locale: u2 } = H(), d2 = !!s2[i3], { colorScheme: p2 = d2 ? i3 : l2, scale: f2 = n2 ? n2.scale : c2, locale: m2 = n2 ? u2 : null, breakpoints: h2 = n2 ? o3 : Bn, children: g2, isQuiet: y2, isEmphasized: b2, isDisabled: E2, isRequired: _2, isReadOnly: T2, validationState: S2, router: P2, ...w2 } = t3, C2 = { version: Sn.version, theme: s2, breakpoints: h2, colorScheme: p2, scale: f2, isQuiet: y2, isEmphasized: b2, isDisabled: E2, isRequired: _2, isReadOnly: T2, validationState: S2 }, x2 = function(t4) {
      let r3 = Object.entries(t4).sort(([, e3], [, t5]) => t5 - e3), n3 = r3.map(([, e3]) => `(min-width: ${e3}px)`), i4 = "undefined" != typeof window && "function" == typeof window.matchMedia, o4 = () => {
        let e3 = [];
        for (let t5 in n3) {
          let i5 = n3[t5];
          window.matchMedia(i5).matches && e3.push(r3[t5][0]);
        }
        return e3.push("base"), e3;
      }, [s3, a3] = (0, e2.useState)(() => i4 ? o4() : ["base"]);
      return (0, e2.useEffect)(() => {
        if (!i4) return;
        let e3 = () => {
          const e4 = o4();
          a3((t5) => t5.length !== e4.length || t5.some((t6, r4) => t6 !== e4[r4]) ? [...e4] : t5);
        };
        return window.addEventListener("resize", e3), () => {
          window.removeEventListener("resize", e3);
        };
      }, [i4]), v() ? ["base"] : s3;
    }(h2), O2 = {};
    Object.entries(C2).forEach(([e3, t4]) => void 0 !== t4 && (O2[e3] = t4));
    let I2 = Object.assign({}, n2, O2), R2 = g2, A2 = ve(w2), { styleProps: L2 } = se(w2, void 0, { matchedBreakpoints: x2 });
    return (!n2 || t3.locale || s2 !== n2.theme || p2 !== n2.colorScheme || f2 !== n2.scale || Object.keys(A2).length > 0 || w2.UNSAFE_className || Object.keys(L2.style).length > 0) && (R2 = e2.createElement(Wn, { ...t3, UNSAFE_style: { isolation: n2 ? void 0 : "isolate", ...L2.style }, ref: r2 }, R2)), P2 && (R2 = e2.createElement(In, P2, R2)), e2.createElement(on.Provider, { value: I2 }, e2.createElement(V, { locale: m2 }, e2.createElement(M, { matchedBreakpoints: x2 }, e2.createElement(Un, null, R2))));
  }
  let zn = e2.forwardRef(Kn);
  const Wn = e2.forwardRef(function(t3, r2) {
    let { children: n2, ...i3 } = t3, { locale: o3, direction: s2 } = H(), { theme: a2, colorScheme: l2, scale: c2 } = Vn(), { modalProviderProps: u2 } = function() {
      let t4 = (0, e2.useContext)(Dn);
      return { modalProviderProps: { "aria-hidden": !!(t4 && t4.modalCount > 0) || null } };
    }(), { styleProps: d2 } = se(i3), p2 = de(r2), f2 = Object.keys(a2[l2])[0], m2 = Object.keys(a2[c2])[0], h2 = w(d2.className, jn(fn).spectrum, jn(Pn).spectrum, Object.values(a2[l2]), Object.values(a2[c2]), a2.global ? Object.values(a2.global) : null, { "react-spectrum-provider": Ye, spectrum: Ye, [f2]: Ye, [m2]: Ye });
    var g2, y2;
    let v2 = { ...d2.style, colorScheme: null !== (y2 = null !== (g2 = t3.colorScheme) && void 0 !== g2 ? g2 : l2) && void 0 !== y2 ? y2 : Object.keys(a2).filter((e3) => "light" === e3 || "dark" === e3).join(" ") }, b2 = (0, e2.useRef)(false);
    return (0, e2.useEffect)(() => {
      if (s2 && p2.current) {
        let e3 = p2.current.parentElement.closest("[dir]"), t4 = e3 && e3.getAttribute("dir");
        t4 && t4 !== s2 && !b2.current && (console.warn(`Language directions cannot be nested. ${s2} inside ${t4}.`), b2.current = true);
      }
    }, [s2, p2, b2]), e2.createElement("div", { ...ve(i3), ...d2, ...u2, className: h2, style: v2, lang: o3, dir: s2, ref: p2 }, n2);
  });
  function Vn() {
    return (0, e2.useContext)(on);
  }
  function Hn(e3) {
    let t3 = Vn();
    return t3 ? Object.assign({}, { isQuiet: t3.isQuiet, isEmphasized: t3.isEmphasized, isDisabled: t3.isDisabled, isRequired: t3.isRequired, isReadOnly: t3.isReadOnly, validationState: t3.validationState }, e3) : e3;
  }
  function Gn(t3) {
    t3 = O(t3, "icon");
    let { children: r2, "aria-label": n2, "aria-hidden": i3, ...o3 } = t3, { styleProps: s2 } = se(o3), a2 = Vn(), l2 = "M";
    return null !== a2 && (l2 = "large" === a2.scale ? "L" : "M"), i3 || (i3 = void 0), e2.cloneElement(r2, { ...ve(o3), ...s2, scale: l2, focusable: "false", "aria-label": n2, "aria-hidden": !n2 || i3 || void 0, role: "img", className: Xe((c2 = nn, c2 && c2.__esModule ? c2.default : c2), r2.props.className, "spectrum-Icon", { [`spectrum-UIIcon-${r2.type.displayName}`]: r2.type.displayName }, s2.className) });
    var c2;
  }
  const qn = (t3) => e2.createElement("svg", sr({ viewBox: "0 0 18 18" }, t3), e2.createElement("path", { d: "M9 10.5a1 1 0 0 1-1-1V5a1 1 0 1 1 2 0v4.5a1 1 0 0 1-1 1Zm0 1.25A1.25 1.25 0 1 0 10.25 13 1.25 1.25 0 0 0 9 11.75Zm8.497 3.589a3.49 3.49 0 0 0 .079-3.474L12 1.815a3.385 3.385 0 0 0-5.994-.007L.416 11.88a3.485 3.485 0 0 0 .089 3.459A3.375 3.375 0 0 0 3.416 17h11.169a3.375 3.375 0 0 0 2.912-1.661ZM10.244 2.77l5.575 10.05a1.497 1.497 0 0 1-.037 1.489 1.374 1.374 0 0 1-1.197.69H3.416a1.374 1.374 0 0 1-1.197-.69 1.493 1.493 0 0 1-.046-1.474l5.593-10.08a1.386 1.386 0 0 1 2.478.015Z" }));
  function $n(t3) {
    var r2, n2;
    let i3 = Vn();
    return e2.createElement(Gn, t3, null != i3 && null != (r2 = i3.theme) && null != (n2 = r2.global) && n2.express ? e2.createElement(qn, null) : e2.createElement(ar.R, null));
  }
  qn.displayName = ar.R.displayName;
  var Yn = r(3043);
  function Xn(t3) {
    return e2.createElement(Gn, t3, e2.createElement(Yn.F, null));
  }
  function Qn(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(7292);
  var Zn, Jn, ei, ti, ri, ni, ii, oi, si, ai, li, ci = {};
  function ui(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function di(t3, r2) {
    let { description: n2, errorMessage: i3, validationState: o3, isInvalid: s2, isDisabled: a2, showErrorIcon: l2, descriptionProps: c2, errorMessageProps: u2 } = t3, d2 = de(r2), p2 = i3 && (s2 || "invalid" === o3), { styleProps: f2 } = se(t3);
    return e2.createElement("div", { ...f2, className: Xe(ui(ci), "spectrum-HelpText", "spectrum-HelpText--" + (p2 ? "negative" : "neutral"), { "is-disabled": a2 }, f2.className), ref: d2 }, p2 ? e2.createElement(e2.Fragment, null, l2 && e2.createElement($n, { UNSAFE_className: Xe(ui(ci), "spectrum-HelpText-validationIcon") }), e2.createElement("div", { ...u2, className: Xe(ui(ci), "spectrum-HelpText-text") }, i3)) : e2.createElement("div", { ...c2, className: Xe(ui(ci), "spectrum-HelpText-text") }, n2));
  }
  Qn(ci, "focus-ring", () => Zn, (e3) => Zn = e3), Qn(ci, "i18nFontFamily", () => Jn, (e3) => Jn = e3), Qn(ci, "is-disabled", () => ei, (e3) => ei = e3), Qn(ci, "spectrum-FocusRing-ring", () => ti, (e3) => ti = e3), Qn(ci, "spectrum-FocusRing", () => ri, (e3) => ri = e3), Qn(ci, "spectrum-FocusRing--quiet", () => ni, (e3) => ni = e3), Qn(ci, "spectrum-HelpText", () => ii, (e3) => ii = e3), Qn(ci, "spectrum-HelpText--negative", () => oi, (e3) => oi = e3), Qn(ci, "spectrum-HelpText--neutral", () => si, (e3) => si = e3), Qn(ci, "spectrum-HelpText-text", () => ai, (e3) => ai = e3), Qn(ci, "spectrum-HelpText-validationIcon", () => li, (e3) => li = e3), Zn = "a1Qy2q_focus-ring", Jn = "a1Qy2q_i18nFontFamily", ei = "a1Qy2q_is-disabled", ri = "a1Qy2q_spectrum-FocusRing " + (ti = "a1Qy2q_spectrum-FocusRing-ring"), ni = "a1Qy2q_spectrum-FocusRing--quiet", ii = "a1Qy2q_spectrum-HelpText", oi = "a1Qy2q_spectrum-HelpText--negative", si = "a1Qy2q_spectrum-HelpText--neutral", ai = "a1Qy2q_spectrum-HelpText-text", li = "a1Qy2q_spectrum-HelpText-validationIcon";
  const pi = e2.forwardRef(di);
  var fi;
  function mi(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  fi = { "ar-AE": { "(optional)": "(\u0627\u062E\u062A\u064A\u0627\u0631\u064A)", "(required)": "(\u0645\u0637\u0644\u0648\u0628)" }, "bg-BG": { "(optional)": "(\u043D\u0435\u0437\u0430\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E)", "(required)": "(\u0437\u0430\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E)" }, "cs-CZ": { "(optional)": "(voliteln\u011B)", "(required)": "(po\u017Eadov\xE1no)" }, "da-DK": { "(optional)": "(valgfrit)", "(required)": "(obligatorisk)" }, "de-DE": { "(optional)": "(optional)", "(required)": "(erforderlich)" }, "el-GR": { "(optional)": "(\u03C0\u03C1\u03BF\u03B1\u03B9\u03C1\u03B5\u03C4\u03B9\u03BA\u03CC)", "(required)": "(\u03B1\u03C0\u03B1\u03B9\u03C4\u03B5\u03AF\u03C4\u03B1\u03B9)" }, "en-US": { "(required)": "(required)", "(optional)": "(optional)" }, "es-ES": { "(optional)": "(opcional)", "(required)": "(obligatorio)" }, "et-EE": { "(optional)": "(valikuline)", "(required)": "(n\xF5utav)" }, "fi-FI": { "(optional)": "(valinnainen)", "(required)": "(pakollinen)" }, "fr-FR": { "(optional)": "(facultatif)", "(required)": "(requis)" }, "he-IL": { "(optional)": "(\u05D0\u05D5\u05E4\u05E6\u05D9\u05D5\u05E0\u05DC\u05D9)", "(required)": "(\u05E0\u05D3\u05E8\u05E9)" }, "hr-HR": { "(optional)": "(opcionalno)", "(required)": "(obvezno)" }, "hu-HU": { "(optional)": "(opcion\xE1lis)", "(required)": "(k\xF6telez\u0151)" }, "it-IT": { "(optional)": "(facoltativo)", "(required)": "(obbligatorio)" }, "ja-JP": { "(optional)": "\uFF08\u30AA\u30D7\u30B7\u30E7\u30F3\uFF09", "(required)": "\uFF08\u5FC5\u9808\uFF09" }, "ko-KR": { "(optional)": "(\uC120\uD0DD \uC0AC\uD56D)", "(required)": "(\uD544\uC218 \uC0AC\uD56D)" }, "lt-LT": { "(optional)": "(pasirenkama)", "(required)": "(privaloma)" }, "lv-LV": { "(optional)": "(neoblig\u0101ti)", "(required)": "(oblig\u0101ti)" }, "nb-NO": { "(optional)": "(valgfritt)", "(required)": "(obligatorisk)" }, "nl-NL": { "(optional)": "(optioneel)", "(required)": "(vereist)" }, "pl-PL": { "(optional)": "(opcjonalne)", "(required)": "(wymagane)" }, "pt-BR": { "(optional)": "(opcional)", "(required)": "(obrigat\xF3rio)" }, "pt-PT": { "(optional)": "(opcional)", "(required)": "(obrigat\xF3rio)" }, "ro-RO": { "(optional)": "(op\u0163ional)", "(required)": "(obligatoriu)" }, "ru-RU": { "(optional)": "(\u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E)", "(required)": "(\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)" }, "sk-SK": { "(optional)": "(nepovinn\xE9)", "(required)": "(povinn\xE9)" }, "sl-SI": { "(optional)": "(opcijsko)", "(required)": "(obvezno)" }, "sr-SP": { "(optional)": "(opciono)", "(required)": "(obavezno)" }, "sv-SE": { "(optional)": "(valfritt)", "(required)": "(kr\xE4vs)" }, "tr-TR": { "(optional)": "(iste\u011Fe ba\u011Fl\u0131)", "(required)": "(gerekli)" }, "uk-UA": { "(optional)": "(\u043D\u0435\u043E\u0431\u043E\u0432\u2019\u044F\u0437\u043A\u043E\u0432\u043E)", "(required)": "(\u043E\u0431\u043E\u0432\u2019\u044F\u0437\u043A\u043E\u0432\u043E)" }, "zh-CN": { "(optional)": "\uFF08\u53EF\u9009\uFF09", "(required)": "\uFF08\u5FC5\u586B\uFF09" }, "zh-TW": { "(optional)": "(\u9078\u586B)", "(required)": "(\u5FC5\u586B)" } }, r(2093);
  var hi, gi, yi, vi, bi, Ei, _i, Ti, Si, Pi, wi, Ci, xi, Oi, Ii, Ri, Ai, Mi, Li, Ni, Fi, ki, Di, Ui, ji, Bi, Ki, zi, Wi, Vi = {};
  mi(Vi, "contextualHelp", () => hi, (e3) => hi = e3), mi(Vi, "field", () => gi, (e3) => gi = e3), mi(Vi, "focus-ring", () => yi, (e3) => yi = e3), mi(Vi, "helpText", () => vi, (e3) => vi = e3), mi(Vi, "i18nFontFamily", () => bi, (e3) => bi = e3), mi(Vi, "is-disabled", () => Ei, (e3) => Ei = e3), mi(Vi, "label", () => _i, (e3) => _i = e3), mi(Vi, "spectrum-Field", () => Ti, (e3) => Ti = e3), mi(Vi, "spectrum-Field--alignEnd", () => Si, (e3) => Si = e3), mi(Vi, "spectrum-Field--hasContextualHelp", () => Pi, (e3) => Pi = e3), mi(Vi, "spectrum-Field--positionSide", () => wi, (e3) => wi = e3), mi(Vi, "spectrum-Field--positionTop", () => Ci, (e3) => Ci = e3), mi(Vi, "spectrum-Field-contextualHelp", () => xi, (e3) => xi = e3), mi(Vi, "spectrum-Field-field", () => Oi, (e3) => Oi = e3), mi(Vi, "spectrum-Field-labelCell", () => Ii, (e3) => Ii = e3), mi(Vi, "spectrum-Field-labelWrapper", () => Ri, (e3) => Ri = e3), mi(Vi, "spectrum-Field-wrapper", () => Ai, (e3) => Ai = e3), mi(Vi, "spectrum-FieldLabel", () => Mi, (e3) => Mi = e3), mi(Vi, "spectrum-FieldLabel--alignEnd", () => Li, (e3) => Li = e3), mi(Vi, "spectrum-FieldLabel--positionSide", () => Ni, (e3) => Ni = e3), mi(Vi, "spectrum-FieldLabel-requiredIcon", () => Fi, (e3) => Fi = e3), mi(Vi, "spectrum-FocusRing-ring", () => ki, (e3) => ki = e3), mi(Vi, "spectrum-FocusRing", () => Di, (e3) => Di = e3), mi(Vi, "spectrum-FocusRing--quiet", () => Ui, (e3) => Ui = e3), mi(Vi, "spectrum-Form", () => ji, (e3) => ji = e3), mi(Vi, "spectrum-Form--positionSide", () => Bi, (e3) => Bi = e3), mi(Vi, "spectrum-Form--positionTop", () => Ki, (e3) => Ki = e3), mi(Vi, "spectrum-Form-itemLabel", () => zi, (e3) => zi = e3), mi(Vi, "spectrum-LabeledValue", () => Wi, (e3) => Wi = e3), hi = "A-HlBa_contextualHelp", gi = "A-HlBa_field", yi = "A-HlBa_focus-ring", vi = "A-HlBa_helpText", bi = "A-HlBa_i18nFontFamily", Ei = "A-HlBa_is-disabled", _i = "A-HlBa_label", Ti = "A-HlBa_spectrum-Field", Si = "A-HlBa_spectrum-Field--alignEnd", Pi = "A-HlBa_spectrum-Field--hasContextualHelp", wi = "A-HlBa_spectrum-Field--positionSide", Ci = "A-HlBa_spectrum-Field--positionTop", xi = "A-HlBa_spectrum-Field-contextualHelp", Oi = "A-HlBa_spectrum-Field-field", Ii = "A-HlBa_spectrum-Field-labelCell", Ri = "A-HlBa_spectrum-Field-labelWrapper", Ai = "A-HlBa_spectrum-Field-wrapper", Mi = "A-HlBa_spectrum-FieldLabel", Li = "A-HlBa_spectrum-FieldLabel--alignEnd", Ni = "A-HlBa_spectrum-FieldLabel--positionSide", Fi = "A-HlBa_spectrum-FieldLabel-requiredIcon", Di = "A-HlBa_spectrum-FocusRing " + (ki = "A-HlBa_spectrum-FocusRing-ring"), Ui = "A-HlBa_spectrum-FocusRing--quiet", ji = "A-HlBa_spectrum-Form", Bi = "A-HlBa_spectrum-Form--positionSide", Ki = "A-HlBa_spectrum-Form--positionTop", zi = "A-HlBa_spectrum-Form-itemLabel", Wi = "A-HlBa_spectrum-LabeledValue";
  var Hi = r(7911);
  function Gi(t3) {
    return e2.createElement(Gn, t3, e2.createElement(Hi.d, null));
  }
  const qi = Symbol.for("react-aria.i18n.locale"), $i = Symbol.for("react-aria.i18n.strings");
  let Yi;
  class Xi {
    getStringForLocale(e3, t3) {
      let r2 = this.getStringsForLocale(t3)[e3];
      if (!r2) throw new Error(`Could not find intl message ${e3} in ${t3} locale`);
      return r2;
    }
    getStringsForLocale(e3) {
      let t3 = this.strings[e3];
      return t3 || (t3 = function(e4, t4, r2 = "en-US") {
        if (t4[e4]) return t4[e4];
        let n2 = function(e5) {
          return Intl.Locale ? new Intl.Locale(e5).language : e5.split("-")[0];
        }(e4);
        if (t4[n2]) return t4[n2];
        for (let e5 in t4) if (e5.startsWith(n2 + "-")) return t4[e5];
        return t4[r2];
      }(e3, this.strings, this.defaultLocale), this.strings[e3] = t3), t3;
    }
    static getGlobalDictionaryForPackage(e3) {
      if ("undefined" == typeof window) return null;
      let t3 = window[qi];
      if (void 0 === Yi) {
        let e4 = window[$i];
        if (!e4) return null;
        Yi = {};
        for (let r3 in e4) Yi[r3] = new Xi({ [t3]: e4[r3] }, t3);
      }
      let r2 = null == Yi ? void 0 : Yi[e3];
      if (!r2) throw new Error(`Strings for package "${e3}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
      return r2;
    }
    constructor(e3, t3 = "en-US") {
      this.strings = Object.fromEntries(Object.entries(e3).filter(([, e4]) => e4)), this.defaultLocale = t3;
    }
  }
  const Qi = /* @__PURE__ */ new Map(), Zi = /* @__PURE__ */ new Map();
  class Ji {
    format(e3, t3) {
      let r2 = this.strings.getStringForLocale(e3, this.locale);
      return "function" == typeof r2 ? r2(t3, this) : r2;
    }
    plural(e3, t3, r2 = "cardinal") {
      let n2 = t3["=" + e3];
      if (n2) return "function" == typeof n2 ? n2() : n2;
      let i3 = this.locale + ":" + r2, o3 = Qi.get(i3);
      return o3 || (o3 = new Intl.PluralRules(this.locale, { type: r2 }), Qi.set(i3, o3)), n2 = t3[o3.select(e3)] || t3.other, "function" == typeof n2 ? n2() : n2;
    }
    number(e3) {
      let t3 = Zi.get(this.locale);
      return t3 || (t3 = new Intl.NumberFormat(this.locale), Zi.set(this.locale, t3)), t3.format(e3);
    }
    select(e3, t3) {
      let r2 = e3[t3] || e3.other;
      return "function" == typeof r2 ? r2() : r2;
    }
    constructor(e3, t3) {
      this.locale = e3, this.strings = t3;
    }
  }
  const eo = /* @__PURE__ */ new WeakMap();
  function to(t3, r2) {
    let { locale: n2 } = H(), i3 = function(e3, t4) {
      return t4 && Xi.getGlobalDictionaryForPackage(t4) || function(e4) {
        let t5 = eo.get(e4);
        return t5 || (t5 = new Xi(e4), eo.set(e4, t5)), t5;
      }(e3);
    }(t3, r2);
    return (0, e2.useMemo)(() => new Ji(n2, i3), [n2, i3]);
  }
  function ro(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function no(t3, r2) {
    t3 = Hn(t3);
    let { children: n2, labelPosition: i3 = "top", labelAlign: o3 = "side" === i3 ? "start" : null, isRequired: s2, necessityIndicator: a2 = null != s2 ? "icon" : null, includeNecessityIndicatorInAccessibilityName: l2 = false, htmlFor: c2, for: u2, elementType: d2 = "label", onClick: p2, ...f2 } = t3, m2 = de(r2), { styleProps: h2 } = se(f2), g2 = to(ro(fi), "@react-spectrum/label"), y2 = s2 ? g2.format("(required)") : g2.format("(optional)"), v2 = e2.createElement(Gi, { UNSAFE_className: Xe(ro(Vi), "spectrum-FieldLabel-requiredIcon"), "aria-label": l2 ? g2.format("(required)") : void 0 }), b2 = Xe(ro(Vi), "spectrum-FieldLabel", { "spectrum-FieldLabel--positionSide": "side" === i3, "spectrum-FieldLabel--alignEnd": "end" === o3 }, h2.className);
    return e2.createElement(d2, { ...ve(f2), ...h2, onClick: p2, ref: m2, className: b2, htmlFor: "label" === d2 ? u2 || c2 : void 0 }, n2, ("label" === a2 || "icon" === a2 && s2) && " \u200B", "label" === a2 && e2.createElement("span", { "aria-hidden": l2 ? void 0 : s2 }, y2), "icon" === a2 && s2 && v2);
  }
  let io = e2.forwardRef(no);
  function oo(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(5374);
  var so, ao, lo, co = {};
  oo(co, "flex", () => so, (e3) => so = e3), oo(co, "flex-container", () => ao, (e3) => ao = e3), oo(co, "flex-gap", () => lo, (e3) => lo = e3), so = "NW91UW_flex", ao = "NW91UW_flex-container", lo = "NW91UW_flex-gap";
  const uo = { direction: ["flexDirection", ae], wrap: ["flexWrap", function(e3) {
    return "boolean" == typeof e3 ? e3 ? "wrap" : "nowrap" : e3;
  }], justifyContent: ["justifyContent", fo], alignItems: ["alignItems", fo], alignContent: ["alignContent", fo] };
  function po(t3, r2) {
    let { children: n2, ...i3 } = t3, o3 = L(), s2 = (null == o3 ? void 0 : o3.matchedBreakpoints) || ["base"], { styleProps: a2 } = se(i3), { styleProps: l2 } = se(i3, uo), c2 = de(r2), u2 = { ...a2.style, ...l2.style };
    return null != t3.gap && (u2.gap = ee(t3.gap, s2)), null != t3.columnGap && (u2.columnGap = ee(t3.columnGap, s2)), null != t3.rowGap && (u2.rowGap = ee(t3.rowGap, s2)), e2.createElement("div", { ...ve(i3), className: Xe((d2 = co, d2 && d2.__esModule ? d2.default : d2), "flex", a2.className), style: u2, ref: c2 }, n2);
    var d2;
  }
  function fo(e3) {
    return "start" === e3 ? "flex-start" : "end" === e3 ? "flex-end" : e3;
  }
  const mo = (0, e2.forwardRef)(po);
  r(7411);
  let ho = e2.createContext(null);
  function go(t3) {
    let r2 = (0, e2.useContext)(ho);
    return r2 ? { ...r2, ...t3 } : t3;
  }
  function yo(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function vo(t3, r2) {
    let n2 = go(t3), i3 = n2 !== t3;
    t3 = n2;
    let { label: o3, labelPosition: s2 = "top", labelAlign: a2, isRequired: l2, necessityIndicator: c2, includeNecessityIndicatorInAccessibilityName: u2, validationState: d2, isInvalid: p2, description: f2, errorMessage: m2 = (e3) => e3.validationErrors.join(" "), validationErrors: h2, validationDetails: g2, isDisabled: y2, showErrorIcon: v2, contextualHelp: b2, children: E2, labelProps: T2 = {}, descriptionProps: S2 = {}, errorMessageProps: P2 = {}, elementType: w2, wrapperClassName: x2, wrapperProps: O2 = {}, ...R2 } = t3, { styleProps: A2 } = se(R2), M2 = null;
    M2 = "function" == typeof m2 ? null != p2 && null != h2 && null != g2 ? m2({ isInvalid: p2, validationErrors: h2, validationDetails: g2 }) : null : m2;
    let L2 = !!f2 || M2 && (p2 || "invalid" === d2), N2 = _(), F2 = _();
    o3 && b2 && !T2.id && (T2.id = F2);
    let k2 = Xe(yo(Vi), "spectrum-Field", { "spectrum-Field--positionTop": "top" === s2, "spectrum-Field--positionSide": "side" === s2, "spectrum-Field--alignEnd": "end" === a2, "spectrum-Field--hasContextualHelp": !!t3.contextualHelp }, A2.className, x2);
    E2 = e2.cloneElement(E2, C(E2.props, { className: Xe(yo(Vi), "spectrum-Field-field") }));
    let D2 = () => e2.createElement(pi, { descriptionProps: S2, errorMessageProps: P2, description: f2, errorMessage: M2, validationState: d2, isInvalid: p2, isDisabled: y2, showErrorIcon: v2, gridArea: yo(Vi).helpText }), U2 = e2.createElement(e2.Fragment, null, o3 && e2.createElement(io, { ...T2, labelPosition: s2, labelAlign: a2, isRequired: l2, necessityIndicator: c2, includeNecessityIndicatorInAccessibilityName: u2, elementType: w2 }, o3), o3 && b2 && e2.createElement(I, { slots: { actionButton: { UNSAFE_className: Xe(yo(Vi), "spectrum-Field-contextualHelp"), id: N2, "aria-labelledby": (null == T2 ? void 0 : T2.id) ? `${T2.id} ${N2}` : void 0 } } }, b2));
    return i3 && "side" === s2 && o3 && b2 && (U2 = e2.createElement("div", { className: Xe(yo(Vi), "spectrum-Field-labelCell") }, e2.createElement("div", { className: Xe(yo(Vi), "spectrum-Field-labelWrapper") }, U2))), e2.createElement("div", { ...A2, ...O2, ref: r2, className: k2 }, U2, "side" === s2 ? e2.createElement(mo, { direction: "column", UNSAFE_className: Xe(yo(Vi), "spectrum-Field-wrapper") }, E2, L2 && D2()) : e2.createElement(e2.Fragment, null, E2, L2 && D2()));
  }
  /* @__PURE__ */ new Set(["action", "autoComplete", "encType", "method", "target", "onSubmit", "onReset", "onInvalid"]);
  let bo = e2.forwardRef(vo);
  function Eo(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(6178);
  var _o, To, So, Po, wo, Co, xo, Oo, Io, Ro, Ao, Mo, Lo, No, Fo, ko, Do, Uo, jo, Bo, Ko, zo, Wo, Vo, Ho, Go, qo, $o, Yo, Xo, Qo, Zo, Jo, es, ts, rs, ns, is, os = {};
  Eo(os, "focus-ring", () => _o, (e3) => _o = e3), Eo(os, "i18nFontFamily", () => To, (e3) => To = e3), Eo(os, "is-active", () => So, (e3) => So = e3), Eo(os, "is-disabled", () => Po, (e3) => Po = e3), Eo(os, "is-focused", () => wo, (e3) => wo = e3), Eo(os, "is-hovered", () => Co, (e3) => Co = e3), Eo(os, "is-open", () => xo, (e3) => xo = e3), Eo(os, "is-placeholder", () => Oo, (e3) => Oo = e3), Eo(os, "is-selected", () => Io, (e3) => Io = e3), Eo(os, "spectrum-BaseButton", () => Ro, (e3) => Ro = e3), Eo(os, "spectrum-FocusRing-ring", () => Ao, (e3) => Ao = e3), Eo(os, "spectrum-FocusRing", () => Mo, (e3) => Mo = e3), Eo(os, "spectrum-ActionButton", () => Lo, (e3) => Lo = e3), Eo(os, "spectrum-ActionButton--emphasized", () => No, (e3) => No = e3), Eo(os, "spectrum-ActionButton--quiet", () => Fo, (e3) => Fo = e3), Eo(os, "spectrum-ActionButton--staticBlack", () => ko, (e3) => ko = e3), Eo(os, "spectrum-ActionButton--staticColor", () => Do, (e3) => Do = e3), Eo(os, "spectrum-ActionButton--staticWhite", () => Uo, (e3) => Uo = e3), Eo(os, "spectrum-ActionButton-hold", () => jo, (e3) => jo = e3), Eo(os, "spectrum-ActionButton-label", () => Bo, (e3) => Bo = e3), Eo(os, "spectrum-ActionGroup-itemIcon", () => Ko, (e3) => Ko = e3), Eo(os, "spectrum-Button", () => zo, (e3) => zo = e3), Eo(os, "spectrum-Button--iconOnly", () => Wo, (e3) => Wo = e3), Eo(os, "spectrum-Button--overBackground", () => Vo, (e3) => Vo = e3), Eo(os, "spectrum-Button--pending", () => Ho, (e3) => Ho = e3), Eo(os, "spectrum-Button-circleLoader", () => Go, (e3) => Go = e3), Eo(os, "spectrum-Button-label", () => qo, (e3) => qo = e3), Eo(os, "spectrum-ClearButton", () => $o, (e3) => $o = e3), Eo(os, "spectrum-ClearButton--overBackground", () => Yo, (e3) => Yo = e3), Eo(os, "spectrum-ClearButton--small", () => Xo, (e3) => Xo = e3), Eo(os, "spectrum-FieldButton", () => Qo, (e3) => Qo = e3), Eo(os, "spectrum-FieldButton--invalid", () => Zo, (e3) => Zo = e3), Eo(os, "spectrum-FocusRing--quiet", () => Jo, (e3) => Jo = e3), Eo(os, "spectrum-FieldButton--quiet", () => es, (e3) => es = e3), Eo(os, "spectrum-Icon", () => ts, (e3) => ts = e3), Eo(os, "spectrum-LogicButton", () => rs, (e3) => rs = e3), Eo(os, "spectrum-LogicButton--and", () => ns, (e3) => ns = e3), Eo(os, "spectrum-LogicButton--or", () => is, (e3) => is = e3), _o = "Dniwja_focus-ring", So = "Dniwja_is-active", Po = "Dniwja_is-disabled", wo = "Dniwja_is-focused", Co = "Dniwja_is-hovered", xo = "Dniwja_is-open", Oo = "Dniwja_is-placeholder", Io = "Dniwja_is-selected", Lo = `Dniwja_spectrum-ActionButton ${Ro = "Dniwja_spectrum-BaseButton " + (To = "Dniwja_i18nFontFamily")} ${Mo = "Dniwja_spectrum-FocusRing " + (Ao = "Dniwja_spectrum-FocusRing-ring")}`, No = "Dniwja_spectrum-ActionButton--emphasized", Fo = "Dniwja_spectrum-ActionButton--quiet", ko = "Dniwja_spectrum-ActionButton--staticBlack", Do = "Dniwja_spectrum-ActionButton--staticColor", Uo = "Dniwja_spectrum-ActionButton--staticWhite", jo = "Dniwja_spectrum-ActionButton-hold", Bo = "Dniwja_spectrum-ActionButton-label", Ko = "Dniwja_spectrum-ActionGroup-itemIcon", zo = `Dniwja_spectrum-Button ${Ro} ${Mo}`, Wo = "Dniwja_spectrum-Button--iconOnly", Vo = "Dniwja_spectrum-Button--overBackground", Ho = "Dniwja_spectrum-Button--pending", Go = "Dniwja_spectrum-Button-circleLoader", qo = "Dniwja_spectrum-Button-label", $o = `Dniwja_spectrum-ClearButton ${Ro} ${Mo}`, Yo = "Dniwja_spectrum-ClearButton--overBackground", Xo = "Dniwja_spectrum-ClearButton--small", Qo = `Dniwja_spectrum-FieldButton ${Ro} ${Mo}`, Zo = "Dniwja_spectrum-FieldButton--invalid", es = "Dniwja_spectrum-FieldButton--quiet " + (Jo = "Dniwja_spectrum-FocusRing--quiet"), ts = "Dniwja_spectrum-Icon", rs = `Dniwja_spectrum-LogicButton ${Ro} ${Mo}`, ns = "Dniwja_spectrum-LogicButton--and", is = "Dniwja_spectrum-LogicButton--or";
  let ss = /* @__PURE__ */ new Map(), as = /* @__PURE__ */ new Set();
  function ls() {
    if ("undefined" == typeof window) return;
    function e3(e4) {
      return "propertyName" in e4;
    }
    let t3 = (r2) => {
      if (!e3(r2) || !r2.target) return;
      let n2 = ss.get(r2.target);
      if (n2 && (n2.delete(r2.propertyName), 0 === n2.size && (r2.target.removeEventListener("transitioncancel", t3), ss.delete(r2.target)), 0 === ss.size)) {
        for (let e4 of as) e4();
        as.clear();
      }
    };
    document.body.addEventListener("transitionrun", (r2) => {
      if (!e3(r2) || !r2.target) return;
      let n2 = ss.get(r2.target);
      n2 || (n2 = /* @__PURE__ */ new Set(), ss.set(r2.target, n2), r2.target.addEventListener("transitioncancel", t3, { once: true })), n2.add(r2.propertyName);
    }), document.body.addEventListener("transitionend", t3);
  }
  function cs(e3) {
    requestAnimationFrame(() => {
      0 === ss.size ? e3() : as.add(e3);
    });
  }
  function us(e3) {
    const t3 = lt(e3);
    if ("virtual" === wt()) {
      let r2 = t3.activeElement;
      cs(() => {
        t3.activeElement === r2 && e3.isConnected && Cn(e3);
      });
    } else Cn(e3);
  }
  function ds(e3, t3) {
    a(() => {
      if (e3 && e3.ref && t3) return e3.ref.current = t3.current, () => {
        e3.ref && (e3.ref.current = null);
      };
    });
  }
  function ps(e3) {
    if (!e3) return;
    let t3 = true;
    return (r2) => {
      let n2 = { ...r2, preventDefault() {
        r2.preventDefault();
      }, isDefaultPrevented: () => r2.isDefaultPrevented(), stopPropagation() {
        console.error("stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.");
      }, continuePropagation() {
        t3 = false;
      } };
      e3(n2), t3 && r2.stopPropagation();
    };
  }
  "undefined" != typeof document && ("loading" !== document.readyState ? ls() : document.addEventListener("DOMContentLoaded", ls));
  let fs = e2.createContext(null);
  function ms(t3, r2) {
    let { focusProps: n2 } = Rt(t3), { keyboardProps: i3 } = function(e3) {
      return { keyboardProps: e3.isDisabled ? {} : { onKeyDown: ps(e3.onKeyDown), onKeyUp: ps(e3.onKeyUp) } };
    }(t3), o3 = C(n2, i3), s2 = function(t4) {
      let r3 = (0, e2.useContext)(fs) || {};
      ds(r3, t4);
      let { ref: n3, ...i4 } = r3;
      return i4;
    }(r2), a2 = t3.isDisabled ? {} : s2, l2 = (0, e2.useRef)(t3.autoFocus);
    return (0, e2.useEffect)(() => {
      l2.current && r2.current && us(r2.current), l2.current = false;
    }, [r2]), { focusableProps: C({ ...o3, tabIndex: t3.excludeFromTabOrder && !t3.isDisabled ? -1 : void 0 }, a2) };
  }
  let hs = "default", gs = "", ys = /* @__PURE__ */ new WeakMap();
  function vs(e3) {
    if (rt()) {
      if ("default" === hs) {
        const t3 = lt(e3);
        gs = t3.documentElement.style.webkitUserSelect, t3.documentElement.style.webkitUserSelect = "none";
      }
      hs = "disabled";
    } else (e3 instanceof HTMLElement || e3 instanceof SVGElement) && (ys.set(e3, e3.style.userSelect), e3.style.userSelect = "none");
  }
  function bs(e3) {
    if (rt()) {
      if ("disabled" !== hs) return;
      hs = "restoring", setTimeout(() => {
        cs(() => {
          if ("restoring" === hs) {
            const t3 = lt(e3);
            "none" === t3.documentElement.style.webkitUserSelect && (t3.documentElement.style.webkitUserSelect = gs || ""), gs = "", hs = "default";
          }
        });
      }, 300);
    } else if ((e3 instanceof HTMLElement || e3 instanceof SVGElement) && e3 && ys.has(e3)) {
      let t3 = ys.get(e3);
      "none" === e3.style.userSelect && (e3.style.userSelect = t3), "" === e3.getAttribute("style") && e3.removeAttribute("style"), ys.delete(e3);
    }
  }
  const Es = e2.createContext({ register: () => {
  } });
  function _s(e3, t3, r2) {
    if (!t3.has(e3)) throw new TypeError("attempted to " + r2 + " private field on non-instance");
    return t3.get(e3);
  }
  function Ts(e3, t3, r2) {
    return function(e4, t4, r3) {
      if (t4.set) t4.set.call(e4, r3);
      else {
        if (!t4.writable) throw new TypeError("attempted to set read only private field");
        t4.value = r3;
      }
    }(e3, _s(e3, t3, "set"), r2), r2;
  }
  function Ss() {
    let t3 = (0, e2.useRef)(/* @__PURE__ */ new Map()), r2 = (0, e2.useCallback)((e3, r3, n3, i4) => {
      let o3 = (null == i4 ? void 0 : i4.once) ? (...e4) => {
        t3.current.delete(n3), n3(...e4);
      } : n3;
      t3.current.set(n3, { type: r3, eventTarget: e3, fn: o3, options: i4 }), e3.addEventListener(r3, n3, i4);
    }, []), n2 = (0, e2.useCallback)((e3, r3, n3, i4) => {
      var o3;
      let s2 = (null === (o3 = t3.current.get(n3)) || void 0 === o3 ? void 0 : o3.fn) || n3;
      e3.removeEventListener(r3, s2, i4), t3.current.delete(n3);
    }, []), i3 = (0, e2.useCallback)(() => {
      t3.current.forEach((e3, t4) => {
        n2(e3.eventTarget, e3.type, t4, e3.options);
      });
    }, [n2]);
    return (0, e2.useEffect)(() => i3, [i3]), { addGlobalListener: r2, removeGlobalListener: n2, removeAllGlobalListeners: i3 };
  }
  Es.displayName = "PressResponderContext";
  var Ps = /* @__PURE__ */ new WeakMap();
  class ws {
    continuePropagation() {
      Ts(this, Ps, false);
    }
    get shouldStopPropagation() {
      return function(e3, t3) {
        return t3.get ? t3.get.call(e3) : t3.value;
      }(this, _s(this, Ps, "get"));
    }
    constructor(e3, t3, r2) {
      var n2, i3, o3;
      o3 = { writable: true, value: void 0 }, function(e4, t4) {
        if (t4.has(e4)) throw new TypeError("Cannot initialize the same private elements twice on an object");
      }(n2 = this, i3 = Ps), i3.set(n2, o3), Ts(this, Ps, true), this.type = e3, this.pointerType = t3, this.target = r2.currentTarget, this.shiftKey = r2.shiftKey, this.metaKey = r2.metaKey, this.ctrlKey = r2.ctrlKey, this.altKey = r2.altKey;
    }
  }
  const Cs = Symbol("linkClicked");
  function xs(t3) {
    let { onPress: r2, onPressChange: n2, onPressStart: i3, onPressEnd: o3, onPressUp: a2, isDisabled: c2, isPressed: u2, preventFocusOnPress: d2, shouldCancelOnPointerExit: p2, allowTextSelectionOnPress: f2, ref: m2, ...h2 } = function(t4) {
      let r3 = (0, e2.useContext)(Es);
      if (r3) {
        let { register: e3, ...n3 } = r3;
        t4 = C(n3, t4), e3();
      }
      return ds(r3, t4.ref), t4;
    }(t3), [g2, y2] = (0, e2.useState)(false), v2 = (0, e2.useRef)({ isPressed: false, ignoreEmulatedMouseEvents: false, ignoreClickAfterPress: false, didFirePressStart: false, isTriggeringEvent: false, activePointerId: null, target: null, isOverTarget: false, pointerType: null }), { addGlobalListener: b2, removeAllGlobalListeners: E2 } = Ss(), _2 = l((e3, t4) => {
      let r3 = v2.current;
      if (c2 || r3.didFirePressStart) return false;
      let o4 = true;
      if (r3.isTriggeringEvent = true, i3) {
        let r4 = new ws("pressstart", t4, e3);
        i3(r4), o4 = r4.shouldStopPropagation;
      }
      return n2 && n2(true), r3.isTriggeringEvent = false, r3.didFirePressStart = true, y2(true), o4;
    }), T2 = l((e3, t4, i4 = true) => {
      let s2 = v2.current;
      if (!s2.didFirePressStart) return false;
      s2.ignoreClickAfterPress = true, s2.didFirePressStart = false, s2.isTriggeringEvent = true;
      let a3 = true;
      if (o3) {
        let r3 = new ws("pressend", t4, e3);
        o3(r3), a3 = r3.shouldStopPropagation;
      }
      if (n2 && n2(false), y2(false), r2 && i4 && !c2) {
        let n3 = new ws("press", t4, e3);
        r2(n3), a3 && (a3 = n3.shouldStopPropagation);
      }
      return s2.isTriggeringEvent = false, a3;
    }), S2 = l((e3, t4) => {
      let r3 = v2.current;
      if (c2) return false;
      if (a2) {
        r3.isTriggeringEvent = true;
        let n3 = new ws("pressup", t4, e3);
        return a2(n3), r3.isTriggeringEvent = false, n3.shouldStopPropagation;
      }
      return true;
    }), P2 = l((e3) => {
      let t4 = v2.current;
      t4.isPressed && t4.target && (t4.isOverTarget && null != t4.pointerType && T2(As(t4.target, e3), t4.pointerType, false), t4.isPressed = false, t4.isOverTarget = false, t4.activePointerId = null, t4.pointerType = null, E2(), f2 || bs(t4.target));
    }), w2 = l((e3) => {
      p2 && P2(e3);
    }), x2 = (0, e2.useMemo)(() => {
      let e3 = v2.current, t4 = { onKeyDown(t5) {
        if (Is(t5.nativeEvent, t5.currentTarget) && t5.currentTarget.contains(t5.target)) {
          var n3;
          Ns(t5.target, t5.key) && t5.preventDefault();
          let i4 = true;
          if (!e3.isPressed && !t5.repeat) {
            e3.target = t5.currentTarget, e3.isPressed = true, i4 = _2(t5, "keyboard");
            let n4 = t5.currentTarget, o4 = (t6) => {
              Is(t6, n4) && !t6.repeat && n4.contains(t6.target) && e3.target && S2(As(e3.target, t6), "keyboard");
            };
            b2(lt(t5.currentTarget), "keyup", s(o4, r3), true);
          }
          i4 && t5.stopPropagation(), t5.metaKey && et() && (null === (n3 = e3.metaKeyEvents) || void 0 === n3 || n3.set(t5.key, t5.nativeEvent));
        } else "Meta" === t5.key && (e3.metaKeyEvents = /* @__PURE__ */ new Map());
      }, onClick(t5) {
        if ((!t5 || t5.currentTarget.contains(t5.target)) && t5 && 0 === t5.button && !e3.isTriggeringEvent && !Mn.isOpening) {
          let r4 = true;
          if (c2 && t5.preventDefault(), !e3.ignoreClickAfterPress && !e3.ignoreEmulatedMouseEvents && !e3.isPressed && ("virtual" === e3.pointerType || at(t5.nativeEvent))) {
            c2 || d2 || Cn(t5.currentTarget);
            let e4 = _2(t5, "virtual"), n3 = S2(t5, "virtual"), i4 = T2(t5, "virtual");
            r4 = e4 && n3 && i4;
          }
          e3.ignoreEmulatedMouseEvents = false, e3.ignoreClickAfterPress = false, r4 && t5.stopPropagation();
        }
      } }, r3 = (t5) => {
        var r4;
        if (e3.isPressed && e3.target && Is(t5, e3.target)) {
          var n3;
          Ns(t5.target, t5.key) && t5.preventDefault();
          let r5 = t5.target;
          T2(As(e3.target, t5), "keyboard", e3.target.contains(r5)), E2(), "Enter" !== t5.key && Os(e3.target) && e3.target.contains(r5) && !t5[Cs] && (t5[Cs] = true, Mn(e3.target, t5, false)), e3.isPressed = false, null === (n3 = e3.metaKeyEvents) || void 0 === n3 || n3.delete(t5.key);
        } else if ("Meta" === t5.key && (null === (r4 = e3.metaKeyEvents) || void 0 === r4 ? void 0 : r4.size)) {
          var i4;
          let t6 = e3.metaKeyEvents;
          e3.metaKeyEvents = void 0;
          for (let r5 of t6.values()) null === (i4 = e3.target) || void 0 === i4 || i4.dispatchEvent(new KeyboardEvent("keyup", r5));
        }
      };
      if ("undefined" != typeof PointerEvent) {
        t4.onPointerDown = (t5) => {
          if (0 !== t5.button || !t5.currentTarget.contains(t5.target)) return;
          if (o4 = t5.nativeEvent, !ot() && 0 === o4.width && 0 === o4.height || 1 === o4.width && 1 === o4.height && 0 === o4.pressure && 0 === o4.detail && "mouse" === o4.pointerType) return void (e3.pointerType = "virtual");
          var o4;
          Ls(t5.currentTarget) && t5.preventDefault(), e3.pointerType = t5.pointerType;
          let s2 = true;
          e3.isPressed || (e3.isPressed = true, e3.isOverTarget = true, e3.activePointerId = t5.pointerId, e3.target = t5.currentTarget, c2 || d2 || Cn(t5.currentTarget), f2 || vs(e3.target), s2 = _2(t5, e3.pointerType), b2(lt(t5.currentTarget), "pointermove", r4, false), b2(lt(t5.currentTarget), "pointerup", n3, false), b2(lt(t5.currentTarget), "pointercancel", i4, false)), s2 && t5.stopPropagation();
        }, t4.onMouseDown = (e4) => {
          e4.currentTarget.contains(e4.target) && 0 === e4.button && (Ls(e4.currentTarget) && e4.preventDefault(), e4.stopPropagation());
        }, t4.onPointerUp = (t5) => {
          t5.currentTarget.contains(t5.target) && "virtual" !== e3.pointerType && 0 === t5.button && Ms(t5, t5.currentTarget) && S2(t5, e3.pointerType || t5.pointerType);
        };
        let r4 = (t5) => {
          t5.pointerId === e3.activePointerId && (e3.target && Ms(t5, e3.target) ? e3.isOverTarget || null == e3.pointerType || (e3.isOverTarget = true, _2(As(e3.target, t5), e3.pointerType)) : e3.target && e3.isOverTarget && null != e3.pointerType && (e3.isOverTarget = false, T2(As(e3.target, t5), e3.pointerType, false), w2(t5)));
        }, n3 = (t5) => {
          t5.pointerId === e3.activePointerId && e3.isPressed && 0 === t5.button && e3.target && (Ms(t5, e3.target) && null != e3.pointerType ? T2(As(e3.target, t5), e3.pointerType) : e3.isOverTarget && null != e3.pointerType && T2(As(e3.target, t5), e3.pointerType, false), e3.isPressed = false, e3.isOverTarget = false, e3.activePointerId = null, e3.pointerType = null, E2(), f2 || bs(e3.target));
        }, i4 = (e4) => {
          P2(e4);
        };
        t4.onDragStart = (e4) => {
          e4.currentTarget.contains(e4.target) && P2(e4);
        };
      } else {
        t4.onMouseDown = (t5) => {
          0 === t5.button && t5.currentTarget.contains(t5.target) && (Ls(t5.currentTarget) && t5.preventDefault(), e3.ignoreEmulatedMouseEvents ? t5.stopPropagation() : (e3.isPressed = true, e3.isOverTarget = true, e3.target = t5.currentTarget, e3.pointerType = at(t5.nativeEvent) ? "virtual" : "mouse", c2 || d2 || Cn(t5.currentTarget), _2(t5, e3.pointerType) && t5.stopPropagation(), b2(lt(t5.currentTarget), "mouseup", r4, false)));
        }, t4.onMouseEnter = (t5) => {
          if (!t5.currentTarget.contains(t5.target)) return;
          let r5 = true;
          e3.isPressed && !e3.ignoreEmulatedMouseEvents && null != e3.pointerType && (e3.isOverTarget = true, r5 = _2(t5, e3.pointerType)), r5 && t5.stopPropagation();
        }, t4.onMouseLeave = (t5) => {
          if (!t5.currentTarget.contains(t5.target)) return;
          let r5 = true;
          e3.isPressed && !e3.ignoreEmulatedMouseEvents && null != e3.pointerType && (e3.isOverTarget = false, r5 = T2(t5, e3.pointerType, false), w2(t5)), r5 && t5.stopPropagation();
        }, t4.onMouseUp = (t5) => {
          t5.currentTarget.contains(t5.target) && (e3.ignoreEmulatedMouseEvents || 0 !== t5.button || S2(t5, e3.pointerType || "mouse"));
        };
        let r4 = (t5) => {
          0 === t5.button && (e3.isPressed = false, E2(), e3.ignoreEmulatedMouseEvents ? e3.ignoreEmulatedMouseEvents = false : (e3.target && Ms(t5, e3.target) && null != e3.pointerType ? T2(As(e3.target, t5), e3.pointerType) : e3.target && e3.isOverTarget && null != e3.pointerType && T2(As(e3.target, t5), e3.pointerType, false), e3.isOverTarget = false));
        };
        t4.onTouchStart = (t5) => {
          if (!t5.currentTarget.contains(t5.target)) return;
          let r5 = function(e4) {
            const { targetTouches: t6 } = e4;
            return t6.length > 0 ? t6[0] : null;
          }(t5.nativeEvent);
          r5 && (e3.activePointerId = r5.identifier, e3.ignoreEmulatedMouseEvents = true, e3.isOverTarget = true, e3.isPressed = true, e3.target = t5.currentTarget, e3.pointerType = "touch", c2 || d2 || Cn(t5.currentTarget), f2 || vs(e3.target), _2(t5, e3.pointerType) && t5.stopPropagation(), b2(ct(t5.currentTarget), "scroll", n3, true));
        }, t4.onTouchMove = (t5) => {
          if (!t5.currentTarget.contains(t5.target)) return;
          if (!e3.isPressed) return void t5.stopPropagation();
          let r5 = Rs(t5.nativeEvent, e3.activePointerId), n4 = true;
          r5 && Ms(r5, t5.currentTarget) ? e3.isOverTarget || null == e3.pointerType || (e3.isOverTarget = true, n4 = _2(t5, e3.pointerType)) : e3.isOverTarget && null != e3.pointerType && (e3.isOverTarget = false, n4 = T2(t5, e3.pointerType, false), w2(t5)), n4 && t5.stopPropagation();
        }, t4.onTouchEnd = (t5) => {
          if (!t5.currentTarget.contains(t5.target)) return;
          if (!e3.isPressed) return void t5.stopPropagation();
          let r5 = Rs(t5.nativeEvent, e3.activePointerId), n4 = true;
          r5 && Ms(r5, t5.currentTarget) && null != e3.pointerType ? (S2(t5, e3.pointerType), n4 = T2(t5, e3.pointerType)) : e3.isOverTarget && null != e3.pointerType && (n4 = T2(t5, e3.pointerType, false)), n4 && t5.stopPropagation(), e3.isPressed = false, e3.activePointerId = null, e3.isOverTarget = false, e3.ignoreEmulatedMouseEvents = true, e3.target && !f2 && bs(e3.target), E2();
        }, t4.onTouchCancel = (t5) => {
          t5.currentTarget.contains(t5.target) && (t5.stopPropagation(), e3.isPressed && P2(t5));
        };
        let n3 = (t5) => {
          e3.isPressed && t5.target.contains(e3.target) && P2({ currentTarget: e3.target, shiftKey: false, ctrlKey: false, metaKey: false, altKey: false });
        };
        t4.onDragStart = (e4) => {
          e4.currentTarget.contains(e4.target) && P2(e4);
        };
      }
      return t4;
    }, [b2, c2, d2, E2, f2, P2, w2, T2, _2, S2]);
    return (0, e2.useEffect)(() => () => {
      var e3;
      f2 || bs(null !== (e3 = v2.current.target) && void 0 !== e3 ? e3 : void 0);
    }, [f2]), { isPressed: u2 || g2, pressProps: C(h2, x2) };
  }
  function Os(e3) {
    return "A" === e3.tagName && e3.hasAttribute("href");
  }
  function Is(e3, t3) {
    const { key: r2, code: n2 } = e3, i3 = t3, o3 = i3.getAttribute("role");
    return !("Enter" !== r2 && " " !== r2 && "Spacebar" !== r2 && "Space" !== n2 || i3 instanceof ct(i3).HTMLInputElement && !ks(i3, r2) || i3 instanceof ct(i3).HTMLTextAreaElement || i3.isContentEditable || ("link" === o3 || !o3 && Os(i3)) && "Enter" !== r2);
  }
  function Rs(e3, t3) {
    const r2 = e3.changedTouches;
    for (let e4 = 0; e4 < r2.length; e4++) {
      const n2 = r2[e4];
      if (n2.identifier === t3) return n2;
    }
    return null;
  }
  function As(e3, t3) {
    return { currentTarget: e3, shiftKey: t3.shiftKey, ctrlKey: t3.ctrlKey, metaKey: t3.metaKey, altKey: t3.altKey };
  }
  function Ms(e3, t3) {
    let r2 = t3.getBoundingClientRect(), n2 = function(e4) {
      let t4 = 0, r3 = 0;
      return void 0 !== e4.width ? t4 = e4.width / 2 : void 0 !== e4.radiusX && (t4 = e4.radiusX), void 0 !== e4.height ? r3 = e4.height / 2 : void 0 !== e4.radiusY && (r3 = e4.radiusY), { top: e4.clientY - r3, right: e4.clientX + t4, bottom: e4.clientY + r3, left: e4.clientX - t4 };
    }(e3);
    return o3 = n2, !((i3 = r2).left > o3.right || o3.left > i3.right || i3.top > o3.bottom || o3.top > i3.bottom);
    var i3, o3;
  }
  function Ls(e3) {
    return !(e3 instanceof HTMLElement && e3.hasAttribute("draggable"));
  }
  function Ns(e3, t3) {
    return e3 instanceof HTMLInputElement ? !ks(e3, t3) : e3 instanceof HTMLButtonElement ? "submit" !== e3.type && "reset" !== e3.type : !Os(e3);
  }
  const Fs = /* @__PURE__ */ new Set(["checkbox", "radio", "range", "color", "file", "image", "button", "submit", "reset"]);
  function ks(e3, t3) {
    return "checkbox" === e3.type || "radio" === e3.type ? " " === t3 : Fs.has(e3.type);
  }
  function Ds(e3, t3) {
    let r2, { elementType: n2 = "button", isDisabled: i3, onPress: o3, onPressStart: s2, onPressEnd: a2, onPressUp: l2, onPressChange: c2, preventFocusOnPress: u2, allowFocusWhenDisabled: d2, onClick: p2, href: f2, target: m2, rel: h2, type: g2 = "button" } = e3;
    r2 = "button" === n2 ? { type: g2, disabled: i3 } : { role: "button", tabIndex: i3 ? void 0 : 0, href: "a" === n2 && i3 ? void 0 : f2, target: "a" === n2 ? m2 : void 0, type: "input" === n2 ? g2 : void 0, disabled: "input" === n2 ? i3 : void 0, "aria-disabled": i3 && "input" !== n2 ? i3 : void 0, rel: "a" === n2 ? h2 : void 0 };
    let { pressProps: y2, isPressed: v2 } = xs({ onPressStart: s2, onPressEnd: a2, onPressChange: c2, onPress: o3, onPressUp: l2, isDisabled: i3, preventFocusOnPress: u2, ref: t3 }), { focusableProps: b2 } = ms(e3, t3);
    d2 && (b2.tabIndex = i3 ? -1 : b2.tabIndex);
    let E2 = C(b2, y2, ve(e3, { labelable: true }));
    return { isPressed: v2, buttonProps: C(r2, E2, { "aria-haspopup": e3["aria-haspopup"], "aria-expanded": e3["aria-expanded"], "aria-controls": e3["aria-controls"], "aria-pressed": e3["aria-pressed"], onClick: (e4) => {
      p2 && (p2(e4), console.warn("onClick is deprecated, please use onPress"));
    } }) };
  }
  let Us = false, js = 0;
  function Bs() {
    Us = true, setTimeout(() => {
      Us = false;
    }, 50);
  }
  function Ks(e3) {
    "touch" === e3.pointerType && Bs();
  }
  function zs() {
    if ("undefined" != typeof document) return "undefined" != typeof PointerEvent ? document.addEventListener("pointerup", Ks) : document.addEventListener("touchend", Bs), js++, () => {
      js--, js > 0 || ("undefined" != typeof PointerEvent ? document.removeEventListener("pointerup", Ks) : document.removeEventListener("touchend", Bs));
    };
  }
  function Ws(t3) {
    let { onHoverStart: r2, onHoverChange: n2, onHoverEnd: i3, isDisabled: o3 } = t3, [s2, a2] = (0, e2.useState)(false), l2 = (0, e2.useRef)({ isHovered: false, ignoreEmulatedMouseEvents: false, pointerType: "", target: null }).current;
    (0, e2.useEffect)(zs, []);
    let { hoverProps: c2, triggerHoverEnd: u2 } = (0, e2.useMemo)(() => {
      let e3 = (e4, t5) => {
        if (l2.pointerType = t5, o3 || "touch" === t5 || l2.isHovered || !e4.currentTarget.contains(e4.target)) return;
        l2.isHovered = true;
        let i4 = e4.currentTarget;
        l2.target = i4, r2 && r2({ type: "hoverstart", target: i4, pointerType: t5 }), n2 && n2(true), a2(true);
      }, t4 = (e4, t5) => {
        if (l2.pointerType = "", l2.target = null, "touch" === t5 || !l2.isHovered) return;
        l2.isHovered = false;
        let r3 = e4.currentTarget;
        i3 && i3({ type: "hoverend", target: r3, pointerType: t5 }), n2 && n2(false), a2(false);
      }, s3 = {};
      return "undefined" != typeof PointerEvent ? (s3.onPointerEnter = (t5) => {
        Us && "mouse" === t5.pointerType || e3(t5, t5.pointerType);
      }, s3.onPointerLeave = (e4) => {
        !o3 && e4.currentTarget.contains(e4.target) && t4(e4, e4.pointerType);
      }) : (s3.onTouchStart = () => {
        l2.ignoreEmulatedMouseEvents = true;
      }, s3.onMouseEnter = (t5) => {
        l2.ignoreEmulatedMouseEvents || Us || e3(t5, "mouse"), l2.ignoreEmulatedMouseEvents = false;
      }, s3.onMouseLeave = (e4) => {
        !o3 && e4.currentTarget.contains(e4.target) && t4(e4, "mouse");
      }), { hoverProps: s3, triggerHoverEnd: t4 };
    }, [r2, n2, i3, o3, l2]);
    return (0, e2.useEffect)(() => {
      o3 && u2({ currentTarget: l2.target }, l2.pointerType);
    }, [o3]), { hoverProps: c2, isHovered: s2 };
  }
  function Vs(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function Hs(t3, r2) {
    t3 = O(t3, "button");
    let { isQuiet: n2, isDisabled: i3, validationState: o3, isInvalid: s2, children: a2, autoFocus: l2, isActive: c2, focusRingClass: u2, ...d2 } = t3, p2 = pe(r2), { buttonProps: f2, isPressed: m2 } = Ds(t3, p2), { hoverProps: h2, isHovered: g2 } = Ws({ isDisabled: i3 }), { styleProps: y2 } = se(d2);
    return e2.createElement(Lt, { focusRingClass: Xe(Vs(os), "focus-ring", u2), autoFocus: l2 }, e2.createElement("button", { ...C(f2, h2), ref: p2, className: Xe(Vs(os), "spectrum-FieldButton", { "spectrum-FieldButton--quiet": n2, "is-active": c2 || m2, "is-disabled": i3, "spectrum-FieldButton--invalid": s2 || "invalid" === o3, "is-hovered": g2 }, y2.className) }, e2.createElement(I, { slots: { icon: { size: "S", UNSAFE_className: Xe(Vs(os), "spectrum-Icon") } } }, a2)));
  }
  let Gs = e2.forwardRef(Hs);
  function qs(e3, t3) {
    let r2 = window.getComputedStyle(e3), n2 = /(auto|scroll)/.test(r2.overflow + r2.overflowX + r2.overflowY);
    return n2 && t3 && (n2 = e3.scrollHeight !== e3.clientHeight || e3.scrollWidth !== e3.clientWidth), n2;
  }
  class $s {
    isDisabled(e3) {
      var t3;
      return "all" === this.disabledBehavior && ((null === (t3 = e3.props) || void 0 === t3 ? void 0 : t3.isDisabled) || this.disabledKeys.has(e3.key));
    }
    getNextKey(e3) {
      for (e3 = this.collection.getKeyAfter(e3); null != e3; ) {
        let t3 = this.collection.getItem(e3);
        if ("item" === t3.type && !this.isDisabled(t3)) return e3;
        e3 = this.collection.getKeyAfter(e3);
      }
      return null;
    }
    getPreviousKey(e3) {
      for (e3 = this.collection.getKeyBefore(e3); null != e3; ) {
        let t3 = this.collection.getItem(e3);
        if ("item" === t3.type && !this.isDisabled(t3)) return e3;
        e3 = this.collection.getKeyBefore(e3);
      }
      return null;
    }
    findKey(e3, t3, r2) {
      let n2 = this.getItem(e3);
      if (!n2) return null;
      let i3 = n2.getBoundingClientRect();
      do {
        e3 = t3(e3), n2 = this.getItem(e3);
      } while (n2 && r2(i3, n2.getBoundingClientRect()));
      return e3;
    }
    isSameRow(e3, t3) {
      return e3.top === t3.top || e3.left !== t3.left;
    }
    isSameColumn(e3, t3) {
      return e3.left === t3.left || e3.top !== t3.top;
    }
    getKeyBelow(e3) {
      return "grid" === this.layout && "vertical" === this.orientation ? this.findKey(e3, (e4) => this.getNextKey(e4), this.isSameRow) : this.getNextKey(e3);
    }
    getKeyAbove(e3) {
      return "grid" === this.layout && "vertical" === this.orientation ? this.findKey(e3, (e4) => this.getPreviousKey(e4), this.isSameRow) : this.getPreviousKey(e3);
    }
    getNextColumn(e3, t3) {
      return t3 ? this.getPreviousKey(e3) : this.getNextKey(e3);
    }
    getKeyRightOf(e3) {
      return "grid" === this.layout ? "vertical" === this.orientation ? this.getNextColumn(e3, "rtl" === this.direction) : this.findKey(e3, (e4) => this.getNextColumn(e4, "rtl" === this.direction), this.isSameColumn) : "horizontal" === this.orientation ? this.getNextColumn(e3, "rtl" === this.direction) : null;
    }
    getKeyLeftOf(e3) {
      return "grid" === this.layout ? "vertical" === this.orientation ? this.getNextColumn(e3, "ltr" === this.direction) : this.findKey(e3, (e4) => this.getNextColumn(e4, "ltr" === this.direction), this.isSameColumn) : "horizontal" === this.orientation ? this.getNextColumn(e3, "ltr" === this.direction) : null;
    }
    getFirstKey() {
      let e3 = this.collection.getFirstKey();
      for (; null != e3; ) {
        let t3 = this.collection.getItem(e3);
        if ("item" === (null == t3 ? void 0 : t3.type) && !this.isDisabled(t3)) return e3;
        e3 = this.collection.getKeyAfter(e3);
      }
      return null;
    }
    getLastKey() {
      let e3 = this.collection.getLastKey();
      for (; null != e3; ) {
        let t3 = this.collection.getItem(e3);
        if ("item" === t3.type && !this.isDisabled(t3)) return e3;
        e3 = this.collection.getKeyBefore(e3);
      }
      return null;
    }
    getItem(e3) {
      return null !== e3 ? this.ref.current.querySelector(`[data-key="${CSS.escape(e3.toString())}"]`) : null;
    }
    getKeyPageAbove(e3) {
      let t3 = this.ref.current, r2 = this.getItem(e3);
      if (!r2) return null;
      if (!qs(t3)) return this.getFirstKey();
      let n2 = t3.getBoundingClientRect(), i3 = r2.getBoundingClientRect();
      if ("horizontal" === this.orientation) {
        let o3 = n2.x - t3.scrollLeft, s2 = Math.max(0, i3.x - o3 + i3.width - n2.width);
        for (; r2 && i3.x - o3 > s2; ) r2 = null == (e3 = this.getKeyAbove(e3)) ? null : this.getItem(e3), i3 = null == r2 ? void 0 : r2.getBoundingClientRect();
      } else {
        let o3 = n2.y - t3.scrollTop, s2 = Math.max(0, i3.y - o3 + i3.height - n2.height);
        for (; r2 && i3.y - o3 > s2; ) r2 = null == (e3 = this.getKeyAbove(e3)) ? null : this.getItem(e3), i3 = null == r2 ? void 0 : r2.getBoundingClientRect();
      }
      return null != e3 ? e3 : this.getFirstKey();
    }
    getKeyPageBelow(e3) {
      let t3 = this.ref.current, r2 = this.getItem(e3);
      if (!r2) return null;
      if (!qs(t3)) return this.getLastKey();
      let n2 = t3.getBoundingClientRect(), i3 = r2.getBoundingClientRect();
      if ("horizontal" === this.orientation) {
        let o3 = n2.x - t3.scrollLeft, s2 = Math.min(t3.scrollWidth, i3.x - o3 - i3.width + n2.width);
        for (; r2 && i3.x - o3 < s2; ) r2 = null == (e3 = this.getKeyBelow(e3)) ? null : this.getItem(e3), i3 = null == r2 ? void 0 : r2.getBoundingClientRect();
      } else {
        let o3 = n2.y - t3.scrollTop, s2 = Math.min(t3.scrollHeight, i3.y - o3 - i3.height + n2.height);
        for (; r2 && i3.y - o3 < s2; ) r2 = null == (e3 = this.getKeyBelow(e3)) ? null : this.getItem(e3), i3 = null == r2 ? void 0 : r2.getBoundingClientRect();
      }
      return null != e3 ? e3 : this.getLastKey();
    }
    getKeyForSearch(e3, t3) {
      if (!this.collator) return null;
      let r2 = this.collection, n2 = t3 || this.getFirstKey();
      for (; null != n2; ) {
        let t4 = r2.getItem(n2), i3 = t4.textValue.slice(0, e3.length);
        if (t4.textValue && 0 === this.collator.compare(i3, e3)) return n2;
        n2 = this.getKeyBelow(n2);
      }
      return null;
    }
    constructor(...e3) {
      if (1 === e3.length) {
        let t3 = e3[0];
        this.collection = t3.collection, this.ref = t3.ref, this.collator = t3.collator, this.disabledKeys = t3.disabledKeys || /* @__PURE__ */ new Set(), this.disabledBehavior = t3.disabledBehavior || "all", this.orientation = t3.orientation, this.direction = t3.direction, this.layout = t3.layout || "stack";
      } else this.collection = e3[0], this.disabledKeys = e3[1], this.ref = e3[2], this.collator = e3[3], this.layout = "stack", this.orientation = "vertical", this.disabledBehavior = "all";
      "stack" === this.layout && "vertical" === this.orientation && (this.getKeyLeftOf = void 0, this.getKeyRightOf = void 0);
    }
  }
  const Ys = 1e3;
  function Xs(t3) {
    let { keyboardDelegate: r2, selectionManager: n2, onTypeSelect: i3 } = t3, o3 = (0, e2.useRef)({ search: "", timeout: null }).current;
    return { typeSelectProps: { onKeyDownCapture: r2.getKeyForSearch ? (e3) => {
      let t4 = function(e4) {
        return 1 !== e4.length && /^[A-Z]/i.test(e4) ? "" : e4;
      }(e3.key);
      if (!t4 || e3.ctrlKey || e3.metaKey || !e3.currentTarget.contains(e3.target)) return;
      " " === t4 && o3.search.trim().length > 0 && (e3.preventDefault(), "continuePropagation" in e3 || e3.stopPropagation()), o3.search += t4;
      let s2 = r2.getKeyForSearch(o3.search, n2.focusedKey);
      null == s2 && (s2 = r2.getKeyForSearch(o3.search)), null != s2 && (n2.setFocusedKey(s2), i3 && i3(s2)), clearTimeout(o3.timeout), o3.timeout = setTimeout(() => {
        o3.search = "";
      }, Ys);
    } : null } };
  }
  let Qs = /* @__PURE__ */ new Map();
  function Zs(e3) {
    let { locale: t3 } = H(), r2 = t3 + (e3 ? Object.entries(e3).sort((e4, t4) => e4[0] < t4[0] ? -1 : 1).join() : "");
    if (Qs.has(r2)) return Qs.get(r2);
    let n2 = new Intl.Collator(t3, e3);
    return Qs.set(r2, n2), n2;
  }
  function Js(e3, t3) {
    let { id: r2, "aria-label": n2, "aria-labelledby": i3 } = e3;
    if (r2 = _(r2), i3 && n2) {
      let e4 = /* @__PURE__ */ new Set([r2, ...i3.trim().split(/\s+/)]);
      i3 = [...e4].join(" ");
    } else i3 && (i3 = i3.trim().split(/\s+/).join(" "));
    return n2 || i3 || !t3 || (n2 = t3), { id: r2, "aria-label": n2, "aria-labelledby": i3 };
  }
  function ea(e3) {
    let { id: t3, label: r2, "aria-labelledby": n2, "aria-label": i3, labelElementType: o3 = "label" } = e3;
    t3 = _(t3);
    let s2 = _(), a2 = {};
    return r2 ? (n2 = n2 ? `${s2} ${n2}` : s2, a2 = { id: s2, htmlFor: "label" === o3 ? t3 : void 0 }) : n2 || i3 || console.warn("If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility"), { labelProps: a2, fieldProps: Js({ id: t3, "aria-label": i3, "aria-labelledby": n2 }) };
  }
  function ta(e3) {
    let { description: t3, errorMessage: r2, isInvalid: n2, validationState: i3 } = e3, { labelProps: o3, fieldProps: s2 } = ea(e3), a2 = S([Boolean(t3), Boolean(r2), n2, i3]), l2 = S([Boolean(t3), Boolean(r2), n2, i3]);
    return s2 = C(s2, { "aria-describedby": [a2, l2, e3["aria-describedby"]].filter(Boolean).join(" ") || void 0 }), { labelProps: o3, fieldProps: s2, descriptionProps: { id: a2 }, errorMessageProps: { id: l2 } };
  }
  var ra = {};
  ra = { "ar-AE": { longPressMessage: "\u0627\u0636\u063A\u0637 \u0645\u0637\u0648\u0644\u0627\u064B \u0623\u0648 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 Alt + \u0627\u0644\u0633\u0647\u0645 \u0644\u0623\u0633\u0641\u0644 \u0644\u0641\u062A\u062D \u0627\u0644\u0642\u0627\u0626\u0645\u0629" }, "bg-BG": { longPressMessage: "\u041D\u0430\u0442\u0438\u0441\u043D\u0435\u0442\u0435 \u043F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E \u0438\u043B\u0438 \u043D\u0430\u0442\u0438\u0441\u043D\u0435\u0442\u0435 Alt+ \u0441\u0442\u0440\u0435\u043B\u043A\u0430 \u043D\u0430\u0434\u043E\u043B\u0443, \u0437\u0430 \u0434\u0430 \u043E\u0442\u0432\u043E\u0440\u0438\u0442\u0435 \u043C\u0435\u043D\u044E\u0442\u043E" }, "cs-CZ": { longPressMessage: "Dlouh\xFDm stiskem nebo stisknut\xEDm kl\xE1ves Alt + \u0161ipka dol\u016F otev\u0159ete nab\xEDdku" }, "da-DK": { longPressMessage: "Langt tryk eller tryk p\xE5 Alt + pil ned for at \xE5bne menuen" }, "de-DE": { longPressMessage: "Dr\xFCcken Sie lange oder dr\xFCcken Sie Alt + Nach-unten, um das Men\xFC zu \xF6ffnen" }, "el-GR": { longPressMessage: "\u03A0\u03B9\u03AD\u03C3\u03C4\u03B5 \u03C0\u03B1\u03C1\u03B1\u03C4\u03B5\u03C4\u03B1\u03BC\u03AD\u03BD\u03B1 \u03AE \u03C0\u03B1\u03C4\u03AE\u03C3\u03C4\u03B5 Alt + \u03BA\u03AC\u03C4\u03C9 \u03B2\u03AD\u03BB\u03BF\u03C2 \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03B1\u03BD\u03BF\u03AF\u03BE\u03B5\u03C4\u03B5 \u03C4\u03BF \u03BC\u03B5\u03BD\u03BF\u03CD" }, "en-US": { longPressMessage: "Long press or press Alt + ArrowDown to open menu" }, "es-ES": { longPressMessage: "Mantenga pulsado o pulse Alt + flecha abajo para abrir el men\xFA" }, "et-EE": { longPressMessage: "Men\xFC\xFC avamiseks vajutage pikalt v\xF5i vajutage klahve Alt + allanool" }, "fi-FI": { longPressMessage: "Avaa valikko painamalla pohjassa tai n\xE4pp\xE4inyhdistelm\xE4ll\xE4 Alt + Alanuoli" }, "fr-FR": { longPressMessage: "Appuyez de mani\xE8re prolong\xE9e ou appuyez sur Alt\xA0+\xA0Fl\xE8che vers le bas pour ouvrir le menu." }, "he-IL": { longPressMessage: "\u05DC\u05D7\u05E5 \u05DC\u05D7\u05D9\u05E6\u05D4 \u05D0\u05E8\u05D5\u05DB\u05D4 \u05D0\u05D5 \u05D4\u05E7\u05E9 Alt + ArrowDown \u05DB\u05D3\u05D9 \u05DC\u05E4\u05EA\u05D5\u05D7 \u05D0\u05EA \u05D4\u05EA\u05E4\u05E8\u05D9\u05D8" }, "hr-HR": { longPressMessage: "Dugo pritisnite ili pritisnite Alt + strelicu prema dolje za otvaranje izbornika" }, "hu-HU": { longPressMessage: "Nyomja meg hosszan, vagy nyomja meg az Alt + lefele ny\xEDl gombot a men\xFC megnyit\xE1s\xE1hoz" }, "it-IT": { longPressMessage: "Premere a lungo o premere Alt + Freccia gi\xF9 per aprire il menu" }, "ja-JP": { longPressMessage: "\u9577\u62BC\u3057\u307E\u305F\u306F Alt+\u4E0B\u77E2\u5370\u30AD\u30FC\u3067\u30E1\u30CB\u30E5\u30FC\u3092\u958B\u304F" }, "ko-KR": { longPressMessage: "\uAE38\uAC8C \uB204\uB974\uAC70\uB098 Alt + \uC544\uB798\uCABD \uD654\uC0B4\uD45C\uB97C \uB20C\uB7EC \uBA54\uB274 \uC5F4\uAE30" }, "lt-LT": { longPressMessage: "Nor\u0117dami atidaryti meniu, nuspaud\u0119 palaikykite arba paspauskite \u201EAlt + ArrowDown\u201C." }, "lv-LV": { longPressMessage: "Lai atv\u0113rtu izv\u0113lni, turiet nospiestu vai nospiediet tausti\u0146u kombin\u0101ciju Alt + lejupv\u0113rst\u0101 bulti\u0146a" }, "nb-NO": { longPressMessage: "Langt trykk eller trykk Alt + PilNed for \xE5 \xE5pne menyen" }, "nl-NL": { longPressMessage: "Druk lang op Alt + pijl-omlaag of druk op Alt om het menu te openen" }, "pl-PL": { longPressMessage: "Naci\u015Bnij i przytrzymaj lub naci\u015Bnij klawisze Alt + Strza\u0142ka w d\xF3\u0142, aby otworzy\u0107 menu" }, "pt-BR": { longPressMessage: "Pressione e segure ou pressione Alt + Seta para baixo para abrir o menu" }, "pt-PT": { longPressMessage: "Prima continuamente ou prima Alt + Seta Para Baixo para abrir o menu" }, "ro-RO": { longPressMessage: "Ap\u0103sa\u021Bi lung sau ap\u0103sa\u021Bi pe Alt + s\u0103geat\u0103 \xEEn jos pentru a deschide meniul" }, "ru-RU": { longPressMessage: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0438 \u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0438\u043B\u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 Alt + \u0421\u0442\u0440\u0435\u043B\u043A\u0430 \u0432\u043D\u0438\u0437, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E" }, "sk-SK": { longPressMessage: "Ponuku otvor\xEDte dlh\xFDm stla\u010Den\xEDm alebo stla\u010Den\xEDm kl\xE1vesu Alt + kl\xE1vesu so \u0161\xEDpkou nadol" }, "sl-SI": { longPressMessage: "Za odprtje menija pritisnite in dr\u017Eite gumb ali pritisnite Alt+pu\u0161\u010Dica navzdol" }, "sr-SP": { longPressMessage: "Dugo pritisnite ili pritisnite Alt + strelicu prema dole da otvorite meni" }, "sv-SE": { longPressMessage: "H\xE5ll nedtryckt eller tryck p\xE5 Alt + pil ned\xE5t f\xF6r att \xF6ppna menyn" }, "tr-TR": { longPressMessage: "Men\xFCy\xFC a\xE7mak i\xE7in uzun bas\u0131n veya Alt + A\u015Fa\u011F\u0131 Ok tu\u015Funa bas\u0131n" }, "uk-UA": { longPressMessage: "\u0414\u043E\u0432\u0433\u043E \u0430\u0431\u043E \u0437\u0432\u0438\u0447\u0430\u0439\u043D\u043E \u043D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u043A\u043E\u043C\u0431\u0456\u043D\u0430\u0446\u0456\u044E \u043A\u043B\u0430\u0432\u0456\u0448 Alt \u0456 \u0441\u0442\u0440\u0456\u043B\u043A\u0430 \u0432\u043D\u0438\u0437, \u0449\u043E\u0431 \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u043C\u0435\u043D\u044E" }, "zh-CN": { longPressMessage: "\u957F\u6309\u6216\u6309 Alt + \u5411\u4E0B\u65B9\u5411\u952E\u4EE5\u6253\u5F00\u83DC\u5355" }, "zh-TW": { longPressMessage: "\u9577\u6309\u6216\u6309 Alt+\u5411\u4E0B\u9375\u4EE5\u958B\u555F\u529F\u80FD\u8868" } };
  let na = 0;
  const ia = /* @__PURE__ */ new Map();
  function oa(t3) {
    let [r2, n2] = (0, e2.useState)();
    return a(() => {
      if (!t3) return;
      let e3 = ia.get(t3);
      if (e3) n2(e3.element.id);
      else {
        let r3 = "react-aria-description-" + na++;
        n2(r3);
        let i3 = document.createElement("div");
        i3.id = r3, i3.style.display = "none", i3.textContent = t3, document.body.appendChild(i3), e3 = { refCount: 0, element: i3 }, ia.set(t3, e3);
      }
      return e3.refCount++, () => {
        e3 && 0 == --e3.refCount && (e3.element.remove(), ia.delete(t3));
      };
    }, [t3]), { "aria-describedby": t3 ? r2 : void 0 };
  }
  const sa = 500;
  function aa(t3) {
    let { isDisabled: r2, onLongPressStart: n2, onLongPressEnd: i3, onLongPress: o3, threshold: s2 = sa, accessibilityDescription: a2 } = t3;
    const l2 = (0, e2.useRef)();
    let { addGlobalListener: c2, removeGlobalListener: u2 } = Ss(), { pressProps: d2 } = xs({ isDisabled: r2, onPressStart(e3) {
      if (e3.continuePropagation(), ("mouse" === e3.pointerType || "touch" === e3.pointerType) && (n2 && n2({ ...e3, type: "longpressstart" }), l2.current = setTimeout(() => {
        e3.target.dispatchEvent(new PointerEvent("pointercancel", { bubbles: true })), o3 && o3({ ...e3, type: "longpress" }), l2.current = void 0;
      }, s2), "touch" === e3.pointerType)) {
        let t4 = (e4) => {
          e4.preventDefault();
        };
        c2(e3.target, "contextmenu", t4, { once: true }), c2(window, "pointerup", () => {
          setTimeout(() => {
            u2(e3.target, "contextmenu", t4);
          }, 30);
        }, { once: true });
      }
    }, onPressEnd(e3) {
      l2.current && clearTimeout(l2.current), !i3 || "mouse" !== e3.pointerType && "touch" !== e3.pointerType || i3({ ...e3, type: "longpressend" });
    } });
    return { longPressProps: C(d2, oa(o3 && !r2 ? a2 : void 0)) };
  }
  const la = /* @__PURE__ */ new WeakMap();
  function ca(t3, r2, n2) {
    let { type: i3 = "menu", isDisabled: o3, trigger: s2 = "press" } = t3, a2 = _(), { triggerProps: l2, overlayProps: c2 } = function(t4, r3, n3) {
      let i4, { type: o4 } = t4, { isOpen: s3 } = r3;
      (0, e2.useEffect)(() => {
        n3 && n3.current && la.set(n3.current, r3.close);
      }), "menu" === o4 ? i4 = true : "listbox" === o4 && (i4 = "listbox");
      let a3 = _();
      return { triggerProps: { "aria-haspopup": i4, "aria-expanded": s3, "aria-controls": s3 ? a3 : null, onPress: r3.toggle }, overlayProps: { id: a3 } };
    }({ type: i3 }, r2, n2), u2 = to((d2 = ra) && d2.__esModule ? d2.default : d2, "@react-aria/menu");
    var d2;
    let { longPressProps: p2 } = aa({ isDisabled: o3 || "longPress" !== s2, accessibilityDescription: u2.format("longPressMessage"), onLongPressStart() {
      r2.close();
    }, onLongPress() {
      r2.open("first");
    } }), f2 = { onPressStart(e3) {
      "touch" === e3.pointerType || "keyboard" === e3.pointerType || o3 || r2.open("virtual" === e3.pointerType ? "first" : null);
    }, onPress(e3) {
      "touch" !== e3.pointerType || o3 || r2.toggle();
    } };
    return delete l2.onPress, { menuTriggerProps: { ...l2, ..."press" === s2 ? f2 : p2, id: a2, onKeyDown: (e3) => {
      if (!o3 && ("longPress" !== s2 || e3.altKey) && n2 && n2.current) switch (e3.key) {
        case "Enter":
        case " ":
          if ("longPress" === s2) return;
        case "ArrowDown":
          "continuePropagation" in e3 || e3.stopPropagation(), e3.preventDefault(), r2.toggle("first");
          break;
        case "ArrowUp":
          "continuePropagation" in e3 || e3.stopPropagation(), e3.preventDefault(), r2.toggle("last");
          break;
        default:
          "continuePropagation" in e3 && e3.continuePropagation();
      }
    } }, menuProps: { ...c2, "aria-labelledby": a2, autoFocus: r2.focusStrategy || true, onClose: r2.close } };
  }
  const ua = /* @__PURE__ */ new WeakMap();
  function da(t3, r2, n2) {
    let i3 = (0, e2.useRef)(r2), o3 = l(() => {
      n2 && n2(i3.current);
    });
    (0, e2.useEffect)(() => {
      var e3;
      let r3 = null == t3 || null === (e3 = t3.current) || void 0 === e3 ? void 0 : e3.form;
      return null == r3 || r3.addEventListener("reset", o3), () => {
        null == r3 || r3.removeEventListener("reset", o3);
      };
    }, [t3, o3]);
  }
  function pa(t3, r2, n2) {
    let { validationBehavior: i3, focus: o3 } = t3;
    a(() => {
      if ("native" === i3 && (null == n2 ? void 0 : n2.current)) {
        let t4 = r2.realtimeValidation.isInvalid ? r2.realtimeValidation.validationErrors.join(" ") || "Invalid value." : "";
        n2.current.setCustomValidity(t4), n2.current.hasAttribute("title") || (n2.current.title = ""), r2.realtimeValidation.isInvalid || r2.updateValidation({ isInvalid: !(e3 = n2.current).validity.valid, validationDetails: fa(e3), validationErrors: e3.validationMessage ? [e3.validationMessage] : [] });
      }
      var e3;
    });
    let s2 = l(() => {
      r2.resetValidation();
    }), c2 = l((e3) => {
      var t4;
      r2.displayValidation.isInvalid || r2.commitValidation();
      let i4 = null == n2 || null === (t4 = n2.current) || void 0 === t4 ? void 0 : t4.form;
      var s3;
      !e3.defaultPrevented && n2 && i4 && function(e4) {
        for (let t5 = 0; t5 < e4.elements.length; t5++) {
          let r3 = e4.elements[t5];
          if (!r3.validity.valid) return r3;
        }
        return null;
      }(i4) === n2.current && (o3 ? o3() : null === (s3 = n2.current) || void 0 === s3 || s3.focus(), Ct("keyboard")), e3.preventDefault();
    }), u2 = l(() => {
      r2.commitValidation();
    });
    (0, e2.useEffect)(() => {
      let e3 = null == n2 ? void 0 : n2.current;
      if (!e3) return;
      let t4 = e3.form;
      return e3.addEventListener("invalid", c2), e3.addEventListener("change", u2), null == t4 || t4.addEventListener("reset", s2), () => {
        e3.removeEventListener("invalid", c2), e3.removeEventListener("change", u2), null == t4 || t4.removeEventListener("reset", s2);
      };
    }, [n2, c2, u2, s2, i3]);
  }
  function fa(e3) {
    let t3 = e3.validity;
    return { badInput: t3.badInput, customError: t3.customError, patternMismatch: t3.patternMismatch, rangeOverflow: t3.rangeOverflow, rangeUnderflow: t3.rangeUnderflow, stepMismatch: t3.stepMismatch, tooLong: t3.tooLong, tooShort: t3.tooShort, typeMismatch: t3.typeMismatch, valueMissing: t3.valueMissing, valid: t3.valid };
  }
  const ma = { border: 0, clip: "rect(0 0 0 0)", clipPath: "inset(50%)", height: "1px", margin: "-1px", overflow: "hidden", padding: 0, position: "absolute", width: "1px", whiteSpace: "nowrap" };
  function ha(t3 = {}) {
    let { style: r2, isFocusable: n2 } = t3, [i3, o3] = (0, e2.useState)(false), { focusWithinProps: s2 } = At({ isDisabled: !n2, onFocusWithinChange: (e3) => o3(e3) });
    return { visuallyHiddenProps: { ...s2, style: (0, e2.useMemo)(() => i3 ? r2 : r2 ? { ...ma, ...r2 } : ma, [i3]) } };
  }
  function ga(t3) {
    let { children: r2, elementType: n2 = "div", isFocusable: i3, style: o3, ...s2 } = t3, { visuallyHiddenProps: a2 } = ha(t3);
    return e2.createElement(n2, C(s2, a2), r2);
  }
  function ya(t3, r2, n2) {
    let i3 = ua.get(r2) || {}, { autoComplete: o3, name: s2 = i3.name, isDisabled: a2 = i3.isDisabled } = t3, { validationBehavior: l2, isRequired: c2 } = i3, u2 = function() {
      Tt();
      let [t4, r3] = (0, e2.useState)(ut);
      return (0, e2.useEffect)(() => {
        let e3 = () => {
          r3(ut);
        };
        return dt.add(e3), () => {
          dt.delete(e3);
        };
      }, []), v() ? null : t4;
    }(), { visuallyHiddenProps: d2 } = ha();
    var p2;
    return da(t3.selectRef, r2.selectedKey, r2.setSelectedKey), pa({ validationBehavior: l2, focus: () => n2.current.focus() }, r2, t3.selectRef), { containerProps: { ...d2, "aria-hidden": true, "data-react-aria-prevent-focus": true, "data-a11y-ignore": "aria-hidden-focus" }, inputProps: { type: "text", tabIndex: null == u2 || r2.isFocused || r2.isOpen ? -1 : 0, style: { fontSize: 16 }, onFocus: () => n2.current.focus(), disabled: a2 }, selectProps: { tabIndex: -1, autoComplete: o3, disabled: a2, required: "native" === l2 && c2, name: s2, value: null !== (p2 = r2.selectedKey) && void 0 !== p2 ? p2 : "", onChange: (e3) => r2.setSelectedKey(e3.target.value) } };
  }
  function va(t3) {
    let { state: r2, triggerRef: n2, label: i3, name: o3, isDisabled: s2 } = t3, a2 = (0, e2.useRef)(null), { containerProps: l2, inputProps: c2, selectProps: u2 } = ya({ ...t3, selectRef: a2 }, r2, n2);
    var d2;
    return r2.collection.size <= 300 ? e2.createElement("div", { ...l2, "data-testid": "hidden-select-container" }, e2.createElement("input", c2), e2.createElement("label", null, i3, e2.createElement("select", { ...u2, ref: a2 }, e2.createElement("option", null), [...r2.collection.getKeys()].map((t4) => {
      let n3 = r2.collection.getItem(t4);
      if ("item" === n3.type) return e2.createElement("option", { key: n3.key, value: n3.key }, n3.textValue);
    })))) : o3 ? e2.createElement("input", { type: "hidden", autoComplete: u2.autoComplete, name: o3, disabled: s2, value: null !== (d2 = r2.selectedKey) && void 0 !== d2 ? d2 : "" }) : null;
  }
  var ba;
  ba = { "ar-AE": { loading: "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644...", loadingMore: "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0632\u064A\u062F..." }, "bg-BG": { loading: "\u0417\u0430\u0440\u0435\u0436\u0434\u0430\u043D\u0435...", loadingMore: "\u0417\u0430\u0440\u0435\u0436\u0434\u0430\u043D\u0435 \u043D\u0430 \u043E\u0449\u0435..." }, "cs-CZ": { loading: "Na\u010D\xEDt\xE1n\xED...", loadingMore: "Na\u010D\xEDt\xE1n\xED dal\u0161\xEDch..." }, "da-DK": { loading: "Indl\xE6ser ...", loadingMore: "Indl\xE6ser flere ..." }, "de-DE": { loading: "Laden...", loadingMore: "Mehr laden ..." }, "el-GR": { loading: "\u03A6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7...", loadingMore: "\u03A6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7 \u03C0\u03B5\u03C1\u03B9\u03C3\u03C3\u03CC\u03C4\u03B5\u03C1\u03C9\u03BD..." }, "en-US": { loading: "Loading\u2026", loadingMore: "Loading more\u2026" }, "es-ES": { loading: "Cargando\u2026", loadingMore: "Cargando m\xE1s\u2026" }, "et-EE": { loading: "Laadimine...", loadingMore: "Laadi rohkem..." }, "fi-FI": { loading: "Ladataan\u2026", loadingMore: "Ladataan lis\xE4\xE4\u2026" }, "fr-FR": { loading: "Chargement...", loadingMore: "Chargement suppl\xE9mentaire..." }, "he-IL": { loading: "\u05D8\u05D5\u05E2\u05DF...", loadingMore: "\u05D8\u05D5\u05E2\u05DF \u05E2\u05D5\u05D3..." }, "hr-HR": { loading: "U\u010Ditavam...", loadingMore: "U\u010Ditavam jo\u0161..." }, "hu-HU": { loading: "Bet\xF6lt\xE9s folyamatban\u2026", loadingMore: "Tov\xE1bbiak bet\xF6lt\xE9se folyamatban\u2026" }, "it-IT": { loading: "Caricamento...", loadingMore: "Caricamento altri..." }, "ja-JP": { loading: "\u8AAD\u307F\u8FBC\u307F\u4E2D...", loadingMore: "\u3055\u3089\u306B\u8AAD\u307F\u8FBC\u307F\u4E2D..." }, "ko-KR": { loading: "\uB85C\uB4DC \uC911", loadingMore: "\uCD94\uAC00 \uB85C\uB4DC \uC911" }, "lt-LT": { loading: "\u012Ekeliama...", loadingMore: "\u012Ekeliama daugiau..." }, "lv-LV": { loading: "Notiek iel\u0101de...", loadingMore: "Tiek iel\u0101d\u0113ts v\u0113l..." }, "nb-NO": { loading: "Laster inn ...", loadingMore: "Laster inn flere ..." }, "nl-NL": { loading: "Laden...", loadingMore: "Meer laden..." }, "pl-PL": { loading: "\u0141adowanie...", loadingMore: "Wczytywanie wi\u0119kszej liczby..." }, "pt-BR": { loading: "Carregando...", loadingMore: "Carregando mais..." }, "pt-PT": { loading: "A carregar...", loadingMore: "A carregar mais..." }, "ro-RO": { loading: "Se \xEEncarc\u0103...", loadingMore: "Se \xEEncarc\u0103 mai multe..." }, "ru-RU": { loading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...", loadingMore: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." }, "sk-SK": { loading: "Na\u010D\xEDtava sa...", loadingMore: "Na\u010D\xEDtava sa viac..." }, "sl-SI": { loading: "Nalaganje...", loadingMore: "Nalaganje ve\u010D vsebine..." }, "sr-SP": { loading: "U\u010Ditavam...", loadingMore: "U\u010Ditavam jo\u0161..." }, "sv-SE": { loading: "L\xE4ser in...", loadingMore: "L\xE4ser in mer..." }, "tr-TR": { loading: "Y\xFCkleniyor...", loadingMore: "Daha fazla y\xFCkleniyor..." }, "uk-UA": { loading: "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F\u2026", loadingMore: "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0456\u043D\u0448\u0438\u0445 \u043E\u0431\u2019\u0454\u043A\u0442\u0456\u0432..." }, "zh-CN": { loading: "\u6B63\u5728\u52A0\u8F7D...", loadingMore: "\u6B63\u5728\u52A0\u8F7D\u66F4\u591A..." }, "zh-TW": { loading: "\u6B63\u5728\u8F09\u5165", loadingMore: "\u6B63\u5728\u8F09\u5165\u66F4\u591A\u2026" } };
  const Ea = e2.createContext(null);
  function _a(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(4494);
  var Ta, Sa, Pa, wa, Ca, xa, Oa, Ia, Ra, Aa, Ma, La, Na, Fa, ka, Da, Ua, ja, Ba, Ka, za, Wa, Va, Ha, Ga, qa, $a, Ya, Xa, Qa, Za, Ja, el, tl, rl, nl, il, ol, sl, al, ll, cl, ul, dl, pl, fl, ml, hl, gl, yl, vl, bl, El, _l, Tl, Sl = {};
  _a(Sl, "checkmark", () => Ta, (e3) => Ta = e3), _a(Sl, "chevron", () => Sa, (e3) => Sa = e3), _a(Sl, "description", () => Pa, (e3) => Pa = e3), _a(Sl, "end", () => wa, (e3) => wa = e3), _a(Sl, "focus-ring", () => Ca, (e3) => Ca = e3), _a(Sl, "i18nFontFamily", () => xa, (e3) => xa = e3), _a(Sl, "icon", () => Oa, (e3) => Oa = e3), _a(Sl, "is-active", () => Ia, (e3) => Ia = e3), _a(Sl, "is-disabled", () => Ra, (e3) => Ra = e3), _a(Sl, "is-expanded", () => Aa, (e3) => Aa = e3), _a(Sl, "is-focused", () => Ma, (e3) => Ma = e3), _a(Sl, "is-highlighted", () => La, (e3) => La = e3), _a(Sl, "is-hovered", () => Na, (e3) => Na = e3), _a(Sl, "is-open", () => Fa, (e3) => Fa = e3), _a(Sl, "is-selectable", () => ka, (e3) => ka = e3), _a(Sl, "is-selected", () => Da, (e3) => Da = e3), _a(Sl, "keyboard", () => Ua, (e3) => Ua = e3), _a(Sl, "slideInFromLeft", () => ja, (e3) => ja = e3), _a(Sl, "slideInFromRight", () => Ba, (e3) => Ba = e3), _a(Sl, "slideOutToLeft", () => Ka, (e3) => Ka = e3), _a(Sl, "slideOutToRight", () => za, (e3) => za = e3), _a(Sl, "spectrum-FocusRing-ring", () => Wa, (e3) => Wa = e3), _a(Sl, "spectrum-FocusRing", () => Va, (e3) => Va = e3), _a(Sl, "spectrum-FocusRing--quiet", () => Ha, (e3) => Ha = e3), _a(Sl, "spectrum-Icon", () => Ga, (e3) => Ga = e3), _a(Sl, "spectrum-Menu", () => qa, (e3) => qa = e3), _a(Sl, "spectrum-Menu-avatar", () => $a, (e3) => $a = e3), _a(Sl, "spectrum-Menu-checkmark", () => Ya, (e3) => Ya = e3), _a(Sl, "spectrum-Menu-chevron", () => Xa, (e3) => Xa = e3), _a(Sl, "spectrum-Menu-description", () => Qa, (e3) => Qa = e3), _a(Sl, "spectrum-Menu-divider", () => Za, (e3) => Za = e3), _a(Sl, "spectrum-Menu-end", () => Ja, (e3) => Ja = e3), _a(Sl, "spectrum-Menu-icon", () => el, (e3) => el = e3), _a(Sl, "spectrum-Menu-item", () => tl, (e3) => tl = e3), _a(Sl, "spectrum-Menu-itemGrid", () => rl, (e3) => rl = e3), _a(Sl, "spectrum-Menu-itemIcon", () => nl, (e3) => nl = e3), _a(Sl, "spectrum-Menu-itemLabel", () => il, (e3) => il = e3), _a(Sl, "spectrum-Menu-itemLabel--wrapping", () => ol, (e3) => ol = e3), _a(Sl, "spectrum-Menu-keyboard", () => sl, (e3) => sl = e3), _a(Sl, "spectrum-Menu-popover", () => al, (e3) => al = e3), _a(Sl, "spectrum-Menu-section--isFirst", () => ll, (e3) => ll = e3), _a(Sl, "spectrum-Menu-section--isLast", () => cl, (e3) => cl = e3), _a(Sl, "spectrum-Menu-section--noHeading", () => ul, (e3) => ul = e3), _a(Sl, "spectrum-Menu-sectionHeading", () => dl, (e3) => dl = e3), _a(Sl, "spectrum-Menu-subdialog", () => pl, (e3) => pl = e3), _a(Sl, "spectrum-Menu-wrapper", () => fl, (e3) => fl = e3), _a(Sl, "spectrum-Menu-wrapper--isMobile", () => ml, (e3) => ml = e3), _a(Sl, "spectrum-Submenu-heading", () => hl, (e3) => hl = e3), _a(Sl, "spectrum-Submenu-headingWrapper", () => gl, (e3) => gl = e3), _a(Sl, "spectrum-Submenu-popover", () => yl, (e3) => yl = e3), _a(Sl, "spectrum-Submenu-wrapper", () => vl, (e3) => vl = e3), _a(Sl, "spectrum-Submenu-wrapper--isMobile", () => bl, (e3) => bl = e3), _a(Sl, "spectrum-TraySubmenu-enter", () => El, (e3) => El = e3), _a(Sl, "spectrum-TraySubmenu-exit", () => _l, (e3) => _l = e3), _a(Sl, "text", () => Tl, (e3) => Tl = e3), Ta = "Q7FggG_checkmark", Sa = "Q7FggG_chevron", Pa = "Q7FggG_description", wa = "Q7FggG_end", Ca = "Q7FggG_focus-ring", xa = "Q7FggG_i18nFontFamily", Oa = "Q7FggG_icon", Ia = "Q7FggG_is-active", Ra = "Q7FggG_is-disabled", Aa = "Q7FggG_is-expanded", Ma = "Q7FggG_is-focused", La = "Q7FggG_is-highlighted", Na = "Q7FggG_is-hovered", Fa = "Q7FggG_is-open", ka = "Q7FggG_is-selectable", Da = "Q7FggG_is-selected", Ua = "Q7FggG_keyboard", ja = "Q7FggG_slideInFromLeft", Ba = "Q7FggG_slideInFromRight", Ka = "Q7FggG_slideOutToLeft", za = "Q7FggG_slideOutToRight", Va = "Q7FggG_spectrum-FocusRing " + (Wa = "Q7FggG_spectrum-FocusRing-ring"), Ha = "Q7FggG_spectrum-FocusRing--quiet", Ga = "Q7FggG_spectrum-Icon", qa = "Q7FggG_spectrum-Menu", $a = "Q7FggG_spectrum-Menu-avatar", Ya = "Q7FggG_spectrum-Menu-checkmark", Xa = "Q7FggG_spectrum-Menu-chevron", Qa = "Q7FggG_spectrum-Menu-description", Za = "Q7FggG_spectrum-Menu-divider", Ja = "Q7FggG_spectrum-Menu-end", el = "Q7FggG_spectrum-Menu-icon", tl = "Q7FggG_spectrum-Menu-item", rl = "Q7FggG_spectrum-Menu-itemGrid", nl = "Q7FggG_spectrum-Menu-itemIcon", il = "Q7FggG_spectrum-Menu-itemLabel", ol = "Q7FggG_spectrum-Menu-itemLabel--wrapping", sl = "Q7FggG_spectrum-Menu-keyboard", al = "Q7FggG_spectrum-Menu-popover", ll = "Q7FggG_spectrum-Menu-section--isFirst", cl = "Q7FggG_spectrum-Menu-section--isLast", ul = "Q7FggG_spectrum-Menu-section--noHeading", dl = "Q7FggG_spectrum-Menu-sectionHeading", pl = "Q7FggG_spectrum-Menu-subdialog", fl = "Q7FggG_spectrum-Menu-wrapper", ml = "Q7FggG_spectrum-Menu-wrapper--isMobile", hl = "Q7FggG_spectrum-Submenu-heading", gl = "Q7FggG_spectrum-Submenu-headingWrapper", yl = "Q7FggG_spectrum-Submenu-popover", vl = "Q7FggG_spectrum-Submenu-wrapper", bl = "Q7FggG_spectrum-Submenu-wrapper--isMobile", El = "Q7FggG_spectrum-TraySubmenu-enter", _l = "Q7FggG_spectrum-TraySubmenu-exit", Tl = "Q7FggG_text";
  var Pl = r(2367);
  function wl(t3) {
    return e2.createElement(Gn, t3, e2.createElement(Pl.p, null));
  }
  const Cl = { ...G, autoFlow: ["gridAutoFlow", ae], autoColumns: ["gridAutoColumns", Ol], autoRows: ["gridAutoRows", Ol], areas: ["gridTemplateAreas", function(e3) {
    return e3.map((e4) => `"${e4}"`).join("\n");
  }], columns: ["gridTemplateColumns", Il], rows: ["gridTemplateRows", Il], gap: ["gap", J], rowGap: ["rowGap", J], columnGap: ["columnGap", J], justifyItems: ["justifyItems", ae], justifyContent: ["justifyContent", ae], alignItems: ["alignItems", ae], alignContent: ["alignContent", ae] };
  function xl(t3, r2) {
    let { children: n2, ...i3 } = t3, { styleProps: o3 } = se(i3, Cl);
    o3.style.display = "grid";
    let s2 = de(r2);
    return e2.createElement("div", { ...ve(i3), ...o3, ref: s2 }, n2);
  }
  function Ol(e3) {
    return /^max-content|min-content|minmax|auto|fit-content|repeat|subgrid/.test(e3) ? e3 : J(e3);
  }
  function Il(e3) {
    return Array.isArray(e3) ? e3.map(Ol).join(" ") : Ol(e3);
  }
  const Rl = (0, e2.forwardRef)(xl);
  function Al(t3, r2) {
    t3 = O(t3, "text");
    let { children: n2, ...i3 } = t3, { styleProps: o3 } = se(i3), s2 = de(r2);
    return e2.createElement("span", { ...ve(i3), ...o3, ref: s2 }, n2);
  }
  const Ml = (0, e2.forwardRef)(Al), Ll = /* @__PURE__ */ new WeakMap();
  function Nl(e3, t3) {
    let r2 = Ll.get(e3);
    if (!r2) throw new Error("Unknown list");
    return `${r2.id}-option-${n2 = t3, "string" == typeof n2 ? n2.replace(/\s*/g, "") : "" + n2}`;
    var n2;
  }
  function Fl(e3, t3) {
    return "function" == typeof t3.getChildren ? t3.getChildren(e3.key) : e3.childNodes;
  }
  function kl(e3, t3, r2) {
    if (t3.parentKey === r2.parentKey) return t3.index - r2.index;
    let n2 = [...Dl(e3, t3), t3], i3 = [...Dl(e3, r2), r2], o3 = n2.slice(0, i3.length).findIndex((e4, t4) => e4 !== i3[t4]);
    return -1 !== o3 ? (t3 = n2[o3], r2 = i3[o3], t3.index - r2.index) : n2.findIndex((e4) => e4 === r2) >= 0 ? 1 : (i3.findIndex((e4) => e4 === t3), -1);
  }
  function Dl(e3, t3) {
    let r2 = [];
    for (; null != (null == t3 ? void 0 : t3.parentKey); ) t3 = e3.getItem(t3.parentKey), r2.unshift(t3);
    return r2;
  }
  const Ul = /* @__PURE__ */ new WeakMap();
  function jl(e3) {
    return nt() ? e3.altKey : e3.ctrlKey;
  }
  function Bl(e3) {
    return et() ? e3.metaKey : e3.ctrlKey;
  }
  function Kl(t3) {
    let { selectionManager: r2, key: n2, ref: i3, shouldSelectOnPressUp: o3, shouldUseVirtualFocus: s2, focus: a2, isDisabled: l2, onAction: c2, allowsDifferentPressOrigin: u2, linkBehavior: d2 = "action" } = t3, p2 = Rn(), f2 = (e3) => {
      if ("keyboard" === e3.pointerType && jl(e3)) r2.toggleSelection(n2);
      else {
        if ("none" === r2.selectionMode) return;
        if (r2.isLink(n2)) {
          if ("selection" === d2) {
            let t4 = r2.getItemProps(n2);
            return p2.open(i3.current, e3, t4.href, t4.routerOptions), void r2.setSelectedKeys(r2.selectedKeys);
          }
          if ("override" === d2 || "none" === d2) return;
        }
        "single" === r2.selectionMode ? r2.isSelected(n2) && !r2.disallowEmptySelection ? r2.toggleSelection(n2) : r2.replaceSelection(n2) : e3 && e3.shiftKey ? r2.extendSelection(n2) : "toggle" === r2.selectionBehavior || e3 && (Bl(e3) || "touch" === e3.pointerType || "virtual" === e3.pointerType) ? r2.toggleSelection(n2) : r2.replaceSelection(n2);
      }
    };
    (0, e2.useEffect)(() => {
      n2 === r2.focusedKey && r2.isFocused && !s2 && (a2 ? a2() : document.activeElement !== i3.current && us(i3.current));
    }, [i3, n2, r2.focusedKey, r2.childFocusStrategy, r2.isFocused, s2]), l2 = l2 || r2.isDisabled(n2);
    let m2 = {};
    s2 || l2 ? l2 && (m2.onMouseDown = (e3) => {
      e3.preventDefault();
    }) : m2 = { tabIndex: n2 === r2.focusedKey ? 0 : -1, onFocus(e3) {
      e3.target === i3.current && r2.setFocusedKey(n2);
    } };
    let h2 = r2.isLink(n2) && "override" === d2, g2 = r2.isLink(n2) && "selection" !== d2 && "none" !== d2, y2 = !l2 && r2.canSelectItem(n2) && !h2, v2 = (c2 || g2) && !l2, b2 = v2 && ("replace" === r2.selectionBehavior ? !y2 : !y2 || r2.isEmpty), E2 = v2 && y2 && "replace" === r2.selectionBehavior, _2 = b2 || E2, T2 = (0, e2.useRef)(null), S2 = _2 && y2, P2 = (0, e2.useRef)(false), w2 = (0, e2.useRef)(false), x2 = (e3) => {
      if (c2 && c2(), g2) {
        let t4 = r2.getItemProps(n2);
        p2.open(i3.current, e3, t4.href, t4.routerOptions);
      }
    }, O2 = {};
    o3 ? (O2.onPressStart = (e3) => {
      T2.current = e3.pointerType, P2.current = S2, "keyboard" !== e3.pointerType || _2 && !Wl() || f2(e3);
    }, u2 ? (O2.onPressUp = b2 ? null : (e3) => {
      "keyboard" !== e3.pointerType && y2 && f2(e3);
    }, O2.onPress = b2 ? x2 : null) : O2.onPress = (e3) => {
      if (b2 || E2 && "mouse" !== e3.pointerType) {
        if ("keyboard" === e3.pointerType && !zl()) return;
        x2(e3);
      } else "keyboard" !== e3.pointerType && y2 && f2(e3);
    }) : (O2.onPressStart = (e3) => {
      T2.current = e3.pointerType, P2.current = S2, w2.current = b2, y2 && ("mouse" === e3.pointerType && !b2 || "keyboard" === e3.pointerType && (!v2 || Wl())) && f2(e3);
    }, O2.onPress = (e3) => {
      ("touch" === e3.pointerType || "pen" === e3.pointerType || "virtual" === e3.pointerType || "keyboard" === e3.pointerType && _2 && zl() || "mouse" === e3.pointerType && w2.current) && (_2 ? x2(e3) : y2 && f2(e3));
    }), m2["data-key"] = n2, O2.preventFocusOnPress = s2;
    let { pressProps: I2, isPressed: R2 } = xs(O2), A2 = E2 ? (e3) => {
      "mouse" === T2.current && (e3.stopPropagation(), e3.preventDefault(), x2(e3));
    } : void 0, { longPressProps: M2 } = aa({ isDisabled: !S2, onLongPress(e3) {
      "touch" === e3.pointerType && (f2(e3), r2.setSelectionBehavior("toggle"));
    } }), L2 = r2.isLink(n2) ? (e3) => {
      Mn.isOpening || e3.preventDefault();
    } : void 0;
    return { itemProps: C(m2, y2 || b2 ? I2 : {}, S2 ? M2 : {}, { onDoubleClick: A2, onDragStartCapture: (e3) => {
      "touch" === T2.current && P2.current && e3.preventDefault();
    }, onClick: L2 }), isPressed: R2, isSelected: r2.isSelected(n2), isFocused: r2.isFocused && r2.focusedKey === n2, isDisabled: l2, allowsSelection: y2, hasAction: _2 };
  }
  function zl() {
    let e3 = window.event;
    return "Enter" === (null == e3 ? void 0 : e3.key);
  }
  function Wl() {
    let e3 = window.event;
    return " " === (null == e3 ? void 0 : e3.key) || "Space" === (null == e3 ? void 0 : e3.code);
  }
  function Vl(e3, t3, r2) {
    var n2, i3;
    let { key: o3 } = e3, a2 = Ll.get(t3);
    var l2;
    let c2 = null !== (l2 = e3.isDisabled) && void 0 !== l2 ? l2 : t3.selectionManager.isDisabled(o3);
    var u2;
    let d2 = null !== (u2 = e3.isSelected) && void 0 !== u2 ? u2 : t3.selectionManager.isSelected(o3);
    var p2;
    let f2 = null !== (p2 = e3.shouldSelectOnPressUp) && void 0 !== p2 ? p2 : null == a2 ? void 0 : a2.shouldSelectOnPressUp;
    var m2;
    let h2 = null !== (m2 = e3.shouldFocusOnHover) && void 0 !== m2 ? m2 : null == a2 ? void 0 : a2.shouldFocusOnHover;
    var g2;
    let y2 = null !== (g2 = e3.shouldUseVirtualFocus) && void 0 !== g2 ? g2 : null == a2 ? void 0 : a2.shouldUseVirtualFocus;
    var v2;
    let b2 = null !== (v2 = e3.isVirtualized) && void 0 !== v2 ? v2 : null == a2 ? void 0 : a2.isVirtualized, E2 = S(), _2 = S(), T2 = { role: "option", "aria-disabled": c2 || void 0, "aria-selected": "none" !== t3.selectionManager.selectionMode ? d2 : void 0 };
    et() && it() || (T2["aria-label"] = e3["aria-label"], T2["aria-labelledby"] = E2, T2["aria-describedby"] = _2);
    let P2 = t3.collection.getItem(o3);
    if (b2) {
      let e4 = Number(null == P2 ? void 0 : P2.index);
      T2["aria-posinset"] = Number.isNaN(e4) ? void 0 : e4 + 1, T2["aria-setsize"] = function(e5) {
        let t4 = Ul.get(e5);
        if (null != t4) return t4;
        t4 = 0;
        let r3 = (n3) => {
          for (let i4 of n3) "section" === i4.type ? r3(Fl(i4, e5)) : t4++;
        };
        return r3(e5), Ul.set(e5, t4), t4;
      }(t3.collection);
    }
    let w2 = (null == a2 ? void 0 : a2.onAction) ? () => {
      var e4;
      return null == a2 || null === (e4 = a2.onAction) || void 0 === e4 ? void 0 : e4.call(a2, o3);
    } : void 0, { itemProps: x2, isPressed: O2, isFocused: I2, hasAction: R2, allowsSelection: A2 } = Kl({ selectionManager: t3.selectionManager, key: o3, ref: r2, shouldSelectOnPressUp: f2, allowsDifferentPressOrigin: f2 && h2, isVirtualized: b2, shouldUseVirtualFocus: y2, isDisabled: c2, onAction: w2 || (null == P2 || null === (n2 = P2.props) || void 0 === n2 ? void 0 : n2.onAction) ? s(null == P2 || null === (i3 = P2.props) || void 0 === i3 ? void 0 : i3.onAction, w2) : void 0, linkBehavior: null == a2 ? void 0 : a2.linkBehavior }), { hoverProps: M2 } = Ws({ isDisabled: c2 || !h2, onHoverStart() {
      Pt() || (t3.selectionManager.setFocused(true), t3.selectionManager.setFocusedKey(o3));
    } }), L2 = ve(null == P2 ? void 0 : P2.props);
    delete L2.id;
    let N2 = Nn(null == P2 ? void 0 : P2.props);
    return { optionProps: { ...T2, ...C(L2, x2, M2, N2), id: Nl(t3, o3) }, labelProps: { id: E2 }, descriptionProps: { id: _2 }, isFocused: I2, isFocusVisible: I2 && Pt(), isSelected: d2, isDisabled: c2, isPressed: O2, allowsSelection: A2, hasAction: R2 };
  }
  function Hl(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function Gl(t3) {
    let { item: r2, shouldSelectOnPressUp: n2, shouldFocusOnHover: i3, shouldUseVirtualFocus: o3 } = t3, { rendered: s2, key: a2 } = r2, l2 = r2.props.href ? "a" : "div", c2 = (0, e2.useContext)(Ea), u2 = (0, e2.useRef)(), { optionProps: d2, labelProps: p2, descriptionProps: f2, isSelected: m2, isDisabled: h2, isFocused: g2 } = Vl({ "aria-label": r2["aria-label"], key: a2, shouldSelectOnPressUp: n2, shouldFocusOnHover: i3, isVirtualized: true, shouldUseVirtualFocus: o3 }, c2, u2), { hoverProps: y2, isHovered: v2 } = Ws({ ...t3, isDisabled: h2 }), b2 = "string" == typeof s2 ? e2.createElement(Ml, null, s2) : s2, E2 = Pt();
    return e2.createElement(Lt, { focusRingClass: Xe(Hl(Sl), "focus-ring") }, e2.createElement(l2, { ...C(d2, i3 ? {} : y2), ref: u2, className: Xe(Hl(Sl), "spectrum-Menu-item", { "is-focused": o3 && g2 && E2, "is-disabled": h2, "is-selected": m2, "is-selectable": "none" !== c2.selectionManager.selectionMode, "is-hovered": v2 && !i3 || g2 && !E2 }) }, e2.createElement(Rl, { UNSAFE_className: Xe(Hl(Sl), "spectrum-Menu-itemGrid") }, e2.createElement(R, null, e2.createElement(I, { slots: { text: { UNSAFE_className: Hl(Sl)["spectrum-Menu-itemLabel"], ...p2 }, icon: { size: "S", UNSAFE_className: Hl(Sl)["spectrum-Menu-icon"] }, avatar: { size: "avatar-size-100", UNSAFE_className: Hl(Sl)["spectrum-Menu-avatar"] }, description: { UNSAFE_className: Hl(Sl)["spectrum-Menu-description"], ...f2 } } }, b2, m2 && e2.createElement(wl, { slot: "checkmark", UNSAFE_className: Xe(Hl(Sl), "spectrum-Menu-checkmark") }))))));
  }
  class ql {
    copy() {
      return new ql(this.width, this.height);
    }
    equals(e3) {
      return this.width === e3.width && this.height === e3.height;
    }
    get area() {
      return this.width * this.height;
    }
    constructor(e3 = 0, t3 = 0) {
      this.width = e3, this.height = t3;
    }
  }
  function $l(t3) {
    let { layoutInfo: r2, virtualizer: n2, ref: i3 } = t3, o3 = (0, e2.useCallback)(() => {
      let e3 = function(e4) {
        let t4 = e4.style.height;
        e4.style.height = "";
        let r3 = new ql(e4.scrollWidth, e4.scrollHeight);
        return e4.style.height = t4, r3;
      }(i3.current);
      n2.updateItemSize(r2.key, e3);
    }, [n2, r2.key, i3]);
    return a(() => {
      r2.estimatedSize && o3();
    }), { updateSize: o3 };
  }
  function Yl(t3) {
    let { className: r2, layoutInfo: n2, virtualizer: i3, parent: o3, children: s2 } = t3, { direction: a2 } = H(), l2 = (0, e2.useRef)();
    return $l({ layoutInfo: n2, virtualizer: i3, ref: l2 }), e2.createElement("div", { role: "presentation", ref: l2, className: r2, style: Ql(n2, a2, o3) }, s2);
  }
  let Xl = /* @__PURE__ */ new WeakMap();
  function Ql(e3, t3, r2) {
    let n2 = "rtl" === t3 ? "right" : "left", i3 = Xl.get(e3);
    if (i3 && null != i3[n2]) {
      if (!r2) return i3;
      let t4 = e3.rect.y - r2.rect.y, o4 = e3.rect.x - r2.rect.x;
      if (i3.top === t4 && i3[n2] === o4) return i3;
    }
    let o3 = { top: e3.rect.y - (r2 ? r2.rect.y : 0), [n2]: e3.rect.x - (r2 ? r2.rect.x : 0), width: e3.rect.width, height: e3.rect.height };
    Object.entries(o3).forEach(([e4, t4]) => {
      Number.isFinite(t4) || (o3[e4] = void 0);
    });
    let s2 = { position: e3.isSticky ? "sticky" : "absolute", display: e3.isSticky ? "inline-block" : void 0, overflow: e3.allowOverflow ? "visible" : "hidden", transition: "all", WebkitTransition: "all", WebkitTransitionDuration: "inherit", transitionDuration: "inherit", opacity: e3.opacity, zIndex: e3.zIndex, transform: e3.transform, contain: "size layout style", ...o3 };
    return Xl.set(e3, s2), s2;
  }
  function Zl(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function Jl(t3) {
    let { children: r2, layoutInfo: n2, headerLayoutInfo: i3, virtualizer: o3, item: s2 } = t3, { headingProps: a2, groupProps: l2 } = function(e3) {
      let { heading: t4, "aria-label": r3 } = e3, n3 = _();
      return { itemProps: { role: "presentation" }, headingProps: t4 ? { id: n3, role: "presentation" } : {}, groupProps: { role: "group", "aria-label": r3, "aria-labelledby": t4 ? n3 : void 0 } };
    }({ heading: s2.rendered, "aria-label": s2["aria-label"] }), c2 = (0, e2.useRef)();
    $l({ layoutInfo: i3, virtualizer: o3, ref: c2 });
    let { direction: u2 } = H(), d2 = (0, e2.useContext)(Ea);
    return e2.createElement(e2.Fragment, null, e2.createElement("div", { role: "presentation", ref: c2, style: Ql(i3, u2) }, s2.key !== d2.collection.getFirstKey() && e2.createElement("div", { role: "presentation", className: Xe(Zl(Sl), "spectrum-Menu-divider") }), s2.rendered && e2.createElement("div", { ...a2, className: Xe(Zl(Sl), "spectrum-Menu-sectionHeading") }, s2.rendered)), e2.createElement("div", { ...l2, style: Ql(n2, u2), className: Xe(Zl(Sl), "spectrum-Menu") }, r2));
  }
  function ec(e3, t3) {
    return "#comment" !== e3.nodeName && function(e4) {
      const t4 = ct(e4);
      if (!(e4 instanceof t4.HTMLElement || e4 instanceof t4.SVGElement)) return false;
      let { display: r2, visibility: n2 } = e4.style, i3 = "none" !== r2 && "hidden" !== n2 && "collapse" !== n2;
      if (i3) {
        const { getComputedStyle: t5 } = e4.ownerDocument.defaultView;
        let { display: r3, visibility: n3 } = t5(e4);
        i3 = "none" !== r3 && "hidden" !== n3 && "collapse" !== n3;
      }
      return i3;
    }(e3) && function(e4, t4) {
      return !e4.hasAttribute("hidden") && !e4.hasAttribute("data-react-aria-prevent-focus") && ("DETAILS" !== e4.nodeName || !t4 || "SUMMARY" === t4.nodeName || e4.hasAttribute("open"));
    }(e3, t3) && (!e3.parentElement || ec(e3.parentElement, e3));
  }
  const tc = e2.createContext(null);
  let rc = null;
  function nc(t3) {
    let { children: r2, contain: n2, restoreFocus: i3, autoFocus: o3 } = t3, s2 = (0, e2.useRef)(null), l2 = (0, e2.useRef)(null), c2 = (0, e2.useRef)([]), { parentNode: u2 } = (0, e2.useContext)(tc) || {}, d2 = (0, e2.useMemo)(() => new yc({ scopeRef: c2 }), [c2]);
    a(() => {
      let e3 = u2 || vc.root;
      if (vc.getTreeNode(e3.scopeRef) && rc && !pc(rc, e3.scopeRef)) {
        let t4 = vc.getTreeNode(rc);
        t4 && (e3 = t4);
      }
      e3.addChild(d2), vc.addNode(d2);
    }, [d2, u2]), a(() => {
      let e3 = vc.getTreeNode(c2);
      e3 && (e3.contain = !!n2);
    }, [n2]), a(() => {
      var e3;
      let t4 = null === (e3 = s2.current) || void 0 === e3 ? void 0 : e3.nextSibling, r3 = [];
      for (; t4 && t4 !== l2.current; ) r3.push(t4), t4 = t4.nextSibling;
      c2.current = r3;
    }, [r2]), function(e3, t4, r3) {
      a(() => {
        if (t4 || r3) return;
        let n3 = e3.current;
        const i4 = lt(n3 ? n3[0] : void 0);
        let o4 = (t5) => {
          let r4 = t5.target;
          uc(r4, e3.current) ? rc = e3 : cc(r4) || (rc = null);
        };
        return i4.addEventListener("focusin", o4, false), null == n3 || n3.forEach((e4) => e4.addEventListener("focusin", o4, false)), () => {
          i4.removeEventListener("focusin", o4, false), null == n3 || n3.forEach((e4) => e4.removeEventListener("focusin", o4, false));
        };
      }, [e3, t4, r3]);
    }(c2, i3, n2), function(t4, r3) {
      let n3 = (0, e2.useRef)(), i4 = (0, e2.useRef)();
      a(() => {
        let e3 = t4.current;
        if (!r3) return void (i4.current && (cancelAnimationFrame(i4.current), i4.current = void 0));
        const o4 = lt(e3 ? e3[0] : void 0);
        let s3 = (e4) => {
          if ("Tab" !== e4.key || e4.altKey || e4.ctrlKey || e4.metaKey || !lc(t4) || e4.isComposing) return;
          let r4 = o4.activeElement, n4 = t4.current;
          if (!n4 || !uc(r4, n4)) return;
          let i5 = hc(ac(n4), { tabbable: true }, n4);
          if (!r4) return;
          i5.currentNode = r4;
          let s4 = e4.shiftKey ? i5.previousNode() : i5.nextNode();
          s4 || (i5.currentNode = e4.shiftKey ? n4[n4.length - 1].nextElementSibling : n4[0].previousElementSibling, s4 = e4.shiftKey ? i5.previousNode() : i5.nextNode()), e4.preventDefault(), s4 && fc(s4, true);
        }, a2 = (e4) => {
          rc && !pc(rc, t4) || !uc(e4.target, t4.current) ? lc(t4) && !dc(e4.target, t4) ? n3.current ? n3.current.focus() : rc && rc.current && mc(rc.current) : lc(t4) && (n3.current = e4.target) : (rc = t4, n3.current = e4.target);
        }, l3 = (e4) => {
          i4.current && cancelAnimationFrame(i4.current), i4.current = requestAnimationFrame(() => {
            var r4;
            o4.activeElement && lc(t4) && !dc(o4.activeElement, t4) && (rc = t4, o4.body.contains(e4.target) ? (n3.current = e4.target, null === (r4 = n3.current) || void 0 === r4 || r4.focus()) : rc.current && mc(rc.current));
          });
        };
        return o4.addEventListener("keydown", s3, false), o4.addEventListener("focusin", a2, false), null == e3 || e3.forEach((e4) => e4.addEventListener("focusin", a2, false)), null == e3 || e3.forEach((e4) => e4.addEventListener("focusout", l3, false)), () => {
          o4.removeEventListener("keydown", s3, false), o4.removeEventListener("focusin", a2, false), null == e3 || e3.forEach((e4) => e4.removeEventListener("focusin", a2, false)), null == e3 || e3.forEach((e4) => e4.removeEventListener("focusout", l3, false));
        };
      }, [t4, r3]), a(() => () => {
        i4.current && cancelAnimationFrame(i4.current);
      }, [i4]);
    }(c2, n2), function(t4, r3, n3) {
      const i4 = (0, e2.useRef)("undefined" != typeof document ? lt(t4.current ? t4.current[0] : void 0).activeElement : null);
      a(() => {
        let e3 = t4.current;
        const i5 = lt(e3 ? e3[0] : void 0);
        if (!r3 || n3) return;
        let o4 = () => {
          rc && !pc(rc, t4) || !uc(i5.activeElement, t4.current) || (rc = t4);
        };
        return i5.addEventListener("focusin", o4, false), null == e3 || e3.forEach((e4) => e4.addEventListener("focusin", o4, false)), () => {
          i5.removeEventListener("focusin", o4, false), null == e3 || e3.forEach((e4) => e4.removeEventListener("focusin", o4, false));
        };
      }, [t4, n3]), a(() => {
        const e3 = lt(t4.current ? t4.current[0] : void 0);
        if (!r3) return;
        let i5 = (r4) => {
          if ("Tab" !== r4.key || r4.altKey || r4.ctrlKey || r4.metaKey || !lc(t4) || r4.isComposing) return;
          let n4 = e3.activeElement;
          if (!uc(n4, t4.current)) return;
          let i6 = vc.getTreeNode(t4);
          if (!i6) return;
          let o4 = i6.nodeToRestore, s3 = hc(e3.body, { tabbable: true });
          s3.currentNode = n4;
          let a2 = r4.shiftKey ? s3.previousNode() : s3.nextNode();
          if (o4 && e3.body.contains(o4) && o4 !== e3.body || (o4 = void 0, i6.nodeToRestore = void 0), (!a2 || !uc(a2, t4.current)) && o4) {
            s3.currentNode = o4;
            do {
              a2 = r4.shiftKey ? s3.previousNode() : s3.nextNode();
            } while (uc(a2, t4.current));
            r4.preventDefault(), r4.stopPropagation(), a2 ? fc(a2, true) : cc(o4) ? fc(o4, true) : n4.blur();
          }
        };
        return n3 || e3.addEventListener("keydown", i5, true), () => {
          n3 || e3.removeEventListener("keydown", i5, true);
        };
      }, [t4, r3, n3]), a(() => {
        const e3 = lt(t4.current ? t4.current[0] : void 0);
        if (!r3) return;
        let n4 = vc.getTreeNode(t4);
        var o4;
        return n4 ? (n4.nodeToRestore = null !== (o4 = i4.current) && void 0 !== o4 ? o4 : void 0, () => {
          let n5 = vc.getTreeNode(t4);
          if (!n5) return;
          let i5 = n5.nodeToRestore;
          if (r3 && i5 && (uc(e3.activeElement, t4.current) || e3.activeElement === e3.body && function(e4) {
            let t5 = vc.getTreeNode(rc);
            for (; t5 && t5.scopeRef !== e4; ) {
              if (t5.nodeToRestore) return false;
              t5 = t5.parent;
            }
            return (null == t5 ? void 0 : t5.scopeRef) === e4;
          }(t4))) {
            let r4 = vc.clone();
            requestAnimationFrame(() => {
              if (e3.activeElement === e3.body) {
                let e4 = r4.getTreeNode(t4);
                for (; e4; ) {
                  if (e4.nodeToRestore && e4.nodeToRestore.isConnected) return void fc(e4.nodeToRestore);
                  e4 = e4.parent;
                }
                for (e4 = r4.getTreeNode(t4); e4; ) {
                  if (e4.scopeRef && e4.scopeRef.current && vc.getTreeNode(e4.scopeRef)) return void mc(e4.scopeRef.current, true);
                  e4 = e4.parent;
                }
              }
            });
          }
        }) : void 0;
      }, [t4, r3]);
    }(c2, i3, n2), function(t4, r3) {
      const n3 = e2.useRef(r3);
      (0, e2.useEffect)(() => {
        n3.current && (rc = t4, !uc(lt(t4.current ? t4.current[0] : void 0).activeElement, rc.current) && t4.current && mc(t4.current)), n3.current = false;
      }, [t4]);
    }(c2, o3), (0, e2.useEffect)(() => {
      const e3 = lt(c2.current ? c2.current[0] : void 0).activeElement;
      let t4 = null;
      if (uc(e3, c2.current)) {
        for (let r3 of vc.traverse()) r3.scopeRef && uc(e3, r3.scopeRef.current) && (t4 = r3);
        t4 === vc.getTreeNode(c2) && (rc = t4.scopeRef);
      }
    }, [c2]), a(() => () => {
      var e3, t4, r3;
      let n3 = null !== (r3 = null === (t4 = vc.getTreeNode(c2)) || void 0 === t4 || null === (e3 = t4.parent) || void 0 === e3 ? void 0 : e3.scopeRef) && void 0 !== r3 ? r3 : null;
      c2 !== rc && !pc(c2, rc) || n3 && !vc.getTreeNode(n3) || (rc = n3), vc.removeTreeNode(c2);
    }, [c2]);
    let p2 = (0, e2.useMemo)(() => /* @__PURE__ */ function(e3) {
      return { focusNext(t4 = {}) {
        let r3 = e3.current, { from: n3, tabbable: i4, wrap: o4, accept: s3 } = t4, a2 = n3 || lt(r3[0]).activeElement, l3 = r3[0].previousElementSibling, c3 = hc(ac(r3), { tabbable: i4, accept: s3 }, r3);
        c3.currentNode = uc(a2, r3) ? a2 : l3;
        let u3 = c3.nextNode();
        return !u3 && o4 && (c3.currentNode = l3, u3 = c3.nextNode()), u3 && fc(u3, true), u3;
      }, focusPrevious(t4 = {}) {
        let r3 = e3.current, { from: n3, tabbable: i4, wrap: o4, accept: s3 } = t4, a2 = n3 || lt(r3[0]).activeElement, l3 = r3[r3.length - 1].nextElementSibling, c3 = hc(ac(r3), { tabbable: i4, accept: s3 }, r3);
        c3.currentNode = uc(a2, r3) ? a2 : l3;
        let u3 = c3.previousNode();
        return !u3 && o4 && (c3.currentNode = l3, u3 = c3.previousNode()), u3 && fc(u3, true), u3;
      }, focusFirst(t4 = {}) {
        let r3 = e3.current, { tabbable: n3, accept: i4 } = t4, o4 = hc(ac(r3), { tabbable: n3, accept: i4 }, r3);
        o4.currentNode = r3[0].previousElementSibling;
        let s3 = o4.nextNode();
        return s3 && fc(s3, true), s3;
      }, focusLast(t4 = {}) {
        let r3 = e3.current, { tabbable: n3, accept: i4 } = t4, o4 = hc(ac(r3), { tabbable: n3, accept: i4 }, r3);
        o4.currentNode = r3[r3.length - 1].nextElementSibling;
        let s3 = o4.previousNode();
        return s3 && fc(s3, true), s3;
      } };
    }(c2), []), f2 = (0, e2.useMemo)(() => ({ focusManager: p2, parentNode: d2 }), [d2, p2]);
    return e2.createElement(tc.Provider, { value: f2 }, e2.createElement("span", { "data-focus-scope-start": true, hidden: true, ref: s2 }), r2, e2.createElement("span", { "data-focus-scope-end": true, hidden: true, ref: l2 }));
  }
  const ic = ["input:not([disabled]):not([type=hidden])", "select:not([disabled])", "textarea:not([disabled])", "button:not([disabled])", "a[href]", "area[href]", "summary", "iframe", "object", "embed", "audio[controls]", "video[controls]", "[contenteditable]"], oc = ic.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
  ic.push('[tabindex]:not([tabindex="-1"]):not([disabled])');
  const sc = ic.join(':not([hidden]):not([tabindex="-1"]),');
  function ac(e3) {
    return e3[0].parentElement;
  }
  function lc(e3) {
    let t3 = vc.getTreeNode(rc);
    for (; t3 && t3.scopeRef !== e3; ) {
      if (t3.contain) return false;
      t3 = t3.parent;
    }
    return true;
  }
  function cc(e3) {
    return dc(e3);
  }
  function uc(e3, t3) {
    return !!e3 && !!t3 && t3.some((t4) => t4.contains(e3));
  }
  function dc(e3, t3 = null) {
    if (e3 instanceof Element && e3.closest("[data-react-aria-top-layer]")) return true;
    for (let { scopeRef: r2 } of vc.traverse(vc.getTreeNode(t3))) if (r2 && uc(e3, r2.current)) return true;
    return false;
  }
  function pc(e3, t3) {
    var r2;
    let n2 = null === (r2 = vc.getTreeNode(t3)) || void 0 === r2 ? void 0 : r2.parent;
    for (; n2; ) {
      if (n2.scopeRef === e3) return true;
      n2 = n2.parent;
    }
    return false;
  }
  function fc(e3, t3 = false) {
    if (null == e3 || t3) {
      if (null != e3) try {
        e3.focus();
      } catch (e4) {
      }
    } else try {
      us(e3);
    } catch (e4) {
    }
  }
  function mc(e3, t3 = true) {
    let r2 = e3[0].previousElementSibling, n2 = ac(e3), i3 = hc(n2, { tabbable: t3 }, e3);
    i3.currentNode = r2;
    let o3 = i3.nextNode();
    t3 && !o3 && (n2 = ac(e3), i3 = hc(n2, { tabbable: false }, e3), i3.currentNode = r2, o3 = i3.nextNode()), fc(o3);
  }
  function hc(e3, t3, r2) {
    let n2 = (null == t3 ? void 0 : t3.tabbable) ? sc : oc, i3 = lt(e3).createTreeWalker(e3, NodeFilter.SHOW_ELEMENT, { acceptNode(e4) {
      var i4;
      return (null == t3 || null === (i4 = t3.from) || void 0 === i4 ? void 0 : i4.contains(e4)) ? NodeFilter.FILTER_REJECT : !e4.matches(n2) || !ec(e4) || r2 && !uc(e4, r2) || (null == t3 ? void 0 : t3.accept) && !t3.accept(e4) ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
    } });
    return (null == t3 ? void 0 : t3.from) && (i3.currentNode = t3.from), i3;
  }
  class gc {
    get size() {
      return this.fastMap.size;
    }
    getTreeNode(e3) {
      return this.fastMap.get(e3);
    }
    addTreeNode(e3, t3, r2) {
      let n2 = this.fastMap.get(null != t3 ? t3 : null);
      if (!n2) return;
      let i3 = new yc({ scopeRef: e3 });
      n2.addChild(i3), i3.parent = n2, this.fastMap.set(e3, i3), r2 && (i3.nodeToRestore = r2);
    }
    addNode(e3) {
      this.fastMap.set(e3.scopeRef, e3);
    }
    removeTreeNode(e3) {
      if (null === e3) return;
      let t3 = this.fastMap.get(e3);
      if (!t3) return;
      let r2 = t3.parent;
      for (let e4 of this.traverse()) e4 !== t3 && t3.nodeToRestore && e4.nodeToRestore && t3.scopeRef && t3.scopeRef.current && uc(e4.nodeToRestore, t3.scopeRef.current) && (e4.nodeToRestore = t3.nodeToRestore);
      let n2 = t3.children;
      r2 && (r2.removeChild(t3), n2.size > 0 && n2.forEach((e4) => r2 && r2.addChild(e4))), this.fastMap.delete(t3.scopeRef);
    }
    *traverse(e3 = this.root) {
      if (null != e3.scopeRef && (yield e3), e3.children.size > 0) for (let t3 of e3.children) yield* this.traverse(t3);
    }
    clone() {
      var e3;
      let t3 = new gc();
      var r2;
      for (let n2 of this.traverse()) t3.addTreeNode(n2.scopeRef, null !== (r2 = null === (e3 = n2.parent) || void 0 === e3 ? void 0 : e3.scopeRef) && void 0 !== r2 ? r2 : null, n2.nodeToRestore);
      return t3;
    }
    constructor() {
      this.fastMap = /* @__PURE__ */ new Map(), this.root = new yc({ scopeRef: null }), this.fastMap.set(null, this.root);
    }
  }
  class yc {
    addChild(e3) {
      this.children.add(e3), e3.parent = this;
    }
    removeChild(e3) {
      this.children.delete(e3), e3.parent = void 0;
    }
    constructor(e3) {
      this.children = /* @__PURE__ */ new Set(), this.contain = false, this.scopeRef = e3.scopeRef;
    }
  }
  let vc = new gc();
  function bc(e3, t3) {
    let r2 = Ec(e3, t3, "left"), n2 = Ec(e3, t3, "top"), i3 = t3.offsetWidth, o3 = t3.offsetHeight, s2 = e3.scrollLeft, a2 = e3.scrollTop, { borderTopWidth: l2, borderLeftWidth: c2 } = getComputedStyle(e3), u2 = e3.scrollLeft + parseInt(c2, 10), d2 = e3.scrollTop + parseInt(l2, 10), p2 = u2 + e3.clientWidth, f2 = d2 + e3.clientHeight;
    r2 <= s2 ? s2 = r2 - parseInt(c2, 10) : r2 + i3 > p2 && (s2 += r2 + i3 - p2), n2 <= d2 ? a2 = n2 - parseInt(l2, 10) : n2 + o3 > f2 && (a2 += n2 + o3 - f2), e3.scrollLeft = s2, e3.scrollTop = a2;
  }
  function Ec(e3, t3, r2) {
    const n2 = "left" === r2 ? "offsetLeft" : "offsetTop";
    let i3 = 0;
    for (; t3.offsetParent && (i3 += t3[n2], t3.offsetParent !== e3); ) {
      if (t3.offsetParent.contains(e3)) {
        i3 -= e3[n2];
        break;
      }
      t3 = t3.offsetParent;
    }
    return i3;
  }
  function _c(e3, t3) {
    if (document.contains(e3)) {
      let s2 = document.scrollingElement || document.documentElement;
      if ("hidden" === window.getComputedStyle(s2).overflow) {
        let t4 = function(e4, t5) {
          const r3 = [];
          for (; e4 && e4 !== document.documentElement; ) qs(e4, t5) && r3.push(e4), e4 = e4.parentElement;
          return r3;
        }(e3);
        for (let r3 of t4) bc(r3, e3);
      } else {
        var r2;
        let { left: s3, top: a2 } = e3.getBoundingClientRect();
        null == e3 || null === (r2 = e3.scrollIntoView) || void 0 === r2 || r2.call(e3, { block: "nearest" });
        let { left: l2, top: c2 } = e3.getBoundingClientRect();
        var n2, i3, o3;
        (Math.abs(s3 - l2) > 1 || Math.abs(a2 - c2) > 1) && (null == t3 || null === (i3 = t3.containingElement) || void 0 === i3 || null === (n2 = i3.scrollIntoView) || void 0 === n2 || n2.call(i3, { block: "center", inline: "center" }), null === (o3 = e3.scrollIntoView) || void 0 === o3 || o3.call(e3, { block: "nearest" }));
      }
    }
  }
  function Tc(t3) {
    let { selectionManager: r2, keyboardDelegate: n2, ref: i3, autoFocus: o3 = false, shouldFocusWrap: s2 = false, disallowEmptySelection: a2 = false, disallowSelectAll: c2 = false, selectOnFocus: u2 = "replace" === r2.selectionBehavior, disallowTypeAhead: d2 = false, shouldUseVirtualFocus: p2, allowsTabNavigation: f2 = false, isVirtualized: m2, scrollRef: h2 = i3, linkBehavior: g2 = "action" } = t3, { direction: y2 } = H(), v2 = Rn(), b2 = (0, e2.useRef)({ top: 0, left: 0 });
    !function(t4, r3, n3, i4) {
      let o4 = l(n3), s3 = null == n3;
      (0, e2.useEffect)(() => {
        if (s3 || !t4.current) return;
        let e3 = t4.current;
        return e3.addEventListener(r3, o4, i4), () => {
          e3.removeEventListener(r3, o4, i4);
        };
      }, [t4, r3, i4, s3, o4]);
    }(h2, "scroll", m2 ? null : () => {
      b2.current = { top: h2.current.scrollTop, left: h2.current.scrollLeft };
    });
    const E2 = (0, e2.useRef)(o3);
    (0, e2.useEffect)(() => {
      if (E2.current) {
        let e3 = null;
        "first" === o3 && (e3 = n2.getFirstKey()), "last" === o3 && (e3 = n2.getLastKey());
        let t4 = r2.selectedKeys;
        if (t4.size) {
          for (let n3 of t4) if (r2.canSelectItem(n3)) {
            e3 = n3;
            break;
          }
        }
        r2.setFocused(true), r2.setFocusedKey(e3), null != e3 || p2 || us(i3.current);
      }
    }, []);
    let _2 = (0, e2.useRef)(r2.focusedKey);
    (0, e2.useEffect)(() => {
      let e3 = wt();
      if (r2.isFocused && null != r2.focusedKey && (null == h2 ? void 0 : h2.current)) {
        let t4 = h2.current.querySelector(`[data-key="${CSS.escape(r2.focusedKey.toString())}"]`);
        t4 && ("keyboard" === e3 || E2.current) && (m2 || bc(h2.current, t4), "virtual" !== e3 && _c(t4, { containingElement: i3.current }));
      }
      r2.isFocused && null == r2.focusedKey && null != _2.current && us(i3.current), _2.current = r2.focusedKey, E2.current = false;
    }, [m2, h2, r2.focusedKey, r2.isFocused, i3]);
    let T2, S2 = { onKeyDown: (e3) => {
      if (e3.altKey && "Tab" === e3.key && e3.preventDefault(), !i3.current.contains(e3.target)) return;
      const t4 = (t5, n3) => {
        if (null != t5) {
          if (r2.isLink(t5) && "selection" === g2 && u2 && !jl(e3)) {
            (0, Fn.flushSync)(() => {
              r2.setFocusedKey(t5, n3);
            });
            let i4 = h2.current.querySelector(`[data-key="${CSS.escape(t5.toString())}"]`), o5 = r2.getItemProps(t5);
            return void v2.open(i4, e3, o5.href, o5.routerOptions);
          }
          if (r2.setFocusedKey(t5, n3), r2.isLink(t5) && "override" === g2) return;
          e3.shiftKey && "multiple" === r2.selectionMode ? r2.extendSelection(t5) : u2 && !jl(e3) && r2.replaceSelection(t5);
        }
      };
      switch (e3.key) {
        case "ArrowDown":
          if (n2.getKeyBelow) {
            var o4, l2;
            e3.preventDefault();
            let i4 = null != r2.focusedKey ? n2.getKeyBelow(r2.focusedKey) : null === (o4 = n2.getFirstKey) || void 0 === o4 ? void 0 : o4.call(n2);
            null == i4 && s2 && (i4 = null === (l2 = n2.getFirstKey) || void 0 === l2 ? void 0 : l2.call(n2, r2.focusedKey)), t4(i4);
          }
          break;
        case "ArrowUp":
          if (n2.getKeyAbove) {
            var d3, p3;
            e3.preventDefault();
            let i4 = null != r2.focusedKey ? n2.getKeyAbove(r2.focusedKey) : null === (d3 = n2.getLastKey) || void 0 === d3 ? void 0 : d3.call(n2);
            null == i4 && s2 && (i4 = null === (p3 = n2.getLastKey) || void 0 === p3 ? void 0 : p3.call(n2, r2.focusedKey)), t4(i4);
          }
          break;
        case "ArrowLeft":
          if (n2.getKeyLeftOf) {
            var m3, b3;
            e3.preventDefault();
            let i4 = n2.getKeyLeftOf(r2.focusedKey);
            null == i4 && s2 && (i4 = "rtl" === y2 ? null === (m3 = n2.getFirstKey) || void 0 === m3 ? void 0 : m3.call(n2, r2.focusedKey) : null === (b3 = n2.getLastKey) || void 0 === b3 ? void 0 : b3.call(n2, r2.focusedKey)), t4(i4, "rtl" === y2 ? "first" : "last");
          }
          break;
        case "ArrowRight":
          if (n2.getKeyRightOf) {
            var E3, _3;
            e3.preventDefault();
            let i4 = n2.getKeyRightOf(r2.focusedKey);
            null == i4 && s2 && (i4 = "rtl" === y2 ? null === (E3 = n2.getLastKey) || void 0 === E3 ? void 0 : E3.call(n2, r2.focusedKey) : null === (_3 = n2.getFirstKey) || void 0 === _3 ? void 0 : _3.call(n2, r2.focusedKey)), t4(i4, "rtl" === y2 ? "last" : "first");
          }
          break;
        case "Home":
          if (n2.getFirstKey) {
            e3.preventDefault();
            let t5 = n2.getFirstKey(r2.focusedKey, Bl(e3));
            r2.setFocusedKey(t5), Bl(e3) && e3.shiftKey && "multiple" === r2.selectionMode ? r2.extendSelection(t5) : u2 && r2.replaceSelection(t5);
          }
          break;
        case "End":
          if (n2.getLastKey) {
            e3.preventDefault();
            let t5 = n2.getLastKey(r2.focusedKey, Bl(e3));
            r2.setFocusedKey(t5), Bl(e3) && e3.shiftKey && "multiple" === r2.selectionMode ? r2.extendSelection(t5) : u2 && r2.replaceSelection(t5);
          }
          break;
        case "PageDown":
          n2.getKeyPageBelow && (e3.preventDefault(), t4(n2.getKeyPageBelow(r2.focusedKey)));
          break;
        case "PageUp":
          n2.getKeyPageAbove && (e3.preventDefault(), t4(n2.getKeyPageAbove(r2.focusedKey)));
          break;
        case "a":
          Bl(e3) && "multiple" === r2.selectionMode && true !== c2 && (e3.preventDefault(), r2.selectAll());
          break;
        case "Escape":
          a2 || 0 === r2.selectedKeys.size || (e3.stopPropagation(), e3.preventDefault(), r2.clearSelection());
          break;
        case "Tab":
          if (!f2) {
            if (e3.shiftKey) i3.current.focus();
            else {
              let e4, t5, r3 = hc(i3.current, { tabbable: true });
              do {
                t5 = r3.lastChild(), t5 && (e4 = t5);
              } while (t5);
              e4 && !e4.contains(document.activeElement) && Cn(e4);
            }
            break;
          }
      }
    }, onFocus: (e3) => {
      if (r2.isFocused) e3.currentTarget.contains(e3.target) || r2.setFocused(false);
      else if (e3.currentTarget.contains(e3.target)) {
        if (r2.setFocused(true), null == r2.focusedKey) {
          let i4 = (e4) => {
            null != e4 && (r2.setFocusedKey(e4), u2 && r2.replaceSelection(e4));
          }, s3 = e3.relatedTarget;
          var t4, o4;
          s3 && e3.currentTarget.compareDocumentPosition(s3) & Node.DOCUMENT_POSITION_FOLLOWING ? i4(null !== (t4 = r2.lastSelectedKey) && void 0 !== t4 ? t4 : n2.getLastKey()) : i4(null !== (o4 = r2.firstSelectedKey) && void 0 !== o4 ? o4 : n2.getFirstKey());
        } else m2 || (h2.current.scrollTop = b2.current.top, h2.current.scrollLeft = b2.current.left);
        if (!m2 && null != r2.focusedKey) {
          let e4 = h2.current.querySelector(`[data-key="${CSS.escape(r2.focusedKey.toString())}"]`);
          e4 && (e4.contains(document.activeElement) || Cn(e4), "keyboard" === wt() && _c(e4, { containingElement: i3.current }));
        }
      }
    }, onBlur: (e3) => {
      e3.currentTarget.contains(e3.relatedTarget) || r2.setFocused(false);
    }, onMouseDown(e3) {
      h2.current === e3.target && e3.preventDefault();
    } }, { typeSelectProps: P2 } = Xs({ keyboardDelegate: n2, selectionManager: r2 });
    return d2 || (S2 = C(P2, S2)), p2 || (T2 = null == r2.focusedKey ? 0 : -1), { collectionProps: { ...S2, tabIndex: T2 } };
  }
  function Sc(t3, r2, n2) {
    let i3 = ve(t3, { labelable: true }), o3 = t3.selectionBehavior || "toggle", s2 = t3.linkBehavior || ("replace" === o3 ? "action" : "override");
    "toggle" === o3 && "action" === s2 && (s2 = "override");
    let { listProps: a2 } = function(t4) {
      let { selectionManager: r3, collection: n3, disabledKeys: i4, ref: o4, keyboardDelegate: s3 } = t4, a3 = Zs({ usage: "search", sensitivity: "base" }), l3 = r3.disabledBehavior, c3 = (0, e2.useMemo)(() => s3 || new $s({ collection: n3, disabledKeys: i4, disabledBehavior: l3, ref: o4, collator: a3 }), [s3, n3, i4, o4, a3, l3]), { collectionProps: u3 } = Tc({ ...t4, ref: o4, selectionManager: r3, keyboardDelegate: c3 });
      return { listProps: u3 };
    }({ ...t3, ref: n2, selectionManager: r2.selectionManager, collection: r2.collection, disabledKeys: r2.disabledKeys, linkBehavior: s2 }), { focusWithinProps: l2 } = At({ onFocusWithin: t3.onFocus, onBlurWithin: t3.onBlur, onFocusWithinChange: t3.onFocusChange }), c2 = _(t3.id);
    Ll.set(r2, { id: c2, shouldUseVirtualFocus: t3.shouldUseVirtualFocus, shouldSelectOnPressUp: t3.shouldSelectOnPressUp, shouldFocusOnHover: t3.shouldFocusOnHover, isVirtualized: t3.isVirtualized, onAction: t3.onAction, linkBehavior: s2 });
    let { labelProps: u2, fieldProps: d2 } = ea({ ...t3, id: c2, labelElementType: "span" });
    return { labelProps: u2, listBoxProps: C(i3, l2, "multiple" === r2.selectionManager.selectionMode ? { "aria-multiselectable": "true" } : {}, { role: "listbox", ...C(d2, a2) }) };
  }
  class Pc {
    shouldInvalidate(e3, t3) {
      return e3.width !== t3.width || e3.height !== t3.height;
    }
    validate(e3) {
    }
    getInitialLayoutInfo(e3) {
      return e3;
    }
    getFinalLayoutInfo(e3) {
      return e3;
    }
  }
  class wc {
    copy() {
      return new wc(this.x, this.y);
    }
    equals(e3) {
      return this.x === e3.x && this.y === e3.y;
    }
    isOrigin() {
      return 0 === this.x && 0 === this.y;
    }
    constructor(e3 = 0, t3 = 0) {
      this.x = e3, this.y = t3;
    }
  }
  class Cc {
    get maxX() {
      return this.x + this.width;
    }
    get maxY() {
      return this.y + this.height;
    }
    get area() {
      return this.width * this.height;
    }
    get topLeft() {
      return new wc(this.x, this.y);
    }
    get topRight() {
      return new wc(this.maxX, this.y);
    }
    get bottomLeft() {
      return new wc(this.x, this.maxY);
    }
    get bottomRight() {
      return new wc(this.maxX, this.maxY);
    }
    intersects(e3) {
      return this.x <= e3.x + e3.width && e3.x <= this.x + this.width && this.y <= e3.y + e3.height && e3.y <= this.y + this.height;
    }
    containsRect(e3) {
      return this.x <= e3.x && this.y <= e3.y && this.maxX >= e3.maxX && this.maxY >= e3.maxY;
    }
    containsPoint(e3) {
      return this.x <= e3.x && this.y <= e3.y && this.maxX >= e3.x && this.maxY >= e3.y;
    }
    getCornerInRect(e3) {
      for (let t3 of ["topLeft", "topRight", "bottomLeft", "bottomRight"]) if (e3.containsPoint(this[t3])) return t3;
      return null;
    }
    equals(e3) {
      return e3.x === this.x && e3.y === this.y && e3.width === this.width && e3.height === this.height;
    }
    pointEquals(e3) {
      return this.x === e3.x && this.y === e3.y;
    }
    sizeEquals(e3) {
      return this.width === e3.width && this.height === e3.height;
    }
    union(e3) {
      let t3 = Math.min(this.x, e3.x), r2 = Math.min(this.y, e3.y), n2 = Math.max(this.maxX, e3.maxX) - t3, i3 = Math.max(this.maxY, e3.maxY) - r2;
      return new Cc(t3, r2, n2, i3);
    }
    intersection(e3) {
      if (!this.intersects(e3)) return new Cc(0, 0, 0, 0);
      let t3 = Math.max(this.x, e3.x), r2 = Math.max(this.y, e3.y);
      return new Cc(t3, r2, Math.min(this.maxX, e3.maxX) - t3, Math.min(this.maxY, e3.maxY) - r2);
    }
    copy() {
      return new Cc(this.x, this.y, this.width, this.height);
    }
    constructor(e3 = 0, t3 = 0, r2 = 0, n2 = 0) {
      this.x = e3, this.y = t3, this.width = r2, this.height = n2;
    }
  }
  class xc {
    copy() {
      let e3 = new xc(this.type, this.key, this.rect.copy());
      return e3.estimatedSize = this.estimatedSize, e3.opacity = this.opacity, e3.transform = this.transform, e3.parentKey = this.parentKey, e3.isSticky = this.isSticky, e3.zIndex = this.zIndex, e3.allowOverflow = this.allowOverflow, e3;
    }
    constructor(e3, t3, r2) {
      this.type = e3, this.key = t3, this.parentKey = null, this.rect = r2, this.estimatedSize = false, this.isSticky = false, this.opacity = 1, this.transform = null, this.zIndex = 0, this.allowOverflow = false;
    }
  }
  class Oc extends Pc {
    getLayoutInfo(e3) {
      let t3 = this.layoutInfos.get(e3);
      return !t3 && this.validRect.area < this.contentSize.area && this.lastCollection && (this.lastValidRect = this.validRect, this.validRect = new Cc(0, 0, 1 / 0, 1 / 0), this.rootNodes = this.buildCollection(), this.validRect = new Cc(0, 0, this.contentSize.width, this.contentSize.height), t3 = this.layoutInfos.get(e3)), t3;
    }
    getVisibleLayoutInfos(e3) {
      !this.validRect.containsRect(e3) && this.lastCollection && (this.lastValidRect = this.validRect, this.validRect = this.validRect.union(e3), this.rootNodes = this.buildCollection());
      let t3 = [], r2 = (n2) => {
        for (let i3 of n2) this.isVisible(i3, e3) && (t3.push(i3.layoutInfo), i3.header && t3.push(i3.header), i3.children && r2(i3.children));
      };
      return r2(this.rootNodes), t3;
    }
    isVisible(e3, t3) {
      return e3.layoutInfo.rect.intersects(t3) || e3.layoutInfo.isSticky || this.virtualizer.isPersistedKey(e3.layoutInfo.key);
    }
    shouldInvalidateEverything(e3) {
      return e3.sizeChanged;
    }
    validate(e3) {
      if (this.collection = this.virtualizer.collection, this.invalidateEverything = this.shouldInvalidateEverything(e3), this.invalidateEverything && (this.lastValidRect = this.validRect, this.validRect = this.virtualizer.getVisibleRect()), this.rootNodes = this.buildCollection(), this.lastCollection && this.collection !== this.lastCollection) {
        for (let e4 of this.lastCollection.getKeys()) if (!this.collection.getItem(e4)) {
          let r2 = this.layoutNodes.get(e4);
          var t3;
          r2 && (this.layoutInfos.delete(r2.layoutInfo.key), this.layoutInfos.delete(null === (t3 = r2.header) || void 0 === t3 ? void 0 : t3.key), this.layoutNodes.delete(e4));
        }
      }
      this.lastWidth = this.virtualizer.visibleRect.width, this.lastCollection = this.collection, this.invalidateEverything = false;
    }
    buildCollection() {
      let e3 = this.padding, t3 = 0, r2 = [];
      for (let i4 of this.collection) {
        var n2;
        let o4 = null !== (n2 = this.rowHeight) && void 0 !== n2 ? n2 : this.estimatedRowHeight;
        if ("item" === i4.type && e3 + o4 < this.validRect.y && !this.isValid(i4, e3)) {
          e3 += o4, t3++;
          continue;
        }
        let s2 = this.buildChild(i4, 0, e3);
        if (e3 = s2.layoutInfo.rect.maxY, r2.push(s2), "item" === i4.type && e3 > this.validRect.maxY) {
          e3 += (this.collection.size - (r2.length + t3)) * o4;
          break;
        }
      }
      if (this.isLoading) {
        var i3;
        let t4 = new Cc(0, e3, this.virtualizer.visibleRect.width, null !== (i3 = this.loaderHeight) && void 0 !== i3 ? i3 : this.virtualizer.visibleRect.height), n3 = new xc("loader", "loader", t4);
        this.layoutInfos.set("loader", n3), r2.push({ layoutInfo: n3 }), e3 = n3.rect.maxY;
      }
      if (0 === r2.length) {
        var o3;
        let t4 = new Cc(0, e3, this.virtualizer.visibleRect.width, null !== (o3 = this.placeholderHeight) && void 0 !== o3 ? o3 : this.virtualizer.visibleRect.height), n3 = new xc("placeholder", "placeholder", t4);
        this.layoutInfos.set("placeholder", n3), r2.push({ layoutInfo: n3 }), e3 = n3.rect.maxY;
      }
      return this.contentSize = new ql(this.virtualizer.visibleRect.width, e3 + this.padding), r2;
    }
    isValid(e3, t3) {
      let r2 = this.layoutNodes.get(e3.key);
      return !this.invalidateEverything && r2 && r2.node === e3 && t3 === (r2.header || r2.layoutInfo).rect.y && r2.layoutInfo.rect.intersects(this.lastValidRect) && r2.validRect.containsRect(r2.layoutInfo.rect.intersection(this.validRect));
    }
    buildChild(e3, t3, r2) {
      if (this.isValid(e3, r2)) return this.layoutNodes.get(e3.key);
      let n2 = this.buildNode(e3, t3, r2);
      var i3;
      return n2.node = e3, n2.layoutInfo.parentKey = null !== (i3 = e3.parentKey) && void 0 !== i3 ? i3 : null, this.layoutInfos.set(n2.layoutInfo.key, n2.layoutInfo), n2.header && this.layoutInfos.set(n2.header.key, n2.header), this.layoutNodes.set(e3.key, n2), n2;
    }
    buildNode(e3, t3, r2) {
      switch (e3.type) {
        case "section":
          return this.buildSection(e3, t3, r2);
        case "item":
          return this.buildItem(e3, t3, r2);
      }
    }
    buildSection(e3, t3, r2) {
      let n2 = this.virtualizer.visibleRect.width, i3 = this.headingHeight, o3 = false;
      if (null == i3) {
        let t4 = this.layoutNodes.get(e3.key);
        if (t4 && t4.header) {
          let r3 = this.collection.getItem(e3.key), s3 = this.lastCollection ? this.lastCollection.getItem(e3.key) : null;
          i3 = t4.header.rect.height, o3 = n2 !== this.lastWidth || r3 !== s3 || t4.header.estimatedSize;
        } else i3 = e3.rendered ? this.estimatedHeadingHeight : 0, o3 = true;
      }
      null == i3 && (i3 = 48);
      let s2 = new Cc(0, r2, n2, i3), a2 = new xc("header", e3.key + ":header", s2);
      a2.estimatedSize = o3, a2.parentKey = e3.key, r2 += a2.rect.height;
      let l2 = new Cc(0, r2, n2, 0), c2 = new xc(e3.type, e3.key, l2), u2 = r2, d2 = 0, p2 = [];
      for (let n3 of Fl(e3, this.collection)) {
        var f2;
        let i4 = null !== (f2 = this.rowHeight) && void 0 !== f2 ? f2 : this.estimatedRowHeight;
        if (r2 + i4 < this.validRect.y && !this.isValid(e3, r2)) {
          r2 += i4, d2++;
          continue;
        }
        let o4 = this.buildChild(n3, t3, r2);
        if (r2 = o4.layoutInfo.rect.maxY, p2.push(o4), r2 > this.validRect.maxY) {
          r2 += ([...Fl(e3, this.collection)].length - (p2.length + d2)) * i4;
          break;
        }
      }
      return l2.height = r2 - u2, { header: a2, layoutInfo: c2, children: p2, validRect: c2.rect.intersection(this.validRect) };
    }
    buildItem(e3, t3, r2) {
      let n2 = this.virtualizer.visibleRect.width, i3 = this.rowHeight, o3 = false;
      if (null == i3) {
        let t4 = this.layoutNodes.get(e3.key);
        t4 ? (i3 = t4.layoutInfo.rect.height, o3 = n2 !== this.lastWidth || e3 !== t4.node || t4.layoutInfo.estimatedSize) : (i3 = this.estimatedRowHeight, o3 = true);
      }
      null == i3 && (i3 = 48), "function" == typeof this.indentationForItem && (t3 += this.indentationForItem(this.collection, e3.key) || 0);
      let s2 = new Cc(t3, r2, n2 - t3, i3), a2 = new xc(e3.type, e3.key, s2);
      return a2.allowOverflow = true, a2.estimatedSize = o3, { layoutInfo: a2, validRect: a2.rect };
    }
    updateItemSize(e3, t3) {
      let r2 = this.layoutInfos.get(e3);
      if (!r2) return false;
      if (r2.estimatedSize = false, r2.rect.height !== t3.height) {
        let n2 = r2.copy();
        n2.rect.height = t3.height, this.layoutInfos.set(e3, n2), this.updateLayoutNode(e3, r2, n2);
        let i3 = this.collection.getItem(r2.parentKey);
        for (; i3; ) this.updateLayoutNode(i3.key, r2, n2), i3 = this.collection.getItem(i3.parentKey);
        return true;
      }
      return false;
    }
    updateLayoutNode(e3, t3, r2) {
      let n2 = this.layoutNodes.get(e3);
      n2 && (n2.validRect = new Cc(), n2.header === t3 ? n2.header = r2 : n2.layoutInfo === t3 && (n2.layoutInfo = r2));
    }
    getContentSize() {
      return this.contentSize;
    }
    getKeyAbove(e3) {
      let t3 = this.collection;
      for (e3 = t3.getKeyBefore(e3); null != e3; ) {
        let r2 = t3.getItem(e3);
        if ("item" === r2.type && (this.allowDisabledKeyFocus || !this.disabledKeys.has(r2.key))) return e3;
        e3 = t3.getKeyBefore(e3);
      }
    }
    getKeyBelow(e3) {
      let t3 = this.collection;
      for (e3 = t3.getKeyAfter(e3); null != e3; ) {
        let r2 = t3.getItem(e3);
        if ("item" === r2.type && (this.allowDisabledKeyFocus || !this.disabledKeys.has(r2.key))) return e3;
        e3 = t3.getKeyAfter(e3);
      }
    }
    getKeyPageAbove(e3) {
      let t3 = this.getLayoutInfo(e3);
      if (t3) {
        let e4 = Math.max(0, t3.rect.y + t3.rect.height - this.virtualizer.visibleRect.height);
        for (; t3 && t3.rect.y > e4; ) {
          let e5 = this.getKeyAbove(t3.key);
          t3 = this.getLayoutInfo(e5);
        }
        if (t3) return t3.key;
      }
      return this.getFirstKey();
    }
    getKeyPageBelow(e3) {
      let t3 = this.getLayoutInfo(null != e3 ? e3 : this.getFirstKey());
      if (t3) {
        let e4 = Math.min(this.virtualizer.contentSize.height, t3.rect.y - t3.rect.height + this.virtualizer.visibleRect.height);
        for (; t3 && t3.rect.y < e4; ) {
          let e5 = this.getKeyBelow(t3.key);
          t3 = this.getLayoutInfo(e5);
        }
        if (t3) return t3.key;
      }
      return this.getLastKey();
    }
    getFirstKey() {
      let e3 = this.collection, t3 = e3.getFirstKey();
      for (; null != t3; ) {
        let r2 = e3.getItem(t3);
        if ("item" === r2.type && (this.allowDisabledKeyFocus || !this.disabledKeys.has(r2.key))) return t3;
        t3 = e3.getKeyAfter(t3);
      }
    }
    getLastKey() {
      let e3 = this.collection, t3 = e3.getLastKey();
      for (; null != t3; ) {
        let r2 = e3.getItem(t3);
        if ("item" === r2.type && (this.allowDisabledKeyFocus || !this.disabledKeys.has(r2.key))) return t3;
        t3 = e3.getKeyBefore(t3);
      }
    }
    getKeyForSearch(e3, t3) {
      if (!this.collator) return null;
      let r2 = this.collection, n2 = t3 || this.getFirstKey();
      for (; null != n2; ) {
        let t4 = r2.getItem(n2), i3 = t4.textValue.slice(0, e3.length);
        if (t4.textValue && 0 === this.collator.compare(i3, e3)) return n2;
        n2 = this.getKeyBelow(n2);
      }
      return null;
    }
    getInitialLayoutInfo(e3) {
      return e3.opacity = 0, e3.transform = "scale3d(0.8, 0.8, 0.8)", e3;
    }
    getFinalLayoutInfo(e3) {
      return e3.opacity = 0, e3.transform = "scale3d(0.8, 0.8, 0.8)", e3;
    }
    getDropTargetFromPoint(e3, t3, r2) {
      e3 += this.virtualizer.visibleRect.x, t3 += this.virtualizer.visibleRect.y;
      let n2 = this.virtualizer.keyAtPoint(new wc(e3, t3));
      if (null == n2 || 0 === this.collection.size) return { type: "root" };
      let i3 = this.getLayoutInfo(n2), o3 = i3.rect, s2 = { type: "item", key: i3.key, dropPosition: "on" };
      return r2(s2) ? t3 <= o3.y + 10 && r2({ ...s2, dropPosition: "before" }) ? s2.dropPosition = "before" : t3 >= o3.maxY - 10 && r2({ ...s2, dropPosition: "after" }) && (s2.dropPosition = "after") : t3 <= o3.y + o3.height / 2 && r2({ ...s2, dropPosition: "before" }) ? s2.dropPosition = "before" : r2({ ...s2, dropPosition: "after" }) && (s2.dropPosition = "after"), s2;
    }
    constructor(e3 = {}) {
      super(), this.disabledKeys = /* @__PURE__ */ new Set(), this.allowDisabledKeyFocus = false, this.rowHeight = e3.rowHeight, this.estimatedRowHeight = e3.estimatedRowHeight, this.headingHeight = e3.headingHeight, this.estimatedHeadingHeight = e3.estimatedHeadingHeight, this.padding = e3.padding || 0, this.indentationForItem = e3.indentationForItem, this.collator = e3.collator, this.loaderHeight = e3.loaderHeight, this.placeholderHeight = e3.placeholderHeight, this.layoutInfos = /* @__PURE__ */ new Map(), this.layoutNodes = /* @__PURE__ */ new Map(), this.rootNodes = [], this.lastWidth = 0, this.lastCollection = null, this.allowDisabledKeyFocus = e3.allowDisabledKeyFocus, this.lastValidRect = new Cc(), this.validRect = new Cc(), this.contentSize = new ql();
    }
  }
  function Ic(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(2651);
  var Rc, Ac, Mc, Lc, Nc, Fc, kc, Dc, Uc, jc, Bc, Kc, zc, Wc, Vc, Hc, Gc, qc, $c, Yc, Xc, Qc, Zc, Jc = {};
  function eu(e3, t3 = -1 / 0, r2 = 1 / 0) {
    return Math.min(Math.max(e3, t3), r2);
  }
  Ic(Jc, "focus-ring", () => Rc, (e3) => Rc = e3), Ic(Jc, "i18nFontFamily", () => Ac, (e3) => Ac = e3), Ic(Jc, "spectrum-CircleLoader", () => Mc, (e3) => Mc = e3), Ic(Jc, "spectrum-CircleLoader--indeterminate", () => Lc, (e3) => Lc = e3), Ic(Jc, "spectrum-CircleLoader--indeterminate-fill-submask-2", () => Nc, (e3) => Nc = e3), Ic(Jc, "spectrum-CircleLoader--large", () => Fc, (e3) => Fc = e3), Ic(Jc, "spectrum-CircleLoader--overBackground", () => kc, (e3) => kc = e3), Ic(Jc, "spectrum-CircleLoader--small", () => Dc, (e3) => Dc = e3), Ic(Jc, "spectrum-CircleLoader--staticBlack", () => Uc, (e3) => Uc = e3), Ic(Jc, "spectrum-CircleLoader--staticWhite", () => jc, (e3) => jc = e3), Ic(Jc, "spectrum-CircleLoader-fill", () => Bc, (e3) => Bc = e3), Ic(Jc, "spectrum-CircleLoader-fillMask1", () => Kc, (e3) => Kc = e3), Ic(Jc, "spectrum-CircleLoader-fillMask2", () => zc, (e3) => zc = e3), Ic(Jc, "spectrum-CircleLoader-fillSubMask1", () => Wc, (e3) => Wc = e3), Ic(Jc, "spectrum-CircleLoader-fillSubMask2", () => Vc, (e3) => Vc = e3), Ic(Jc, "spectrum-CircleLoader-fills", () => Hc, (e3) => Hc = e3), Ic(Jc, "spectrum-CircleLoader-track", () => Gc, (e3) => Gc = e3), Ic(Jc, "spectrum-FocusRing-ring", () => qc, (e3) => qc = e3), Ic(Jc, "spectrum-FocusRing", () => $c, (e3) => $c = e3), Ic(Jc, "spectrum-FocusRing--quiet", () => Yc, (e3) => Yc = e3), Ic(Jc, "spectrum-fill-mask-1", () => Xc, (e3) => Xc = e3), Ic(Jc, "spectrum-fill-mask-2", () => Qc, (e3) => Qc = e3), Ic(Jc, "spectrum-fills-rotate", () => Zc, (e3) => Zc = e3), Rc = "EQYv7q_focus-ring", Ac = "EQYv7q_i18nFontFamily", Mc = "EQYv7q_spectrum-CircleLoader", Lc = "EQYv7q_spectrum-CircleLoader--indeterminate", Nc = "EQYv7q_spectrum-CircleLoader--indeterminate-fill-submask-2", Fc = "EQYv7q_spectrum-CircleLoader--large", kc = "EQYv7q_spectrum-CircleLoader--overBackground", Dc = "EQYv7q_spectrum-CircleLoader--small", Uc = "EQYv7q_spectrum-CircleLoader--staticBlack", jc = "EQYv7q_spectrum-CircleLoader--staticWhite", Bc = "EQYv7q_spectrum-CircleLoader-fill", Kc = "EQYv7q_spectrum-CircleLoader-fillMask1", zc = "EQYv7q_spectrum-CircleLoader-fillMask2", Wc = "EQYv7q_spectrum-CircleLoader-fillSubMask1", Vc = "EQYv7q_spectrum-CircleLoader-fillSubMask2", Hc = "EQYv7q_spectrum-CircleLoader-fills", Gc = "EQYv7q_spectrum-CircleLoader-track", $c = "EQYv7q_spectrum-FocusRing " + (qc = "EQYv7q_spectrum-FocusRing-ring"), Yc = "EQYv7q_spectrum-FocusRing--quiet", Xc = "EQYv7q_spectrum-fill-mask-1", Qc = "EQYv7q_spectrum-fill-mask-2", Zc = "EQYv7q_spectrum-fills-rotate";
  let tu = /* @__PURE__ */ new Map(), ru = false;
  try {
    ru = "exceptZero" === new Intl.NumberFormat("de-DE", { signDisplay: "exceptZero" }).resolvedOptions().signDisplay;
  } catch (Jm2) {
  }
  let nu = false;
  try {
    nu = "unit" === new Intl.NumberFormat("de-DE", { style: "unit", unit: "degree" }).resolvedOptions().style;
  } catch (Jm2) {
  }
  const iu = { degree: { narrow: { default: "\xB0", "ja-JP": " \u5EA6", "zh-TW": "\u5EA6", "sl-SI": " \xB0" } } };
  class ou {
    format(e3) {
      let t3 = "";
      if (t3 = ru || null == this.options.signDisplay ? this.numberFormatter.format(e3) : function(e4, t4, r3) {
        if ("auto" === t4) return e4.format(r3);
        if ("never" === t4) return e4.format(Math.abs(r3));
        {
          let n2 = false;
          if ("always" === t4 ? n2 = r3 > 0 || Object.is(r3, 0) : "exceptZero" === t4 && (Object.is(r3, -0) || Object.is(r3, 0) ? r3 = Math.abs(r3) : n2 = r3 > 0), n2) {
            let t5 = e4.format(-r3), n3 = e4.format(r3), i3 = t5.replace(n3, "").replace(/\u200e|\u061C/, "");
            return 1 !== [...i3].length && console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case"), t5.replace(n3, "!!!").replace(i3, "+").replace("!!!", n3);
          }
          return e4.format(r3);
        }
      }(this.numberFormatter, this.options.signDisplay, e3), "unit" === this.options.style && !nu) {
        var r2;
        let { unit: e4, unitDisplay: n2 = "short", locale: i3 } = this.resolvedOptions();
        if (!e4) return t3;
        let o3 = null === (r2 = iu[e4]) || void 0 === r2 ? void 0 : r2[n2];
        t3 += o3[i3] || o3.default;
      }
      return t3;
    }
    formatToParts(e3) {
      return this.numberFormatter.formatToParts(e3);
    }
    formatRange(e3, t3) {
      if ("function" == typeof this.numberFormatter.formatRange) return this.numberFormatter.formatRange(e3, t3);
      if (t3 < e3) throw new RangeError("End date must be >= start date");
      return `${this.format(e3)} \u2013 ${this.format(t3)}`;
    }
    formatRangeToParts(e3, t3) {
      if ("function" == typeof this.numberFormatter.formatRangeToParts) return this.numberFormatter.formatRangeToParts(e3, t3);
      if (t3 < e3) throw new RangeError("End date must be >= start date");
      let r2 = this.numberFormatter.formatToParts(e3), n2 = this.numberFormatter.formatToParts(t3);
      return [...r2.map((e4) => ({ ...e4, source: "startRange" })), { type: "literal", value: " \u2013 ", source: "shared" }, ...n2.map((e4) => ({ ...e4, source: "endRange" }))];
    }
    resolvedOptions() {
      let e3 = this.numberFormatter.resolvedOptions();
      return ru || null == this.options.signDisplay || (e3 = { ...e3, signDisplay: this.options.signDisplay }), nu || "unit" !== this.options.style || (e3 = { ...e3, style: "unit", unit: this.options.unit, unitDisplay: this.options.unitDisplay }), e3;
    }
    constructor(e3, t3 = {}) {
      this.numberFormatter = function(e4, t4 = {}) {
        let { numberingSystem: r2 } = t4;
        if (r2 && e4.includes("-nu-") && (e4.includes("-u-") || (e4 += "-u-"), e4 += `-nu-${r2}`), "unit" === t4.style && !nu) {
          var n2;
          let { unit: e5, unitDisplay: r3 = "short" } = t4;
          if (!e5) throw new Error('unit option must be provided with style: "unit"');
          if (!(null === (n2 = iu[e5]) || void 0 === n2 ? void 0 : n2[r3])) throw new Error(`Unsupported unit ${e5} with unitDisplay = ${r3}`);
          t4 = { ...t4, style: "decimal" };
        }
        let i3 = e4 + (t4 ? Object.entries(t4).sort((e5, t5) => e5[0] < t5[0] ? -1 : 1).join() : "");
        if (tu.has(i3)) return tu.get(i3);
        let o3 = new Intl.NumberFormat(e4, t4);
        return tu.set(i3, o3), o3;
      }(e3, t3), this.options = t3;
    }
  }
  function su(t3) {
    let { value: r2 = 0, minValue: n2 = 0, maxValue: i3 = 100, valueLabel: o3, isIndeterminate: s2, formatOptions: a2 = { style: "percent" } } = t3, l2 = ve(t3, { labelable: true }), { labelProps: c2, fieldProps: u2 } = ea({ ...t3, labelElementType: "span" });
    r2 = eu(r2, n2, i3);
    let d2 = (r2 - n2) / (i3 - n2), p2 = function(t4 = {}) {
      let { locale: r3 } = H();
      return (0, e2.useMemo)(() => new ou(r3, t4), [r3, t4]);
    }(a2);
    if (!s2 && !o3) {
      let e3 = "percent" === a2.style ? d2 : r2;
      o3 = p2.format(e3);
    }
    return { progressBarProps: C(l2, { ...u2, "aria-valuenow": s2 ? void 0 : r2, "aria-valuemin": n2, "aria-valuemax": i3, "aria-valuetext": s2 ? void 0 : o3, role: "progressbar" }), labelProps: c2 };
  }
  function au(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function lu(t3, r2) {
    let { value: n2 = 0, minValue: i3 = 0, maxValue: o3 = 100, size: s2 = "M", staticColor: a2, variant: l2, isIndeterminate: c2 = false, "aria-label": u2, "aria-labelledby": d2, ...p2 } = t3, f2 = de(r2), { styleProps: m2 } = se(p2);
    n2 = eu(n2, i3, o3);
    let { progressBarProps: h2 } = su({ ...t3, value: n2 }), g2 = {}, y2 = {};
    if (!c2) {
      let e3, t4 = (n2 - i3) / (o3 - i3) * 100;
      t4 > 0 && t4 <= 50 ? (e3 = t4 / 50 * 180 - 180, g2.transform = `rotate(${e3}deg)`, y2.transform = "rotate(-180deg)") : t4 > 50 && (e3 = (t4 - 50) / 50 * 180 - 180, g2.transform = "rotate(0deg)", y2.transform = `rotate(${e3}deg)`);
    }
    return u2 || d2 || console.warn("ProgressCircle requires an aria-label or aria-labelledby attribute for accessibility"), e2.createElement("div", { ...m2, ...h2, ref: f2, className: Xe(au(Jc), "spectrum-CircleLoader", { "spectrum-CircleLoader--indeterminate": c2, "spectrum-CircleLoader--small": "S" === s2, "spectrum-CircleLoader--large": "L" === s2, "spectrum-CircleLoader--overBackground": "overBackground" === l2, "spectrum-CircleLoader--staticWhite": "white" === a2, "spectrum-CircleLoader--staticBlack": "black" === a2 }, m2.className) }, e2.createElement("div", { className: Xe(au(Jc), "spectrum-CircleLoader-track") }), e2.createElement("div", { className: Xe(au(Jc), "spectrum-CircleLoader-fills") }, e2.createElement("div", { className: Xe(au(Jc), "spectrum-CircleLoader-fillMask1") }, e2.createElement("div", { className: Xe(au(Jc), "spectrum-CircleLoader-fillSubMask1"), "data-testid": "fillSubMask1", style: g2 }, e2.createElement("div", { className: Xe(au(Jc), "spectrum-CircleLoader-fill") }))), e2.createElement("div", { className: Xe(au(Jc), "spectrum-CircleLoader-fillMask2") }, e2.createElement("div", { className: Xe(au(Jc), "spectrum-CircleLoader-fillSubMask2"), "data-testid": "fillSubMask2", style: y2 }, e2.createElement("div", { className: Xe(au(Jc), "spectrum-CircleLoader-fill") })))));
  }
  let cu = e2.forwardRef(lu), uu = null;
  function du(e3, t3) {
    let { scrollLeft: r2 } = e3;
    if ("rtl" === t3) {
      let { scrollWidth: t4, clientWidth: n2 } = e3;
      switch (function(e4 = false) {
        if (null === uu || e4) {
          const e5 = document.createElement("div"), t5 = e5.style;
          t5.width = "50px", t5.height = "50px", t5.overflow = "scroll", t5.direction = "rtl";
          const r3 = document.createElement("div"), n3 = r3.style;
          return n3.width = "100px", n3.height = "100px", e5.appendChild(r3), document.body.appendChild(e5), e5.scrollLeft > 0 ? uu = "positive-descending" : (e5.scrollLeft = 1, uu = 0 === e5.scrollLeft ? "negative" : "positive-ascending"), document.body.removeChild(e5), uu;
        }
        return uu;
      }()) {
        case "negative":
          r2 = -r2;
          break;
        case "positive-descending":
          r2 = t4 - n2 - r2;
      }
    }
    return r2;
  }
  let pu = e2.version.startsWith("16.") || e2.version.startsWith("17.");
  function fu(t3, r2) {
    let { contentSize: n2, onVisibleRectChange: i3, children: o3, innerStyle: s2, sizeToFit: l2, onScrollStart: c2, onScrollEnd: u2, scrollDirection: d2 = "both", ...p2 } = t3, f2 = (0, e2.useRef)();
    r2 = r2 || f2;
    let m2 = (0, e2.useRef)({ scrollTop: 0, scrollLeft: 0, scrollEndTime: 0, scrollTimeout: null, width: 0, height: 0, isScrolling: false }).current, { direction: h2 } = H(), [g2, y2] = (0, e2.useState)(false), v2 = (0, e2.useCallback)((e3) => {
      e3.target === e3.currentTarget && (t3.onScroll && t3.onScroll(e3), (0, Fn.flushSync)(() => {
        let t4 = e3.currentTarget.scrollTop, r3 = du(e3.currentTarget, h2);
        m2.scrollTop = Math.max(0, Math.min(t4, n2.height - m2.height)), m2.scrollLeft = Math.max(0, Math.min(r3, n2.width - m2.width)), i3(new Cc(m2.scrollLeft, m2.scrollTop, m2.width, m2.height)), m2.isScrolling || (m2.isScrolling = true, y2(true), c2 && c2());
        let o4 = Date.now();
        m2.scrollEndTime <= o4 + 50 && (m2.scrollEndTime = o4 + 300, clearTimeout(m2.scrollTimeout), m2.scrollTimeout = setTimeout(() => {
          m2.isScrolling = false, y2(false), m2.scrollTimeout = null, u2 && u2();
        }, 300));
      }));
    }, [t3, h2, m2, n2, i3, c2, u2]);
    (0, e2.useEffect)(() => () => {
      clearTimeout(m2.scrollTimeout);
    }, []);
    let b2 = (0, e2.useCallback)(() => {
      let e3 = r2.current;
      if (!e3) return;
      Object.getOwnPropertyNames(window.HTMLElement.prototype).includes("clientWidth"), Object.getOwnPropertyNames(window.HTMLElement.prototype).includes("clientHeight");
      let t4 = e3.clientWidth, o4 = e3.clientHeight;
      l2 && n2.width > 0 && n2.height > 0 && ("width" === l2 ? t4 = Math.min(t4, n2.width) : "height" === l2 && (o4 = Math.min(o4, n2.height))), m2.width === t4 && m2.height === o4 || (m2.width = t4, m2.height = o4, i3(new Cc(m2.scrollLeft, m2.scrollTop, t4, o4)));
    }, [i3, r2, m2, l2, n2]);
    a(() => {
      b2();
    }, [b2]);
    let E2 = (0, e2.useRef)();
    Qe({ ref: r2, onResize: () => {
      var e3, t4;
      pu ? null !== (t4 = (e3 = E2).current) && void 0 !== t4 || (e3.current = requestAnimationFrame(() => {
        b2(), E2.current = null;
      })) : b2();
    } }), (0, e2.useEffect)(() => () => {
      E2.current && cancelAnimationFrame(E2.current);
    }, []);
    let _2 = { padding: 0, ...p2.style };
    return "horizontal" === d2 ? (_2.overflowX = "auto", _2.overflowY = "hidden") : "vertical" === d2 || n2.width === m2.width ? (_2.overflowY = "auto", _2.overflowX = "hidden") : _2.overflow = "auto", s2 = { width: Number.isFinite(n2.width) ? n2.width : void 0, height: Number.isFinite(n2.height) ? n2.height : void 0, pointerEvents: g2 ? "none" : "auto", position: "relative", ...s2 }, e2.createElement("div", { ...p2, style: _2, ref: r2, onScroll: v2 }, e2.createElement("div", { role: "presentation", style: s2 }, o3));
  }
  const mu = e2.forwardRef(fu);
  let hu, gu = "undefined" != typeof window ? window.performance : null, yu = gu && (gu.now || gu.webkitNow || gu.msNow || gu.mozNow), vu = yu ? yu.bind(gu) : function() {
    return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).getTime();
  };
  function bu(e3) {
    return Math.sin(e3 * Math.PI / 2);
  }
  function Eu(e3, t3) {
    let r2 = /* @__PURE__ */ new Set();
    for (let n2 of e3.keys()) t3.has(n2) || r2.add(n2);
    return r2;
  }
  class _u {
    addSample(e3) {
      this.count++, this.value += (e3 - this.value) / this.count;
    }
    constructor() {
      this.count = 0, this.value = 0;
    }
  }
  class Tu {
    setVisibleRect(e3) {
      let t3 = performance.now() - this.startTime;
      t3 < 500 && (this.averageTime.addSample(t3), e3.x !== this.visibleRect.x && t3 > 0 && (this.velocity.x = (e3.x - this.visibleRect.x) / t3), e3.y !== this.visibleRect.y && t3 > 0 && (this.velocity.y = (e3.y - this.visibleRect.y) / t3)), this.startTime = performance.now(), this.visibleRect = e3;
    }
    collectMetrics() {
      let e3 = performance.now() - this.startTime;
      if (e3 < 500 && this.averagePerf.addSample(e3), this.visibleRect.height > 0) {
        let e4 = Math.abs(this.velocity.y * (this.averageTime.value + this.averagePerf.value));
        this.overscanY.addSample(e4);
      }
      if (this.visibleRect.width > 0) {
        let e4 = Math.abs(this.velocity.x * (this.averageTime.value + this.averagePerf.value));
        this.overscanX.addSample(e4);
      }
    }
    getOverscannedRect() {
      let e3 = this.visibleRect.copy(), t3 = 100 * Math.round(Math.min(2 * this.visibleRect.height, this.overscanY.value) / 100);
      this.velocity.y > 0 ? (e3.y -= 0.2 * t3, e3.height += t3 + 0.2 * t3) : (e3.y -= t3, e3.height += t3 + 0.2 * t3);
      let r2 = 100 * Math.round(Math.min(2 * this.visibleRect.width, this.overscanX.value) / 100);
      return this.velocity.x > 0 ? (e3.x -= 0.2 * r2, e3.width += r2 + 0.2 * r2) : (e3.x -= r2, e3.width += r2 + 0.2 * r2), e3;
    }
    constructor() {
      this.startTime = 0, this.averagePerf = new _u(), this.averageTime = new _u(), this.velocity = new wc(5, 5), this.overscanX = new _u(), this.overscanY = new _u(), this.visibleRect = new Cc();
    }
  }
  let Su = 0;
  class Pu {
    prepareForReuse() {
      this.content = null, this.rendered = null, this.layoutInfo = null;
    }
    constructor(e3) {
      this.virtualizer = e3, this.key = ++Su;
    }
  }
  class wu {
    constructor() {
      this.level = 0, this.actions = [], this.animated = true, this.initialMap = /* @__PURE__ */ new Map(), this.finalMap = /* @__PURE__ */ new Map(), this.initialLayoutInfo = /* @__PURE__ */ new Map(), this.finalLayoutInfo = /* @__PURE__ */ new Map(), this.removed = /* @__PURE__ */ new Map(), this.toRemove = /* @__PURE__ */ new Map();
    }
  }
  class Cu {
    _setContentSize(e3) {
      this._contentSize = e3, this.delegate.setContentSize(e3);
    }
    _setContentOffset(e3) {
      let t3 = new Cc(e3.x, e3.y, this._visibleRect.width, this._visibleRect.height);
      this.delegate.setVisibleRect(t3);
    }
    get contentSize() {
      return this._contentSize;
    }
    get visibleRect() {
      return this._visibleRect;
    }
    set visibleRect(e3) {
      this._setVisibleRect(e3);
    }
    _setVisibleRect(e3, t3 = false) {
      let r2 = this._visibleRect;
      if (e3.equals(r2)) return;
      this.shouldOverscan && this._overscanManager.setVisibleRect(e3);
      let n2 = this.layout && this.layout.shouldInvalidate(e3, this._visibleRect);
      this._resetAnimatedContentOffset(), this._visibleRect = e3, n2 ? this.relayoutNow({ offsetChanged: !e3.pointEquals(r2), sizeChanged: !e3.sizeEquals(r2) }) : this.updateSubviews(t3);
    }
    get collection() {
      return this._collection;
    }
    set collection(e3) {
      this._setData(e3);
    }
    _setData(e3) {
      e3 !== this._collection && (this._collection ? this._runTransaction(() => {
        this._collection = e3;
      }, this.transitionDuration > 0) : (this._collection = e3, this.reloadData()));
    }
    reloadData() {
      this.relayout({ contentChanged: true });
    }
    getItem(e3) {
      return this._collection ? this._collection.getItem(e3) : null;
    }
    get persistedKeys() {
      return this._persistedKeys;
    }
    set persistedKeys(e3) {
      (function(e4, t3) {
        if (e4 === t3) return true;
        if (e4.size !== t3.size) return false;
        for (let r2 of e4) if (!t3.has(r2)) return false;
        return true;
      })(e3, this._persistedKeys) || (this._persistedKeys = e3, this.updateSubviews());
    }
    isPersistedKey(e3) {
      if (this._persistedKeys.has(e3)) return true;
      for (let t3 of this._persistedKeys) for (; null != t3; ) {
        let r2 = this.layout.getLayoutInfo(t3);
        if (!r2) break;
        if (t3 = r2.parentKey, t3 === e3) return true;
      }
      return false;
    }
    get layout() {
      return this._layout;
    }
    set layout(e3) {
      this.setLayout(e3);
    }
    setLayout(e3, t3 = false) {
      if (e3 === this._layout) return;
      let r2 = () => {
        this._layout && (this._layout.virtualizer = null), e3.virtualizer = this, this._layout = e3;
      };
      t3 ? this._runTransaction(r2) : (r2(), this.relayout());
    }
    _getReuseType(e3, t3) {
      if ("item" === e3.type && t3) {
        let r2 = this.delegate.getType ? this.delegate.getType(t3) : "item";
        return { type: r2, reuseType: "item" === r2 ? "item" : e3.type + "_" + r2 };
      }
      return { type: e3.type, reuseType: e3.type };
    }
    getReusableView(e3) {
      let t3 = this.getItem(e3.key), { reuseType: r2 } = this._getReuseType(e3, t3);
      this._reusableViews[r2] || (this._reusableViews[r2] = []);
      let n2 = this._reusableViews[r2], i3 = n2.length > 0 ? n2.pop() : new Pu(this);
      return i3.viewType = r2, this._animatedContentOffset.isOrigin() || ((e3 = e3.copy()).rect.x += this._animatedContentOffset.x, e3.rect.y += this._animatedContentOffset.y), i3.layoutInfo = e3, this._renderView(i3), i3;
    }
    _renderView(e3) {
      let { type: t3, key: r2 } = e3.layoutInfo;
      e3.content = this.getItem(r2), e3.rendered = this._renderContent(t3, e3.content);
    }
    _renderContent(e3, t3) {
      let r2 = this._renderedContent.get(t3);
      if (null != r2) return r2;
      let n2 = this.delegate.renderView(e3, t3);
      return t3 && this._renderedContent.set(t3, n2), n2;
    }
    get visibleViews() {
      return Array.from(this._visibleViews.values());
    }
    getView(e3) {
      return this._visibleViews.get(e3) || null;
    }
    getViewsOfType(e3) {
      return this.visibleViews.filter((t3) => t3.layoutInfo && t3.layoutInfo.type === e3);
    }
    keyForView(e3) {
      return e3 && e3.layoutInfo ? e3.layoutInfo.key : null;
    }
    keyAtPoint(e3) {
      let t3 = new Cc(e3.x, e3.y, 1, 1), r2 = this.layout.getVisibleLayoutInfos(t3);
      for (let e4 of r2) if (e4.rect.intersects(t3)) return e4.key;
      return null;
    }
    willUnmount() {
      cancelAnimationFrame(this._relayoutRaf);
    }
    relayout(e3 = {}) {
      this._scrollAnimation || "undefined" == typeof requestAnimationFrame || (this._invalidationContext ? Object.assign(this._invalidationContext, e3) : this._invalidationContext = e3);
    }
    relayoutNow(e3 = this._invalidationContext || {}) {
      if (this._relayoutRaf && (cancelAnimationFrame(this._relayoutRaf), this._relayoutRaf = null, e3 = { ...this._invalidationContext, ...e3 }), this._invalidationContext = null, !this.layout || !this._collection || this._scrollAnimation) return;
      let t3 = this._getScrollAnchor();
      "function" == typeof e3.beforeLayout && e3.beforeLayout(), this.layout.validate(e3), this._setContentSize(this.layout.getContentSize()), "function" == typeof e3.afterLayout && e3.afterLayout();
      let r2 = this.getVisibleRect(), n2 = this._restoreScrollAnchor(t3, e3), i3 = e3.contentChanged ? 0 : n2.x, o3 = e3.contentChanged ? 0 : n2.y;
      i3 = Math.max(0, Math.min(this.contentSize.width - r2.width, i3)), o3 = Math.max(0, Math.min(this.contentSize.height - r2.height, o3));
      let s2 = false;
      if (i3 !== r2.x || o3 !== r2.y ? e3.animated || !this._animatedContentOffset.isOrigin() ? (this._animatedContentOffset.x += r2.x - i3, this._animatedContentOffset.y += r2.y - o3, s2 = this.updateSubviews(e3.contentChanged)) : this._setContentOffset(new wc(i3, o3)) : s2 = this.updateSubviews(e3.contentChanged), e3.transaction && e3.animated || this._applyLayoutInfos(), e3.animated && s2) return this._enableTransitions(), void setTimeout(() => {
        if (this._disableTransitions(), !this._animatedContentOffset.isOrigin()) {
          let { x: e4, y: t4 } = this.getVisibleRect();
          this._resetAnimatedContentOffset(), this._setContentOffset(new wc(e4, t4));
        }
        "function" == typeof e3.afterAnimation && e3.afterAnimation();
      }, this.transitionDuration + 100);
      "function" == typeof e3.afterAnimation && e3.afterAnimation();
    }
    _correctItemOrder() {
      if (!this._isScrolling && !this._transaction) for (let e3 of this._visibleLayoutInfos.keys()) {
        let t3 = this._visibleViews.get(e3);
        this._children.delete(t3), this._children.add(t3);
      }
    }
    _enableTransitions() {
      this.delegate.beginAnimations();
    }
    _disableTransitions() {
      this.delegate.endAnimations();
    }
    _getScrollAnchor() {
      if (!this.anchorScrollPosition) return null;
      let e3 = this.getVisibleRect();
      if (this.delegate.getScrollAnchor) {
        let t4 = this.delegate.getScrollAnchor(e3);
        if (null != t4) {
          let r2 = this.layout.getLayoutInfo(t4), n2 = r2.rect.getCornerInRect(e3);
          if (n2) return { key: r2.key, layoutInfo: r2, corner: n2, offset: r2.rect[n2].y - e3.y };
        }
      }
      if (0 === e3.y && !this.anchorScrollPositionAtTop) return null;
      let t3 = null;
      for (let [r2, n2] of this._visibleViews) {
        let i3 = n2.layoutInfo;
        if (i3 && i3.rect.area > 0) {
          let n3 = i3.rect.getCornerInRect(e3);
          if (n3) {
            let o3 = i3.rect[n3].y - e3.y;
            (!t3 || o3 < t3.offset) && (t3 = { key: r2, layoutInfo: i3, corner: n3, offset: o3 });
          }
        }
      }
      return t3;
    }
    _restoreScrollAnchor(e3, t3) {
      let r2 = this.getVisibleRect();
      if (e3) {
        var n2;
        let i3 = (null === (n2 = t3.transaction) || void 0 === n2 ? void 0 : n2.animated) ? t3.transaction.finalMap.get(e3.key) : this.layout.getLayoutInfo(e3.layoutInfo.key);
        if (i3) {
          let t4 = i3.rect[e3.corner].y - r2.y - e3.offset;
          r2.y += t4;
        }
      }
      return r2;
    }
    getVisibleRect() {
      let e3 = this.visibleRect, t3 = e3.x - this._animatedContentOffset.x, r2 = e3.y - this._animatedContentOffset.y;
      return new Cc(t3, r2, e3.width, e3.height);
    }
    getVisibleLayoutInfos() {
      let e3;
      return Object.getOwnPropertyNames(window.HTMLElement.prototype).includes("clientWidth"), Object.getOwnPropertyNames(window.HTMLElement.prototype).includes("clientHeight"), e3 = this.shouldOverscan ? this._overscanManager.getOverscannedRect() : this.getVisibleRect(), this._visibleLayoutInfos = this._getLayoutInfoMap(e3), this._visibleLayoutInfos;
    }
    _getLayoutInfoMap(e3, t3 = false) {
      let r2 = this.layout.getVisibleLayoutInfos(e3), n2 = /* @__PURE__ */ new Map();
      for (let e4 of r2) t3 && (e4 = e4.copy()), n2.set(e4.key, e4);
      return n2;
    }
    updateSubviews(e3 = false) {
      if (!this._collection) return;
      let t3, r2, n2, i3 = this.getVisibleLayoutInfos(), o3 = this._visibleViews;
      if (e3) t3 = i3, r2 = o3, n2 = /* @__PURE__ */ new Set();
      else {
        ({ toAdd: t3, toRemove: r2, toUpdate: n2 } = function(e4, t4) {
          let r3 = Eu(e4, t4), n3 = Eu(t4, e4), i4 = /* @__PURE__ */ new Set();
          for (let r4 of e4.keys()) t4.has(r4) && i4.add(r4);
          return { toRemove: r3, toAdd: n3, toUpdate: i4 };
        }(o3, i3));
        for (let e4 of n2) {
          let s3 = o3.get(e4);
          if (!s3 || !s3.layoutInfo) continue;
          let a3 = this.getItem(i3.get(e4).key);
          if (s3.content === a3) n2.delete(e4);
          else {
            let { reuseType: i4 } = this._getReuseType(s3.layoutInfo, a3);
            s3.viewType !== i4 && (n2.delete(e4), t3.add(e4), r2.add(e4));
          }
        }
        if (0 === t3.size && 0 === r2.size && 0 === n2.size) return void (this._transaction && this._applyLayoutInfos());
      }
      let s2 = /* @__PURE__ */ new Set();
      for (let e4 of r2.keys()) {
        let t4 = this._visibleViews.get(e4);
        t4 && (s2.add(t4), this._visibleViews.delete(e4), this._transaction ? this._transaction.toRemove.set(e4, t4) : this.reuseView(t4));
      }
      for (let e4 of t3.keys()) {
        let t4, r3 = i3.get(e4);
        this._transaction && (this._transaction.initialLayoutInfo.has(e4) && (r3 = this._transaction.initialLayoutInfo.get(e4)), t4 = this._transaction.toRemove.get(e4), t4 && (this._transaction.toRemove.delete(e4), this._applyLayoutInfo(t4, r3))), t4 || (t4 = this.getReusableView(r3), s2.has(t4) || this._children.add(t4)), this._visibleViews.set(e4, t4), s2.delete(t4);
      }
      for (let e4 of n2) {
        let t4 = o3.get(e4);
        this._renderedContent.delete(e4), this._renderView(t4);
      }
      this._transaction || this.removeViews(s2), this._correctItemOrder(), this._flushVisibleViews();
      let a2 = this._transaction && (t3.size > 0 || r2.size > 0 || this._hasLayoutUpdates());
      return a2 && requestAnimationFrame(() => {
        this._transaction && requestAnimationFrame(() => this._applyLayoutInfos());
      }), a2;
    }
    afterRender() {
      this._transactionQueue.length > 0 ? this._processTransactionQueue() : this._invalidationContext && this.relayoutNow(), this.shouldOverscan && this._overscanManager.collectMetrics();
    }
    _flushVisibleViews() {
      let e3 = /* @__PURE__ */ new Map([[null, []]]);
      for (let s3 of this._children) {
        var t3, r2, n2, i3, o3;
        null == (null === (t3 = s3.layoutInfo) || void 0 === t3 ? void 0 : t3.parentKey) || e3.has(s3.layoutInfo.parentKey) || e3.set(s3.layoutInfo.parentKey, []), null === (r2 = e3.get(null === (n2 = s3.layoutInfo) || void 0 === n2 ? void 0 : n2.parentKey)) || void 0 === r2 || r2.push(s3), e3.has(null === (i3 = s3.layoutInfo) || void 0 === i3 ? void 0 : i3.key) || e3.set(null === (o3 = s3.layoutInfo) || void 0 === o3 ? void 0 : o3.key, []);
      }
      let s2 = (t4, r3) => r3.map((r4) => {
        let n3 = e3.get(r4.layoutInfo.key);
        return this.delegate.renderWrapper(t4, r4, n3, (e4) => s2(r4, e4));
      }), a2 = s2(null, e3.get(null));
      this.delegate.setVisibleViews(a2);
    }
    _applyLayoutInfo(e3, t3) {
      return e3.layoutInfo !== t3 && (e3.layoutInfo = t3, true);
    }
    _applyLayoutInfos() {
      let e3 = false;
      for (let t3 of this._visibleViews.values()) {
        let r2 = t3.layoutInfo;
        if (null != (null == r2 ? void 0 : r2.key)) {
          let n2 = this.layout.getLayoutInfo(r2.key);
          this._applyLayoutInfo(t3, n2) && (e3 = true);
        }
      }
      if (this._transaction) {
        for (let t3 of this._transaction.toRemove.values()) {
          let r2 = t3.layoutInfo;
          if (null != (null == r2 ? void 0 : r2.key)) {
            let n2 = this.layout.getLayoutInfo(r2.key);
            this._applyLayoutInfo(t3, n2) && (e3 = true);
          }
        }
        for (let t3 of this._transaction.removed.values()) {
          let r2 = t3.layoutInfo, n2 = this._transaction.finalLayoutInfo.get(r2.key) || r2;
          n2 = this.layout.getFinalLayoutInfo(n2.copy()), this._applyLayoutInfo(t3, n2) && (e3 = true);
        }
      }
      e3 && this._flushVisibleViews();
    }
    _hasLayoutUpdates() {
      if (!this._transaction) return false;
      for (let e3 of this._visibleViews.values()) {
        let t3 = e3.layoutInfo;
        if (!t3) return true;
        let r2 = this.layout.getLayoutInfo(t3.key);
        if (!t3.rect.equals(r2.rect) || t3.opacity !== r2.opacity || t3.transform !== r2.transform) return true;
      }
      return false;
    }
    reuseView(e3) {
      e3.prepareForReuse(), this._reusableViews[e3.viewType].push(e3);
    }
    removeViews(e3) {
      for (let t3 of e3) this._children.delete(t3);
    }
    updateItemSize(e3, t3) {
      this.layout.updateItemSize && (this._scrollAnimation ? this._sizeUpdateQueue.set(e3, t3) : this.layout.updateItemSize(e3, t3) && this.relayout());
    }
    startScrolling() {
      this._isScrolling = true;
    }
    endScrolling() {
      this._isScrolling = false, this._correctItemOrder(), this._flushVisibleViews();
    }
    _resetAnimatedContentOffset() {
      this._animatedContentOffset.isOrigin() || (this._animatedContentOffset = new wc(0, 0), this._applyLayoutInfos());
    }
    scrollToItem(e3, t3) {
      if (null == e3) return;
      let r2 = this.layout.getLayoutInfo(e3);
      if (!r2) return;
      let { duration: n2 = 300, shouldScrollX: i3 = true, shouldScrollY: o3 = true, offsetX: s2 = 0, offsetY: a2 = 0 } = t3, l2 = this.visibleRect.x, c2 = this.visibleRect.y, u2 = r2.rect.x - s2, d2 = r2.rect.y - a2, p2 = l2 + this.visibleRect.width, f2 = c2 + this.visibleRect.height;
      return i3 && (u2 <= l2 || 0 === p2 ? l2 = u2 : r2.rect.maxX > p2 && (l2 += r2.rect.maxX - p2)), o3 && (d2 <= c2 || 0 === f2 ? c2 = d2 : r2.rect.maxY > f2 && (c2 += r2.rect.maxY - f2)), this.scrollTo(new wc(l2, c2), n2);
    }
    scrollTo(e3, t3 = 300) {
      return this._scrollAnimation && (this._scrollAnimation.cancel(), this._scrollAnimation = null), t3 <= 0 || this.visibleRect.pointEquals(e3) ? (this._setContentOffset(e3), Promise.resolve()) : (this.startScrolling(), this._scrollAnimation = function(e4, t4, r2, n2, i3) {
        let o3, s2 = false, a2 = new Promise((a3) => {
          let l2 = vu(), c2 = t4.x - e4.x, u2 = t4.y - e4.y;
          o3 = requestAnimationFrame(function d2(p2) {
            null == hu && (hu = p2 > 1e12 != vu() > 1e12), hu && (p2 = vu());
            let f2 = p2 - l2;
            f2 > r2 ? (i3(t4), a3()) : false === i3(new wc(e4.x + c2 * n2(f2 / r2), e4.y + u2 * n2(f2 / r2))) || s2 || (o3 = requestAnimationFrame(d2));
          });
        });
        return a2.cancel = function() {
          s2 = true, cancelAnimationFrame(o3);
        }, a2;
      }(this.visibleRect, e3, t3, bu, (e4) => {
        this._setContentOffset(e4);
      }), this._scrollAnimation.then(() => {
        this._scrollAnimation = null;
        for (let [e4, t4] of this._sizeUpdateQueue) this.updateItemSize(e4, t4);
        this._sizeUpdateQueue.clear(), this.relayout(), this._processTransactionQueue(), this.endScrolling();
      }), this._scrollAnimation);
    }
    _runTransaction(e3, t3) {
      this._startTransaction(), this._nextTransaction && this._nextTransaction.actions.push(e3), this._endTransaction(t3);
    }
    _startTransaction() {
      this._nextTransaction || (this._nextTransaction = new wu()), this._nextTransaction.level++;
    }
    _endTransaction(e3) {
      return !(!this._nextTransaction || (null != e3 && (this._nextTransaction.animated = e3), --this._nextTransaction.level > 0 || (0 === this._nextTransaction.actions.length ? (this._nextTransaction = null, 1) : (null == this._nextTransaction.animated && (this._nextTransaction.animated = true), this._transactionQueue.push(this._nextTransaction), this._nextTransaction = null, 0))));
    }
    _processTransactionQueue() {
      if (this._transaction || this._scrollAnimation) return;
      let e3 = this._transactionQueue.shift();
      e3 && this._performTransaction(e3);
    }
    _getContentRect() {
      return new Cc(0, 0, this.contentSize.width, this.contentSize.height);
    }
    _performTransaction(e3) {
      this._transaction = e3, this.relayoutNow({ transaction: e3, animated: e3.animated, beforeLayout: () => {
        e3.animated && (e3.initialMap = this._getLayoutInfoMap(this._getContentRect(), true));
        for (let t3 of e3.actions) t3();
      }, afterLayout: () => {
        e3.animated ? (e3.finalMap = this._getLayoutInfoMap(this._getContentRect()), this._setupTransactionAnimations(e3)) : this._transaction = null;
      }, afterAnimation: () => {
        if (e3.toRemove.size > 0 || e3.removed.size > 0) for (let t3 of function* (...e4) {
          for (let t4 of e4) yield* t4;
        }(e3.toRemove.values(), e3.removed.values())) this._children.delete(t3), this.reuseView(t3);
        this._transaction = null, this._correctItemOrder(), this._flushVisibleViews(), this._processTransactionQueue();
      } });
    }
    _setupTransactionAnimations(e3) {
      let { initialMap: t3, finalMap: r2 } = e3;
      for (let [n2, i3] of t3) r2.has(n2) ? e3.initialLayoutInfo.set(n2, i3) : e3.finalLayoutInfo.set(i3.key, i3);
      for (let [n2, i3] of r2) if (!t3.has(n2)) {
        let t4 = this.layout.getInitialLayoutInfo(i3.copy());
        e3.initialLayoutInfo.set(n2, t4);
      }
      for (let [t4, n2] of this._visibleViews) !r2.has(t4) && n2.layoutInfo.rect.width > 0 && (e3.removed.set(t4, n2), this._visibleViews.delete(t4), n2.layoutInfo && (e3.finalLayoutInfo.has(n2.layoutInfo.key) || e3.finalLayoutInfo.set(n2.layoutInfo.key, n2.layoutInfo)));
    }
    constructor(e3 = {}) {
      var t3;
      this._contentSize = new ql(), this._visibleRect = new Cc(), this._reusableViews = {}, this._visibleLayoutInfos = /* @__PURE__ */ new Map(), this._visibleViews = /* @__PURE__ */ new Map(), this._renderedContent = /* @__PURE__ */ new WeakMap(), this._children = /* @__PURE__ */ new Set(), this._invalidationContext = null, this._overscanManager = new Tu(), this._persistedKeys = /* @__PURE__ */ new Set(), this._scrollAnimation = null, this._isScrolling = false, this._sizeUpdateQueue = /* @__PURE__ */ new Map(), this._animatedContentOffset = new wc(0, 0), this._transaction = null, this._nextTransaction = null, this._transactionQueue = [], this.transitionDuration = null !== (t3 = e3.transitionDuration) && void 0 !== t3 ? t3 : 500, this.anchorScrollPosition = e3.anchorScrollPosition || false, this.anchorScrollPositionAtTop = e3.anchorScrollPositionAtTop || false, this.shouldOverscan = false !== e3.shouldOverscan;
      for (let t4 of ["delegate", "size", "layout", "collection"]) e3[t4] && (this[t4] = e3[t4]);
    }
  }
  function xu(t3, r2) {
    let { children: n2, renderWrapper: i3, layout: o3, collection: s2, sizeToFit: l2, scrollDirection: c2, transitionDuration: u2, isLoading: d2, onLoadMore: p2, focusedKey: f2, shouldUseVirtualFocus: m2, scrollToItem: h2, autoFocus: g2, ...y2 } = t3, v2 = (0, e2.useRef)();
    r2 = r2 || v2;
    let b2 = function(t4) {
      let [r3, n3] = (0, e2.useState)([]), [i4, o4] = (0, e2.useState)(new ql()), [s3, l3] = (0, e2.useState)(false), [c3, u3] = (0, e2.useState)(false), d3 = (0, e2.useMemo)(() => new Cu(), []);
      d3.delegate = { setVisibleViews: n3, setVisibleRect(e3) {
        d3.visibleRect = e3, t4.onVisibleRectChange(e3);
      }, setContentSize: o4, renderView: t4.renderView, renderWrapper: t4.renderWrapper, beginAnimations: () => l3(true), endAnimations: () => l3(false), getScrollAnchor: t4.getScrollAnchor }, d3.layout = t4.layout, d3.collection = t4.collection, d3.transitionDuration = t4.transitionDuration, a(() => {
        d3.afterRender();
      }), (0, e2.useEffect)(() => () => d3.willUnmount(), []);
      let p3 = (0, e2.useCallback)((e3) => {
        d3.visibleRect = e3;
      }, [d3]), f3 = (0, e2.useCallback)(() => {
        d3.startScrolling(), u3(true);
      }, [d3]), m3 = (0, e2.useCallback)(() => {
        d3.endScrolling(), u3(false);
      }, [d3]);
      return (0, e2.useMemo)(() => ({ virtualizer: d3, visibleViews: r3, setVisibleRect: p3, contentSize: i4, isAnimating: s3, isScrolling: c3, startScrolling: f3, endScrolling: m3 }), [d3, r3, p3, i4, s3, c3, f3, m3]);
    }({ transitionDuration: u2, layout: o3, collection: s2, renderView: n2, renderWrapper: i3 || Iu, onVisibleRectChange(e3) {
      r2.current.scrollLeft = e3.x, r2.current.scrollTop = e3.y;
    } }), { virtualizerProps: E2, scrollViewProps: _2 } = function(t4, r3, n3) {
      let { focusedKey: i4, scrollToItem: o4, shouldUseVirtualFocus: s3, isLoading: l3, onLoadMore: c3 } = t4, { virtualizer: u3 } = r3, d3 = (0, e2.useRef)(null), p3 = (0, e2.useRef)(false), f3 = (0, e2.useRef)(t4.autoFocus);
      (0, e2.useEffect)(() => {
        if (0 === u3.visibleRect.height) return;
        let e3 = wt();
        i4 === d3.current || "pointer" === e3 && !f3.current || (f3.current = false, o4 ? o4(i4) : u3.scrollToItem(i4, { duration: 0 })), d3.current = i4;
      }, [i4, u3.visibleRect.height, u3, d3, o4, n3]), u3.persistedKeys = (0, e2.useMemo)(() => i4 ? /* @__PURE__ */ new Set([i4]) : /* @__PURE__ */ new Set(), [i4]);
      let m3, h3 = (0, e2.useCallback)((e3) => {
        let t5 = wt();
        !p3.current && n3.current.contains(e3.target) && "pointer" !== t5 && (o4 ? o4(i4) : u3.scrollToItem(i4, { duration: 0 })), p3.current = e3.target !== n3.current;
      }, [n3, u3, i4, o4]), g3 = (0, e2.useCallback)((e3) => {
        p3.current = n3.current.contains(e3.relatedTarget);
      }, [n3]);
      s3 || (m3 = null != i4 ? -1 : 0, 0 === u3.collection.size && null != t4.tabIndex && (m3 = t4.tabIndex));
      let y3 = (0, e2.useRef)(l3), v3 = (0, e2.useRef)(t4), b3 = (0, e2.useCallback)((e3) => {
        if (r3.setVisibleRect(e3), !y3.current && c3) {
          let t5 = r3.virtualizer.contentSize.height - 2 * e3.height;
          e3.y > t5 && (y3.current = true, c3());
        }
      }, [c3, r3]), E3 = (0, e2.useRef)(0);
      return a(() => {
        if (r3.isAnimating) return;
        let e3 = y3.current;
        t4 !== v3.current && (y3.current = l3, v3.current = t4), !y3.current && c3 && r3.contentSize.height > 0 && r3.contentSize.height <= r3.virtualizer.visibleRect.height && (e3 || r3.contentSize.height !== E3.current) && (y3.current = true, c3()), E3.current = r3.contentSize.height;
      }, [r3.contentSize, r3.isAnimating, r3.virtualizer, l3, c3, t4]), { virtualizerProps: { tabIndex: m3, onFocus: h3, onBlur: g3 }, scrollViewProps: { onVisibleRectChange: b3 } };
    }(t3, b2, r2);
    return e2.createElement(mu, { ...C(y2, E2, _2), ref: r2, innerStyle: b2.isAnimating ? { transition: `none ${b2.virtualizer.transitionDuration}ms` } : void 0, contentSize: b2.contentSize, onScrollStart: b2.startScrolling, onScrollEnd: b2.endScrolling, sizeToFit: l2, scrollDirection: c2 }, b2.visibleViews);
  }
  const Ou = e2.forwardRef(xu);
  function Iu(t3, r2) {
    return e2.createElement(Yl, { key: r2.key, layoutInfo: r2.layoutInfo, virtualizer: r2.virtualizer, parent: null == t3 ? void 0 : t3.layoutInfo }, r2.rendered);
  }
  function Ru(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function Au(t3, r2) {
    let { scale: n2 } = Vn(), i3 = Zs({ usage: "search", sensitivity: "base" }), o3 = (0, e2.useMemo)(() => new Oc({ estimatedRowHeight: "large" === n2 ? 48 : 32, estimatedHeadingHeight: "large" === n2 ? 33 : 26, padding: "large" === n2 ? 5 : 4, loaderHeight: 40, placeholderHeight: "large" === n2 ? 48 : 32, collator: i3 }), [i3, n2]);
    return o3.collection = t3.collection, o3.disabledKeys = t3.disabledKeys, a(() => {
      var e3;
      o3.isLoading !== r2 && (o3.isLoading = r2, null === (e3 = o3.virtualizer) || void 0 === e3 || e3.relayoutNow());
    }, [o3, r2]), o3;
  }
  function Mu(t3, r2) {
    let { layout: n2, state: i3, shouldSelectOnPressUp: o3, focusOnPointerEnter: s2, shouldUseVirtualFocus: a2, domProps: l2 = {}, transitionDuration: c2 = 0, onScroll: u2 } = t3, { listBoxProps: d2 } = Sc({ ...t3, keyboardDelegate: n2, isVirtualized: true }, i3, r2), { styleProps: p2 } = se(t3), f2 = to(Ru(ba), "@react-spectrum/listbox");
    return e2.createElement(Ea.Provider, { value: i3 }, e2.createElement(nc, null, e2.createElement(Ou, { ...p2, ...C(d2, l2), ref: r2, focusedKey: i3.selectionManager.focusedKey, autoFocus: !!t3.autoFocus, sizeToFit: "height", scrollDirection: "vertical", className: Xe(Ru(Sl), "spectrum-Menu", p2.className), layout: n2, collection: i3.collection, renderWrapper: (t4, r3, n3, i4) => "section" === r3.viewType ? e2.createElement(Jl, { key: r3.key, item: r3.content, layoutInfo: r3.layoutInfo, virtualizer: r3.virtualizer, headerLayoutInfo: n3.find((e3) => "header" === e3.viewType).layoutInfo }, i4(n3.filter((e3) => "item" === e3.viewType))) : e2.createElement(Yl, { key: r3.key, layoutInfo: r3.layoutInfo, virtualizer: r3.virtualizer, parent: null == t4 ? void 0 : t4.layoutInfo }, r3.rendered), transitionDuration: c2, isLoading: t3.isLoading, onLoadMore: t3.onLoadMore, shouldUseVirtualFocus: a2, onScroll: u2 }, (r3, n3) => {
      if ("item" === r3) return e2.createElement(Gl, { item: n3, shouldSelectOnPressUp: o3, shouldFocusOnHover: s2, shouldUseVirtualFocus: a2 });
      if ("loader" === r3) return e2.createElement("div", { role: "option", style: { display: "flex", alignItems: "center", justifyContent: "center", height: "100%" } }, e2.createElement(cu, { isIndeterminate: true, size: "S", "aria-label": i3.collection.size > 0 ? f2.format("loadingMore") : f2.format("loading"), UNSAFE_className: Xe(Ru(Sl), "spectrum-Dropdown-progressCircle") }));
      if ("placeholder" === r3) {
        let r4 = t3.renderEmptyState ? t3.renderEmptyState() : null;
        return null == r4 ? null : e2.createElement("div", { role: "option" }, r4);
      }
    })));
  }
  const Lu = e2.forwardRef(Mu);
  function Nu(e3, t3) {
    return Nu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e4, t4) {
      return e4.__proto__ = t4, e4;
    }, Nu(e3, t3);
  }
  const Fu = t2().createContext(null);
  var ku = "unmounted", Du = "exited", Uu = "entering", ju = "entered", Bu = "exiting", Ku = function(e3) {
    var r2, n2;
    function i3(t3, r3) {
      var n3;
      n3 = e3.call(this, t3, r3) || this;
      var i4, o4 = r3 && !r3.isMounting ? t3.enter : t3.appear;
      return n3.appearStatus = null, t3.in ? o4 ? (i4 = Du, n3.appearStatus = Uu) : i4 = ju : i4 = t3.unmountOnExit || t3.mountOnEnter ? ku : Du, n3.state = { status: i4 }, n3.nextCallback = null, n3;
    }
    n2 = e3, (r2 = i3).prototype = Object.create(n2.prototype), r2.prototype.constructor = r2, Nu(r2, n2), i3.getDerivedStateFromProps = function(e4, t3) {
      return e4.in && t3.status === ku ? { status: Du } : null;
    };
    var o3 = i3.prototype;
    return o3.componentDidMount = function() {
      this.updateStatus(true, this.appearStatus);
    }, o3.componentDidUpdate = function(e4) {
      var t3 = null;
      if (e4 !== this.props) {
        var r3 = this.state.status;
        this.props.in ? r3 !== Uu && r3 !== ju && (t3 = Uu) : r3 !== Uu && r3 !== ju || (t3 = Bu);
      }
      this.updateStatus(false, t3);
    }, o3.componentWillUnmount = function() {
      this.cancelNextCallback();
    }, o3.getTimeouts = function() {
      var e4, t3, r3, n3 = this.props.timeout;
      return e4 = t3 = r3 = n3, null != n3 && "number" != typeof n3 && (e4 = n3.exit, t3 = n3.enter, r3 = void 0 !== n3.appear ? n3.appear : t3), { exit: e4, enter: t3, appear: r3 };
    }, o3.updateStatus = function(e4, t3) {
      if (void 0 === e4 && (e4 = false), null !== t3) if (this.cancelNextCallback(), t3 === Uu) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var r3 = this.props.nodeRef ? this.props.nodeRef.current : kn().findDOMNode(this);
          r3 && function(e5) {
            e5.scrollTop;
          }(r3);
        }
        this.performEnter(e4);
      } else this.performExit();
      else this.props.unmountOnExit && this.state.status === Du && this.setState({ status: ku });
    }, o3.performEnter = function(e4) {
      var t3 = this, r3 = this.props.enter, n3 = this.context ? this.context.isMounting : e4, i4 = this.props.nodeRef ? [n3] : [kn().findDOMNode(this), n3], o4 = i4[0], s2 = i4[1], a2 = this.getTimeouts(), l2 = n3 ? a2.appear : a2.enter;
      e4 || r3 ? (this.props.onEnter(o4, s2), this.safeSetState({ status: Uu }, function() {
        t3.props.onEntering(o4, s2), t3.onTransitionEnd(l2, function() {
          t3.safeSetState({ status: ju }, function() {
            t3.props.onEntered(o4, s2);
          });
        });
      })) : this.safeSetState({ status: ju }, function() {
        t3.props.onEntered(o4);
      });
    }, o3.performExit = function() {
      var e4 = this, t3 = this.props.exit, r3 = this.getTimeouts(), n3 = this.props.nodeRef ? void 0 : kn().findDOMNode(this);
      t3 ? (this.props.onExit(n3), this.safeSetState({ status: Bu }, function() {
        e4.props.onExiting(n3), e4.onTransitionEnd(r3.exit, function() {
          e4.safeSetState({ status: Du }, function() {
            e4.props.onExited(n3);
          });
        });
      })) : this.safeSetState({ status: Du }, function() {
        e4.props.onExited(n3);
      });
    }, o3.cancelNextCallback = function() {
      null !== this.nextCallback && (this.nextCallback.cancel(), this.nextCallback = null);
    }, o3.safeSetState = function(e4, t3) {
      t3 = this.setNextCallback(t3), this.setState(e4, t3);
    }, o3.setNextCallback = function(e4) {
      var t3 = this, r3 = true;
      return this.nextCallback = function(n3) {
        r3 && (r3 = false, t3.nextCallback = null, e4(n3));
      }, this.nextCallback.cancel = function() {
        r3 = false;
      }, this.nextCallback;
    }, o3.onTransitionEnd = function(e4, t3) {
      this.setNextCallback(t3);
      var r3 = this.props.nodeRef ? this.props.nodeRef.current : kn().findDOMNode(this), n3 = null == e4 && !this.props.addEndListener;
      if (r3 && !n3) {
        if (this.props.addEndListener) {
          var i4 = this.props.nodeRef ? [this.nextCallback] : [r3, this.nextCallback], o4 = i4[0], s2 = i4[1];
          this.props.addEndListener(o4, s2);
        }
        null != e4 && setTimeout(this.nextCallback, e4);
      } else setTimeout(this.nextCallback, 0);
    }, o3.render = function() {
      var e4 = this.state.status;
      if (e4 === ku) return null;
      var r3 = this.props, n3 = r3.children, i4 = (r3.in, r3.mountOnEnter, r3.unmountOnExit, r3.appear, r3.enter, r3.exit, r3.timeout, r3.addEndListener, r3.onEnter, r3.onEntering, r3.onEntered, r3.onExit, r3.onExiting, r3.onExited, r3.nodeRef, function(e5, t3) {
        if (null == e5) return {};
        var r4 = {};
        for (var n4 in e5) if (Object.prototype.hasOwnProperty.call(e5, n4)) {
          if (t3.indexOf(n4) >= 0) continue;
          r4[n4] = e5[n4];
        }
        return r4;
      }(r3, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]));
      return t2().createElement(Fu.Provider, { value: null }, "function" == typeof n3 ? n3(e4, i4) : t2().cloneElement(t2().Children.only(n3), i4));
    }, i3;
  }(t2().Component);
  function zu() {
  }
  Ku.contextType = Fu, Ku.propTypes = {}, Ku.defaultProps = { in: false, mountOnEnter: false, unmountOnExit: false, appear: false, enter: true, exit: true, onEnter: zu, onEntering: zu, onEntered: zu, onExit: zu, onExiting: zu, onExited: zu }, Ku.UNMOUNTED = ku, Ku.EXITED = Du, Ku.ENTERING = Uu, Ku.ENTERED = ju, Ku.EXITING = Bu;
  const Wu = Ku, Vu = { entering: false, entered: true };
  function Hu(t3) {
    return e2.createElement(Wu, { timeout: { enter: 0, exit: 350 }, ...t3 }, (r2) => e2.Children.map(t3.children, (t4) => t4 && e2.cloneElement(t4, { isOpen: !!Vu[r2] })));
  }
  const Gu = (0, e2.createContext)({});
  function qu(t3) {
    const r2 = (0, e2.useRef)(null);
    return (0, e2.useMemo)(() => ({ get current() {
      return r2.current;
    }, set current(e3) {
      r2.current = e3, "function" == typeof t3 ? t3(e3) : t3 && (t3.current = e3);
    } }), [t3]);
  }
  const $u = e2.forwardRef(({ children: t3, ...r2 }, n2) => {
    let i3 = (0, e2.useRef)(false), o3 = (0, e2.useContext)(Es);
    n2 = qu(n2 || (null == o3 ? void 0 : o3.ref));
    let s2 = C(o3 || {}, { ...r2, ref: n2, register() {
      i3.current = true, o3 && o3.register();
    } });
    return ds(o3, n2), (0, e2.useEffect)(() => {
      i3.current || (console.warn("A PressResponder was rendered without a pressable child. Either call the usePress hook, or wrap your DOM node with <Pressable> component."), i3.current = true);
    }, []), e2.createElement(Es.Provider, { value: s2 }, t3);
  });
  function Yu({ children: t3 }) {
    let r2 = (0, e2.useMemo)(() => ({ register: () => {
    } }), []);
    return e2.createElement(Es.Provider, { value: r2 }, t3);
  }
  const Xu = e2.createContext(null);
  function Qu(t3) {
    let r2 = v(), { portalContainer: n2 = r2 ? null : document.body, isExiting: i3 } = t3, [o3, s2] = (0, e2.useState)(false), a2 = (0, e2.useMemo)(() => ({ contain: o3, setContain: s2 }), [o3, s2]), { getContainer: l2 } = null !== (c2 = (0, e2.useContext)(Gu)) && void 0 !== c2 ? c2 : {};
    var c2;
    if (!t3.portalContainer && l2 && (n2 = l2()), !n2) return null;
    let u2 = t3.children;
    return t3.disableFocusManagement || (u2 = e2.createElement(nc, { restoreFocus: true, contain: o3 && !i3 }, u2)), u2 = e2.createElement(Xu.Provider, { value: a2 }, e2.createElement(Yu, null, u2)), Fn.createPortal(u2, n2);
  }
  function Zu() {
    let t3 = (0, e2.useContext)(Xu), r2 = null == t3 ? void 0 : t3.setContain;
    a(() => {
      null == r2 || r2(true);
    }, [r2]);
  }
  function Ju(t3, r2) {
    let { children: n2, isOpen: i3, disableFocusManagement: o3, container: s2, onEnter: a2, onEntering: l2, onEntered: c2, onExit: u2, onExiting: d2, onExited: p2, nodeRef: f2 } = t3, [m2, h2] = (0, e2.useState)(!i3), g2 = (0, e2.useCallback)(() => {
      h2(false), c2 && c2();
    }, [c2]), y2 = (0, e2.useCallback)(() => {
      h2(true), p2 && p2();
    }, [p2]);
    return i3 || !m2 ? e2.createElement(Qu, { portalContainer: s2, disableFocusManagement: o3, isExiting: !i3 }, e2.createElement(zn, { ref: r2, UNSAFE_style: { background: "transparent", isolation: "isolate" }, isDisabled: false }, e2.createElement(Hu, { in: i3, appear: true, onExit: u2, onExiting: d2, onExited: y2, onEnter: a2, onEntering: l2, onEntered: g2, nodeRef: f2 }, n2))) : null;
  }
  let ed = e2.forwardRef(Ju);
  function td(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(3156);
  var rd, nd, id, od, sd, ad, ld, cd, ud, dd = {};
  function pd(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  td(dd, "react-spectrum-Modal", () => rd, (e3) => rd = e3), td(dd, "react-spectrum-Modal-wrapper", () => nd, (e3) => nd = e3), td(dd, "react-spectrum-Popover", () => id, (e3) => id = e3), td(dd, "react-spectrum-Tray", () => od, (e3) => od = e3), td(dd, "spectrum-Dialog-content", () => sd, (e3) => sd = e3), td(dd, "spectrum-Modal", () => ad, (e3) => ad = e3), td(dd, "spectrum-Modal-wrapper", () => ld, (e3) => ld = e3), td(dd, "spectrum-Popover", () => cd, (e3) => cd = e3), td(dd, "spectrum-Tray", () => ud, (e3) => ud = e3), rd = "OhnpTq_react-spectrum-Modal", nd = "OhnpTq_react-spectrum-Modal-wrapper", id = "OhnpTq_react-spectrum-Popover", od = "OhnpTq_react-spectrum-Tray", sd = "OhnpTq_spectrum-Dialog-content", ad = "OhnpTq_spectrum-Modal", ld = "OhnpTq_spectrum-Modal-wrapper", cd = "OhnpTq_spectrum-Popover", ud = "OhnpTq_spectrum-Tray", r(3614);
  var fd, md, hd, gd, yd, vd, bd, Ed, _d, Td, Sd, Pd, wd, Cd, xd, Od = {};
  function Id(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  pd(Od, "focus-ring", () => fd, (e3) => fd = e3), pd(Od, "i18nFontFamily", () => md, (e3) => md = e3), pd(Od, "spectrum-overlay--open", () => hd, (e3) => hd = e3), pd(Od, "is-open", () => gd, (e3) => gd = e3), pd(Od, "spectrum-FocusRing-ring", () => yd, (e3) => yd = e3), pd(Od, "spectrum-FocusRing", () => vd, (e3) => vd = e3), pd(Od, "spectrum-FocusRing--quiet", () => bd, (e3) => bd = e3), pd(Od, "spectrum-overlay", () => Ed, (e3) => Ed = e3), pd(Od, "spectrum-Tray", () => _d, (e3) => _d = e3), pd(Od, "spectrum-Tray--fixedHeight", () => Td, (e3) => Td = e3), pd(Od, "spectrum-Tray-wrapper", () => Sd, (e3) => Sd = e3), pd(Od, "spectrum-overlay--bottom--open", () => Pd, (e3) => Pd = e3), pd(Od, "spectrum-overlay--left--open", () => wd, (e3) => wd = e3), pd(Od, "spectrum-overlay--right--open", () => Cd, (e3) => Cd = e3), pd(Od, "spectrum-overlay--top--open", () => xd, (e3) => xd = e3), fd = "UuxJvG_focus-ring", md = "UuxJvG_i18nFontFamily", gd = "UuxJvG_is-open " + (hd = "UuxJvG_spectrum-overlay--open"), vd = "UuxJvG_spectrum-FocusRing " + (yd = "UuxJvG_spectrum-FocusRing-ring"), bd = "UuxJvG_spectrum-FocusRing--quiet", _d = "UuxJvG_spectrum-Tray " + (Ed = "UuxJvG_spectrum-overlay"), Td = "UuxJvG_spectrum-Tray--fixedHeight", Sd = "UuxJvG_spectrum-Tray-wrapper", Pd = "UuxJvG_spectrum-overlay--bottom--open", wd = "UuxJvG_spectrum-overlay--left--open", Cd = "UuxJvG_spectrum-overlay--right--open", xd = "UuxJvG_spectrum-overlay--top--open", r(2810);
  var Rd, Ad, Md, Ld, Nd, Fd, kd, Dd, Ud, jd, Bd, Kd, zd, Wd, Vd = {};
  function Hd({ isOpen: t3, isTransparent: r2, ...n2 }) {
    return e2.createElement("div", { "data-testid": "underlay", ...n2, className: Xe((i3 = Vd, i3 && i3.__esModule ? i3.default : i3), "spectrum-Underlay", { "is-open": t3, "spectrum-Underlay--transparent": r2 }) });
    var i3;
  }
  Id(Vd, "focus-ring", () => Rd, (e3) => Rd = e3), Id(Vd, "i18nFontFamily", () => Ad, (e3) => Ad = e3), Id(Vd, "spectrum-overlay--open", () => Md, (e3) => Md = e3), Id(Vd, "is-open", () => Ld, (e3) => Ld = e3), Id(Vd, "spectrum-FocusRing-ring", () => Nd, (e3) => Nd = e3), Id(Vd, "spectrum-FocusRing", () => Fd, (e3) => Fd = e3), Id(Vd, "spectrum-FocusRing--quiet", () => kd, (e3) => kd = e3), Id(Vd, "spectrum-overlay", () => Dd, (e3) => Dd = e3), Id(Vd, "spectrum-Underlay", () => Ud, (e3) => Ud = e3), Id(Vd, "spectrum-Underlay--transparent", () => jd, (e3) => jd = e3), Id(Vd, "spectrum-overlay--bottom--open", () => Bd, (e3) => Bd = e3), Id(Vd, "spectrum-overlay--left--open", () => Kd, (e3) => Kd = e3), Id(Vd, "spectrum-overlay--right--open", () => zd, (e3) => zd = e3), Id(Vd, "spectrum-overlay--top--open", () => Wd, (e3) => Wd = e3), Rd = "F-oYUa_focus-ring", Ad = "F-oYUa_i18nFontFamily", Ld = "F-oYUa_is-open " + (Md = "F-oYUa_spectrum-overlay--open"), Fd = "F-oYUa_spectrum-FocusRing " + (Nd = "F-oYUa_spectrum-FocusRing-ring"), kd = "F-oYUa_spectrum-FocusRing--quiet", Ud = "F-oYUa_spectrum-Underlay " + (Dd = "F-oYUa_spectrum-overlay"), jd = "F-oYUa_spectrum-Underlay--transparent", Bd = "F-oYUa_spectrum-overlay--bottom--open", Kd = "F-oYUa_spectrum-overlay--left--open", zd = "F-oYUa_spectrum-overlay--right--open", Wd = "F-oYUa_spectrum-overlay--top--open";
  let Gd = /* @__PURE__ */ new WeakMap(), qd = [];
  function $d(e3, t3 = document.body) {
    let r2 = new Set(e3), n2 = /* @__PURE__ */ new Set(), i3 = (e4) => {
      for (let t5 of e4.querySelectorAll("[data-live-announcer], [data-react-aria-top-layer]")) r2.add(t5);
      let t4 = (e5) => {
        if (r2.has(e5) || n2.has(e5.parentElement) && "row" !== e5.parentElement.getAttribute("role")) return NodeFilter.FILTER_REJECT;
        for (let t5 of r2) if (e5.contains(t5)) return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      }, i4 = document.createTreeWalker(e4, NodeFilter.SHOW_ELEMENT, { acceptNode: t4 }), s3 = t4(e4);
      if (s3 === NodeFilter.FILTER_ACCEPT && o3(e4), s3 !== NodeFilter.FILTER_REJECT) {
        let e5 = i4.nextNode();
        for (; null != e5; ) o3(e5), e5 = i4.nextNode();
      }
    }, o3 = (e4) => {
      var t4;
      let r3 = null !== (t4 = Gd.get(e4)) && void 0 !== t4 ? t4 : 0;
      "true" === e4.getAttribute("aria-hidden") && 0 === r3 || (0 === r3 && e4.setAttribute("aria-hidden", "true"), n2.add(e4), Gd.set(e4, r3 + 1));
    };
    qd.length && qd[qd.length - 1].disconnect(), i3(t3);
    let s2 = new MutationObserver((e4) => {
      for (let t4 of e4) if ("childList" === t4.type && 0 !== t4.addedNodes.length && ![...r2, ...n2].some((e5) => e5.contains(t4.target))) {
        for (let e5 of t4.removedNodes) e5 instanceof Element && (r2.delete(e5), n2.delete(e5));
        for (let e5 of t4.addedNodes) !(e5 instanceof HTMLElement || e5 instanceof SVGElement) || "true" !== e5.dataset.liveAnnouncer && "true" !== e5.dataset.reactAriaTopLayer ? e5 instanceof Element && i3(e5) : r2.add(e5);
      }
    });
    s2.observe(t3, { childList: true, subtree: true });
    let a2 = { observe() {
      s2.observe(t3, { childList: true, subtree: true });
    }, disconnect() {
      s2.disconnect();
    } };
    return qd.push(a2), () => {
      s2.disconnect();
      for (let e4 of n2) {
        let t4 = Gd.get(e4);
        1 === t4 ? (e4.removeAttribute("aria-hidden"), Gd.delete(e4)) : Gd.set(e4, t4 - 1);
      }
      a2 === qd[qd.length - 1] ? (qd.pop(), qd.length && qd[qd.length - 1].observe()) : qd.splice(qd.indexOf(a2), 1);
    };
  }
  function Yd(e3, t3) {
    if (e3.button > 0) return false;
    if (e3.target) {
      const t4 = e3.target.ownerDocument;
      if (!t4 || !t4.documentElement.contains(e3.target)) return false;
      if (e3.target.closest("[data-react-aria-top-layer]")) return false;
    }
    return t3.current && !t3.current.contains(e3.target);
  }
  const Xd = [];
  function Qd(t3, r2) {
    let { onClose: n2, shouldCloseOnBlur: i3, isOpen: o3, isDismissable: s2 = false, isKeyboardDismissDisabled: a2 = false, shouldCloseOnInteractOutside: c2 } = t3;
    (0, e2.useEffect)(() => (o3 && Xd.push(r2), () => {
      let e3 = Xd.indexOf(r2);
      e3 >= 0 && Xd.splice(e3, 1);
    }), [o3, r2]);
    let u2 = () => {
      Xd[Xd.length - 1] === r2 && n2 && n2();
    };
    !function(t4) {
      let { ref: r3, onInteractOutside: n3, isDisabled: i4, onInteractOutsideStart: o4 } = t4, s3 = (0, e2.useRef)({ isPointerDown: false, ignoreEmulatedMouseEvents: false }), a3 = l((e3) => {
        n3 && Yd(e3, r3) && (o4 && o4(e3), s3.current.isPointerDown = true);
      }), c3 = l((e3) => {
        n3 && n3(e3);
      });
      (0, e2.useEffect)(() => {
        let e3 = s3.current;
        if (i4) return;
        const t5 = r3.current, n4 = lt(t5);
        if ("undefined" != typeof PointerEvent) {
          let t6 = (t7) => {
            e3.isPointerDown && Yd(t7, r3) && c3(t7), e3.isPointerDown = false;
          };
          return n4.addEventListener("pointerdown", a3, true), n4.addEventListener("pointerup", t6, true), () => {
            n4.removeEventListener("pointerdown", a3, true), n4.removeEventListener("pointerup", t6, true);
          };
        }
        {
          let t6 = (t7) => {
            e3.ignoreEmulatedMouseEvents ? e3.ignoreEmulatedMouseEvents = false : e3.isPointerDown && Yd(t7, r3) && c3(t7), e3.isPointerDown = false;
          }, i5 = (t7) => {
            e3.ignoreEmulatedMouseEvents = true, e3.isPointerDown && Yd(t7, r3) && c3(t7), e3.isPointerDown = false;
          };
          return n4.addEventListener("mousedown", a3, true), n4.addEventListener("mouseup", t6, true), n4.addEventListener("touchstart", a3, true), n4.addEventListener("touchend", i5, true), () => {
            n4.removeEventListener("mousedown", a3, true), n4.removeEventListener("mouseup", t6, true), n4.removeEventListener("touchstart", a3, true), n4.removeEventListener("touchend", i5, true);
          };
        }
      }, [r3, i4, a3, c3]);
    }({ ref: r2, onInteractOutside: s2 && o3 ? (e3) => {
      c2 && !c2(e3.target) || (Xd[Xd.length - 1] === r2 && (e3.stopPropagation(), e3.preventDefault()), u2());
    } : null, onInteractOutsideStart: (e3) => {
      c2 && !c2(e3.target) || Xd[Xd.length - 1] === r2 && (e3.stopPropagation(), e3.preventDefault());
    } });
    let { focusWithinProps: d2 } = At({ isDisabled: !i3, onBlurWithin: (e3) => {
      e3.relatedTarget && !dc(e3.relatedTarget, rc) && (c2 && !c2(e3.relatedTarget) || n2());
    } });
    return { overlayProps: { onKeyDown: (e3) => {
      "Escape" !== e3.key || a2 || e3.nativeEvent.isComposing || (e3.stopPropagation(), e3.preventDefault(), u2());
    }, ...d2 }, underlayProps: { onPointerDown: (e3) => {
      e3.target === e3.currentTarget && e3.preventDefault();
    } } };
  }
  function Zd(e3, t3) {
    let r2 = e3;
    for (qs(r2, t3) && (r2 = r2.parentElement); r2 && !qs(r2, t3); ) r2 = r2.parentElement;
    return r2 || document.scrollingElement || document.documentElement;
  }
  const Jd = "undefined" != typeof document && window.visualViewport, ep = /* @__PURE__ */ new Set(["checkbox", "radio", "range", "color", "file", "image", "button", "submit", "reset"]);
  let tp, rp = 0;
  function np(e3 = {}) {
    let { isDisabled: t3 } = e3;
    a(() => {
      if (!t3) return rp++, 1 === rp && (tp = rt() ? function() {
        let e4, t4, r2 = null, n2 = () => {
          if (r2) return;
          let e5 = window.pageXOffset, t5 = window.pageYOffset;
          r2 = s(op(window, "scroll", () => {
            window.scrollTo(0, 0);
          }), ip(document.documentElement, "paddingRight", window.innerWidth - document.documentElement.clientWidth + "px"), ip(document.documentElement, "overflow", "hidden"), ip(document.body, "marginTop", `-${t5}px`), () => {
            window.scrollTo(e5, t5);
          }), window.scrollTo(0, 0);
        }, i3 = s(op(document, "touchstart", (r3) => {
          e4 = Zd(r3.target, true), e4 === document.documentElement && e4 === document.body || e4 instanceof HTMLElement && "auto" === window.getComputedStyle(e4).overscrollBehavior && (t4 = ip(e4, "overscrollBehavior", "contain"));
        }, { passive: false, capture: true }), op(document, "touchmove", (t5) => {
          e4 && e4 !== document.documentElement && e4 !== document.body ? e4.scrollHeight === e4.clientHeight && e4.scrollWidth === e4.clientWidth && t5.preventDefault() : t5.preventDefault();
        }, { passive: false, capture: true }), op(document, "touchend", (e5) => {
          let r3 = e5.target;
          ap(r3) && r3 !== document.activeElement && (e5.preventDefault(), n2(), r3.style.transform = "translateY(-2000px)", r3.focus(), requestAnimationFrame(() => {
            r3.style.transform = "";
          })), t4 && t4();
        }, { passive: false, capture: true }), op(document, "focus", (e5) => {
          let t5 = e5.target;
          ap(t5) && (n2(), t5.style.transform = "translateY(-2000px)", requestAnimationFrame(() => {
            t5.style.transform = "", Jd && (Jd.height < window.innerHeight ? requestAnimationFrame(() => {
              sp(t5);
            }) : Jd.addEventListener("resize", () => sp(t5), { once: true }));
          }));
        }, true));
        return () => {
          null == t4 || t4(), null == r2 || r2(), i3();
        };
      }() : s(ip(document.documentElement, "paddingRight", window.innerWidth - document.documentElement.clientWidth + "px"), ip(document.documentElement, "overflow", "hidden"))), () => {
        rp--, 0 === rp && tp();
      };
    }, [t3]);
  }
  function ip(e3, t3, r2) {
    let n2 = e3.style[t3];
    return e3.style[t3] = r2, () => {
      e3.style[t3] = n2;
    };
  }
  function op(e3, t3, r2, n2) {
    return e3.addEventListener(t3, r2, n2), () => {
      e3.removeEventListener(t3, r2, n2);
    };
  }
  function sp(e3) {
    let t3 = document.scrollingElement || document.documentElement;
    for (; e3 && e3 !== t3; ) {
      let t4 = Zd(e3);
      if (t4 !== document.documentElement && t4 !== document.body && t4 !== e3) {
        let r2 = t4.getBoundingClientRect().top, n2 = e3.getBoundingClientRect().top;
        n2 > r2 + e3.clientHeight && (t4.scrollTop += n2 - r2);
      }
      e3 = t4.parentElement;
    }
  }
  function ap(e3) {
    return e3 instanceof HTMLInputElement && !ep.has(e3.type) || e3 instanceof HTMLTextAreaElement || e3 instanceof HTMLElement && e3.isContentEditable;
  }
  function lp(t3, r2, n2) {
    let { overlayProps: i3, underlayProps: o3 } = Qd({ ...t3, isOpen: r2.isOpen, onClose: r2.close }, n2);
    return np({ isDisabled: !r2.isOpen }), Zu(), (0, e2.useEffect)(() => {
      if (r2.isOpen) return $d([n2.current]);
    }, [r2.isOpen, n2]), { modalProps: C(i3), underlayProps: o3 };
  }
  var cp;
  function up(t3) {
    let { onDismiss: r2, ...n2 } = t3;
    var i3;
    let o3 = Js(n2, to((i3 = cp) && i3.__esModule ? i3.default : i3, "@react-aria/overlays").format("dismiss"));
    return e2.createElement(ga, null, e2.createElement("button", { ...o3, tabIndex: -1, onClick: () => {
      r2 && r2();
    }, style: { width: 1, height: 1 } }));
  }
  cp = { "ar-AE": { dismiss: "\u062A\u062C\u0627\u0647\u0644" }, "bg-BG": { dismiss: "\u041E\u0442\u0445\u0432\u044A\u0440\u043B\u044F\u043D\u0435" }, "cs-CZ": { dismiss: "Odstranit" }, "da-DK": { dismiss: "Luk" }, "de-DE": { dismiss: "Schlie\xDFen" }, "el-GR": { dismiss: "\u0391\u03C0\u03CC\u03C1\u03C1\u03B9\u03C8\u03B7" }, "en-US": { dismiss: "Dismiss" }, "es-ES": { dismiss: "Descartar" }, "et-EE": { dismiss: "L\xF5peta" }, "fi-FI": { dismiss: "Hylk\xE4\xE4" }, "fr-FR": { dismiss: "Rejeter" }, "he-IL": { dismiss: "\u05D4\u05EA\u05E2\u05DC\u05DD" }, "hr-HR": { dismiss: "Odbaci" }, "hu-HU": { dismiss: "Elutas\xEDt\xE1s" }, "it-IT": { dismiss: "Ignora" }, "ja-JP": { dismiss: "\u9589\u3058\u308B" }, "ko-KR": { dismiss: "\uBB34\uC2DC" }, "lt-LT": { dismiss: "Atmesti" }, "lv-LV": { dismiss: "Ner\u0101d\u012Bt" }, "nb-NO": { dismiss: "Lukk" }, "nl-NL": { dismiss: "Negeren" }, "pl-PL": { dismiss: "Zignoruj" }, "pt-BR": { dismiss: "Descartar" }, "pt-PT": { dismiss: "Dispensar" }, "ro-RO": { dismiss: "Revocare" }, "ru-RU": { dismiss: "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C" }, "sk-SK": { dismiss: "Zru\u0161i\u0165" }, "sl-SI": { dismiss: "Opusti" }, "sr-SP": { dismiss: "Odbaci" }, "sv-SE": { dismiss: "Avvisa" }, "tr-TR": { dismiss: "Kapat" }, "uk-UA": { dismiss: "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438" }, "zh-CN": { dismiss: "\u53D6\u6D88" }, "zh-TW": { dismiss: "\u95DC\u9589" } };
  let dp = "undefined" != typeof document && window.visualViewport;
  function pp() {
    let t3 = v(), [r2, n2] = (0, e2.useState)(() => t3 ? { width: 0, height: 0 } : fp());
    return (0, e2.useEffect)(() => {
      let e3 = () => {
        n2((e4) => {
          let t4 = fp();
          return t4.width === e4.width && t4.height === e4.height ? e4 : t4;
        });
      };
      return dp ? dp.addEventListener("resize", e3) : window.addEventListener("resize", e3), () => {
        dp ? dp.removeEventListener("resize", e3) : window.removeEventListener("resize", e3);
      };
    }, []), r2;
  }
  function fp() {
    return { width: dp && (null == dp ? void 0 : dp.width) || window.innerWidth, height: dp && (null == dp ? void 0 : dp.height) || window.innerHeight };
  }
  function mp(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function hp(t3, r2) {
    let { children: n2, state: i3, ...o3 } = t3, s2 = de(r2), a2 = (0, e2.useRef)(null);
    return e2.createElement(ed, { ...o3, isOpen: i3.isOpen, nodeRef: a2 }, e2.createElement(gp, { ...t3, wrapperRef: a2, ref: s2 }, n2));
  }
  let gp = (0, e2.forwardRef)(function(t3, r2) {
    let { children: n2, isOpen: i3, isFixedHeight: o3, state: s2, wrapperRef: a2 } = t3, { styleProps: l2 } = se(t3), { modalProps: c2, underlayProps: u2 } = lp({ ...t3, isDismissable: true }, s2, r2), d2 = { "--spectrum-visual-viewport-height": pp().height + "px" }, p2 = Xe(mp(Od), "spectrum-Tray-wrapper"), f2 = Xe(mp(Od), "spectrum-Tray", { "is-open": i3, "spectrum-Tray--fixedHeight": o3 }, Xe(mp(dd), "spectrum-Tray", "react-spectrum-Tray"), l2.className);
    return e2.createElement("div", { ref: a2 }, e2.createElement(Hd, { ...u2, isOpen: i3 }), e2.createElement("div", { className: p2, style: d2 }, e2.createElement("div", { ...l2, ...c2, className: f2, ref: r2, "data-testid": "tray" }, e2.createElement(up, { onDismiss: s2.close }), n2, e2.createElement(up, { onDismiss: s2.close }))));
  }), yp = (0, e2.forwardRef)(hp);
  function vp(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(8356);
  var bp, Ep, _p, Tp, Sp, Pp, wp, Cp, xp, Op, Ip, Rp, Ap, Mp, Lp, Np, Fp, kp, Dp, Up, jp, Bp, Kp, zp, Wp, Vp = {};
  vp(Vp, "focus-ring", () => bp, (e3) => bp = e3), vp(Vp, "i18nFontFamily", () => Ep, (e3) => Ep = e3), vp(Vp, "spectrum-overlay--open", () => _p, (e3) => _p = e3), vp(Vp, "is-open", () => Tp, (e3) => Tp = e3), vp(Vp, "spectrum-overlay--bottom--open", () => Sp, (e3) => Sp = e3), vp(Vp, "is-open--bottom", () => Pp, (e3) => Pp = e3), vp(Vp, "spectrum-overlay--left--open", () => wp, (e3) => wp = e3), vp(Vp, "is-open--left", () => Cp, (e3) => Cp = e3), vp(Vp, "spectrum-overlay--right--open", () => xp, (e3) => xp = e3), vp(Vp, "is-open--right", () => Op, (e3) => Op = e3), vp(Vp, "spectrum-overlay--top--open", () => Ip, (e3) => Ip = e3), vp(Vp, "is-open--top", () => Rp, (e3) => Rp = e3), vp(Vp, "spectrum-FocusRing-ring", () => Ap, (e3) => Ap = e3), vp(Vp, "spectrum-FocusRing", () => Mp, (e3) => Mp = e3), vp(Vp, "spectrum-FocusRing--quiet", () => Lp, (e3) => Lp = e3), vp(Vp, "spectrum-overlay", () => Np, (e3) => Np = e3), vp(Vp, "spectrum-Popover", () => Fp, (e3) => Fp = e3), vp(Vp, "spectrum-Popover--bottom", () => kp, (e3) => kp = e3), vp(Vp, "spectrum-Popover--dialog", () => Dp, (e3) => Dp = e3), vp(Vp, "spectrum-Popover--left", () => Up, (e3) => Up = e3), vp(Vp, "spectrum-Popover--right", () => jp, (e3) => jp = e3), vp(Vp, "spectrum-Popover--top", () => Bp, (e3) => Bp = e3), vp(Vp, "spectrum-Popover--withTip", () => Kp, (e3) => Kp = e3), vp(Vp, "spectrum-Popover-tip", () => zp, (e3) => zp = e3), vp(Vp, "spectrum-Popover-tip-triangle", () => Wp, (e3) => Wp = e3), bp = "cH0MeW_focus-ring", Ep = "cH0MeW_i18nFontFamily", Tp = "cH0MeW_is-open " + (_p = "cH0MeW_spectrum-overlay--open"), Pp = "cH0MeW_is-open--bottom " + (Sp = "cH0MeW_spectrum-overlay--bottom--open"), Cp = "cH0MeW_is-open--left " + (wp = "cH0MeW_spectrum-overlay--left--open"), Op = "cH0MeW_is-open--right " + (xp = "cH0MeW_spectrum-overlay--right--open"), Rp = "cH0MeW_is-open--top " + (Ip = "cH0MeW_spectrum-overlay--top--open"), Mp = "cH0MeW_spectrum-FocusRing " + (Ap = "cH0MeW_spectrum-FocusRing-ring"), Lp = "cH0MeW_spectrum-FocusRing--quiet", Fp = "cH0MeW_spectrum-Popover " + (Np = "cH0MeW_spectrum-overlay"), kp = "cH0MeW_spectrum-Popover--bottom", Dp = "cH0MeW_spectrum-Popover--dialog", Up = "cH0MeW_spectrum-Popover--left", jp = "cH0MeW_spectrum-Popover--right", Bp = "cH0MeW_spectrum-Popover--top", Kp = "cH0MeW_spectrum-Popover--withTip", zp = "cH0MeW_spectrum-Popover-tip", Wp = "cH0MeW_spectrum-Popover-tip-triangle";
  const Hp = { top: "top", bottom: "top", left: "left", right: "left" }, Gp = { top: "bottom", bottom: "top", left: "right", right: "left" }, qp = { top: "left", left: "top" }, $p = { top: "height", left: "width" }, Yp = { width: "totalWidth", height: "totalHeight" }, Xp = {};
  let Qp = "undefined" != typeof document && window.visualViewport;
  function Zp(e3) {
    let t3 = 0, r2 = 0, n2 = 0, i3 = 0, o3 = 0, s2 = 0, a2 = {}, l2 = (null == Qp ? void 0 : Qp.scale) > 1;
    if ("BODY" === e3.tagName) {
      let l3 = document.documentElement;
      var c2, u2;
      n2 = l3.clientWidth, i3 = l3.clientHeight, t3 = null !== (c2 = null == Qp ? void 0 : Qp.width) && void 0 !== c2 ? c2 : n2, r2 = null !== (u2 = null == Qp ? void 0 : Qp.height) && void 0 !== u2 ? u2 : i3, a2.top = l3.scrollTop || e3.scrollTop, a2.left = l3.scrollLeft || e3.scrollLeft, Qp && (o3 = Qp.offsetTop, s2 = Qp.offsetLeft);
    } else ({ width: t3, height: r2, top: o3, left: s2 } = of(e3)), a2.top = e3.scrollTop, a2.left = e3.scrollLeft, n2 = t3, i3 = r2;
    return it() && ("BODY" === e3.tagName || "HTML" === e3.tagName) && l2 && (a2.top = 0, a2.left = 0, o3 = Qp.pageTop, s2 = Qp.pageLeft), { width: t3, height: r2, totalWidth: n2, totalHeight: i3, scroll: a2, top: o3, left: s2 };
  }
  function Jp(e3, t3, r2, n2, i3, o3, s2) {
    let a2 = i3.scroll[e3], l2 = n2[$p[e3]], c2 = n2.scroll[Hp[e3]] + o3, u2 = l2 + n2.scroll[Hp[e3]] - o3, d2 = t3 - a2 + s2[e3] - n2[Hp[e3]], p2 = t3 - a2 + r2 + s2[e3] - n2[Hp[e3]];
    return d2 < c2 ? c2 - d2 : p2 > u2 ? Math.max(u2 - p2, c2 - d2) : 0;
  }
  function ef(e3) {
    if (Xp[e3]) return Xp[e3];
    let [t3, r2] = e3.split(" "), n2 = Hp[t3] || "right", i3 = qp[n2];
    Hp[r2] || (r2 = "center");
    let o3 = $p[n2], s2 = $p[i3];
    return Xp[e3] = { placement: t3, crossPlacement: r2, axis: n2, crossAxis: i3, size: o3, crossSize: s2 }, Xp[e3];
  }
  function tf(e3, t3, r2, n2, i3, o3, s2, a2, l2, c2) {
    let { placement: u2, crossPlacement: d2, axis: p2, crossAxis: f2, size: m2, crossSize: h2 } = n2, g2 = {};
    g2[f2] = e3[f2], "center" === d2 ? g2[f2] += (e3[h2] - r2[h2]) / 2 : d2 !== f2 && (g2[f2] += e3[h2] - r2[h2]), g2[f2] += o3;
    const y2 = e3[f2] - r2[h2] + l2 + c2, v2 = e3[f2] + e3[h2] - l2 - c2;
    if (g2[f2] = eu(g2[f2], y2, v2), u2 === p2) {
      const r3 = a2 ? s2[m2] : t3[Yp[m2]];
      g2[Gp[p2]] = Math.floor(r3 - e3[p2] + i3);
    } else g2[p2] = Math.floor(e3[p2] + e3[m2] + i3);
    return g2;
  }
  function rf(e3, t3, r2, n2, i3, o3) {
    let { placement: s2, axis: a2, size: l2 } = o3;
    return s2 === a2 ? Math.max(0, r2[a2] - e3[a2] - e3.scroll[a2] + t3[a2] - n2[a2] - n2[Gp[a2]] - i3) : Math.max(0, e3[l2] + e3[a2] + e3.scroll[a2] - t3[a2] - r2[a2] - r2[l2] - n2[a2] - n2[Gp[a2]] - i3);
  }
  function nf(e3) {
    let { placement: t3, targetNode: r2, overlayNode: n2, scrollNode: i3, padding: o3, shouldFlip: s2, boundaryElement: a2, offset: l2, crossOffset: c2, maxHeight: u2, arrowSize: d2 = 0, arrowBoundaryOffset: p2 = 0 } = e3, f2 = n2 instanceof HTMLElement ? function(e4) {
      let t4 = e4.offsetParent;
      if (t4 && t4 === document.body && "static" === window.getComputedStyle(t4).position && !af(t4) && (t4 = document.documentElement), null == t4) for (t4 = e4.parentElement; t4 && !af(t4); ) t4 = t4.parentElement;
      return t4 || document.documentElement;
    }(n2) : document.documentElement, m2 = f2 === document.documentElement;
    const h2 = window.getComputedStyle(f2).position;
    let g2 = !!h2 && "static" !== h2, y2 = m2 ? of(r2) : sf(r2, f2);
    if (!m2) {
      let { marginTop: e4, marginLeft: t4 } = window.getComputedStyle(r2);
      y2.top += parseInt(e4, 10) || 0, y2.left += parseInt(t4, 10) || 0;
    }
    let v2 = of(n2), b2 = function(e4) {
      let t4 = window.getComputedStyle(e4);
      return { top: parseInt(t4.marginTop, 10) || 0, bottom: parseInt(t4.marginBottom, 10) || 0, left: parseInt(t4.marginLeft, 10) || 0, right: parseInt(t4.marginRight, 10) || 0 };
    }(n2);
    v2.width += b2.left + b2.right, v2.height += b2.top + b2.bottom;
    let E2 = { top: (_2 = i3).scrollTop, left: _2.scrollLeft, width: _2.scrollWidth, height: _2.scrollHeight };
    var _2;
    let T2 = Zp(a2), S2 = Zp(f2), P2 = "BODY" === a2.tagName ? of(f2) : sf(f2, a2);
    return "HTML" === f2.tagName && "BODY" === a2.tagName && (S2.scroll.top = 0, S2.scroll.left = 0), function(e4, t4, r3, n3, i4, o4, s3, a3, l3, c3, u3, d3, p3, f3, m3, h3) {
      let g3 = ef(e4), { size: y3, crossAxis: v3, crossSize: b3, placement: E3, crossPlacement: _3 } = g3, T3 = tf(t4, a3, r3, g3, u3, d3, c3, p3, m3, h3), S3 = u3, P3 = rf(a3, c3, t4, i4, o4 + u3, g3);
      if (s3 && n3[y3] > P3) {
        let e5 = ef(`${Gp[E3]} ${_3}`), n4 = tf(t4, a3, r3, e5, u3, d3, c3, p3, m3, h3);
        rf(a3, c3, t4, i4, o4 + u3, e5) > P3 && (g3 = e5, T3 = n4, S3 = u3);
      }
      let w2 = "bottom";
      "top" === g3.axis ? "top" === g3.placement ? w2 = "top" : "bottom" === g3.placement && (w2 = "bottom") : "top" === g3.crossAxis && ("top" === g3.crossPlacement ? w2 = "bottom" : "bottom" === g3.crossPlacement && (w2 = "top"));
      let C2 = Jp(v3, T3[v3], r3[b3], a3, l3, o4, c3);
      T3[v3] += C2;
      let x2 = function(e5, t5, r4, n4, i5, o5, s4, a4) {
        const l4 = n4 ? r4.height : t5[Yp.height];
        let c4 = null != e5.top ? r4.top + e5.top : r4.top + (l4 - e5.bottom - s4), u4 = "top" !== a4 ? Math.max(0, t5.height + t5.top + t5.scroll.top - c4 - (i5.top + i5.bottom + o5)) : Math.max(0, c4 + s4 - (t5.top + t5.scroll.top) - (i5.top + i5.bottom + o5));
        return Math.min(t5.height - 2 * o5, u4);
      }(T3, a3, c3, p3, i4, o4, r3.height, w2);
      f3 && f3 < x2 && (x2 = f3), r3.height = Math.min(r3.height, x2), T3 = tf(t4, a3, r3, g3, S3, d3, c3, p3, m3, h3), C2 = Jp(v3, T3[v3], r3[b3], a3, l3, o4, c3), T3[v3] += C2;
      let O2 = {}, I2 = t4[v3] + 0.5 * t4[b3] - r3[v3];
      const R2 = m3 / 2 + h3, A2 = r3[b3] - m3 / 2 - h3, M2 = eu(I2, t4[v3] - r3[v3] + m3 / 2, t4[v3] + t4[b3] - r3[v3] - m3 / 2);
      return O2[v3] = eu(M2, R2, A2), { position: T3, maxHeight: x2, arrowOffsetLeft: O2.left, arrowOffsetTop: O2.top, placement: g3.placement };
    }(t3, y2, v2, E2, b2, o3, s2, T2, S2, P2, l2, c2, g2, u2, d2, p2);
  }
  function of(e3) {
    let { top: t3, left: r2, width: n2, height: i3 } = e3.getBoundingClientRect(), { scrollTop: o3, scrollLeft: s2, clientTop: a2, clientLeft: l2 } = document.documentElement;
    return { top: t3 + o3 - a2, left: r2 + s2 - l2, width: n2, height: i3 };
  }
  function sf(e3, t3) {
    let r2, n2 = window.getComputedStyle(e3);
    if ("fixed" === n2.position) {
      let { top: t4, left: n3, width: i3, height: o3 } = e3.getBoundingClientRect();
      r2 = { top: t4, left: n3, width: i3, height: o3 };
    } else {
      r2 = of(e3);
      let n3 = of(t3), i3 = window.getComputedStyle(t3);
      n3.top += (parseInt(i3.borderTopWidth, 10) || 0) - t3.scrollTop, n3.left += (parseInt(i3.borderLeftWidth, 10) || 0) - t3.scrollLeft, r2.top -= n3.top, r2.left -= n3.left;
    }
    return r2.top -= parseInt(n2.marginTop, 10) || 0, r2.left -= parseInt(n2.marginLeft, 10) || 0, r2;
  }
  function af(e3) {
    let t3 = window.getComputedStyle(e3);
    return "none" !== t3.transform || /transform|perspective/.test(t3.willChange) || "none" !== t3.filter || "paint" === t3.contain || "backdropFilter" in t3 && "none" !== t3.backdropFilter || "WebkitBackdropFilter" in t3 && "none" !== t3.WebkitBackdropFilter;
  }
  let lf = "undefined" != typeof document && window.visualViewport;
  function cf(t3) {
    let { direction: r2 } = H(), { arrowSize: n2 = 0, targetRef: i3, overlayRef: o3, scrollRef: s2 = o3, placement: l2 = "bottom", containerPadding: c2 = 12, shouldFlip: u2 = true, boundaryElement: d2 = "undefined" != typeof document ? document.body : null, offset: p2 = 0, crossOffset: f2 = 0, shouldUpdatePosition: m2 = true, isOpen: h2 = true, onClose: g2, maxHeight: y2, arrowBoundaryOffset: v2 = 0 } = t3, [b2, E2] = (0, e2.useState)({ position: {}, arrowOffsetLeft: void 0, arrowOffsetTop: void 0, maxHeight: void 0, placement: void 0 }), _2 = [m2, l2, o3.current, i3.current, s2.current, c2, u2, d2, p2, f2, h2, r2, y2, v2, n2], T2 = (0, e2.useRef)(null == lf ? void 0 : lf.scale);
    (0, e2.useEffect)(() => {
      h2 && (T2.current = null == lf ? void 0 : lf.scale);
    }, [h2]);
    let S2 = (0, e2.useCallback)(() => {
      if (!(false !== m2 && h2 && o3.current && i3.current && s2.current && d2)) return;
      if ((null == lf ? void 0 : lf.scale) !== T2.current) return;
      !y2 && o3.current && (o3.current.style.maxHeight = "none");
      let e3 = nf({ placement: uf(l2, r2), overlayNode: o3.current, targetNode: i3.current, scrollNode: s2.current, padding: c2, shouldFlip: u2, boundaryElement: d2, offset: p2, crossOffset: f2, maxHeight: y2, arrowSize: n2, arrowBoundaryOffset: v2 });
      Object.keys(e3.position).forEach((t4) => o3.current.style[t4] = e3.position[t4] + "px"), o3.current.style.maxHeight = null != e3.maxHeight ? e3.maxHeight + "px" : void 0, E2(e3);
    }, _2);
    var P2;
    a(S2, _2), a(() => (window.addEventListener("resize", P2, false), () => {
      window.removeEventListener("resize", P2, false);
    }), [P2 = S2]), Qe({ ref: o3, onResize: S2 });
    let w2 = (0, e2.useRef)(false);
    a(() => {
      let e3, t4 = () => {
        w2.current = true, clearTimeout(e3), e3 = setTimeout(() => {
          w2.current = false;
        }, 500), S2();
      }, r3 = () => {
        w2.current && t4();
      };
      return null == lf || lf.addEventListener("resize", t4), null == lf || lf.addEventListener("scroll", r3), () => {
        null == lf || lf.removeEventListener("resize", t4), null == lf || lf.removeEventListener("scroll", r3);
      };
    }, [S2]);
    let C2 = (0, e2.useCallback)(() => {
      w2.current || g2();
    }, [g2, w2]);
    return function(t4) {
      let { triggerRef: r3, isOpen: n3, onClose: i4 } = t4;
      (0, e2.useEffect)(() => {
        if (!n3 || null === i4) return;
        let e3 = (e4) => {
          let t5 = e4.target;
          if (!r3.current || t5 instanceof Node && !t5.contains(r3.current)) return;
          let n4 = i4 || la.get(r3.current);
          n4 && n4();
        };
        return window.addEventListener("scroll", e3, true), () => {
          window.removeEventListener("scroll", e3, true);
        };
      }, [n3, i4, r3]);
    }({ triggerRef: i3, isOpen: h2, onClose: g2 && C2 }), { overlayProps: { style: { position: "absolute", zIndex: 1e5, ...b2.position, maxHeight: b2.maxHeight } }, placement: b2.placement, arrowProps: { "aria-hidden": "true", role: "presentation", style: { left: b2.arrowOffsetLeft, top: b2.arrowOffsetTop } }, updatePosition: S2 };
  }
  function uf(e3, t3) {
    return "rtl" === t3 ? e3.replace("start", "right").replace("end", "left") : e3.replace("start", "left").replace("end", "right");
  }
  function df(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  let pf = { left: "right", right: "right", top: "bottom", bottom: "bottom" };
  function ff(t3, r2) {
    let { children: n2, state: i3, ...o3 } = t3, s2 = de(r2), a2 = (0, e2.useRef)(null);
    return e2.createElement(ed, { ...o3, isOpen: i3.isOpen, nodeRef: a2 }, e2.createElement(mf, { ref: s2, ...t3, wrapperRef: a2 }, n2));
  }
  const mf = (0, e2.forwardRef)((t3, r2) => {
    let { children: n2, isOpen: i3, hideArrow: o3, isNonModal: s2, enableBothDismissButtons: l2, state: c2, wrapperRef: u2, onDismissButtonPress: d2 = () => c2.close() } = t3, { styleProps: p2 } = se(t3), { size: f2, borderWidth: m2, arrowRef: h2 } = function() {
      let [t4, r3] = (0, e2.useState)(20), [n3, i4] = (0, e2.useState)(1), o4 = (0, e2.useRef)(null);
      return a(() => {
        if (o4.current) {
          let e3 = window.getComputedStyle(o4.current).getPropertyValue("--spectrum-popover-tip-size");
          "" !== e3 && r3(parseInt(e3, 10) / 2);
          let t5 = window.getComputedStyle(o4.current).getPropertyValue("--spectrum-popover-tip-borderWidth");
          "" !== t5 && i4(parseInt(t5, 10));
        }
      }, []), { size: t4, borderWidth: n3, arrowRef: o4 };
    }();
    const g2 = function(t4) {
      let [r3, n3] = (0, e2.useState)(0);
      return a(() => {
        if (t4.current) {
          let e3 = window.getComputedStyle(t4.current).borderRadius;
          "" !== e3 && n3(parseInt(e3, 10));
        }
      }, [t4]), r3;
    }(r2);
    let y2 = m2 * Math.SQRT2, v2 = f2 + y2, b2 = 2 * v2, { popoverProps: E2, arrowProps: _2, underlayProps: T2, placement: S2 } = function(e3, t4) {
      let { triggerRef: r3, popoverRef: n3, isNonModal: i4, isKeyboardDismissDisabled: o4, shouldCloseOnInteractOutside: s3, ...l3 } = e3, { overlayProps: c3, underlayProps: u3 } = Qd({ isOpen: t4.isOpen, onClose: t4.close, shouldCloseOnBlur: true, isDismissable: !i4, isKeyboardDismissDisabled: o4, shouldCloseOnInteractOutside: s3 }, n3), { overlayProps: d3, arrowProps: p3, placement: f3 } = cf({ ...l3, targetRef: r3, overlayRef: n3, isOpen: t4.isOpen, onClose: i4 ? t4.close : null });
      return np({ isDisabled: i4 || !t4.isOpen }), a(() => {
        if (t4.isOpen && !i4 && n3.current) return $d([n3.current]);
      }, [i4, t4.isOpen, n3]), { popoverProps: C(c3, d3), arrowProps: p3, underlayProps: u3, placement: f3 };
    }({ ...t3, popoverRef: r2, maxHeight: null, arrowSize: o3 ? 0 : b2, arrowBoundaryOffset: g2 }, c2), { focusWithinProps: P2 } = At(t3);
    return e2.createElement("div", { ref: u2 }, !s2 && e2.createElement(Hd, { isTransparent: true, ...C(T2), isOpen: i3 }), e2.createElement("div", { ...p2, ...C(E2, P2), style: { ...p2.style, ...E2.style }, ref: r2, className: Xe(df(Vp), "spectrum-Popover", `spectrum-Popover--${S2}`, { "spectrum-Popover--withTip": !o3, "is-open": i3, [`is-open--${S2}`]: i3 }, Xe(df(dd), "spectrum-Popover", "react-spectrum-Popover"), p2.className), role: "presentation", "data-testid": "popover" }, (!s2 || l2) && e2.createElement(up, { onDismiss: d2 }), n2, o3 ? null : e2.createElement(hf, { arrowProps: _2, isLandscape: "bottom" === pf[S2], arrowRef: h2, primary: v2, secondary: b2, borderDiagonal: y2 }), e2.createElement(up, { onDismiss: d2 })));
  });
  function hf(t3) {
    let { primary: r2, secondary: n2, isLandscape: i3, arrowProps: o3, borderDiagonal: s2, arrowRef: a2 } = t3, l2 = s2 / 2, c2 = r2 - l2, u2 = n2 / 2, d2 = n2 - l2, p2 = i3 ? ["M", l2, 0, "L", u2, c2, "L", d2, 0] : ["M", 0, l2, "L", c2, u2, "L", 0, d2];
    return e2.createElement("svg", { xmlns: "http://www.w3.org/svg/2000", width: Math.ceil(i3 ? n2 : r2), height: Math.ceil(i3 ? r2 : n2), className: Xe(df(Vp), "spectrum-Popover-tip"), ref: a2, ...o3 }, e2.createElement("path", { className: Xe(df(Vp), "spectrum-Popover-tip-triangle"), d: p2.join(" ") }));
  }
  let gf = (0, e2.forwardRef)(ff);
  const yf = { badInput: false, customError: false, patternMismatch: false, rangeOverflow: false, rangeUnderflow: false, stepMismatch: false, tooLong: false, tooShort: false, typeMismatch: false, valueMissing: false, valid: true }, vf = { ...yf, customError: true, valid: false }, bf = { isInvalid: false, validationDetails: yf, validationErrors: [] }, Ef = (0, e2.createContext)({}), _f = "__formValidationState" + Date.now();
  function Tf(t3) {
    if (t3[_f]) {
      let { realtimeValidation: e3, displayValidation: r2, updateValidation: n2, resetValidation: i3, commitValidation: o3 } = t3[_f];
      return { realtimeValidation: e3, displayValidation: r2, updateValidation: n2, resetValidation: i3, commitValidation: o3 };
    }
    return function(t4) {
      let { isInvalid: r2, validationState: n2, name: i3, value: o3, builtinValidation: s2, validate: a2, validationBehavior: l2 = "aria" } = t4;
      n2 && (r2 || (r2 = "invalid" === n2));
      let c2 = void 0 !== r2 ? { isInvalid: r2, validationErrors: [], validationDetails: vf } : null, u2 = (0, e2.useMemo)(() => Pf(function(e3, t5) {
        if ("function" == typeof e3) {
          let r3 = e3(t5);
          if (r3 && "boolean" != typeof r3) return Sf(r3);
        }
        return [];
      }(a2, o3)), [a2, o3]);
      (null == s2 ? void 0 : s2.validationDetails.valid) && (s2 = null);
      let d2 = (0, e2.useContext)(Ef), p2 = (0, e2.useMemo)(() => i3 ? Array.isArray(i3) ? i3.flatMap((e3) => Sf(d2[e3])) : Sf(d2[i3]) : [], [d2, i3]), [f2, m2] = (0, e2.useState)(d2), [h2, g2] = (0, e2.useState)(false);
      d2 !== f2 && (m2(d2), g2(false));
      let y2 = (0, e2.useMemo)(() => Pf(h2 ? [] : p2), [h2, p2]), v2 = (0, e2.useRef)(bf), [b2, E2] = (0, e2.useState)(bf), _2 = (0, e2.useRef)(bf), [T2, S2] = (0, e2.useState)(false);
      return (0, e2.useEffect)(() => {
        if (!T2) return;
        S2(false);
        let e3 = u2 || s2 || v2.current;
        wf(e3, _2.current) || (_2.current = e3, E2(e3));
      }), { realtimeValidation: c2 || y2 || u2 || s2 || bf, displayValidation: "native" === l2 ? c2 || y2 || b2 : c2 || y2 || u2 || s2 || b2, updateValidation(e3) {
        "aria" !== l2 || wf(b2, e3) ? v2.current = e3 : E2(e3);
      }, resetValidation() {
        let e3 = bf;
        wf(e3, _2.current) || (_2.current = e3, E2(e3)), "native" === l2 && S2(false), g2(true);
      }, commitValidation() {
        "native" === l2 && S2(true), g2(true);
      } };
    }(t3);
  }
  function Sf(e3) {
    return e3 ? Array.isArray(e3) ? e3 : [e3] : [];
  }
  function Pf(e3) {
    return e3.length ? { isInvalid: true, validationErrors: e3, validationDetails: vf } : null;
  }
  function wf(e3, t3) {
    return e3 === t3 || e3 && t3 && e3.isInvalid === t3.isInvalid && e3.validationErrors.length === t3.validationErrors.length && e3.validationErrors.every((e4, r2) => e4 === t3.validationErrors[r2]) && Object.entries(e3.validationDetails).every(([e4, r2]) => t3.validationDetails[e4] === r2);
  }
  function Cf(t3, r2, n2) {
    let [i3, o3] = (0, e2.useState)(t3 || r2), s2 = (0, e2.useRef)(void 0 !== t3), a2 = void 0 !== t3;
    (0, e2.useEffect)(() => {
      let e3 = s2.current;
      e3 !== a2 && console.warn(`WARN: A component changed from ${e3 ? "controlled" : "uncontrolled"} to ${a2 ? "controlled" : "uncontrolled"}.`), s2.current = a2;
    }, [a2]);
    let l2 = a2 ? t3 : i3, c2 = (0, e2.useCallback)((e3, ...t4) => {
      let r3 = (e4, ...t5) => {
        n2 && (Object.is(l2, e4) || n2(e4, ...t5)), a2 || (l2 = e4);
      };
      "function" == typeof e3 ? (console.warn("We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320"), o3((n3, ...i4) => {
        let o4 = e3(a2 ? l2 : n3, ...i4);
        return r3(o4, ...t4), a2 ? n3 : o4;
      })) : (a2 || o3(e3), r3(e3, ...t4));
    }, [a2, l2, n2]);
    return [l2, c2];
  }
  function xf(t3) {
    let [r2, n2] = Cf(t3.isOpen, t3.defaultOpen || false, t3.onOpenChange);
    const i3 = (0, e2.useCallback)(() => {
      n2(true);
    }, [n2]), o3 = (0, e2.useCallback)(() => {
      n2(false);
    }, [n2]), s2 = (0, e2.useCallback)(() => {
      n2(!r2);
    }, [n2, r2]);
    return { isOpen: r2, setOpen: n2, open: i3, close: o3, toggle: s2 };
  }
  class Of {
    *[Symbol.iterator]() {
      yield* this.iterable;
    }
    get size() {
      return this.keyMap.size;
    }
    getKeys() {
      return this.keyMap.keys();
    }
    getKeyBefore(e3) {
      let t3 = this.keyMap.get(e3);
      return t3 ? t3.prevKey : null;
    }
    getKeyAfter(e3) {
      let t3 = this.keyMap.get(e3);
      return t3 ? t3.nextKey : null;
    }
    getFirstKey() {
      return this.firstKey;
    }
    getLastKey() {
      return this.lastKey;
    }
    getItem(e3) {
      return this.keyMap.get(e3);
    }
    at(e3) {
      const t3 = [...this.getKeys()];
      return this.getItem(t3[e3]);
    }
    getChildren(e3) {
      let t3 = this.keyMap.get(e3);
      return (null == t3 ? void 0 : t3.childNodes) || [];
    }
    constructor(e3) {
      this.keyMap = /* @__PURE__ */ new Map(), this.iterable = e3;
      let t3, r2 = (e4) => {
        if (this.keyMap.set(e4.key, e4), e4.childNodes && "section" === e4.type) for (let t4 of e4.childNodes) r2(t4);
      };
      for (let t4 of e3) r2(t4);
      let n2 = 0;
      for (let [e4, r3] of this.keyMap) t3 ? (t3.nextKey = e4, r3.prevKey = t3.key) : (this.firstKey = e4, r3.prevKey = void 0), "item" === r3.type && (r3.index = n2++), t3 = r3, t3.nextKey = void 0;
      this.lastKey = null == t3 ? void 0 : t3.key;
    }
  }
  class If extends Set {
    constructor(e3, t3, r2) {
      super(e3), e3 instanceof If ? (this.anchorKey = t3 || e3.anchorKey, this.currentKey = r2 || e3.currentKey) : (this.anchorKey = t3, this.currentKey = r2);
    }
  }
  function Rf(e3, t3) {
    return e3 ? "all" === e3 ? "all" : new If(e3) : t3;
  }
  class Af {
    get selectionMode() {
      return this.state.selectionMode;
    }
    get disallowEmptySelection() {
      return this.state.disallowEmptySelection;
    }
    get selectionBehavior() {
      return this.state.selectionBehavior;
    }
    setSelectionBehavior(e3) {
      this.state.setSelectionBehavior(e3);
    }
    get isFocused() {
      return this.state.isFocused;
    }
    setFocused(e3) {
      this.state.setFocused(e3);
    }
    get focusedKey() {
      return this.state.focusedKey;
    }
    get childFocusStrategy() {
      return this.state.childFocusStrategy;
    }
    setFocusedKey(e3, t3) {
      (null == e3 || this.collection.getItem(e3)) && this.state.setFocusedKey(e3, t3);
    }
    get selectedKeys() {
      return "all" === this.state.selectedKeys ? new Set(this.getSelectAllKeys()) : this.state.selectedKeys;
    }
    get rawSelection() {
      return this.state.selectedKeys;
    }
    isSelected(e3) {
      return "none" !== this.state.selectionMode && (e3 = this.getKey(e3), "all" === this.state.selectedKeys ? this.canSelectItem(e3) : this.state.selectedKeys.has(e3));
    }
    get isEmpty() {
      return "all" !== this.state.selectedKeys && 0 === this.state.selectedKeys.size;
    }
    get isSelectAll() {
      if (this.isEmpty) return false;
      if ("all" === this.state.selectedKeys) return true;
      if (null != this._isSelectAll) return this._isSelectAll;
      let e3 = this.getSelectAllKeys(), t3 = this.state.selectedKeys;
      return this._isSelectAll = e3.every((e4) => t3.has(e4)), this._isSelectAll;
    }
    get firstSelectedKey() {
      let e3 = null;
      for (let t3 of this.state.selectedKeys) {
        let r2 = this.collection.getItem(t3);
        (!e3 || r2 && kl(this.collection, r2, e3) < 0) && (e3 = r2);
      }
      return null == e3 ? void 0 : e3.key;
    }
    get lastSelectedKey() {
      let e3 = null;
      for (let t3 of this.state.selectedKeys) {
        let r2 = this.collection.getItem(t3);
        (!e3 || r2 && kl(this.collection, r2, e3) > 0) && (e3 = r2);
      }
      return null == e3 ? void 0 : e3.key;
    }
    get disabledKeys() {
      return this.state.disabledKeys;
    }
    get disabledBehavior() {
      return this.state.disabledBehavior;
    }
    extendSelection(e3) {
      if ("none" === this.selectionMode) return;
      if ("single" === this.selectionMode) return void this.replaceSelection(e3);
      let t3;
      if (e3 = this.getKey(e3), "all" === this.state.selectedKeys) t3 = new If([e3], e3, e3);
      else {
        let r2 = this.state.selectedKeys, n2 = r2.anchorKey || e3;
        t3 = new If(r2, n2, e3);
        for (let i3 of this.getKeyRange(n2, r2.currentKey || e3)) t3.delete(i3);
        for (let r3 of this.getKeyRange(e3, n2)) this.canSelectItem(r3) && t3.add(r3);
      }
      this.state.setSelectedKeys(t3);
    }
    getKeyRange(e3, t3) {
      let r2 = this.collection.getItem(e3), n2 = this.collection.getItem(t3);
      return r2 && n2 ? kl(this.collection, r2, n2) <= 0 ? this.getKeyRangeInternal(e3, t3) : this.getKeyRangeInternal(t3, e3) : [];
    }
    getKeyRangeInternal(e3, t3) {
      let r2 = [], n2 = e3;
      for (; n2; ) {
        let e4 = this.collection.getItem(n2);
        if ((e4 && "item" === e4.type || "cell" === e4.type && this.allowsCellSelection) && r2.push(n2), n2 === t3) return r2;
        n2 = this.collection.getKeyAfter(n2);
      }
      return [];
    }
    getKey(e3) {
      let t3 = this.collection.getItem(e3);
      if (!t3) return e3;
      if ("cell" === t3.type && this.allowsCellSelection) return e3;
      for (; "item" !== t3.type && null != t3.parentKey; ) t3 = this.collection.getItem(t3.parentKey);
      return t3 && "item" === t3.type ? t3.key : null;
    }
    toggleSelection(e3) {
      if ("none" === this.selectionMode) return;
      if ("single" === this.selectionMode && !this.isSelected(e3)) return void this.replaceSelection(e3);
      if (null == (e3 = this.getKey(e3))) return;
      let t3 = new If("all" === this.state.selectedKeys ? this.getSelectAllKeys() : this.state.selectedKeys);
      t3.has(e3) ? t3.delete(e3) : this.canSelectItem(e3) && (t3.add(e3), t3.anchorKey = e3, t3.currentKey = e3), this.disallowEmptySelection && 0 === t3.size || this.state.setSelectedKeys(t3);
    }
    replaceSelection(e3) {
      if ("none" === this.selectionMode) return;
      if (null == (e3 = this.getKey(e3))) return;
      let t3 = this.canSelectItem(e3) ? new If([e3], e3, e3) : new If();
      this.state.setSelectedKeys(t3);
    }
    setSelectedKeys(e3) {
      if ("none" === this.selectionMode) return;
      let t3 = new If();
      for (let r2 of e3) if (r2 = this.getKey(r2), null != r2 && (t3.add(r2), "single" === this.selectionMode)) break;
      this.state.setSelectedKeys(t3);
    }
    getSelectAllKeys() {
      let e3 = [], t3 = (r2) => {
        for (; r2; ) {
          if (this.canSelectItem(r2)) {
            let i3 = this.collection.getItem(r2);
            "item" === i3.type && e3.push(r2), i3.hasChildNodes && (this.allowsCellSelection || "item" !== i3.type) && t3((n2 = Fl(i3, this.collection), function(e4, t4) {
              let r3 = 0;
              for (let t5 of e4) {
                if (0 === r3) return t5;
                r3++;
              }
            }(n2)).key);
          }
          r2 = this.collection.getKeyAfter(r2);
        }
        var n2;
      };
      return t3(this.collection.getFirstKey()), e3;
    }
    selectAll() {
      this.isSelectAll || "multiple" !== this.selectionMode || this.state.setSelectedKeys("all");
    }
    clearSelection() {
      !this.disallowEmptySelection && ("all" === this.state.selectedKeys || this.state.selectedKeys.size > 0) && this.state.setSelectedKeys(new If());
    }
    toggleSelectAll() {
      this.isSelectAll ? this.clearSelection() : this.selectAll();
    }
    select(e3, t3) {
      "none" !== this.selectionMode && ("single" === this.selectionMode ? this.isSelected(e3) && !this.disallowEmptySelection ? this.toggleSelection(e3) : this.replaceSelection(e3) : "toggle" === this.selectionBehavior || t3 && ("touch" === t3.pointerType || "virtual" === t3.pointerType) ? this.toggleSelection(e3) : this.replaceSelection(e3));
    }
    isSelectionEqual(e3) {
      if (e3 === this.state.selectedKeys) return true;
      let t3 = this.selectedKeys;
      if (e3.size !== t3.size) return false;
      for (let r2 of e3) if (!t3.has(r2)) return false;
      for (let r2 of t3) if (!e3.has(r2)) return false;
      return true;
    }
    canSelectItem(e3) {
      var t3;
      if ("none" === this.state.selectionMode || this.state.disabledKeys.has(e3)) return false;
      let r2 = this.collection.getItem(e3);
      return !(!r2 || (null == r2 || null === (t3 = r2.props) || void 0 === t3 ? void 0 : t3.isDisabled) || "cell" === r2.type && !this.allowsCellSelection);
    }
    isDisabled(e3) {
      var t3, r2;
      return "all" === this.state.disabledBehavior && (this.state.disabledKeys.has(e3) || !!(null === (r2 = this.collection.getItem(e3)) || void 0 === r2 || null === (t3 = r2.props) || void 0 === t3 ? void 0 : t3.isDisabled));
    }
    isLink(e3) {
      var t3, r2;
      return !!(null === (r2 = this.collection.getItem(e3)) || void 0 === r2 || null === (t3 = r2.props) || void 0 === t3 ? void 0 : t3.href);
    }
    getItemProps(e3) {
      var t3;
      return null === (t3 = this.collection.getItem(e3)) || void 0 === t3 ? void 0 : t3.props;
    }
    constructor(e3, t3, r2) {
      var n2;
      this.collection = e3, this.state = t3, this.allowsCellSelection = null !== (n2 = null == r2 ? void 0 : r2.allowsCellSelection) && void 0 !== n2 && n2, this._isSelectAll = null;
    }
  }
  class Mf {
    build(e3, t3) {
      return this.context = t3, Lf(() => this.iterateCollection(e3));
    }
    *iterateCollection(t3) {
      let { children: r2, items: n2 } = t3;
      if ("function" == typeof r2) {
        if (!n2) throw new Error("props.children was a function but props.items is missing");
        for (let e3 of t3.items) yield* this.getFullNode({ value: e3 }, { renderer: r2 });
      } else {
        let t4 = [];
        e2.Children.forEach(r2, (e3) => {
          t4.push(e3);
        });
        let n3 = 0;
        for (let e3 of t4) {
          let t5 = this.getFullNode({ element: e3, index: n3 }, {});
          for (let e4 of t5) n3++, yield e4;
        }
      }
    }
    getKey(e3, t3, r2, n2) {
      if (null != e3.key) return e3.key;
      if ("cell" === t3.type && null != t3.key) return `${n2}${t3.key}`;
      let i3 = t3.value;
      if (null != i3) {
        var o3;
        let e4 = null !== (o3 = i3.key) && void 0 !== o3 ? o3 : i3.id;
        if (null == e4) throw new Error("No key found for item");
        return e4;
      }
      return n2 ? `${n2}.${t3.index}` : `$.${t3.index}`;
    }
    getChildState(e3, t3) {
      return { renderer: t3.renderer || e3.renderer };
    }
    *getFullNode(t3, r2, n2, i3) {
      let o3 = t3.element;
      if (!o3 && t3.value && r2 && r2.renderer) {
        let e3 = this.cache.get(t3.value);
        if (e3 && (!e3.shouldInvalidate || !e3.shouldInvalidate(this.context))) return e3.index = t3.index, e3.parentKey = i3 ? i3.key : null, void (yield e3);
        o3 = r2.renderer(t3.value);
      }
      if (e2.isValidElement(o3)) {
        let e3 = o3.type;
        if ("function" != typeof e3 && "function" != typeof e3.getCollectionNode) {
          let e4 = "function" == typeof o3.type ? o3.type.name : o3.type;
          throw new Error(`Unknown element <${e4}> in collection.`);
        }
        let s3 = e3.getCollectionNode(o3.props, this.context), a3 = t3.index, l2 = s3.next();
        for (; !l2.done && l2.value; ) {
          let e4 = l2.value;
          t3.index = a3;
          let c2 = e4.key;
          c2 || (c2 = e4.element ? null : this.getKey(o3, t3, r2, n2));
          let u2 = [...this.getFullNode({ ...e4, key: c2, index: a3, wrapper: Nf(t3.wrapper, e4.wrapper) }, this.getChildState(r2, e4), n2 ? `${n2}${o3.key}` : o3.key, i3)];
          for (let r3 of u2) {
            if (r3.value = e4.value || t3.value, r3.value && this.cache.set(r3.value, r3), t3.type && r3.type !== t3.type) throw new Error(`Unsupported type <${Ff(r3.type)}> in <${Ff(i3.type)}>. Only <${Ff(t3.type)}> is supported.`);
            a3++, yield r3;
          }
          l2 = s3.next(u2);
        }
        return;
      }
      if (null == t3.key) return;
      let s2 = this, a2 = { type: t3.type, props: t3.props, key: t3.key, parentKey: i3 ? i3.key : null, value: t3.value, level: i3 ? i3.level + 1 : 0, index: t3.index, rendered: t3.rendered, textValue: t3.textValue, "aria-label": t3["aria-label"], wrapper: t3.wrapper, shouldInvalidate: t3.shouldInvalidate, hasChildNodes: t3.hasChildNodes, childNodes: Lf(function* () {
        if (!t3.hasChildNodes) return;
        let e3 = 0;
        for (let n3 of t3.childNodes()) {
          null != n3.key && (n3.key = `${a2.key}${n3.key}`), n3.index = e3;
          let t4 = s2.getFullNode(n3, s2.getChildState(r2, n3), a2.key, a2);
          for (let r3 of t4) e3++, yield r3;
        }
      }) };
      yield a2;
    }
    constructor() {
      this.cache = /* @__PURE__ */ new WeakMap();
    }
  }
  function Lf(e3) {
    let t3 = [], r2 = null;
    return { *[Symbol.iterator]() {
      for (let e4 of t3) yield e4;
      r2 || (r2 = e3());
      for (let e4 of r2) t3.push(e4), yield e4;
    } };
  }
  function Nf(e3, t3) {
    return e3 && t3 ? (r2) => e3(t3(r2)) : e3 || t3 || void 0;
  }
  function Ff(e3) {
    return e3[0].toUpperCase() + e3.slice(1);
  }
  function kf(t3, r2, n2) {
    let i3 = (0, e2.useMemo)(() => new Mf(), []), { children: o3, items: s2, collection: a2 } = t3;
    return (0, e2.useMemo)(() => {
      if (a2) return a2;
      let e3 = i3.build({ children: o3, items: s2 }, n2);
      return r2(e3);
    }, [i3, o3, s2, a2, n2, r2]);
  }
  function Df(t3) {
    let { filter: r2 } = t3, n2 = function(t4) {
      let { selectionMode: r3 = "none", disallowEmptySelection: n3, allowDuplicateSelectionEvents: i4, selectionBehavior: o4 = "toggle", disabledBehavior: s3 = "all" } = t4, a3 = (0, e2.useRef)(false), [, l3] = (0, e2.useState)(false), c3 = (0, e2.useRef)(null), u2 = (0, e2.useRef)(null), [, d2] = (0, e2.useState)(null), p2 = (0, e2.useMemo)(() => Rf(t4.selectedKeys), [t4.selectedKeys]), f2 = (0, e2.useMemo)(() => Rf(t4.defaultSelectedKeys, new If()), [t4.defaultSelectedKeys]), [m2, h2] = Cf(p2, f2, t4.onSelectionChange), g2 = (0, e2.useMemo)(() => t4.disabledKeys ? new Set(t4.disabledKeys) : /* @__PURE__ */ new Set(), [t4.disabledKeys]), [y2, v2] = (0, e2.useState)(o4);
      "replace" === o4 && "toggle" === y2 && "object" == typeof m2 && 0 === m2.size && v2("replace");
      let b2 = (0, e2.useRef)(o4);
      return (0, e2.useEffect)(() => {
        o4 !== b2.current && (v2(o4), b2.current = o4);
      }, [o4]), { selectionMode: r3, disallowEmptySelection: n3, selectionBehavior: y2, setSelectionBehavior: v2, get isFocused() {
        return a3.current;
      }, setFocused(e3) {
        a3.current = e3, l3(e3);
      }, get focusedKey() {
        return c3.current;
      }, get childFocusStrategy() {
        return u2.current;
      }, setFocusedKey(e3, t5 = "first") {
        c3.current = e3, u2.current = t5, d2(e3);
      }, selectedKeys: m2, setSelectedKeys(e3) {
        !i4 && function(e4, t5) {
          if (e4.size !== t5.size) return false;
          for (let r4 of e4) if (!t5.has(r4)) return false;
          return true;
        }(e3, m2) || h2(e3);
      }, disabledKeys: g2, disabledBehavior: s3 };
    }(t3), i3 = (0, e2.useMemo)(() => t3.disabledKeys ? new Set(t3.disabledKeys) : /* @__PURE__ */ new Set(), [t3.disabledKeys]), o3 = (0, e2.useCallback)((e3) => new Of(r2 ? r2(e3) : e3), [r2]), s2 = (0, e2.useMemo)(() => ({ suppressTextValueWarning: t3.suppressTextValueWarning }), [t3.suppressTextValueWarning]), a2 = kf(t3, o3, s2), l2 = (0, e2.useMemo)(() => new Af(a2, n2), [a2, n2]);
    const c2 = (0, e2.useRef)(null);
    return (0, e2.useEffect)(() => {
      if (null != n2.focusedKey && !a2.getItem(n2.focusedKey)) {
        const e3 = c2.current.getItem(n2.focusedKey), t4 = [...c2.current.getKeys()].map((e4) => {
          const t5 = c2.current.getItem(e4);
          return "item" === t5.type ? t5 : null;
        }).filter((e4) => null !== e4), r3 = [...a2.getKeys()].map((e4) => {
          const t5 = a2.getItem(e4);
          return "item" === t5.type ? t5 : null;
        }).filter((e4) => null !== e4), i4 = t4.length - r3.length;
        let o4, s3 = Math.min(i4 > 1 ? Math.max(e3.index - i4 + 1, 0) : e3.index, r3.length - 1);
        for (; s3 >= 0; ) {
          if (!l2.isDisabled(r3[s3].key)) {
            o4 = r3[s3];
            break;
          }
          s3 < r3.length - 1 ? s3++ : (s3 > e3.index && (s3 = e3.index), s3--);
        }
        n2.setFocusedKey(o4 ? o4.key : null);
      }
      c2.current = a2;
    }, [a2, l2, n2, n2.focusedKey]), { collection: a2, disabledKeys: i3, selectionManager: l2 };
  }
  function Uf(t3) {
    var r2;
    let [n2, i3] = Cf(t3.selectedKey, null !== (r2 = t3.defaultSelectedKey) && void 0 !== r2 ? r2 : null, t3.onSelectionChange), o3 = (0, e2.useMemo)(() => null != n2 ? [n2] : [], [n2]), { collection: s2, disabledKeys: a2, selectionManager: l2 } = Df({ ...t3, selectionMode: "single", disallowEmptySelection: true, allowDuplicateSelectionEvents: true, selectedKeys: o3, onSelectionChange: (e3) => {
      var r3;
      let o4 = null !== (r3 = e3.values().next().value) && void 0 !== r3 ? r3 : null;
      o4 === n2 && t3.onSelectionChange && t3.onSelectionChange(o4), i3(o4);
    } }), c2 = null != n2 ? s2.getItem(n2) : null;
    return { collection: s2, disabledKeys: a2, selectionManager: l2, selectedKey: n2, setSelectedKey: i3, selectedItem: c2 };
  }
  function jf(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function Bf(t3, r2) {
    t3 = go(t3 = Hn(t3 = O(t3, "picker")));
    let n2, i3 = to(jf(Nt), "@react-spectrum/picker"), { autoComplete: o3, isDisabled: l2, direction: c2 = "bottom", align: u2 = "start", shouldFlip: d2 = true, placeholder: p2 = i3.format("placeholder"), isQuiet: f2, label: m2, labelPosition: h2 = "top", menuWidth: g2, name: y2, autoFocus: b2 } = t3, E2 = function(t4) {
      let r3 = xf(t4), [n3, i4] = (0, e2.useState)(null), o4 = Uf({ ...t4, onSelectionChange: (e3) => {
        null != t4.onSelectionChange && t4.onSelectionChange(e3), r3.close(), s2.commitValidation();
      } }), s2 = Tf({ ...t4, value: o4.selectedKey }), [a2, l3] = (0, e2.useState)(false);
      return { ...s2, ...o4, ...r3, focusStrategy: n3, open(e3 = null) {
        0 !== o4.collection.size && (i4(e3), r3.open());
      }, toggle(e3 = null) {
        0 !== o4.collection.size && (i4(e3), r3.toggle());
      }, isFocused: a2, setFocused: l3 };
    }(t3), T2 = de(r2), S2 = (0, e2.useRef)(), P2 = (0, e2.useRef)(), w2 = function(t4) {
      return (0, e2.useMemo)(() => fe(t4), [t4]);
    }(P2), x2 = (0, e2.useRef)(), R2 = t3.isLoading && 0 === E2.collection.size, A2 = t3.isLoading && E2.collection.size > 0, M2 = _(), L2 = Au(E2, A2), { labelProps: N2, triggerProps: F2, valueProps: k2, menuProps: D2, descriptionProps: U2, errorMessageProps: j2, isInvalid: B2, validationErrors: K2, validationDetails: z2 } = function(t4, r3, n3) {
      let { keyboardDelegate: i4, isDisabled: o4, isRequired: a2, name: l3, validationBehavior: c3 = "aria" } = t4, u3 = Zs({ usage: "search", sensitivity: "base" }), d3 = (0, e2.useMemo)(() => i4 || new $s(r3.collection, r3.disabledKeys, null, u3), [i4, r3.collection, r3.disabledKeys, u3]), { menuTriggerProps: p3, menuProps: f3 } = ca({ isDisabled: o4, type: "listbox" }, r3, n3), { typeSelectProps: m3 } = Xs({ keyboardDelegate: d3, selectionManager: r3.selectionManager, onTypeSelect(e3) {
        r3.setSelectedKey(e3);
      } }), { isInvalid: h3, validationErrors: g3, validationDetails: y3 } = r3.displayValidation, { labelProps: v2, fieldProps: b3, descriptionProps: E3, errorMessageProps: T3 } = ta({ ...t4, labelElementType: "span", isInvalid: h3, errorMessage: t4.errorMessage || g3 });
      m3.onKeyDown = m3.onKeyDownCapture, delete m3.onKeyDownCapture;
      let S3 = ve(t4, { labelable: true }), P3 = C(m3, p3, b3), w3 = _();
      return ua.set(r3, { isDisabled: o4, isRequired: a2, name: l3, validationBehavior: c3 }), { labelProps: { ...v2, onClick: () => {
        t4.isDisabled || (n3.current.focus(), Ct("keyboard"));
      } }, triggerProps: C(S3, { ...P3, isDisabled: o4, onKeyDown: s(P3.onKeyDown, (e3) => {
        switch (e3.key) {
          case "ArrowLeft": {
            e3.preventDefault();
            let t5 = null != r3.selectedKey ? d3.getKeyAbove(r3.selectedKey) : d3.getFirstKey();
            t5 && r3.setSelectedKey(t5);
            break;
          }
          case "ArrowRight": {
            e3.preventDefault();
            let t5 = null != r3.selectedKey ? d3.getKeyBelow(r3.selectedKey) : d3.getFirstKey();
            t5 && r3.setSelectedKey(t5);
            break;
          }
        }
      }, t4.onKeyDown), onKeyUp: t4.onKeyUp, "aria-labelledby": [w3, P3["aria-labelledby"], P3["aria-label"] && !P3["aria-labelledby"] ? P3.id : null].filter(Boolean).join(" "), onFocus(e3) {
        r3.isFocused || (t4.onFocus && t4.onFocus(e3), t4.onFocusChange && t4.onFocusChange(true), r3.setFocused(true));
      }, onBlur(e3) {
        r3.isOpen || (t4.onBlur && t4.onBlur(e3), t4.onFocusChange && t4.onFocusChange(false), r3.setFocused(false));
      } }), valueProps: { id: w3 }, menuProps: { ...f3, autoFocus: r3.focusStrategy || true, shouldSelectOnPressUp: true, shouldFocusOnHover: true, disallowEmptySelection: true, linkBehavior: "selection", onBlur: (e3) => {
        e3.currentTarget.contains(e3.relatedTarget) || (t4.onBlur && t4.onBlur(e3), t4.onFocusChange && t4.onFocusChange(false), r3.setFocused(false));
      }, "aria-labelledby": [b3["aria-labelledby"], P3["aria-label"] && !b3["aria-labelledby"] ? P3.id : null].filter(Boolean).join(" ") }, descriptionProps: E3, errorMessageProps: T3, isInvalid: h3, validationErrors: g3, validationDetails: y3 };
    }({ ...t3, "aria-describedby": R2 ? M2 : void 0, keyboardDelegate: L2 }, E2, w2), W2 = !v() && "undefined" != typeof window && window.screen.width <= 700, { hoverProps: V2, isHovered: H2 } = Ws({ isDisabled: l2 }), G2 = e2.createElement(Lu, { ...D2, ref: x2, disallowEmptySelection: true, autoFocus: E2.focusStrategy || true, shouldSelectOnPressUp: true, focusOnPointerEnter: true, layout: L2, state: E2, width: W2 ? "100%" : void 0, UNSAFE_style: { maxHeight: "inherit" }, isLoading: t3.isLoading, onLoadMore: t3.onLoadMore }), [q2, $2] = (0, e2.useState)(null), { scale: Y2 } = Vn(), X2 = (0, e2.useCallback)(() => {
      if (!W2 && w2.current) {
        let e3 = w2.current.offsetWidth;
        $2(e3);
      }
    }, [w2, $2, W2]);
    if (Qe({ ref: w2, onResize: X2 }), a(X2, [Y2, E2.selectedKey, X2]), W2) n2 = e2.createElement(yp, { state: E2 }, G2);
    else {
      let t4 = f2 ? null : q2, r3 = { width: g2 ? J(g2) : t4, minWidth: f2 ? `calc(${q2}px + calc(2 * var(--spectrum-dropdown-quiet-offset)))` : q2 };
      n2 = e2.createElement(gf, { UNSAFE_style: r3, UNSAFE_className: Xe(jf(or), "spectrum-Dropdown-popover", { "spectrum-Dropdown-popover--quiet": f2 }), ref: S2, placement: `${c2} ${u2}`, shouldFlip: d2, hideArrow: true, state: E2, triggerRef: w2, scrollRef: x2 }, G2);
    }
    let Q2 = E2.selectedItem ? E2.selectedItem.rendered : p2;
    "string" == typeof Q2 && (Q2 = e2.createElement(Ml, null, Q2));
    let Z2 = e2.createElement("div", { className: Xe(jf(or), "spectrum-Dropdown", { "is-invalid": B2 && !l2, "is-disabled": l2, "spectrum-Dropdown--quiet": f2 }) }, e2.createElement(va, { autoComplete: o3, isDisabled: l2, state: E2, triggerRef: w2, label: m2, name: y2 }), e2.createElement($u, C(V2, F2), e2.createElement(Gs, { ref: P2, isActive: E2.isOpen, isQuiet: f2, isDisabled: l2, isInvalid: B2, autoFocus: b2, UNSAFE_className: Xe(jf(or), "spectrum-Dropdown-trigger", { "is-hovered": H2 }) }, e2.createElement(I, { slots: { icon: { UNSAFE_className: Xe(jf(or), "spectrum-Icon"), size: "S" }, avatar: { UNSAFE_className: Xe(jf(or), "spectrum-Dropdown-avatar"), size: "avatar-size-100" }, text: { ...k2, UNSAFE_className: Xe(jf(or), "spectrum-Dropdown-label", { "is-placeholder": !E2.selectedItem }) }, description: { isHidden: true } } }, Q2), R2 && e2.createElement(cu, { id: M2, isIndeterminate: true, size: "S", "aria-label": i3.format("loading"), UNSAFE_className: Xe(jf(or), "spectrum-Dropdown-progressCircle") }), B2 && !R2 && !l2 && e2.createElement($n, { UNSAFE_className: Xe(jf(or), "spectrum-Dropdown-invalidIcon") }), e2.createElement(Xn, { UNSAFE_className: Xe(jf(or), "spectrum-Dropdown-chevron") }))), 0 === E2.collection.size ? null : n2), ee2 = Xe(jf(or), "spectrum-Field", { "spectrum-Dropdown-fieldWrapper--quiet": f2, "spectrum-Dropdown-fieldWrapper--positionSide": "side" === h2 });
    return e2.createElement(bo, { ...t3, ref: T2, wrapperClassName: ee2, labelProps: N2, descriptionProps: U2, errorMessageProps: j2, isInvalid: B2, validationErrors: K2, validationDetails: z2, showErrorIcon: false, includeNecessityIndicatorInAccessibilityName: true, elementType: "span" }, Z2);
  }
  const Kf = e2.forwardRef(Bf);
  function zf(e3) {
    return null;
  }
  function Wf(t3) {
    return null != t3.hasChildItems ? t3.hasChildItems : !!t3.childItems || !!(t3.title && e2.Children.count(t3.children) > 0);
  }
  zf.getCollectionNode = function* (t3, r2) {
    let { childItems: n2, title: i3, children: o3 } = t3, s2 = t3.title || t3.children, a2 = t3.textValue || ("string" == typeof s2 ? s2 : "") || t3["aria-label"] || "";
    a2 || (null == r2 ? void 0 : r2.suppressTextValueWarning) || console.warn("<Item> with non-plain text contents is unsupported by type to select for accessibility. Please add a `textValue` prop."), yield { type: "item", props: t3, rendered: s2, textValue: a2, "aria-label": t3["aria-label"], hasChildNodes: Wf(t3), *childNodes() {
      if (n2) for (let e3 of n2) yield { type: "item", value: e3 };
      else if (i3) {
        let t4 = [];
        e2.Children.forEach(o3, (e3) => {
          t4.push({ type: "item", element: e3 });
        }), yield* t4;
      }
    } };
  };
  let Vf = zf;
  function Hf(e3, t3) {
    let r2 = null;
    if (e3) {
      for (r2 = e3.getFirstKey(); t3.has(r2) && r2 !== e3.getLastKey(); ) r2 = e3.getKeyAfter(r2);
      t3.has(r2) && r2 === e3.getLastKey() && (r2 = e3.getFirstKey());
    }
    return r2;
  }
  const Gf = /* @__PURE__ */ new WeakMap();
  function qf(e3, t3, r2) {
    return "string" == typeof t3 && (t3 = t3.replace(/\s+/g, "")), `${Gf.get(e3)}-${r2}-${t3}`;
  }
  class $f {
    getKeyLeftOf(e3) {
      return this.flipDirection ? this.getNextKey(e3) : this.getPreviousKey(e3);
    }
    getKeyRightOf(e3) {
      return this.flipDirection ? this.getPreviousKey(e3) : this.getNextKey(e3);
    }
    getKeyAbove(e3) {
      return this.getPreviousKey(e3);
    }
    getKeyBelow(e3) {
      return this.getNextKey(e3);
    }
    isDisabled(e3) {
      var t3, r2;
      return this.disabledKeys.has(e3) || !!(null === (r2 = this.collection.getItem(e3)) || void 0 === r2 || null === (t3 = r2.props) || void 0 === t3 ? void 0 : t3.isDisabled);
    }
    getFirstKey() {
      let e3 = this.collection.getFirstKey();
      return null != e3 && this.isDisabled(e3) && (e3 = this.getNextKey(e3)), e3;
    }
    getLastKey() {
      let e3 = this.collection.getLastKey();
      return null != e3 && this.isDisabled(e3) && (e3 = this.getPreviousKey(e3)), e3;
    }
    getNextKey(e3) {
      do {
        null == (e3 = this.collection.getKeyAfter(e3)) && (e3 = this.collection.getFirstKey());
      } while (this.isDisabled(e3));
      return e3;
    }
    getPreviousKey(e3) {
      do {
        null == (e3 = this.collection.getKeyBefore(e3)) && (e3 = this.collection.getLastKey());
      } while (this.isDisabled(e3));
      return e3;
    }
    constructor(e3, t3, r2, n2 = /* @__PURE__ */ new Set()) {
      this.collection = e3, this.flipDirection = "rtl" === t3 && "horizontal" === r2, this.disabledKeys = n2;
    }
  }
  function Yf(t3, r2, n2) {
    let i3 = function(t4, r3) {
      let n3 = null == r3 ? void 0 : r3.isDisabled, [i4, o4] = (0, e2.useState)(false);
      return a(() => {
        if ((null == t4 ? void 0 : t4.current) && !n3) {
          let e3 = () => {
            if (t4.current) {
              let e4 = hc(t4.current, { tabbable: true });
              o4(!!e4.nextNode());
            }
          };
          e3();
          let r4 = new MutationObserver(e3);
          return r4.observe(t4.current, { subtree: true, childList: true, attributes: true, attributeFilter: ["tabIndex", "disabled"] }), () => {
            r4.disconnect();
          };
        }
      }), !n3 && i4;
    }(n2) ? void 0 : 0;
    var o3;
    const s2 = qf(r2, null !== (o3 = t3.id) && void 0 !== o3 ? o3 : null == r2 ? void 0 : r2.selectedKey, "tabpanel");
    return { tabPanelProps: C(Js({ ...t3, id: s2, "aria-labelledby": qf(r2, null == r2 ? void 0 : r2.selectedKey, "tab") }), { tabIndex: i3, role: "tabpanel", "aria-describedby": t3["aria-describedby"], "aria-details": t3["aria-details"] }) };
  }
  function Xf(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  const Qf = e2.createContext(null);
  function Zf(t3, r2) {
    t3 = Hn(t3);
    let { orientation: n2 = "horizontal", density: i3 = "regular", children: o3, ...s2 } = t3, a2 = de(r2), l2 = (0, e2.useRef)(), c2 = (0, e2.useRef)(), { direction: u2 } = H(), { styleProps: d2 } = se(s2), [p2, f2] = (0, e2.useState)(false), [m2, h2] = (0, e2.useState)();
    const [g2, y2] = (0, e2.useState)(null);
    let [v2, b2] = (0, e2.useState)([]), E2 = (0, e2.useRef)(v2);
    (0, e2.useEffect)(() => {
      if (l2.current) {
        var e3;
        let t4 = l2.current.querySelector(`[data-key="${CSS.escape(null == g2 || null === (e3 = g2.selectedKey) || void 0 === e3 ? void 0 : e3.toString())}"]`);
        null != t4 && h2(t4);
      }
    }, [o3, null == g2 ? void 0 : g2.selectedKey, p2, l2]);
    let T2 = (0, e2.useCallback)(() => {
      if (c2.current && "vertical" !== n2) {
        let e3 = c2.current, t4 = [...l2.current.querySelectorAll('[role="tab"]')].map((e4) => e4.getBoundingClientRect()), r3 = "rtl" === u2 ? "left" : "right", n3 = e3.getBoundingClientRect()[r3], i4 = t4[t4.length - 1][r3];
        f2("rtl" === u2 ? i4 < n3 : n3 < i4), (t4.length !== E2.current.length || t4.some((e4, t5) => {
          var r4, n4;
          return (null == e4 ? void 0 : e4.left) !== (null === (r4 = E2.current[t5]) || void 0 === r4 ? void 0 : r4.left) || (null == e4 ? void 0 : e4.right) !== (null === (n4 = E2.current[t5]) || void 0 === n4 ? void 0 : n4.right);
        })) && (b2(t4), E2.current = t4);
      }
    }, [l2, c2, u2, n2, f2, E2, b2]);
    (0, e2.useEffect)(() => {
      T2();
    }, [o3, T2]), Qe({ ref: c2, onResize: T2 });
    let S2 = { "aria-labelledby": void 0 }, P2 = _();
    return p2 && "vertical" !== n2 && (S2["aria-labelledby"] = P2), e2.createElement(Qf.Provider, { value: { tabProps: { ...t3, orientation: n2, density: i3 }, tabState: { tabListState: g2, setTabListState: y2, selectedTab: m2, collapsed: p2 }, refs: { tablistRef: l2, wrapperRef: c2 }, tabPanelProps: S2, tabLineState: v2 } }, e2.createElement("div", { ...ve(s2), ...d2, ref: a2, className: Xe(Xf($e), "spectrum-TabsPanel", `spectrum-TabsPanel--${n2}`, d2.className) }, t3.children));
  }
  function Jf(t3) {
    let { item: r2, state: n2 } = t3, { key: i3, rendered: o3 } = r2, s2 = (0, e2.useRef)(), { tabProps: a2, isSelected: l2, isDisabled: c2 } = function(e3, t4, r3) {
      let { key: n3, isDisabled: i4, shouldSelectOnPressUp: o4 } = e3, { selectionManager: s3, selectedKey: a3 } = t4, l3 = n3 === a3, c3 = i4 || t4.isDisabled || t4.selectionManager.isDisabled(n3), { itemProps: u3, isPressed: d3 } = Kl({ selectionManager: s3, key: n3, ref: r3, isDisabled: c3, shouldSelectOnPressUp: o4, linkBehavior: "selection" }), p3 = qf(t4, n3, "tab"), f2 = qf(t4, n3, "tabpanel"), { tabIndex: m2 } = u3, h2 = t4.collection.getItem(n3), g2 = ve(null == h2 ? void 0 : h2.props, { labelable: true });
      return delete g2.id, { tabProps: C(g2, Nn(null == h2 ? void 0 : h2.props), u3, { id: p3, "aria-selected": l3, "aria-disabled": c3 || void 0, "aria-controls": l3 ? f2 : void 0, tabIndex: c3 ? void 0 : m2, role: "tab" }), isSelected: l3, isDisabled: c3, isPressed: d3 };
    }({ key: i3 }, n2, s2), { hoverProps: u2, isHovered: d2 } = Ws({ ...t3 }), p2 = r2.props.href ? "a" : "div";
    return e2.createElement(Lt, { focusRingClass: Xe(Xf($e), "focus-ring") }, e2.createElement(p2, { ...C(a2, u2), ref: s2, className: Xe(Xf($e), "spectrum-Tabs-item", { "is-selected": l2, "is-disabled": c2, "is-hovered": d2 }) }, e2.createElement(I, { slots: { icon: { size: "S", UNSAFE_className: Xe(Xf($e), "spectrum-Icon") }, text: { UNSAFE_className: Xe(Xf($e), "spectrum-Tabs-itemLabel") } } }, "string" == typeof o3 ? e2.createElement(Ml, null, o3) : o3)));
  }
  function em(t3) {
    let { orientation: r2, selectedTab: n2, selectedKey: i3 } = t3, { direction: o3 } = H(), { scale: s2 } = Vn(), { tabLineState: l2 } = (0, e2.useContext)(Qf), [c2, u2] = (0, e2.useState)({ width: void 0, height: void 0 }), d2 = (0, e2.useCallback)(() => {
      if (n2) {
        var e3;
        let t4 = { transform: void 0, width: void 0, height: void 0 }, i4 = "rtl" === o3 ? -1 * ((null === (e3 = n2.offsetParent) || void 0 === e3 ? void 0 : e3.offsetWidth) - n2.offsetWidth - n2.offsetLeft) : n2.offsetLeft;
        t4.transform = "vertical" === r2 ? `translateY(${n2.offsetTop}px)` : `translateX(${i4}px)`, "horizontal" === r2 ? t4.width = `${n2.offsetWidth}px` : t4.height = `${n2.offsetHeight}px`, u2(t4);
      }
    }, [o3, u2, n2, r2]);
    return a(() => {
      d2();
    }, [d2, s2, i3, l2]), e2.createElement("div", { className: Xe(Xf($e), "spectrum-Tabs-selectionIndicator"), role: "presentation", style: c2 });
  }
  function tm(t3) {
    const r2 = (0, e2.useContext)(Qf), { refs: n2, tabState: i3, tabProps: o3, tabPanelProps: s2 } = r2, { isQuiet: a2, density: l2, isEmphasized: c2, orientation: u2 } = o3, { selectedTab: d2, collapsed: p2, setTabListState: f2 } = i3, { tablistRef: m2, wrapperRef: h2 } = n2, g2 = function(t4) {
      var r3;
      let n3 = Uf({ ...t4, suppressTextValueWarning: true, defaultSelectedKey: null !== (r3 = t4.defaultSelectedKey) && void 0 !== r3 ? r3 : Hf(t4.collection, t4.disabledKeys ? new Set(t4.disabledKeys) : /* @__PURE__ */ new Set()) }), { selectionManager: i4, collection: o4, selectedKey: s3 } = n3, a3 = (0, e2.useRef)(s3);
      return (0, e2.useEffect)(() => {
        let e3 = s3;
        !i4.isEmpty && o4.getItem(e3) || (e3 = Hf(o4, n3.disabledKeys), null != e3 && i4.setSelectedKeys([e3])), (null != e3 && null == i4.focusedKey || !i4.isFocused && e3 !== a3.current) && i4.setFocusedKey(e3), a3.current = e3;
      }), { ...n3, isDisabled: t4.isDisabled || false };
    }({ ...o3, children: t3.children });
    let { styleProps: y2 } = se(t3);
    const { tabListProps: v2 } = function(t4, r3, n3) {
      let { orientation: i4 = "horizontal", keyboardActivation: o4 = "automatic" } = t4, { collection: s3, selectionManager: a3, disabledKeys: l3 } = r3, { direction: c3 } = H(), u3 = (0, e2.useMemo)(() => new $f(s3, c3, i4, l3), [s3, l3, i4, c3]), { collectionProps: d3 } = Tc({ ref: n3, selectionManager: a3, keyboardDelegate: u3, selectOnFocus: "automatic" === o4, disallowEmptySelection: true, scrollRef: n3, linkBehavior: "selection" }), p3 = _();
      return Gf.set(r3, p3), { tabListProps: { ...C(d3, Js({ ...t4, id: p3 })), role: "tablist", "aria-orientation": i4, tabIndex: void 0 } };
    }({ ...o3, ...t3 }, g2, m2);
    (0, e2.useEffect)(() => {
      f2(g2);
    }, [g2.disabledKeys, g2.selectedItem, g2.selectedKey, t3.children]);
    let b2 = "vertical" === u2 ? y2 : { style: p2 && "vertical" !== u2 ? { maxWidth: "calc(100% + 1px)", overflow: "hidden", visibility: "hidden", position: "absolute" } : { maxWidth: "calc(100% + 1px)" } };
    p2 && "vertical" !== u2 && (v2["aria-hidden"] = true);
    let E2 = Xe(Xf($e), "spectrum-TabsPanel-tabs");
    const T2 = e2.createElement("div", { ...b2, ...v2, ref: m2, className: Xe(Xf($e), "spectrum-Tabs", `spectrum-Tabs--${u2}`, E2, { "spectrum-Tabs--quiet": a2, "spectrum-Tabs--emphasized": c2, "spectrum-Tabs--compact": "compact" === l2 }, "vertical" === u2 && y2.className) }, [...g2.collection].map((t4) => e2.createElement(Jf, { key: t4.key, item: t4, state: g2, orientation: u2 })), e2.createElement(em, { orientation: u2, selectedTab: d2 }));
    return "vertical" === u2 ? T2 : e2.createElement("div", { ...y2, ref: h2, className: Xe(Xf($e), "spectrum-TabsPanel-collapseWrapper", y2.className) }, e2.createElement(im, { ...t3, ...o3, visible: p2, id: s2["aria-labelledby"], state: g2, className: E2 }), T2);
  }
  function rm(t3) {
    const { tabState: r2, tabProps: n2 } = (0, e2.useContext)(Qf), { tabListState: i3 } = r2, o3 = (0, e2.useCallback)((e3) => new Of(e3), []), s2 = kf({ items: n2.items, ...t3 }, o3, { suppressTextValueWarning: true }), a2 = i3 ? s2.getItem(i3.selectedKey) : null;
    return e2.createElement(nm, { ...t3, key: null == i3 ? void 0 : i3.selectedKey }, a2 && a2.props.children);
  }
  function nm(t3) {
    const { tabState: r2, tabPanelProps: n2 } = (0, e2.useContext)(Qf), { tabListState: i3 } = r2;
    let o3 = (0, e2.useRef)();
    const { tabPanelProps: s2 } = Yf(t3, i3, o3);
    let { styleProps: a2 } = se(t3);
    return n2["aria-labelledby"] && (s2["aria-labelledby"] = n2["aria-labelledby"]), e2.createElement(Lt, { focusRingClass: Xe(Xf($e), "focus-ring") }, e2.createElement("div", { ...a2, ...s2, ref: o3, className: Xe(Xf($e), "spectrum-TabsPanel-tabpanel", a2.className) }, t3.children));
  }
  function im(t3) {
    let { isDisabled: r2, isEmphasized: n2, isQuiet: i3, state: o3, "aria-labelledby": s2, "aria-label": a2, density: l2, className: c2, id: u2, visible: d2 } = t3, p2 = (0, e2.useRef)(), [f2, m2] = (0, e2.useState)(null);
    (0, e2.useEffect)(() => {
      let e3 = fe(p2);
      m2(e3.current);
    }, [p2]);
    let h2 = [...o3.collection], g2 = { "aria-labelledby": s2, "aria-label": a2 };
    const y2 = d2 ? {} : { visibility: "hidden", position: "absolute" };
    return e2.createElement("div", { className: Xe(Xf($e), "spectrum-Tabs", "spectrum-Tabs--horizontal", "spectrum-Tabs--isCollapsed", { "spectrum-Tabs--quiet": i3, "spectrum-Tabs--compact": "compact" === l2, "spectrum-Tabs--emphasized": n2 }, c2), style: y2, "aria-hidden": !d2 || void 0 }, e2.createElement(I, { slots: { icon: { size: "S", UNSAFE_className: Xe(Xf($e), "spectrum-Icon") }, button: { focusRingClass: Xe(Xf($e), "focus-ring") } } }, e2.createElement(Kf, { ...g2, id: u2, items: h2, ref: p2, isQuiet: true, isDisabled: !d2 || r2, selectedKey: o3.selectedKey, disabledKeys: o3.disabledKeys, onSelectionChange: o3.setSelectedKey, UNSAFE_className: Xe(Xf($e), "spectrum-Tabs-picker") }, (t4) => e2.createElement(Vf, t4.props, t4.rendered)), f2 && e2.createElement(em, { orientation: "horizontal", selectedTab: f2, selectedKey: o3.selectedKey })));
  }
  const om = e2.forwardRef(Zf);
  function sm(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(2124);
  var am, lm, cm, um, dm, pm, fm, mm, hm, gm, ym, vm, bm, Em, _m, Tm, Sm, Pm, wm, Cm, xm, Om, Im = {};
  function Rm(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function Am(t3, r2) {
    let { validationState: n2 = t3.isInvalid ? "invalid" : null, icon: i3, isQuiet: o3 = false, isDisabled: s2, multiLine: a2, autoFocus: l2, inputClassName: c2, wrapperChildren: u2, labelProps: d2, inputProps: p2, descriptionProps: f2, errorMessageProps: m2, inputRef: h2, isLoading: g2, loadingIndicator: y2, validationIconClassName: v2, disableFocusRing: b2 } = t3, { hoverProps: E2, isHovered: _2 } = Ws({ isDisabled: s2 }), T2 = (0, e2.useRef)(null), S2 = (0, e2.useRef)(null), P2 = h2 || S2;
    (0, e2.useImperativeHandle)(r2, () => ({ ...ue(T2, P2), select() {
      P2.current && P2.current.select();
    }, getInputElement: () => P2.current }));
    let w2 = a2 ? "textarea" : "input", x2 = "invalid" === n2 && !s2;
    if (i3) {
      let t4 = Xe(Rm(Im), i3.props && i3.props.UNSAFE_className, "spectrum-Textfield-icon");
      i3 = (0, e2.cloneElement)(i3, { UNSAFE_className: t4, size: "S" });
    }
    let O2 = x2 ? e2.createElement($n, null) : e2.createElement(wl, null), I2 = (0, e2.cloneElement)(O2, { UNSAFE_className: Xe(Rm(Im), "spectrum-Textfield-validationIcon", v2) }), { focusProps: R2, isFocusVisible: A2 } = Mt({ isTextInput: true, autoFocus: l2 }), M2 = e2.createElement("div", { className: Xe(Rm(Im), "spectrum-Textfield", { "spectrum-Textfield--invalid": x2, "spectrum-Textfield--valid": "valid" === n2 && !s2, "spectrum-Textfield--loadable": y2, "spectrum-Textfield--quiet": o3, "spectrum-Textfield--multiline": a2, "focus-ring": !b2 && A2 }) }, e2.createElement(w2, { ...C(p2, E2, R2), ref: P2, rows: a2 ? 1 : void 0, className: Xe(Rm(Im), "spectrum-Textfield-input", { "spectrum-Textfield-inputIcon": i3, "is-hovered": _2 }, c2) }), i3, !n2 || g2 || s2 ? null : I2, g2 && y2, u2);
    return e2.createElement(bo, { ...t3, labelProps: d2, descriptionProps: f2, errorMessageProps: m2, wrapperClassName: Xe(Rm(Im), "spectrum-Textfield-wrapper", { "spectrum-Textfield-wrapper--quiet": o3 }), showErrorIcon: false, ref: T2 }, M2);
  }
  sm(Im, "focus-ring", () => am, (e3) => am = e3), sm(Im, "i18nFontFamily", () => lm, (e3) => lm = e3), sm(Im, "is-disabled", () => cm, (e3) => cm = e3), sm(Im, "is-focused", () => um, (e3) => um = e3), sm(Im, "is-hovered", () => dm, (e3) => dm = e3), sm(Im, "is-placeholder", () => pm, (e3) => pm = e3), sm(Im, "spectrum-FocusRing-ring", () => fm, (e3) => fm = e3), sm(Im, "spectrum-FocusRing", () => mm, (e3) => mm = e3), sm(Im, "spectrum-FocusRing--quiet", () => hm, (e3) => hm = e3), sm(Im, "spectrum-Textfield", () => gm, (e3) => gm = e3), sm(Im, "spectrum-Textfield--invalid", () => ym, (e3) => ym = e3), sm(Im, "spectrum-Textfield--loadable", () => vm, (e3) => vm = e3), sm(Im, "spectrum-Textfield--multiline", () => bm, (e3) => bm = e3), sm(Im, "spectrum-Textfield--quiet", () => Em, (e3) => Em = e3), sm(Im, "spectrum-Textfield--valid", () => _m, (e3) => _m = e3), sm(Im, "spectrum-Textfield-circleLoader", () => Tm, (e3) => Tm = e3), sm(Im, "spectrum-Textfield-icon", () => Sm, (e3) => Sm = e3), sm(Im, "spectrum-Textfield-input", () => Pm, (e3) => Pm = e3), sm(Im, "spectrum-Textfield-inputIcon", () => wm, (e3) => wm = e3), sm(Im, "spectrum-Textfield-validationIcon", () => Cm, (e3) => Cm = e3), sm(Im, "spectrum-Textfield-wrapper", () => xm, (e3) => xm = e3), sm(Im, "spectrum-Textfield-wrapper--quiet", () => Om, (e3) => Om = e3), am = "YO3Nla_focus-ring", cm = "YO3Nla_is-disabled", um = "YO3Nla_is-focused", dm = "YO3Nla_is-hovered", pm = "YO3Nla_is-placeholder", gm = "YO3Nla_spectrum-Textfield " + (mm = "YO3Nla_spectrum-FocusRing " + (fm = "YO3Nla_spectrum-FocusRing-ring")), ym = "YO3Nla_spectrum-Textfield--invalid", vm = "YO3Nla_spectrum-Textfield--loadable", bm = "YO3Nla_spectrum-Textfield--multiline", Em = "YO3Nla_spectrum-Textfield--quiet " + (hm = "YO3Nla_spectrum-FocusRing--quiet"), _m = "YO3Nla_spectrum-Textfield--valid", Tm = "YO3Nla_spectrum-Textfield-circleLoader", Sm = "YO3Nla_spectrum-Textfield-icon", Pm = "YO3Nla_spectrum-Textfield-input " + (lm = "YO3Nla_i18nFontFamily"), wm = "YO3Nla_spectrum-Textfield-inputIcon", Cm = "YO3Nla_spectrum-Textfield-validationIcon", xm = "YO3Nla_spectrum-Textfield-wrapper", Om = "YO3Nla_spectrum-Textfield-wrapper--quiet";
  const Mm = (0, e2.forwardRef)(Am);
  function Lm(t3, r2) {
    t3 = go(t3 = Hn(t3));
    let n2 = (0, e2.useRef)(null), i3 = function(t4, r3) {
      let { inputElementType: n3 = "input", isDisabled: i4 = false, isRequired: o3 = false, isReadOnly: s2 = false, type: a2 = "text", validationBehavior: l2 = "aria" } = t4, [c2, u2] = Cf(t4.value, t4.defaultValue || "", t4.onChange), { focusableProps: d2 } = ms(t4, r3), p2 = Tf({ ...t4, value: c2 }), { isInvalid: f2, validationErrors: m2, validationDetails: h2 } = p2.displayValidation, { labelProps: g2, fieldProps: y2, descriptionProps: v2, errorMessageProps: b2 } = ta({ ...t4, isInvalid: f2, errorMessage: t4.errorMessage || m2 }), E2 = ve(t4, { labelable: true });
      const _2 = { type: a2, pattern: t4.pattern };
      return da(r3, c2, u2), pa(t4, p2, r3), (0, e2.useEffect)(() => {
        if (r3.current instanceof ct(r3.current).HTMLTextAreaElement) {
          let e3 = r3.current;
          Object.defineProperty(e3, "defaultValue", { get: () => e3.value, set: () => {
          }, configurable: true });
        }
      }, [r3]), { labelProps: g2, inputProps: C(E2, "input" === n3 && _2, { disabled: i4, readOnly: s2, required: o3 && "native" === l2, "aria-required": o3 && "aria" === l2 || void 0, "aria-invalid": f2 || void 0, "aria-errormessage": t4["aria-errormessage"], "aria-activedescendant": t4["aria-activedescendant"], "aria-autocomplete": t4["aria-autocomplete"], "aria-haspopup": t4["aria-haspopup"], value: c2, onChange: (e3) => u2(e3.target.value), autoComplete: t4.autoComplete, autoCapitalize: t4.autoCapitalize, maxLength: t4.maxLength, minLength: t4.minLength, name: t4.name, placeholder: t4.placeholder, inputMode: t4.inputMode, onCopy: t4.onCopy, onCut: t4.onCut, onPaste: t4.onPaste, onCompositionEnd: t4.onCompositionEnd, onCompositionStart: t4.onCompositionStart, onCompositionUpdate: t4.onCompositionUpdate, onSelect: t4.onSelect, onBeforeInput: t4.onBeforeInput, onInput: t4.onInput, ...d2, ...y2 }), descriptionProps: v2, errorMessageProps: b2, isInvalid: f2, validationErrors: m2, validationDetails: h2 };
    }(t3, n2);
    return t3.placeholder && console.warn("Placeholders are deprecated due to accessibility issues. Please use help text instead. See the docs for details: https://react-spectrum.adobe.com/react-spectrum/TextField.html#help-text"), e2.createElement(Mm, { ...t3, ...i3, ref: r2, inputRef: n2 });
  }
  const Nm = (0, e2.forwardRef)(Lm);
  function Fm(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(9422);
  var km, Dm, Um, jm, Bm, Km, zm, Wm, Vm, Hm, Gm, qm = {};
  Fm(qm, "focus-ring", () => km, (e3) => km = e3), Fm(qm, "i18nFontFamily", () => Dm, (e3) => Dm = e3), Fm(qm, "spectrum-FocusRing-ring", () => Um, (e3) => Um = e3), Fm(qm, "spectrum-FocusRing", () => jm, (e3) => jm = e3), Fm(qm, "spectrum-FocusRing--quiet", () => Bm, (e3) => Bm = e3), Fm(qm, "spectrum-Rule", () => Km, (e3) => Km = e3), Fm(qm, "spectrum-Rule--horizontal", () => zm, (e3) => zm = e3), Fm(qm, "spectrum-Rule--large", () => Wm, (e3) => Wm = e3), Fm(qm, "spectrum-Rule--medium", () => Vm, (e3) => Vm = e3), Fm(qm, "spectrum-Rule--small", () => Hm, (e3) => Hm = e3), Fm(qm, "spectrum-Rule--vertical", () => Gm, (e3) => Gm = e3), km = "cTbPrq_focus-ring", Dm = "cTbPrq_i18nFontFamily", jm = "cTbPrq_spectrum-FocusRing " + (Um = "cTbPrq_spectrum-FocusRing-ring"), Bm = "cTbPrq_spectrum-FocusRing--quiet", Km = "cTbPrq_spectrum-Rule", zm = "cTbPrq_spectrum-Rule--horizontal", Wm = "cTbPrq_spectrum-Rule--large", Vm = "cTbPrq_spectrum-Rule--medium", Hm = "cTbPrq_spectrum-Rule--small", Gm = "cTbPrq_spectrum-Rule--vertical";
  let $m = { S: "small", M: "medium", L: "large" };
  function Ym(t3, r2) {
    t3 = O(t3, "divider");
    let { size: n2 = "L", orientation: i3 = "horizontal", ...o3 } = t3, s2 = de(r2), { styleProps: a2 } = se(o3), l2 = $m[n2], c2 = "hr";
    "vertical" === i3 && (c2 = "div");
    let { separatorProps: u2 } = function(e3) {
      let t4, r3 = ve(e3, { labelable: true });
      return "vertical" === e3.orientation && (t4 = "vertical"), "hr" !== e3.elementType ? { separatorProps: { ...r3, role: "separator", "aria-orientation": t4 } } : { separatorProps: r3 };
    }({ ...t3, elementType: c2 });
    return e2.createElement(c2, { ...a2, className: Xe((d2 = qm, d2 && d2.__esModule ? d2.default : d2), "spectrum-Rule", `spectrum-Rule--${l2}`, { "spectrum-Rule--vertical": "vertical" === i3, "spectrum-Rule--horizontal": "horizontal" === i3 }, a2.className), ref: s2, ...u2 });
    var d2;
  }
  let Xm = e2.forwardRef(Ym);
  function Qm(t3, r2) {
    let n2 = Df(t3), i3 = Au(n2, t3.isLoading), o3 = de(r2);
    return e2.createElement(Lu, { ...t3, ref: o3, state: n2, layout: i3 });
  }
  const Zm = e2.forwardRef(Qm);
  r(2077);
  var Jm, eh, th, rh, nh = {};
  function ih(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function oh(t3, r2) {
    let n2 = t3.alt;
    t3 = Hn(t3 = O(t3, "image"));
    let { objectFit: i3, src: o3, alt: s2, ...a2 } = t3, { styleProps: l2 } = se(a2), c2 = de(r2);
    return null == s2 && console.warn('The `alt` prop was not provided to an image. Add `alt` text for screen readers, or set `alt=""` prop to indicate that the image is decorative or redundant with displayed text and should not be announced by screen readers.'), e2.createElement("div", { ...ve(t3), ...l2, className: Xe(ih(nh), l2.className), style: { ...l2.style, overflow: "hidden" }, ref: c2 }, e2.createElement("img", { src: o3, alt: n2 || s2, style: { objectFit: i3 }, className: Xe(ih(nh), "spectrum-Image-img"), onError: null == t3 ? void 0 : t3.onError, onLoad: null == t3 ? void 0 : t3.onLoad }));
  }
  Jm = nh, eh = () => rh, th = (e3) => rh = e3, Object.defineProperty(Jm, "spectrum-Image-img", { get: eh, set: th, enumerable: true, configurable: true }), rh = "Gv9sRq_spectrum-Image-img";
  const sh = e2.forwardRef(oh);
  function ah(...e3) {
    return 1 === e3.length ? e3[0] : (t3) => {
      for (let r2 of e3) "function" == typeof r2 ? r2(t3) : null != r2 && (r2.current = t3);
    };
  }
  const lh = Symbol("default");
  if ("undefined" != typeof HTMLTemplateElement) {
    const e3 = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild").get;
    Object.defineProperty(HTMLTemplateElement.prototype, "firstChild", { configurable: true, enumerable: true, get: function() {
      return this.dataset.reactAriaHidden ? this.content.firstChild : e3.call(this);
    } });
  }
  "undefined" != typeof DocumentFragment && new DocumentFragment(), (0, e2.createContext)(null), (0, e2.createContext)(null), (0, e2.createContext)(null), (0, e2.createContext)(null), (0, e2.createContext)(null);
  const ch = (0, e2.createContext)({});
  function uh(t3, r2) {
    let n2 = de(r2);
    t3 = O(t3, "heading"), [t3, n2] = function(t4, r3, n3) {
      let i4 = function(t5, r4) {
        let n4 = (0, e2.useContext)(t5);
        if (null === r4) return null;
        if (n4 && "object" == typeof n4 && "slots" in n4 && n4.slots) {
          let e3 = new Intl.ListFormat().format(Object.keys(n4.slots).map((e4) => `"${e4}"`));
          if (!r4 && !n4.slots[lh]) throw new Error(`A slot prop is required. Valid slot names are ${e3}.`);
          let t6 = r4 || lh;
          if (!n4.slots[t6]) throw new Error(`Invalid slot "${r4}". Valid slot names are ${e3}.`);
          return n4.slots[t6];
        }
        return n4;
      }(n3, t4.slot) || {}, { ref: o4, ...s3 } = i4, a3 = qu((0, e2.useMemo)(() => ah(r3, o4), [r3, o4])), l3 = C(s3, t4);
      return "style" in s3 && s3.style && "style" in t4 && t4.style && ("function" == typeof s3.style || "function" == typeof t4.style ? l3.style = (e3) => {
        let r4 = "function" == typeof s3.style ? s3.style(e3) : s3.style, n4 = { ...e3.defaultStyle, ...r4 }, i5 = "function" == typeof t4.style ? t4.style({ ...e3, defaultStyle: n4 }) : t4.style;
        return { ...n4, ...i5 };
      } : l3.style = { ...s3.style, ...t4.style }), [l3, a3];
    }(t3, n2, ch);
    let { children: i3, level: o3 = 3, ...s2 } = t3, { styleProps: a2 } = se(s2), l2 = `h${o3}`;
    return e2.createElement(l2, { ...ve(s2), ...a2, ref: n2 }, i3);
  }
  const dh = (0, e2.forwardRef)(uh), ph = e2.createContext(null);
  function fh(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(6882);
  var mh, hh, gh, yh, vh, bh, Eh, _h, Th = {};
  fh(Th, "focus-ring", () => mh, (e3) => mh = e3), fh(Th, "i18nFontFamily", () => hh, (e3) => hh = e3), fh(Th, "spectrum-FieldGroup", () => gh, (e3) => gh = e3), fh(Th, "spectrum-FieldGroup-group", () => yh, (e3) => yh = e3), fh(Th, "spectrum-FieldGroup-group--horizontal", () => vh, (e3) => vh = e3), fh(Th, "spectrum-FocusRing-ring", () => bh, (e3) => bh = e3), fh(Th, "spectrum-FocusRing", () => Eh, (e3) => Eh = e3), fh(Th, "spectrum-FocusRing--quiet", () => _h, (e3) => _h = e3), mh = "hyn22G_focus-ring", hh = "hyn22G_i18nFontFamily", gh = "hyn22G_spectrum-FieldGroup", yh = "hyn22G_spectrum-FieldGroup-group", vh = "hyn22G_spectrum-FieldGroup-group--horizontal", Eh = "hyn22G_spectrum-FocusRing " + (bh = "hyn22G_spectrum-FocusRing-ring"), _h = "hyn22G_spectrum-FocusRing--quiet";
  const Sh = /* @__PURE__ */ new WeakMap();
  let Ph = Math.round(1e10 * Math.random()), wh = 0;
  function Ch(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function xh(t3, r2) {
    t3 = go(t3 = Hn(t3));
    let { isEmphasized: n2, children: i3, orientation: o3 = "vertical" } = t3, s2 = de(r2), a2 = function(t4) {
      let r3 = (0, e2.useMemo)(() => t4.name || `radio-group-${Ph}-${++wh}`, [t4.name]);
      var n3;
      let [i4, o4] = Cf(t4.value, null !== (n3 = t4.defaultValue) && void 0 !== n3 ? n3 : null, t4.onChange), [s3, a3] = (0, e2.useState)(null), l3 = Tf({ ...t4, value: i4 }), c3 = l3.displayValidation.isInvalid;
      return { ...l3, name: r3, selectedValue: i4, setSelectedValue: (e3) => {
        t4.isReadOnly || t4.isDisabled || (o4(e3), l3.commitValidation());
      }, lastFocusedValue: s3, setLastFocusedValue: a3, isDisabled: t4.isDisabled || false, isReadOnly: t4.isReadOnly || false, isRequired: t4.isRequired || false, validationState: t4.validationState || (c3 ? "invalid" : null), isInvalid: c3 };
    }(t3), { radioGroupProps: l2, ...c2 } = function(e3, t4) {
      let { name: r3, isReadOnly: n3, isRequired: i4, isDisabled: o4, orientation: s3 = "vertical", validationBehavior: a3 = "aria" } = e3, { direction: l3 } = H(), { isInvalid: c3, validationErrors: u2, validationDetails: d2 } = t4.displayValidation, { labelProps: p2, fieldProps: f2, descriptionProps: m2, errorMessageProps: h2 } = ta({ ...e3, labelElementType: "span", isInvalid: t4.isInvalid, errorMessage: e3.errorMessage || u2 }), g2 = ve(e3, { labelable: true }), { focusWithinProps: y2 } = At({ onBlurWithin(r4) {
        var n4;
        null === (n4 = e3.onBlur) || void 0 === n4 || n4.call(e3, r4), t4.selectedValue || t4.setLastFocusedValue(null);
      }, onFocusWithin: e3.onFocus, onFocusWithinChange: e3.onFocusChange }), v2 = _(r3);
      return Sh.set(t4, { name: v2, descriptionId: m2.id, errorMessageId: h2.id, validationBehavior: a3 }), { radioGroupProps: C(g2, { role: "radiogroup", onKeyDown: (e4) => {
        let r4;
        switch (e4.key) {
          case "ArrowRight":
            r4 = "rtl" === l3 && "vertical" !== s3 ? "prev" : "next";
            break;
          case "ArrowLeft":
            r4 = "rtl" === l3 && "vertical" !== s3 ? "next" : "prev";
            break;
          case "ArrowDown":
            r4 = "next";
            break;
          case "ArrowUp":
            r4 = "prev";
            break;
          default:
            return;
        }
        e4.preventDefault();
        let n4, i5 = hc(e4.currentTarget, { from: e4.target });
        "next" === r4 ? (n4 = i5.nextNode(), n4 || (i5.currentNode = e4.currentTarget, n4 = i5.firstChild())) : (n4 = i5.previousNode(), n4 || (i5.currentNode = e4.currentTarget, n4 = i5.lastChild())), n4 && (n4.focus(), t4.setSelectedValue(n4.value));
      }, "aria-invalid": t4.isInvalid || void 0, "aria-errormessage": e3["aria-errormessage"], "aria-readonly": n3 || void 0, "aria-required": i4 || void 0, "aria-disabled": o4 || void 0, "aria-orientation": s3, ...f2, ...y2 }), labelProps: p2, descriptionProps: m2, errorMessageProps: h2, isInvalid: c3, validationErrors: u2, validationDetails: d2 };
    }(t3, a2);
    return e2.createElement(bo, { ...t3, ...c2, ref: s2, wrapperClassName: Xe(Ch(Th), "spectrum-FieldGroup"), elementType: "span" }, e2.createElement("div", { ...l2, className: Xe(Ch(Th), "spectrum-FieldGroup-group", { "spectrum-FieldGroup-group--horizontal": "horizontal" === o3 }) }, e2.createElement(ph.Provider, { value: { isEmphasized: n2, state: a2 } }, i3)));
  }
  const Oh = e2.forwardRef(xh);
  function Ih(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(2151);
  var Rh, Ah, Mh, Lh, Nh, Fh, kh, Dh, Uh, jh, Bh, Kh, zh, Wh = {};
  function Vh(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function Hh(t3, r2) {
    let { isDisabled: n2, children: i3, autoFocus: o3, ...s2 } = t3, { styleProps: a2 } = se(s2), { hoverProps: l2, isHovered: c2 } = Ws({ isDisabled: n2 }), u2 = (0, e2.useRef)(null), d2 = pe(r2, u2), p2 = (0, e2.useContext)(ph) || {}, { isEmphasized: f2, state: m2 } = p2, { inputProps: h2 } = function(e3, t4, r3) {
      let { value: n3, children: i4, "aria-label": o4, "aria-labelledby": s3 } = e3;
      const a3 = e3.isDisabled || t4.isDisabled;
      null != i4 || null != o4 || null != s3 || console.warn("If you do not provide children, you must specify an aria-label for accessibility");
      let l3 = t4.selectedValue === n3, { pressProps: c3, isPressed: u3 } = xs({ isDisabled: a3 }), { pressProps: d3, isPressed: p3 } = xs({ isDisabled: a3, onPress() {
        t4.setSelectedValue(n3);
      } }), { focusableProps: f3 } = ms(C(e3, { onFocus: () => t4.setLastFocusedValue(n3) }), r3), m3 = C(c3, f3), h3 = ve(e3, { labelable: true }), g2 = -1;
      null != t4.selectedValue ? t4.selectedValue === n3 && (g2 = 0) : t4.lastFocusedValue !== n3 && null != t4.lastFocusedValue || (g2 = 0), a3 && (g2 = void 0);
      let { name: y2, descriptionId: v2, errorMessageId: b2, validationBehavior: E2 } = Sh.get(t4);
      return da(r3, t4.selectedValue, t4.setSelectedValue), pa({ validationBehavior: E2 }, t4, r3), { labelProps: C(d3, { onClick: (e4) => e4.preventDefault() }), inputProps: C(h3, { ...m3, type: "radio", name: y2, tabIndex: g2, disabled: a3, required: t4.isRequired && "native" === E2, checked: l3, value: n3, onChange: (e4) => {
        e4.stopPropagation(), t4.setSelectedValue(n3);
      }, "aria-describedby": [e3["aria-describedby"], t4.isInvalid ? b2 : null, v2].filter(Boolean).join(" ") || void 0 }), isDisabled: a3, isSelected: l3, isPressed: u3 || p3 };
    }({ ...t3, ...p2, isDisabled: n2 }, m2, u2);
    return e2.createElement("label", { ...a2, ...l2, ref: d2, className: Xe(Vh(Wh), "spectrum-Radio", { "spectrum-Radio--quiet": !f2, "is-disabled": n2, "is-invalid": m2.isInvalid, "is-hovered": c2 }, a2.className) }, e2.createElement(Lt, { focusRingClass: Xe(Vh(Wh), "focus-ring"), autoFocus: o3 }, e2.createElement("input", { ...h2, ref: u2, className: Xe(Vh(Wh), "spectrum-Radio-input") })), e2.createElement("span", { className: Xe(Vh(Wh), "spectrum-Radio-button") }), i3 && e2.createElement("span", { className: Xe(Vh(Wh), "spectrum-Radio-label") }, i3));
  }
  Ih(Wh, "focus-ring", () => Rh, (e3) => Rh = e3), Ih(Wh, "i18nFontFamily", () => Ah, (e3) => Ah = e3), Ih(Wh, "is-hovered", () => Mh, (e3) => Mh = e3), Ih(Wh, "is-invalid", () => Lh, (e3) => Lh = e3), Ih(Wh, "spectrum-FocusRing-ring", () => Nh, (e3) => Nh = e3), Ih(Wh, "spectrum-FocusRing", () => Fh, (e3) => Fh = e3), Ih(Wh, "spectrum-FocusRing--quiet", () => kh, (e3) => kh = e3), Ih(Wh, "spectrum-Radio", () => Dh, (e3) => Dh = e3), Ih(Wh, "spectrum-Radio--labelBelow", () => Uh, (e3) => Uh = e3), Ih(Wh, "spectrum-Radio--quiet", () => jh, (e3) => jh = e3), Ih(Wh, "spectrum-Radio-button", () => Bh, (e3) => Bh = e3), Ih(Wh, "spectrum-Radio-input", () => Kh, (e3) => Kh = e3), Ih(Wh, "spectrum-Radio-label", () => zh, (e3) => zh = e3), Rh = "V2HKpq_focus-ring", Ah = "V2HKpq_i18nFontFamily", Mh = "V2HKpq_is-hovered", Lh = "V2HKpq_is-invalid", Fh = "V2HKpq_spectrum-FocusRing " + (Nh = "V2HKpq_spectrum-FocusRing-ring"), kh = "V2HKpq_spectrum-FocusRing--quiet", Dh = "V2HKpq_spectrum-Radio", Uh = "V2HKpq_spectrum-Radio--labelBelow", jh = "V2HKpq_spectrum-Radio--quiet", Bh = "V2HKpq_spectrum-Radio-button", Kh = "V2HKpq_spectrum-Radio-input", zh = "V2HKpq_spectrum-Radio-label";
  const Gh = (0, e2.forwardRef)(Hh);
  var qh;
  function $h(t3, r2) {
    let [n2, i3] = (0, e2.useState)(true);
    return a(() => {
      i3(!(!r2.current || !r2.current.querySelector(t3)));
    }, [i3, t3, r2]), n2;
  }
  function Yh(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function Xh(t3, r2) {
    var n2;
    t3 = function(e3) {
      return e3.isPending && (e3.onPress = void 0, e3.onPressStart = void 0, e3.onPressEnd = void 0, e3.onPressChange = void 0, e3.onPressUp = void 0, e3.onKeyDown = void 0, e3.onKeyUp = void 0, e3.onClick = void 0, e3.href = void 0), e3;
    }(t3 = O(t3 = Hn(t3), "button"));
    let { elementType: i3 = "button", children: o3, variant: s2, style: a2 = "accent" === s2 || "cta" === s2 ? "fill" : "outline", staticColor: l2, isDisabled: c2, isPending: u2, autoFocus: d2, ...p2 } = t3, f2 = pe(r2), { buttonProps: m2, isPressed: h2 } = Ds(t3, f2), { hoverProps: g2, isHovered: y2 } = Ws({ isDisabled: c2 }), [v2, b2] = (0, e2.useState)(false), { focusProps: E2 } = Rt({ onFocusChange: b2, isDisabled: c2 }), T2 = to(Yh(qh), "@react-spectrum/button"), { styleProps: S2 } = se(p2), P2 = $h(`.${Yh(os)["spectrum-Button-label"]}`, f2), w2 = $h(`.${Yh(os)["spectrum-Icon"]}`, f2), x2 = !!m2["aria-label"] || !!m2["aria-labelledby"], [R2, A2] = (0, e2.useState)(false), M2 = _(), L2 = m2.id || M2, N2 = _(), F2 = _(), k2 = _();
    (0, e2.useEffect)(() => {
      let e3;
      return u2 ? e3 = setTimeout(() => {
        A2(true);
      }, 1e3) : A2(false), () => {
        clearTimeout(e3);
      };
    }, [u2]), "cta" === s2 ? s2 = "accent" : "overBackground" === s2 && (s2 = "primary", l2 = "white");
    const D2 = `${x2 ? m2["aria-label"] : ""} ${T2.format("pending")}`.trim();
    var U2;
    const j2 = x2 ? null !== (U2 = null === (n2 = m2["aria-labelledby"]) || void 0 === n2 ? void 0 : n2.replace(L2, k2)) && void 0 !== U2 ? U2 : k2 : `${w2 ? N2 : ""} ${P2 ? F2 : ""} ${k2}`.trim();
    let B2 = "polite";
    return !nt() || x2 && !st() || (B2 = "off"), e2.createElement(Lt, { focusRingClass: Xe(Yh(os), "focus-ring"), autoFocus: d2 }, e2.createElement(i3, { ...S2, ...C(m2, g2, E2), id: L2, ref: f2, "data-variant": s2, "data-style": a2, "data-static-color": l2 || void 0, "aria-disabled": u2 ? "true" : void 0, "aria-label": u2 ? D2 : m2["aria-label"], "aria-labelledby": u2 ? j2 : m2["aria-labelledby"], className: Xe(Yh(os), "spectrum-Button", { "spectrum-Button--iconOnly": w2 && !P2, "is-disabled": c2 || R2, "is-active": h2, "is-hovered": y2, "spectrum-Button--pending": R2 }, S2.className) }, e2.createElement(I, { slots: { icon: { id: N2, size: "S", UNSAFE_className: Xe(Yh(os), "spectrum-Icon") }, text: { id: F2, UNSAFE_className: Xe(Yh(os), "spectrum-Button-label") } } }, "string" == typeof o3 ? e2.createElement(Ml, null, o3) : o3, u2 && e2.createElement("div", { "aria-hidden": "true", style: { visibility: R2 ? "visible" : "hidden" }, className: Xe(Yh(os), "spectrum-Button-circleLoader") }, e2.createElement(cu, { "aria-label": D2, isIndeterminate: true, size: "S", staticColor: l2 })), u2 && e2.createElement(e2.Fragment, null, e2.createElement("div", { "aria-live": v2 ? B2 : "off" }, R2 && e2.createElement("div", { role: "img", "aria-labelledby": j2 })), e2.createElement("div", { id: k2, role: "img", "aria-label": D2 })))));
  }
  qh = { "ar-AE": { pending: "\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631" }, "bg-BG": { pending: "\u043D\u0435\u0434\u043E\u0432\u044A\u0440\u0448\u0435\u043D\u043E" }, "cs-CZ": { pending: "\u010Dek\xE1 na vy\u0159\xEDzen\xED" }, "da-DK": { pending: "afventende" }, "de-DE": { pending: "Ausstehend" }, "el-GR": { pending: "\u03C3\u03B5 \u03B5\u03BA\u03BA\u03C1\u03B5\u03BC\u03CC\u03C4\u03B7\u03C4\u03B1" }, "en-US": { pending: "pending" }, "es-ES": { pending: "pendiente" }, "et-EE": { pending: "ootel" }, "fi-FI": { pending: "odottaa" }, "fr-FR": { pending: "En attente" }, "he-IL": { pending: "\u05DE\u05DE\u05EA\u05D9\u05DF \u05DC" }, "hr-HR": { pending: "u tijeku" }, "hu-HU": { pending: "f\xFCgg\u0151ben lev\u0151" }, "it-IT": { pending: "in sospeso" }, "ja-JP": { pending: "\u4FDD\u7559" }, "ko-KR": { pending: "\uBCF4\uB958 \uC911" }, "lt-LT": { pending: "laukiama" }, "lv-LV": { pending: "gaida" }, "nb-NO": { pending: "avventer" }, "nl-NL": { pending: "in behandeling" }, "pl-PL": { pending: "oczekuj\u0105ce" }, "pt-BR": { pending: "pendente" }, "pt-PT": { pending: "pendente" }, "ro-RO": { pending: "\xEEn a\u0219teptare" }, "ru-RU": { pending: "\u0432 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0438" }, "sk-SK": { pending: "\u010Dakaj\xFAce" }, "sl-SI": { pending: "v teku" }, "sr-SP": { pending: "nere\u0161eno" }, "sv-SE": { pending: "v\xE4ntande" }, "tr-TR": { pending: "beklemede" }, "uk-UA": { pending: "\u0432 \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u0456" }, "zh-CN": { pending: "\u5F85\u5904\u7406" }, "zh-TW": { pending: "\u5F85\u8655\u7406" } };
  let Qh = e2.forwardRef(Xh);
  var Zh, Jh, eg, tg, rg, ng, ig;
  !function(e3) {
    e3.BASE = "BASE", e3.TRIAL = "TRIAL", e3.PROMOTION = "PROMOTION";
  }(Zh || (Zh = {})), function(e3) {
    e3.MONTH = "MONTH", e3.YEAR = "YEAR", e3.TWO_YEARS = "TWO_YEARS", e3.THREE_YEARS = "THREE_YEARS", e3.PERPETUAL = "PERPETUAL", e3.TERM_LICENSE = "TERM_LICENSE", e3.ACCESS_PASS = "ACCESS_PASS", e3.THREE_MONTHS = "THREE_MONTHS", e3.SIX_MONTHS = "SIX_MONTHS";
  }(Jh || (Jh = {})), function(e3) {
    e3.ANNUAL = "ANNUAL", e3.MONTHLY = "MONTHLY", e3.TWO_YEARS = "TWO_YEARS", e3.THREE_YEARS = "THREE_YEARS", e3.P1D = "P1D", e3.P1Y = "P1Y", e3.P3Y = "P3Y", e3.P10Y = "P10Y", e3.P15Y = "P15Y", e3.P3D = "P3D", e3.P7D = "P7D", e3.P30D = "P30D", e3.HALF_YEARLY = "HALF_YEARLY", e3.QUARTERLY = "QUARTERLY";
  }(eg || (eg = {})), function(e3) {
    e3.INDIVIDUAL = "INDIVIDUAL", e3.TEAM = "TEAM", e3.ENTERPRISE = "ENTERPRISE";
  }(tg || (tg = {})), function(e3) {
    e3.COM = "COM", e3.EDU = "EDU", e3.GOV = "GOV";
  }(rg || (rg = {})), function(e3) {
    e3.DIRECT = "DIRECT", e3.INDIRECT = "INDIRECT";
  }(ng || (ng = {})), function(e3) {
    e3.ENTERPRISE_PRODUCT = "ENTERPRISE_PRODUCT", e3.ETLA = "ETLA", e3.RETAIL = "RETAIL", e3.VIP = "VIP", e3.VIPMP = "VIPMP", e3.FREE = "FREE";
  }(ig || (ig = {}));
  var og = r(5445);
  const sg = { ...G, color: ["color", function(e3) {
    return `var(--spectrum-semantic-${e3}-color-icon)`;
  }] };
  function ag(t3) {
    t3 = O(t3, "icon");
    let { children: r2, size: n2, "aria-label": i3, "aria-hidden": o3, ...s2 } = t3, { styleProps: a2 } = se(s2, sg), l2 = Vn(), c2 = "M";
    null !== l2 && (c2 = "large" === l2.scale ? "L" : "M"), o3 || (o3 = void 0);
    let u2 = n2 || c2;
    return e2.cloneElement(r2, { ...ve(s2), ...a2, focusable: "false", "aria-label": i3, "aria-hidden": !i3 || o3 || void 0, role: "img", className: Xe((d2 = nn, d2 && d2.__esModule ? d2.default : d2), r2.props.className, "spectrum-Icon", `spectrum-Icon--size${u2}`, a2.className) });
    var d2;
  }
  function lg(t3) {
    return e2.createElement(ag, t3, e2.createElement(og.T, null));
  }
  var cg, ug, dg;
  !function(e3) {
    e3.STAGE = "STAGE", e3.PRODUCTION = "PRODUCTION", e3.LOCAL = "LOCAL";
  }(cg || (cg = {})), function(e3) {
    e3.STAGE = "STAGE", e3.PRODUCTION = "PROD", e3.LOCAL = "LOCAL";
  }(ug || (ug = {})), function(e3) {
    e3.DRAFT = "DRAFT", e3.PUBLISHED = "PUBLISHED";
  }(dg || (dg = {}));
  const pg = { apiKey: "", landscape: dg.DRAFT }, fg = { commitment: "", term: "", customerSegment: "INDIVIDUAL", offerType: "BASE", marketSegment: "COM" }, mg = [{ type: "price", name: "Price", description: "Formatted price, can be inlined with neighbour text", doc: "#" }, { type: "priceOptical", name: "Optical price", description: "Formatted price calculating monthly payments for annual plans, can be inlined with neighbour text", doc: "#" }, { type: "priceAnnual", name: "Annual price", description: "Formatted price calculating annual payments for ABM plan, can be inlined with neighbour text", doc: "#" }, { type: "priceStrikethrough", name: "Strikethrough price", description: "Formatted price displayed as strikethrough, can be inlined with neighbour text", doc: "#" }, { type: "checkoutUrl", name: "Checkout URL", description: "Checkout URl for a selected offer", doc: "#" }], hg = { baseUrl: String, env: cg.PRODUCTION, environment: ug.PRODUCTION, defaultPlaceholderOptions: { displayFormatted: true, displayRecurrence: true, displayPerUnit: false, displayTax: false, forceTaxExclusive: false, displayOldPrice: true }, disableOfferSelection: false, disablePlaceholderSelection: false, aosParams: fg, aosConfig: pg, zIndex: 2e4, searchText: "", searchOfferId: void 0, searchOfferSelectorId: void 0 }, gg = t2().createContext(hg), yg = /^[0-9A-F]{32}$/, vg = /^[a-zA-Z0-9_-]{43}$/, bg = o2().shape({ name: o2().string, icon: o2().string, offerId: o2().string, pricePoint: o2().string, planType: o2().string }), Eg = { previousStep: o2().func, nextStep: o2().func };
  var _g;
  !function(e3) {
    e3.ServerError = "ServerError", e3.ClientError = "ClientError", e3.UnexpectedError = "UnexpectedError";
  }(_g || (_g = {}));
  var Tg;
  !function(e3) {
    e3.AUTHORIZATION = "Authorization", e3.X_API_KEY = "X-Api-Key";
  }(Tg || (Tg = {}));
  const Sg = class {
    constructor(e3) {
      this.fetchOptions = e3;
    }
    commonHeaders() {
      const e3 = {};
      return this.fetchOptions.apiKey && (e3[Tg.X_API_KEY] = this.fetchOptions.apiKey), this.fetchOptions.accessToken && (e3[Tg.AUTHORIZATION] = `Bearer ${this.fetchOptions.accessToken}`), e3;
    }
    transformData(e3, t3) {
      return t3 ? e3.map((e4) => t3(e4)) : e3.map((e4) => this.identifyTransform(e4));
    }
    transformDatum(e3, t3) {
      return t3 ? t3(e3) : this.identifyTransform(e3);
    }
    identifyTransform(e3) {
      return e3;
    }
    failOnBadStatusOrParseBody(e3, t3) {
      return r2 = this, n2 = void 0, o3 = function* () {
        if (e3.ok) return e3.json().then((t4) => ({ headers: e3.headers, status: e3.status, statusText: e3.statusText, data: t4 }));
        const r3 = yield e3.text();
        return Promise.reject(((e4, t4, r4) => {
          return { type: (n3 = e4, n3 >= 500 ? _g.ServerError : n3 < 400 ? _g.UnexpectedError : _g.ClientError), message: t4, originatingRequest: r4, status: e4 };
          var n3;
        })(e3.status, r3, t3));
      }, new ((i3 = void 0) || (i3 = Promise))(function(e4, t4) {
        function s2(e5) {
          try {
            l2(o3.next(e5));
          } catch (e6) {
            t4(e6);
          }
        }
        function a2(e5) {
          try {
            l2(o3.throw(e5));
          } catch (e6) {
            t4(e6);
          }
        }
        function l2(t5) {
          var r3;
          t5.done ? e4(t5.value) : (r3 = t5.value, r3 instanceof i3 ? r3 : new i3(function(e5) {
            e5(r3);
          })).then(s2, a2);
        }
        l2((o3 = o3.apply(r2, n2 || [])).next());
      });
      var r2, n2, i3, o3;
    }
    buildUrl(e3, t3, r2, n2, i3) {
      var o3;
      const s2 = null !== (o3 = this.fetchOptions.baseUrl) && void 0 !== o3 ? o3 : n2(this.fetchOptions.env), a2 = i3(t3, r2);
      return this.generateUrl(s2, e3, a2);
    }
    generateUrl(e3, t3, r2) {
      const n2 = new URL(t3, e3);
      return r2 && (n2.search = this.convertToSearchParams(r2).toString()), n2.toString();
    }
    convertToSearchParams(e3) {
      return new URLSearchParams(e3);
    }
    setParams(e3, t3, r2) {
      null != r2 && "boolean" == typeof r2 ? e3[t3] = String(r2) : r2 && (e3[t3] = r2);
    }
  }, Pg = (e3) => {
    switch (e3) {
      case cg.PRODUCTION:
        return "https://aos.adobe.io";
      case cg.STAGE:
        return "https://aos-stage.adobe.io";
      case cg.LOCAL:
        return "http://localhost:3001";
      default:
        return "https://aos-stage.adobe.io";
    }
  }, wg = ug.PRODUCTION, Cg = dg.PUBLISHED, xg = (e3, t3, r2 = true) => {
    var n2, i3, o3, s2;
    return e3.api_key = t3.apiKey, e3.environment = null !== (n2 = t3.environment) && void 0 !== n2 ? n2 : wg, e3.landscape = null !== (i3 = t3.landscape) && void 0 !== i3 ? i3 : Cg, r2 && (e3.page = null !== (o3 = t3.page) && void 0 !== o3 ? o3 : 0, e3.page_size = null !== (s2 = t3.pageSize) && void 0 !== s2 ? s2 : 20), e3;
  };
  var Og = function(e3, t3, r2, n2) {
    return new (r2 || (r2 = Promise))(function(i3, o3) {
      function s2(e4) {
        try {
          l2(n2.next(e4));
        } catch (e5) {
          o3(e5);
        }
      }
      function a2(e4) {
        try {
          l2(n2.throw(e4));
        } catch (e5) {
          o3(e5);
        }
      }
      function l2(e4) {
        var t4;
        e4.done ? i3(e4.value) : (t4 = e4.value, t4 instanceof r2 ? t4 : new r2(function(e5) {
          e5(t4);
        })).then(s2, a2);
      }
      l2((n2 = n2.apply(e3, t3 || [])).next());
    });
  };
  const Ig = class extends Sg {
    constructor(e3) {
      super(e3), this.apiPaths = { getOffers: "offers", offerSelectors: "offer_selectors", searchOffers: "offers", getOfferSelector: "offer_selectors" }, this.getOffers = (e4, t3, r2, n2) => Og(this, void 0, void 0, function* () {
        var i3;
        if (!(null === (i3 = e4.offerIds) || void 0 === i3 ? void 0 : i3.length)) return Promise.resolve({ data: [] });
        const o3 = this.buildUrl(`${this.apiPaths.getOffers}/${e4.offerIds.join(",")}`, t3, e4, (e5) => Pg(e5), (e5, t4) => this.evaluateGetOffersParams(e5, t4));
        return this.fetchOptions.fetch(o3, { signal: n2, headers: Object.assign({}, this.commonHeaders()), mode: "cors" }).then((e5) => this.failOnBadStatusOrParseBody(e5, `GET ${o3}`)).then((e5) => {
          const t4 = e5.data;
          return { data: this.transformData(t4, r2) };
        });
      }), this.getOfferSelector = (e4, t3, r2, n2) => Og(this, void 0, void 0, function* () {
        if (!e4.id) return Promise.resolve({ data: [] });
        const r3 = this.buildUrl(`${this.apiPaths.getOfferSelector}/${e4.id}`, t3, e4, (e5) => Pg(e5), (e5) => xg({}, e5, false));
        return this.fetchOptions.fetch(r3, { signal: n2, headers: Object.assign({}, this.commonHeaders()), mode: "cors" }).then((e5) => this.failOnBadStatusOrParseBody(e5, `GET ${r3}`)).then((e5) => {
          const t4 = e5.data;
          return { data: this.identifyTransform(t4) };
        });
      }), this.searchOffers = (e4, t3, r2, n2) => Og(this, void 0, void 0, function* () {
        const i3 = this.buildUrl(this.apiPaths.searchOffers, t3, e4, (e5) => Pg(e5), (e5, t4) => this.evaluateSearchOffersParams(e5, t4));
        return this.fetchOptions.fetch(i3, { signal: n2, headers: Object.assign({}, this.commonHeaders()), mode: "cors" }).then((e5) => this.failOnBadStatusOrParseBody(e5, `GET ${i3}`)).then((e5) => {
          const t4 = e5, n3 = t4.data;
          return ((e6, t5) => ({ data: e6, totalResultCount: Number(t5.headers.get("x-total-count")), pageSize: Number(t5.headers.get("x-page-size")), pageCount: Number(t5.headers.get("x-page-count")), currentPage: Number(t5.headers.get("x-current-page")) }))(this.transformData(n3, r2), t4);
        });
      }), this.createOfferSelector = (e4, t3, r2) => Og(this, void 0, void 0, function* () {
        const n2 = this.buildUrl(this.apiPaths.offerSelectors, t3, null, (e5) => Pg(e5), (e5, t4) => this.evaluateCreateOfferSelectorParams(e5));
        return this.fetchOptions.fetch(n2, { method: "POST", signal: r2, headers: Object.assign(Object.assign({}, this.commonHeaders()), { "Content-Type": "application/json" }), body: JSON.stringify(e4), mode: "cors" }).then((e5) => this.failOnBadStatusOrParseBody(e5, `POST ${n2}`)).then((e5) => ({ data: e5.data }));
      });
    }
    evaluateGetOffersParams(e3, t3) {
      var r2, n2;
      const i3 = {};
      return this.setParams(i3, "context", t3.context), this.setParams(i3, "country", t3.country), this.setParams(i3, "currency", t3.currency), this.setParams(i3, "locale", t3.locale), this.setParams(i3, "processing_instructions", null === (r2 = t3.processingInstructions) || void 0 === r2 ? void 0 : r2.join(",")), this.setParams(i3, "promotion_code", t3.promotionCode), this.setParams(i3, "service_providers", null === (n2 = t3.serviceProviders) || void 0 === n2 ? void 0 : n2.join(",")), this.setParams(i3, "show_availability_dates", t3.showAvailabilityDates), this.setParams(i3, "Processing-Instruction-Client-Id", t3.processingInstructionClientId), xg(i3, e3, false);
    }
    evaluateSearchOffersParams(e3, t3) {
      var r2, n2, i3, o3;
      const s2 = {};
      return this.setParams(s2, "arrangement_code", null === (r2 = t3.arrangementCode) || void 0 === r2 ? void 0 : r2.join(",")), this.setParams(s2, "buying_program", t3.buyingProgram), this.setParams(s2, "commitment", t3.commitment), this.setParams(s2, "context", t3.context), this.setParams(s2, "country", t3.country), this.setParams(s2, "customer_segment", t3.customerSegment), this.setParams(s2, "customer_ui", t3.customerUI), this.setParams(s2, "ignore_market_end_date", t3.ignoreMarketEndDate), this.setParams(s2, "ignore_release_date", t3.ignoreReleaseDate), this.setParams(s2, "language", t3.language), this.setParams(s2, "locale", t3.locale), this.setParams(s2, "market_segment", t3.marketSegment), this.setParams(s2, "merchant", t3.merchant), this.setParams(s2, "offer_type", t3.offerType), this.setParams(s2, "price_point", null === (n2 = t3.pricePoint) || void 0 === n2 ? void 0 : n2.join(",")), this.setParams(s2, "processing_instructions", null === (i3 = t3.processingInstructions) || void 0 === i3 ? void 0 : i3.join(",")), this.setParams(s2, "sales_channel", t3.salesChannel), this.setParams(s2, "service_providers", null === (o3 = t3.serviceProviders) || void 0 === o3 ? void 0 : o3.join(",")), this.setParams(s2, "show_availability_dates", t3.showAvailabilityDates), this.setParams(s2, "spec_id", t3.specId), this.setParams(s2, "term", t3.term), this.setParams(s2, "use_telesales_date", t3.useTelesalesDate), this.setParams(s2, "Processing-Instruction-Client-Id", t3.processingInstructionClientId), xg(s2, e3);
    }
    evaluateCreateOfferSelectorParams(e3) {
      const t3 = {};
      return t3.api_key = e3.apiKey, t3;
    }
  };
  var Rg = t2().createContext({ getAccessToken: function() {
  } }), Ag = function() {
    return t2().useContext(Rg);
  }, Mg = { LOCAL: "local", STAGE: "stage", PRODUCTION: "production" }, Lg = function() {
    return {}.APP_ENV || {}.REACT_APP_ENV;
  };
  function Ng(e3) {
    var t3;
    return void 0 === e3 && (e3 = Lg()), e3 && "string" == typeof e3 && (t3 = Mg[e3.toUpperCase()]), t3 || Mg.PRODUCTION;
  }
  var Fg = t2().createContext(Ng(Lg())), kg = function() {
    return (0, e2.useContext)(Fg);
  }, Dg = function(e3) {
    var r2 = e3.value, n2 = e3.children;
    return t2().createElement(Fg.Provider, { value: r2 || Ng(Lg()) }, n2);
  }, Ug = r(7268), jg = t2().createContext(Ug.he), Bg = function() {
    return (0, e2.useContext)(jg);
  }, Kg = function(e3) {
    var r2 = e3.value, n2 = e3.children, i3 = Bg(), o3 = r2 || i3;
    return t2().createElement(jg.Provider, { value: o3 }, n2);
  };
  const zg = "tacocat.js", Wg = (e3) => Array.isArray(e3), Vg = (e3) => "boolean" == typeof e3, Hg = (e3) => "function" == typeof e3, Gg = (e3) => null != e3 && "object" == typeof e3, qg = (e3) => "string" == typeof e3;
  function $g(e3, t3 = (e4) => null == e4 || "" === e4) {
    return null != e3 && Object.entries(e3).forEach(([r2, n2]) => {
      t3(n2) && delete e3[r2];
    }), e3;
  }
  const Yg = Date.now(), Xg = () => `(+${Date.now() - Yg}ms)`, Qg = /* @__PURE__ */ new Set(), Zg = function(e3, t3) {
    if (Vg(e3)) return e3;
    const r2 = String(e3);
    return "1" === r2 || "true" === r2 || "0" !== r2 && "false" !== r2 && t3;
  }(function(e3, t3 = {}, { metadata: r2 = true, search: n2 = true, storage: i3 = true } = {}) {
    let o3;
    if (n2 && null == o3) {
      const t4 = new URLSearchParams(window.location.search), r3 = qg(n2) ? n2 : e3;
      o3 = t4.get(r3);
    }
    if (i3 && null == o3) {
      const t4 = qg(i3) ? i3 : e3;
      o3 = window.sessionStorage.getItem(t4) ?? window.localStorage.getItem(t4);
    }
    if (r2 && null == o3) {
      const t4 = function(e4 = "") {
        return String(e4).replace(/(\p{Lowercase_Letter})(\p{Uppercase_Letter})/gu, (e5, t5, r3) => `${t5}-${r3}`).replace(/\W+/gu, "-").toLowerCase();
      }(qg(r2) ? r2 : e3), n3 = document.documentElement.querySelector(`meta[name="${t4}"]`);
      o3 = n3?.content;
    }
    return null == o3 ? t3[e3] : o3;
  }("tacocat.debug", {}, { metadata: false }), "undefined" != typeof process && void 0);
  function Jg(e3) {
    const t3 = `[${zg}/${e3}]`, r2 = (e4, ...r3) => {
      const n2 = `${t3} ${e4}`;
      Qg.forEach(([e5]) => e5(n2, ...r3));
    };
    return { assert: (e4, t4, ...n2) => !!e4 || (r2(t4, ...n2), false), debug: Zg ? (e4, ...r3) => {
      console.debug(`${t3} ${e4}`, ...r3, Xg());
    } : () => {
    }, error: r2, warn: (e4, ...r3) => {
      const n2 = `${t3} ${e4}`;
      Qg.forEach(([, e5]) => e5(n2, ...r3));
    } };
  }
  !function(e3, t3) {
    const r2 = [(e4, ...t4) => {
      console.error(e4, ...t4, Xg());
    }, (e4, ...t4) => {
      console.warn(e4, ...t4, Xg());
    }];
    Qg.add(r2);
  }();
  const ey = ({ country: r2, globals: n2, setGlobals: i3 }) => {
    const [o3, s2] = (0, e2.useState)([{ id: "US", name: "US" }]);
    return (0, e2.useEffect)(() => fetch("https://countries-stage.adobe.io/v2/countries?api_key=dexter-commerce-offers").then((e3) => e3.json()).then((e3) => {
      const t3 = e3.map((e4) => {
        const t4 = e4["iso2-code"];
        return { id: t4, name: t4 };
      });
      return r2 ? (t3.find((e4) => e4.id === r2) || t3.push({ id: r2, name: r2 }), t3) : t3;
    }).then(s2).catch(() => {
    }), []), t2().createElement(Ee, null, t2().createElement(Kf, { label: "Choose Country*", items: o3, selectedKey: r2, onSelectionChange: (e3) => i3([{ ...n2[0], country: e3 }]) }, (e3) => t2().createElement(Vf, { key: e3.id }, e3.name)));
  };
  ey.propTypes = { country: o2().string, globals: o2().any, setGlobals: o2().func };
  const ty = ey, ry = ug.PRODUCTION, ny = Jg("OfferSelectorTool");
  function iy({ nextStep: r2 }) {
    const { allProducts: n2, filteredProducts: i3, setFilteredProducts: o3, searchText: s2, setSearchText: a2, searchOfferId: l2, setSearchOfferId: c2, searchOfferSelectorId: u2, setSearchOfferSelectorId: d2, sendSearch: p2, setSendSearch: f2, selectedProduct: m2, setAosParams: h2, globals: g2, setGlobals: y2, apiKey: v2, landscape: b2, env: E2, baseUrl: _2, aosParams: T2, disableOfferSelection: S2, containerHeight: P2, onCancel: w2, accessToken: C2 } = (0, e2.useContext)(gg), x2 = (e3) => new Ig({ ...e3, accessToken: C2, env: E2, baseUrl: _2, landscape: b2, apiKey: v2 }), O2 = ((t3) => {
      const r3 = Bg(), n3 = Ag(), i4 = cg[kg().toUpperCase()], o4 = { accessToken: n3.getAccessToken(), env: i4, fetch: r3 };
      return (0, e2.useMemo)(() => ((e3, t4) => t4(e3).getOfferSelector)(o4, t3), [n3, i4, r3]);
    })(x2), I2 = ((t3) => {
      const r3 = Bg(), n3 = Ag(), i4 = cg[kg().toUpperCase()], o4 = { accessToken: n3.getAccessToken(), env: i4, fetch: r3 };
      return (0, e2.useMemo)(() => ((e3, t4) => t4(e3).getOffers)(o4, t3), [n3, i4, r3]);
    })(x2), R2 = g2[0]?.country, A2 = (e3) => e3.then((e4) => {
      h2(e4);
    }).catch((e4) => {
      if (404 !== e4.status) throw e4;
    });
    (0, e2.useEffect)(() => {
      l2 || u2 || "" === T2.pricePoint || h2({ ...T2, pricePoint: "" });
    }, [l2, u2]), (0, e2.useEffect)(() => {
      if (u2) return A2(O2({ id: u2, country: R2 }, { apiKey: v2, environment: ry, landscape: b2 }).then(({ data: { commitment: e3, customer_segment: t3, market_segment: r3, offer_type: n3, price_point: i4, product_arrangement_code: o4, term: s3 } = {} }) => ({ arrangementCode: o4, commitment: e3, customerSegment: t3, marketSegment: r3, offerSelectorId: u2, offerType: n3, pricePoint: i4, term: s3 }))).catch((e3) => {
        ny.error(`Failed to search by offer selector id "${u2}":`, e3);
      });
    }, [u2, h2]), (0, e2.useEffect)(() => {
      if (l2) return A2(I2({ offerIds: [l2], country: R2 }, { apiKey: v2, environment: ry, landscape: b2 }).then(({ data: [{ commitment: e3, customer_segment: t3, market_segments: [r3] = [], offer_type: n3, price_point: i4, product_arrangement_code: o4, term: s3 } = {}] = [] }) => ({ arrangementCode: o4, commitment: e3, customerSegment: t3, marketSegment: r3, offerId: l2, offerType: n3, pricePoint: i4, term: s3 }))).catch((e3) => {
        ny.error(`Failed to search by offer id "${l2}":`, e3);
      });
    }, [l2, h2]), (0, e2.useEffect)(() => {
      S2 || (yg.test(s2) ? c2(s2) : vg.test(s2) ? d2(s2) : l2 ? c2() : "" !== u2 && d2(""));
    }, [s2]), (0, e2.useEffect)(() => {
      let e3;
      try {
        e3 = new RegExp(s2, "i");
      } catch {
      }
      const t3 = n2 ? n2.filter(([, t4]) => ((e4, t5, r3, { customerSegments: n3, marketSegments: i4, arrangement_code: o4, name: s3, draft: a3 }) => true === n3[r3.customerSegment] && true === i4[r3.marketSegment] && (t5 === dg.DRAFT || !a3) && (o4 === r3.arrangementCode || !e4 || e4.test(s3) || e4.test(o4)))(e3, b2, T2, t4)).map(([e4, t4]) => ({ id: e4, code: e4, ...t4 })) : [];
      o3(t3);
    }, [n2, s2, T2]);
    const M2 = (0, e2.useMemo)(() => {
      const e3 = [];
      return T2.commitment && e3.push(T2.commitment), T2.term && e3.push(T2.term), e3.join("-");
    }, [T2]), L2 = (0, e2.useCallback)((e3) => {
      m2 && "Enter" === e3.key && r2(true);
    }, [m2, r2]);
    (0, e2.useEffect)(() => {
      p2 && m2 && (f2(false), r2(true));
    }, [m2, p2]);
    const N2 = (0, e2.useMemo)(() => t2().createElement(Ee, { backgroundColor: "gray-50", gridArea: "products", borderRadius: "regular", borderWidth: "thin", borderColor: "light" }, t2().createElement(mo, { direction: "column", alignItems: "center" }, t2().createElement(Nm, { description: "Search by name, product code, offer id or offer selector id", label: "Search", icon: t2().createElement(lg, null), onChange: a2, "data-testid": "productsTab/search", width: "size-6000", autoFocus: true, onKeyDown: L2, value: s2 }), t2().createElement(Xm, { size: "S", marginTop: "size-200", marginBottom: "size-200" }), t2().createElement(Zm, { "aria-label": "Products", alignSelf: "stretch", justifySelf: "stretch", items: i3, selectionMode: "single", selectedKeys: [T2.arrangementCode], height: P2 - 380, onSelectionChange: (e3) => {
      l2 && "" !== u2 || h2({ ...T2, arrangementCode: e3.anchorKey });
    } }, ({ code: e3, name: r3, icon: n3, draft: i4 }) => t2().createElement(Vf, { textValue: e3, "aria-label": r3 }, t2().createElement(sh, { width: "48px", height: "48px", src: n3, alt: "Product Icon", slot: "icon" }), t2().createElement(Ml, { gridArea: "end", UNSAFE_className: i4 ? "draft" : "" }, " ", i4 && "DRAFT"), t2().createElement(Ml, { "data-testid": e3, alignSelf: "center", UNSAFE_className: "productName" }, r3), t2().createElement(Ml, { slot: "description", UNSAFE_className: "productName" }, e3))))), [i3, P2, m2]), F2 = t2().createElement(Ee, { backgroundColor: "gray-50", gridArea: "entitlements", borderRadius: "regular", borderWidth: "thin", borderColor: "light", paddingStart: "size-200", paddingEnd: "size-200" }, t2().createElement(mo, { direction: "column", width: "100%" }, t2().createElement(dh, { level: "3" }, "Select your entitlements"), t2().createElement(Xm, { size: "S", marginTop: "size-100", marginBottom: "size-200" }), t2().createElement(mo, { direction: "column", width: "100%", justifyContent: "space-evenly" }, t2().createElement(Kf, { label: "Choose your plan type*", selectedKey: M2, width: "size-4600", onSelectionChange: (e3) => {
      const [t3, r3] = e3.split("-");
      h2({ ...T2, commitment: t3, term: r3 });
    } }, t2().createElement(Vf, { key: "" }, "ALL"), t2().createElement(Vf, { key: `${Jh.YEAR}-${eg.MONTHLY}` }, "ABM"), t2().createElement(Vf, { key: `${Jh.YEAR}-${eg.ANNUAL}` }, "PUF"), t2().createElement(Vf, { key: `${Jh.MONTH}-${eg.MONTHLY}` }, "M2M"), t2().createElement(Vf, { key: `${Jh.TERM_LICENSE}-${eg.P3Y}` }, "P3Y"), t2().createElement(Vf, { key: `${Jh.PERPETUAL}` }, "PERPETUAL")), t2().createElement(Oh, { label: "Choose your customer segment*", orientation: "horizontal", value: T2.customerSegment, onChange: (e3) => h2({ ...T2, customerSegment: e3 }) }, t2().createElement(Gh, { value: "INDIVIDUAL" }, tg.INDIVIDUAL), t2().createElement(Gh, { value: "TEAM" }, tg.TEAM)), t2().createElement(Kf, { label: "Choose your offer type*", selectedKey: T2.offerType, width: "size-4600", onSelectionChange: (e3) => h2({ ...T2, offerType: e3 }) }, t2().createElement(Vf, { key: Zh.BASE }, Zh.BASE), t2().createElement(Vf, { key: Zh.TRIAL }, Zh.TRIAL), t2().createElement(Vf, { key: Zh.PROMOTION }, Zh.PROMOTION)), t2().createElement(Oh, { label: "Choose your market segment*", orientation: "horizontal", value: T2.marketSegment, onChange: (e3) => h2({ ...T2, marketSegment: e3 }) }, t2().createElement(Gh, { value: "COM" }, rg.COM), t2().createElement(Gh, { value: "EDU" }, rg.EDU), t2().createElement(Gh, { value: "GOV" }, rg.GOV)), t2().createElement(ty, { country: R2, globals: g2, setGlobals: y2 }), t2().createElement(Ee, { paddingTop: "size-200" }, t2().createElement(Ml, null, "PERPETUAL" === T2.commitment || "GB" === R2 ? "Language (MULT/EN): EN" : "")))));
    return t2().createElement(Ee, { height: "100%" }, t2().createElement(Rl, { height: "100%", minHeight: "400px", areas: ["header  header", "products entitlements", "footer  footer"], columns: ["1fr", "1fr"], rows: ["size-600", "auto", "size-400"], gap: "size-200" }, t2().createElement(dh, { level: "3", gridArea: "header" }, "Select your product from the list below"), N2, F2, t2().createElement(Ee, { justifySelf: "end", gridArea: "footer" }, w2 && t2().createElement(Qh, { "data-testid": "productsTab/cancelButton", marginEnd: "size-200", "aria-label": "cancel", variant: "primary", onPress: w2 }, "Cancel"), t2().createElement(Qh, { "data-testid": "productsTab/nextButton", "aria-label": "next-step", variant: "cta", isDisabled: !m2, onPress: () => {
      r2(true);
    } }, "Next"))));
  }
  iy.propTypes = { ...Eg };
  const oy = iy;
  function sy(e3 = {}) {
    let { isReadOnly: t3 } = e3, [r2, n2] = Cf(e3.isSelected, e3.defaultSelected || false, e3.onChange);
    return { isSelected: r2, setSelected: function(e4) {
      t3 || n2(e4);
    }, toggle: function() {
      t3 || n2(!r2);
    } };
  }
  function ay(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function ly(t3, r2) {
    t3 = Hn(t3);
    let { isQuiet: n2, isDisabled: i3, isEmphasized: o3, staticColor: a2, children: l2, autoFocus: c2, ...u2 } = t3, d2 = pe(r2), p2 = sy(t3), { buttonProps: f2, isPressed: m2 } = function(e3, t4, r3) {
      const { isSelected: n3 } = t4, { isPressed: i4, buttonProps: o4 } = Ds({ ...e3, onPress: s(t4.toggle, e3.onPress) }, r3);
      return { isPressed: i4, buttonProps: C(o4, { "aria-pressed": n3 }) };
    }(t3, p2, d2), { hoverProps: h2, isHovered: g2 } = Ws({ isDisabled: i3 }), { styleProps: y2 } = se(u2), v2 = e2.Children.toArray(t3.children).every((t4) => !e2.isValidElement(t4));
    return e2.createElement(Lt, { focusRingClass: Xe(ay(os), "focus-ring"), autoFocus: c2 }, e2.createElement("button", { ...y2, ...C(f2, h2), ref: d2, className: Xe(ay(os), "spectrum-ActionButton", { "spectrum-ActionButton--quiet": n2, "spectrum-ActionButton--emphasized": o3, "spectrum-ActionButton--staticColor": !!a2, "spectrum-ActionButton--staticWhite": "white" === a2, "spectrum-ActionButton--staticBlack": "black" === a2, "is-active": m2, "is-disabled": i3, "is-hovered": g2, "is-selected": p2.isSelected }, y2.className) }, e2.createElement(I, { slots: { icon: { size: "S", UNSAFE_className: Xe(ay(os), "spectrum-Icon") }, text: { UNSAFE_className: Xe(ay(os), "spectrum-ActionButton-label") } } }, "string" == typeof l2 || v2 ? e2.createElement(Ml, null, l2) : l2)));
  }
  let cy = e2.forwardRef(ly);
  const uy = e2.createContext(null);
  function dy(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(7316);
  var py, fy, my, hy, gy, yy, vy, by, Ey = {};
  dy(Ey, "focus-ring", () => py, (e3) => py = e3), dy(Ey, "i18nFontFamily", () => fy, (e3) => fy = e3), dy(Ey, "spectrum-FieldGroup", () => my, (e3) => my = e3), dy(Ey, "spectrum-FieldGroup-group", () => hy, (e3) => hy = e3), dy(Ey, "spectrum-FieldGroup-group--horizontal", () => gy, (e3) => gy = e3), dy(Ey, "spectrum-FocusRing-ring", () => yy, (e3) => yy = e3), dy(Ey, "spectrum-FocusRing", () => vy, (e3) => vy = e3), dy(Ey, "spectrum-FocusRing--quiet", () => by, (e3) => by = e3), py = "hyn22G_focus-ring", fy = "hyn22G_i18nFontFamily", my = "hyn22G_spectrum-FieldGroup", hy = "hyn22G_spectrum-FieldGroup-group", gy = "hyn22G_spectrum-FieldGroup-group--horizontal", vy = "hyn22G_spectrum-FocusRing " + (yy = "hyn22G_spectrum-FocusRing-ring"), by = "hyn22G_spectrum-FocusRing--quiet";
  const _y = /* @__PURE__ */ new WeakMap();
  function Ty(t3 = {}) {
    let [r2, n2] = Cf(t3.value, t3.defaultValue || [], t3.onChange), i3 = !!t3.isRequired && 0 === r2.length, o3 = (0, e2.useRef)(/* @__PURE__ */ new Map()), s2 = Tf({ ...t3, value: r2 }), a2 = s2.displayValidation.isInvalid;
    var l2;
    const c2 = { ...s2, value: r2, setValue(e3) {
      t3.isReadOnly || t3.isDisabled || n2(e3);
    }, isDisabled: t3.isDisabled || false, isReadOnly: t3.isReadOnly || false, isSelected: (e3) => r2.includes(e3), addValue(e3) {
      t3.isReadOnly || t3.isDisabled || r2.includes(e3) || n2(r2.concat(e3));
    }, removeValue(e3) {
      t3.isReadOnly || t3.isDisabled || r2.includes(e3) && n2(r2.filter((t4) => t4 !== e3));
    }, toggleValue(e3) {
      t3.isReadOnly || t3.isDisabled || (r2.includes(e3) ? n2(r2.filter((t4) => t4 !== e3)) : n2(r2.concat(e3)));
    }, setInvalid(e3, t4) {
      let r3 = new Map(o3.current);
      t4.isInvalid ? r3.set(e3, t4) : r3.delete(e3), o3.current = r3, s2.updateValidation(function(...e4) {
        let t5 = /* @__PURE__ */ new Set(), r4 = false, n3 = { ...yf };
        for (let s3 of e4) {
          var i4, o4;
          for (let e5 of s3.validationErrors) t5.add(e5);
          r4 || (r4 = s3.isInvalid);
          for (let e5 in n3) (i4 = n3)[o4 = e5] || (i4[o4] = s3.validationDetails[e5]);
        }
        return n3.valid = !r4, { isInvalid: r4, validationErrors: [...t5], validationDetails: n3 };
      }(...r3.values()));
    }, validationState: null !== (l2 = t3.validationState) && void 0 !== l2 ? l2 : a2 ? "invalid" : null, isInvalid: a2, isRequired: i3 };
    return c2;
  }
  function Sy(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function Py(t3, r2) {
    t3 = go(t3 = Hn(t3));
    let { isEmphasized: n2, children: i3, orientation: o3 = "vertical" } = t3, s2 = de(r2), a2 = Ty(t3), { groupProps: l2, ...c2 } = function(e3, t4) {
      let { isDisabled: r3, name: n3, validationBehavior: i4 = "aria" } = e3, { isInvalid: o4, validationErrors: s3, validationDetails: a3 } = t4.displayValidation, { labelProps: l3, fieldProps: c3, descriptionProps: u2, errorMessageProps: d2 } = ta({ ...e3, labelElementType: "span", isInvalid: o4, errorMessage: e3.errorMessage || s3 });
      _y.set(t4, { name: n3, descriptionId: u2.id, errorMessageId: d2.id, validationBehavior: i4 });
      let p2 = ve(e3, { labelable: true }), { focusWithinProps: f2 } = At({ onBlurWithin: e3.onBlur, onFocusWithin: e3.onFocus, onFocusWithinChange: e3.onFocusChange });
      return { groupProps: C(p2, { role: "group", "aria-disabled": r3 || void 0, ...c3, ...f2 }), labelProps: l3, descriptionProps: u2, errorMessageProps: d2, isInvalid: o4, validationErrors: s3, validationDetails: a3 };
    }(t3, a2);
    return e2.createElement(bo, { ...t3, ...c2, ref: s2, wrapperClassName: Xe(Sy(Ey), "spectrum-FieldGroup"), elementType: "span", includeNecessityIndicatorInAccessibilityName: true }, e2.createElement("div", { ...l2, className: Xe(Sy(Ey), "spectrum-FieldGroup-group", { "spectrum-FieldGroup-group--horizontal": "horizontal" === o3 }) }, e2.createElement(zn, { isEmphasized: n2 }, e2.createElement(uy.Provider, { value: a2 }, i3))));
  }
  const wy = e2.forwardRef(Py);
  function Cy(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(5706);
  var xy, Oy, Iy, Ry, Ay, My, Ly, Ny, Fy, ky, Dy, Uy, jy, By, Ky, zy, Wy, Vy = {};
  Cy(Vy, "focus-ring", () => xy, (e3) => xy = e3), Cy(Vy, "i18nFontFamily", () => Oy, (e3) => Oy = e3), Cy(Vy, "is-checked", () => Iy, (e3) => Iy = e3), Cy(Vy, "is-disabled", () => Ry, (e3) => Ry = e3), Cy(Vy, "is-hovered", () => Ay, (e3) => Ay = e3), Cy(Vy, "is-indeterminate", () => My, (e3) => My = e3), Cy(Vy, "is-invalid", () => Ly, (e3) => Ly = e3), Cy(Vy, "spectrum-Checkbox", () => Ny, (e3) => Ny = e3), Cy(Vy, "spectrum-Checkbox--quiet", () => Fy, (e3) => Fy = e3), Cy(Vy, "spectrum-Checkbox-box", () => ky, (e3) => ky = e3), Cy(Vy, "spectrum-Checkbox-checkmark", () => Dy, (e3) => Dy = e3), Cy(Vy, "spectrum-Checkbox-input", () => Uy, (e3) => Uy = e3), Cy(Vy, "spectrum-Checkbox-label", () => jy, (e3) => jy = e3), Cy(Vy, "spectrum-Checkbox-partialCheckmark", () => By, (e3) => By = e3), Cy(Vy, "spectrum-FocusRing-ring", () => Ky, (e3) => Ky = e3), Cy(Vy, "spectrum-FocusRing", () => zy, (e3) => zy = e3), Cy(Vy, "spectrum-FocusRing--quiet", () => Wy, (e3) => Wy = e3), xy = "ISsn1a_focus-ring", Oy = "ISsn1a_i18nFontFamily", Iy = "ISsn1a_is-checked", Ry = "ISsn1a_is-disabled", Ay = "ISsn1a_is-hovered", My = "ISsn1a_is-indeterminate", Ly = "ISsn1a_is-invalid", Ny = "ISsn1a_spectrum-Checkbox", Fy = "ISsn1a_spectrum-Checkbox--quiet", ky = "ISsn1a_spectrum-Checkbox-box", Dy = "ISsn1a_spectrum-Checkbox-checkmark", Uy = "ISsn1a_spectrum-Checkbox-input", jy = "ISsn1a_spectrum-Checkbox-label", By = "ISsn1a_spectrum-Checkbox-partialCheckmark", zy = "ISsn1a_spectrum-FocusRing " + (Ky = "ISsn1a_spectrum-FocusRing-ring"), Wy = "ISsn1a_spectrum-FocusRing--quiet";
  const Hy = Symbol("default");
  if ("undefined" != typeof HTMLTemplateElement) {
    const e3 = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild").get;
    Object.defineProperty(HTMLTemplateElement.prototype, "firstChild", { configurable: true, enumerable: true, get: function() {
      return this.dataset.reactAriaHidden ? this.content.firstChild : e3.call(this);
    } });
  }
  "undefined" != typeof DocumentFragment && new DocumentFragment();
  const Gy = (0, e2.createContext)(null);
  (0, e2.createContext)(null), (0, e2.createContext)(null), (0, e2.createContext)(null), (0, e2.createContext)(null), (0, e2.createContext)({});
  var qy = r(863);
  function $y(t3) {
    return e2.createElement(Gn, t3, e2.createElement(qy.K, null));
  }
  var Yy = r(6692);
  function Xy(t3) {
    return e2.createElement(Gn, t3, e2.createElement(Yy.z, null));
  }
  function Qy(t3, r2, n2) {
    let i3 = Tf({ ...t3, value: r2.isSelected }), { isInvalid: o3, validationErrors: s2, validationDetails: a2 } = i3.displayValidation, { labelProps: l2, inputProps: c2, isSelected: u2, isPressed: d2, isDisabled: p2, isReadOnly: f2 } = function(e3, t4, r3) {
      let { isDisabled: n3 = false, isReadOnly: i4 = false, value: o4, name: s3, children: a3, "aria-label": l3, "aria-labelledby": c3, validationState: u3 = "valid", isInvalid: d3 } = e3;
      null != a3 || null != l3 || null != c3 || console.warn("If you do not provide children, you must specify an aria-label for accessibility");
      let { pressProps: p3, isPressed: f3 } = xs({ isDisabled: n3 }), { pressProps: m3, isPressed: h3 } = xs({ isDisabled: n3 || i4, onPress() {
        t4.toggle();
      } }), { focusableProps: g3 } = ms(e3, r3), y2 = C(p3, g3), v2 = ve(e3, { labelable: true });
      return da(r3, t4.isSelected, t4.setSelected), { labelProps: C(m3, { onClick: (e4) => e4.preventDefault() }), inputProps: C(v2, { "aria-invalid": d3 || "invalid" === u3 || void 0, "aria-errormessage": e3["aria-errormessage"], "aria-controls": e3["aria-controls"], "aria-readonly": i4 || void 0, onChange: (e4) => {
        e4.stopPropagation(), t4.setSelected(e4.target.checked);
      }, disabled: n3, ...null == o4 ? {} : { value: o4 }, name: s3, type: "checkbox", ...y2 }), isSelected: t4.isSelected, isPressed: f3 || h3, isDisabled: n3, isReadOnly: i4, isInvalid: d3 || "invalid" === u3 };
    }({ ...t3, isInvalid: o3 }, r2, n2);
    pa(t3, i3, n2);
    let { isIndeterminate: m2, isRequired: h2, validationBehavior: g2 = "aria" } = t3;
    return (0, e2.useEffect)(() => {
      n2.current && (n2.current.indeterminate = !!m2);
    }), { labelProps: l2, inputProps: { ...c2, checked: u2, "aria-required": h2 && "aria" === g2 || void 0, required: h2 && "native" === g2 }, isSelected: u2, isPressed: d2, isDisabled: p2, isReadOnly: f2, isInvalid: o3, validationErrors: s2, validationDetails: a2 };
  }
  function Zy(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function Jy(t3, r2) {
    let n2 = t3, i3 = (0, e2.useRef)(null), o3 = pe(r2, i3);
    [t3, o3] = function(t4, r3, n3) {
      let i4 = function(t5, r4) {
        let n4 = (0, e2.useContext)(t5);
        if (null === r4) return null;
        if (n4 && "object" == typeof n4 && "slots" in n4 && n4.slots) {
          let e3 = new Intl.ListFormat().format(Object.keys(n4.slots).map((e4) => `"${e4}"`));
          if (!r4 && !n4.slots[Hy]) throw new Error(`A slot prop is required. Valid slot names are ${e3}.`);
          let t6 = r4 || Hy;
          if (!n4.slots[t6]) throw new Error(`Invalid slot "${r4}". Valid slot names are ${e3}.`);
          return n4.slots[t6];
        }
        return n4;
      }(n3, t4.slot) || {}, { ref: o4, ...s3 } = i4, a3 = qu((0, e2.useMemo)(() => ah(r3, o4), [r3, o4])), l3 = C(s3, t4);
      return "style" in s3 && s3.style && "style" in t4 && t4.style && ("function" == typeof s3.style || "function" == typeof t4.style ? l3.style = (e3) => {
        let r4 = "function" == typeof s3.style ? s3.style(e3) : s3.style, n4 = { ...e3.defaultStyle, ...r4 }, i5 = "function" == typeof t4.style ? t4.style({ ...e3, defaultStyle: n4 }) : t4.style;
        return { ...n4, ...i5 };
      } : l3.style = { ...s3.style, ...t4.style }), [l3, a3];
    }(t3, o3, Gy), t3 = go(t3 = Hn(t3));
    let { isIndeterminate: s2 = false, isEmphasized: a2 = false, autoFocus: l2, children: c2, ...u2 } = t3, { styleProps: d2 } = se(u2), p2 = (0, e2.useContext)(uy), { inputProps: f2, isInvalid: m2, isDisabled: h2 } = p2 ? function(t4, r3, n3) {
      const i4 = sy({ isReadOnly: t4.isReadOnly || r3.isReadOnly, isSelected: r3.isSelected(t4.value), onChange(e3) {
        e3 ? r3.addValue(t4.value) : r3.removeValue(t4.value), t4.onChange && t4.onChange(e3);
      } });
      let { name: o4, descriptionId: s3, errorMessageId: a3, validationBehavior: l3 } = _y.get(r3);
      var c3;
      l3 = null !== (c3 = t4.validationBehavior) && void 0 !== c3 ? c3 : l3;
      let { realtimeValidation: u3 } = Tf({ ...t4, value: i4.isSelected, name: void 0, validationBehavior: "aria" }), d3 = (0, e2.useRef)(bf), p3 = () => {
        r3.setInvalid(t4.value, u3.isInvalid ? u3 : d3.current);
      };
      (0, e2.useEffect)(p3);
      let f3 = r3.realtimeValidation.isInvalid ? r3.realtimeValidation : u3, m3 = "native" === l3 ? r3.displayValidation : f3;
      var h3;
      let g3 = Qy({ ...t4, isReadOnly: t4.isReadOnly || r3.isReadOnly, isDisabled: t4.isDisabled || r3.isDisabled, name: t4.name || o4, isRequired: null !== (h3 = t4.isRequired) && void 0 !== h3 ? h3 : r3.isRequired, validationBehavior: l3, [_f]: { realtimeValidation: f3, displayValidation: m3, resetValidation: r3.resetValidation, commitValidation: r3.commitValidation, updateValidation(e3) {
        d3.current = e3, p3();
      } } }, i4, n3);
      return { ...g3, inputProps: { ...g3.inputProps, "aria-describedby": [t4["aria-describedby"], r3.isInvalid ? a3 : null, s3].filter(Boolean).join(" ") || void 0 } };
    }({ ...t3, value: t3.value, isRequired: n2.isRequired, validationState: n2.validationState, isInvalid: n2.isInvalid }, p2, i3) : Qy(t3, sy(t3), i3), { hoverProps: g2, isHovered: y2 } = Ws({ isDisabled: h2 }), v2 = s2 ? e2.createElement(Xy, { UNSAFE_className: Xe(Zy(Vy), "spectrum-Checkbox-partialCheckmark") }) : e2.createElement($y, { UNSAFE_className: Xe(Zy(Vy), "spectrum-Checkbox-checkmark") });
    if (p2) {
      for (let e3 of ["isSelected", "defaultSelected", "isEmphasized"]) null != n2[e3] && console.warn(`${e3} is unsupported on individual <Checkbox> elements within a <CheckboxGroup>. Please apply these props to the group instead.`);
      null == t3.value && console.warn("A <Checkbox> element within a <CheckboxGroup> requires a `value` property.");
    }
    return e2.createElement("label", { ...d2, ...g2, ref: o3, className: Xe(Zy(Vy), "spectrum-Checkbox", { "is-checked": f2.checked, "is-indeterminate": s2, "spectrum-Checkbox--quiet": !a2, "is-invalid": m2, "is-disabled": h2, "is-hovered": y2 }, d2.className) }, e2.createElement(Lt, { focusRingClass: Xe(Zy(Vy), "focus-ring"), autoFocus: l2 }, e2.createElement("input", { ...f2, ref: i3, className: Xe(Zy(Vy), "spectrum-Checkbox-input") })), e2.createElement("span", { className: Xe(Zy(Vy), "spectrum-Checkbox-box") }, v2), c2 && e2.createElement("span", { className: Xe(Zy(Vy), "spectrum-Checkbox-label") }, c2));
  }
  let ev = (0, e2.forwardRef)(Jy);
  var tv = r(7616);
  function rv(t3) {
    return e2.createElement(ag, t3, e2.createElement(tv.s, null));
  }
  var nv = r(2730);
  function iv(t3) {
    return e2.createElement(ag, t3, e2.createElement(nv.g, null));
  }
  var ov;
  !function(e3) {
    e3.FIG_ID = "FIG_ID", e3.MATERIAL = "MATERIAL", e3.MERCHANDISING = "MERCHANDISING", e3.PRICING = "PRICING", e3.PRODUCT_ARRANGEMENT = "PRODUCT_ARRANGEMENT", e3.PAYMENT_INSTRUMENTS = "PAYMENT_INSTRUMENTS";
  }(ov || (ov = {}));
  const sv = t2().createContext({ engine: void 0, globals: [] }), av = Jg("OfferSelectorTool"), lv = async function({ product_arrangement_code: e3, buying_program: t3, commitment: r2, term: n2, customer_segment: i3, market_segments: [o3], sales_channel: s2, offer_type: a2, price_point: l2, merchant: c2 }, u2, d2) {
    return u2({ product_arrangement_code: e3, buying_program: t3, commitment: r2, term: n2, customer_segment: i3, market_segment: o3, sales_channel: s2, offer_type: a2, price_point: l2, merchant: c2 }, d2).then(({ data: { id: e4 } }) => (av.debug("Offer Selector Id resovled:", e4), e4));
  };
  var cv = r(903);
  function uv({ offer: { offer_id: r2, name: n2, icon: i3, pricing: { currency: { symbol: o3, format_string: s2 } = {}, prices: [{ price_details: { display_rules: { price: a2 } = {} } = {} } = {}] = [] } = {}, planType: l2, offer_type: c2, language: u2, price_point: d2 } = {}, selected: p2 = false }) {
    const f2 = (0, e2.useRef)();
    return (0, e2.useLayoutEffect)(() => {
      p2 && f2.current && f2.current.UNSAFE_getDOMNode().scrollIntoView();
    }, [f2.current]), t2().createElement(Ee, { ref: f2, borderRadius: "regular", width: "100%", borderWidth: "thin", borderColor: "light", padding: "static-size-100", backgroundColor: p2 ? "gray-200" : "gray-50" }, t2().createElement(Rl, { columns: (10, "auto", `repeat(10, ${Il("auto")})`), rows: ["auto", "20px", "static-size-500", "static-size-500", "auto"] }, t2().createElement(sh, { width: "48px", src: i3, alt: "", gridColumn: "1/span 1" }), t2().createElement(dh, { level: "4", gridColumn: "2/span 9", alignSelf: "center", margin: "0", "data-testid": d2 }, n2), t2().createElement(Xm, { size: "S", gridColumn: "1/span 10", alignSelf: "center" }), t2().createElement(dh, { level: "5", gridColumn: "span 2", margin: "0" }, "Offer ID"), t2().createElement(Ml, { gridColumn: "span 8" }, r2), t2().createElement(dh, { level: "5", gridColumn: "span 2", margin: "0" }, "Price Point"), t2().createElement(Ml, { gridColumn: "span 8" }, d2), t2().createElement(dh, { level: "5", gridColumn: "span 2", margin: "0" }, "Plan Type"), t2().createElement(dh, { level: "5", gridColumn: "span 2", margin: "0" }, "Offer type"), t2().createElement(dh, { level: "5", gridColumn: "span 2", margin: "0" }, "Language"), t2().createElement(dh, { level: "5", gridColumn: "span 4", margin: "0" }, "Price"), t2().createElement(Ml, { gridColumn: "span 2" }, l2), t2().createElement(Ml, { gridColumn: "span 2" }, c2), t2().createElement(Ml, { gridColumn: "span 2" }, u2), t2().createElement(Ml, { gridColumn: "span 4" }, s2 && t2().createElement(cv.tA, { data: { formatString: s2, price: a2 } }))));
  }
  uv.propTypes = { offer: bg, selected: o2().bool }, uv.defaultProps = { offer: {} };
  const dv = uv;
  function pv(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(7673);
  var fv, mv, hv, gv, yv, vv, bv, Ev, _v, Tv, Sv, Pv = {};
  function wv(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function Cv(t3) {
    t3 = O(t3 = Hn(t3), "link");
    let r2, { variant: n2 = "primary", isQuiet: i3, children: o3, href: s2 } = t3, { styleProps: a2 } = se(t3), { hoverProps: l2, isHovered: c2 } = Ws({}), u2 = (0, e2.useRef)(null), { linkProps: d2 } = function(e3, t4) {
      let { elementType: r3 = "a", onPress: n3, onPressStart: i4, onPressEnd: o4, onClick: s3, isDisabled: a3, ...l3 } = e3, c3 = {};
      "a" !== r3 && (c3 = { role: "link", tabIndex: a3 ? void 0 : 0 });
      let { focusableProps: u3 } = ms(e3, t4), { pressProps: d3, isPressed: p3 } = xs({ onPress: n3, onPressStart: i4, onPressEnd: o4, isDisabled: a3, ref: t4 }), f2 = ve(l3, { labelable: true }), m2 = C(u3, d3), h2 = Rn();
      return { isPressed: p3, linkProps: C(f2, Nn(e3), { ...m2, ...c3, "aria-disabled": a3 || void 0, "aria-current": e3["aria-current"], onClick: (t5) => {
        var r4;
        null === (r4 = d3.onClick) || void 0 === r4 || r4.call(d3, t5), s3 && (s3(t5), console.warn("onClick is deprecated, please use onPress")), !h2.isNative && t5.currentTarget instanceof HTMLAnchorElement && t5.currentTarget.href && !t5.isDefaultPrevented() && An(t5.currentTarget, t5) && e3.href && (t5.preventDefault(), h2.open(t5.currentTarget, t5, e3.href, e3.routerOptions));
      } }) };
    }({ ...t3, elementType: s2 || "string" != typeof o3 ? "a" : "span" }, u2), p2 = { ...a2, ...C(d2, l2), ref: u2, className: Xe(wv(Pv), "spectrum-Link", { "spectrum-Link--quiet": i3, [`spectrum-Link--${n2}`]: n2, "is-hovered": c2 }, a2.className) };
    if (s2) r2 = e2.createElement("a", p2, o3);
    else {
      let t4 = function(t5) {
        let r3;
        return r3 = "string" == typeof t5 ? e2.createElement("span", null, t5) : e2.Children.only(t5), r3;
      }(o3);
      r2 = e2.cloneElement(t4, { ...C(t4.props, p2), ref: t4.ref ? ah(u2, t4.ref) : u2 });
    }
    return e2.createElement(Lt, { focusRingClass: Xe(wv(Pv), "focus-ring") }, r2);
  }
  pv(Pv, "focus-ring", () => fv, (e3) => fv = e3), pv(Pv, "i18nFontFamily", () => mv, (e3) => mv = e3), pv(Pv, "is-disabled", () => hv, (e3) => hv = e3), pv(Pv, "is-hovered", () => gv, (e3) => gv = e3), pv(Pv, "spectrum-FocusRing-ring", () => yv, (e3) => yv = e3), pv(Pv, "spectrum-FocusRing", () => vv, (e3) => vv = e3), pv(Pv, "spectrum-FocusRing--quiet", () => bv, (e3) => bv = e3), pv(Pv, "spectrum-Link", () => Ev, (e3) => Ev = e3), pv(Pv, "spectrum-Link--overBackground", () => _v, (e3) => _v = e3), pv(Pv, "spectrum-Link--quiet", () => Tv, (e3) => Tv = e3), pv(Pv, "spectrum-Link--secondary", () => Sv, (e3) => Sv = e3), fv = "WBgRPa_focus-ring", mv = "WBgRPa_i18nFontFamily", hv = "WBgRPa_is-disabled", gv = "WBgRPa_is-hovered", vv = "WBgRPa_spectrum-FocusRing " + (yv = "WBgRPa_spectrum-FocusRing-ring"), bv = "WBgRPa_spectrum-FocusRing--quiet", Ev = "WBgRPa_spectrum-Link", _v = "WBgRPa_spectrum-Link--overBackground", Tv = "WBgRPa_spectrum-Link--quiet", Sv = "WBgRPa_spectrum-Link--secondary";
  const xv = Object.freeze({ pending: "pending", rejected: "rejected", resolved: "resolved" }), Ov = Object.values(xv), Iv = (e3) => null != e3 && e3 instanceof HTMLElement, Rv = (e3) => null != e3 && e3 instanceof Node, { pending: Av, rejected: Mv, resolved: Lv } = xv, Nv = "placeholder", Fv = { [Av]: `${Nv}-${Av}`, rejected: `${Nv}-${Mv}`, resolved: `${Nv}-${Lv}` };
  function kv(e3, t3) {
    Iv(e3) && (e3.classList.remove(Fv.pending, Fv.rejected, Fv.resolved), e3.classList.add(Nv, Fv[t3]));
  }
  const Dv = Symbol.for(`${zg}-scaffolds`);
  let Uv;
  try {
    Uv = globalThis[Dv], Uv instanceof Map || (Uv = /* @__PURE__ */ new Map(), globalThis[Dv] = Uv, Uv.set("", /* @__PURE__ */ new WeakSet()));
  } catch (e3) {
    Uv = /* @__PURE__ */ new Map(), console.warn(`[${zg}] Unable to share repository of modules:`, e3);
  }
  function jv(e3) {
    const t3 = Jg(e3);
    let r2 = Uv.get(e3);
    return r2 || (r2 = /* @__PURE__ */ new WeakSet(), Uv.set(e3, r2)), { log: t3, createAssert: (e4, r3) => (...n2) => t3.assert(e4(...n2), r3, ...n2), defineModule: (t4) => (null != t4 && (r2.add(t4), Object.defineProperty(t4, Symbol.toStringTag, { configurable: true, value: e3 })), t4), isModule: (e4) => Gg(e4) && r2.has(e4) };
  }
  const { log: Bv, createAssert: Kv, defineModule: zv, isModule: Wv } = jv("DomPlaceholderRenderer"), Vv = Kv(Hg, 'Argument "accept" must be a function:'), Hv = Kv(Hg, 'Argument "render" must be a function:'), Gv = Kv((e3) => Vg(e3) || Rv(e3), 'Argument "render" must return a boolean or an instance of DOM node:'), qv = ["boolean", "bigint", "function", "number", "object", "string"], { log: $v, createAssert: Yv, defineModule: Xv, isModule: Qv } = jv("PlaceholderContext"), Zv = Yv((e3) => Hg(e3) || Gg(e3), "Option must be a function or an object or an array of these:"), Jv = Yv((e3) => null == e3 || qg(e3) || /* @__PURE__ */ ((e4) => "number" == typeof e4)(e3) || Vg(e3) || Wg(e3) && e3.every(Jv) || Gg(e3) && (Hg(e3.toJSON) || Object.values(e3).every(Jv)), "Option properties must be serializable to JSON:"), eb = Qv, { log: tb, createAssert: rb, defineModule: nb, isModule: ib } = jv("PlaceholderProvider");
  rb(Hg, 'Argument "identify" must be a function:'), rb(Hg, 'Argument "provide" must be a function:'), rb(Gg, 'Method "identify" must return an object:'), rb((e3) => Gg(e3) && eb(e3.context), 'Method "provide" must yield a promise resolving to objects having "context" property:');
  const ob = ib, { log: sb, createAssert: ab, defineModule: lb, isModule: cb } = jv("PlaceholderTemplate");
  ab(Hg, 'Argument "accept" must be a function:'), ab(Hg, 'Argument "format" must be a function:'), ab((e3) => Ov.includes(e3), 'Argument "stage" must be member of placeholderStages enum:');
  const ub = cb, { pending: db, rejected: pb, resolved: fb } = xv, { log: mb, createAssert: hb, defineModule: gb, isModule: yb } = jv("PlaceholderEngine");
  hb(eb, 'Argument "context" must be an instance of PlaceholderContext:'), hb((e3) => ob(e3) || ub(e3), 'Argument "module" must be an instance of PlaceholderProvider or PlaceholderTemplate type:');
  const vb = yb, { log: bb, createAssert: Eb } = jv("usePlaceholder"), _b = Eb((e3) => vb(e3.engine) && Wg(e3.globals), 'Need "PlaceholderContext" initialised with placeholder engine and array of globals:'), Tb = function(e3, t3) {
    return Vv(e3) && Hv(t3) ? zv({ accept(t4, r2) {
      if (null == r2) return false;
      try {
        const n2 = e3(t4, r2);
        if (Vg(n2) || Rv(n2) && t4.isConnected) return n2 === t4 || n2;
        Bv.error("If returns, render function must return either new DOM Node, connected to the DOM tree, boolean, null or undefined:", { result: n2 });
      } catch (e4) {
        Bv.error("Accept function error:", e4);
      }
      return false;
    }, render(e4, r2, n2) {
      if (null == n2) return false;
      try {
        const i3 = t3(e4, r2, n2);
        if (!Gv(i3)) return false;
        if (true === i3) Bv.debug("Rendered:", { node: e4, stage: r2, value: n2 });
        else if (false === i3) Bv.debug("Not rendered:", { node: e4, stage: r2, value: n2 });
        else {
          const t4 = i3;
          Bv.debug("Replaced:", { node: e4, newNode: t4, stage: r2, value: n2 });
        }
        return i3;
      } catch (e5) {
        Bv.error("Render function error:", e5);
      }
      return false;
    } }) : null;
  }((e3, t3) => Iv(e3) && qv.includes(typeof t3), (e3, t3, r2) => {
    if (Hg(r2)) {
      const n2 = r2(e3, t3) ?? true;
      return kv(Iv(n2) ? n2 : e3, t3), n2;
    }
    if (Gg(r2)) {
      for (const t4 of Object.keys(r2)) t4 ? e3.setAttribute(t4, r2[t4]) : e3.innerHTML = r2[t4];
      return kv(e3, t3), true;
    }
    return e3.innerHTML = r2, kv(e3, t3), true;
  });
  function Sb(...t3) {
    const r2 = (0, e2.useContext)(sv) ?? {}, [n2, i3] = (0, e2.useState)(), o3 = (0, e2.useCallback)((e3) => {
      null != e3 && i3(e3);
    }, []);
    return (0, e2.useEffect)(() => {
      if (!n2) return;
      const e3 = { ...n2.dataset };
      if (!_b(r2)) return;
      const { engine: i4, globals: o4 } = r2, s2 = function(e4, t4) {
        const r3 = {};
        for (let t5 = (e4 = (n3 = e4, Wg(n3) ? n3 : [n3]).flat(Number.MAX_SAFE_INTEGER)).length - 1; t5 >= 0; t5--) {
          let n4 = e4[t5];
          if (Hg(n4)) try {
            n4 = n4(void 0, r3);
          } catch (e5) {
            return $v.error("Option function error:", e5), null;
          }
          if (!Zv(n4)) return null;
          if (n4 = $g(n4), !Jv(n4)) return null;
          Object.assign(r3, n4);
        }
        var n3;
        return Xv(r3);
      }([...t3, e3, o4]);
      return bb.debug("Extracted:", { context: s2, node: n2 }), i4.resolve(s2).subscribe((e4, t4) => {
        Tb.render(n2, e4, t4);
      });
    }, [n2, t3]), o3;
  }
  const Pb = ({ offerSelectorId: r2, type: n2, name: i3, description: o3, doc: s2, onSelect: a2, options: l2, workflowStep: c2, clientId: u2, promotionCode: d2, displayOldPrice: p2, marketSegment: f2, checkoutType: m2, isPerpetual: h2, ctaText: g2 }) => {
    const { defaultPlaceholderOptions: y2, disablePlaceholderSelection: v2 } = (0, e2.useContext)(gg), b2 = "checkoutUrl" === n2, E2 = Object.fromEntries(Object.entries(y2).map(([e3]) => [e3, !l2.includes(e3)]));
    E2.forceTaxExclusive = !E2.forceTaxExclusive;
    const [_2, T2] = (0, e2.useState)("Use");
    E2.workflowStep = c2, E2.clientId = u2, E2.marketSegment = f2, E2.workflow = m2, E2.isPerpetual = h2, E2.ctaText = g2;
    const S2 = (0, e2.useCallback)((e3) => {
      var t3;
      a2(r2, n2, E2), (t3 = e3).target.style.backgroundColor = "#696", T2("Copied"), setTimeout(() => {
        T2("Use"), t3.target.style.backgroundColor = null;
      }, 400);
    }, [r2, n2, E2]), P2 = Sb(E2);
    return t2().createElement(t2().Fragment, null, t2().createElement(dh, { level: "4", margin: "0" }, i3), t2().createElement(Qh, { isDisabled: v2, gridRow: "span 3", alignSelf: "center", onPress: S2, variant: "secondary" }, _2), t2().createElement(Cv, { variant: "secondary" }, t2().createElement("a", { href: s2, target: "_blank", rel: "noreferrer" }, o3)), !b2 && t2().createElement("div", { ref: P2, "data-offer-selector-id": r2, "data-type": n2, "data-promotion-code": d2, "data-display-old-price": p2 }), b2 && t2().createElement("a", { ref: P2, "data-offer-selector-id": r2, "data-promotion-code": d2, "data-type": n2, target: "_blank" }, "Checkout Link"), t2().createElement("div", { style: { gridColumn: "span 2" } }, "\xA0"));
  };
  Pb.propTypes = { offerSelectorId: o2().string.isRequired, type: o2().string.isRequired, name: o2().string.isRequired, description: o2().string.isRequired, doc: o2().string, onSelect: o2().func.isRequired, options: o2().arrayOf(o2().string), workflowStep: o2().string, clientId: o2().string, promotionCode: o2().string, displayOldPrice: o2().bool, marketSegment: o2().string, checkoutType: o2().string, isPerpetual: o2().bool, ctaText: o2().string }, Pb.defaultProps = { doc: "" };
  const wb = Pb, Cb = (Jh.YEAR, eg.MONTHLY, Jh.YEAR, eg.ANNUAL, Jh.MONTH, eg.MONTHLY, Jh.PERPETUAL, Jh.THREE_MONTHS, eg.P3Y, "Value is not an offer"), xb = (e3) => {
    if ("object" != typeof e3) return Cb;
    const { commitment: t3, term: r2 } = e3, n2 = Ob(t3, r2);
    return { ...e3, planType: n2 };
  }, Ob = (e3, t3) => {
    switch (e3) {
      case void 0:
        return Cb;
      case "":
        return "";
      case Jh.YEAR:
        return t3 === eg.MONTHLY ? "ABM" : t3 === eg.ANNUAL ? "PUF" : "";
      case Jh.MONTH:
        return t3 === eg.MONTHLY ? "M2M" : "";
      case Jh.PERPETUAL:
        return "PERPETUAL";
      case Jh.TERM_LICENSE:
        return t3 === eg.P3Y ? "P3Y" : "";
      default:
        return "";
    }
  }, Ib = "promo-tag", Rb = (e3, t3, r2) => {
    const n2 = (e4) => e4 || "no promo", i3 = r2 ? ` (was "${n2(t3)}")` : "";
    return `${n2(e3)}${i3}`;
  }, Ab = "cancel-context", Mb = (e3, t3) => {
    const r2 = e3 === Ab, n2 = !r2 && e3?.length > 0, i3 = (n2 || r2) && (t3 && t3 != e3 || !t3 && !r2), o3 = i3 && n2 || !i3 && !!t3, s2 = o3 ? e3 || t3 : void 0;
    return { effectivePromoCode: s2, overridenPromoCode: e3, className: o3 ? Ib : `${Ib} no-promo`, text: Rb(s2, t3, i3), variant: o3 ? "yellow" : "neutral", isOverriden: i3 };
  };
  var Lb, Nb;
  !function(e3) {
    e3.V2 = "UCv2", e3.V3 = "UCv3";
  }(Lb || (Lb = {})), function(e3) {
    e3.CHECKOUT = "checkout", e3.CHECKOUT_EMAIL = "checkout/email", e3.SEGMENTATION = "segmentation", e3.BUNDLE = "bundle", e3.COMMITMENT = "commitment", e3.RECOMMENDATION = "recommendation", e3.EMAIL = "email", e3.PAYMENT = "payment", e3.CHANGE_PLAN_TEAM_PLANS = "change-plan/team-upgrade/plans", e3.CHANGE_PLAN_TEAM_PAYMENT = "change-plan/team-upgrade/payment";
  }(Nb || (Nb = {}));
  const Fb = {};
  Fb[Lb.V2] = [{ id: Nb.CHECKOUT, name: "Checkout" }, { id: Nb.CHECKOUT_EMAIL, name: "Checkout Email" }], Fb[Lb.V3] = [{ id: Nb.EMAIL, name: "Email" }, { id: Nb.BUNDLE, name: "Bundle" }, { id: Nb.COMMITMENT, name: "Commitment" }, { id: Nb.SEGMENTATION, name: "Segmentation" }, { id: Nb.RECOMMENDATION, name: "Recommendation" }, { id: Nb.PAYMENT, name: "Payment" }, { id: Nb.CHANGE_PLAN_TEAM_PLANS, name: "Change Plan Team Plans" }, { id: Nb.CHANGE_PLAN_TEAM_PAYMENT, name: "Change Plan Team Payment" }];
  const kb = {};
  kb[Lb.V2] = Nb.CHECKOUT, kb[Lb.V3] = Nb.EMAIL;
  const Db = (e3) => Fb[e3], Ub = ({ selectedOffer: r2, checkoutPlaceholders: n2, checkoutType: i3, workflowStep: o3, setCheckoutType: s2, setWorkflowStep: a2, ctaText: l2, setCtaText: c2, ctaTextOption: u2 }) => {
    const [d2, p2] = (0, e2.useState)(Db(i3));
    return t2().createElement(Ee, { backgroundColor: "gray-200", padding: "static-size-200", borderRadius: "regular", borderWidth: "thin", borderColor: "light" }, t2().createElement(mo, { direction: "column", width: "100%", height: "100%", justifyContent: "space-evenly", gap: "static-size-200" }, n2, t2().createElement(Oh, { label: "Choose your checkout type", orientation: "horizontal", isRequired: true, necessityIndicator: "icon", value: i3, onChange: (e3) => {
      s2(e3), p2(Db(e3)), a2(((e4) => kb[e4])(e3));
    } }, t2().createElement(Gh, { value: Lb.V3 }, Lb.V3), t2().createElement(Gh, { value: Lb.V2 }, Lb.V2)), t2().createElement(Kf, { label: "Choose your Workflow Step", items: d2, selectedKey: o3, isRequired: true, necessityIndicator: "icon", onSelectionChange: (e3) => a2(e3) }, (e3) => t2().createElement(Vf, null, e3.name)), u2 && u2?.getTexts().length > 0 ? t2().createElement(Kf, { label: "Choose your Cta text", items: u2.getTexts(), selectedKey: l2, isRequired: true, necessityIndicator: "icon", onSelectionChange: (e3) => c2(e3) }, (e3) => t2().createElement(Vf, null, e3.name)) : null, r2 ? "" : "Please select an offer on the left."));
  };
  Ub.propTypes = { selectedOffer: o2().object, checkoutPlaceholders: o2().any, checkoutType: o2().string, workflowStep: o2().string, setCheckoutType: o2().func, setWorkflowStep: o2().func, ctaText: o2().string, setCtaText: o2().func, ctaTextOption: o2().object };
  const jb = Ub;
  function Bb(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(5878);
  var Kb, zb, Wb, Vb, Hb, Gb, qb, $b, Yb, Xb, Qb, Zb, Jb, eE, tE, rE, nE, iE, oE, sE, aE = {};
  function lE(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function cE(t3, r2) {
    let { children: n2, variant: i3, ...o3 } = Hn(t3), s2 = de(r2), { styleProps: a2 } = se(o3), l2 = e2.Children.toArray(t3.children).every((t4) => !e2.isValidElement(t4));
    return e2.createElement("span", { ...ve(o3), ...a2, role: "presentation", className: Xe(lE(aE), "spectrum-Badge", { [`spectrum-Badge--${i3}`]: i3 }, a2.className), ref: s2 }, e2.createElement(I, { slots: { icon: { size: "S", UNSAFE_className: Xe(lE(aE), "spectrum-Badge-icon") }, text: { UNSAFE_className: Xe(lE(aE), "spectrum-Badge-label") } } }, "string" == typeof n2 || l2 ? e2.createElement(Ml, null, n2) : n2));
  }
  Bb(aE, "focus-ring", () => Kb, (e3) => Kb = e3), Bb(aE, "i18nFontFamily", () => zb, (e3) => zb = e3), Bb(aE, "spectrum-Badge", () => Wb, (e3) => Wb = e3), Bb(aE, "spectrum-Badge--fuchsia", () => Vb, (e3) => Vb = e3), Bb(aE, "spectrum-Badge--indigo", () => Hb, (e3) => Hb = e3), Bb(aE, "spectrum-Badge--info", () => Gb, (e3) => Gb = e3), Bb(aE, "spectrum-Badge--large", () => qb, (e3) => qb = e3), Bb(aE, "spectrum-Badge--magenta", () => $b, (e3) => $b = e3), Bb(aE, "spectrum-Badge--negative", () => Yb, (e3) => Yb = e3), Bb(aE, "spectrum-Badge--neutral", () => Xb, (e3) => Xb = e3), Bb(aE, "spectrum-Badge--positive", () => Qb, (e3) => Qb = e3), Bb(aE, "spectrum-Badge--purple", () => Zb, (e3) => Zb = e3), Bb(aE, "spectrum-Badge--seafoam", () => Jb, (e3) => Jb = e3), Bb(aE, "spectrum-Badge--small", () => eE, (e3) => eE = e3), Bb(aE, "spectrum-Badge--yellow", () => tE, (e3) => tE = e3), Bb(aE, "spectrum-Badge-icon", () => rE, (e3) => rE = e3), Bb(aE, "spectrum-Badge-label", () => nE, (e3) => nE = e3), Bb(aE, "spectrum-FocusRing-ring", () => iE, (e3) => iE = e3), Bb(aE, "spectrum-FocusRing", () => oE, (e3) => oE = e3), Bb(aE, "spectrum-FocusRing--quiet", () => sE, (e3) => sE = e3), Kb = "CIB44a_focus-ring", zb = "CIB44a_i18nFontFamily", Wb = "CIB44a_spectrum-Badge", Vb = "CIB44a_spectrum-Badge--fuchsia", Hb = "CIB44a_spectrum-Badge--indigo", Gb = "CIB44a_spectrum-Badge--info", qb = "CIB44a_spectrum-Badge--large", $b = "CIB44a_spectrum-Badge--magenta", Yb = "CIB44a_spectrum-Badge--negative", Xb = "CIB44a_spectrum-Badge--neutral", Qb = "CIB44a_spectrum-Badge--positive", Zb = "CIB44a_spectrum-Badge--purple", Jb = "CIB44a_spectrum-Badge--seafoam", eE = "CIB44a_spectrum-Badge--small", tE = "CIB44a_spectrum-Badge--yellow", rE = "CIB44a_spectrum-Badge-icon", nE = "CIB44a_spectrum-Badge-label", oE = "CIB44a_spectrum-FocusRing " + (iE = "CIB44a_spectrum-FocusRing-ring"), sE = "CIB44a_spectrum-FocusRing--quiet";
  let uE = (0, e2.forwardRef)(cE);
  var dE = r(6240);
  function pE(t3) {
    return e2.createElement(Gn, t3, e2.createElement(dE.B, null));
  }
  function fE(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function mE(t3, r2) {
    t3 = O(t3 = Hn(t3), "actionButton");
    let n2 = O({ UNSAFE_className: Xe(fE(os), "spectrum-ActionButton-label") }, "text"), { isQuiet: i3, isDisabled: o3, staticColor: s2, children: a2, autoFocus: l2, holdAffordance: c2, hideButtonText: u2, ...d2 } = t3, p2 = pe(r2), { buttonProps: f2, isPressed: m2 } = Ds(t3, p2), { hoverProps: h2, isHovered: g2 } = Ws({ isDisabled: o3 }), { styleProps: y2 } = se(d2), v2 = e2.Children.toArray(t3.children).every((t4) => !e2.isValidElement(t4));
    return e2.createElement(Lt, { focusRingClass: Xe(fE(os), "focus-ring"), autoFocus: l2 }, e2.createElement("button", { ...y2, ...C(f2, h2), ref: p2, className: Xe(fE(os), "spectrum-ActionButton", { "spectrum-ActionButton--quiet": i3, "spectrum-ActionButton--staticColor": !!s2, "spectrum-ActionButton--staticWhite": "white" === s2, "spectrum-ActionButton--staticBlack": "black" === s2, "is-active": m2, "is-disabled": o3, "is-hovered": g2 }, y2.className) }, c2 && e2.createElement(pE, { UNSAFE_className: Xe(fE(os), "spectrum-ActionButton-hold") }), e2.createElement(R, null, e2.createElement(I, { slots: { icon: { size: "S", UNSAFE_className: Xe(fE(os), "spectrum-Icon", { "spectrum-ActionGroup-itemIcon": u2 }) }, text: { ...n2 } } }, "string" == typeof a2 || v2 ? e2.createElement(Ml, null, a2) : a2))));
  }
  let hE = e2.forwardRef(mE);
  var gE = r(8014);
  function yE(t3) {
    return e2.createElement(ag, t3, e2.createElement(gE.o, null));
  }
  var vE = r(7213);
  function bE(t3) {
    return e2.createElement(ag, t3, e2.createElement(vE.n, null));
  }
  var EE = r(1092);
  function _E(t3) {
    return e2.createElement(ag, t3, e2.createElement(EE.C, null));
  }
  function TE({ promoOverride: e3, setPromoOverride: r2, status: n2 }) {
    return t2().createElement(mo, { direction: "row", alignContent: "stretch", gap: "2%", alignItems: "center", height: "100%", width: "100%" }, t2().createElement(Ml, null, "Promotion:"), t2().createElement(uE, { variant: n2.variant, UNSAFE_className: n2.className }, n2.isOverriden && t2().createElement(yE, null, " "), t2().createElement(Ml, null, n2.text)), t2().createElement(hE, { isQuiet: "true", UNSAFE_className: "promo-tag-button", onPress: () => {
      r2(Ab);
    } }, t2().createElement(bE, { size: "S" })), t2().createElement(Nm, { label: "Override", labelPosition: "side", value: e3 || "", onChange: r2 }), t2().createElement(hE, { isQuiet: "true", UNSAFE_className: "promo-tag-button", onPress: () => {
      r2(""), r2(void 0);
    } }, t2().createElement(_E, { size: "S" })));
  }
  TE.propTypes = { promoOverride: o2().string, setPromoOverride: o2().func.isRequired, status: o2().object.isRequired };
  const SE = Jg("OfferSelectorTool"), PE = { buyingProgram: ig.RETAIL, merchant: "ADOBE", salesChannel: ng.DIRECT, serviceProviders: [ov.PRICING] }, wE = "price";
  function CE({ previousStep: r2, onSelect: n2, ctaTextOption: i3 }) {
    const { aosParams: o3, searchOfferId: s2, selectedProduct: a2, accessToken: l2, apiKey: c2, defaultPlaceholderOptions: u2, offerSelectorPlaceholderOptions: d2, disableOfferSelection: p2, disablePlaceholderSelection: f2, globals: m2, baseUrl: h2, env: g2, environment: y2, landscape: v2, promotionCode: b2, storedPromoOverride: E2, engine: _2, placeholderTypes: T2, onCancel: S2, checkoutClientId: P2, searchParameters: w2, containerHeight: C2, filteredProducts: x2 } = (0, e2.useContext)(gg), O2 = m2[0]?.country, I2 = { apiKey: c2, environment: y2, landscape: v2, pageSize: 1e3 }, [R2, A2] = (0, e2.useState)([]), [M2, L2] = (0, e2.useState)(true), [N2, F2] = (0, e2.useState)(((e3) => {
      const t3 = e3.get("checkoutType");
      return t3 && Object.values(Lb).includes(t3) ? t3 : "UCv3";
    })(w2)), [k2, D2] = (0, e2.useState)(((e3, t3) => {
      const r3 = ((e4) => e4 ? e4.includes("_") ? e4.replace("_", "/") : e4 : "")(decodeURI(e3.get("workflowStep")));
      return r3 && Fb[t3].find((e4) => e4.id === r3) ? r3 : kb[t3];
    })(w2, N2)), [U2, j2] = (0, e2.useState)(i3?.getSelectedText(w2)), B2 = w2.get("type"), K2 = B2 && B2.startsWith("checkout") ? "checkout" : "price", [z2, W2] = (0, e2.useState)([]);
    (0, e2.useEffect)(() => {
      W2(Object.entries({ ...u2, ...d2 }).filter(([, e3]) => !e3).map(([e3]) => e3));
    }, []);
    const [V2, H2] = (0, e2.useState)(E2), [G2, q2] = (0, e2.useState)(Mb(V2, b2));
    (0, e2.useEffect)(() => {
      q2(Mb(V2, b2));
    }, [V2]);
    const [$2, Y2] = (0, e2.useState)(false), [X2, Q2] = (0, e2.useState)(), [Z2, J2] = (0, e2.useState)(), ee2 = (e3, t3, r3) => {
      Z2 && n2(e3, t3, Z2, r3, G2.isOverriden ? G2.overridenPromoCode : void 0);
    }, { arrangementCode: te2, pricePoint: re2, commitment: ne2, term: ie2, offerType: oe2, customerSegment: se2, marketSegment: ae2 } = o3, { planType: le2 } = xb({ commitment: ne2, term: ie2 }), ce2 = (0, e2.useMemo)(() => o3 ? ` ${a2.name}, ${le2 ? le2 + "," : ""} ${se2}, ${oe2}, ${ae2}` : null, [o3, le2, oe2, se2, ae2]), ue2 = ((t3) => {
      const r3 = Bg(), n3 = Ag(), i4 = cg[kg().toUpperCase()], o4 = { accessToken: n3.getAccessToken(), env: i4, fetch: r3 };
      return (0, e2.useMemo)(() => ((e3, t4) => t4(e3).searchOffers)(o4, t3), [n3, i4, r3]);
    })((e3) => new Ig({ ...e3, landscape: v2, env: g2, baseUrl: h2 }));
    (0, e2.useEffect)(() => {
      const e3 = "GB" === O2 || ne2 === Jh.PERPETUAL ? "EN" : "MULT";
      ue2({ ...PE, arrangementCode: [te2], pricePoint: [re2], commitment: ne2, term: ie2, offerType: oe2, customerSegment: se2, marketSegment: ae2, country: O2, language: e3 }, I2).then((e4) => e4.data).then((e4) => e4.map(xb)).then((e4) => e4.map((e5) => (e5.id = e5.offer_id, e5.name = a2.name, e5.icon = a2.icon, e5))).then((e4) => e4.sort(({ name: e5, price_point: t3 }, { name: r3, price_point: n3 }) => `${r3}${n3}`.localeCompare(`${e5}${t3}`))).then(A2).catch((e4) => SE.error(e4.message));
    }, [x2]);
    const [de2] = ((t3) => {
      const r3 = Bg(), n3 = Ag(), i4 = cg[kg().toUpperCase()], o4 = { accessToken: n3.getAccessToken(), env: i4, fetch: r3 };
      return (0, e2.useMemo)(() => ((e3, t4) => [t4(e3).createOfferSelector])(o4, t3), [n3, i4, r3]);
    })((e3) => {
      const t3 = { ...e3, accessToken: l2, landscape: v2, apiKey: c2, env: g2, baseUrl: h2 };
      return new Ig(t3);
    });
    (0, e2.useEffect)(() => {
      1 === R2.length && J2(R2[0]);
    }, [R2]), (0, e2.useEffect)(() => {
      if (0 === R2.length) return;
      const [{ buying_program: e3, merchant: t3, sales_channel: r3 }] = R2, { arrangementCode: n3, commitment: i4, customerSegment: s3, marketSegment: a3, offerType: l3, term: c3 } = o3, u3 = { buying_program: e3, merchant: t3, sales_channel: r3, product_arrangement_code: n3, customer_segment: s3, market_segments: [a3], offer_type: l3 };
      i4 && c3 && Object.assign(u3, { commitment: i4, term: c3 }), p2 && lv(u3, de2, I2).then(Q2);
    }, [R2, p2, de2]), (0, e2.useEffect)(() => {
      Z2 && lv(Z2, de2, I2).then((e3) => {
        Q2(e3), Y2(true);
      }).catch((e3) => SE.error(e3.message));
    }, [Z2, de2, V2]), (0, e2.useEffect)(() => {
      if (!s2) return;
      const e3 = R2.find(({ offer_id: e4 }) => e4 === s2);
      e3 && J2(e3);
    }, [R2]);
    const [pe2, fe2] = (0, e2.useMemo)(() => {
      const e3 = (e4) => {
        if (!($2 && X2 && _2)) return t2().createElement("div", null);
        const r3 = T2.filter(e4).filter(({ type: e5 }) => !("priceAnnual" === e5 && "ABM" !== Z2.planType || "priceOptical" === e5 && "PUF" !== Z2.planType)).map(({ type: e5, name: r4, description: n3, doc: i4 }) => {
          const o4 = `${X2}.${e5}`, s3 = Z2.commitment === Jh.PERPETUAL;
          return t2().createElement(wb, { key: o4, offerSelectorId: X2, type: e5, name: r4, description: n3, doc: i4, onSelect: ee2, options: z2, workflowStep: k2, marketSegment: ae2, promotionCode: G2.effectivePromoCode, clientId: P2, checkoutType: N2, isPerpetual: s3, ctaText: U2 });
        });
        return t2().createElement(sv.Provider, { value: { engine: _2, globals: m2 } }, t2().createElement(Rl, { columns: ["1fr", "size-1000"], autoRows: ["size-400", "auto", "size-400", "size-400"] }, r3));
      };
      return [e3(({ type: e4 }) => !e4.includes("checkout")), e3(({ type: e4 }) => e4.includes("checkout"))];
    }, [$2, X2, _2, m2, z2, ee2]), [me2, he2] = (0, e2.useState)(wE), ge2 = (0, e2.useCallback)((e3) => {
      p2 || J2(e3);
    }, []), ye2 = (0, e2.useCallback)(() => {
      n2(X2, null, Z2, null, G2.isOverriden ? G2.effectivePromoCode : null);
    }, [Z2, X2]), ve2 = (0, e2.useMemo)(() => {
      if (0 === R2.length) return null;
      const e3 = R2.map((e4) => t2().createElement("div", { key: e4.offer_id, onClick: () => ge2(e4) }, t2().createElement(dv, { selected: e4 === Z2, offer: { ...e4, ...a2 } })));
      return t2().createElement(mo, { direction: "column", gap: "size-300", "aria-label": "Offers", alignSelf: "stretch", justifySelf: "stretch" }, e3);
    }, [R2, C2, Z2]);
    return t2().createElement(mo, { paddingTop: "size-50" }, t2().createElement(Rl, { minHeight: "490px", flex: "1", columns: ["2fr", "3fr"], rows: ["size-600", "1fr", "110px", "size-400"], gap: "size-300" }, t2().createElement(Ml, { gridColumn: "1", alignSelf: "end", "data-testid": "offersTab/result" }, "Offers for ", ce2), t2().createElement(Ee, { gridColumn: "span 1", gridRow: "span 2", "overflow-y": "auto", borderRadius: "regular", borderWidth: "thin", borderColor: "light", backgroundColor: "gray-50", height: C2 - 260, alignSelf: "stretch", overflow: "hidden auto" }, ve2), t2().createElement(om, { "aria-label": "Configuration", gridColumn: "2 / span 1", gridRow: "1 / span 2", defaultSelectedKey: K2, onSelectionChange: he2 }, t2().createElement(mo, { justifyContent: "center" }, t2().createElement(tm, null, t2().createElement(Vf, { key: wE }, "Price"), t2().createElement(Vf, { key: "checkout" }, "Checkout"))), t2().createElement(rm, null, t2().createElement(Vf, { key: wE }, t2().createElement(mo, { direction: "column", gap: "size-100" }, t2().createElement(Ee, { "overflow-y": "scroll", paddingTop: "size-200", paddingLeft: "size-200", paddingRight: "size-200", height: "100%" }, !Z2 && t2().createElement(mo, { justifyContent: "center" }, "Please select an offer on the left."), pe2))), t2().createElement(Vf, { key: "checkout" }, t2().createElement(jb, { selectedOffer: Z2, checkoutPlaceholders: fe2, checkoutType: N2, workflowStep: k2, setCheckoutType: F2, setWorkflowStep: D2, ctaText: U2, setCtaText: j2, ctaTextOption: i3 })))), t2().createElement(Ee, { gridRow: "span 1", alignSelf: "end" }, Z2 && t2().createElement(Ee, { backgroundColor: M2 ? "gray-200" : "", borderRadius: "regular", borderColor: "light", paddingStart: "size-100", paddingEnd: "size-100" }, t2().createElement(mo, { direction: "column" }, t2().createElement(mo, { direction: "row-reverse", marginTop: "size-200", justifyContent: "space-between" }, t2().createElement(cy, { isEmphasized: true, isSelected: M2, onChange: L2, "aria-label": "Options" }, M2 ? t2().createElement(iv, null) : t2().createElement(rv, null)), M2 && t2().createElement(TE, { promoOverride: V2, setPromoOverride: H2, status: G2 })), M2 && me2 === wE && t2().createElement(wy, { label: "Disable", orientation: "horizontal", value: z2, onChange: W2 }, t2().createElement(ev, { value: "displayFormatted" }, "HTML Format"), t2().createElement(ev, { value: "displayRecurrence" }, "Term"), t2().createElement(ev, { value: "displayPerUnit" }, "Unit"), t2().createElement(ev, { value: "displayTax" }, "Tax Label"), t2().createElement(ev, { value: "forceTaxExclusive" }, "Include Tax"), t2().createElement(ev, { value: "displayOldPrice" }, "Old price"))))), t2().createElement(mo, { justifyContent: "space-between", gridColumn: "span 2" }, t2().createElement(Qh, { "aria-label": "previous-step", variant: "primary", onPress: r2 }, "Back"), t2().createElement(mo, null, S2 && t2().createElement(Qh, { "aria-label": "cancel", variant: "primary", onPress: S2 }, "Cancel"), f2 && t2().createElement(Qh, { marginStart: "size-200", "aria-label": "previous-step", variant: "cta", onPress: ye2, isDisabled: !X2 }, "Use")))));
  }
  CE.propTypes = { onSelect: o2().func.isRequired, ...Eg };
  const xE = CE;
  var OE = r(56), IE = r.n(OE), RE = r(594), AE = r.n(RE);
  const ME = Jg("OfferSelectorTool"), LE = "entitlements", NE = "offer", FE = "https://www.stage.adobe.com/special/tacocat/products.js";
  function kE({ appContext: r2, onSelect: n2, rootElement: i3, containerGap: o3 }) {
    IE();
    const s2 = (0, e2.useMemo)(() => function({ accessToken: e3, allProducts: t3, apiKey: r3, aosParams: n3 = {}, checkoutClientId: i4, onCancel: o4, baseUrl: s3, env: a3, environment: l3, landscape: c3, defaultPlaceholderOptions: u3 = hg.defaultPlaceholderOptions, offerSelectorPlaceholderOptions: d3 = hg.defaultPlaceholderOptions, disableOfferSelection: p3 = false, disablePlaceholderSelection: f3 = false, engine: m3, globals: h3 = [], placeholderTypes: g3 = mg, zIndex: y3 = hg.zIndex, promotionCode: v3, storedPromoOverride: b3, searchOfferId: E3, searchOfferSelectorId: _3, searchParameters: T3 = new URLSearchParams(), containerHeight: S3 = 1024 }) {
      return { ...hg, accessToken: e3, aosParams: Object.assign({ ...fg }, n3), allProducts: t3, apiKey: r3, checkoutClientId: i4, onCancel: o4, baseUrl: s3, env: a3, environment: l3, landscape: c3, defaultPlaceholderOptions: { ...hg.defaultPlaceholderOptions, ...u3 }, offerSelectorPlaceholderOptions: { ...hg.defaultPlaceholderOptions, ...u3, ...d3 }, disableOfferSelection: p3, disablePlaceholderSelection: f3, promotionCode: v3, storedPromoOverride: b3, engine: m3, globals: h3, placeholderTypes: g3, zIndex: y3, searchOfferId: p3 ? void 0 : E3, searchOfferSelectorId: p3 ? void 0 : _3, sendSearch: !(!E3 && !_3), searchParameters: T3, containerHeight: S3 };
    }(r2), []), [a2, l2] = (0, e2.useState)(s2.aosParams), [c2, u2] = (0, e2.useState)(s2.globals), [d2, p2] = (0, e2.useState)(), [f2, m2] = (0, e2.useState)(s2.searchOfferId), [h2, g2] = (0, e2.useState)(s2.searchOfferSelectorId), [y2, v2] = (0, e2.useState)(s2.sendSearch), [b2, E2] = (0, e2.useState)(s2.searchOfferId ?? s2.searchOfferSelectorId ?? ""), [_2, T2] = (0, e2.useState)(LE), [S2, P2] = (0, e2.useState)(s2.allProducts), [w2, C2] = (0, e2.useState)([]), [x2, O2] = (0, e2.useState)(i3.offsetHeight), I2 = (0, e2.useMemo)(() => AE()(() => {
      O2(i3.offsetHeight - o3);
    }, 250), []);
    (0, e2.useEffect)(() => (window.addEventListener("resize", I2), I2(), () => window.removeEventListener("resize", I2)), [I2]), (0, e2.useEffect)(() => new Promise((e3, t3) => {
      if (window?.tacocat?.products) return void e3(Object.entries(window.tacocat.products));
      let r3 = document.querySelector(`head > script[src="${FE}"]`);
      if (!r3) {
        const { head: e4 } = document;
        r3 = document.createElement("script"), r3.setAttribute("src", FE), r3.setAttribute("type", "text/javascript"), e4.append(r3);
      }
      const n3 = (i4) => {
        r3.removeEventListener("load", n3), r3.removeEventListener("error", n3), "error" === i4.type ? t3(new Error(`error loading script: ${r3.src}`)) : "load" === i4.type && e3(Object.entries(window.tacocat.products));
      };
      r3.addEventListener("load", n3), r3.addEventListener("error", (e4) => {
        t3(new Error(`error loading script: ${r3.src}`));
      });
    }).then(P2), [P2]), (0, e2.useEffect)(() => {
      l2({ ...a2, arrangementCode: "" });
    }, [b2]), (0, e2.useEffect)(() => {
      if (!a2.arrangementCode) return void p2();
      const e3 = w2.find(({ code: e4 }) => e4 === a2.arrangementCode);
      if (!e3) return ME.warn("No product found with code", a2.arrangementCode), void p2();
      d2?.code !== e3.code && p2(e3);
    }, [a2, d2, w2]);
    const R2 = (e3) => {
      e3 === LE && (p2(), l2({ ...a2, pricePoint: "" })), T2(e3);
    }, A2 = (0, e2.useCallback)((e3) => {
      (d2 || e3 !== NE) && R2(e3);
    }, [d2]), M2 = (0, e2.useMemo)(() => w2 ? t2().createElement(oy, { nextStep: () => R2(NE) }) : null, [d2, a2, w2]), L2 = (0, e2.useMemo)(() => void 0 === d2 ? t2().createElement(Ee, null) : t2().createElement(xE, { previousStep: () => R2(LE), onSelect: n2, ctaTextOption: r2.ctaTextOption }), [d2, a2]);
    return t2().createElement(gg.Provider, { value: { ...s2, allProducts: S2, filteredProducts: w2, setFilteredProducts: C2, aosParams: a2, setAosParams: l2, selectedProduct: d2, searchOfferId: f2, setSearchOfferId: m2, searchOfferSelectorId: h2, setSearchOfferSelectorId: g2, searchText: b2, setSearchText: E2, sendSearch: y2, setSendSearch: v2, globals: c2, setGlobals: u2, containerHeight: x2 } }, t2().createElement(Ee, { height: "100%" }, t2().createElement(om, { "aria-label": "Offer Selector Tool", height: "100%", onSelectionChange: A2, selectedKey: _2 }, t2().createElement(mo, { justifyContent: "center" }, t2().createElement(Ee, { paddingTop: "static-size-125" }, t2().createElement(tm, null, t2().createElement(Vf, { key: LE }, "Select your product and entitlements"), t2().createElement(Vf, { key: NE }, "Select your offer")))), t2().createElement(Ee, { backgroundColor: "gray-100", height: "100%" }, t2().createElement(rm, { height: "100%" }, t2().createElement(Vf, { key: LE }, M2), t2().createElement(Vf, { key: NE }, L2))))));
  }
  kE.propTypes = { appContext: o2().any.isRequired, onSelect: o2().func.isRequired, rootElement: o2().any.isRequired, containerGap: o2().number }, kE.defaultProps = { appContext: {}, onSelect: () => {
  }, containerGap: 0 };
  const DE = kE, UE = e2.createContext(null);
  function jE(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  r(4912);
  var BE, KE, zE, WE, VE, HE, GE, qE, $E, YE, XE, QE, ZE, JE, e_, t_, r_, n_ = {};
  function i_(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  function o_(t3, r2) {
    let { children: n2, state: i3, ...o3 } = t3, s2 = de(r2), a2 = (0, e2.useRef)(null);
    return e2.createElement(ed, { ...o3, isOpen: i3.isOpen, nodeRef: a2 }, e2.createElement(a_, { ...t3, wrapperRef: a2, ref: s2 }, n2));
  }
  jE(n_, "focus-ring", () => BE, (e3) => BE = e3), jE(n_, "i18nFontFamily", () => KE, (e3) => KE = e3), jE(n_, "spectrum-overlay--open", () => zE, (e3) => zE = e3), jE(n_, "is-open", () => WE, (e3) => WE = e3), jE(n_, "spectrum-FocusRing-ring", () => VE, (e3) => VE = e3), jE(n_, "spectrum-FocusRing", () => HE, (e3) => HE = e3), jE(n_, "spectrum-FocusRing--quiet", () => GE, (e3) => GE = e3), jE(n_, "spectrum-overlay", () => qE, (e3) => qE = e3), jE(n_, "spectrum-Modal", () => $E, (e3) => $E = e3), jE(n_, "spectrum-Modal--fullscreen", () => YE, (e3) => YE = e3), jE(n_, "spectrum-Modal--fullscreenTakeover", () => XE, (e3) => XE = e3), jE(n_, "spectrum-Modal--responsive", () => QE, (e3) => QE = e3), jE(n_, "spectrum-Modal-wrapper", () => ZE, (e3) => ZE = e3), jE(n_, "spectrum-overlay--bottom--open", () => JE, (e3) => JE = e3), jE(n_, "spectrum-overlay--left--open", () => e_, (e3) => e_ = e3), jE(n_, "spectrum-overlay--right--open", () => t_, (e3) => t_ = e3), jE(n_, "spectrum-overlay--top--open", () => r_, (e3) => r_ = e3), BE = "_0YML2q_focus-ring", KE = "_0YML2q_i18nFontFamily", WE = "_0YML2q_is-open " + (zE = "_0YML2q_spectrum-overlay--open"), HE = "_0YML2q_spectrum-FocusRing " + (VE = "_0YML2q_spectrum-FocusRing-ring"), GE = "_0YML2q_spectrum-FocusRing--quiet", $E = "_0YML2q_spectrum-Modal " + (qE = "_0YML2q_spectrum-overlay"), YE = "_0YML2q_spectrum-Modal--fullscreen", XE = "_0YML2q_spectrum-Modal--fullscreenTakeover", QE = "_0YML2q_spectrum-Modal--responsive", ZE = "_0YML2q_spectrum-Modal-wrapper", JE = "_0YML2q_spectrum-overlay--bottom--open", e_ = "_0YML2q_spectrum-overlay--left--open", t_ = "_0YML2q_spectrum-overlay--right--open", r_ = "_0YML2q_spectrum-overlay--top--open";
  let s_ = { fullscreen: "fullscreen", fullscreenTakeover: "fullscreenTakeover" }, a_ = (0, e2.forwardRef)(function(t3, r2) {
    let { type: n2, children: i3, state: o3, isOpen: s2, wrapperRef: a2 } = t3, l2 = s_[n2], { styleProps: c2 } = se(t3), { modalProps: u2, underlayProps: d2 } = lp(t3, o3, r2), p2 = Xe(i_(n_), "spectrum-Modal-wrapper", Xe(i_(dd), "spectrum-Modal-wrapper", "react-spectrum-Modal-wrapper")), f2 = Xe(i_(n_), "spectrum-Modal", { "is-open": s2 }, Xe(i_(dd), "spectrum-Modal", "react-spectrum-Modal"), { [`spectrum-Modal--${l2}`]: l2 }, c2.className), m2 = { "--spectrum-visual-viewport-height": pp().height + "px" };
    return e2.createElement("div", { ref: a2 }, e2.createElement(Hd, { ...d2, isOpen: s2 }), e2.createElement("div", { className: p2, style: m2 }, e2.createElement("div", { ...c2, ...u2, ref: r2, className: f2, "data-testid": "modal" }, i3)));
  }), l_ = (0, e2.forwardRef)(o_);
  function c_(t3) {
    let { children: r2, type: n2 = "modal", onDismiss: i3, isDismissable: o3, isKeyboardDismissDisabled: s2 } = t3;
    if (e2.Children.toArray(r2).length > 1) throw new Error("Only a single child can be passed to DialogContainer.");
    let a2, [l2, c2] = (0, e2.useState)(null);
    Array.isArray(r2) ? a2 = r2.find(e2.isValidElement) : e2.isValidElement(r2) && (a2 = r2), a2 && a2 !== l2 && c2(a2);
    let u2 = { type: n2, onClose: i3, isDismissable: o3 }, d2 = xf({ isOpen: !!a2, onOpenChange: (e3) => {
      e3 || i3();
    } });
    return e2.createElement(l_, { state: d2, type: n2, isDismissable: o3, isKeyboardDismissDisabled: s2 }, e2.createElement(UE.Provider, { value: u2 }, l2));
  }
  var u_;
  function d_(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  u_ = { "ar-AE": { alert: "\u062A\u0646\u0628\u064A\u0647", dismiss: "\u062A\u062C\u0627\u0647\u0644" }, "bg-BG": { alert: "\u0421\u0438\u0433\u043D\u0430\u043B", dismiss: "\u041E\u0442\u0445\u0432\u044A\u0440\u043B\u044F\u043D\u0435" }, "cs-CZ": { alert: "V\xFDstraha", dismiss: "Odstranit" }, "da-DK": { alert: "Advarsel", dismiss: "Luk" }, "de-DE": { alert: "Warnhinweis", dismiss: "Schlie\xDFen" }, "el-GR": { alert: "\u0395\u03B9\u03B4\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7", dismiss: "\u0391\u03C0\u03CC\u03C1\u03C1\u03B9\u03C8\u03B7" }, "en-US": { dismiss: "Dismiss", alert: "Alert" }, "es-ES": { alert: "Alerta", dismiss: "Descartar" }, "et-EE": { alert: "Teade", dismiss: "L\xF5peta" }, "fi-FI": { alert: "H\xE4lytys", dismiss: "Hylk\xE4\xE4" }, "fr-FR": { alert: "Alerte", dismiss: "Rejeter" }, "he-IL": { alert: "\u05D4\u05EA\u05E8\u05D0\u05D4", dismiss: "\u05D4\u05EA\u05E2\u05DC\u05DD" }, "hr-HR": { alert: "Upozorenje", dismiss: "Odbaci" }, "hu-HU": { alert: "Figyelmeztet\xE9s", dismiss: "Elutas\xEDt\xE1s" }, "it-IT": { alert: "Avviso", dismiss: "Ignora" }, "ja-JP": { alert: "\u30A2\u30E9\u30FC\u30C8", dismiss: "\u9589\u3058\u308B" }, "ko-KR": { alert: "\uACBD\uACE0", dismiss: "\uBB34\uC2DC" }, "lt-LT": { alert: "\u012Esp\u0117jimas", dismiss: "Atmesti" }, "lv-LV": { alert: "Br\u012Bdin\u0101jums", dismiss: "Ner\u0101d\u012Bt" }, "nb-NO": { alert: "Varsel", dismiss: "Lukk" }, "nl-NL": { alert: "Melding", dismiss: "Negeren" }, "pl-PL": { alert: "Ostrze\u017Cenie", dismiss: "Zignoruj" }, "pt-BR": { alert: "Alerta", dismiss: "Descartar" }, "pt-PT": { alert: "Alerta", dismiss: "Dispensar" }, "ro-RO": { alert: "Alert\u0103", dismiss: "Revocare" }, "ru-RU": { alert: "\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435", dismiss: "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C" }, "sk-SK": { alert: "Upozornenie", dismiss: "Zru\u0161i\u0165" }, "sl-SI": { alert: "Opozorilo", dismiss: "Opusti" }, "sr-SP": { alert: "Upozorenje", dismiss: "Odbaci" }, "sv-SE": { alert: "Varning", dismiss: "Avvisa" }, "tr-TR": { alert: "Uyar\u0131", dismiss: "Kapat" }, "uk-UA": { alert: "\u0421\u0438\u0433\u043D\u0430\u043B \u0442\u0440\u0438\u0432\u043E\u0433\u0438", dismiss: "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438" }, "zh-CN": { alert: "\u8B66\u62A5", dismiss: "\u53D6\u6D88" }, "zh-TW": { alert: "\u8B66\u793A", dismiss: "\u95DC\u9589" } }, r(5944);
  var p_, f_, m_, h_, g_, y_, v_, b_, E_, __, T_, S_, P_, w_, C_, x_, O_, I_, R_, A_, M_, L_, N_, F_, k_, D_, U_, j_, B_, K_, z_, W_, V_, H_, G_, q_, $_, Y_, X_, Q_, Z_, J_, eT, tT, rT, nT, iT, oT, sT, aT, lT, cT = {};
  d_(cT, "buttonGroup", () => p_, (e3) => p_ = e3), d_(cT, "buttonGroup-end", () => f_, (e3) => f_ = e3), d_(cT, "closeButton", () => m_, (e3) => m_ = e3), d_(cT, "content", () => h_, (e3) => h_ = e3), d_(cT, "divider", () => g_, (e3) => g_ = e3), d_(cT, "focus-ring", () => y_, (e3) => y_ = e3), d_(cT, "footer", () => v_, (e3) => v_ = e3), d_(cT, "footer-start", () => b_, (e3) => b_ = e3), d_(cT, "header", () => E_, (e3) => E_ = e3), d_(cT, "header-end", () => __, (e3) => __ = e3), d_(cT, "header-start", () => T_, (e3) => T_ = e3), d_(cT, "heading", () => S_, (e3) => S_ = e3), d_(cT, "heading-start", () => P_, (e3) => P_ = e3), d_(cT, "hero", () => w_, (e3) => w_ = e3), d_(cT, "i18nFontFamily", () => C_, (e3) => C_ = e3), d_(cT, "spectrum-Button", () => x_, (e3) => x_ = e3), d_(cT, "spectrum-Dialog", () => O_, (e3) => O_ = e3), d_(cT, "spectrum-Dialog--dismissable", () => I_, (e3) => I_ = e3), d_(cT, "spectrum-Dialog--error", () => R_, (e3) => R_ = e3), d_(cT, "spectrum-Dialog--fullscreen", () => A_, (e3) => A_ = e3), d_(cT, "spectrum-Dialog--fullscreenTakeover", () => M_, (e3) => M_ = e3), d_(cT, "spectrum-Dialog--large", () => L_, (e3) => L_ = e3), d_(cT, "spectrum-Dialog--medium", () => N_, (e3) => N_ = e3), d_(cT, "spectrum-Dialog--noDivider", () => F_, (e3) => F_ = e3), d_(cT, "spectrum-Dialog--small", () => k_, (e3) => k_ = e3), d_(cT, "spectrum-Dialog--warning", () => D_, (e3) => D_ = e3), d_(cT, "spectrum-Dialog-buttonGroup", () => U_, (e3) => U_ = e3), d_(cT, "spectrum-Dialog-buttonGroup--noFooter", () => j_, (e3) => j_ = e3), d_(cT, "spectrum-Dialog-closeButton", () => B_, (e3) => B_ = e3), d_(cT, "spectrum-Dialog-content", () => K_, (e3) => K_ = e3), d_(cT, "spectrum-Dialog-divider", () => z_, (e3) => z_ = e3), d_(cT, "spectrum-Dialog-footer", () => W_, (e3) => W_ = e3), d_(cT, "spectrum-Dialog-grid", () => V_, (e3) => V_ = e3), d_(cT, "spectrum-Dialog-header", () => H_, (e3) => H_ = e3), d_(cT, "spectrum-Dialog-header--noTypeIcon", () => G_, (e3) => G_ = e3), d_(cT, "spectrum-Dialog-heading", () => q_, (e3) => q_ = e3), d_(cT, "spectrum-Dialog-heading--noHeader", () => $_, (e3) => $_ = e3), d_(cT, "spectrum-Dialog-heading--noTypeIcon", () => Y_, (e3) => Y_ = e3), d_(cT, "spectrum-Dialog-hero", () => X_, (e3) => X_ = e3), d_(cT, "spectrum-Dialog-typeIcon", () => Q_, (e3) => Q_ = e3), d_(cT, "spectrum-FocusRing-ring", () => Z_, (e3) => Z_ = e3), d_(cT, "spectrum-FocusRing", () => J_, (e3) => J_ = e3), d_(cT, "spectrum-FocusRing--quiet", () => eT, (e3) => eT = e3), d_(cT, "spectrum-overlay", () => tT, (e3) => tT = e3), d_(cT, "spectrum-overlay--bottom--open", () => rT, (e3) => rT = e3), d_(cT, "spectrum-overlay--left--open", () => nT, (e3) => nT = e3), d_(cT, "spectrum-overlay--open", () => iT, (e3) => iT = e3), d_(cT, "spectrum-overlay--right--open", () => oT, (e3) => oT = e3), d_(cT, "spectrum-overlay--top--open", () => sT, (e3) => sT = e3), d_(cT, "typeIcon", () => aT, (e3) => aT = e3), d_(cT, "typeIcon-end", () => lT, (e3) => lT = e3), p_ = "h_OVWW_buttonGroup", f_ = "h_OVWW_buttonGroup-end", m_ = "h_OVWW_closeButton", h_ = "h_OVWW_content", g_ = "h_OVWW_divider", y_ = "h_OVWW_focus-ring", v_ = "h_OVWW_footer", b_ = "h_OVWW_footer-start", E_ = "h_OVWW_header", __ = "h_OVWW_header-end", T_ = "h_OVWW_header-start", S_ = "h_OVWW_heading", P_ = "h_OVWW_heading-start", w_ = "h_OVWW_hero", C_ = "h_OVWW_i18nFontFamily", x_ = "h_OVWW_spectrum-Button", O_ = "h_OVWW_spectrum-Dialog", I_ = "h_OVWW_spectrum-Dialog--dismissable", R_ = "h_OVWW_spectrum-Dialog--error", A_ = "h_OVWW_spectrum-Dialog--fullscreen", M_ = "h_OVWW_spectrum-Dialog--fullscreenTakeover", L_ = "h_OVWW_spectrum-Dialog--large", N_ = "h_OVWW_spectrum-Dialog--medium", F_ = "h_OVWW_spectrum-Dialog--noDivider", k_ = "h_OVWW_spectrum-Dialog--small", D_ = "h_OVWW_spectrum-Dialog--warning", U_ = "h_OVWW_spectrum-Dialog-buttonGroup", j_ = "h_OVWW_spectrum-Dialog-buttonGroup--noFooter", B_ = "h_OVWW_spectrum-Dialog-closeButton", K_ = "h_OVWW_spectrum-Dialog-content", z_ = "h_OVWW_spectrum-Dialog-divider", W_ = "h_OVWW_spectrum-Dialog-footer", V_ = "h_OVWW_spectrum-Dialog-grid", H_ = "h_OVWW_spectrum-Dialog-header", G_ = "h_OVWW_spectrum-Dialog-header--noTypeIcon", q_ = "h_OVWW_spectrum-Dialog-heading", $_ = "h_OVWW_spectrum-Dialog-heading--noHeader", Y_ = "h_OVWW_spectrum-Dialog-heading--noTypeIcon", X_ = "h_OVWW_spectrum-Dialog-hero", Q_ = "h_OVWW_spectrum-Dialog-typeIcon", J_ = "h_OVWW_spectrum-FocusRing " + (Z_ = "h_OVWW_spectrum-FocusRing-ring"), eT = "h_OVWW_spectrum-FocusRing--quiet", tT = "h_OVWW_spectrum-overlay", rT = "h_OVWW_spectrum-overlay--bottom--open", nT = "h_OVWW_spectrum-overlay--left--open", iT = "h_OVWW_spectrum-overlay--open", oT = "h_OVWW_spectrum-overlay--right--open", sT = "h_OVWW_spectrum-overlay--top--open", aT = "h_OVWW_typeIcon", lT = "h_OVWW_typeIcon-end";
  var uT = r(4509);
  function dT(t3) {
    return e2.createElement(Gn, t3, e2.createElement(uT.U, null));
  }
  function pT(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  let fT = { S: "small", M: "medium", L: "large", fullscreen: "fullscreen", fullscreenTakeover: "fullscreenTakeover" };
  function mT(t3, r2) {
    t3 = O(t3, "dialog");
    let { type: n2 = "modal", ...i3 } = (0, e2.useContext)(UE) || {}, { children: o3, isDismissable: s2 = i3.isDismissable, onDismiss: a2 = i3.onClose, size: l2, ...c2 } = t3, u2 = to(pT(u_), "@react-spectrum/dialog"), { styleProps: d2 } = se(c2);
    l2 = "popover" === n2 ? l2 || "S" : l2 || "L";
    let p2 = de(r2), f2 = (0, e2.useRef)(null), m2 = fT[n2] || fT[l2], { dialogProps: h2, titleProps: g2 } = function(t4, r3) {
      let { role: n3 = "dialog" } = t4, i4 = S();
      i4 = t4["aria-label"] ? void 0 : i4;
      let o4 = (0, e2.useRef)(false);
      return (0, e2.useEffect)(() => {
        if (r3.current && !r3.current.contains(document.activeElement)) {
          us(r3.current);
          let e3 = setTimeout(() => {
            document.activeElement === r3.current && (o4.current = true, r3.current && (r3.current.blur(), us(r3.current)), o4.current = false);
          }, 500);
          return () => {
            clearTimeout(e3);
          };
        }
      }, [r3]), Zu(), { dialogProps: { ...ve(t4, { labelable: true }), role: n3, tabIndex: -1, "aria-labelledby": t4["aria-labelledby"] || i4, onBlur: (e3) => {
        o4.current && e3.stopPropagation();
      } }, titleProps: { id: i4 } };
    }(C(i3, t3), p2), y2 = $h(`.${pT(cT)["spectrum-Dialog-header"]}`, fe(f2)), v2 = $h(`.${pT(cT)["spectrum-Dialog-heading"]}`, fe(f2)), b2 = $h(`.${pT(cT)["spectrum-Dialog-footer"]}`, fe(f2)), E2 = $h(`.${pT(cT)["spectrum-Dialog-typeIcon"]}`, fe(f2)), _2 = (0, e2.useMemo)(() => ({ hero: { UNSAFE_className: pT(cT)["spectrum-Dialog-hero"] }, heading: { UNSAFE_className: Xe(pT(cT), "spectrum-Dialog-heading", { "spectrum-Dialog-heading--noHeader": !y2, "spectrum-Dialog-heading--noTypeIcon": !E2 }), level: 2, ...g2 }, header: { UNSAFE_className: Xe(pT(cT), "spectrum-Dialog-header", { "spectrum-Dialog-header--noHeading": !v2, "spectrum-Dialog-header--noTypeIcon": !E2 }) }, typeIcon: { UNSAFE_className: pT(cT)["spectrum-Dialog-typeIcon"] }, divider: { UNSAFE_className: pT(cT)["spectrum-Dialog-divider"], size: "M" }, content: { UNSAFE_className: pT(cT)["spectrum-Dialog-content"] }, footer: { UNSAFE_className: pT(cT)["spectrum-Dialog-footer"] }, buttonGroup: { UNSAFE_className: Xe(pT(cT), "spectrum-Dialog-buttonGroup", { "spectrum-Dialog-buttonGroup--noFooter": !b2 }), align: "end" } }), [b2, y2, g2]);
    return e2.createElement("section", { ...d2, ...h2, className: Xe(pT(cT), "spectrum-Dialog", { [`spectrum-Dialog--${m2}`]: m2, "spectrum-Dialog--dismissable": s2 }, d2.className), ref: p2 }, e2.createElement(Rl, { ref: f2, UNSAFE_className: pT(cT)["spectrum-Dialog-grid"] }, e2.createElement(I, { slots: _2 }, o3), s2 && e2.createElement(hE, { UNSAFE_className: pT(cT)["spectrum-Dialog-closeButton"], isQuiet: true, "aria-label": u2.format("dismiss"), onPress: a2 }, e2.createElement(dT, null))));
  }
  let hT = e2.forwardRef(mT);
  function gT(t3, r2) {
    t3 = O(t3, "content");
    let { children: n2, ...i3 } = t3, { styleProps: o3 } = se(i3), s2 = de(r2);
    return e2.createElement("section", { ...ve(i3), ...o3, ref: s2 }, e2.createElement(R, null, n2));
  }
  const yT = (0, e2.forwardRef)(gT);
  r(3820);
  var vT, bT = {};
  function ET(e3, t3, r2, n2) {
    Object.defineProperty(e3, t3, { get: r2, set: n2, enumerable: true, configurable: true });
  }
  !function(e3, t3, r2, n2) {
    Object.defineProperty(e3, "spectrum--darkest", { get: () => vT, set: (e4) => vT = e4, enumerable: true, configurable: true });
  }(bT), vT = "gP7gvq_spectrum--darkest", r(4599);
  var _T, TT, ST, PT, wT, CT, xT, OT = {};
  ET(OT, "spectrum", () => _T, (e3) => _T = e3), ET(OT, "spectrum--dark", () => TT, (e3) => TT = e3), ET(OT, "spectrum--darkest", () => ST, (e3) => ST = e3), ET(OT, "spectrum--large", () => PT, (e3) => PT = e3), ET(OT, "spectrum--light", () => wT, (e3) => wT = e3), ET(OT, "spectrum--lightest", () => CT, (e3) => CT = e3), ET(OT, "spectrum--medium", () => xT, (e3) => xT = e3), _T = "zA6MfG_spectrum", TT = "zA6MfG_spectrum--dark", ST = "zA6MfG_spectrum--darkest", PT = "zA6MfG_spectrum--large", wT = "zA6MfG_spectrum--light", CT = "zA6MfG_spectrum--lightest", xT = "zA6MfG_spectrum--medium", r(3713);
  var IT, RT = {};
  !function(e3, t3, r2, n2) {
    Object.defineProperty(e3, "spectrum--large", { get: () => IT, set: (e4) => IT = e4, enumerable: true, configurable: true });
  }(RT), IT = "HAZavG_spectrum--large", r(3708);
  var AT, MT = {};
  !function(e3, t3, r2, n2) {
    Object.defineProperty(e3, "spectrum--light", { get: () => AT, set: (e4) => AT = e4, enumerable: true, configurable: true });
  }(MT), AT = "PFjRbG_spectrum--light", r(3173);
  var LT, NT = {};
  function FT(e3) {
    return e3 && e3.__esModule ? e3.default : e3;
  }
  !function(e3, t3, r2, n2) {
    Object.defineProperty(e3, "spectrum--medium", { get: () => LT, set: (e4) => LT = e4, enumerable: true, configurable: true });
  }(NT), LT = "xSyFOq_spectrum--medium";
  let kT = { global: FT(OT), light: FT(MT), dark: FT(bT), medium: FT(NT), large: FT(RT) };
  var DT = function() {
    return DT = Object.assign || function(e3) {
      for (var t3, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var i3 in t3 = arguments[r2]) Object.prototype.hasOwnProperty.call(t3, i3) && (e3[i3] = t3[i3]);
      return e3;
    }, DT.apply(this, arguments);
  }, UT = function(e3) {
    return t2().createElement(Rg.Provider, DT({}, e3));
  };
  const jT = Jg("OfferSelectorTool");
  function BT(r2, n2, i3) {
    const o3 = () => {
      kn().unmountComponentAtNode(r2);
    };
    function s2() {
      (0, e2.useEffect)(() => {
        const e3 = r2.firstElementChild, t3 = document.createElement("style");
        document.head.appendChild(t3);
        const [n3] = e3.className.split(" ", 1);
        return n3 && (t3.textContent = `.${e3.className.split(" ", 1)[0]} {position: relative;z-index: ${i3.zIndex};}`), () => {
          document.head.removeChild(t3);
        };
      }, []);
      const s3 = { getAccessToken: () => i3.accessToken }, [a2, l2] = (0, e2.useState)(null), c2 = (0, e2.useCallback)((e3) => {
        e3 && l2(e3.UNSAFE_getDOMNode());
      }, []);
      return t2().createElement(zn, { theme: kT, colorScheme: "light", scale: "medium", width: "100%", height: "100%" }, t2().createElement(Dg, { value: i3.environment }, t2().createElement(UT, { value: s3 }, t2().createElement(Kg, null, t2().createElement(c_, { onDismiss: o3, type: "modal" }, t2().createElement(hT, { minWidth: "1100px", minHeight: "640px", height: "80vh", width: "80vh", ref: c2 }, t2().createElement(yT, null, a2 && t2().createElement(DE, { appContext: i3, rootElement: a2, onSelect: n2, onCancel: o3, containerGap: 20 }))))))));
    }
    return i3.onCancel || (i3.onCancel = () => {
      jT.debug("Clicked on cancel"), o3 && o3();
    }), kn().render(t2().createElement(s2, null), r2), o3;
  }
})();
var i = n.M;
var o = n.c;
export {
  o as openAsDialog
};
/*! Bundled license information:

@dexter/offer-selector-tool/lib/module.js:
  (*! For license information please see module.js.LICENSE.txt *)
*/
//# sourceMappingURL=ost.js.map

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (t) {
  var e = (typeof self === "undefined" ? "undefined" : _typeof(self)) == "object" && self.self === self && self || (typeof global === "undefined" ? "undefined" : _typeof(global)) == "object" && global.global === global && global;

  if (typeof define === "function" && define.amd) {
    define(["underscore", "jquery", "exports"], function (i, r, n) {
      e.Backbone = t(e, n, i, r);
    });
  } else if (typeof exports !== "undefined") {
    var i = require("underscore"),
        r;

    try {
      r = require("jquery");
    } catch (n) {}

    t(e, exports, i, r);
  } else {
    e.Backbone = t(e, {}, e._, e.jQuery || e.Zepto || e.ender || e.$);
  }
})(function (t, e, i, r) {
  var n = t.Backbone;
  var s = Array.prototype.slice;
  e.VERSION = "1.3.3";
  e.$ = r;

  e.noConflict = function () {
    t.Backbone = n;
    return this;
  };

  e.emulateHTTP = false;
  e.emulateJSON = false;

  var a = function a(t, e, r) {
    switch (t) {
      case 1:
        return function () {
          return i[e](this[r]);
        };

      case 2:
        return function (t) {
          return i[e](this[r], t);
        };

      case 3:
        return function (t, n) {
          return i[e](this[r], o(t, this), n);
        };

      case 4:
        return function (t, n, s) {
          return i[e](this[r], o(t, this), n, s);
        };

      default:
        return function () {
          var t = s.call(arguments);
          t.unshift(this[r]);
          return i[e].apply(i, t);
        };
    }
  };

  var h = function h(t, e, r) {
    i.each(e, function (e, n) {
      if (i[n]) t.prototype[n] = a(e, n, r);
    });
  };

  var o = function o(t, e) {
    if (i.isFunction(t)) return t;
    if (i.isObject(t) && !e._isModel(t)) return l(t);
    if (i.isString(t)) return function (e) {
      return e.get(t);
    };
    return t;
  };

  var l = function l(t) {
    var e = i.matches(t);
    return function (t) {
      return e(t.attributes);
    };
  };

  var u = e.Events = {};
  var c = /\s+/;

  var f = function f(t, e, r, n, s) {
    var a = 0,
        h;

    if (r && _typeof(r) === "object") {
      if (n !== void 0 && "context" in s && s.context === void 0) s.context = n;

      for (h = i.keys(r); a < h.length; a++) {
        e = f(t, e, h[a], r[h[a]], s);
      }
    } else if (r && c.test(r)) {
      for (h = r.split(c); a < h.length; a++) {
        e = t(e, h[a], n, s);
      }
    } else {
      e = t(e, r, n, s);
    }

    return e;
  };

  u.on = function (t, e, i) {
    return d(this, t, e, i);
  };

  var d = function d(t, e, i, r, n) {
    t._events = f(v, t._events || {}, e, i, {
      context: r,
      ctx: t,
      listening: n
    });

    if (n) {
      var s = t._listeners || (t._listeners = {});
      s[n.id] = n;
    }

    return t;
  };

  u.listenTo = function (t, e, r) {
    if (!t) return this;
    var n = t._listenId || (t._listenId = i.uniqueId("l"));
    var s = this._listeningTo || (this._listeningTo = {});
    var a = s[n];

    if (!a) {
      var h = this._listenId || (this._listenId = i.uniqueId("l"));
      a = s[n] = {
        obj: t,
        objId: n,
        id: h,
        listeningTo: s,
        count: 0
      };
    }

    d(t, e, r, this, a);
    return this;
  };

  var v = function v(t, e, i, r) {
    if (i) {
      var n = t[e] || (t[e] = []);
      var s = r.context,
          a = r.ctx,
          h = r.listening;
      if (h) h.count++;
      n.push({
        callback: i,
        context: s,
        ctx: s || a,
        listening: h
      });
    }

    return t;
  };

  u.off = function (t, e, i) {
    if (!this._events) return this;
    this._events = f(g, this._events, t, e, {
      context: i,
      listeners: this._listeners
    });
    return this;
  };

  u.stopListening = function (t, e, r) {
    var n = this._listeningTo;
    if (!n) return this;
    var s = t ? [t._listenId] : i.keys(n);

    for (var a = 0; a < s.length; a++) {
      var h = n[s[a]];
      if (!h) break;
      h.obj.off(e, r, this);
    }

    return this;
  };

  var g = function g(t, e, r, n) {
    if (!t) return;
    var s = 0,
        a;
    var h = n.context,
        o = n.listeners;

    if (!e && !r && !h) {
      var l = i.keys(o);

      for (; s < l.length; s++) {
        a = o[l[s]];
        delete o[a.id];
        delete a.listeningTo[a.objId];
      }

      return;
    }

    var u = e ? [e] : i.keys(t);

    for (; s < u.length; s++) {
      e = u[s];
      var c = t[e];
      if (!c) break;
      var f = [];

      for (var d = 0; d < c.length; d++) {
        var v = c[d];

        if (r && r !== v.callback && r !== v.callback._callback || h && h !== v.context) {
          f.push(v);
        } else {
          a = v.listening;

          if (a && --a.count === 0) {
            delete o[a.id];
            delete a.listeningTo[a.objId];
          }
        }
      }

      if (f.length) {
        t[e] = f;
      } else {
        delete t[e];
      }
    }

    return t;
  };

  u.once = function (t, e, r) {
    var n = f(p, {}, t, e, i.bind(this.off, this));
    if (typeof t === "string" && r == null) e = void 0;
    return this.on(n, e, r);
  };

  u.listenToOnce = function (t, e, r) {
    var n = f(p, {}, e, r, i.bind(this.stopListening, this, t));
    return this.listenTo(t, n);
  };

  var p = function p(t, e, r, n) {
    if (r) {
      var s = t[e] = i.once(function () {
        n(e, s);
        r.apply(this, arguments);
      });
      s._callback = r;
    }

    return t;
  };

  u.trigger = function (t) {
    if (!this._events) return this;
    var e = Math.max(0, arguments.length - 1);
    var i = Array(e);

    for (var r = 0; r < e; r++) {
      i[r] = arguments[r + 1];
    }

    f(m, this._events, t, void 0, i);
    return this;
  };

  var m = function m(t, e, i, r) {
    if (t) {
      var n = t[e];
      var s = t.all;
      if (n && s) s = s.slice();
      if (n) _(n, r);
      if (s) _(s, [e].concat(r));
    }

    return t;
  };

  var _ = function _(t, e) {
    var i,
        r = -1,
        n = t.length,
        s = e[0],
        a = e[1],
        h = e[2];

    switch (e.length) {
      case 0:
        while (++r < n) {
          (i = t[r]).callback.call(i.ctx);
        }

        return;

      case 1:
        while (++r < n) {
          (i = t[r]).callback.call(i.ctx, s);
        }

        return;

      case 2:
        while (++r < n) {
          (i = t[r]).callback.call(i.ctx, s, a);
        }

        return;

      case 3:
        while (++r < n) {
          (i = t[r]).callback.call(i.ctx, s, a, h);
        }

        return;

      default:
        while (++r < n) {
          (i = t[r]).callback.apply(i.ctx, e);
        }

        return;
    }
  };

  u.bind = u.on;
  u.unbind = u.off;
  i.extend(e, u);

  var y = e.Model = function (t, e) {
    var r = t || {};
    e || (e = {});
    this.cid = i.uniqueId(this.cidPrefix);
    this.attributes = {};
    if (e.collection) this.collection = e.collection;
    if (e.parse) r = this.parse(r, e) || {};
    var n = i.result(this, "defaults");
    r = i.defaults(i.extend({}, n, r), n);
    this.set(r, e);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  i.extend(y.prototype, u, {
    changed: null,
    validationError: null,
    idAttribute: "id",
    cidPrefix: "c",
    initialize: function initialize() {},
    toJSON: function toJSON(t) {
      return i.clone(this.attributes);
    },
    sync: function sync() {
      return e.sync.apply(this, arguments);
    },
    get: function get(t) {
      return this.attributes[t];
    },
    escape: function escape(t) {
      return i.escape(this.get(t));
    },
    has: function has(t) {
      return this.get(t) != null;
    },
    matches: function matches(t) {
      return !!i.iteratee(t, this)(this.attributes);
    },
    set: function set(t, e, r) {
      if (t == null) return this;
      var n;

      if (_typeof(t) === "object") {
        n = t;
        r = e;
      } else {
        (n = {})[t] = e;
      }

      r || (r = {});
      if (!this._validate(n, r)) return false;
      var s = r.unset;
      var a = r.silent;
      var h = [];
      var o = this._changing;
      this._changing = true;

      if (!o) {
        this._previousAttributes = i.clone(this.attributes);
        this.changed = {};
      }

      var l = this.attributes;
      var u = this.changed;
      var c = this._previousAttributes;

      for (var f in n) {
        e = n[f];
        if (!i.isEqual(l[f], e)) h.push(f);

        if (!i.isEqual(c[f], e)) {
          u[f] = e;
        } else {
          delete u[f];
        }

        s ? delete l[f] : l[f] = e;
      }

      if (this.idAttribute in n) this.id = this.get(this.idAttribute);

      if (!a) {
        if (h.length) this._pending = r;

        for (var d = 0; d < h.length; d++) {
          this.trigger("change:" + h[d], this, l[h[d]], r);
        }
      }

      if (o) return this;

      if (!a) {
        while (this._pending) {
          r = this._pending;
          this._pending = false;
          this.trigger("change", this, r);
        }
      }

      this._pending = false;
      this._changing = false;
      return this;
    },
    unset: function unset(t, e) {
      return this.set(t, void 0, i.extend({}, e, {
        unset: true
      }));
    },
    clear: function clear(t) {
      var e = {};

      for (var r in this.attributes) {
        e[r] = void 0;
      }

      return this.set(e, i.extend({}, t, {
        unset: true
      }));
    },
    hasChanged: function hasChanged(t) {
      if (t == null) return !i.isEmpty(this.changed);
      return i.has(this.changed, t);
    },
    changedAttributes: function changedAttributes(t) {
      if (!t) return this.hasChanged() ? i.clone(this.changed) : false;
      var e = this._changing ? this._previousAttributes : this.attributes;
      var r = {};

      for (var n in t) {
        var s = t[n];
        if (i.isEqual(e[n], s)) continue;
        r[n] = s;
      }

      return i.size(r) ? r : false;
    },
    previous: function previous(t) {
      if (t == null || !this._previousAttributes) return null;
      return this._previousAttributes[t];
    },
    previousAttributes: function previousAttributes() {
      return i.clone(this._previousAttributes);
    },
    fetch: function fetch(t) {
      t = i.extend({
        parse: true
      }, t);
      var e = this;
      var r = t.success;

      t.success = function (i) {
        var n = t.parse ? e.parse(i, t) : i;
        if (!e.set(n, t)) return false;
        if (r) r.call(t.context, e, i, t);
        e.trigger("sync", e, i, t);
      };

      B(this, t);
      return this.sync("read", this, t);
    },
    save: function save(t, e, r) {
      var n;

      if (t == null || _typeof(t) === "object") {
        n = t;
        r = e;
      } else {
        (n = {})[t] = e;
      }

      r = i.extend({
        validate: true,
        parse: true
      }, r);
      var s = r.wait;

      if (n && !s) {
        if (!this.set(n, r)) return false;
      } else if (!this._validate(n, r)) {
        return false;
      }

      var a = this;
      var h = r.success;
      var o = this.attributes;

      r.success = function (t) {
        a.attributes = o;
        var e = r.parse ? a.parse(t, r) : t;
        if (s) e = i.extend({}, n, e);
        if (e && !a.set(e, r)) return false;
        if (h) h.call(r.context, a, t, r);
        a.trigger("sync", a, t, r);
      };

      B(this, r);
      if (n && s) this.attributes = i.extend({}, o, n);
      var l = this.isNew() ? "create" : r.patch ? "patch" : "update";
      if (l === "patch" && !r.attrs) r.attrs = n;
      var u = this.sync(l, this, r);
      this.attributes = o;
      return u;
    },
    destroy: function destroy(t) {
      t = t ? i.clone(t) : {};
      var e = this;
      var r = t.success;
      var n = t.wait;

      var s = function s() {
        e.stopListening();
        e.trigger("destroy", e, e.collection, t);
      };

      t.success = function (i) {
        if (n) s();
        if (r) r.call(t.context, e, i, t);
        if (!e.isNew()) e.trigger("sync", e, i, t);
      };

      var a = false;

      if (this.isNew()) {
        i.defer(t.success);
      } else {
        B(this, t);
        a = this.sync("delete", this, t);
      }

      if (!n) s();
      return a;
    },
    url: function url() {
      var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || F();
      if (this.isNew()) return t;
      var e = this.get(this.idAttribute);
      return t.replace(/[^\/]$/, "$&/") + encodeURIComponent(e);
    },
    parse: function parse(t, e) {
      return t;
    },
    clone: function clone() {
      return new this.constructor(this.attributes);
    },
    isNew: function isNew() {
      return !this.has(this.idAttribute);
    },
    isValid: function isValid(t) {
      return this._validate({}, i.extend({}, t, {
        validate: true
      }));
    },
    _validate: function _validate(t, e) {
      if (!e.validate || !this.validate) return true;
      t = i.extend({}, this.attributes, t);
      var r = this.validationError = this.validate(t, e) || null;
      if (!r) return true;
      this.trigger("invalid", this, r, i.extend(e, {
        validationError: r
      }));
      return false;
    }
  });
  var b = {
    keys: 1,
    values: 1,
    pairs: 1,
    invert: 1,
    pick: 0,
    omit: 0,
    chain: 1,
    isEmpty: 1
  };
  h(y, b, "attributes");

  var x = e.Collection = function (t, e) {
    e || (e = {});
    if (e.model) this.model = e.model;
    if (e.comparator !== void 0) this.comparator = e.comparator;

    this._reset();

    this.initialize.apply(this, arguments);
    if (t) this.reset(t, i.extend({
      silent: true
    }, e));
  };

  var w = {
    add: true,
    remove: true,
    merge: true
  };
  var E = {
    add: true,
    remove: false
  };

  var I = function I(t, e, i) {
    i = Math.min(Math.max(i, 0), t.length);
    var r = Array(t.length - i);
    var n = e.length;
    var s;

    for (s = 0; s < r.length; s++) {
      r[s] = t[s + i];
    }

    for (s = 0; s < n; s++) {
      t[s + i] = e[s];
    }

    for (s = 0; s < r.length; s++) {
      t[s + n + i] = r[s];
    }
  };

  i.extend(x.prototype, u, {
    model: y,
    initialize: function initialize() {},
    toJSON: function toJSON(t) {
      return this.map(function (e) {
        return e.toJSON(t);
      });
    },
    sync: function sync() {
      return e.sync.apply(this, arguments);
    },
    add: function add(t, e) {
      return this.set(t, i.extend({
        merge: false
      }, e, E));
    },
    remove: function remove(t, e) {
      e = i.extend({}, e);
      var r = !i.isArray(t);
      t = r ? [t] : t.slice();

      var n = this._removeModels(t, e);

      if (!e.silent && n.length) {
        e.changes = {
          added: [],
          merged: [],
          removed: n
        };
        this.trigger("update", this, e);
      }

      return r ? n[0] : n;
    },
    set: function set(t, e) {
      if (t == null) return;
      e = i.extend({}, w, e);

      if (e.parse && !this._isModel(t)) {
        t = this.parse(t, e) || [];
      }

      var r = !i.isArray(t);
      t = r ? [t] : t.slice();
      var n = e.at;
      if (n != null) n = +n;
      if (n > this.length) n = this.length;
      if (n < 0) n += this.length + 1;
      var s = [];
      var a = [];
      var h = [];
      var o = [];
      var l = {};
      var u = e.add;
      var c = e.merge;
      var f = e.remove;
      var d = false;
      var v = this.comparator && n == null && e.sort !== false;
      var g = i.isString(this.comparator) ? this.comparator : null;
      var p, m;

      for (m = 0; m < t.length; m++) {
        p = t[m];

        var _ = this.get(p);

        if (_) {
          if (c && p !== _) {
            var y = this._isModel(p) ? p.attributes : p;
            if (e.parse) y = _.parse(y, e);

            _.set(y, e);

            h.push(_);
            if (v && !d) d = _.hasChanged(g);
          }

          if (!l[_.cid]) {
            l[_.cid] = true;
            s.push(_);
          }

          t[m] = _;
        } else if (u) {
          p = t[m] = this._prepareModel(p, e);

          if (p) {
            a.push(p);

            this._addReference(p, e);

            l[p.cid] = true;
            s.push(p);
          }
        }
      }

      if (f) {
        for (m = 0; m < this.length; m++) {
          p = this.models[m];
          if (!l[p.cid]) o.push(p);
        }

        if (o.length) this._removeModels(o, e);
      }

      var b = false;
      var x = !v && u && f;

      if (s.length && x) {
        b = this.length !== s.length || i.some(this.models, function (t, e) {
          return t !== s[e];
        });
        this.models.length = 0;
        I(this.models, s, 0);
        this.length = this.models.length;
      } else if (a.length) {
        if (v) d = true;
        I(this.models, a, n == null ? this.length : n);
        this.length = this.models.length;
      }

      if (d) this.sort({
        silent: true
      });

      if (!e.silent) {
        for (m = 0; m < a.length; m++) {
          if (n != null) e.index = n + m;
          p = a[m];
          p.trigger("add", p, this, e);
        }

        if (d || b) this.trigger("sort", this, e);

        if (a.length || o.length || h.length) {
          e.changes = {
            added: a,
            removed: o,
            merged: h
          };
          this.trigger("update", this, e);
        }
      }

      return r ? t[0] : t;
    },
    reset: function reset(t, e) {
      e = e ? i.clone(e) : {};

      for (var r = 0; r < this.models.length; r++) {
        this._removeReference(this.models[r], e);
      }

      e.previousModels = this.models;

      this._reset();

      t = this.add(t, i.extend({
        silent: true
      }, e));
      if (!e.silent) this.trigger("reset", this, e);
      return t;
    },
    push: function push(t, e) {
      return this.add(t, i.extend({
        at: this.length
      }, e));
    },
    pop: function pop(t) {
      var e = this.at(this.length - 1);
      return this.remove(e, t);
    },
    unshift: function unshift(t, e) {
      return this.add(t, i.extend({
        at: 0
      }, e));
    },
    shift: function shift(t) {
      var e = this.at(0);
      return this.remove(e, t);
    },
    slice: function slice() {
      return s.apply(this.models, arguments);
    },
    get: function get(t) {
      if (t == null) return void 0;
      return this._byId[t] || this._byId[this.modelId(t.attributes || t)] || t.cid && this._byId[t.cid];
    },
    has: function has(t) {
      return this.get(t) != null;
    },
    at: function at(t) {
      if (t < 0) t += this.length;
      return this.models[t];
    },
    where: function where(t, e) {
      return this[e ? "find" : "filter"](t);
    },
    findWhere: function findWhere(t) {
      return this.where(t, true);
    },
    sort: function sort(t) {
      var e = this.comparator;
      if (!e) throw new Error("Cannot sort a set without a comparator");
      t || (t = {});
      var r = e.length;
      if (i.isFunction(e)) e = i.bind(e, this);

      if (r === 1 || i.isString(e)) {
        this.models = this.sortBy(e);
      } else {
        this.models.sort(e);
      }

      if (!t.silent) this.trigger("sort", this, t);
      return this;
    },
    pluck: function pluck(t) {
      return this.map(t + "");
    },
    fetch: function fetch(t) {
      t = i.extend({
        parse: true
      }, t);
      var e = t.success;
      var r = this;

      t.success = function (i) {
        var n = t.reset ? "reset" : "set";
        r[n](i, t);
        if (e) e.call(t.context, r, i, t);
        r.trigger("sync", r, i, t);
      };

      B(this, t);
      return this.sync("read", this, t);
    },
    create: function create(t, e) {
      e = e ? i.clone(e) : {};
      var r = e.wait;
      t = this._prepareModel(t, e);
      if (!t) return false;
      if (!r) this.add(t, e);
      var n = this;
      var s = e.success;

      e.success = function (t, e, i) {
        if (r) n.add(t, i);
        if (s) s.call(i.context, t, e, i);
      };

      t.save(null, e);
      return t;
    },
    parse: function parse(t, e) {
      return t;
    },
    clone: function clone() {
      return new this.constructor(this.models, {
        model: this.model,
        comparator: this.comparator
      });
    },
    modelId: function modelId(t) {
      return t[this.model.prototype.idAttribute || "id"];
    },
    _reset: function _reset() {
      this.length = 0;
      this.models = [];
      this._byId = {};
    },
    _prepareModel: function _prepareModel(t, e) {
      if (this._isModel(t)) {
        if (!t.collection) t.collection = this;
        return t;
      }

      e = e ? i.clone(e) : {};
      e.collection = this;
      var r = new this.model(t, e);
      if (!r.validationError) return r;
      this.trigger("invalid", this, r.validationError, e);
      return false;
    },
    _removeModels: function _removeModels(t, e) {
      var i = [];

      for (var r = 0; r < t.length; r++) {
        var n = this.get(t[r]);
        if (!n) continue;
        var s = this.indexOf(n);
        this.models.splice(s, 1);
        this.length--;
        delete this._byId[n.cid];
        var a = this.modelId(n.attributes);
        if (a != null) delete this._byId[a];

        if (!e.silent) {
          e.index = s;
          n.trigger("remove", n, this, e);
        }

        i.push(n);

        this._removeReference(n, e);
      }

      return i;
    },
    _isModel: function _isModel(t) {
      return t instanceof y;
    },
    _addReference: function _addReference(t, e) {
      this._byId[t.cid] = t;
      var i = this.modelId(t.attributes);
      if (i != null) this._byId[i] = t;
      t.on("all", this._onModelEvent, this);
    },
    _removeReference: function _removeReference(t, e) {
      delete this._byId[t.cid];
      var i = this.modelId(t.attributes);
      if (i != null) delete this._byId[i];
      if (this === t.collection) delete t.collection;
      t.off("all", this._onModelEvent, this);
    },
    _onModelEvent: function _onModelEvent(t, e, i, r) {
      if (e) {
        if ((t === "add" || t === "remove") && i !== this) return;
        if (t === "destroy") this.remove(e, r);

        if (t === "change") {
          var n = this.modelId(e.previousAttributes());
          var s = this.modelId(e.attributes);

          if (n !== s) {
            if (n != null) delete this._byId[n];
            if (s != null) this._byId[s] = e;
          }
        }
      }

      this.trigger.apply(this, arguments);
    }
  });
  var S = {
    forEach: 3,
    each: 3,
    map: 3,
    collect: 3,
    reduce: 0,
    foldl: 0,
    inject: 0,
    reduceRight: 0,
    foldr: 0,
    find: 3,
    detect: 3,
    filter: 3,
    select: 3,
    reject: 3,
    every: 3,
    all: 3,
    some: 3,
    any: 3,
    include: 3,
    includes: 3,
    contains: 3,
    invoke: 0,
    max: 3,
    min: 3,
    toArray: 1,
    size: 1,
    first: 3,
    head: 3,
    take: 3,
    initial: 3,
    rest: 3,
    tail: 3,
    drop: 3,
    last: 3,
    without: 0,
    difference: 0,
    indexOf: 3,
    shuffle: 1,
    lastIndexOf: 3,
    isEmpty: 1,
    chain: 1,
    sample: 3,
    partition: 3,
    groupBy: 3,
    countBy: 3,
    sortBy: 3,
    indexBy: 3,
    findIndex: 3,
    findLastIndex: 3
  };
  h(x, S, "models");

  var k = e.View = function (t) {
    this.cid = i.uniqueId("view");
    i.extend(this, i.pick(t, P));

    this._ensureElement();

    this.initialize.apply(this, arguments);
  };

  var T = /^(\S+)\s*(.*)$/;
  var P = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
  i.extend(k.prototype, u, {
    tagName: "div",
    $: function $(t) {
      return this.$el.find(t);
    },
    initialize: function initialize() {},
    render: function render() {
      return this;
    },
    remove: function remove() {
      this._removeElement();

      this.stopListening();
      return this;
    },
    _removeElement: function _removeElement() {
      this.$el.remove();
    },
    setElement: function setElement(t) {
      this.undelegateEvents();

      this._setElement(t);

      this.delegateEvents();
      return this;
    },
    _setElement: function _setElement(t) {
      this.$el = t instanceof e.$ ? t : e.$(t);
      this.el = this.$el[0];
    },
    delegateEvents: function delegateEvents(t) {
      t || (t = i.result(this, "events"));
      if (!t) return this;
      this.undelegateEvents();

      for (var e in t) {
        var r = t[e];
        if (!i.isFunction(r)) r = this[r];
        if (!r) continue;
        var n = e.match(T);
        this.delegate(n[1], n[2], i.bind(r, this));
      }

      return this;
    },
    delegate: function delegate(t, e, i) {
      this.$el.on(t + ".delegateEvents" + this.cid, e, i);
      return this;
    },
    undelegateEvents: function undelegateEvents() {
      if (this.$el) this.$el.off(".delegateEvents" + this.cid);
      return this;
    },
    undelegate: function undelegate(t, e, i) {
      this.$el.off(t + ".delegateEvents" + this.cid, e, i);
      return this;
    },
    _createElement: function _createElement(t) {
      return document.createElement(t);
    },
    _ensureElement: function _ensureElement() {
      if (!this.el) {
        var t = i.extend({}, i.result(this, "attributes"));
        if (this.id) t.id = i.result(this, "id");
        if (this.className) t["class"] = i.result(this, "className");
        this.setElement(this._createElement(i.result(this, "tagName")));

        this._setAttributes(t);
      } else {
        this.setElement(i.result(this, "el"));
      }
    },
    _setAttributes: function _setAttributes(t) {
      this.$el.attr(t);
    }
  });

  e.sync = function (t, r, n) {
    var s = H[t];
    i.defaults(n || (n = {}), {
      emulateHTTP: e.emulateHTTP,
      emulateJSON: e.emulateJSON
    });
    var a = {
      type: s,
      dataType: "json"
    };

    if (!n.url) {
      a.url = i.result(r, "url") || F();
    }

    if (n.data == null && r && (t === "create" || t === "update" || t === "patch")) {
      a.contentType = "application/json";
      a.data = JSON.stringify(n.attrs || r.toJSON(n));
    }

    if (n.emulateJSON) {
      a.contentType = "application/x-www-form-urlencoded";
      a.data = a.data ? {
        model: a.data
      } : {};
    }

    if (n.emulateHTTP && (s === "PUT" || s === "DELETE" || s === "PATCH")) {
      a.type = "POST";
      if (n.emulateJSON) a.data._method = s;
      var h = n.beforeSend;

      n.beforeSend = function (t) {
        t.setRequestHeader("X-HTTP-Method-Override", s);
        if (h) return h.apply(this, arguments);
      };
    }

    if (a.type !== "GET" && !n.emulateJSON) {
      a.processData = false;
    }

    var o = n.error;

    n.error = function (t, e, i) {
      n.textStatus = e;
      n.errorThrown = i;
      if (o) o.call(n.context, t, e, i);
    };

    var l = n.xhr = e.ajax(i.extend(a, n));
    r.trigger("request", r, l, n);
    return l;
  };

  var H = {
    create: "POST",
    update: "PUT",
    patch: "PATCH",
    "delete": "DELETE",
    read: "GET"
  };

  e.ajax = function () {
    return e.$.ajax.apply(e.$, arguments);
  };

  var $ = e.Router = function (t) {
    t || (t = {});
    if (t.routes) this.routes = t.routes;

    this._bindRoutes();

    this.initialize.apply(this, arguments);
  };

  var A = /\((.*?)\)/g;
  var C = /(\(\?)?:\w+/g;
  var R = /\*\w+/g;
  var j = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  i.extend($.prototype, u, {
    initialize: function initialize() {},
    route: function route(t, r, n) {
      if (!i.isRegExp(t)) t = this._routeToRegExp(t);

      if (i.isFunction(r)) {
        n = r;
        r = "";
      }

      if (!n) n = this[r];
      var s = this;
      e.history.route(t, function (i) {
        var a = s._extractParameters(t, i);

        if (s.execute(n, a, r) !== false) {
          s.trigger.apply(s, ["route:" + r].concat(a));
          s.trigger("route", r, a);
          e.history.trigger("route", s, r, a);
        }
      });
      return this;
    },
    execute: function execute(t, e, i) {
      if (t) t.apply(this, e);
    },
    navigate: function navigate(t, i) {
      e.history.navigate(t, i);
      return this;
    },
    _bindRoutes: function _bindRoutes() {
      if (!this.routes) return;
      this.routes = i.result(this, "routes");
      var t,
          e = i.keys(this.routes);

      while ((t = e.pop()) != null) {
        this.route(t, this.routes[t]);
      }
    },
    _routeToRegExp: function _routeToRegExp(t) {
      t = t.replace(j, "\\$&").replace(A, "(?:$1)?").replace(C, function (t, e) {
        return e ? t : "([^/?]+)";
      }).replace(R, "([^?]*?)");
      return new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$");
    },
    _extractParameters: function _extractParameters(t, e) {
      var r = t.exec(e).slice(1);
      return i.map(r, function (t, e) {
        if (e === r.length - 1) return t || null;
        return t ? decodeURIComponent(t) : null;
      });
    }
  });

  var N = e.History = function () {
    this.handlers = [];
    this.checkUrl = i.bind(this.checkUrl, this);

    if (typeof window !== "undefined") {
      this.location = window.location;
      this.history = window.history;
    }
  };

  var M = /^[#\/]|\s+$/g;
  var O = /^\/+|\/+$/g;
  var U = /#.*$/;
  N.started = false;
  i.extend(N.prototype, u, {
    interval: 50,
    atRoot: function atRoot() {
      var t = this.location.pathname.replace(/[^\/]$/, "$&/");
      return t === this.root && !this.getSearch();
    },
    matchRoot: function matchRoot() {
      var t = this.decodeFragment(this.location.pathname);
      var e = t.slice(0, this.root.length - 1) + "/";
      return e === this.root;
    },
    decodeFragment: function decodeFragment(t) {
      return decodeURI(t.replace(/%25/g, "%2525"));
    },
    getSearch: function getSearch() {
      var t = this.location.href.replace(/#.*/, "").match(/\?.+/);
      return t ? t[0] : "";
    },
    getHash: function getHash(t) {
      var e = (t || this).location.href.match(/#(.*)$/);
      return e ? e[1] : "";
    },
    getPath: function getPath() {
      var t = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
      return t.charAt(0) === "/" ? t.slice(1) : t;
    },
    getFragment: function getFragment(t) {
      if (t == null) {
        if (this._usePushState || !this._wantsHashChange) {
          t = this.getPath();
        } else {
          t = this.getHash();
        }
      }

      return t.replace(M, "");
    },
    start: function start(t) {
      if (N.started) throw new Error("Backbone.history has already been started");
      N.started = true;
      this.options = i.extend({
        root: "/"
      }, this.options, t);
      this.root = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._hasHashChange = "onhashchange" in window && (document.documentMode === void 0 || document.documentMode > 7);
      this._useHashChange = this._wantsHashChange && this._hasHashChange;
      this._wantsPushState = !!this.options.pushState;
      this._hasPushState = !!(this.history && this.history.pushState);
      this._usePushState = this._wantsPushState && this._hasPushState;
      this.fragment = this.getFragment();
      this.root = ("/" + this.root + "/").replace(O, "/");

      if (this._wantsHashChange && this._wantsPushState) {
        if (!this._hasPushState && !this.atRoot()) {
          var e = this.root.slice(0, -1) || "/";
          this.location.replace(e + "#" + this.getPath());
          return true;
        } else if (this._hasPushState && this.atRoot()) {
          this.navigate(this.getHash(), {
            replace: true
          });
        }
      }

      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
        this.iframe = document.createElement("iframe");
        this.iframe.src = "javascript:0";
        this.iframe.style.display = "none";
        this.iframe.tabIndex = -1;
        var r = document.body;
        var n = r.insertBefore(this.iframe, r.firstChild).contentWindow;
        n.document.open();
        n.document.close();
        n.location.hash = "#" + this.fragment;
      }

      var s = window.addEventListener || function (t, e) {
        return attachEvent("on" + t, e);
      };

      if (this._usePushState) {
        s("popstate", this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        s("hashchange", this.checkUrl, false);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      if (!this.options.silent) return this.loadUrl();
    },
    stop: function stop() {
      var t = window.removeEventListener || function (t, e) {
        return detachEvent("on" + t, e);
      };

      if (this._usePushState) {
        t("popstate", this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        t("hashchange", this.checkUrl, false);
      }

      if (this.iframe) {
        document.body.removeChild(this.iframe);
        this.iframe = null;
      }

      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      N.started = false;
    },
    route: function route(t, e) {
      this.handlers.unshift({
        route: t,
        callback: e
      });
    },
    checkUrl: function checkUrl(t) {
      var e = this.getFragment();

      if (e === this.fragment && this.iframe) {
        e = this.getHash(this.iframe.contentWindow);
      }

      if (e === this.fragment) return false;
      if (this.iframe) this.navigate(e);
      this.loadUrl();
    },
    loadUrl: function loadUrl(t) {
      if (!this.matchRoot()) return false;
      t = this.fragment = this.getFragment(t);
      return i.some(this.handlers, function (e) {
        if (e.route.test(t)) {
          e.callback(t);
          return true;
        }
      });
    },
    navigate: function navigate(t, e) {
      if (!N.started) return false;
      if (!e || e === true) e = {
        trigger: !!e
      };
      t = this.getFragment(t || "");
      var i = this.root;

      if (t === "" || t.charAt(0) === "?") {
        i = i.slice(0, -1) || "/";
      }

      var r = i + t;
      t = this.decodeFragment(t.replace(U, ""));
      if (this.fragment === t) return;
      this.fragment = t;

      if (this._usePushState) {
        this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, r);
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, t, e.replace);

        if (this.iframe && t !== this.getHash(this.iframe.contentWindow)) {
          var n = this.iframe.contentWindow;

          if (!e.replace) {
            n.document.open();
            n.document.close();
          }

          this._updateHash(n.location, t, e.replace);
        }
      } else {
        return this.location.assign(r);
      }

      if (e.trigger) return this.loadUrl(t);
    },
    _updateHash: function _updateHash(t, e, i) {
      if (i) {
        var r = t.href.replace(/(javascript:|#).*$/, "");
        t.replace(r + "#" + e);
      } else {
        t.hash = "#" + e;
      }
    }
  });
  e.history = new N();

  var q = function q(t, e) {
    var r = this;
    var n;

    if (t && i.has(t, "constructor")) {
      n = t.constructor;
    } else {
      n = function n() {
        return r.apply(this, arguments);
      };
    }

    i.extend(n, r, e);
    n.prototype = i.create(r.prototype, t);
    n.prototype.constructor = n;
    n.__super__ = r.prototype;
    return n;
  };

  y.extend = x.extend = $.extend = k.extend = N.extend = q;

  var F = function F() {
    throw new Error('A "url" property or function must be specified');
  };

  var B = function B(t, e) {
    var i = e.error;

    e.error = function (r) {
      if (i) i.call(e.context, t, r, e);
      t.trigger("error", t, r, e);
    };
  };

  return e;
});
(function () {
  'use strict';
  /**
   * Defines the Hustle Object
   *
   * @type {{define, getModules, get, modules}}
   */

  window.Hustle = function ($, doc, win) {
    var currentModules = {},
        _modules = {},
        _TemplateOptions = {
      evaluate: /<#([\s\S]+?)#>/g,
      interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
      escape: /\{\{([^\}]+?)\}\}(?!\})/g
    };

    var define = function define(moduleName, module) {
      var splits = moduleName.split('.');

      if (splits.length) {
        // if module_name has more than one object name, then add the module definition recursively
        var recursive = function recursive(incomingModuleName, modules) {
          var arr = incomingModuleName.split('.'),
              _moduleName = arr.splice(0, 1)[0];
          var invoked;

          if (!_moduleName) {
            return;
          }

          if (!arr.length) {
            invoked = module.call(null, $, doc, win);
            modules[_moduleName] = _.isFunction(invoked) || 'undefined' === typeof invoked ? invoked : _.extend(modules[_moduleName] || {}, invoked);
          } else {
            modules[_moduleName] = modules[_moduleName] || {};
          }

          if (arr.length && _moduleName) {
            recursive(arr.join('.'), modules[_moduleName]);
          }
        };

        recursive(moduleName, _modules);
      } else {
        var m = _modules[moduleName] || {};
        _modules[moduleName] = _.extend(m, module.call(null, $, doc, win));
      }
    },
        get = function get(moduleName) {
      var module, _recursive;

      if (moduleName.split('.').length) {
        // recursively fetch the module
        module = false;

        _recursive = function recursive(incomingModuleName, modules) {
          var arr = incomingModuleName.split('.'),
              _moduleName = arr.splice(0, 1)[0];
          module = modules[_moduleName];

          if (arr.length) {
            _recursive(arr.join('.'), modules[_moduleName]);
          }
        };

        _recursive(moduleName, _modules);

        return module;
      }

      return _modules[moduleName] || false;
    },
        Events = _.extend({}, Backbone.Events),
        View = Backbone.View.extend({
      initialize: function initialize() {
        if (_.isFunction(this.initMix)) {
          this.initMix.apply(this, arguments);
        }

        if (this.render) {
          this.render = _.wrap(this.render, function (render) {
            this.trigger('before_render');
            render.call(this);
            Events.trigger('view.rendered', this);
            this.trigger('rendered');
          });
        }

        if (_.isFunction(this.init)) {
          this.init.apply(this, arguments);
        }
      }
    }),
        template = _.memoize(function (id) {
      var compiled;
      return function (data) {
        compiled = compiled || _.template(document.getElementById(id).innerHTML, null, _TemplateOptions);
        return compiled(data).replace('/*<![CDATA[*/', '').replace('/*]]>*/', '');
      };
    }),
        createTemplate = _.memoize(function (str) {
      var cache;
      return function (data) {
        cache = cache || _.template(str, null, _TemplateOptions);
        return cache(data);
      };
    }),
        getTemplateOptions = function getTemplateOptions() {
      return $.extend(true, {}, _TemplateOptions);
    },
        setModule = function setModule(moduleId, moduleView) {
      currentModules[moduleId] = moduleView;
    },
        getModules = function getModules() {
      return currentModules;
    },
        getModule = function getModule(moduleId) {
      return currentModules[moduleId];
    },
        consts = function () {
      return {
        ModuleShowCount: 'hustle_module_show_count-'
      };
    }();

    return {
      define: define,
      setModule: setModule,
      getModules: getModules,
      getModule: getModule,
      get: get,
      Events: Events,
      View: View,
      template: template,
      createTemplate: createTemplate,
      getTemplateOptions: getTemplateOptions,
      consts: consts
    };
  }(jQuery, document, window);
})(jQuery);
var Optin = window.Optin || {};
Optin.Models = {};

(function ($) {
  'use strict';

  Optin.NEVER_SEE_PREFIX = 'inc_optin_never_see_again-';
  Optin.COOKIE_PREFIX = 'inc_optin_long_hidden-';
  Optin.POPUP_COOKIE_PREFIX = 'inc_optin_popup_long_hidden-';
  Optin.SLIDE_IN_COOKIE_PREFIX = 'inc_optin_slide_in_long_hidden-';
  Optin.EMBEDDED_COOKIE_PREFIX = 'inc_optin_embedded_long_hidden-';
  Optin.template = _.memoize(function (id) {
    var compiled;
    var options = {
      evaluate: /<#([\s\S]+?)#>/g,
      interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
      escape: /\{\{([^\}]+?)\}\}(?!\})/g
    };
    return function (data) {
      compiled = compiled || _.template($('#' + id).html(), null, options);
      return compiled(data).replace('/*<![CDATA[*/', '').replace('/*]]>*/', '');
    };
  });
  /**
   * Compatibility with other plugin/theme e.g. upfront
   *
   */

  Optin.templateCompat = _.memoize(function (id) {
    var compiled;
    return function (data) {
      compiled = compiled || _.template($('#' + id).html());
      return compiled(data).replace('/*<![CDATA[*/', '').replace('/*]]>*/', '');
    };
  });
  Optin.cookie = {
    // Get a cookie value.
    get: function get(name) {
      var c;
      var cookiesArray = document.cookie.split(';'),
          cookiesArrayLength = cookiesArray.length,
          cookieName = name + '=';

      for (var i = 0; i < cookiesArrayLength; i += 1) {
        c = cookiesArray[i];

        while (' ' === c.charAt(0)) {
          c = c.substring(1, c.length);
        }

        if (0 === c.indexOf(cookieName)) {
          var _val = c.substring(cookieName.length, c.length);

          return _val ? JSON.parse(_val) : _val;
        }
      }

      return null;
    },
    // Saves the value into a cookie.
    set: function set(name, value, days) {
      var date, expires;
      value = $.isArray(value) || $.isPlainObject(value) ? JSON.stringify(value) : value;

      if (!isNaN(days)) {
        date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toGMTString();
      } else {
        expires = '';
      }

      document.cookie = name + '=' + value + expires + '; path=/';
    }
  };
  Optin.Mixins = {
    _mixins: {},
    _servicesMixins: {},
    _desingMixins: {},
    _displayMixins: {},
    add: function add(id, obj) {
      this._mixins[id] = obj;
    },
    getMixins: function getMixins() {
      return this._mixins;
    },
    addServicesMixin: function addServicesMixin(id, obj) {
      this._servicesMixins[id] = obj;
    },
    getServicesMixins: function getServicesMixins() {
      return this._servicesMixins;
    }
  };
})(jQuery);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* global incOpt */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
// noinspection JSUnusedLocalSymbols
(function ($) {
  'use strict';

  var Optin = window.Optin || {};

  if (incOpt.is_admin) {
    return;
  }

  Optin.moduleLogView = Backbone.Model.extend({
    url: incOpt.ajaxurl + '?action=hustle_module_viewed',
    defaults: {
      page_id: incOpt.page_id
    },
    parse: function parse(res) {
      if (res.success) {
        console.log('Log success!'); // eslint-disable-line no-console
      } else {
        console.log('Log failed!'); // eslint-disable-line no-console
      }
    }
  });
  /**
   * Log module view when it's being viewed
   */

  $(document).on('hustle:module:loaded', function (e, module) {
    if ('object' === _typeof(module)) {
      var type = module.moduleType; // set cookies used for "show less than" display condition

      var showCountKey = Hustle.consts.ModuleShowCount + type + '-' + module.moduleId,
          currentShowCount = Optin.cookie.get(showCountKey);
      Optin.cookie.set(showCountKey, currentShowCount + 1, 30); // Log number of times this module type has been shown so far

      var logType = 'undefined' !== module.$el.data('sub-type') ? module.$el.data('sub-type') : null; // TODO: check tracking types for embeds.

      if ('undefined' !== typeof Optin.moduleLogView && module.isTrackingEnabled) {
        var logView = new Optin.moduleLogView();
        logView.set('module_sub_type', logType);
        logView.set('module_type', type);
        logView.set('module_id', module.moduleId);
        logView.save();
      }
    }
  });

  Optin.updateSshareNetworks = function () {
    var networksToRetrieve = Optin.networksToRetrieve;

    if ('undefined' === typeof networksToRetrieve || !networksToRetrieve.length) {
      return;
    } // Retrieve the counters via ajax.


    $.ajax({
      type: 'POST',
      url: incOpt.ajaxurl,
      dataType: 'json',
      data: {
        action: 'hustle_update_network_shares',
        postId: incOpt.page_id,
        networks: networksToRetrieve
      }
    }).done(function (res) {
      if (res.success) {
        var response = res.data;
        $.each(response.networks, function (network, counter) {
          var $containers = $(".hustle-share-icon[data-counter=\"native\"][data-network=\"".concat(network, "\"]"));

          if ($containers.length) {
            $containers.each(function () {
              var $counter = $(this).find('.hustle-counter'),
                  defaultCounter = parseInt($(this).data('count'), 10);

              if (defaultCounter > parseInt(counter, 10)) {
                counter = parseInt(defaultCounter, 10);
              }

              var formatted = '';

              if (1000 > counter) {
                formatted = counter;
              } else if (1000000 > counter) {
                formatted = (counter / 1000).toFixed(1) + response.shorten.thousand;
              } else {
                formatted = (counter / 1000000).toFixed(1) + response.shorten.million;
              }

              $counter.text(formatted);
            });
          }
        });
      }
    });
  };
})(jQuery);
/* global incOpt */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
// noinspection JSUnusedLocalSymbols
(function ($) {
  $(document).on('submit', 'form.hustle-unsubscribe-form', function (e) {
    e.preventDefault();
    var $form = $(e.target),
        $emailHolder = $form.find('.hustle-email-section'),
        data = $form.serialize(),
        $button = $form.find('button'),
        $failure = $form.find('.wpoi-submit-failure');
    $button.attr('disabled', true);
    $button.addClass('sui-button-onload');
    $form.on('keypress', function () {
      return $failure.hide();
    });
    $.ajax({
      type: 'POST',
      url: incOpt.ajaxurl,
      dataType: 'json',
      data: {
        action: 'hustle_unsubscribe_form_submission',
        data: data
      },
      success: function success(res) {
        if (res.success && true === res.success) {
          $emailHolder.hide();
          $failure.hide();

          if (res.data.wrapper && res.data.html) {
            $form.find(res.data.wrapper).html(res.data.html);
          }
        } else if (res.data.html) {
          $failure.text(res.data.html);
          $failure.show();
        }
      },
      error: function error() {
        $failure.text($failure.data('default-error'));
        $failure.show();
      },
      complete: function complete() {
        $button.attr('disabled', false);
        $button.removeClass('sui-button-onload');
      }
    });
    return false;
  });
})(jQuery);
/* global incOpt, Modules, grecaptcha */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
// noinspection JSUnusedLocalSymbols
(function ($, doc, win) {
  'use strict';

  if (incOpt.is_upfront) {
    return;
  }

  if (!incOpt.is_admin) {
    Optin.ModuleLogConversion = Backbone.Model.extend({
      url: incOpt.ajaxurl + '?action=hustle_module_converted',
      defaults: {
        page_id: incOpt.page_id
      },
      parse: function parse(res) {
        if (res.success) {
          console.log('Log success!'); // eslint-disable-line no-console
        } else {
          console.log('Log failed!'); // eslint-disable-line no-console
        }
      }
    });
  }
  /**
   * Front View Model
   **/


  Optin.Module = Backbone.View.extend({
    moduleId: '',
    moduleType: '',
    settings: {},
    data: {},
    appearAfter: 'time',
    parent: 'body',
    cookieKey: '',
    neverSeeCookieKey: '',
    isShown: false,
    events: {
      'click .hustle-button-cta': 'ctaClicked'
    },
    close: _.noop,
    initialize: function initialize(opts) {
      this.data = opts;
      this.moduleId = opts.module_id;
      this.settings = opts.settings;
      this.moduleType = opts.module_type;
      this.isTrackingEnabled = 'enabled' === this.$el.data('tracking');
      this.setOnInit(opts);
      this.handleDisplay();
    },
    setOnInit: function setOnInit() {
      // Listen to successful Hustle's submission for optin to set cookies if needed.
      if ('optin' === this.data.module_mode) {
        this.$el.off('submit').on('submit', $.proxy(this, 'handleSubmission'));
        this.$el.find('.hustle-layout-form').off('change').on('change', $.proxy(this, 'onInputChange'));
      } // Calculate expiration days depends on what's been set


      this.expiration = parseInt(this.settings.expiration, 10);
      this.expirationDays = this.getExpirationDays();
      this.triggers = this.settings.triggers;

      if ('popup' === this.moduleType) {
        this.cookieKey = Optin.POPUP_COOKIE_PREFIX + this.moduleId;
      } else if ('slidein' === this.moduleType) {
        this.cookieKey = Optin.SLIDE_IN_COOKIE_PREFIX + this.moduleId;
      } else if ('embedded' === this.moduleType) {
        this.cookieKey = Optin.EMBEDDED_COOKIE_PREFIX + this.moduleId;
      }

      this.neverSeeCookieKey = Optin.NEVER_SEE_PREFIX + this.moduleType + '-' + this.moduleId;
    },
    // Check if module should display.
    shouldDisplay: function shouldDisplay() {
      if (!this.$el.length) {
        return false;
      }

      var display,
          neverSee = Optin.cookie.get(this.neverSeeCookieKey);
      neverSee = parseInt(neverSee) === parseInt(this.moduleId);

      if (neverSee) {
        display = false;
        return display;
      } // Hide after close.


      if ('no_show_on_post' === this.settings.after_close) {
        if (0 < parseInt(incOpt.page_id, 10)) {
          display = !Optin.cookie.get(this.cookieKey + '_' + incOpt.page_id);
        } else if (0 === parseInt(incOpt.page_id, 10) && incOpt.page_slug) {
          display = !Optin.cookie.get(this.cookieKey + '_' + incOpt.page_slug);
        } else {
          display = true;
        }
      } else if ('no_show_all' === this.settings.after_close) {
        display = !Optin.cookie.get(this.cookieKey);
      } else {
        display = true;
      }

      if (!display) {
        return display;
      } // Hide after subscription.


      if ('no_show_on_post' === this.data.settings.hide_after_subscription) {
        if (0 < parseInt(incOpt.page_id, 10)) {
          display = !Optin.cookie.get(this.cookieKey + '_success_' + incOpt.page_id);
        } else if (0 === parseInt(incOpt.page_id, 10) && incOpt.page_slug) {
          display = !Optin.cookie.get(this.cookieKey + '_' + incOpt.page_slug);
        } else {
          display = true;
        }
      } else if ('no_show_all' === this.data.settings.hide_after_subscription) {
        display = !Optin.cookie.get(this.cookieKey + '_success');
      }

      if (!display) {
        return display;
      } // Hide after CTA.


      if ('no_show_on_post' === this.data.settings.hide_after_cta) {
        if (0 < parseInt(incOpt.page_id, 10)) {
          display = !Optin.cookie.get(this.cookieKey + '_cta_success_' + incOpt.page_id);
        } else if (0 === parseInt(incOpt.page_id, 10) && incOpt.page_slug) {
          display = !Optin.cookie.get(this.cookieKey + '_cta_' + incOpt.page_slug);
        } else {
          display = true;
        }
      } else if ('no_show_all' === this.data.settings.hide_after_cta) {
        display = !Optin.cookie.get(this.cookieKey + '_cta_success');
      }

      return display;
    },
    getExpirationDays: function getExpirationDays() {
      switch (this.settings.expiration_unit) {
        case 'months':
          return this.expiration * 30;

        case 'weeks':
          return this.expiration * 7;

        case 'hours':
          return this.expiration / 24;

        case 'minutes':
          return this.expiration / (24 * 60);

        case 'seconds':
          return this.expiration / (24 * 60 * 60);

        default:
          return this.expiration;
      }
    },
    handleDisplay: function handleDisplay() {
      if (!this.shouldDisplay()) {
        this.$el.css('display', 'none');
        return;
      }

      this.beforeListenForDisplay();
      this.displayOnTrigger();
    },
    displayOnTrigger: function displayOnTrigger() {
      var triggerName = this.settings.triggers.trigger; // Queue the display for each trigger.

      if ('function' === typeof this[triggerName + 'Trigger']) {
        this[triggerName + 'Trigger']();
      }
    },
    beforeListenForDisplay: function beforeListenForDisplay() {
      this.$el.off('hustle:module:closed').on('hustle:module:closed', $.proxy(this, 'onModuleClosed', 'click_close_icon'));
      this.$el.off('hustle:module:hidden').on('hustle:module:hidden', $.proxy(this, 'onModuleClosed', 'auto_hide'));
      this.$el.off('hustle:module:click_outside').on('hustle:module:click_outside', $.proxy(this, 'onModuleClosed', 'click_outside'));
      this.$el.off('hustle:module:esc_key_pressed').on('hustle:module:esc_key_pressed', $.proxy(this, 'onModuleClosed', 'esc_key'));
      this.$el.off('hustle:module:clicked_never_see').on('hustle:module:clicked_never_see', $.proxy(this, 'onModuleClosed', 'click_never_see'));
    },
    executeRecaptcha: function executeRecaptcha($form, $recaptchaContainer) {
      var _$recaptchaContainer$ = $recaptchaContainer.data(),
          version = _$recaptchaContainer$.version;

      if ('v2_checkbox' === version) {
        this.doSubmit($form);
      } else {
        var data = {};

        if ('v3_recaptcha' === version) {
          data.action = 'contact';
        }

        grecaptcha.execute($recaptchaContainer.attr('recaptcha-id'), data);
      }
    },
    display: function display() {
      // If it's showing, return.
      if (this.isShown) {
        return;
      } // Make sure the module wasn't dismissed in between displays.


      if (!this.shouldDisplay()) {
        return;
      } // Setup the stuff before showing the module.


      this.beforeShowModule();
      $(document).trigger('hustle:module:before_show', this);
      this.showModule();
      $(document).trigger('hustle:module:loaded', this); // It's being shown.

      this.isShown = true;
    },
    beforeShowModule: function beforeShowModule() {
      this.handleCompatibility();
      HUI.maybeRenderRecaptcha(this.$el, this); // Load select2 if this module has select fields.

      if (this.$el.find('.hustle-select2').length) {
        HUI.select2();
      } // If there's a timepicker.


      if (this.$el.find('.hustle-time').length) {
        HUI.timepicker('.hustle-time');
      } // If there's a datepicker.


      if (this.$el.find('.hustle-date').length) {
        var date = $('.hustle-date'),
            _incOpt = incOpt,
            strings = _incOpt.days_and_months;

        _.each(date, function (e) {
          HUI.datepicker(e, strings.days_full, strings.days_short, strings.days_min, strings.months_full, strings.months_short);
        });
      } // Add the proper class if the field is filled.


      HUI.inputFilled();
    },
    // ==============================
    // Start trigger functions
    // ==============================
    timeTrigger: function timeTrigger() {
      var delay = parseInt(this.triggers.on_time_delay, 10) * 1000;

      if ('minutes' === this.triggers.on_time_unit) {
        delay *= 60;
      } else if ('hours' === this.triggers.on_time_unit) {
        delay *= 60 * 60;
      } // Display after a certain time.


      _.delay($.proxy(this, 'display'), delay);
    },
    clickTrigger: function clickTrigger() {
      var self = this;
      var selector = '';

      if ('1' === this.triggers.enable_on_click_element && '' !== (selector = $.trim(this.triggers.on_click_element))) {
        var $clickable = $(selector);

        if ($clickable.length) {
          $(document).on('click', selector, function (e) {
            e.preventDefault();
            self.display();
          });
        }
      }

      if ('1' === this.triggers.enable_on_click_shortcode) {
        // Clickable button added with shortcode
        $(document).on('click', '.hustle_module_shortcode_trigger', function (e) {
          e.preventDefault();

          if ($(this).data('id') === parseInt(self.moduleId) && $(this).data('type') === self.type) {
            self.display();
          }
        });
      }
    },
    scrollTrigger: function scrollTrigger() {
      var self = this;
      var moduleShown = false;

      if ('scrolled' === this.triggers.on_scroll) {
        $(win).scroll(_.debounce(function () {
          if (moduleShown) {
            return;
          }

          if (win.pageYOffset * 100 / $(doc).height() >= parseInt(self.triggers.on_scroll_page_percent)) {
            self.display();
            moduleShown = true;
          }
        }, 50));
      }

      if ('selector' === this.triggers.on_scroll) {
        var $el = $(this.triggers.on_scroll_css_selector);

        if ($el.length) {
          $(win).scroll(_.debounce(function () {
            if (moduleShown) {
              return;
            }

            if (win.pageYOffset >= $el.offset().top) {
              self.display();
              moduleShown = true;
            }
          }, 50));
        }
      }
    },
    exit_intentTrigger: function exit_intentTrigger() {
      //eslint-disable-line camelcase
      var self = this;
      var delay = 0; // handle delay

      if ('1' === this.triggers.on_exit_intent_delayed) {
        delay = parseInt(this.triggers.on_exit_intent_delayed_time, 10) * 1000;

        if ('minutes' === this.triggers.on_exit_intent_delayed_unit) {
          delay *= 60;
        } else if ('hours' === this.triggers.on_exit_intent_delayed_unit) {
          delay *= 60 * 60;
        }
      } // handle per session


      if ('1' === this.triggers.on_exit_intent_per_session) {
        $(doc).on('mouseleave', _.debounce(function (e) {
          if (!$('input').is(':focus')) {
            self.setExitTimer();
            $(this).off(e);
          }
        }, 300));
      } else {
        $(doc).on('mouseleave', _.debounce(function () {
          if (!$('input').is(':focus')) {
            self.setExitTimer();
          }
        }, 300));
      } // When user moves cursor back into window, reset timer.


      $('html').on('mousemove', _.debounce(function () {
        self.resetExitTimer();
      }, 300)); // Timer variable to be set or reset.

      this.exitTimer = null; // When user moves cursor back into window, reset timer.

      this.resetExitTimer = function () {
        // Only run if timer is still going.
        if (self.exitTimer) {
          // Reset the timer.
          clearTimeout(self.exitTimer);
        }
      }; // When cursor is out of window, set timer for trigger.


      this.setExitTimer = function () {
        // Set the timer, allowing it to be reset.
        self.exitTimer = setTimeout(function trigger() {
          // Timer is done.
          self.exitTimer = null; // Display module

          self.display();
        }, delay);
      };
    },
    adblockTrigger: function adblockTrigger() {
      var _this = this;

      var adblock = !$('#hustle_optin_adBlock_detector').length;

      if (adblock && '1' === this.triggers.on_adblock) {
        if ('1' !== this.triggers.enable_on_adblock_delay) {
          this.display();
        } else {
          var value = this.triggers.on_adblock_delay,
              unit = this.triggers.on_adblock_delay_unit,
              delay = this.convertToMicroseconds(value, unit);
          setTimeout(function () {
            return _this.display();
          }, delay);
        }
      }
    },
    // End trigger functions.
    convertToMicroseconds: function convertToMicroseconds(value, unit) {
      if ('seconds' === unit) {
        return parseInt(value, 10) * 1000;
      } else if ('minutes' === unit) {
        return parseInt(value, 10) * 60 * 1000;
      }

      return parseInt(value, 10) * 60 * 60 * 1000;
    },
    onModuleClosed: function onModuleClosed(closedBy) {
      this.clearRunningCompatInterval();
      this.$el.find('iframe').each(function () {
        $(this).attr('src', $(this).attr('src'));
      });

      if (Array.isArray(this.settings.after_close_trigger) && -1 !== this.settings.after_close_trigger.indexOf(closedBy)) {
        // save cookies for 'after_close' property
        if ('no_show_on_post' === this.settings.after_close) {
          if (0 < parseInt(incOpt.page_id, 10)) {
            Optin.cookie.set(this.cookieKey + '_' + incOpt.page_id, this.moduleId, this.expirationDays);
          } else if (0 === parseInt(incOpt.page_id, 10) && incOpt.page_slug) {
            Optin.cookie.set(this.cookieKey + '_' + incOpt.page_slug, this.moduleId, this.expirationDays);
          }
        } else if ('no_show_all' === this.settings.after_close) {
          Optin.cookie.set(this.cookieKey, this.moduleId, this.expirationDays);
        }
      } else if ('click_never_see' === closedBy) {
        Optin.cookie.set(this.neverSeeCookieKey, this.moduleId, this.expirationDays);
      }

      this.isShown = false;
      this.stopPlayingAudioVideo();
    },
    redirectOnExternalFormSubmit: function redirectOnExternalFormSubmit(e, submitDelay) {
      this.setCookiesAfterSubscription();
      var $form = $(e.target);

      if ($form.attr('action')) {
        setTimeout(function () {
          return window.location.replace($form.attr('action'));
        }, submitDelay);
      }
    },

    /**
     * Some form plugins have their own form submit listener,
     * so we have to tackle each one of them and apply the 'on_submit' behavior.
     */
    handleCompatibility: function handleCompatibility() {
      var me = this,
          afterSubmit = this.data.settings.on_submit,
          submitDelay = this.convertToMicroseconds(this.data.settings.on_submit_delay, this.data.settings.on_submit_delay_unit);

      if (-1 !== $.inArray(afterSubmit, ['close', 'default']) && 'embedded' !== this.moduleType) {
        // CF7.
        if (this.$el.find('form.wpcf7-form').length) {
          this.$el.on('wpcf7mailsent', function () {
            return me.closeAfterSubmission(me.el, submitDelay);
          });
        } // Forminator's Custom form.


        if (this.$('.forminator-custom-form').length) {
          this.$el.on('forminator:form:submit:success', function () {
            return me.closeAfterSubmission(me.el, submitDelay);
          });
        } // Gravity forms.


        if (this.$('.gform_wrapper').length) {
          $(document).on('gform_confirmation_loaded', function () {
            return me.closeAfterSubmission(me.el, submitDelay);
          });
        } // Ninja forms.


        if (this.$('.nf-form-cont').length) {
          $(document).on('nfFormSubmitResponse', function () {
            return me.closeAfterSubmission(me.el, submitDelay);
          });
        }
      } else if ('redirect' === afterSubmit) {
        // CF7.
        if (this.$el.find('form.wpcf7-form').length) {
          this.$el.on('wpcf7mailsent', function (e) {
            return me.redirectOnExternalFormSubmit(e, submitDelay);
          });
        } // Forminator's Custom form.


        if (this.$('.forminator-custom-form').length) {
          this.$el.on('forminator:form:submit:success', function (e) {
            return me.redirectOnExternalFormSubmit(e, submitDelay);
          });
        } // Gravity forms.


        if (this.$('.gform_wrapper').length) {
          $(document).on('gform_confirmation_loaded', function (e) {
            return me.redirectOnExternalFormSubmit(e, submitDelay);
          });
        } // Ninja forms.


        if (this.$('.nf-form-cont').length) {
          $(document).on('nfFormSubmitResponse', function (e) {
            return me.redirectOnExternalFormSubmit(e, submitDelay);
          });
        }
      } // e-newsletter, when a shortcode was added on module content.


      var $enewsletterForm = this.$el.find('form#subscribes_form'),
          enewsletterMaxWait = 216000000; // 1 hour

      var enewsletterWaited = 1000;

      if ($enewsletterForm.length) {
        me.waitEnewsletterResult = setInterval(function () {
          enewsletterWaited += 1000;
          var $enewsletterMessage = me.$el.find('#message');

          if (!_.isEmpty($enewsletterMessage.text().trim()) || enewsletterMaxWait === enewsletterWaited) {
            me.close();
          }
        }, 1000);
      }
    },
    closeAfterSubmission: function closeAfterSubmission(el, submitDelay) {
      var _this2 = this;

      this.setCookiesAfterSubscription();
      setTimeout(function () {
        return _this2.close(el);
      }, submitDelay);
    },
    maybeCloseAfterCtaClick: function maybeCloseAfterCtaClick(el, delay) {
      if ('undefined' !== typeof this.data.settings.close_cta && '0' !== this.data.settings.close_cta) {
        var self = this;
        setTimeout(function () {
          return self.close(el);
        }, delay);
      }
    },
    setCookiesAfterSubscription: function setCookiesAfterSubscription() {
      // Save cookies for 'hide_after_subscription' property
      if ('undefined' !== typeof this.data.settings.hide_after_subscription && 'keep_show' !== this.data.settings.hide_after_subscription) {
        var moduleId = this.data.module_id;
        var cookieKey;

        if ('popup' === this.data.module_type) {
          cookieKey = Optin.POPUP_COOKIE_PREFIX + moduleId;
        } else if ('slidein' === this.data.module_type) {
          cookieKey = Optin.SLIDE_IN_COOKIE_PREFIX + moduleId;
        } else if ('embedded' === this.data.module_type) {
          cookieKey = Optin.EMBEDDED_COOKIE_PREFIX + moduleId;
        }

        if ('no_show_on_post' === this.data.settings.hide_after_subscription) {
          Optin.cookie.set(cookieKey + '_success_' + incOpt.page_id, moduleId);
        } else if ('no_show_all' === this.data.settings.hide_after_subscription) {
          Optin.cookie.set(cookieKey + '_success', moduleId);
        }
      }
    },
    maybeSetCookiesAfterCtaClick: function maybeSetCookiesAfterCtaClick() {
      // Save cookies for 'hide_after_cta' property
      if ('undefined' !== typeof this.data.settings.hide_after_cta && 'keep_show' !== this.data.settings.hide_after_cta) {
        var moduleId = this.data.module_id;
        var cookieKey;

        if ('popup' === this.data.module_type) {
          cookieKey = Optin.POPUP_COOKIE_PREFIX + moduleId;
        } else if ('slidein' === this.data.module_type) {
          cookieKey = Optin.SLIDE_IN_COOKIE_PREFIX + moduleId;
        } else if ('embedded' === this.data.module_type) {
          cookieKey = Optin.EMBEDDED_COOKIE_PREFIX + moduleId;
        }

        if ('no_show_on_post' === this.data.settings.hide_after_cta) {
          Optin.cookie.set(cookieKey + '_cta_success_' + incOpt.page_id, moduleId);
        } else if ('no_show_all' === this.data.settings.hide_after_cta) {
          Optin.cookie.set(cookieKey + '_cta_success', moduleId);
        }
      }
    },
    handleSubmission: function handleSubmission(e) {
      e.preventDefault();
      var $form = $(e.target);

      if ($form.data('sending')) {
        return;
      }

      var errors = HUI.optinValidate(this.$el);
      errors = this.validateSubmission(errors);

      if (errors.length) {
        HUI.optinError($form.find('.hustle-error-message'), errors);
        return;
      }

      HUI.optinSubmit($form.find('.hustle-button-submit')); // If no recaptcha, do the submit.

      var $recaptchaContainer = $form.find('.hustle-recaptcha');

      if (!$recaptchaContainer.length) {
        this.doSubmit($form);
      } else {
        // Execute recaptcha. It'll trigger the form submit after its execution.
        this.executeRecaptcha($form, $recaptchaContainer);
      }
    },
    doSubmit: function doSubmit($form) {
      var self = this,
          formData = $form.serialize(),
          moduleId = $form.find('input[name="hustle_module_id"]').val(),
          gdpr = $form.find('#hustle-modal-gdpr-' + moduleId + ':checked').val(),
          $errorContainer = $form.find('.hustle-error-message'),
          module = _.find(Modules, function (mod) {
        return parseInt(moduleId, 10) === parseInt(mod.module_id, 10);
      });

      $form.trigger('hustle:module:submit', formData);
      $form.data('sending', true);
      $.ajax({
        type: 'POST',
        url: incOpt.ajaxurl,
        dataType: 'json',
        data: {
          action: 'hustle_module_form_submit',
          data: {
            form: formData,
            module_id: moduleId,
            gdpr: gdpr,
            uri: encodeURI(window.location.href)
          }
        },
        success: function success(res) {
          if (res && res.success) {
            $form.trigger('hustle:module:submit:success', formData);
            self.setCookiesAfterSubscription(); // Save cookies for 'hide_after_subscription' property

            if ('undefined' !== typeof module.settings.hide_after_subscription) {
              var cookieKey;

              if ('popup' === module.module_type) {
                cookieKey = Optin.POPUP_COOKIE_PREFIX + moduleId;
              } else if ('slidein' === module.module_type) {
                cookieKey = Optin.SLIDE_IN_COOKIE_PREFIX + moduleId;
              } else if ('embedded' === module.module_type) {
                cookieKey = Optin.EMBEDDED_COOKIE_PREFIX + moduleId;
              }

              if ('no_show_on_post' === module.settings.hide_after_subscription) {
                if (0 < parseInt(incOpt.page_id, 10)) {
                  Optin.cookie.set(cookieKey + '_success_' + incOpt.page_id, moduleId);
                } else if (0 === parseInt(incOpt.page_id, 10) && incOpt.page_slug) {
                  Optin.cookie.set(cookieKey + '_success_' + incOpt.page_slug, moduleId);
                }

                Optin.cookie.set(cookieKey + '_success_' + incOpt.page_id, moduleId);
              } else if ('no_show_all' === module.settings.hide_after_subscription) {
                Optin.cookie.set(cookieKey + '_success', moduleId);
              }
            }

            if ('redirect' === res.data.behavior.after_submit && 0 < res.data.behavior.url.length) {
              window.location.assign(res.data.behavior.url);
            } else {
              var $success = self.$('.hustle-success'),
                  $succesContainer = self.$('.hustle-success-content');

              if (res.data.message && $succesContainer.length) {
                $succesContainer.html(res.data.message);
              }

              HUI.optinSuccess($success, $success.data('close-delay'));
            }
          } else {
            $form.trigger('hustle:module:submit:failed', formData); // Reset recaptcha.

            var id = $form.find('.hustle-recaptcha').attr('recaptcha-id');

            if (id) {
              grecaptcha.reset(id);
            }

            HUI.optinError($errorContainer, res.data.errors);
          }
        },
        error: function error() {
          $form.trigger('hustle:module:submit:failed', formData);
          HUI.optinError($errorContainer);
        },
        complete: function complete() {
          $form.data('sending', false);
          $form.find('.hustle-button-onload').removeClass('hustle-button-onload');
        }
      });
    },
    validateSubmission: function validateSubmission(errors) {
      var self = this;
      var fields = this.$el.find('[data-validate="1"]'),
          emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
          urlProtocolRe = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i; // urlNoProtocolRe = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;

      $.each(fields, function (i, field) {
        var $field = $(field),
            value = String($field.val()).trim().toLowerCase();

        if (!value.length) {
          return;
        }

        var isValid = true;

        if ('email' === $field.attr('type')) {
          isValid = emailRe.test(value);
        } else if ('url' === $field.attr('type')) {
          isValid = urlProtocolRe.test(value);
        } else if ('datepicker' === $field.attr('type')) {
          var format = $field.data('format').toString();
          var dateRe = '';

          if ('mm/dd/yy' === format || 'mm/dd/yy' === format || 'mm.dd.yy' === format || 'mm.dd.yy' === format || 'mm-dd-yy' === format || 'mm-dd-yy' === format) {
            dateRe = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/;
          } else if ('dd/mm/yy' === format || 'dd/mm/yy' === format || 'dd.mm.yy' === format || 'dd.mm.yy' === format || 'dd-mm-yy' === format || 'dd-mm-yy' === format) {
            dateRe = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
          } else if ('yy/mm/dd' === format || 'Y/m/d' === format || 'yy.mm.dd' === format || 'Y.m.d' === format || 'yy-mm-dd' === format || 'Y-m-d' === format) {
            dateRe = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/;
          }

          if ('' !== dateRe) {
            isValid = dateRe.test(value);
          }
        } else if ('timepicker' === $field.attr('type')) {
          isValid = self.validateTime(value, $field.data('time-format'));
        }

        if (!isValid) {
          $field.closest('.hustle-field').addClass('hustle-field-error');
          errors.push($field.data('validation-error'));
        }
      });
      return errors;
    },
    validateTime: function validateTime(time, format) {
      var re = /^(\d{1,2}):(\d{2})(:00)?( [apAP][mM])?$/,
          regs = time.match(re);

      if (regs) {
        if ('HH:mm' === format) {
          //24-hour time format
          if (23 < regs[1]) {
            return false;
          }

          if (59 < regs[2]) {
            return false;
          }

          return true;
        } //12-hour time format with am/pm


        if (1 > regs[1] || 12 < regs[1]) {
          return false;
        }

        if (59 < regs[2]) {
          return false;
        }

        if ('am' !== $.trim(regs[4].toLowerCase()) && 'pm' !== $.trim(regs[4].toLowerCase())) {
          return false;
        }

        return true;
      }

      return false;
    },
    onInputChange: function onInputChange(e) {
      var $this = $(e.target);
      $this.closest('.hustle-field').removeClass('hustle-field-error');
    },
    stopPlayingAudioVideo: function stopPlayingAudioVideo() {
      this.$el.find('audio, video').trigger('pause');
    },
    clearRunningCompatInterval: function clearRunningCompatInterval() {
      if ('undefined' !== typeof this.waitEnewsletterResult) {
        // e-newsletter
        clearInterval(this.waitEnewsletterResult);
      }
    },
    ctaClicked: function ctaClicked(e) {
      var $this = $(e.target),
          submitDelay = this.convertToMicroseconds(this.data.settings.close_cta_time, this.data.settings.close_cta_unit);

      if ('undefined' !== typeof Optin.ModuleLogConversion && this.isTrackingEnabled && !$this.hasClass('hustle-cta-close')) {
        var logCtaConversion = new Optin.ModuleLogConversion(),
            cta = 'undefined' !== $this.data('cta-type') ? $this.data('cta-type') : '',
            subType = 'undefined' !== this.$el.data('sub-type') ? this.$el.data('sub-type') : '';
        logCtaConversion.set('module_sub_type', subType);
        logCtaConversion.set('module_id', this.moduleId);
        logCtaConversion.set('cta', cta);
        logCtaConversion.save();
      }

      this.maybeSetCookiesAfterCtaClick();
      this.maybeCloseAfterCtaClick($this, submitDelay);
    }
  });
})(jQuery, document, window);
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
// noinspection JSUnusedLocalSymbols
(function ($) {
  'use strict';

  Optin = window.Optin || {};
  Optin.Embedded = Optin.Module.extend({
    type: 'embedded',

    /**
     * Overriding.
     * Embeds don't need to attach onClose actions
     * but we need to handle the screen resize for inline.
     */
    beforeListenForDisplay: function beforeListenForDisplay() {
      var container = this.el;
      $(window).on('resize', function () {
        HUI.inlineResize(container);
      });
    },

    /**
     * Overriding.
     * Embeds don't have triggers so show right away.
     */
    displayOnTrigger: function displayOnTrigger() {
      this.display();
    },
    showModule: function showModule() {
      HUI.inlineResize(this.el);
      this.$el.trigger('hustle:module:beforeEmbedLoad', this.$el);
      HUI.inlineLoad(this.el);
      this.$el.trigger('hustle:module:afterEmbedLoad', this.$el);
    }
  });
})(jQuery);
/* global incOpt */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
// eslint-disable-next-line no-extra-semi
;

(function ($) {
  'use strict';

  if (incOpt.is_upfront) {
    return;
  }

  Optin = window.Optin || {};
  Optin.PopUp = Optin.Module.extend({
    type: 'popup',
    showModule: function showModule() {
      if ('0' === this.settings.allow_scroll_page) {
        $('html').addClass('hustle-no-scroll');
        this.$el.addClass('hustle-scroll-forbidden');
      }

      var autohideDelay = 'false' === String(this.$el.data('close-delay')) ? false : this.$el.data('close-delay');
      this.$el.trigger('hustle:module:beforePopupLoad', this.$el);
      HUI.popupLoad(this.el, autohideDelay);
      this.$el.trigger('hustle:module:afterPopupLoad', this.$el);
    },
    close: function close() {
      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      HUI.popupClose(this.$el, delay);
    }
  });
})(jQuery);
/* global incOpt */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
// eslint-disable-next-line no-extra-semi
;

(function ($) {
  'use strict';

  if (incOpt.is_upfront) {
    return;
  }

  Optin = window.Optin || {};
  Optin.SlideIn = Optin.Module.extend({
    type: 'slidein',
    showModule: function showModule() {
      var self = this,
          autohideDelay = 'false' === String(this.$el.data('close-delay')) ? false : this.$el.data('close-delay');
      HUI.slideinLayouts(this.$el);
      $(window).on('resize', function () {
        HUI.slideinLayouts(self.$el);
      });
      this.$el.trigger('hustle:module:beforeSlideInLoad', this.$el);
      HUI.slideinLoad(this.$el, autohideDelay);
      this.$el.trigger('hustle:module:afterSlideInLoad', this.$el);
    },
    close: function close() {
      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      HUI.slideinClose(this.$el, delay);
    }
  });
})(jQuery);
/* global incOpt, PinUtils */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
// eslint-disable-next-line no-extra-semi
;

(function ($) {
  'use strict';

  var Optin = window.Optin || {};
  Optin.SShare = Optin.Module.extend({
    type: 'social_sharing',
    beforeShowModule: _.noop,
    events: {
      'click .hustle-share-icon': 'iconClicked'
    },

    /**
     * Overriding.
     * Embeds don't need to attach onClose actions
     * but they need to collect the networks' native counters.
     */
    beforeListenForDisplay: function beforeListenForDisplay() {
      this.collectNativeCounters();
    },

    /**
     * Overriding.
     * Sshares don't have triggers so show right away.
     */
    handleDisplay: function handleDisplay() {
      this.beforeListenForDisplay();
      this.display();
    },
    showModule: function showModule() {
      var data = this.$el.data(),
          self = this;

      if ('floating' === data.subType) {
        this.$el.trigger('hustle:module:beforeSshareLoad', this.$el);
        HUI.floatLoad(this.el);
        this.$el.trigger('hustle:module:afterSshareLoad', this.$el);
        $(window).on('resize', function () {
          return HUI.floatLoad(self.el);
        });
      } else {
        this.$el.trigger('hustle:module:beforeSshareLoad', this.$el);
        HUI.inlineLoad(this.el);
        this.$el.trigger('hustle:module:afterSshareLoad', this.$el);
      }
    },
    setOnInit: function setOnInit(opts) {
      if ('undefined' !== typeof opts.parent) {
        this.parent = opts.parent;
      }
    },
    // Overridding.
    shouldDisplay: function shouldDisplay() {
      return true;
    },
    iconClicked: function iconClicked(e) {
      var $icon = $(e.currentTarget),
          counter = $icon.data('counter'),
          linkType = $icon.data('link'); // Track the conversion if enabled.

      if (this.isTrackingEnabled) {
        this.logConversion();
      } // Open a window with the network's native sharing endpoint if no custom url was provided.


      if ('native' === linkType) {
        e.preventDefault();
        this.openNativeSharingUrl($icon);
      } // Check what to do with the counter when the icon is clicked.


      if ('native' === counter) {
        // Show a check and don't increment the number.
        this.updateSocialCounter($icon, 'native');
      } else if ('click' === counter) {
        // Increment the counter number.
        this.updateSocialCounter($icon, 'click');
      }
    },
    logConversion: function logConversion() {
      if ('undefined' !== typeof Optin.ModuleLogConversion && this.isTrackingEnabled) {
        var logCtaConversion = new Optin.ModuleLogConversion(),
            subType = 'undefined' !== this.$el.data('sub-type') ? this.$el.data('sub-type') : '';
        logCtaConversion.set('module_sub_type', subType);
        logCtaConversion.set('module_id', this.moduleId);
        logCtaConversion.save();
      }
    },
    openNativeSharingUrl: function openNativeSharingUrl($icon) {
      var network = $icon.data('network');

      if (network && 'undefined' !== typeof incOpt.native_share_enpoints[network]) {
        if ('pinterest' === network) {
          this.updateSocialCounter($icon, 'click');
          PinUtils.pinAny();
        } else {
          window.open(incOpt.native_share_enpoints[network], 'MsgWindow', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
        }
      }
    },
    updateSocialCounter: function updateSocialCounter($button, counterType) {
      var network = $button.data('network'),
          containerClass = '.hustle_module_id_' + this.$el.data('id');

      if ('click' === counterType) {
        this.storeUpdatedClickCounter(network);
        setTimeout(function () {
          $(containerClass + ' a[data-network="' + network + '"]').not('a[data-counter="native"]').each(function () {
            var $counter = $(this).find('.hustle-counter');

            if ($counter.length) {
              // Add one to the counter.
              var val = parseInt($counter.text()) + 1;
              $counter.text(val);
            }
          });
        }, 5000);
      } else {
        setTimeout(function () {
          $(containerClass + ' a[data-network="' + network + '"]').not('a[data-counter="click"]').each(function () {
            var $counter = $(this).find('.hustle-counter');

            if ($counter.length) {
              // Add a checkmark icon.
              var val = '<i class="hustle-icon-check" aria-hidden="true"></i>';
              $counter.html(val);
            }
          });
        }, 5000);
      }
    },
    storeUpdatedClickCounter: function storeUpdatedClickCounter(network) {
      $.post({
        url: incOpt.ajaxurl,
        dataType: 'json',
        data: {
          action: 'hustle_sshare_click_counted',
          moduleId: this.moduleId,
          network: network
        }
      });
    },
    collectNativeCounters: function collectNativeCounters() {
      var $nativeCounterNetworks = this.$el.find('.hustle-share-icon[data-counter="native"]'); // Return if this module doesn't have native counters.

      if (!$nativeCounterNetworks.length) {
        return;
      }

      Optin.networksToRetrieve = Optin.networksToRetrieve || []; // Get all the networks with a native counters from this module.

      $nativeCounterNetworks.each(function () {
        var network = $(this).data('network');

        if (-1 === Optin.networksToRetrieve.indexOf(network)) {
          Optin.networksToRetrieve.push(network);
        }
      });
    }
  });
})(jQuery);
/* global incOpt, Modules */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
// eslint-disable-next-line no-extra-semi
;

(function ($) {
  'use strict';

  if (incOpt.is_upfront) {
    return;
  }

  $(document).ready(function () {
    _.each(Modules, function (module) {
      var moduleId = module.module_id;
      module.el = '.hustle_module_id_' + moduleId;

      if ('popup' === module.module_type) {
        Hustle.setModule(moduleId, new Optin.PopUp(module));
      } else if ('slidein' === module.module_type) {
        Hustle.setModule(moduleId, new Optin.SlideIn(module));
      } else if ('embedded' === module.module_type) {
        var embedsViews = [];
        var embededs = $(module.el);

        if (embededs.length) {
          embededs.each(function () {
            module.el = this;
            embedsViews.push(new Optin.Embedded(module));
          });
          Hustle.setModule(moduleId, embedsViews);
        } else {
          //lazy load this so that modules loaded by ajax
          //can run properly
          setTimeout(function () {
            embededs = $(module.el);
            embededs.each(function () {
              module.el = this;
              embedsViews.push(new Optin.Embedded(module));
            });
            Hustle.setModule(moduleId, embedsViews);
          }, incOpt.script_delay);
        }
      } else if ('social_sharing' === module.module_type) {
        var sshares = $(module.el),
            sshareViews = [];
        sshares.each(function () {
          module.el = this;
          sshareViews.push(new Optin.SShare(module));
        });
        Hustle.setModule(moduleId, sshareViews);
      }
    }); // Initialize HUI handler for form's inputs.


    HUI.inputFilled();
    $(document).trigger('hustleInitialized');
    Optin.updateSshareNetworks();
  });
})(jQuery);
"use strict";
(self.webpackChunkcreatex = self.webpackChunkcreatex || []).push([
  [179],
  {
    345: () => {
      function ne(e) {
        return "function" == typeof e;
      }
      function Kr(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const di = Kr(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Jr(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class ft {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (ne(r))
              try {
                r();
              } catch (i) {
                t = i instanceof di ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  yd(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof di ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new di(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) yd(t);
            else {
              if (t instanceof ft) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Jr(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Jr(n, t), t instanceof ft && t._removeParent(this);
        }
      }
      ft.EMPTY = (() => {
        const e = new ft();
        return (e.closed = !0), e;
      })();
      const gd = ft.EMPTY;
      function md(e) {
        return (
          e instanceof ft ||
          (e && "closed" in e && ne(e.remove) && ne(e.add) && ne(e.unsubscribe))
        );
      }
      function yd(e) {
        ne(e) ? e() : e.unsubscribe();
      }
      const Pn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        fi = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = fi;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = fi;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function _d(e) {
        fi.setTimeout(() => {
          const { onUnhandledError: t } = Pn;
          if (!t) throw e;
          t(e);
        });
      }
      function vd() {}
      const kv = da("C", void 0, void 0);
      function da(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Tn = null;
      function hi(e) {
        if (Pn.useDeprecatedSynchronousErrorHandling) {
          const t = !Tn;
          if ((t && (Tn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Tn;
            if (((Tn = null), n)) throw r;
          }
        } else e();
      }
      class fa extends ft {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), md(t) && t.add(this))
              : (this.destination = Hv);
        }
        static create(t, n, r) {
          return new Xr(t, n, r);
        }
        next(t) {
          this.isStopped
            ? pa(
                (function jv(e) {
                  return da("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? pa(
                (function Lv(e) {
                  return da("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? pa(kv, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const $v = Function.prototype.bind;
      function ha(e, t) {
        return $v.call(e, t);
      }
      class Bv {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              pi(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              pi(r);
            }
          else pi(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              pi(n);
            }
        }
      }
      class Xr extends fa {
        constructor(t, n, r) {
          let o;
          if ((super(), ne(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Pn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && ha(t.next, i),
                  error: t.error && ha(t.error, i),
                  complete: t.complete && ha(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new Bv(o);
        }
      }
      function pi(e) {
        Pn.useDeprecatedSynchronousErrorHandling
          ? (function Vv(e) {
              Pn.useDeprecatedSynchronousErrorHandling &&
                Tn &&
                ((Tn.errorThrown = !0), (Tn.error = e));
            })(e)
          : _d(e);
      }
      function pa(e, t) {
        const { onStoppedNotification: n } = Pn;
        n && fi.setTimeout(() => n(e, t));
      }
      const Hv = {
          closed: !0,
          next: vd,
          error: function Uv(e) {
            throw e;
          },
          complete: vd,
        },
        ga =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function On(e) {
        return e;
      }
      function Cd(e) {
        return 0 === e.length
          ? On
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let _e = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function qv(e) {
              return (
                (e && e instanceof fa) ||
                ((function Gv(e) {
                  return e && ne(e.next) && ne(e.error) && ne(e.complete);
                })(e) &&
                  md(e))
              );
            })(n)
              ? n
              : new Xr(n, r, o);
            return (
              hi(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Dd(r))((o, i) => {
              const s = new Xr({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [ga]() {
            return this;
          }
          pipe(...n) {
            return Cd(n)(this);
          }
          toPromise(n) {
            return new (n = Dd(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Dd(e) {
        var t;
        return null !== (t = e ?? Pn.Promise) && void 0 !== t ? t : Promise;
      }
      const Wv = Kr(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let kt = (() => {
        class e extends _e {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new wd(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Wv();
          }
          next(n) {
            hi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            hi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            hi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? gd
              : ((this.currentObservers = null),
                i.push(n),
                new ft(() => {
                  (this.currentObservers = null), Jr(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new _e();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new wd(t, n)), e;
      })();
      class wd extends kt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : gd;
        }
      }
      function Md(e) {
        return ne(e?.lift);
      }
      function xe(e) {
        return (t) => {
          if (Md(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Se(e, t, n, r, o) {
        return new Qv(e, t, n, r, o);
      }
      class Qv extends fa {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function Z(e, t) {
        return xe((n, r) => {
          let o = 0;
          n.subscribe(
            Se(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function An(e) {
        return this instanceof An ? ((this.v = e), this) : new An(e);
      }
      function Kv(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var o,
          r = n.apply(e, t || []),
          i = [];
        return (
          (o = {}),
          s("next"),
          s("throw"),
          s("return"),
          (o[Symbol.asyncIterator] = function () {
            return this;
          }),
          o
        );
        function s(f) {
          r[f] &&
            (o[f] = function (h) {
              return new Promise(function (p, g) {
                i.push([f, h, p, g]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function u(f) {
              f.value instanceof An
                ? Promise.resolve(f.value.v).then(l, c)
                : d(i[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(i[0][3], p);
          }
        }
        function l(f) {
          a("next", f);
        }
        function c(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
        }
      }
      function Jv(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Id(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const xd = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Sd(e) {
        return ne(e?.then);
      }
      function Pd(e) {
        return ne(e[ga]);
      }
      function Td(e) {
        return Symbol.asyncIterator && ne(e?.[Symbol.asyncIterator]);
      }
      function Od(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Ad = (function eC() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Rd(e) {
        return ne(e?.[Ad]);
      }
      function Nd(e) {
        return Kv(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield An(n.read());
              if (o) return yield An(void 0);
              yield yield An(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Fd(e) {
        return ne(e?.getReader);
      }
      function Lt(e) {
        if (e instanceof _e) return e;
        if (null != e) {
          if (Pd(e))
            return (function tC(e) {
              return new _e((t) => {
                const n = e[ga]();
                if (ne(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (xd(e))
            return (function nC(e) {
              return new _e((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Sd(e))
            return (function rC(e) {
              return new _e((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, _d);
              });
            })(e);
          if (Td(e)) return kd(e);
          if (Rd(e))
            return (function oC(e) {
              return new _e((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Fd(e))
            return (function iC(e) {
              return kd(Nd(e));
            })(e);
        }
        throw Od(e);
      }
      function kd(e) {
        return new _e((t) => {
          (function sC(e, t) {
            var n, r, o, i;
            return (function Zv(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = Jv(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Wt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Oe(e, t, n = 1 / 0) {
        return ne(t)
          ? Oe((r, o) => Z((i, s) => t(r, i, o, s))(Lt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            xe((r, o) =>
              (function aC(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++;
                    let v = !1;
                    Lt(n(g, c++)).subscribe(
                      Se(
                        t,
                        (D) => {
                          o?.(D), i ? h(D) : t.next(D);
                        },
                        () => {
                          v = !0;
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (l--; u.length && l < r; ) {
                                const D = u.shift();
                                s ? Wt(t, s, () => p(D)) : p(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Se(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function tr(e = 1 / 0) {
        return Oe(On, e);
      }
      const Qt = new _e((e) => e.complete());
      function ya(e) {
        return e[e.length - 1];
      }
      function eo(e) {
        return (function lC(e) {
          return e && ne(e.schedule);
        })(ya(e))
          ? e.pop()
          : void 0;
      }
      function Ld(e, t = 0) {
        return xe((n, r) => {
          n.subscribe(
            Se(
              r,
              (o) => Wt(r, e, () => r.next(o), t),
              () => Wt(r, e, () => r.complete(), t),
              (o) => Wt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function jd(e, t = 0) {
        return xe((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Vd(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new _e((n) => {
          Wt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Wt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function ve(e, t) {
        return t
          ? (function yC(e, t) {
              if (null != e) {
                if (Pd(e))
                  return (function fC(e, t) {
                    return Lt(e).pipe(jd(t), Ld(t));
                  })(e, t);
                if (xd(e))
                  return (function pC(e, t) {
                    return new _e((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Sd(e))
                  return (function hC(e, t) {
                    return Lt(e).pipe(jd(t), Ld(t));
                  })(e, t);
                if (Td(e)) return Vd(e, t);
                if (Rd(e))
                  return (function gC(e, t) {
                    return new _e((n) => {
                      let r;
                      return (
                        Wt(n, t, () => {
                          (r = e[Ad]()),
                            Wt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ne(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Fd(e))
                  return (function mC(e, t) {
                    return Vd(Nd(e), t);
                  })(e, t);
              }
              throw Od(e);
            })(e, t)
          : Lt(e);
      }
      function _a(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new Xr({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return t(...n).subscribe(r);
      }
      function ee(e) {
        for (let t in e) if (e[t] === ee) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function te(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(te).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Ca(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const CC = ee({ __forward_ref__: ee });
      function Da(e) {
        return (
          (e.__forward_ref__ = Da),
          (e.toString = function () {
            return te(this());
          }),
          e
        );
      }
      function F(e) {
        return (function wa(e) {
          return (
            "function" == typeof e &&
            e.hasOwnProperty(CC) &&
            e.__forward_ref__ === Da
          );
        })(e)
          ? e()
          : e;
      }
      class I extends Error {
        constructor(t, n) {
          super(
            (function gi(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function j(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function mi(e, t) {
        throw new I(-201, !1);
      }
      function rt(e, t) {
        null == e &&
          (function J(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function U(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function fn(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function yi(e) {
        return $d(e, _i) || $d(e, Ud);
      }
      function $d(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Bd(e) {
        return e && (e.hasOwnProperty(Ma) || e.hasOwnProperty(PC))
          ? e[Ma]
          : null;
      }
      const _i = ee({ ??prov: ee }),
        Ma = ee({ ??inj: ee }),
        Ud = ee({ ngInjectableDef: ee }),
        PC = ee({ ngInjectorDef: ee });
      var R = (() => (
        ((R = R || {})[(R.Default = 0)] = "Default"),
        (R[(R.Host = 1)] = "Host"),
        (R[(R.Self = 2)] = "Self"),
        (R[(R.SkipSelf = 4)] = "SkipSelf"),
        (R[(R.Optional = 8)] = "Optional"),
        R
      ))();
      let Ea;
      function ht(e) {
        const t = Ea;
        return (Ea = e), t;
      }
      function Hd(e, t, n) {
        const r = yi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & R.Optional
          ? null
          : void 0 !== t
          ? t
          : void mi(te(e));
      }
      function hn(e) {
        return { toString: e }.toString();
      }
      var wt = (() => (
          ((wt = wt || {})[(wt.OnPush = 0)] = "OnPush"),
          (wt[(wt.Default = 1)] = "Default"),
          wt
        ))(),
        jt = (() => {
          return (
            ((e = jt || (jt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            jt
          );
          var e;
        })();
      const re = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        nr = {},
        K = [],
        vi = ee({ ??cmp: ee }),
        ba = ee({ ??dir: ee }),
        Ia = ee({ ??pipe: ee }),
        zd = ee({ ??mod: ee }),
        Yt = ee({ ??fac: ee }),
        to = ee({ __NG_ELEMENT_ID__: ee });
      let OC = 0;
      function pt(e) {
        return hn(() => {
          const n = !0 === e.standalone,
            r = {},
            o = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === wt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || K,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || jt.Emulated,
              id: "c" + OC++,
              styles: e.styles || K,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            i = e.dependencies,
            s = e.features;
          return (
            (o.inputs = Wd(e.inputs, r)),
            (o.outputs = Wd(e.outputs)),
            s && s.forEach((a) => a(o)),
            (o.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Gd).filter(qd)
              : null),
            (o.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(He).filter(qd)
              : null),
            o
          );
        });
      }
      function Gd(e) {
        return X(e) || Ue(e);
      }
      function qd(e) {
        return null !== e;
      }
      function Rn(e) {
        return hn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || K,
          declarations: e.declarations || K,
          imports: e.imports || K,
          exports: e.exports || K,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Wd(e, t) {
        if (null == e) return nr;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      const Fe = pt;
      function X(e) {
        return e[vi] || null;
      }
      function Ue(e) {
        return e[ba] || null;
      }
      function He(e) {
        return e[Ia] || null;
      }
      function ot(e, t) {
        const n = e[zd] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${te(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const H = 11;
      function Ke(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function Et(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function Pa(e) {
        return 0 != (8 & e.flags);
      }
      function Mi(e) {
        return 2 == (2 & e.flags);
      }
      function Ei(e) {
        return 1 == (1 & e.flags);
      }
      function bt(e) {
        return null !== e.template;
      }
      function LC(e) {
        return 0 != (256 & e[2]);
      }
      function jn(e, t) {
        return e.hasOwnProperty(Yt) ? e[Yt] : null;
      }
      class $C {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Vn() {
        return Yd;
      }
      function Yd(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = UC), BC;
      }
      function BC() {
        const e = Jd(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === nr) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function UC(e, t, n, r) {
        const o =
            Jd(e) ||
            (function HC(e, t) {
              return (e[Kd] = t);
            })(e, { previous: nr, current: null }),
          i = o.current || (o.current = {}),
          s = o.previous,
          a = this.declaredInputs[n],
          u = s[a];
        (i[a] = new $C(u && u.currentValue, t, s === nr)), (e[r] = t);
      }
      Vn.ngInherit = !0;
      const Kd = "__ngSimpleChanges__";
      function Jd(e) {
        return e[Kd] || null;
      }
      function pe(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function yt(e, t) {
        return pe(t[e.index]);
      }
      function Na(e, t) {
        return e.data[t];
      }
      function st(e, t) {
        const n = t[e];
        return Ke(n) ? n : n[0];
      }
      function Ii(e) {
        return 64 == (64 & e[2]);
      }
      function pn(e, t) {
        return null == t ? null : e[t];
      }
      function Xd(e) {
        e[18] = 0;
      }
      function Fa(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const k = { lFrame: df(null), bindingsEnabled: !0 };
      function tf() {
        return k.bindingsEnabled;
      }
      function C() {
        return k.lFrame.lView;
      }
      function W() {
        return k.lFrame.tView;
      }
      function Ce() {
        let e = nf();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function nf() {
        return k.lFrame.currentTNode;
      }
      function Vt(e, t) {
        const n = k.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function ka() {
        return k.lFrame.isParent;
      }
      function ur() {
        return k.lFrame.bindingIndex++;
      }
      function sD(e, t) {
        const n = k.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), ja(t);
      }
      function ja(e) {
        k.lFrame.currentDirectiveIndex = e;
      }
      function uf() {
        return k.lFrame.currentQueryIndex;
      }
      function $a(e) {
        k.lFrame.currentQueryIndex = e;
      }
      function uD(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function lf(e, t, n) {
        if (n & R.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & R.Host ||
              ((o = uD(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (k.lFrame = cf());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Ba(e) {
        const t = cf(),
          n = e[1];
        (k.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function cf() {
        const e = k.lFrame,
          t = null === e ? null : e.child;
        return null === t ? df(e) : t;
      }
      function df(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function ff() {
        const e = k.lFrame;
        return (
          (k.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const hf = ff;
      function Ua() {
        const e = ff();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Ge() {
        return k.lFrame.selectedIndex;
      }
      function gn(e) {
        k.lFrame.selectedIndex = e;
      }
      function ce() {
        const e = k.lFrame;
        return Na(e.tView, e.selectedIndex);
      }
      function xi(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks || (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function Si(e, t, n) {
        pf(e, t, 3, n);
      }
      function Pi(e, t, n, r) {
        (3 & e[2]) === n && pf(e, t, n, r);
      }
      function Ha(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function pf(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[18] += 65536),
              (a < i || -1 == i) &&
                (yD(e, n, t, u), (e[18] = (4294901760 & e[18]) + u + 2)),
              u++;
      }
      function yD(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class ao {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Ti(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            mf(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function gf(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function mf(e) {
        return 64 === e.charCodeAt(0);
      }
      function Oi(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  yf(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function yf(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function _f(e) {
        return -1 !== e;
      }
      function lr(e) {
        return 32767 & e;
      }
      function cr(e, t) {
        let n = (function wD(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Ga = !0;
      function Ai(e) {
        const t = Ga;
        return (Ga = e), t;
      }
      let MD = 0;
      const $t = {};
      function lo(e, t) {
        const n = Wa(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          qa(r.data, e),
          qa(t, null),
          qa(r.blueprint, null));
        const o = Ri(e, t),
          i = e.injectorIndex;
        if (_f(o)) {
          const s = lr(o),
            a = cr(o, t),
            u = a[1].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function qa(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Wa(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Ri(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = xf(o)), null === r)) return -1;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function Ni(e, t, n) {
        !(function ED(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(to) && (r = n[to]),
            null == r && (r = n[to] = MD++);
          const o = 255 & r;
          t.data[e + (o >> 5)] |= 1 << o;
        })(e, t, n);
      }
      function Df(e, t, n) {
        if (n & R.Optional || void 0 !== e) return e;
        mi();
      }
      function wf(e, t, n, r) {
        if (
          (n & R.Optional && void 0 === r && (r = null),
          0 == (n & (R.Self | R.Host)))
        ) {
          const o = e[9],
            i = ht(void 0);
          try {
            return o ? o.get(t, r, n & R.Optional) : Hd(t, r, n & R.Optional);
          } finally {
            ht(i);
          }
        }
        return Df(r, 0, n);
      }
      function Mf(e, t, n, r = R.Default, o) {
        if (null !== e) {
          if (1024 & t[2]) {
            const s = (function TD(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const a = Ef(i, s, n, r | R.Self, $t);
                if (a !== $t) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[21];
                  if (l) {
                    const c = l.get(n, $t, r);
                    if (c !== $t) return c;
                  }
                  (u = xf(s)), (s = s[15]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, $t);
            if (s !== $t) return s;
          }
          const i = Ef(e, t, n, r, $t);
          if (i !== $t) return i;
        }
        return wf(t, n, r, o);
      }
      function Ef(e, t, n, r, o) {
        const i = (function xD(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(to) ? e[to] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : SD) : t;
        })(n);
        if ("function" == typeof i) {
          if (!lf(t, e, r)) return r & R.Host ? Df(o, 0, r) : wf(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & R.Optional) return s;
            mi();
          } finally {
            hf();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Wa(e, t),
            u = -1,
            l = r & R.Host ? t[16][6] : null;
          for (
            (-1 === a || r & R.SkipSelf) &&
            ((u = -1 === a ? Ri(e, t) : t[a + 8]),
            -1 !== u && If(r, !1)
              ? ((s = t[1]), (a = lr(u)), (t = cr(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[1];
            if (bf(i, a, c.data)) {
              const d = ID(a, t, n, s, r, l);
              if (d !== $t) return d;
            }
            (u = t[a + 8]),
              -1 !== u && If(r, t[1].data[a + 8] === l) && bf(i, a, t)
                ? ((s = c), (a = lr(u)), (t = cr(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function ID(e, t, n, r, o, i) {
        const s = t[1],
          a = s.data[e + 8],
          c = Fi(
            a,
            s,
            n,
            null == r ? Mi(a) && Ga : r != s && 0 != (3 & a.type),
            o & R.Host && i === a
          );
        return null !== c ? co(t, s, c, a) : $t;
      }
      function Fi(e, t, n, r, o) {
        const i = e.providerIndexes,
          s = t.data,
          a = 1048575 & i,
          u = e.directiveStart,
          c = i >> 20,
          f = o ? a + c : e.directiveEnd;
        for (let h = r ? a : a + c; h < f; h++) {
          const p = s[h];
          if ((h < u && n === p) || (h >= u && p.type === n)) return h;
        }
        if (o) {
          const h = s[u];
          if (h && bt(h) && h.type === n) return u;
        }
        return null;
      }
      function co(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function _D(e) {
            return e instanceof ao;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function DC(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new I(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function Y(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : j(e);
              })(i[n])
            );
          const a = Ai(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? ht(s.injectImpl) : null;
          lf(e, r, R.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function mD(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = Yd(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && ht(u), Ai(a), (s.resolving = !1), hf();
          }
        }
        return o;
      }
      function bf(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function If(e, t) {
        return !(e & R.Self || (e & R.Host && t));
      }
      class dr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Mf(this._tNode, this._lView, t, r, n);
        }
      }
      function SD() {
        return new dr(Ce(), C());
      }
      function xf(e) {
        const t = e[1],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
      }
      function fo(e) {
        return (function bD(e, t) {
          if ("class" === t) return e.classes;
          if ("style" === t) return e.styles;
          const n = e.attrs;
          if (n) {
            const r = n.length;
            let o = 0;
            for (; o < r; ) {
              const i = n[o];
              if (gf(i)) break;
              if (0 === i) o += 2;
              else if ("number" == typeof i)
                for (o++; o < r && "string" == typeof n[o]; ) o++;
              else {
                if (i === t) return n[o + 1];
                o += 2;
              }
            }
          }
          return null;
        })(Ce(), e);
      }
      const hr = "__parameters__";
      function gr(e, t, n) {
        return hn(() => {
          const r = (function Za(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(hr)
                ? u[hr]
                : Object.defineProperty(u, hr, { value: [] })[hr];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class L {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.??prov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.??prov = U({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function at(e, t) {
        void 0 === t && (t = e);
        for (let n = 0; n < e.length; n++) {
          let r = e[n];
          Array.isArray(r)
            ? (t === e && (t = e.slice(0, n)), at(r, t))
            : t !== e && t.push(r);
        }
        return t;
      }
      function Xt(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Xt(n, t) : t(n)));
      }
      function Pf(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function ki(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const mo = {},
        Xa = "__NG_DI_FLAG__",
        ji = "ngTempTokenPath",
        UD = /\n/gm,
        Rf = "__source";
      let yo;
      function yr(e) {
        const t = yo;
        return (yo = e), t;
      }
      function zD(e, t = R.Default) {
        if (void 0 === yo) throw new I(-203, !1);
        return null === yo
          ? Hd(e, void 0, t)
          : yo.get(e, t & R.Optional ? null : void 0, t);
      }
      function O(e, t = R.Default) {
        return (
          (function TC() {
            return Ea;
          })() || zD
        )(F(e), t);
      }
      function fe(e, t = R.Default) {
        return (
          "number" != typeof t &&
            (t =
              0 |
              (t.optional && 8) |
              (t.host && 1) |
              (t.self && 2) |
              (t.skipSelf && 4)),
          O(e, t)
        );
      }
      function eu(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = F(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new I(900, !1);
            let o,
              i = R.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = GD(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(O(o, i));
          } else t.push(O(r));
        }
        return t;
      }
      function _o(e, t) {
        return (e[Xa] = t), (e.prototype[Xa] = t), e;
      }
      function GD(e) {
        return e[Xa];
      }
      const vo = _o(gr("Optional"), 8),
        Co = _o(gr("SkipSelf"), 4);
      let nu;
      class qf {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      const gw =
        /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      var ge = (() => (
        ((ge = ge || {})[(ge.NONE = 0)] = "NONE"),
        (ge[(ge.HTML = 1)] = "HTML"),
        (ge[(ge.STYLE = 2)] = "STYLE"),
        (ge[(ge.SCRIPT = 3)] = "SCRIPT"),
        (ge[(ge.URL = 4)] = "URL"),
        (ge[(ge.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        ge
      ))();
      function lu(e) {
        const t = (function bo() {
          const e = C();
          return e && e[12];
        })();
        return t
          ? t.sanitize(ge.URL, e) || ""
          : (function Mo(e, t) {
              const n = (function dw(e) {
                return (e instanceof qf && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(
                  `Required a safe ${t}, got a ${n} (see https://g.co/ng/security#xss)`
                );
              }
              return n === t;
            })(e, "URL")
          ? (function yn(e) {
              return e instanceof qf
                ? e.changingThisBreaksApplicationSecurity
                : e;
            })(e)
          : (function iu(e) {
              return (e = String(e)).match(gw) ? e : "unsafe:" + e;
            })(j(e));
      }
      const cu = new L("ENVIRONMENT_INITIALIZER"),
        eh = new L("INJECTOR", -1),
        th = new L("INJECTOR_DEF_TYPES");
      class nh {
        get(t, n = mo) {
          if (n === mo) {
            const r = new Error(`NullInjectorError: No provider for ${te(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function Pw(...e) {
        return { ??providers: rh(0, e) };
      }
      function rh(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          Xt(t, (i) => {
            const s = i;
            du(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && oh(o, n),
          n
        );
      }
      function oh(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          Xt(o, (i) => {
            t.push(i);
          });
        }
      }
      function du(e, t, n, r) {
        if (!(e = F(e))) return !1;
        let o = null,
          i = Bd(e);
        const s = !i && X(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = Bd(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) du(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                Xt(i.imports, (c) => {
                  du(c, t, n, r) && (l || (l = []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && oh(l, t);
            }
            if (!a) {
              const l = jn(o) || (() => new o());
              t.push(
                { provide: o, useFactory: l, deps: K },
                { provide: th, useValue: o, multi: !0 },
                { provide: cu, useValue: () => O(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              Xt(u, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      const Tw = ee({ provide: String, useValue: ee });
      function fu(e) {
        return null !== e && "object" == typeof e && Tw in e;
      }
      function $n(e) {
        return "function" == typeof e;
      }
      const hu = new L("Set Injector scope."),
        zi = {},
        Aw = {};
      let pu;
      function Gi() {
        return void 0 === pu && (pu = new nh()), pu;
      }
      class _n {}
      class ah extends _n {
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            mu(t, (s) => this.processProvider(s)),
            this.records.set(eh, Cr(void 0, this)),
            o.has("environment") && this.records.set(_n, Cr(void 0, this));
          const i = this.records.get(hu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(th.multi, K, R.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = yr(this),
            r = ht(void 0);
          try {
            return t();
          } finally {
            yr(n), ht(r);
          }
        }
        get(t, n = mo, r = R.Default) {
          this.assertNotDestroyed();
          const o = yr(this),
            i = ht(void 0);
          try {
            if (!(r & R.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function Lw(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof L)
                    );
                  })(t) && yi(t);
                (a = u && this.injectableDefInScope(u) ? Cr(gu(t), zi) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & R.Self ? Gi() : this.parent).get(
              t,
              (n = r & R.Optional && n === mo ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[ji] = s[ji] || []).unshift(te(t)), o)) throw s;
              return (function qD(e, t, n, r) {
                const o = e[ji];
                throw (
                  (t[Rf] && o.unshift(t[Rf]),
                  (e.message = (function WD(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = te(t);
                    if (Array.isArray(t)) o = t.map(te).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : te(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      UD,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[ji] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            ht(i), yr(o);
          }
        }
        resolveInjectorInitializers() {
          const t = yr(this),
            n = ht(void 0);
          try {
            const r = this.get(cu.multi, K, R.Self);
            for (const o of r) o();
          } finally {
            yr(t), ht(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(te(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new I(205, !1);
        }
        processProvider(t) {
          let n = $n((t = F(t))) ? t : F(t && t.provide);
          const r = (function Nw(e) {
            return fu(e)
              ? Cr(void 0, e.useValue)
              : Cr(
                  (function uh(e, t, n) {
                    let r;
                    if ($n(e)) {
                      const o = F(e);
                      return jn(o) || gu(o);
                    }
                    if (fu(e)) r = () => F(e.useValue);
                    else if (
                      (function sh(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...eu(e.deps || []));
                    else if (
                      (function ih(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => O(F(e.useExisting));
                    else {
                      const o = F(e && (e.useClass || e.provide));
                      if (
                        !(function Fw(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return jn(o) || gu(o);
                      r = () => new o(...eu(e.deps));
                    }
                    return r;
                  })(e),
                  zi
                );
          })(t);
          if ($n(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Cr(void 0, zi, !0)),
              (o.factory = () => eu(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === zi && ((n.value = Aw), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function kw(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = F(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function gu(e) {
        const t = yi(e),
          n = null !== t ? t.factory : jn(e);
        if (null !== n) return n;
        if (e instanceof L) throw new I(204, !1);
        if (e instanceof Function)
          return (function Rw(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function go(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new I(204, !1))
              );
            const n = (function xC(e) {
              const t = e && (e[_i] || e[Ud]);
              if (t) {
                const n = (function SC(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new I(204, !1);
      }
      function Cr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function jw(e) {
        return !!e.??providers;
      }
      function mu(e, t) {
        for (const n of e)
          Array.isArray(n) ? mu(n, t) : jw(n) ? mu(n.??providers, t) : t(n);
      }
      class lh {}
      class Bw {
        resolveComponentFactory(t) {
          throw (function $w(e) {
            const t = Error(
              `No component factory found for ${te(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Io = (() => {
        class e {}
        return (e.NULL = new Bw()), e;
      })();
      function Uw() {
        return Dr(Ce(), C());
      }
      function Dr(e, t) {
        return new vn(yt(e, t));
      }
      let vn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = Uw), e;
      })();
      function Hw(e) {
        return e instanceof vn ? e.nativeElement : e;
      }
      class dh {}
      let qi = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function zw() {
                const e = C(),
                  n = st(Ce().index, e);
                return (Ke(n) ? n : e)[H];
              })()),
            e
          );
        })(),
        Gw = (() => {
          class e {}
          return (
            (e.??prov = U({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class Wi {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const qw = new Wi("14.2.9"),
        yu = {};
      function wu(e) {
        return e.ngOriginalError;
      }
      class wr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && wu(t);
          for (; n && wu(n); ) n = wu(n);
          return n || null;
        }
      }
      const Mu = new Map();
      let o0 = 0;
      const bu = "__ngContext__";
      function je(e, t) {
        Ke(t)
          ? ((e[bu] = t[20]),
            (function a0(e) {
              Mu.set(e[20], e);
            })(t))
          : (e[bu] = t);
      }
      function tn(e) {
        return e instanceof Function ? e() : e;
      }
      var Je = (() => (
        ((Je = Je || {})[(Je.Important = 1)] = "Important"),
        (Je[(Je.DashCase = 2)] = "DashCase"),
        Je
      ))();
      function xu(e, t) {
        return undefined(e, t);
      }
      function So(e) {
        const t = e[3];
        return Et(t) ? t[3] : t;
      }
      function Su(e) {
        return bh(e[13]);
      }
      function Pu(e) {
        return bh(e[4]);
      }
      function bh(e) {
        for (; null !== e && !Et(e); ) e = e[4];
        return e;
      }
      function Er(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Et(r) ? (i = r) : Ke(r) && ((s = !0), (r = r[0]));
          const a = pe(r);
          0 === e && null !== n
            ? null == o
              ? Oh(t, n, a)
              : Bn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Bn(t, n, a, o || null, !0)
            : 2 === e
            ? (function jh(e, t, n) {
                const r = Qi(e, t);
                r &&
                  (function N0(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function L0(e, t, n, r, o) {
                const i = n[7];
                i !== pe(n) && Er(t, e, r, i, o);
                for (let a = 10; a < n.length; a++) {
                  const u = n[a];
                  Po(u[1], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Ou(e, t, n) {
        return e.createElement(t, n);
      }
      function xh(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          o = t[3];
        512 & t[2] && ((t[2] &= -513), Fa(o, -1)), n.splice(r, 1);
      }
      function Au(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const o = r[17];
          null !== o && o !== e && xh(o, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = ki(e, 10 + t);
          !(function I0(e, t) {
            Po(e, t, t[H], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function Sh(e, t) {
        if (!(128 & t[2])) {
          const n = t[H];
          n.destroyNode && Po(e, t, n, 3, null, null),
            (function P0(e) {
              let t = e[13];
              if (!t) return Ru(e[1], e);
              for (; t; ) {
                let n = null;
                if (Ke(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    Ke(t) && Ru(t[1], t), (t = t[3]);
                  null === t && (t = e), Ke(t) && Ru(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Ru(e, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function R0(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof ao)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        try {
                          u.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function A0(e, t) {
              const n = e.cleanup,
                r = t[7];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 1],
                      a = "function" == typeof s ? s(t) : pe(t[s]),
                      u = r[(o = n[i + 2])],
                      l = n[i + 3];
                    "boolean" == typeof l
                      ? a.removeEventListener(n[i], u, l)
                      : l >= 0
                      ? r[(o = l)]()
                      : r[(o = -l)].unsubscribe(),
                      (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && t[H].destroy();
          const n = t[17];
          if (null !== n && Et(t[3])) {
            n !== t[3] && xh(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
          !(function u0(e) {
            Mu.delete(e[20]);
          })(t);
        }
      }
      function Ph(e, t, n) {
        return (function Th(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const o = e.data[r.directiveStart].encapsulation;
            if (o === jt.None || o === jt.Emulated) return null;
          }
          return yt(r, n);
        })(e, t.parent, n);
      }
      function Bn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Oh(e, t, n) {
        e.appendChild(t, n);
      }
      function Ah(e, t, n, r, o) {
        null !== r ? Bn(e, t, n, r, o) : Oh(e, t, n);
      }
      function Qi(e, t) {
        return e.parentNode(t);
      }
      let Fh = function Nh(e, t, n) {
        return 40 & e.type ? yt(e, n) : null;
      };
      function Zi(e, t, n, r) {
        const o = Ph(e, r, t),
          i = t[H],
          a = (function Rh(e, t, n) {
            return Fh(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Ah(i, o, n[u], a, !1);
          else Ah(i, o, n, a, !1);
      }
      function Yi(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return yt(t, e);
          if (4 & n) return Fu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Yi(e, r);
            {
              const o = e[t.index];
              return Et(o) ? Fu(-1, o) : pe(o);
            }
          }
          if (32 & n) return xu(t, e)() || pe(e[t.index]);
          {
            const r = Lh(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Yi(So(e[16]), r)
              : Yi(e, t.next);
          }
        }
        return null;
      }
      function Lh(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function Fu(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild;
          if (null !== o) return Yi(r, o);
        }
        return t[7];
      }
      function ku(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && je(pe(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & u) ku(e, t, n.child, r, o, i, !1), Er(t, e, o, a, i);
            else if (32 & u) {
              const l = xu(n, r);
              let c;
              for (; (c = l()); ) Er(t, e, o, c, i);
              Er(t, e, o, a, i);
            } else 16 & u ? Vh(e, t, r, n, o, i) : Er(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Po(e, t, n, r, o, i) {
        ku(n, r, e.firstChild, t, o, i, !1);
      }
      function Vh(e, t, n, r, o, i) {
        const s = n[16],
          u = s[6].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) Er(t, e, o, u[l], i);
        else ku(e, t, u, s[3], o, i, !0);
      }
      function $h(e, t, n) {
        e.setAttribute(t, "style", n);
      }
      function Lu(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Bh(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Uh = "ng-template";
      function V0(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let o = e[r++];
          if (n && "class" === o) {
            if (((o = e[r]), -1 !== Bh(o.toLowerCase(), t, 0))) return !0;
          } else if (1 === o) {
            for (; r < e.length && "string" == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Hh(e) {
        return 4 === e.type && e.value !== Uh;
      }
      function $0(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Uh);
      }
      function B0(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function z0(e) {
            for (let t = 0; t < e.length; t++) if (gf(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !$0(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (It(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!V0(e.attrs, l, n)) {
                    if (It(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = U0(8 & r ? "class" : u, o, Hh(e), n);
                if (-1 === d) {
                  if (It(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Bh(h, l, 0)) || (2 & r && l !== f)) {
                    if (It(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !It(r) && !It(u)) return !1;
            if (s && It(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return It(r) || s;
      }
      function It(e) {
        return 0 == (1 & e);
      }
      function U0(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function G0(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function zh(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (B0(e, t[r], n)) return !0;
        return !1;
      }
      function Gh(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function W0(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !It(s) && ((t += Gh(i, o)), (o = "")),
              (r = s),
              (i = i || !It(r));
          n++;
        }
        return "" !== o && (t += Gh(i, o)), t;
      }
      const V = {};
      function lt(e) {
        qh(W(), C(), Ge() + e, !1);
      }
      function qh(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && Si(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && Pi(t, i, 0, n);
          }
        gn(n);
      }
      function Yh(e, t = null, n = null, r) {
        const o = Kh(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Kh(e, t = null, n = null, r, o = new Set()) {
        const i = [n || K, Pw(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : te(e))),
          new ah(i, t || Gi(), r || null, o)
        );
      }
      let xt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Yh({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return Yh({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = mo),
          (e.NULL = new nh()),
          (e.??prov = U({ token: e, providedIn: "any", factory: () => O(eh) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function x(e, t = R.Default) {
        const n = C();
        return null === n ? O(e, t) : Mf(Ce(), n, F(e), t);
      }
      function Uu() {
        throw new Error("invalid");
      }
      function pp(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              $a(o), s.contentQueries(2, t[i], i);
            }
          }
      }
      function ts(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[0] = o),
          (d[2] = 76 | r),
          (null !== c || (e && 1024 & e[2])) && (d[2] |= 1024),
          Xd(d),
          (d[3] = d[15] = e),
          (d[8] = n),
          (d[10] = s || (e && e[10])),
          (d[H] = a || (e && e[H])),
          (d[12] = u || (e && e[12]) || null),
          (d[9] = l || (e && e[9]) || null),
          (d[6] = i),
          (d[20] = (function s0() {
            return o0++;
          })()),
          (d[21] = c),
          (d[16] = 2 == t.type ? e[16] : d),
          d
        );
      }
      function Ir(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Xu(e, t, n, r, o) {
            const i = nf(),
              s = ka(),
              u = (e.data[t] = (function PM(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && (i.next = u)),
              u
            );
          })(e, t, n, r, o)),
            (function iD() {
              return k.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function so() {
            const e = k.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Vt(i, !0), i;
      }
      function xr(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function el(e, t, n) {
        Ba(t);
        try {
          const r = e.viewQuery;
          null !== r && ul(1, r, n);
          const o = e.template;
          null !== o && gp(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && pp(e, t),
            e.staticViewQueries && ul(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function IM(e, t) {
              for (let n = 0; n < t.length; n++) GM(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), Ua();
        }
      }
      function ns(e, t, n, r) {
        const o = t[2];
        if (128 != (128 & o)) {
          Ba(t);
          try {
            Xd(t),
              (function sf(e) {
                return (k.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && gp(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && Si(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && Pi(t, l, 0, null), Ha(t, 0);
            }
            if (
              ((function HM(e) {
                for (let t = Su(e); null !== t; t = Pu(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r],
                      i = o[3];
                    0 == (512 & o[2]) && Fa(i, 1), (o[2] |= 512);
                  }
                }
              })(t),
              (function UM(e) {
                for (let t = Su(e); null !== t; t = Pu(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      o = r[1];
                    Ii(r) && ns(o, r, o.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && pp(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && Si(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && Pi(t, l, 1), Ha(t, 1);
            }
            !(function EM(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) gn(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      sD(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  gn(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function bM(e, t) {
                for (let n = 0; n < t.length; n++) zM(e, t[n]);
              })(t, a);
            const u = e.viewQuery;
            if ((null !== u && ul(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && Si(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && Pi(t, l, 2), Ha(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), Fa(t[3], -1));
          } finally {
            Ua();
          }
        }
      }
      function gp(e, t, n, r, o) {
        const i = Ge(),
          s = 2 & r;
        try {
          gn(-1), s && t.length > 22 && qh(e, t, 22, !1), n(r, o);
        } finally {
          gn(i);
        }
      }
      function tl(e, t, n) {
        !tf() ||
          ((function NM(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            e.firstCreatePass || lo(n, t), je(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = bt(u);
              l && VM(t, n, u);
              const c = co(t, e, a, n);
              je(c, t),
                null !== s && $M(0, a - o, c, u, 0, s),
                l && (st(n.index, t)[8] = c);
            }
          })(e, t, n, yt(n, t)),
          128 == (128 & n.flags) &&
            (function FM(e, t, n) {
              const r = n.directiveStart,
                o = n.directiveEnd,
                i = n.index,
                s = (function aD() {
                  return k.lFrame.currentDirectiveIndex;
                })();
              try {
                gn(i);
                for (let a = r; a < o; a++) {
                  const u = e.data[a],
                    l = t[a];
                  ja(a),
                    (null !== u.hostBindings ||
                      0 !== u.hostVars ||
                      null !== u.hostAttrs) &&
                      Mp(u, l);
                }
              } finally {
                gn(-1), ja(s);
              }
            })(e, t, n));
      }
      function nl(e, t, n = yt) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function yp(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = rl(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function rl(e, t, n, r, o, i, s, a, u, l) {
        const c = 22 + r,
          d = c + o,
          f = (function xM(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : V);
            return n;
          })(c, d),
          h = "function" == typeof l ? l() : l;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function _p(e, t, n, r) {
        const o = Sp(t);
        null === n
          ? o.push(r)
          : (o.push(n), e.firstCreatePass && Pp(e).push(r, o.length - 1));
      }
      function vp(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const o = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, o)
              : (n[r] = [t, o]);
          }
        return n;
      }
      function Cp(e, t) {
        const r = t.directiveEnd,
          o = e.data,
          i = t.attrs,
          s = [];
        let a = null,
          u = null;
        for (let l = t.directiveStart; l < r; l++) {
          const c = o[l],
            d = c.inputs,
            f = null === i || Hh(t) ? null : BM(d, i);
          s.push(f), (a = vp(d, l, a)), (u = vp(c.outputs, l, u));
        }
        null !== a &&
          (a.hasOwnProperty("class") && (t.flags |= 16),
          a.hasOwnProperty("style") && (t.flags |= 32)),
          (t.initialInputs = s),
          (t.inputs = a),
          (t.outputs = u);
      }
      function Dp(e, t) {
        const n = st(t, e);
        16 & n[2] || (n[2] |= 32);
      }
      function ol(e, t, n, r) {
        let o = !1;
        if (tf()) {
          const i = (function kM(e, t, n) {
              const r = e.directiveRegistry;
              let o = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i];
                  zh(n, s.selectors, !1) &&
                    (o || (o = []),
                    Ni(lo(n, t), e, s.type),
                    bt(s) ? (Ep(e, n), o.unshift(s)) : o.push(s));
                }
              return o;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== i) {
            (o = !0), bp(n, e.data.length, i.length);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              u = !1,
              l = xr(e, t, i.length, null);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              (n.mergedAttrs = Oi(n.mergedAttrs, d.hostAttrs)),
                Ip(e, n, t, l, d),
                jM(l, d, s),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !u &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (u = !0)),
                l++;
            }
            Cp(e, n);
          }
          s &&
            (function LM(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let o = 0; o < t.length; o += 2) {
                  const i = n[t[o + 1]];
                  if (null == i) throw new I(-301, !1);
                  r.push(t[o], i);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = Oi(n.mergedAttrs, n.attrs)), o;
      }
      function wp(e, t, n, r, o, i) {
        const s = i.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const u = ~t.index;
          (function RM(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != u && a.push(u),
            a.push(r, o, s);
        }
      }
      function Mp(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Ep(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function jM(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          bt(t) && (n[""] = e);
        }
      }
      function bp(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function Ip(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = jn(o.type)),
          s = new ao(i, bt(o), x);
        (e.blueprint[r] = s),
          (n[r] = s),
          wp(e, t, 0, r, xr(e, n, o.hostVars, V), o);
      }
      function VM(e, t, n) {
        const r = yt(t, e),
          o = yp(n),
          i = e[10],
          s = rs(
            e,
            ts(
              e,
              o,
              null,
              n.onPush ? 32 : 16,
              r,
              t,
              i,
              i.createRenderer(r, n),
              null,
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function Bt(e, t, n, r, o, i) {
        const s = yt(e, t);
        !(function il(e, t, n, r, o, i, s) {
          if (null == i) e.removeAttribute(t, o, n);
          else {
            const a = null == s ? j(i) : s(i, r || "", o);
            e.setAttribute(t, o, a, n);
          }
        })(t[H], s, i, e.value, n, r, o);
      }
      function $M(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
          }
        }
      }
      function BM(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              e.hasOwnProperty(o) &&
                (null === n && (n = []), n.push(o, e[o], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function xp(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function zM(e, t) {
        const n = st(t, e);
        if (Ii(n)) {
          const r = n[1];
          48 & n[2] ? ns(r, n, r.template, n[8]) : n[5] > 0 && sl(n);
        }
      }
      function sl(e) {
        for (let r = Su(e); null !== r; r = Pu(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (Ii(i))
              if (512 & i[2]) {
                const s = i[1];
                ns(s, i, s.template, i[8]);
              } else i[5] > 0 && sl(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = st(n[r], e);
            Ii(o) && o[5] > 0 && sl(o);
          }
      }
      function GM(e, t) {
        const n = st(t, e),
          r = n[1];
        (function qM(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          el(r, n, n[8]);
      }
      function rs(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function al(e) {
        for (; e; ) {
          e[2] |= 32;
          const t = So(e);
          if (LC(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function os(e, t, n, r = !0) {
        const o = t[10];
        o.begin && o.begin();
        try {
          ns(e, t, e.template, n);
        } catch (s) {
          throw (r && Op(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function ul(e, t, n) {
        $a(0), t(e, n);
      }
      function Sp(e) {
        return e[7] || (e[7] = []);
      }
      function Pp(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Op(e, t) {
        const n = e[9],
          r = n ? n.get(wr, null) : null;
        r && r.handleError(t);
      }
      function ll(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function is(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Ca(o, a))
              : 2 == i && (r = Ca(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function ss(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(pe(i)), Et(i)))
            for (let a = 10; a < i.length; a++) {
              const u = i[a],
                l = u[1].firstChild;
              null !== l && ss(u[1], u, l, r);
            }
          const s = n.type;
          if (8 & s) ss(e, t, n.child, r);
          else if (32 & s) {
            const a = xu(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = Lh(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = So(t[16]);
              ss(u[1], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class To {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return ss(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (Et(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Au(t, r), ki(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Sh(this._lView[1], this._lView);
        }
        onDestroy(t) {
          _p(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          al(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          os(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new I(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function S0(e, t) {
              Po(e, t, t[H], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new I(902, !1);
          this._appRef = t;
        }
      }
      class WM extends To {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          os(t[1], t, t[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class cl extends Io {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = X(t);
          return new Oo(n, this.ngModule);
        }
      }
      function Ap(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class ZM {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          const o = this.injector.get(t, yu, r);
          return o !== yu || n === yu ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Oo extends lh {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function Q0(e) {
              return e.map(W0).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return Ap(this.componentDef.inputs);
        }
        get outputs() {
          return Ap(this.componentDef.outputs);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof _n ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new ZM(t, i) : t,
            a = s.get(dh, null);
          if (null === a) throw new I(407, !1);
          const u = s.get(Gw, null),
            l = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function SM(e, t, n) {
                  return e.selectRootElement(t, n === jt.ShadowDom);
                })(l, r, this.componentDef.encapsulation)
              : Ou(
                  a.createRenderer(null, this.componentDef),
                  c,
                  (function QM(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = rl(0, null, null, 1, 0, null, null, null, null, null),
            p = ts(null, h, null, f, null, null, a, l, u, s, null);
          let g, v;
          Ba(p);
          try {
            const D = (function JM(e, t, n, r, o, i) {
              const s = n[1];
              n[22] = e;
              const u = Ir(s, 22, 2, "#host", null),
                l = (u.mergedAttrs = t.hostAttrs);
              null !== l &&
                (is(u, l, !0),
                null !== e &&
                  (Ti(o, e, l),
                  null !== u.classes && Lu(o, e, u.classes),
                  null !== u.styles && $h(o, e, u.styles)));
              const c = r.createRenderer(e, t),
                d = ts(
                  n,
                  yp(t),
                  null,
                  t.onPush ? 32 : 16,
                  n[22],
                  u,
                  r,
                  c,
                  i || null,
                  null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (Ni(lo(u, n), s, t.type), Ep(s, u), bp(u, n.length, 1)),
                rs(n, d),
                (n[22] = d)
              );
            })(d, this.componentDef, p, a, l);
            if (d)
              if (r) Ti(l, d, ["ng-version", qw.full]);
              else {
                const { attrs: M, classes: _ } = (function Z0(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    o = 2;
                  for (; r < e.length; ) {
                    let i = e[r];
                    if ("string" == typeof i)
                      2 === o
                        ? "" !== i && t.push(i, e[++r])
                        : 8 === o && n.push(i);
                    else {
                      if (!It(o)) break;
                      o = i;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                M && Ti(l, d, M), _ && _.length > 0 && Lu(l, d, _.join(" "));
              }
            if (((v = Na(h, 22)), void 0 !== n)) {
              const M = (v.projection = []);
              for (let _ = 0; _ < this.ngContentSelectors.length; _++) {
                const P = n[_];
                M.push(null != P ? Array.from(P) : null);
              }
            }
            (g = (function XM(e, t, n, r) {
              const o = n[1],
                i = (function AM(e, t, n) {
                  const r = Ce();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Ip(e, r, t, xr(e, t, 1, null), n),
                    Cp(e, r));
                  const o = co(t, e, r.directiveStart, r);
                  je(o, t);
                  const i = yt(r, t);
                  return i && je(i, t), o;
                })(o, n, t);
              if (((e[8] = n[8] = i), null !== r)) for (const a of r) a(i, t);
              if (t.contentQueries) {
                const a = Ce();
                t.contentQueries(1, i, a.directiveStart);
              }
              const s = Ce();
              return (
                !o.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (gn(s.index),
                  wp(n[1], s, 0, s.directiveStart, s.directiveEnd, t),
                  Mp(t, i)),
                i
              );
            })(D, this.componentDef, p, [eE])),
              el(h, p, null);
          } finally {
            Ua();
          }
          return new KM(this.componentType, g, Dr(v, p), p, v);
        }
      }
      class KM extends class Vw {} {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new WM(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            ll(i[1], i, o, t, n), Dp(i, this._tNode.index);
          }
        }
        get injector() {
          return new dr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function eE() {
        const e = Ce();
        xi(C()[1], e);
      }
      let as = null;
      function Un() {
        if (!as) {
          const e = re.Symbol;
          if (e && e.iterator) as = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (as = r);
            }
          }
        }
        return as;
      }
      function Ve(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function hl(e, t, n, r) {
        const o = C();
        return Ve(o, ur(), t) && (W(), Bt(ce(), o, e, t, n, r)), hl;
      }
      function dt(e, t, n, r, o, i, s, a) {
        const u = C(),
          l = W(),
          c = e + 22,
          d = l.firstCreatePass
            ? (function fE(e, t, n, r, o, i, s, a, u) {
                const l = t.consts,
                  c = Ir(t, e, 4, s || null, pn(l, a));
                ol(t, n, c, pn(l, u)), xi(t, c);
                const d = (c.tViews = rl(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, l, u, t, n, r, o, i, s)
            : l.data[c];
        Vt(d, !1);
        const f = u[H].createComment("");
        Zi(l, u, f, d),
          je(f, u),
          rs(u, (u[c] = xp(f, u, f, d))),
          Ei(d) && tl(l, u, d),
          null != s && nl(u, d, a);
      }
      function Xe(e, t, n) {
        const r = C();
        return (
          Ve(r, ur(), t) &&
            (function ct(e, t, n, r, o, i, s, a) {
              const u = yt(t, n);
              let c,
                l = t.inputs;
              !a && null != l && (c = l[r])
                ? (ll(e, n, c, r, o), Mi(t) && Dp(n, t.index))
                : 3 & t.type &&
                  ((r = (function TM(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(u, r, o));
            })(W(), ce(), r, e, t, r[H], n, !1),
          Xe
        );
      }
      function pl(e, t, n, r, o) {
        const s = o ? "class" : "style";
        ll(e, n, t.inputs[s], s, r);
      }
      function m(e, t, n, r) {
        const o = C(),
          i = W(),
          s = 22 + e,
          a = o[H],
          u = (o[s] = Ou(
            a,
            t,
            (function gD() {
              return k.lFrame.currentNamespace;
            })()
          )),
          l = i.firstCreatePass
            ? (function gE(e, t, n, r, o, i, s) {
                const a = t.consts,
                  l = Ir(t, e, 2, o, pn(a, i));
                return (
                  ol(t, n, l, pn(a, s)),
                  null !== l.attrs && is(l, l.attrs, !1),
                  null !== l.mergedAttrs && is(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, i, o, 0, t, n, r)
            : i.data[s];
        Vt(l, !0);
        const c = l.mergedAttrs;
        null !== c && Ti(a, u, c);
        const d = l.classes;
        null !== d && Lu(a, u, d);
        const f = l.styles;
        return (
          null !== f && $h(a, u, f),
          64 != (64 & l.flags) && Zi(i, o, u, l),
          0 ===
            (function KC() {
              return k.lFrame.elementDepthCount;
            })() && je(u, o),
          (function JC() {
            k.lFrame.elementDepthCount++;
          })(),
          Ei(l) &&
            (tl(i, o, l),
            (function mp(e, t, n) {
              if (Pa(t)) {
                const o = t.directiveEnd;
                for (let i = t.directiveStart; i < o; i++) {
                  const s = e.data[i];
                  s.contentQueries && s.contentQueries(1, n[i], i);
                }
              }
            })(i, l, o)),
          null !== r && nl(o, l),
          m
        );
      }
      function y() {
        let e = Ce();
        ka()
          ? (function La() {
              k.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Vt(e, !1));
        const t = e;
        !(function XC() {
          k.lFrame.elementDepthCount--;
        })();
        const n = W();
        return (
          n.firstCreatePass && (xi(n, e), Pa(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function CD(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            pl(n, t, C(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function DD(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            pl(n, t, C(), t.stylesWithoutHost, !1),
          y
        );
      }
      function S(e, t, n, r) {
        return m(e, t, n, r), y(), S;
      }
      function ls(e) {
        return !!e && "function" == typeof e.then;
      }
      const qp = function Gp(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function Te(e, t, n, r) {
        const o = C(),
          i = W(),
          s = Ce();
        return (
          (function Qp(e, t, n, r, o, i, s, a) {
            const u = Ei(r),
              c = e.firstCreatePass && Pp(e),
              d = t[8],
              f = Sp(t);
            let h = !0;
            if (3 & r.type || a) {
              const v = yt(r, t),
                D = a ? a(v) : v,
                M = f.length,
                _ = a ? (Q) => a(pe(Q[r.index])) : r.index;
              let P = null;
              if (
                (!a &&
                  u &&
                  (P = (function _E(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[7],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== P)
              )
                ((P.__ngLastListenerFn__ || P).__ngNextListenerFn__ = i),
                  (P.__ngLastListenerFn__ = i),
                  (h = !1);
              else {
                i = Yp(r, t, d, i, !1);
                const Q = n.listen(D, o, i);
                f.push(i, Q), c && c.push(o, _, M, M + 1);
              }
            } else i = Yp(r, t, d, i, !1);
            const p = r.outputs;
            let g;
            if (h && null !== p && (g = p[o])) {
              const v = g.length;
              if (v)
                for (let D = 0; D < v; D += 2) {
                  const ae = t[g[D]][g[D + 1]].subscribe(i),
                    er = f.length;
                  f.push(i, ae), c && c.push(o, r.index, er, -(er + 1));
                }
            }
          })(i, o, o[H], s, e, t, 0, r),
          Te
        );
      }
      function Zp(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (o) {
          return Op(e, o), !1;
        }
      }
      function Yp(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          al(2 & e.flags ? st(e.index, t) : t);
          let u = Zp(t, 0, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = Zp(t, 0, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function w(e, t = "") {
        const n = C(),
          r = W(),
          o = e + 22,
          i = r.firstCreatePass ? Ir(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function Tu(e, t) {
            return e.createText(t);
          })(n[H], t));
        Zi(r, n, s, i), Vt(i, !1);
      }
      const Vr = "en-US";
      let Hg = Vr;
      class Gn {}
      class gm {}
      class mm extends Gn {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new cl(this));
          const r = ot(t);
          (this._bootstrapComponents = tn(r.bootstrap)),
            (this._r3Injector = Kh(
              t,
              n,
              [
                { provide: Gn, useValue: this },
                { provide: Io, useValue: this.componentFactoryResolver },
              ],
              te(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Il extends gm {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new mm(this.moduleType, t);
        }
      }
      class aI extends Gn {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new cl(this)),
            (this.instance = null);
          const o = new ah(
            [
              ...t,
              { provide: Gn, useValue: this },
              { provide: Io, useValue: this.componentFactoryResolver },
            ],
            n || Gi(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function gs(e, t, n = null) {
        return new aI(e, t, n).injector;
      }
      let uI = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = rh(0, n.type),
                o =
                  r.length > 0
                    ? gs([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.??prov = U({
            token: e,
            providedIn: "environment",
            factory: () => new e(O(_n)),
          })),
          e
        );
      })();
      function ym(e) {
        e.getStandaloneInjector = (t) =>
          t.get(uI).getOrCreateStandaloneInjector(e);
      }
      function Sl(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const Qe = class NI extends kt {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = Sl(i)), o && (o = Sl(o)), s && (s = Sl(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof ft && t.add(a), a;
        }
      };
      function FI() {
        return this._results[Un()]();
      }
      class Pl {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = Un(),
            r = Pl.prototype;
          r[n] || (r[n] = FI);
        }
        get changes() {
          return this._changes || (this._changes = new Qe());
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          const r = this;
          r.dirty = !1;
          const o = at(t);
          (this._changesDetected = !(function AD(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let o = e[r],
                i = t[r];
              if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
            }
            return !0;
          })(r._results, o, n)) &&
            ((r._results = o),
            (r.length = o.length),
            (r.last = o[this.length - 1]),
            (r.first = o[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let on = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = jI), e;
      })();
      const kI = on,
        LI = class extends kI {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              o = ts(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (o[19] = s.createEmbeddedView(r)),
              el(r, o, t),
              new To(o)
            );
          }
        };
      function jI() {
        return ms(Ce(), C());
      }
      function ms(e, t) {
        return 4 & e.type ? new LI(t, e, Dr(e, t)) : null;
      }
      let Ot = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = VI), e;
      })();
      function VI() {
        return Om(Ce(), C());
      }
      const $I = Ot,
        Pm = class extends $I {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Dr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new dr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ri(this._hostTNode, this._hostLView);
            if (_f(t)) {
              const n = cr(t, this._hostLView),
                r = lr(t);
              return new dr(n[1].data[r + 8], n);
            }
            return new dr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = Tm(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function po(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const u = s ? t : new Oo(X(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const f = (s ? l : this.parentInjector).get(_n, null);
              f && (i = f);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1];
            if (
              (function YC(e) {
                return Et(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new Pm(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function T0(e, t, n, r) {
              const o = 10 + r,
                i = n.length;
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), Pf(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function O0(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 64);
            })(o, r, s, i);
            const a = Fu(i, s),
              u = r[H],
              l = Qi(u, s[7]);
            return (
              null !== l &&
                (function x0(e, t, n, r, o, i) {
                  (r[0] = o), (r[6] = t), Po(e, r, n, 1, o, i);
                })(o, s[6], u, r, l, a),
              t.attachToViewContainerRef(),
              Pf(Tl(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = Tm(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Au(this._lContainer, n);
            r && (ki(Tl(this._lContainer), n), Sh(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Au(this._lContainer, n);
            return r && null != ki(Tl(this._lContainer), n) ? new To(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function Tm(e) {
        return e[8];
      }
      function Tl(e) {
        return e[8] || (e[8] = []);
      }
      function Om(e, t) {
        let n;
        const r = t[e.index];
        if (Et(r)) n = r;
        else {
          let o;
          if (8 & e.type) o = pe(r);
          else {
            const i = t[H];
            o = i.createComment("");
            const s = yt(e, t);
            Bn(
              i,
              Qi(i, s),
              o,
              (function F0(e, t) {
                return e.nextSibling(t);
              })(i, s),
              !1
            );
          }
          (t[e.index] = n = xp(r, t, o, e)), rs(t, n);
        }
        return new Pm(n, e, t);
      }
      class Ol {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Ol(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Al {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r =
                null !== t.contentQueries ? t.contentQueries[0] : n.length,
              o = [];
            for (let i = 0; i < r; i++) {
              const s = n.getByIndex(i);
              o.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Al(o);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== km(t, n).matches && this.queries[n].setDirty();
        }
      }
      class Am {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class Rl {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const o = null !== n ? n.length : 0,
              i = this.getByIndex(r).embeddedTView(t, o);
            i &&
              ((i.indexInDeclarationView = r),
              null !== n ? n.push(i) : (n = [i]));
          }
          return null !== n ? new Rl(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Nl {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, n),
              new Nl(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let o = 0; o < r.length; o++) {
              const i = r[o];
              this.matchTNodeWithReadOption(t, n, HI(n, i)),
                this.matchTNodeWithReadOption(t, n, Fi(n, t, i, !1, !1));
            }
          else
            r === on
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, Fi(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const o = this.metadata.read;
            if (null !== o)
              if (o === vn || o === Ot || (o === on && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const i = Fi(n, t, o, !1, !1);
                null !== i && this.addMatch(n.index, i);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches
            ? (this.matches = [t, n])
            : this.matches.push(t, n);
        }
      }
      function HI(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function GI(e, t, n, r) {
        return -1 === n
          ? (function zI(e, t) {
              return 11 & e.type ? Dr(e, t) : 4 & e.type ? ms(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function qI(e, t, n) {
              return n === vn
                ? Dr(t, e)
                : n === on
                ? ms(t, e)
                : n === Ot
                ? Om(t, e)
                : void 0;
            })(e, t, r)
          : co(e, e[1], n, t);
      }
      function Rm(e, t, n, r) {
        const o = t[19].queries[r];
        if (null === o.matches) {
          const i = e.data,
            s = n.matches,
            a = [];
          for (let u = 0; u < s.length; u += 2) {
            const l = s[u];
            a.push(l < 0 ? null : GI(t, i[l], s[u + 1], n.metadata.read));
          }
          o.matches = a;
        }
        return o.matches;
      }
      function Fl(e, t, n, r) {
        const o = e.queries.getByIndex(n),
          i = o.matches;
        if (null !== i) {
          const s = Rm(e, t, o, n);
          for (let a = 0; a < i.length; a += 2) {
            const u = i[a];
            if (u > 0) r.push(s[a / 2]);
            else {
              const l = i[a + 1],
                c = t[-u];
              for (let d = 10; d < c.length; d++) {
                const f = c[d];
                f[17] === f[3] && Fl(f[1], f, l, r);
              }
              if (null !== c[9]) {
                const d = c[9];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  Fl(h[1], h, l, r);
                }
              }
            }
          }
        }
        return r;
      }
      function Me(e) {
        const t = C(),
          n = W(),
          r = uf();
        $a(r + 1);
        const o = km(n, r);
        if (
          e.dirty &&
          (function ZC(e) {
            return 4 == (4 & e[2]);
          })(t) ===
            (2 == (2 & o.metadata.flags))
        ) {
          if (null === o.matches) e.reset([]);
          else {
            const i = o.crossesNgTemplate ? Fl(n, t, r, []) : Rm(n, t, o, r);
            e.reset(i, Hw), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Ae(e, t, n) {
        const r = W();
        r.firstCreatePass &&
          (Fm(r, new Am(e, t, n), -1),
          2 == (2 & t) && (r.staticViewQueries = !0)),
          Nm(r, C(), t);
      }
      function kl(e, t, n, r) {
        const o = W();
        if (o.firstCreatePass) {
          const i = Ce();
          Fm(o, new Am(t, n, r), i.index),
            (function QI(e, t) {
              const n = e.contentQueries || (e.contentQueries = []);
              t !== (n.length ? n[n.length - 1] : -1) &&
                n.push(e.queries.length - 1, t);
            })(o, e),
            2 == (2 & n) && (o.staticContentQueries = !0);
        }
        Nm(o, C(), n);
      }
      function Ee() {
        return (function WI(e, t) {
          return e[19].queries[t].queryList;
        })(C(), uf());
      }
      function Nm(e, t, n) {
        const r = new Pl(4 == (4 & n));
        _p(e, t, r, r.destroy),
          null === t[19] && (t[19] = new Al()),
          t[19].queries.push(new Ol(r));
      }
      function Fm(e, t, n) {
        null === e.queries && (e.queries = new Rl()),
          e.queries.track(new Nl(t, n));
      }
      function km(e, t) {
        return e.queries.getByIndex(t);
      }
      function _s(...e) {}
      const vs = new L("Application Initializer");
      let Cs = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = _s),
              (this.reject = _s),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (ls(i)) n.push(i);
                else if (qp(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(O(vs, 8));
          }),
          (e.??prov = U({ token: e, factory: e.??fac, providedIn: "root" })),
          e
        );
      })();
      const Ho = new L("AppId", {
        providedIn: "root",
        factory: function ty() {
          return `${Bl()}${Bl()}${Bl()}`;
        },
      });
      function Bl() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const ny = new L("Platform Initializer"),
        ry = new L("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        oy = new L("appBootstrapListener");
      let gx = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)();
          }),
          (e.??prov = U({ token: e, factory: e.??fac, providedIn: "platform" })),
          e
        );
      })();
      const sn = new L("LocaleId", {
        providedIn: "root",
        factory: () =>
          fe(sn, R.Optional | R.SkipSelf) ||
          (function mx() {
            return (typeof $localize < "u" && $localize.locale) || Vr;
          })(),
      });
      class _x {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Ul = (() => {
        class e {
          compileModuleSync(n) {
            return new Il(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = tn(ot(n).declarations).reduce((s, a) => {
                const u = X(a);
                return u && s.push(new Oo(u)), s;
              }, []);
            return new _x(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)();
          }),
          (e.??prov = U({ token: e, factory: e.??fac, providedIn: "root" })),
          e
        );
      })();
      const Dx = (() => Promise.resolve(0))();
      function Hl(e) {
        typeof Zone > "u"
          ? Dx.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class be {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Qe(!1)),
            (this.onMicrotaskEmpty = new Qe(!1)),
            (this.onStable = new Qe(!1)),
            (this.onError = new Qe(!1)),
            typeof Zone > "u")
          )
            throw new I(908, !1);
          Zone.assertZonePatched();
          const o = this;
          if (
            ((o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const i = Zone.AsyncStackTaggingZoneSpec;
            o._inner = o._inner.fork(new i("Angular"));
          }
          Zone.TaskTrackingZoneSpec &&
            (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function wx() {
              let e = re.requestAnimationFrame,
                t = re.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function bx(e) {
              const t = () => {
                !(function Ex(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(re, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Gl(e),
                                (e.isCheckStableRunning = !0),
                                zl(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Gl(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return ay(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      uy(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return ay(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), uy(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Gl(e),
                          zl(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!be.isInAngularZone()) throw new I(909, !1);
        }
        static assertNotInAngularZone() {
          if (be.isInAngularZone()) throw new I(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, Mx, _s, _s);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const Mx = {};
      function zl(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Gl(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function ay(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function uy(e) {
        e._nesting--, zl(e);
      }
      class Ix {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Qe()),
            (this.onMicrotaskEmpty = new Qe()),
            (this.onStable = new Qe()),
            (this.onError = new Qe());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const ly = new L(""),
        Ds = new L("");
      let Ql,
        ql = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Ql ||
                  ((function xx(e) {
                    Ql = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      be.assertNotInAngularZone(),
                        Hl(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Hl(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)(O(be), O(Wl), O(Ds));
            }),
            (e.??prov = U({ token: e, factory: e.??fac })),
            e
          );
        })(),
        Wl = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Ql?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)();
            }),
            (e.??prov = U({
              token: e,
              factory: e.??fac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        wn = null;
      const cy = new L("AllowMultipleToken"),
        Zl = new L("PlatformDestroyListeners");
      class dy {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function hy(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new L(r);
        return (i = []) => {
          let s = Yl();
          if (!s || s.injector.get(cy, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function Tx(e) {
                  if (wn && !wn.get(cy, !1)) throw new I(400, !1);
                  wn = e;
                  const t = e.get(gy);
                  (function fy(e) {
                    const t = e.get(ny, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function py(e = [], t) {
                    return xt.create({
                      name: t,
                      providers: [
                        { provide: hu, useValue: "platform" },
                        { provide: Zl, useValue: new Set([() => (wn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function Ax(e) {
            const t = Yl();
            if (!t) throw new I(401, !1);
            return t;
          })();
        };
      }
      function Yl() {
        return wn?.get(gy) ?? null;
      }
      let gy = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function yy(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new Ix()
                      : ("zone.js" === e ? void 0 : e) || new be(t)),
                  n
                );
              })(
                r?.ngZone,
                (function my(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: be, useValue: o }];
            return o.run(() => {
              const s = xt.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                u = a.injector.get(wr, null);
              if (!u) throw new I(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const l = o.onError.subscribe({
                    next: (c) => {
                      u.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    Ms(this._modules, a), l.unsubscribe();
                  });
                }),
                (function _y(e, t, n) {
                  try {
                    const r = n();
                    return ls(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(u, o, () => {
                  const l = a.injector.get(Cs);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function zg(e) {
                          rt(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Hg = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(sn, Vr) || Vr),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = vy({}, r);
            return (function Sx(e, t, n) {
              const r = new Il(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(ws);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new I(403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new I(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Zl, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(O(xt));
          }),
          (e.??prov = U({ token: e, factory: e.??fac, providedIn: "platform" })),
          e
        );
      })();
      function vy(e, t) {
        return Array.isArray(t) ? t.reduce(vy, e) : { ...e, ...t };
      }
      let ws = (() => {
        class e {
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new _e((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new _e((a) => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    be.assertNotInAngularZone(),
                      Hl(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const l = this._zone.onUnstable.subscribe(() => {
                  be.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), l.unsubscribe();
                };
              });
            this.isStable = (function _C(...e) {
              const t = eo(e),
                n = (function dC(e, t) {
                  return "number" == typeof ya(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? Lt(r[0])
                  : tr(n)(ve(r, t))
                : Qt;
            })(
              i,
              s.pipe(
                (function vC(e = {}) {
                  const {
                    connector: t = () => new kt(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      u,
                      l = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = u = void 0), (c = d = !1);
                      },
                      p = () => {
                        const g = s;
                        h(), g?.unsubscribe();
                      };
                    return xe((g, v) => {
                      l++, !d && !c && f();
                      const D = (u = u ?? t());
                      v.add(() => {
                        l--, 0 === l && !d && !c && (a = _a(p, o));
                      }),
                        D.subscribe(v),
                        !s &&
                          l > 0 &&
                          ((s = new Xr({
                            next: (M) => D.next(M),
                            error: (M) => {
                              (d = !0), f(), (a = _a(h, n, M)), D.error(M);
                            },
                            complete: () => {
                              (c = !0), f(), (a = _a(h, r)), D.complete();
                            },
                          })),
                          Lt(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof lh;
            if (!this._injector.get(Cs).done)
              throw (
                (!o &&
                  (function rr(e) {
                    const t = X(e) || Ue(e) || He(e);
                    return null !== t && t.standalone;
                  })(n),
                new I(405, false))
              );
            let s;
            (s = o ? n : this._injector.get(Io).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function Px(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Gn),
              l = s.create(xt.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(ly, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  Ms(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new I(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Ms(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(oy, [])
                .concat(this._bootstrapListeners)
                .forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Ms(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new I(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(O(be), O(_n), O(wr));
          }),
          (e.??prov = U({ token: e, factory: e.??fac, providedIn: "root" })),
          e
        );
      })();
      function Ms(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Dy = !0,
        Kl = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = Fx), e;
        })();
      function Fx(e) {
        return (function kx(e, t, n) {
          if (Mi(e) && !n) {
            const r = st(e.index, t);
            return new To(r, r);
          }
          return 47 & e.type ? new To(t[16], t) : null;
        })(Ce(), C(), 16 == (16 & e));
      }
      const Zx = hy(null, "core", []);
      let Yx = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(O(ws));
          }),
          (e.??mod = Rn({ type: e })),
          (e.??inj = fn({})),
          e
        );
      })();
      function Ur(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      let xs = null;
      function Mn() {
        return xs;
      }
      const et = new L("DocumentToken");
      let nc = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)();
          }),
          (e.??prov = U({
            token: e,
            factory: function () {
              return (function e1() {
                return O(Ay);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const t1 = new L("Location Initialized");
      let Ay = (() => {
        class e extends nc {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Mn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Mn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Mn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(n) {
            this.location.pathname = n;
          }
          pushState(n, r, o) {
            Ry() ? this._history.pushState(n, r, o) : (this.location.hash = o);
          }
          replaceState(n, r, o) {
            Ry()
              ? this._history.replaceState(n, r, o)
              : (this.location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(O(et));
          }),
          (e.??prov = U({
            token: e,
            factory: function () {
              return (function n1() {
                return new Ay(O(et));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function Ry() {
        return !!window.history.pushState;
      }
      function rc(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function Ny(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function un(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Wn = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)();
          }),
          (e.??prov = U({
            token: e,
            factory: function () {
              return fe(ky);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const Fy = new L("appBaseHref");
      let ky = (() => {
          class e extends Wn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  fe(et).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return rc(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  un(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + un(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + un(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)(O(nc), O(Fy, 8));
            }),
            (e.??prov = U({ token: e, factory: e.??fac, providedIn: "root" })),
            e
          );
        })(),
        r1 = (() => {
          class e extends Wn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = rc(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + un(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + un(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)(O(nc), O(Fy, 8));
            }),
            (e.??prov = U({ token: e, factory: e.??fac })),
            e
          );
        })(),
        oc = (() => {
          class e {
            constructor(n) {
              (this._subject = new Qe()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._baseHref = Ny(Ly(r))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + un(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function i1(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t;
                })(this._baseHref, Ly(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + un(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + un(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = un),
            (e.joinWithSlash = rc),
            (e.stripTrailingSlash = Ny),
            (e.??fac = function (n) {
              return new (n || e)(O(Wn));
            }),
            (e.??prov = U({
              token: e,
              factory: function () {
                return (function o1() {
                  return new oc(O(Wn));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function Ly(e) {
        return e.replace(/\/index.html$/, "");
      }
      let Ls = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new Q1()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            Zy("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            Zy("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(x(Ot), x(on));
          }),
          (e.??dir = Fe({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class Q1 {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Zy(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${te(t)}'.`
          );
      }
      let DS = (() => {
        class e {}
        return (
          (e.??fac = function (n) {
            return new (n || e)();
          }),
          (e.??mod = Rn({ type: e })),
          (e.??inj = fn({})),
          e
        );
      })();
      let bS = (() => {
        class e {}
        return (
          (e.??prov = U({
            token: e,
            providedIn: "root",
            factory: () => new IS(O(et), window),
          })),
          e
        );
      })();
      class IS {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function xS(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              Xy(this.window.history) ||
              Xy(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function Xy(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class Cc extends class qS extends class Xx {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function Jx(e) {
            xs || (xs = e);
          })(new Cc());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function WS() {
            return (
              (Qo = Qo || document.querySelector("base")),
              Qo ? Qo.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function QS(e) {
                (Vs = Vs || document.createElement("a")),
                  Vs.setAttribute("href", e);
                const t = Vs.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Qo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function U1(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Vs,
        Qo = null;
      const r_ = new L("TRANSITION_ID"),
        YS = [
          {
            provide: vs,
            useFactory: function ZS(e, t, n) {
              return () => {
                n.get(Cs).donePromise.then(() => {
                  const r = Mn(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [r_, et, xt],
            multi: !0,
          },
        ];
      let JS = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)();
          }),
          (e.??prov = U({ token: e, factory: e.??fac })),
          e
        );
      })();
      const $s = new L("EventManagerPlugins");
      let Bs = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => (o.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(O($s), O(be));
          }),
          (e.??prov = U({ token: e, factory: e.??fac })),
          e
        );
      })();
      class o_ {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = Mn().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let i_ = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((o) => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)();
            }),
            (e.??prov = U({ token: e, factory: e.??fac })),
            e
          );
        })(),
        Zo = (() => {
          class e extends i_ {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, o) {
              n.forEach((i) => {
                const s = this._doc.createElement("style");
                (s.textContent = i), o.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(s_), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(s_));
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)(O(et));
            }),
            (e.??prov = U({ token: e, factory: e.??fac })),
            e
          );
        })();
      function s_(e) {
        Mn().remove(e);
      }
      const Dc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        wc = /%COMP%/g;
      function Us(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let o = t[r];
          Array.isArray(o) ? Us(e, o, n) : ((o = o.replace(wc, e)), n.push(o));
        }
        return n;
      }
      function l_(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Mc = (() => {
        class e {
          constructor(n, r, o) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Ec(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case jt.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new oP(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(n),
                  o
                );
              }
              case 1:
              case jt.ShadowDom:
                return new iP(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = Us(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(o),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(O(Bs), O(Zo), O(Ho));
          }),
          (e.??prov = U({ token: e, factory: e.??fac })),
          e
        );
      })();
      class Ec {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Dc[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (d_(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (d_(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = Dc[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Dc[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (Je.DashCase | Je.Important)
            ? t.style.setProperty(n, r, o & Je.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Je.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, l_(r))
            : this.eventManager.addEventListener(t, n, l_(r));
        }
      }
      function d_(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class oP extends Ec {
        constructor(t, n, r, o) {
          super(t), (this.component = r);
          const i = Us(o + "-" + r.id, r.styles, []);
          n.addStyles(i),
            (this.contentAttr = (function tP(e) {
              return "_ngcontent-%COMP%".replace(wc, e);
            })(o + "-" + r.id)),
            (this.hostAttr = (function nP(e) {
              return "_nghost-%COMP%".replace(wc, e);
            })(o + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class iP extends Ec {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Us(o.id, o.styles, []);
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement("style");
            (a.textContent = i[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let sP = (() => {
        class e extends o_ {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(O(et));
          }),
          (e.??prov = U({ token: e, factory: e.??fac })),
          e
        );
      })();
      const f_ = ["alt", "control", "meta", "shift"],
        aP = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        uP = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let lP = (() => {
        class e extends o_ {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Mn().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              f_.forEach((l) => {
                const c = r.indexOf(l);
                c > -1 && (r.splice(c, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = aP[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                f_.forEach((s) => {
                  s !== o && (0, uP[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(O(et));
          }),
          (e.??prov = U({ token: e, factory: e.??fac })),
          e
        );
      })();
      const hP = hy(Zx, "browser", [
          { provide: ry, useValue: "browser" },
          {
            provide: ny,
            useValue: function cP() {
              Cc.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: et,
            useFactory: function fP() {
              return (
                (function rw(e) {
                  nu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        g_ = new L(""),
        m_ = [
          {
            provide: Ds,
            useClass: class KS {
              addToWindow(t) {
                (re.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (re.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (re.getAllAngularRootElements = () => t.getAllRootElements()),
                  re.frameworkStabilizers || (re.frameworkStabilizers = []),
                  re.frameworkStabilizers.push((r) => {
                    const o = re.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach(function (u) {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Mn().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: ly, useClass: ql, deps: [be, Wl, Ds] },
          { provide: ql, useClass: ql, deps: [be, Wl, Ds] },
        ],
        y_ = [
          { provide: hu, useValue: "root" },
          {
            provide: wr,
            useFactory: function dP() {
              return new wr();
            },
            deps: [],
          },
          { provide: $s, useClass: sP, multi: !0, deps: [et, be, ry] },
          { provide: $s, useClass: lP, multi: !0, deps: [et] },
          { provide: Mc, useClass: Mc, deps: [Bs, Zo, Ho] },
          { provide: dh, useExisting: Mc },
          { provide: i_, useExisting: Zo },
          { provide: Zo, useClass: Zo, deps: [et] },
          { provide: Bs, useClass: Bs, deps: [$s, be] },
          { provide: class SS {}, useClass: JS, deps: [] },
          [],
        ];
      let pP = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Ho, useValue: n.appId },
                  { provide: r_, useExisting: Ho },
                  YS,
                ],
              };
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)(O(g_, 12));
            }),
            (e.??mod = Rn({ type: e })),
            (e.??inj = fn({ providers: [...y_, ...m_], imports: [DS, Yx] })),
            e
          );
        })(),
        __ = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)(O(et));
            }),
            (e.??prov = U({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function mP() {
                        return new __(O(et));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function T(...e) {
        return ve(e, eo(e));
      }
      typeof window < "u" && window;
      class Ft extends kt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const Hs = Kr(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: EP } = Array,
        { getPrototypeOf: bP, prototype: IP, keys: xP } = Object;
      const { isArray: TP } = Array;
      function D_(...e) {
        const t = eo(e),
          n = (function cC(e) {
            return ne(ya(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function SP(e) {
            if (1 === e.length) {
              const t = e[0];
              if (EP(t)) return { args: t, keys: null };
              if (
                (function PP(e) {
                  return e && "object" == typeof e && bP(e) === IP;
                })(t)
              ) {
                const n = xP(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return ve([], t);
        const i = new _e(
          (function NP(e, t, n = On) {
            return (r) => {
              w_(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    w_(
                      t,
                      () => {
                        const l = ve(e[u], t);
                        let c = !1;
                        l.subscribe(
                          Se(
                            r,
                            (d) => {
                              (i[u] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            o
              ? (s) =>
                  (function RP(e, t) {
                    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
                  })(o, s)
              : On
          )
        );
        return n
          ? i.pipe(
              (function AP(e) {
                return Z((t) =>
                  (function OP(e, t) {
                    return TP(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : i;
      }
      function w_(e, t, n) {
        e ? Wt(n, e, t) : t();
      }
      function xc(...e) {
        return (function FP() {
          return tr(1);
        })()(ve(e, eo(e)));
      }
      function M_(e) {
        return new _e((t) => {
          Lt(e()).subscribe(t);
        });
      }
      function Yo(e, t) {
        const n = ne(e) ? e : () => e,
          r = (o) => o.error(n());
        return new _e(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function Sc() {
        return xe((e, t) => {
          let n = null;
          e._refCount++;
          const r = Se(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class E_ extends _e {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Md(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new ft();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Se(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = ft.EMPTY));
          }
          return t;
        }
        refCount() {
          return Sc()(this);
        }
      }
      function Gt(e, t) {
        return xe((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Se(
              r,
              (u) => {
                o?.unsubscribe();
                let l = 0;
                const c = i++;
                Lt(e(u, c)).subscribe(
                  (o = Se(
                    r,
                    (d) => r.next(t ? t(u, d, c, l++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Ko(e) {
        return e <= 0
          ? () => Qt
          : xe((t, n) => {
              let r = 0;
              t.subscribe(
                Se(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function bn(e, t) {
        return xe((n, r) => {
          let o = 0;
          n.subscribe(Se(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function zs(e) {
        return xe((t, n) => {
          let r = !1;
          t.subscribe(
            Se(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function b_(e = LP) {
        return xe((t, n) => {
          let r = !1;
          t.subscribe(
            Se(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function LP() {
        return new Hs();
      }
      function In(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? bn((o, i) => e(o, i, r)) : On,
            Ko(1),
            n ? zs(t) : b_(() => new Hs())
          );
      }
      function Qn(e, t) {
        return ne(t) ? Oe(e, t, 1) : Oe(e, 1);
      }
      function Be(e, t, n) {
        const r = ne(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? xe((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Se(
                  i,
                  (u) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, l;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : On;
      }
      function xn(e) {
        return xe((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            Se(n, void 0, void 0, (s) => {
              (i = Lt(e(s, xn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function jP(e, t, n, r, o) {
        return (i, s) => {
          let a = n,
            u = t,
            l = 0;
          i.subscribe(
            Se(
              s,
              (c) => {
                const d = l++;
                (u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u);
              },
              o &&
                (() => {
                  a && s.next(u), s.complete();
                })
            )
          );
        };
      }
      function I_(e, t) {
        return xe(jP(e, t, arguments.length >= 2, !0));
      }
      function Pc(e) {
        return e <= 0
          ? () => Qt
          : xe((t, n) => {
              let r = [];
              t.subscribe(
                Se(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function x_(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? bn((o, i) => e(o, i, r)) : On,
            Pc(1),
            n ? zs(t) : b_(() => new Hs())
          );
      }
      function Tc(e) {
        return xe((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const z = "primary",
        Jo = Symbol("RouteTitle");
      class BP {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Hr(e) {
        return new BP(e);
      }
      function UP(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function qt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !S_(e[o], t[o]))) return !1;
        return !0;
      }
      function S_(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function P_(e) {
        return Array.prototype.concat.apply([], e);
      }
      function T_(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Re(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function Sn(e) {
        return qp(e) ? e : ls(e) ? ve(Promise.resolve(e)) : T(e);
      }
      const GP = {
          exact: function R_(e, t, n) {
            if (
              !Yn(e.segments, t.segments) ||
              !Gs(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !R_(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: N_,
        },
        O_ = {
          exact: function qP(e, t) {
            return qt(e, t);
          },
          subset: function WP(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => S_(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function A_(e, t, n) {
        return (
          GP[n.paths](e.root, t.root, n.matrixParams) &&
          O_[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function N_(e, t, n) {
        return F_(e, t, t.segments, n);
      }
      function F_(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!Yn(o, n) || t.hasChildren() || !Gs(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Yn(e.segments, n) || !Gs(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !N_(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(Yn(e.segments, o) && Gs(e.segments, o, r) && e.children[z]) &&
            F_(e.children[z], t, i, r)
          );
        }
      }
      function Gs(e, t, n) {
        return t.every((r, o) => O_[n](e[o].parameters, r.parameters));
      }
      class Zn {
        constructor(t, n, r) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Hr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return YP.serialize(this);
        }
      }
      class G {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Re(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return qs(this);
        }
      }
      class Xo {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Hr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return V_(this);
        }
      }
      function Yn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let k_ = (() => {
        class e {}
        return (
          (e.??fac = function (n) {
            return new (n || e)();
          }),
          (e.??prov = U({
            token: e,
            factory: function () {
              return new Ac();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class Ac {
        parse(t) {
          const n = new iT(t);
          return new Zn(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${ei(t.root, !0)}`,
            r = (function XP(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${Ws(n)}=${Ws(o)}`).join("&")
                    : `${Ws(n)}=${Ws(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function KP(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const YP = new Ac();
      function qs(e) {
        return e.segments.map((t) => V_(t)).join("/");
      }
      function ei(e, t) {
        if (!e.hasChildren()) return qs(e);
        if (t) {
          const n = e.children[z] ? ei(e.children[z], !1) : "",
            r = [];
          return (
            Re(e.children, (o, i) => {
              i !== z && r.push(`${i}:${ei(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function ZP(e, t) {
            let n = [];
            return (
              Re(e.children, (r, o) => {
                o === z && (n = n.concat(t(r, o)));
              }),
              Re(e.children, (r, o) => {
                o !== z && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === z ? [ei(e.children[z], !1)] : [`${o}:${ei(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[z]
            ? `${qs(e)}/${n[0]}`
            : `${qs(e)}/(${n.join("//")})`;
        }
      }
      function L_(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ws(e) {
        return L_(e).replace(/%3B/gi, ";");
      }
      function Rc(e) {
        return L_(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Qs(e) {
        return decodeURIComponent(e);
      }
      function j_(e) {
        return Qs(e.replace(/\+/g, "%20"));
      }
      function V_(e) {
        return `${Rc(e.path)}${(function JP(e) {
          return Object.keys(e)
            .map((t) => `;${Rc(t)}=${Rc(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const eT = /^[^\/()?;=#]+/;
      function Zs(e) {
        const t = e.match(eT);
        return t ? t[0] : "";
      }
      const tT = /^[^=?&#]+/,
        rT = /^[^&#]+/;
      class iT {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new G([], {})
              : new G([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[z] = new G(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Zs(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new I(4009, !1);
          return this.capture(t), new Xo(Qs(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = Zs(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Zs(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Qs(n)] = Qs(r);
        }
        parseQueryParam(t) {
          const n = (function nT(e) {
            const t = e.match(tT);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function oT(e) {
              const t = e.match(rT);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = j_(n),
            i = j_(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Zs(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new I(4010, !1);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = z);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[z] : new G([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new I(4011, !1);
        }
      }
      function Nc(e) {
        return e.segments.length > 0 ? new G([], { [z]: e }) : e;
      }
      function Ys(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Ys(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function sT(e) {
          if (1 === e.numberOfChildren && e.children[z]) {
            const t = e.children[z];
            return new G(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new G(e.segments, t));
      }
      function Kn(e) {
        return e instanceof Zn;
      }
      function lT(e, t, n, r, o) {
        if (0 === n.length) return zr(t.root, t.root, t.root, r, o);
        const i = (function U_(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new B_(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Re(i.outlets, (u, l) => {
                    a[l] = "string" == typeof u ? u.split("/") : u;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new B_(n, t, r);
        })(n);
        return i.toRoot()
          ? zr(t.root, t.root, new G([], {}), r, o)
          : (function s(u) {
              const l = (function dT(e, t, n, r) {
                  if (e.isAbsolute) return new Gr(t.root, !0, 0);
                  if (-1 === r) return new Gr(n, n === t.root, 0);
                  return (function H_(e, t, n) {
                    let r = e,
                      o = t,
                      i = n;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r)) throw new I(4005, !1);
                      o = r.segments.length;
                    }
                    return new Gr(r, !1, o - i);
                  })(n, r + (ti(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, t, e.snapshot?._urlSegment, u),
                c = l.processChildren
                  ? ri(l.segmentGroup, l.index, i.commands)
                  : kc(l.segmentGroup, l.index, i.commands);
              return zr(t.root, l.segmentGroup, c, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function ti(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function ni(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function zr(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Re(r, (u, l) => {
            i[l] = Array.isArray(u) ? u.map((c) => `${c}`) : `${u}`;
          }),
          (s = e === t ? n : $_(e, t, n));
        const a = Nc(Ys(s));
        return new Zn(a, i, o);
      }
      function $_(e, t, n) {
        const r = {};
        return (
          Re(e.children, (o, i) => {
            r[i] = o === t ? n : $_(o, t, n);
          }),
          new G(e.segments, r)
        );
      }
      class B_ {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && ti(r[0]))
          )
            throw new I(4003, !1);
          const o = r.find(ni);
          if (o && o !== T_(r)) throw new I(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Gr {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function kc(e, t, n) {
        if (
          (e || (e = new G([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return ri(e, t, n);
        const r = (function hT(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (ni(a)) break;
              const u = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!G_(u, l, s)) return i;
                r += 2;
              } else {
                if (!G_(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new G(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[z] = new G(e.segments.slice(r.pathIndex), e.children)),
            ri(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new G(e.segments, {})
          : r.match && !e.hasChildren()
          ? Lc(e, t, n)
          : r.match
          ? ri(e, 0, o)
          : Lc(e, t, n);
      }
      function ri(e, t, n) {
        if (0 === n.length) return new G(e.segments, {});
        {
          const r = (function fT(e) {
              return ni(e[0]) ? e[0].outlets : { [z]: e };
            })(n),
            o = {};
          return (
            Re(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = kc(e.children[s], t, i));
            }),
            Re(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new G(e.segments, o)
          );
        }
      }
      function Lc(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (ni(i)) {
            const u = pT(i.outlets);
            return new G(r, u);
          }
          if (0 === o && ti(n[0])) {
            r.push(new Xo(e.segments[t].path, z_(n[0]))), o++;
            continue;
          }
          const s = ni(i) ? i.outlets[z] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && ti(a)
            ? (r.push(new Xo(s, z_(a))), (o += 2))
            : (r.push(new Xo(s, {})), o++);
        }
        return new G(r, {});
      }
      function pT(e) {
        const t = {};
        return (
          Re(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = Lc(new G([], {}), 0, n));
          }),
          t
        );
      }
      function z_(e) {
        const t = {};
        return Re(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function G_(e, t, n) {
        return e == n.path && qt(t, n.parameters);
      }
      class cn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class jc extends cn {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Jn extends cn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Ks extends cn {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class q_ extends cn {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class gT extends cn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class mT extends cn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class yT extends cn {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class _T extends cn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class vT extends cn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class CT {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class DT {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class wT {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class MT {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class ET {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class bT {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class W_ {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class Q_ {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Vc(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Vc(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = $c(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return $c(t, this._root).map((n) => n.value);
        }
      }
      function Vc(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Vc(e, n);
          if (r) return r;
        }
        return null;
      }
      function $c(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = $c(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class dn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function qr(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class Z_ extends Q_ {
        constructor(t, n) {
          super(t), (this.snapshot = n), Bc(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Y_(e, t) {
        const n = (function xT(e, t) {
            const s = new Js([], {}, {}, "", {}, z, t, null, e.root, -1, {});
            return new J_("", new dn(s, []));
          })(e, t),
          r = new Ft([new Xo("", {})]),
          o = new Ft({}),
          i = new Ft({}),
          s = new Ft({}),
          a = new Ft(""),
          u = new Xn(r, o, s, a, i, z, t, n.root);
        return (u.snapshot = n.root), new Z_(new dn(u, []), n);
      }
      class Xn {
        constructor(t, n, r, o, i, s, a, u) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(Z((l) => l[Jo])) ?? T(void 0)),
            (this._futureSnapshot = u);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(Z((t) => Hr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(Z((t) => Hr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function K_(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function ST(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Js {
        constructor(t, n, r, o, i, s, a, u, l, c, d, f) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.[Jo]),
            (this.routeConfig = u),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._correctedLastPathIndex = f ?? c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Hr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Hr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class J_ extends Q_ {
        constructor(t, n) {
          super(n), (this.url = t), Bc(this, n);
        }
        toString() {
          return X_(this._root);
        }
      }
      function Bc(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Bc(e, n));
      }
      function X_(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(X_).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Uc(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            qt(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            qt(t.params, n.params) || e.params.next(n.params),
            (function HP(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!qt(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            qt(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Hc(e, t) {
        const n =
          qt(e.params, t.params) &&
          (function QP(e, t) {
            return (
              Yn(e, t) && e.every((n, r) => qt(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Hc(e.parent, t.parent))
        );
      }
      function oi(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function TT(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return oi(e, r, o);
              return oi(e, r);
            });
          })(e, t, n);
          return new dn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => oi(e, a))),
                s
              );
            }
          }
          const r = (function OT(e) {
              return new Xn(
                new Ft(e.url),
                new Ft(e.params),
                new Ft(e.queryParams),
                new Ft(e.fragment),
                new Ft(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => oi(e, i));
          return new dn(r, o);
        }
      }
      const zc = "ngNavigationCancelingError";
      function ev(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = Kn(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = tv(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function tv(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[zc] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function nv(e) {
        return rv(e) && Kn(e.url);
      }
      function rv(e) {
        return e && e[zc];
      }
      class AT {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new ii()),
            (this.attachRef = null);
        }
      }
      let ii = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new AT()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)();
          }),
          (e.??prov = U({ token: e, factory: e.??fac, providedIn: "root" })),
          e
        );
      })();
      const Xs = !1;
      let Gc = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.parentContexts = n),
              (this.location = r),
              (this.changeDetector = i),
              (this.environmentInjector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new Qe()),
              (this.deactivateEvents = new Qe()),
              (this.attachEvents = new Qe()),
              (this.detachEvents = new Qe()),
              (this.name = o || z),
              n.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.getContext(this.name)?.outlet === this &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name);
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.injector));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new I(4012, Xs);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new I(4012, Xs);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new I(4012, Xs);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new I(4013, Xs);
            this._activatedRoute = n;
            const o = this.location,
              s = n._futureSnapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new RT(n, a, o.injector);
            if (
              r &&
              (function NT(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const l = r.resolveComponentFactory(s);
              this.activated = o.createComponent(l, o.length, u);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: u,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(x(ii), x(Ot), fo("name"), x(Kl), x(_n));
          }),
          (e.??dir = Fe({
            type: e,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
          })),
          e
        );
      })();
      class RT {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Xn
            ? this.route
            : t === ii
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let qc = (() => {
        class e {}
        return (
          (e.??fac = function (n) {
            return new (n || e)();
          }),
          (e.??cmp = pt({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [ym],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && S(0, "router-outlet");
            },
            dependencies: [Gc],
            encapsulation: 2,
          })),
          e
        );
      })();
      function ov(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = gs(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function Qc(e) {
        const t = e.children && e.children.map(Qc),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== z &&
            (n.component = qc),
          n
        );
      }
      function Dt(e) {
        return e.outlet || z;
      }
      function iv(e, t) {
        const n = e.filter((r) => Dt(r) === t);
        return n.push(...e.filter((r) => Dt(r) !== t)), n;
      }
      function si(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class VT {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Uc(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = qr(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Re(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = qr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = qr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = qr(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new bT(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new MT(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Uc(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Uc(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = si(o.snapshot),
                u = a?.get(Io) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = u),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class sv {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class ea {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function $T(e, t, n) {
        const r = e._root;
        return ai(r, t ? t._root : null, n, [r.value]);
      }
      function Wr(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function IC(e) {
              return null !== yi(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function ai(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = qr(t);
        return (
          e.children.forEach((s) => {
            (function UT(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function HT(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Yn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Yn(e.url, t.url) || !qt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Hc(e, t) || !qt(e.queryParams, t.queryParams);
                    default:
                      return !Hc(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new sv(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  ai(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new ea(a.outlet.component, s));
              } else
                s && ui(t, a, o),
                  o.canActivateChecks.push(new sv(r)),
                  ai(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Re(i, (s, a) => ui(s, n.getContext(a), o)),
          o
        );
      }
      function ui(e, t, n) {
        const r = qr(e),
          o = e.value;
        Re(r, (i, s) => {
          ui(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new ea(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function li(e) {
        return "function" == typeof e;
      }
      function Zc(e) {
        return e instanceof Hs || "EmptyError" === e?.name;
      }
      const ta = Symbol("INITIAL_VALUE");
      function Qr() {
        return Gt((e) =>
          D_(
            e.map((t) =>
              t.pipe(
                Ko(1),
                (function kP(...e) {
                  const t = eo(e);
                  return xe((n, r) => {
                    (t ? xc(e, n, t) : xc(e, n)).subscribe(r);
                  });
                })(ta)
              )
            )
          ).pipe(
            Z((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === ta) return ta;
                  if (!1 === n || n instanceof Zn) return n;
                }
              return !0;
            }),
            bn((t) => t !== ta),
            Ko(1)
          )
        );
      }
      function av(e) {
        return (function zv(...e) {
          return Cd(e);
        })(
          Be((t) => {
            if (Kn(t)) throw ev(0, t);
          }),
          Z((t) => !0 === t)
        );
      }
      const Yc = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function uv(e, t, n, r, o) {
        const i = Kc(e, t, n);
        return i.matched
          ? (function sO(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? T(
                    o.map((s) => {
                      const a = Wr(s, e);
                      return Sn(
                        (function ZT(e) {
                          return e && li(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(Qr(), av())
                : T(!0);
            })((r = ov(t, r)), t, n).pipe(Z((s) => (!0 === s ? i : { ...Yc })))
          : T(i);
      }
      function Kc(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Yc }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || UP)(n, e, t);
        if (!o) return { ...Yc };
        const i = {};
        Re(o.posParams, (a, u) => {
          i[u] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function na(e, t, n, r, o = "corrected") {
        if (
          n.length > 0 &&
          (function lO(e, t, n) {
            return n.some((r) => ra(e, t, r) && Dt(r) !== z);
          })(e, n, r)
        ) {
          const s = new G(
            t,
            (function uO(e, t, n, r) {
              const o = {};
              (o[z] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && Dt(i) !== z) {
                  const s = new G([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[Dt(i)] = s);
                }
              return o;
            })(e, t, r, new G(n, e.children))
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function cO(e, t, n) {
            return n.some((r) => ra(e, t, r));
          })(e, n, r)
        ) {
          const s = new G(
            e.segments,
            (function aO(e, t, n, r, o, i) {
              const s = {};
              for (const a of r)
                if (ra(e, n, a) && !o[Dt(a)]) {
                  const u = new G([], {});
                  (u._sourceSegment = e),
                    (u._segmentIndexShift =
                      "legacy" === i ? e.segments.length : t.length),
                    (s[Dt(a)] = u);
                }
              return { ...o, ...s };
            })(e, t, n, r, e.children, o)
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: n }
          );
        }
        const i = new G(e.segments, e.children);
        return (
          (i._sourceSegment = e),
          (i._segmentIndexShift = t.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function ra(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function lv(e, t, n, r) {
        return (
          !!(Dt(e) === r || (r !== z && ra(t, n, e))) &&
          ("**" === e.path || Kc(t, e, n).matched)
        );
      }
      function cv(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const oa = !1;
      class ia {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class dv {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function ci(e) {
        return Yo(new ia(e));
      }
      function fv(e) {
        return Yo(new dv(e));
      }
      class pO {
        constructor(t, n, r, o, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = na(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new G(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, z)
            .pipe(
              Z((i) =>
                this.createUrlTree(
                  Ys(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              xn((i) => {
                if (i instanceof dv)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof ia ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, z)
            .pipe(
              Z((o) => this.createUrlTree(Ys(o), t.queryParams, t.fragment))
            )
            .pipe(
              xn((o) => {
                throw o instanceof ia ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new I(4002, oa);
        }
        createUrlTree(t, n, r) {
          const o = Nc(t);
          return new Zn(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(Z((i) => new G([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return ve(o).pipe(
            Qn((i) => {
              const s = r.children[i],
                a = iv(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                Z((u) => ({ segment: u, outlet: i }))
              );
            }),
            I_((i, s) => ((i[s.outlet] = s.segment), i), {}),
            x_()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return ve(r).pipe(
            Qn((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                xn((l) => {
                  if (l instanceof ia) return T(null);
                  throw l;
                })
              )
            ),
            In((a) => !!a),
            xn((a, u) => {
              if (Zc(a)) return cv(n, o, i) ? T(new G([], {})) : ci(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return lv(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : ci(n)
            : ci(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? fv(i)
            : this.lineralizeSegments(r, i).pipe(
                Oe((s) => {
                  const a = new G(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: l,
            positionalParamSegments: c,
          } = Kc(n, o, i);
          if (!a) return ci(n);
          const d = this.applyRedirectCommands(u, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? fv(d)
            : this.lineralizeSegments(o, d).pipe(
                Oe((f) => this.expandSegment(t, n, r, f.concat(l), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          return "**" === r.path
            ? ((t = ov(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? T({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    Z(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new G(o, {})
                      )
                    )
                  )
                : T(new G(o, {})))
            : uv(n, r, o, t).pipe(
                Gt(
                  ({ matched: s, consumedSegments: a, remainingSegments: u }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                          Oe((c) => {
                            const d = c.injector ?? t,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: p } = na(
                                n,
                                a,
                                u,
                                f
                              ),
                              g = new G(h.segments, h.children);
                            if (0 === p.length && g.hasChildren())
                              return this.expandChildren(d, f, g).pipe(
                                Z((_) => new G(a, _))
                              );
                            if (0 === f.length && 0 === p.length)
                              return T(new G(a, {}));
                            const v = Dt(r) === i;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              p,
                              v ? z : i,
                              !0
                            ).pipe(
                              Z((M) => new G(a.concat(M.segments), M.children))
                            );
                          })
                        )
                      : ci(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? T({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? T({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function iO(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? T(!0)
                    : T(
                        o.map((s) => {
                          const a = Wr(s, e);
                          return Sn(
                            (function GT(e) {
                              return e && li(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(Qr(), av());
                })(t, n, r).pipe(
                  Oe((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Be((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function fO(e) {
                          return Yo(tv(oa, 3));
                        })()
                  )
                )
            : T({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return T(r);
            if (o.numberOfChildren > 1 || !o.children[z])
              return Yo(new I(4e3, oa));
            o = o.children[z];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new Zn(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Re(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Re(n.children, (a, u) => {
              s[u] = this.createSegmentGroup(t, a, r, o);
            }),
            new G(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new I(4001, oa);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      class mO {}
      class vO {
        constructor(t, n, r, o, i, s, a, u) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = a),
            (this.urlSerializer = u);
        }
        recognize() {
          const t = na(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo),
            this.relativeLinkResolution
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            z
          ).pipe(
            Z((n) => {
              if (null === n) return null;
              const r = new Js(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  z,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new dn(r, n),
                i = new J_(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = K_(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o);
        }
        processChildren(t, n, r) {
          return ve(Object.keys(r.children)).pipe(
            Qn((o) => {
              const i = r.children[o],
                s = iv(n, o);
              return this.processSegmentGroup(t, s, i, o);
            }),
            I_((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function VP(e, t = !1) {
              return xe((n, r) => {
                let o = 0;
                n.subscribe(
                  Se(r, (i) => {
                    const s = e(i, o++);
                    (s || t) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            zs(null),
            x_(),
            Z((o) => {
              if (null === o) return null;
              const i = hv(o);
              return (
                (function CO(e) {
                  e.sort((t, n) =>
                    t.value.outlet === z
                      ? -1
                      : n.value.outlet === z
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(t, n, r, o, i) {
          return ve(n).pipe(
            Qn((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)
            ),
            In((s) => !!s),
            xn((s) => {
              if (Zc(s)) return cv(r, o, i) ? T([]) : T(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i) {
          if (n.redirectTo || !lv(n, r, o, i)) return T(null);
          let s;
          if ("**" === n.path) {
            const a = o.length > 0 ? T_(o).parameters : {},
              u = gv(r) + o.length;
            s = T({
              snapshot: new Js(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                yv(n),
                Dt(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                pv(r),
                u,
                _v(n),
                u
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = uv(r, n, o, t).pipe(
              Z(
                ({
                  matched: a,
                  consumedSegments: u,
                  remainingSegments: l,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = gv(r) + u.length;
                  return {
                    snapshot: new Js(
                      u,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      yv(n),
                      Dt(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      pv(r),
                      d,
                      _v(n),
                      d
                    ),
                    consumedSegments: u,
                    remainingSegments: l,
                  };
                }
              )
            );
          return s.pipe(
            Gt((a) => {
              if (null === a) return T(null);
              const {
                snapshot: u,
                consumedSegments: l,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function DO(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = na(
                  r,
                  l,
                  c,
                  f.filter((v) => void 0 === v.redirectTo),
                  this.relativeLinkResolution
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  Z((v) => (null === v ? null : [new dn(u, v)]))
                );
              if (0 === f.length && 0 === p.length) return T([new dn(u, [])]);
              const g = Dt(n) === i;
              return this.processSegment(d, f, h, p, g ? z : i).pipe(
                Z((v) => (null === v ? null : [new dn(u, v)]))
              );
            })
          );
        }
      }
      function wO(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function hv(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!wO(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = hv(r.children);
          t.push(new dn(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function pv(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function gv(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function yv(e) {
        return e.data || {};
      }
      function _v(e) {
        return e.resolve || {};
      }
      function vv(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Jc(e) {
        return Gt((t) => {
          const n = e(t);
          return n ? ve(n).pipe(Z(() => t)) : T(t);
        });
      }
      let Cv = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === z));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Jo];
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)();
            }),
            (e.??prov = U({
              token: e,
              factory: function () {
                return fe(Dv);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        Dv = (() => {
          class e extends Cv {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)(O(__));
            }),
            (e.??prov = U({ token: e, factory: e.??fac, providedIn: "root" })),
            e
          );
        })();
      class TO {}
      class AO extends class OO {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      } {}
      const aa = new L("", { providedIn: "root", factory: () => ({}) }),
        Xc = new L("ROUTES");
      let ed = (() => {
        class e {
          constructor(n, r) {
            (this.injector = n),
              (this.compiler = r),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return T(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = Sn(n.loadComponent()).pipe(
                Be((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                Tc(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new E_(r, () => new kt()).pipe(Sc());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return T({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                Z((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let u,
                    l,
                    c = !1;
                  Array.isArray(a)
                    ? (l = a)
                    : ((u = a.create(n).injector),
                      (l = P_(u.get(Xc, [], R.Self | R.Optional))));
                  return { routes: l.map(Qc), injector: u };
                }),
                Tc(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new E_(i, () => new kt()).pipe(Sc());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return Sn(n()).pipe(
              Oe((r) =>
                r instanceof gm || Array.isArray(r)
                  ? T(r)
                  : ve(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(O(xt), O(Ul));
          }),
          (e.??prov = U({ token: e, factory: e.??fac, providedIn: "root" })),
          e
        );
      })();
      class NO {}
      class FO {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, n) {
          return t;
        }
      }
      function kO(e) {
        throw e;
      }
      function LO(e, t, n) {
        return t.parse("/");
      }
      const jO = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        VO = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      function Mv() {
        const e = fe(k_),
          t = fe(ii),
          n = fe(oc),
          r = fe(xt),
          o = fe(Ul),
          i = fe(Xc, { optional: !0 }) ?? [],
          s = fe(aa, { optional: !0 }) ?? {},
          a = fe(Dv),
          u = fe(Cv, { optional: !0 }),
          l = fe(NO, { optional: !0 }),
          c = fe(TO, { optional: !0 }),
          d = new Ne(null, e, t, n, r, o, P_(i));
        return (
          l && (d.urlHandlingStrategy = l),
          c && (d.routeReuseStrategy = c),
          (d.titleStrategy = u ?? a),
          (function $O(e, t) {
            e.errorHandler && (t.errorHandler = e.errorHandler),
              e.malformedUriErrorHandler &&
                (t.malformedUriErrorHandler = e.malformedUriErrorHandler),
              e.onSameUrlNavigation &&
                (t.onSameUrlNavigation = e.onSameUrlNavigation),
              e.paramsInheritanceStrategy &&
                (t.paramsInheritanceStrategy = e.paramsInheritanceStrategy),
              e.relativeLinkResolution &&
                (t.relativeLinkResolution = e.relativeLinkResolution),
              e.urlUpdateStrategy &&
                (t.urlUpdateStrategy = e.urlUpdateStrategy),
              e.canceledNavigationResolution &&
                (t.canceledNavigationResolution =
                  e.canceledNavigationResolution);
          })(s, d),
          d
        );
      }
      let Ne = (() => {
        class e {
          constructor(n, r, o, i, s, a, u) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = o),
              (this.location = i),
              (this.config = u),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new kt()),
              (this.errorHandler = kO),
              (this.malformedUriErrorHandler = LO),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.afterPreactivation = () => T(void 0)),
              (this.urlHandlingStrategy = new FO()),
              (this.routeReuseStrategy = new AO()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.configLoader = s.get(ed)),
              (this.configLoader.onLoadEndListener = (f) =>
                this.triggerEvent(new DT(f))),
              (this.configLoader.onLoadStartListener = (f) =>
                this.triggerEvent(new CT(f))),
              (this.ngModule = s.get(Gn)),
              (this.console = s.get(gx));
            const d = s.get(be);
            (this.isNgZoneEnabled = d instanceof be && be.isInAngularZone()),
              this.resetConfig(u),
              (this.currentUrlTree = (function zP() {
                return new Zn(new G([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = Y_(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new Ft({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            return this.location.getState()?.??routerPageId;
          }
          setupNavigations(n) {
            const r = this.events;
            return n.pipe(
              bn((o) => 0 !== o.id),
              Z((o) => ({
                ...o,
                extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl),
              })),
              Gt((o) => {
                let i = !1,
                  s = !1;
                return T(o).pipe(
                  Be((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.rawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? {
                            ...this.lastSuccessfulNavigation,
                            previousNavigation: null,
                          }
                        : null,
                    };
                  }),
                  Gt((a) => {
                    const u = this.browserUrlTree.toString(),
                      l =
                        !this.navigated ||
                        a.extractedUrl.toString() !== u ||
                        u !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || l) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        Ev(a.source) && (this.browserUrlTree = a.extractedUrl),
                        T(a).pipe(
                          Gt((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new jc(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? Qt
                                : Promise.resolve(d)
                            );
                          }),
                          (function gO(e, t, n, r) {
                            return Gt((o) =>
                              (function hO(e, t, n, r, o) {
                                return new pO(e, t, n, r, o).apply();
                              })(e, t, n, o.extractedUrl, r).pipe(
                                Z((i) => ({ ...o, urlAfterRedirects: i }))
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          Be((d) => {
                            (this.currentNavigation = {
                              ...this.currentNavigation,
                              finalUrl: d.urlAfterRedirects,
                            }),
                              (o.urlAfterRedirects = d.urlAfterRedirects);
                          }),
                          (function EO(e, t, n, r, o, i) {
                            return Oe((s) =>
                              (function _O(
                                e,
                                t,
                                n,
                                r,
                                o,
                                i,
                                s = "emptyOnly",
                                a = "legacy"
                              ) {
                                return new vO(e, t, n, r, o, s, a, i)
                                  .recognize()
                                  .pipe(
                                    Gt((u) =>
                                      null === u
                                        ? (function yO(e) {
                                            return new _e((t) => t.error(e));
                                          })(new mO())
                                        : T(u)
                                    )
                                  );
                              })(
                                e,
                                t,
                                n,
                                s.urlAfterRedirects,
                                r.serialize(s.urlAfterRedirects),
                                r,
                                o,
                                i
                              ).pipe(Z((a) => ({ ...s, targetSnapshot: a })))
                            );
                          })(
                            this.ngModule.injector,
                            this.rootComponentType,
                            this.config,
                            this.urlSerializer,
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          Be((d) => {
                            if (
                              ((o.targetSnapshot = d.targetSnapshot),
                              "eager" === this.urlUpdateStrategy)
                            ) {
                              if (!d.extras.skipLocationChange) {
                                const h = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                );
                                this.setBrowserUrl(h, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const f = new gT(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(f);
                          })
                        )
                      );
                    if (
                      l &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: g,
                          extras: v,
                        } = a,
                        D = new jc(f, this.serializeUrl(h), p, g);
                      r.next(D);
                      const M = Y_(h, this.rootComponentType).snapshot;
                      return T(
                        (o = {
                          ...a,
                          targetSnapshot: M,
                          urlAfterRedirects: h,
                          extras: {
                            ...v,
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          },
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), Qt;
                  }),
                  Be((a) => {
                    const u = new mT(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(u);
                  }),
                  Z(
                    (a) =>
                      (o = {
                        ...a,
                        guards: $T(
                          a.targetSnapshot,
                          a.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                  ),
                  (function KT(e, t) {
                    return Oe((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: o,
                        guards: {
                          canActivateChecks: i,
                          canDeactivateChecks: s,
                        },
                      } = n;
                      return 0 === s.length && 0 === i.length
                        ? T({ ...n, guardsResult: !0 })
                        : (function JT(e, t, n, r) {
                            return ve(e).pipe(
                              Oe((o) =>
                                (function oO(e, t, n, r, o) {
                                  const i =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return i && 0 !== i.length
                                    ? T(
                                        i.map((a) => {
                                          const u = si(t) ?? o,
                                            l = Wr(a, u);
                                          return Sn(
                                            (function QT(e) {
                                              return e && li(e.canDeactivate);
                                            })(l)
                                              ? l.canDeactivate(e, t, n, r)
                                              : u.runInContext(() =>
                                                  l(e, t, n, r)
                                                )
                                          ).pipe(In());
                                        })
                                      ).pipe(Qr())
                                    : T(!0);
                                })(o.component, o.route, n, t, r)
                              ),
                              In((o) => !0 !== o, !0)
                            );
                          })(s, r, o, e).pipe(
                            Oe((a) =>
                              a &&
                              (function zT(e) {
                                return "boolean" == typeof e;
                              })(a)
                                ? (function XT(e, t, n, r) {
                                    return ve(t).pipe(
                                      Qn((o) =>
                                        xc(
                                          (function tO(e, t) {
                                            return (
                                              null !== e && t && t(new wT(e)),
                                              T(!0)
                                            );
                                          })(o.route.parent, r),
                                          (function eO(e, t) {
                                            return (
                                              null !== e && t && t(new ET(e)),
                                              T(!0)
                                            );
                                          })(o.route, r),
                                          (function rO(e, t, n) {
                                            const r = t[t.length - 1],
                                              i = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((s) =>
                                                  (function BT(e) {
                                                    const t = e.routeConfig
                                                      ? e.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return t && 0 !== t.length
                                                      ? { node: e, guards: t }
                                                      : null;
                                                  })(s)
                                                )
                                                .filter((s) => null !== s)
                                                .map((s) =>
                                                  M_(() =>
                                                    T(
                                                      s.guards.map((u) => {
                                                        const l =
                                                            si(s.node) ?? n,
                                                          c = Wr(u, l);
                                                        return Sn(
                                                          (function WT(e) {
                                                            return (
                                                              e &&
                                                              li(
                                                                e.canActivateChild
                                                              )
                                                            );
                                                          })(c)
                                                            ? c.canActivateChild(
                                                                r,
                                                                e
                                                              )
                                                            : l.runInContext(
                                                                () => c(r, e)
                                                              )
                                                        ).pipe(In());
                                                      })
                                                    ).pipe(Qr())
                                                  )
                                                );
                                            return T(i).pipe(Qr());
                                          })(e, o.path, n),
                                          (function nO(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return T(!0);
                                            const o = r.map((i) =>
                                              M_(() => {
                                                const s = si(t) ?? n,
                                                  a = Wr(i, s);
                                                return Sn(
                                                  (function qT(e) {
                                                    return (
                                                      e && li(e.canActivate)
                                                    );
                                                  })(a)
                                                    ? a.canActivate(t, e)
                                                    : s.runInContext(() =>
                                                        a(t, e)
                                                      )
                                                ).pipe(In());
                                              })
                                            );
                                            return T(o).pipe(Qr());
                                          })(e, o.route, n)
                                        )
                                      ),
                                      In((o) => !0 !== o, !0)
                                    );
                                  })(r, i, e, t)
                                : T(a)
                            ),
                            Z((a) => ({ ...n, guardsResult: a }))
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  Be((a) => {
                    if (((o.guardsResult = a.guardsResult), Kn(a.guardsResult)))
                      throw ev(0, a.guardsResult);
                    const u = new yT(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(u);
                  }),
                  bn(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, "", 3),
                      !1)
                  ),
                  Jc((a) => {
                    if (a.guards.canActivateChecks.length)
                      return T(a).pipe(
                        Be((u) => {
                          const l = new _T(
                            u.id,
                            this.serializeUrl(u.extractedUrl),
                            this.serializeUrl(u.urlAfterRedirects),
                            u.targetSnapshot
                          );
                          this.triggerEvent(l);
                        }),
                        Gt((u) => {
                          let l = !1;
                          return T(u).pipe(
                            (function bO(e, t) {
                              return Oe((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: o },
                                } = n;
                                if (!o.length) return T(n);
                                let i = 0;
                                return ve(o).pipe(
                                  Qn((s) =>
                                    (function IO(e, t, n, r) {
                                      const o = e.routeConfig,
                                        i = e._resolve;
                                      return (
                                        void 0 !== o?.title &&
                                          !vv(o) &&
                                          (i[Jo] = o.title),
                                        (function xO(e, t, n, r) {
                                          const o = (function SO(e) {
                                            return [
                                              ...Object.keys(e),
                                              ...Object.getOwnPropertySymbols(
                                                e
                                              ),
                                            ];
                                          })(e);
                                          if (0 === o.length) return T({});
                                          const i = {};
                                          return ve(o).pipe(
                                            Oe((s) =>
                                              (function PO(e, t, n, r) {
                                                const o = si(t) ?? r,
                                                  i = Wr(e, o);
                                                return Sn(
                                                  i.resolve
                                                    ? i.resolve(t, n)
                                                    : o.runInContext(() =>
                                                        i(t, n)
                                                      )
                                                );
                                              })(e[s], t, n, r).pipe(
                                                In(),
                                                Be((a) => {
                                                  i[s] = a;
                                                })
                                              )
                                            ),
                                            Pc(1),
                                            (function $P(e) {
                                              return Z(() => e);
                                            })(i),
                                            xn((s) => (Zc(s) ? Qt : Yo(s)))
                                          );
                                        })(i, e, t, r).pipe(
                                          Z(
                                            (s) => (
                                              (e._resolvedData = s),
                                              (e.data = K_(e, n).resolve),
                                              o &&
                                                vv(o) &&
                                                (e.data[Jo] = o.title),
                                              null
                                            )
                                          )
                                        )
                                      );
                                    })(s.route, r, e, t)
                                  ),
                                  Be(() => i++),
                                  Pc(1),
                                  Oe((s) => (i === o.length ? T(n) : Qt))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            Be({
                              next: () => (l = !0),
                              complete: () => {
                                l ||
                                  (this.restoreHistory(u),
                                  this.cancelNavigationTransition(u, "", 2));
                              },
                            })
                          );
                        }),
                        Be((u) => {
                          const l = new vT(
                            u.id,
                            this.serializeUrl(u.extractedUrl),
                            this.serializeUrl(u.urlAfterRedirects),
                            u.targetSnapshot
                          );
                          this.triggerEvent(l);
                        })
                      );
                  }),
                  Jc((a) => {
                    const u = (l) => {
                      const c = [];
                      l.routeConfig?.loadComponent &&
                        !l.routeConfig._loadedComponent &&
                        c.push(
                          this.configLoader.loadComponent(l.routeConfig).pipe(
                            Be((d) => {
                              l.component = d;
                            }),
                            Z(() => {})
                          )
                        );
                      for (const d of l.children) c.push(...u(d));
                      return c;
                    };
                    return D_(u(a.targetSnapshot.root)).pipe(zs(), Ko(1));
                  }),
                  Jc(() => this.afterPreactivation()),
                  Z((a) => {
                    const u = (function PT(e, t, n) {
                      const r = oi(e, t._root, n ? n._root : void 0);
                      return new Z_(r, t);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return (o = { ...a, targetRouterState: u });
                  }),
                  Be((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((e, t, n) =>
                    Z(
                      (r) => (
                        new VT(
                          t,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(e),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  Be({
                    next() {
                      i = !0;
                    },
                    complete() {
                      i = !0;
                    },
                  }),
                  Tc(() => {
                    i || s || this.cancelNavigationTransition(o, "", 1),
                      this.currentNavigation?.id === o.id &&
                        (this.currentNavigation = null);
                  }),
                  xn((a) => {
                    if (((s = !0), rv(a))) {
                      nv(a) ||
                        ((this.navigated = !0), this.restoreHistory(o, !0));
                      const u = new Ks(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a.message,
                        a.cancellationCode
                      );
                      if ((r.next(u), nv(a))) {
                        const l = this.urlHandlingStrategy.merge(
                            a.url,
                            this.rawUrlTree
                          ),
                          c = {
                            skipLocationChange: o.extras.skipLocationChange,
                            replaceUrl:
                              "eager" === this.urlUpdateStrategy ||
                              Ev(o.source),
                          };
                        this.scheduleNavigation(l, "imperative", null, c, {
                          resolve: o.resolve,
                          reject: o.reject,
                          promise: o.promise,
                        });
                      } else o.resolve(!1);
                    } else {
                      this.restoreHistory(o, !0);
                      const u = new q_(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a,
                        o.targetSnapshot ?? void 0
                      );
                      r.next(u);
                      try {
                        o.resolve(this.errorHandler(a));
                      } catch (l) {
                        o.reject(l);
                      }
                    }
                    return Qt;
                  })
                );
              })
            );
          }
          resetRootComponentType(n) {
            (this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(n) {
            this.transitions.next({ ...this.transitions.value, ...n });
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    const o = { replaceUrl: !0 },
                      i = n.state?.navigationId ? n.state : null;
                    if (i) {
                      const a = { ...i };
                      delete a.navigationId,
                        delete a.??routerPageId,
                        0 !== Object.keys(a).length && (o.state = a);
                    }
                    const s = this.parseUrl(n.url);
                    this.scheduleNavigation(s, r, i, o);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(n) {
            this.events.next(n);
          }
          resetConfig(n) {
            (this.config = n.map(Qc)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              l = o || this.routerState.root,
              c = u ? this.currentUrlTree.fragment : s;
            let d = null;
            switch (a) {
              case "merge":
                d = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = i || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              lT(l, this.currentUrlTree, n, d, c ?? null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = Kn(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function BO(e) {
                for (let t = 0; t < e.length; t++) {
                  if (null == e[t]) throw new I(4008, false);
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (((o = !0 === r ? { ...jO } : !1 === r ? { ...VO } : r), Kn(n)))
              return A_(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return A_(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new Jn(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  this.titleStrategy?.updateTitle(this.routerState.snapshot),
                  n.resolve(!0);
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`);
              }
            );
          }
          scheduleNavigation(n, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, u, l;
            s
              ? ((a = s.resolve), (u = s.reject), (l = s.promise))
              : (l = new Promise((f, h) => {
                  (a = f), (u = h);
                }));
            const c = ++this.navigationId;
            let d;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (o = this.location.getState()),
                  (d =
                    o && o.??routerPageId
                      ? o.??routerPageId
                      : i.replaceUrl || i.skipLocationChange
                      ? this.browserPageId ?? 0
                      : (this.browserPageId ?? 0) + 1))
                : (d = 0),
              this.setTransition({
                id: c,
                targetPageId: d,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: i,
                resolve: a,
                reject: u,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((f) => Promise.reject(f))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n),
              i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
            this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl
              ? this.location.replaceState(o, "", i)
              : this.location.go(o, "", i);
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !== this.currentNavigation?.finalUrl) ||
              0 === o
                ? this.currentUrlTree === this.currentNavigation?.finalUrl &&
                  0 === o &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new Ks(n.id, this.serializeUrl(n.extractedUrl), r, o);
            this.triggerEvent(i), n.resolve(!1);
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ??routerPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.??fac = function (n) {
            Uu();
          }),
          (e.??prov = U({
            token: e,
            factory: function () {
              return Mv();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      function Ev(e) {
        return "imperative" !== e;
      }
      let td = (() => {
          class e {
            constructor(n, r, o, i, s) {
              (this.router = n),
                (this.route = r),
                (this.tabIndexAttribute = o),
                (this.renderer = i),
                (this.el = s),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.commands = null),
                (this.onChanges = new kt()),
                this.setTabIndexIfNotOnNativeEl("0");
            }
            set preserveFragment(n) {
              this._preserveFragment = Ur(n);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(n) {
              this._skipLocationChange = Ur(n);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(n) {
              this._replaceUrl = Ur(n);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            setTabIndexIfNotOnNativeEl(n) {
              if (null != this.tabIndexAttribute) return;
              const r = this.renderer,
                o = this.el.nativeElement;
              null !== n
                ? r.setAttribute(o, "tabindex", n)
                : r.removeAttribute(o, "tabindex");
            }
            ngOnChanges(n) {
              this.onChanges.next(this);
            }
            set routerLink(n) {
              null != n
                ? ((this.commands = Array.isArray(n) ? n : [n]),
                  this.setTabIndexIfNotOnNativeEl("0"))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick() {
              return (
                null === this.urlTree ||
                  this.router.navigateByUrl(this.urlTree, {
                    skipLocationChange: this.skipLocationChange,
                    replaceUrl: this.replaceUrl,
                    state: this.state,
                  }),
                !0
              );
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)(x(Ne), x(Xn), fo("tabindex"), x(qi), x(vn));
            }),
            (e.??dir = Fe({
              type: e,
              selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
              hostBindings: function (n, r) {
                1 & n &&
                  Te("click", function () {
                    return r.onClick();
                  });
              },
              inputs: {
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [Vn],
            })),
            e
          );
        })(),
        Zr = (() => {
          class e {
            constructor(n, r, o) {
              (this.router = n),
                (this.route = r),
                (this.locationStrategy = o),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.commands = null),
                (this.href = null),
                (this.onChanges = new kt()),
                (this.subscription = n.events.subscribe((i) => {
                  i instanceof Jn && this.updateTargetUrlAndHref();
                }));
            }
            set preserveFragment(n) {
              this._preserveFragment = Ur(n);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(n) {
              this._skipLocationChange = Ur(n);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(n) {
              this._replaceUrl = Ur(n);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            set routerLink(n) {
              this.commands = null != n ? (Array.isArray(n) ? n : [n]) : null;
            }
            ngOnChanges(n) {
              this.updateTargetUrlAndHref(), this.onChanges.next(this);
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            onClick(n, r, o, i, s) {
              return (
                !!(
                  0 !== n ||
                  r ||
                  o ||
                  i ||
                  s ||
                  ("string" == typeof this.target && "_self" != this.target) ||
                  null === this.urlTree
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !1)
              );
            }
            updateTargetUrlAndHref() {
              this.href =
                null !== this.urlTree
                  ? this.locationStrategy.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)(x(Ne), x(Xn), x(Wn));
            }),
            (e.??dir = Fe({
              type: e,
              selectors: [
                ["a", "routerLink", ""],
                ["area", "routerLink", ""],
              ],
              hostVars: 2,
              hostBindings: function (n, r) {
                1 & n &&
                  Te("click", function (i) {
                    return r.onClick(
                      i.button,
                      i.ctrlKey,
                      i.shiftKey,
                      i.altKey,
                      i.metaKey
                    );
                  }),
                  2 & n && hl("target", r.target)("href", r.href, lu);
              },
              inputs: {
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [Vn],
            })),
            e
          );
        })(),
        bv = (() => {
          class e {
            constructor(n, r, o, i, s, a) {
              (this.router = n),
                (this.element = r),
                (this.renderer = o),
                (this.cdr = i),
                (this.link = s),
                (this.linkWithHref = a),
                (this.classes = []),
                (this.isActive = !1),
                (this.routerLinkActiveOptions = { exact: !1 }),
                (this.isActiveChange = new Qe()),
                (this.routerEventsSubscription = n.events.subscribe((u) => {
                  u instanceof Jn && this.update();
                }));
            }
            ngAfterContentInit() {
              T(this.links.changes, this.linksWithHrefs.changes, T(null))
                .pipe(tr())
                .subscribe((n) => {
                  this.update(), this.subscribeToEachLinkOnChanges();
                });
            }
            subscribeToEachLinkOnChanges() {
              this.linkInputChangesSubscription?.unsubscribe();
              const n = [
                ...this.links.toArray(),
                ...this.linksWithHrefs.toArray(),
                this.link,
                this.linkWithHref,
              ]
                .filter((r) => !!r)
                .map((r) => r.onChanges);
              this.linkInputChangesSubscription = ve(n)
                .pipe(tr())
                .subscribe((r) => {
                  this.isActive !== this.isLinkActive(this.router)(r) &&
                    this.update();
                });
            }
            set routerLinkActive(n) {
              const r = Array.isArray(n) ? n : n.split(" ");
              this.classes = r.filter((o) => !!o);
            }
            ngOnChanges(n) {
              this.update();
            }
            ngOnDestroy() {
              this.routerEventsSubscription.unsubscribe(),
                this.linkInputChangesSubscription?.unsubscribe();
            }
            update() {
              !this.links ||
                !this.linksWithHrefs ||
                !this.router.navigated ||
                Promise.resolve().then(() => {
                  const n = this.hasActiveLinks();
                  this.isActive !== n &&
                    ((this.isActive = n),
                    this.cdr.markForCheck(),
                    this.classes.forEach((r) => {
                      n
                        ? this.renderer.addClass(this.element.nativeElement, r)
                        : this.renderer.removeClass(
                            this.element.nativeElement,
                            r
                          );
                    }),
                    n && void 0 !== this.ariaCurrentWhenActive
                      ? this.renderer.setAttribute(
                          this.element.nativeElement,
                          "aria-current",
                          this.ariaCurrentWhenActive.toString()
                        )
                      : this.renderer.removeAttribute(
                          this.element.nativeElement,
                          "aria-current"
                        ),
                    this.isActiveChange.emit(n));
                });
            }
            isLinkActive(n) {
              const r = (function UO(e) {
                return !!e.paths;
              })(this.routerLinkActiveOptions)
                ? this.routerLinkActiveOptions
                : this.routerLinkActiveOptions.exact || !1;
              return (o) => !!o.urlTree && n.isActive(o.urlTree, r);
            }
            hasActiveLinks() {
              const n = this.isLinkActive(this.router);
              return (
                (this.link && n(this.link)) ||
                (this.linkWithHref && n(this.linkWithHref)) ||
                this.links.some(n) ||
                this.linksWithHrefs.some(n)
              );
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)(
                x(Ne),
                x(vn),
                x(qi),
                x(Kl),
                x(td, 8),
                x(Zr, 8)
              );
            }),
            (e.??dir = Fe({
              type: e,
              selectors: [["", "routerLinkActive", ""]],
              contentQueries: function (n, r, o) {
                if ((1 & n && (kl(o, td, 5), kl(o, Zr, 5)), 2 & n)) {
                  let i;
                  Me((i = Ee())) && (r.links = i),
                    Me((i = Ee())) && (r.linksWithHrefs = i);
                }
              },
              inputs: {
                routerLinkActiveOptions: "routerLinkActiveOptions",
                ariaCurrentWhenActive: "ariaCurrentWhenActive",
                routerLinkActive: "routerLinkActive",
              },
              outputs: { isActiveChange: "isActiveChange" },
              exportAs: ["routerLinkActive"],
              standalone: !0,
              features: [Vn],
            })),
            e
          );
        })();
      class Iv {}
      let HO = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                bn((n) => n instanceof Jn),
                Qn(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = gs(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              (i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
              (i.loadComponent && !i._loadedComponent)
                ? o.push(this.preloadConfig(s, i))
                : (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return ve(o).pipe(tr());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : T(null);
              const i = o.pipe(
                Oe((s) =>
                  null === s
                    ? T(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? ve([i, this.loader.loadComponent(r)]).pipe(tr())
                : i;
            });
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(O(Ne), O(Ul), O(_n), O(Iv), O(ed));
          }),
          (e.??prov = U({ token: e, factory: e.??fac, providedIn: "root" })),
          e
        );
      })();
      const nd = new L("");
      let xv = (() => {
        class e {
          constructor(n, r, o = {}) {
            (this.router = n),
              (this.viewportScroller = r),
              (this.options = o),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (o.scrollPositionRestoration =
                o.scrollPositionRestoration || "disabled"),
              (o.anchorScrolling = o.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.router.events.subscribe((n) => {
              n instanceof jc
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof Jn &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.router.parseUrl(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.router.events.subscribe((n) => {
              n instanceof W_ &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.router.triggerEvent(
              new W_(
                n,
                "popstate" === this.lastSource
                  ? this.store[this.restoredId]
                  : null,
                r
              )
            );
          }
          ngOnDestroy() {
            this.routerEventsSubscription &&
              this.routerEventsSubscription.unsubscribe(),
              this.scrollEventsSubscription &&
                this.scrollEventsSubscription.unsubscribe();
          }
        }
        return (
          (e.??fac = function (n) {
            Uu();
          }),
          (e.??prov = U({ token: e, factory: e.??fac })),
          e
        );
      })();
      function Yr(e, t) {
        return { ??kind: e, ??providers: t };
      }
      function rd(e) {
        return [{ provide: Xc, multi: !0, useValue: e }];
      }
      function Pv() {
        const e = fe(xt);
        return (t) => {
          const n = e.get(ws);
          if (t !== n.components[0]) return;
          const r = e.get(Ne),
            o = e.get(Tv);
          1 === e.get(od) && r.initialNavigation(),
            e.get(Ov, null, R.Optional)?.setUpPreloading(),
            e.get(nd, null, R.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.next(),
            o.complete();
        };
      }
      const Tv = new L("", { factory: () => new kt() }),
        od = new L("", { providedIn: "root", factory: () => 1 });
      const Ov = new L("");
      function WO(e) {
        return Yr(0, [
          { provide: Ov, useExisting: HO },
          { provide: Iv, useExisting: e },
        ]);
      }
      const Av = new L("ROUTER_FORROOT_GUARD"),
        QO = [
          oc,
          { provide: k_, useClass: Ac },
          { provide: Ne, useFactory: Mv },
          ii,
          {
            provide: Xn,
            useFactory: function Sv(e) {
              return e.routerState.root;
            },
            deps: [Ne],
          },
          ed,
        ];
      function ZO() {
        return new dy("Router", Ne);
      }
      let Rv = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                QO,
                [],
                rd(n),
                {
                  provide: Av,
                  useFactory: XO,
                  deps: [[Ne, new vo(), new Co()]],
                },
                { provide: aa, useValue: r || {} },
                r?.useHash
                  ? { provide: Wn, useClass: r1 }
                  : { provide: Wn, useClass: ky },
                {
                  provide: nd,
                  useFactory: () => {
                    const e = fe(Ne),
                      t = fe(bS),
                      n = fe(aa);
                    return (
                      n.scrollOffset && t.setOffset(n.scrollOffset),
                      new xv(e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? WO(r.preloadingStrategy).??providers
                  : [],
                { provide: dy, multi: !0, useFactory: ZO },
                r?.initialNavigation ? eA(r) : [],
                [
                  { provide: Nv, useFactory: Pv },
                  { provide: oy, multi: !0, useExisting: Nv },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [rd(n)] };
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)(O(Av, 8));
          }),
          (e.??mod = Rn({ type: e })),
          (e.??inj = fn({ imports: [qc] })),
          e
        );
      })();
      function XO(e) {
        return "guarded";
      }
      function eA(e) {
        return [
          "disabled" === e.initialNavigation
            ? Yr(3, [
                {
                  provide: vs,
                  multi: !0,
                  useFactory: () => {
                    const t = fe(Ne);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: od, useValue: 2 },
              ]).??providers
            : [],
          "enabledBlocking" === e.initialNavigation
            ? Yr(2, [
                { provide: od, useValue: 0 },
                {
                  provide: vs,
                  multi: !0,
                  deps: [xt],
                  useFactory: (t) => {
                    const n = t.get(t1, Promise.resolve());
                    let r = !1;
                    return () =>
                      n.then(
                        () =>
                          new Promise((i) => {
                            const s = t.get(Ne),
                              a = t.get(Tv);
                            (function o(i) {
                              t.get(Ne)
                                .events.pipe(
                                  bn(
                                    (a) =>
                                      a instanceof Jn ||
                                      a instanceof Ks ||
                                      a instanceof q_
                                  ),
                                  Z(
                                    (a) =>
                                      a instanceof Jn ||
                                      (a instanceof Ks &&
                                        (0 === a.code || 1 === a.code) &&
                                        null)
                                  ),
                                  bn((a) => null !== a),
                                  Ko(1)
                                )
                                .subscribe(() => {
                                  i();
                                });
                            })(() => {
                              i(!0), (r = !0);
                            }),
                              (s.afterPreactivation = () => (
                                i(!0), r || a.closed ? T(void 0) : a
                              )),
                              s.initialNavigation();
                          })
                      );
                  },
                },
              ]).??providers
            : [],
        ];
      }
      const Nv = new L("");
      let nA = (() => {
        class e {
          ngOnInit() {
            ymaps.ready().then(() => {
              this.map = new ymaps.Map("map", {
                center: [55.4424, 37.3656],
                zoom: 12,
              });
            });
          }
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)();
          }),
          (e.??cmp = pt({
            type: e,
            selectors: [["app-contacts"]],
            decls: 50,
            vars: 0,
            consts: [
              [1, "contacts"],
              [1, "container"],
              [1, "contacts__row"],
              [1, "contacts__info"],
              [1, "contacts__list"],
              [1, "contacts__item"],
              [1, "contacts__icon"],
              ["src", "../../../assets/images/contacts/Chat.svg", "alt", ""],
              [1, "contacts__block"],
              [1, "contacts__method"],
              [1, "contacts__main"],
              ["src", "../../../assets/images/contacts/iPhone.svg", "alt", ""],
              ["src", "../../../assets/images/contacts/outline.svg", "alt", ""],
              [1, "socials"],
              ["href", "#"],
              [
                "src",
                "../../../assets/images/contacts/Facebook.svg",
                "alt",
                "Facebook icon",
              ],
              [
                "src",
                "../../../assets/images/contacts/Twitter.svg",
                "alt",
                "Twitter icon",
              ],
              [
                "src",
                "../../../assets/images/contacts/YouTube.svg",
                "alt",
                "YouTube icon",
              ],
              [
                "src",
                "../../../assets/images/contacts/telegram.svg",
                "alt",
                "telegram icon",
              ],
              [
                "src",
                "../../../assets/images/contacts/Instagram.svg",
                "alt",
                "Instagram icon",
              ],
              [
                "src",
                "../../../assets/images/contacts/Linked-In.svg",
                "alt",
                "Linked-In icon",
              ],
              [1, "contacts__map"],
              ["id", "map"],
            ],
            template: function (n, r) {
              1 & n &&
                (m(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(
                  4,
                  "h3"
                ),
                w(5, "Contact info"),
                y(),
                m(6, "h2"),
                w(7, "Get in touch"),
                y(),
                m(8, "div", 4)(9, "div", 5)(10, "div", 6),
                S(11, "img", 7),
                y(),
                m(12, "div", 8)(13, "div", 9),
                w(14, " Talk to us: "),
                y(),
                m(15, "div", 10),
                w(16, " hello@createx.com "),
                y()()(),
                m(17, "div", 5)(18, "div", 6),
                S(19, "img", 11),
                y(),
                m(20, "div", 8)(21, "div", 9),
                w(22, " Call us: "),
                y(),
                m(23, "div", 10),
                w(24, " (405) 555-0128 "),
                y()()(),
                m(25, "div", 5)(26, "div", 6),
                S(27, "img", 12),
                y(),
                m(28, "div", 8)(29, "div", 9),
                w(30, " Address: "),
                y(),
                m(31, "div", 10),
                w(32, " 2464 Royal Ln. Mesa, New Jersey 45463, USA "),
                y()()()(),
                m(33, "h3"),
                w(34, "Follow us:"),
                y(),
                m(35, "div", 13)(36, "a", 14),
                S(37, "img", 15),
                y(),
                m(38, "a", 14),
                S(39, "img", 16),
                y(),
                m(40, "a", 14),
                S(41, "img", 17),
                y(),
                m(42, "a", 14),
                S(43, "img", 18),
                y(),
                m(44, "a", 14),
                S(45, "img", 19),
                y(),
                m(46, "a", 14),
                S(47, "img", 20),
                y()()(),
                m(48, "div", 21),
                S(49, "div", 22),
                y()()()());
            },
            styles: [
              '@charset "UTF-8";@import"https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";.contacts__method[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:700}.contacts__main[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400}*[_ngcontent-%COMP%]{padding:0;margin:0;border:0}*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after{box-sizing:border-box}[_ngcontent-%COMP%]:focus, [_ngcontent-%COMP%]:active{outline:none}a[_ngcontent-%COMP%]:focus, a[_ngcontent-%COMP%]:active{outline:none}nav[_ngcontent-%COMP%], footer[_ngcontent-%COMP%], header[_ngcontent-%COMP%], aside[_ngcontent-%COMP%]{display:block}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%;width:100%;font-size:100%;line-height:1;font-size:14px;-ms-text-size-adjust:100%;-moz-text-size-adjust:100%;-webkit-text-size-adjust:100%}input[_ngcontent-%COMP%], button[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit}input[_ngcontent-%COMP%]::-ms-clear{display:none}button[_ngcontent-%COMP%]{cursor:pointer}button[_ngcontent-%COMP%]::-moz-focus-inner{padding:0;border:0}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover{text-decoration:none}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%]{vertical-align:top}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:400}.container[_ngcontent-%COMP%]{max-width:1280px;margin:0 auto}h3[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:700;font-size:16px;line-height:150%;letter-spacing:1px;text-transform:uppercase;color:#1e212c}h2[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:900;font-size:46px;line-height:130%;color:#1e212c;margin:8px 0 40px}.form-input-default[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;flex:1 1 100%;position:relative}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#9a9ca5;padding:11px 0 12px 16px;background:#FFFFFF;border:1px solid #D7DADD;border-radius:4px;max-height:44px}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border:1px solid rgba(255,63,58,.4);box-shadow:0 80px 80px -20px #ff3f3a14,0 30px 24px -10px #ff3f3a0d,0 12px 10px -6px #ff3f3a0a,0 4px 4px -4px #1e212c08}.form-input-default[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#424551}.password-access-btn[_ngcontent-%COMP%]{position:absolute;bottom:0;right:16px;transform:translateY(-50%);background:transparent}.success-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#03cea4;display:none}.danger-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#ff4242;display:none}.contacts[_ngcontent-%COMP%]{margin:0 0 168px}.contacts__row[_ngcontent-%COMP%]{display:flex;justify-content:space-between}@media (max-width: 900px){.contacts__row[_ngcontent-%COMP%]{flex-direction:column}}.contacts__info[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1 1 50%}.contacts__list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:24px;margin:0 0 48px}.contacts__item[_ngcontent-%COMP%]{display:flex;gap:12px}.contacts__method[_ngcontent-%COMP%]{font-size:14px;line-height:150%;color:#787a80}.contacts__main[_ngcontent-%COMP%]{font-size:18px;line-height:150%;color:#1e212c}.contacts__map[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex:1 1 50%}.socials[_ngcontent-%COMP%]{display:flex;align-items:center;gap:32px;margin:24px 0 0}#map[_ngcontent-%COMP%]{display:flex;width:100%;height:100%}',
            ],
          })),
          e
        );
      })();
      function rA(e, t) {
        1 & e && S(0, "img", 20);
      }
      function oA(e, t) {
        1 & e && S(0, "img", 21);
      }
      let iA = (() => {
          class e {
            constructor() {
              this.isAgree = !0;
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)();
            }),
            (e.??cmp = pt({
              type: e,
              selectors: [["app-questions"]],
              decls: 43,
              vars: 2,
              consts: [
                [1, "questions"],
                [1, "container"],
                [1, "questions__row"],
                [1, "questions__illustration"],
                [
                  "src",
                  "../../../assets/images/questions/illustration.svg",
                  "alt",
                  "woman illustration",
                ],
                [1, "questions__main"],
                [1, "questions-form"],
                [1, "questions-form__row"],
                [1, "form-input-default"],
                ["type", "text", "placeholder", "Your first name"],
                ["type", "text", "placeholder", "Your last name"],
                ["type", "text", "placeholder", "Your working email"],
                ["type", "text", "placeholder", "Your phone number"],
                ["type", "text", "placeholder", "Your message"],
                [1, "agreement"],
                [1, "agreement__info"],
                [3, "click"],
                [
                  "src",
                  "../../../assets/images/questions/checked.svg",
                  "alt",
                  "checkbox check",
                  4,
                  "ngIf",
                ],
                [
                  "src",
                  "../../../assets/images/questions/unchecked.svg",
                  "alt",
                  "checkbox uncheck",
                  4,
                  "ngIf",
                ],
                [1, "agreement__submit"],
                [
                  "src",
                  "../../../assets/images/questions/checked.svg",
                  "alt",
                  "checkbox check",
                ],
                [
                  "src",
                  "../../../assets/images/questions/unchecked.svg",
                  "alt",
                  "checkbox uncheck",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (m(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3),
                  S(4, "img", 4),
                  y(),
                  m(5, "div", 5)(6, "h3"),
                  w(7, "Any questions?"),
                  y(),
                  m(8, "h2"),
                  w(9, "Drop us a line"),
                  y(),
                  m(10, "div", 6)(11, "div", 7)(12, "div", 8)(13, "span"),
                  w(14, "First Name*"),
                  y(),
                  S(15, "input", 9),
                  y(),
                  m(16, "div", 8)(17, "span"),
                  w(18, "Last Name*"),
                  y(),
                  S(19, "input", 10),
                  y()(),
                  m(20, "div", 7)(21, "div", 8)(22, "span"),
                  w(23, "Email*"),
                  y(),
                  S(24, "input", 11),
                  y(),
                  m(25, "div", 8)(26, "span"),
                  w(27, "Phone"),
                  y(),
                  S(28, "input", 12),
                  y()(),
                  m(29, "div", 7)(30, "div", 8)(31, "span"),
                  w(32, "Message*"),
                  y(),
                  S(33, "input", 13),
                  y()()(),
                  m(34, "div", 14)(35, "div", 15)(36, "button", 16),
                  Te("click", function () {
                    return (r.isAgree = !r.isAgree);
                  }),
                  dt(37, rA, 1, 0, "img", 17),
                  dt(38, oA, 1, 0, "img", 18),
                  y(),
                  w(
                    39,
                    " I agree to receive communications from Createx Online School "
                  ),
                  y(),
                  m(40, "div", 19)(41, "button"),
                  w(42, "Send message"),
                  y()()()()()()()),
                  2 & n &&
                    (lt(37),
                    Xe("ngIf", r.isAgree),
                    lt(1),
                    Xe("ngIf", !r.isAgree));
              },
              dependencies: [Ls],
              styles: [
                '@charset "UTF-8";@import"https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";.agreement__submit[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:700}.agreement__info[_ngcontent-%COMP%], .questions-form__name[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400}*[_ngcontent-%COMP%]{padding:0;margin:0;border:0}*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after{box-sizing:border-box}[_ngcontent-%COMP%]:focus, [_ngcontent-%COMP%]:active{outline:none}a[_ngcontent-%COMP%]:focus, a[_ngcontent-%COMP%]:active{outline:none}nav[_ngcontent-%COMP%], footer[_ngcontent-%COMP%], header[_ngcontent-%COMP%], aside[_ngcontent-%COMP%]{display:block}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%;width:100%;font-size:100%;line-height:1;font-size:14px;-ms-text-size-adjust:100%;-moz-text-size-adjust:100%;-webkit-text-size-adjust:100%}input[_ngcontent-%COMP%], button[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit}input[_ngcontent-%COMP%]::-ms-clear{display:none}button[_ngcontent-%COMP%]{cursor:pointer}button[_ngcontent-%COMP%]::-moz-focus-inner{padding:0;border:0}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover{text-decoration:none}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%]{vertical-align:top}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:400}.container[_ngcontent-%COMP%]{max-width:1280px;margin:0 auto}h3[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:700;font-size:16px;line-height:150%;letter-spacing:1px;text-transform:uppercase;color:#1e212c}h2[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:900;font-size:46px;line-height:130%;color:#1e212c;margin:8px 0 40px}.form-input-default[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;flex:1 1 100%;position:relative}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#9a9ca5;padding:11px 0 12px 16px;background:#FFFFFF;border:1px solid #D7DADD;border-radius:4px;max-height:44px}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border:1px solid rgba(255,63,58,.4);box-shadow:0 80px 80px -20px #ff3f3a14,0 30px 24px -10px #ff3f3a0d,0 12px 10px -6px #ff3f3a0a,0 4px 4px -4px #1e212c08}.form-input-default[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#424551}.password-access-btn[_ngcontent-%COMP%]{position:absolute;bottom:0;right:16px;transform:translateY(-50%);background:transparent}.success-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#03cea4;display:none}.danger-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#ff4242;display:none}.questions[_ngcontent-%COMP%]{margin:0 0 180px}.questions__row[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}@media (max-width: 900px){.questions__row[_ngcontent-%COMP%]{flex-direction:column}}.questions__illustration[_ngcontent-%COMP%]{flex:1 1 50%}.questions__illustration[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;max-width:435px;max-height:481px}.questions__main[_ngcontent-%COMP%]{flex:1 1 50%;display:flex;flex-direction:column}.questions-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:24px}.questions-form__row[_ngcontent-%COMP%]{display:flex;gap:25px}@media (max-width: 767px){.questions-form__row[_ngcontent-%COMP%]{flex-direction:column}}.questions-form__name[_ngcontent-%COMP%]{font-size:16px;line-height:160%;color:#424551}.agreement[_ngcontent-%COMP%]{display:flex;gap:50px;margin:48px 0 0}@media (max-width: 480px){.agreement[_ngcontent-%COMP%]{flex-direction:column}}.agreement__info[_ngcontent-%COMP%]{flex:1 1 50%;display:flex;align-items:baseline;gap:12px;font-size:16px;line-height:160%;color:#424551}.agreement__info[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:inline-block;background:transparent}.agreement__submit[_ngcontent-%COMP%]{flex:1 1 50%}.agreement__submit[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;font-size:16px;line-height:52px;display:flex;align-items:center;justify-content:center;text-align:center;letter-spacing:.5px;color:#fff;background:linear-gradient(55.95deg,#FF3F3A 0%,#F75E05 100%);border-radius:4px}',
              ],
            })),
            e
          );
        })(),
        sA = (() => {
          class e {}
          return (
            (e.??fac = function (n) {
              return new (n || e)();
            }),
            (e.??cmp = pt({
              type: e,
              selectors: [["app-contacts-container"]],
              decls: 2,
              vars: 0,
              template: function (n, r) {
                1 & n && S(0, "app-contacts")(1, "app-questions");
              },
              dependencies: [nA, iA],
            })),
            e
          );
        })(),
        aA = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)();
            }),
            (e.??cmp = pt({
              type: e,
              selectors: [["app-not-found"]],
              decls: 5,
              vars: 0,
              consts: [
                [1, "not-found"],
                [1, "container"],
                [1, "not-found__row"],
              ],
              template: function (n, r) {
                1 & n &&
                  (m(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h1"),
                  w(4, "Not Found"),
                  y()()()());
              },
              styles: [
                '@charset "UTF-8";@import"https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";.not-found__row[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400}*[_ngcontent-%COMP%]{padding:0;margin:0;border:0}*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after{box-sizing:border-box}[_ngcontent-%COMP%]:focus, [_ngcontent-%COMP%]:active{outline:none}a[_ngcontent-%COMP%]:focus, a[_ngcontent-%COMP%]:active{outline:none}nav[_ngcontent-%COMP%], footer[_ngcontent-%COMP%], header[_ngcontent-%COMP%], aside[_ngcontent-%COMP%]{display:block}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%;width:100%;font-size:100%;line-height:1;font-size:14px;-ms-text-size-adjust:100%;-moz-text-size-adjust:100%;-webkit-text-size-adjust:100%}input[_ngcontent-%COMP%], button[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit}input[_ngcontent-%COMP%]::-ms-clear{display:none}button[_ngcontent-%COMP%]{cursor:pointer}button[_ngcontent-%COMP%]::-moz-focus-inner{padding:0;border:0}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover{text-decoration:none}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%]{vertical-align:top}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:400}.container[_ngcontent-%COMP%]{max-width:1280px;margin:0 auto}h3[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:700;font-size:16px;line-height:150%;letter-spacing:1px;text-transform:uppercase;color:#1e212c}h2[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:900;font-size:46px;line-height:130%;color:#1e212c;margin:8px 0 40px}.form-input-default[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;flex:1 1 100%;position:relative}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#9a9ca5;padding:11px 0 12px 16px;background:#FFFFFF;border:1px solid #D7DADD;border-radius:4px;max-height:44px}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border:1px solid rgba(255,63,58,.4);box-shadow:0 80px 80px -20px #ff3f3a14,0 30px 24px -10px #ff3f3a0d,0 12px 10px -6px #ff3f3a0a,0 4px 4px -4px #1e212c08}.form-input-default[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#424551}.password-access-btn[_ngcontent-%COMP%]{position:absolute;bottom:0;right:16px;transform:translateY(-50%);background:transparent}.success-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#03cea4;display:none}.danger-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#ff4242;display:none}.not-found__row[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.not-found__row[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:32px}',
              ],
            })),
            e
          );
        })();
      const Fv = (e) =>
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
            e.value
          )
            ? ((e.style.border = "1px solid #D7DADD"), !0)
            : ((e.style.border = "1px solid #FF4242"), !1),
        id = (e) =>
          e.value.length > 3
            ? ((e.style.border = "1px solid #D7DADD"), !0)
            : ((e.style.border = "1px solid #FF4242"), !1),
        uA = ["passwordInputRef"],
        lA = ["emailInputRef"],
        cA = ["successMessageE"],
        dA = ["dangerMessageE"],
        fA = ["successMessageP"],
        hA = ["dangerMessageP"];
      function pA(e, t) {
        1 & e && S(0, "img", 37);
      }
      function gA(e, t) {
        1 & e && S(0, "img", 38);
      }
      function mA(e, t) {
        1 & e && S(0, "img", 39);
      }
      function yA(e, t) {
        1 & e && S(0, "img", 40);
      }
      let _A = (() => {
        class e {
          constructor() {
            (this.isKeepMe = !0),
              (this.isEmailTrue = !1),
              (this.isPasswordTrue = !1),
              (this.isPasswordHidden = !0);
          }
          toggleHidden() {
            (this.isPasswordHidden = !this.isPasswordHidden),
              (this.passwordInputRef.nativeElement.type = this.isPasswordHidden
                ? "password"
                : "text");
          }
          emailCheck() {
            Fv(this.emailInputRef.nativeElement)
              ? ((this.dangerMessageE.nativeElement.style.display = "none"),
                (this.successMessageE.nativeElement.style.display = "block"),
                (this.isEmailTrue = !0))
              : ((this.successMessageE.nativeElement.style.display = "none"),
                (this.dangerMessageE.nativeElement.style.display = "block"),
                (this.isEmailTrue = !1));
          }
          passwordCheck() {
            id(this.passwordInputRef.nativeElement)
              ? ((this.dangerMessageP.nativeElement.style.display = "none"),
                (this.successMessageP.nativeElement.style.display = "block"),
                (this.isPasswordTrue = !0))
              : ((this.successMessageP.nativeElement.style.display = "none"),
                (this.dangerMessageP.nativeElement.style.display = "block"),
                (this.isPasswordTrue = !1));
          }
          submit() {
            this.passwordInputRef.nativeElement.value &&
              this.isEmailTrue &&
              alert("Validation pass!");
          }
          ngAfterViewInit() {}
        }
        return (
          (e.??fac = function (n) {
            return new (n || e)();
          }),
          (e.??cmp = pt({
            type: e,
            selectors: [["app-sign-in"]],
            viewQuery: function (n, r) {
              if (
                (1 & n &&
                  (Ae(uA, 5),
                  Ae(lA, 5),
                  Ae(cA, 5),
                  Ae(dA, 5),
                  Ae(fA, 5),
                  Ae(hA, 5)),
                2 & n)
              ) {
                let o;
                Me((o = Ee())) && (r.passwordInputRef = o.first),
                  Me((o = Ee())) && (r.emailInputRef = o.first),
                  Me((o = Ee())) && (r.successMessageE = o.first),
                  Me((o = Ee())) && (r.dangerMessageE = o.first),
                  Me((o = Ee())) && (r.successMessageP = o.first),
                  Me((o = Ee())) && (r.dangerMessageP = o.first);
              }
            },
            decls: 58,
            vars: 4,
            consts: [
              [1, "background"],
              [1, "sign-in"],
              [1, "sign-in__form"],
              [1, "sign-in__title"],
              [1, "sign-in__info"],
              [1, "form-input-default"],
              ["type", "email", "placeholder", "Your working email", 3, "blur"],
              ["emailInputRef", ""],
              [1, "success-message"],
              ["successMessageE", ""],
              [1, "danger-message"],
              ["dangerMessageE", ""],
              ["type", "password", "placeholder", "Your password", 3, "blur"],
              ["passwordInputRef", ""],
              [1, "password-access-btn", 3, "click"],
              [
                "src",
                "../../../assets/images/Closed-Eye.svg",
                "alt",
                "hide password",
                4,
                "ngIf",
              ],
              [
                "src",
                "../../../assets/images/Eye.svg",
                "alt",
                "show password",
                4,
                "ngIf",
              ],
              ["successMessageP", ""],
              ["dangerMessageP", ""],
              [1, "sign-in__settings"],
              [1, "sign-in__keep"],
              [3, "click"],
              [
                "src",
                "../../../assets/images/questions/checked.svg",
                "alt",
                "checkbox check",
                4,
                "ngIf",
              ],
              [
                "src",
                "../../../assets/images/questions/unchecked.svg",
                "alt",
                "checkbox uncheck",
                4,
                "ngIf",
              ],
              [1, "sign-in__forgot"],
              ["href", "#"],
              [1, "sign-in__button", 3, "click"],
              [1, "sign-in__register"],
              ["routerLink", "/sign-up"],
              [1, "sign-in__socials"],
              [1, "sign-in__icons"],
              [
                "src",
                "../../../assets/images/contacts/Facebook.svg",
                "alt",
                "Facebook icon",
              ],
              [
                "src",
                "../../../assets/images/sign-in/Google.svg",
                "alt",
                "Google icon",
              ],
              [
                "src",
                "../../../assets/images/contacts/Twitter.svg",
                "alt",
                "Twitter icon",
              ],
              [
                "src",
                "../../../assets/images/contacts/Linked-In.svg",
                "alt",
                "Linked-In icon",
              ],
              ["routerLink", "/", 1, "sign-in__close"],
              [
                "src",
                "../../../assets/images/sign-in/Cross.svg",
                "alt",
                "close button",
              ],
              [
                "src",
                "../../../assets/images/Closed-Eye.svg",
                "alt",
                "hide password",
              ],
              ["src", "../../../assets/images/Eye.svg", "alt", "show password"],
              [
                "src",
                "../../../assets/images/questions/checked.svg",
                "alt",
                "checkbox check",
              ],
              [
                "src",
                "../../../assets/images/questions/unchecked.svg",
                "alt",
                "checkbox uncheck",
              ],
            ],
            template: function (n, r) {
              1 & n &&
                (m(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3),
                w(4, "Sign in"),
                y(),
                m(5, "p", 4),
                w(
                  6,
                  " Sign in to your account using email and password provided during registration. "
                ),
                y(),
                m(7, "div", 5)(8, "span"),
                w(9, "Email"),
                y(),
                m(10, "input", 6, 7),
                Te("blur", function () {
                  return r.emailCheck();
                }),
                y(),
                m(12, "div", 8, 9),
                w(14, "Looks good!"),
                y(),
                m(15, "div", 10, 11),
                w(17, "Please provide a valid input."),
                y()(),
                m(18, "div", 5)(19, "span"),
                w(20, "Password"),
                y(),
                m(21, "input", 12, 13),
                Te("blur", function () {
                  return r.passwordCheck();
                }),
                y(),
                m(23, "button", 14),
                Te("click", function () {
                  return r.toggleHidden();
                }),
                dt(24, pA, 1, 0, "img", 15),
                dt(25, gA, 1, 0, "img", 16),
                y(),
                m(26, "div", 8, 17),
                w(28, "Looks good!"),
                y(),
                m(29, "div", 10, 18),
                w(31, "Please provide a valid input."),
                y()(),
                m(32, "div", 19)(33, "div", 20)(34, "button", 21),
                Te("click", function () {
                  return (r.isKeepMe = !r.isKeepMe);
                }),
                dt(35, mA, 1, 0, "img", 22),
                dt(36, yA, 1, 0, "img", 23),
                y(),
                m(37, "span"),
                w(38, "Keep me signed in"),
                y()(),
                m(39, "div", 24)(40, "a", 25),
                w(41, "Forgot password?"),
                y()()(),
                m(42, "button", 26),
                Te("click", function () {
                  return r.submit();
                }),
                w(43, "Sign in"),
                y(),
                m(44, "div", 27),
                w(45, " Don't have an account? "),
                m(46, "a", 28),
                w(47, "Sign up"),
                y()()(),
                m(48, "div", 29)(49, "span"),
                w(50, "Or sign in with"),
                y(),
                m(51, "div", 30),
                S(52, "img", 31)(53, "img", 32)(54, "img", 33)(55, "img", 34),
                y()(),
                m(56, "a", 35),
                S(57, "img", 36),
                y()()()),
                2 & n &&
                  (lt(24),
                  Xe("ngIf", !r.isPasswordHidden),
                  lt(1),
                  Xe("ngIf", r.isPasswordHidden),
                  lt(10),
                  Xe("ngIf", r.isKeepMe),
                  lt(1),
                  Xe("ngIf", !r.isKeepMe));
            },
            dependencies: [Ls, Zr],
            styles: [
              '@charset "UTF-8";@import"https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";.sign-in__button[_ngcontent-%COMP%], .sign-in__title[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:700}.sign-in__socials[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .sign-in__register[_ngcontent-%COMP%], .sign-in__forgot[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .sign-in__keep[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .sign-in__info[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400}*[_ngcontent-%COMP%]{padding:0;margin:0;border:0}*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after{box-sizing:border-box}[_ngcontent-%COMP%]:focus, [_ngcontent-%COMP%]:active{outline:none}a[_ngcontent-%COMP%]:focus, a[_ngcontent-%COMP%]:active{outline:none}nav[_ngcontent-%COMP%], footer[_ngcontent-%COMP%], header[_ngcontent-%COMP%], aside[_ngcontent-%COMP%]{display:block}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%;width:100%;font-size:100%;line-height:1;font-size:14px;-ms-text-size-adjust:100%;-moz-text-size-adjust:100%;-webkit-text-size-adjust:100%}input[_ngcontent-%COMP%], button[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit}input[_ngcontent-%COMP%]::-ms-clear{display:none}button[_ngcontent-%COMP%]{cursor:pointer}button[_ngcontent-%COMP%]::-moz-focus-inner{padding:0;border:0}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover{text-decoration:none}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%]{vertical-align:top}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:400}.container[_ngcontent-%COMP%]{max-width:1280px;margin:0 auto}h3[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:700;font-size:16px;line-height:150%;letter-spacing:1px;text-transform:uppercase;color:#1e212c}h2[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:900;font-size:46px;line-height:130%;color:#1e212c;margin:8px 0 40px}.form-input-default[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;flex:1 1 100%;position:relative}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#9a9ca5;padding:11px 0 12px 16px;background:#FFFFFF;border:1px solid #D7DADD;border-radius:4px;max-height:44px}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border:1px solid rgba(255,63,58,.4);box-shadow:0 80px 80px -20px #ff3f3a14,0 30px 24px -10px #ff3f3a0d,0 12px 10px -6px #ff3f3a0a,0 4px 4px -4px #1e212c08}.form-input-default[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#424551}.password-access-btn[_ngcontent-%COMP%]{position:absolute;bottom:0;right:16px;transform:translateY(-50%);background:transparent}.success-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#03cea4;display:none}.danger-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#ff4242;display:none}.background[_ngcontent-%COMP%]{background:rgba(0,0,0,.5);position:fixed;inset:0;display:flex;justify-content:center;align-items:center;z-index:2}.sign-in[_ngcontent-%COMP%]{overflow-y:scroll;background:white;max-width:486px;position:relative}.sign-in__form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px;padding:48px}.sign-in__title[_ngcontent-%COMP%]{font-size:28px;line-height:150%;color:#1e212c;text-align:center}.sign-in__info[_ngcontent-%COMP%]{font-size:14px;line-height:150%;color:#787a80;text-align:center}.sign-in__settings[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.sign-in__keep[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px}.sign-in__keep[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:16px;height:16px}.sign-in__keep[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:14px;line-height:150%;color:#424551}.sign-in__forgot[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:14px;line-height:150%;text-align:right;color:#ff3f3a}.sign-in__button[_ngcontent-%COMP%]{background:linear-gradient(55.95deg,#FF3F3A 0%,#F75E05 100%);border-radius:4px;display:flex;justify-content:center;align-items:center;font-size:16px;line-height:52px;letter-spacing:.5px;color:#fff;max-height:44px}.sign-in__register[_ngcontent-%COMP%]{font-size:14px;line-height:150%;color:#424551}.sign-in__register[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#ff3f3a}.sign-in__socials[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:16px;border-top:1px solid #E5E8ED;padding:48px}.sign-in__socials[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{text-align:center;font-size:14px;line-height:150%;color:#787a80}.sign-in__icons[_ngcontent-%COMP%]{display:flex;gap:12px}.sign-in__icons[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:20px;height:20px}.sign-in__close[_ngcontent-%COMP%]{position:absolute;top:24px;right:24px;background:transparent}.sign-in[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}',
            ],
          })),
          e
        );
      })();
      const vA = ["nameInputRef"],
        CA = ["emailInputRef"],
        DA = ["passwordInputRef1"],
        wA = ["passwordInputRef2"],
        MA = ["successMessageP1"],
        EA = ["successMessageP2"],
        bA = ["dangerMessageP1"],
        IA = ["dangerMessageP2"],
        xA = ["successMessageE"],
        SA = ["dangerMessageE"];
      function PA(e, t) {
        1 & e && S(0, "img", 43);
      }
      function TA(e, t) {
        1 & e && S(0, "img", 44);
      }
      function OA(e, t) {
        1 & e && S(0, "img", 43);
      }
      function AA(e, t) {
        1 & e && S(0, "img", 44);
      }
      function RA(e, t) {
        1 & e && S(0, "img", 45);
      }
      function NA(e, t) {
        1 & e && S(0, "img", 46);
      }
      const FA = [
        { path: "", component: aA },
        { path: "contacts", component: sA },
        {
          path: "sign-up",
          component: (() => {
            class e {
              constructor() {
                (this.isRememberMe = !0),
                  (this.isPasswordHidden = !0),
                  (this.isNameTrue = !1),
                  (this.isEmailTrue = !1),
                  (this.isPasswordTrue = !1);
              }
              toggleHidden() {
                (this.isPasswordHidden = !this.isPasswordHidden),
                  this.isPasswordHidden
                    ? ((this.passwordInputRef1.nativeElement.type = "password"),
                      (this.passwordInputRef2.nativeElement.type = "password"))
                    : ((this.passwordInputRef1.nativeElement.type = "text"),
                      (this.passwordInputRef2.nativeElement.type = "text"));
              }
              nameCheck() {
                this.isNameTrue = !0;
              }
              emailCheck() {
                Fv(this.emailInputRef.nativeElement)
                  ? ((this.dangerMessageE.nativeElement.style.display = "none"),
                    (this.successMessageE.nativeElement.style.display =
                      "block"),
                    (this.isEmailTrue = !0))
                  : ((this.successMessageE.nativeElement.style.display =
                      "none"),
                    (this.dangerMessageE.nativeElement.style.display = "block"),
                    (this.isEmailTrue = !1));
              }
              passwordCheck1() {
                id(this.passwordInputRef1.nativeElement)
                  ? ((this.dangerMessageP1.nativeElement.style.display =
                      "none"),
                    (this.successMessageP1.nativeElement.style.display =
                      "block"),
                    (this.isPasswordTrue = !0))
                  : ((this.successMessageP1.nativeElement.style.display =
                      "none"),
                    (this.dangerMessageP1.nativeElement.style.display =
                      "block"),
                    (this.isPasswordTrue = !1));
              }
              passwordCheck2() {
                id(this.passwordInputRef2.nativeElement)
                  ? ((this.dangerMessageP2.nativeElement.style.display =
                      "none"),
                    (this.successMessageP2.nativeElement.style.display =
                      "block"),
                    (this.isPasswordTrue = !0))
                  : ((this.successMessageP2.nativeElement.style.display =
                      "none"),
                    (this.dangerMessageP2.nativeElement.style.display =
                      "block"),
                    (this.isPasswordTrue = !1));
              }
              submit() {
                this.passwordInputRef1.nativeElement.value ===
                  this.passwordInputRef2.nativeElement.value &&
                  this.isEmailTrue &&
                  this.isNameTrue &&
                  alert("Validation pass!");
              }
              ngOnInit() {}
            }
            return (
              (e.??fac = function (n) {
                return new (n || e)();
              }),
              (e.??cmp = pt({
                type: e,
                selectors: [["app-sign-up"]],
                viewQuery: function (n, r) {
                  if (
                    (1 & n &&
                      (Ae(vA, 5),
                      Ae(CA, 5),
                      Ae(DA, 5),
                      Ae(wA, 5),
                      Ae(MA, 5),
                      Ae(EA, 5),
                      Ae(bA, 5),
                      Ae(IA, 5),
                      Ae(xA, 5),
                      Ae(SA, 5)),
                    2 & n)
                  ) {
                    let o;
                    Me((o = Ee())) && (r.nameInputRef = o.first),
                      Me((o = Ee())) && (r.emailInputRef = o.first),
                      Me((o = Ee())) && (r.passwordInputRef1 = o.first),
                      Me((o = Ee())) && (r.passwordInputRef2 = o.first),
                      Me((o = Ee())) && (r.successMessageP1 = o.first),
                      Me((o = Ee())) && (r.successMessageP2 = o.first),
                      Me((o = Ee())) && (r.dangerMessageP1 = o.first),
                      Me((o = Ee())) && (r.dangerMessageP2 = o.first),
                      Me((o = Ee())) && (r.successMessageE = o.first),
                      Me((o = Ee())) && (r.dangerMessageE = o.first);
                  }
                },
                inputs: { modal: "modal" },
                decls: 80,
                vars: 6,
                consts: [
                  [1, "background"],
                  [1, "sign-up"],
                  [1, "sign-up__form"],
                  [1, "sign-up__title"],
                  [1, "sign-up__info"],
                  [1, "form-input-default"],
                  ["type", "text", "placeholder", "Your full name", 3, "blur"],
                  ["nameInputRef", ""],
                  [1, "success-message"],
                  ["successMessageN", ""],
                  [1, "danger-message"],
                  ["dangerMessageN", ""],
                  [
                    "type",
                    "email",
                    "placeholder",
                    "Your working email",
                    3,
                    "blur",
                  ],
                  ["emailInputRef", ""],
                  ["successMessageE", ""],
                  ["dangerMessageE", ""],
                  [
                    "type",
                    "password",
                    "placeholder",
                    "Your password",
                    3,
                    "blur",
                  ],
                  ["passwordInputRef1", ""],
                  [1, "password-access-btn", 3, "click"],
                  [
                    "src",
                    "../../../assets/images/Closed-Eye.svg",
                    "alt",
                    "hide password",
                    4,
                    "ngIf",
                  ],
                  [
                    "src",
                    "../../../assets/images/Eye.svg",
                    "alt",
                    "show password",
                    4,
                    "ngIf",
                  ],
                  ["successMessageP1", ""],
                  ["dangerMessageP1", ""],
                  [
                    "type",
                    "password",
                    "placeholder",
                    "Confirm Password",
                    3,
                    "blur",
                  ],
                  ["passwordInputRef2", ""],
                  ["successMessageP2", ""],
                  ["dangerMessageP2", ""],
                  [1, "sign-up__settings"],
                  [1, "sign-up__keep"],
                  [3, "click"],
                  [
                    "src",
                    "../../../assets/images/questions/checked.svg",
                    "alt",
                    "checkbox check",
                    4,
                    "ngIf",
                  ],
                  [
                    "src",
                    "../../../assets/images/questions/unchecked.svg",
                    "alt",
                    "checkbox uncheck",
                    4,
                    "ngIf",
                  ],
                  [1, "sign-up__button", 3, "click"],
                  [1, "sign-up__register"],
                  ["routerLink", "/sign-in"],
                  [1, "sign-up__socials"],
                  [1, "sign-up__icons"],
                  [
                    "src",
                    "../../../assets/images/contacts/Facebook.svg",
                    "alt",
                    "Facebook icon",
                  ],
                  [
                    "src",
                    "../../../assets/images/sign-in/Google.svg",
                    "alt",
                    "Google icon",
                  ],
                  [
                    "src",
                    "../../../assets/images/contacts/Twitter.svg",
                    "alt",
                    "Twitter icon",
                  ],
                  [
                    "src",
                    "../../../assets/images/contacts/Linked-In.svg",
                    "alt",
                    "Linked-In icon",
                  ],
                  ["routerLink", "/", 1, "sign-up__close"],
                  [
                    "src",
                    "../../../assets/images/sign-in/Cross.svg",
                    "alt",
                    "close button",
                  ],
                  [
                    "src",
                    "../../../assets/images/Closed-Eye.svg",
                    "alt",
                    "hide password",
                  ],
                  [
                    "src",
                    "../../../assets/images/Eye.svg",
                    "alt",
                    "show password",
                  ],
                  [
                    "src",
                    "../../../assets/images/questions/checked.svg",
                    "alt",
                    "checkbox check",
                  ],
                  [
                    "src",
                    "../../../assets/images/questions/unchecked.svg",
                    "alt",
                    "checkbox uncheck",
                  ],
                ],
                template: function (n, r) {
                  1 & n &&
                    (m(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3),
                    w(4, "Sign up"),
                    y(),
                    m(5, "p", 4),
                    w(
                      6,
                      " Registration takes less than a minute but gives you full control over your studying. "
                    ),
                    y(),
                    m(7, "div", 5)(8, "span"),
                    w(9, "Full Name"),
                    y(),
                    m(10, "input", 6, 7),
                    Te("blur", function () {
                      return r.nameCheck();
                    }),
                    y(),
                    m(12, "div", 8, 9),
                    w(14, "Looks good!"),
                    y(),
                    m(15, "div", 10, 11),
                    w(17, "Please provide a valid input."),
                    y()(),
                    m(18, "div", 5)(19, "span"),
                    w(20, "Email"),
                    y(),
                    m(21, "input", 12, 13),
                    Te("blur", function () {
                      return r.emailCheck();
                    }),
                    y(),
                    m(23, "div", 8, 14),
                    w(25, "Looks good!"),
                    y(),
                    m(26, "div", 10, 15),
                    w(28, "Please provide a valid input."),
                    y()(),
                    m(29, "div", 5)(30, "span"),
                    w(31, "Password"),
                    y(),
                    m(32, "input", 16, 17),
                    Te("blur", function () {
                      return r.passwordCheck1();
                    }),
                    y(),
                    m(34, "button", 18),
                    Te("click", function () {
                      return r.toggleHidden();
                    }),
                    dt(35, PA, 1, 0, "img", 19),
                    dt(36, TA, 1, 0, "img", 20),
                    y(),
                    m(37, "div", 8, 21),
                    w(39, "Looks good!"),
                    y(),
                    m(40, "div", 10, 22),
                    w(42, "Please provide a valid input."),
                    y()(),
                    m(43, "div", 5)(44, "span"),
                    w(45, "Confirm Password"),
                    y(),
                    m(46, "input", 23, 24),
                    Te("blur", function () {
                      return r.passwordCheck2();
                    }),
                    y(),
                    m(48, "button", 18),
                    Te("click", function () {
                      return r.toggleHidden();
                    }),
                    dt(49, OA, 1, 0, "img", 19),
                    dt(50, AA, 1, 0, "img", 20),
                    y(),
                    m(51, "div", 8, 25),
                    w(53, "Looks good!"),
                    y(),
                    m(54, "div", 10, 26),
                    w(56, "Please provide a valid input."),
                    y()(),
                    m(57, "div", 27)(58, "div", 28)(59, "button", 29),
                    Te("click", function () {
                      return (r.isRememberMe = !r.isRememberMe);
                    }),
                    dt(60, RA, 1, 0, "img", 30),
                    dt(61, NA, 1, 0, "img", 31),
                    y(),
                    m(62, "span"),
                    w(63, "Remember me"),
                    y()()(),
                    m(64, "button", 32),
                    Te("click", function () {
                      return r.submit();
                    }),
                    w(65, "Sign up"),
                    y(),
                    m(66, "div", 33),
                    w(67, " Already have an account? "),
                    m(68, "a", 34),
                    w(69, "Sign in"),
                    y()()(),
                    m(70, "div", 35)(71, "span"),
                    w(72, "Or sign in with"),
                    y(),
                    m(73, "div", 36),
                    S(74, "img", 37)(75, "img", 38)(76, "img", 39)(
                      77,
                      "img",
                      40
                    ),
                    y()(),
                    m(78, "a", 41),
                    S(79, "img", 42),
                    y()()()),
                    2 & n &&
                      (lt(35),
                      Xe("ngIf", !r.isPasswordHidden),
                      lt(1),
                      Xe("ngIf", r.isPasswordHidden),
                      lt(13),
                      Xe("ngIf", !r.isPasswordHidden),
                      lt(1),
                      Xe("ngIf", r.isPasswordHidden),
                      lt(10),
                      Xe("ngIf", r.isRememberMe),
                      lt(1),
                      Xe("ngIf", !r.isRememberMe));
                },
                dependencies: [Ls, Zr],
                styles: [
                  '@charset "UTF-8";@import"https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";.sign-up__button[_ngcontent-%COMP%], .sign-up__title[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:700}.sign-up__socials[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .sign-up__register[_ngcontent-%COMP%], .sign-up__forgot[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .sign-up__keep[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .sign-up__info[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400}*[_ngcontent-%COMP%]{padding:0;margin:0;border:0}*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after{box-sizing:border-box}[_ngcontent-%COMP%]:focus, [_ngcontent-%COMP%]:active{outline:none}a[_ngcontent-%COMP%]:focus, a[_ngcontent-%COMP%]:active{outline:none}nav[_ngcontent-%COMP%], footer[_ngcontent-%COMP%], header[_ngcontent-%COMP%], aside[_ngcontent-%COMP%]{display:block}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%;width:100%;font-size:100%;line-height:1;font-size:14px;-ms-text-size-adjust:100%;-moz-text-size-adjust:100%;-webkit-text-size-adjust:100%}input[_ngcontent-%COMP%], button[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit}input[_ngcontent-%COMP%]::-ms-clear{display:none}button[_ngcontent-%COMP%]{cursor:pointer}button[_ngcontent-%COMP%]::-moz-focus-inner{padding:0;border:0}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover{text-decoration:none}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%]{vertical-align:top}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:400}.container[_ngcontent-%COMP%]{max-width:1280px;margin:0 auto}h3[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:700;font-size:16px;line-height:150%;letter-spacing:1px;text-transform:uppercase;color:#1e212c}h2[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:900;font-size:46px;line-height:130%;color:#1e212c;margin:8px 0 40px}.form-input-default[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;flex:1 1 100%;position:relative}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#9a9ca5;padding:11px 0 12px 16px;background:#FFFFFF;border:1px solid #D7DADD;border-radius:4px;max-height:44px}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border:1px solid rgba(255,63,58,.4);box-shadow:0 80px 80px -20px #ff3f3a14,0 30px 24px -10px #ff3f3a0d,0 12px 10px -6px #ff3f3a0a,0 4px 4px -4px #1e212c08}.form-input-default[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#424551}.password-access-btn[_ngcontent-%COMP%]{position:absolute;bottom:0;right:16px;transform:translateY(-50%);background:transparent}.success-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#03cea4;display:none}.danger-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#ff4242;display:none}.background[_ngcontent-%COMP%]{background:rgba(0,0,0,.5);position:fixed;inset:0;display:flex;justify-content:center;align-items:center;z-index:2}.sign-up[_ngcontent-%COMP%]{height:100%;overflow-y:scroll;background:white;max-width:486px;position:relative}.sign-up__form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px;padding:48px 48px 24px}.sign-up__title[_ngcontent-%COMP%]{font-size:28px;line-height:150%;color:#1e212c;text-align:center}.sign-up__info[_ngcontent-%COMP%]{font-size:14px;line-height:150%;color:#787a80;text-align:center}.sign-up__settings[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.sign-up__keep[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px}.sign-up__keep[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:16px;height:16px}.sign-up__keep[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:14px;line-height:150%;color:#424551}.sign-up__forgot[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:14px;line-height:150%;text-align:right;color:#ff3f3a}.sign-up__button[_ngcontent-%COMP%]{background:linear-gradient(55.95deg,#FF3F3A 0%,#F75E05 100%);border-radius:4px;display:flex;justify-content:center;align-items:center;font-size:16px;line-height:52px;letter-spacing:.5px;color:#fff;max-height:44px}.sign-up__register[_ngcontent-%COMP%]{font-size:14px;line-height:150%;color:#424551}.sign-up__register[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#ff3f3a}.sign-up__socials[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:16px;border-top:1px solid #E5E8ED;padding:24px 48px 48px}.sign-up__socials[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{text-align:center;font-size:14px;line-height:150%;color:#787a80}.sign-up__icons[_ngcontent-%COMP%]{display:flex;gap:12px}.sign-up__icons[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:20px;height:20px}.sign-up__close[_ngcontent-%COMP%]{position:absolute;top:24px;right:24px;background:transparent}.sign-up[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}',
                ],
              })),
              e
            );
          })(),
        },
        { path: "sign-in", component: _A },
      ];
      let kA = (() => {
          class e {}
          return (
            (e.??fac = function (n) {
              return new (n || e)();
            }),
            (e.??mod = Rn({ type: e })),
            (e.??inj = fn({ imports: [Rv.forRoot(FA), Rv] })),
            e
          );
        })(),
        LA = (() => {
          class e {}
          return (
            (e.??fac = function (n) {
              return new (n || e)();
            }),
            (e.??cmp = pt({
              type: e,
              selectors: [["app-header"]],
              decls: 30,
              vars: 0,
              consts: [
                ["id", "header"],
                [1, "container"],
                [1, "header__row"],
                [1, "nav"],
                [1, "logo"],
                [
                  "src",
                  "../../../assets/images/logo.svg",
                  "alt",
                  "web site logo",
                ],
                [1, "nav__menu"],
                [
                  "routerLinkActive",
                  "active-link",
                  "href",
                  "#",
                  1,
                  "nav__link",
                ],
                [
                  "routerLinkActive",
                  "active-link",
                  "routerLink",
                  "/contacts",
                  1,
                  "nav__link",
                ],
                [1, "services"],
                [1, "services__consultation"],
                ["routerLink", "/sign-in"],
                [1, "services__login"],
                [
                  "src",
                  "../../../assets/images/Person.svg",
                  "alt",
                  "person icon",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (m(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "nav", 3)(
                    4,
                    "div",
                    4
                  ),
                  S(5, "img", 5),
                  y(),
                  m(6, "ul", 6)(7, "li")(8, "a", 7),
                  w(9, "About Us"),
                  y()(),
                  m(10, "li")(11, "a", 7),
                  w(12, "Courses"),
                  y()(),
                  m(13, "li")(14, "a", 7),
                  w(15, "Events"),
                  y()(),
                  m(16, "li")(17, "a", 7),
                  w(18, "Blog"),
                  y()(),
                  m(19, "li")(20, "a", 8),
                  w(21, "Contacts"),
                  y()()()(),
                  m(22, "div", 9)(23, "div", 10)(24, "a", 11),
                  w(25, "Get consultation"),
                  y()(),
                  m(26, "div", 12),
                  S(27, "img", 13),
                  m(28, "a", 11),
                  w(29, "Log in/Register"),
                  y()()()()()());
              },
              dependencies: [Zr, bv],
              styles: [
                '@charset "UTF-8";@import"https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";.services__login[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .services__consultation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .nav__link[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:700}*[_ngcontent-%COMP%]{padding:0;margin:0;border:0}*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after{box-sizing:border-box}[_ngcontent-%COMP%]:focus, [_ngcontent-%COMP%]:active{outline:none}a[_ngcontent-%COMP%]:focus, a[_ngcontent-%COMP%]:active{outline:none}nav[_ngcontent-%COMP%], footer[_ngcontent-%COMP%], header[_ngcontent-%COMP%], aside[_ngcontent-%COMP%]{display:block}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%;width:100%;font-size:100%;line-height:1;font-size:14px;-ms-text-size-adjust:100%;-moz-text-size-adjust:100%;-webkit-text-size-adjust:100%}input[_ngcontent-%COMP%], button[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit}input[_ngcontent-%COMP%]::-ms-clear{display:none}button[_ngcontent-%COMP%]{cursor:pointer}button[_ngcontent-%COMP%]::-moz-focus-inner{padding:0;border:0}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover{text-decoration:none}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%]{vertical-align:top}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:400}.container[_ngcontent-%COMP%]{max-width:1280px;margin:0 auto}h3[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:700;font-size:16px;line-height:150%;letter-spacing:1px;text-transform:uppercase;color:#1e212c}h2[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:900;font-size:46px;line-height:130%;color:#1e212c;margin:8px 0 40px}.form-input-default[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;flex:1 1 100%;position:relative}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#9a9ca5;padding:11px 0 12px 16px;background:#FFFFFF;border:1px solid #D7DADD;border-radius:4px;max-height:44px}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border:1px solid rgba(255,63,58,.4);box-shadow:0 80px 80px -20px #ff3f3a14,0 30px 24px -10px #ff3f3a0d,0 12px 10px -6px #ff3f3a0a,0 4px 4px -4px #1e212c08}.form-input-default[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#424551}.password-access-btn[_ngcontent-%COMP%]{position:absolute;bottom:0;right:16px;transform:translateY(-50%);background:transparent}.success-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#03cea4;display:none}.danger-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#ff4242;display:none}.header__row[_ngcontent-%COMP%]{padding:36px 0;display:flex;justify-content:space-between;align-items:center}@media (max-width: 900px){.header__row[_ngcontent-%COMP%]{flex-direction:column}}.nav[_ngcontent-%COMP%]{display:flex;align-items:center;gap:60px}@media (max-width: 1100px){.nav[_ngcontent-%COMP%]{gap:30px}}@media (max-width: 900px){.nav[_ngcontent-%COMP%]{gap:15px}}@media (max-width: 480px){.nav[_ngcontent-%COMP%]{flex-direction:column}}.nav__menu[_ngcontent-%COMP%]{display:flex;gap:40px}@media (max-width: 1100px){.nav__menu[_ngcontent-%COMP%]{gap:20px}}@media (max-width: 900px){.nav__menu[_ngcontent-%COMP%]{gap:10px}}.nav__link[_ngcontent-%COMP%]{color:#424551;font-size:16px;line-height:160%}.nav__link[_ngcontent-%COMP%]:hover{color:#f75e05}.services[_ngcontent-%COMP%]{display:flex;align-items:center}.services__consultation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:flex;background:linear-gradient(55.95deg,#FF3F3A 0%,#F75E05 100%);border-radius:4px;padding:0 40px;font-size:16px;line-height:52px;color:#fff}@media (max-width: 767px){.services__consultation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:0 10px}}.services__login[_ngcontent-%COMP%]{padding:0 0 0 37px;display:flex;align-items:center;justify-content:flex-end;gap:9px}@media (max-width: 767px){.services__login[_ngcontent-%COMP%]{padding:0 0 0 10px}}.services__login[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:16px;line-height:160%;color:#424551}.active-link[_ngcontent-%COMP%]{color:#f75e05}',
              ],
            })),
            e
          );
        })(),
        jA = (() => {
          class e {}
          return (
            (e.??fac = function (n) {
              return new (n || e)();
            }),
            (e.??cmp = pt({
              type: e,
              selectors: [["app-footer"]],
              decls: 96,
              vars: 0,
              consts: [
                [1, "footer"],
                [1, "container"],
                [1, "footer__row"],
                [1, "footer__main"],
                [
                  "src",
                  "../../../assets/images/footer/logo.svg",
                  "alt",
                  "web site logo",
                ],
                [1, "footer__socials"],
                ["href", "#"],
                [
                  "src",
                  "../../../assets/images/contacts/Facebook.svg",
                  "alt",
                  "Facebook icon",
                ],
                [
                  "src",
                  "../../../assets/images/contacts/Twitter.svg",
                  "alt",
                  "Twitter icon",
                ],
                [
                  "src",
                  "../../../assets/images/contacts/YouTube.svg",
                  "alt",
                  "YouTube icon",
                ],
                [
                  "src",
                  "../../../assets/images/contacts/telegram.svg",
                  "alt",
                  "telegram icon",
                ],
                [
                  "src",
                  "../../../assets/images/contacts/Instagram.svg",
                  "alt",
                  "Instagram icon",
                ],
                [
                  "src",
                  "../../../assets/images/contacts/Linked-In.svg",
                  "alt",
                  "Linked-In icon",
                ],
                [1, "footer__list"],
                [
                  "src",
                  "../../../assets/images/footer/iPhone.svg",
                  "alt",
                  "phone icon",
                ],
                [
                  "src",
                  "../../../assets/images/footer/Mail.svg",
                  "alt",
                  "email icon",
                ],
                [1, "footer__form"],
                [1, "footer__input"],
                [
                  "type",
                  "email",
                  "name",
                  "",
                  "placeholder",
                  "Email address",
                  "id",
                  "",
                ],
                [
                  "src",
                  "../../../assets/images/footer/Right.svg",
                  "alt",
                  "submit button",
                ],
                [1, "author"],
                [1, "author__row"],
                [1, "author__rights"],
                [
                  "src",
                  "../../../assets/images/footer/Heart.svg",
                  "alt",
                  "heart",
                ],
                ["href", "#header", 1, "author__link"],
              ],
              template: function (n, r) {
                1 & n &&
                  (m(0, "footer", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3),
                  S(4, "img", 4),
                  m(5, "p"),
                  w(
                    6,
                    " Createx Online School is\xa0a\xa0leader in\xa0online studying. "
                  ),
                  S(7, "br"),
                  w(
                    8,
                    " We\xa0have lots of\xa0courses and programs from the main "
                  ),
                  S(9, "br"),
                  w(10, " market experts. We\xa0provide relevant approaches "),
                  S(11, "br"),
                  w(
                    12,
                    " to\xa0online learning, internships and employment in\xa0the "
                  ),
                  S(13, "br"),
                  w(14, " largest companies in\xa0the country. "),
                  y(),
                  m(15, "div", 5)(16, "a", 6),
                  S(17, "img", 7),
                  y(),
                  m(18, "a", 6),
                  S(19, "img", 8),
                  y(),
                  m(20, "a", 6),
                  S(21, "img", 9),
                  y(),
                  m(22, "a", 6),
                  S(23, "img", 10),
                  y(),
                  m(24, "a", 6),
                  S(25, "img", 11),
                  y(),
                  m(26, "a", 6),
                  S(27, "img", 12),
                  y()()(),
                  m(28, "div", 13)(29, "span"),
                  w(30, "SITE MAP"),
                  y(),
                  m(31, "ul")(32, "li")(33, "a", 6),
                  w(34, "About Us"),
                  y()(),
                  m(35, "li")(36, "a", 6),
                  w(37, "Courses"),
                  y()(),
                  m(38, "li")(39, "a", 6),
                  w(40, "Events"),
                  y()(),
                  m(41, "li")(42, "a", 6),
                  w(43, "Blog"),
                  y()(),
                  m(44, "li")(45, "a", 6),
                  w(46, "Contacts"),
                  y()()()(),
                  m(47, "div", 13)(48, "span"),
                  w(49, "COURSES"),
                  y(),
                  m(50, "ul")(51, "li")(52, "a", 6),
                  w(53, "Marketing"),
                  y()(),
                  m(54, "li")(55, "a", 6),
                  w(56, "Management"),
                  y()(),
                  m(57, "li")(58, "a", 6),
                  w(59, "HR & Recruting"),
                  y()(),
                  m(60, "li")(61, "a", 6),
                  w(62, "Design"),
                  y()(),
                  m(63, "li")(64, "a", 6),
                  w(65, "Development"),
                  y()()()(),
                  m(66, "div", 13)(67, "span"),
                  w(68, "CONTACT US"),
                  y(),
                  m(69, "ul")(70, "li"),
                  S(71, "img", 14),
                  m(72, "a", 6),
                  w(73, "(405) 555-0128"),
                  y()(),
                  m(74, "li"),
                  S(75, "img", 15),
                  m(76, "a", 6),
                  w(77, "hello@createx.com"),
                  y()()()(),
                  m(78, "div", 16)(79, "span"),
                  w(80, "SIGN UP TO OUR NEWSLETTER"),
                  y(),
                  m(81, "div", 17),
                  S(82, "input", 18),
                  m(83, "button"),
                  S(84, "img", 19),
                  y()(),
                  m(85, "p"),
                  w(
                    86,
                    "*Subscribe to our newsletter to receive communications and early updates from Createx SEO Agency."
                  ),
                  y()()()(),
                  m(87, "div", 20)(88, "div", 1)(89, "div", 21)(90, "div", 22),
                  w(91, " \xa9 All rights reserved.Made with "),
                  S(92, "img", 23),
                  w(93, " by Createx Studio "),
                  y(),
                  m(94, "a", 24),
                  w(95, "GO TO TOP"),
                  y()()()()());
              },
              styles: [
                '@charset "UTF-8";@import"https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";.author__link[_ngcontent-%COMP%], .footer__form[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .footer__list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:700}.author__rights[_ngcontent-%COMP%], .footer__input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .footer__form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .footer__list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .footer__main[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400}*[_ngcontent-%COMP%]{padding:0;margin:0;border:0}*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after{box-sizing:border-box}[_ngcontent-%COMP%]:focus, [_ngcontent-%COMP%]:active{outline:none}a[_ngcontent-%COMP%]:focus, a[_ngcontent-%COMP%]:active{outline:none}nav[_ngcontent-%COMP%], footer[_ngcontent-%COMP%], header[_ngcontent-%COMP%], aside[_ngcontent-%COMP%]{display:block}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%;width:100%;font-size:100%;line-height:1;font-size:14px;-ms-text-size-adjust:100%;-moz-text-size-adjust:100%;-webkit-text-size-adjust:100%}input[_ngcontent-%COMP%], button[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit}input[_ngcontent-%COMP%]::-ms-clear{display:none}button[_ngcontent-%COMP%]{cursor:pointer}button[_ngcontent-%COMP%]::-moz-focus-inner{padding:0;border:0}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover{text-decoration:none}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%]{vertical-align:top}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:400}.container[_ngcontent-%COMP%]{max-width:1280px;margin:0 auto}h3[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:700;font-size:16px;line-height:150%;letter-spacing:1px;text-transform:uppercase;color:#1e212c}h2[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:900;font-size:46px;line-height:130%;color:#1e212c;margin:8px 0 40px}.form-input-default[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;flex:1 1 100%;position:relative}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#9a9ca5;padding:11px 0 12px 16px;background:#FFFFFF;border:1px solid #D7DADD;border-radius:4px;max-height:44px}.form-input-default[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border:1px solid rgba(255,63,58,.4);box-shadow:0 80px 80px -20px #ff3f3a14,0 30px 24px -10px #ff3f3a0d,0 12px 10px -6px #ff3f3a0a,0 4px 4px -4px #1e212c08}.form-input-default[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-family:Lato;font-style:normal;font-weight:400;font-size:16px;line-height:160%;color:#424551}.password-access-btn[_ngcontent-%COMP%]{position:absolute;bottom:0;right:16px;transform:translateY(-50%);background:transparent}.success-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#03cea4;display:none}.danger-message[_ngcontent-%COMP%]{position:absolute;bottom:-18px;left:0;font-family:Lato;font-style:normal;font-weight:400;font-size:12px;line-height:150%;color:#ff4242;display:none}.footer[_ngcontent-%COMP%]{background:#1E212C}.footer__row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;gap:80px;padding:80px 0 60px}@media (max-width: 1100px){.footer__row[_ngcontent-%COMP%]{gap:10px}}@media (max-width: 767px){.footer__row[_ngcontent-%COMP%]{flex-direction:column;padding-left:10px}}.footer__main[_ngcontent-%COMP%]{max-width:279px}.footer__main[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px;line-height:150%;color:#fff;opacity:.6;display:inline-block;width:100%;margin:25px 0 41px}.footer__socials[_ngcontent-%COMP%]{display:flex;gap:20px}.footer__list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.footer__list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:16px;line-height:150%;letter-spacing:1px;text-transform:uppercase;color:#fff;margin:0 0 4px}.footer__list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;gap:8px}.footer__list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:16px;line-height:160%;color:#fff;opacity:.6}.footer__form[_ngcontent-%COMP%]{max-width:286px}.footer__form[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:16px;line-height:150%;letter-spacing:1px;text-transform:uppercase;color:#fff}.footer__form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:10px;line-height:150%;color:#fff}.footer__input[_ngcontent-%COMP%]{position:relative}.footer__input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:4px;font-size:12px;line-height:150%;color:#fff;padding:9px 25px 9px 12px;width:100%;margin:24px 0 12px}.footer__input[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{position:absolute;bottom:14px;right:12px;background:transparent;transform:translateY(-50%)}.author[_ngcontent-%COMP%]{background:rgba(255,255,255,.05);padding:20px 0}.author__row[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.author__rights[_ngcontent-%COMP%]{color:#fff;font-size:12px;line-height:150%}.author__link[_ngcontent-%COMP%]{color:#fff;font-size:14px;line-height:150%;opacity:.6}',
              ],
            })),
            e
          );
        })(),
        VA = (() => {
          class e {
            constructor() {
              this.title = "createx";
            }
          }
          return (
            (e.??fac = function (n) {
              return new (n || e)();
            }),
            (e.??cmp = pt({
              type: e,
              selectors: [["app-root"]],
              decls: 4,
              vars: 0,
              consts: [[1, "main"]],
              template: function (n, r) {
                1 & n &&
                  (m(0, "main", 0),
                  S(1, "app-header")(2, "router-outlet")(3, "app-footer"),
                  y());
              },
              dependencies: [Gc, LA, jA],
              styles: [
                ".main[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column;justify-content:space-between}",
              ],
            })),
            e
          );
        })(),
        $A = (() => {
          class e {}
          return (
            (e.??fac = function (n) {
              return new (n || e)();
            }),
            (e.??mod = Rn({ type: e, bootstrap: [VA] })),
            (e.??inj = fn({ imports: [pP, kA] })),
            e
          );
        })();
      (function Nx() {
        Dy = !1;
      })(),
        hP()
          .bootstrapModule($A)
          .catch((e) => console.error(e));
    },
  },
  (ne) => {
    ne((ne.s = 345));
  },
]);

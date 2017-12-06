(function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.RSVP={})})(this,function(t){"use strict";function e(t){var e=t._promiseCallbacks;e||(e=t._promiseCallbacks={});return e}function r(t,e){if(2!==arguments.length)return gt[t];gt[t]=e}function n(){setTimeout(function(){for(var t=0;t<jt.length;t++){var e=jt[t],r=e.payload;r.guid=r.key+r.id;r.childGuid=r.key+r.childId;r.error&&(r.stack=r.error.stack);gt.trigger(e.name,e.payload)}jt.length=0},50)}function o(t,e,r){1===jt.push({name:t,payload:{key:e._guidKey,id:e._id,eventName:t,detail:e._result,childId:r&&r._id,label:e._label,timeStamp:Date.now(),error:gt["instrument-with-stack"]?new Error(e._label):null}})&&n()}function i(t,e){var r=this;if(t&&"object"==typeof t&&t.constructor===r)return t;var n=new r(c,e);v(n,t);return n}function u(){return new TypeError("A promises callback cannot return that same promise.")}function s(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function c(){}function a(){this.error=null}function f(t){try{return t.then}catch(e){Tt.error=e;return Tt}}function l(){try{var t=St;St=null;return t.apply(this,arguments)}catch(e){Pt.error=e;return Pt}}function h(t){St=t;return l}function p(t,e,r,n){try{t.call(e,r,n)}catch(o){return o}}function y(t,e,r){gt.async(function(t){var n=!1,o=p(r,e,function(r){if(!n){n=!0;e!==r?v(t,r,void 0):m(t,r)}},function(e){if(!n){n=!0;w(t,e)}},"Settle: "+(t._label||" unknown promise"));if(!n&&o){n=!0;w(t,o)}},t)}function _(t,e){if(e._state===Ot)m(t,e._result);else if(e._state===At){e._onError=null;w(t,e._result)}else g(e,void 0,function(r){e===r?m(t,r):v(t,r)},function(e){return w(t,e)})}function d(t,e,r){var n=e.constructor===t.constructor&&r===A&&t.constructor.resolve===i;if(n)_(t,e);else if(r===Tt){var o=Tt.error;Tt.error=null;w(t,o)}else"function"==typeof r?y(t,e,r):m(t,e)}function v(t,e){t===e?m(t,e):s(e)?d(t,e,f(e)):m(t,e)}function b(t){t._onError&&t._onError(t._result);j(t)}function m(t,e){if(t._state===Et){t._result=e;t._state=Ot;0===t._subscribers.length?gt.instrument&&o("fulfilled",t):gt.async(j,t)}}function w(t,e){if(t._state===Et){t._state=At;t._result=e;gt.async(b,t)}}function g(t,e,r,n){var o=t._subscribers,i=o.length;t._onError=null;o[i]=e;o[i+Ot]=r;o[i+At]=n;0===i&&t._state&&gt.async(j,t)}function j(t){var e=t._subscribers,r=t._state;gt.instrument&&o(r===Ot?"fulfilled":"rejected",t);if(0!==e.length){for(var n=void 0,i=void 0,u=t._result,s=0;s<e.length;s+=3){n=e[s];i=e[s+r];n?E(r,n,i,u):i(u)}t._subscribers.length=0}}function E(t,e,r,n){var o="function"==typeof r,i=void 0;i=o?h(r)(n):n;if(e._state!==Et);else if(i===e)w(e,u());else if(i===Pt){var s=i.error;i.error=null;w(e,s)}else o?v(e,i):t===Ot?m(e,i):t===At&&w(e,i)}function O(t,e){var r=!1;try{e(function(e){if(!r){r=!0;v(t,e)}},function(e){if(!r){r=!0;w(t,e)}})}catch(n){w(t,n)}}function A(t,e,r){var n=this,i=n._state;if(i===Ot&&!t||i===At&&!e){gt.instrument&&o("chained",n,n);return n}n._onError=null;var u=new n.constructor(c,r),s=n._result;gt.instrument&&o("chained",n,u);if(i===Et)g(n,u,t,e);else{var a=i===Ot?t:e;gt.async(function(){return E(i,u,a,s)})}return u}function T(t,e,r){this._remaining--;t===Ot?this._result[e]={state:"fulfilled",value:r}:this._result[e]={state:"rejected",reason:r}}function P(t,e){return Array.isArray(t)?new Rt(this,t,(!0),e).promise:this.reject(new TypeError("Promise.all must be called with an array"),e)}function S(t,e){var r=this,n=new r(c,e);if(!Array.isArray(t)){w(n,new TypeError("Promise.race must be called with an array"));return n}for(var o=0;n._state===Et&&o<t.length;o++)g(r.resolve(t[o]),void 0,function(t){return v(n,t)},function(t){return w(n,t)});return n}function R(t,e){var r=this,n=new r(c,e);w(n,t);return n}function x(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function k(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function M(){this.value=void 0}function C(t){try{return t.then}catch(e){Ct.value=e;return Ct}}function F(t,e,r){try{t.apply(e,r)}catch(n){Ct.value=n;return Ct}}function I(t,e){for(var r={},n=t.length,o=new Array(n),i=0;i<n;i++)o[i]=t[i];for(var u=0;u<e.length;u++){var s=e[u];r[s]=o[u+1]}return r}function N(t){for(var e=t.length,r=new Array(e-1),n=1;n<e;n++)r[n-1]=t[n];return r}function V(t,e){return{then:function(r,n){return t.call(e,r,n)}}}function U(t,e){var r=function(){for(var r=this,n=arguments.length,o=new Array(n+1),i=!1,u=0;u<n;++u){var s=arguments[u];if(!i){i=q(s);if(i===Ft){var a=new Mt(c);w(a,Ft.value);return a}i&&i!==!0&&(s=V(i,s))}o[u]=s}var f=new Mt(c);o[n]=function(t,r){t?w(f,t):void 0===e?v(f,r):e===!0?v(f,N(arguments)):Array.isArray(e)?v(f,I(arguments,e)):v(f,r)};return i?K(f,o,t,r):D(f,o,t,r)};r.__proto__=t;return r}function D(t,e,r,n){var o=F(r,n,e);o===Ct&&w(t,o.value);return t}function K(t,e,r,n){return Mt.all(e).then(function(e){var o=F(r,n,e);o===Ct&&w(t,o.value);return t})}function q(t){return!(!t||"object"!=typeof t)&&(t.constructor===Mt||C(t))}function G(t,e){return Mt.all(t,e)}function L(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function W(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}});e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function Y(t,e){return Array.isArray(t)?new It(Mt,t,e).promise:Mt.reject(new TypeError("Promise.allSettled must be called with an array"),e)}function $(t,e){return Mt.race(t,e)}function z(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function B(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}});e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function H(t,e){return null===t||"object"!=typeof t?Mt.reject(new TypeError("Promise.hash must be called with an object"),e):new Vt(Mt,t,e).promise}function J(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function Q(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}});e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function X(t,e){return null===t||"object"!=typeof t?Mt.reject(new TypeError("RSVP.hashSettled must be called with an object"),e):new Ut(Mt,t,(!1),e).promise}function Z(t){setTimeout(function(){throw t});throw t}function tt(t){var e={resolve:void 0,reject:void 0};e.promise=new Mt(function(t,r){e.resolve=t;e.reject=r},t);return e}function et(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function rt(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}});e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function nt(t,e,r){return Array.isArray(t)?"function"!=typeof e?Mt.reject(new TypeError("RSVP.map expects a function as a second argument"),r):new Dt(Mt,t,e,r).promise:Mt.reject(new TypeError("RSVP.map must be called with an array"),r)}function ot(t,e){return Mt.resolve(t,e)}function it(t,e){return Mt.reject(t,e)}function ut(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function st(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}});e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function ct(t,e,r){return Array.isArray(t)||null!==t&&"object"==typeof t&&void 0!==t.then?"function"!=typeof e?Mt.reject(new TypeError("RSVP.filter expects function as a second argument"),r):Mt.resolve(t,r).then(function(t){return new qt(Mt,t,e,r).promise}):Mt.reject(new TypeError("RSVP.filter must be called with an array or promise"),r)}function at(t,e){Ht[Gt]=t;Ht[Gt+1]=e;Gt+=2;2===Gt&&Jt()}function ft(){var t=process.nextTick,e=process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);Array.isArray(e)&&"0"===e[1]&&"10"===e[2]&&(t=setImmediate);return function(){return t(_t)}}function lt(){return"undefined"!=typeof Lt?function(){Lt(_t)}:yt()}function ht(){var t=0,e=new $t(_t),r=document.createTextNode("");e.observe(r,{characterData:!0});return function(){return r.data=t=++t%2}}function pt(){var t=new MessageChannel;t.port1.onmessage=_t;return function(){return t.port2.postMessage(0)}}function yt(){return function(){return setTimeout(_t,1)}}function _t(){for(var t=0;t<Gt;t+=2){var e=Ht[t],r=Ht[t+1];e(r);Ht[t]=void 0;Ht[t+1]=void 0}Gt=0}function dt(){try{var t=require,e=t("vertx");Lt=e.runOnLoop||e.runOnContext;return lt()}catch(r){return yt()}}function vt(t,e,r){e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r;return t}function bt(){gt.on.apply(gt,arguments)}function mt(){gt.off.apply(gt,arguments)}var wt={mixin:function(t){t.on=this.on;t.off=this.off;t.trigger=this.trigger;t._promiseCallbacks=void 0;return t},on:function(t,r){if("function"!=typeof r)throw new TypeError("Callback must be a function");var n=e(this),o=void 0;o=n[t];o||(o=n[t]=[]);o.indexOf(r)&&o.push(r)},off:function(t,r){var n=e(this),o=void 0,i=void 0;if(r){o=n[t];i=o.indexOf(r);i!==-1&&o.splice(i,1)}else n[t]=[]},trigger:function(t,r,n){var o=e(this),i=void 0,u=void 0;if(i=o[t])for(var s=0;s<i.length;s++){u=i[s];u(r,n)}}},gt={instrument:!1};wt.mixin(gt);var jt=[],Et=void 0,Ot=1,At=2,Tt=new a,Pt=new a,St=void 0,Rt=function(){function t(t,e,r,n){this._instanceConstructor=t;this.promise=new t(c,n);this._abortOnReject=r;this.isUsingOwnPromise=t===Mt;this._init.apply(this,arguments)}t.prototype._init=function(t,e){var r=e.length||0;this.length=r;this._remaining=r;this._result=new Array(r);this._enumerate(e)};t.prototype._enumerate=function(t){for(var e=this.length,r=this.promise,n=0;r._state===Et&&n<e;n++)this._eachEntry(t[n],n,!0);this._checkFullfillment()};t.prototype._checkFullfillment=function(){0===this._remaining&&m(this.promise,this._result)};t.prototype._settleMaybeThenable=function(t,e,r){var n=this._instanceConstructor,o=n.resolve;if(o===i){var u=f(t);if(u===A&&t._state!==Et){t._onError=null;this._settledAt(t._state,e,t._result,r)}else if("function"!=typeof u)this._settledAt(Ot,e,t,r);else if(this.isUsingOwnPromise){var s=new n(c);d(s,t,u);this._willSettleAt(s,e,r)}else this._willSettleAt(new n(function(e){return e(t)}),e,r)}else this._willSettleAt(o(t),e,r)};t.prototype._eachEntry=function(t,e,r){null!==t&&"object"==typeof t?this._settleMaybeThenable(t,e,r):this._setResultAt(Ot,e,t,r)};t.prototype._settledAt=function(t,e,r,n){var o=this.promise;if(o._state===Et)if(this._abortOnReject&&t===At)w(o,r);else{this._setResultAt(t,e,r,n);this._checkFullfillment()}};t.prototype._setResultAt=function(t,e,r,n){this._remaining--;this._result[e]=r};t.prototype._willSettleAt=function(t,e,r){var n=this;g(t,void 0,function(t){return n._settledAt(Ot,e,t,r)},function(t){return n._settledAt(At,e,t,r)})};return t}(),xt="rsvp_"+Date.now()+"-",kt=0,Mt=function(){function t(e,r){this._id=kt++;this._label=r;this._state=void 0;this._result=void 0;this._subscribers=[];gt.instrument&&o("created",this);if(c!==e){"function"!=typeof e&&x();this instanceof t?O(this,e):k()}}t.prototype._onError=function(t){var e=this;gt.after(function(){e._onError&&gt.trigger("error",t,e._label)})};t.prototype["catch"]=function(t,e){return this.then(void 0,t,e)};t.prototype["finally"]=function(t,e){var r=this,n=r.constructor;return r.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){throw e})},e)};return t}();Mt.cast=i;Mt.all=P;Mt.race=S;Mt.resolve=i;Mt.reject=R;Mt.prototype._guidKey=xt;Mt.prototype.then=A;var Ct=new M,Ft=new M,It=function(t){function e(e,r,n){return L(this,t.call(this,e,r,!1,n))}W(e,t);return e}(Rt);It.prototype._setResultAt=T;var Nt=Object.prototype.hasOwnProperty,Vt=function(t){function e(e,r){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=arguments[3];return z(this,t.call(this,e,r,n,o))}B(e,t);e.prototype._init=function(t,e){this._result={};this._enumerate(e);0===this._remaining&&m(this.promise,this._result)};e.prototype._enumerate=function(t){var e=this.promise,r=[];for(var n in t)Nt.call(t,n)&&r.push({position:n,entry:t[n]});var o=r.length;this._remaining=o;for(var i=void 0,u=0;e._state===Et&&u<o;u++){i=r[u];this._eachEntry(i.entry,i.position)}};return e}(Rt),Ut=function(t){function e(e,r,n){return J(this,t.call(this,e,r,!1,n))}Q(e,t);return e}(Vt);Ut.prototype._setResultAt=T;var Dt=function(t){function e(e,r,n,o){return et(this,t.call(this,e,r,!0,o,n))}rt(e,t);e.prototype._init=function(t,e,r,n,o){var i=e.length||0;this.length=i;this._remaining=i;this._result=new Array(i);this._mapFn=o;this._enumerate(e)};e.prototype._setResultAt=function(t,e,r,n){if(n){var o=h(this._mapFn)(r,e);o===Pt?this._settledAt(At,e,o.error,!1):this._eachEntry(o,e,!1)}else{this._remaining--;this._result[e]=r}};return e}(Rt),Kt={},qt=function(t){function e(e,r,n,o){return ut(this,t.call(this,e,r,!0,o,n))}st(e,t);e.prototype._init=function(t,e,r,n,o){var i=e.length||0;this.length=i;this._remaining=i;this._result=new Array(i);this._filterFn=o;this._enumerate(e)};e.prototype._checkFullfillment=function(){if(0===this._remaining){this._result=this._result.filter(function(t){return t!==Kt});m(this.promise,this._result)}};e.prototype._setResultAt=function(t,e,r,n){if(n){this._result[e]=r;var o=h(this._filterFn)(r,e);o===Pt?this._settledAt(At,e,o.error,!1):this._eachEntry(o,e,!1)}else{this._remaining--;r||(this._result[e]=Kt)}};return e}(Rt),Gt=0,Lt=void 0,Wt="undefined"!=typeof window?window:void 0,Yt=Wt||{},$t=Yt.MutationObserver||Yt.WebKitMutationObserver,zt="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),Bt="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,Ht=new Array(1e3),Jt=void 0;Jt=zt?ft():$t?ht():Bt?pt():void 0===Wt&&"function"==typeof require?dt():yt();if("object"==typeof self);else if("object"!=typeof global)throw new Error("no global: `self` or `global` found");var Qt;gt.async=at;gt.after=function(t){return setTimeout(t,0)};var Xt=ot,Zt=function(t,e){return gt.async(t,e)};if("undefined"!=typeof window&&"object"==typeof window.__PROMISE_INSTRUMENTATION__){var te=window.__PROMISE_INSTRUMENTATION__;r("instrument",!0);for(var ee in te)te.hasOwnProperty(ee)&&bt(ee,te[ee])}var re=(Qt={asap:at,cast:Xt,Promise:Mt,EventTarget:wt,all:G,allSettled:Y,race:$,hash:H,hashSettled:X,rethrow:Z,defer:tt,denodeify:U,configure:r,on:bt,off:mt,resolve:ot,reject:it,map:nt},vt(Qt,"async",Zt),vt(Qt,"filter",ct),Qt);t["default"]=re;t.asap=at;t.cast=Xt;t.Promise=Mt;t.EventTarget=wt;t.all=G;t.allSettled=Y;t.race=$;t.hash=H;t.hashSettled=X;t.rethrow=Z;t.defer=tt;t.denodeify=U;t.configure=r;t.on=bt;t.off=mt;t.resolve=ot;t.reject=it;t.map=nt;t.async=Zt;t.filter=ct;Object.defineProperty(t,"__esModule",{value:!0})});

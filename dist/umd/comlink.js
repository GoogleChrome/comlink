'use strict';(function(f,h){"object"===typeof exports&&"undefined"!==typeof module?h(exports):"function"===typeof define&&define.amd?define(["exports"],h):h(f.Comlink={})})(this,function(f){function h(a,b){r(a)&&(a=t(a));if(!u(a))throw Error("endpoint does not have all of addEventListener, removeEventListener and postMessage defined");v(a);return m(function(b){var d=[];if("APPLY"===b.type||"CONSTRUCT"===b.type)d=b.argumentsList.map(C);return D(a,Object.assign({},b,{argumentsList:d}),w(d)).then(function(a){return x(a.data.value)})},
[],b)}function y(a){a[z]=!0;return a}function A(a,b){r(b)&&(b=t(b));if(!u(b))throw Error("endpoint does not have all of addEventListener, removeEventListener and postMessage defined");v(b);B(b,function(c){if(c.data.id&&c.data.callPath){var d=c.data;c=d.callPath.slice(0,-1).reduce(function(a,b){return a[b]},a);var e=d.callPath.reduce(function(a,b){return a[b]},a);return Promise.all([c,e]).then(function(a){var b=a[0],c=a=a[1],e=[];if("APPLY"===d.type||"CONSTRUCT"===d.type)e=d.argumentsList.map(x);if("APPLY"===
d.type)try{c=a.apply(b,e)}catch(k){c=k,c[p]=!0}if("CONSTRUCT"===d.type)try{c=new (a.bind.apply(a,[void 0].concat(e))),c=y(c)}catch(k){c=k,c[p]=!0}"SET"===d.type&&(a[d.property]=d.value,c=!0);return c}).then(function(a){a:{for(var c=a,e=0,g=Array.from(l);e<g.length;e++){var k=g[e];a=k[0];k=k[1];if(k.canHandle(c)){c=k.serialize(c);a={value:{type:a,value:c}};break a}}a={value:{type:"RAW",value:c}}}a.id=d.id;return b.postMessage(a,w([a]))})}})}function C(a){for(var b=0,c=Array.from(l);b<c.length;b++){var d=
c[b],e=d[0];d=d[1];if(d.canHandle(a))return{type:e,value:d.serialize(a)}}b=[];c=0;for(var g=q(a);c<g.length;c++)for(var n=g[c],f=0,h=Array.from(l);f<h.length;f++)d=h[f],e=d[0],d=d[1],d.canHandle(n.value)&&b.push({path:n.path,wrappedValue:{type:e,value:d.serialize(n.value)}});for(e=0;e<b.length;e++)d=b[e],d.path.slice(0,-1).reduce(function(a,b){return a[b]},a)[d.path[d.path.length-1]]=null;return{type:"RAW",value:a,wrappedChildren:b}}function x(a){if(l.has(a.type)){var b=l.get(a.type);return b.deserialize(a.value)}if("RAW"===
a.type){for(var c=0,d=a.wrappedChildren||[];c<d.length;c++){var e=d[c];if(!l.has(e.wrappedValue.type))throw Error('Unknown value type "'+a.type+'" at '+e.path.join("."));b=l.get(e.wrappedValue.type);b=b.deserialize(e.wrappedValue.value);F(a.value,e.path,b)}return a.value}throw Error('Unknown value type "'+a.type+'"');}function F(a,b,c){var d=b.slice(-1)[0];b.slice(0,-1).reduce(function(a,b){return a[b]},a)[d]=c}function t(a){if("Window"!==self.constructor.name)throw Error("self is not a window");
return{addEventListener:self.addEventListener.bind(self),removeEventListener:self.removeEventListener.bind(self),postMessage:function(b,c){return a.postMessage(b,"*",c)}}}function u(a){return"addEventListener"in a&&"removeEventListener"in a&&"postMessage"in a}function v(a){"MessagePort"===a.constructor.name&&a.start()}function B(a,b){a.addEventListener("message",b)}function r(a){return["window","length","location","parent","opener"].every(function(b){return b in a})}function D(a,b,c){var d=G+"-"+
H++;return new Promise(function(e){B(a,function E(b){b.data.id===d&&(a.removeEventListener("message",E),e(b))});b=Object.assign({},b,{id:d});a.postMessage(b,c)})}function m(a,b,c){void 0===b&&(b=[]);void 0===c&&(c=function(){});return new Proxy(c,{construct:function(d,c){return a({type:"CONSTRUCT",callPath:b,argumentsList:c})},apply:function(c,e,g){return"bind"===b[b.length-1]?m(a,b.slice(0,-1)):a({type:"APPLY",callPath:b,argumentsList:g})},get:function(c,e,g){return"then"===e&&0===b.length?{then:function(){return g}}:
"then"===e?(c=a({type:"GET",callPath:b}),Promise.resolve(c).then.bind(c)):m(a,b.concat(e),c[e])},set:function(c,e,g){return a({type:"SET",callPath:b,property:e,value:g})}})}function I(a){return J.some(function(b){return a instanceof b})}function q(a,b,c,d){void 0===b&&(b=[]);void 0===c&&(c=null);void 0===d&&(d=null);if(!a)return[];c||(c=new WeakSet);d||(d=[]);if(c.has(a)||"string"===typeof a)return[];"object"===typeof a&&c.add(a);if(ArrayBuffer.isView(a))return[];d.push({value:a,path:b});for(var e=
0,g=Object.keys(a);e<g.length;e++){var f=g[e];q(a[f],b.concat([f]),c,d)}return d}function w(a){var b=[],c=0;for(a=q(a);c<a.length;c++){var d=a[c];I(d.value)&&b.push(d.value)}return b}var J=["ArrayBuffer","MessagePort","OffscreenCanvas"].filter(function(a){return a in self}).map(function(a){return self[a]}),G=Math.floor(Math.random()*Number.MAX_SAFE_INTEGER),z=Symbol("proxyValue"),p=Symbol("throw"),l=new Map([["PROXY",{canHandle:function(a){return a&&a[z]},serialize:function(a){var b=new MessageChannel,
c=b.port2;A(a,b.port1);return c},deserialize:function(a){return h(a)}}],["THROW",{canHandle:function(a){return a&&a[p]},serialize:function(a){return Object.assign({},a,{message:a&&a.message,stack:a&&a.stack})},deserialize:function(a){throw Object.assign(Error(),a);}}]]),H=0;f.transferHandlers=l;f.proxy=h;f.proxyValue=y;f.expose=A;Object.defineProperty(f,"__esModule",{value:!0})});

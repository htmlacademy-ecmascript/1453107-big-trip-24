(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,i="millisecond",n="second",a="minute",s="hour",r="day",c="week",d="month",o="quarter",f="year",l="date",p="Invalid Date",b=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,u=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,_={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}},v=function(e,t,i){var n=String(e);return!n||n.length>=t?e:""+Array(t+1-n.length).join(i)+e},h={s:v,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),n=Math.floor(i/60),a=i%60;return(t<=0?"+":"-")+v(n,2,"0")+":"+v(a,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var n=12*(i.year()-t.year())+(i.month()-t.month()),a=t.clone().add(n,d),s=i-a<0,r=t.clone().add(n+(s?-1:1),d);return+(-(n+(i-a)/(s?a-r:r-a))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:d,y:f,w:c,d:r,D:l,h:s,m:a,s:n,ms:i,Q:o}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},m="en",y={};y[m]=_;var g="$isDayjsObject",$=function(e){return e instanceof Z||!(!e||!e[g])},T=function e(t,i,n){var a;if(!t)return m;if("string"==typeof t){var s=t.toLowerCase();y[s]&&(a=s),i&&(y[s]=i,a=s);var r=t.split("-");if(!a&&r.length>1)return e(r[0])}else{var c=t.name;y[c]=t,a=c}return!n&&a&&(m=a),a||!n&&m},M=function(e,t){if($(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new Z(i)},w=h;w.l=T,w.i=$,w.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var Z=function(){function _(e){this.$L=T(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[g]=!0}var v=_.prototype;return v.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(w.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var n=t.match(b);if(n){var a=n[2]-1||0,s=(n[7]||"0").substring(0,3);return i?new Date(Date.UTC(n[1],a,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)):new Date(n[1],a,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)}}return new Date(t)}(e),this.init()},v.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},v.$utils=function(){return w},v.isValid=function(){return!(this.$d.toString()===p)},v.isSame=function(e,t){var i=M(e);return this.startOf(t)<=i&&i<=this.endOf(t)},v.isAfter=function(e,t){return M(e)<this.startOf(t)},v.isBefore=function(e,t){return this.endOf(t)<M(e)},v.$g=function(e,t,i){return w.u(e)?this[t]:this.set(i,e)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(e,t){var i=this,o=!!w.u(t)||t,p=w.p(e),b=function(e,t){var n=w.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return o?n:n.endOf(r)},u=function(e,t){return w.w(i.toDate()[e].apply(i.toDate("s"),(o?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},_=this.$W,v=this.$M,h=this.$D,m="set"+(this.$u?"UTC":"");switch(p){case f:return o?b(1,0):b(31,11);case d:return o?b(1,v):b(0,v+1);case c:var y=this.$locale().weekStart||0,g=(_<y?_+7:_)-y;return b(o?h-g:h+(6-g),v);case r:case l:return u(m+"Hours",0);case s:return u(m+"Minutes",1);case a:return u(m+"Seconds",2);case n:return u(m+"Milliseconds",3);default:return this.clone()}},v.endOf=function(e){return this.startOf(e,!1)},v.$set=function(e,t){var c,o=w.p(e),p="set"+(this.$u?"UTC":""),b=(c={},c[r]=p+"Date",c[l]=p+"Date",c[d]=p+"Month",c[f]=p+"FullYear",c[s]=p+"Hours",c[a]=p+"Minutes",c[n]=p+"Seconds",c[i]=p+"Milliseconds",c)[o],u=o===r?this.$D+(t-this.$W):t;if(o===d||o===f){var _=this.clone().set(l,1);_.$d[b](u),_.init(),this.$d=_.set(l,Math.min(this.$D,_.daysInMonth())).$d}else b&&this.$d[b](u);return this.init(),this},v.set=function(e,t){return this.clone().$set(e,t)},v.get=function(e){return this[w.p(e)]()},v.add=function(i,o){var l,p=this;i=Number(i);var b=w.p(o),u=function(e){var t=M(p);return w.w(t.date(t.date()+Math.round(e*i)),p)};if(b===d)return this.set(d,this.$M+i);if(b===f)return this.set(f,this.$y+i);if(b===r)return u(1);if(b===c)return u(7);var _=(l={},l[a]=e,l[s]=t,l[n]=1e3,l)[b]||1,v=this.$d.getTime()+i*_;return w.w(v,this)},v.subtract=function(e,t){return this.add(-1*e,t)},v.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||p;var n=e||"YYYY-MM-DDTHH:mm:ssZ",a=w.z(this),s=this.$H,r=this.$m,c=this.$M,d=i.weekdays,o=i.months,f=i.meridiem,l=function(e,i,a,s){return e&&(e[i]||e(t,n))||a[i].slice(0,s)},b=function(e){return w.s(s%12||12,e,"0")},_=f||function(e,t,i){var n=e<12?"AM":"PM";return i?n.toLowerCase():n};return n.replace(u,(function(e,n){return n||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return w.s(t.$y,4,"0");case"M":return c+1;case"MM":return w.s(c+1,2,"0");case"MMM":return l(i.monthsShort,c,o,3);case"MMMM":return l(o,c);case"D":return t.$D;case"DD":return w.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return l(i.weekdaysMin,t.$W,d,2);case"ddd":return l(i.weekdaysShort,t.$W,d,3);case"dddd":return d[t.$W];case"H":return String(s);case"HH":return w.s(s,2,"0");case"h":return b(1);case"hh":return b(2);case"a":return _(s,r,!0);case"A":return _(s,r,!1);case"m":return String(r);case"mm":return w.s(r,2,"0");case"s":return String(t.$s);case"ss":return w.s(t.$s,2,"0");case"SSS":return w.s(t.$ms,3,"0");case"Z":return a}return null}(e)||a.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(i,l,p){var b,u=this,_=w.p(l),v=M(i),h=(v.utcOffset()-this.utcOffset())*e,m=this-v,y=function(){return w.m(u,v)};switch(_){case f:b=y()/12;break;case d:b=y();break;case o:b=y()/3;break;case c:b=(m-h)/6048e5;break;case r:b=(m-h)/864e5;break;case s:b=m/t;break;case a:b=m/e;break;case n:b=m/1e3;break;default:b=m}return p?b:w.a(b)},v.daysInMonth=function(){return this.endOf(d).$D},v.$locale=function(){return y[this.$L]},v.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),n=T(e,t,!0);return n&&(i.$L=n),i},v.clone=function(){return w.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},_}(),D=Z.prototype;return M.prototype=D,[["$ms",i],["$s",n],["$m",a],["$H",s],["$W",r],["$M",d],["$y",f],["$D",l]].forEach((function(e){D[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,Z,M),e.$i=!0),M},M.locale=T,M.isDayjs=$,M.unix=function(e){return M(1e3*e)},M.en=y[m],M.Ls=y,M.p={},M}()}},t={};function i(n){var a=t[n];if(void 0!==a)return a.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,i),s.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,i="beforeend"){t.insertAdjacentElement(i,e.getElement())}class n{getTemplate(){return'\n    <ul class="trip-events__list"></ul>\n  '}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var a=i(484),s=i.n(a);const r={date:"MMM D",time:"HH:mm",datetime:"YYYY-MM-DD",eventTime:"DD/MM/YY HH:mm"};function c(e,t){return e?s()(e).format(r[t]):""}class d{constructor({tripPoint:e}){this.tripPoint=e}getTemplate(){return function(e){const{type:t,destination:i,date_from:n,date_to:a,base_price:r,is_favorite:d,offers:o}=e,f=c(n,"date"),l=c(n,"time"),p=c(a,"time"),b=c(n,"datetime"),u=function(e,t){let i=s()(t).diff(s()(e),"minute"),n="",a="",r="";if(i>=1440){const e=Math.floor(i/1440);n=`${e}D`,i-=1440*e}if(i>=60){const e=Math.floor(i/60);a=`${e}H`,i-=60*e}return r=`${i}M`,`${n} ${a} ${r}`}(n,a),_=d?"event__favorite-btn--active":"";return`\n    <li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime=${b}>${f}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${t}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${t} ${i.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime=${n}>${l}</time>\n            &mdash;\n            <time class="event__end-time" datetime=${a}>${p}</time>\n          </p>\n          <p class="event__duration">${u}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${r}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        ${v=o,`\n    <ul class="event__selected-offers">\n    ${v.map((({title:e,price:t})=>`\n        <li class="event__offer">\n          <span class="event__offer-title">${e}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${t}</span>\n        </li>\n      `)).join("")}\n    </ul>\n  `}\n\n        <button class="event__favorite-btn ${_}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>\n  `;var v}(this.tripPoint)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class o{getTemplate(){return'\n    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>\n  '}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const f=[{type:"taxi",offers:[{id:"ddc71da3-2662-41b4-88a3-2e4e70810c94",title:"Upgrade to a business class",price:76},{id:"e5f2a8f0-b788-4538-9562-ba819bc5e110",title:"Choose the radio station",price:126},{id:"8af68438-bce3-4ff6-9781-9112a1f40915",title:"Choose temperature",price:199},{id:"9afaec64-fda7-4e90-ab77-d03281cf1fe3",title:"Drive quickly, I'm in a hurry",price:64},{id:"713c26fb-1371-4fc7-9052-346633947f6d",title:"Drive slowly",price:153}]},{type:"bus",offers:[{id:"85602e4e-f4c8-4e9b-b049-303c30e2fd55",title:"Infotainment system",price:71},{id:"2e962c34-b507-45ff-b435-853c760699c0",title:"Order meal",price:187},{id:"ab581f38-7a20-4c3a-83cf-2b7a79c2c538",title:"Choose seats",price:51}]},{type:"train",offers:[{id:"3f5a6dc0-3b8b-4ab2-a3ad-24cfb2c870b8",title:"Book a taxi at the arrival point",price:178},{id:"547aa918-5a19-4afa-8577-e279b9952824",title:"Order a breakfast",price:124},{id:"0359f6f0-9ec1-4be7-8edf-e731b233c3f1",title:"Wake up at a certain time",price:132}]},{type:"flight",offers:[{id:"bcde7424-e148-47ea-a2d7-4b76e4b82535",title:"Choose meal",price:107},{id:"e24d9ced-27d8-4af9-b424-319b350df937",title:"Choose seats",price:143},{id:"6a4657b0-e00d-4aef-85c8-eaf1889297f7",title:"Upgrade to comfort class",price:108},{id:"c892c024-89b9-41f8-bfbc-9f16eeff7aab",title:"Upgrade to business class",price:177},{id:"efac3f93-f9f4-4b11-becf-c81924e79e41",title:"Add luggage",price:184},{id:"70c534d5-5f42-4973-a5b2-0f8330c04ba8",title:"Business lounge",price:194}]},{type:"check-in",offers:[{id:"06e49025-cb13-40f1-b908-d407e40e7a03",title:"Choose the time of check-in",price:70},{id:"1eca0013-44d6-4f60-913b-be3cc92a451f",title:"Choose the time of check-out",price:187},{id:"83f3d48c-cb3f-44e5-80b4-a674920ba8c6",title:"Add breakfast",price:134},{id:"ecf2e614-0070-48d4-99ce-ab895b5910b4",title:"Laundry",price:200},{id:"714695ba-92a5-423c-9bc7-c42827d83fe2",title:"Order a meal from the restaurant",price:196}]},{type:"sightseeing",offers:[]},{type:"ship",offers:[{id:"6337930e-7d99-4805-bf0c-1dc902817817",title:"Choose meal",price:169},{id:"41de9a8d-9e00-4ec1-b4ba-327841c21df7",title:"Choose seats",price:84},{id:"75db0a2b-75d3-4f38-ac08-7a77058182b8",title:"Upgrade to comfort class",price:179},{id:"8223d0e3-7121-4287-aef2-f3600dd6961c",title:"Upgrade to business class",price:177},{id:"f2664b0c-3574-446d-9a30-f7c1093f92b7",title:"Add luggage",price:39},{id:"b3560210-a2ee-4637-af88-f134eef531bf",title:"Business lounge",price:163}]},{type:"drive",offers:[{id:"04ac19c4-ff17-4a5f-a946-0843f5958daa",title:"With automatic transmission",price:80},{id:"02b51d1e-e704-4b0b-b884-7d560704ca45",title:"With air conditioning",price:52}]},{type:"restaurant",offers:[{id:"dca55199-afd4-4ae7-87c6-d47826ee1d73",title:"Choose live music",price:141},{id:"c5b65695-7818-47e0-bd47-c52edb15d383",title:"Choose VIP area",price:68}]}],l={id:"000",base_price:0,date_from:"",date_to:"",destination:{description:"",name:"",pictures:[]},is_favorite:!1,offers:["dca55199-afd4-4ae7-87c6-d47826ee1d73","c5b65695-7818-47e0-bd47-c52edb15d383"],type:"flight"};class p{constructor({tripPoint:e=l}){this.tripPoint=e}getTemplate(){return function(e){const{type:t,destination:i,date_from:n,date_to:a,base_price:s,offers:r}=e,d=c(n,"eventTime"),o=c(a,"eventTime");return`\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${t.toLowerCase()}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n\n              <div class="event__type-item">\n                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>\n                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n              </div>\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n            ${t}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${i.name}" list="destination-list-1">\n          <datalist id="destination-list-1">\n            <option value="Amsterdam"></option>\n            <option value="Geneva"></option>\n            <option value="Chamonix"></option>\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${d}">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${o}">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${s}">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Delete</button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </header>\n      <section class="event__details">\n\n        ${function(e,t){const i=f.filter((e=>e.type===t))[0].offers;return i.length>0?`\n      <section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n        ${i.map((t=>`\n          <div class="event__available-offers">\n            <div class="event__offer-selector">\n              <input class="event__offer-checkbox  visually-hidden" id="${t.id}" type="checkbox" name="${t.title}" ${e.includes(t)&&"checked"}>\n              <label class="event__offer-label" for="${t.id}">\n                <span class="event__offer-title">${t.title}</span>\n                &plus;&euro;&nbsp;\n                <span class="event__offer-price">${t.price}</span>\n              </label>\n            </div>\n        `)).join("")}\n        </div>\n      </section>\n    `:""}(r,t)}\n\n        ${function({description:e,pictures:t}){return`\n    <section class="event__section  event__section--destination">\n\n    ${e?`<h3 class="event__section-title  event__section-title--destination">Destination</h3>\n            <p class="event__destination-description">${e}</p>`:""}\n\n    ${t.length>0?`<div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${t.map((e=>`\n            <img class="event__photo" src="${e.src}" alt="${e.description}">\n          `))}\n        </div>\n      </div>`:""}\n\n    </section>\n  `}(i)}\n\n      </section>\n    </form>\n  `}(this.tripPoint)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const b=document.querySelector(".trip-events"),u=document.querySelector(".trip-controls__filters"),_=new class{listComponent=new n;constructor({listContainer:e,MOCK_TRIP_POINTS:t,MOCK_DESTINATIONS:i,MOCK_OFFERS:n}){this.listContainer=e,this.tripPoints=t,this.destinations=i,this.offers=n}init(){t(new o,this.listContainer);const e=this.tripPoints.map((e=>function(e,t,i){const{type:n,destination:a,offers:s}=e,r=t.filter((e=>e.id===a))[0],c=i.filter((e=>e.type===n))[0].offers.filter((e=>s.includes(e.id))),d={...e};return d.destination=r,d.offers=c,d}(e,this.destinations,this.offers)));t(new p({tripPoint:e[0]}),this.listContainer),t(new p({}),this.listContainer),t(this.listComponent,this.listContainer);for(let i=1;i<4;i++)t(new d({tripPoint:e[i]}),this.listComponent.getElement())}}({listContainer:b,MOCK_TRIP_POINTS:[{id:"2956dc67-1c8b-48ea-a2f2-cb8db7ad65e0",base_price:1473,date_from:"2024-08-25T17:48:09.936Z",date_to:"2024-08-26T08:39:09.936Z",destination:"75ae5832-8468-4c17-b2b6-1eec4dbeae36",is_favorite:!1,offers:["dca55199-afd4-4ae7-87c6-d47826ee1d73","c5b65695-7818-47e0-bd47-c52edb15d383"],type:"restaurant"},{id:"382306f5-4618-4a8c-94e4-42bf4cbb01f2",base_price:230,date_from:"2024-08-27T17:02:09.936Z",date_to:"2024-08-29T08:41:09.936Z",destination:"1bdc7e0a-17d6-411e-8ed9-ba413fd7860a",is_favorite:!0,offers:["06e49025-cb13-40f1-b908-d407e40e7a03","1eca0013-44d6-4f60-913b-be3cc92a451f","83f3d48c-cb3f-44e5-80b4-a674920ba8c6","ecf2e614-0070-48d4-99ce-ab895b5910b4","714695ba-92a5-423c-9bc7-c42827d83fe2"],type:"check-in"},{id:"3ea6ea86-10d1-4af2-a017-7bf03f21723b",base_price:5984,date_from:"2024-08-29T21:26:09.936Z",date_to:"2024-08-30T19:54:09.936Z",destination:"9aa8c921-d6b9-459b-8604-03c18f7dfc28",is_favorite:!0,offers:["e24d9ced-27d8-4af9-b424-319b350df937","6a4657b0-e00d-4aef-85c8-eaf1889297f7","c892c024-89b9-41f8-bfbc-9f16eeff7aab","efac3f93-f9f4-4b11-becf-c81924e79e41","70c534d5-5f42-4973-a5b2-0f8330c04ba8"],type:"flight"},{id:"eaa16fb5-1ebc-49ac-b8f9-eb60256c0330",base_price:2235,date_from:"2024-08-31T12:57:09.936Z",date_to:"2024-08-31T23:50:09.936Z",destination:"a7f070d6-1b56-4c9b-975f-61078a860de1",is_favorite:!0,offers:["ecf2e614-0070-48d4-99ce-ab895b5910b4","714695ba-92a5-423c-9bc7-c42827d83fe2"],type:"check-in"},{id:"1f40e2ce-d047-404e-9804-9e872f2197f5",base_price:1556,date_from:"2024-09-02T14:05:09.936Z",date_to:"2024-09-04T03:49:09.936Z",destination:"55666483-8a52-42fb-adc3-c68bdcfecd0f",is_favorite:!0,offers:["c5b65695-7818-47e0-bd47-c52edb15d383"],type:"restaurant"},{id:"ed15fd7f-70ef-40f5-b785-e599783d99b4",base_price:2799,date_from:"2024-09-05T01:38:09.936Z",date_to:"2024-09-07T02:00:09.936Z",destination:"e2225dee-32a6-4ede-865b-d42f35aa30a2",is_favorite:!0,offers:[],type:"sightseeing"},{id:"12f88003-a412-455c-ad1a-30225277955a",base_price:3255,date_from:"2024-09-08T23:40:09.936Z",date_to:"2024-09-10T12:19:09.936Z",destination:"55666483-8a52-42fb-adc3-c68bdcfecd0f",is_favorite:!0,offers:["0359f6f0-9ec1-4be7-8edf-e731b233c3f1"],type:"train"},{id:"2ac657d8-3ae5-4bb9-8a25-cd3a93212b56",base_price:6641,date_from:"2024-09-10T20:59:09.936Z",date_to:"2024-09-12T19:00:09.936Z",destination:"0a26a247-2fc5-45fb-a874-ed85317e3053",is_favorite:!0,offers:["85602e4e-f4c8-4e9b-b049-303c30e2fd55","2e962c34-b507-45ff-b435-853c760699c0","ab581f38-7a20-4c3a-83cf-2b7a79c2c538"],type:"bus"},{id:"c2d15118-362f-4aaa-a1ee-1254e506b7e6",base_price:2896,date_from:"2024-09-14T12:12:09.936Z",date_to:"2024-09-16T03:05:09.936Z",destination:"e75d5a88-4377-406a-baf8-866561a7f580",is_favorite:!0,offers:[],type:"taxi"},{id:"7bf58e55-a277-4bd1-ab68-732928127b25",base_price:6658,date_from:"2024-09-17T13:37:09.936Z",date_to:"2024-09-17T22:01:09.936Z",destination:"f81cb09d-8504-4e61-99ea-5e2169a418d3",is_favorite:!0,offers:["85602e4e-f4c8-4e9b-b049-303c30e2fd55","2e962c34-b507-45ff-b435-853c760699c0","ab581f38-7a20-4c3a-83cf-2b7a79c2c538"],type:"bus"},{id:"1f2316a2-cc93-4dbb-a65c-7b9edc709185",base_price:1629,date_from:"2024-09-18T21:17:09.936Z",date_to:"2024-09-20T01:20:09.936Z",destination:"e2225dee-32a6-4ede-865b-d42f35aa30a2",is_favorite:!0,offers:["9afaec64-fda7-4e90-ab77-d03281cf1fe3","713c26fb-1371-4fc7-9052-346633947f6d"],type:"taxi"},{id:"7fad1610-e7b7-468a-bfeb-9d615a4373f7",base_price:1498,date_from:"2024-09-21T18:11:09.936Z",date_to:"2024-09-22T03:31:09.936Z",destination:"f81cb09d-8504-4e61-99ea-5e2169a418d3",is_favorite:!0,offers:["ecf2e614-0070-48d4-99ce-ab895b5910b4","714695ba-92a5-423c-9bc7-c42827d83fe2"],type:"check-in"},{id:"a1426e14-0e76-4377-80d1-f809700c697e",base_price:1102,date_from:"2024-09-23T14:38:09.936Z",date_to:"2024-09-23T21:30:09.936Z",destination:"0a26a247-2fc5-45fb-a874-ed85317e3053",is_favorite:!0,offers:["41de9a8d-9e00-4ec1-b4ba-327841c21df7","75db0a2b-75d3-4f38-ac08-7a77058182b8","8223d0e3-7121-4287-aef2-f3600dd6961c","f2664b0c-3574-446d-9a30-f7c1093f92b7","b3560210-a2ee-4637-af88-f134eef531bf"],type:"ship"},{id:"6b2f506d-7926-4c85-bdc8-248c479c1a14",base_price:7682,date_from:"2024-09-25T07:02:09.936Z",date_to:"2024-09-25T14:08:09.936Z",destination:"75ae5832-8468-4c17-b2b6-1eec4dbeae36",is_favorite:!0,offers:["06e49025-cb13-40f1-b908-d407e40e7a03","1eca0013-44d6-4f60-913b-be3cc92a451f","83f3d48c-cb3f-44e5-80b4-a674920ba8c6","ecf2e614-0070-48d4-99ce-ab895b5910b4","714695ba-92a5-423c-9bc7-c42827d83fe2"],type:"check-in"},{id:"e4f365c8-83cc-452f-b5e8-67a12562f9e1",base_price:1237,date_from:"2024-09-27T04:04:09.936Z",date_to:"2024-09-27T10:29:09.936Z",destination:"75ae5832-8468-4c17-b2b6-1eec4dbeae36",is_favorite:!0,offers:[],type:"sightseeing"},{id:"2418e5ca-fdf0-4edb-99ac-1a9561abf162",base_price:3151,date_from:"2024-09-28T08:33:09.936Z",date_to:"2024-09-29T11:56:09.936Z",destination:"9aa8c921-d6b9-459b-8604-03c18f7dfc28",is_favorite:!0,offers:["1eca0013-44d6-4f60-913b-be3cc92a451f","83f3d48c-cb3f-44e5-80b4-a674920ba8c6","ecf2e614-0070-48d4-99ce-ab895b5910b4","714695ba-92a5-423c-9bc7-c42827d83fe2"],type:"check-in"},{id:"d1ff74db-8687-45f8-a12c-26e6364c4c67",base_price:7368,date_from:"2024-09-29T22:36:09.936Z",date_to:"2024-10-01T22:02:09.936Z",destination:"e75d5a88-4377-406a-baf8-866561a7f580",is_favorite:!1,offers:["ddc71da3-2662-41b4-88a3-2e4e70810c94","e5f2a8f0-b788-4538-9562-ba819bc5e110","8af68438-bce3-4ff6-9781-9112a1f40915","9afaec64-fda7-4e90-ab77-d03281cf1fe3","713c26fb-1371-4fc7-9052-346633947f6d"],type:"taxi"},{id:"a9d68359-eb77-443a-85b6-0175a402c530",base_price:5979,date_from:"2024-10-03T13:01:09.936Z",date_to:"2024-10-05T13:38:09.936Z",destination:"a7f070d6-1b56-4c9b-975f-61078a860de1",is_favorite:!0,offers:[],type:"sightseeing"},{id:"7832537e-8554-4daf-a932-354ae6982db5",base_price:9698,date_from:"2024-10-07T00:12:09.936Z",date_to:"2024-10-08T01:59:09.936Z",destination:"9aa8c921-d6b9-459b-8604-03c18f7dfc28",is_favorite:!0,offers:["0359f6f0-9ec1-4be7-8edf-e731b233c3f1"],type:"train"},{id:"68831e98-843f-4b92-969b-a321a58e362a",base_price:6783,date_from:"2024-10-09T08:25:09.936Z",date_to:"2024-10-09T21:56:09.936Z",destination:"e2225dee-32a6-4ede-865b-d42f35aa30a2",is_favorite:!0,offers:[],type:"restaurant"},{id:"40e142d5-fb9e-4cd8-8a1a-51e3c29cd6ea",base_price:6074,date_from:"2024-10-10T23:53:09.936Z",date_to:"2024-10-12T04:35:09.936Z",destination:"1bdc7e0a-17d6-411e-8ed9-ba413fd7860a",is_favorite:!0,offers:["dca55199-afd4-4ae7-87c6-d47826ee1d73","c5b65695-7818-47e0-bd47-c52edb15d383"],type:"restaurant"},{id:"5d9137fa-d619-4da7-8a0e-578ee9f4d399",base_price:4521,date_from:"2024-10-14T00:57:09.936Z",date_to:"2024-10-15T05:36:09.936Z",destination:"1bdc7e0a-17d6-411e-8ed9-ba413fd7860a",is_favorite:!1,offers:["9afaec64-fda7-4e90-ab77-d03281cf1fe3","713c26fb-1371-4fc7-9052-346633947f6d"],type:"taxi"},{id:"81458cee-f64a-41e9-820c-ea3f5cae82bf",base_price:2455,date_from:"2024-10-16T07:38:09.936Z",date_to:"2024-10-17T14:19:09.936Z",destination:"e75d5a88-4377-406a-baf8-866561a7f580",is_favorite:!0,offers:["6a4657b0-e00d-4aef-85c8-eaf1889297f7","c892c024-89b9-41f8-bfbc-9f16eeff7aab","efac3f93-f9f4-4b11-becf-c81924e79e41","70c534d5-5f42-4973-a5b2-0f8330c04ba8"],type:"flight"},{id:"2e5d26db-e24c-4b9e-8ed6-ed7c8b9f779a",base_price:102,date_from:"2024-10-18T20:15:09.936Z",date_to:"2024-10-20T18:08:09.936Z",destination:"46b14717-91f4-47d5-b540-86d6a523ba69",is_favorite:!0,offers:[],type:"sightseeing"},{id:"c1c38416-acf4-422a-abe1-a79a09762549",base_price:3452,date_from:"2024-10-21T06:19:09.936Z",date_to:"2024-10-22T15:40:09.936Z",destination:"46b14717-91f4-47d5-b540-86d6a523ba69",is_favorite:!1,offers:[],type:"sightseeing"}],MOCK_DESTINATIONS:[{id:"f81cb09d-8504-4e61-99ea-5e2169a418d3",description:"Paris - a true asian pearl",name:"Paris",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/11.jpg",description:"Paris full of of cozy canteens where you can try the best coffee in the Middle East"}]},{id:"75ae5832-8468-4c17-b2b6-1eec4dbeae36",description:"Chamonix - with a beautiful old town",name:"Chamonix",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/3.jpg",description:"Chamonix famous for its crowded street markets with the best street food in Asia"}]},{id:"e75d5a88-4377-406a-baf8-866561a7f580",description:"Nagasaki - in a middle of Europe",name:"Nagasaki",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/18.jpg",description:"Nagasaki is a beautiful city"},{src:"https://24.objects.htmlacademy.pro/static/destinations/4.jpg",description:"Nagasaki in a middle of Europe"},{src:"https://24.objects.htmlacademy.pro/static/destinations/4.jpg",description:"Nagasaki middle-eastern paradise"},{src:"https://24.objects.htmlacademy.pro/static/destinations/10.jpg",description:"Nagasaki is a beautiful city"}]},{id:"1bdc7e0a-17d6-411e-8ed9-ba413fd7860a",description:"Geneva - a perfect place to stay with a family",name:"Geneva",pictures:[]},{id:"e2225dee-32a6-4ede-865b-d42f35aa30a2",description:"Rome - with an embankment of a mighty river as a centre of attraction",name:"Rome",pictures:[]},{id:"0a26a247-2fc5-45fb-a874-ed85317e3053",description:"",name:"Den Haag",pictures:[]},{id:"9aa8c921-d6b9-459b-8604-03c18f7dfc28",description:"Berlin - with a beautiful old town",name:"Berlin",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/11.jpg",description:"Berlin middle-eastern paradise"},{src:"https://24.objects.htmlacademy.pro/static/destinations/7.jpg",description:"Berlin with a beautiful old town"}]},{id:"46b14717-91f4-47d5-b540-86d6a523ba69",description:"",name:"Monaco",pictures:[]},{id:"55666483-8a52-42fb-adc3-c68bdcfecd0f",description:"Venice - with an embankment of a mighty river as a centre of attraction",name:"Venice",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/14.jpg",description:"Venice famous for its crowded street markets with the best street food in Asia"},{src:"https://24.objects.htmlacademy.pro/static/destinations/18.jpg",description:"Venice with crowded streets"}]},{id:"a7f070d6-1b56-4c9b-975f-61078a860de1",description:"",name:"Frankfurt",pictures:[]}],MOCK_OFFERS:f});t(new class{getTemplate(){return'\n    <div class="trip-main__trip-controls  trip-controls">\n      <div class="trip-controls__filters">\n        <h2 class="visually-hidden">Filter events</h2>\n        <form class="trip-filters" action="#" method="get">\n          <div class="trip-filters__filter">\n            <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n            <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n          </div>\n\n          <div class="trip-filters__filter">\n            <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n            <label class="trip-filters__filter-label" for="filter-future">Future</label>\n          </div>\n\n          <div class="trip-filters__filter">\n            <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n            <label class="trip-filters__filter-label" for="filter-present">Present</label>\n          </div>\n\n          <div class="trip-filters__filter">\n            <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n            <label class="trip-filters__filter-label" for="filter-past">Past</label>\n          </div>\n\n          <button class="visually-hidden" type="submit">Accept filter</button>\n        </form>\n      </div>\n    </div>\n  '}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},u),_.init()})()})();
//# sourceMappingURL=bundle.e4d6d526215f9db62d37.js.map
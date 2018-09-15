function getBaseType(e){return Object.prototype.toString.apply(e).slice(8,-1)}function eachObj(e,t){for(var n in e)t(e[n],n,e)}function getKeys(e,t){var n=[];return eachObj(e,function(e,t){n.push(t)}),n.sort(t)}function extend(n,e){return eachObj(e,function(e,t){n[t]=e}),n}function getPosition(e){var t=0,n=0;if(!e.tagName)return console.warn("element must be a HTML element object"),{x:null,y:null};for(;e!==document.body;)t+=e.offsetLeft,n+=e.offsetTop,e=e.offsetParent;return{x:t,y:n}}!function(t){function s(t){this.ele=t,this.record=[],this.index=0,this.dir=1,this.status=!1}s.prototype={_toggleClass:function(t,s){var i=this;classArr=t.split(" "),classArr.forEach(function(t){i.ele.classList.toggle(t)}),s&&setTimeout(s,10)},_transfromClass:function(t,i){var e=this;this.ele.addEventListener("transitionend",function t(s){e.ele===s.target&&(i(),e.ele.removeEventListener("transitionend",t))}),this._toggleClass(t)},_animationClass:function(t,i){var e=this;this.ele.addEventListener("animationend",function t(s){e.ele===s.target&&(i(),e.ele.removeEventListener("animationend",t))}),this._toggleClass(t)},_toggle:function(){var t=this.record[this.index];if(this.index===this.record.length||-1===this.index)return this.end&&this.end(),this.index=0<this.dir?this.index-1:0,this.dir*=-1,void(this.status=!1);switch(t.type){case"class":this._toggleClass(t.className,this._toggle.bind(this));break;case"transfrom":this._transfromClass(t.className,this._toggle.bind(this));break;case"animation":this._animationClass(t.className,this._toggle.bind(this))}this.index+=this.dir},base:function(t){return this.record.push({className:t||"js-open",type:"class"}),this},transfrom:function(t){return this.record.push({className:t,type:"transfrom"}),this},animation:function(t){return this.record.push({className:t,type:"animation"}),this},toggle:function(){this.status||(0!==this.index&&this.index!==this.record.length-1||(this.status=!0),this._toggle())},lastStart:function(){var s=this;return this.status=!1,this.index=this.record.length-1,this.dir=-1,this.record.forEach(function(t){s.ele.classList.add(t.className)}),this},end:function(t){return this.end=t,this}},t.Pack=s}(window);!function(t){function i(){this.record=[],this.timeoutMap={},this.listeners={start:[],frame:[],end:[]},this.frames=0,this._init()}i.prototype={_init:function(){return this.index=0,this.nowIndex=0,this.timer=null,this.time=0,this.startTime=null,this.record.forEach(function(e){eachObj(e,function(t,i){~i.indexOf("_")||(e[i].now=e[i].from)})}),this},_getSpendTime:function(){var t=this.time,n=this.nowIndex;return t-this.record.reduce(function(t,i,e){return e<n&&(t+=i._time),t},0)},_request:function(t){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;return this.timer=i(t),this},_cancel:function(){return(window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame)(this.timer),this},_algorithm:function(t){var i,e,n,r,o,s=t.type||"linear",m=t.time||1e3,a=t.now,u=t.aims||0,h=t.spendTime||0;switch(s){case"linear":return e=(i={time:m,now:a,aims:u,spendTime:h}).time,n=i.now,r=i.aims,o=n+60*(r-n)/(e-i.spendTime),0<r-n?r<=o?r:o:o<=r?r:o}},_emit:function(t,i){return this.listeners[t]&&this.listeners[t].forEach(function(t){t(i)}),this},on:function(t,i){return~getKeys(this.listeners).indexOf(t)&&i&&this.listeners[t].push(i),this},from:function(t){t=t||{};var e=this.record[this.index]||{};return eachObj(t,function(t,i){e[i]={from:t,now:t,to:0}}),this.record[this.index]=e,this},to:function(t){t=t||{};var e=this.record[this.index]||{};return eachObj(t,function(t,i){e[i]=extend(e[i]||{from:0,now:0},{to:t})}),this.record[this.index]=e,this},transition:function(t){var i,e;"string"==typeof t?e=t:(i=t.type||"linear",e=t.time||1e3);var n=this.record[this.index]||{};return extend(n,{_time:e,_type:i}),this.record[this.index]=n,this},next:function(){return this.index=this.record.length,this},timeout:function(t){if(t&&"number"==typeof t){var i=0===this.record.length?-1:this.index;this.timeoutMap[i]=null!=this.timeoutMap[i]?this.timeoutMap[i]+t:t}return this},start:function(){var e=this.record,o=this;return this.next()._emit("start")._request(function t(){var n=e[o.nowIndex],r={};if(!o.startTime&&o.timeoutMap[-1])return o.startTime=(new Date).getTime(),o.pause(),void setTimeout(function(){o._request(t)},o.timeoutMap[-1]);if(o.time===n._time){var i=o.timeoutMap[o.nowIndex];if(o.time=0,o.nowIndex++,i)return o.pause(),void setTimeout(function(){o._request(t)},i);n=e[o.nowIndex]}o.nowIndex!==e.length?(eachObj(n,function(t,i){if(!~i.indexOf("_")){var e=o._algorithm({type:n._type,time:n._time,now:t.now,aims:t.to,spendTime:o.time});r[i]=e,(n[i].now=e)===t.to&&(o.time=n._time)}}),o.time!=n._time&&(o.time+=60),o._emit("frame",r),o.frames++,o._request(t)):o._emit("end").close()})},pause:function(){return this._cancel()},close:function(){return this._cancel()._init()}},t.Amt=i}(window);function disableLoad(){var e=document.getElementById("page");document.getElementById("page-loading").classList.add("js-hidden"),e.classList.remove("js-hidden")}document.onreadystatechange=function(){var e=document.getElementById("page");"interactive"==document.readyState&&window.setTimeout(function(){disableLoad()},4e3),"complete"==document.readyState&&e.classList.contains("js-hidden")&&disableLoad()};window.addEventListener("load",function(){var t;(t=document.getElementById("page-header"))&&document.addEventListener("scroll",function(){var e=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;t.classList[30<e?"add":"remove"]("page__header--small")}),function(){var e=document.querySelector("button.page__menu-btn"),t=document.querySelector("nav.page__nav");if(e&&t){var n=new Pack(t);n.base("js-open").transfrom("page__nav--open"),e.addEventListener("click",function(){n.toggle()})}}(),function(){var e=document.getElementById("page-header");if(e){var t=e.querySelector(".info__title"),n=e.querySelector(".info__desc");t&&new Pack(t).animation("js-animation").end(function(){["js-animation"].forEach(function(e){t.classList.remove(e)})}).toggle(),n&&new Pack(n).base("js-ease-out-leave-active").base("js-ease-out-leave").transfrom("js-ease-out-enter-active").end(function(){["js-ease-out-enter","js-ease-out-enter-active","js-ease-out-leave","js-ease-out-leave-active"].forEach(function(e){n.classList.remove(e)})}).toggle()}}(),$('a[href="#"]').on("click",function(e){e.preventDefault()}),$(".nav__list > li").on("mouseover",function(e){$(this).find("ul:first").show(),$(this).find("> a").addClass("active")}).on("mouseout",function(e){$(this).find("ul:first").hide(),$(this).find("> a").removeClass("active")}),$(".nav__list li li").on("mouseover",function(e){$(this).has("ul").length&&$(this).parent().addClass("expanded"),$("ul:first",this).parent().find("> a").addClass("active"),$("ul:first",this).show()}).on("mouseout",function(e){$(this).parent().removeClass("expanded"),$("ul:first",this).parent().find("> a").removeClass("active"),$("ul:first",this).hide()})});window.addEventListener("load",function(){!function(){var o=document.getElementById("back-top"),e=new Pack(o);if(o){function t(){var t=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop,n=o.classList.contains("back-top--hidden")&&o.classList.contains("js-hidden");(350<t&&n||t<350&&!n)&&e.toggle()}e.transfrom("back-top--hidden").base("js-hidden").lastStart(),t(),document.addEventListener("scroll",t),o.addEventListener("click",function(){(new Amt).from({top:window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop}).to({top:0}).transition(1e3).on("frame",function(t){window.scrollTo(0,t.top)}).start()})}}()});window.addEventListener("load",function(){window._skappPostAnimation=function(){document.querySelectorAll("article.page__mini-article").forEach(function(n){if(!n.parentElement.parentElement.classList.contains("js-hidden")){var t=getPosition(n),i=new Pack(n);i.base("js-ease-out-leave-active").base("js-ease-out-leave").transfrom("js-ease-out-enter-active").end(function(){["js-ease-out-enter","js-ease-out-enter-active","js-ease-out-leave","js-ease-out-leave-active"].forEach(function(e){n.classList.remove(e)})}),function(e){var n=null,t=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,i=window.cancelAnimationFrame||window.mozCancelAnimationFrame;function o(){i(n),n=t(e.bind(null,function(){document.removeEventListener("scroll",o)}))}document.addEventListener("scroll",o),o()}(function(e){t.y-window.scrollY-document.documentElement.clientHeight<50&&(e(),i.toggle())})}})},window._skappPostAnimation()});
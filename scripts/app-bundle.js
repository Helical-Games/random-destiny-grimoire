define("app",["exports"],function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.App=function(){function e(){t(this,e)}return e.prototype.configureRouter=function(e,t){e.map([{route:["","random"],name:"random",moduleId:"./random",nav:!0,title:"Random Grimoire"},{route:"card/:id",name:"card",moduleId:"./card",nav:!1,title:"Grimoire Card"}]),this.router=t},e}()}),define("card",["exports","data-service"],function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.CardView=void 0;var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();e.CardView=function(){function e(){r(this,e),this.card=null,this.cardName="",this.pageName="",this.themeName="",this.color="footer-color-1",this.shareHref="",this.encodedCardName=""}return e.prototype.activate=function(e){this.id=e.id},e.prototype.attached=function(){var e=this;(0,t.fetchGrimoire)().then(function(t){for(var r=0;r<t.length;r++)for(var n=t[r],a=0;a<n.pageCollection.length;a++)for(var i=n.pageCollection[a],o=0;o<i.cardCollection.length;o++){var c=i.cardCollection[o];if(c.cardId==e.id){e.shareHref=encodeURIComponent(window.location.href),e.encodedCardName=encodeURIComponent(c.cardName),e.themeName=n.themeName,e.card=c,e.cardName=c.cardName,e.pageName=i.pageName,document.getElementById("body").className="color-"+c.rarity,e.color="footer-color-"+c.rarity,document.getElementById("grimoire-card").scrollIntoView();break}}})},n(e,[{key:"title",get:function(){return""+this.cardName}},{key:"categoryTitle",get:function(){return this.themeName+" :: "+this.pageName}}]),e}()}),define("data-service",["exports","aurelia-fetch-client"],function(e,t){"use strict";function r(){if(localStorage.grimoire)return new Promise(function(e,t){e(JSON.parse(localStorage.getItem("grimoire")))});var e=new t.HttpClient;return e.fetch("data/grimoire.json").then(function(e){return e.json()}).then(function(e){return localStorage.setItem("grimoire",JSON.stringify(e.Response.themeCollection)),e.Response.themeCollection}).catch(function(e){console.error(e)})}Object.defineProperty(e,"__esModule",{value:!0}),e.fetchGrimoire=r}),define("environment",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={debug:!1,testing:!1}}),define("main",["exports","./environment"],function(e,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e){e.use.standardConfiguration().feature("resources"),a.default.debug&&e.use.developmentLogging(),a.default.testing&&e.use.plugin("aurelia-testing"),e.start().then(function(){return e.setRoot()})}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=n;var a=r(t);Promise.config({warnings:{wForgottenReturn:!1}})}),define("random",["exports","progressbar.js","data-service"],function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.RandomCardView=void 0;var i=n(t),o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();e.RandomCardView=function(){function e(){a(this,e),this.themes=null,this.card=null,this.cardName="",this.pageName="",this.themeName="",this.bar=null,this.color="footer-color-1",this.shareHref=encodeURIComponent(window.location.href),this.timerPlaying=!0}return e.prototype.attached=function(){var e=this;localStorage.rdgTimerPlaying&&(this.timerPlaying="true"==localStorage.rdgTimerPlaying),(0,r.fetchGrimoire)().then(function(t){e.themes=t,e.updateCard()})},e.prototype.updateCard=function(){var e=this;document.getElementById("grimoire-card").scrollIntoView();var t=this.themes[Math.floor(Math.random()*this.themes.length)];this.themeName=t.themeName;var r=t.pageCollection[Math.floor(Math.random()*t.pageCollection.length)];this.pageName=r.pageName,this.card=r.cardCollection[Math.floor(Math.random()*r.cardCollection.length)],this.cardName=this.card.cardName,document.getElementById("body").className="color-"+this.card.rarity,this.color="footer-color-"+this.card.rarity;var n=Math.max(this.card.cardDescription.split(" ").length/200*60,10);null!==this.bar&&this.bar.destroy();var a="#2196F3";2===this.card.rarity&&(a="#673AB7"),3===this.card.rarity&&(a="#FF9800"),this.bar=new i.default.Line(document.getElementById("progressBar"),{duration:1e3*n,color:"#f44336",trailColor:"#e9e9e9",svgStyle:{width:"100%",height:"100%"},from:{color:"#f44336"},to:{color:a},step:function(e,t){t.path.setAttribute("stroke",e.color)}}),this.bar.set(1);var o=document.querySelector("#timerStop");this.timerPlaying?!function(){o.classList.add("hidden");var t=e;e.bar.animate(0,{},function(){t.updateCard()})}():o.classList.remove("hidden")},e.prototype.toggleTimer=function(){var e=this;this.timerPlaying=!this.timerPlaying,localStorage.setItem("rdgTimerPlaying",this.timerPlaying);var t=document.querySelector("#timerStop");this.timerPlaying===!0?(t.classList.add("hidden"),null!==this.bar&&!function(){var t=e;e.bar.animate(0,{duration:e.bar._opts.duration*e.bar.value()},function(){t.updateCard()})}()):(t.classList.remove("hidden"),null!==this.bar&&this.bar.stop())},e.prototype.detached=function(){null!==this.bar&&this.bar.destroy()},o(e,[{key:"title",get:function(){return""+this.cardName}},{key:"categoryTitle",get:function(){return this.themeName+" :: "+this.pageName}}]),e}()}),define("resources/index",["exports"],function(e){"use strict";function t(e){}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=t}),define("text!app.html",["module"],function(e){e.exports="<template>\r\n  <router-view></router-view>\r\n</template>\r\n"}),define("text!card-detail.html",["module"],function(e){e.exports='<template bindable="headingText, headingCategory, imageSrc, intro, description">\r\n  <div id=\'grimoire-card\' class="content">   \r\n    <div class="row col">\r\n      <h2 innerhtml.bind=\'headingCategory\'></h2>\r\n      <h1 innerhtml.bind=\'headingText\'></h1>\r\n    </div>\r\n    <div class="row">\r\n      <div class="col grim-img">\r\n        <img src=\'${imageSrc}\' alt="grimoire card" />\r\n      </div>\r\n      <div class="col grim-text">\r\n        <p innerhtml.bind=\'intro\'></p>\r\n        <p innerhtml.bind=\'description\'></p>\r\n      </div>\r\n    </div>\r\n  </div>    \r\n</template>'}),define("text!card.html",["module"],function(e){e.exports='<template>\r\n  <require from="./card-detail.html"></require>\r\n  <section class="au-animate">\r\n    <card-detail heading-text="${title}" heading-category="${categoryTitle}" image-src="https://www.bungie.net${card.highResolution.image.sheetPath}" description="${card.cardDescription}" intro="${card.cardIntro}"></card-detail>\r\n    <footer id="footer" class="${color}" style="padding-left: 0;">      \r\n      <div class="clear text-pad">\r\n        <a class="grey-text text-lighten-4 right" route-href="route: random;"><span class="octicon octicon-sync"></span> <span> show random card</span></a>\r\n      </div>      \r\n      <div class="clear grey-text text-lighten-4 right text-pad extra-pad">\r\n        <span>share on</span>\r\n        <a target="_blank" href="https://twitter.com/intent/tweet?text=Grimoire Card :: ${encodedCardName}&via=davetimmins&url=${shareHref}">Twitter</a>\r\n        <span> or </span>\r\n        <a target="_blank" href="https://facebook.com/sharer.php?u=${shareHref}">Facebook</a>\r\n      </div>      \r\n      <div class="footer-copyright clear text-pad">        \r\n          <a class="grey-text text-lighten-4" href="http://davetimmins.com">&copy; 2016 dave timmins</a>\r\n          <a class="grey-text text-lighten-4 right" href="https://github.com/davetimmins/random-destiny-grimoire"><span class="octicon octicon-logo-github"></span></a>      \r\n      </div>\r\n    </footer>          \r\n  </section>\r\n</template>\r\n'}),define("text!random.html",["module"],function(e){e.exports='<template>\r\n  <require from="./card-detail.html"></require>\r\n  <section class="au-animate">\r\n    <div id="progressBar"></div>\r\n    <div class="timerControl" click.trigger="toggleTimer()">\r\n      <span class="mega-octicon octicon-clock"></span>\r\n      <span id="timerStop" class="mega-octicon octicon-circle-slash"></span>\r\n    </div>\r\n    <card-detail heading-text="${title}" heading-category="${categoryTitle}" image-src="https://www.bungie.net${card.highResolution.image.sheetPath}" description="${card.cardDescription}" intro="${card.cardIntro}"></card-detail>\r\n    <footer id="footer" class="${color}" style="padding-left: 0;">      \r\n      <div class="clear text-pad">\r\n        <a class="grey-text text-lighten-4 right" click.trigger="updateCard()"><span class="octicon octicon-sync"></span> new random card</span></a>\r\n      </div>\r\n      <div class="clear text-pad">\r\n        <a class="grey-text text-lighten-4 right" if.bind="card" route-href="route: card; params.bind: {id:card.cardId}"><span class="octicon octicon-link"></span><span> permalink</span></a>\r\n      </div>\r\n      <div class="clear grey-text text-lighten-4 right text-pad extra-pad">\r\n        <span>share on</span>\r\n        <a target="_blank" href="https://twitter.com/intent/tweet?url=${shareHref}&text=Random Destiny Grimoire&via=davetimmins">Twitter</a>\r\n        <span> or </span>\r\n        <a target="_blank" href="https://facebook.com/sharer.php?u=${shareHref}">Facebook</a>\r\n      </div>      \r\n      <div class="footer-copyright clear text-pad">        \r\n          <a class="grey-text text-lighten-4" href="http://davetimmins.com">&copy; 2016 dave timmins</a>\r\n          <a class="grey-text text-lighten-4 right" href="https://github.com/davetimmins/random-destiny-grimoire"><span class="octicon octicon-logo-github"></span></a>      \r\n      </div>\r\n    </footer>    \r\n  </section>\r\n</template>'});
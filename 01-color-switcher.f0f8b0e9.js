!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body");t.addEventListener("click",(function(t){if(r)return;r=!0,o=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),e.addEventListener("click",(function(t){clearInterval(o),r=!1}));var o=null,r=!1}();
//# sourceMappingURL=01-color-switcher.f0f8b0e9.js.map
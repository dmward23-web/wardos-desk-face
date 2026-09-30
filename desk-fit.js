/* DESKFIT1 · Dan 9/29 · (a) wall: panel grows to its content so the footer never covers the last card row (#13)
   (b) phone: real device-width layout that stacks into one column, no sideways scroll (#22) */
(function () {
  var d = document, h = d.documentElement;
  var phone = Math.min(screen.width, screen.height) < 900 || /[?&]phone=1/.test(location.search);
  if (phone) {
    var m = d.querySelector('meta[name="viewport"]');
    if (m) m.parentNode.removeChild(m);
    var nm = d.createElement("meta"); nm.name = "viewport";
    nm.content = "width=device-width, initial-scale=1, viewport-fit=cover";
    (d.head || h).appendChild(nm);
    h.classList.add("desk-phone");
  }
  var css =
    ".panel{height:auto!important;min-height:100vh;overflow:visible!important}" +
    ".desk-phone,.desk-phone body{overflow-x:hidden!important;width:100%!important;min-width:0!important}" +
    ".desk-phone .panel{width:100%!important;min-height:0;padding:14px 12px 20px!important;gap:12px!important;box-sizing:border-box}" +
    ".desk-phone .panel *{grid-template-columns:1fr!important;grid-column:auto!important;grid-row:auto!important;min-width:0!important;max-width:100%!important;box-sizing:border-box}" +
    ".desk-phone .panel *:not(svg):not(svg *){flex-wrap:wrap}" +
    ".desk-phone .panel [style*='width:'],.desk-phone .panel table{width:auto!important}" +
    ".desk-phone .panel img{height:auto!important}" +
    ".desk-phone .panel h1{font-size:clamp(24px,8vw,34px)!important;line-height:1.1!important}" +
    ".desk-phone .panel h2{font-size:clamp(18px,6vw,24px)!important;line-height:1.15!important}" +
    ".desk-phone .panel p,.desk-phone .panel li,.desk-phone .panel .cap{white-space:normal!important;overflow-wrap:anywhere}" +
    ".desk-phone .footer{flex-direction:column;align-items:flex-start!important}" +
    ".desk-phone .footer .stamp{text-align:left!important}";
  var s = d.createElement("style"); s.id = "desk-fit"; s.textContent = css;
  (d.head || h).appendChild(s);
  if (phone) d.addEventListener("DOMContentLoaded", function () {
    /* shrink wall-size hero numbers so they fit the phone width */
    var cap = Math.max(40, Math.round(innerWidth * 0.13));
    d.querySelectorAll(".panel *").forEach(function (el) {
      var fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs > cap) el.style.setProperty("font-size", cap + "px", "important");
    });
  });
})();

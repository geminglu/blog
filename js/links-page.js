function linksPageHandle(){var e=document.querySelector(".friends-link-list"),l=e.querySelectorAll(".link-type-title"),n=e.querySelectorAll(".friends-link-item").length;let t=2;80<=n?t=4:60<=n&&(t=3),e.style.gridTemplateColumns=`repeat(${t}, 1fr)`,l.forEach(e=>{e.style.gridColumn="span "+t})}!0===KEEP.theme_config.pjax.enable&&KEEP.utils?linksPageHandle():window.addEventListener("DOMContentLoaded",linksPageHandle);
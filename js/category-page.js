function resetCategoriesPage(){const r=e=>{e.forEach(e=>{var t=e.querySelector(".site-all-category-list-link"),i=e.querySelector(".site-all-category-list-count"),l=e.querySelector(".site-all-category-list-child");let s=`
            <div class="self-category-info">
              <div class="left">${l?'<i class="icon fa-solid fa-chevron-right"></i> ':""}${t.outerHTML}</div>
              <div class="right">${i.outerHTML}</div>
            </div>
          `;l&&(r(l.querySelectorAll(".site-all-category-list-item")),s+=l.outerHTML),e.innerHTML=s})};r(document.querySelectorAll(".site-all-category-list .site-all-category-list-item")),document.querySelectorAll(".site-all-category-list-item").forEach(e=>{let t=!1;const i=e.querySelector(".self-category-info .left .icon"),l=e.querySelector(".site-all-category-list-child");i&&i.addEventListener("click",()=>{t=!t,l&&(t?(l.style.height="auto",l.style.visibility="visible",i.classList.add("fa-chevron-down"),i.classList.remove("fa-chevron-right")):(l.style.height="0",l.style.visibility="hidden",i.classList.add("fa-chevron-right"),i.classList.remove("fa-chevron-down")))})})}!0===KEEP.theme_config.pjax.enable&&KEEP.utils?resetCategoriesPage():window.addEventListener("DOMContentLoaded",resetCategoriesPage);
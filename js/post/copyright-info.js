function initCopyrightInfoHelper(){KEEP.utils.copyrightInfoHelper={initSetPostLink(){var e=document.querySelector(".copyright-info-content .copyright-post-link");e&&(e.innerHTML=decodeURI(window.location.href))},copyCopyrightInfo(){const t=document.querySelector(".copyright-info-content");if(t){const r=document.querySelector(".copy-copyright-info"),c=r.querySelector("i"),n=KEEP.language_copy_copyright,p="en"===KEEP.hexo_config?.language?": ":"：";let i=!1;const l=(e,o,t,n)=>{c&&(c.classList.remove(e),c.classList.add(o));e=r.querySelector(".tooltip-content");e&&(e.innerHTML=t),i=n};r.addEventListener("click",()=>{var e,o;i||(o=t.querySelector(".copyright-post-author .content").innerHTML,e=t.querySelector(".copyright-post-link").innerHTML,o=""+n.author+p+o+`
`+n.link+p+e,navigator.clipboard.writeText(o).then(()=>{l("fa-copy","fa-check",n.copied,!0)}))}),r.addEventListener("mouseleave",()=>{setTimeout(()=>{l("fa-check","fa-copy",n.copy,!1)},500)})}}},!0===KEEP.theme_config.post?.copyright_info&&(KEEP.utils.copyrightInfoHelper.initSetPostLink(),KEEP.utils.copyrightInfoHelper.copyCopyrightInfo())}!0===KEEP.theme_config.pjax?.enable&&KEEP.utils?initCopyrightInfoHelper():window.addEventListener("DOMContentLoaded",initCopyrightInfoHelper);
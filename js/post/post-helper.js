function initPostHelper(){KEEP.utils.postHelper={postPageContainerDom:document.querySelector(".post-page-container"),toggleShowTocBtn:document.querySelector(".toggle-show-toc"),toggleShowTocTabletBtn:document.querySelector(".toggle-show-toc-tablet"),toggleShowTocIcon:document.querySelector(".toggle-show-toc i"),mainContentDom:document.querySelector(".main-content"),postToolsDom:document.querySelector(".post-tools"),isShowToc:!1,initToggleToc(){this.toggleShowTocBtn&&this.toggleShowTocBtn.addEventListener("click",()=>{this.isShowToc=!this.isShowToc,KEEP.themeInfo.styleStatus.isShowToc=this.isShowToc,KEEP.setStyleStatus(),this.handleToggleToc(this.isShowToc)}),this.toggleShowTocTabletBtn&&this.toggleShowTocTabletBtn.addEventListener("click",()=>{const e=document.querySelector(".tablet-post-toc-mask"),t=e.querySelector(".tablet-post-toc");document.body.style.overflow="hidden",e.style.background="rgba(0, 0, 0, 0.25)",e.style.visibility="visible",t.style.transform="translateX(0)",e.addEventListener("click",()=>{document.body.style.overflow="",e.style.background="rgba(0, 0, 0, 0)",e.style.visibility="hidden",t.style.transform="translateX(-100%)"})})},handleToggleToc(e){e?(this.postPageContainerDom.classList.add("show-toc"),document.body.classList.add("has-toc")):(this.postPageContainerDom.classList.remove("show-toc"),document.body.classList.remove("has-toc")),setTimeout(()=>{this.setPostToolsLayout()},120)},hasToc(e){this.toggleShowTocBtn&&(this.toggleShowTocBtn.style.display="flex",this.isShowToc=e,this.handleToggleToc(e))},setPostToolsLayout(e){e=e||this.mainContentDom.getBoundingClientRect().width.toFixed(0);let t=5;window.innerWidth<=800&&(t=3);var o="left"===KEEP.theme_config.toc?.layout?"right":"left";this.postToolsDom.style.opacity="1",this.postToolsDom.style[o]=`calc((100vw - ${e}px) / 2 - ${t}rem)`},initSetPostToolsLeft(){setTimeout(()=>{this.setPostToolsLayout()},150),window.addEventListener("resize",()=>{this.setPostToolsLayout()})},goToComments(){const t=document.querySelector("#comments-anchor");[document.querySelector(".post-tools .go-to-comments"),document.querySelector(".exposed-tools-list .go-to-comments-tablet")].forEach(e=>{KEEP.utils.title2Top4HTag(e,t,300)})},watchPostCommentsCount(){const t=this.postToolsDom.querySelector(".post-comments-count");if(!t)return;const o=new MutationObserver(function(e){e.forEach(e=>{"childList"===e.type&&0<(e=Number(e.target.innerHTML))&&(t.style.display="flex",99<e)&&(t.innerHTML="99+",o.disconnect())})});o.observe(t,{attributes:!0,childList:!0})},setArticleAgingDays(){var e,t,o,s,n=document.querySelector(".post-content .post-aging-tips");n&&(e=n.querySelector(".days"),o=Date.now(),t=864e5*(n.dataset?.agingDays||30),s=((o=o-new Date(n.dataset.updateDate).getTime())/864e5).toFixed(0),t<=o)&&(e.innerHTML=s,n.style.display="block")},formatDatetime(e="YYYY-MM-DD hh:mm:ss",t=Date.now()){var o,t=new Date(t),s=((/(y+)/.test(e)||/(Y+)/.test(e))&&(e=e.replace(RegExp.$1,(""+t.getFullYear()).substr(4-RegExp.$1.length))),{"M+":t.getMonth()+1,"D+":t.getDate(),"d+":t.getDate(),"H+":t.getHours(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()});for(const n in s)new RegExp(`(${n})`).test(e)&&(o=""+s[n],e=e.replace(RegExp.$1,1===RegExp.$1.length?o:("00"+o).substr(o.length)));return e},resetPostUpdateDate(){var e=document.querySelector(".post-meta-info-container .post-update-date .datetime"),t=new Date(e.dataset.updated).getTime(),o=KEEP.theme_config.post?.datetime_format||"YYYY-MM-DD HH:mm:ss";e.innerHTML=this.formatDatetime(o,t)},enableFullScreen(){var e=document.querySelector(".post-tools-container .full-screen");if(e){const o=e.querySelector("i"),s=()=>document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement;var t=()=>{s()?(o.classList.remove("fa-expand"),o.classList.add("fa-compress")):(o.classList.remove("fa-compress"),o.classList.add("fa-expand"))};e.addEventListener("click",function(){s()?document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():document.documentElement.requestFullscreen?document.documentElement.requestFullscreen():document.documentElement.mozRequestFullScreen?document.documentElement.mozRequestFullScreen():document.documentElement.webkitRequestFullScreen&&document.documentElement.webkitRequestFullScreen()}),document.addEventListener("fullscreenchange",t),document.addEventListener("mozfullscreenchange",t),document.addEventListener("webkitfullscreenchange",t)}}},KEEP.utils.postHelper.initSetPostToolsLeft(),KEEP.utils.postHelper.setArticleAgingDays(),KEEP.utils.postHelper.resetPostUpdateDate(),KEEP.utils.postHelper.enableFullScreen(),!0===KEEP.theme_config.toc?.enable&&KEEP.utils.postHelper.initToggleToc(),!0===KEEP.theme_config.comment?.enable&&(KEEP.utils.postHelper.goToComments(),KEEP.utils.postHelper.watchPostCommentsCount())}!0===KEEP.theme_config.pjax?.enable&&KEEP.utils?initPostHelper():window.addEventListener("DOMContentLoaded",initPostHelper);
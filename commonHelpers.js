import{a as h,S as p,i as c}from"./assets/vendor-a57f9cde.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const f="24005703-1514437038890a8f3813970a7",d="https://pixabay.com/api";class m{constructor(){this.searchQuery="",this.page=1,this.perPage=40,this.totalHits=0}async fetchPhotos(){const r=`${d}/?image_type=photo&orientation=horizontal&safesearch=true&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${f}`;try{const{data:s}=await h.get(r);return this.totalHits=s.totalHits,this.incrementPage(),s}catch(s){console.log(s)}}get query(){return this.searchQuery}set query(r){this.searchQuery=r}incrementPage(){this.page+=1}resetPage(){this.page=1}getPage(){return this.page}getEndPage(){return Math.ceil(this.totalHits/this.perPage)<this.page}}function y(){return{cardContainer:document.querySelector(".gallery"),searchForm:document.getElementById("search-form")}}function b(e,r){return e.map(s=>r(s)).join("")}function P({webformatURL:e,tags:r,likes:s,views:n,comments:t,downloads:o,largeImageURL:a}){return`
      <div class="photo-card">
        <a class="gallery__link" href="${a}">
          <img class="img" src=${e} alt=${r} loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <b>${s}</b>
          </p>
          <p class="info-item">
            <b>Views</b>
            <b>${n}</b>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <b>${t}</b>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <b>${o}</b>
          </p>
        </div>
    </div>
      `}const{cardContainer:u,searchForm:v}=y(),i=new m;v.addEventListener("submit",w);const $=new p(".gallery a");function w(e){e.preventDefault();const r=e.target.elements.searchQuery.value.trim();if(i.query=r,i.query===""){l();return}i.resetPage(),l(),g()}async function g(){try{if(i.getEndPage()&&i.getPage()>1){c.show({message:"Sorry, there are no more images matching your search.",color:"red",position:"topRight"});return}const e=await i.fetchPhotos();if(e.hits.length===0)return c.show({message:"Sorry, there are no images matching your search query. Please try again.",color:"red",position:"topRight"});i.getPage()<=2&&c.show({message:`Hooray! We found ${e.totalHits} images.`,color:"green",position:"topRight"}),L(e.hits),$.refresh()}catch(e){console.log(e)}}function L(e){u.insertAdjacentHTML("beforeend",b(e,P))}function l(){u.innerHTML=""}const S={rootMargin:"150px"},q=e=>{e.forEach(r=>{i.query!==""&&r.isIntersecting&&i.getPage()>1&&g()})};let E=new IntersectionObserver(q,S);const H=document.getElementById("sentinel");E.observe(H);
//# sourceMappingURL=commonHelpers.js.map

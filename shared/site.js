/* Yukthahara shared interactions: language toggle, sticky nav, mobile nav, scroll-reveal, count-up.
   Language is class-based — EN/KN content both live in the HTML (.en / .kn); CSS shows the active one.
   All Kannada strings are DRAFT and must be native-reviewed before launch. */
(function(){
  const KEY="yh-lang";
  const root=document.documentElement;

  function setLang(l){
    root.setAttribute("lang",l); root.setAttribute("data-lang",l);
    localStorage.setItem(KEY,l);
    document.querySelectorAll("[data-lang-btn]").forEach(b=>{
      b.querySelector(".en")&&(b.querySelector(".en").textContent="ಕನ್ನಡ");
    });
  }
  document.addEventListener("DOMContentLoaded",()=>{
    setLang(localStorage.getItem(KEY)||"en");

    document.querySelectorAll("[data-lang-btn]").forEach(btn=>
      btn.addEventListener("click",()=>setLang(root.getAttribute("data-lang")==="en"?"kn":"en")));

    // sticky/condensing nav — pages without a hero stay solid (else links are invisible on ivory)
    const nav=document.querySelector(".nav");
    const hasHero=!!document.querySelector(".hero");
    const onScroll=()=>nav&&nav.classList.toggle("solid", !hasHero || scrollY>window.innerHeight*0.7);
    onScroll(); addEventListener("scroll",onScroll,{passive:true});

    // mobile nav — full-screen overlay, toggle turns into ✕, body scroll-locked, Esc/link closes
    const toggle=document.querySelector(".navtoggle"), links=document.querySelector(".navlinks");
    const closeNav=()=>{links&&links.classList.remove("open");document.body.classList.remove("navopen");if(toggle)toggle.textContent="☰";};
    if(toggle&&links){
      toggle.addEventListener("click",()=>{
        const open=links.classList.toggle("open");
        document.body.classList.toggle("navopen",open);
        toggle.textContent=open?"✕":"☰";
      });
      links.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeNav));
      addEventListener("keydown",e=>{if(e.key==="Escape")closeNav();});
    }

    // scroll-reveal
    const rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io=new IntersectionObserver((es)=>es.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add("in");
        e.target.querySelectorAll?.("[data-count]").forEach(runCount); io.unobserve(e.target); }
    }),{threshold:.2});
    document.querySelectorAll(".reveal").forEach(el=>{ if(rm){el.classList.add("in");el.querySelectorAll("[data-count]").forEach(runCount);} else io.observe(el); });

    function runCount(el){
      const to=parseFloat(el.dataset.count), dec=(el.dataset.count.split(".")[1]||"").length;
      if(rm){el.textContent=to.toFixed(dec);return;}
      let s=null; (function step(t){s??=t; const p=Math.min((t-s)/1000,1);
        el.textContent=(to*(1-Math.pow(1-p,3))).toFixed(dec); if(p<1)requestAnimationFrame(step);})(performance.now());
    }
  });
})();

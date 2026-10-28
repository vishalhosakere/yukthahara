// Plain module (not "use client") so the server layout receives the script text, not a client reference.
export const LANG_STORAGE_KEY = "yh-lang";

/** Runs before first paint so a saved (or ?lang=kn) choice never flashes English first. */
export const LANG_BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{var q=new URLSearchParams(location.search).get('lang');var l=(q==='kn'||q==='en')?q:localStorage.getItem('${LANG_STORAGE_KEY}');if(l==='kn'){d.dataset.lang='kn';d.lang='kn'}}catch(e){}})()`;

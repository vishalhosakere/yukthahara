import { localePath } from "./i18n";

// Plain module (not "use client") so the server layout receives the script text, not a client reference.
export const LANG_STORAGE_KEY = "yh-lang";

/**
 * English pages only, before first paint: a reader who chose Kannada (or followed an old ?lang=kn link) is sent to the
 * Kannada page before anything is drawn. Search engines carry no choice, so they always get the page they asked for.
 */
export const KANNADA_REDIRECT =
  `(function(){try{var q=new URLSearchParams(location.search),l=q.get('lang');` +
  `if(l==='kn'||l==='en')localStorage.setItem('${LANG_STORAGE_KEY}',l);` +
  `if((l||localStorage.getItem('${LANG_STORAGE_KEY}'))==='kn'){q.delete('lang');var s=q.toString();` +
  `location.replace((location.pathname==='/'?'${localePath("/", "kn")}':'/kn'+location.pathname)+(s?'?'+s:'')+location.hash)}}catch(e){}})()`;

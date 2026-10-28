/**
 * Netlify's free tier injects "This site is hosted on Netlify" as a comment (plus line breaks) inside <head>.
 * React hydrates <head>, finds nodes it never rendered and throws error #418, so this inline snippet removes
 * them during parsing, before hydration. Only comments mentioning Netlify and whitespace-only text are touched.
 */
export const STRIP_NETLIFY_HEAD = `for(var h=document.head,n=h&&h.firstChild,x;n;n=x){x=n.nextSibling;if((n.nodeType===8&&/Netlify/.test(n.data))||(n.nodeType===3&&!/\\S/.test(n.data)))h.removeChild(n)}`;

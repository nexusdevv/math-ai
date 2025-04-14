'use client';

import Script from 'next/script';
import React from 'react';

export default function PopadsScript() {
  return (
    <Script
      id="popads-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(){var x=window,r="fa0b1f66e9b338297e2d6752cd313229",s=[["siteId",315-630+665*12+150+5180559],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],k=["d3d3LmJsb2NrYWRzbm90LmNvbS91dG9vbHRpcC5taW4uY3Nz","ZG5oZmk1bm4yZHQ2Ny5jbG91ZGZyb250Lm5ldC9tb0Z5L3NyZXN0ZnVsLm1pbi5qcw=="],l=-1,u,b,t=function(){clearTimeout(b);l++;if(k[l]&&!(1770148677000<(new Date).getTime()&&1<l)){u=x.document.createElement("script");u.type="text/javascript";u.async=!0;var h=x.document.getElementsByTagName("script")[0];u.src="https://"+atob(k[l]);u.crossOrigin="anonymous";u.onerror=t;u.onload=function(){clearTimeout(b);x[r.slice(0,16)+r.slice(0,16)]||t()};b=setTimeout(t,5E3);h.parentNode.insertBefore(u,h)}};if(!x[r]){try{Object.freeze(x[r]=s)}catch(e){}t()}})();
        `
      }}
    />
  );
} 

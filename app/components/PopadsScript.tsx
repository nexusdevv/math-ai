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
          (function(){var e=window,x="fa0b1f66e9b338297e2d6752cd313229",r=[["siteId",844-63*533*802-83+32117971],["minBid",0.333],["popundersPerIP","0:1"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],w=["d3d3LmJsb2NrYWRzbm90LmNvbS9zYXV0b3NpemUubWluLmNzcw==","ZG5oZmk1bm4yZHQ2Ny5jbG91ZGZyb250Lm5ldC94L3ppbW11dGFibGUubWluLmpz"],q=-1,s,j,n=function(){clearTimeout(j);q++;if(w[q]&&!(1770578024000<(new Date).getTime()&&1<q)){s=e.document.createElement("script");s.type="text/javascript";s.async=!0;var l=e.document.getElementsByTagName("script")[0];s.src="https://"+atob(w[q]);s.crossOrigin="anonymous";s.onerror=n;s.onload=function(){clearTimeout(j);e[x.slice(0,16)+x.slice(0,16)]||n()};j=setTimeout(n,5E3);l.parentNode.insertBefore(s,l)}};if(!e[x]){try{Object.freeze(e[x]=r)}catch(e){}n()}})();
        `
      }}
    />
  );
} 

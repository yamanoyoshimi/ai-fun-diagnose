import Script from 'next/script';
import * as gtag from '@/lib/gtag';

const GoogleAnalytics = () => (
  <>
    {/* Google tag (gtag.ts) */}
    {gtag.existsGaId && (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_MEASUREMENT_ID}');
          `}
        </Script>
      </>
    )}
  </>
);

export default GoogleAnalytics;

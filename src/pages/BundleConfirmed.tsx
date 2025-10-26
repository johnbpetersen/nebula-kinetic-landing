// src/pages/BundleConfirmed.tsx
// V3 - Updated to use the new `showScrollCues={false}` prop on HeroScrollExpansion.

import * as React from "react";
import { Helmet } from "react-helmet-async";
import HeroScrollExpansion from "@/components/hero/HeroScrollExpansion";

export default function BundleConfirmed() {
  React.useEffect(() => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "bundle_purchase_success" });
  }, []);

  return (
    <div className="bg-alluBlue-900 text-white min-h-screen font-sans">
      <Helmet>
        <title>The Full Inner Game Experience is Yours | Alluviance Masterclass</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <HeroScrollExpansion
        videoSrc="https://alluviance.s3.us-east-2.amazonaws.com/videos/alluviance+website+trim.mp4"
        headline={<>The Full Inner Game Experience is Yours</>}
        subhead={
          <>
            Your purchase is complete. We've just sent confirmations for the Masterclass + VIP Experience to your email.
          </>
        }
        showScrollCues={false}
      />

      <div className="relative z-10 text-center pb-20">
        <div className="text-sm text-gray-400">
          Take me back to the{" "}
          <a 
            href="https://masterclass.alluviance.co" 
            className="text-neon-yellow hover:underline"
          >
            Masterclass site
          </a>.
        </div>
      </div>
    </div>
  );
}
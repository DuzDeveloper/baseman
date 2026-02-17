const ROOT_URL = "https://baseman-eta.vercel.app";
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  "http://localhost:3000";

/**
 * MiniApp configuration object. Must follow the mini app manifest specification.
 *
 * @see {@link https://docs.base.org/mini-apps/features/manifest}
 */
export const minikitConfig = {
  "accountAssociation": {
    "header": "eyJmaWQiOjU3NjA2MiwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDRiZEUyNjkxYTRhOTg3OWQ3NjUxMjQwN0FjNmFlOThFZDU5ZTdkQzMifQ",
    "payload": "eyJkb21haW4iOiJiYXNlbWFuLWV0YS52ZXJjZWwuYXBwIn0",
    "signature": "dM76k6w7wQSVtdDaVPHLt0LQMftgmbKOhwRsIoOojwh49nqLuzmgB2LoxX14SSDiPsKg46yx11ngNFgnG8zlsxw="
  }
,

  baseBuilder: {
    ownerAddress: "0x896A2C346B7883FCb77B33BA8d2DDC7718803239",
  },
  miniapp: {
    version: "1",
    subtitle: "Save the Basecity of the crime",
    description: "A game inspired on FlappyBirds",
    screenshotUrls: ["https://baseman-eta.vercel.app/images/scr1.png"],
    name: "Baseman",
    iconUrl: `https://baseman-eta.vercel.app/images/icon.png`,
    splashImageUrl: `https://baseman-eta.vercel.app/images/splash.png`,
    splashBackgroundColor: "#1f0cd1",
    homeUrl: "https://baseman-eta.vercel.app",
    webhookUrl: "https://baseman-eta.vercel.app/api/webhook",
    primaryCategory: "games",
    tags: ["games","flappybird","baseman"],
    heroImageUrl: "https://baseman-eta.vercel.app/images/heroog.png",
    tagline: "",
    ogTitle: "Baseman",
    ogDescription: "A game inspired on FlappyBirds",
    ogImageUrl: "https://baseman-eta.vercel.app/images/heroog.png",
  },
} as const;

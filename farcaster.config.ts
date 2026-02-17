export const ROOT_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export const farcasterConfig = {
  "accountAssociation": {
    "header": "eyJmaWQiOjU3NjA2MiwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDRiZEUyNjkxYTRhOTg3OWQ3NjUxMjQwN0FjNmFlOThFZDU5ZTdkQzMifQ",
    "payload": "eyJkb21haW4iOiJiYXNlY3VsdG1pbnQudmVyY2VsLmFwcCJ9",
    "signature": "bG3ObjCp76fcDk3Y9xd1G4AIViPyRycAWQU8kV0BxClX56RHgVjO9GnQNJ0M4eWyjNRM/0u2x9rxiQvQANoeCxw=",
},
  frame: {
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
}  as const;
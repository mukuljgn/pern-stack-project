import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";

import "dotenv/config";

// init arcjet
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),// Protects your app from common attacks like sql injection, xss, etc.
    detectBot({
      mode: "LIVE",
      // blocks all bots except search engine.
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    // rate limiting: 5 requests per 10 seconds with a burst capacity of 10 requests.
    tokenBucket({
        mode: "LIVE",
        refillRate: 30,
        interval: 5,
        capacity: 20,
    }),
  ],
});

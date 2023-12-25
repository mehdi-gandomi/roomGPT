import { Ratelimit } from "@upstash/ratelimit";
import redis from "../../utils/redis";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
const db = require('./db');
// Create a new ratelimiter, that allows 5 requests per 24 hours
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(5, "1440 m"),
      analytics: true,
    })
  : undefined;

export async function POST(request: Request) {
  https://process.smart-menu.co/upload
  const res=await fetch("/process", {
    headers: {
        'Accept': 'application/json'
    },
    method: "POST",
    body: request.body
})
if (!res.ok) {
  throw new Error('Network response was not ok.');
}
  const data=res.json();
  await db.query(`UPDATE predictions SET ai_response='${JSON.stringify(data)}' WHERE id='${request.body?.predictionId}'`)
  return NextResponse.json(
  data    
  );
}

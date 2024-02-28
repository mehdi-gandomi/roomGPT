//@ts-nocheck
import { Ratelimit } from "@upstash/ratelimit";
import redis from "../../utils/redis";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
const db = require('./db');
const fs = require('fs');
const Path = require('path')  
const Axios = require('axios')
async function downloadImage (file:string, url:string|null) {

  const path = Path.resolve("G:\\projects\\roomGPT\\public", 'images', file)

  // axios image download with response type "stream"
  const response = await Axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  })

  // pipe the result stream into a file on disc
  response.data.pipe(fs.createWriteStream(path))

  // return a promise and resolve when download finishes
  return new Promise((resolve:Function, reject:Function) => {
    response.data.on('end', () => {
      resolve()
    })

    response.data.on('error', () => {
      reject()
    })
  })

}
function getRemoteFile(file:string, url:string|null) {
  let localFile = fs.createWriteStream(file);
  const request = https.get(url, function(response:any) {
      var len = parseInt(response.headers['content-length'], 10);
      var cur = 0;
      var total = len / 1048576; //1048576 - bytes in 1 Megabyte

      response.on('data', function(chunk:any) {
          cur += chunk.length;
          // showProgress(file, cur, len, total);
      });

      response.on('end', function() {
          console.log("Download complete");
      });

      response.pipe(localFile);
  });
}

// Create a new ratelimiter, that allows 5 requests per 24 hours
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(5, "1440 m"),
      analytics: true,
    })
  : undefined;
const downloadFile=(filepath:string,url:string|null)=>{
  if(!url) return;
  const file = fs.createWriteStream(filepath);
  return new Promise((resolve:Function,reject)=>{
    https.get(url, function(response:any) {
      response.pipe(file);
   
      // after download completed close filestream
      file.on("finish", () => {
          file.close();
          console.log("Download Completed");
          resolve();
      });
   });
  })

}
export async function POST(request: Request) {
  
  // Rate Limiter Code
  if (ratelimit) {
    const headersList = headers();
    const ipIdentifier = headersList.get("x-real-ip");

    const result = await ratelimit.limit(ipIdentifier ?? "");

    if (!result.success) {
      return new Response(
        "Too many uploads in 1 day. Please try again in a 24 hours.",
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": result.limit,
            "X-RateLimit-Remaining": result.remaining,
          } as any,
        }
      );
    }
  }

  const { imageUrl, theme, room,sessionId } = await request.json();

  // POST request to Replicate to start the image restoration generation process
  let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + process.env.REPLICATE_API_KEY,
    },
    body: JSON.stringify({
      version:
        "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
      input: {
        image: imageUrl,
        prompt:
          room === "Gaming Room"
            ? "a room for gaming with gaming computers, gaming consoles, and gaming chairs"
            : `a ${theme.toLowerCase()} ${room.toLowerCase()}`,
        a_prompt:
          "best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning",
        n_prompt:
          "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
      },
    }),
  });

  let jsonStartResponse = await startResponse.json();

  let endpointUrl = jsonStartResponse.urls.get;

  // GET request to get the status of the image restoration process & return the result when it's ready
  let restoredImage: string | null = null;
  while (!restoredImage) {
    // Loop in 1s intervals until the alt text is ready
    console.log("polling for result...");
    let finalResponse = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    });
    let jsonFinalResponse = await finalResponse.json();

    if (jsonFinalResponse.status === "succeeded") {
      restoredImage = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  let lastId;
  const inputImage=+(new Date)+"-input-image.jpg";
  await downloadImage(inputImage,imageUrl)
  const outputImage=+(new Date)+"-output-image.jpg";
  await downloadImage(outputImage,restoredImage[1])

  let session=await db.query(`SELECT * FROM sessions WHERE id='${sessionId}'`);
  let userId=null;
  session=session[0];
  if(session['user_id']) userId=session['user_id'];
  // if(session['user_id']){
  //   let user=await db.query(`SELECT * FROM users WHERE id='${session['user_id']}'`);
  //   user=user[0];
  //   if(user){

  //   }
  // }
  const result=await db.query(`INSERT INTO room_designs (input_image,output_image,session_id,user_id) VALUES ('${inputImage}','${outputImage}','${sessionId}','${userId}')`);

  if(result){
    lastId=result.insertId;
  }
  return NextResponse.json(
    {
      image:restoredImage ? restoredImage : "Failed to restore image",
      predictionId:lastId
    }
  );
}

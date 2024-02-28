//@ts-nocheck
import { Ratelimit } from "@upstash/ratelimit";
import redis from "../../utils/redis";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { v4 as uuidv4 } from 'uuid';
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

  const formData=await request.formData();

  const res=await fetch("https://process.smart-menu.co/upload", {
    headers: {
        'Accept': 'application/json'
    },
    method: "POST",

    body: formData

})
if (!res.ok) {
  throw new Error('Network response was not ok.');
}
  const data=await res.json();
  const children:any=[];
  const dimensions={
    w:formData.get("image_width"),
    h:formData.get("image_height")
  }
  data.forEach((item:any)=>{
    console.log("pushing")
    children.push({
        "id": uuidv4(),
        "title": "Spot",
        "x": ((item.x + ((item.w - item.x)/2)) * 100)/dimensions.w,
        "y": ((item.y + ((item.h - item.y)/2)) * 100)/dimensions.h,
        "tooltip_content": [
            {
                "type": "Heading",
                "text": item.object,
                "heading": "h3",
                "other": {
                    "id": "",
                    "classes": "",
                    "css": ""
                },
                "style": {
                    "fontFamily": "sans-serif",
                    "fontSize": 20.8,
                    "lineHeight": "normal",
                    "color": "#ffffff",
                    "textAlign": "left"
                },
                "boxModel": {
                    "width": "auto",
                    "height": "auto",
                    "margin": {
                        "top": 0,
                        "bottom": 0,
                        "left": 0,
                        "right": 0
                    },
                    "padding": {
                        "top": 10,
                        "bottom": 10,
                        "left": 10,
                        "right": 10
                    }
                },
                "id": uuidv4()
            },
            {
                "type": "Paragraph",
                "text": `Accuracy: ${parseInt(item.accuracy * 100)}%`,
                "other": {
                    "id": "",
                    "classes": "",
                    "css": ""
                },
                "style": {
                    "fontFamily": "sans-serif",
                    "fontSize": 14,
                    "lineHeight": 22,
                    "color": "#ffffff",
                    "textAlign": "left"
                },
                "boxModel": {
                    "width": "auto",
                    "height": "auto",
                    "margin": {
                        "top": 0,
                        "bottom": 0,
                        "left": 0,
                        "right": 0
                    },
                    "padding": {
                        "top": 10,
                        "bottom": 10,
                        "left": 10,
                        "right": 10
                    }
                },
                "id": uuidv4()
            },
            {
                "type": "Button",
                "text": "Click here",
                "url": "#",
                "script": "",
                "newTab": false,
                "other": {
                    "id": "",
                    "classes": "",
                    "css": ""
                },
                "style": {
                    "backgroundColor": "#2196f3",
                    "borderRadius": 10,
                    "fontFamily": "sans-serif",
                    "fontWeight": 700,
                    "fontSize": 14,
                    "lineHeight": 44,
                    "color": "#ffffff",
                    "display": "inline-block"
                },
                "boxModel": {
                    "width": "auto",
                    "height": 44,
                    "margin": {
                        "top": 0,
                        "bottom": 0,
                        "left": 0,
                        "right": 0
                    },
                    "padding": {
                        "top": 10,
                        "bottom": 10,
                        "left": 10,
                        "right": 10
                    }
                },
                "id": uuidv4()
            }
        ]
    })
  
  })
  console.log(formData?.get('predictionId'))
  await db.query(`UPDATE room_designs SET predictions='${JSON.stringify(data)}',points='${JSON.stringify(children)}' WHERE id='${formData?.get('predictionId')}'`)
  return NextResponse.json(
  {
    predictions:data,
    points:children
  }    
  );
}

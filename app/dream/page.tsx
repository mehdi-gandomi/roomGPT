// @ts-nocheck
"use client";
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";
import { useState } from "react";
import { UrlBuilder } from "@bytescale/sdk";
import { UploadWidgetConfig } from "@bytescale/upload-widget";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { CompareSlider } from "../../components/CompareSlider";
import Footer from "../../components/Footer";
import WebcamCapture from "../../components/WebcamCapture";
import Header from "../../components/Header";
import LoadingDots from "../../components/LoadingDots";
import ResizablePanel from "../../components/ResizablePanel";
import Toggle from "../../components/Toggle";
import appendNewToName from "../../utils/appendNewToName";
import downloadPhoto from "../../utils/downloadPhoto";
import DropDown from "../../components/DropDown";
import { roomType, rooms, themeType, themes } from "../../utils/dropdownTypes";

const options: UploadWidgetConfig = {
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
      ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
      : "free",
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: "#2563EB", // Primary buttons & links
      error: "#d23f4d", // Error messages
      shade100: "#fff", // Standard text
      shade200: "#fffe", // Secondary button text
      shade300: "#fffd", // Secondary button text (hover)
      shade400: "#fffc", // Welcome text
      shade500: "#fff9", // Modal close button
      shade600: "#fff7", // Border
      shade700: "#fff2", // Progress indicator background
      shade800: "#fff1", // File item background
      shade900: "#ffff", // Various (draggable crop buttons, etc.)
    },
  },
};

export default function DreamPage() {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [theme, setTheme] = useState<themeType>("Modern");
  const [room, setRoom] = useState<roomType>("Living Room");
  const [detectLoading, setDetectLoading] = useState<boolean>(false);
  
  const [detectedItems, setDetectedItems] = useState<any>([]);
  const convertToBinary=async(imageUrl:any):Promise<Blob>=> {
    return new Promise(async(resolve,reject)=>{
      try {
        // Fetch the image data
        const response = await fetch(imageUrl);
        const blob = await response.blob();
    
        // Create FormData and append the image Blob
       return resolve(blob) 
      } catch (error) {
        console.error('Error:', error);
        return reject(error)
      }
    })
  }
  const getMeta=(url:any)=> {
    return new Promise((resolve,reject)=>{
      var img = new Image();
      img.onload = function() {
          var w = this.width;
          var h = this.height;
          resolve({ w: w, h: h });
      };
      img.src = url;
    })
    
}
  const detectAndSearch=async()=>{
    // 
    //   
    setDetectedItems([])
    setDetectLoading(true)
    //   // Make the POST request
    //   const postResponse = await fetch('YOUR_POST_ENDPOINT', {
    //     method: 'POST',
    //     body: formData,
    //     // You may need to set headers depending on server requirements
    //     // headers: {
    //     //   'Content-Type': 'multipart/form-data',
    //     // },
    //   });
  
    //   // Handle the response
    //   const result = await postResponse.json();
    //   console.log('POST request result:', result);
    const formData = new FormData();
    const image=await convertToBinary(restoredImage)
    const dimensions:any=await getMeta(restoredImage)
    if(image){
      console.log("image",image)
      formData.append('file', image, 'convert.jpg'); // 'image' is the key name, adjust filename as needed
    }
    fetch("http://34.151.121.64/upload", {
        headers: {
            'Accept': 'application/json'
        },
        method: "POST",
        body: formData
    })
    .then(function(res) {
        if (!res.ok) {
            throw new Error('Network response was not ok.');
        }
        return res.json(); // Parse the response JSON
    })
    .then(function(data) {
        console.log(data); // Log the parsed JSON response
        setDetectedItems(data)
        setTimeout(()=>{
          const children:any=[];
          
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
                        "text": `Accuracy: ${item.accuracy}%`,
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
          //   children.push(  {
          //     "id": uuidv4(),
          //     "title": "Rect",
          //     "type": "rect",
          //   "tooltip_content": [
          //         {
          //             "type": "Paragraph",
          //             "text": item.object,
          //             "other": {
          //                 "id": "",
          //                 "classes": "",
          //                 "css": ""
          //             },
          //             "style": {
          //                 "fontFamily": "sans-serif",
          //                 "fontSize": 14,
          //                 "lineHeight": 22,
          //                 "color": "#ffffff",
          //                 "textAlign": "left"
          //             },
          //             "boxModel": {
          //                 "width": "auto",
          //                 "height": "auto",
          //                 "margin": {
          //                     "top": 0,
          //                     "bottom": 0,
          //                     "left": 0,
          //                     "right": 0
          //                 },
          //                 "padding": {
          //                     "top": 10,
          //                     "bottom": 10,
          //                     "left": 10,
          //                     "right": 10
          //                 }
          //             },
          //             "id": uuidv4()
          //         }
          //     ],
          //     "x_image_background": (item.x * 100)/dimensions.w,
          //         "x": (item.x * 100)/dimensions.w,
          //     "y": (item.y * 100)/dimensions.h,
          //     "width": (item.w - item.x),
          //     "height": (item.h - item.y),
          //   "y_image_background": (item.x * 100)/dimensions.w
          // })
          })
        
          const json={
            "id": "7126a99f-83aa-4496-8b96-67efaf9a3f93",
            "artboards": [
                {
                    "background_type": "image",
                    "image_url": restoredImage,
                    "children": children
                }
            ],
            "version": "6.0.15",
            "general": {
                "name": "Untitled"
            }
        };
        console.log(json)
        ImageMapPro.init('#image-map-pro',json)
        setDetectLoading(false)
        },500)
    })
    .catch(function(error) {
        console.error('There was a problem with the fetch operation:', error);
    });
  }

  const UploadDropZone = () => (
    <UploadDropzone
      options={options}
      onUpdate={({ uploadedFiles }) => {
        if (uploadedFiles.length !== 0) {
          const image = uploadedFiles[0];
          const imageName = image.originalFile.originalFileName;
          const imageUrl = UrlBuilder.url({
            accountId: image.accountId,
            filePath: image.filePath,
            options: {
              transformation: "preset",
              transformationPreset: "thumbnail"
            }
          });
          setPhotoName(imageName);
          setOriginalPhoto(imageUrl);
          generatePhoto(imageUrl);
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    const res = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl, theme, room }),
    });

    let newPhoto = await res.json();
    if (res.status !== 200) {
      setError(newPhoto);
    } else {
      setRestoredImage(newPhoto[1]);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-5">
          Generate your <span className="text-blue-600">dream</span> room
        </h1>
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="flex justify-between items-center w-full flex-col mt-4">
              {!restoredImage && (
                <>
                  <div className="space-y-4 w-full max-w-sm">
                    <div className="flex mt-3 items-center space-x-3">
                      <NextImage
                        src="/number-1-white.svg"
                        width={30}
                        height={30}
                        alt="1 icon"
                      />
                      <p className="text-left font-medium">
                        Choose your room theme.
                      </p>
                    </div>
                    <DropDown
                      theme={theme}
                      setTheme={(newTheme) =>
                        setTheme(newTheme as typeof theme)
                      }
                      themes={themes}
                    />
                  </div>
                  <div className="space-y-4 w-full max-w-sm">
                    <div className="flex mt-10 items-center space-x-3">
                      <NextImage
                        src="/number-2-white.svg"
                        width={30}
                        height={30}
                        alt="1 icon"
                      />
                      <p className="text-left font-medium">
                        Choose your room type.
                      </p>
                    </div>
                    <DropDown
                      theme={room}
                      setTheme={(newRoom) => setRoom(newRoom as typeof room)}
                      themes={rooms}
                    />
                  </div>
                  <div className="mt-4 w-full max-w-sm">
                    <div className="flex mt-6 w-96 items-center space-x-3">
                      <NextImage
                        src="/number-3-white.svg"
                        width={30}
                        height={30}
                        alt="1 icon"
                      />
                      <p className="text-left font-medium">
                        Upload a picture of your room.
                      </p>
                    </div>
                  </div>
                </>
              )}
              {restoredImage && (
                <div>
                  Here's your remodeled <b>{room.toLowerCase()}</b> in the{" "}
                  <b>{theme.toLowerCase()}</b> theme!{" "}
                </div>
              )}
              <div
                className={`${
                  restoredLoaded ? "visible mt-6 -ml-8" : "invisible"
                }`}
              >
                <Toggle
                  className={`${restoredLoaded ? "visible mb-6" : "invisible"}`}
                  sideBySide={sideBySide}
                  setSideBySide={(newVal) => setSideBySide(newVal)}
                />
              </div>
              {restoredLoaded && sideBySide && (
                <CompareSlider
                  original={originalPhoto!}
                  restored={restoredImage!}
                />
              )}
              {!originalPhoto && <UploadDropZone />}
              {originalPhoto && !restoredImage && (
                <img
                  alt="original photo"
                  src={originalPhoto}
                  className="rounded-2xl h-96"
                  width={475}
                  height={475}
                />
              )}
              {restoredImage && originalPhoto && !sideBySide && (
                <div className="flex sm:space-x-4 sm:flex-row flex-col">
                  <div>
                    <h2 className="mb-1 font-medium text-lg">Original Room</h2>
                    <img
                      alt="original photo"
                      src={originalPhoto}
                      className="rounded-2xl relative w-full h-96"
                      width={475}
                      height={475}
                    />
                  </div>
                  <div className="sm:mt-0 mt-8">
                    <h2 className="mb-1 font-medium text-lg">Generated Room</h2>
                    <a href={restoredImage} target="_blank" rel="noreferrer">
                      <img
                        alt="restored photo"
                        src={restoredImage}
                        className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full h-96"
                        width={475}
                        height={475}
                        onLoad={() => setRestoredLoaded(true)}
                      />
                    </a>
                  </div>
                </div>
              )}
              {loading && (
                <button
                  disabled
                  className="bg-blue-500 rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 w-40"
                >
                  <span className="pt-4">
                    <LoadingDots color="white" style="large" />
                  </span>
                </button>
              )}
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div className="flex space-x-2 justify-center">
                {originalPhoto && !loading && (
                  <button
                    onClick={() => {
                      setOriginalPhoto(null);
                      setRestoredImage(null);
                      setRestoredLoaded(false);
                      setDetectedItems([])
                      setError(null);
                    }}
                    className="bg-blue-500 rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-blue-500/80 transition"
                  >
                    Generate New Room
                  </button>
                )}
                {restoredLoaded && (
                  <button
                    onClick={() => {
                      downloadPhoto(
                        restoredImage!,
                        appendNewToName(photoName!)
                      );
                    }}
                    className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-8 hover:bg-gray-100 transition"
                  >
                    Download Generated Room
                  </button>
                )}
                 {restoredLoaded && !detectLoading && (
                  <button
                    onClick={() => detectAndSearch()}
                    className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-8 hover:bg-gray-100 transition"
                  >
                    Detect & Search
                  </button>
                )}
                {detectLoading && (
                <button
                  disabled
                  className="bg-blue-500 rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 w-40"
                >
                  <span className="pt-4">
                    <LoadingDots color="white" style="large" />
                  </span>
                </button>
              )}
              </div>
              {detectedItems && detectedItems.length > 0 && <div>
                <div id="image-map-pro" style={{ marginTop:"1rem" }}></div>
              </div>}
              <div className="webcam-wrap">
              <WebcamCapture/>
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
}

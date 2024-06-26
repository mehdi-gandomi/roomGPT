// @ts-nocheck
import React from "react";
import Webcam from "react-webcam";

const WebcamCapture = ({onCapture,width,height}) => {
    const [deviceId, setDeviceId] = React.useState({});
    const [devices, setDevices] = React.useState([]);
    const [selectedDevice,setSelectedDevice] = React.useState(undefined);
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null); // initialize it
    const handleDevices = React.useCallback(
      (mediaDevices:any) =>
        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
      [setDevices]
    );
    const restart=()=>{
      setImgSrc(null);
    }
    const DataURIToBlob=(dataURI: string)=> {
      const splitDataURI = dataURI.split(',')
      const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
      const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

      const ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++)
          ia[i] = byteString.charCodeAt(i)

      return new Blob([ia], { type: mimeString })
    }
     // create a capture function
  const capture = React.useCallback(async() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    const file=DataURIToBlob(imageSrc);
    onCapture(file)
    
  }, [webcamRef]);
  const getDevices=()=>{
    // navigator.mediaDevices.enumerateDevices().then(handleDevices);
    navigator.mediaDevices.getUserMedia({audio: false, video: true})
.then(s => {
  navigator.mediaDevices.enumerateDevices().then(handleDevices)
})
.catch(error => {
  console.log('Error :', error)
  alert(error)
})


  }
  console.log(devices,selectedDevice)
    
  const selectDevice=(e)=>{
    console.log(e,"select")
    setSelectedDevice(e.target.value)
  }
    
  
    return (
      <>
        <select value={selectedDevice} onChange={selectDevice}>
          <option value="">select camera</option>
        {  devices.map((device, key) => (
            <option  key={device?.deviceId}  value={device?.deviceId}>
              {device?.label || `Device ${key + 1}`}
            </option>
  
          ))}
        </select>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getDevices}>Get devices</button>
        {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        selectedDevice && <Webcam width={width} height={height} audio={false} ref={webcamRef} videoConstraints={{ deviceId: selectedDevice }} />
      )}
      <div className="btn-container mt-3">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={capture}>Capture photo</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={restart}>Restart</button>
      </div>
      </>
    );
  };
  export default WebcamCapture;
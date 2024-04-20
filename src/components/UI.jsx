import { useChat } from "../hooks/useChat";
import { useRef, useEffect, useState } from "react";

export const UI = ({ hidden, ...props }) => {
  const input = useRef();
  const videoRef = useRef();
  const videoRef2 = useRef();
  const [trig1, SetTrig1] = useState({conf0:false,conf1:false});
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();

  const sendMessage = () => {
    const text = input.current.value;
    if (!loading && !message) {
      chat(text);
      input.current.value = "";
    }
  };

  // Ensure video starts playing when the component mounts
  useEffect(() => {
    // videoRef.current.load();
    videoRef.current.defaultPlaybackRate = 0.9;
    videoRef.current.play();
  }, [cameraZoomed]);

  useEffect(() => {
    videoRef.current.defaultPlaybackRate = 0.9;
    videoRef.current.play();
  }, []);

  useEffect(() => {
    if (cameraZoomed) {
      videoRef2.current.load();
      videoRef2.current.play();
    } else {
      videoRef2.current.pause();
      videoRef2.current.currentTime = 0;
      videoRef.current.defaultPlaybackRate = 0.9;
      videoRef.current.play();
    }
  }, [cameraZoomed]);

  if (hidden) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          className={`absolute top-0 left-0 object-cover w-full h-full , opacity-[1] ${
            cameraZoomed ? "hidden" : "block"
          }`}
          src="src/assets/bg_0_1_v1.mp4" // Replace with the path to your video file
          muted
          loop
          autoPlay
        />
        <video
          ref={videoRef2}
          className={`absolute top-0 left-0 object-cover w-full h-full , opacity-[1] ${
            cameraZoomed ? "block" : "hidden"
          }`}
          src={`src/assets/CONF_Mahfoudi.mp4`} // Replace with the path to your video file
        />
      </div>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 pointer-events-none flex justify-between p-4 flex-col">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <button
            className="pointer-events-auto font-black text-5xl cursor-pointer z-10"
            onClick={() => setCameraZoomed(!cameraZoomed)}
          >
            OScar
          </button>
          {/* <p>Experimental</p> */}
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-0 border-0  bg-white outline-none"
            // placeholder="Type a message..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (trig1.conf1) {
                  setCameraZoomed(!cameraZoomed)
                }
                sendMessage();
              }
              // if (e.currentTarget === "1") {

              // }
            }}
            onKeyUp={(e) => {
              if (e.target.value === "1") {
                SetTrig1({...trig1,conf1:true})
              }else{
                SetTrig1(false)
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

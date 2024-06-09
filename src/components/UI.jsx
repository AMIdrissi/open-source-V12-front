import { useChat } from "../hooks/useChat";
import { useRef, useEffect, useState } from "react";

export const UI = ({ hidden, ...props }) => {
  const input = useRef();
  const videoRef = useRef();
  const videoRef2 = useRef();
  const [vidUrl, setVidUrl] = useState("bg_0_1_v1.mp4");
  const defaultVal = {
    baif_brahim: false,
    fadili_hassan: false,
    kadili_abdelilah: false,
    mahfoudi: false,
    moussab_benious: false,
    najem: false,
  };
  const [trig, setTrig] = useState({
    baif_brahim: false,
    fadili_hassan: false,
    kadili_abdelilah: false,
    mahfoudi: false,
    moussab_benious: false,
    najem: false,
  });
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
      videoRef2.current.volume = 0.85;
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
          src={`src/assets/${vidUrl}`} // Replace with the path to your video file
        />
      </div>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 pointer-events-none flex justify-between p-4 flex-col">
        <div className="mx-6 self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <button
            className="pointer-events-auto font-black text-5xl cursor-pointer z-10"
            onClick={() => setCameraZoomed(!cameraZoomed)}
          >
            OScar
          </button>
          {/* <p>Experimental</p> */}
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto ">
          <input
            id="inputComm"
            className="w-full translate-y-3 placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-0 border-0  bg-white outline-none"
            // placeholder="Type a message..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                let hasVid = Object.values(trig).some((val) => val === true);
                if (hasVid && !loading) {
                  setTimeout(() => {
                    setCameraZoomed(true);
                  }, 5000);
                }
                sendMessage();
              }
              // if (e.currentTarget === "1") {

              // }
            }}
            onKeyUp={(e) => {
              switch (e.target.value) {
                case "1":
                  setTrig(defaultVal);
                  setTrig({ ...trig, mahfoudi: true });
                  setVidUrl("CONF_Mahfoudi.mp4");
                  setCameraZoomed(false);
                  break;
                case "2":
                  setTrig(defaultVal);
                  setTrig({ ...trig, kadili_abdelilah: true });
                  setVidUrl("CONF_Kadili_Abdelilah.mp4");
                  setCameraZoomed(false);
                  break;
                case "10":
                  setTrig(defaultVal);
                  setTrig({ ...trig, fadili_hassan: true });
                  setVidUrl("CONF_Fadili_Hassan.mp4");
                  setCameraZoomed(false);
                  break;
                case "9":
                  setTrig(defaultVal);
                  setTrig({ ...trig, najem: true });
                  setVidUrl("CONF_Najem.mp4");
                  setCameraZoomed(false);
                  break;
                case "6":
                  setTrig(defaultVal);
                  setTrig({ ...trig, moussab_benious: true });
                  setVidUrl("CONF_Moussab_Benious.mp4");
                  setCameraZoomed(false);
                  break;
                case "7":
                  setTrig(defaultVal);
                  setTrig({ ...trig, baif_brahim: true });
                  setVidUrl("CONF_Brahim_Baif.mp4");
                  setCameraZoomed(false);
                  break;

                default:
                  setTrig(defaultVal);
                  break;
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

import {
  CameraControls,
  ContactShadows,
  Environment,
  Text,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { Avatar } from "./Avatar";

const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((loadingText) => {
          if (loadingText.length > 2) {
            return "vecteezy_a-video-that-expresses-the-concept-of-digital-with-computer_14268937.mov.";
          }
          return loadingText + ".";
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);
  if (!loading) return null;
  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX={"left"} anchorY={"bottom"}>
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

export const Experience = () => {
  const cameraControls = useRef();
  const { cameraZoomed } = useChat();

  useEffect(() => {
    cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
  }, []);

  useEffect(() => {
    if (cameraZoomed) {
      cameraControls.current.setLookAt(0, 1.5, 28.5, -11.1, 7.0, 0, true);
      // cameraControls.current.setLookAt(0, 1.5, 28.5, -8.5, 7.3, 0, true); // for 4:3 screen
    } else {
      cameraControls.current.setLookAt(0, 1.5, 1.5, 0, 1.5, 0, true);
    }
  }, [cameraZoomed]);
  return (
    <>
      <CameraControls ref={cameraControls} />
      <Environment preset="night" />
      {/* Wrapping Dots into Suspense to prevent Blink when Troika/Font is loaded */}
      {/* <Suspense>
        <Dots position-y={1.75} position-x={-0.02} />
      </Suspense> */}
      <Avatar />
      <ContactShadows opacity={0.7} />
    </>
  );
};

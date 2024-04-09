import {
  CameraControls,
  ContactShadows,
  Environment,
  Text,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { Avatar } from "./Avatar";
import { AmbientLight } from "three";
import { color } from "three/examples/jsm/nodes/shadernode/ShaderNode.js";
import { useFrame } from "@react-three/fiber";

const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((loadingText) => {
          if (loadingText.length > 2) {
            return ".";
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
    cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 1);
  }, []);

  useEffect(() => {
    if (cameraZoomed) {
      cameraControls.current.setLookAt(0, 2, 9, 0, 1, 0, true);
      // console.log(cameraControls.current);
    } else {
      cameraControls.current.setLookAt(0, 2.9, 2, 0, 2.7, 0, true);
      // rotateY , rotateX , zoomOut and rotateZ??
    }
  }, [cameraZoomed]);
  const [col, setCol] = useState(false);
  const ref = useRef();
  useFrame((state , delta) => {
    // ref.current.rotation.y += 5*delta; 
  })
  return (
    <>
      <CameraControls ref={cameraControls} />
      <Environment preset="night" />
      {/* Wrapping Dots into Suspense to prevent Blink when Troika/Font is loaded */}
      {/* <Suspense>
        <Dots position-y={1.75} position-x={-0.02} />
      </Suspense> */}
      <Avatar position={[-0, 0, 0]} onClick={(e) => console.log("click")} />
      <ambientLight intensity={0.3} color={0xffffff} />
      <spotLight position={[1, 5, 3]} intensity={1} color={0xfff7d6} />
      <mesh
      ref={ref}
        position={[10.2, 2, 0]}
        onClick={(e) => {setCol(!col)}}
        // onContextMenu={(e) => console.log("context menu")}
        // onDoubleClick={(e) => console.log("double click")}
        // onWheel={(e) => console.log("wheel spins")}
        // onPointerUp={(e) => console.log("up")}
        // onPointerDown={(e) => console.log("down")}
        // onPointerOver={(e) => console.log("over")}
        // onPointerOut={(e) => console.log("out")}
        // onPointerEnter={(e) => console.log("enter")}
        // onPointerLeave={(e) => console.log("leave")}
        // onPointerMove={(e) => console.log("move")}
        // onPointerMissed={() => console.log("missed")}
        // onUpdate={(self) => console.log("props have been updated")}
      >
        <meshStandardMaterial color={col ? "red" : "white"} />
        <torusGeometry args={[1, 0.5]}  />
      </mesh>
      <ContactShadows opacity={0.7} />
    </>
  );
};

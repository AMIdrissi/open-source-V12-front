import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

function Card({ position, rotation }) {
  const cardRef = useRef();
  // const frameRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [oldPos , setOldPos] = useState(0);
  useFrame((state, delta) => {
    const active = isHovered ? 1 : 0;
    // cardRef.current.rotation.y += delta;
    // cardRef.current.rotation.x += delta;
    cardRef.current.position.y = active * Math.sin(state.clock.elapsedTime * 3) / 20;
    setOldPos(cardRef.current.position.y);
    // frameRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) / 20;
  });

  return (
    <>
      <group ref={cardRef}>
        <ambientLight position={[2, 3, 2]} intensity={1} />
        <directionalLight position={[2, 3, 0]} intensity={0.6} />
        <mesh
          position={position}
          // ref={cardRef}
          onPointerEnter={() => {
            setIsHovered(true);
          }}
          onPointerLeave={() => {
            setIsHovered(false);
          }}
          rotation={[0, Math.PI / 2, 0]}
        >
          <boxGeometry args={[0.1, 3.5, 3.5]} />

          <meshStandardMaterial
            color={0xe0e0e0}
            emissive={0x525252}
            metalness={1.2}
            roughness={3}
          />
        </mesh>
      </group>
    </>
  );
}

export default Card;

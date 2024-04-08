import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Card({ position, rotation }) {
  const cardRef = useRef();
  useFrame((state, delta) => {
    cardRef.current.rotation.y += delta;
    // cardRef.current.rotation.x += delta;
  });

  return (
    <>
      <group>
        <ambientLight position={[2, 3, 2]} intensity={1} />
        <directionalLight position={[2, 3, 2]} intensity={1} />
        <mesh position={position} ref={cardRef}>
          <boxGeometry args={[0.1, 3, 2]} />
          <meshStandardMaterial
            color={0xe0e0e0}
            emissive={0x525252}
            metalness={1}
            roughness={3}
          />
        </mesh>
      </group>
    </>
  );
}

export default Card;

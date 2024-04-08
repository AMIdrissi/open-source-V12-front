import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { CameraHelper } from "three";
import Card from "./components/card";
// import TextToSpeechConverter from './components/TextToSpeechConverter';

function App() {
  return (
    <>
      <Loader />
      <Leva hidden />
      <UI />
      {/* <TextToSpeechConverter/> */}
      <Canvas shadows camera={{ fov: 30}} >
        <Card position={[0,0,-5]} rotation={[Math.PI,0,0]}/>
      </Canvas>
    </>
  );
}

export default App;

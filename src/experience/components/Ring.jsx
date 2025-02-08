import { useGLTF } from "@react-three/drei";
import GoldMaterial from "../materials/Gold";


import {useRingConfigurator} from '../../store/useRingConfigurator'
import { Stage } from "@react-three/drei";
import PearlMaterial from "../materials/Pearl";
export default function Ring({}){
  const { config } = useRingConfigurator();

  const { scene } = useGLTF(
    config.model === "withPearl" ? "/assets/pearl_ring.glb" : "/assets/plain_ring.glb"
  );

  let ringMesh;

  let pearlMesh;

  scene.traverse((child) => {
    if (child.isMesh && child.name === "Ring") ringMesh = child;
    if (child.isMesh && child.name === "Pearl") pearlMesh = child;
  });

  const goldMaterial = GoldMaterial(); // Get the gold material
  const pearlMaterial = PearlMaterial();


  // Assign initial materials based on Zustand state
  if (ringMesh) ringMesh.material = goldMaterial;
  if (pearlMesh) pearlMesh.material = pearlMaterial;



  return <Stage key={config.model} preset={"soft"}  center={true} adjustCamera={1.5}><primitive size={1} rotation={[0,0.5,0]} object={scene}></primitive>
  </Stage>;
}


useGLTF.preload("/assets/pearl_ring.glb");
useGLTF.preload("/assets/plain_ring.glb");
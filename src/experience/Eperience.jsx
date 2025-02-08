import Ring from "./components/Ring"
import { OrbitControls,Stage } from "@react-three/drei"
export default function Experience(){


return (
  <>
    <OrbitControls />
    <directionalLight castShadow position={[1, 1, 1]} intensity={5.5} />
    {/* <Stage center preset={"soft"} shadows='contact' adjustCamera={1.5}> */}
      <Ring  />
    {/* </Stage> */}
    {/* <mesh><sphereGeometry></sphereGeometry></mesh> */}
  </>
);




}
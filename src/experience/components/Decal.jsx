/** @format */

import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry";
import * as THREE from "three";

const CreateDecal = (mesh, texture) => {
  if (!mesh) return null; // Ensure the mesh exists

  const position = new THREE.Vector3(-0.05, -1.0, 0); // Move downward to inner bottom
  const rotation = new THREE.Euler(Math.PI * 1.5, 0, Math.PI * 1.17); // Rotate 180° to face inward
  const size = new THREE.Vector3(2, 2, 2); // Scale of the decal

  const decalGeometry = new DecalGeometry(mesh, position, rotation, size);

  const decalMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 1,
    depthTest: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1, // Prevents z-fighting
  });

  const decalMesh = new THREE.Mesh(decalGeometry, decalMaterial);
  decalMesh.name = "Decal";

  return decalMesh;
};

export default CreateDecal;
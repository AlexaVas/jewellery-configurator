/** @format */

import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { useRingConfigurator } from "../../store/useRingConfigurator";
import * as THREE from "three";
import { useEffect, useMemo, useState } from "react";

const textureCache = new Map(); // Cache textures to avoid multiple loads

const loadingManager = new THREE.LoadingManager()

const loadTexture = (url) => {
  if (textureCache.has(url)) {
    return textureCache.get(url);
  }
  const texture = new THREE.TextureLoader(loadingManager).load(url);
  textureCache.set(url, texture);
  return texture;
};




const GoldMaterial = () => {
  const materialType = useRingConfigurator((state) => state.config.material);
  const textureType = useRingConfigurator((state) => state.config.textureType);
  const textureScale = useRingConfigurator(
    (state) => state.config.textureScale
  );
 const setTextureLoading = useRingConfigurator((state)=> state.setTextureLoading)
loadingManager.onStart =()=>{
setTextureLoading(true)
}
loadingManager.onLoad = () => {
  setTextureLoading(false);
};

  const [textures, setTextures] = useState({});

  const materialMap = useMemo(
    () => ({
      gold: { materialColor: "#FFD700", roughness: 0.1, metalness: 1 },
      whiteGold: { materialColor: "#ececec", roughness: 0.1, metalness: 1 },
      roseGold: { materialColor: "#f1a886", roughness: 0.1, metalness: 1 },
    }),
    []
  );

  useEffect(() => {
    const loadTextures = async () => {
      const texturePaths = {
        brushed: {
          roughnessMap: "/brushed_gold/Roughness.png",
          normalMap: "/brushed_gold/Normal.png",
          displacementMap: "/brushed_gold/Height.png",
        },
      
        hammered: {
          roughnessMap: "/hammered_gold/Roughness.jpeg",
          normalMap: "/hammered_gold/Normal.jpeg",
          displacementMap: "/hammered_gold/Height.jpeg",
        },
      };

      if (!texturePaths[textureType]) {
        setTextures({});
        return;
      }

      const loadedTextures = Object.fromEntries(
        Object.entries(texturePaths[textureType]).map(([key, path]) => [
          key,
          loadTexture(path),
        ])
      );

      setTextures(loadedTextures);
    };

    loadTextures();
  }, [textureType]);

  const material = useMemo(() => {
    const { materialColor, roughness,metalness } = materialMap[materialType];

    return new CustomShaderMaterial({
      baseMaterial: THREE.MeshPhysicalMaterial,
      uniforms: { uTime: { value: 0 } },
      flatShading: false,
      color: new THREE.Color(materialColor),
      roughnessMap: textures?.roughnessMap || null,
      normalMap: textures?.normalMap || null,
      roughness: roughness ?? 0.5,
      metalness: metalness ?? 1,
      normalScale: new THREE.Vector2(textureScale, textureScale),
    });
  }, [materialType, textures, textureScale]);

  return material;
};

export default GoldMaterial;
/** @format */

import isEqual from "fast-deep-equal";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type RingModel = "withPearl" | "plain";
export type Material = "gold" | "whiteGold" | "roseGold";
export type PearlColor = "white" | "pink" | "blue";
export type TextureType = "polished" | "brushed" | "hammered";
export type TextureScale = number;

export interface RingConfig {
  model: RingModel;
  material: Material;
  pearlColor?: PearlColor;
  textureType?: TextureType;
  textureScale?: TextureScale;
}

interface RingConfiguratorState {
  config: RingConfig;
  textureLoading: boolean;
  setConfig: (newConfig: Partial<RingConfig>) => void;
  setTextureLoading: (newState: boolean) => void;
}

export const useRingConfigurator = create<RingConfiguratorState>()(
  subscribeWithSelector((set) => ({
    config: {
      model: "withPearl",
      material: "gold",
      pearlColor: "white",
      textureType: "polished",
      textureScale: 2,
    },
    textureLoading: false,

    setConfig: (newConfig) =>
      set((state) => {
        const updatedConfig = { ...state.config, ...newConfig };

        // Prevent updates if values remain unchanged
        if (isEqual(state.config, updatedConfig)) {
          return {}; // No state change, avoids re-renders
        }

        return { config: updatedConfig };
      }),

    setTextureLoading: (newState) =>
      set((state) => {
       
        // Prevent updates if values remain unchanged
        if (newState === state.textureLoading) {
          return {}; // No state change, avoids re-renders
        }

        return { textureLoading: newState };
      }),
  }))
);
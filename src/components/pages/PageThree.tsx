/** @format */

import { useRingConfigurator } from "../../store/useRingConfigurator";
import { PearlColor } from "../../store/useRingConfigurator";
import Dropdown from "../DropDown";
export default function PageThree() {
  const { setConfig,config } = useRingConfigurator();

  // Explicitly type modelOptions to match RingModel
  const pearlOptions: { label: string; value: PearlColor }[] = [
    { label: "White", value: "white" },
    { label: "Pink", value: "pink" },
    { label: "Blue", value: "blue" },
  ];

if(config.model === "withPearl")  return (
    <section className="flex  flex-col h-full justify-center items-center space-y-6">
      {/* Dropdown Button */}

      <Dropdown
        label="Pearl Color"
        options={pearlOptions}
        setter={setConfig}
        currentValue={config.pearlColor}
        target="pearlColor"
      />

    </section>
  );
}

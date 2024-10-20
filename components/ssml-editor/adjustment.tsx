// import { SSMLAdjustments as SSMLAdjustmentsType } from "@/lib/types";
// import { Slider } from "@/components/ui/slider";

// export interface SSMLAdjustmentsProps {
//   adjustments?: SSMLAdjustmentsType;
//   onSSMLAdjustmentChange?: (adjustments: SSMLAdjustmentsType) => void;
// }

// const SSMLAdjustments: React.FC<SSMLAdjustmentsProps> = ({
//   adjustments = { speed: "1", pitch: "0", volume: "50" },
//   onSSMLAdjustmentChange,
// }) => {
//   return (
//     <div className="mt-2 px-1">
//       <div className="flex items-center">
//         <p className="text-white text-xs w-8">语速</p>
//         <Slider
//           min={0.5}
//           max={1.5}
//           step={0.1}
//           tooltip={{ formatter: (value) => `${value}X` }}
//           value={+(adjustments.speed || "")}
//           onChange={(value) => onSSMLAdjustmentChange?.({ ...adjustments, speed: `${value}` })}
//           className="flex-1"
//         />
//         <span className="text-white text-xs ml-2 w-8">{adjustments.speed}X</span>
//       </div>
//       <div className="flex items-center">
//         <p className="text-white text-xs w-8">语调</p>
//         <Slider
//           min={-50}
//           max={50}
//           step={5}
//           tooltip={{ formatter: (value) => `${value}%` }}
//           value={+(adjustments.pitch || "")}
//           onChange={(value) => onSSMLAdjustmentChange?.({ ...adjustments, pitch: `${value}` })}
//           className="flex-1"
//         />
//         <span className="text-white text-xs ml-2 w-8">{adjustments.pitch}%</span>
//       </div>
//       <div className="flex items-center">
//         <p className="text-white text-xs w-8">音量</p>
//         <Slider
//           min={10}
//           max={100}
//           step={5}
//           tooltip={{ formatter: (value) => `${value}%` }}
//           value={+(adjustments.volume || "")}
//           onChange={(value) => onSSMLAdjustmentChange?.({ ...adjustments, volume: `${value}` })}
//           className="flex-1"
//         />
//         <span className="text-white text-xs ml-2 w-8">{adjustments.volume}%</span>
//       </div>
//     </div>
//   );
// };

// export default SSMLAdjustments;

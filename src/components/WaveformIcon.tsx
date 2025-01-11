import { motion } from "framer-motion";

const WaveformIcon = ({ isActive }: { isActive: boolean }) => {
  // Static heights for the bars when inactive
  const staticHeights = [10, 8, 16, 8, 10];

  // Define dynamic heights for the bars when active
  const activeHeights = [6, 16, 10, 16, 6];

  return (
    <div className="flex items-center gap-[2px]">
      {/* Vertical bars for waveform */}
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <motion.div
            key={index}
            className="w-[2px] rounded-sm bg-current"
            initial={{ height: staticHeights[index] }}
            animate={
              isActive
                ? { height: [staticHeights[index], activeHeights[index], staticHeights[index]] }
                : { height: staticHeights[index] }
            }
            transition={
              isActive
                ? {
                    duration: 1.2,
                    repeat: Infinity,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }
                : { duration: 0.5, ease: "easeInOut" }
            }
          />
        ))}
    </div>
  );
};

export default WaveformIcon;

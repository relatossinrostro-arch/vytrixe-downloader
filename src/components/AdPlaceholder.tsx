"use client";

interface AdPlaceholderProps {
  slot: "header" | "content" | "bottom";
  className?: string;
}

export function AdPlaceholder({ slot, className = "" }: AdPlaceholderProps) {
  const minHeight = slot === "header" ? "h-[90px]" : "h-[250px]";
  
  return (
    <div className={`w-full max-w-4xl mx-auto my-6 overflow-hidden rounded-xl bg-gray-50/50 border border-dashed border-gray-200 flex flex-col items-center justify-center p-4 transition-all hover:bg-gray-50 ${minHeight} ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Advertisement</span>
      <div className="text-sm font-medium text-gray-300 italic">
        {slot === "header" ? "Leaderboard Banner Slot" : "Responsive Display Slot"}
      </div>
      <p className="text-[9px] text-gray-300 mt-1 uppercase tracking-tighter">Monetization Ready</p>
    </div>
  );
}

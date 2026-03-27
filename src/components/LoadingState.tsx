"use client";

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-4 border-gray-100" />
        <div className="absolute top-0 h-20 w-20 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <div className="absolute inset-4 animate-pulse rounded-full bg-blue-100" />
      </div>
      <h3 className="mt-10 text-2xl font-black text-gray-900 tracking-tight italic">Processing your video...</h3>
      <p className="mt-3 text-gray-500 font-medium">This usually takes a few seconds. We're fetching the best quality for you.</p>
    </div>
  );
}

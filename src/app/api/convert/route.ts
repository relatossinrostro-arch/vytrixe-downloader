import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // The 'download' route now handles both download and conversion.
  // This route is kept for backward compatibility or future specific conversion tasks.
  return NextResponse.json({ 
    success: false, 
    error: "Please use the /api/download endpoint for all media processing tasks.",
    step: "routing"
  }, { status: 400 });
}

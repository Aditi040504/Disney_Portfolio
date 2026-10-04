import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;

  // Basic security check to prevent directory traversal
  if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return new NextResponse("Invalid filename", { status: 400 });
  }

  const filePath = path.join(process.cwd(), "parallax-frames", filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Frame not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "image/jpeg",
      // Cache-Control for fast, efficient browser caching
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

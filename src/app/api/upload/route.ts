import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const imageUrl = await uploadImageToCloudinary(buffer);

    return Response.json({ url: imageUrl }, { status: 201 });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return Response.json({ error: "Failed to upload image" }, { status: 500 });
  }
}

import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";
import path from "node:path";
import fs from "node:fs";
import { v2 as cloudinary } from "cloudinary";
// ─── Style & Color Lookup Tables ────────────────────────────────────────────

const stylePrompts: Record<string, string> = {
  "Bold & Graphic":
    "eye-catching YouTube thumbnail, bold typography, vibrant colors, expressive shocked facial reaction, dramatic cinematic lighting, high contrast, click-worthy MrBeast-style composition, professional design",
  "Tech/Futuristic":
    "futuristic YouTube thumbnail, sleek modern design, glowing digital UI elements, holographic effects, cyber-tech aesthetic, sharp neon lighting, high-tech atmosphere, ultra-detailed",
  Minimalist:
    "minimalist YouTube thumbnail, clean layout, simple geometric shapes, limited harmonious color palette, plenty of negative space, modern flat design, clear strong focal point",
  Photorealistic:
    "photorealistic YouTube thumbnail, ultra-realistic cinematic lighting, natural skin tones, candid moment captured, DSLR-style photography, lifestyle realism, shallow depth of field, 8k",
  Illustrated:
    "illustrated YouTube thumbnail, custom digital illustration, stylized bold characters, vibrant colors, creative vector art style, sharp outlines, dynamic composition",
};

const colorSchemeDescriptions: Record<string, string> = {
  default: "vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette",
  vibrant: "vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette",
  sunset: "warm sunset tones, orange pink and purple hues, soft dreamy gradients, cinematic golden glow",
  forest: "natural green tones, earthy colors, calm and organic palette, fresh atmosphere",
  neon: "neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast dark background",
  purple: "purple-dominant color palette, magenta and violet tones, modern stylish dark mood",
  monochrome: "black and white palette, high contrast, dramatic lighting, timeless cinematic aesthetic",
  ocean: "cool blue and teal tones, aquatic color palette, fresh clean atmosphere",
  pastel: "soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic",
};

// ─── Prompt Builder ──────────────────────────────────────────────────────────

function buildFluxPrompt(
  title: string,
  style: string,
  color_scheme: string,
  user_prompt: string
): string {
  const styleDesc =
    stylePrompts[style] ??
    "YouTube thumbnail, vibrant colors, cinematic lighting, high contrast, ultra-detailed";

  const colorDesc =
    colorSchemeDescriptions[color_scheme] ??
    colorSchemeDescriptions["default"];

  let prompt = `${styleDesc} for the topic: "${title}". ${colorDesc}.`;

  if (user_prompt?.trim()) {
    prompt += ` Additional creative details: ${user_prompt.trim()}.`;
  }

  prompt +=
    " Ultra-detailed, sharp focus, 8k resolution, high CTR viral thumbnail composition, depth of field, cinematic shadows and glow effects.";

  return prompt;
}

// ─── Generate Thumbnail ──────────────────────────────────────────────────────

export const generateThumbnail = async (req: Request, res: Response) => {
  console.log("[DEBUG] Running generateThumbnail - VERSION: POLLINATIONS");
  try {
    const { userId } = req.session;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
    } = req.body;

    const parsedTextOverlay = text_overlay === true || text_overlay === "true";

    // Save initial record (isGenerating = true)
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay: parsedTextOverlay,
      isGenerating: true,
    });

    // Build the enhanced Flux prompt
    const prompt = buildFluxPrompt(title, style, color_scheme, user_prompt);

    console.log("[Flux] Sending prompt:", prompt);

    // Call NVIDIA NIM for Flux.2-Klein-4B (verified stable)
    const nvResponse = await fetch(
      "https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.2-klein-4b",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
        }),
      }
    );

    if (!nvResponse.ok) {
      const err = await nvResponse.text();
      throw new Error(`NVIDIA API error ${nvResponse.status}: ${err}`);
    }

    const nvData: any = await nvResponse.json();
    const imageEntry = nvData?.artifacts?.[0];
    if (!imageEntry || !imageEntry.base64) {
        throw new Error("No image data returned from NVIDIA Flux API");
    }

    let finalBuffer = Buffer.from(imageEntry.base64, "base64");

    // Save locally then upload to Cloudinary
    fs.mkdirSync("images", { recursive: true });
    const filePath = path.join("images", `thumb-${Date.now()}.png`);
    fs.writeFileSync(filePath, finalBuffer);

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });

    thumbnail.image_url = uploadResult.url;
    thumbnail.isGenerating = false;
    await thumbnail.save();

    fs.unlinkSync(filePath);

    console.log("[Flux] Thumbnail generated successfully:", uploadResult.url);

    res.json({ message: "Thumbnail generated", thumbnail });
  } catch (error: any) {
    console.error("[Flux] Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ─── Delete Thumbnail ────────────────────────────────────────────────────────

export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.session;

    await Thumbnail.findOneAndDelete({ _id: id, userId });
    res.json({ message: "Thumbnail deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

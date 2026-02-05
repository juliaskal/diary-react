import { writeFile } from "fs/promises"
import { NextResponse } from "next/server"
import path from "path"
import { randomUUID } from "crypto"

export async function POST(req: Request) {
  const data = await req.formData()
  const file = data.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = `${randomUUID()}-${file.name}`
  const filepath = path.join(process.cwd(), "public/images", filename)

  await writeFile(filepath, buffer)

  return NextResponse.json({
    url: `/images/${filename}`,
  })
}

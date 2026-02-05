"use client"

import Image from "next/image"
import clsx from "clsx"
import { FOLDER_COVERS } from "@/shared/folderCovers"
import { Upload } from "lucide-react"

type Props = {
  value: string | null
  onChange: (value: string) => void
}

export function CoverPicker({ value, onChange }: Props) {
  const handleUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    onChange(data.url)
  }

  return (
    <div className="space-y-3">

      <label className="flex cursor-pointer items-center gap-2 text-sm text-default-500 hover:text-default-700">
        <Upload size={16} />
        Загрузить свою обложку
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleUpload(file)
          }}
        />
      </label>

      <div className="grid grid-cols-3 gap-4">
        {FOLDER_COVERS.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => onChange(src)}
            className={clsx(
              "relative aspect-[16/9] overflow-hidden rounded-2xl border transition",
              value === src
                ? "border-primary ring-2 ring-primary"
                : "border-default-200 hover:opacity-80"
            )}
          >
            <Image
              src={src}
              alt="cover"
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <p className="text-sm text-default-500">
        Выбрано
      </p>

      {value && (
        <div className="relative mt-2 h-100 w-1/2 overflow-hidden rounded-lg border">
          <Image
            src={value}
            alt="preview"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  )
}

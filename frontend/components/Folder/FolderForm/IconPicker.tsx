"use client"

import { FOLDER_ICONS, FolderIconName } from "@/shared/icons"
import clsx from "clsx"

type Props = {
  value: FolderIconName
  onChange: (icon: FolderIconName) => void
}

export function IconPicker({ value, onChange }: Props) {
  return (
    <div className="grid lg:grid-cols-20 md:grid-cols-15 sm:grid-cols-8 grid-cols-4 gap-2">
      {Object.entries(FOLDER_ICONS).map(([name, Icon]) => (
        <button
          key={name}
          type="button"
          onClick={() => onChange(name as FolderIconName)}
          className={clsx(
            "flex items-center justify-center rounded-lg border p-2 transition",
            value === name
              ? "border-primary bg-primary/10"
              : "border-default-200 hover:bg-default-100"
          )}
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  )
}

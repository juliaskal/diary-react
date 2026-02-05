import { title } from "@/components/primitives";
import clsx from "clsx";
import { FolderForm } from "@/components/Folder/FolderForm";

export default function AddFolder() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className={clsx(title(), "tracking-wider")}>создать папку</h1>
      <FolderForm folder={null} isNew={true} />
    </div>
  );
}

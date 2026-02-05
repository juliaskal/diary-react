"use client";

import { FolderList } from "./FolderList";
import NextLink from "next/link";
import { Button } from "@heroui/button";
import { FolderPlus } from 'lucide-react';

const FolderPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <NextLink href={'/folders/new'}>
        <Button
          className="bg-linear-to-tr from-rose-300 to-pink-400 shadow-lg tracking-widest text-sm px-8"
          radius="full"
        >
          <FolderPlus />
          new folder
        </Button>
      </NextLink>

      <FolderList />

    </div>
  );
};

export { FolderPage };

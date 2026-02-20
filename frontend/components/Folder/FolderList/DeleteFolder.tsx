"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Trash2 } from "lucide-react";
import { siteConfig } from "@/config/site";

interface DeleteFolderProps {
  folderId: string;
  onDeleted: () => void;
}

function DeleteFolder({ folderId, onDeleted  }: DeleteFolderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleDeleteWithPosts() {
    try {
      await fetch(`${siteConfig.backendDomain}/api/folder/with-posts/${folderId}`, {
        method: "DELETE",
      });

      onDeleted();
      onClose();
    } catch (error) {
      console.error("Ошибка удаления папки", error);
    }
  }

  async function handleDeleteSavePosts() {
    try {
      await fetch(`${siteConfig.backendDomain}/api/folder/save-posts/${folderId}`, {
        method: "DELETE",
      });

      onDeleted();
      onClose();
    } catch (error) {
      console.error("Ошибка удаления папки", error);
    }
  }

  return (
    <>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        color="danger"
        onPress={onOpen}
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          <ModalHeader>Удалить папку?</ModalHeader>

          <ModalBody>
            <p>
              Вы можете удалить папку со всеми её записями или удалить папку
              без удаления записей, тогда записи станут без папки.
            </p>
          </ModalBody>

          <ModalFooter className="flex flex-col gap-2">
            <Button
              variant="light"
              onPress={onClose}
              radius="full"
              className="shadow-lg tracking-widest px-6 text-sm"
            >
              отмена
            </Button>

            <Button
              onPress={handleDeleteWithPosts}
              radius="full"
              color="danger"
              className="shadow-lg tracking-widest px-6 text-sm"
            >
              удалить вместе с записями
            </Button>

            <Button
              onPress={handleDeleteSavePosts}
              radius="full"
              color="danger"
              className="shadow-lg tracking-widest px-6 text-sm"
            >
              удалить с сохранением записей
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  );
}

export { DeleteFolder }

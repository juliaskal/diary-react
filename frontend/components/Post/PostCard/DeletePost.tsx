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

interface DeletePostProps {
  postId: string;
  onDeleted: () => void;
}

function DeletePost({ postId, onDeleted  }: DeletePostProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleDelete() {
    try {
      await fetch(`${siteConfig.backendDomain}/api/post/${postId}`, {
        method: "DELETE",
      });

      onDeleted();
      onClose();
    } catch (error) {
      console.error("Ошибка удаления поста", error);
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Удалить запись?</ModalHeader>

          <ModalBody>
            <p>
              Вы уверены, что хотите удалить эту запись?
              Это действие нельзя отменить.
            </p>
          </ModalBody>

          <ModalFooter>
            <Button
                variant="light"
                className="shadow-lg tracking-widest px-8"
                onPress={onClose}
                radius="full"
            >
              отмена
            </Button>

            <Button
                className="shadow-lg tracking-widest px-8"
                onPress={handleDelete}
                radius="full"
                color="danger"
            >
              удалить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { DeletePost }

"use client"

import React from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useDisclosure } from "@heroui/modal";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
} from "@heroui/drawer";
import { siteConfig } from "@/config/site";
import { Menu } from 'lucide-react';

function Sidebar() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
            isIconOnly
            key="left"
            className="capitalize"
            onPress={() => handleOpen()}
        >
            <Menu />
        </Button>
      </div>

      <Drawer isOpen={isOpen} placement="left" onOpenChange={onOpenChange}>
        <DrawerContent>
            <>
              <DrawerHeader className="flex flex-col gap-1">Diary</DrawerHeader>
              <DrawerBody>

                <ul className="gap-7 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                className="data-[active=true]:text-primary data-[active=true]:font-medium tracking-widest p-4"
                                href={item.href}
                                color="foreground"
                            >
                                <item.icon className="mr-3"/>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

              </DrawerBody>
            </>
        </DrawerContent>

      </Drawer>
    </>
  );
}

export { Sidebar }

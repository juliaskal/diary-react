"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import NextLink from "next/link";
import { Button } from "@heroui/button";
import { FolderPlus } from 'lucide-react';

import { cn } from "@/lib/utils";

const FolderList = () => {
  const images = [
    {
      src: "/images/GxZwofWXUAAr2fv.jpg",
      alt: "Название папки",
      code: "common",
    },
    {
      src: "/images/GnENKl9bgAItxzb.jpg",
      alt: "Название папки",
      code: "love",
    },
    {
      src: "/images/GpyedpbXkAAddqH.jpg",
      alt: "Название папки",
      code: "pole",
    },
    {
      src: "/images/G0-854NWwAAsPDf.jpg",
      alt: "Название папки",
      code: "work",
    },
    {
      src: "/images/Gw9Y6syWAAAIwLI.jpg",
      alt: "Название папки",
      code: "# 23",
    },
    {
      src: "/images/GkPlQrqW0AAt9ue.jpg",
      alt: "Название папки",
      code: "# 23",
    },
    {
      src: "/images/GuRCsKwaAAA_xkK.jpg",
      alt: "Название папки",
      code: "# 23",
    },
    {
      src: "/images/GrAehDgaAAIqhcd.jpg",
      alt: "Название папки",
      code: "# 23",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <FolderCards className="" images={images} />{" "}
    </div>
  );
};

export { FolderList };

const FolderCards = ({
  images,
  className,
}: {
  images: { src: string; alt: string; code: string }[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(1);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-6xl px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full items-center justify-center gap-1">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-3xl"
              initial={{ width: "2.5rem", height: "20rem" }}
              animate={{
                width: activeImage === index ? "24rem" : "5rem",
                height: activeImage === index ? "24rem" : "24rem",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/40 to-transparent"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute flex h-full w-full flex-col items-end justify-end p-4"
                  >
                    <p className="text-left text-xs text-white/50">
                      {image.code}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <img
                src={image.src}
                className="size-full object-cover"
                alt={image.alt}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { FolderCards };

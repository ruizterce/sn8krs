"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/img/pexels-melvin-buezo-1253763-2529148.jpg",
  "/img/pexels-nytheone-1032110.jpg",
];

const SLIDE_DURATION = 5000;

export default function Slideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(5);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 4, 100));
    }, SLIDE_DURATION / 25);

    const timeout = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, SLIDE_DURATION);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [currentImageIndex]);

  return (
    <div className="px-8 h-3/4 min-h-[500px] max-h-screen w-full flex flex-col items-center bg-[url(/img/diag-path-accent-secondary.svg)] bg-center bg-cover">
      <div className="w-full max-w-[1200px] h-full relative">
        <Image
          src={images[currentImageIndex]}
          loading="lazy"
          fill
          alt="Slideshow image"
          className="object-cover rounded-full drop-shadow-md-h-secondary"
        />
        <div className="absolute w-1/12 min-w-fit bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 opacity-50">
          <div className="w-full flex gap-3 justify-center">
            {images.map((image, index) => (
              <div
                key={image}
                className={`w-4 h-4 ring-2 ring-accent rounded-full cursor-pointer ${
                  index === currentImageIndex ? "bg-accent" : ""
                }`}
                onClick={() => {
                  setCurrentImageIndex(index);
                }}
              ></div>
            ))}
          </div>
          <div className=" h-1 bg-gray-300 ">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

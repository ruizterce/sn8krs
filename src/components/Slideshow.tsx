"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  {
    imgUrl: "/img/pexels-athena-1858404.jpg",
    title: "Fresh Nikes!",
    subtitle: "Catch the Latest Nike Drops",
    link: "products/sneakers?brand=Nike",
  },
  {
    imgUrl: "/img/pexels-craytive-1456735.jpg",
    title: "ASICS Basics!",
    subtitle: "Vintage Running Reimagined",
    link: "products/sneakers?brand=ASICS",
  },
  {
    imgUrl: "/img/pexels-daniel-adesina-279287-833052.jpg",
    title: "Street Vibes",
    subtitle: "Streetwear for the Culture",
    link: "products/streetwear",
  },
  {
    imgUrl: "/img/pexels-introspectivedsgn-7472175.jpg",
    title: "Supreme Goodies",
    subtitle: "You know the real deal",
    link: "products/streetwear?brand=Supreme",
  },
  {
    imgUrl: "/img/pexels-jddaniel-2385477.jpg",
    title: "Jumpman Heat",
    subtitle: "Iconic Jordans, New & Classic",
    link: "products/sneakers?brand=Jordan",
  },
  {
    imgUrl: "/img/pexels-nytheone-1032110.jpg",
    title: "Yeezy Stock",
    subtitle: "Cop before theyre gone",
    link: "products/sneakers?brand=Yeezy",
  },
  {
    imgUrl: "/img/pexels-pluyar-786003.jpg",
    title: "Hot Now",
    subtitle: "This Season’s Must-Haves",
    link: "products/",
  },
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
        <Link href={images[currentImageIndex].link}>
          <Image
            src={images[currentImageIndex].imgUrl}
            loading="lazy"
            fill
            alt="Slideshow image"
            className="object-cover rounded-full drop-shadow-md-h-secondary"
          />
          <div className="absolute top-12 left-1/2 -translate-x-1/2 font-futuraExtraBoldOblique  select-none whitespace-break-spaces">
            <p className="text-6xl sm:text-8xl text-stroke-md text-stroke-white drop-shadow-md-h bg-gradient-to-r from-primary via-secondary to-primary inline-block text-transparent bg-clip-text">
              {images[currentImageIndex].title}
            </p>
            <p className="text-3xl text-black text-stroke-sm text-stroke-accent drop-shadow-sm-h">
              {images[currentImageIndex].subtitle}
            </p>
          </div>
        </Link>
        {/* Progress bar and selectors */}
        <div className="absolute w-1/12 min-w-fit bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 opacity-50">
          <div className="w-full flex gap-3 justify-center">
            {images.map((image, index) => (
              <div
                key={image.imgUrl}
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

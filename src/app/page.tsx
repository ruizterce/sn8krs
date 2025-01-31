import Slideshow from "@/components/Slideshow";

export default function Home() {
  return (
    <div className="py-4 w-full h-full min-h-full flex flex-col items-center bg-background gap-6 overflow-auto">
      <Slideshow />
      <div className="flex flex-col items-center">
        <div className="py-2 px-4 sm:px-10 rounded-full bg-accent drop-shadow-md-h-secondary">
          <h1 className="font-futuraExtraBoldOblique text-3xl sm:text-6xl  text-white text-stroke-secondary text-stroke-md drop-shadow-sm-h-secondary sm:drop-shadow-md-h-secondary">
            Welcome to SN8KRS
          </h1>
        </div>
        <div className="pb-1 px-4 sm:px-10 rounded-b-3xl bg-accent  drop-shadow-md-h-secondary -translate-y-[5px]">
          <p className="font-futuraExtraBold sm:text-2xl text-background drop-shadow-sm-h-secondary">
            Fresh Goods Daily
          </p>
        </div>
      </div>
    </div>
  );
}

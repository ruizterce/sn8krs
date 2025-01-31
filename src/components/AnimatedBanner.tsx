"use client";

const messages = [
  "🔥 Special Offer! 50% Off Today! 🔥",
  "🚀 Free Shipping on Orders Over $50! 🚀",
  "✨ Limited Time Only! Don’t Miss Out! ✨",
];

export default function AnimatedBanner() {
  const repeatedContent = [...messages, ...messages, ...messages, ...messages];

  return (
    <div className="w-full overflow-hidden bg-secondary text-background py-2 select-none drop-shadow-lg">
      <div className="pl-8 flex w-max animate-marquee gap-8">
        {repeatedContent.map((msg, index) => (
          <p
            key={index}
            className="text-xl font-futuraBoldOblique whitespace-nowrap"
          >
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
}

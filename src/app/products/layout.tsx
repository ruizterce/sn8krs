import AnimatedBanner from "@/components/AnimatedBanner";

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AnimatedBanner />
      {children}
    </>
  );
}

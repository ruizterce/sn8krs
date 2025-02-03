import "./globals.css";
import Header from "@/components/Header";
import ReduxProvider from "../store/ReduxProvider";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>SN8KRS</title>
      </head>
      <body className="h-screen flex flex-col">
        <ReduxProvider>
          <Header />
          <main className="flex-1 overflow-hidden">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}

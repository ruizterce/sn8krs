import "./globals.css";
import Header from "@/components/Header";
import ReduxProvider from "../store/ReduxProvider";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <ReduxProvider>
          <Header />
          <main className="overflow-auto flex-1">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}

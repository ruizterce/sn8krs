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
      <body>
        <ReduxProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}

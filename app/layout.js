import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
export const metadata = { title: "বাজার দর | BazarDor", description: "প্রয়োজনীয় পণ্যের দাম এক নজরে" };
export default function RootLayout({ children }) {
  return <html lang="bn"><head><link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet" /></head>
    <body><Toaster /><Navbar /><Ticker /><main className="max-w-6xl mx-auto px-4">{children}</main><Footer /></body></html>;
}

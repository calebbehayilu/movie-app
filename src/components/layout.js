import React from "react";
import Navbar from "./navbar";
import { Inter, Josefin_Sans } from "next/font/google";

const josefin_Sans = Josefin_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-josefin_sans",
});
export default function Layout({ children }) {
  return (
    <div className={`${josefin_Sans.className} p-5 flex flex-col justify-between`}>
      <Navbar />
      {children}
    </div>
  );
}

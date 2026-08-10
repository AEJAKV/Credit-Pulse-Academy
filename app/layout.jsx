import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata = {
  title: "Credit Pulse Course Delivery",
  description: "Focused, private learning experiences from Credit Pulse.",
};

export default function RootLayout({ children }) {
  return <html lang="en-CA" className={plusJakartaSans.variable}><body>{children}</body></html>;
}

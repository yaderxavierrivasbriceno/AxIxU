import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "AxIxU | Aprende Idiomas y Habilidades con IA",
  description:
    "Plataforma web/app para aprender idiomas y desarrollar habilidades con agentes de IA.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

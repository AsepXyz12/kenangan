import "./globals.css";
import EnhancedModeToggle from "@/components/EnhancedModeToggle";

export const metadata = {
  title: "Admin · Galeri Kenangan MA",
  description: "Panel pengelolaan galeri kenangan MA.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-paper text-ink antialiased">
        {children}
        <EnhancedModeToggle />
      </body>
    </html>
  );
}

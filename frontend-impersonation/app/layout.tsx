import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";

export const metadata = {
  title: "Brand Fraud Intelligence",
  description: "Telegram OSINT Investigation Dashboard"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}
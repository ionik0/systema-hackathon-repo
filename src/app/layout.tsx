import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/nav/Navbar";

export const metadata: Metadata = {
  title: "Systema (Hackathon Demo)",
  description:
    "Practice system design and coding interviews with judged submissions. This is a mocked-evaluation demo built for a hackathon; the real product is at systema-sd.in.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="demo-banner">
          This is a <strong>hackathon demo</strong> with a mocked evaluation
          engine. The real product is at{" "}
          <a
            href="https://systema-sd.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            systema-sd.in
          </a>
          .
        </div>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

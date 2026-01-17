import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["400", "500", "600", "700", "900"],
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    style: ["italic", "normal"],
    weight: ["700"],
});

export const metadata: Metadata = {
    title: "Jamie Rose P. Ardiente | Architecture Portfolio",
    description: "Portfolio of Jamie Rose Ardiente, an architecture student specializing in Residential and Commercial design. Discover innovative spaces that combine character and functionality.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${playfair.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}

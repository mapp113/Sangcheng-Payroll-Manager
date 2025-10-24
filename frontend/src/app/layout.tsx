import type {Metadata} from "next";
import './globals.css'

export const metadata: Metadata = {
    title: "Sangcheng Payroll Manager",
    description: "Payroll management system for Sangcheng",
    icons: {
        icon: "/logo.jpg",
    },
};
export default function RootLayout({children}: { children: React.ReactNode }) {

    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}
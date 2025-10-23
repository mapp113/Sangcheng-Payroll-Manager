"use client";

import {usePathname} from "next/navigation";
import localFont from "next/font/local";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Bell, ChevronDown, CircleChevronDown, Clock} from "lucide-react";

const iceland = localFont({
    src: "../../../../public/fonts/Iceland-Regular.ttf", // chỉnh lại path theo vị trí file của bạn
    variable: "--font-iceland",
});

export default function Navbar() {
    const pathname = usePathname();
    const noLayoutRoutes = ["/login", "/register"];

    // Ẩn navbar ở các route không cần layout
    if (pathname && noLayoutRoutes.includes(pathname)) return null;

    const dashboardTitle = pathname?.startsWith("/manager")
        ? "Manager Dashboard"
        : "HR Dashboard";

    return (
        <nav
            className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-[#4AB4DE] px-4 text-[#345EA8]">
            {/* trái: logo + tiêu đề */}
            <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                    <AvatarImage src="/logo.jpg" alt="Logo"/>
                    <AvatarFallback>Logo</AvatarFallback>
                </Avatar>
                <span className={`${iceland.className} text-2xl font-bold`}>
          {dashboardTitle}
        </span>
            </div>

            {/* phải: chuông, đồng hồ, user */}
            <div className="flex items-center gap-4">
                <button id="notification" className="flex items-center gap-1">
                    <Bell/>
                    <ChevronDown/>
                </button>

                <button id="clock" className="flex items-center gap-1">
                    <Clock/>
                    <ChevronDown/>
                </button>

                <span className="flex items-center gap-1">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/logo.jpg" alt="User avatar"/>
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <span id="username">Nguyễn Văn A</span>
        </span>

                <CircleChevronDown/>
            </div>
        </nav>
    );
}

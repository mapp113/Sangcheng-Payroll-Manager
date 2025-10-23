import Navbar from "../_components/navbar";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        // KHÔNG dùng overflow-hidden ở container
        <div className="flex flex-col h-screen">
            {/* Header cố định */}
            <div className="h-16">
                <Navbar/>
            </div>

            {/* Nội dung chính: phải có flex-1 + min-h-0 + overflow-y-auto */}
            <main className="flex-1 min-h-0 overflow-y-auto bg-[#EAF5FF]">
                {children}
            </main>
        </div>
    );
}

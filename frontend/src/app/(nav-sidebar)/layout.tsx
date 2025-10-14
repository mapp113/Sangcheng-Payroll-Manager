import Navbar from "../_components/navbar";
import Sidebar from "../_components/navigation-sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='pt-16 ml-20'>
        {children}
      </div>
    </>
  );
}
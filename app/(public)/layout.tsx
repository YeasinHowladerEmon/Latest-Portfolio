import { Footer } from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <Navbar />
            <main className="">{children}</main>
            <Footer />
        </div>
    );
}

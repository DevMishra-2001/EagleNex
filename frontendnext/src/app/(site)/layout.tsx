import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

/** Shared chrome for every public page */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative w-full overflow-x-clip">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

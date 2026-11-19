import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import CTA from "./components/CTA";
import { About, Marquee, Process, Services, Testimonials } from "./components/Sections";

function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;

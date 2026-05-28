import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Services from "@/components/Services";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import SignalDivider from "@/components/SignalDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <SignalDivider />
        <About />
        <SignalDivider />
        <Services />
        <Certifications />
      </main>
      <Footer />
    </>
  );
}

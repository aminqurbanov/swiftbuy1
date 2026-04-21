import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import TrustMetrics from "@/sections/TrustMetrics";
import ProblemVsSolution from "@/sections/ProblemVsSolution";
import HowItWorks from "@/sections/HowItWorks";
import ForWho from "@/sections/ForWho";
import CTA from "@/sections/CTA";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustMetrics />
      <ProblemVsSolution />
      <HowItWorks />
      <ForWho />
      <CTA />
      <Footer />
    </main>
  );
}

// import FloatingSocials from './components/FloatingSocials/FloatingSocials';
import HeroSection from "./components/HeroSection";
import ExperienceSection from "./components/ExperienceSection";
import { ParallaxProvider } from "react-scroll-parallax";
import DesignsSection from "./components/DesignsSection";
import DevelopmentsSection from "./components/DevelopmentsSection";
import FloatingSocials from "./components/FloatingSocials/FloatingSocials";

function App() {
  return (
    <ParallaxProvider>
      {/* Floating Social Links */}
      <FloatingSocials />

      {/* Main Content */}
        <HeroSection />
        <ExperienceSection />
        <main className="relative">
        <DevelopmentsSection />
        </main>
        <DesignsSection />
    </ParallaxProvider>
  );
}

export default App;

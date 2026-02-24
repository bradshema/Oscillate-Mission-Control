import Spline from '@splinetool/react-spline/next';
import { BackgroundEffects, ForegroundHUD } from './ClientUI';

export default function MissionControl() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-oscillate-bg text-white selection:bg-oscillate-emerald selection:text-black">

      {/* BACKGROUND LAYER: SPLINE + STARS + RADIAL GRADIENT */}
      <div className="absolute inset-0 z-0 bg-oscillate-bg">
        <BackgroundEffects />

        {/* NATIVE NEXT.JS SPLINE WRAPPER */}
        <div className="absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out flex items-center justify-center overflow-hidden">
          <div className="w-full h-full flex items-center justify-center transform scale-125 md:scale-100">
            <Spline scene="https://prod.spline.design/afBlfmhvcO2kZLoC/scene.splinecode" />
          </div>
        </div>
      </div>

      {/* FOREGROUND LAYER: MODERN FLOATING GLASS HUD */}
      <ForegroundHUD />

    </div>
  );
}

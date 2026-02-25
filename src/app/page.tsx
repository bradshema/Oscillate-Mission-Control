import Spline from '@splinetool/react-spline/next';

export default function Home() {
  return (
    <main
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% -20%, #64748b 0%, #0f172a 50%, #000000 100%)'
      }}
    >
      <Spline
        scene="https://prod.spline.design/afBlfmhvcO2kZLoC/scene.splinecode?v=2"
      />
    </main>
  );
}

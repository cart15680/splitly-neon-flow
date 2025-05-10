
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // After 3 seconds, navigate to onboarding
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/20 filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-3/4 left-1/4 w-60 h-60 rounded-full bg-secondary/20 filter blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="z-10 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/30 filter blur-md animate-pulse-glow"></div>
          <img
            src="/lovable-uploads/c27b7c53-d89e-4960-898e-b094e61e9641.png"
            alt="Splitly Logo"
            className="w-32 h-32 relative z-10 animate-float"
          />
        </div>
        
        <h1 className="mt-8 text-4xl font-bold text-foreground animate-fade-in">Splitly</h1>
        <p className="mt-3 text-muted-foreground">Shop now, pay later</p>
        
        <div className="mt-16 flex space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
          <div className="w-2 h-2 bg-primary/70 rounded-full animate-pulse-glow" style={{ animationDelay: "300ms" }}></div>
          <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse-glow" style={{ animationDelay: "600ms" }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

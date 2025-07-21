
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect directly to login instead of splash screen
    const timer = setTimeout(() => {
      navigate('/login');
      toast({
        title: "Welcome to Splitly",
        description: "Shop now, pay later with ease",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-pulse-glow">
          <img 
            src="/lovable-uploads/c27b7c53-d89e-4960-898e-b094e61e9641.png" 
            alt="Splitly Logo" 
            className="w-24 h-24 mx-auto mb-6"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">Splitly</h1>
        <p className="text-xl text-muted-foreground">Loading your experience...</p>
      </div>
    </div>
  );
};

export default Index;

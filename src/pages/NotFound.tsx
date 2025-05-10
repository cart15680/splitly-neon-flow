
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="max-w-md text-center">
        <img 
          src="/lovable-uploads/c27b7c53-d89e-4960-898e-b094e61e9641.png" 
          alt="Splitly Logo" 
          className="w-20 h-20 mx-auto mb-6"
        />
        
        <h1 className="text-5xl font-bold mb-6">404</h1>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/dashboard">
          <Button className="neon-glow">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

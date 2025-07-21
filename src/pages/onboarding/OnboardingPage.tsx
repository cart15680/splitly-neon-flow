
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCallback } from "react";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [api, setApi] = useState<any>();
  
  const slides = [
    {
      title: "Shop Now, Pay Later",
      description: "Buy what you love today and split your payments over time with zero or low interest.",
      icon: "💳",
    },
    {
      title: "Track Your Dues",
      description: "Stay on top of your finances with easy EMI tracking and payment reminders.",
      icon: "📊",
    },
    {
      title: "Secure and Fast",
      description: "Experience quick approvals and secure transactions with our advanced security protocols.",
      icon: "🔒",
    },
  ];

  const handleSkip = () => {
    navigate("/login");
  };

  const handleNext = () => {
    if (activeSlide === slides.length - 1) {
      navigate("/login");
    } else {
      api?.scrollNext();
    }
  };

  const onSelect = useCallback(() => {
    if (!api) return;
    setActiveSlide(api.selectedScrollSnap());
  }, [api]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip button */}
      <div className="absolute top-8 right-8">
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Skip
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <Carousel 
          className="w-full max-w-md" 
          setApi={setApi}
          onSelect={onSelect}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mb-8">
                    <span className="text-5xl">{slide.icon}</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-foreground">{slide.title}</h2>
                  <p className="text-muted-foreground max-w-sm">{slide.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                activeSlide === index ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
              onClick={() => api?.scrollTo(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="p-8 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => api?.scrollPrev()}
          disabled={activeSlide === 0}
          className="text-muted-foreground"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button onClick={handleNext} className="neon-glow">
          {activeSlide === slides.length - 1 ? "Get Started" : "Next"}
          {activeSlide !== slides.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;

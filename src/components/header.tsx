import { ModeToggle } from "@/context/mode-toggle";
import { Lightbulb } from "lucide-react";

const Header = () => {
  return (
    <header className="backdrop-blur-sm sticky top-0 z-50 w-full border-b bg-transparent backdrop-blur py-2 text-white !text-white">
      <div className="relative flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Lightbulb className="h-7 w-7 text-primary text-white" />
          <h6 className="text-4xl font-bold">Quiz Time</h6>
        </div>

        <div className="absolute right-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;

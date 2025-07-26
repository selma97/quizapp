import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ResultProps {
  score: number;
}

const Result = ({ score }: ResultProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <span className="text-5xl mb-2 -mt-20 mb-20">The end!</span>
      <span className="text-xl font-semibold mb-6">Final Score : {score}</span>
      <Button variant="outline" color="secondary" onClick={() => navigate("/")}>
        <span className="text-black dark:text-white">Go to homepage</span>
      </Button>
    </div>
  );
};

export default Result;

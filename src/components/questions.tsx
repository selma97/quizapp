import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface CheckingQuestionProps {
  currQues: number;
  setCurrQues: (n: number) => void;
  questions: any[];
  options: string[];
  correct: string;
  score: number;
  setScore: (n: number) => void;
  setQuestions: (q: any[]) => void;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
}

const Questions = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  score,
  setScore,
  setQuestions,
  timer,
  setTimer,
}: CheckingQuestionProps) => {
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimer(15);
    setShowAnswers(false);
    setSelected(null);
    setError(null);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setShowAnswers(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currQues]);

  const handleSelect = (option: string) => {
    if (!selected) {
      setSelected(option);
      if (option === correct) {
        setScore(score + 1);
      }
      setError(null);
      setShowAnswers(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleNext = () => {
    if (!selected && !showAnswers) {
      setError(
        "You need to choose one option before moving to the next question."
      );
      return;
    }

    if (currQues >= 9) {
      navigate("/result");
    } else {
      setCurrQues(currQues + 1);
      setSelected(null);
    }
  };

  const handleQuit = () => {
    setQuestions([]);
    setCurrQues(0);
    navigate("/result");
  };

  return (
    <div>
      <h2>{questions[currQues].question}</h2>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => handleSelect(option)}
            className={`w-full border rounded-md px-4 py-2 text-sm font-medium whitespace-normal break-words text-left
      ${
        showAnswers && option === correct
          ? "bg-green-500 text-white border-green-600"
          : ""
      }
      ${
        showAnswers && selected === option && option !== correct
          ? "bg-red-500 text-white border-red-600"
          : ""
      }
      ${
        showAnswers && selected !== option && option !== correct
          ? "opacity-50"
          : ""
      }
    `}
          >
            {option}
          </Button>
        ))}
      </div>

      {error && (
        <Alert variant="destructive" className="col-span-2 mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between mt-6">
        <Button onClick={handleQuit}>Quit</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default Questions;

import Questions from "@/components/questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface QuizProps {
  name: string;
  questions: any[];
  score: number;
  setScore: (score: number) => void;
  setQuestions: (q: any[]) => void;
}

const Quiz = ({
  name,
  questions,
  score,
  setScore,
  setQuestions,
}: QuizProps) => {
  const [options, setOptions] = useState<string[]>([]);
  const [currQues, setCurrQues] = useState(0);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [currQues, questions]);

  const handleShuffle = (options: string[]) => {
    return options.sort(() => Math.random() - 0.5);
  };

  console.log("Options: " + options);

  return (
    <div className="w-full max-w-3xl mx-auto mb-4">
      <div className="flex justify-between items-center mb-4 text-white">
        <span>Player: {name}</span>
        <span>Category: {questions[currQues].category}</span>
      </div>
      <Card className="w-full max-w-5xl ">
        <CardHeader>
          <CardTitle>
            <div className="flex  w-full justify-between">
              <span>
                Question: {currQues + 1} of {questions.length}
              </span>
              <div className="flex justify-between gap-5 items-center">
                <span>Score: {score}</span>
                <div className="flex items-center gap-2">
                  <span>Time left:</span>
                  <span className="w-8 h-8 rounded-full border-2 border-white bg-black text-white dark:bg-transparent dark:text-white flex items-center justify-center text-sm">
                    {timer}s
                  </span>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {questions.length > 0 && options.length > 0 ? (
            <Questions
              currQues={currQues}
              setCurrQues={setCurrQues}
              questions={questions}
              options={options}
              correct={questions[currQues]?.correct_answer}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
              timer={timer}
              setTimer={setTimer}
            />
          ) : (
            <p>Loading</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;

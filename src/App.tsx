import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout";
import Home from "./pages/home";
import { ThemeProvider } from "./context/theme-provider";
import { useState } from "react";
import Quiz from "./pages/quiz";
import Result from "./pages/result";

function App() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    console.log(data);

    setQuestions(data.results);
  };

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <Home
                    name={name}
                    setName={setName}
                    fetchQuestions={fetchQuestions}
                    setQuestions={setQuestions}
                  />
                }
              />

              <Route
                path="quiz"
                element={
                  <Quiz
                    name={name}
                    questions={questions}
                    score={score}
                    setScore={setScore}
                    setQuestions={setQuestions}
                  />
                }
              />

              <Route path="result" element={<Result score={score} />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

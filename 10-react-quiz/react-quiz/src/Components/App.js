import { useEffect } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import PreviousButton from "./PreviousButton";
import { useQuizContext } from "../Contexts/QuizContext";

export default function App() {
  const {
    finalQuestions,
    index,
    status,
    difficulty,
    difficultyHighscore,
    shouldUploadHighscore,
    dispatch,
    userAnswers,
  } = useQuizContext();

  useEffect(
    function () {
      async function uploadHighScore() {
        try {
          const res = await fetch("http://localhost:8000/highscores/1", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              [difficulty]: difficultyHighscore[difficulty],
            }),
          });

          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }

          const data = await res.json();
          console.log("Highscore updated:", data);
        } catch (err) {
          console.log(console.error("Error sending data:", err));
        } finally {
          dispatch({ type: "resetUploadFlag" });
        }
      }
      uploadHighScore();
    },
    [shouldUploadHighscore, difficulty, difficultyHighscore, dispatch]
  );

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question question={finalQuestions[index]} />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "review" && (
          <>
            <Progress />
            <Question
              question={finalQuestions[index]}
              userAnswer={userAnswers[index]}
            />
            <Footer>
              <NextButton />
              <PreviousButton />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen highscore={difficultyHighscore[difficulty]} />
        )}
      </Main>
    </div>
  );
}

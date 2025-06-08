import { useEffect, useReducer } from "react";

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

const SECS_PER_QUESTION = 30;

const POINTS_MAP = {
  easy: 10,
  medium: 20,
  hard: 30,
};

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  userAnswers: [],
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  difficulty: "hard",
  initialQuestions: [],
  finalQuestions: [],
  amountOfQuestions: null,
  difficultyHighscore: {},
  shouldUploadHighscore: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        initialQuestions: action.payload,
        finalQuestions: action.payload,
        amountOfQuestions: state.questions.length,
      };
    case "loadHighscores":
      return { ...state, difficultyHighscore: action.payload };
    case "resetUploadFlag":
      return { ...state, shouldUploadHighscore: false };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      if (
        state.amountOfQuestions > state.finalQuestions.length ||
        state.amountOfQuestions < 1
      ) {
        return { ...state, status: "error" };
      }

      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.finalQuestions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        userAnswers: [...state.userAnswers, action.payload],
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "previousQuestion":
      return { ...state, index: state.index - 1 };
    case "finish":
      const currentHigh = state.difficultyHighscore[state.difficulty] || 0;
      const newHigh = state.points > currentHigh ? state.points : currentHigh;

      return {
        ...state,
        status: "finished",
        difficultyHighscore: {
          ...state.difficultyHighscore,
          [state.difficulty]: newHigh,
        },
        shouldUploadHighscore: newHigh > currentHigh,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        initialQuestions: state.questions,
        finalQuestions: state.questions,
        amountOfQuestions: state.questions.length,
        status: "ready",
        difficultyHighscore: state.difficultyHighscore,
      };
    case "review":
      return {
        ...state,
        index: 0,
        answer: null,
        status: "review",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "difficulty":
      const points = POINTS_MAP[action.payload];
      const filteredQuestions = state.questions.filter(
        (question) => question.points <= points
      );

      return {
        ...state,
        difficulty: action.payload,
        initialQuestions: filteredQuestions,
        finalQuestions: filteredQuestions,
      };
    case "amountOfQuestions":
      return {
        ...state,
        amountOfQuestions: action.payload,
        finalQuestions: [...state.initialQuestions]
          .sort(() => Math.random() - 0.5)
          .slice(0, action.payload),
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    {
      initialQuestions,
      finalQuestions,
      status,
      index,
      answer,
      points,
      difficulty,
      difficultyHighscore,
      secondsRemaining,
      amountOfQuestions,
      shouldUploadHighscore,
      userAnswers,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const totalQuestions = initialQuestions.length;
  const toBeTestedQuestions = finalQuestions.length;
  const maxPossiblePoints = finalQuestions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(
    function () {
      fetch("http://localhost:8000/questions")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch((err) => dispatch({ type: "dataFailed" }));
    },
    [dispatch]
  );

  useEffect(function () {
    fetch("http://localhost:8000/highscores/1")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "loadHighscores", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

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
        {status === "ready" && (
          <StartScreen
            toBeTestedQuestions={toBeTestedQuestions}
            totalQuestions={totalQuestions}
            dispatch={dispatch}
            amountOfQuestions={amountOfQuestions}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={toBeTestedQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={finalQuestions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={toBeTestedQuestions}
                index={index}
                status={status}
              />
            </Footer>
          </>
        )}
        {status === "review" && (
          <>
            <Question
              question={finalQuestions[index]}
              dispatch={dispatch}
              answer={answer}
              userAnswer={userAnswers[index]}
            />
            <Footer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={toBeTestedQuestions}
                index={index}
                status={status}
              />
              <PreviousButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={toBeTestedQuestions}
                index={index}
                status={status}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={difficultyHighscore[difficulty]}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

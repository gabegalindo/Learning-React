import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

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
        amountOfQuestions: filteredQuestions.length,
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

function QuizProvider({ children }) {
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

  const initialQuestionsAmount = initialQuestions.length;
  const finalQuestionsAmount = finalQuestions.length;
  const maxPossiblePoints = finalQuestions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  return (
    <QuizContext.Provider
      value={{
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
        dispatch,
        initialQuestionsAmount,
        finalQuestionsAmount,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("QuizContext was used outside the QuizProvider");

  return context;
}

export { QuizProvider, useQuizContext };

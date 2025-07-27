import { useQuizContext } from "../Contexts/QuizContext";
import DifficultSelector from "./DifficultySelector";
import Footer from "./Footer";
import QuestionAmountSelector from "./QuestionAmountSelector";

function StartScreen() {
  const { toBeTestedQuestions, dispatch } = useQuizContext();

  return (
    <>
      <div className="start">
        <h2>Welcome to the React Quiz!</h2>
        <h3>
          {toBeTestedQuestions < 1 ? 1 : toBeTestedQuestions} questions to test
          your React mastery
        </h3>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start" })}
        >
          Let's start
        </button>
      </div>
      <Footer>
        <DifficultSelector />
        <QuestionAmountSelector />
      </Footer>
    </>
  );
}

export default StartScreen;

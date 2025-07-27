import { useQuizContext } from "../Contexts/QuizContext";

function PreviousButton() {
  const { dispatch, index } = useQuizContext();

  if (index > 0) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "previousQuestion" })}
      >
        Previous
      </button>
    );
  }
}

export default PreviousButton;

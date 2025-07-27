import { useQuizContext } from "../Contexts/QuizContext";

function Progress() {
  const {
    index,
    numQuestions,
    points,
    maxPossiblePoints,
    answer,
    review = false,
  } = useQuizContext();

  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={!review ? index + Number(answer !== null) : index + 1}
      />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}{" "}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;

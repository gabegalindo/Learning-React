import { useQuizContext } from "../Contexts/QuizContext";

function Options() {
  const { finalQuestions, index, dispatch, answer, userAnswers } =
    useQuizContext();

  const question = finalQuestions[index];
  const userAnswer = userAnswers[index];

  const hasAnswered = answer != null || userAnswer !== undefined;

  return (
    <div>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${
              hasAnswered && index === userAnswer
                ? "answer"
                : index === answer
                ? "answer"
                : ""
            } ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;

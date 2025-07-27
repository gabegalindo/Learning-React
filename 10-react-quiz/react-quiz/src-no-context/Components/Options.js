function Options({ question, dispatch, answer, userAnswer }) {
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

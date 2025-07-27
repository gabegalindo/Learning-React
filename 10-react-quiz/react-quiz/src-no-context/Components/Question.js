import Options from "./Options";

function Question({ question, dispatch, answer, userAnswer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        userAnswer={userAnswer}
      />
    </div>
  );
}

export default Question;

function QuestionAmountSelector({
  amountOfQuestions,
  dispatch,
  totalQuestions,
}) {
  return (
    <div className="amount-div">
      <p>You will be tested on</p>
      <input
        className="amount"
        type="number"
        value={amountOfQuestions}
        onChange={(e) =>
          dispatch({
            type: "amountOfQuestions",
            payload: Number(e.target.value),
          })
        }
      ></input>

      <p>of the {totalQuestions} questions available</p>
    </div>
  );
}

export default QuestionAmountSelector;

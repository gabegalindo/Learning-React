import { useQuizContext } from "../Contexts/QuizContext";

function QuestionAmountSelector() {
  const { amountOfQuestions, dispatch, finalQuestionsAmount } =
    useQuizContext();

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

      <p>of the {finalQuestionsAmount} questions available</p>
    </div>
  );
}

export default QuestionAmountSelector;

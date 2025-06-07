import DifficultSelector from "./DifficultSelector";
import Footer from "./Footer";

function StartScreen({
  toBeTestedQuestions,
  totalQuestions,
  dispatch,
  amountOfQuestions,
}) {
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
        <DifficultSelector dispatch={dispatch} />
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
      </Footer>
    </>
  );
}

export default StartScreen;

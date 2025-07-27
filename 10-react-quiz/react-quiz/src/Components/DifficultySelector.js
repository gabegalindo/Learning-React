import { useQuizContext } from "../Contexts/QuizContext";

function DifficultySelector() {
  const { dispatch } = useQuizContext();

  return (
    <>
      <select
        className="difficulty"
        onChange={(e) =>
          dispatch({ type: "difficulty", payload: e.target.value })
        }
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard" selected>
          Hard
        </option>
      </select>
    </>
  );
}

export default DifficultySelector;

function DifficultSelector({ dispatch }) {
  return (
    <>
      <select
        className="difficulty "
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

export default DifficultSelector;

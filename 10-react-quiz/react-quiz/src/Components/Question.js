import { useQuizContext } from "../Contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { finalQuestions, index } = useQuizContext();

  const question = finalQuestions[index];

  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;

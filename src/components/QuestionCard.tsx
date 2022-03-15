import React from "react";
import { AnswerObject } from "../reducer";
import { ButtonWrapper, Wrapper } from "./QuestionCard.styles";

interface Props {
  question: string;
  answers: string[];
  onCheckHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = (props) => {
  const setAnswers = props.answers.map((answer) => {
    return (
      <ButtonWrapper
        key={Math.random().toString()}
        correct={props.userAnswer?.correctAnswer === answer}
        userClicked={props.userAnswer?.answer === answer}
      >
        <button
          disabled={!!props.userAnswer}
          value={answer}
          onClick={props.onCheckHandler}
        >
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </button>
      </ButtonWrapper>
    );
  });

  return (
    <Wrapper>
      <p>
        Question: {props.questionNumber} / {props.totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: props.question }} />
      <div>{setAnswers}</div>
    </Wrapper>
  );
};

export default QuestionCard;

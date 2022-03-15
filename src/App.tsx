import React, { Fragment, useReducer } from "react";
import { Difficulty, fetchQuizQestinos } from "./API";
import QuestionCard from "./components/QuestionCard";
import { reducer, State } from "./reducer";

// Styles
import { GlobalStyle, Wrapper } from "./App.styles";

const initialState: State = {
  loading: false,
  questions: [],
  number: 0,
  userAnswers: [],
  score: 0,
  gameOver: true,
};

// Total questions
const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  // Project state
  const [state, dispatchFn] = useReducer(reducer, initialState);

  // Start trivia
  const startTrivia = async () => {
    dispatchFn({ type: "READY" });

    const newQuestions = await fetchQuizQestinos(
      TOTAL_QUESTIONS,
      Difficulty.MEDIUM
    );

    dispatchFn({
      type: "START",
      payload: newQuestions,
    });
  };

  // Check answers
  const checkAnswersHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!state.gameOver) {
      // Users answers
      const answer = e.currentTarget.value;
      // Correct answer
      const correct = state.questions[state.number].correct_answer === answer;
      // Check if answer is correct
      if (correct) {
        dispatchFn({ type: "POINT" });
      }
      // Save answers in the array from user answers
      const answerObj = {
        question: state.questions[state.number].question,
        answer,
        correct,
        correctAnswer: state.questions[state.number].correct_answer,
      };
      // Dispatch to user answers
      dispatchFn({ type: "ANSWERS", payload: answerObj });
    }
  };

  // Next question
  const nextQustionHandler = () => {
    // Check if in the last question
    if (state.number + 1 === TOTAL_QUESTIONS) {
      dispatchFn({ type: "RESET" });
    }
    dispatchFn({ type: "NEXT" });
  };

  return (
    <Fragment>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {state.gameOver || state.userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" type="button" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!state.gameOver && <p className="score">Score: {state.score}</p>}
        {state.loading && <p>Loading Question...</p>}
        {!state.loading && !state.gameOver && (
          <QuestionCard
            questionNumber={state.number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={state.questions[state.number].question}
            answers={state.questions[state.number].answers}
            userAnswer={state.userAnswers && state.userAnswers[state.number]}
            onCheckHandler={checkAnswersHandler}
          />
        )}
        {!state.gameOver &&
          !state.loading &&
          state.userAnswers.length === state.number + 1 &&
          state.number !== TOTAL_QUESTIONS - 1 && (
            <button className="next" type="button" onClick={nextQustionHandler}>
              Next Qustion
            </button>
          )}
      </Wrapper>
    </Fragment>
  );
};

export default App;

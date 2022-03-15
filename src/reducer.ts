import { QuestionState } from "./API";

export interface AnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

export interface State {
  loading: boolean;
  questions: QuestionState[];
  number: number;
  userAnswers: AnswerObject[];
  score: number;
  gameOver: boolean;
}

interface Action {
  type: "READY" | "START" | "RESET" | "NEXT" | "POINT" | "ANSWERS";
  payload?: any;
}

export const reducer = (state: State, action: Action): State => {
  if (action.type === "READY") {
    return {
      ...state,
      loading: true,
      gameOver: false,
    };
  }
  if (action.type === "START") {
    return {
      ...state,
      questions: action.payload,
      score: 0,
      userAnswers: [],
      number: 0,
      loading: false,
    };
  }
  if (action.type === "RESET") {
    return {
      ...state,
      gameOver: true,
    };
  }
  if (action.type === "NEXT") {
    return {
      ...state,
      number: state.number + 1,
    };
  }
  if (action.type === "POINT") {
    return {
      ...state,
      score: state.score + 1,
    };
  }
  if (action.type === "ANSWERS") {
    return {
      ...state,
      userAnswers: [...state.userAnswers, action.payload],
    };
  }
  return state;
};

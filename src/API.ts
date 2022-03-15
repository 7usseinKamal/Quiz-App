export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface QuestionState extends Question {
  answers: string[];
}

// Helper function to collect all answers
const shuffleArray = (array: string[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const fetchQuizQestinos = async (
  amount: number,
  difficulty: Difficulty
) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  );

  if (!response.ok) {
    throw new Error("Fetch Questions Failed");
  }

  const data = await response.json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

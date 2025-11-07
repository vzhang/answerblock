export interface Question {
  id: number;
  type?: 'single' | 'truefalse';
  question: string;
  options: {
    A: string;
    B?: string;
    C?: string;
    D?: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface Answer {
  questionId: number;
  userAnswer: 'A' | 'B' | 'C' | 'D' | null;
  isCorrect: boolean;
}

export interface QuizState {
  currentIndex: number;
  answers: Answer[];
  submitted: boolean;
  score: number;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  answers: Answer[];
}

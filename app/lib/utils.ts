import { Answer, Question, QuizResult } from './types';

/**
 * 计算分数（一题0.7分，满分100分）
 */
export function calculateScore(answers: Answer[]): number {
  const correctCount = answers.filter(a => a.isCorrect).length;
  const score = Math.min(correctCount * 0.7, 100);
  return Math.round(score * 100) / 100;
}

/**
 * 生成随机排列
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 从本地存储加载测试进度
 */
export function loadQuizProgress(quizId: string): { currentIndex: number; answers: Answer[] } | null {
  try {
    const saved = localStorage.getItem(`quiz_${quizId}`);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

/**
 * 保存测试进度到本地存储
 */
export function saveQuizProgress(
  quizId: string,
  currentIndex: number,
  answers: Answer[]
): void {
  try {
    localStorage.setItem(`quiz_${quizId}`, JSON.stringify({ currentIndex, answers }));
  } catch {
    console.error('Failed to save progress');
  }
}

/**
 * 生成测试结果报告
 */
export function generateQuizResult(questions: Question[], answers: Answer[]): QuizResult {
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const wrongAnswers = answers.filter(a => !a.isCorrect).length;
  const score = calculateScore(answers);

  return {
    totalQuestions: questions.length,
    correctAnswers,
    wrongAnswers,
    score,
    answers,
  };
}

/**
 * 清除测试进度
 */
export function clearQuizProgress(quizId: string): void {
  try {
    localStorage.removeItem(`quiz_${quizId}`);
  } catch {
    console.error('Failed to clear progress');
  }
}

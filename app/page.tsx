'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Button, Row, Col, Spin, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, SendOutlined } from '@ant-design/icons';
import QuestionCard from './components/QuestionCard';
import QuizNav from './components/QuizNav';
import ResultSummary from './components/ResultSummary';
import ErrorList from './components/ErrorList';
import { Question, Answer, QuizResult } from './lib/types';
import {
  shuffleArray,
  loadQuizProgress,
  saveQuizProgress,
  generateQuizResult,
  clearQuizProgress,
} from './lib/utils';
import questions from '@/data/questions.json';

export default function Home() {
  const [quizState, setQuizState] = useState<{
    questions: Question[];
    currentIndex: number;
    answers: Answer[];
    submitted: boolean;
    result: QuizResult | null;
  }>({
    questions: [],
    currentIndex: 0,
    answers: [],
    submitted: false,
    result: null,
  });

  const [loading, setLoading] = useState(true);
  const [showErrorList, setShowErrorList] = useState(false);

  // 初始化题目
  useEffect(() => {
    const savedProgress = loadQuizProgress('main-quiz');
    const shuffledQuestions = shuffleArray(questions as Question[]);

    if (savedProgress) {
      // 加载已保存的进度
      setQuizState(prev => ({
        ...prev,
        questions: shuffledQuestions,
        currentIndex: savedProgress.currentIndex,
        answers: savedProgress.answers,
      }));
    } else {
      // 初始化答题表
      const initialAnswers: Answer[] = shuffledQuestions.map(q => ({
        questionId: q.id,
        userAnswer: null,
        isCorrect: false,
      }));
      setQuizState(prev => ({
        ...prev,
        questions: shuffledQuestions,
        answers: initialAnswers,
      }));
    }

    setLoading(false);
  }, []);

  // 保存进度
  useEffect(() => {
    if (quizState.questions.length > 0 && !quizState.submitted) {
      saveQuizProgress('main-quiz', quizState.currentIndex, quizState.answers);
    }
  }, [quizState.currentIndex, quizState.answers, quizState.submitted]);

  const handleAnswerChange = (choice: 'A' | 'B' | 'C' | 'D') => {
    const currentQuestion = quizState.questions[quizState.currentIndex];
    const answerIndex = quizState.answers.findIndex(a => a.questionId === currentQuestion.id);

    const newAnswers = [...quizState.answers];
    newAnswers[answerIndex] = {
      questionId: currentQuestion.id,
      userAnswer: choice,
      isCorrect: choice === currentQuestion.correctAnswer,
    };

    setQuizState(prev => ({
      ...prev,
      answers: newAnswers,
    }));
  };

  const handleSubmit = () => {
    const result = generateQuizResult(quizState.questions, quizState.answers);
    setQuizState(prev => ({
      ...prev,
      submitted: true,
      result,
    }));
  };

  const handleRestart = () => {
    clearQuizProgress('main-quiz');
    const shuffledQuestions = shuffleArray(questions as Question[]);
    const initialAnswers: Answer[] = shuffledQuestions.map(q => ({
      questionId: q.id,
      userAnswer: null,
      isCorrect: false,
    }));

    setQuizState({
      questions: shuffledQuestions,
      currentIndex: 0,
      answers: initialAnswers,
      submitted: false,
      result: null,
    });
    setShowErrorList(false);
  };

  const handleQuestionSelect = (index: number) => {
    setQuizState(prev => ({
      ...prev,
      currentIndex: index,
    }));
  };

  const handleNext = () => {
    if (quizState.currentIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
      }));
    }
  };

  const handlePrev = () => {
    if (quizState.currentIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
      }));
    }
  };

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
        <Layout.Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin size="large" tip="正在加载题目..." />
        </Layout.Content>
      </Layout>
    );
  }

  if (quizState.result && showErrorList) {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
        <Layout.Header style={{ backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0', padding: '16px 24px' }}>
          <Button
            type="text"
            onClick={() => setShowErrorList(false)}
            style={{ fontSize: '16px', color: '#1890ff' }}
            icon={<ArrowLeftOutlined />}
          >
            返回成绩
          </Button>
        </Layout.Header>
        <Layout.Content style={{ padding: '24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ErrorList questions={quizState.questions} answers={quizState.answers} />
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <Button
                type="primary"
                size="large"
                onClick={handleRestart}
                style={{ minWidth: '200px' }}
              >
                重新答题
              </Button>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    );
  }

  if (quizState.result) {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
        <Layout.Content style={{ padding: '32px 24px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <ResultSummary result={quizState.result} onRestart={handleRestart} />
            {quizState.result.wrongAnswers > 0 && (
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <Button
                  type="link"
                  size="large"
                  onClick={() => setShowErrorList(true)}
                  style={{ fontSize: '16px' }}
                >
                  查看错题分析 →
                </Button>
              </div>
            )}
          </div>
        </Layout.Content>
      </Layout>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentIndex];
  const currentAnswer = quizState.answers.find(a => a.questionId === currentQuestion.id);

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <Layout.Header
        style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #f0f0f0',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#222' }}>答题测试系统</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666' }}>
            共 {quizState.questions.length} 道题，每题 0.7 分，满分 100 分
          </p>
        </div>
      </Layout.Header>

      <Layout.Content style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={24}>
            <Col xs={24} lg={6}>
              <QuizNav
                questions={quizState.questions}
                answers={quizState.answers}
                currentIndex={quizState.currentIndex}
                onQuestionSelect={handleQuestionSelect}
                submitted={quizState.submitted}
              />
            </Col>

            <Col xs={24} lg={18}>
              <QuestionCard
                question={currentQuestion}
                currentIndex={quizState.currentIndex}
                totalQuestions={quizState.questions.length}
                answer={currentAnswer || null}
                onAnswerChange={handleAnswerChange}
                submitted={quizState.submitted}
              />

              <Space style={{ width: '100%', marginTop: '24px', gap: '16px' }} direction="horizontal">
                <Button
                  type="default"
                  size="large"
                  onClick={handlePrev}
                  disabled={quizState.currentIndex === 0 || quizState.submitted}
                  icon={<ArrowLeftOutlined />}
                  style={{ flex: 1 }}
                >
                  上一题
                </Button>

                <Button
                  type={quizState.submitted ? 'default' : 'primary'}
                  size="large"
                  onClick={handleNext}
                  disabled={quizState.currentIndex === quizState.questions.length - 1}
                  icon={<ArrowRightOutlined />}
                  style={{ flex: 1 }}
                >
                  下一题
                </Button>

                {!quizState.submitted && (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    danger
                    icon={<SendOutlined />}
                    style={{ flex: 1 }}
                  >
                    提交答卷
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </div>
      </Layout.Content>
    </Layout>
  );
}

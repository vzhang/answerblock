'use client';

import React from 'react';
import { Card, Button, Progress, Space, Radio, Alert } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Question, Answer } from '@/app/lib/types';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  answer: Answer | null;
  onAnswerChange: (choice: 'A' | 'B' | 'C' | 'D') => void;
  submitted: boolean;
}

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  answer,
  onAnswerChange,
  submitted,
}: QuestionCardProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const questionType = question.type === 'truefalse' ? '判断题' : '单选题';

  return (
    <Card
      className="shadow-lg"
      style={{
        borderRadius: '12px',
        border: '1px solid #f0f0f0',
      }}
    >
      {/* 进度信息 */}
      <div className="mb-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>
            第 {currentIndex + 1} / {totalQuestions} 题
            <span style={{ marginLeft: '12px', color: '#1890ff', fontWeight: 'bold' }}>
              [{questionType}]
            </span>
          </span>
        </div>
        <Progress
          percent={progress}
          strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
          size="small"
          showInfo={false}
        />
      </div>

      {/* 题干 */}
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', lineHeight: '1.6', color: '#222' }}>
        {question.question}
      </h2>

      {/* 选项列表 */}
      <div style={{ marginBottom: '24px' }}>
        {(['A', 'B', 'C', 'D'] as const).map((choice) => {
          if (question.type === 'truefalse' && (choice === 'C' || choice === 'D')) {
            return null;
          }

          const optionText = question.options[choice];
          if (!optionText) return null;

          const isSelected = answer?.userAnswer === choice;
          const isCorrect = answer?.isCorrect;
          const isCorrectAnswer = choice === question.correctAnswer;

          let buttonStatus = 'default';
          if (submitted) {
            if (isSelected && isCorrect) buttonStatus = 'success';
            else if (isSelected && !isCorrect) buttonStatus = 'danger';
            else if (!isSelected && isCorrectAnswer) buttonStatus = 'success';
          }

          return (
            <Button
              key={choice}
              block
              onClick={() => !submitted && onAnswerChange(choice)}
              disabled={submitted}
              size="large"
              type={isSelected && !submitted ? 'primary' : 'default'}
              danger={buttonStatus === 'danger'}
              style={{
                marginBottom: '12px',
                padding: '16px',
                height: 'auto',
                textAlign: 'left',
                borderRadius: '8px',
                fontSize: '15px',
                backgroundColor:
                  buttonStatus === 'success'
                    ? '#f6ffed'
                    : buttonStatus === 'danger'
                      ? '#fff1f0'
                      : isSelected && !submitted
                        ? '#1890ff'
                        : '#fff',
                borderColor:
                  buttonStatus === 'success'
                    ? '#52c41a'
                    : buttonStatus === 'danger'
                      ? '#ff4d4f'
                      : isSelected && !submitted
                        ? '#1890ff'
                        : '#d9d9d9',
                color:
                  buttonStatus === 'success'
                    ? '#52c41a'
                    : buttonStatus === 'danger'
                      ? '#ff4d4f'
                      : isSelected && !submitted
                        ? '#fff'
                        : '#222',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: isSelected && !submitted ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.06)',
                  fontWeight: 'bold',
                  flexShrink: 0,
                }}
              >
                {choice}
              </span>
              <span style={{ flex: 1 }}>{optionText}</span>
              {submitted && isSelected && isCorrect && <CheckCircleOutlined style={{ fontSize: '20px', color: '#52c41a' }} />}
              {submitted && isSelected && !isCorrect && <CloseCircleOutlined style={{ fontSize: '20px', color: '#ff4d4f' }} />}
              {submitted && !isSelected && isCorrectAnswer && (
                <span style={{ fontSize: '12px', color: '#52c41a', fontWeight: 'bold' }}>正确答案</span>
              )}
            </Button>
          );
        })}
      </div>

      {/* 答案反馈 */}
      {submitted && (
        <Alert
          message={`你的答案: ${answer?.userAnswer || '未作答'}`}
          description={
            !answer?.isCorrect && (
              <div style={{ marginTop: '8px' }}>
                <strong>正确答案: {question.correctAnswer}</strong>
              </div>
            )
          }
          type={answer?.isCorrect ? 'success' : 'error'}
          showIcon
          style={{ marginBottom: '0' }}
        />
      )}
    </Card>
  );
}

'use client';

import React from 'react';
import { Card, Empty, Alert, Tag, Space, Divider } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Question, Answer } from '@/app/lib/types';

interface ErrorListProps {
  questions: Question[];
  answers: Answer[];
}

export default function ErrorList({ questions, answers }: ErrorListProps) {
  const wrongAnswers = answers.filter(a => !a.isCorrect);

  if (wrongAnswers.length === 0) {
    return (
      <Card
        style={{
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          textAlign: 'center',
        }}
      >
        <Empty
          image={<div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>}
          description="太棒了！全部答对！"
          style={{ marginTop: '32px' }}
        />
      </Card>
    );
  }

  return (
    <Card
      title={
        <div>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>错题分析</span>
          <Tag color="red" style={{ marginLeft: '12px', fontSize: '14px' }}>
            {wrongAnswers.length} 题
          </Tag>
        </div>
      }
      style={{
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {wrongAnswers.map((wrongAnswer, idx) => {
          const question = questions.find(q => q.id === wrongAnswer.questionId);
          if (!question) return null;

          return (
            <div key={idx}>
              <Alert
                message={
                  <div>
                    <strong>题目 {question.id}</strong>
                    <span style={{ marginLeft: '12px', color: '#666' }}>
                      {question.type === 'truefalse' ? '[判断题]' : '[单选题]'}
                    </span>
                  </div>
                }
                description={question.question}
                type="error"
                showIcon
                style={{ marginBottom: '16px' }}
              />

              <div style={{ paddingLeft: '24px' }}>
                {(['A', 'B', 'C', 'D'] as const).map((choice) => {
                  if (question.type === 'truefalse' && (choice === 'C' || choice === 'D')) {
                    return null;
                  }

                  const optionText = question.options[choice];
                  if (!optionText) return null;

                  const isUserAnswer = choice === wrongAnswer.userAnswer;
                  const isCorrectAnswer = choice === question.correctAnswer;

                  return (
                    <div
                      key={choice}
                      style={{
                        padding: '12px',
                        marginBottom: '8px',
                        borderRadius: '6px',
                        backgroundColor: isUserAnswer ? '#fff1f0' : isCorrectAnswer ? '#f6ffed' : '#fafafa',
                        border: `1px solid ${isUserAnswer ? '#ffccc7' : isCorrectAnswer ? '#b7eb8f' : '#e8e8e8'}`,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: isUserAnswer ? '#ff4d4f' : isCorrectAnswer ? '#52c41a' : '#bfbfbf',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '12px',
                          flexShrink: 0,
                        }}
                      >
                        {choice}
                      </span>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '14px', color: '#222' }}>{optionText}</p>
                        {isUserAnswer && (
                          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ff4d4f', fontWeight: 'bold' }}>
                            <CloseCircleOutlined style={{ marginRight: '4px' }} />
                            你的答案
                          </p>
                        )}
                        {isCorrectAnswer && (
                          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#52c41a', fontWeight: 'bold' }}>
                            <CheckCircleOutlined style={{ marginRight: '4px' }} />
                            正确答案
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {idx < wrongAnswers.length - 1 && <Divider style={{ margin: '16px 0' }} />}
            </div>
          );
        })}
      </Space>
    </Card>
  );
}

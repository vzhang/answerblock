'use client';

import React, { useState } from 'react';
import { Card, Button, Space, Statistic, Row, Col, Badge } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Question, Answer } from '@/app/lib/types';

interface QuizNavProps {
  questions: Question[];
  answers: Answer[];
  currentIndex: number;
  onQuestionSelect: (index: number) => void;
  submitted: boolean;
}

export default function QuizNav({
  questions,
  answers,
  currentIndex,
  onQuestionSelect,
  submitted,
}: QuizNavProps) {
  const answeredCount = answers.filter(a => a.userAnswer !== null).length;
  const correctCount = answers.filter(a => a.isCorrect).length;

  return (
    <Card
      title="📋 题目导航"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col xs={12}>
          <Statistic
            title="已作答"
            value={answeredCount}
            suffix={`/ ${questions.length}`}
            valueStyle={{ color: '#1890ff', fontSize: '18px' }}
          />
        </Col>
        {submitted && (
          <Col xs={12}>
            <Statistic
              title="正确"
              value={correctCount}
              suffix={`/ ${questions.length}`}
              valueStyle={{ color: '#52c41a', fontSize: '18px' }}
            />
          </Col>
        )}
      </Row>

      {/* 题目导航网格 */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(45px, 1fr))',
          gap: '8px',
          padding: '8px 0',
        }}
      >
        {questions.map((_, index) => {
          const answer = answers.find(a => a.questionId === _?.id);
          const isAnswered = answer?.userAnswer !== null;
          const isCorrect = answer?.isCorrect;
          const isCurrent = currentIndex === index;

          let backgroundColor = '#fafafa';
          let borderColor = '#d9d9d9';
          let textColor = '#666';

          if (isCurrent) {
            backgroundColor = '#1890ff';
            borderColor = '#1890ff';
            textColor = '#fff';
          } else if (isAnswered) {
            if (isCorrect) {
              backgroundColor = '#f6ffed';
              borderColor = '#52c41a';
              textColor = '#52c41a';
            } else {
              backgroundColor = '#fff1f0';
              borderColor = '#ff4d4f';
              textColor = '#ff4d4f';
            }
          }

          return (
            <Button
              key={index}
              onClick={() => onQuestionSelect(index)}
              disabled={submitted}
              style={{
                width: '100%',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor,
                borderColor,
                color: textColor,
                fontWeight: isCurrent ? 'bold' : '500',
                fontSize: '13px',
                border: `2px solid ${borderColor}`,
                cursor: submitted ? 'not-allowed' : 'pointer',
              }}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>

      {/* 图例 */}
      <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '6px' }}>
        <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#1890ff', borderRadius: '3px' }} />
            <span>当前题</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#f6ffed', border: '2px solid #52c41a', borderRadius: '3px' }} />
            <span>已答正确</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#fff1f0', border: '2px solid #ff4d4f', borderRadius: '3px' }} />
            <span>已答错误</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#fafafa', border: '2px solid #d9d9d9', borderRadius: '3px' }} />
            <span>未作答</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

'use client';

import React from 'react';
import { Card, Button, Progress, Row, Col, Statistic } from 'antd';
import { CheckCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { QuizResult } from '@/app/lib/types';

interface ResultSummaryProps {
  result: QuizResult;
  onRestart: () => void;
}

export default function ResultSummary({ result, onRestart }: ResultSummaryProps) {
  const percentage = (result.correctAnswers / result.totalQuestions) * 100;
  const isPass = result.score >= 70;

  return (
    <Card
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      bodyStyle={{ textAlign: 'center', padding: '32px 24px' }}
    >
      {/* 完成标题 */}
      <div style={{ marginBottom: '32px' }}>
        <CheckCircleOutlined style={{ fontSize: '48px', color: isPass ? '#52c41a' : '#ff7a45', marginBottom: '16px' }} />
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#222', margin: 0 }}>
          {isPass ? '恭喜您通过！' : '继续加油！'}
        </h1>
      </div>

      {/* 分数展示 */}
      <div style={{ marginBottom: '32px' }}>
        <div
          style={{
            fontSize: '60px',
            fontWeight: 'bold',
            color: isPass ? '#52c41a' : '#ff7a45',
            marginBottom: '8px',
          }}
        >
          {result.score}
        </div>
        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>满分 100 分</p>
      </div>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={8}>
          <Statistic
            title="总题数"
            value={result.totalQuestions}
            valueStyle={{ color: '#1890ff', fontSize: '24px' }}
          />
        </Col>
        <Col xs={24} sm={8}>
          <Statistic
            title="正确"
            value={result.correctAnswers}
            valueStyle={{ color: '#52c41a', fontSize: '24px' }}
          />
        </Col>
        <Col xs={24} sm={8}>
          <Statistic
            title="错误"
            value={result.wrongAnswers}
            valueStyle={{ color: '#ff4d4f', fontSize: '24px' }}
          />
        </Col>
      </Row>

      {/* 进度条 */}
      <div style={{ marginBottom: '24px' }}>
        <Progress
          percent={percentage}
          strokeColor={isPass ? '#52c41a' : '#ff7a45'}
          format={() => `${percentage.toFixed(1)}% 正确率`}
        />
      </div>

      {/* 重新答题按钮 */}
      <Button
        type="primary"
        size="large"
        block
        onClick={onRestart}
        icon={<ReloadOutlined />}
        style={{ height: '44px', fontSize: '16px', fontWeight: 'bold' }}
      >
        重新答题
      </Button>
    </Card>
  );
}

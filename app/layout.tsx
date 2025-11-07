import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '答题系统',
  description: '在线答题测试系统',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

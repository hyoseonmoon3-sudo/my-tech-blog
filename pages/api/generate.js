import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function todaySlug() {
  return new Date().toISOString().split('T')[0];
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (req.headers['x-secret'] !== process.env.GENERATE_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const topics = [
    '최신 AI 도구 활용법', '개발자 생산성 향상 팁',
    '클라우드 서비스 비교', '사이버 보안 기초',
    '오픈소스 프로젝트 소개', '프로그래밍 언어 트렌드',
    'ChatGPT 프롬프트 활용법', '무료 개발 도구 추천',
  ];
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: `다음 주제로 IT 블로그 글을 작성해줘: "${topic}"\n\n반드시 아래 마크다운 형식으로만 응답해:\n\n---\ntitle: "글 제목"\ndate: "${todaySlug()}"\ndescription: "한 줄 요약 (100자 이내)"\n---\n\n(본문 내용, 최소 600자, 소제목 3개 이상 포함)`,
    }],
  });
  const content = message.content[0].text;
  const slug = `${todaySlug()}-${Math.floor(Math.random() * 1000)}`;
  const filepath = path.join(process.cwd(), 'posts', `${slug}.md`);
  fs.mkdirSync(path.join(process.cwd(), 'posts'), { recursive: true });
  fs.writeFileSync(filepath, content, 'utf8');
  res.status(200).json({ success: true, slug, topic });
}

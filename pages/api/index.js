import { getAllPosts } from '../lib/posts';
import Link from 'next/link';
import Head from 'next/head';

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>IT 테크 블로그</title>
        <meta name="description" content="최신 IT 기술 정보를 매일 업데이트합니다." />
      </Head>
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>IT 테크 블로그</h1>
        <p style={{ color: '#666', marginBottom: 32 }}>매일 자동 업데이트되는 IT 기술 정보</p>
        <div style={{ background: '#f5f5f5', padding: '1rem', textAlign: 'center', marginBottom: 32, borderRadius: 8, color: '#999', fontSize: 13 }}>
          광고 영역 (AdSense 승인 후 코드 삽입)
        </div>
        <div>
          {posts.map(post => (
            <Link key={post.slug} href={`/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ borderBottom: '1px solid #eee', paddingBottom: 20, marginBottom: 20, cursor: 'pointer' }}>
                <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>{post.title}</h2>
                <p style={{ color: '#888', fontSize: 13, margin: '0 0 8px' }}>{post.date}</p>
                <p style={{ color: '#555', fontSize: 15, margin: 0 }}>{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}

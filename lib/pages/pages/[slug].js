import { getAllPosts, getPostBySlug } from '../lib/posts';
import Head from 'next/head';
import Link from 'next/link';

export default function PostPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} | IT 테크 블로그</title>
        <meta name="description" content={post.description} />
      </Head>
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'sans-serif' }}>
        <Link href="/" style={{ color: '#888', fontSize: 14, textDecoration: 'none' }}>← 목록으로</Link>
        <h1 style={{ fontSize: 26, margin: '16px 0 8px' }}>{post.title}</h1>
        <p style={{ color: '#999', fontSize: 13, marginBottom: 32 }}>{post.date}</p>
        <div style={{ background: '#f5f5f5', padding: '1rem', textAlign: 'center', marginBottom: 32, borderRadius: 8, color: '#999', fontSize: 13 }}>
          광고 영역 (AdSense 승인 후 코드 삽입)
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} style={{ lineHeight: 1.8, fontSize: 16 }} />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  return { props: { post } };
}

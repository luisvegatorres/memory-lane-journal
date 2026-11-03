import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts } from '../../../lib/posts';
import Artwork from '../../../components/Artwork';
export const dynamicParams = false;
export function generateStaticParams() { return posts.map(({slug}) => ({slug})); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const {slug} = await params; const post = posts.find(p => p.slug === slug); return { title: post?.title ?? 'Note not found', description: post?.summary }; }
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params; const post = posts.find(p => p.slug === slug); if (!post) notFound();
  const next = posts[(posts.indexOf(post) + 1) % posts.length];
  return <main id="main"><article className="article" id="top"><Link className="back-link" href="/#journal">← All notes</Link><header className="article-header"><span className="eyebrow">NOTE {post.number} / {post.category}</span><h1>{post.title}</h1><p className="article-summary">{post.summary}</p><div className="article-meta"><span className="avatar">LV</span><span>Luis Vega Torres</span><span>November 3, 2026</span><span>{post.readTime}</span></div></header><Artwork motif={post.motif} large/><div className="article-body">{post.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}</section>)}<aside className="takeaway"><span className="eyebrow">THE IDEA TO KEEP</span><p>{post.takeaway}</p></aside><section className="sources"><h2>Keep exploring</h2><ul>{post.sources.map(source => <li key={source.url}><a href={source.url}>{source.label} ↗</a></li>)}</ul></section></div></article><nav className="next-note" aria-label="More notes"><Link href="/#journal">← Back to the journal</Link><Link href={`/posts/${next.slug}/`}><span className="eyebrow">UP NEXT / NOTE {next.number}</span><strong>{next.title} ↗</strong></Link></nav></main>;
}

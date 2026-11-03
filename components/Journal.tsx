'use client';
import { useState } from 'react';
import Link from 'next/link';
import { posts } from '../lib/posts';
import Artwork from './Artwork';
export default function Journal() {
  const [category, setCategory] = useState('All notes');
  const [search, setSearch] = useState('');
  const filtered = posts.filter(p => (category === 'All notes' || p.category === category) && `${p.title} ${p.summary} ${p.category}`.toLowerCase().includes(search.toLowerCase().trim()));
  return <section id="journal" className="journal" aria-labelledby="journal-heading"><div className="section-heading"><div><span className="eyebrow">THE COLLECTION</span><h2 id="journal-heading">A few things worth keeping.</h2></div><span className="note-count">03 NOTES / ALWAYS LEARNING</span></div><div className="filter-bar"><div className="filters" aria-label="Filter notes by topic">{['All notes', 'Architecture', 'Tech stacks', 'Deployment'].map(c => <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c}>{c}</button>)}</div><label className="search"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={e => setSearch(e.target.value)} aria-label="Search notes" placeholder="Find a note…"/></label></div><p className="sr-only" role="status">{filtered.length} {filtered.length === 1 ? 'note' : 'notes'} found</p><div className="post-grid">{filtered.map(post => <article className="post-card" key={post.slug}><Link href={`/posts/${post.slug}/`} className="art-link" tabIndex={-1} aria-hidden="true"><Artwork motif={post.motif}/></Link><div className="card-meta"><span>{post.category}</span><span>NOTE {post.number}</span></div><h3><Link href={`/posts/${post.slug}/`}>{post.title}</Link></h3><p>{post.summary}</p><div className="card-bottom"><span>{post.readTime}</span><Link href={`/posts/${post.slug}/`} aria-label={`Read ${post.title}`}>Read note <span aria-hidden="true">↗</span></Link></div></article>)}</div>{!filtered.length && <div className="empty-state"><h3>No notes found.</h3><p>Try another topic or a different search.</p><button onClick={() => { setCategory('All notes'); setSearch(''); }}>Reset filters</button></div>}</section>;
}

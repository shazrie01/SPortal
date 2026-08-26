import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { Search } from "lucide-react";

import { PageProps } from '@/types';

export interface NewsArticle {
    id: number;
    slug: string;
    category: string;
    title: string;
    subtitle: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    caption: string;
    content: string;
}

interface WelcomeProps extends PageProps {
    articles: NewsArticle[];
    canLogin?: boolean;
}

export default function Welcome({ articles, canLogin }: WelcomeProps) {
    const today = new Date().toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    const categories = ['All', 'Nation', 'Business', 'Sport', 'Lifestyle', 'Tech', 'Opinion', 'Videos'];
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredArticles = activeCategory === 'All'
        ? articles
        : articles.filter(a => a.category === activeCategory);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Head>
                <title>SPortal News</title>
                <meta name="description" content="SPortal Demo News Portal" />
            </Head>

            {/* Top Red Bar */}
            <div className="bg-[#E4002B] text-white py-1.5 px-4 flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
                <span>{today}</span>
                {canLogin && (
                    <Link href="/login" className="hover:underline">Admin dashboard</Link>
                )}
            </div>

            {/* Header */}
            <header className="border-b border-border py-6 px-4 flex justify-between items-center max-w-6xl mx-auto w-full">
                <Link href="/" className="text-4xl font-serif font-bold tracking-tighter">
                    SPortal<span className="text-[#E4002B]">.</span>
                </Link>
                <button className="text-gray-700 hover:text-black">
                    <Search className="size-6" />
                </button>
            </header>

            {/* Navigation */}
            <nav className="border-b border-border mb-8 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap gap-6 text-sm font-bold uppercase text-gray-700">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setActiveCategory(cat)}
                            className={`pb-3 -mb-3 transition-colors ${
                                activeCategory === cat
                                    ? 'text-[#E4002B] border-b-2 border-[#E4002B]'
                                    : 'hover:text-black hover:border-b-2 hover:border-black'
                            }`}
                        >
                            {cat === 'All' ? 'News' : cat}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 pb-20">
                <h1 className="text-2xl font-serif font-bold border-b-2 border-black pb-2 mb-6">{activeCategory === 'All' ? 'LATEST NEWS' : activeCategory.toUpperCase()}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredArticles.map((article: NewsArticle) => (
                        <Link href={`/article/${article.id}`} key={article.id} className="group flex flex-col gap-3">
                            <div className="overflow-hidden bg-gray-100 aspect-[3/2]">
                                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <span className="text-xs font-bold text-[#E4002B] uppercase tracking-widest">{article.category}</span>
                            <h2 className="text-xl font-serif font-bold leading-snug group-hover:text-[#E4002B] transition-colors">{article.title}</h2>
                            <p className="text-sm text-gray-600 line-clamp-3">{article.subtitle}</p>
                            <span className="text-xs text-gray-400 font-medium mt-auto pt-2">{article.date}</span>
                        </Link>
                    ))}
                </div>
            </main>
            
            <footer className="bg-gray-100 py-6 border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-4 text-xs text-gray-500">
                    SPortal News — a demo publication for social share click tracking.
                </div>
            </footer>
        </div>
    );
}

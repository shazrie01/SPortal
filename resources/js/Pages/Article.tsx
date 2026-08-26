import { Head, Link } from "@inertiajs/react";
import { Search, User, Clock, BookOpen } from "lucide-react";
import { ShareBar } from "@/Components/ShareBar";

import { PageProps } from '@/types';
import { NewsArticle } from './Welcome';
import { PlatformData } from './Dashboard';

interface ArticlePageProps extends PageProps {
    article: NewsArticle;
    canLogin?: boolean;
    sharePlatforms: PlatformData[];
}

export default function Article({ article, canLogin, sharePlatforms }: ArticlePageProps) {
    const today = new Date().toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Head>
                <title>{`${article.title} | SPortal News`}</title>
                <meta name="description" content={article.subtitle} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.subtitle} />
                <meta property="og:image" content={article.image} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description" content={article.subtitle} />
                <meta name="twitter:image" content={article.image} />
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
                    <span className="text-[#E4002B] border-b-2 border-[#E4002B] pb-3 -mb-3 cursor-pointer">News</span>
                    <span className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-3 -mb-3">Business</span>
                    <span className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-3 -mb-3">Sport</span>
                    <span className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-3 -mb-3">Lifestyle</span>
                    <span className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-3 -mb-3">Tech</span>
                    <span className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-3 -mb-3">Opinion</span>
                    <span className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-3 -mb-3">Videos</span>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 pb-20">
                <article>
                    <p className="text-xs font-bold text-[#E4002B] uppercase tracking-widest">{article.category}</p>
                    <h1 className="mt-4 text-4xl md:text-[2.75rem] font-serif font-bold leading-tight">{article.title}</h1>
                    <p className="mt-5 text-xl text-gray-600 leading-relaxed">{article.subtitle}</p>
                    
                    <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-gray-500 pb-4 border-b border-border">
                        <span className="flex items-center gap-1.5"><User className="size-4" /> By {article.author}</span>
                        <span className="flex items-center gap-1.5"><Clock className="size-4" /> Published {article.date}</span>
                        <span className="flex items-center gap-1.5"><BookOpen className="size-4" /> {article.readTime}</span>
                    </div>

                    <div className="py-5 border-b border-border flex items-center gap-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-700">Share this story</span>
                        <ShareBar title={article.title} platforms={sharePlatforms} />
                    </div>

                    <div className="mt-8">
                        <img src={article.image} alt={article.title} className="w-full object-cover" />
                        <div className="mt-2 text-xs text-gray-500 border-l-[3px] border-[#E4002B] pl-3 py-1 bg-gray-50/50">{article.caption}</div>
                    </div>

                    <div className="mt-8 prose prose-lg max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{__html: article.content}}>
                    </div>

                    <div className="mt-12 py-5 border-y border-border flex items-center gap-4 bg-gray-50/50 px-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-700">Found this useful? Share it</span>
                        <ShareBar title={article.title} platforms={sharePlatforms} />
                    </div>
                </article>

                <aside className="space-y-10">
                    <div>
                        <h3 className="font-serif font-bold text-lg border-b-2 border-black pb-2 mb-4 uppercase">Most Shared</h3>
                        <ol className="space-y-4">
                            {[
                                "Newsroom analytics: which channel really drives readers",
                                "Telegram overtakes email as the fastest-growing share channel",
                                "How editors use share data to plan the front page",
                                "Five metrics every digital newsroom should watch daily"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 border-b border-border pb-4 last:border-0">
                                    <span className="text-[#E4002B] font-serif font-bold text-2xl leading-none">{i + 1}</span>
                                    <span className="text-sm font-medium hover:text-[#E4002B] cursor-pointer transition-colors leading-snug">{item}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                    
                    <div className="p-6 border border-border shadow-sm bg-gray-50/80 rounded-sm">
                        <h4 className="font-serif font-bold text-base mb-2">Newsroom analytics</h4>
                        <p className="text-sm text-gray-600 mb-5 leading-relaxed">Share clicks from this page are charted by date, channel and page URL in the protected admin dashboard.</p>
                        <Link href="/login" className="inline-block bg-[#E4002B] text-white px-5 py-2.5 text-sm font-bold rounded shadow-sm hover:bg-red-700 transition-colors">
                            Open dashboard
                        </Link>
                    </div>
                </aside>
            </main>

            <footer className="bg-gray-100 py-10 border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-4 text-xs text-gray-500">
                    SPortal News — a demo publication for social share click tracking.
                </div>
            </footer>
        </div>
    );
}

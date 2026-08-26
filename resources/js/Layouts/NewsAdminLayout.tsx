import { PropsWithChildren } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function NewsAdminLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
    const today = new Date().toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-[#f8f7f4] font-sans text-gray-900">
            {title && <Head title={`${title} | SPortal`} />}

            {/* Top accent stripe */}
            <div className="h-1 bg-[#E4002B]" />

            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-5 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-baseline gap-0.5">
                        <span className="text-3xl font-serif font-bold text-gray-900 tracking-tight">SPortal</span>
                        <span className="text-3xl font-serif font-bold text-[#E4002B]">.</span>
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            ← Back to site
                        </Link>
                    </nav>
                </div>
            </header>

            {children}

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white mt-16">
                <div className="max-w-6xl mx-auto px-5 py-6 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} SPortal · {today}
                </div>
            </footer>
        </div>
    );
}

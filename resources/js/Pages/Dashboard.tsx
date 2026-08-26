import { useMemo, useState } from "react";
import { Head, router } from "@inertiajs/react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { LogOut, RefreshCw, Settings, TrendingUp, BarChart3, Share2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { PageProps } from "@/types";
import NewsAdminLayout from '@/Layouts/NewsAdminLayout';

export interface PlatformData {
    id?: number;
    key: string;
    label: string;
    color: string;
    icon?: string;
    url_template?: string;
    is_active?: boolean;
    order_column?: number;
    count?: number;
}

export interface TimelineData {
    day: string;
    [key: string]: string | number;
}

export interface TopPageData {
    url: string;
    count: number;
}

export interface RecentShare {
    id: number;
    clicked_at: string;
    platform_key: string;
    page_url: string;
    page_title: string;
}

interface AnalyticsData {
    total: number;
    timeline: TimelineData[];
    byPlatform: PlatformData[];
    topPages: TopPageData[];
    recent: RecentShare[];
}

interface DashboardProps extends PageProps {
    analyticsData: AnalyticsData;
    allPlatforms: PlatformData[];
    filters: {
        from: string;
        to: string;
        platforms: string[];
        urlContains: string;
    };
}

export default function Dashboard({ analyticsData, allPlatforms, filters }: DashboardProps) {
    const [from, setFrom] = useState(filters.from);
    const [to, setTo] = useState(filters.to);
    const [selected, setSelected] = useState<string[]>(filters.platforms);
    const [urlContains, setUrlContains] = useState(filters.urlContains);

    const activePlatforms = useMemo(
        () => analyticsData.byPlatform.filter((p: PlatformData) => selected.length === 0 || selected.includes(p.key)),
        [analyticsData.byPlatform, selected]
    );

    const [filterErrors, setFilterErrors] = useState<Record<string, string>>({});

    const applyFilters = () => {
        const errs: Record<string, string> = {};
        if (!from) errs.from = "Start date is required.";
        if (!to) errs.to = "End date is required.";
        if (from && to && from > to) errs.from = "Start date must be before end date.";
        setFilterErrors(errs);
        if (Object.keys(errs).length > 0) return;

        router.get(route("dashboard"), {
            from, to, platforms: selected, urlContains
        }, { preserveState: true });
    };

    const signOut = () => {
        router.post(route('logout'));
    };

    return (
        <NewsAdminLayout title="Analytics Dashboard">
            <main className="max-w-6xl mx-auto px-5 py-8">
                {/* Page header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                    <div>
                        <p className="text-xs font-semibold text-[#E4002B] uppercase tracking-widest">Dashboard</p>
                        <h1 className="mt-1 text-3xl font-serif font-bold text-gray-900">Share Analytics</h1>
                        <p className="mt-1 text-sm text-gray-500">Track how readers share your stories across social channels.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 border-gray-300 text-gray-700 hover:bg-gray-100"
                            onClick={() => router.get(route('platforms.index'))}
                        >
                            <Settings className="size-3.5" />
                            Channels
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 border-gray-300 text-gray-700 hover:bg-gray-100"
                            onClick={signOut}
                        >
                            <LogOut className="size-3.5" />
                            Sign out
                        </Button>
                    </div>
                </div>

                {/* Stat cards */}
                <section className="grid gap-4 grid-cols-2 sm:grid-cols-3 mb-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                            <Share2 className="size-3.5" />
                            Total shares
                        </div>
                        <p className="mt-3 text-3xl font-bold text-gray-900">{analyticsData.total}</p>
                    </div>
                    {activePlatforms.map((p: PlatformData) => (
                        <div key={p.key} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                <span className="size-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                                {p.label}
                            </div>
                            <p className="mt-3 text-3xl font-bold text-gray-900">{p.count ?? 0}</p>
                        </div>
                    ))}
                </section>

                {/* Filters */}
                <section className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm mb-8">
                    <div className="grid gap-4 md:grid-cols-4 items-end">
                        <div className="space-y-1.5">
                            <Label htmlFor="from" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">From</Label>
                            <Input id="from" type="date" value={from} max={to} onChange={(e) => { setFrom(e.target.value); setFilterErrors(prev => ({ ...prev, from: "" })); }} className={`h-10 bg-gray-50 rounded-md ${filterErrors.from ? "border-red-400" : "border-gray-300"}`} />
                            {filterErrors.from && <p className="text-xs text-[#E4002B] mt-1">{filterErrors.from}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="to" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">To</Label>
                            <Input id="to" type="date" value={to} min={from} onChange={(e) => { setTo(e.target.value); setFilterErrors(prev => ({ ...prev, to: "" })); }} className={`h-10 bg-gray-50 rounded-md ${filterErrors.to ? "border-red-400" : "border-gray-300"}`} />
                            {filterErrors.to && <p className="text-xs text-[#E4002B] mt-1">{filterErrors.to}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="url" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">URL contains</Label>
                            <Input id="url" maxLength={300} value={urlContains} onChange={(e) => setUrlContains(e.target.value)} placeholder="e.g. /article" className="h-10 bg-gray-50 border-gray-300 rounded-md" />
                        </div>
                        <Button onClick={applyFilters} className="h-10 bg-[#E4002B] hover:bg-[#c90025] text-white gap-1.5 rounded-md">
                            <RefreshCw className="size-3.5" />
                            Apply
                        </Button>
                    </div>
                    {/* Channel pills */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Channels</p>
                        <div className="flex flex-wrap gap-2">
                            {allPlatforms.map((p) => {
                                const active = selected.length === 0 || selected.includes(p.key);
                                return (
                                    <button
                                        key={p.key}
                                        type="button"
                                        onClick={() =>
                                            setSelected((prev) =>
                                                prev.includes(p.key) ? prev.filter((k) => k !== p.key) : [...prev, p.key]
                                            )
                                        }
                                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${active
                                                ? "border-gray-400 bg-gray-900 text-white shadow-sm"
                                                : "border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300"
                                            }`}
                                    >
                                        <span className="size-2 rounded-full" style={{ backgroundColor: active ? p.color : '#d1d5db' }} />
                                        {p.label}
                                    </button>
                                );
                            })}
                            {selected.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setSelected([])}
                                    className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* Line chart */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
                    <div className="flex items-center gap-2 mb-5">
                        <TrendingUp className="size-4 text-[#E4002B]" />
                        <h2 className="text-lg font-serif font-bold text-gray-900">Clicks over time</h2>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={analyticsData.timeline}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="day" stroke="#9ca3af" fontSize={11} tickLine={false} />
                                <YAxis allowDecimals={false} stroke="#9ca3af" fontSize={11} tickLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        background: "#fff",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: 8,
                                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                        fontSize: 12,
                                    }}
                                />
                                <Legend />
                                {activePlatforms.map((p: PlatformData) => (
                                    <Line
                                        key={p.key}
                                        type="monotone"
                                        dataKey={p.key}
                                        name={p.label}
                                        stroke={p.color}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* Bar + Pie side by side */}
                <section className="grid gap-6 lg:grid-cols-2 mb-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-5">
                            <BarChart3 className="size-4 text-[#E4002B]" />
                            <h2 className="text-lg font-serif font-bold text-gray-900">Clicks per channel</h2>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={activePlatforms}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="label" stroke="#9ca3af" fontSize={11} tickLine={false} />
                                    <YAxis allowDecimals={false} stroke="#9ca3af" fontSize={11} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: "rgba(0,0,0,0.04)" }}
                                        contentStyle={{
                                            background: "#fff",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: 8,
                                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                            fontSize: 12,
                                        }}
                                    />
                                    <Bar dataKey="count" name="Clicks" radius={[4, 4, 0, 0]}>
                                        {activePlatforms.map((p: PlatformData) => (
                                            <Cell key={p.key} fill={p.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-serif font-bold text-gray-900 mb-5">Share of channels</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={activePlatforms.filter((p: PlatformData) => (p.count || 0) > 0)}
                                        dataKey="count"
                                        nameKey="label"
                                        innerRadius={55}
                                        outerRadius={95}
                                        paddingAngle={3}
                                    >
                                        {activePlatforms
                                            .filter((p: PlatformData) => (p.count || 0) > 0)
                                            .map((p: PlatformData) => (
                                                <Cell key={p.key} fill={p.color} stroke="#fff" />
                                            ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip
                                        contentStyle={{
                                            background: "#fff",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: 8,
                                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                            fontSize: 12,
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>

                {/* Top pages */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
                    <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">Most shared pages</h2>
                    {analyticsData.topPages.length === 0 ? (
                        <p className="text-sm text-gray-400 py-4">No shares in this range yet.</p>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {analyticsData.topPages.map((page: TopPageData) => (
                                <li key={page.url} className="flex items-center justify-between gap-4 py-3 text-sm">
                                    <span className="truncate text-gray-600">{page.url}</span>
                                    <span className="font-bold text-gray-900 tabular-nums">{page.count}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                {/* Recent clicks table */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-12 overflow-x-auto">
                    <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">Recent share clicks</h2>
                    <table className="w-full min-w-[560px] text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">When</th>
                                <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Channel</th>
                                <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Page</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analyticsData.recent.map((row: RecentShare) => (
                                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-3 pr-4 whitespace-nowrap text-gray-500">
                                        {new Date(row.clicked_at).toLocaleString()}
                                    </td>
                                    <td className="py-3 pr-4 capitalize font-medium text-gray-900">{row.platform_key}</td>
                                    <td className="max-w-[320px] truncate py-3 text-gray-600">{row.page_title || row.page_url}</td>
                                </tr>
                            ))}
                            {analyticsData.recent.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="py-8 text-center text-gray-400">
                                        Nothing recorded yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </NewsAdminLayout>
    );
}

import { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { PlatformData } from "../Dashboard";
import { ArrowLeft, Edit2, Trash2, Plus } from "lucide-react";
import NewsAdminLayout from '@/Layouts/NewsAdminLayout';

export default function Index({ platforms }: { platforms: PlatformData[] }) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const { data, setData, post, put, delete: destroy, reset } = useForm({
        key: "",
        label: "",
        color: "#000000",
        icon: "",
        url_template: "",
        is_active: true,
        order_column: 0
    });

    const editPlatform = (p: PlatformData) => {
        setEditingId(p.id!);
        setData({
            key: p.key,
            label: p.label,
            color: p.color,
            icon: p.icon || "",
            url_template: p.url_template || "",
            is_active: p.is_active ?? true,
            order_column: p.order_column || 0
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        reset();
    };

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs: Record<string, string> = {};
        if (!data.key.trim()) errs.key = "Key is required.";
        else if (!/^[a-z0-9_-]+$/.test(data.key)) errs.key = "Key must be lowercase letters, numbers, hyphens or underscores.";
        if (!data.label.trim()) errs.label = "Label is required.";
        if (!data.color.trim()) errs.color = "Color is required.";
        else if (!/^#[0-9A-Fa-f]{6}$/.test(data.color)) errs.color = "Must be a valid hex color (e.g. #0A66C2).";
        if (!data.url_template.trim()) errs.url_template = "URL template is required.";
        else if (!data.url_template.includes('{url}')) errs.url_template = "Template must contain {url} placeholder.";
        setFormErrors(errs);
        if (Object.keys(errs).length > 0) return;

        if (editingId) {
            put(route("platforms.update", editingId), { onSuccess: () => cancelEdit() });
        } else {
            post(route("platforms.store"), { onSuccess: () => { reset(); setFormErrors({}); } });
        }
    };

    const deletePlatform = (id: number) => {
        if (confirm("Are you sure? This removes the button from the frontend.")) {
            destroy(route("platforms.destroy", id));
        }
    };

    return (
        <NewsAdminLayout title="Manage Channels">
        <main className="max-w-6xl mx-auto px-5 py-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={() => router.get(route('dashboard'))}
                    className="size-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
                >
                    <ArrowLeft className="size-4" />
                </button>
                <div>
                    <p className="text-xs font-semibold text-[#E4002B] uppercase tracking-widest">Settings</p>
                    <h1 className="text-2xl font-serif font-bold text-gray-900">Manage Channels</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-1">
                    <form onSubmit={submit} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4 sticky top-8">
                        <div className="flex items-center gap-2 mb-2">
                            <Plus className="size-4 text-[#E4002B]" />
                            <h2 className="text-base font-serif font-bold text-gray-900">{editingId ? 'Edit Channel' : 'Add Channel'}</h2>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Key</Label>
                            <Input required value={data.key} onChange={e => { setData('key', e.target.value); setFormErrors(prev => ({...prev, key: ''})); }} placeholder="e.g. linkedin" className={`h-10 bg-gray-50 rounded-md ${formErrors.key ? "border-red-400" : "border-gray-300"}`} />
                            {formErrors.key && <p className="text-xs text-[#E4002B] mt-1">{formErrors.key}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Label</Label>
                            <Input required value={data.label} onChange={e => { setData('label', e.target.value); setFormErrors(prev => ({...prev, label: ''})); }} placeholder="e.g. LinkedIn" className={`h-10 bg-gray-50 rounded-md ${formErrors.label ? "border-red-400" : "border-gray-300"}`} />
                            {formErrors.label && <p className="text-xs text-[#E4002B] mt-1">{formErrors.label}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Brand Color</Label>
                            <div className="flex gap-2">
                                <Input type="color" className="w-12 p-1 h-10 border-gray-300 rounded-md" required value={data.color} onChange={e => setData('color', e.target.value)} />
                                <Input required value={data.color} onChange={e => setData('color', e.target.value)} placeholder="#0A66C2" className="h-10 bg-gray-50 border-gray-300 rounded-md" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Icon</Label>
                            <Input value={data.icon} onChange={e => setData('icon', e.target.value)} placeholder="e.g. linkedin" className="h-10 bg-gray-50 border-gray-300 rounded-md" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">URL Template</Label>
                            <Input required value={data.url_template} onChange={e => { setData('url_template', e.target.value); setFormErrors(prev => ({...prev, url_template: ''})); }} placeholder="https://example.com/share?url={url}" className={`h-10 bg-gray-50 rounded-md ${formErrors.url_template ? "border-red-400" : "border-gray-300"}`} />
                            {formErrors.url_template && <p className="text-xs text-[#E4002B] mt-1">{formErrors.url_template}</p>}
                            <p className="text-xs text-gray-400 mt-1">Use <code className="bg-gray-100 px-1 rounded text-gray-600">{'{url}'}</code> and <code className="bg-gray-100 px-1 rounded text-gray-600">{'{title}'}</code> as placeholders.</p>
                        </div>

                        <div className="pt-2 flex gap-2">
                            <Button type="submit" className="flex-1 h-10 bg-[#E4002B] hover:bg-[#c90025] text-white rounded-md">
                                {editingId ? 'Update' : 'Add Channel'}
                            </Button>
                            {editingId && (
                                <Button type="button" variant="outline" className="h-10 border-gray-300 rounded-md" onClick={cancelEdit}>Cancel</Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/50">
                                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Channel</th>
                                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Key</th>
                                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">URL Template</th>
                                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {platforms.map(p => (
                                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-5 py-3.5 flex items-center gap-2.5">
                                            <span className="size-3 rounded-full shadow-sm" style={{backgroundColor: p.color}} />
                                            <span className="font-medium text-gray-900">{p.label}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{p.key}</code>
                                        </td>
                                        <td className="px-5 py-3.5 text-gray-500 truncate max-w-[220px] text-xs">{p.url_template}</td>
                                        <td className="px-5 py-3.5 text-right">
                                            <button onClick={() => editPlatform(p)} className="inline-flex size-7 items-center justify-center rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                                                <Edit2 className="size-3.5" />
                                            </button>
                                            <button onClick={() => deletePlatform(p.id!)} className="inline-flex size-7 items-center justify-center rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors ml-1">
                                                <Trash2 className="size-3.5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {platforms.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-5 py-12 text-center text-gray-400">No channels configured yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
        </NewsAdminLayout>
    );
}

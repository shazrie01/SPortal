import { FormEventHandler, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

    const onSubmit: FormEventHandler = (e: any) => {
        e.preventDefault();
        const errs: Record<string, string> = {};
        if (!data.name.trim()) errs.name = "Name is required.";
        if (!data.email.trim()) errs.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Please enter a valid email.";
        if (!data.password) errs.password = "Password is required.";
        else if (data.password.length < 8) errs.password = "Password must be at least 8 characters.";
        if (data.password !== data.password_confirmation) errs.password_confirmation = "Passwords do not match.";
        setClientErrors(errs);
        if (Object.keys(errs).length > 0) return;
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex">
            <Head title="Create account | SPortal" />

            {/* Left — branding panel */}
            <div className="hidden lg:flex lg:w-[45%] bg-gray-900 text-white flex-col justify-between p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                <div className="relative z-10">
                    <Link href="/" className="flex items-baseline gap-0.5">
                        <span className="text-4xl font-serif font-bold tracking-tight">SPortal</span>
                        <span className="text-4xl font-serif font-bold text-[#E4002B]">.</span>
                    </Link>
                    <p className="mt-2 text-sm text-gray-400 tracking-wide uppercase">Share Analytics Platform</p>
                </div>
                <div className="relative z-10">
                    <blockquote className="text-lg font-serif italic leading-relaxed text-gray-300">
                        "Track every share, understand every click — real-time social analytics built for modern newsrooms."
                    </blockquote>
                    <p className="mt-4 text-sm text-gray-500">— SPortal Analytics Dashboard</p>
                </div>
            </div>

            {/* Right — form */}
            <div className="flex-1 flex items-center justify-center bg-[#f8f7f4] px-6">
                <div className="w-full max-w-sm">
                    {/* Mobile logo */}
                    <div className="lg:hidden mb-10">
                        <Link href="/" className="flex items-baseline gap-0.5">
                            <span className="text-3xl font-serif font-bold text-gray-900 tracking-tight">SPortal</span>
                            <span className="text-3xl font-serif font-bold text-[#E4002B]">.</span>
                        </Link>
                    </div>

                    <h1 className="text-2xl font-serif font-bold text-gray-900">
                        Create your account
                    </h1>
                    <p className="mt-1.5 text-sm text-gray-500">
                        Set up a new administrator for the dashboard.
                    </p>

                    <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
                        <div className="space-y-1.5">
                            <Label htmlFor="name" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Full name</Label>
                            <Input
                                id="name"
                                type="text"
                                autoComplete="name"
                                value={data.name}
                                onChange={(e: any) => { setData('name', e.target.value); setClientErrors(prev => ({...prev, name: ''})); }}
                                className="h-11 bg-white border-gray-300 rounded-md focus-visible:ring-2 focus-visible:ring-[#E4002B]/20 focus-visible:border-[#E4002B]"
                            />
                            {(clientErrors.name || errors.name) && <p className="text-xs text-[#E4002B] mt-1">{clientErrors.name || errors.name}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={data.email}
                                onChange={(e: any) => { setData('email', e.target.value); setClientErrors(prev => ({...prev, email: ''})); }}
                                className="h-11 bg-white border-gray-300 rounded-md focus-visible:ring-2 focus-visible:ring-[#E4002B]/20 focus-visible:border-[#E4002B]"
                            />
                            {(clientErrors.email || errors.email) && <p className="text-xs text-[#E4002B] mt-1">{clientErrors.email || errors.email}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="password" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e: any) => { setData('password', e.target.value); setClientErrors(prev => ({...prev, password: ''})); }}
                                className="h-11 bg-white border-gray-300 rounded-md focus-visible:ring-2 focus-visible:ring-[#E4002B]/20 focus-visible:border-[#E4002B]"
                            />
                            {(clientErrors.password || errors.password) && <p className="text-xs text-[#E4002B] mt-1">{clientErrors.password || errors.password}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="password_confirmation" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e: any) => { setData('password_confirmation', e.target.value); setClientErrors(prev => ({...prev, password_confirmation: ''})); }}
                                className="h-11 bg-white border-gray-300 rounded-md focus-visible:ring-2 focus-visible:ring-[#E4002B]/20 focus-visible:border-[#E4002B]"
                            />
                            {clientErrors.password_confirmation && <p className="text-xs text-[#E4002B] mt-1">{clientErrors.password_confirmation}</p>}
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-[#E4002B] hover:bg-[#c90025] text-white font-semibold rounded-md transition-colors"
                            disabled={processing}
                        >
                            {processing && <Loader2 className="size-4 animate-spin mr-2" />}
                            Create account
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-[#E4002B] hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

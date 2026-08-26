import { useState } from "react";
import { Mail, MessageCircle, Send, Share2 } from "lucide-react";
import axios from "axios";
import { PlatformData } from "@/Pages/Dashboard";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.75l-5.02-6.56L4.9 22H1.64l8.02-9.17L1.5 2h6.92l4.54 6.02L18.244 2Zm-1.14 18h1.79L7.02 3.9H5.1L17.104 20Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

const iconFor: Record<string, React.FC<{className?: string}>> = {
  facebook: FacebookIcon,
  x: XIcon,
  twitter: XIcon,
  whatsapp: MessageCircle,
  telegram: Send,
  mail: Mail,
  linkedin: LinkedinIcon
};

function buildShareUrl(platform: PlatformData, url: string, title: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  let template = platform.url_template || url;
  
  // Special exception for Email mailto scheme that uses body
  if (platform.key === 'email') {
      template = template.replace('{title}', title).replace('{url}', url);
  } else {
      template = template.replace('{url}', u).replace('{title}', t);
  }
  
  return template;
}

export function ShareBar({ title, platforms = [] }: { title: string, platforms: PlatformData[] }) {
  const [busy, setBusy] = useState<string | null>(null);

  async function handleShare(platform: PlatformData) {
    const pageUrl = window.location.href;
    const shareUrl = buildShareUrl(platform, pageUrl, title);
    setBusy(platform.key);

    if (platform.key === "email") {
      window.location.href = shareUrl;
    } else {
      window.open(shareUrl, "_blank", "noopener,noreferrer,width=680,height=640");
    }

    try {
      await axios.post('/api/shares', {
          platform: platform.key,
          url: pageUrl
      });
    } catch {
      console.error("Could not record share click");
    } finally {
      setBusy(null);
    }
  }

  if (!platforms.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((platform) => {
        const Icon = iconFor[platform.icon || ''] ?? Share2;
        return (
          <button
            key={platform.key}
            type="button"
            disabled={busy === platform.key}
            onClick={() => handleShare(platform)}
            aria-label={`Share on ${platform.label}`}
            className="flex size-7 sm:size-8 items-center justify-center rounded-full text-white transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: platform.color }}
          >
            <Icon className="size-3.5 sm:size-4" />
          </button>
        );
      })}
    </div>
  );
}

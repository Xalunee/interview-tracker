import { env } from '@/shared/config/env';

function extractDomain(website: string): string | null {
  try {
    const url = website.startsWith('http') ? website : `https://${website}`;
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

export async function fetchLogo(website: string): Promise<string | null> {
  const domain = extractDomain(website);
  if (!domain) return null;

  const logoUrl = `${env.CLEARBIT_LOGO_API}/${domain}`;

  try {
    const res = await fetch(logoUrl, { method: 'HEAD' });
    return res.ok ? logoUrl : null;
  } catch {
    return null;
  }
}

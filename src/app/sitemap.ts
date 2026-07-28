import { MetadataRoute } from 'next';
import versionsData from '@/data/versionCatalog';
import shadersData from '@/data/shaders.json';
import { guides } from '@/data/guides';
import { siteConfig } from '@/data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: siteConfig.lastVerified,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/shaders`,
            lastModified: siteConfig.lastVerified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/calculator`,
            lastModified: siteConfig.lastVerified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: siteConfig.lastVerified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides`,
            lastModified: siteConfig.lastVerified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/hardware`,
            lastModified: siteConfig.lastVerified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/minecraft-render-distance-mod`,
            lastModified: siteConfig.lastVerified,
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: siteConfig.lastVerified,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: siteConfig.lastVerified,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: siteConfig.lastVerified,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: siteConfig.lastVerified,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];

    const dynamicRoutes: MetadataRoute.Sitemap = versionsData.map((v) => ({
        url: `${baseUrl}/install/${v.mcVersion.replace(/\./g, '-')}`,
        lastModified: siteConfig.lastVerified,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));
    const loaderRoutes = versionsData.flatMap((v) => ['fabric', 'neoforge'].map((loader) => ({
        url: `${baseUrl}/install/${v.mcVersion.replace(/\./g, '-')}/${loader}`,
        lastModified: siteConfig.lastVerified,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    })));

    const shaderRoutes = shadersData.map((shader) => ({
        url: `${baseUrl}/shaders/${shader.slug}`,
        lastModified: shader.lastTested,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));
    const guideRoutes = guides.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: guide.updated,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));
    return [...staticRoutes, ...dynamicRoutes, ...loaderRoutes, ...shaderRoutes, ...guideRoutes];
}

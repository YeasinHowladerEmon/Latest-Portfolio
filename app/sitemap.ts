import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://emon-portfolio.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        // We omit /dashboard and /api routes from the sitemap 
        // to keep search engines focused on the public pages.
    ];
}

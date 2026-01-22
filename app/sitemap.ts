import { MetadataRoute } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bconclub.com';
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static pages
  sitemapEntries.push(
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/status`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    }
  );

  try {
    const supabase = await createServerSupabaseClient();

    // Fetch published work items
    const { data: workItems, error: workError } = await supabase
      .from('work_items')
      .select('id, updated_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });

    if (!workError && workItems) {
      workItems.forEach((item) => {
        sitemapEntries.push({
          url: `${baseUrl}/work/${item.id}`,
          lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    }

    // Fetch published portfolio items
    const { data: portfolioItems, error: portfolioError } = await supabase
      .from('portfolio_items')
      .select('slug, updated_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });

    if (!portfolioError && portfolioItems) {
      portfolioItems.forEach((item) => {
        sitemapEntries.push({
          url: `${baseUrl}/portfolio/${item.slug}`,
          lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    }
  } catch (error) {
    // Log error but don't fail sitemap generation
    console.error('Error fetching dynamic content for sitemap:', error);
  }

  return sitemapEntries;
}



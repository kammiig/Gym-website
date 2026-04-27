import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogPosts";
import { navLinks, siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const navRoutes = navLinks.map((link) => ({
    url: `${siteConfig.url}${link.href === "/" ? "" : link.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.8
  }));

  const newsRoutes = [
    {
      url: `${siteConfig.url}/news`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6
    },
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/news/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.5
    }))
  ];

  return [...navRoutes, ...newsRoutes];
}

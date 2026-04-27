import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export function createPageMetadata({ title, description, path = "" }: MetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description
    }
  };
}

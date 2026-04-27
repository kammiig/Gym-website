import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { blogPosts } from "@/data/blogPosts";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

type PostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug
  }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    return createPageMetadata({
      title: "News",
      description: "Hosting, domains, security, and website launch updates from Planetic Solutions.",
      path: "/news"
    });
  }

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.slug}`
  });
}

export default function NewsPostPage({ params }: PostPageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="section article-section">
        <div className="container article-container">
          <span className="eyebrow">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="article-meta">
            {new Intl.DateTimeFormat("en-GB", {
              dateStyle: "long"
            }).format(new Date(post.publishedAt))}{" "}
            - {post.readTime}
          </p>
          <p className="article-lead">{post.excerpt}</p>
          <div className="article-body">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
      <CTASection
        title="Need Help With Your Website Launch?"
        description={`Planetic Solutions can help with hosting, domains, WHMCS support, and the complete website package from ${siteConfig.name}.`}
        primaryLabel="Open Client Area"
        secondaryLabel="Contact Us"
      />
    </>
  );
}

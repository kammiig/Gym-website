import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import { Icon } from "./Icon";

type BlogListProps = {
  limit?: number;
};

export function BlogList({ limit }: BlogListProps) {
  const posts = limit ? blogPosts.slice(0, limit) : blogPosts;

  return (
    <div className="blog-grid">
      {posts.map((post) => (
        <Link className="blog-card" href={`/news/${post.slug}`} key={post.slug}>
          <span className="blog-meta">
            {post.category} - {post.readTime}
          </span>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <span className="text-link">
            Read article <Icon name="ArrowRight" size={16} />
          </span>
        </Link>
      ))}
    </div>
  );
}

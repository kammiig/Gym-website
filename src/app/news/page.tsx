import { BlogList } from "@/components/BlogList";
import { PageHero } from "@/components/PageHero";
import { pages } from "@/data/pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pages.news.seoTitle,
  description: pages.news.metaDescription,
  path: "/news"
});

export default function NewsPage() {
  const hero = pages.news.hero;

  return (
    <>
      <PageHero {...hero} />
      <section className="section">
        <div className="container">
          <BlogList />
        </div>
      </section>
    </>
  );
}

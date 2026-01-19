import { Suspense } from 'react';
import { getPosts } from '@/lib/strapi/queries';
import { extractStrapiData } from '@/lib/strapi/utils';
import { Skeleton } from '@/components/ui/skeleton';
import PostCard from '@/components/modules/blog/post-card';
import type { Post } from '@/types/strapi';

export const revalidate = 1800;

export const metadata = {
  title: 'Blog',
  description: 'Fique por dentro das novidades e dicas do shopping',
};

async function BlogContent() {
  const postsResponse = await getPosts();
  const posts = extractStrapiData<Post[]>(postsResponse);

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhum post encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-video rounded-lg" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-muted-foreground mt-2">
            Fique por dentro das novidades, dicas e tendências
          </p>
        </div>
      </section>

      <section className="container py-12">
        <Suspense fallback={<LoadingSkeleton />}>
          <BlogContent />
        </Suspense>
      </section>
    </main>
  );
}

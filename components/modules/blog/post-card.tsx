import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getStrapiMedia } from '@/lib/strapi/utils';
import { formatDate } from '@/lib/utils/format';
import type { Post } from '@/types/strapi';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = getStrapiMedia(post.imagemDestaque);

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group hover:shadow-lg transition-shadow h-full overflow-hidden">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
          {post.destaque && (
            <Badge className="absolute top-2 right-2">Destaque</Badge>
          )}
        </div>

        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            {post.categoria && (
              <Badge variant="outline">{post.categoria.nome}</Badge>
            )}
            <span>•</span>
            <time dateTime={post.dataPublicacao}>
              {formatDate(post.dataPublicacao)}
            </time>
          </div>

          <h3 className="font-semibold text-xl group-hover:text-primary transition-colors line-clamp-2">
            {post.titulo}
          </h3>
        </CardHeader>

        <CardContent>
          {post.autor && (
            <p className="text-sm text-muted-foreground">Por {post.autor}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

/**
 * tRPC Router for Google Indexing API
 * Allows automatic indexing of new articles
 */

import { publicProcedure } from './_core/trpc';
import { z } from 'zod';
import { indexUrl, indexUrls, generateBlogUrl } from './indexing';

export const indexingRouter = {
  /**
   * Index a single URL
   * Usage: trpc.indexing.indexUrl.mutate({ url: 'https://boostnow.pl/blog/new-article' })
   */
  indexUrl: publicProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input }: any) => {
      const success = await indexUrl(input.url);
      return { success, url: input.url };
    }),

  /**
   * Index a blog article by slug
   * Usage: trpc.indexing.indexArticle.mutate({ slug: 'new-article' })
   */
  indexArticle: publicProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ input }: any) => {
      const url = generateBlogUrl(input.slug);
      const success = await indexUrl(url);
      return { success, url, slug: input.slug };
    }),

  /**
   * Bulk index multiple URLs
   * Usage: trpc.indexing.bulkIndex.mutate({ urls: ['url1', 'url2', ...] })
   */
  bulkIndex: publicProcedure
    .input(z.object({ urls: z.array(z.string().url()) }))
    .mutation(async ({ input }: any) => {
      const results = await indexUrls(input.urls);
      return {
        ...results,
        total: input.urls.length,
        successRate: ((results.success / input.urls.length) * 100).toFixed(1),
      };
    }),

  /**
   * Bulk index multiple articles by slug
   * Usage: trpc.indexing.bulkIndexArticles.mutate({ slugs: ['article-1', 'article-2', ...] })
   */
  bulkIndexArticles: publicProcedure
    .input(z.object({ slugs: z.array(z.string()) }))
    .mutation(async ({ input }: any) => {
      const urls = input.slugs.map((slug: string) => generateBlogUrl(slug));
      const results = await indexUrls(urls);
      return {
        ...results,
        total: input.slugs.length,
        successRate: ((results.success / input.slugs.length) * 100).toFixed(1),
      };
    }),
};

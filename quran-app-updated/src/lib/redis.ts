import { Redis } from "@upstash/redis";

// Vercel's Upstash Redis Marketplace integration may name the env vars
// either UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN depending
// on how it was connected — support both so setup "just works".
const url =
  process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

export const redisConfigured = Boolean(url && token);

export const redis = redisConfigured
  ? new Redis({ url: url!, token: token! })
  : null;

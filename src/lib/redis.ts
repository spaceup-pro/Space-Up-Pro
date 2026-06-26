// Redis Context Caching Utilities
// Debounce form inputs and cache UI state to Redis

import { generateIdempotencyKey } from "./utils";

interface WorkspaceContext {
  userId: string;
  taskId: string;
  taskType: string;
  formData: Record<string, unknown>;
  draftData: Record<string, unknown>;
  timestamp: number;
}

interface RedisConfig {
  host: string;
  port: number;
  password?: string;
}

// Mock Redis client for demonstration
// In production, use ioredis or @upstash/redis
class RedisClient {
  private cache: Map<string, { value: string; expiry: number }> = new Map();

  async get(key: string): Promise<string | null> {
    const item = this.cache.get(key);
    if (!item) return null;
    if (item.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }

  async set(key: string, value: string, mode?: string, ttlSeconds?: number): Promise<void> {
    this.cache.set(key, {
      value,
      expiry: ttlSeconds ? Date.now() + ttlSeconds * 1000 : Date.now() + 3600000,
    });
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async hset(key: string, field: string, value: string): Promise<void> {
    const existing = await this.get(key);
    const data = existing ? JSON.parse(existing) : {};
    data[field] = value;
    await this.set(key, JSON.stringify(data));
  }

  async hget(key: string, field: string): Promise<string | null> {
    const existing = await this.get(key);
    if (!existing) return null;
    const data = JSON.parse(existing);
    return data[field] || null;
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    const existing = await this.get(key);
    return existing ? JSON.parse(existing) : {};
  }
}

// Singleton Redis instance
export const redis = new RedisClient();

// Workspace context key format: workspace:context:user_id:task_id
export function getWorkspaceContextKey(userId: string, taskId: string): string {
  return `workspace:context:${userId}:${taskId}`;
}

// Save workspace context to Redis
export async function saveWorkspaceContext(context: WorkspaceContext): Promise<void> {
  const key = getWorkspaceContextKey(context.userId, context.taskId);
  await redis.set(key, JSON.stringify(context), "EX", 3600); // 1 hour TTL
}

// Load workspace context from Redis
export async function loadWorkspaceContext(
  userId: string,
  taskId: string
): Promise<WorkspaceContext | null> {
  const key = getWorkspaceContextKey(userId, taskId);
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

// Delete workspace context from Redis
export async function clearWorkspaceContext(userId: string, taskId: string): Promise<void> {
  const key = getWorkspaceContextKey(userId, taskId);
  await redis.del(key);
}

// Debounced save function for form inputs
let debounceTimers: Map<string, NodeJS.Timeout> = new Map();

export function debouncedSaveContext(
  context: WorkspaceContext,
  delayMs: number = 300
): void {
  const key = `${context.userId}:${context.taskId}`;

  // Clear existing timer for this context
  const existingTimer = debounceTimers.get(key);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  // Set new debounce timer
  const timer = setTimeout(async () => {
    await saveWorkspaceContext(context);
    debounceTimers.delete(key);
  }, delayMs);

  debounceTimers.set(key, timer);
}

// Generate task ID for workspace
export function generateTaskId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Idempotency key utilities
export function createIdempotencyKey(sessionId: string): string {
  return `${sessionId}:${generateIdempotencyKey()}`;
}

// Check if an action was already processed
const processedActions: Map<string, boolean> = new Map();

export async function checkIdempotency(key: string): Promise<boolean> {
  if (processedActions.has(key)) {
    return true; // Already processed
  }
  processedActions.set(key, true);

  // Auto-cleanup after 1 hour
  setTimeout(() => {
    processedActions.delete(key);
  }, 3600000);

  return false;
}
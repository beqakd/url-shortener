import { Job, Queue } from 'bullmq';

export type QueuePayload = {
  id: string;
};

export class UrlListenerQueue extends Queue<QueuePayload> {}
export class UrlListenerJob extends Job<QueuePayload> {}
export const URL_QUEUE = 'cleanExpiredUrlsQueue';

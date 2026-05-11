import { Injectable } from '@angular/core';

interface CacheItem<T> {
  key: string;
  value: T;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService<T> {

  constructor() { }

  cache = new Map<string, T>();

  updateCache(payload: CacheItem<T>) {
    this.cache.set(payload.key, payload.value);
  }

  getCache(key: string) {
    return this.cache.get(key);
  }
}

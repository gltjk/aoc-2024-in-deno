export class MapEx<K, V> extends Map<K, V> {
  constructor(private defaultValue: V, iterable?: Iterable<[K, V]>) {
    super(iterable);
  }

  getEx(key: K) {
    if (!this.has(key)) {
      this.set(key, structuredClone(this.defaultValue));
    }
    return super.get(key) as V;
  }

  update(key: K, fn: (value: V) => V) {
    if (!this.has(key)) {
      this.set(key, structuredClone(this.defaultValue));
    }
    super.set(key, fn(this.get(key)!));
  }
}

export class MapEx<K, V> extends Map<K, V> {
  constructor(private defaultValue: V, iterable?: Iterable<[K, V]>) {
    super(iterable);
  }

  update(key: K, fn: (value: V) => V) {
    if (!this.has(key)) {
      this.set(key, this.defaultValue);
    }
    super.set(key, fn(this.get(key)!));
  }
}

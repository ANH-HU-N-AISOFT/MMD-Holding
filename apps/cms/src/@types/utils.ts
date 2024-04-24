type Primitive = string | number | boolean | bigint | symbol | undefined | null;
type BuiltIn = Primitive | Function | Date | Error | RegExp;

export type ToRequiredKeys<T, RK extends keyof T> = Omit<T, RK> & Required<Pick<T, RK>>;

/** Like NonNullable but recursive */
export type DeepNonNullable<T> = T extends BuiltIn
  ? NonNullable<T>
  : T extends Map<infer K, infer V>
    ? Map<DeepNonNullable<K>, DeepNonNullable<V>>
    : T extends ReadonlyMap<infer K, infer V>
      ? ReadonlyMap<DeepNonNullable<K>, DeepNonNullable<V>>
      : T extends WeakMap<infer K, infer V>
        ? WeakMap<DeepNonNullable<K>, DeepNonNullable<V>>
        : T extends Set<infer U>
          ? Set<DeepNonNullable<U>>
          : T extends ReadonlySet<infer U>
            ? ReadonlySet<DeepNonNullable<U>>
            : T extends WeakSet<infer U>
              ? WeakSet<DeepNonNullable<U>>
              : T extends Promise<infer U>
                ? Promise<DeepNonNullable<U>>
                : T extends {}
                  ? {
                      [K in keyof T]: DeepNonNullable<T[K]>;
                    }
                  : NonNullable<T>;

export type DeepRequired<T> = T extends BuiltIn
  ? NonNullable<T>
  : T extends Map<infer K, infer V>
    ? Map<DeepRequired<K>, DeepRequired<V>>
    : T extends ReadonlyMap<infer K, infer V>
      ? ReadonlyMap<DeepRequired<K>, DeepRequired<V>>
      : T extends WeakMap<infer K, infer V>
        ? WeakMap<DeepRequired<K>, DeepRequired<V>>
        : T extends Set<infer U>
          ? Set<DeepRequired<U>>
          : T extends ReadonlySet<infer U>
            ? ReadonlySet<DeepRequired<U>>
            : T extends WeakSet<infer U>
              ? WeakSet<DeepRequired<U>>
              : T extends Promise<infer U>
                ? Promise<DeepRequired<U>>
                : T extends {}
                  ? {
                      [K in keyof T]-?: DeepRequired<T[K]>;
                    }
                  : NonNullable<T>;

export type IsRequired<T, K extends keyof T> = Pick<T, K> extends Record<K, T[K]> ? true : false;
export type ToOptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type GetOptional<T> = Omit<T, keyof GetRequired<T>>;
export type GetRequired<T> = {
  [K in keyof T as IsRequired<T, K> extends true ? K : never]: T[K];
};

export type PickKeysByValue<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
export type PickProperties<T, P> = Pick<T, PickKeysByValue<T, P>>;
export type GetKeyWithTypes<T, P> = Exclude<keyof PickProperties<T, P>, undefined>;

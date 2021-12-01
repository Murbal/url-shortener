declare const tag: unique symbol;

export type Opaque<T> = T & { [tag]: never };
export type Maybe<T> = T | undefined | null;

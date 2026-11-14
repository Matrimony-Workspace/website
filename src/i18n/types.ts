import type { Content } from "./content/en";

/** Deep-partial shape for translations: only strings need to be provided. */
type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export type Overrides = DeepPartial<Content>;
export type { Content };

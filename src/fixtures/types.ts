// #region

import { BaseEntity } from 'typeorm'

// types for removing read only keys
type IfEquals<X, Y, A=X, B=never> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? A : B;
type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T];
export type OmitReadOnly<T> = Pick<T, WritableKeys<T>>;
// types for making nullable keys partials
type NullableKeys<T> = {
  [K in keyof T]: null extends T[K] ? K : never;
}[keyof T];
type PickNullable<T> = Pick<T, NullableKeys<T>>;
export type PartialNullable<T> = Partial<PickNullable<T>> & Omit<T, keyof PickNullable<T>>
/** Generic that makes nullable keys partial and omits readonly keys */

// InferModelType type

type FunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function? K : never
}[keyof T];

type EntityPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends BaseEntity ? K : never
}[keyof T];

export type OmitFunctions<Class> = Omit<
  Class,
  EntityPropertyNames<Class> | FunctionPropertyNames<Class>
>

export type Fixture<T> = OmitFunctions<T>;

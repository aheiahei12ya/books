// Internal function to check whether `key` is an own property name of `obj`.
export default function has(obj: any, key: string) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key)
}

import deepGet from './.internal/deepGet'
import isArray from './isArray'
import isUndefined from './isUndefined'

export default function get(
  object: object,
  path: string[] | string,
  defaultValue: any
) {
  const value = deepGet(object, isArray(path) ? path : [path])
  return isUndefined(value) ? defaultValue : value
}

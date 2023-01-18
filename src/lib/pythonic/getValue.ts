import isUndefined from './isUndefined'

export default function get(path: any, defaultValue: any) {
  return isUndefined(path) ? defaultValue : path
}

export default function deepGet(obj: any, path: any) {
  for (let i = 0; i < path.length; ++i) {
    if (obj == null) return void 0
    obj = obj[path[i]]
  }
  return path.length ? obj : void 0
}

// Internal function for creating a `toString`-based type tester.
export default function tagTester(name: string) {
  const tag = '[object ' + name + ']'
  return function (obj: any) {
    return Object.prototype.toString.call(obj) === tag
  }
}

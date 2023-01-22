const getLength = () => {
  return function (obj: any) {
    return obj == null ? void 0 : obj['length']
  }
}
export default getLength()

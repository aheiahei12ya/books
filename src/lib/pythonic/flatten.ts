import getLength from './.internal/getLength'
import isArguments from './isArguments'
import isArray from './isArray'
import isArrayLike from './isArrayLike'

// Internal implementation of a recursive `flatten` function.
export default function flatten(input: any[], depth?: number, strict?: boolean, output?: any[]): any[] {
  output = output || []
  if (!depth && depth !== 0) {
    depth = Infinity
  } else if (depth <= 0) {
    return output.concat(input)
  }
  let idx = output.length
  for (let i = 0, length = getLength(input); i < length; i++) {
    const value = input[i]
    if (isArrayLike(value) && (isArray(value) || isArguments(value))) {
      // Flatten current level of array or arguments object.
      if (depth > 1) {
        flatten(value, depth - 1, strict, output)
        idx = output.length
      } else {
        let j = 0,
          len = value.length
        while (j < len) output[idx++] = value[j++]
      }
    } else if (!strict) {
      output[idx++] = value
    }
  }
  return output
}

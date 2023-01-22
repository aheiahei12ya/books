import has from './.internal/has'
import tagTester from './.internal/tagTester'

let isArguments = tagTester('Arguments')

// Define a fallback version of the method in browsers (ahem, IE < 9), where
// there isn't any inspectable "Arguments" type.
void (function () {
  if (!isArguments(arguments)) {
    isArguments = function (obj) {
      return has(obj, 'callee')
    }
  }
})()

export default isArguments

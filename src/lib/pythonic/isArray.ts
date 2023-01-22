import tagTester from './.internal/tagTester'

// Is a given value an array?
// Delegates to ECMA5's native `Array.isArray`.
export default Array.isArray || tagTester('Array')

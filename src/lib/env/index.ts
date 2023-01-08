const isFunction = (obj: object) => {
  return typeof obj == 'function'
}

const isObject = (obj: object) => {
  var type = typeof obj
  return type === 'function' || (type === 'object' && !!obj)
}

const hasWindowObject = () => {
  return typeof window !== 'undefined' && window.document
}

const disableReactDevTools = () => {
  if (hasWindowObject()) {
    // Ensure the React Developer Tools global hook exists
    // @ts-ignore
    if (!isObject(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
      return
    }

    // Replace all global hook properties with a no-op function or a null value
    // @ts-ignore
    for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      if (prop === 'renderers') {
        // prevents console error when dev tools try to iterate of renderers
        // @ts-ignore
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = new Map()
        continue
      }
      // @ts-ignore
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = isFunction(
        // @ts-ignore
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop]
      )
        ? Function.prototype
        : null
    }
  }
}

export { disableReactDevTools }

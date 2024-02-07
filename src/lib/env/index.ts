const isFunction = (obj: object) => {
  return typeof obj == 'function'
}

const isObject = (obj: object) => {
  const type = typeof obj
  return type === 'function' || (type === 'object' && !!obj)
}

const hasWindowObject = () => {
  return typeof window !== 'undefined' && window.document
}

const disableReactDevTools = () => {
  if (hasWindowObject()) {
    // Ensure the React Developer Tools global hook exists
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (!isObject(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
      return
    }

    // Replace all global hook properties with a no-op function or a null value
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      if (prop === 'renderers') {
        // prevents console error when dev tools try to iterate of renderers
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = new Map()
        continue
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = isFunction(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop]
      )
        ? Function.prototype
        : null
    }
  }
}

export { disableReactDevTools }

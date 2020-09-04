function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((aFunc, bFunc) => (...args) => aFunc(bFunc(...args)))
}

export default compose

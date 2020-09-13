function promiseChain (asyncFnArray) {
  return asyncFnArray.reduce((prev, curt) => {
    return prev.then((result) => curt(result))
  }, Promise.resolve())
}

export default promiseChain

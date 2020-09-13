function functionChain (fnList: Function[]) {
  return fnList.reduce((prev, curt) => {
    return curt(prev)
  }, null)
}

export default functionChain

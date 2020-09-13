function concat<T> (arrayList: T[][]): T[] {
  return arrayList.reduce((prev, curt) => {
    return prev.concat(curt)
  }, [])
}

export default concat

type TEqualCallback<T> = (item: T) => boolean

function findIndex<T>(array: T[], isEqual: TEqualCallback<T>) {
  return array.reduce((prev: number, curt, index) => {
    if (prev === -1 && isEqual(curt)) {
      return index
    } else {
      return prev
    }
  }, -1)
}

export default findIndex

type TComparator<T> = (a: T, b: T) => boolean

function max<T>(array: T[], largerThan?: TComparator<T>): T {
  return array.reduce((prev, curt) => {
    return largerThan(prev, curt) ? prev : curt
  })
}

export default max

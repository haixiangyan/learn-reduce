type TOkCallback<T> = (item: T) => boolean

function filter<T>(array: T[], isOk: TOkCallback<T>): T[] {
  return array.reduce((prev: T[], curt: T) => {
    if (isOk(curt)) {
      prev.push(curt)
    }

    return prev
  }, [])
}

export default filter

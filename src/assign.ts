function assign<T>(origin: T, ...partial: Partial<T>[]): T {
  const combinedPartial = partial.reduce((prev, curt) => {
    return { ...prev, ...curt }
  })

  return { ...origin, ...combinedPartial }
}

export default assign

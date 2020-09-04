import findIndex from '../src/findIndex'

type TItem = {
  id: number
  value: number
}

describe('findIndex', () => {
  it('可以找到对应的下标', () => {
    const array: TItem[] = [
      {id: 1, value: 1},
      {id: 2, value: 2},
      {id: 3, value: 3},
    ]

    const result = findIndex<TItem>(array, (item) => item.id === 2)

    expect(result).toEqual(1)
  })
})

import filter from '../src/filter'

type TItem = {
  id: number
}

describe('filter', () => {
  it('可以过滤', () => {
    const array: TItem[] = [{id: 1}, {id: 2}, {id: 3}]

    const result = filter<TItem>(array, (item => item.id !== 1))

    expect(result).toEqual([{id: 2}, {id: 3}])
  })
})

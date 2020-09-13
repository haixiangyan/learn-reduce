import clearAllMocks = jest.clearAllMocks
import promiseChain from '../src/promiseChain'

describe('promiseChain', () => {
  afterEach(() => {
    clearAllMocks()
  })
  it('可以连续执行 promise', async () => {
    jest.spyOn(console, 'log')

    const aFn = async () => 1
    const bFn = async (result: number) => 2 + result
    const cFn = async (result: number) => 3 + result

    const asyncFnArray = [aFn, bFn, cFn]

    const result = await promiseChain(asyncFnArray)

    expect(result).toEqual(6)
  })
})

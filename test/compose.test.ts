import compose from '../src/compose'
import clearAllMocks = jest.clearAllMocks

describe('compose', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log')
  })

  afterEach(() => {
    clearAllMocks()
  })

  it('可以 compose 多个函数', () => {
    const aFunc = () => console.log('aFunc')
    const bFunc = () => console.log('bFunc')
    const cFunc = () => console.log('cFunc')

    compose(aFunc, bFunc, cFunc)()

    expect(console.log).toHaveBeenNthCalledWith(1, 'cFunc')
    expect(console.log).toHaveBeenNthCalledWith(2, 'bFunc')
    expect(console.log).toHaveBeenNthCalledWith(3, 'aFunc')
  })

  it('可以使用 next', () => {
    const aFunc = (next) => () => {
      console.log('before aFunc')
      next()
      console.log('after aFunc')

      return next
    }
    const bFunc = (next) => () => {
      console.log('before bFunc')
      next()
      console.log('after bFunc')

      return next
    }
    const cFunc = (next) => () => {
      console.log('before cFunc')
      next()
      console.log('after cFunc')

      return next
    }

    const next = () => console.log('next')

    const composedFunc = compose(aFunc, bFunc, cFunc)(next)
    composedFunc()

    expect(console.log).toHaveBeenNthCalledWith(1, 'before aFunc')
    expect(console.log).toHaveBeenNthCalledWith(2, 'before bFunc')
    expect(console.log).toHaveBeenNthCalledWith(3, 'before cFunc')
    expect(console.log).toHaveBeenNthCalledWith(4, 'next')
    expect(console.log).toHaveBeenNthCalledWith(5, 'after cFunc')
    expect(console.log).toHaveBeenNthCalledWith(6, 'after bFunc')
    expect(console.log).toHaveBeenNthCalledWith(7, 'after aFunc')
  })
})

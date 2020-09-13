export default function(asyncFnArray) {
  return asyncFnArray.reduce((prev, curt) => {
    return prev.then((result) => curt(result))
  }, Promise.resolve())
}

const extractParams = (reqParamsObj) => {
  const keys = Object.keys(reqParamsObj)

  const result = keys.map((key) => {
    const obj = {
      name: key,
      value: reqParamsObj[key],
      type: typeof reqParamsObj[key]
    }
    return obj
  })

  return result
}

module.exports = extractParams
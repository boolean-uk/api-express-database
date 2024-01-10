const determineType = (str) => {
  if (Number(str)) {
    return 'number'
  }
  return 'string'
}

const extractParams = (reqParamsObj) => {
    const keys = Object.keys(reqParamsObj)

    const result = keys.map((key) => {
    const obj = {
      name: key,
      value: reqParamsObj[key],
      type: determineType(reqParamsObj[key])
    }
    return obj
  })

  return result
}

module.exports = extractParams
const ErrorConstructor = require('./ErrorConstructor')

const FieldsErrorHandler = (fields, requiredFields) => {
  const missingFields = []

  requiredFields.forEach((field) => {
    if (String(fields[field]) === 'undefined') {
      missingFields.push(field)
    }
  })

  if (missingFields.length > 0) {
    throw ErrorConstructor(
      `missing fields: ${missingFields.join(', ')}`.trim(),
      400
    )
  }

  return fields
}

module.exports = FieldsErrorHandler

class MissingFieldsError extends Error {
}

class NoDataError extends Error {

}

class InvalidParameterError extends Error {

}

class DataAlreadyExistsError extends Error {

}

module.exports = { MissingFieldsError, NoDataError, InvalidParameterError, DataAlreadyExistsError }
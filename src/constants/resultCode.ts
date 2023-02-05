const invokeSuccess = '1000'
const invokeReject = '1001'
const invokeLimit = '1002'
const isRobot = '1004'
const unauthenticated = '1005'

export { invokeLimit, invokeReject, invokeSuccess, isRobot, unauthenticated }

const loginTimeout = '2000'
const accountError = '2001'
const passwordError = '2002'

export { accountError, loginTimeout, passwordError }

const requestDataIsEmpty = '3001'
const requestDataError = '3002'
const dataDecodeError = '3003'

export { dataDecodeError, requestDataError, requestDataIsEmpty }

const requestTimeout = '4001'
const systemError = '4002'

export { requestTimeout, systemError }

const unknownError = '5000'

export { unknownError }

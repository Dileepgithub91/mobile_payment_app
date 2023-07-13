module.exports.success = async (res, message="Success", data=null, code=200) => {
    const response = {
        success: true,
        message: message,
        code: code
    }

    if (data) {
        response.data = data
    }

    res.status(code).json(response);
}


module.exports.validatationError = async (message="Validation Error", data=null, code=412) => {
    const response = {
        success: false,
        message: message,
        code: code
    }

    if (data) {
        response.data = data
    }

    res.status(code).json(response);
}

module.exports.generalError = async (message="Error", code=412) => {
    const response = {
        success: false,
        message: message
    }

    res.status(code).json(response);
}

module.exports.internalError = async (message="Internal Error", code=500) => {
    const response = {
        success: false,
        message: message
    }

    res.status(code).json(response);
}

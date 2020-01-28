class ResponceMessage {
    OK(status = 200, message = '', data = []) {
        return {
            status: status,
            message: message,
            data: data,
            success: true
        }
    }

    ERROR(error) {
        return {
            status: error.status,
            message: 'Error',
            error: {
                name: error.name,
                message: error.message,
            },
            success: false
        }
    }
}

module.exports = new ResponceMessage();

const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  }

module.exports = {
    successHandler(res, data) {
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            status: 'success',
            data
        }))
        res.end();
    },
    errorHandler(res, message, statusCode = 400) {
        res.writeHead(statusCode, headers);
        res.write(JSON.stringify({
            status: false,
            message,
        }))
        res.end();
    }
}
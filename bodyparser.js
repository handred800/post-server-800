const bodyparser =  function(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', () => {
            try{
                let data = JSON.parse(body)
                resolve(data);
            }
            catch {
                reject(new Error('資料格式錯誤'))
            }
        })
    })
}




module.exports = bodyparser;
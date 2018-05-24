const path = require('path');
const fs = require('fs');

module.exports = function(socket, socketsPath)
{
    for (file of fs.readdirSync(socketsPath)) {
        if (path.extname(file) === '.js') {
            require(path.join(socketsPath, file))(socket);
        }
    }
}
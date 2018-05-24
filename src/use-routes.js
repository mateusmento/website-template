const path = require('path');
const fs = require('fs');

module.exports = function(app, routesPath)
{
    for (file of fs.readdirSync(routesPath)) {
        if (path.extname(file) === '.js') {
            app.use(require(path.join(routesPath, file)));
        }
    }
}

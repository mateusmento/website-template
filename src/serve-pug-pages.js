const pathToRegExp = require('path-to-regexp');

const path = require('path');
const fs = require('fs');

const getRoutes = required('express-get-routes').getRoutes;


module.exports = function(extraLocals)
{
    return function(req, res, next) {
        if (res.headersSent) return next();

        let app = req.app;
        let url = req.url;
        let viewsPath = app.get('views');

        if (isRoute(url, app)) return next();

        let view = getPossibleViewName(viewsPath, url);
        if (!view) return next();

        let locals = {req, res, require, ...extraLocals};
        res.render(view, locals, (err, html) => {
            if (err) {
                res.type('text');
                return res.send(err.toString());
            }
            res.send(html);
        });
    }
}

function isRoute(url, app)
{
    let routes = getRoutes(app);
    return routes.length === 0 ? false : routes.every(route => {
        let res = pathToRegExp(route.path).test(url);
        console.log(res, route.path, url);
        return res;
    });
}

function getPossibleViewName(viewPath, url)
{
    if (url.indexOf('/partials') !== -1) return;
    let filename = path.join(viewPath, url);
    console.log(filename);
    let status = getFileStatus(filename);
    if (status === 'file' && path.extname(url) === '.pug') {
        return removeRoot(removeExtention(url));
    } else if (status === 'directory') {
        status = getFileStatus(path.join(filename, 'index.pug'));
        if (status === 'file') return removeRoot(path.join(url, 'index'));
    }
}


function removeRoot(filePath)
{
    return path.relative('/', filePath);
}

function removeExtention(filePath)
{
    return path.join(path.dirname(filePath), path.basename(filePath, '.pug'))
}


function getFileStatus(filename)
{
    try {
        let stat = fs.statSync(filename);
        if (stat.isFile()) return 'file';
        if (stat.isDirectory()) return 'directory';
    } catch(err) {
    }
}

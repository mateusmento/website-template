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
        if (isRoute(url, app)) return next();

        let view = getPossibleViewName(url);
        if (!view) return next();

        let viewPath = app.get('views');
        let filename = viewPath + '/' + view + '.pug';
        if (!fileExists(filename)) return next();

        let locals = {req, res, ...extraLocals};
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
    return getRoutes(app).every(route => {
        let res = pathToRegExp(route.path).test(url);
        console.log(res, route.path, url);
        return res;
    });
}

function getPossibleViewName(url)
{
    let extname = path.extname(url);
    url = removeExtention(url).replace('/', '');
    if (extname === '.pug') return url;
    else if (extname === '') return url !== '' ? url + '/index' : 'index';
    else return false;
}

function removeExtention(filePath)
{
    return path.join(
        path.dirname(filePath),
        path.basename(filePath, '.pug')
    )
    .replace(/\\/g, '/');
}

function fileExists(filename, fn)
{
    try {
        fs.accessSync(filename)
        return true;
    } catch(err) {
        return false;
    }
}


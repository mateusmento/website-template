"use strict";
/**
 * Extracts the route information out of a express application or router
 **/
function getRoutes(router, prefix) {
    prefix = prefix || '';
    // if an application was passed, then we have to extract the router from it
    if (router['_router']) {
        router = router['_router'];
    }
    let routes = [];
    router['stack'].forEach(function (r) {
        // extract the direct routes out of this router
        if (r.route && r.route.path) {
            let route = JSON.parse(JSON.stringify(r.route));
            delete route['stack'];
            routes.push({
                path: prefix + r.route.path,
                methods: r.route.methods
            });
        }
        // We need some recursion for subrouters
        if (r.name == 'router') {
            // TODO find better way to extract path prefix of subrouters
            let p = r.regexp.toString().replace('/i', '').replace(/\W+/g, "")
            if (p !== '') p = prefix + '/' + p;
            
            let childRoutes = getRoutes(r.handle, p);
            for (let route of childRoutes) {
                routes.push(route);
            }
        }
    });
    return routes;
}
exports.getRoutes = getRoutes;
//# sourceMappingURL=express-get-routes.js.map
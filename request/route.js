/**
 * Created by lvly on 2016/2/19.
 */

function  route(pathname,handle){

    if( typeof handle[pathname] === 'function'){
        return handle[pathname]();
    }

    return 'not found';

}
exports.route=route;
/**
 * Created by lvly on 2016/2/19.
 */

function  route(pathname,handle,request,response){

    if( typeof handle[pathname] === 'function'){

        handle[pathname](request,response);

    }else{

    }

}
exports.route=route;
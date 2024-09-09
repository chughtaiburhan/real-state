export const errorHandler=(statusCode,message)=>{
    const error=new Error();
    err.statusCode = statusCode;
    err.message = message;
    return error;
}
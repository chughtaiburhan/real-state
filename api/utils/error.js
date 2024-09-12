export const errorHandler=(status,message)=>{
    const error=new Error(message);
    err.status = status;
    return error;
}
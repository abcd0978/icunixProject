export function cNull(input:any){
    if(input === undefined || input === null || input === false)
        return 0;
    else
        return input;
}
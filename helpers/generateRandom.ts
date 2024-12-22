export const generateStringRandom=(length:number):string=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = "";


    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
}

export const randomDigit=(length:number):string=>{
    const numbers="0123456789";

    let result=""
    for(let i=0; i<length; i++){
        result+= numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
}
export const errorMessage= (message, statusCode=404 )=>{

    const error = new Error(message)
    error.statusCode = statusCode
    return error
}

// const checking = errorMessage("toyin and whatsapp are 5&6")
// console.log(checking);

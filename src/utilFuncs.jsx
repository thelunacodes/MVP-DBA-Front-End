export function isEmpty(str) {
    // console.log(`Value: ${str} | Type: ${typeof str}`)
    
    if (typeof str === "string") return str.trim() === ""

    if (str === undefined || str === null) return true
    
    throw new TypeError("Argument MUST be a string.")
}

export function isNumber(val) {
    if (typeof val === "number") return !isNaN(val)

    let regex = /^\d+$/;

    if (typeof val === "string" && regex.test(val)) return true

    return false;
}
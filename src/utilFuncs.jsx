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

export function bookKeyToParameter(key) {
    if (typeof key !== "string") return ""
    
    return key.replaceAll("/","|")
}

export function parameterToBookKey(key) {
    if (typeof key !== "string") return ""
    
    return key.replaceAll("|","/")
}

// (External) API cache

const CACHE_TTL_MS = 1000 * 40 * 60; // Cached response will persist for 1 HOUR

export function getCachedResponse(cacheKey){   
    const raw = localStorage.getItem(cacheKey)
    if (!raw) return null;

    const { data, timeStamp } = JSON.parse(raw);

    if (Date.now() - timeStamp > CACHE_TTL_MS) {
        localStorage.removeItem(cacheKey)
        return null;
    }

    return data;
}

export function setCachedResponse(cacheKey, data) {
    // console.log(`Cachekey: ${cacheKey} | Data: ${data}`)
    localStorage.setItem(cacheKey, JSON.stringify({
        data,
        timeStamp: Date.now()
    }));
}


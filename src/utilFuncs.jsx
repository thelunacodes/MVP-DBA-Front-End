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

export function listToStringWithAnd(list) {
    if (!list) return null
    if (list.length === 1) return list[0]

    const items = [...list];

    const last = items.pop();
    return items.join(', ') + ' and ' + last;
}

export function listToString(list) {
    if (!list) return null
    if (list.length === 1) return list[0]

    return list.join(', ');
}

export function bookKeyToParameter(key) {
    if (typeof key !== "string") return ""
    
    return key.replaceAll("/","|")
}

export function parameterToBookKey(key) {
    if (typeof key !== "string") return ""
    
    return key.replaceAll("|","/")
}

export function formatFullName(user) {
    return `${user.name} ${user.surname}`;
}

export function formatDateTime(isoDatetime, includeTime=true) {
    const errStr = "INVALID DATE/TIME FORMAT";

    if (isoDatetime === undefined || isoDatetime === null) return errStr;

    var datetime = new Date(isoDatetime);
    // console.log(datetime);

    var day = String(datetime.getDate()).padStart(2, 0);
    var month = String(datetime.getMonth() + 1).padStart(2, 0);
    var year = datetime.getFullYear();

    if (!includeTime) return `${day}/${month}/${year}`;

    var hour = String(datetime.getHours()).padStart(2, 0);
    var minutes = String(datetime.getMinutes()).padStart(2, 0);
    
    return `${day}/${month}/${year} ${hour}:${minutes}`
}

// (External) API cache
const DEFAULT_CACHE_TTL = 1000 * 40 * 60; // 1 hour

export function getCachedResponse(cacheKey){   
    const raw = localStorage.getItem(cacheKey)
    if (!raw) return null;

    const { data, timeStamp, ttl } = JSON.parse(raw);

    if (Date.now() - timeStamp > ttl) {
        localStorage.removeItem(cacheKey)
        return null;
    }

    return data;
}

export function setCachedResponse(cacheKey, data, cacheTTL=DEFAULT_CACHE_TTL) {
    // console.log(`Cachekey: ${cacheKey} | Data: ${data}`)
    localStorage.setItem(cacheKey, JSON.stringify({
        data,
        timeStamp: Date.now(),
        ttl: cacheTTL
    }));
}


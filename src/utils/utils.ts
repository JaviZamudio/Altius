export const hasIncompleteFields = (object: any): boolean => {
    for (const key in object) {
        if (object[key] === "" || object[key] === undefined || object[key] === null) {
            console.log(`Missing field: ${key}`);
            return true;
        }
    }
    return false;
}
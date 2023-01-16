/**
 * @param {Object} obj
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
    const isNullOrUndefined = obj === null || obj === undefined;
    if (isNullOrUndefined) return true;
    return Object.keys(obj).length === 0;
};

/**
 * @param {number} ms Milissegundos dormindo
 * @returns {Promise} Promessa
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @param {string} s String para capitalizar
 * @returns {string} String
 */
export const capitalize = (s) =>
    s.toLowerCase().replace(/^.{1}/g, s[0].toUpperCase());

/**
 * @param {string} s String para remover acentos
 * @returns {string} String
 */
export const replaceSpecialChars = (str) => {
    str = str.replace(/[ÀÁÂÃÄÅ]/, 'A');
    str = str.replace(/[àáâãäå]/, 'a');
    str = str.replace(/[ÈÉÊË]/, 'E');
    str = str.replace(/[Ç]/, 'C');
    str = str.replace(/[ç]/, 'c');

    return str.replace(/[^a-z0-9]/gi, '');
};

export const initialEffects = {
    pending: false,
    error: undefined,
    success: false
};

export const getNameInitials = (name) => {
    const nameSplit = name.split(' ');
    const firstName = nameSplit[0];
    const lastName = nameSplit[nameSplit.length - 1];

    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}
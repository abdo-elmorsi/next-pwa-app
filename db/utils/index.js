import CryptoJS from 'crypto-js';

export const hashPassword = (password) => {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashedPassword;
};

export const verifyPassword = (inputPassword, hashedPassword) => {
    const hashedInputPassword = CryptoJS.SHA256(inputPassword).toString(CryptoJS.enc.Hex);
    return hashedInputPassword === hashedPassword;
};
const {atom} = require("recoil");

export const IsAuth = atom({
    key: 'isAuth',
    default: false,
});

export const ShowBar = atom({
    key: 'ShowBar',
    default: true,
});
export const Muted = atom({
    key: 'Muted',
    default: true,
});
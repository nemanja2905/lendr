export const Regex = {
    dashCheck: /^[a-zA-Z\s-]*$/,
    startDash: /^-/,
    endDash: /-$/,
    isInteger: /^\d+$/,
    isValidEmail: /^$|^.*@.*\..*$/,
    isValidEmailAlt:
        /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    mobileRegOT: /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
    mobileReg: /^(04|05)[0-9]{8}$/,
    isValidWordHyphen: /^[a-zA-Z0-9\s-]*$/,
    GW_Login_Regex:
        /^(?=[a-zA-Z0-9\.@_-]{6,48})([a-zA-Z0-9]([.@_-]?[a-zA-Z0-9])*)$/,
    GW_P_Apla_Regex: /^[a-zA-Z0-9]*$/, // alphanumeric only
    GW_P_Min_Regex: /^[a-zA-Z0-9]{6,}$/, // minimum 6 characters
    GW_P_Num_Regex: /[0-9]/, // Must contain atleast one number
    GW_P_OAplha_Regex: /[a-zA-Z]/, // must contain atleast one alphabetic character
    GW_P_Regex: /^((?=.*[0-9])(?=.*[a-zA-Z]).{6,})$/, // password generic
    checkPunctuation: /^[a-zA-Z0-9\s]*$/,
    firstNumberCheck: /^\d/,
    checkSpaces: /\s/g,
};

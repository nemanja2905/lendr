import { Regex } from './Regex';

import { config } from '@Config';

export const ValidationPassword = props => {
    let errors = {};
    const {currentPassword, confirmPassword, newPassword} = props;

    

    return errors;

}
export const Validation = {
    name: (firstname, field) => {
        let name = field === 'firstname' ? 'First name' : 'Surname';
        if (!firstname || firstname == '') {
            return `${name} is required`;
        } else if (firstname.charAt(0) == ' ') {
            return `${name} cannot start with a space`;
        } else if (firstname.length < 1) {
            return `Please enter your ${name}. At least 1 character`;
        } else if (!/^[a-zA-Z][a-zA-Z \'-]*$/.test(firstname)) {
            errors.firstname = `${name} must start with a letter. Only letters, spaces & hyphens permitted.`;
        } else if (!Regex.dashCheck.test(firstname)) {
            return `${name} invalid. No punctuation or numeric characters.`;
        } else if (Regex.startDash.test(firstname)) {
            return `${name} invalid. Can not start with -`;
        } else if (Regex.endDash.test(firstname)) {
            return `${name} invalid. Can not end with -`;
        } else return '';
    },
    dateDOB: (dateDOB) => {
        if (!dateDOB || dateDOB == '') {
            return 'Required';
        } else if (
            !Regex.isInteger.test(dateDOB) ||
            +dateDOB <= 0 ||
            +dateDOB > 31
        ) {
            return 'Invalid date';
        } else {
            return '';
        }
    },
    monthDOB: (monthDOB) => {
        if (!monthDOB || monthDOB == '') {
            return 'Required';
        } else if (
            !Regex.isInteger.test(monthDOB) ||
            +monthDOB <= 0 ||
            +monthDOB > 12
        ) {
            return 'Invalid month';
        } else {
            return '';
        }
    },
    yearDOB: (yearDOB) => {
        let dateNow = new Date(Date.now()).getFullYear() - 18;
        if (!yearDOB || yearDOB == '') {
            return 'Required';
        } else if (!Regex.isInteger.test(yearDOB)) {
            return 'Invalid year';
        } else if (+yearDOB <= 0 || +yearDOB > dateNow) {
            return 'Invalid year';
        } else {
            return '';
        }
    },
    dateComb: (date, month, year) => {
        try {
            let dateC = new Date(year, month, date);
            console.log(dateC);
        } catch (e) {
            console.log(e);
        }
    },
    email: async (email) => {
        if (!email || email == '') {
            return 'Email is required';
        } else if (
            !Regex.isValidEmail.test(email) ||
            !Regex.isValidEmailAlt.test(email)
        ) {
            return 'Please enter a valid email';
        } else {
            // call the API to validate email
            try {
                const response = await fetch(
                    `${config.domain}/user/checkEmail`,
                    {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            XAPIGTO: config.appBrand,
                        },
                        body: JSON.stringify({ email }),
                    }
                );

                const isEmailValid = await response.json();
                if (+isEmailValid !== 0) {
                    // error, email already exists
                    return 'Email address already exists. Enter a different email address.';
                }
            } catch (e) {
                return 'Unable to validate Email';
            }
        }

        return '';
    },
    mobile: (mobile, country, state) => {
        if (!mobile || mobile == '') {
            return 'Mobile number is required';
        } else if (
            country === 'Australia' &&
            (mobile.length < 10 || mobile.length > 20)
        ) {
            return 'Please enter a valid mobile';
        } else if (!Regex.isInteger.test(mobile)) {
            return 'Please enter a valid mobile';
        } else if (state === 9 && !Regex.mobileRegOT.test(mobile)) {
            return 'Please enter a valid mobile';
        } else if (state !== 9 && !Regex.mobileReg.test(mobile)) {
            return 'Please enter a valid mobile';
        } else {
            return '';
        }
    },
    stNo: (stNo) => {
        if (!stNo || stNo == '') {
            return 'Required';
        }

        return '';
    },
    stName: (stName) => {
        if (!stName || stName == '') {
            return 'Required';
        }

        return '';
    },

    // Locality is actually name of the suburb
    locality: (locality) => {
        if (!locality || locality == '') {
            return 'Required';
        } else if (!Regex.isValidWordHyphen.test(locality)) {
            return 'Suburb invalid. No punctuation or numeric characters.';
        }
        return '';
    },

    postCode: (postCode, state) => {
        if (!postCode || postCode == '') {
            return 'Postcode required';
        } else if (state !== 'OT' && postCode.length < 4) {
            ('Invalid postcode');
        } else if (!Regex.isInteger.test(postCode)) {
            return 'Invalid postcode';
        } else {
            return '';
        }
    },

    password: (password) => {
        if (!password || password == '') {
            return 'Password is required';
        } else if (password.length < 6) {
            return 'Password too short. Password must contain at least 6 characters.';
        } else if (!Regex.GW_P_Min_Regex.test(password)) {
            return 'Password cannot contain special characters. Alphanumeric only.';
        } else if (!Regex.GW_P_Apla_Regex.test(password)) {
            return 'Password can only contain alphanumeric characters only';
        } else if (!Regex.GW_P_Num_Regex.test(password)) {
            return 'Password requires at least one numeric character';
        } else if (!Regex.GW_P_OAplha_Regex.test(password)) {
            return 'Password requires at least one alphabetic character';
        } else if (!Regex.GW_P_Regex.test(password)) {
            return 'Password invalid.';
        } else {
            return '';
        }
    },

    loginID: async (loginID) => {
        if (!loginID || loginID == '') {
            return 'Username is required';
        } else if (loginID.length < 1) {
            return 'Username should be atleast 1 character';
        } else if (Regex.checkSpaces.test(loginID)) {
            return 'Username cannot cotnain spaces';
        } else if (!Regex.GW_Login_Regex.test(loginID)) {
            return "Username may only contain a combination of alphanumeric, underscore (_), hyphen (-), full stop (.) and symbol (@). It can't contain consecutive special characters."; // TODO: CHANGE ERROR MESSAGE
        } else if (loginID !== '') {
            try {
                const response = await fetch(
                    `${config.domain}/user/checkloginid`,
                    {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            XAPIGTO: config.appBrand,
                        },
                        body: JSON.stringify({ loginid: loginID }),
                    }
                );

                const isLoginValid = await response.json();
                if (+isLoginValid === 1) {
                    return 'The Username already exists';
                }
            } catch (e) {
                return 'Unable to validate Username - Network Error, please try again later';
            }
        }

        return '';
    },

    dLimit: (val) => {
        if (val == null) {
            return "Please select whether you'd like to set a deposit limit.";
        }
        return '';
    },

    dAmount: (val) => {
        if (+val == 0) {
            return 'Value cannot be 0';
        }

        return '';
    },

    dPeriod: (val) => {
        if (val == null) {
            return 'Select period.';
        }

        return '';
    },

    stType: (val) => {
        if (val == null) {
            return 'Required';
        }

        return '';
    },

    state: (val) => {
        if (val == null) {
            return 'Required';
        }

        return '';
    },

    country: (val) => {
        if (val == null) {
            return 'Required';
        }

        return '';
    },
};

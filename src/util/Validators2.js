// Provides utility functions to Register Component

import moment from 'moment';
// returns the current year
const CURRENT_YEAR = moment().year() - 18;

// generate an array of years, starting from current year - 18 to last 100 years
export const YEARS = [...Array(100).keys()];
for (let i = 0; i < YEARS.length; i++) {
    YEARS[i] = CURRENT_YEAR - i;
}
let current_year = moment().year();
export const YEARS2 = [...Array(5).keys()];
for (let i = 0; i < YEARS2.length; i++) {
    YEARS2[i] = current_year + i;
}
export const DATES = [...Array(31)];
for (let i = 0; i < DATES.length; i++) {
    DATES[i] = i + 1;
}
export const MONTHES = [...Array(12)];
export const YEARS3 = YEARS2.map((yy, i) => ({ value: yy, label: `${yy}` }));
export const DATES3 = DATES.map((date, i) => ({
    value: date,
    label: `${date}`,
}));
export const MONTHS = [
    { value: 1, label: 'Jan' },
    { value: 2, label: 'Feb' },
    { value: 3, label: 'Mar' },
    { value: 4, label: 'Apr' },
    { value: 5, label: 'May' },
    { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' },
    { value: 8, label: 'Aug' },
    { value: 9, label: 'Sep' },
    { value: 10, label: 'Oct' },
    { value: 11, label: 'Nov' },
    { value: 12, label: 'Dec' },
];
// REGEX to validate fields
const checkSpaces = /\s/g;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const validWord = /^[a-zA-Z\s]*$/;
const checkPunctuation = /^[a-zA-Z0-9\s]*$/;
const firstNumberCheck = /^\d/;
const isInteger = /^\d+$/;
const isValidEmail = /^$|^.*@.*\..*$/;
const isValidEmailAlt =
    /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const mobileRegOT =
    /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
const mobileReg = /^(04|05)[0-9]{8}$/;
const dashCheck = /^[a-zA-Z\s-]*$/;
const startDash = /^-/;
const endDash = /-$/;
const isValidWordHyphen = /^[a-zA-Z0-9\s-]*$/;

const passwordRegex2 = /^(?=.*[A-Z])(?=.*[a-z]).*$/;
const passwordRegex3 = /^(?=.*\d).*$/;

export const VALIDATE4 = async (values) => {
    const errors = {};

    if (!values.address) {
        errors.address = `Email address can't be empty`;
    } else {
        if (isValidEmail.test(values.address)) {
            try {
                const url2 = `https://elitebetstage.racingtipoff.com/user/checkEmail`;
                //52.62.199.40
                console.log('register.util.js url2', url2);
                const response = await fetch(
                    //`https://52.62.199.40/user/checkEmail`,
                    url2,
                    {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            XAPIGTO: 'EB',
                        },
                        body: JSON.stringify({ email: values.address }),
                    }
                );
                const isEmailValid = await response.json();
                if (isEmailValid !== 0) {
                    // error, email already exists
                    errors.address =
                        'Email address already exists. Enter a different email address.';
                } else {
                    // setValidEmail(values.email);
                }
                console.log(isEmailValid);
            } catch (e) {
                errors.address =
                    'Unable to validate Email - Network Error, please try again later';
                console.log('Unable to verify Email', e);
            }
        } else if (
            mobileReg.test(values.address) ||
            mobileRegOT.test(values.address)
        ) {
            const url2 = `https://elitebetstage.racingtipoff.com/user/checkmobile`;
            try {
                const response = await fetch(
                    `https://elitebetstage.racingtipoff.com/user/checkmobile`,
                    {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            XAPIGTO: 'EB',
                        },
                        body: JSON.stringify({ mobile: values.address }),
                    }
                );
                const isMobileValid = await response.json();
                console.log(isMobileValid);
                if (!isMobileValid.SUCCESS) {
                    // error, email already exists
                    errors.address =
                        'Mobile already exists. Enter a different mobile.';
                } else {
                    // setValidMobile(values.address);
                }
                console.log(isMobileValid);
            } catch (e) {
                errors.address =
                    'Unable to validate Mobile - Network Error, please try again later';
                console.log('Unable to verify Mobile');
            }
        } else {
            errors.address = 'Please input valid email or mobile number';
        }
    }
};
export const VALIDATE3 = (values) => {
    const result = {};
    if (!values) {
        //  errors.newPassword = 'Password is required';
    } else {
        result.passed3 = values.length >= 6;
        result.passed1 = passwordRegex2.test(values);
        result.passed2 = passwordRegex3.test(values);
    }
    return result;
};
export const VALIDATE2 = (values, currentPassword) => {
    const errors = {};

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password !== currentPassword) {
        errors.password = 'Password mismatch.';
    } // errors.password = "Password requires at least one numeric, one capital and one lowercase.";
    // errors.password = values.password;

    if (!values.newPassword) {
        errors.newPassword = 'Password is required';
    } else {
        if (values.newPassword.length < 6) {
            errors.newPassword =
                'Password too short. Password must contain at least 6 characters.';
        } else if (checkSpaces.test(values.newPassword)) {
            errors.newPassword = 'Password cannot contain spaces';
        } else if (!passwordRegex2.test(values.newPassword)) {
            errors.newPassword =
                'Password requires at least one numeric, one capital and one lowercase.';
        } else if (!passwordRegex.test(values.newPassword)) {
            errors.newPassword =
                'Password requires at least one numeric, one capital and one lowercase.';
        }
        // errors.passed3 = values.newPassword.length >= 6;
        // errors.passed1 = passwordRegex2.test(values.newPassword);
        // errors.passed2 = passwordRegex3.test(values.newPassword);
    }

    if (!values.confirmPassword) {
        // errors.confirmPassword = "Confirm Password is required";
        errors.confirmPassword = 'Confirm password mismatch.';
    } else if (values.newPassword !== values.confirmPassword) {
        errors.confirmPassword = 'Confirm password mismatch.';
    }

    return errors;
};

const client = process.env.NEXT_PUBLIC_CLIENT;

// Gen web regex, taken directly from their documentation
const GW_Login_Regex =
    /^(?=[a-zA-Z0-9\.@_-]{6,48})([a-zA-Z0-9]([.@_-]?[a-zA-Z0-9])*)$/;
const GW_P_Apla_Regex = /^[a-zA-Z0-9]*$/; // alphanumeric only
const GW_P_Min_Regex = /^[a-zA-Z0-9]{6,}$/; // minimum 6 characters
const GW_P_Num_Regex = /[0-9]/; // Must contain atleast one number
const GW_P_OAplha_Regex = /[a-zA-Z]/; // must contain atleast one alphabetic character
const GW_P_Regex = /^((?=.*[0-9])(?=.*[a-zA-Z]).{6,})$/; // password generic

// validation for all the fields
export const VALIDATE = async (
    values,
    validID,
    setValidID,
    validEmail,
    setValidEmail,
    validMobile,
    setValidMobile,
    buyTips,
    loginBlur,
    setLoginBlur
) => {
    const errors = {};

    if (!values.APTNO || values.APTNO === '0') {
        errors.APTNO = 'Apartment No should never be 0.';
    }
    if (!values.STNUMBER || values.STNUMBER === '0') {
        errors.STNUMBER = 'Street Number should never be 0.';
    }
    if (client == 'gto') {
        // gto validation
        // validation checks for loginID

        if (!values.loginID) {
            errors.loginID = 'Username is required';
        } else if (values.loginID.length < 6) {
            errors.loginID = 'Username should be minimum 6 characters';
        } else if (firstNumberCheck.test(values.loginID)) {
            errors.loginID = 'Username cannot start with a number';
        } else if (!checkPunctuation.test(values.loginID)) {
            errors.loginID = 'Can only contain letters and numbers';
        } else if (checkSpaces.test(values.loginID)) {
            errors.loginID = 'Username cannot contain spaces';
        }

        // validation for password
        // validation checks for password field
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password =
                'Password too short. Password must contain at least 8 characters.';
        } else if (checkSpaces.test(values.password)) {
            errors.password = 'Password cannot contain spaces';
            errors.passed3 = true;
        } else if (!passwordRegex.test(values.password)) {
            errors.password =
                'Password requires at least one numeric, one capital and one lowercase.';
            errors.passed3 = true;
        } else {
            errors.passed1 = true;
            errors.passed2 = true;
            errors.passed3 = true;
        }
    } else {
        // Gen web validations
        // validation for login
        if (!values.loginID) {
            errors.loginID = 'Username is required';
        } else if (values.loginID.length < 6) {
            errors.loginID = 'Username must be at least 6 characters';
        } else if (checkSpaces.test(values.loginID)) {
            errors.loginID = "Username can't cotnain spaces";
        } else if (!GW_Login_Regex.test(values.loginID)) {
            errors.loginID =
                "Username may only contain a combination of alphanumeric, underscore (_), hyphen (-), full stop (.) and symbol (@). It can't contain consecutive special characters."; // TODO: CHANGE ERROR MESSAGE
        }

        // validation for password
        // validation checks for password field
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password =
                'Password too short. Password must contain at least 6 characters.';
        } else if (!GW_P_Min_Regex.test(values.password)) {
            errors.password =
                'Password cannot contain special characters. Alphanumeric only.';
            errors.check3 = true;
        } else if (!GW_P_Apla_Regex.test(values.password)) {
            errors.password =
                'Password can only contain alphanumeric characters only';
            errors.check3 = true;
        } else if (!GW_P_Num_Regex.test(values.password)) {
            errors.password =
                'Password requires at least one numeric character';
            errors.check3 = true;
        } else if (!GW_P_OAplha_Regex.test(values.password)) {
            errors.password =
                'Password requires at least one alphabetic character';
            errors.check3 = true;
            errors.check2 = true;
        } else if (!GW_P_Regex.test(values.password)) {
            errors.password = 'Password invalid.';
            errors.check3 = true;
        }
    }

    // common validation checks
    if (
        (!errors.loginID || errors.loginID == '') &&
        values.loginID !== validID
    ) {
        // call the API to validate loginID
        console.log('in the api', values.loginID);
        try {
            const response = await fetch(
                `https://elitebetstage.racingtipoff.com/user/checkloginid`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        XAPIGTO: 'EB',
                    },
                    body: JSON.stringify({ loginid: values.loginID }),
                }
            );

            const isLoginValid = await response.json();
            if (+isLoginValid === 1) {
                errors.loginID = 'The Username already exists';
            } else {
                setValidID(values.loginID);
            }
        } catch (e) {
            errors.loginID =
                'Unable to validate Username - Network Error, please try again later';
            console.log('Unable to verify login');
        }
        setLoginBlur(false);
    }

    // validation checks for firstName
    if (!values.firstname) {
        errors.firstname = 'Please enter your First name';
    } else if (values.firstname.length < 3) {
        errors.firstname =
            'Please enter your First name. At least 3 characters';
    }
    // else if (!validWord.test(values.firstname)) {
    // 	errors.firstname = "First name invalid. No punctuation or numeric characters.";
    // }
    // else if (!checkPunctuation.test(values.firstname)) {
    // 	errors.firstname = "First name invalid. No punctuation characters.";
    // }
    else if (!dashCheck.test(values.firstname)) {
        errors.firstname =
            'First name invalid. No punctuation or numeric characters.';
    } else if (startDash.test(values.firstname)) {
        errors.firstname = 'First name invalid. Can not start with -';
    } else if (endDash.test(values.firstname)) {
        errors.firstname = 'First name invalid. Can not end with -';
    }

    if (!values.surname) {
        // validation checks for surname
        errors.surname = 'Please enter your surname';
    } else if (values.surname.length < 3) {
        errors.surname = 'Please enter your surname. At least 3 characters';
    }
    // else if (!validWord.test(values.surname)) {
    // 	errors.surname = "Surname invalid. No punctuation or numeric characters.";
    // }
    // else if (!checkPunctuation.test(values.surname)) {
    // 	errors.surname = "Surname invalid. No punctuation characters.";
    // }
    else if (!dashCheck.test(values.surname)) {
        errors.surname =
            'Surname invalid. No punctuation or numeric characters.';
    } else if (startDash.test(values.surname)) {
        errors.surname = 'Surname invalid. Can not start with -';
    } else if (endDash.test(values.surname)) {
        errors.surname = 'Surname invalid. Can not end with -';
    }

    // validation for date in DOB
    if (!values.dateDOB || values.dateDOB === 0) {
        errors.dateDOB = 'Please choose a Day';
    }

    // validation for month in DOB
    if (!values.monthDOB || values.monthDOB === 0) {
        errors.monthDOB = 'Please choose a Month';
    }

    // validation for year in DOB
    if (!values.yearDOB || values.yearDOB === 0) {
        errors.yearDOB = 'Please choose a Year';
    }

    if (values.yearDOB !== 0 && values.monthDOB !== 0 && values.dateDOB !== 0) {
        const date = new Date(
            YEARS[values.yearDOB - 1],
            values.monthDOB - 1,
            values.dateDOB
        );
        console.log(date);
        const age = moment().diff(date, 'years');
        if (age < 18) {
            errors.yearDOB = 'Users must be over 18';
        }
    }

    // validation for email
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (
        !isValidEmail.test(values.email) ||
        !isValidEmailAlt.test(values.email)
    ) {
        errors.email = 'Please enter a valid email';
    } else if (values.email !== validEmail) {
        // call the API to validate email
        // try {
        //     const url2 = `https://elitebetstage.racingtipoff.com/user/checkEmail`;
        //     //52.62.199.40
        //     console.log('register.util.js url2', url2);
        //     const response = await fetch(
        //         `https://52.62.199.40/user/checkEmail`,
        //         {
        //             method: 'POST',
        //             mode: 'cors',
        //             headers: {
        //                 Accept: 'application/json',
        //                 'Content-Type': 'application/json',
        //                 XAPIGTO: 'EB',
        //             },
        //             body: JSON.stringify({ email: values.email }),
        //         }
        //     );
        //     const isEmailValid = await response.json();
        //     if (+isEmailValid !== 0) {
        //         // error, email already exists
        //         errors.email =
        //             'Email address already exists. Enter a different email address.';
        //     } else {
        //         setValidEmail(values.email);
        //     }
        //     console.log(isEmailValid);
        // } catch (e) {
        //     errors.email =
        //         'Unable to validate Email - Network Error, please try again later';
        //     console.log('Unable to verify Email', e);
        // }
    }

    // validation for mobile number

    if (!values.mobile) {
        errors.mobile = 'Mobile number is required';
    } else if (
        values.country === 'Australia' &&
        (values.mobile.length < 10 || values.mobile.length > 20)
    ) {
        errors.mobile = 'Please enter a valid mobile';
    } else if (!isInteger.test(values.mobile)) {
        errors.mobile = 'Please enter a valid mobile';
    } else if (values.state === 9 && !mobileRegOT.test(values.mobile)) {
        errors.mobile = 'Please enter a valid mobile';
    } else if (values.state !== 9 && !mobileReg.test(values.mobile)) {
        errors.mobile = 'Please enter a valid mobile';
    } else if (values.mobile !== validMobile) {
        // call the API to validate Mobile
        // try {
        //     const response = await fetch(
        //         `https://elitebetstage.racingtipoff.com/user/checkmobile`,
        //         {
        //             method: 'POST',
        //             mode: 'cors',
        //             headers: {
        //                 Accept: 'application/json',
        //                 'Content-Type': 'application/json',
        //                 XAPIGTO: 'EB',
        //             },
        //             body: JSON.stringify({ mobile: values.mobile }),
        //         }
        //     );
        //     const isMobileValid = await response.json();
        //     console.log(isMobileValid);
        //     if (!isMobileValid.SUCCESS) {
        //         // error, email already exists
        //         errors.mobile =
        //             'Mobile already exists. Enter a different mobile.';
        //     } else {
        //         setValidMobile(values.mobile);
        //     }
        //     console.log(isMobileValid);
        // } catch (e) {
        //     errors.mobile =
        //         'Unable to validate Mobile - Network Error, please try again later';
        //     console.log('Unable to verify Mobile');
        // }
    }

    if (client == 'gto' || client == 'eb') {
        // validation for state
        if (!values.state || values.state === 0) {
            errors.state = 'Select state.';
        }

        // validation for country
        if (!values.country || values.country === 0) {
            errors.country = 'Required';
        }
    }
    if (buyTips) {
        // all the validation for appartment no, street no, street name and street type goes here
        // validation for appartment number, not required
        // if (!values.aptNo) {
        // 	errors.aptNo = "Required";
        // }

        if (!values.stNo) {
            errors.stNo = 'Required';
        }

        if (!values.stName) {
            errors.stName = 'Required';
        }

        if (
            values.yearDOB !== 0 &&
            values.monthDOB !== 0 &&
            values.dateDOB !== 0
        ) {
            // const date = new Date(YEARS[values.yearDOB - 1], values.monthDOB - 1, values.dateDOB);
            // console.log(date);
            // const age = moment().diff(date, "years");
            // if (age < 18) {
            // 	errors.yearDOB = "Users must be over 18";
            // }
            // validation for Street Type
            if (!values.stType || values.stType === 0) {
                errors.stType = 'Required';
            }

            if (!values.locality) {
                errors.locality = 'Required';
            } else if (!isValidWordHyphen.test(values.locality)) {
                errors.locality =
                    'Suburb invalid. No punctuation or numeric characters.';
            }
        }

        // validation for psotcode
        // && conidtion is required where country is AU
        if (!values.postCode && values.country === 'Australia') {
            errors.postCode = 'Postcode required';
        } else if (
            values.state &&
            values.state !== 9 &&
            values.postCode.length < 4
        ) {
            errors.postCode = 'Invalid postcode';
        } else if (!isInteger.test(values.postCode)) {
            errors.postCode = 'Invalid postcode.';
        }
    }

    return errors;
};

export const SUBMIT_FORM = async () => {};

// List of street types being used in Street Type select menu
export const STREET_TYPE = [
    'Street',
    'Road',
    'Avenue',
    'Boulevard',
    'Drive',
    'Circuit',
    'Close',
    'Cresent',
    'Court',
    'Highway',
    'Lane',
    'Loop',
    'Place',
    'Point',
    'Parade',
    'Terrace',
    'Way',
    'The Ridge',
    'Bend',
    'Other',
];

// List of state being used in the STATE Select Menu
export const STATE = [
    'NSW',
    'VIC',
    'QLD',
    'SA',
    'TAS',
    'ACT',
    'NT',
    'WA',
    'Other',
];
export const COUNTRIES = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    "Côte d'Ivoire",
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo(Congo - Brazzaville)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czechia(Czech Republic)',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini(fmr. Swaziland)',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea - Bissau',
    'Guyana',
    'Haiti',
    'Holy See',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar(formerly Burma)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine State',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor - Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
];

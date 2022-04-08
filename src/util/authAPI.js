import { config } from '@Config';
export const getAllSports = async (sportcode = undefined) => {
    const url = `${config.domain}/sports/getAllSports`;
    const response = await authAPI(
        url,
        {
            sportcode: sportcode ? sportcode : 'all',
        },
        'POST',
        false
    );
    if (response.error) {
        return [];
    }
    return response.data;
};

export const getAllRaces = async (racetype = undefined) => {
    const url = `${config.domain}/races/getAllRaces`;
    const response = await authAPI(
        url,
        {
            nexttojump: 1,
            jsonresp: 1,
            racetype: racetype ? racetype : 'A',
        },
        'POST',
        false
    );
    // console.log('getAllRaces=', response);
    /*console.log(mydata);*/
    if (response.error) {
        return [];
    }
    return response.data;
};

//04/05/2022 Sergey

export const proceedUserUpdateDetails = async (value) => {
    const url = `${config.domain}/user/updateuserdetail`;

    const response = await authAPI(url, value, 'POST', false);
    // console.log('proceedUserUpdateDetails', response);
    if (response.error) {
        return response;
    }

    // console.log('proceedUserUpdateDetails', response.data);
    return response.data;
};

export const fetchUserDetails = async (data = { clientid: 'testclient' }) => {
    const url = `${config.domain}/user/userdetails`;
    // if (data === undefined) data = '{"clientid":"testclient"}';
    const response = await authAPI(url, data, 'POST', false);
    // console.log("fetch from user/userdetails", response.data);
    if (response.error) {
        return response;
    }
    // console.log("fetch from user/userdetails", response.data);

    return response.data;
    return [];
};

export const proceedUserChangePass = async (value = {}) => {
    const url = `${config.domain}/user/UserChangePass`;
    let body = {
        clientid: value.clientid,
        current: value.password,
        new: value.newPassword,
    };
    // const str2 = body.replace(/\\/g, '');
    const response = await authAPI(url, body, 'POST', false);

    console.log('proceedUserChangePass params=', body, ',REsponse=', response);
    if (response.error) {
        return response;
    }

    // console.log('proceedUserChangePass', response.data);
    return response.data;
};

export const proceedUserSettings = async (value = {}) => {
    const url = `${config.domain}/user/usersettings`;
    const response = await authAPI(url, value, 'POST', false);

    // console.log('proceedUserSettings', response);
    if (response.error) {
        return response;
    }

    // console.log('proceedUserSettings', response.data);
    return response.data;
};

export const getCreditCards = async (data = { clientid: 'testclient' }) => {
    const url = `${config.domain}/user/creditcards`;

    const response = await authAPI(url, data, 'POST', false);
    console.log('getCreditCards', data, response);
    if (response.error) {
        return response;
    }
    console.log('fetch from user/creditcards', response.data);

    return response.data;
};

export const proceedCreditCardVerify = async (
    body = { clientid: 'testclient' }
) => {
    const url = `${config.domain}/user/ccverify`;

    // const str2 = body.replace(/\\/g, '');
    // console.log('proceedCreditCardVerify', url, str2);
    const response = await authAPI(url, body, 'POST', false);

    console.log('proceedCreditCardVerify response=', response);
    if (response.error) {
        return response;
    }

    // console.log('proceedUserChangePass', response.data);
    return response.data;
};

export const proceedCreditCardUnregister = async (
    body = { clientid: 'testclient' }
) => {
    const url = `${config.domain}/user/CCUnregister`;

    const response = await authAPI(url, body, 'POST', false);

    if (response.error) {
        return response;
    }

    // console.log('proceedUserChangePass', response.data);
    return response.data;
};
export const fetchUserBenefits = async (
    selected,
    body = { clientid: 'testclient' }
) => {
    let urls = [
        `${config.domain}/user/pointsredeem`,
        `${config.domain}/user/pointsautoredeem`,
    ];

    // const url = `${config.domain}/user/pointsredeem`;
    //const body = `{"clientid":"testclient","points":"${_points}"}`;
    console.log('fetchUserBenefits() called with', body);
    const response = await authAPI(urls[selected], body, 'POST', false);

    if (response.error) {
        return response.error;
    }

    console.log('fetch from benefits', response.data);
    return response.data;
};

export const fetchBenefitsRewards = async (body) => {
    const url = `${config.domain}/user/benefits`;
    //const body = `{"clientid":"testclient","points":"${_points}"}`;
    // console.log('fetchBenefitsRewards() called with', body);

    const response = await authAPI(url, body, 'POST', false);
    // console.log('fetchBenefitsRewards() results=', body, ':', response);
    if (response.error === true) {
        return {
            balance: 0.0,
            count1: 0,
            count2: 0,
            totalCount: 0,
            reward: 0,
        };
    }

    // console.log('fetch from fetchBenefitsRewards', response.data);
    const apts = response.data.POINTS.opts[0].apts || 0;
    const dbvs = response.data.BOOST.dbvs;
    const rval = response.data.BONUSBET?.fbvs[0]?.rval || 0;
    let count1 = 0;
    let count2 = 0;

    dbvs?.forEach((row) => {
        if (row.rrr === undefined) {
            count2 += row.rval;
        } else {
            count1 += row.rval;
        }
    });

    return {
        balance: rval,
        count1,
        count2,
        totalCount: count1 + count2,
        bonusBet: count1 + count2,
        reward: apts,
    };
    // return response.data;
};

export const fetchDepositLimit = async (body = { clientid: 'testclient' }) => {
    const url = `${config.domain}/user/getDepositLimit`;

    const response = await authAPI(url, body, 'POST', false);
    const data2 = { ...response.data };
    console.log('response from fetchDepositLimit = ', response);

    if (response.error) {
        return {};
    }
    console.log(
        ' data from fetchDepositLimit' + { ...response.data.depositlimit }
    );

    return response.data;
};

export const proceedDepositLimit = async (
    body = { clientid: 'testclient' }
) => {
    const url = `${config.domain}/user/setDepositLimit`;

    let response = await authAPI(url, body, 'POST', false);
    console.log('response from setDeposit Limit', response);
    if (response.error) {
        return {};
    }
    console.log(
        ' data from setDepositLimit' + { ...response.data.depositlimit }
    );

    return response.data;
};

export const proceedSelfSuspend = async (body = { clientid: 'testclient' }) => {
    const url = `${config.domain}/user/SelfSuspend`;

    let response = await authAPI(url, body, 'POST', false);
    console.log('response from SelfSuspend Limit', response);
    if (response.error) {
        return {};
    }
    console.log(' data from SelfSuspend', response.data);

    return response.data;
};

async function authAPI(url, body, method) {
    let count = 0;
    let options = {
        method: method,
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'text/plain',
            XAPIGTO: 'EB',
        },
    };
    if (method === 'POST') {
        options.body = JSON.stringify(body);
    }
    // options.body = body;

    do {
        try {
            count++;

            const responseJson = await (await fetch(url, options)).json();
            if (responseJson.ERROBJ?.ERRORCODE === 1) {
                console.log('error code 1');
                return { error: true, desc: responseJson.ERROBJ.ERRORDESC };
            } else if (responseJson.ERROBJ?.ERRORCODE === 403) {
                if (count === 3) {
                    return {
                        error: true,
                        desc: responseJson.ERROBJ.ERRORDESC,
                    };
                }
                console.log('error code 403');
                const update = await updateToken();
                console.log('update is', update);
                if (!update) {
                    return {
                        error: true,
                        desc: 'Unauthorized request',
                    };
                }
            } else {
                return { error: false, data: responseJson };
            }
        } catch (e) {
            return { error: true, desc: '404 - Something went wrong', e };
        }
    } while (count < 3);
}

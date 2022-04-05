export const getAllSports = async (sportcode = undefined) => {
    const url = `https://devapi.racingtipoff.com/sports/getAllSports`;
    const response = await authAPI(
        url,
        {
            sportcode: sportcode ? sportcode : '',
        },
        'POST',
        false
    );
    // console.log('getAllSports', url, response);
    if (response.error) {
        return [];
    }
    // console.log('getAllSports .data=', response.data);
    return response.data;
};

export const getAllRaces = async (racetype = undefined) => {
    // const url = `${process.env.server}/races/getAllRaces`;
    const url = `https://devapi.racingtipoff.com/races/getAllRaces`;

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
    // let mydata = JSON.parse(JSON.parse(response.data.all));

    if (response.error) {
        return [];
    }
    // console.log('getAllRaces .data=', response.data);
    return response.data;
};

export const fetchUserBenefits = async (_points) => {
    const url = 'https://devapi.racingtipoff.com/user/pointsredeem';
    if (_points === undefined) _points = 100;
    const body = `{"clientid":"testclient","points":"${_points}"}`;
    // console.log("fetchUserBenefits() called with", url, _points, body);
    const response = await betsAPI(url, 'POST', body);

    if (response.error) {
        return response.error;
    }

    // console.log('fetch from benefits', response.data);
    return response.data;
};

export const proceedCreditCardUnregister = async (clientid, cardid) => {
    const url = 'https://devapi.racingtipoff.com/user/CCUnregister';
    const body = JSON.stringify({
        clientid: clientid,
        cardid: cardid,
    }).replace(/\\/g, '');

    console.log('proceedCreditCardUnregister', url, body);
    const response = await betsAPI(url, 'POST', body);

    if (response.error) {
        return response;
    }

    // console.log('proceedUserChangePass', response.data);
    return response.data;
};
export const proceedCreditCardVerify = async (clientid, cardid, cents, ccv) => {
    const url = 'https://devapi.racingtipoff.com/user/ccverify';
    const body = JSON.stringify({
        clientid: clientid,
        cardid: cardid,
        cents: parseFloat(cents),
        ccv: parseFloat(ccv),
    }).replace(/\\/g, '');

    console.log('proceedCreditCardVerify', url, body);
    const response = await betsAPI(url, 'POST', body);
    console.log('proceedUserChangePass', response);
    if (response.error) {
        return response;
    }

    console.log('proceedUserChangePass', response.data);
    return response.data;
};

export const proceedUserSettings = async (value) => {
    const url = 'https://devapi.racingtipoff.com/user/usersettings';
    const body = JSON.stringify(value).replace(/\\/g, '');

    const response = await betsAPI(url, 'POST', body);

    // console.log('proceedUserSettings', response);
    if (response.error) {
        return response;
    }

    // console.log('proceedUserSettings', response.data);
    return response.data;
};

export const proceedUserChangePass = async (value) => {
    const url = 'https://devapi.racingtipoff.com/user/UserChangePass';
    const body = JSON.stringify({
        clientid: value.clientid,
        current: value.password,
        new: value.newPassword,
    });
    const str2 = body.replace(/\\/g, '');
    const response = await betsAPI(url, 'POST', str2);

    // console.log('proceedUserChangePass', response);
    if (response.error) {
        return response;
    }

    // console.log('proceedUserChangePass', response.data);
    return response.data;
};

export const proceedUserUpdateDetails = async (value) => {
    const url = 'https://devapi.racingtipoff.com/user/updateuserdetail';
    const body = JSON.stringify(value);
    const str2 = body.replace(/\\/g, '');
    const response = await betsAPI(url, 'POST', str2);
    console.log('proceedUserUpdateDetails', response);
    if (response.error) {
        return response;
    }

    console.log('proceedUserUpdateDetails', response.data);
    return response.data;
};

export const getCreditCards = async (clientid) => {
    // const url = process.env.devserver ? `https://${process.env.devserver}/user/usedetails`
    //   : 'https://devapi.racingtipoff.com/user/usedetails';
    const url = 'https://devapi.racingtipoff.com/user/creditcards';
    let data;
    if (data === undefined) data = `{"clientid":"testclient"}`;
    else data = `{"clientid":${clientid}}`;
    const response = await betsAPI(url, 'POST', data);
    console.log('getCreditCards', data, response);
    if (response.error) {
        return response;
    }
    console.log('fetch from user/creditcards', response.data);

    return response.data;
};

export const fetchUserDetails = async (data) => {
    // const url = process.env.devserver ? `https://${process.env.devserver}/user/usedetails`
    //   : 'https://devapi.racingtipoff.com/user/usedetails';
    const url = 'https://devapi.racingtipoff.com/user/userdetails';
    if (data === undefined) data = '{"clientid":"testclient"}';
    const response = await betsAPI(url, 'GET', data);
    // console.log("fetch from user/userdetails", response.data);
    if (response.error) {
        return response;
    }
    // console.log("fetch from user/userdetails", response.data);

    return response.data;
};

export const sendDepositLimit = async (clientid, depositlimit, period) => {
    const url = process.env.devserver
        ? `https://${process.env.devserver}/user/setDepositLimit`
        : 'https://devapi.racingtipoff.com/user/setDepositLimit';
    const body = JSON.stringify({
        clientid: clientid,
        depositlimit: depositlimit,
        period: period,
    });
    let response = await betsAPI(url, 'POST', body);
    console.log('response from setDeposit Limit', response.data);
    if (response.error) {
        return {};
    }
    // console.log(' data from getDepositLimit' + { ... (response.data.depositlimit) });

    return response.data;
};
export const sendSelfSuspend = async (clientid, limitdate, password) => {
    const url = process.env.devserver
        ? `https://${process.env.devserver}/user/SelfSuspend`
        : 'https://devapi.racingtipoff.com/user/SelfSuspend';
    const body = JSON.stringify({
        clientid: clientid,
        suspenddate: limitdate,
        password: password,
    });
    let response = await betsAPI(url, 'POST', body);
    console.log('response from sendSelfSuspend ', response.data);
    if (response.error) {
        return {};
    }
    // console.log(' data from getDepositLimit' + { ... (response.data.depositlimit) });

    return response.data;
};

export const getDepositLimit = async (data) => {
    const url = process.env.devserver
        ? `https://${process.env.devserver}/user/getDepositLimit`
        : 'https://devapi.racingtipoff.com/user/getDepositLimit';

    let response = await betsAPI(url, 'POST');
    const data2 = { ...response.data };
    // console.log("response from getDepositLimit = ", data2);

    if (response.error) {
        return {};
    }
    // console.log(' data from getDepositLimit' + { ... (response.data.depositlimit) });

    return response.data;
};
export const fetchDataFromJson = async () => {
    const url = process.env.devserver
        ? `https://${process.env.devserver}/user/benefits`
        : 'https://devapi.racingtipoff.com/user/benefits';

    try {
        // console.log('fetchDataFromJson');
        const response = await betsAPI(url, 'POST');

        console.log('fetch from benefits', response);

        const apts = response.data.POINTS.opts[0].apts;
        const dbvs = response.data.BOOST.dbvs;
        // const rval = response.data.BONUSBET?.fbvs[0].rval || 0;
        const rbalance = dbvs[0].rrst;
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
            balance: rbalance,
            count1,
            count2,
            totalCount: count1 + count2,
            reward: apts,
        };
    } catch (e) {
        return {
            balance: 0.0,
            count1: 0,
            count2: 0,
            totalCount: 0,
            reward: 0,
        };
    }
};

export async function betsAPI(
    url,
    method,
    body = `{ "clientid": "testclient" }`
) {
    let count = 0;
    let options = {
        method: method,
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            XAPIGTO: 'EB',
        },
    };
    options.body = body;
    // console.log('bestAPI');
    do {
        try {
            count++;
            // console.log("url", url, "options", options);
            // const responseJson = (await fetch(url, options));
            const responseJson = await (await fetch(url, options)).json();
            // console.log('count', count, 'result', responseJson);
            if (responseJson.ERROBJ?.ERRORCODE === 1) {
                console.log('error code 1');
                return { error: true, desc: responseJson.ERROBJ.ERRORDESC };
            } else if (responseJson.ERROBJ?.ERRORCODE === 403) {
                if (count === 3) {
                    return { error: true, desc: responseJson.ERROBJ.ERRORDESC };
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
                // console.log("return error:false, ", responseJson);
                return { error: false, data: { ...responseJson } };
            }

            // console.log("return outside", responseJson);
            return responseJson;
        } catch (e) {
            return { error: true, desc: '404 - Something went wrong', e };
        }
    } while (count < 3);
}

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

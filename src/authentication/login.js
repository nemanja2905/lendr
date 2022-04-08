import { config } from '@Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
async function userLogin(userID, pass, Login) {
    try {
        const url = `${config.domain}/oAuth/login`;
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                XAPIGTO: config.appBrand,
            },
            body: JSON.stringify({
                username: userID,
                password: pass,
            }),
        });

        const user = await response.json();
        console.log(user.USER);
        if (user.ERROBJ.ERROR > 0) {
            setError(user.ERROBJ.ERRORDESC);
            return {
                success: false,
                errorMessage: user.ERROBJ.ERRORDESC,
            };
        } else {
            /**Couldn't work <properly className=""></properly>
             *
             */
            AsyncStorage.setItem('@userInfo', JSON.stringify(user.USER[0]));

            Login({
                isLoggedIn: true,
                user: user.USER[0],
                accessToken: user.ACCESSTOKEN,
                refreshToken: user.REFRESH_TOKEN,
                activeTips: user.ACTIVETIPS,
                pendingTips: user.PENDINGTIPS,
                rememberMe: user.REMEMBERME,
                totalEarnings: user.TOTALEARNINGS,
            });
        }
    } catch (e) {
        return {
            success: false,
            errorMessage: 'Login details incorrect',
        };
    }

    return {
        success: true,
        errorMessage: '',
    };
}

export default userLogin;

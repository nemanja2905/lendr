/**const [userInfo, setUserInfo] = useState({});
    const loadUserInfo = useCallback(async () => {
        const value = await AsyncStorage.getItem('@userInfo');
        const userInfo = JSON.parse(value);
        console.log('RootTabs::, userInfo=', userInfo);
        if (userInfo && userInfo.CLIENTID !== '') {
            setUserInfo(userInfo);
        }
    }, []);
    let interval;
    // console.log('RootTabs userInfo=', userInfo);
    useEffect(() => {
        interval = setInterval(() => {
            if (!userInfo.CLIENTID) {
                loadUserInfo();
            } else {
                console.log('Cleared');
                return () => clearInterval(interval);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []); */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserInfo = async () => {
    let value = await AsyncStorage.getItem('@userInfo');
    const user = JSON.parse(value);
    return userInfo;
};

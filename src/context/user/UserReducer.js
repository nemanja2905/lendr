import { USER_TYPE } from './TYPES';

const UserReducer = (state, action) => {
    switch (action.type) {
        case USER_TYPE.LOGIN: {
            return {
                ...state,
                user: action.payload,
            };
        }

        case USER_TYPE.LOGOUT: {
            return {
                ...state,
                user: action.payload,
            };
        }

        case USER_TYPE.UPDATE_USER: {
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.key]: action.payload.list,
                },
            };
        }
        case USER_TYPE.UPDATE_USER_DETAIL: {
            return {
                ...state,
                user: {
                    ...state.user,
                    user: {
                        ...state.user.user,
                        [action.payload.key]: action.payload.list,
                    },
                },
            };
        }
    }
};

export default UserReducer;

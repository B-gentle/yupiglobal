import {
    createSlice
} from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));

            const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000 //1 day
            localStorage.setItem('expirationTime', expirationTime)
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.clear();
        },

        checkCredentials: (state) => {
            const expirationTime = localStorage.getItem('expirationTime');
            if (expirationTime) {
                const currentTime = new Date().getTime();
                if (currentTime > parseInt(expirationTime)) {
                    // Clear the localStorage if the expiration time has passed
                    localStorage.removeItem('userInfo');
                    localStorage.removeItem('expirationTime');
                    state.userInfo = null; // Update your state accordingly
                }
            }
        },
    }
});

export const {
    setCredentials,
    logout,
    checkCredentials
} = authSlice.actions

export default authSlice.reducer
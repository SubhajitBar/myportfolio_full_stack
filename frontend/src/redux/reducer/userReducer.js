import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
};

export const userReducer = createReducer(initialState, {
    getUserRequest: (state) => {
        state.loading = true
    },
    getUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    getUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },


});

export const loginReducer = createReducer({}, {

    loginRequest: (state) => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        // state.user = action.payload.user;
        state.message = action.payload;
    },
    loginFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    logoutRequest: (state) => {
        state.loading = true;
    },
    logoutSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload;
    },
    logoutFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.payload;
    },

    loadUserRequest: (state) => {
        state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
    },
    loadUserFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
});

export const updateReducer = createReducer({}, {

    updateUserRequest: (state) => {
        state.loading = true;
    },
    updateUserSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    addTimelineRequest: (state) => {
        state.loading = true;
    },
    addTimelineSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addTimelineFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deleteTimelineRequest: (state) => {
        state.loading = true;
    },
    deleteTimelineSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteTimelineFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    addYoutubeRequest: (state) => {
        state.loading = true;
    },
    addYoutubeSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addYoutubeFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deleteYoutubeRequest: (state) => {
        state.loading = true;
    },
    deleteYoutubeSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteYoutubeFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    addProjectRequest: (state) => {
        state.loading = true;
    },
    addProjectSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addProjectFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deleteProjectRequest: (state) => {
        state.loading = true;
    },
    deleteProjectSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteProjectFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    contactRequest: (state) => {
        state.loading = true;
    },
    contactSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    contactFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    clearError: (state) => {
        state.error = null
    },
    clearMessage: (state) => {
        state.message = null
    },
});
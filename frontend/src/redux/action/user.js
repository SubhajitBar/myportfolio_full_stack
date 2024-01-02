import axios from "axios";
import { server } from "../store";

export const getUser = () => async (dispatch) => {
    try {
        dispatch({ type: "getUserRequest" });
        const { data } = await axios.get(`${server}/api/v1/user`, { withCredentials: true });

        dispatch({ type: "getUserSuccess", payload: data.user });

    } catch (error) {
        dispatch({ type: "getUserFail", payload: error.response.data.message });
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "loginRequest" });
        const { data } = await axios.post(`${server}/api/v1/login`, { email, password }, {
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true,
        });

        dispatch({ type: "loginSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "loginFail", payload: error.response.data.message });

    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: "logoutRequest" });

        const { data } = await axios.get(`${server}/api/v1/logout`, { withCredentials: true });

        dispatch({ type: "logoutSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "logoutFail", payload: error.response.data.message });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "loadUserRequest" });

        const { data } = await axios.get(`${server}/api/v1/me`, { withCredentials: true });

        dispatch({ type: "loadUserSuccess", payload: data.user });
    } catch (error) {
        dispatch({ type: "loadUserFail" });

    }
};

export const updateUser = (name, email, password, skills, about) => async (dispatch) => {

    try {
        dispatch({ type: "updateUserRequest" });

        const { data } = await axios.put(`${server}/api/v1/admin/update`,
            { name, email, password, skills, about }, {
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true,
        });
        dispatch({ type: "updateUserSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "updateUserFail", payload: error.response.data.message })
    }
};

export const addTimeline = (title, description, date) => async (dispatch) => {
    try {
        dispatch({ type: "addTimelineRequest" });

        const { data } = await axios.post(`${server}/api/v1/admin/timeline/add`, {
            title,
            description,
            date,
        }, {
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true
        });

        dispatch({ type: "addTimelineSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "addTimelineFail", payload: error.response.data.message });
    }

};

export const deleteTimeline = (id) => async (dispatch) => {
    try {
        dispatch({ type: "deleteTimelineRequest" });

        const { data } = await axios.delete(`${server}/api/v1/admin/timeline/${id}`, { withCredentials: true });

        dispatch({ type: "deleteTimelineSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "deleteTimelineFail", payload: error.response.data.message });

    }
};

export const addYoutube = (url, title, image) => async (dispatch) => {
    try {
        dispatch({ type: "addYoutubeRequest" });

        const { data } = await axios.post(`${server}/api/v1/admin/youtube/add`, {
            url,
            title,
            image,
        }, {
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true
        });

        dispatch({ type: "addYoutubeSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "addYoutubeFail", payload: error.response.data.message });
    }

};

export const deleteYoutube = (id) => async (dispatch) => {
    try {
        dispatch({ type: "deleteYoutubeRequest" });

        const { data } = await axios.delete(`${server}/api/v1/admin/youtube/${id}`, { withCredentials: true });

        dispatch({ type: "deleteYoutubeSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "deleteYoutubeFail", payload: error.response.data.message });

    }
};

export const addProject = (title, url, image, description, techStack) => async (dispatch) => {
    try {
        dispatch({ type: "addProjectRequest" });

        const { data } = await axios.post(`${server}/api/v1/admin/project/add`, { title, url, image, description, techStack }, {
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true
        });

        dispatch({ type: "addProjectSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "addProjectFail", payload: error.response.data.message });
    }

};

export const deleteProject = (id) => async (dispatch) => {
    try {
        dispatch({ type: "deleteProjectRequest" });

        const { data } = await axios.delete(`${server}/api/v1/admin/project/${id}`, { withCredentials: true });

        dispatch({ type: "deleteProjectSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "deleteProjectFail", payload: error.response.data.message });

    }
};

export const contact = (name, email, message) => async (dispatch) => {
    try {
        dispatch({ type: "contactRequest" });

        const { data } = await axios.post(`${server}/api/v1/contact`, { name, email, message }, {
            headers: {
                'Content-Type': "application/json",
            }, withCredentials: true
        })

        dispatch({ type: "contactSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "contactFail", payload: error.response.data.message });

    }
};
import Cookies from "js-cookie";
import * as type from '../types/user'
import axios from "axios";

export const setSession = (data) => ({
  type: type.SESSION,
  payload: data,
});

export const setRefresh = (data) => ({
  type: type.REFRESH,
  payload: data,
});

export const setError = (data) => ({
  type: type.ERROR,
  payload: data,
});

export const setAvatar = (data) => ({
  type: type.IMAGE,
  payload: data,
});

export const setProfile = (data) => ({
  type: type.PROFILE,
  payload: data,
});

export const setLoading = (data) => ({
  type: type.LOADING,
  payload: data,
});

export const setMessage = (data) => ({
  type: type.MESSAGE,
  payload: data,
});

export const setRole = (data) => ({
    type: type.ROLE,
    payload: data,
  });

export const userLogin = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_HOST}auth/token/request`, data);

    if (result.status === 200) {
      // dispatch token to session
      dispatch(setSession(result.data.data.access_token));
      // var ttl = Date.now()
      // localStorage.setItem(
      //   'expired', ttl
      // )
      // console.log(ttl)

      const now = new Date()
      const expiry= now.getTime() + 5000
      // (60*60*1000)

      localStorage.setItem('expired', JSON.stringify(expiry))


      // insert token to localstorage with name session
      // sessionStorage.setItem(
      //   'session',
      //   JSON.stringify(result.data.data.access_token),
      // );
      // setTimeout(() => {
      //   // Clear local storage
      //   localStorage.clear();
      //   Cookies.remove('session');
      //   sessionStorage.clear();
      //   window.location.reload()
        
      // }, 5000);
      // 60 * 60 * 1000);

      Cookies.set('session', result.data.data.access_token,);
      dispatch(setRefresh(result.data.data.refresh_token));
      dispatch(setRole(data.role))
      dispatch(setLoading(false));
      
      dispatch(userProfile(result.data.data.access_token))
      return dispatch(userProfile(result.data.data.access_token));
    }
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(true));

    return {
      status: error.response.status,
      message: error.response.data.message,
      data: error.response.data.data,
    };
  }
};

export const userProfile = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // setHeader(data);
    const result = await axios.get(`${process.env.REACT_APP_API_HOST}auth/token/detail`, {
      headers: {
        Authorization: 'Bearer ' + data
      }
    });
    

    if (result.status === 200) {
      
      dispatch(setProfile(result.data.data));
    //   dispatch(
    //     setAvatar(
    //       result.data.data.image_url ?? imageApi(result.data.data.name),
    //     ),
    //   );
    }
    dispatch(setLoading(false));
    return {
      status: result.status,
      message: 'success',
      data: result.data.data,
    };
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(true));

    return {
      status: error.response.status,
      message: error.response.data.message,
      data: error.response.data.data,
    };
  }
};

export const userLogout = async (data) => {
  try {
    // setHeader();
    sessionStorage.clear()
    // Cookies.remove('session');
    const result = await axios.get(`${process.env.REACT_APP_API_HOST}auth/token/revoke`);
    Cookies.remove('session');
    return {
      status: result.status,
      message: result.data.data,
      data: result.data,
    };
  } catch (error) {
    return {
      status: error.status ?? 500,
      message: error.response.data.message ?? 'Something Happened',
      data: null,
    };
  }
};

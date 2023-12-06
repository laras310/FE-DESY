import * as type from '../types/dashboardAdmin';
import axios from "axios";

export const setPerson = (data)=>({
    type: type.PERSON,
    payload : data
})

export const setUnit = (data) =>({
    type: type.UNIT,
    payload :data
})

export const setLoading = (data) => ({
    type: type.LOADING,
    payload: data,
  });

export const fetchPerPerson = () => async (dispatch) =>{
    dispatch(setLoading(true));
    try {
        const result = await axios.get(`${process.env.REACT_APP_API_JOBCARD}/task/each-user`, {
            headers:{
              Authorization: 'Bearer' + sessionStorage.getItem('access_token'),
            },
            'Access-Control-Allow-Origin':'*',
          })
        if (result.status === 200){
            dispatch(setPerson(result.data.data))
            dispatch(setLoading(false));
            return result
        }
    }catch(error){
        return {
            status: error.status ?? 500,
            message: error.response.data.message ?? 'Something Happened',
            data: null,
        }
    }
}

export const fetchPerUnit = () => async (dispatch) =>{
    dispatch(setLoading(true));
    try {
        const result = await axios.get(`${process.env.REACT_APP_API_JOBCARD}/task/each-unit`, {
            headers:{
              Authorization: 'Bearer' + sessionStorage.getItem('access_token'),
            },
            'Access-Control-Allow-Origin':'*',
          })
        if (result.status === 200){
            dispatch(setUnit(result.data.data))
            dispatch(setLoading(false));
            return result
        }
    }catch(error){
        return {
            status: error.status ?? 500,
            message: error.response.data.message ?? 'Something Happened',
            data: null,
        }
    }
}


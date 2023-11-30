import * as type from "../types/profil";

const initialState ={
    session:'',
    isValidation: false,
    user:{},
    isLoading: false,
    isError: false,
    role: ''
}

export default function userReducers (state = initialState, action) {
    switch (action.type) {
      case type.SESSION:
        return {
          ...state,
          session: action.payload,
          isValidation: true,
        };
  
      case type.REFRESH:
        return {
          ...state,
          refresh: action.payload,
        };
  
      case type.ROLE:
        return {
          ...state,
          role: action.payload,
        };
  
      case type.PROFILE:
        return {
          ...state,
          profile: action.payload,
        };
  
      case type.LOADING:
        return {
          ...state,
          isLoading: action.payload,
        };
  
      case type.MESSAGE:
        return {
          ...state,
          message: action.payload,
        };
  
      default:
        return state;
    }
  }
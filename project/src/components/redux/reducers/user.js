import * as type from '../types/user';

const initialState = {
    session: '',
    avatar: '',
    isValidation: false,
    refresh: '',
    user: {},
    isLoading: false,
    isError: false,
    message: '',
    role:'',
    timestamp: Date.now(),
  };
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
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
  
      case type.IMAGE:
        return {
          ...state,
          avatar: action.payload,
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
        
        case type.ROLE:
            return {
                ...state,
                role: action.payload,
            };
        
        case type.TIMESTAMP:
          return {
              ...state,
              timestamp: action.payload,
          };
  
      default:
        return state;
    }
  }
  
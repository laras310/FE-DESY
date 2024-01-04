import * as type from '../types/dashboardAdmin';

const initialState = {
    person: {},
    unit: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function( state = initialState, action){
    switch (action.type){
        case type.PERSON:
            return{
                ...state,
                person: action.payload,
            }
        case type.UNIT:
            return{
                ...state,
                unit: action.payload,
            }
        default:
            return state;
    }
}
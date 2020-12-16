import _ from 'lodash';
import { FETCH_PROFILE, EDIT_PROFILE} from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_PROFILE:
           // console.log(action.payload.data);
            return action.payload.data;
        case EDIT_PROFILE:
            console.log(action.payload);
        default:
            return state;
    }
}
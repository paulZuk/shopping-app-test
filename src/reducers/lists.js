import {DELETE_LIST, MARK_ACTIVE_LIST, SET_LISTS} from "../constants";

export default (state =[], action) => {
    switch (action.type){
        case SET_LISTS:
            const { lists } = action;
            return lists;
        case MARK_ACTIVE_LIST:
            let newState =
                state.map(list => {

                list.active = false;

                if (list.id === action.id) {
                    list.active ? list.active = false : list.active = true;
                }
                return list;
            });
            return newState;
        case DELETE_LIST:
            newState =
                state.filter(list => {
                    return list.name !== action.list
                });
            return newState;
        default:
            return state;
    }
}
import {MARK_ACTIVE_LIST, SET_LISTS} from "../constants";

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
        default:
            return state;
    }
}
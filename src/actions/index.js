import { LOG_IN, ITEM_LIST } from "../constants";

export const logIn = email => {
    const action = {
        type: LOG_IN,
        email,
    };
    // console.log('log in ', action);
    return action;
};

export const setItems = items => {
    const action = {
        type: ITEM_LIST,
        items,
    };
    // console.log('item_list_action', action);
    return action;
};

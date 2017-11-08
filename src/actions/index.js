import {LOG_IN, ITEM_LIST, MARK_FINISHED, DELETE_ITEM, UPDATE_ITEM, SET_LISTS, MARK_ACTIVE_LIST} from "../constants";

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

export const markFinished = id => {
    const action = {
        type: MARK_FINISHED,
        id,
    };
    return action;
};
export const deleteItem = id => {
    const action = {
        type: DELETE_ITEM,
        id,
    };
    return action;
};
export const updateItem = (id, key, val) => {
    const action = {
        type: UPDATE_ITEM,
        id,
        key,
        val,
    };
    return action;
};

export const setLists = lists => {
    const action = {
        type: SET_LISTS,
        lists,
    };
    return action;
};

export const markActiveList = id => {
    const action = {
        type: MARK_ACTIVE_LIST,
        id,
    };
    return action;
};

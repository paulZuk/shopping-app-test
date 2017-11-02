import { ITEM_LIST } from "../constants";

export default (state = [], action) => {
    switch (action.type) {
        case ITEM_LIST:
            const { items } = action;
            return items;
        default:
            return state;
    }
}
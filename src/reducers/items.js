import {DELETE_ITEM, ITEM_LIST, MARK_FINISHED, UPDATE_ITEM} from "../constants";

export default (state = [], action) => {
    switch (action.type) {
        case ITEM_LIST:

            const { items } = action;
            // console.log('items',items);
            return items;

        case MARK_FINISHED:

            let newState = state.map(item => {
                if(item.id === action.id) {
                    item.finished ? item.finished = false : item.finished = true;
                }
                return item;
            });
            // console.log('mfinished state', state);
            return newState;

        case DELETE_ITEM:

            newState = state.filter(item => {
               return item.id !== action.id;
            });
            console.log('delete item',newState);
            return newState;
            
        case UPDATE_ITEM: 

            newState = state.map(item => {
                if(item.id === action.id) {
                    Object.keys(item)
                        .forEach( key => {
                            if (key === action.key) {
                                item[key] = action.val
                            }
                        });
                }
                return item
            });
            console.log('update item', newState);
            return newState;

        default:
            return state;
    }
}
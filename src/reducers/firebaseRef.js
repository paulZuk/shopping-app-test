import { FB_LIST_NAME} from "../constants";

export default (state = "", action) => {
    switch(action.type) {
        case FB_LIST_NAME:
            return action.listName;
        default:
            return state;
    }
}
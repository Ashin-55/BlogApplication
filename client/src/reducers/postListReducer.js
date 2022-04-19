import {
  POST_LIST_FAIL,
  POST_LIST_REQUEST ,
  POST_LIST_SUCCESS,
} from "../constants/postConstants";

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true, post: [] };
    case POST_LIST_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

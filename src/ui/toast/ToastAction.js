import store from '../../store'

export const ADD_TOAST = "ADD_TOAST";
export const REMOVE_TOAST = "REMOVE_TOAST";

var id=0;

function createToast(options) {
    return {
      ...defaultOptions,
      ...options,
      id: id++
    }
  }

export function toasts(state = [], action) {
const { payload, type } = action;

switch (type) {
    case ADD_TOAST:
    return [payload, ...state];

    case REMOVE_TOAST:
    return state.filter(toast => toast.id !== payload);

    default:
    return state;
}
}

function addToast(options = {}) {
  return {
    payload: createToast(options),
    type: ADD_TOAST
  };
}

function removeToast(id) {
  return {
    payload: id,
    type: REMOVE_TOAST
  };
}

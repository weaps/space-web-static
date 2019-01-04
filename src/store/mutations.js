import * as types from "./mutation-types";

const mutations = {
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  [types.SET_PERMISSIONS](state, permissions) {
    state.permissions = permissions;
  },
};

export default mutations;

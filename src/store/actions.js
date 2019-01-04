import * as types from "./mutation-types";

export const setUserInfo = function({ commit }, account) {
  commit(types.SET_USER_INFO, account);
};
export const setPermissions = function({ commit }, permissions) {
  commit(types.SET_PERMISSIONS, permissions);
};

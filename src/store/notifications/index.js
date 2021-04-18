export const state = {
  notifications: [],
};

export const mutations = {
  ADD_NOTIFICATION(state, notification) {
    state.notifications = [...state.notifications, notification];
  },

  DELETE_NOTIFICATION(state, notificationKey) {
    state.notifications = state.notifications.filter(
      (n) => n.key !== notificationKey
    );
  },
};

export const actions = {
  show({ commit }, notification) {
    notification.key = Symbol('notification-key');

    commit('ADD_NOTIFICATION', notification);

    return notification.key;
  },

  closeNotification({ commit }, notificationKey) {
    commit('DELETE_NOTIFICATION', notificationKey);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

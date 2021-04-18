<template>
  <div class="notifications-container">
    <v-notification
      v-for="notification in notifications"
      :key="notification.key"
      :notification="notification"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Notification from '@/components/Notification/Notification';

export default {
  name: 'notification-manager',
  components: {
    'v-notification': Notification,
  },

  computed: {
    ...mapState('notifications', ['notifications']),
  },
};
</script>

<style>
.notifications-container {
  position: fixed;
  z-index: 9999;
  top: 150px;
  right: 4rem;
  pointer-events: none;
}
</style>

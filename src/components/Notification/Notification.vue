<template>
  <transition name="fade">
    <div :class="notificationClass" class="notification" @click="close">
      <div class="notification__message" v-html="notification.text"></div>

      <div class="notification__close" @click.stop="close">
        x
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'notification',
  props: {
    notification: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      isClosing: false,
    };
  },

  computed: {
    notificationClass() {
      const type = this.notification.type ? this.notification.type : 'info'; // error, warning, success
      return `notification--${type}`;
    },
  },

  mounted() {
    if (this.notification.timeout) {
      setTimeout(() => {
        this.close();
      }, this.notification.timeout);
    }
  },

  methods: {
    ...mapActions('notifications', ['closeNotification']),

    close() {
      if (!this.isClosing) {
        this.isClosing = true;
        setTimeout(() => {
          this.closeNotification(this.notification.key);
        }, 200);
      }
    },
  },
};
</script>

<style>
.notification {
  display: flex;
  position: relative;
  width: 215px;
  margin-bottom: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 16px;
  padding-right: 16px;
  color: white;
  background: cyan;
  box-shadow: 1, 0 0 #0000, 1, 0 0 #0000, 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.1875rem;
  pointer-events: auto;
}

.notification:hover {
  background: rgb(194, 23, 23);
  box-shadow: 5px 5px 5px rgb(70, 70, 70);
}

.notification:hover .notification__close {
  display: block;
}

.notification--error {
  background: rgb(233, 17, 17);
}

.notification--warning {
  background: rgb(211, 187, 0);
}

.notification--success {
  background: rgb(3, 181, 3);
}

.notification--info {
  background: blue;
}

.notification__close {
  flex-shrink: 0;
  position: absolute;
  display: none;
  width: 16px;
  height: 16px;
  top: 6px;
  right: 6px;
  font-size: 20px;
  color: white;
  font-weight: bold;
  opacity: 0.8;
  cursor: pointer;
}

.notification__message {
  padding-left: 16px;
  padding-right: 16px;
  cursor: default;
}
</style>

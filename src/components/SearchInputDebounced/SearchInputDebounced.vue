<template>
  <div>
    <div class="search-input-debounced">
      <input
        ref="input"
        class="input-debounced"
        type="text"
        :value="value"
        :placeholder="placeholder"
        @input="debounceInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.esc="onEscape"
      />

      <img class="search-icon" alt="searcher" src="@/assets/icons/search.svg" />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  name: 'search-input-debounced',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: '',
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    // eslint-disable-next-line vue/require-default-prop
    cb: {
      type: Function,
    },
    onFocus: {
      type: Function,
      default: () => {},
    },

    onBlur: {
      type: Function,
      default: () => {},
    },
    onEscape: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    // eslint-disable-next-line func-names
    debounceInput: debounce(function(e) {
      const { value } = e.target;

      // eslint-disable-next-line no-unused-expressions
      this.cb ? this.cb(value) : this.$emit('input', value);
    }, 1000),
  },
};
</script>

<style>
.search-input-debounced {
  position: relative;
  display: flex;
  align-items: center;
}

.input-debounced {
  height: 2rem;
  width: 100%;
  margin-bottom: 0.7rem;
  padding-left: 8px;
  padding-right: 32px;
  border: 1px solid rgb(201, 198, 198);
  border-radius: 5px;
  font-size: medium;
  color: blue;

}

.search-icon {
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 0.7rem;
  right: 0.5rem;
}
</style>

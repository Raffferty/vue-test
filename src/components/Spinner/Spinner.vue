<template>
  <div class="sc-loader">
    <span class="sc-loader__spinner" />
  </div>
</template>

<script>
export default {
  name: 'spinner',
};
</script>

<style>
.sc-loader {
  text-align: center;
}

.sc-loader__spinner {
  margin-right: 24px;
  border: none;
  background-color: transparent;
  height: 2.25em;
  padding: calc(0.375em - 1px) 0.75em;
  position: relative;
  display: inline-block;
  align-items: center;
  justify-content: center;
  box-shadow: var(#0000, 0 0 #0000), var(#0000, 0 0 #0000), 0 0 #0000;
  pointer-events: none;
  line-height: 1.5;
  font-size: '1.25rem';
  text-align: center;
  white-space: nowrap;
  user-select: none;
  color: transparent;
  vertical-align: top;
}

.sc-loader__spinner::after {
  border-width: 1px;
  border-style: solid;
  border-color: rgb(92, 11, 232);

  width: 1.5em;
  height: 1.5em;
  border-right-color: transparent;
  border-top-color: transparent;
  left: calc(50% - (1.5em / 2));
  top: calc(50% - (1.5em / 2));
}

.sc-loader__spinner::after {
  display: block;
  position: absolute !important;
  top: calc(50% - 0.5em);
  left: calc(50% - 0.5em);
  border-radius: 999999px;
  border-color: transparent transparent rgb(92, 11, 232) rgb(92, 11, 232);
  border-style: solid;
  border-width: 4px;
  content: '';
  height: 2em;
  width: 2em;
  animation: 0.5s linear infinite running rotateSpinner;
}

@keyframes rotateSpinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>

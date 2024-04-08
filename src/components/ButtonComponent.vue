<template>
  <button
    @click="buttonClick"
    class="w-24 h-12 md:w-32 md:h-12 bg-transparent hover:bg-primary-2 text-secondary hover:text-white font-semibold border border-secondary hover:border-transparent rounded"
  >
    <BeatLoader
      class="w-24 h-12 md:w-32 md:h-12 flex justify-center items-center"
      :loading="isLoading"
      :color="'#EEEEEE'"
      :size="'15px'"
    />
    <p v-show="!isLoading">
      <slot></slot>
    </p>
  </button>
</template>

<script>
import { BeatLoader } from 'vue3-spinner'

export default {
  name: 'ButtonComponent',
  components: { BeatLoader },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    buttonClick() {
      this.$emit('custom-click')
    }
  }
}
</script>

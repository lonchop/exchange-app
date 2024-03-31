<template>
  <div class="flex justify-center items-center p-2 md:p-8">
    <div v-if="isLoading" class="flex justify-center mt-12">
      <BounceLoader :loading="isLoading" :color="'#76ABAE'" :size="'100px'" />
    </div>
    <AssetsTableComponent v-if="!isLoading" v-bind:assets="assets" />
  </div>
</template>

<script>
import AssetsTableComponent from '@/components/AssetsTableComponent.vue'
import { getAssets } from '@/api'
import { BounceLoader } from 'vue3-spinner'

export default {
  name: 'HomeView',
  components: { AssetsTableComponent, BounceLoader },

  data() {
    return {
      isLoading: true,
      assets: []
    }
  },

  created() {
    this.isLoading = true
    this.getData()
    // api.getAssets().then((assets) => (this.assets = assets))
  },

  methods: {
    getData: async function () {
      try {
        this.assets = await getAssets()
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      } catch (err) {
        this.isLoading = false
      }
    }
  }
}
</script>

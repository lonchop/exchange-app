<template>
  <main>
    <HeaderComponent class="bg-primary" :links="links" />

    <RouterView />
  </main>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent
  },
  data() {
    return {
      links: [
        {
          title: 'BTC',
          to: { name: 'coin-detail', params: { id: 'bitcoin' } }
        },
        {
          title: 'ETH',
          to: { name: 'coin-detail', params: { id: 'ethereum' } }
        },
        {
          title: 'XRP',
          to: { name: 'coin-detail', params: { id: 'xrp' } }
        }
      ]
    }
  }
}
</script>

<style scoped></style>

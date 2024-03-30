<template>
  <div class="flex-col text-secondary p-2 md:p-8">
    <div v-if="isLoading" class="flex justify-center mt-12">
      <BounceLoader :loading="isLoading" :color="'#76ABAE'" :size="'100px'" />
    </div>
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center mt-12">
        <div class="flex flex-col items-center">
          <img
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ dollar(asset.priceUsd) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ dollar(min) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ dollar(max) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ dollar(avg) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ percent(asset.changePercent24Hr) }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-primary hover:bg-primary-2 text-white font-bold py-2 px-4 rounded"
            @click="toggleConverter"
          >
            {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal text-background-2"
                id="convertValue"
                type="number"
                :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
                v-model="convertValue"
              />
            </label>
          </div>

          <span class="text-xl">{{ convertResult }} {{ fromUsd ? asset.symbol : 'USD' }}</span>
        </div>
      </div>

      <line-chart
        class="mb-8 mt-16"
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="history.map((h) => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
      />

      <h3 class="text-xl mb-8 mt-16 text-center font-semibold">Mejores Ofertas de Cambio</h3>
      <table v-for="m in markets" :key="`${m.exchangeId}-${m.priceUsd}`" class="border-b w-full">
        <tr class="grid grid-cols-2 md:grid-cols-4 justify-center items-center">
          <td>
            <b class="text-yellow-600">{{ m.exchangeId }}</b>
          </td>
          <td>{{ dollar(m.priceUsd) }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <div class="flex justify-center items-center" v-if="!m.url">
              <ButtonComponent :is-loading="m.isLoading || false" @custom-click="getWebSite(m)">
                <slot>Obtener Link</slot>
              </ButtonComponent>
            </div>
            <div class="flex justify-center items-center h-12" v-else>
              <a
                class="text-xs md:text-base hover:underline text-primary cursor-pointer"
                :href="m.url !== 'No se encontró el link del exchange' ? m.url : null"
                target="_blank"
                >{{ m.url }}</a
              >
            </div>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import { getAsset, getAssetHistory, getMarkets, getExchange } from '@/api'
import { dollarFilter, percentFilter } from '@/utils/filters'
import { BounceLoader } from 'vue3-spinner'
import ButtonComponent from '@/components/ButtonComponent.vue'

export default {
  name: 'CoinDetail',
  components: { BounceLoader, ButtonComponent },

  data() {
    return {
      isLoading: true,
      asset: {},
      history: [],
      markets: [],
      fromUsd: true,
      convertValue: null
    }
  },

  computed: {
    min() {
      return Math.min(...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2)))
    },
    max() {
      return Math.max(...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2)))
    },
    avg() {
      return this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) / this.history.length

      // return Math.abs(...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2)))
    },
    convertResult() {
      if (!this.convertValue) {
        return 0
      }

      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd
      return result.toFixed(4)
    }
  },

  watch: {
    $route() {
      this.getCoin()
    }
  },

  created() {
    this.getCoin()
  },

  methods: {
    toggleConverter: function () {
      this.fromUsd = !this.fromUsd
    },

    getWebSite: async function (exchange) {
      // this.$set(exchange, 'isLoading', true)

      exchange.isLoading = true

      // return await getExchange(exchange.exchangeId)

      return getExchange(exchange.exchangeId)
        .then((res) => {
          // this.$set(exchange, 'url', res.exchangeUrl)
          exchange.url = res.exchangeUrl
        })
        .catch((error) => {
          // Captura y maneja el error aquí
          console.error('Error al obtener el sitio web del exchange:', error)
          exchange.url = 'No se encontró el link del exchange'
        })
        .finally(() => {
          exchange.isLoading = false
        })
    },
    getCoin() {
      const id = this.$route.params.id

      Promise.all([getAsset(id), getAssetHistory(id), getMarkets(id)])
        .then(([asset, history, markets]) => {
          this.asset = asset
          this.history = history
          this.markets = markets
        })
        .finally(
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        )
    },
    dollar: function (value) {
      return dollarFilter(value)
    },
    percent: function (value) {
      return percentFilter(value)
    }
  }
}
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>

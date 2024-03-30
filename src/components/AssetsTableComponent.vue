<template>
  <table class="w-full">
    <thead>
      <tr
        class="bg-gray-100 grid grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr] md:grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr_3fr] justify-center items-center rounded-3xl mt-12"
      >
        <th></th>
        <th :class="{ up: sortOrder === 1, down: sortOrder === -1 }">
          <span class="underline cursor-pointer" @click="changeSortOrder">Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="focus:outline-none py-2 px-4 block w-full appearance-none leading-normal bg-background-2 rounded-2xl text-white"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        class="hover:bg-background-2 text-secondary grid grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr] md:grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr_3fr] justify-center items-center rounded-3xl mt-4"
        v-for="asset in filteredAssets"
        v-bind:key="asset.id"
        @click="goToCoinMobile(asset.id)"
      >
        <td class="flex justify-center">
          <img
            class="w-6 h-6 md:w-10 md:h-10"
            v-bind:src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            v-bind:alt="asset.name"
          />
        </td>
        <td>
          <b># {{ asset.rank }}</b>
        </td>
        <td>
          <RouterLink
            class="hover:underline text-yellow-600"
            v-bind:to="{ name: 'coin-detail', params: { id: asset.id } }"
          >
            {{ asset.name }}
          </RouterLink>
          <small class="ml-1 text-gray-500">{{ asset.symbol }}</small>
        </td>
        <td>{{ dollar(asset.priceUsd) }}</td>
        <td>{{ dollar(asset.marketCapUsd) }}</td>
        <td :class="asset.changePercent24Hr.includes('-') ? 'text-red-600' : 'text-green-600'">
          {{ percent(asset.changePercent24Hr) }}
        </td>
        <td class="hidden sm:block">
          <ButtonComponent v-on:custom-click="goToCoin(asset.id)">
            <span>Detalles</span>
          </ButtonComponent>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { dollarFilter, percentFilter } from '@/utils/filters'
import ButtonComponent from '@/components/ButtonComponent.vue'

export default {
  name: 'AssetsTableComponent',

  components: { ButtonComponent },

  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      filter: '',
      sortOrder: 1,
      isMobile: false
    }
  },

  computed: {
    filteredAssets() {
      // if (!this.filter) {
      //   return this.assets
      // }

      const altOrder = this.sortOrder === 1 ? -1 : 1

      return this.assets
        .filter(
          (a) =>
            a.name.toLowerCase().includes(this.filter.toLowerCase()) ||
            a.symbol.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder
          }
          return altOrder
        })
    }
  },

  mounted() {
    // Establecer inicialmente el estado isMobile
    this.updateIsMobile()

    // Añadir listener para cambios de tamaño
    window.addEventListener('resize', this.updateIsMobile)
  },
  beforeUnmount() {
    // Limpiar el listener cuando el componente se destruya
    window.removeEventListener('resize', this.updateIsMobile)
  },

  methods: {
    dollar: function (value) {
      return dollarFilter(value)
    },
    percent: function (value) {
      return percentFilter(value)
    },
    // * Forma programática para ir a un link
    goToCoin: function (id) {
      console.log('go to coin')
      this.$router.push({ name: 'coin-detail', params: { id } })
    },
    changeSortOrder: function () {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1
    },
    goToCoinMobile: function (id) {
      if (this.isMobile) {
        this.$router.push({ name: 'coin-detail', params: { id } })
      }
    },
    updateIsMobile: function () {
      // Actualizar el estado basado en el ancho de la ventana
      this.isMobile = window.innerWidth < 768
    }
  }
}
</script>

<style scoped>
.up::before {
  content: '👆';
}

.down::before {
  content: '👇';
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>

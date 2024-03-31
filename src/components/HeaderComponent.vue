<template>
  <header class="shadow w-full flex justify-center sm:justify-start">
    <nav class="flex items-center justify-between flex-wrap p-6 w-full">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <IconComponent class="mr-2" />
        <RouterLink
          class="font-semibold text-xl tracking-tight text-background-2"
          :to="{ name: 'home' }"
          >Exchange App</RouterLink
        >
      </div>

      <div class="hidden w-full sm:block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <router-link
            v-for="l in links"
            :key="l.title"
            :to="l.to"
            class="block mt-4 lg:inline-block lg:mt-0 text-secondary hover:text-background mr-4"
            >{{ l.title }}</router-link
          >
        </div>
      </div>

      <div>
        <!-- <button @click="changeLanguage">{{ $t('button.change_language') }}</button> -->
        <ButtonComponent v-on:custom-click="changeLanguage()">
          <span>{{ $t('button.change_language') }}</span>
        </ButtonComponent>
      </div>
    </nav>
  </header>
</template>

<script>
import IconComponent from './IconComponent.vue'
import ButtonComponent from './ButtonComponent.vue'

export default {
  name: 'HeaderComponent',
  components: { IconComponent, ButtonComponent },

  props: {
    links: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    changeLanguage: function () {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'es' : 'en'
    }
  }
}
</script>

<template>
  <div class="main-container">
    <tags-view></tags-view>
    <!-- <app-main/> -->
    <section class="app-main">
      <transition name="fade-transform"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </section>
  </div>
</template>
<script>
import { TagsView } from './components'
export default {
  name: 'thirdparty',
  components: {
    TagsView
  },
  data() {
    return {};
  },
  mounted() {
    this.clear()
  },
  methods: {
    clear() {
      console.log("clear")
      this.$store.dispatch('delAllViews')
      this.$store.dispatch('addView', this.$route)
    }
  }
};
</script>
<style>
</style>
<template>
    <div class="main-container">
      <tags-view></tags-view>
      <!-- <app-main/> -->
        <section class="app-main">
            <transition name="fade-transform" mode="out-in">
                <router-view></router-view>
            </transition>
        </section>
    </div>
</template>
<script>
import { TagsView } from './components'

export default {
    name: 'coresearch',
    components: {
        TagsView
    }
    
}
</script>
<style>
</style>
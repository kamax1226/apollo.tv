<template>
  <div>
    <div class="sports_search"/>
    <Home />
    <Category />
    <notifications group="all" />
  </div>
</template>

<script>
import { core } from '../../../assets/app/app'
import Home from '../../../components/frontend/sport-category/Home'
import Category from '../../../components/frontend/sport-category/category'
export default {
  layout: 'FrontendLayout',
  components: {
    Home,
    Category
  },
  data() {
    return {}
  },
  mounted () {
    setTimeout(function () {
      core.index()
    }, 1000)
  }
}
</script>

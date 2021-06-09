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
import Banner from '../../../components/frontend/channel-category/banner'
import Home from '../../../components/frontend/channel-category/Home'
import Category from '../../../components/frontend/channel-category/category'
export default {
  layout: 'FrontendLayout',
  components: {
    Banner,
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

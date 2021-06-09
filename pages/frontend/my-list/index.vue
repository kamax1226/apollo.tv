<template>
  <div>
    <div class="sports_search"/>
    <Home />
    <Tabs />
    <notifications group="all" />
  </div>
</template>

<script>
import { core } from '../../../assets/app/app'
import Home from '../../../components/frontend/my-list/Home'
import Tabs from '../../../components/frontend/my-list/Tabs'
export default {
  layout: 'FrontendLayout',
  components: {
    Home,
    Tabs
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

<template>
  <div>
    <div class="sports_search"/>
    <Home />
    <Panel />
  </div>
</template>

<script>
import { core } from '../../../assets/app/app'
import Home from '../../../components/frontend/tv-guide/Home'
import Panel from '../../../components/frontend/tv-guide/panel'
export default {
  layout: 'FrontendLayout',
  components: {
    Home,
    Panel
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

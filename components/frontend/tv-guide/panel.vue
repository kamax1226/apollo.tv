<template>
  <section id="iq-trending" class="s-margin">
    <b-container fluid>
      <b-row>
        <b-col sm="12" class="">
          <PanelChannel @channelselected="onChannelSelected" />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import Vue from 'vue'
import MovieOverview from '../../../config/MovieOverview'
import Slick from '../../../components/core/slider/Slick'
import PanelChannel from './panelchannel.vue';
export default {
  name: 'Details',
  components: {
    Slick,
    PanelChannel,
  },
  data () {
    return {
      items: MovieOverview,
      trendingOption: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '#trending-slider-nav'
      },
      columns: [
        { label: 'start', key: 'start', class: 'text-left' },
        { label: 'end', key: 'end', class: 'text-left' },
        { label: 'title', key: 'title', class: 'text-left' },
      ],
      rows: [],
      title: '',
      guideloading: false,
    }
  },
  mounted () {
    const tabEl = document.getElementsByClassName('tranding-tab-nav')
    Array.from(tabEl).map((elem) => {
      elem.addEventListener('click', function (e) {
        e.target.closest('.tranding-tab-nav').getElementsByClassName('show')[0].classList.remove('show')
        e.target.classList.add('show')
      })
    })
  },
  methods: {
    onChannelSelected(item) {
      this.title = item.title;
      this.guideloading = true;
      this.$store.dispatch("loadChannelGuide", { id: item.name })
        .then(res => {
          if(res == null || res == undefined || res.length == 0) return [];
          
          let guiderows = [];
          for(let i = 0; i < res.length; i++) {
            guiderows.push({
              id: i + 1,
              start: Vue.prototype.dateParse((res[i].start.split(' '))[0]),
              end: Vue.prototype.dateParse((res[i].stop.split(' '))[0]),
              title: res[i].title
            });
          }
          this.rows = guiderows;
          return guiderows;
      });
    }
  }
}
</script>

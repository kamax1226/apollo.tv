<template>
  <section id="iq-trending" class="s-margin">
    <b-container fluid>
      <b-row>
        <b-col sm="12" class=" overflow-hidden">
          <div class="trending-contens">
            <Slick id="trending-slider" class="list-inline p-0 m-0  d-flex align-items-center" :option="trendingOption">
              <li v-for="(item,index) in items" :key="index">
                <div class="tranding-block position-relative" :style="{backgroundImage:`url(${require('../../../assets/images/frontend/trending/05.jpg')})`}">
                  <div class="trending-custom-tab">
                    <div class="tab-title-info position-relative  panel_height">
                      <div class="tab-title-info position-relative">
                        <ul
                          class="trending-pills tranding-tab-nav d-flex nav nav-pills justify-content-center align-items-center text-center"
                          role="tablist"
                        >
                          <li class="nav-item">
                            <a class="nav-link active show" data-toggle="pill" href="#trending-data1" role="tab" aria-selected="true">My Movies</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" data-toggle="pill" href="#trending-data2" role="tab" aria-selected="false">Years</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" data-toggle="pill" href="#trending-data3" role="tab" aria-selected="false">New Episodes</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" data-toggle="pill" href="#trending-data4" role="tab" aria-selected="false">TV Calendar</a>
                          </li>
                        </ul>
                      </div>
                      <div class="trending-content">
                        <div id="trending-data1" class="overview-tab tab-pane fade active show">
                          <PanelFavorite />
                        </div>

                        <div id="trending-data2" class="overlay-tab tab-pane fade">
                          <PanelYear />
                        </div>

                        <div id="trending-data3" class="overlay-tab tab-pane fade">
                          <PanelEpisodeNew />
                        </div>

                        <div id="trending-data4" class="overlay-tab tab-pane fade">
                          <PanelEpisodeDate />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </Slick>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import MovieOverview from '../../../config/MovieOverview'
import Slick from '../../../components/core/slider/Slick'
import PanelSearch from './panelsearch.vue';
import PanelFavorite from './panelfavorite.vue';
import PanelYear from './panelyear.vue';
import PanelEpisodeNew from './panelepisodenew.vue';
import PanelEpisodeDate from './panelepisodedate.vue';
export default {
  name: 'Details',
  components: {
    Slick,
    PanelSearch,
    PanelFavorite,
    PanelYear,
    PanelEpisodeNew,
    PanelEpisodeDate
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
      }
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
  }
}
</script>

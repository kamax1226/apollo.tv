<template>
<section class="container-fluid seasons search-seasons">
    <div class="page-title-div">
        <hr class="left">
        <p class="page-title">SEARCH</p>
        <hr class="right">
    </div>
    <ul class="trending-pills d-flex nav nav-pills align-items-center text-center tab-lists" role="tablist">
        <li class="nav-item" @click="updateTab(0)">
            <a class="nav-link active show" data-toggle="pill" href="#tab-data1" role="tab" aria-selected="true">Movies</a>
        </li>
        <li class="nav-item" @click="updateTab(1)">
            <a class="nav-link" data-toggle="pill" href="#tab-data2" role="tab" aria-selected="false">TV shows</a>
        </li>
        <li class="nav-item" @click="updateTab(2)">
            <a class="nav-link" data-toggle="pill" href="#tab-data3" role="tab" aria-selected="false">Sports VOD</a>
        </li>
        <li class="nav-item" @click="updateTab(3)">
            <a class="nav-link" data-toggle="pill" href="#tab-data4" role="tab" aria-selected="false">Channels</a>
        </li>
    </ul>
    <div class="tab-content">
        <div id="tab-data1" class="overview-tab tab-pane fade active show">
            <PanelMovieSearch />
        </div>

        <div id="tab-data2" class="overlay-tab tab-pane fade">
            <PanelTvShowSearch />
        </div>

        <div id="tab-data3" class="overlay-tab tab-pane fade">
            <PanelSportSearch />
        </div>

        <div id="tab-data4" class="overlay-tab tab-pane fade">
            <PanelChannelSearch />
        </div>
    </div>
</section>
</template>

<script>
import Slick from '../../../components/core/slider/Slick'
import PanelMovieSearch from './panelmoviesearch.vue'
import PanelTvShowSearch from './paneltvshowsearch.vue'
import PanelChannelSearch from './panelchannelsearch.vue'
import PanelSportSearch from './panelsportsearch.vue'
export default {
    name: 'Tabs',
    props: {},
    components: {
        Slick,
        PanelMovieSearch,
        PanelTvShowSearch,
        PanelChannelSearch,
        PanelSportSearch
    },
    mounted() {
        document.getElementsByClassName('nav-link')[this.tabActive].classList.add('show');
    },
    data() {
        return {
            tabActive: 0,
        }
    },
    methods: {
        updateTab(index) {
            document.getElementsByClassName('nav-link')[this.tabActive].classList.remove('show');
            document.getElementsByClassName('nav-link')[index].classList.add('show');
            this.tabActive = index;
        },
    }
}
</script>

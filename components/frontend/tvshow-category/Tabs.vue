<template>
   <section class="container-fluid seasons">
        <ul class="trending-pills d-flex nav nav-pills align-items-center text-center s-margin tab-lists apollo-margin" role="tablist">
            <li class="nav-item" @click="updateTab(0)">
                <a class="nav-link active show" data-toggle="pill" href="#tab-data1" role="tab" aria-selected="true">TV Shows List</a>
            </li>
            <li class="nav-item" @click="updateTab(1)">
                <a class="nav-link" data-toggle="pill" href="#tab-data2" role="tab" aria-selected="false">Years</a>
            </li>
            <li class="nav-item" @click="updateTab(2)">
                <a class="nav-link" data-toggle="pill" href="#tab-data3" role="tab" aria-selected="false">New Episodes</a>
            </li>
            <li class="nav-item" @click="updateTab(3)">
                <a class="nav-link" data-toggle="pill" href="#tab-data4" role="tab" aria-selected="false">TV Calendar</a>
            </li>
         </ul>
         <div class="tab-content">
            <div id="tab-data1" class="overview-tab tab-pane fade active show">
                <Category />
            </div>

            <div id="tab-data2" class="overlay-tab tab-pane fade">
                <PanelYear />
            </div>

            <div id="tab-data3" class="overlay-tab tab-pane fade">
                <PanelEpisodeNew />
            </div>

            <div id="tab-data4" class="overlay-tab tab-pane fade">
                <PanelEpisodeDate />
            </div>
        </div>
    </section>
</template>
<script>
import Category from  './category';
import PanelYear from './panelyear.vue';
import PanelEpisodeNew from './panelepisodenew.vue';
import PanelEpisodeDate from './panelepisodedate.vue';
export default {
    name: 'Tabs',
    props: {
    },
    components: {
        Category,
        PanelYear,
        PanelEpisodeNew,
        PanelEpisodeDate
    },
    mounted () {
        document.getElementsByClassName('nav-link')[this.tabActive].classList.add('show');
    },
    data () {
        return {
            tabActive: 0,
        }
    },
    methods: {
        updateTab (index) {
            document.getElementsByClassName('nav-link')[this.tabActive].classList.remove('show');
            document.getElementsByClassName('nav-link')[index].classList.add('show');
            this.tabActive = index;
        },
    }
}
</script>

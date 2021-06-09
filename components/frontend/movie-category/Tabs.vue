<template>
   <section class="container-fluid seasons">
        <ul class="trending-pills d-flex nav nav-pills align-items-center text-center s-margin tab-lists apollo-margin" role="tablist">
            <li class="nav-item" @click="updateTab(0)">
                <a class="nav-link active show" data-toggle="pill" href="#tab-data1" role="tab" aria-selected="true">Movies</a>
            </li>
            <li class="nav-item" @click="updateTab(1)">
                <a class="nav-link" data-toggle="pill" href="#tab-data2" role="tab" aria-selected="false">Years</a>
            </li>
         </ul>
         <div class="tab-content">
            <div id="tab-data1" class="overview-tab tab-pane fade active show">
                <Category />
            </div>

            <div id="tab-data2" class="overlay-tab tab-pane fade">
                <PanelYear />
            </div>
        </div>
    </section>
</template>
<script>
import Category from './category.vue';
import PanelYear from './panelyear.vue';
export default {
    name: 'Tabs',
    props: {
    },
    components: {
        Category,
        PanelYear
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

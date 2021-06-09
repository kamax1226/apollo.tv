<template>
<div v-if="$fetchState.pending">
    <div class="loadingio-spinner-dual-ring-v9pna4viv1db page-detail">
        <div class="ldio-1b03m6p5bfr">
            <div></div>
            <div>
                <div></div>
            </div>
        </div>
    </div>
</div>
<p v-else-if="$fetchState.error">Error while fetching tvshows</p>
<div v-else class="show-single-container">
    <Banner :data="bannerData" />
    <div class="main-content">
        <Detail :data="detailData" />
        <Sesson :data="sessonData" />
    </div>
</div>
</template>

<script>
import Banner from '../../../components/frontend/show-single/Banner'
import Detail from '../../../components/frontend/show-single/Detail'
import Sesson from '../../../components/frontend/show-single/Sesson'
export default {
    layout: 'FrontendLayout',
    name: 'SinglePage',
    components: {
        Banner,
        Detail,
        Sesson
    },
    data() {
        return {
            detailData: {
                title: '',
                seasons: '',
                year: '',
                desc: ''
            },

            bannerData: {
                poster: ''
            },

            sessonData: {
                seasons: '',
                episodes: []
            }
        }
    },
    async fetch() {
        let query = this.$route.query;
        let data = {
            imdb_id: query.imdb_id
        };
        let showItem = await this.$store.dispatch("loadTvShowItem", data);
        
        this.detailData.title = showItem.title;
        this.detailData.year = showItem.year;
        this.detailData.seasons = showItem.meta.seasons.length;
        this.detailData.desc = showItem.meta.plot;
        this.detailData.imdb_id = query.imdb_id;
        this.detailData.is_favorite = showItem.is_favorite;

        this.sessonData.imdb_id = query.imdb_id;
        this.sessonData.seasons = showItem.meta.seasons;
        this.sessonData.episodes = showItem.meta_episodes;

        this.bannerData.imdb_id = query.imdb_id;
        this.bannerData.season = showItem.meta_episodes.length;
        this.bannerData.episode = showItem.meta_episodes[showItem.meta_episodes.length - 1].length;
        this.bannerData.poster = showItem.meta.fanart == null ? showItem.meta.banner : showItem.meta.fanart;
    },
    mounted() {}
}
</script>

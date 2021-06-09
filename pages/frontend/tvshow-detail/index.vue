<template>
<div v-if="$fetchState.pending">
    <div class="loadingio-spinner-dual-ring-v9pna4viv1d page-detail">
        <div class="ldio-1b03m6p5bfr">
            <div></div>
            <div>
                <div></div>
            </div>
        </div>
    </div>
</div>
<p v-else-if="$fetchState.error">Error while fetching tvshows</p>
<div v-else class="video-detail">
    <div v-if="!this.isMKV" class="video-js-responsive-container vjs-hd">
        <vplayer ref="videoPlayer" class="vjs-default-skin vjs-big-play-centered" :options="playerOptions" @play="onPlayerPlay($event)" @ready="onPlayerReady($event)" />
    </div>
    <div v-else class="video-js-responsive-container vjs-hd suggest-div">
        <h3 class="suggest-text">Web player doesn't support mkv files, please download it and open with your player</h3>
        <a :href="this.playSrc" class="btn btn-primary download-btn">Download</a>
    </div>
    <InfoVideo v-if="infoData" :data="infoData" />
</div>
</template>

<script>
import Vue from 'vue'
import vplayer from '../../../components/core/videoplayer/v-player.vue'
import { core } from '../../../assets/app/app'
import InfoVideo from '../../../components/frontend/tvshow-detail/infovideo.vue'

export default {
    layout: 'FrontendLayout',
    name: 'TvshowDetail',
    components: {
        vplayer,
        InfoVideo
    },
    data() {
        return {
            playSrc: '',
            infoData: {
                title: "",
                duration: "",
                date: "",
                desc: "",
            },
            playerOptions: {
                autoplay: false,
                controls: true,
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true
                }
            },
            isMKV: false,
        }
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player
        }
    },
    async fetch() {
        let query = this.$route.query;
        let data1 = {
            imdb_id: query.imdb_id
        };
        let showItem = await this.$store.dispatch("loadTvShowItem", data1);

        let data2 = {
            imdb_id: query.imdb_id,
            season: query.season,
            episode: query.episode,
        };

        this.playSrc = await this.$store.dispatch("loadTvShowSrc", data2);
        this.isMKV = Vue.prototype.isMKV(this.playSrc);

        this.infoData.title = showItem.title;
        this.infoData.duration = "tvshow";
        this.infoData.date = showItem.meta.year;
        this.infoData.desc = showItem.meta.plot;
        this.infoData.is_favorite = showItem.is_favorite;
        console.log("showItem: " + showItem.is_favorite)
        this.infoData.imdb_id = query.imdb_id;
    },
    mounted() {
        core.index();
    },
    methods: {
        onPlayerPlay(player) {
            console.log('player play!', player)
        },
        onPlayerReady(player) {
            console.log('player ready!', player)
            const video = {
                withCredentials: false,
                type: Vue.prototype.getVideoType(this.playSrc),
                src: this.playSrc
            };
            this.player.src(video);
            this.player.play();
        },
    },

    fetchOnServer: false
}
</script>

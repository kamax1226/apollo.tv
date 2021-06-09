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
import {
    core
} from '../../../assets/app/app'
import InfoVideo from '../../../components/frontend/sport-detail/infovideo.vue'

export default {
    layout: 'FrontendLayout',
    name: 'SportDetail',
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
        let data = {
            id: query.id
        };
        let item = await this.$store.dispatch("loadSportItem", data);

        this.playSrc = await this.$store.dispatch("loadSportSrc", data);
        this.isMKV = Vue.prototype.isMKV(this.playSrc);

        this.infoData.poster = item.category.logo_url;
        this.infoData.title = item.title;
        this.infoData.duration = Vue.prototype.getDuration(item.duration);
        this.infoData.date = (item.event_date.split("T"))[0];
        this.infoData.is_favorite = item.is_favorite;
        this.infoData.id = item.id;
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

<template>
<section class="banner-wrapper overlay-wrapper iq-main-slider" :style="{ backgroundImage: `url(${bannerData.poster})` }">
    <div class="banner-caption">
        <div class="position-relative mb-4">
            <nuxt-link :to="{ path: '/frontend/tvshow-detail', 
                  query: {
                  imdb_id: bannerData.imdb_id,
                  season: bannerData.season,
                  episode: bannerData.episode
                  } }"  class="d-flex align-items-center">
                <div class="play-button">
                    <i class="fa fa-play"></i>
                </div>
                <h4 class="w-name text-white font-weight-700">Watch latest Episode</h4>
            </nuxt-link>
        </div>
    </div>
</section>
</template>

<script>
export default {
    name: 'Banner',
    components: {},
    props: {
        data: {
            type: Object,
            required: false
        }
    },
    mounted() {},
    data() {
        return {
            bannerData: this.data,
        }
    }
}
</script>

<template>
<section class="iq-main-slider p-0">
    <div v-if="$fetchState.pending">
        <div class="loadingio-spinner-dual-ring-v9pna4viv1d">
            <div class="ldio-1b03m6p5bfr">
                <div></div>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
    <p v-else-if="$fetchState.error">Error while fetching movies</p>
    <Slick v-else id="tvshows-slider" :option="sliderOption">
        <div v-for="(item,index) in sliderData" :key="index">
            <div class="shows-img">
                <img :src="item.poster" loading="lazy" class="banner_slider" alt="" v-lazy-load>
                <div class="shows-content">
                    <h4 class="text-white mb-1">{{item.title}}</h4>
                    <div class="movie-time d-flex align-items-center">
                        <div class="badge badge-secondary p-1 mr-2">{{item.vote}}+</div>
                        <span class="text-white">{{item.name}}</span>
                        <nuxt-link :to="{ path: '/frontend/show-single', query: { imdb_id: item.imdb_id} }" class="hover-buttons">
                            <span class="btn btn-hover"><i class="fa fa-play mr-1" aria-hidden="true" />
                                View Detail</span>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </Slick>
</section>
</template>

<script>
import Slick from '../../../components/core/slider/Slick'

export default {
    name: 'Banner',
    components: {
        Slick
    },
    mounted() {},
    async fetch() {
        this.sliderData = await this.$store.dispatch("loadTvShowBanner");
    },
    data() {
        return {
            sliderData: [],
            sliderOption: {
                centerMode: true,
                centerPadding: '100px',
                slidesToShow: 3,
                //nextArrow: '<button class="NextArrow"><i class="ri-arrow-right-s-line"></i></button>',
                //prevArrow: '<button class="PreArrow"><i class="ri-arrow-left-s-line"></i></button>',
                //arrows: true,
                dots: false,
                responsive: [{
                        breakpoint: 991,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '20px',
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '20px',
                            slidesToShow: 1
                        }
                    }
                ]
            }
        }
    }
}
</script>

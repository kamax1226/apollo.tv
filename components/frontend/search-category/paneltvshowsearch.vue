<template>
<section>
    <b-container>
        <b-row>
            <b-col sm="12" class="overflow-hidden">
                <div class="trending-info align-items-center w-100 animated fadeInUp">
                    <div class="iq-search-bar ml-auto">
                        <form class="searchbox page-search" @submit.stop.prevent="submitSearch">
                            <input v-model="searchKeyword" type="text" class="text search-input" style="cursor: pointer" placeholder="Search Here...">
                            <a class="search-link" style="text-align: end; z-index: -1;">
                                <i class="ri-search-line" />
                            </a>
                        </form>
                    </div>

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
                    <p v-else-if="$fetchState.error">Error while fetching tvshows</p>
                    <div v-else>
                        <div class="iq-main-header d-flex align-items-center justify-content-between">
                            <h4 class="main-title">

                            </h4>
                            <div class="d-flex slick-aerrow-block">
                                <button v-if="this.items.length > 0" class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: block;" @click="prev()">
                                </button>
                                <button v-if="this.items.length > 0" class="slick-next slick-arrow" aria-label="Next" type="button" style="display: block;" @click="next()">
                                </button>
                            </div>
                        </div>
                        <div class="favorites-contents">
                            <VueSlickCarousel v-if="this.items.length > 0" class="favorites-slider list-inline  row p-0 mb-0" ref="dSlick" v-bind="sliderOption">
                                <li v-for="(item,index) in items" :key="index" class="slide-item">
                                    <nuxt-link :to="{ path: '/frontend/show-single', query: { imdb_id: item.imdb_id } }" >
                                        <div class="block-images position-relative">
                                            <div class="img-box">
                                                <img :src="item.poster" loading="lazy" class="img-fluid" alt="" v-lazy-load>
                                                <img v-if="!item.is_favorite" src="../../../assets/images/bookmark-false.png" class="bookmark-image">
                                                <img v-else src="../../../assets/images/bookmark-true.png" class="bookmark-image">
                                                <div class="item-info">
                                                    <div class="item-rank">
                                                        <div class="rank-div">
                                                            <img src="../../../assets/images/ic-rank.png" class="rank-image">
                                                        </div>
                                                        <div class="rank-text">{{ item.rank }}</div>
                                                    </div>
                                                    <div class="item-vote">
                                                        <div class="vote-div">
                                                            <img src="../../../assets/images/ic-vote.png" class="vote-image">
                                                        </div>
                                                        <div class="vote-text">{{ item.vote }}+</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="block-description">
                                                <nuxt-link :to="{ path: '/frontend/show-single', query: { imdb_id: item.imdb_id } }"  class="hover-buttons">
                                                    <div class="play-button-div">
                                                        <!-- <img src="../../../assets/images/play-button.png"> -->
                                                        <div class="play-video">
                                                            <a class="video-open playbtn">
                                                                <!-- <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="80px" height="80px" viewBox="0 0 213.7 213.7" enable-background="new 0 0 213.7 213.7" xml:space="preserve">
                                                                    <polygon class="triangle" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="73.5,62.5 148.5,105.8 73.5,149.1 " />
                                                                    <circle class="circle" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="106.8" cy="106.8" r="103.3" />
                                                                </svg> -->
                                                            </a>
                                                        </div>
                                                    </div>
                                                </nuxt-link>
                                                <div class="movie-time d-flex align-items-center my-2 align-self-center">
                                                    <h6>{{ item.title }}</h6>
                                                </div>
                                                <div class="movie-time d-flex align-items-center my-2 align-self-center">
                                                    <span class="text-white">{{ item.name }}</span>
                                                </div>
                                                <div class="movie-bookmark d-flex align-items-center my-2 align-self-center">
                                                    <img v-if="!item.is_favorite" src="../../../assets/images/bookmark-false.png" class="">
                                                    <img v-else src="../../../assets/images/bookmark-true.png" class="">
                                                </div>
                                            </div>
                                        </div>
                                    </nuxt-link>
                                </li>
                            </VueSlickCarousel>
                            <h5 v-else>No Search Result</h5>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
export default {
    name: 'PanelSearch',
    components: {
        VueSlickCarousel
    },

    async fetch() {
        let data = {
            keyword: this.searchKeyword.length > 0 ? this.searchKeyword : ' ',
            limit: 20
        };
        this.items = await this.$store.dispatch("loadSearchTvShowList", data);
    },
    data() {
        return {
            searchKeyword: '',
            items: [],
            sliderOption: {
                dots: false,
                arrows: false,
                infinite: true,
                speed: 300,
                autoplay: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [{
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            },
        }
    },
    computed: {},
    mounted() {},
    methods: {
        submitSearch() {
            this.$fetch();
        },
        next() {
            this.$refs.dSlick.next()
        },
        prev() {
            this.$refs.dSlick.prev()
        },
        add_favorite(id) {
            this.$confirm({
                message: `Do you want to add this item to your favorites?`,
                button: {
                    no: 'No',
                    yes: 'Yes'
                },
                callback: confirm => {
                    if (confirm) {
                        this.$store.dispatch("tvshowAddFavorite", {
                                id: id
                            })
                            .then(res => {
                                if (res) {
                                    this.$notify({
                                        group: 'all',
                                        type: 'success',
                                        title: 'Success',
                                        text: 'Adding favorite success'
                                    });
                                    this.$fetch();
                                } else {
                                    this.$notify({
                                        group: 'all',
                                        type: 'warn',
                                        title: 'Success',
                                        text: 'Adding favorite failed'
                                    });
                                }
                            });
                    }
                }
            })
        },
        remove_favorite(id) {
            this.$confirm({
                message: `Do you want to remove this item from your favorites?`,
                button: {
                    no: 'No',
                    yes: 'Yes'
                },
                callback: confirm => {
                    if (confirm) {
                        this.$store.dispatch("tvshowRemoveFavorite", {
                                id: id
                            })
                            .then(res => {
                                if (res) {
                                    this.$notify({
                                        group: 'all',
                                        type: 'success',
                                        title: 'Success',
                                        text: 'Removing favorite success'
                                    });
                                    this.$fetch();
                                } else {
                                    this.$notify({
                                        group: 'all',
                                        type: 'warn',
                                        title: 'Success',
                                        text: 'Removing favorite failed'
                                    });
                                }
                            });
                    }
                }
            })
        }
    },
    fetchOnServer: false
}
</script>

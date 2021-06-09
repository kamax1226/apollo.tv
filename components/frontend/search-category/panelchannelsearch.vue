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
                    <div>
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
                        <p v-else-if="$fetchState.error">Error while fetching channels</p>
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
                                        <div>
                                            <div class="block-images position-relative">
                                                <div class="media align-items-center custom-block">
                                                    <div class="iq-movie">
                                                        <img v-if="item.poster != null" :src="item.poster" loading="lazy" class="img-border-radius img-fluid" alt="" v-lazy-load>
                                                        <img v-else :src="require('../../../assets/images/tv-default.jpg')" loading="lazy" class="img-border-radius img-fluid" alt="" v-lazy-load>
                                                    </div>
                                                    <div class="media-body">
                                                        <p class="mb-0">
                                                            {{ item.title }}
                                                        </p>
                                                        <small>{{ item.date }}</small>
                                                    </div>
                                                    <div class="bookmark-div">
                                                        <img v-if="!item.is_favorite" src="../../../assets/images/bookmark-false.png" class="bookmark-image-sports">
                                                        <img v-else src="../../../assets/images/bookmark-true.png" class="bookmark-image-sports">
                                                    </div>
                                                </div>
                                                <div class="block-description description-sports">
                                                    <p>{{ item.title }}</p>
                                                    <nuxt-link :to="{ path: '/frontend/channel-detail', query: { id: item.id } }"  class="hover-buttons">
                                                        <span class="btn btn-hover"><i class="fa fa-play mr-1" aria-hidden="true" />
                                                            Play Now</span>
                                                    </nuxt-link>
                                                    <div class="bookmark-div">
                                                        <img v-if="!item.is_favorite" src="../../../assets/images/bookmark-false.png" @click="add_favorite(item.id)" class="bookmark-image-sports">
                                                        <img v-else src="../../../assets/images/bookmark-true.png" @click="remove_favorite(item.id)" class="bookmark-image-sports">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </VueSlickCarousel>
                                <h5 v-else>No Search Result</h5>
                            </div>
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
        this.items = await this.$store.dispatch("loadSearchChannelList", data);
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
                        this.$store.dispatch("channelAddFavorite", {
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
                        this.$store.dispatch("channelRemoveFavorite", {
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

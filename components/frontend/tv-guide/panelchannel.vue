<template>
<section>
    <!--<div class="align-items-center w-100 animated fadeInUp">
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
        <div v-else class="guide-div">
            <div class="select-guide">
                <div class="select-description-guide">
                    Select Channel
                </div>
                <div class="sea-epi iq-custom-select d-inline-block">
                    <V-select v-model="selected" @input="setSelected" :options="channelOptions" />
                </div>
            </div>
            <div class="favorites-contents">
                <ChannelList :filteredChannelList="items" />
            </div>
        </div>
    </div>-->
    <client-only>
        <ChannelList :filteredChannelList="items" />
    </client-only>
</section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import ChannelList from '../../core/tv-guide/ChannelList'
export default {
    name: 'PanelChannel',
    components: {
        VueSlickCarousel,
        ChannelList
    },

    async fetch() {
        let data = {
            limit: 20
        };

        this.categoryList = await this.$store.dispatch("loadChannelCategoryList");
        this.categoryList.forEach((item, index) => {
            this.channelOptions.push({
                id: item.id,
                value: item.id,
                text: item.name
            });
            if (index == 0) {
                this.selected = '' + item.id;
                this.setChannels(item.id);
            }
        });
    },
    data() {
        return {
            items: [],
            categoryList: [],
            channelOptions: [],
            selected: -1,
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
        next() {
            this.$refs.dSlick.next()
        },
        prev() {
            this.$refs.dSlick.prev()
        },
        add_favorite(id) {
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
        },
        remove_favorite(id) {
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
        },

        handleAfterChange(current) {
            this.$emit('channelselected', this.items[current]);
        },

        setSelected(value) {
            this.setChannels(value);
        },

        setChannels(id) {
            this.items = [];

      const data = {
        category_id: id, 
        limit: 100,
        offset: 0,
        guide: 1,
      };

            this.$store.dispatch("loadCategoryChannelList", data)
                .then(res => {
                    if (res == null || res == undefined || res.length == 0) return;

                    this.items = res;
                    this.$emit('channelselected', this.items[0]);
                });
        }
    },
    fetchOnServer: false
}
</script>

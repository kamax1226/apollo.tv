<template>
<section class="container-fluid">
    <b-row>
        <b-col lg="12">
            <div class="trending-info g-border">
                <div class="d-flex">
                    <h1 class="trending-text mt-0">{{ detailData.title }}</h1>
                    <img :src="require(`../../../assets/images/${imgSrc}.png`)" class="detail-bookmark" @click="manage_favorite(detailData.imdb_id)">
                </div>
                <!-- <h1 class="trending-text mt-0">{{ detailData.title }}</h1> -->
                <div class="d-flex align-items-center text-white text-detail">
                    <span class="ml-3">{{ detailData.seasons }} Seasons</span>
                    <span class="trending-year">{{ detailData.year }}</span>
                </div>
                <p class="trending-dec w-100 mb-0">{{ detailData.desc }}</p>
            </div>
        </b-col>
    </b-row>
</section>
</template>

<script>
export default {
    name: 'Detail',
    components: {},
    mounted() {
        if (this.detailData.is_favorite) {
            this.imgSrc = 'bookmark-true'
        } else {
            this.imgSrc = 'bookmark-false'
        }
    },
    props: {
        data: {
            type: Object,
            required: false
        }
    },
    data() {
        return {
            detailData: this.data,
            imgSrc: 'bookmark-false'
        }
    },
    methods: {
        manage_favorite(id) {
            if (this.detailData.is_favorite) {
                this.remove_favorite(id)
            } else {
                this.add_favorite(id)
            }
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
                        this.$store.dispatch("movieAddFavorite", {
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
                                    this.imgSrc = 'bookmark-true'
                                } else {
                                    this.$notify({
                                        group: 'all',
                                        type: 'warn',
                                        title: 'Fail',
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
                        this.$store.dispatch("movieRemoveFavorite", {
                            id: id
                        }).then(res => {
                            if (res) {
                                this.$notify({
                                    group: 'all',
                                    type: 'success',
                                    title: 'Success',
                                    text: 'Removing favorite success'
                                });
                                this.imgSrc = 'bookmark-false'
                            } else {
                                this.$notify({
                                    group: 'all',
                                    type: 'warn',
                                    title: 'Fail',
                                    text: 'Removing favorite failed'
                                });
                            }
                        });
                    }
                }
            })
        },
    }
}
</script>

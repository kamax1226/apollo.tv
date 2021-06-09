<template>
<section class="movie-detail container-fluid">
    <b-row>
        <b-col lg="12" class="col-lg-12">
            <div class="trending-info g-border">
                <div class="d-flex">
                    <h1 class="trending-text mt-0">{{ infoData.title }}</h1>
                    <img :src="require(`../../../assets/images/${imgSrc}.png`)" class="detail-bookmark" @click="manage_favorite(infoData.imdb_id)">
                </div>
                <div class="d-flex align-items-center text-white text-detail">
                    <span class="">{{ infoData.date }}</span>
                    <span class="ml-3">{{ infoData.duration }}</span>
                </div>
                <div>
                    <span class="trending-dec">{{ infoData.desc }}</span>
                </div>
                <div class="action-group">
                    <div class="action-download action-items">
                        <i class="fa fa-download"></i>
                        <p>Download</p>
                    </div>
                    <div class="action-mylist action-items">
                        <i class="fa fa-bookmark"></i>
                        <p>My List</p>
                    </div>
                    <div class="action-trailer action-items">
                        <i class="fa fa-film"></i>
                        <p>Trailer</p>
                    </div>
                    <div class="action-share action-items">
                        <i class="fa fa-share"></i>
                        <p>Share</p>
                    </div>
                </div>
            </div>
        </b-col>
    </b-row>
</section>
</template>

<script>
export default {
    name: 'InfoVideo',
    components: {},
    props: {
        data: {
            type: Object,
            required: false
        }
    },
    mounted () {
        if (this.infoData.is_favorite) {
            this.imgSrc = 'bookmark-true'
        } else {
            this.imgSrc = 'bookmark-false'
        }
    },
    data() {
        return {
            infoData: this.data,
            imgSrc: 'bookmark-false'
        }
    },
    methods: {
        manage_favorite(id) {
            if (this.infoData.is_favorite) {
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
                                    this.infoData.is_favorite = true
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
                                this.infoData.is_favorite = false
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

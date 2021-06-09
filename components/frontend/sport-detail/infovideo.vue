<template>
<section class="movie-detail container-fluid">
    <b-row>
        <b-col lg="12" class="col-lg-12">
            <div class="trending-info g-border">
                <h1 class="trending-text mt-0">{{ infoData.title }}</h1>
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
    mounted() {},
    data() {
        return {
            infoData: this.data
        }
    },
}
</script>

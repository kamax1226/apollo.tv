<template>
<section>
    <b-container>
        <b-row>
            <b-col sm="12" class="overflow-hidden">
                <div class="trending-info align-items-center w-100 animated fadeInUp">
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
                    <div v-else class="main-content">
                        <CategoryList v-for="category in categoryData" v-bind:key="category.id" :category="category" />
                        <div class="load-more" v-if="currentLength < allCategoryData.length">
                            <span @click="loadMore()" class="btn btn-info">Load More</span>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</section>
</template>

<script>
import CategoryList from './categorylist.vue';
export default {
    name: 'Category',
    components: {
        CategoryList
    },
    mounted() {},
    methods: {
        loadMore() {
            let restLength = this.allCategoryData.length - this.currentLength < 5 ? this.allCategoryData.length - this.currentLength : 5;
            for (let i = this.currentLength; i < (this.currentLength + restLength); i++) {
                this.categoryData.push(this.allCategoryData[i]);
            }

            this.currentLength += 5;
        }
    },
    async fetch() {
        this.allCategoryData = await this.$store.dispatch("loadMovieCategoryList");
        let restLength = this.allCategoryData.length - this.currentLength < 5 ? this.allCategoryData.length - this.currentLength : 5;
        for (let i = 0; i < restLength; i++) {
            this.categoryData.push(this.allCategoryData[i]);
        }
        this.currentLength = restLength;
    },
    data() {
        return {
            allCategoryData: [],
            categoryData: [],
            currentLength: 0
        }
    }
}
</script>

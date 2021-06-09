<template>
<div data-spy="scroll" data-offset="80">
    <div id="popup-target"></div>
    <frontendnav :items="headerItem" :userprofile="profile" :home-u-r-l="url" :logo="logo" />
    <vue-confirm-dialog class="apollo-dialog"></vue-confirm-dialog>
    <notifications group="all" />
    <nuxt />
    <Footer :copyrighttext="text">
    </Footer>
    <ScrollTop />
</div>
</template>

<script>
import ScrollTop from '../components/core/ScrollTop'
import { core } from '../assets/app/app'
import loader from '../assets/images/logo.png'
import profile from '../assets/images/frontend/user/user.jpg'
export default {
    name: 'FrontendLayout',
    data() {
        return {
            profile,
            text: '2021 All Rights Reserved',
            url: '/frontend/movie-category',
            logo: loader,
            headerItem: [
                { title: 'Movies', link: '/frontend/movie-category' },
                { title: 'TV Shows', link: '/frontend/tvshow-category' },
                { title: 'Live TV', link: '/frontend/channel-category' },
                { title: 'SportsVOD', link: '/frontend/sport-category' },
                { title: 'TV Guide', link: '/frontend/tv-guide' },
                { title: 'Search', link: '/frontend/search-category' },
                { title: 'My List', link: '/frontend/my-list' },
            ]
        }
    },
    mounted() {
        core.index()
    },
    head() {
        return {
            bodyAttrs: {
                'data-spy': 'scroll',
                'data-offset': '80'
            }
        }
    }
}
</script>

<style>
@import url('../assets/css/custom.css');
@import url('../assets/css/frontend/dark.css');
@import url('../assets/css/frontend/typography.css');
@import url('../assets/css/frontend/variable.css');
@import url('../assets/css/frontend/style.css');
@import url('../assets/css/developer.css');
@import url('../assets/css/mine.css');
@import url('../assets/css/frontend/responsive.css');
</style>

<template>
<!-- TOP Nav Bar -->
<header id="main-header">
    <div class="main-header">
        <b-row>
            <b-col sm="12">
                <nav class="navbar navbar-expand-lg navbar-light p-0">
                    <nuxt-link class="navbar-brand" :to="homeURL">
                        <img id="frontend-logo" class="img-fluid logo" :src="logo" alt="streamit" @click="updateNavbar(0)">
                    </nuxt-link>
                    <b-collapse id="navbarSupportedContent" :visible="sidebar" is-nav>
                        <div class="menu-main-menu-container">
                            <ul id="top-menu" class="navbar-nav ml-auto">
                                <li v-for="(item, index) in items" :key="index" class="menu-item" :id="'nav-menu' + index" @click="updateNavbar(index)">
                                    <nuxt-link :to="item.link">
                                        <div class="nav-title">
                                            {{ item.title }}
                                        </div>
                                        <div class="nav-active">
                                            <div class="arrow-up"></div>
                                            <div class="active-dash"></div>
                                        </div>
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>
                        <div class="close-button" @click="closeSidebar">
                            <img class="close-image" src="../../../assets/images/frontend/navbar-cancel.png">
                        </div>
                    </b-collapse>
                    <div class="navbar-right menu-right">
                        <ul class="d-flex align-items-center list-inline m-0">
                            <li class="nav-item nav-icon" v-nav-toggle>
                                <a href="javascript:void(0)" class="search-toggle p-0 d-flex align-items-center" data-toggle="search-toggle">
                                    <img id="frontend-user-avatar" src="../../../assets/images/frontend/user/user.jpg" class="img-fluid avatar-40 rounded-circle" alt="user">
                                </a>
                                <div class="iq-sub-dropdown iq-user-dropdown">
                                    <div class="iq-card shadow-none m-0">
                                        <div class="iq-card-body p-0 pl-3 pr-3">
                                            <nuxt-link to="/frontend/user/settings" class="iq-sub-card setting-dropdown">
                                                <div class="media align-items-center">
                                                    <div class="right-icon">
                                                        <i class="ri-settings-4-line text-primary" />
                                                    </div>
                                                    <div class="media-body ml-3">
                                                        <h6 class="mb-0 ">Settings</h6>
                                                    </div>
                                                </div>
                                            </nuxt-link>

                                            <a class="iq-sub-card setting-dropdown" href="javascript:void(0)" role="button" @click="logout">
                                                <div class="media align-items-center">
                                                    <div class="right-icon">
                                                        <i class="ri-logout-circle-line text-primary" />
                                                    </div>
                                                    <div class="media-body ml-3">
                                                        <h6 class="mb-0 ">
                                                            Logout
                                                        </h6>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a href="javascript:void(0)" class="navbar-toggler c-toggler collapsed" @click="openSidebar">
                            <div class="navbar-toggler-icon" data-toggle="collapse">
                                <span class="navbar-menu-icon navbar-menu-icon--top"></span>
                                <span class="navbar-menu-icon navbar-menu-icon--middle"></span>
                                <span class="navbar-menu-icon navbar-menu-icon--bottom"></span>
                            </div>
                        </a>
                    </div>
                </nav>
                <div class="nav-overlay" />
            </b-col>
        </b-row>
    </div>
</header>
<!-- TOP Nav Bar END -->
</template>

<script>
import {
    core
} from '../../../assets/app/app'
export default {
    name: 'FrontendNav',
    props: {
        homeURL: {
            type: String,
            default: () => ('/frontend/landing-page')
        },
        logo: {
            type: String,
            default: require('../../../assets/images/logo.png')
        },
        // eslint-disable-next-line vue/require-default-prop
        items: {
            type: Array
        },
        // eslint-disable-next-line vue/require-default-prop
        userprofile: {
            type: String
        }
    },
    data() {
        return {
            sidebar: false,
            navActive: 0,
        }
    },
    mounted() {
        core.index()
        // window.addEventListener('beforeunload', function (e) {
        //     if (e.type != "reload") {
        //         localStorage.removeItem('currentTab');
        //     }
        //     e.preventDefault();
        //     e.returnValue = '';
        // });
        if (localStorage.currentTab) {
            if (sessionStorage.isBrowserOn) {
                this.navActive = localStorage.currentTab;

                var element = document.querySelector(this.navActive);
                element.classList.add("active");
            } else {
                document.getElementsByClassName('menu-item')[0].classList.add('active');
                this.navActive = "#nav-menu0";
                localStorage.currentTab = this.navActive;
            }
        } else {
            document.getElementsByClassName('menu-item')[0].classList.add('active');
            this.navActive = "#nav-menu0";
        }

        sessionStorage.isBrowserOn = true;
    },
    destroyed() {
        // document.removeEventListener('click', this.closeSidebar, true)
    },
    methods: {
        updateNavbar(index) {
            document.querySelector(this.navActive).classList.remove('active');
            this.navActive = "#nav-menu" + index;
            document.querySelector(this.navActive).classList.add('active');
            localStorage.currentTab = this.navActive;

            //close sidebar
            this.sidebar = false
            document.getElementsByTagName('body')[0].classList.remove('nav-open')
        },
        closeSidebar(e) {
            if (!e.target.classList.contains('navbar-toggler-icon')) {
                this.sidebar = false
                document.getElementsByTagName('body')[0].classList.remove('nav-open')
            }
        },
        openSidebar() {
            document.getElementsByTagName('body')[0].classList.add('nav-open')
            this.sidebar = true
        },
        logout() {
            this.$store.dispatch("logout")
                .then(() => {
                    this.$router.go({
                        path: '/frontend/landing-page'
                    });
                });
            localStorage.removeItem('currentTab');
        }
    }
}
</script>

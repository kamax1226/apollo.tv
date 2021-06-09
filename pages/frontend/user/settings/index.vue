<template>
<section class="m-profile setting-wrapper">
    <div v-if="$fetchState.pending">
        <div class="loadingio-spinner-dual-ring-v9pna4viv1d page-detail">
            <div class="ldio-1b03m6p5bfr">
                <div></div>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
    <p v-else-if="$fetchState.error">Error while fetching movies</p>
    <b-container v-else>
        <h4 class="main-title mb-4">
            Account Setting
        </h4>
        <b-row>
            <b-col lg="4" class="mb-3">
                <div class="sign-user_card text-center">
                    <img src="../../../../assets/images/frontend/user/user.jpg" class="rounded-circle img-fluid d-block mx-auto mb-3" alt="user">
                    <p class="mb-3">
                        {{ userinfo.display[0].Username }}
                    </p>
                </div>
            </b-col>
            <b-col lg="8">
                <div class="sign-user_card">
                    <h5 class="mb-3 pb-3 a-border">
                        Personal Details
                    </h5>

                    <div class="row align-items-center justify-content-between mb-3">
                        <div class="col-md-8">
                            <span class="text-light font-size-13">Email</span>
                            <p class="mb-0">
                                {{ userinfo.display[0].Username  }}
                            </p>
                        </div>
                    </div>

                    <div class="row align-items-center justify-content-between mb-3">
                        <div class="col-md-8">
                            <span class="text-light font-size-13">Registered Date</span>
                            <p class="mb-0">
                                {{ (userinfo.registered_date.split("T"))[0] }}
                            </p>
                        </div>
                    </div>

                    <div class="row align-items-center justify-content-between mb-3">
                        <div class="col-md-8">
                            <span class="text-light font-size-13">Expiration Date</span>
                            <p class="mb-0">
                                {{ (userinfo.expiration_date.split("T"))[0] }}
                            </p>
                        </div>
                    </div>

                    <!-- <div class="row align-items-center justify-content-between mb-3">
                        <div class="col-md-8">
                            <span class="text-light font-size-13">Reseller</span>
                            <p class="mb-0">
                                <a href="https://webplay.tv4.live/" >WebPlay</a>
                            </p>
                        </div>
                    </div> -->

                    <div class="row align-items-center justify-content-between mb-3">
                        <div class="col-md-8">
                            <span class="text-light font-size-13">IP</span>
                            <p class="mb-0">
                                {{ userinfo.display[6].IP  }}
                            </p>
                        </div>
                    </div>

                    <div class="row align-items-center justify-content-between mb-3">
                        <div class="col-md-8">
                            <span class="text-light font-size-13">Country</span>
                            <p class="mb-0">
                                {{ userinfo.display[7].Country  }}
                            </p>
                        </div>
                    </div>

                    <div class="row align-items-center justify-content-between mb-3">
                        <div class="col-md-8">
                            <span class="text-light font-size-13">City Name</span>
                            <p class="mb-0">
                                {{ userinfo.geo.city_name  }}
                            </p>
                        </div>
                    </div>

                    <div class="row align-items-center justify-content-between mb-3">
                        <div class="col-md-8">
                            <span class="text-light font-size-13">Timezone</span>
                            <p class="mb-0">
                                {{ userinfo.geo.timezone  }}
                            </p>
                        </div>
                    </div>

                    <br>
                    <br>
                    <br>

                    <h5 class="mb-3 pb-3 a-border">
                        Web Player Version
                    </h5>

                    <div class="row align-items-center justify-content-between mb-3">
                        <div class="col-md-8">
                            <!-- <span class="text-light font-size-13">Version</span> -->
                            <p class="mb-0">
                                1.0.0
                            </p>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</section>
</template>

<script>
import {
    core
} from '../../../../assets/app/app'
export default {
    layout: 'FrontendLayout',
    name: 'Settings',
    components: {},
    data() {
        return {
            userinfo: {}
        }
    },
    mounted() {
        core.index()
        if (localStorage.currentTab) {
            document.querySelector(localStorage.currentTab).classList.remove('active')
        }
        localStorage.removeItem('currentTab')
        
        let elements = document.getElementsByClassName('menu-item')
        elements.forEach(element => {
            element.classList.remove('active')
        });

        let dropdown = document.getElementsByClassName('nav-item nav-icon iq-show')
        if (dropdown.length > 0) {
            dropdown[0].classList.remove('iq-show')
        }
    },
    async fetch() {
        this.userinfo = await this.$store.dispatch("loadUserInfo");
    },
}
</script>

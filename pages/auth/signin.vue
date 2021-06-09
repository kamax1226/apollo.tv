<template>
<div class="container h-100">
    <div class="row justify-content-center align-items-center h-100">
        <div class="col-md-6 col-sm-12 col-12 ">
            <div class="sign-user_card ">
                <div class="sign-in-page-data">
                    <div class="sign-in-from w-100 m-auto">
                        <!-- <div class="sign-in-logo text-center">
                            <img src="../../assets/images/logo.png" class="text-center">
                        </div> -->
                        <h3 class="mt-3 text-white mb-0 text-center">
                            Login
                        </h3>
                        <br>
                        <p class="text-white text-center hint-text">
                            Enter your email and password
                        </p>
                        <!-- <form class="mt-4" @submit.prevent="onSubmit"> -->
                        <form @submit.prevent="onSubmit">
                            <ValidationProvider v-slot="{ errors }" vid="email" name="E-mail">
                                <div class="form-group">
                                    <b-input-group>
                                        <b-input-group-prepend>
                                            <span class="input-group-text">
                                                <!-- <i class="fa fa-user fa-lg"></i> -->
                                                <img src="../../assets/images/login/ic_mail.png">
                                            </span>
                                        </b-input-group-prepend>
                                        <b-form-input id="emailInput" v-model="user.email" type="email" size="lg" :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')" aria-describedby="emailHelp" placeholder="Enter email" required>
                                        </b-form-input>
                                    </b-input-group>
                                    <!-- <input
                                        id="emailInput"
                                        v-model="user.email"
                                        type="email"
                                        :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        required
                                    > -->
                                    <div class="invalid-feedback">
                                        <span>{{ errors[0] }}</span>
                                    </div>
                                </div>
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors }" vid="password" name="Password">
                                <div class="form-group">
                                    <b-input-group>
                                        <b-input-group-prepend>
                                            <span class="input-group-text">
                                                <!-- <i class="fa fa-user fa-lg"></i> -->
                                                <img src="../../assets/images/login/ic_lock.png">
                                            </span>
                                        </b-input-group-prepend>
                                        <b-form-input id="passwordInput" v-model="user.password" type="password" size="lg" :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')" aria-describedby="emailHelp" placeholder="Password" required>
                                        </b-form-input>
                                    </b-input-group>
                                    <!-- <input
                                        id="passwordInput"
                                        v-model="user.password"
                                        type="password"
                                        :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')"
                                        placeholder="Password"
                                        required
                                    > -->
                                    <div class="invalid-feedback">
                                        <span>{{ errors[0] }}</span>
                                    </div>
                                </div>
                            </ValidationProvider>
                            <b-alert :show="loginfailed" variant="primary">
                                <div class="iq-alert-text">
                                    {{ this.message }}
                                </div>
                            </b-alert>
                            <div class="d-inline-block w-100">
                                <button type="submit" class="btn btn-primary btn-login">
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    layout: 'AuthLayout',
    name: 'SignIn',
    props: ['email', 'password'],
    data: () => ({
        user: {
            email: '',
            password: ''
        },
        loginfailed: false,
        message: '',
    }),
    mounted() {
        this.user.email = this.$props.email;
        this.user.password = this.$props.password;
    },
    methods: {
        onSubmit() {
            this.$nuxt.$loading.start();
            this.loginfailed = false;
            this.$store.dispatch("authenticateUser", this.user)
                .then((res) => {
                    this.$nuxt.$loading.finish();
                    this.loginfailed = !res.success;
                    this.message = res.message;
                    if (res.success) {
                        this.$router.push({ path: '/frontend/movie-category' });
                    }
                });
        }
    }
}
</script>

<style scoped>
    @media(max-width:1199px) {
        .sign-in-detail { padding: 100px 50px; }
        .sign-in-page { height: 100%; }
        .hint-text { font-size: 16px !important; }
    }
</style>
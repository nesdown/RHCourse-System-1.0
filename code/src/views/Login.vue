<template>
    <div class="login">
        <form action="#" class="login__form">
            <h1>Адмін-панель</h1>
            <input type="text" placeholder="Введіть свій логін" v-model="login">
            <input type="password" placeholder="Введіть свій пароль" v-model="password">
            <p v-if="isError">{{errorInfo}}</p>
            <button type="submit" @click.prevent="sendUserData">Вхід</button>
        </form>
    </div>    
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            login: '', // v-model for login field
            password: '', // v-model for password field
            errorInfo: '', // error information
            isError: false // detects if there are some invalid data
        }
    },
    methods: {
        sendUserData() {
            // tries to login
            
            let userData = {
                login: this.login,
                password: this.password
            }
            axios.post('/auth/login', userData)
                 .then(res => {
                        if (!res.data.token) {
                            this.errorInfo = res.data;
                            this.isError = true;
                        } else {
                            localStorage.setItem('user-token', res.data.token);
                            localStorage.setItem('is-admin', res.data.isAdmin);
                            localStorage.setItem('user-id', res.data.userId);
                            localStorage.setItem('user-login', res.data.login);
                            this.$router.push('/admin/services');
                        }
                 })
                 .catch(err => console.log(err));
        }
    }
    
}
</script>

<style lang="scss" scoped>

.login {
    width: 100vw;
    height: 100vh;
    position: relative;
    
    &__form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        font-size: 1.5rem;

        h1 {
            margin-bottom: 2rem;
        }

        input {
            margin-bottom: 1rem;
            padding: .5rem;
            outline: none;
        }

        button {
            padding: .5rem;
            outline: none;
        }
    }
}

</style>

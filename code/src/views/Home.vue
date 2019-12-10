<template>
    <div class="home">
        
        <div v-if="$store.state.successfulAdd" class="successful-add">{{$t('successfulAdd')}}</div>
        <div v-if="$store.state.successfulEdit" class="successful-add">{{$t('successfulEdit')}}</div>

        <client-header class="home__header"></client-header>
        <section class="home__registration section">
            <img src="../assets/register.png" alt="register">
            <router-link to="register">
                <div class="btn">{{$t('serviceRegistration')}}</div>          
            </router-link>
        </section>
        <section class="home__trade section">
            <img src="../assets/trade.png" alt="trade">
            <router-link to="trade">
                <div class="btn">{{$t('tradeOfferTitle')}}</div>
            </router-link>
        </section>
    </div>    
</template>

<script>
import ClientHeader from '../components/ClientHeader.vue';
import axios from 'axios';

export default {
    data() {
        return {
            success: false
        }
    },
    components: {
        'client-header': ClientHeader
    },
    methods: {
        
    },
    mounted() {
        setTimeout(() => {
            // hides 'success' windows in 3 seconds
            this.$store.commit('successfulAddChange', false);
            this.$store.commit('successfulEditChange', false);
        }, 3000);
    }
}
</script>

<style lang="scss" scoped>

.successful-add {
    width: 100vw;
    // height: 5rem;
    padding: 1.5rem 0rem;
    background: rgb(145, 231, 145);
    position: absolute;
    top: 0;
    font-size: 1.5rem;
    text-align: center;
}

.home {
    display: grid;
    width: 100vw;
    height: 100vh;

    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr 4fr;
    grid-column-gap: 5rem;
    grid-row-gap: 5rem;

    @media only screen and (max-width: 50em) {
        grid-template-rows: 15vw repeat(2, max-content);
        grid-row-gap: 4rem;
    }

    @media only screen and (max-width: 37.5em) {
        grid-row-gap: 5rem;
        grid-template-rows: 15vw repeat(2, max-content);
    }

    &__header {
        grid-column: 1 / -1;
        grid-row: 1 / 2;

        display: flex;
        justify-content: space-between;
        align-items: center;

        
    }

    .section {
        padding: 5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: start;

        @media only screen and (max-width: 50em) {
            // align-items: stretch;
            // align-self: stretch;
        }

        @media only screen and (max-width: 37.5em) {
            align-self: end;
        }

        border: 1px solid;
        // margin-top: -15rem;
        // justify-content: space-between;
        // height: 50%;

        img {
            height: 10vw;
            width: auto;
            margin-top: 3rem;
            margin-bottom: 5rem;

            @media only screen and (max-width: 50em) {
                width: 20vw;
                height: auto;
            }

            @media only screen and (max-width: 37.5em) {
                width: 30vw;
            }
        }
    }

    .btn {
        display: inline-block;
        width: 12vw;
        text-align: center;
        background: rgb(250, 233, 6);
        border: 1px solid rgb(34, 32, 30);
        padding: 1.5rem 2.5rem;
        font-size: 1.5rem;
        border-radius: 10px;
        cursor: pointer;
        transition: all .2s;
        backface-visibility: hidden;

        &:hover {
            transform: scale(1.05);
        }

        @media only screen and (max-width: 75em) {
            width: 15vw;
        }

        @media only screen and (max-width: 50em) {
            width: 20vw;
        }

        @media only screen and (max-width: 37.5em) {
            width: 25vw;
        }
    }

    &__registration {
        // justify-self: center;
        // align-self: center;
        margin-top: 5rem;
        grid-column: 4 / 7;
        grid-row: 2 / 3;
        // background: blue;

        @media only screen and (max-width: 75em) {
            grid-column: 2 / 7;
        }

        @media only screen and (max-width: 50em) {
            grid-column: 2 / 12;
            grid-row: 2 / 3;
        }


        @media only screen and (max-width: 37.5em) {
            align-self: end;
        }

        
    }

    &__trade {
        // align-self: center;
        margin-top: 5rem;
        grid-column: 7 / 10;
        grid-row: 2 / 3;
        // background: orange; 
        @media only screen and (max-width: 75em) {
            grid-column: 7 / 12;
        }

        @media only screen and (max-width: 50em) {
            grid-column: 2 / 12;
            grid-row: 3 / 4;
        }

        @media only screen and (max-width: 37.5em) {
            align-self: start!important;
            margin-top: 0;
        }
    }
}
</style>

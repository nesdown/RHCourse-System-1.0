<template>
    <header class="home__header">
        <div class="home__header__logo">
            <router-link to="/">
                <img src="../assets/logo.png" alt="Logo">
                <h3 class="home__header__logo__title">Samsung upgrade</h3>
                <span class="home__header__logo__subtitle">by SUPPORT.UA</span>
            </router-link>
        </div>

        <div class="home__header__prefs">
            <div class="tl-call-catcher">
                <!--BANNER ON SITE--> 
                <div class="home__header__support">
                    <img src="../assets/support_headphones.png" alt="Headphones photo">
                    <p>{{$t('support')}}</p>
                </div>
            </div>
        
            <div @click="$store.commit('toggleLanguage'); changeLocale()" class="home__header__lang">
                <img :src="$store.state.language" alt="flag image">
            </div>
        </div>
    </header>
</template>


<script>
export default {
    data() {
        return {
            
        }
    },
    created() {
      
    },
    methods: {
        changeLocale() {
            // changes locale
            this.$i18n.locale === 'ua' ? this.$i18n.locale = 'ru' : this.$i18n.locale = 'ua'
        }
    }
}
</script>

<style lang="scss" scoped>
.home__header {
    &__prefs {
        display: flex;
        align-items: center;
    }

    &__support {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 2rem;
        font-size: 1.5rem;
        
        @media only screen and (max-width: 40.625em) {
            font-size: 1.25rem;
        }

        img {
            width: 10rem;
            height: auto;
            margin-bottom: 1rem;
        
            @media only screen and (max-width: 40.625em) {
                width: 7rem;        
            }
        }

    }

    &__lang {
        cursor: pointer;
        margin-right: 5rem;
        img {
            width: 4rem;
            border: 1px solid #333;
        }
    }

    &__logo {
        a {
            margin-left: 10rem;
            display: grid;
            font-size: 3rem;
            grid-template-columns: 10rem max-content;
            grid-template-rows: repeat(2, max-content);
            grid-column-gap: 6rem;

            @media only screen and (max-width: 50em) {
                font-size: 2rem;
                grid-column-gap: 3rem;
                margin-left: 10rem;
            }

            @media only screen and (max-width: 40.625em) {
                font-size: 1.5rem;
                grid-column-gap: 0rem;
                margin-left: 7rem;
            }

            img {
                width: 13rem;
                height: auto;

                grid-column: 1 / 2;
                grid-row: 1 / -1;
                align-self: center;
                
                @media only screen and (max-width: 50em) {
                    width: 10rem;
                }

                @media only screen and (max-width: 40.625em) {
                    width: 7rem;
                }

                
            }

            h3 {
                align-self: end;
                text-transform: uppercase;
            }
        }

    }
}
</style>



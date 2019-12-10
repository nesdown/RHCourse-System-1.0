<template>
    <nav class="admin-menu">
        <ul class="admin-menu__links">
            <router-link to="/admin/services" tag="li" class="admin-menu__links__link"><a :class="{'active': $route.path === '/admin/services'}">Реєстрація сервісів</a></router-link>
            <router-link to="/admin/trades" tag="li" class="admin-menu__links__link"><a :class="{'active': $route.path === '/admin/trades'}">Заявки на обмін</a></router-link>
            <router-link to="/admin/docs" tag="li" class="admin-menu__links__link"><a :class="{'active': $route.path === '/admin/docs'}">Шаблони документів</a></router-link>
            <router-link to="/admin/settings" tag="li" class="admin-menu__links__link">
                <a :class="{'active': $route.path === '/admin/settings/formulas' || $route.path === '/admin/settings/dropdowns' || $route.path === '/admin/settings/users' || $route.path === '/admin/settings/infofields' || $route.path === '/admin/settings/records'}">Налаштування</a>
            </router-link>
        </ul>

        <div class="admin-menu__profile">
            <p class="admin-menu__profile__username">{{nickname}}</p>
            <svg @click="logout" class="admin-menu__profile__logout">
                <use xlink:href="../assets/icons.svg#icon-log-out"></use>
            </svg>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        nickname() {
            // displaying nickname in admin panel
            return localStorage.getItem('user-login');
        }
    },
    methods: {
        logout() {
            // clearing the local storage and pushing user to home page
            localStorage.clear();
            this.$router.push('/admin');
        }
    }
}
</script>


<style lang="scss" scoped>
.active {
    color: rgba(89, 89, 248, 0.801);
}

.admin-menu {
    display: grid;
    grid-template-columns: 1fr max-content 1fr;
    padding: 1.5rem;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    font-size: 1.5rem;
    align-items: center;

        &__links {
            grid-column: 2 / 3;
            list-style: none;
            display: flex;
            justify-content: space-between;

            &__link {
                margin-right: 3rem;
                
                &--active {
                    color: red;
                }
            }
           
        }

        &__profile {
            grid-column: 3 / 4;
            justify-self: end;

            display: grid;
            grid-template-columns: max-content;
            grid-template-rows: max-content 3rem;
            align-items: center;
            margin-right: 3rem;

            &__username {
                grid-column: 1/2;
                grid-row: 1/2;
                font-size: 2rem;
            }

            &__logout {
                width: 2rem;
                grid-row: 2/3;
                grid-column: 1/2;
                justify-self: center;
                cursor: pointer;
            }
        }

}
</style>

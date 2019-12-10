<template>
    <nav class="admin-settings-menu">
        <router-link to="/admin/settings/formulas" tag="li" class="admin-settings-menu__link"><a>Формули оцінки компенсації</a></router-link>
        <router-link to="/admin/settings/dropdowns" tag="li" class="admin-settings-menu__link"><a>Редагування випадаючих списків</a></router-link>
        <router-link to="/admin/settings/users" tag="li" class="admin-settings-menu__link"><a>Налаштування користувачів</a></router-link>
        <router-link to="/admin/settings/infofields" tag="li" class="admin-settings-menu__link"><a>Вспливаючі вікна</a></router-link>
        <router-link to="/admin/settings/records" tag="li" class="admin-settings-menu__link"><a>Редагування записів</a></router-link>
    </nav>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>

.admin-settings-menu {
    list-style: none;
    font-size: 1.5rem;
    border: 1px solid #ddd;
    padding: 2rem;

    &__link {
        margin-bottom: 2rem;
        a {
            color: rgba(89, 89, 248, 0.801);
        }
    }
}
</style>

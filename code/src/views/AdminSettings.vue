<template>
    <div class="admin-settings">
        <header class="admin-settings__header">Реєстрація сервісів</header>
        <admin-menu class="admin-settings__menu"/>
        <div class="admin-settings__content">
            <admin-settings-menu class="admin-settings__content__menu"/>
            <admin-settings-formulas v-if="$route.path === '/admin/settings/formulas'" class="admin-settings__content__edit"/>
            <admin-settings-dropdowns v-if="$route.path === '/admin/settings/dropdowns'" class="admin-settings__content__edit" />
            <admin-settings-users v-if="$route.path === '/admin/settings/users'" class="admin-settings__content__edit"/>
            <admin-settings-info-fields v-if="$route.path === '/admin/settings/infofields'" class="admin-settings__content__edit"/>
            <admin-settings-records v-if="$route.path === '/admin/settings/records'" class="admin-settings__content__edit"/>
        </div>
    </div>    
</template>

<script>
import axios from 'axios';

import AdminMenu from '../components/AdminMenu.vue';
import AdminSettingsMenu from '../components/AdminSettingsMenu';
import AdminSettingsFormulas from '../components/AdminSettingsFormulas';
import AdminSettingsDropdowns from '../components/AdminSettingsDropdowns';
import AdminSettingsUsers from '../components/AdminSettingsUsers';
import AdminSettingsInfoFields from '../components/AdminSettingsInfoFields';
import AdminSettingsRecords from '../components/AdminSettingsRecords';

import moment from 'moment';

export default {
    components: {
        'admin-menu': AdminMenu,
        'admin-settings-menu': AdminSettingsMenu,
        'admin-settings-formulas': AdminSettingsFormulas,
        'admin-settings-dropdowns': AdminSettingsDropdowns,
        'admin-settings-users': AdminSettingsUsers,
        'admin-settings-info-fields': AdminSettingsInfoFields,
        'admin-settings-records': AdminSettingsRecords
    },
    created() {
        
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>

.admin-settings {
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
    // overflow: hidden;
    display: grid;

    grid-template-rows: repeat(3, max-content);

    &__header {
        // background: yellow;
        font-size: 4.5rem;
        padding: 3rem;
        font-family: 'Montserrat', monospace;
        grid-row: 1/2;
    }

    &__menu {
        // background: pink;
        grid-row: 2/3;
    }

    &__filters {
        // background: green;
        grid-row: 3/4;
    }

    &__content {
        // background: red;
        grid-row: 4/5;
        padding: 3rem;
        font-size: 1.2rem;
        // margin: auto;
        word-wrap: none;
        display: grid;
        grid-template-columns: 1.5fr 4fr;
        grid-column-gap: 4rem;

        &__menu {
            align-self: start;
        }
    }
}
</style>

<template>
    <div class="admin-services">
        <header class="admin-services__header">Реєстрація сервісів</header>
        <admin-menu class="admin-services__menu"/>
        <admin-filters class="admin-services__filters"/>

        <div class="admin-services__content">
            <table>
                <tr>
                    <th>Дата реєстрації</th>
                    <th>Магазин</th>
                    <th>Співробітник</th>
                    <th>Номер телефону співробітника</th>
                    <th>Дата покупки</th>
                    <th>Номер заказу</th>
                    <th>ПІБ покупця</th>
                    <th>Номер телефону покупця</th>
                    <th>Модель смартфону</th>
                    <th>IMEI</th>
                    <th>Комплектація</th>
                    <th>Вартість смартфону</th>
                    <th>Статус</th>
                    <th>Срок дії, день з 365</th>
                </tr>
                <tr :key="record._id" v-for="record in $store.state.records">
                    <td>{{formatDate(record.registerDate)}}</td>
                    <td>{{record.shop}}</td>
                    <td>{{record.servicerFio}}</td>
                    <td>{{record.servicerNumber}}</td>
                    <td>{{formatDate(record.date)}}</td>
                    <td>{{record.orderNumber}}</td>
                    <td>{{record.customerFio}}</td>
                    <td>{{record.customerNumber}}</td>
                    <td>{{record.smartphoneModel}}</td>
                    <td>{{record.imei}}</td>
                    <td>{{record.complectation}}</td>
                    <td>{{record.smartphonePrice}}</td>
                    <td 
                        :class="{'registered': status(record) == 'Зареєстровано' && expireDate(record) <= 365,
                                 'traded': status(record) == 'Проведено обмін' && expireDate(record) <= 365,
                                 'expired': status(record) == 'Прострочено' || expireDate(record) > 365}">{{status(record)}}</td>
                    <td 
                        :class="{'registered': status(record) == 'Зареєстровано' && expireDate(record) <= 365,
                                 'traded': status(record) == 'Проведено обмін' && expireDate(record) <= 365,
                                 'expired': status(record) == 'Прострочено' || expireDate(record) > 365}">{{expireDate(record)}}</td>
                </tr>
            </table>
        </div>
    </div>    
</template>

<script>
import AdminMenu from '../components/AdminMenu.vue';
import AdminFilters from '../components/AdminFilters.vue';
import moment from 'moment';
import axios from 'axios';

export default {
    components: {
        'admin-menu': AdminMenu,
        'admin-filters': AdminFilters
    },
    methods: {
        formatDate(value) {
            // formates date to readable format
            return moment(value).format('DD.MM.YYYY');
        },
        expireDate(value) {
            // calculates count of days to expire
            const result = moment().diff(moment(value.date),'days');
            if (result > 365 && value.status !== 'Прострочено') axios.post(`/admin/editRecord/${value._id}`, {
                shop: value.shop,
                servicerFio: value.servicerFio,
                servicerNumber: value.servicerNumber,
                date: value.date,
                orderNumber: value.orderNumber,
                customerFio: value.customerFio,
                customerNumber: value.customerNumber,
                smartphoneModel: value.smartphoneModel,
                imei: value.imei,
                complectation: value.complectation,
                smartphonePrice: value.smartphonePrice,
                registerDate: value.registerDate,
                orderDate: value.orderDate,
                compensation: value.compensation,
                status: 'Прострочено'
            })
            return result;
        },
        status(value) {
            // returns status of record
            return value.status
        }
    }
}
</script>

<style lang="scss" scoped>

.registered {
    background: green;
}

.traded {
    background: lightskyblue;
}

.expired {
    background: red;
}

.admin-services {
    width: 100vw;
    height: 100vh;
    // overflow: hidden;
    display: grid;
    overflow-x: hidden;

    grid-template-rows: repeat(4, max-content);

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
        margin: auto;
        word-wrap: none;

        td {
            border: 1px solid black;
            text-align: center;
            padding: .3rem;
        }
    }
}
</style>

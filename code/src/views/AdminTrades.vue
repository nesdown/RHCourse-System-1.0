<template>
    <div class="admin-trades">
        <header class="admin-trades__header">Заявки на обмін</header>
        <admin-menu class="admin-trades__menu"/>
        <admin-trade-filters @sendCompensation="filterByCompensation" class="admin-trades__filters"/>

        <div class="admin-trades__content">
            <table>
                <tr>
                    <th>Дата реєстрації</th>
                    <th>Дата покупки</th>
                    <th>Номер заказу</th>
                    <th>ПІБ покупця</th>
                    <th>Номер телефону покупця</th>
                    <th>Модель смартфону</th>
                    <th>IMEI</th>
                    <th>Комплектація</th>
                    <th>Вартість смартфону</th>
                    <th>Дата обміну</th>
                    <th>Перевірка</th>
                    <th>Компенсація</th>
                    <th>Сума компенсації</th>
                    <th>Статус</th>
                </tr>
                <tr :key="record._id" v-for="record in $store.state.records">
                    <td>{{formatDate(record.registerDate)}}</td>
                    <td>{{formatDate(record.date)}}</td>
                    <td>{{record.orderNumber}}</td>
                    <td>{{record.customerFio}}</td>
                    <td>{{record.customerNumber}}</td>
                    <td>{{record.smartphoneModel}}</td>
                    <td>{{record.imei}}</td>
                    <td>{{record.complectation}}</td>
                    <td>{{record.smartphonePrice}}</td>
                    <td>{{formatDate(record.orderDate)}}</td>
                    <td>Проведена</td>
                    <td>{{record.compensation + '%'}}</td>
                    <td>{{calculateCompensationValue(record)}}</td>
                    <td 
                        :class="{'registered': status(record) == 'Зареєстровано',
                                 'traded': status(record) == 'Проведено обмін',
                                 'expired': status(record) == 'Прострочено'}">{{status(record)}}</td>
                </tr>
            </table>
        </div>
    </div>    
</template>

<script>
import AdminMenu from '../components/AdminMenu.vue';
import AdminTradeFilters from '../components/AdminTradeFilters.vue';
import moment from 'moment';
import axios from 'axios';

export default {
    components: {
        'admin-menu': AdminMenu,
        'admin-trade-filters': AdminTradeFilters,
    },
    data() {
        return {
            formulaData: {}
        }
    },
    methods: {
        formatDate(value) {
            // formates date to readable format
            return moment(value).format('DD.MM.YYYY');
        },
        expireDate(value) {
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
            return value.status;
        },
        getFormulaData() {
            // gets list of formulas data from server

            axios.get('/admin/getFormula/5c69650fe7179a27eb61f983')
                .then(res => {
                    console.log(res.data);
                    this.formulaData = res.data;
                })
                .catch(err => console.log(err));
        },
        getCompensation(value) {
            // calculates compensation for record

            return (this.expireDate(value) <= 180) ? this.formulaData.halfyear : this.formulaData.fullyear;
        },
        calculateCompensationValue(record) {
            let rawValue = Math.floor(record.smartphonePrice * record.compensation / 100);
            let remainder = rawValue % 10 === 0 ? 0 : 10;
            return Math.trunc(rawValue / 10) * 10 + remainder;
        }
    },
    created() {
        this.getFormulaData();
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

.admin-trades {
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

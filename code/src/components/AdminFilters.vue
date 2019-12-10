<template>
    <div class="admin-filters">
        <input type="text" placeholder="Пошук за номером телефону" @input="updateRecords" v-model="numberValue" class="field field--search">
        <div class="date__filter__from">
            <div class="date__filter__from__caption">Фільтр реєстрації з:</div>
            <input @change="updateRecords" v-model="registerFrom" type="date" placeholder="Дата с... по ...">
        </div>
        <div class="date__filter__to">
            <div class="date__filter__to__caption">Фільтр реєстрації до:</div>
            <input @change="updateRecords" v-model="registerTo" type="date" placeholder="Дата с... по ...">
        </div>
        <div class="purchase__filter__from">
            <div class="purchase__filter__from__caption">Фільтр покупки з:</div>
            <input @change="updateRecords" v-model="purchaseFrom" type="date"  placeholder="Дата с... по ...">
        </div>
        <div class="purchase__filter__to">
            <div class="purchase__filter__to__caption">Фільтр покупки до:</div>
            <input @change="updateRecords" v-model="purchaseTo" type="date" placeholder="Дата с... по ...">
        </div>
        <div class="model__filter">
            <div class="model__filter__caption">Фільтр по моделі:</div>
            <select @change="updateRecords" v-model="modelFilter" class="model__filter">
                <option :key="model" v-for="model in smartphoneModelData">{{model}}</option>
            </select>
        </div>
        <div class="status__filter">
            <div class="status__filter__caption">Фільтр по статусу:</div>
            <select @change="updateRecords" v-model="statusFilter" class="status__filter">
                <option selected>Всі</option>
                <option>Зареєстровано</option>
                <option>Проведено обмін</option>
                <option>Прострочено</option>
            </select>
        </div>
        
        <form method="POST" action="/admin/downloadReport" @submit="exportData" class="export">
        <input type="hidden" name="filename" :value="filename">
            <button type="submit">
                <svg>
                    <use xlink:href="../assets/icons.svg#icon-export"></use>
                </svg>
                <p class="export__caption">Експорт</p>
            </button>
        </form>
        <!-- {{registerFrom}} -->
    </div>
</template>


<script>
import axios from 'axios';
import moment from 'moment';

export default {
    data() {
        return {
            modelFilter: 'Всі', // v-model for models dropdown
            statusFilter: 'Всі', // v-model for status dropdown
            registerFrom: null, // v-model for "register from" date input
            registerTo: null, // v-model for "register to" date input
            purchaseFrom: null, // v-model for "purchase from" date input
            purchaseTo: null, // v-model for "purchase to" date input,
            numberValue: ''
        }
    },
    asyncComputed: {
        smartphoneModelData() {
            // gets all smartphone models from server
            return axios.get('/admin/getDropdown/5c6347cc3775886f656c64aa')
                .then(dropdown => {
                    let formatData = dropdown.data.ua;
                    formatData.unshift('Всі');
                    return formatData;
                })
                .catch(err => console.log(err));
        },
    },
    methods: {
        packData() {
            // pack all data into object
            return {
                smartphoneModel: this.modelFilter,
                status: this.statusFilter,
                registerFrom: moment(this.registerFrom).utc().format() === 'Invalid date' ? moment('2000-02-15').utc().format() : moment(this.registerFrom).utc().format(),
                registerTo: moment(this.registerTo).utc().format() === 'Invalid date' ? moment('3000-02-15').utc().format() : moment(this.registerTo).utc().format(),
                purchaseFrom: moment(this.purchaseFrom).utc().format() === 'Invalid date' ? moment('2000-02-15').utc().format() : moment(this.purchaseFrom).utc().format(),
                purchaseTo: moment(this.purchaseTo).utc().format() === 'Invalid date' ? moment('3000-02-15').utc().format() : moment(this.purchaseTo).utc().format(),
                numberValue: this.numberValue
            }
        },
        updateRecords() {
            // gets all records from database to update it's status on page
            this.$store.dispatch('asyncSortRecords', this.packData());
        }, 
        async exportData(e) {
            // sends filtered fields and it's values to server
            await e.preventDefault();
            await axios.post('/admin/exportData', 
            {
                headers: ['Дата реєстрації', 'Магазин', 'Співробітник', 'Номер телефону співробітника', 'Дата покупки', 'Номер заказу', 'ПІБ покупця', 'Номер телефону покупця', 'Модель смартфону', 'IMEI', 'Комплектація', 'Вартість смартфону', 'Статус', 'Срок дії, днів з 365'],
                type: 'services',
                data: this.$store.state.records,
                filename: this.filename
            })
                .then(() => document.querySelector('.export').submit())
                .catch(() => false);
        }
    },
    mounted() {
        this.updateRecords();
    },
    computed: {
        filename() {
            return 'report_' + Math.random().toString(36).substr(2, 9) + '.xlsx';
        }
    }
    }
</script>

<style lang="scss" scoped>
.admin-filters {
    display: grid;
    margin: 0 auto;
    font-size: 1rem;
    padding-top: 3rem;
    padding-bottom: 3rem;

    grid-template-columns: repeat(5, max-content) 1fr;
    grid-template-rows: repeat(2, max-content);
    grid-column-gap: 4rem;
    grid-row-gap: 1.5rem;

    .field--search {
        grid-column: 1/2;
        grid-row: 1/2;
        align-self: center;
    }

    .date__filter__from {
        // padding-top: 2rem;
        &__caption {
            margin-right: 2.5rem;
        }
        justify-content: space-between;
        align-items: center;
        display: flex;
        // margin-right: 2rem;
        grid-column: 2/3;
        grid-row: 1/2;
    }
    
    .date__filter__to {
        &__caption {
            margin-right: 2.5rem;
        }
        justify-content: space-between;
        display: flex;
        align-items: center;
        // margin-right: .5rem;
        grid-column: 2/3;
        grid-row: 2/3;
    }

    .purchase__filter__from {
        &__caption {
            margin-right: 2.5rem;
        }
        justify-content: space-between;
        display: flex;
        align-items: center;
        // margin-right: .5rem;
        grid-column: 3/4;
        grid-row: 1/2;
    }

    .purchase__filter__to {
        &__caption {
            margin-right: 2.5rem;
        }
        justify-content: space-between;
        display: flex;
        align-items: center;
        // margin-right: .5rem;
        grid-column: 3/4;
        grid-row: 2/3;
    }

    .model__filter {
        &__caption {
            margin-right: 2.5rem;
        }
        justify-content: space-between;
        display: flex;
        align-items: center;
        // margin-right: .5rem;
        grid-column: 4/5;
        grid-row: 1/2;
    }

    .status__filter {
        &__caption {
            margin-right: 2.5rem;
        }
        justify-content: space-between;
        display: flex;
        align-items: center;
        // margin-right: .5rem;
        grid-column: 4/5;
        grid-row: 2/3;
    }

    .export {
        grid-column: 5/6;
        grid-row: 1/-1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        svg {
            width: 3.5rem;
            height: 3rem;
        }
    }
}
</style>

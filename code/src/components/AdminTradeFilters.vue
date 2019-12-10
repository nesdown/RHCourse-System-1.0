<template>
    <div class="admin-trade-filters">
        <input type="text" placeholder="Пошук за номером телефону" @input="updateRecords" v-model="numberValue" class="field field--search">
        <div class="date__filter__from">
            <div class="date__filter__from__caption">Період покупки з:</div>
            <input @change="updateRecords" v-model="tradePurchaseFrom" type="date" placeholder="Дата с... по ...">
        </div>
        <div class="date__filter__to">
            <div class="date__filter__to__caption">Період покупки до:</div>
            <input @change="updateRecords" v-model="tradePurchaseTo" type="date" placeholder="Дата с... по ...">
        </div>
        <div class="purchase__filter__from">
            <div class="purchase__filter__from__caption">Період обмін з:</div>
            <input @change="updateRecords" v-model="tradePeriodFrom" type="date"  placeholder="Дата с... по ...">
        </div>
        <div class="purchase__filter__to">
            <div class="purchase__filter__to__caption">Період обміну до:</div>
            <input @change="updateRecords" v-model="tradePeriodTo" type="date" placeholder="Дата с... по ...">
        </div>
        <div class="model__filter">
            <div class="model__filter__caption">Фільтр по моделі:</div>
            <select @change="updateRecords" v-model="modelFilter" class="model__filter">
                <option :key="model" v-for="model in smartphoneModelData">{{model}}</option>
            </select>
        </div>
        <div class="status__filter">
            <div class="status__filter__caption">% компенсації:</div>
            <select @change="updateRecords" v-model="compensation" class="status__filter">
                <option :key="formula" v-for="formula in formulasData">{{formula}}</option>
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
import bcrypt from 'bcryptjs';

export default {
    data() {
        return {
            modelFilter: 'Всі', // v-model for models dropdown
            tradePurchaseFrom: null, // v-model for input dates of trade purchase
            tradePurchaseTo: null, // v-model for input dates of trade purchase
            tradePeriodFrom: null, // v-model for input dates of trade period
            tradePeriodTo: null, // v-model for input dates of trade period
            formulasData: [], // container for formulas data that obtains from server
            compensation: 'Всі', // v-model for compensation,
            numberValue: '' // v-model for customer number
        }
    },
    computed: {
        filename() {
            return 'report_' + Math.random().toString(36).substr(2, 9) + '.xlsx';
        }
    },
    asyncComputed: {
        smartphoneModelData() {
            // gets list of smartphone models

            return axios.get('/admin/getDropdown/5c6347cc3775886f656c64aa')
                .then(dropdown => {
                    let formatData = dropdown.data.ua;
                    formatData.unshift('Всі');
                    return formatData;
                })
                .catch(err => console.log(err));
        }
    },
    methods: {
        getFormulasData() {
            // gets formulas values from server

            axios.get('/admin/getFormula/5c69650fe7179a27eb61f983')
                .then(res => {
                    let data = Object.values(res.data).slice(1);
                    data.unshift('Всі');
                    this.formulasData = data;
                    return this.formulasData;
                })
                .catch(err => console.log(err));
        },
        packData() {
            // packs data to object in properly values to send to the server
            return {
                smartphoneModel: this.modelFilter,
                status: 'Проведено обмін',
                tradePurchaseFrom: moment(this.tradePurchaseFrom).utc().format() === 'Invalid date' ? moment('2000-02-15').utc().format() : moment(this.tradePurchaseFrom).utc().format(),
                tradePurchaseTo: moment(this.tradePurchaseTo).utc().format() === 'Invalid date' ? moment('3000-02-15').utc().format() : moment(this.tradePurchaseTo).utc().format(),
                tradePeriodFrom: moment(this.tradePeriodFrom).utc().format() === 'Invalid date' ? moment('2000-02-15').utc().format() : moment(this.tradePeriodFrom).utc().format(),
                tradePeriodTo: moment(this.tradePeriodTo).utc().format() === 'Invalid date' ? moment('3000-02-15').utc().format() : moment(this.tradePeriodTo).utc().format(),
                compensation: this.compensation,
                numberValue: this.numberValue
            }
        },
        async updateRecords() {
            // update records to refresh data on page
            await this.$store.dispatch('asyncSortRecordsTrade', this.packData());
            await this.exportData();
        },
        hashCode(str) {
            return str.split('').reduce((prevHash, currVal) =>(((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
        },
        async exportData(e) {
            // send filter fields and it's values
            await e.preventDefault();
            await axios.post('/admin/exportData', 
            {
                headers: ['Дата реєстрації', 'Дата покупки', 'Номер заказу', 'ПІБ покупця', 'Номер телефону покупця', 'Модель смартфону', 'IMEI', 'Комплектація', 'Вартість смартфону', 'Дата обміну', 'Перевірка', 'Компенсація', 'Сума компенсації', 'Статус'],
                type: 'trade',
                data: this.$store.state.records,
                filename: this.filename
            })
                .then(() => document.querySelector('.export').submit())
                .catch(() => false);
        }
    },
    created() {
        this.updateRecords();
        this.getFormulasData();
    }
    }
</script>

<style lang="scss" scoped>
.admin-trade-filters {
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

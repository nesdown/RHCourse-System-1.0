<template>
    <div class="admin-settings-formulas">
        <h2>Редагування відсотків у формулах</h2>
        <div class="admin-settings-formulas__current">
            <p>На даний момент:</p>
            <p>З 1 по 180 день: {{this.formulaData.halfyear}} (%)</p>
            <p>З 180 по 365 день: {{this.formulaData.fullyear}} (%)</p>
        </div>
        <div class="admin-settings-formulas__edit">
            <p>Для редагування, будь-ласка, заповніть усі необхідні поля та нажміть кнопку "Оновити"</p>
            <p>З 1 по 180 день:</p>
            <input type="text" v-model="halfyear">
            <p>З 180 по 365 день:</p>
            <input type="text" v-model="fullyear"><br>
            <p v-if="$v.halfyear.$invalid || $v.fullyear.$invalid">Введіть коректні дані</p>
            <button @click.prevent="sendNewFormula">Оновити</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { required, numeric, minValue, maxValue } from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            halfyear: '', // period from 0 to 180 days
            fullyear: '', // periof drom 180 - 365 days
            formulaData: {} // container for formulas data that obtains from server
        }
    },
    created() {
        this.getFormulaData();
    },
    methods: {
        async sendNewFormula() {
            // updates formulas values in server

            const data = {
                halfyear: this.halfyear,
                fullyear: this.fullyear
            };
            
            await axios.post('/admin/editFormula/5c69650fe7179a27eb61f983', data)
                  .then(() => alert('Формулу оновлено'))
            await this.getFormulaData();   
        },
        getFormulaData() {
            // gets formulas values from server

            axios.get('/admin/getFormula/5c69650fe7179a27eb61f983')
                .then(res => {
                    this.formulaData = res.data;
                })
                .catch(err => console.log(err));
        }
    },
    validations: {
        halfyear: {
            required,
            numeric,
            minValue: minValue(0),
            maxValue: maxValue(100)
        },
        fullyear: {
            required,
            numeric,
            minValue: minValue(0),
            maxValue: maxValue(100)
        }
    }
}
</script>

<style lang="scss" scoped>
.admin-settings-formulas {
    font-size: 1.5rem;

    h2 {
        margin-bottom: 2rem;
    }

    p {
        margin-bottom: .5rem;
    }

    input {
        margin-bottom: 2.5rem;
    }

    &__current {
        margin-bottom: 5rem;
    }
}
</style>

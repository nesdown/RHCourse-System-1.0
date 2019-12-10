<template>
    <div class="admin-settings-records">
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
                <th>Оновити</th>
                <th>Видалити</th>
            </tr>

            <tr :key="record._id" v-for="(record, index) in records">
                <td><input v-model="records[index].registerDate"></td>
                <td><input v-model="records[index].shop"></td>
                <td><input v-model="records[index].servicerFio"></td>
                <td><input v-model="records[index].servicerNumber"></td>
                <td><input v-model="records[index].date"></td>
                <td><input v-model="records[index].orderNumber"></td>
                <td><input v-model="records[index].customerFio"></td>
                <td><input v-model="records[index].customerNumber"></td>
                <td><input v-model="records[index].smartphoneModel"></td>
                <td><input v-model="records[index].imei"></td>
                <td><input v-model="records[index].complectation"></td>
                <td><input v-model="records[index].smartphonePrice"></td>
                <td><input v-model="records[index].status"></td>
                <td><button @click="updateRecord(records[index])" type="submit">Оновити</button></td>
                <td><button @click="deleteRecord(record)" type="submit">Видалити</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    data() {
        return {
            records: []
        }
    },
    methods: {
        getRecords() {
            axios.get('/admin/getRecords')
                .then(res => this.records = res.data)
                .catch(err => console.log(err));
        },
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
        deleteRecord(record) {
            axios.post(`/admin/deleteRecord/${record._id}`)
                .then(res => alert('Запис успішно видалено'))
                .then(() => this.getRecords())
                .catch(err => console.log(err));
        },
        updateRecord(recordsData) {
            const date = moment().diff(moment(recordsData.registerDate),'days');
            if (date > 365) recordsData.status = 'Прострочено';
            else if (date <= 365 && recordsData.orderDate) recordsData.status = 'Проведено обмін';
            else if (date <= 365 && !recordsData.orderDate) recordsData.status = 'Зареєстровано';
            axios.post(`/admin/editRecord/${recordsData._id}`, recordsData)
                .then(res => alert('Запис успішно оновлено'))
                .then(() => this.getRecords())
                .catch(err => console.log(err));
        }
    },
    created() {
        this.getRecords();
    }
}
</script>

<style lang="scss" scoped>
.admin-settings-records {
    font-size: .8rem;
    overflow-x: visible;

    input {
        font-size: inherit;
        width: 7rem;
    }

    tr {
        margin-bottom: .7rem;
    }
}
</style>

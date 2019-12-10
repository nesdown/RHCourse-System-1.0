<template>
    <div class="admin-settings-infofields">
        <h2>Редагування вспливаючих підказок</h2>
        <div class="info-field">
            <input type="text" placeholder="Русское описание" v-model="firstInfofield.ru">
            <input type="text" placeholder="Опис українською" v-model="firstInfofield.ua">
            <button @click="updateInfoField(firstInfofield.ru, firstInfofield.ua, firstInfofield._id)">Оновити</button>
        </div>
        <div class="info-field">
            <input type="text" placeholder="Русское описание" v-model="secondInfofield.ru">
            <input type="text" placeholder="Опис українською" v-model="secondInfofield.ua">
            <button @click="updateInfoField(secondInfofield.ru, secondInfofield.ua, secondInfofield._id)">Оновити</button>
        </div>
        <div class="info-field">
            <input type="text" placeholder="Русское описание" v-model="thirdInfofield.ru">
            <input type="text" placeholder="Опис українською" v-model="thirdInfofield.ua">
            <button @click="updateInfoField(thirdInfofield.ru, thirdInfofield.ua, thirdInfofield._id)">Оновити</button>
        </div>
        <div class="info-field">
            <input type="text" placeholder="Русское описание" v-model="fourthInfofield.ru">
            <input type="text" placeholder="Опис українською" v-model="fourthInfofield.ua">
            <button @click="updateInfoField(fourthInfofield.ru, fourthInfofield.ua, fourthInfofield._id)">Оновити</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            infofieldsList: [], // container for infofields data that obtains from server
        }
    },
    created() {
        this.getInfoFields();
    },
    methods: {
        getInfoFields() {
            // gets all infofields from server

            axios.get('/admin/getInfoFields')
                 .then(res => this.infofieldsList = res.data)
                 .catch(err => console.log(err));
        },
        updateInfoField(ru, ua, id) {
            // updates infofields with new data
            
            axios.post(`/admin/updateInfoField/${id}`, {ru: ru, ua: ua})
                 .then(res => alert('Поле оновлено'))
                 .catch(err => alert('Поле не вдалося оновити'));
        }
    },
    asyncComputed: {
        firstInfofield() {
            return axios.get('/admin/getInfoField/5c7423ece7179a3e36dcde62')
                   .then(res => res.data)
                   .catch(err => console.log(err));
        },
        secondInfofield() {
            return axios.get('/admin/getInfoField/5c742639e7179a3e36dce044')
                   .then(res => res.data)
                   .catch(err => console.log(err));
        },
        thirdInfofield() {
            return axios.get('/admin/getInfoField/5c742649e7179a3e36dce04c')
                   .then(res => res.data)
                   .catch(err => console.log(err));
        },
        fourthInfofield() {
            return axios.get('/admin/getInfoField/5c742626e7179a3e36dce034')
                   .then(res => res.data)
                   .catch(err => console.log(err));
        }
    }
}
</script>

<style lang="scss" scoped>
.admin-settings-infofields {
    h2 {
        margin-bottom: 2rem;
    }

    .info-field {
        input {
            margin-right: 2rem;
        }
        margin-bottom: 2rem;
    }
}
</style>

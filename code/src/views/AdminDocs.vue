<template>
    <div class="admin-docs">
        <header class="admin-docs__header">Шаблони документів</header>
        <admin-menu class="admin-docs__menu"/>
        <div class="admin-docs__content">
            <div class="instruction">
                <h2>Інструкція щодо змінення шаблонів документів</h2>

                <p>Завантаженим документам слід бути з розширенням docx. Для змін місця (або при необхідності додати нове місце для вже існуючого) полів, необхідно обрамити фігурними дужками певний "тег" і вставити його в необхідну позицію в документі.</p>
                <p>Наприклад, якщо в документі написати "Шановний, {customerFio}", то при рендері з даними ПІБ "Петров Іван Іванович" вихідний рядок буде виду "Шановний, Петров Іван Іванович".</p>
                <p><strong>Перелік усіх можливих полів:</strong></p>
                <ul>
                    <li>ПІБ користувача: {customerFio}</li>
                    <li>Дата проведення обміну: {tradeDate}</li>
                    <li>Назва магазину: {shop}</li>
                    <li>Компенсація: {compensation}</li>
                    <li>Модель смартфону: {smartphoneModel}</li>
                    <li>IMEI: {imei}</li>
                    <li>Дата проведення регістрації: {registerDate}</li>
                    <li>Ціна смартфону: {smartphonePrice}</li>
                    <li>ПІБ співробітника: {servicerFio}</li>
                    <li>Номер співробітника: {servicerNumber}</li>
                    <li>Дата покупки смартфону: {date}</li>
                    <li>Номер заказу: {orderNumber}</li>
                    <li>Номер користувача: {customerNumber}</li>
                </ul>
                <p>Зауважте, що деякі поля неможливо використивувати в файлі інструкцій, а деякі - в файлі акту (через відсутність потрібних на той момент даних).</p>
            </div>

            <div class="file">
                <form action="/admin/saveFile" method="POST" enctype="multipart/form-data">
                    <h3 class="file__title">Пам'ятка користувача</h3>
                    <input type="file" name="instruction">
                    <button type="submit">Завантажити новий шаблон</button>
                </form>
            </div>

            <div class="file">
                <form action="/admin/saveFile" method="POST" enctype="multipart/form-data">
                    <h3 class="file__title">Договір міни та Акт прийому-передачі</h3>
                    <input type="file" name="act">
                    <button type="submit">Завантажити новий шаблон</button>                    
                </form>

            </div>
        </div>
    </div>    
</template>

<script>
import axios from 'axios';

import AdminMenu from '../components/AdminMenu.vue';

import moment from 'moment';

export default {
    components: {
        'admin-menu': AdminMenu
    },
    created() {
        
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>

.admin-docs {
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

    &__content {
        // background: red;
        grid-row: 3/4;
        // grid-column: 2/3;
        padding: 3rem;
        font-size: 1.2rem;
        // margin: auto;
        word-wrap: none;
        display: grid;
        grid-column-gap: 4rem;
        margin: auto;

        .instruction {
            h2, p {
                margin-bottom: 1.5rem;
            }
        }

        .file {
            input {
                display: block;
                margin-bottom: 1rem;
            }

            h3 {
                margin-bottom: 1rem;
            }
            margin-bottom: 3rem;
        }
    }
}
</style>

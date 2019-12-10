<template>
    <div class="admin-settings-dropdowns">
        <h2>Налаштування випадаючих списків</h2>

        <div class="dropdown-section">
            <h3>Моделі смартфонів</h3>
            <div class="dropdown">
                <ul class="dropdown__left">
                    <li>Українською</li>
                    <li :key="model" v-for="(model, index) in modelsUa">{{model}}</li>
                </ul>
                <ul class="dropdown__right">
                    <li>Російською</li>
                    <li :key="model" v-for="(model, index) in modelsRu">
                        {{model}}
                        <svg @click="removeItem(index, [modelsUa, modelsRu], '5c6347cc3775886f656c64aa', 'smartphoneModel')">
                            <use xlink:href="../assets/icons.svg#icon-trash"></use>
                        </svg>
                    </li>
                </ul>
            </div>
            Якщо хочете додати нову модель - заповніть поля нижче та натисніть додати
            <input type="text" placeholder="Українською" v-model="newModelUa">
            <input type="text" placeholder="Російською" v-model="newModelRu">
            <button @click="addItem([modelsUa, modelsRu], newModelUa, newModelRu, '5c6347cc3775886f656c64aa', 'smartphoneModel')">Додати нову модель</button>
        </div>

        <div class="dropdown-section">
            <h3>Адреси</h3>
            <div class="dropdown shops">
                <ul class="dropdown__left">
                    <li>Українською</li>
                    <li :key="shop" v-for="(shop, index) in shopsUa">{{shop}}</li>
                </ul>
                <ul class="dropdown__right">
                    <li>Російською</li>
                    <li :key="shop" v-for="(shop, index) in shopsRu">
                        {{shop}}
                        <svg @click="removeItem(index, [shopsUa, shopsRu], '5c76b555cebfcf277b00b23f', 'address')">
                            <use xlink:href="../assets/icons.svg#icon-trash"></use>
                        </svg>
                    </li>
                </ul>
            </div>
            Якщо хочете додати нову адресу - заповніть поля нижче та натисніть додати
            <input type="text" placeholder="Українською" v-model="newShopUa">
            <input type="text" placeholder="Російською" v-model="newShopRu">
            <button @click="addItem([shopsUa, shopsRu], newShopUa, newShopRu, '5c76b555cebfcf277b00b23f', 'address')">Додати нову адресу</button>
        </div>

        <div class="dropdown-section">
            <h3>Комплектації</h3>
            <div class="dropdown">
                <ul class="dropdown__left">
                    <li>Українською</li>
                    <li :key="complectation" v-for="(complectation, index) in complectationUa">{{complectation}}</li>
                </ul>
                <ul class="dropdown__right">
                    <li>Російською</li>
                    <li :key="complectation" v-for="(complectation, index) in complectationRu">
                        {{complectation}}
                        <svg @click="removeItem(index, [complectationUa, complectationRu], '5c634e84e1eec2751356eecc', 'complectation')">
                            <use xlink:href="../assets/icons.svg#icon-trash"></use>
                        </svg>
                    </li>
                </ul>
            </div>
            Якщо хочете додати нову комплектацію - заповніть поля нижче та натисніть додати
            <input type="text" placeholder="Українською" v-model="newComplectationUa">
            <input type="text" placeholder="Російською" v-model="newComplectationRu">
            <button @click="addItem([complectationUa, complectationRu], newComplectationUa, newComplectationRu, '5c634e84e1eec2751356eecc', 'complectation')">Додати нову комплектацію</button>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            newModelUa: '', // v-model for updated model's UA localization
            newModelRu: '', // v-model for updated model's RU localization
            newShopUa: '', // v-model for updated shop's UA localization
            newShopRu: '', // v-model for updated shop's RU localization
            newComplectationRu: '', // v-model for updated complecation RU localization
            newComplectationUa: '' // v-model for updated complecation UA localization
        }
    },
    asyncComputed: {
        modelsUa() {
            // gets list of models in UA language
            return axios.get('/admin/getDropdown/5c6347cc3775886f656c64aa')
                .then(res => res.data.ua)
                .catch(err => console.log(err));
        },
        modelsRu() {
            // gets list of models in RU language
            return axios.get('/admin/getDropdown/5c6347cc3775886f656c64aa')
                .then(res => res.data.ru)
                .catch(err => console.log(err));
        },
        shopsUa() {
            // gets list of shops in UA language
            return axios.get('/admin/getDropdown/5c76b555cebfcf277b00b23f')
                .then(res => res.data.ua)
                .catch(err => console.log(err));
        },
        shopsRu() {
            // gets list of shops in RU language
            return axios.get('/admin/getDropdown/5c76b555cebfcf277b00b23f')
                .then(res => res.data.ru)
                .catch(err => console.log(err));
        },
        complectationUa() {
            // gets list of complecations in UA language
            return axios.get('/admin/getDropdown/5c634e84e1eec2751356eecc')
                .then(res => res.data.ua)
                .catch(err => console.log(err));
        },
        complectationRu() {
            // gets list of complectations in RU language
            return axios.get('/admin/getDropdown/5c634e84e1eec2751356eecc')
                .then(res => res.data.ru)
                .catch(err => console.log(err));
        }

    },
    methods: {
        removeItem(index, arrays, dropdownId, name) {
            // removes field in dropdown
            arrays[0].splice(index, 1);
            arrays[1].splice(index, 1);

            let data = {
                ua: arrays[0],
                ru: arrays[1],
                name: name
            }

            axios.post(`/admin/editDropdown/${dropdownId}`, data)
                .then(() => alert('Поле успішно видалено'))
                .catch(err => console.log(err));
        },
        addItem(arrays, valueUa, valueRu, dropdownId, name) {
            // adds field to dropdown
            
            arrays[0].push(valueUa);
            arrays[1].push(valueRu);

            let data = {
                ua: arrays[0],
                ru: arrays[1],
                name: name
            }

            axios.post(`/admin/editDropdown/${dropdownId}`, data)
                .then(() => alert('Поле успішно додано'))
                .catch(err => console.log(err));

        }
    }
}
</script>

<style lang="scss">
    .admin-settings-dropdowns {
        input {
            display: block;
            margin-top: 1rem;
        }

        button {
            margin-top: 1rem;
            margin-bottom: 2rem;
        }

        h2 {
            margin-bottom: 2rem;
        }

        .dropdown {
            font-size: 1.1rem;
            display: flex;
            ul {
                margin-top: 2rem;
                list-style: none;
                li {
                    margin-bottom: 2rem;
                }
                li:first-child {
                    font-weight: bold;
                }
            }

            &__left {
                margin-right: 5rem;
            }

            &__right {

                li {
                    &:not(:first-child) {
                        position: relative;
                        // width: 25rem;

                        svg {
                            position: absolute;
                            width: 2rem;
                            height: 2rem;
                            right: -6.5rem;
                            top: 0;
                            cursor: pointer;
                        }
                    }

                }
            }
        }
    }
        // ul {
        //     margin-top: 2rem;
        //     margin-bottom: 1rem;
        //     width: 30rem;
        //     li {
        //         display: flex;
        //         align-items: start;
        //         justify-content: space-between;
                
        //         &:first-child {
        //             font-weight: bold;
        //             margin-bottom: 2rem;
        //         }

        //         &:not(:first-child) {
        //             position: relative;
        //             margin-bottom: 2rem;

        //             &::after {
        //                 position: absolute;
        //                 content: '';
        //                 background: url(../assets/trash.svg);
        //                 width: 2rem;
        //                 height: 2rem;
        //                 cursor: pointer;
        //                 right: -5rem;
        //                 background-size: cover;
        //             }
        //         }
        //         svg {
        //             margin-left: 1rem;
        //             cursor: pointer;    
        //             width: 2rem;
        //             height: 2rem;
        //         }
                
        //         span:last-of-type {
        //             margin-left: 2rem;
        //         }
        //     }
        // }
</style>

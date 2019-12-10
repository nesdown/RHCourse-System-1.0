<template>
    <div class="register">
        <client-header class="register__header"></client-header>
        <div class="register__content">
            <div class="register__content__form">
                <h2 class="register__content__form__title">{{$t('serviceRegistration')}}</h2>

                <!-- first window -->
                <div class="register__content__form__fields" v-if="step === 1">
                    <div class="notification field">{{$t('notification')}}</div>
                    <select class="field shop-name"
                            v-model="shop"
                            @blur="$v.shop.$touch()"
                            :class="{'field--error': $v.shop.$error}">
                        <!-- Rewrite to server GET -->
                        <option value="" disabled selected>{{$t('chooseShop')}}</option>
                        <option :key="address" v-for="address in shopData">{{address}}</option>
                    </select>
                    <input
                        type="text" class="field" :placeholder="$t('servicerFio')"
                        v-model="servicerFio"
                        @input="$v.servicerFio.$touch()"
                        :class="{'field--error': $v.servicerFio.$error}">
                    <the-mask 
                        type="tel" class="field" 
                        :placeholder="$t('servicerNumber')"
                        :mask="'+380#########'"
                        :masked="true"
                        v-model="servicerNumber"
                        @input="$v.servicerNumber.$touch()"
                        :class="{'field--error': $v.servicerNumber.$invalid && $v.servicerNumber.$dirty}"/>
                </div>

                <!-- second window -->
                <div class="register__content__form__fields" v-if="step === 2">
                    <the-mask
                        type="text" class="field" :placeholder="$t('date')"
                        v-model="date"
                        :mask="'##.##.####'"
                        :masked="true"
                        @input="$v.date.$touch()"
                        :class="{'field--error': $v.date.$invalid && $v.date.$dirty}"/>
                    <input 
                        type="text" class="field" :placeholder="$t('orderNumber')"
                        v-model="orderNumber"
                        @input="$v.orderNumber.$touch()"
                        :class="{'field--error': $v.orderNumber.$error}">                   
                    <input 
                        type="text" class="field" :placeholder="$t('customerFio')"
                        v-model="customerFio"
                        @input="$v.customerFio.$touch()"
                        :class="{'field--error': $v.customerFio.$error}">
                    <the-mask 
                        type="tel" class="field" :placeholder="$t('customerNumber')"
                        v-model="customerNumber"
                        :mask="'+380#########'"
                        :masked="true"
                        @blur="$v.customerNumber.$touch()"
                        :class="{'field--error': $v.customerNumber.$invalid && $v.customerNumber.$dirty}"/>
                </div>

                <!-- third window -->
                <div class="register__content__form__fields" v-if="step === 3">
                    <select class="field shop-name"
                            v-model="smartphoneModel"
                            @blur="$v.smartphoneModel.$touch()"
                            :class="{'field--error': $v.smartphoneModel.$error}">
                        <!-- Rewrite to server GET -->
                        <option value="" disabled selected>{{$t('smartphoneModel')}}</option>
                        <option :key="model" v-for="model in smartphoneModelData">{{model}}</option>
                    </select>
                    <the-mask 
                        type="text" class="field" placeholder="IMEI"
                        v-model="imei"
                        @input="$v.imei.$touch()"
                        :class="{'field--error': $v.imei.$invalid && $v.imei.$dirty}"
                        :mask="'###############'"
                        :masked="true"/>
                    <p class="info" v-if="!$v.imei.isUniqueImei && $v.imei.length">{{$t('imeiWarning')}}</p>
                    <select class="field shop-name"
                            v-model="complectation"
                            @blur="$v.complectation.$touch()"
                            :class="{'field--error': $v.complectation.$error}">
                        <!-- Rewrite to server GET -->
                        <option value="" disabled selected>{{$t('complectation')}}</option>
                        <option :key="item" v-for="item in complectationData">{{item}}</option>
                    </select>
                    <input 
                        type="text" class="field" :placeholder="$t('smartphonePrice')"
                        v-model="smartphonePrice"
                        @blur="$v.smartphonePrice.$touch()"
                        :class="{'field--error': $v.smartphonePrice.$error}">
                        <!-- {{smartphonePrice}} -->
                </div>

                <div class="register__content__form__fields" v-if="step === 4">
                    
                    <div class="print-field">
                        <form action="/admin/generateInstruction" method="POST">
                         <input type="hidden" name="tradeDate" :value="currentDate">
                            
                            <input type="hidden" name="customerFio" :value="customerFio">
                            <input type="hidden" name="shop" :value="shop">
                            <input type="hidden" name="smartphoneModel" :value="smartphoneModel">
                            <input type="hidden" name="smartphonePrice" :value="smartphonePrice">
                            <input type="hidden" name="imei" :value="imei">
                            <input type="hidden" name="servicerFio" :value="servicerFio">
                            <input type="hidden" name="servicerNumber" :value="servicerNumber">
                            <input type="hidden" name="date" :value="date">
                            <input type="hidden" name="orderNumber" :value="orderNumber">
                            <input type="hidden" name="customerNumber" :value="customerNumber">
                            <input type="hidden" name="complectation" :value="complectation">
                            <input type="hidden" name="registerDate" :value="currentDate">
                            
                            <button type="submit">
                                <svg class="register__icon">
                                    <use xlink:href="../assets/icons.svg#icon-printer"></use>
                                </svg>
                                <p class="register__text">{{$t('printRegFile')}}</p>
                            </button>
                        </form>
                    </div>

                    <div class="submit-field">
                        <input v-model="finalCheck" type="checkbox" id="submit-checkbox">
                        <label for="submit-checkbox">{{$t('finalRegCheck')}}</label>
                    </div>

                </div>

                <p class="info" v-if="errorInfo">{{$t('validationError')}}</p>
                
                <!-- {{$v}} -->

                <div class="progress-bar">
                    <div class="progress-bar__step" 
                        :class="{'progress-bar__step--active': step === 1 }"></div>
                    <div class="progress-bar__step" 
                        :class="{'progress-bar__step--active': step === 2 }"></div>
                    <div class="progress-bar__step" 
                        :class="{'progress-bar__step--active': step === 3 }"></div>
                    <div class="progress-bar__step" 
                        :class="{'progress-bar__step--active': step === 4 }"></div>
                </div>
                
                <div @click="nextSection" class="btn">
                    {{ step != 4 ? $t('nextBtn') : $t('registerService')}}
                </div>

            </div>
        </div>
    </div>    
</template>

<script>
import { required, maxLength, numeric, minValue, decimal } from 'vuelidate/lib/validators';
import ClientHeader from '../components/ClientHeader.vue';
import moment from 'moment';
import axios from 'axios';

const cyrillic = (value) => {
    let reg = new RegExp('^[а-яА-ЯЇїІіЄєҐґ\' ]+$');
    return reg.test(value);
};

const length = param => value => value.length === param;

const dateValidator = value => {
    let isDateValid = moment(value, 'DD.MM.YYYY', true).isValid();
    let currDate = new Date();
    currDate.setUTCHours(0,0,0,0);
    let lessThanCurrentDate = moment(value, 'DD.MM.YYYY').diff(moment(currDate, 'DD.MM.YYYY'), 'hours');
    return isDateValid && lessThanCurrentDate <= 4;
}

export default {
    components: {
        'client-header': ClientHeader
    },
    data() {
        return {
            step: 1, // step of registration process
            shop: '', // v-model for shop
            servicerFio: '', // v-model for servicer FIO
            servicerNumber: '', // v-model for servicer telephone number
            date: '', // v-model for purchase date
            orderNumber: '', // v-model for order number
            customerFio: '', // v-model for customer FIO
            customerNumber: '', // v-model for customer telephone number
            smartphoneModel: '', // v-model for smartphone model
            imei: '', // v-model for imei
            complectation: '', // v-model for complectation
            smartphonePrice: '', // v-model for smartphone price
            finalCheck: false, // v-model for final checkbox of registration
        
            ////
            errorInfo: false // true if there are some errors on registration
        }
    },
    computed: {
        currentDate() {
            // returns current date

            return moment().utc().toISOString();
        }
    },
    asyncComputed: {
        smartphoneModelData: {
            // gets list of smartphone models

            get() {
                return axios.get('/admin/getDropdown/5c6347cc3775886f656c64aa')
                            .then(dropdown => {
                                if (this.$i18n.locale === 'ua') return dropdown.data.ua;
                                else return dropdown.data.ru;
                            })
            },
            watch() {
                this.$i18n.locale;
            }
        },
        shopData: {
            // gets list of shops

            get() {
                return axios.get('/admin/getDropdown/5c76b555cebfcf277b00b23f')
                            .then(dropdown => {
                                if (this.$i18n.locale === 'ua') return dropdown.data.ua;
                                else return dropdown.data.ru;
                            })
            },
            watch() {
                this.$i18n.locale;
            }
        },
        complectationData: {
            // gets list of complectations

            get() {
                return axios.get('/admin/getDropdown/5c634e84e1eec2751356eecc')
                            .then(dropdown => {
                                if (this.$i18n.locale === 'ua') return dropdown.data.ua;
                                else return dropdown.data.ru;
                            })
            },
            watch() {
                this.$i18n.locale;
            }
        }
    },
    validations: {
        //validations for registration fields

        shop: {
            required
        },
        servicerFio: {
            required,
            cyrillic,
            maxLength: maxLength(45)
        },
        servicerNumber: {
            length: length(13),
            required
        },
        date: {
            required,
            dateValidator
        },
        orderNumber: {
            required,
            maxLength: maxLength(20),
            numeric
        },
        customerFio: {
            required,
            maxLength: maxLength(45),
            cyrillic
        },
        customerNumber: {
            length: length(13),
            required
        },
        smartphoneModel: {
            required
        },
        imei: {
            required,
            numeric,
            length: length(15),
            async isUniqueImei(value) {
                if (value === '') return await true;
                if (value.length !== 15) return await true;

                if (value.length === 15) {
                    let response = await axios.get(`/admin/uniqueImei/${value}`);
                    console.log(response);
                    return await response.data;
                }
            }
        },
        complectation: {
            required
        },
        smartphonePrice: {
            decimal,
            required,
            minValue: minValue(0)
        },
        finalCheck: {
            required
        }
    },
    mounted() {
        this.$store.commit('successfulAddChange', false);
    },
    methods: {
        nextSection() {
            // registration process control

            switch(this.step) {
                case 1:
                    if (!this.$v.shop.$invalid && !this.$v.servicerFio.$invalid && !this.$v.servicerNumber.$invalid) {
                        this.step++;
                        this.errorInfo = false;
                    } else {
                        this.errorInfo = true;
                    }
                    break;
                case 2:
                    if (!this.$v.date.$invalid && !this.$v.orderNumber.$invalid && !this.$v.customerFio.$invalid && !this.$v.customerNumber.$invalid) {
                        this.step++;
                        this.errorInfo = false;
                    } else {
                        this.errorInfo = true;
                    }
                    break;
                case 3:
                    if (!this.$v.smartphoneModel.$invalid && !this.$v.imei.$invalid && !this.$v.complectation.$invalid && !this.$v.smartphonePrice.$invalid) {
                        this.step++;
                        this.errorInfo = false;
                    } else {
                        this.errorInfo = true;
                    }
                    break;
                case 4:
                    if (this.finalCheck) {
                        this.errorInfo = false;
                        this.$store.commit('successfulAddChange', true);
                        this.sendRecord();
                        this.$router.push('/');
                    } else {
                        this.errorInfo = true;
                    }
                    break;
            }
        },
        sendRecord() {
            // sends new record to server

            let status = moment().diff(moment(this.date, 'DD.MM.YYYY'),'days') <= 365 ? 'Зареєстровано' : 'Прострочено';
            let record = {
                shop: this.shop,
                servicerFio: this.servicerFio,
                servicerNumber: this.servicerNumber,
                date: moment(this.date, 'DD.MM.YYYY').local(),
                registerDate: moment().utc().toISOString(),
                orderNumber: this.orderNumber,
                customerFio: this.customerFio,
                customerNumber: this.customerNumber,
                smartphoneModel: this.smartphoneModel,
                imei: this.imei,
                complectation: this.complectation,
                smartphonePrice: this.smartphonePrice,
                status: status
            }

            axios.post('/admin/createRecord', record)
                .catch(e => console.log(e));

        }
    }
}
</script>

<style lang="scss" scoped>
.register {
    display: grid;
    width: 100vw;
    height: 100vh;

    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr 4fr;
    grid-column-gap: 5rem;
    grid-row-gap: 5rem;

    &__header {
        grid-column: 1 / -1;
        grid-row: 1 / 2;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__content {
        grid-column: 3 / 11;
        align-self: start;
        // margin-top: 10rem;
        // background: pink;
        grid-row: 2 / 3;
        display: grid;
        border: 1px solid rgb(34, 32, 30);
        grid-template-columns: 1fr 1.2fr 1fr;
        padding: 3rem 0;

        @media screen and (max-width: 56.25em) {
            grid-template-columns: 1fr;
        }
        // height: 25vw;

        &__form {
            grid-column: 2 / 3;

            @media screen and (max-width: 56.25em) {
                grid-column: 1/3;
                padding: 2rem 5rem;
            }
            
            @media screen and (max-width: 50em) {
                padding: 2rem 8rem;
            }


            @media screen and (max-width: 37.5em) {
                font-size: 1.5rem;
            }
            // justify-self: center;

            font-size: 1.5rem;

            &__title {
                font-size: 2rem;
                font-weight: 500;
                color: black;
                margin-bottom: 3rem;
            }

            &__fields {

                display: flex;
                flex-direction: column;

                .notification {
                    background-image: linear-gradient(to bottom, lightgreen 40%, rgb(95, 170, 95));
                    display: flex;
                    // justify-content: center;
                    align-items: center;
                }
                .field {
                    color: #666;
                    box-sizing: border-box;
                    outline: none;
                    font-size: inherit;
                    padding-left: 1.5rem;
                    height: 4rem;
                    margin-bottom: 2rem;

                    &--error {
                        border: 1px solid red;
                    }
                }
                
                select.field {
                    background: white;
                }

                .print-field {
                    form {

                        button {
                            background: none;
                            outline: none;
                            border: none;
                            display: flex;
                            align-items: center;
                            margin-top: 3rem;
                            cursor: pointer;
                            margin-bottom: 4rem;

                            p {
                                text-decoration: underline;
                                margin-left: 3rem;
                                font-size: 1.5rem;
                                text-align: left;
                            }
                        }
                    }
                }

                .submit-field {
                    margin-bottom: 8.7rem;
                    input {
                        display: none;
                        &:checked + label::after {
                            content: '';
                            width: 2rem;
                            height: 2rem;
                            position: absolute;
                            // background: pink;
                            background-image: url(../assets/checkmark.svg);
                            background-size: cover;
                            left: -6.75rem;
                            top: 5px;
                        }
                        & + label::before {
                            content: '';
                            position: absolute;
                            width: 2.5rem;
                            height: 2.5rem;
                            background-color: white;
                            border: 1px solid black;
                            left: -7rem;
                        }
                    }

                    label {
                        cursor: pointer;
                        position: relative;
                        left: 7.5rem;


                    }
                }
            }

            .progress-bar {
                display: flex;
                width: 80%;
                height: 2rem;
                margin: 3rem auto;
                // margin: auto;

                &__step {
                    height: 2rem;
                    background: #666;
                    flex: 1;
                    // cursor: pointer;

                    &--active {
                        background: rgb(250, 233, 6);
                    }
                }

                &__step:not(:last-child) {
                    margin-right: 1rem;
                }
            }

            .btn {
                display: block;
                width: 12vw;
                text-align: center;
                background: rgb(250, 233, 6);
                border: 1px solid rgb(34, 32, 30);
                padding: 1.5rem 2.5rem;
                font-size: 1.5rem;
                border-radius: 10px;
                cursor: pointer;
                transition: all .2s;
                backface-visibility: hidden;
                // justify-self: stretch;
                margin: auto;
                // justify-self: center;
                &:hover {
                    transform: scale(1.05);
                }

                @media screen and (max-width: 37.5em) {
                    width: 25vw;
                }
            }
        }
        
    }

    &__icon {
        width: 4.5rem;
        height: 4.5rem;

    }


}
</style>

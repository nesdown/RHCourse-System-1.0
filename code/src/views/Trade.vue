<template>
    <div class="trade">
        <client-header class="trade__header"></client-header>
        <div class="trade__content">
            <div class="trade__content__form">
                <h2 class="trade__content__form__title">
                    {{ title }}
                </h2>

                <!-- first window -->
                <div class="trade__content__form__fields" v-if="step === 1">
                    <div class="notification field">{{$t('notificationTrade')}}</div>
                    <div class="search-field">
                        <the-mask
                            type="text" class="field" :placeholder="$t('notificationTrade')"
                            v-model="imei"
                            :mask="'###############'"
                            masked="true"
                            @input="$v.imei.$touch(); findImei()"
                            :class="{'field--error': $v.imei.$invalid && $v.imei.$dirty}"/>
                        <svg>
                            <use xlink:href="../assets/icons.svg#icon-search"></use>
                        </svg>
                    </div>

                    <p v-if="imeiFromServerIsEmpty && imei.length === 15">Даних цього IMEI не знайдено</p>
                    <div v-if="!imeiFromServerIsEmpty" class="imei-list">
                        <div class="imei-list__imei">IMEI: {{imeiFromServer.imei}}</div>
                        <div class="imei-list__status">Статус: {{imeiFromServer.status}}</div>
                        <div class="imei-list__expired">{{$t('garanty')}} {{this.expireDate}}</div>
                    </div>
                </div>

                <!-- second window -->
                <div class="trade__content__form__fields" v-if="step === 2">
                    <div class="yellow-checkbox-field">
                        <input type="checkbox" id="yellow-checkbox-1" class="field"
                            v-model="documentCopyCheck">
                        <label for="yellow-checkbox-1">{{$t('checkbox1')}}</label>
                    </div>
                    <div class="yellow-checkbox-field">
                        <input type="checkbox" id="yellow-checkbox-2" class="field"
                            v-model="garantyCheck">
                        <label for="yellow-checkbox-2">{{$t('checkbox2')}}</label>
                    </div>
                    <div class="yellow-checkbox-field">
                        <input type="checkbox" id="yellow-checkbox-3" class="field"
                            v-model="complectationCheck">
                        <label for="yellow-checkbox-3">{{$t('checkbox3')}}</label>
                    </div>
                    <div class="yellow-checkbox-field">
                        <input type="checkbox" id="yellow-checkbox-4" class="field"
                            v-model="idCheck">
                        <label for="yellow-checkbox-4">{{$t('checkbox4')}}</label>
                    </div>
                </div>

                <!-- third window -->
                <div class="trade__content__form__fields" v-if="step === 3">
                    <div class="yellow-checkbox-field">
                        <input type="checkbox" id="yellow-checkbox-5" class="field"
                            v-model="imeiCheck">
                        <label for="yellow-checkbox-5">{{$t('checkbox5')}}</label>
                        <svg>
                            <use xlink:href="../assets/icons.svg#icon-info"></use>
                            <title>{{setInfoFieldLocale(firstInfofield)}}</title>
                        </svg>
                    </div>
                    <div class="yellow-checkbox-field">
                        <input type="checkbox" id="yellow-checkbox-6" class="field"
                            v-model="qualityCheck">
                        <label for="yellow-checkbox-6">{{$t('checkbox6')}}</label>
                        <svg>
                            <use xlink:href="../assets/icons.svg#icon-info"></use>
                            <title>{{setInfoFieldLocale(secondInfofield)}}</title>
                        </svg>
                    </div>
                    <div class="yellow-checkbox-field">
                        <input type="checkbox" id="yellow-checkbox-7" class="field"
                            v-model="accountCheck">
                        <label for="yellow-checkbox-7">{{$t('checkbox7')}}</label>
                        <svg>
                            <use xlink:href="../assets/icons.svg#icon-info"></use>
                            <title>{{setInfoFieldLocale(thirdInfofield)}}</title>
                        </svg>
                    </div>
                    <div class="yellow-checkbox-field">
                        <input type="checkbox" id="yellow-checkbox-8" class="field"
                            v-model="factoryCheck">
                        <label for="yellow-checkbox-8">{{$t('checkbox8')}}</label>
                        <svg>
                            <use xlink:href="../assets/icons.svg#icon-info"></use>
                            <title>{{setInfoFieldLocale(fourthInfofield)}}</title>
                        </svg>
                    </div>
                </div>

                <div class="trade__content__form__fields" v-if="step === 4">
                    
                    <div class="print-field">
                        <form method="POST" action="/admin/generateAct">
                            
                            <input type="hidden" name="tradeDate" :value="currentDate">
                            <input type="hidden" name="customerFio" :value="recordData[0].customerFio">
                            <input type="hidden" name="shop" :value="recordData[0].shop">
                            <input type="hidden" name="compensation" :value="getCompensation(recordData[0].date)">
                            <input type="hidden" name="smartphoneModel" :value="recordData[0].smartphoneModel">
                            <input type="hidden" name="smartphonePrice" :value="recordData[0].smartphonePrice">
                            <input type="hidden" name="imei" :value="recordData[0].imei">
                            <input type="hidden" name="servicerFio" :value="recordData[0].servicerFio">
                            <input type="hidden" name="servicerNumber" :value="recordData[0].servicerNumber">
                            <input type="hidden" name="date" :value="recordData[0].date">
                            <input type="hidden" name="orderNumber" :value="recordData[0].orderNumber">
                            <input type="hidden" name="customerNumber" :value="recordData[0].customerNumber">
                            <input type="hidden" name="complectation" :value="recordData[0].complectation">
                            <input type="hidden" name="registerDate" :value="recordData[0].registerDate">

                            <button type="submit">
                                <svg class="trade__icon">
                                    <use xlink:href="../assets/icons.svg#icon-printer"></use>
                                </svg>
                                <p>{{$t('checkbox9')}}</p>
                            </button>
                        </form>
                    </div>

                    <div class="submit-field">
                        <input type="checkbox" id="submit-checkbox"
                            v-model="finalCheck">
                        <label for="submit-checkbox">{{$t('checkbox11')}}</label>
                    </div>

                </div>
               
                <p class="info" v-if="errorInfo">{{$t('validationError')}}</p>

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
                    {{ step != 4 ? $t('nextBtn') : $t('makeTrade')}}
                </div>

                <!-- {{$v}} -->
            </div>
        </div>
    </div>    
</template>

<script>
import { required, numeric } from 'vuelidate/lib/validators';
import ClientHeader from '../components/ClientHeader.vue';
import axios from 'axios';
import moment from 'moment';

const length = param => value => value.length === param;

export default {
    components: {
        'client-header': ClientHeader
    },
    data() {
        return {
            step: 1,
            imei: '',
            errorInfo: false,

            // checkboxes state
            documentCopyCheck: false,
            garantyCheck: false,
            complectationCheck: false,
            idCheck: false,
            imeiCheck: false,
            qualityCheck: false,
            accountCheck: false,
            factoryCheck: false,
            finalCheck: false,

            imeiFromServer: {},
            imeiFromServerIsEmpty: true,
            expireDate: '',

            formulaData: {},
            infofields: [],

            recordData: {}
        }
    },
    computed: {
        title() {
            // computes title during trading process
            let values = ['Пошук пристрою', 'Виконання умов обміну', 'Перевірка пристрою виконана', 'Обмін на сертифікати'];
            let rusValues = ['Поиск устройства', 'Выполнение условий обмена', 'Проверка устройства выполнена', 'Обмен на сертификаты'];
            if (this.$i18n.locale === 'ua') return values[this.step - 1];
            else return rusValues[this.step - 1];
        },
        daysInYear() {
            // calculates count of days in year
            return moment().endOf('year').diff(moment().startOf('year'), 'days');
        },
        currentDate() {
            // calculates current date
            return moment().utc().toISOString();
        }
    },
    mounted() {
        this.$store.commit('successfulAddChange', false);
        this.getInfoFields();
        this.getFormulaData();
    },
    validations: {
        imei: {
            required,
            numeric,
            length: length(15)
        },
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
    },
    methods: {
        nextSection() {
            // controls the trade process

            switch(this.step) {
                case 1:
                    if (!this.$v.imei.$invalid && this.imeiFromServer.status !== 'Проведено обмін' && Object.entries(this.imeiFromServer).length !== 0 && this.expireDate > 0) {
                        this.errorInfo = false;
                        this.step++;
                        this.findByImei();
                    } else this.errorInfo = true;
                    break;
                case 2:
                    if (this.documentCopyCheck && this.garantyCheck && this.complectationCheck && this.idCheck) {
                        this.errorInfo = false;
                        this.step++;
                    } else this.errorInfo = true;
                    break;
                case 3:
                    if (this.imeiCheck && this.qualityCheck && this.accountCheck && this.factoryCheck) {
                        this.errorInfo = false;
                        this.step++;
                    } else this.errorInfo = true;
                    break;
                case 4: 
                    if (this.finalCheck) {
                        this.errorInfo = false;
                        this.updateRecord();
                        this.$store.commit('successfulEditChange', true);
                        this.$router.push('/');
                    } else this.errorInfo = true;
                    break;
            }
        },
        findImei() {
            // checks if inserted imei will be unique in database

            if (this.imei.length === 15) {
                axios.get(`/admin/findByImei/${this.imei}`)
                    .then(result => {

                        if (result.data.length === 0) {
                            this.imeiFromServerIsEmpty = true;
                            this.imeiFromServer = {};
                        }
                        else {
                            this.errorInfo = false;
                            this.imeiFromServerIsEmpty = false;
                            this.imeiFromServer = result.data[0];

                            let startDate = moment(this.imeiFromServer.date);
                            let currDate = moment();
                            this.expireDate = this.daysInYear - moment(currDate).diff(startDate, 'days');
                        }
                    })
                    .catch(err => console.log(err));
            }
        },
        updateRecord() {
            // updates record status and adds some additional fields
            let compensation = this.getCompensation(this.imeiFromServer.date);
            let record = {
                shop: this.imeiFromServer.shop,
                servicerFio: this.imeiFromServer.servicerFio,
                servicerNumber: this.imeiFromServer.servicerNumber,
                date: this.imeiFromServer.date,
                orderNumber: this.imeiFromServer.orderNumber,
                customerFio: this.imeiFromServer.customerFio,
                customerNumber: this.imeiFromServer.customerNumber,
                smartphoneModel: this.imeiFromServer.smartphoneModel,
                imei: this.imeiFromServer.imei,
                complectation: this.imeiFromServer.complectation,
                smartphonePrice: this.imeiFromServer.smartphonePrice,
                registerDate: this.imeiFromServer.registerDate,
                orderDate: moment().utc().toISOString(),
                compensation: compensation,
                status: 'Проведено обмін'
            }

            axios.post(`/admin/editRecord/${this.imeiFromServer._id}`, record)
                .then(res => console.log(res))
                .catch(e => console.log(e));
        },
        getFormulaData() {
            // gets list of formulas data
            axios.get('/admin/getFormula/5c69650fe7179a27eb61f983')
                .then(res => {
                    this.formulaData = res.data;
                })
                .catch(err => console.log(err));
        },
        getCompensation(date) {
            // calculates compensations for record
            return moment().diff(date,'days') <= 180 ? this.formulaData.halfyear : this.formulaData.fullyear;
        },
        getInfoFields() {
            // gets list of infofields
            axios.get('/admin/getInfoFields')
                .then(res => this.infofields = res.data)
                .catch(err => console.log(err));
        },
        setInfoFieldLocale(field) {
            // sets properly localization for infofields
            if (this.$i18n.locale === 'ua') return field.ua;
            else return field.ru;
        },
        findByImei() {
            // looks for record that fits for inserted imei
            axios.get(`/admin/findByImei/${this.imei}`)
                 .then(res => this.recordData = res.data)
                 .catch(err => console.log(err));
        }

    }
}
</script>

<style lang="scss" scoped>
.trade {
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
        grid-template-columns: 1fr minmax(min-content, 2.5fr) 1fr;
        padding: 2rem 0;

        @media screen and (max-width: 56.25em) {
            grid-template-columns: 1fr;
        }

        @media screen and (max-width: 37.5em) {
            font-size: 60%;
        }
        // height: 25vw;

        &__form {
            grid-column: 2 / 3;
            // justify-self: center;
            @media screen and (max-width: 56.25em) {
                grid-column: 1/2;
                padding: 2rem 5rem;
            }

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
                            border: none;
                            outline: none;
                            display: flex;
                            align-items: center;
                            
                            &:first-child {
                                margin-top: 3rem;
                            }
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

                .search-field {
                    position: relative;
                    // display: flex;
                    input {
                        width: 100%;
                    }
                    svg {
                        width: 2.5rem;
                        height: 2.5rem;
                        fill: #666;
                        position: absolute;
                        right: 0;
                        top: 0.625rem;
                        right: 0.625rem;
                        cursor: pointer;
                
                    }

                }

                .submit-field {
                    margin-bottom: 8.7rem;
                    input {
                        display: none;
                        &:checked + label::after {
                            content: '';
                            width: 2.5rem;
                            height: 2.5rem;
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
                            width: 3rem;
                            height: 3rem;
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

                .yellow-checkbox-field {
                    // margin-bottom: 2rem;
                    padding: 2rem 0;
                    border-top: 1px solid #666;
                    position: relative;
                    &:last-child {
                        border-bottom: 1px solid #666;
                        margin-bottom: 3rem;
                    }

                    svg {
                        position: absolute;
                        fill: #666;
                        cursor: pointer;
                        width: 2rem;
                        height: 2rem;
                        right: 5.75vw;
                        @media screen and (max-width: 37.5em) {
                            display: none;
                        }
                    }

                    input {
                        display: none;
                        position: relative;
                        &:checked + label::after {
                            content: '';
                            width: 2rem;
                            height: 2rem;
                            position: absolute;
                            // background: pink;
                            background-image: url(../assets/checkmark.svg);
                            background-size: cover;
                            right: -4.65vw;
                            top: 0px;
                            @media screen and (max-width: 37.5em) {
                                right: -7.65vw;
                            }
                        }
                        & + label::before {
                            content: '';
                            position: absolute;
                            width: 3rem;
                            height: 3rem;
                            background-color: rgb(250, 233, 6);
                            right: -5vw;
                            top: -.5rem;

                            @media screen and (max-width: 37.5em) {
                                right: -8vw;
                            }   
                            // border: 1px solid black;
                        }
                    }

                    label {

                        // flex-shrink: 50%;
                        display: inline-block;
                        width: 80%;
                        cursor: pointer;
                        position: relative;
                        // width: 5rem;
                        // left: 7.5rem;


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
                width: 10vw;
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

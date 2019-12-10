<template>
    <div class="admin-settings-users">
        <h2>Редагування користувачів</h2>
        <ul>
            <li :key="user._id" v-for="user in users">
                <p>Логін: {{user.login}}</p>
                <p>Права адміна: {{user.isAdmin === true ? 'Так' : 'Ні'}}</p>
                <button @click="toggleUserAdmin(user)">Ввімкнути/вимкнути права адміна</button>
                <button @click="deleteUser(user)">Видалити користувача</button>
            </li>

        </ul>
        <h2>Створення користувача</h2>
        <div class="users-create">
            <input v-model="login" type="text" placeholder="Логін">
            <input v-model="password" type="password" placeholder="Пароль">
            <label for="isAdmin">Натисніть, щоб надати права адміна</label>
            <input v-model="isAdmin" type="checkbox" name="isAdmin" id="isAdmin">
            <button @click="createUser">Створити користувача</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            login: '', // v-model for login field
            password: '', // v-model for password field,
            isAdmin: false, // v-model for isAdmin field
            usersList: [] // container for all users data that obtains from server
        }
    },
    asyncComputed: {
        users: {
            // gets list of users from server
            get() {
                return axios.get('/admin/getUsers')
                    .then(res => res.data)
                    .catch(err => console.log(err));
            },
            watch() {
                this.usersList;
            }
        }
    },
    methods: {
        async toggleUserAdmin(user) {
            // set / disable admin privelegies to user

            const newAdmin = !user.isAdmin;

            const updatedUser = {
                login: user.login,
                password: user.password,
                isAdmin: newAdmin
            }

            await axios.post(`/admin/updateUser/${user._id}`, updatedUser);
            await this.fetchUsers();
        },
        async deleteUser(user) {
            // deletes user in database

            await axios.post(`/admin/deleteUser/${user._id}`);
            await this.fetchUsers();
        },
        fetchUsers() {
            // gets list of users from database

            axios.get('/admin/getUsers')
                .then(users => this.usersList = users.data)
                .catch(err => console.log(err));
        },
        async createUser() {
            // creates new user and writes it to database
            let user = {
                login: this.login,
                password: this.password,
                isAdmin: this.isAdmin
            };

            await axios.post('/auth/signup', user);
            await this.fetchUsers();
        }
    }
}
</script>

<style lang="scss" scoped>
.admin-settings-users {
    font-size: 1.5rem;

    h2 {
        margin-bottom: 2rem;
    }

    ul {
        list-style: none;
        
        li {
            margin-bottom: 3rem;

            & > * {
                margin-bottom: .5rem;
            }
            button {
                display: block;
            }
        }
    }

    .users-create {
        input {
            display: block;
            margin-bottom: 1.5rem;
        }
        button {
            display: block;
        }
    }
}
</style>

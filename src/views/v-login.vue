<template>
  <div style="z-index: 11000" class="position-fixed top-0 end-0 p-4">
    <transition name="fade">
      <notify v-if="notify">
        <b>Логин и/или пароль введены неверно</b>
      </notify>
    </transition>
  </div>
  <div class="login-background d-flex justify-content-center align-items-center flex-column">
    <div class="login-card d-flex flex-column text-center">
      <i class="ph-flower-lotus"></i>
      <h2>Вход в Личный Кабинет</h2>
      <p>Если Вы не знаете данные от входа в Личный кабинет, уточните их у своего менеджера</p>
      <form class="d-flex flex-column" @submit.prevent="submitHandler">
        <div class="input-group">
          <span class="input-group-text"><i class="ph-at"></i></span>
          <input
            v-model.trim="login"
            class="form-control"
            placeholder="Логин"
            type="text"
            id="login"
            :class="{invalid: (v$.login.$dirty && v$.login.required)}"
          />
        </div>
        <small
          v-if="v$.login.$dirty && v$.login.mustBeLid.$invalid"
          class="mt-2 text-danger invalid"
        >Имя пользователя должно начинаться с букв lid
        </small>
        <small
          v-if="v$.login.$dirty && v$.login.minLength.$invalid"
          class="mt-2 text-danger invalid"
        >Короткое имя пользователя
        </small>
        <small
          v-if="v$.login.$dirty && v$.login.maxLength.$invalid"
          class="mt-2 text-danger invalid"
        >Длинное имя пользователя
        </small>
        <div class="input-group mt-4">
          <span class="input-group-text"><i class="ph-key"></i></span>
          <i @click.prevent="showPass()" class="pass ph-eye-slash" id="eye"></i>
          <input
            v-model.trim="password"
            class="form-control"
            placeholder="Пароль"
            id="password"
            type="password"
            :class="{invalid: (v$.password.$dirty && v$.password.required)}"
          />
        </div>
        <small
          class="mt-2 text-danger invalid"
          v-if="v$.login.$dirty && v$.password.minLength.$invalid"
        >Длина пароля должна быть больше 5 символов
        </small>
        <p class="d-flex align-items-center justify-content-end mt-4">
          <input class="inp-cbx" id="morning" type="checkbox" v-model="check"/>
          <label class="cbx" for="morning">
            <span class="checkbox">
              <svg class="inline-svg" viewBox="0 0 29 39">
                <path d="M4.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </span>
            <span class="label">C <a class="text-primary" target="_blank" href="https://smaip.ru/oferta.html">Публичной офертой</a> ознакомлен и согласен</span>
          </label>
        </p>

        <small
          class="mt-1 mb-2 text-danger invalid"
          v-if="v$.check.required.$invalid"
        >Для входа в ЛК нужно поставить галочку выше
        </small>
        <button class="btn btn-primary" type="submit">
          <i class="ph-sign-in"></i> Вход
        </button>
      </form>
      <p class="text-center mb-0 mt-4">Нажимая кнопку «Вход», я даю свое согласие на обработку моих персональных данных, в соответствии с <a class="text-primary" target="_blank" href="https://smaip.ru/dogovor.html">№152-ФЗ</a> «О персональных данных»</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, alphaNum } from '@vuelidate/validators'
import router from '@/router'
import Notify from '@/components/app/vc-notify'
const mustBeLid = (value) => value.includes('lid')

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  name: 'login',
  data: () => ({
    login: '',
    password: '',
    check: '',
    notify: false
  }),
  validations () {
    return {
      password: { required, minLength: minLength(6) },
      login: { required, mustBeLid, minLength: minLength(5), maxLength: maxLength(9), alphaNum },
      check: { required }
    }
  },
  computed: {
    ...mapGetters([
      'USER',
      'COMPANY',
      'IS_ACTIVE'
    ])
  },
  methods: {
    ...mapActions([
      'LOGIN',
      'SET_CURRENTOBJECT'
    ]),
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        Steps: 'login',
        login: this.login,
        password: this.password
      }
      await this.LOGIN(formData)
      if (localStorage.getItem('userIsActive') !== '1') {
        this.notify = true
        setTimeout(function (scope) { scope.notify = false }, 5000, this)
      }
    },
    showPass () {
      const x = document.getElementById('password')
      const y = document.getElementById('eye')
      if (x.type === 'password') {
        x.type = 'text'
        y.classList.add('ph-eye')
        y.classList.remove('ph-eye-slash')
      } else {
        x.type = 'password'
        y.classList.remove('ph-eye')
        y.classList.add('ph-eye-slash')
      }
    }
  },
  components: {
    Notify
  },
  mounted () {
    if (localStorage.getItem('userIsActive')) {
      router.push('/')
    }
  }
}
</script>

<style scoped>
.login-background {
  background-color: #212027;
  background-image: var(--bg-dark);
  background-attachment: fixed;
  background-size: cover;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
}
.login-card {
  width: 375px;
  padding: 40px;
}
.login-card > i {
  font-size: 87px;
  color: var(--bs-primary);
}
.login-card > h2 {
  color: var(--bs-primary);
  margin-bottom: 20px;
}
.login-card > p {
  margin-bottom: 20px;
}
.login-card .input-group > .pass {
  position: absolute;
  top: 12px;
  right: 15px;
  font-size: 21px;
  cursor: pointer;
  z-index: 5;
}
[class^="ph-"] {
  color: var(--main-dark);
}
.btn-primary > i {
  color: white !important;
}
</style>

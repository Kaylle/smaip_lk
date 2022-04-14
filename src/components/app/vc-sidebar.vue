<template>
  <div class="sidebar">
    <router-link to="/profile" class="sidebar-header">
      <img class="profile-photo" src="../../../public/img/profile.jpg" alt="profile">
      <div class="full-name">
        <div class="body-1">{{USER.Name}}</div>
        <div class="body-1">{{USER.SecondName}} {{USER.LastName[0]}}.</div>
      </div>
    </router-link>
    <ul class="side-menu">
      <router-link
        v-for="link in links"
        :key="link.url"
        active-class="active"
        :to="link.url"
        custom
        v-slot="{ href, navigate, isExactActive }"
      >
        <li class="side-menu-item" :class="[isExactActive && 'active']">
          <a :href="href" @click="navigate"><i :class="link.icon"></i>{{link.title}}</a>
        </li>
      </router-link>
      <a href="">
        <li class="side-menu-item collapsed" data-bs-toggle="collapse" href="#openMore">
          <a class="closed"><i class="ph-dots-three"></i>Ещё</a>
          <a class="opened"><i class="ph-dots-three"></i>Меньше</a>
        </li>
      </a>
      <div class="collapse" id="openMore">
        <router-link
          v-for="link in links2"
          :key="link.url"
          active-class="active"
          :to="link.url"
          custom
          v-slot="{ href, navigate, isExactActive }"
        >
          <li class="side-menu-item" :class="[isExactActive && 'active']">
            <a :href="href" @click="navigate"><i :class="link.icon"></i>{{link.title}}</a>
          </li>
        </router-link>
        <li class="side-menu-item">
          <a href="https://b24-9l7u0s.bitrix24.site/crm_form_kw1vi/" target="_blank">
            <i class="ph-chat"></i>
            Обратная связь
          </a>
        </li>
        <li class="side-menu-item"><a>Версия ЛК: {{appVersion}}</a></li>
      </div>
    </ul>
    <a class="btn btn-primary" @click.prevent="logout">
      <i class="ph-sign-out"></i>Выход
    </a>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { version } from '../../../package'

export default {
  data: () => ({
    appVersion: version,
    links: [
      { title: 'Главная', url: '/', icon: 'ph-house' },
      { title: 'Публичная оферта', url: '/contract', icon: 'ph-file-text' },
      { title: 'Инструкция', url: '/manual', icon: 'ph-book-open' },
      { title: 'О Компании', url: '/about', icon: 'ph-info' },
      { title: 'Сверка объёмов', url: '/shipments', icon: 'ph-scales' },
      { title: 'Чеки', url: '/receipt', icon: 'ph-note' },
      { title: 'Лист фиксации отсутствия отгрузок', url: '/lf', icon: 'ph-file-x' },
      { title: 'Настройки', url: '/profile', icon: 'ph-gear-six' }

    ],
    links2: [
      { title: 'Жалоба', url: '/info', icon: 'ph-warning' },
      { title: 'Справка о ФХ', url: '/farm_certificate', icon: 'ph-paw-print' },
      { title: 'Заявление на возврат', url: '/return-document', icon: 'ph-arrow-arc-left' }
      // { title: 'Счета', url: '/bills', icon: 'ph-receipt' },
      // { title: 'Копия договора', url: '/add_contract', icon: 'ph-files' },
      // { title: 'Скидка', url: '/discount', icon: 'ph-tag' },
      // { title: 'Процент документов', url: '/loyalty', icon: 'ph-percent' }
    ]
  }),
  methods: {
    ...mapActions([
      'LOGOUT'
    ]),
    logout () {
      this.LOGOUT()
      this.$router.push('/login?message=logout')
    }
  },
  computed: {
    ...mapGetters([
      'USER'
    ])
  }
}
</script>

<style scoped>
.sidebar {
  background: var(--white);
  padding: 20px;
  width: 315px;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -315px;
  top: 0;
  z-index: 500;
}
.sidebar-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--main-light);
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.profile-photo {
  background: var(--tint);
  width: 58px;
  height: 58px;
  border-radius: 50%;
  margin-right: 20px;
  border: 4px solid var(--bs-primary);
}
.side-menu {
  padding: 0;
  overflow: auto;
}
.side-menu-item {
  list-style: none;
  padding: 11px 20px;
  border-radius: 15px;
  color: var(--main-dark);
  transition: all 0.3s ease;
  cursor: pointer;
}
.side-menu-item.active {
  background: var(--tint-sub);
  color: var(--bs-primary);
}
.side-menu-item:hover {
  background: var(--tint);
  color: var(--bs-primary);
  transition: all 0.3s ease;
}
.side-menu-item > a {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: inherit;
}
.side-menu-item > a > i {
  font-size: 18px;
  margin-right: 6px;
}
.sidebar > .btn {
  margin-top: auto;
}
.side-menu-item.collapsed .closed {
  display:inline;
}
.side-menu-item:not(.collapsed) .opened {
  display:inline;
}
.side-menu-item.collapsed .opened {
  display:none;
}
.side-menu-item .closed {
  display:none;
}
</style>

<template>
  <div class="offcanvas offcanvas-bottom" tabindex="-1" id="notify" aria-labelledby="notifyLabel">
    <div class="offcanvas-header">
      <h3 class="offcanvas-title" id="notifyLabel">Уведомления</h3>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close">
        <i class="ph-x"></i>
      </button>
    </div>
    <perfect-scrollbar class="offcanvas-body" id="modal-container">
      <div v-for="n in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]" :key="n" class="notification-card">
        <i class="ph-notebook"></i>
        <span>Прикрепить накладные по магазину Тестбург, Тестовая ул. 3</span>
      </div>
    </perfect-scrollbar>
  </div>
  <div class="header">
    <div class="mobile ">
      <div class="sidebar-toggle" @click.prevent="toggleSidebar" data-js="menu-toggle">
        <div class="burger-menu">
          <label class="burger-toggle-label">
            <input class="burger-toggle" type="checkbox" :checked="SIDEBAR===false">
            <svg viewBox="0 0 74 74" xmlns="http://www.w3.org/2000/svg">
              <path class="line-1" d="M0 40h62c13 0 6 28-4 18L35 35" />
              <path class="line-2" d="M0 50h70" />
              <path class="line-3" d="M0 60h62c13 0 6-28-4-18L35 65" />
            </svg>
          </label>
        </div>
      </div>
    </div>
    <h3 class="mobile logo mb-0">
      <router-link to="/">
        <i class="ph-flower-lotus"></i>
        <span>ИП Сидоров МА</span>
      </router-link>
    </h3>
    <div class="desktop" style="height: 55px">
      <div class="d-flex align-items-center">
        <div style="height: 54px;width: 54px;margin-right: 1rem" class="flex-row card p-3 sidebar-toggle" @click.prevent="toggleSidebar" data-js="menu-toggle">
          <div class="burger-menu">
            <label class="burger-toggle-label">
              <input class="burger-toggle" type="checkbox" :checked="SIDEBAR===false">
              <svg viewBox="0 0 74 74" xmlns="http://www.w3.org/2000/svg">
                <path class="line-1" d="M0 40h62c13 0 6 28-4 18L35 35" />
                <path class="line-2" d="M0 50h70" />
                <path class="line-3" d="M0 60h62c13 0 6-28-4-18L35 65" />
              </svg>
            </label>
          </div>
        </div>
        <h3 class="logo mb-0 mx-3" style="font-size: 18px">
        <router-link to="/">
          <i class="ph-flower-lotus" style="font-size: 32px"></i>
          <span class="mx-2">ИП Сидоров МА</span>
        </router-link>
      </h3>
      </div>
      <div class="d-flex align-items-center">
        <router-link to="/profile" class="flex-row align-items-center card p-3">
          <img src="../../../public/img/profile.jpg" style="width: 30px !important;border-radius: 50%">
          <span class="mx-3">{{USER.Name}} {{USER.SecondName}} {{USER.LastName[0]}}.</span>
        </router-link>
        <div class="flex-row card p-3 notifications mx-4">
<!--          data-bs-toggle="offcanvas" data-bs-target="#notify"-->
          <i class="ph-bell-simple"></i>
<!--          <div class="notifications-count">0</div>-->
        </div>
      </div>
    </div>
    <div class="mobile notifications">
<!--      data-bs-toggle="offcanvas" data-bs-target="#notify"-->
      <i class="ph-bell-simple"></i>
<!--      <div class="notifications-count">0</div>-->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'SIDEBAR',
      'USER'
    ])
  },
  methods: {
    ...mapActions([
      'SET_SIDEBAR'
    ]),
    toggleSidebar () {
      this.SET_SIDEBAR()
    }
  }
}
</script>

<style scoped>
.burger-toggle {
  display: none;
}
.burger-toggle-label {
  cursor: pointer;
  position: absolute;
  width: 60px;
  height: 60px;
  margin-left: -25px;
  margin-top: -23px;
}
.card .burger-toggle-label {
  margin-top: -25px;
}
.line-1,
.line-2,
.line-3 {
  fill: none;
  stroke: var(--main-dark);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  --length: 24;
  --offset: -38;
  stroke-dasharray: var(--length) var(--total-length);
  stroke-dashoffset: var(--offset);
  transition: all .8s cubic-bezier(.645, .045, .355, 1);
}
.line-1,
.line-3 {
  --total-length: 126.64183044433594;
}
.line-2 {
  --total-length: 70;
}
.burger-menu .burger-toggle:checked+svg .line-1,
.burger-menu .burger-toggle:checked+svg .line-3 {
  --offset: -94.1149185097;
  --length: 22.627416998;
}
.burger-menu .burger-toggle:checked+svg .line-2 {
  --offset: -50;
  --length: 0;
}
.mobile {
  display: none;
  align-items: center;
  position: relative;
}
.desktop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.header {
  background: transparent;
  height: 94px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: fixed;
}
.sidebar-toggle {
  position: relative;
  z-index: 2;
  width: 32px;
  height: 32px;
}
.notifications {
  margin-right: 0 !important;
}
.header > .sidebar-toggle,
.header > div > .notifications,
.header > div > div > i,
.header > div > div > a > i,
.ph-bell-simple {
  font-size: 32px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
}
.notifications-count {
  position: absolute;
  font-size: 11px;
  background: var(--bs-primary);
  width: 18px;
  height: 18px;
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 2px;
  left: -2px;
}
.notification-card {
  background: var(--tint);
  border-radius: 15px;
  display: flex;
  margin-bottom: 10px;
  padding: 15px 20px;
  align-items: center;
}
.notification-card > i {
  background: var(--bs-primary);
  color: var(--white);
  font-size: 26px;
  padding: 5px;
  border-radius: 50%;
  margin-right: 15px;
}
.logo a {
  display: flex;
  align-items: center;
}
.logo i {
  margin-right: 6px;
  font-size: 20px;
}
@media screen and (max-width: 768px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: flex;
  }
  .header {
    height: 55px;
  }
}
</style>

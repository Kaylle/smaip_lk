<template>
  <div id="wrapper">
    <div class="main">
      <div class="header">
        <h3 class="mobile logo mb-0">
          <router-link to="/">
            <i class="ph-flower-lotus"></i>
            <span>ИП Сидоров МА</span>
          </router-link>
        </h3>
        <div class="desktop" style="height: 55px">
          <div class="d-flex align-items-center">
            <h3 class="logo mb-0" style="font-size: 22px">
              <router-link to="/login">
                <i class="ph-flower-lotus" style="font-size: 28px"></i>
                <span>ИП Сидоров МА</span>
              </router-link>
            </h3>
          </div>
        </div>
        <router-link to="/login" class="btn btn-primary"><i class="ph-sign-in"></i>вход</router-link>
      </div>
      <div id="container" class="container-fluid">
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'l-main-layout'
}
</script>

<style>
#wrapper {
  display: flex;
  left: 0;
  top: 0;
  position: relative;
  transition: left 0.4s ease;
  height: calc(var(--vh, 1vh) * 100);
}
#wrapper.panel_open {
  left: 315px;
}
#container {
  position: relative;
  width: 100%;
  overflow: auto;
  height: calc(var(--vh, 1vh) * 100 - 94px);
  margin-top: 94px;
  padding: 0;
}
.main {
  background-color: #212027;
  background-image: var(--bg-dark);
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  position: absolute;
  right: 0;
  top: 0;
}
.content {
  padding: 20px;
}
@media screen and (max-width: 768px) {
  #container {
    height: calc(var(--vh, 1vh) * 100 - 115px);
    margin-top: 55px;
  }
  .content {
    padding: 20px 20px 50px 20px;
  }
}
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
.header > .sidebar-toggle,
.header > div > div > i,
.header > div > div > a > i {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
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

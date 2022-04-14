<template>
  <div id="wrapper" :class="{panel_open: !SIDEBAR}">
    <SideBar/>
    <div class="main">
      <NavBar/>
      <perfect-scrollbar id="container" class="container-fluid" ref="scroll">
        <div class="content">
          <router-view />
        </div>
      </perfect-scrollbar>
      <div class="footer">
        <input type="radio" id="r1" name="tabs" :checked="$route.path === '/contract'" />
        <router-link to="/contract">
          <label for="r1" class="menu-item"><i class="ph-file-text"></i></label>
        </router-link>
        <input type="radio" id="r2" name="tabs" :checked="$route.path === '/manual'"/>
        <router-link to="/manual">
          <label for="r2" class="menu-item"><i class="ph-book-open"></i></label>
        </router-link>
        <input type="radio" id="r3" name="tabs" :checked="$route.path === '/'"/>
        <router-link to="/">
          <label for="r3" class="menu-item active"><i class="ph-house"></i></label>
        </router-link>
        <input type="radio" id="r4" name="tabs" :checked="$route.path === '/about'"/>
        <router-link to="/about">
          <label for="r4" class="menu-item"><i class="ph-info"></i></label>
        </router-link>
        <input type="radio" id="r5" name="tabs" :checked="$route.path === '/profile'"/>
        <router-link to="/profile">
          <label for="r5" class="menu-item"><i class="ph-gear-six"></i></label>
        </router-link>
        <span
          v-if="
            $route.path === '/profile' ||
            $route.path === '/contract' ||
            $route.path === '/' ||
            $route.path === '/manual' ||
            $route.path === '/about'
          " class="glider"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/app/vc-navbar'
import SideBar from '@/components/app/vc-sidebar'
import { mapGetters } from 'vuex'

export default {
  name: 'l-main-layout',
  computed: {
    ...mapGetters([
      'SIDEBAR'
    ])
  },
  components: {
    NavBar, SideBar
  },
  watch: {
    $route () {
      this.$refs.scroll.$el.scrollTop = 0
    }
  }
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
.footer {
  background: var(--tint-sub);
  display: none;
  justify-content: space-between;
  padding: 11px;
  margin: 20px;
  border-radius: 70px;
  position: fixed;
  width: calc(100vw - 40px);
  bottom: 0;
  box-shadow: 0 0 20px 0 #00000010;
  z-index: 20;
}
.footer * {
  z-index: 30;
}
input[type=radio]:checked + a > label:hover {
  color: var(--tint);
}
input[type=radio] {
  display: none;
}
input[type=radio]:checked + a > label {
  color: var(--white);
}
input[id=r1]:checked ~ .glider {
  transform: translateX(0);
}
input[id=r2]:checked ~ .glider {
  transform: translateX(calc(25vw - 29px));
}
input[id=r3]:checked ~ .glider {
  transform: translateX(calc(50vw - 58px));
}
input[id=r4]:checked ~ .glider {
  transform: translateX(calc(75vw - 87px));
}
input[id=r5]:checked ~ .glider {
  transform: translateX(calc(100vw - 116px));
}
.glider {
  position: absolute;
  display: flex;
  height: 48px;
  width: 48px;
  background-color: var(--bs-primary);
  z-index: 1;
  border-radius: 50%;
  transition: 0.25s ease-out;
  left: calc(20px - 6px);
  top: 14px;
}

.menu-item {
  color: var(--main-dark);
  cursor: pointer;
  font-size: 32px;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: 54px;
  border-radius: 50%;
}
.menu-item:hover {
  color: var(--bs-primary);
  transition: color 0.3s ease;
}
@media screen and (max-width: 768px) {
  #container {
    height: calc(var(--vh, 1vh) * 100 - 112px);
    margin-top: 55px;
  }
  .content {
    padding: 20px 20px 50px 20px;
  }
  .footer {
    display: flex;
  }
}
</style>

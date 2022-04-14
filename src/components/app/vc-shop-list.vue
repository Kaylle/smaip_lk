<template>
  <div>
    <div class="card h-100">
      <div class="card-header">
        <h3 class="m-0" v-if="CURRENT_OBJECT.Title == null">
          <span v-if="$route.path === '/farm_certificate'">Справка о фермерском хозяйстве</span>
          <span v-if="$route.path === '/return-document'">Заявление на возврат</span>
          <span v-if="$route.path === '/receipt'">Чеки</span>
          <span v-if="$route.path === '/add_contract'">Копия договора</span>
          <span v-if="$route.path === '/shipments'">Сверка объёмов</span>
          <span v-if="$route.path === '/info'">Жалоба</span>
        </h3>
        <h3 class="m-0" v-else>
          <span v-if="$route.path === '/farm_certificate'">Справка о фермерском хозяйстве</span>
          <span v-if="$route.path === '/return-document'">Заявление на возврат</span>
          <span v-if="$route.path === '/receipt'">Чеки</span>
          <span v-if="$route.path === '/add_contract'">Копия договора</span>
          <span v-if="$route.path === '/shipments'">Сверка объёмов</span>
          <span v-if="$route.path === '/info'">Жалоба</span>
          по магазину {{CURRENT_OBJECT.Title}}</h3>
      </div>
      <div class="dropdown" v-if="COMPANY.length === 0 || isLoading">
        <a class="btn btn-secondary" href="#">
          <span>Загрузка...</span>
        </a>
      </div>
      <div class="dropdown" v-else>
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="k" data-bs-toggle="dropdown" aria-expanded="false">
          <span v-if="CURRENT_OBJECT.Title == null">Выберите магазин</span>
          <span v-else>{{CURRENT_OBJECT.InnerNumber + ' - ' + CURRENT_OBJECT.Title.substr(28, 28)}}...</span>
        </a>
        <ul class="dropdown-menu" aria-labelledby="k">
          <li v-for="c in COMPANY" v-bind:key="c.Id">
            <a class="dropdown-item" :class="{active: CURRENT_OBJECT.Title === c.Title}" @click="chose_shop(c.Id)">
              {{c.InnerNumber + ' - ' + c.Title}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'shop-list',
  data: () => ({
    isLoading: false
  }),
  computed: {
    ...mapGetters([
      'USER',
      'COMPANY',
      'CURRENT_OBJECT',
      'SHIPMENTS1_GROUP',
      'SHIPMENTS2_GROUP'
    ])
  },
  methods: {
    ...mapActions([
      'GET_CERTIFICATE',
      'GET_COMPANY_USER',
      'SET_CURRENTOBJECT',
      'GET_SHIPMENTS'
    ]),
    chose_shop (id) {
      this.SET_CURRENTOBJECT(id)
      if (this.$route.path === '/farm_certificate') {
        this.GET_CERTIFICATE(this.CURRENT_OBJECT.Deal_id)
      }
      if (this.$route.path === '/shipments') {
        this.GET_SHIPMENTS(this.CURRENT_OBJECT.InnerNumber)
      }
    }
  },
  async mounted () {
    window.onbeforeunload = function (event) { event.preventDefault() }
    if (performance.navigation.type === 1) {
      this.isLoading = true
      await this.GET_COMPANY_USER(this.USER)
      this.isLoading = false
    }
  }
}
</script>

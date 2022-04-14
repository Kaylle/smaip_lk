<template>
  <div class="row gx-4" >
    <div class="col-12 mb-4">
      <shop-list/>
    </div>
  </div>
  <div class="row gx-4" v-if="isLoading">
    <div class="col-md-6 col-12">
      <div class="card mb-4 placeholder-glow">
        <h3 class="mb-4">{{get_month1()}}</h3>
<!--        Загрузка-->
        <h2 class="placeholder" style="width:100%">Т</h2>
        <h2 class="placeholder" style="width:70%">Т</h2>
        <h2 class="placeholder" style="width:88%">Т</h2>
      </div>
    </div>
    <div class="col-md-6 col-12">
      <div class="card mb-4 placeholder-glow">
        <h3 class="mb-4">{{get_month2()}}</h3>
        <h2 class="placeholder" style="width:100%">Т</h2>
        <h2 class="placeholder" style="width:70%">Т</h2>
        <h2 class="placeholder" style="width:88%">Т</h2>
      </div>
    </div>
  </div>
  <div class="row gx-4" v-else>
    <div class="col-md-6 col-12">
      <div class="card mb-4" v-if="SHIPMENTS1_GROUP.length > 0 & CURRENT_OBJECT.Balance != null">
        <h3 class="mb-4">{{get_month1()}}</h3>
        <div class="shipment-wrapper">
          <div class="shipment-card" v-for="s in SHIPMENTS1_GROUP" v-bind:key="s.date">
            <h3 :href="'#q' + s[0].date" data-bs-toggle="collapse" class="text-primary mb-0">{{s[0].date.split("-").reverse().join(".")}}</h3>
            <div v-for="v in s" v-bind:key="v.Id" class="d-flex justify-content-between collapse show" :id="'q' + s[0].date">
              <span>{{v.name_of_numenclature}}</span>
              <span>{{v.shipped_with_adjustments}}</span>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-4">
          <h3 class="text-primary">Итого</h3>
          <h3 class="text-primary">{{summShipments1}} кг</h3>
        </div>
      </div>
      <div v-else class="card mb-4">
        <h3 class="mb-4">{{get_month1()}}</h3>
        <div class="shipment-wrapper">
          Данных об отгрузках нет
        </div>
      </div>
    </div>
    <div class="col-md-6 col-12">
      <div class="card mb-4" v-if="SHIPMENTS2_GROUP.length > 0">
        <h3 class="mb-4">{{get_month2()}}</h3>
        <div class="shipment-wrapper">
          <div class="shipment-card" v-for="s in SHIPMENTS2_GROUP" v-bind:key="s.Id">
            <h3 :href="'#w' + s[0].date" data-bs-toggle="collapse" class="text-primary mb-0">{{s[0].date.split("-").reverse().join(".")}}</h3>
            <div v-for="v in s" v-bind:key="v.Id" class="d-flex justify-content-between collapse show" :id="'w' + s[0].date">
              <span>{{v.name_of_numenclature}}</span>
              <span>{{v.shipped_with_adjustments}}</span>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-4">
            <h3 class="text-primary">Итого</h3>
            <h3 class="text-primary">{{summShipments2}} кг</h3>
        </div>
      </div>
      <div v-else class="card mb-4">
        <h3 class="mb-4">{{get_month2()}}</h3>
        <div class="shipment-wrapper">
          Данных об отгрузках нет
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ShopList from '@/components/app/vc-shop-list'

export default {
  name: 'Shipments',
  data: () => ({
    isLoading: false
  }),
  computed: {
    ...mapGetters([
      'CURRENT_OBJECT',
      'SHIPMENTS1',
      'SHIPMENTS2',
      'SHIPMENTS1_GROUP',
      'SHIPMENTS2_GROUP',
      'SIDEBAR'
    ]),
    summShipments1 () {
      let result = []
      if (this.SHIPMENTS1_GROUP.length) {
        for (const item of this.SHIPMENTS1_GROUP) {
          for (const itemInner of item) {
            result.push(Number(itemInner.shipped_with_adjustments))
          }
        }
        result = result.reduce(function (sum, el) {
          return sum + el
        })
        return result.toFixed(3)
      } else {
        return 0
      }
    },
    summShipments2 () {
      let result = []
      if (this.SHIPMENTS2_GROUP.length) {
        for (const item of this.SHIPMENTS2_GROUP) {
          for (const itemInner of item) {
            result.push(Number(itemInner.shipped_with_adjustments))
          }
        }
        result = result.reduce(function (sum, el) {
          return sum + el
        })
        return result.toFixed(3)
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions([
      'GET_SHIPMENTS',
      'CLEAR_SHIPMENTS',
      'CLOSE_SIDEBAR'
    ]),
    get_month1 () {
      let month = new Date()
      if (this.SHIPMENTS1_GROUP.length > 0) {
        month = new Date(this.SHIPMENTS1_GROUP[0][0].date)
      }
      const options = {
        month: 'long'
      }
      return month.toLocaleString('ru', options)
    },
    get_month2 () {
      let month = new Date()
      if (this.SHIPMENTS2_GROUP.length > 0) {
        month = new Date(this.SHIPMENTS2_GROUP[0][0].date)
      }
      const options = {
        month: 'long'
      }
      return month.toLocaleString('ru', options)
    }
  },
  components: {
    ShopList
  },
  async mounted () {
    this.CLOSE_SIDEBAR()
    this.CLEAR_SHIPMENTS()
    if (this.CURRENT_OBJECT.InnerNumber === 0) {
      await this.$router.push('/')
    } else {
      this.isLoading = true
      await this.GET_SHIPMENTS(this.CURRENT_OBJECT.InnerNumber)
      this.isLoading = false
    }
  }
}
</script>

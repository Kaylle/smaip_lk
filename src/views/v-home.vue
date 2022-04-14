<template>
  <div class="row gx-4">
    <div class="col-12">
      <div class="manager-card card mb-4 bg-primary">
        <div class="mb-2">
          <i class="ph-user-square"></i>
          <span>Ваш менеджер: {{MANAGER.Name}} {{MANAGER.SecondName}}</span>
        </div>
        <div>
          <i class="ph-phone"></i>
          <span>Телефон: <a href="tel:79220884948">+7 (922) 088 49-48</a></span>
        </div>
      </div>
    </div>
  </div>
  <div v-if="COMPANY.length === 0 || CURRENT_OBJECT.Title === null || COMPANY[0].Title === 'N' || COMPANY[0].Title === 'Y' || typeof COMPANY[0].Id === 'string'" class="row gx-4 mb-5 placeholder-glow">
    <div class="col-xxl-3 col-lg-4 col-md-6 col-12 mb-4">
      <div class="shop-card card">
        <div class="shop-card-main" v-if="COMPANY.length !== 0">
          <div class="shop-card-header d-block">
            <p class="mb-1 placeholder" style="width:190px">Т</p>
            <h2 class="placeholder" style="width:270px">Т</h2>
            <h1 class="placeholder" style="width:50px">1</h1>
          </div>
          <div class="shop-card-footer">
            <div>
              <p class="mb-0 placeholder">Тестбрг Тестовая л. 3</p>
            </div>
            <button
              class="btn btn-secondary placeholder"
            >Откfыть</button>
          </div>
        </div>
        <div v-else>Нет компаний</div>
      </div>
    </div>
  </div>
  <div v-else class="row gx-4 mb-5">
    <div v-for="c in COMPANY" v-bind:key="c.Id" class="col-xxl-3 col-lg-4 col-md-6 col-12 mb-4">
      <div class="shop-card card collapsed"
           :href="'#openMenu'+c.Id"
           data-bs-toggle="collapse">
        <div class="shop-card-main">
          <div class="shop-card-header">
            <p class="mb-3 d-flex justify-content-between align-items-center w-100">
              <span>{{c.InnerNumber}} {{c.Type}}</span>
              <span>
                <span>Оплата за&nbsp;</span>
                <span v-if="c.PaymentFor == 5958">Кг</span>
                <span v-else>Месяц</span>
              </span>
            </p>
            <h2 class="text-primary mb-3">
              {{c.Title}}
            </h2>
            <h1 class="text-primary d-flex justify-content-between align-items-center mb-3">
              {{c.Deal_cost}} Р
              <div
                class="btn btn-secondary px-4 py-2"
                :onclick="'ipayCheckout({amount:' + c.Deal_cost + ',currency:`RUB`,order_number:``,description: `' + c.InnerNumber + ' - по договору №' + c.Id + '`},function(order) { showSuccessfulPurchase(order, ' + c.Deal_id + ') },function(order) { showFailurefulPurchase(order) })'"
              >Оплатить</div>
            </h1>
          </div>
          <div v-if="c.PaymentFor == 5958" class="shop-card-footer mb-3">
            <div>
              <p class="mb-1">Баланс: {{c.Balance}} руб.
              </p>
              <p class="mb-0">Рекомендованный платёж:&nbsp;<a class="text-primary" :onclick="'ipayCheckout({amount:' + c.Recommendation + ',currency:`RUB`,order_number:``,description: `' + c.InnerNumber + ' - по договору №' + c.Id + '`},function(order) { showSuccessfulPurchase(order, ' + c.Id + ') },function(order) { showFailurefulPurchase(order) })'">{{ c.Recommendation }} руб.</a></p>
            </div>
          </div>
        </div>
        <div class="actions collapse mb-4" :id="'openMenu'+c.Id">
          <a class="btn btn-secondary mb-2" @click.prevent="openQR(c.Deal_id)">
            <i class="ph-qr-code"></i>Квитанция
          </a>
          <button class="btn btn-secondary mb-2" @click.prevent="attorney(c.Id)">
            <i class="ph-file-text"></i>Доверенность
          </button>
          <button class="btn btn-secondary" @click.prevent="invoice(c.Id)">
            <i class="ph-calendar-check"></i>Накладные
          </button>
          <button class="btn btn-secondary" @click.prevent="photo(c.Id)">
            <i class="ph-calendar-plus"></i>Фото отчёты
          </button>
        </div>
        <button class="btn btn-secondary shop-menu-btn">
          <i class="ph-squares-four"></i>
          <span class="closed">Открыть меню</span>
          <span class="opened">Закрыть меню</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'USER',
      'COMPANY',
      'CURRENT_OBJECT',
      'MANAGER',
      'SIDEBAR'
    ])
  },
  methods: {
    ...mapActions([
      'GET_COMPANY_USER',
      'SET_CURRENTOBJECT',
      'CLOSE_SIDEBAR'
    ]),
    attorney (id) {
      this.SET_CURRENTOBJECT(id)
      this.$router.push('/attorney')
    },
    shipments (id) {
      this.SET_CURRENTOBJECT(id)
      this.$router.push('/shipments')
    },
    photo (id) {
      this.SET_CURRENTOBJECT(id)
      this.$router.push('/photo')
    },
    invoice (id) {
      this.SET_CURRENTOBJECT(id)
      this.$router.push('/invoice')
    },
    openQR (id) {
      window.open('https://smaip.ru/lk/b24/ticket/ticket.php?id=' + id, '_blank')
    }
  },
  mounted () {
    this.GET_COMPANY_USER(this.USER)
    this.CLOSE_SIDEBAR()
  }
}
</script>

<style scoped>
.btn-secondary{
  padding: 9px;
}
.manager-card > div {
  display: flex;
  align-items: center;
}
.manager-card > div > i {
  font-size: 18px;
  margin-right: 6px;
}
.manager-card > div > span > a {
  color: var(--tint-sub);
  font-weight: 700;
}
.shop-card {
  cursor: pointer;
}
.closed > .actions {
  display: none;
}
.shop-card > .shop-card-main {
  justify-content: space-between;
  display: flex;
  height: 180px;
  flex-direction: column;
}
.shop-card-header > h2 {
  text-transform: none;
}
.shop-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.shop-card-footer > div > p {
  display: flex;
  align-items: center;
}
.shop-card-footer > div > p > i {
  margin-left: 4px;
  font-size: 14px;
}
.actions {
  display: flex;
  padding: 20px 0 0 0;
  flex-wrap: wrap;
  justify-content: space-between;
}
.actions > .btn {
  flex: 0 0 calc(50% - 0.25rem);
}
.shop-card.collapsed .btn .closed {
  display:inline;
}
.shop-card:not(.collapsed) .btn .opened {
  display:inline;
}
.shop-card.collapsed .btn .opened {
  display:none;
}
.shop-card .btn .closed {
  display:none;
}
.shop-menu-btn {
  margin-bottom: -20px;
  margin-left: -20px;
  margin-right: -20px;
  border-radius: 0 0 15px 15px;
}
</style>

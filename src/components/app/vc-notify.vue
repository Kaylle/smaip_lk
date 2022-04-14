<template>
  <div class="toast fade" :class="[{ show : is_show }, color]">
    <div class="toast-header">
      <i :class="icon"></i>
      <b class="me-auto">
        <slot/>
      </b>
      <button type="button" class="btn-close" @click="is_show=false">
        <i class="ph-x"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'toast-primary'
    },
    icon: {
      type: String,
      default: 'ph-checks'
    }
  },
  name: 'notify',
  data: () => ({
    is_show: false
  }),
  mounted () {
    this.is_show = true
    setTimeout(function (scope) { scope.is_show = false }, 2000, this)
  }
}
</script>

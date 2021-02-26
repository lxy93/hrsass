<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ userInfo.username }}</div>
    <!-- <upload-excel></upload-excel> -->
    <image-upload></image-upload>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components:{
   
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

<template>
  <div>
    <!-- 법정동의 아파트 or 연립/다세대 정보 -->
    <b-container fluid>
      <b-row v-for="(arr, index) in addressData" :key="'arr_'+index" class="mb-3">
        <b-col v-for="(item, index) in arr" :key="'item_'+index" @click="clickItem(item)" >{{item[feildData]}}</b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>


export default {
  name: 'AddressList',
  props: ['addressData', 'feildData'],
  data () {
    return {
      center : null,
      markerList : []
    }
  },
  methods:{
    clickItem(item) {
      this.$emit('showFilterData', item);
    }
  },
  mounted() {
     console.log('mounted+++++++++++++')
  },
 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
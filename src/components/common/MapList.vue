<template>
  <div>
    <!-- 법정동의 아파트 or 연립/다세대 정보 -->
    <b-container fluid>
      <b-row v-for="(arr, index) in uniqListData" :key="'arr_'+index" class="mb-3">
        <b-col v-for="(item, index) in arr" :key="'item_'+index" @click="clickItem(item)" >{{item[feildData]}}</b-col>
      </b-row>
    </b-container>

    <!-- 다음 맵 -->
    <DaumMap v-if="showMap" />
  </div>
</template>

<script>
import DaumMap from '../common/DaumMap';

export default {
  name: 'MapList',
  props: ['uniqListData', 'feildData', 'showMap'],
  components: { 
      DaumMap 
    },
  data () {
    return {

    }
  },
  methods:{
    clickItem(item) {
      this.$emit('showFilterData', item);
    }
  },
  mounted() {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
<template>
  <div>
    <!-- 법정동의 아파트 or 연립/다세대 정보 -->
    <table>
        <tr  v-for="(arr, index) in addressData" :key="'arr_'+index">
            <td v-for="(item, index) in arr" :key="'item_'+index" @click="clickItem(item)" v-bind:class="{active : item[feildData] === itemNm}">{{item[feildData]}}</td>
        </tr>
    </table>
  </div>
</template>

<script>


export default {
  name: 'AddressList',
  props: ['addressData', 'feildData', 'itemNm'],
  data () {
    return {
      center : null,
      markerList : []
    }
  },
  methods:{
    clickItem(item) {
      this.$emit('showFilterData', item[this.feildData]);
    }
  },
  mounted() {

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    table{width : 100%; border: 1px solid #444444; border-collapse:collapse; margin-bottom:20px;}
    td{border:1px solid black;cursor:pointer; width:33%;}
    td:hover{background-color: #ccc;}
    .active{background-color: yellow;}
</style>
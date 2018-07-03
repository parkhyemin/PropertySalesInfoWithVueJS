<template>
<div>
  <!--검색영역-->
  <Condition/>
  
  <h2 v-if="resultCode != '00' ">{{resultCode}}</h2>
  <h2 v-if="resultCode != '00' ">{{resultMsg}}</h2>
  <h2>총 카운트 <b-badge>{{totalCount}}</b-badge></h2>
  <b-btn href="/" variant="info" class="m-1">
      메인
    </b-btn>

    <b-table striped hover v-if="resultCode == '00' " :items="data"></b-table>
    <b-table v-else :items="emptyList"></b-table> 
  <!--<b-list-group v-if="resultCode == '00' ">
    <b-list-group-item v-for="item in data" :key="item.id">
      {{item}}
    </b-list-group-item>
  </b-list-group>-->
</div>
</template>

<script>
import xml from 'xml-to-json-promise';
import {_} from 'vue-underscore';
import Condition from './Condition';

export default {
  name: 'Apt',
  components: { 
        Condition
    },
  data () {
    return {
      data: [],
      resultCode : '',
      resultMsg : '',
      totalCount : 0,
      emptyList:[{'조회된 거래내역이 없습니다.':' '}]
    }
  },
  methods:{
    deleteProperty(obj) {
      delete obj['지역코드'];
      delete obj['건축년도']; 
      // _.pick(obj, '지역코드','건축년도');
    }
  },
  mounted() {
    let lawdCd = '11110';
    let dealYmd = '201806';
     this.$http.get('http://localhost:18081/api/data?lawdCd='+lawdCd+'&dealYmd='+dealYmd)
     .then((result) => {
        xml.xmlDataToJSON(result.data)
        .then(json =>  {
          let body = json.response.body[0];
          let header = json.response.header[0];
          this.resultCode = header.resultCode;
          this.resultMsg = header.resultMsg;
          this.totalCount = body.totalCount;
          //console.log(temp);
          _.map(body.items[0].item, this.deleteProperty);
          this.data = body.items[0].item;
          
          
          
        })
      })
      .catch(err => console.log(err)); 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
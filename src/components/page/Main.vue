<template>
  <div>
    <b-card-group deck
                  class="mb-3">
        <b-card 
                header="아파트"
                class="text-center">
            <p class="card-text">아파트 실거래 조회</p>
            <b-btn href="#/Apt" variant="outline-success">이동</b-btn>
        </b-card>
        <b-card 
                header="연립/다세대"
                class="text-center">
            <p class="card-text">연립/다세대 실거래 조회</p>
            <b-btn href="#/Multi" variant="outline-success">이동</b-btn>
        </b-card>
        <b-card 
                header="단독"
                class="text-center">
            <p class="card-text">단독/다가구 실거래 조회</p>
            <b-btn href="#/Detach" variant="outline-success">이동</b-btn>
        </b-card>
        <b-card 
                header="오피스텔"
                class="text-center">
            <p class="card-text">오피스텔 실거래 조회</p>
            <b-btn href="#/Officetel" variant="outline-success">이동</b-btn>
        </b-card>
    </b-card-group>
    <!--<b-card-group deck
                  class="mb-3">
        <b-card bg-variant="info"
                text-variant="white"
                header="토지"
                class="text-center">
            <p class="card-text">토지 실거래 조회(작업예정)</p>
        </b-card>
        <b-card bg-variant="danger"
                text-variant="white"
                header="분양권"
                class="text-center">
            <p class="card-text">분양권 실거래 조회(작업예정)</p>
        </b-card>-->
    </b-card-group>
  </div>
</template>

<script>
  export default  {
    name: 'Main',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<template>
  <b-nav pills class="bg-aliceblue">
    <b-nav-item href="#/Apt"    v-bind:active="svcData === 'Apt'">아파트</b-nav-item>
    <b-nav-item href="#/Multi"  v-bind:active="svcData === 'Multi'">다세대/연립</b-nav-item>
    <b-nav-item href="#/Detach" v-bind:active="svcData === 'Detach'">단독/다가구</b-nav-item>
  </b-nav>
</template>

<script lang="js">
  export default  {
    name: 'Navigation',
    props: ['svcData'],
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

<style scoped>
  .nav{ font-size : 15px;}
  .bg-aliceblue{background : aliceblue; }
</style>

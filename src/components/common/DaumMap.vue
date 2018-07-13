<template>
    <VueDaumMap
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      @load="onLoad"
      style="width:500px;height:400px;">
    </VueDaumMap>
</template>

<script>
import VueDaumMap from 'vue-daum-map'
import { fromPromise } from 'rxjs/observable/fromPromise'

export default {
    name: 'DaumMap',
    components: {VueDaumMap},
    props:['mapCenter', 'mapMarkerList'],
    data () {
        return {
            appKey: '30d1ef4b4574a16cb688e2ddfc3be4f3', // 테스트용 appkey
            center: {lat:37.566826005485716, lng:126.9786567859313}, // 지도의 중심 좌표(서울)
            level: 7, // 지도의 레벨(확대, 축소 정도)
            mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
            map: null, // 지도 객체. 지도가 로드되면 할당됨
            infowindows : []
        }
    },
    mounted() {
        
    },
    methods : {
        onLoad(_map) {
            console.log('++++++++++++++onLoad Daum Map');
            this.map = _map;

            // center 표시
            this.center = this.mapCenter

            // console.log(this.mapMarkerList);
            // 마커 표시
            fromPromise(this.mapMarkerList)
            .subscribe(res => {
                // 마커를 생성합니다
                const ratlng = new daum.maps.LatLng(res.address.y, res.address.x);
                const building_name = res.title;

                const marker = new daum.maps.Marker({
                    map: this.map,          // 마커를 표시할 지도
                    position: ratlng,       // 마커를 표시할 위치
                    title : building_name,  // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    clickable : true
                });

                // 마커에 표시할 인포윈도우를 생성합니다 
                const infowindow = new daum.maps.InfoWindow({
                    content: `<div style="padding:5px;">${building_name}</div>`, // 인포윈도우에 표시할 내용
                    removable : true
                });
                // 마커에 click 이벤트를 등록합니다
                daum.maps.event.addListener(marker, 'click', this.makeClickListener(this.map, marker, infowindow));
            })

        },
        makeClickListener(map, marker, infowindow){
            const that = this;
            return function() {
                // 이전 인포윈도우를 전부 닫습니다
                for(let i=0; i<that.infowindows.length; i++){
                    that.infowindows[i].close()
                }
                // 마커 위에 인포윈도우를 표시합니다
                infowindow.open(map, marker);
                that.infowindows.push(infowindow);  
            }
        },

        
    }

}
</script>

<style scope>
</style>
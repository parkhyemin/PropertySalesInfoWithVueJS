import {_} from 'vue-underscore';
import { range } from 'rxjs/observable/range'
import { map, tap } from 'rxjs/operators'

export default {
    /**
     * 년도, 월 검색조건을 초기화 한다
     * @param {*} arr_year 
     * @param {*} arr_month 
     */
    initConditionDate(arr_year, arr_month) {
        // set Year
        const year = new Date().getFullYear();
        range(0, 10)
        .pipe(map(x => this.generateOptionObj(year-x, year-x)))
        .subscribe(res => arr_year.push(res));
        const c_year = {val : year, txt: year};
    
        // set month
        range(0, 12)
        .pipe(
            tap(arr_month.push(this.generateOptionObj('', '전체'))),
            map(x => this.generateOptionObj(x+1, x+1))
        )
        .subscribe(res => arr_month.push(res));
        const c_month = {val : '', txt: '전체'};

        return {year : c_year, month : c_month}
    },
    /**
     * 검색조건 selectBox의 Object를 생성한다
     * @param {*} val 
     * @param {*} text 
     */
    generateOptionObj(val, text) {
        return {value:{val : val, txt: text}, text:text};
    },
    /**
     * 검색조건 필수 값 체크
     * @param {*} sido 
     * @param {*} sigungu 
     * @param {*} dong 
     */
    vailidation(sido, sigungu, dong) {
        let msg;
        let hasError = false;
        if( !sido ){
            msg = '(시/도)를 선택하세요';
            hasError = true;
        }else if( !sigungu ){
            msg = '(시/군/구)를 선택하세요';
            hasError = true;
        }else if( !dong ){
            msg = '(읍/면/동)을 선택하세요';
            hasError = true;
        }
        return {msg : msg, hasError : hasError};
    },
    /**
     * 객체가 배열인지 확인 후, 배열이 아닌 경우 배열로 만든다
     * @param {*} val 
     */
    toArray (val) {
        return (_.isArray(val)) ? val : [val];
    },
    addZero(val){
        if(!val)
            return '';
            
        let temp = parseInt(val);
        let result = '' + temp;
        return result < 10 ? result = '0' + temp : result;
    },
    deleteField(x, del) {
        _.each(x, (v) => {
                _.each(del, (d) => delete v[d] )
            }
        )
        return x;
    },
    uniqTradeList(v, feildName) {
        return _.map(_.groupBy(v, (obj) => obj[feildName]), _.first);
    },
    filterByFielNm(v, fieldNm, txt) {
        return _.filter(v, (obj) => obj[fieldNm] === txt )
    },
    setObjectTitleByFieldNm(obj, fieldNm) {
        obj[0].title = fieldNm;
        return obj;
    },
    
}
import {_} from 'vue-underscore';
import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators'

export default {
    initConditionDate(arr_year, arr_month) {
        // set Year
        const year = new Date().getFullYear();
        from(this.generateArrayByCount(10))
        .pipe(map(x => this.generateOptionObj(year-x, year-x)))
        .subscribe(res => arr_year.push(res));
        const c_year = {val : year, txt: year};
    
        // set month
        arr_month.push(this.generateOptionObj('', '전체'));
        from(this.generateArrayByCount(12))
        .pipe(map(x => this.generateOptionObj(x+1, x+1)))
        .subscribe(res => arr_month.push(res));
        const mon = new Date().getMonth() + 1;
        // const c_month = {val : mon, txt: mon};
        const c_month = {val : '', txt: '전체'};

        return {year : c_year, month : c_month}
    },
    generateArrayByCount(count) {
        let array = [];
        for(let i=0; i<count; i++)
            array.push(i);
        return array;
    },
    generateOptionObj(val, text) {
        return {value:{val : val, txt: text}, text:text};
    },
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
    checkArray (val) {
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
    filterDong(v, txt) {
        return _.filter(v, (obj) => obj['법정동'] === txt )
    },
    setObjectTitleByFieldNm(obj, fieldNm) {
        obj[0].title = fieldNm;
        return obj;
    }
    
}
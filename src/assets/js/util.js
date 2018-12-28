import sha1 from 'sha1';
import md5 from 'md5';
import store from '@/store/index.js'
import { getPublicKey } from '@/api'

export const getStr = (arr, key, starttime, token) => {
    var tostr = arr ? getStrings(arr, "") : "";
    return md5(sha1(md5(tostr) + md5(key) + starttime) + token);
}

export const getStrings = (data, str) => {
    for (var x in data) {
        if (isJson(data[x])) {
            var i = 0;
            for (var k in data[x]) {
                i++;
                break;
            }
            if (i > 0) {
                str += x;
                str = getStrings(data[x], str);
            }
        } else if (isArray(data[x])) {
            if (data[x].length != 0) {
                str += x;
                str = getStrings(data[x], str);
            }
        } else {
            if (data[x] !== undefined && data[x] !== null && data[x] !== '' && data[x] !== false && data[x] !== true) {
                str += x.toString() + data[x].toString();
            }
        }
    }
    return str;
}

export const isArray = o => {
    return Object.prototype.toString.call(o) == "[object Array]";
}

export const isJson = obj => {
    return (
        typeof obj == "object" &&
        Object.prototype.toString.call(obj).toLowerCase() == "[object object]" &&
        !obj.length
    );
}

export const findIndex = (ary, fn) => {
    if (ary.findIndex) {
        return ary.findIndex(fn)
    }
    /* istanbul ignore next */
    let index = -1
        /* istanbul ignore next */
    ary.some(function(item, i, ary) {
            const ret = fn.call(this, item, i, ary)
            if (ret) {
                index = i
                return ret
            }
        })
        /* istanbul ignore next */
    return index
}

export const randomString = (len, charSet) => {
    charSet = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}

export const wrap_encrypt = (content) => {
    let encryptobj = new JSEncrypt();
    encryptobj.setPublicKey(store.getters.publickey);
    let result = "";
    let step = 117;
    let strlen = content.length;
    let count = Math.ceil(strlen / step);
    for (let i = 0; i < count; i++) {
        let chunk = content.substring(step * i, step * (1 + i));
        result += encryptobj.encrypt(chunk);
    }
    return result;
}

export const PublicKey = () => {
    getPublicKey().then(res => {
        store.commit('SET_PUBLICKEY', res.key)
    })
}
export function formatDateTime(time) {
    var date = new Date();
    // console.log(date)
    date.setTime(time);
    // console.log(date)
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
    // var h = date.getHours();
    // h = h < 10 ? ('0' + h) : h;
    // var minute = date.getMinutes();
    // var second = date.getSeconds();
    // minute = minute < 10 ? ('0' + minute) : minute;
    // second = second < 10 ? ('0' + second) : second;
    // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}
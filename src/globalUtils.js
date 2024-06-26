import axios from "axios";
import {showFailToast, showSuccessToast} from "vant";

export function myRequestGetWithHandler(path, params={}, sendReject=false) {
    return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_SERVER_URL + path, {
            params: params
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                // showSuccessToast('操作成功')
                resolve(res.data)
            } else {
                showFailToast('操作失败:\n' + res.data)
                if (sendReject) {
                    reject(res.data)
                }
            }
        }).catch(err => {
            console.log(err)
            showFailToast('操作失败:\n' + err.message)
            if (sendReject) {
                reject(err.data)
            }
        })
    });
}


const utils = {
    myVibrate() {
        navigator.vibrate(100);
    },
    myRequestPost(path, params) {
        params['token'] = this.$cookies.get('token');
        return axios.post(process.env.VUE_APP_SERVER_URL + path, params);
    },
    myRequestPostWithHandler(path, params) {
        // 返回值为Promise true/false
        return this.myRequestPost(path, params)
            .then((result) => {
                console.log(result.data);
                if (result.data === 'success') {
                    showSuccessToast('操作成功');
                    return true
                } else {
                    showFailToast('操作失败:\n' + result.data);
                    return false
                }
            })
            .catch((error) => {
                console.log(error);
                showFailToast(error)
                return false
            })
    },
};
export default utils;

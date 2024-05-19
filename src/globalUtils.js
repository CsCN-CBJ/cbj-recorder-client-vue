import axios from "axios";
import {showFailToast, showSuccessToast} from "vant";

const utils = {
    myVibrate() {
        navigator.vibrate(200);
    },
    myRequestGet(path, params) {
        // 验证暂时使用token, 后续使用cookie可以参考https://blog.csdn.net/qq_44962364/article/details/132099859
        params['token'] = this.$cookies.get('token');
        console.log(params);
        return axios.get(process.env.VUE_APP_SERVER_URL + path, {
            params: params,
        });
    },
    myRequestPost(path, params) {
        params['token'] = this.$cookies.get('token');
        console.log(params);
        return axios.post(process.env.VUE_APP_SERVER_URL + path, params);
    },
    myRequestPostWithHandler(path, params) {
        this.myRequestPost(path, params)
            .then((result) => {
                console.log(result.data);
                if (result.data === 'success') {
                    showSuccessToast('操作成功');
                } else {
                    showFailToast('操作失败: ' + result.data);
                }
            })
            .catch((error) => {
                console.log(error);
                showFailToast(error)
            })
    },
};
export default utils;

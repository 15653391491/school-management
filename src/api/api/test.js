import request from '../axios'
/**
 * 我的活动历史接口
 */
export function history(data) {
    return request({
        url: 'activity/history',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
}
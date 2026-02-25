import { apiService } from './api';

const COUPON_BASE_PATH = 'api/v1/admin';

export const couponService = {
    getAllCoupons: async () => {
        return await apiService.get(`${COUPON_BASE_PATH}/getAllCoupons`);
    },

    getCouponById: async (id) => {
        return await apiService.get(`${COUPON_BASE_PATH}/getCoupon/${id}`);
    },

    createCoupon: async (couponData) => {
        return await apiService.post(`${COUPON_BASE_PATH}/createCoupon`, couponData);
    },

    updateCoupon: async (id, couponData) => {
        return await apiService.put(`${COUPON_BASE_PATH}/updateCoupon/${id}`, couponData);
    },

    deleteCoupon: async (id) => {
        return await apiService.delete(`${COUPON_BASE_PATH}/deleteCoupon/${id}`);
    },

    applyCoupon: async (code, cartValue) => {
        return await apiService.post(`api/v1/user/applyCoupon`, { code, cartValue });
    },
};

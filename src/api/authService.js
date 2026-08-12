import axiosInstance from "./axiosInstance";

export const loginUser = async (username, password) => {
  const response = await axiosInstance.post("/auth/login", {
    userId: username,
    password,
  });

  const { accessToken, refreshToken, data } = response.data;

  localStorage.setItem("token", response.data.accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("currentUser", JSON.stringify(response.data.data));

  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getWalletBalance = async () => {
  const response = await axiosInstance.get("/dashboard/wallet");
  return response.data;
};

export const createRequest = async (payload) => {
  const response = await axiosInstance.post("/requests", payload);
  return response.data;
};

export const verifyAddressAndGetPaymentLink = async (requestId, payload) => {
  const response = await axiosInstance.post(
    `/requests/${requestId}/verify-address-get-payment-link`,
    payload
  );
  return response.data;
};

export const cancelSubscription = (subscriptionID, planType) => {
  return axiosInstance.post(`/subscription/${subscriptionID}/cancel`, { planType });
};

// authService.js
export const reactivateSubscription = (subscriptionID, planType) => {
  return axiosInstance.post(`/subscription/${subscriptionID}/reactivate`, { planType });
};
import axiosInstance from "./axiosInstance";

export const loginUser = async (username, password) => {
  const response = await axiosInstance.post("/auth/login", {
    userId: username,
    password,
  });

  const { accessToken, refreshToken, data } = response.data;

  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("currentUser", JSON.stringify(data));

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

// Service Request Form (getStarted.js)
export const createRequest = async (payload) => {
  const response = await axiosInstance.post("/requests", payload);
  return response.data;
};

// Summary page (getStartedPayment.js) -> returns { reference, paymentUrl }
export const startCheckout = async (payload) => {
  const response = await axiosInstance.post("/checkout", payload);
  return response.data;
};

// Payment callback page -> returns { paid, status, checkoutStatus, userId, ... }
export const verifyCheckoutPayment = async (reference) => {
  const response = await axiosInstance.post("/checkout/verify-payment", { reference });
  return response.data;
};

export const createSupportTicket = async (payload) => {
  const response = await axiosInstance.post("/support", payload);
  return response.data;
};

export const cancelSubscription = (subscriptionID, planType) => {
  return axiosInstance.post(`/subscription/${subscriptionID}/cancel`, { planType });
};

export const reactivateSubscription = (subscriptionID, planType) => {
  return axiosInstance.post(`/subscription/${subscriptionID}/reactivate`, { planType });
};

export const syncWallet = () => axiosInstance.post("/users/wallet/sync");
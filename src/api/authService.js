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
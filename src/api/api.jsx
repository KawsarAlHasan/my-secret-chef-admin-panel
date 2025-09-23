import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const API = axios.create({
  baseURL: "http://10.10.7.85:9001/api/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// get admin dashboard
export const useAdminDashboard = () => {
  const getData = async () => {
    const response = await API.get("/admin-dashboard/admin-profile/");
    return response.data;
  };

  const {
    data: adminDashboard = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: getData,
  });

  return { adminDashboard, isLoading, isError, error, refetch };
};

// sign out
export const signOutAdmin = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// get admin dashboard
export const useDashboardOverview = () => {
  const getData = async () => {
    const response = await API.get("/admin-dashboard/dashboard-overview/");
    return response.data;
  };

  const {
    data: dashboardOverview = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboardOverview"],
    queryFn: getData,
  });

  return { dashboardOverview, isLoading, isError, error, refetch };
};

// Users list
export const useAllUser = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(
      `/admin-dashboard/user-list/?page=${page}&limit=${limit}`
    );

    return response.data;
  };

  const {
    data: allUsers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", page, limit],
    queryFn: getData,
  });

  return { allUsers, isLoading, isError, error, refetch };
};

// Admin list
export const useAdminList = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(
      `/admin-dashboard/admin_list/?page=${page}&limit=${limit}`
    );

    return response.data;
  };

  const {
    data: adminList = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["adminList", page, limit],
    queryFn: getData,
  });

  return { adminList, isLoading, isError, error, refetch };
};

// payments list
export const usePayouts = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(
      `/admin-dashboard/payment-history/?page=${page}&limit=${limit}`
    );

    return response.data;
  };

  const {
    data: payouts = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["payouts", page, limit],
    queryFn: getData,
  });

  return { payouts, isLoading, isError, error, refetch };
};

// not used
// not used
// not used

// users list
export const getMockUsers = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/users_100.json");
  const allUsers = res.data || [];

  // Fake filtering (if status or role is provided)
  let filteredUsers = allUsers;

  // Fake pagination
  const totalUser = filteredUsers.length;
  const totalPages = Math.ceil(totalUser / limit);
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedUsers,
    pagination: {
      totalUser,
      page,
      limit,
      totalPages,
    },
  };
};




// get message
export const getMockMessages = async () => {
  const response = await axios.get("/user_chat.json");

  return response.data;
};

// get previous scans
export const getMockPreviousScans = async () => {
  const response = await axios.get("/previousScans.json");

  return response.data;
};

// get Single scans
export const getMockSingleScans = async () => {
  const response = await axios.get("/singleScan.json");

  return response.data;
};

// get Saved Recipes
export const getMockSavedRecipes = async () => {
  const response = await axios.get("/recipes.json");

  return response.data;
};

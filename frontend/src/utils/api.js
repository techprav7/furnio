const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const api = async (endpoint, options = {}) => {
  const { method = "GET", body, headers = {} } = options;

  const config = {
    method,
    credentials: "include", // send httpOnly cookies
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export default api;

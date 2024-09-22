const API_URL = "https://blog-restful.onrender.com";

export const signUpUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Sign up failed.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Sign up failed:", error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/users/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error response:", errorData);
      throw new Error(errorData || "Login failed.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const getUserInfo = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to fetch user information.");
    }

    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export const getAllPosts = async (search) => {
  try {
    const response = await fetch(`${API_URL}/posts?search=${search}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "An error occurred while fetching posts."
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error.message;
  }
};

import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to login");
  }
};

export const getSubjects = async (page) => {
  try {
    const authToken = localStorage.getItem("token");
    let url = `${API_URL}/subjects`;
    if (page) {
      url += `?page=${page}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to getSubjects");
  }
};

export const createSubject = async (name) => {
  try {
    const authToken = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/subjects`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to getSubjects");
  }
};

export const getGrades = async (page) => {
  try {
    let url = `${API_URL}/grades`;
    if (page) {
      url += `?page=${page}`;
    }
    const authToken = localStorage.getItem("token");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to getGrades");
  }
};

export const createGrade = async (name) => {
  try {
    const authToken = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/grades`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to createGrade");
  }
};

export const getStudents = async (page, pageSize) => {
  try {
    const authToken = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/students`, {
      params: { page, pageSize },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return {
      data: response.data.data,
      totalRows: response.headers["x-total-count"],
    };
  } catch (error) {
    throw new Error("Failed to getStudents");
  }
};

export const createStudent = async (studentData) => {
  try {
    const authToken = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/students`, studentData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create student");
  }
};

export const searchStudents = async (search, page = 1, pageSize = 10) => {
  try {
    const authToken = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/students/search`, {
      params: { search, page, pageSize },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to search students");
  }
};

export const updateStudent = async (id, updatedStudent) => {
  try {
    const authToken = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/students/${id}`,
      updatedStudent,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update student");
  }
};

export const deleteStudent = async (id) => {
  try {
    const authToken = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/students/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error deleting student");
  }
};

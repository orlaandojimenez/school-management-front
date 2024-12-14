import axios from "axios";

const API_URL = "http://localhost:5240/api";

export const getScoresByStudentId = async (studentId, gradeId, month) => {
  try {
    const authToken = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/score`, {
      params: { studentId, gradeId, month },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return {
      data: response.data,
    };
  } catch (error) {
    throw new Error("Failed to getScores");
  }
};

export const createScore = async (scoreData) => {
  try {
    const authToken = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/score`, scoreData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create score");
  }
};

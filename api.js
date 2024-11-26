import axios from "axios";

const api = axios.create({
  baseURL: "https://be-habits.onrender.com/api/v1",
});

async function testApi(token) {
  const response = await api.get(`/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data.user;
}

async function fetchAllHabits(token) {
  const response = await api.get(`/habit`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data;
}

async function postHabit(token, newHabit) {
  console.log(newHabit)
  const response = await api.post(`/habit`, newHabit, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log(response.data)
  return response.data.data;
}



const patchHabit = (updatedHabit) => {
  return api
    .patch(`/habit`, updatedHabit)
    .then((response) => {
      return response.data.comment;
    });
};

export { fetchAllHabits, postHabit, patchHabit, testApi };

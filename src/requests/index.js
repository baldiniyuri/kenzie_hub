import axios from "axios";

const baseURL = "https://kenziehub.me";

export const signUpUser = async (data) => {
  const token = window.localStorage.getItem("authorizationToken");
  try {
    let res = await axios.post(`${baseURL}/users`, data);
    return res.status === 201 && "Usuário cadastrado com sucesso";
  } catch (error) {
    if (error.message === "contact is required") {
      return "Contato é um campo obrigatório";
    }
    if (error.message === " course_module is required") {
      return "modulo do curso é um campo obrigatório";
    }
    if (error.message === "password: minimum is 6 characters") {
      return "A senha deve ter 6 dígitos";
    }
    if (error.message === "Email already exists") {
      return "Email ja cadastrado";
    }
  }
};

export const getUsersList = async (nextURL) => {
  const token = window.localStorage.getItem("authorizationToken");
  const URL = nextURL !== "" ? nextURL : `${baseURL}/users`;
  let res = await axios.get(`${URL}`);
  return res;
};

export const login = async (data) => {
  const token = window.localStorage.getItem("authorizationToken");
  try {
    let res = await axios.post(`${baseURL}/sessions`, data);
    window.localStorage.setItem("authorizationToken", res.data.token);
    window.localStorage.setItem("ID", res.data.user.id);

    console.log(res.status);
    return (
      res.status === 200 && {
        user: res.data.user,
        message: "Login efetuado com sucesso",
      }
    );
  } catch (error) {
    return { message: "Email e/ou senha incorretos." };
  }
};

export const addTechs = (data) => {
  const token = window.localStorage.getItem("authorizationToken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  axios.post(`${baseURL}/users/techs`, data, config);
};

export const requestUser = async (id) => {
  const token = window.localStorage.getItem("authorizationToken");
  let res = await axios.get(`${baseURL}/users/${id}`);
  return res.data;
};

export const changeImage = async (data) => {
  const token = window.localStorage.getItem("authorizationToken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.patch(`${baseURL}/users/avatar`, data, config);
  return res.data;
};

export const requestEditProfile = async (data) => {
  const token = window.localStorage.getItem("authorizationToken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.put(`${baseURL}/profile`, data, config);
  return res.data;
};

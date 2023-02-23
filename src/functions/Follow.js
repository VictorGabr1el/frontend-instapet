import { api } from "../services/api";

export const Follow = (followId) => {
  if (followId) {
    const token = localStorage.getItem("@Auth:token");

    console.log(token, followId);
    api({
      method: "post",
      url: `/following/${followId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

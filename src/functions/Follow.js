import { Api } from "../services/Api";

export const Follow = (followId) => {
  if (followId) {
    const token = localStorage.getItem("@Auth:token");

    console.log(token, followId);
    Api({
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

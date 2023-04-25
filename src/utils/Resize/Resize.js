import { storage } from "../../services/firebase.js";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

export const Resize = async (image) => {
  const source = URL.createObjectURL(image);

  function getImgSize(image) {
    const img = new Image();
    return new Promise((res, rej) => {
      img.onload = function () {
        const width =
          image.size < 513051
            ? (this.width / 100) * 95
            : image.size >= 513051 && image.size < 613051
            ? (this.width / 100) * 90
            : image.size >= 613051 && image.size < 893051
            ? (this.width / 100) * 80
            : (this.width / 100) * 65;
        res(width);
      };
      img.src = source;
    });
  }

  const width = await getImgSize(image).then((size) => size);

  console.log(width);

  function resizeImage(source, options) {
    return loadImage(document.createElement("img"), source).then(function (
      image
    ) {
      const canvas = document.createElement("canvas");

      if (options.width && !options.height) {
        options.height = image.height * (options.width / image.width);
      } else if (!options.width && options.height) {
        options.width = image.width * (options.height / image.height);
      }

      Object.assign(canvas, options);
      canvas
        .getContext("2d")
        .drawImage(image, 0, 0, canvas.width, canvas.height);

      console.log(canvas);

      return new Promise(function (resolve) {
        canvas.toBlob(resolve, "image/webp");

        return resolve;
      });
    });
  }

  function loadImage(img, source) {
    return new Promise((resolve, reject) => {
      img.src = source;
      console.log(img);
      img.completed
        ? resolve(img)
        : img.addEventListener("load", function () {
            resolve(img);
          });
      img.addEventListener("error", reject);
    });
  }

  return new Promise((resolve) => {
    resizeImage(source, { width: width }).then(function (blob) {
      const storageRef = ref(storage, `images/${source}`);

      uploadBytes(storageRef, blob).then(() => {
        getDownloadURL(storageRef)
          .then((downloadURL) => {
            if (!downloadURL) {
              return console.error("erro");
            } else {
              return resolve(downloadURL);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  });
};

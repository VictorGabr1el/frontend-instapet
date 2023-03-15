import { storage } from "./firebase.js";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

export const Resize = ({ src, width }) => {
  function resizeImage(src, options) {
    return loadImage(document.createElement("img"), src).then(function (image) {
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

      return new Promise(function (resolve) {
        canvas.toBlob(resolve, "image/webp");

        return resolve;
      });
    });
  }

  function loadImage(img, src) {
    return new Promise((resolve, reject) => {
      img.src = src;
      img.completed
        ? resolve(img)
        : img.addEventListener("load", function () {
            resolve(img);
          });
      img.addEventListener("error", reject);
    });
  }

  return new Promise((resolve) => {
    resizeImage(src, { width: width }).then(function (blob) {
      const storageRef = ref(storage, `images/${src}`);

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

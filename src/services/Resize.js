import { storage } from "./firebase.js";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

export const Resize = ({ src, ww }) => {
  console.log(src, ww);

  const exec = resizeImage(src, { width: ww }).then(function (blob) {
    console.log(blob);

    const storageRef = ref(storage, `images/${src}`);

    uploadBytes(storageRef, blob).then(() => {
      getDownloadURL(storageRef)
        .then((downloadURL) => {
          if (!downloadURL) {
            return console.error("erro");
          } else {
            console.log(downloadURL);

            return downloadURL;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });

  function resizeImage(src, options) {
    return loadImage(document.createElement("img"), src).then(function (image) {
      const canvas = document.createElement("canvas");

      console.log(canvas);

      if (options.width && !options.height) {
        options.height = image.height * (options.width / image.width);

        console.log(canvas);
      } else if (!options.width && options.height) {
        options.width = image.width * (options.height / image.height);
      }

      Object.assign(canvas, options);
      canvas
        .getContext("2d")
        .drawImage(image, 0, 0, canvas.width, canvas.height);

      return new Promise(function (resolve) {
        canvas.toBlob(resolve, options.type || "image/webp", options.quality);

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

      console.log(img);
    });
  }

  return exec;
};

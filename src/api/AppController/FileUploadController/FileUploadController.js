import axios from "axios";
import firebase from "firebase/app";
import "firebase/storage";
import { message } from "antd";

const deletePhoto = async (url) => {
  let pictureRef = firebase.storage().refFromURL(url);
  await pictureRef
    .delete()
    .then(() => {
      console.log("Picture is deleted successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};
export async function FileUploadApi(path, data, fileUrl, token, fileOldUrl) {
  try {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`/avatar/${Date.now()}_${fileUrl?.name}`);
    if (fileUrl.type) {
      // New Image
      await fileRef.put(fileUrl).then(function (_) {
        console.log("File uploaded!");
        // initialized file upload
        fileRef.getDownloadURL().then(async function (url) {
          await axios
            .post(`${path}`, data, token)
            .then((response) => {
              if (response.status === 400) {
                throw new Error("your error message here");
              }
              if (response.status === 200) {
                return message.success(response.data);
              }
            })
            .then(async (_) => {
              // Old Image delete after success
              console.log(fileOldUrl);
              if (fileOldUrl) await deletePhoto(fileOldUrl);
            })
            .catch((error) => {
              // if error occure delete new image uploaded
              deletePhoto(url);
              console.log(error.message);
              return message.error(error.message);
            });
        });
      });
    } else {
      //Old Image

      await axios
        .post(`${path}`, data, token)
        .then((response) => {
          if (response.status === 400) {
            message.error("Something went wrong");
            throw new Error("Something went wrong");
          }
          if (response.status === 200) {
            message.success(response.data);
          }
        })
        .catch((error) => {
          return message.error(error.message);
        });
    }
  } catch (error) {
    console.error(error);
    return message.error(error.message);
  }
}

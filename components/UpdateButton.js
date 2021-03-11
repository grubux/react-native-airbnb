import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";

export default function UpdateButton({
  imageUsed,
  token,
  setProfileImageFetched,
  setRedErrorMessage,
  updatedEmail,
  updatedUsername,
  updatedDescription,
  nonUpdatedEmail,
  nonUpdatedUsername,
  nonUpdatedDescription,
}) {
  const [requestSent, setRequestSent] = useState(false);
  const handleUpdateRequest = async () => {
    if (imageUsed) {
      try {
        // formData
        const tab = imageUsed.split(".");
        const formData = new FormData();
        formData.append("photo", {
          uri: imageUsed,
          name: `my-picture/${tab[1]}`, // on met ce qu'on veut
          type: `image/${tab[tab.length - 1]}`,
        });
        try {
          setRequestSent(true);
          console.log("Uploading picture...");
          //add loader
          const response = await axios.put(
            "https://express-airbnb-api.herokuapp.com/user/upload_picture",
            formData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setRequestSent(false);
          console.log(response.data);
          JSON.stringify(response.data);
          JSON.stringify(response.data.photo[0].url);
          setProfileImageFetched(response.data.photo[0].url);
          console.log("Picture uploaded !");
          setRedErrorMessage("Changes saved !");
        } catch (error) {
          setRequestSent(false);
          console.log("Request picture error");
          console.log(error.message);
          setRedErrorMessage("Couldn't save changes");
        }
      } catch (error) {
        setRequestSent(false);
        console.log("Form Data (picture) or general changes error");
        setRedErrorMessage("error");
        console.log(error.message);
      }
    }

    if (updatedEmail || updatedUsername || updatedDescription) {
      //
      try {
        setRequestSent(true);
        const res = await axios.put(
          `https://express-airbnb-api.herokuapp.com/user/update`,
          {
            email: updatedEmail ? updatedEmail : nonUpdatedEmail,
            description: updatedDescription
              ? updatedDescription
              : nonUpdatedDescription,
            username: updatedUsername ? updatedUsername : nonUpdatedUsername,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(res.data);
        setRedErrorMessage("Changes saved !");
        setRequestSent(false);
      } catch (error) {
        setRequestSent(false);
        setRedErrorMessage("Couldn't save changes");
        console.log(error.message);
      }
    } else {
      setRedErrorMessage("You must update at least one field");
      setRequestSent(false);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        disabled={requestSent ? true : false}
        style={{
          borderColor: "red",
          borderBottomStyle: "solid",
          borderWidth: 1,
          borderRadius: 20,
          width: 150,
          height: 40,
          marginTop: 10,
          marginBottom: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handleUpdateRequest}
      >
        <Text>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

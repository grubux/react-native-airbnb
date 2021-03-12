import React, { useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LottieView from "lottie-react-native";

import Header from "../components/Header";
import LogOutButton from "../components/LogOutButton";
import CustomTextInput from "../components/CustomTextInput";
import ErrorText from "../components/ErrorText";
import UpdateButton from "../components/UpdateButton";

import ProfileImageUndefined from "../assets/profileimageundefined.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileScreen = ({ setToken, token, userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPicture, setSelectedPicture] = useState();
  const [takenPhoto, setTakenPhoto] = useState();
  const [imageUsed, setImageUsed] = useState();

  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const [profileData, setProfileData] = useState({});
  const [profileImageFetched, setProfileImageFetched] = useState("");

  const [redErrorMessage, setRedErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching profile Data...");
        //Add loader
        const resp = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsLoading(false);
        console.log("general Data");
        JSON.stringify(resp.data);
        const temporaryProfileData = resp.data;
        setProfileData(temporaryProfileData);
        const temporaryProfilePicture = resp.data.photo[0].url;
        setProfileImageFetched(temporaryProfilePicture);
        console.log(resp.data);
      } catch (error) {
        console.log("Fetch profile data failed");
        console.log(error.message);
        setRedErrorMessage("Fetch profile data failed");
      }
    };
    fetchData();
  }, []);

  //Loader
  const homeAnimation = useRef();
  const playAnimation = () => {
    homeAnimation.current.play(2, 18);
  };
  const pressAnimation = () => {
    homeAnimation.current.play(0, 1);
  };
  //Loader

  const getPermissionAndSelectPhoto = async () => {
    // demander l'autorisation d'accéder à la gallery
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      // on ouvre la gallery
      const result = await ImagePicker.launchImageLibraryAsync({
        // optionnel
        exif: true,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        setSelectedPicture(result.uri);
        setImageUsed(result.uri);
      } else {
        console.log("No image selected");
        setRedErrorMessage("No image selected");
        return;
      }
    }
  };

  const getPermissionAndTakePhoto = async () => {
    // demander l'autorisation d'accéder à l'appareil photo
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      // démarrer l'appareil photo
      const result = await ImagePicker.launchCameraAsync({
        // optionnel
        exif: true,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        setTakenPhoto(result.uri);
        setImageUsed(result.uri);
      } else {
        console.log("No photo was taken");
        setRedErrorMessage("No photo was taken");
        return;
      }
    }
  };

  return isLoading ? (
    <View style={styles.animationContainer}>
      <LottieView
        source={require("../assets/lottieView.json")}
        loop={true}
        autoPlay={true}
        progress={0}
        style={{
          width: 400,
          height: 400,
          backgroundColor: "white",
        }}
        ref={homeAnimation}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
      />
    </View>
  ) : (
    <KeyboardAwareScrollView>
      <View style={{ flex: 1 }}>
        <Header isClickableHeader={false} />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 70,
            marginLeft: 20,
            marginRight: 20,
            flex: 1,
          }}
        >
          <View
            style={{
              width: 265,
              flexDirection: "row",
              alignItems: "center",
              margin: 30,
            }}
          >
            <Image
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "red",
              }}
              source={
                imageUsed
                  ? { uri: imageUsed }
                  : profileImageFetched
                  ? {
                      uri: `${profileImageFetched}`,
                    }
                  : ProfileImageUndefined
              }
            />
            <View style={{ marginLeft: 20 }}>
              <MaterialCommunityIcons
                style={{ marginBottom: 40 }}
                name="image-multiple"
                size={40}
                color="black"
                onPress={getPermissionAndSelectPhoto}
              />
              <MaterialCommunityIcons
                name="camera-party-mode"
                size={40}
                color="black"
                onPress={getPermissionAndTakePhoto}
              />
            </View>
          </View>
          <View>
            <CustomTextInput
              type={updatedEmail}
              typeString="saved-email"
              setFunction={setUpdatedEmail}
              savedInput={profileData.email}
            />
            <CustomTextInput
              type={updatedUsername}
              typeString="saved-username"
              setFunction={setUpdatedUsername}
              savedInput={profileData.username}
            />
            <CustomTextInput
              type={updatedDescription}
              typeString="saved-description"
              setFunction={setUpdatedDescription}
              savedInput={profileData.description}
            />
          </View>
          <ErrorText errorMessage={redErrorMessage} />
          <UpdateButton
            updatedEmail={updatedEmail}
            updatedUsername={updatedUsername}
            updatedDescription={updatedDescription}
            nonUpdatedEmail={profileData.email}
            nonUpdatedUsername={profileData.username}
            nonUpdatedDescription={profileData.description}
            token={token}
            setRedErrorMessage={setRedErrorMessage}
            imageUsed={imageUsed}
            setProfileImageFetched={setProfileImageFetched}
          />
          <LogOutButton setToken={setToken} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

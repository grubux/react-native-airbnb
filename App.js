import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import HeaderRoomScreen from "./components/HeaderRoomScreen";
import HomeScreen from "./containers/HomeScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import ProfileScreen from "./containers/ProfileScreen";
import RoomScreen from "./containers/RoomScreen";
import AroundMeScreen from "./containers/AroundMeScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [userId, setUserId] = useState("");

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const id = await AsyncStorage.getItem("Id", id);

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
      setUserId(id);
    };

    bootstrapAsync();
  }, []);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <NavigationContainer>
        {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
          // No token found, user isn't signed in
          <Stack.Navigator>
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {(props) => (
                <SignInScreen
                  setToken={setToken}
                  setProfileData={setProfileData}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SignUp" options={{ headerShown: false }}>
              {(props) => <SignUpScreen {...props} setToken={setToken} />}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          // User is signed in
          <Stack.Navigator>
            <Stack.Screen
              name="Tab"
              options={{ headerShown: false, animationEnabled: false }}
            >
              {() => (
                <Tab.Navigator
                  tabBarOptions={{
                    activeTintColor: "tomato",
                    inactiveTintColor: "gray",
                  }}
                >
                  <Tab.Screen
                    name="Home"
                    options={{
                      tabBarLabel: "Home",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name={"ios-home"} size={size} color={color} />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Home"
                          options={{
                            headerShown: false,
                          }}
                        >
                          {() => <HomeScreen />}
                        </Stack.Screen>

                        <Stack.Screen
                          name="Room"
                          options={{
                            headerTitle: () => <HeaderRoomScreen />,
                          }}
                        >
                          {() => <RoomScreen />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>

                  {/* Tab.Screen pour Around Me */}
                  <Tab.Screen
                    name="AroundMe"
                    options={{
                      tabBarLabel: "Around Me",
                      tabBarIcon: ({ color, size }) => (
                        <FontAwesome
                          name="map-marker"
                          size={24}
                          color="black"
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="AroundMe"
                          options={{
                            headerShown: false,
                            tabBarLabel: "Around Me",
                          }}
                        >
                          {() => <AroundMeScreen />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>

                  <Tab.Screen
                    name="MyProfile"
                    options={{
                      tabBarLabel: "My profile",
                      tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                          name="account"
                          size={24}
                          color="black"
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="My Profile"
                          options={{ headerShown: false }}
                        >
                          {() => (
                            <ProfileScreen
                              setToken={setToken}
                              token={userToken}
                              userId={userId}
                            />
                          )}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

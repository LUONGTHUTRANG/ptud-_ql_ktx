import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";

import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import Services from "./src/pages/Services";
import Bills from "./src/pages/Bills";
import Notifications from "./src/pages/Notifications";
import Settings from "./src/pages/Settings";
import ManagerHome from "./src/pages/ManagerHome";
import Profile from "./src/pages/Profile";
import ChangePassword from "./src/pages/ChangePassword";
import NotificationDetail from "./src/pages/NotificationDetail";
import PaymentDetail from "./src/pages/PaymentDetail";
import RequestHistory from "./src/pages/RequestHistory";
import RequestDetail from "./src/pages/RequestDetail";
import CreateRequest from "./src/pages/CreateRequest";
import TransactionHistory from "./src/pages/TransactionHistory";
import BuildingList from "./src/pages/BuildingList";
import RoomList from "./src/pages/RoomList";
import RegisterAccommodation from "./src/pages/RegisterAccommodation";
import ExtendAccommodation from "./src/pages/ExtendAccommodation";
import RegularRequest from "./src/pages/RegularRequest";
import SpecialRequest from "./src/pages/SpecialRequest";
import RoomMembers from "./src/pages/RoomMembers";
import StudentList from "./src/pages/StudentList";
import ManagerBills from "./src/pages/ManagerBills";
import ManagerSpecialRequest from "./src/pages/ManagerSpecialRequest";
import ManagerSpecialRequestDetail from "./src/pages/ManagerSpecialRequestDetail";
import ManagerNotifications from "./src/pages/ManagerNotifications";
import ManagerNotificationDetail from "./src/pages/ManagerNotificationDetail";
import ManagerRegularRequest from "./src/pages/ManagerRegularRequest";
import ManagerServices from "./src/pages/ManagerServices";
import ManagerTerm from "./src/pages/ManagerTerm";
import ManagerTermDetail from "./src/pages/ManagerTermDetail";
import { RootStackParamList } from "./src/types";

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: "#f8fafc" },
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />

            <Stack.Screen name="Services" component={Services} />
            <Stack.Screen name="Bills" component={Bills} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Settings" component={Settings} />

            <Stack.Screen name="PaymentDetail" component={PaymentDetail} />
            <Stack.Screen
              name="TransactionHistory"
              component={TransactionHistory}
            />
            <Stack.Screen name="BuildingList" component={BuildingList} />
            <Stack.Screen name="RoomList" component={RoomList} />
            <Stack.Screen name="RequestHistory" component={RequestHistory} />
            <Stack.Screen name="RequestDetail" component={RequestDetail} />
            <Stack.Screen name="CreateRequest" component={CreateRequest} />
            <Stack.Screen
              name="NotificationDetail"
              component={NotificationDetail}
            />
            <Stack.Screen name="ManagerHome" component={ManagerHome} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen
              name="RegisterAccommodation"
              component={RegisterAccommodation}
            />
            <Stack.Screen
              name="ExtendAccommodation"
              component={ExtendAccommodation}
            />
            <Stack.Screen name="RegularRequest" component={RegularRequest} />
            <Stack.Screen name="SpecialRequest" component={SpecialRequest} />
            <Stack.Screen name="RoomMembers" component={RoomMembers} />
            <Stack.Screen name="StudentList" component={StudentList} />
            <Stack.Screen name="ManagerBills" component={ManagerBills} />
            <Stack.Screen
              name="ManagerSpecialRequest"
              component={ManagerSpecialRequest}
            />
            <Stack.Screen
              name="ManagerSpecialRequestDetail"
              component={ManagerSpecialRequestDetail}
            />
            <Stack.Screen
              name="ManagerNotifications"
              component={ManagerNotifications}
            />
            <Stack.Screen
              name="ManagerNotificationDetail"
              component={ManagerNotificationDetail}
            />
            <Stack.Screen
              name="ManagerRegularRequest"
              component={ManagerRegularRequest}
            />
            <Stack.Screen name="ManagerServices" component={ManagerServices} />
            <Stack.Screen name="ManagerTerm" component={ManagerTerm} />
            <Stack.Screen
              name="ManagerTermDetail"
              component={ManagerTermDetail}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;

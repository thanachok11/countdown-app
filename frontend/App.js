import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./HomeScreen.js";
import AddEventScreen from "./AddEventScreen.js";
import EventDetailScreen from "./EventDetailScreen.js";

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 22,
                        color: "#fff",
                    },
                    headerStyle: {
                        height: 80,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 3,
                        elevation: 5,
                        borderBottomWidth: 1,
                        borderBottomColor: "#ddd",
                    },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: "วันสำคัญของฉัน",
                        headerStyle: { backgroundColor: "#3498db" },
                        headerTintColor: "#fff",
                    }}
                />
                <Stack.Screen
                    name="AddEvent"
                    component={AddEventScreen}
                    options={({ navigation }) => ({
                        title: "เพิ่มวันสำคัญ",
                        headerStyle: { backgroundColor: "#2ecc71" },
                        headerTintColor: "#fff",
                        headerLeft: () => (
                            <Ionicons
                                name="arrow-back"
                                size={28}
                                color="#fff"
                                style={{ marginLeft: 15 }}
                                onPress={() => navigation.goBack()} // ใช้ navigation.goBack()
                            />
                        ),
                    })}
                />
                <Stack.Screen
                    name="EventDetail"
                    component={EventDetailScreen}
                    options={({ navigation }) => ({
                        title: "รายละเอียด",
                        headerStyle: { backgroundColor: "#e74c3c" },
                        headerTintColor: "#fff",
                        headerLeft: () => (
                            <Ionicons
                                name="arrow-back"
                                size={28}
                                color="#fff"
                                style={{ marginLeft: 15 }}
                                onPress={() => navigation.goBack()} // ใช้ navigation.goBack()
                            />
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

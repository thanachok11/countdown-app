import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Platform, ImageBackground, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

export default function AddEventScreen({ navigation }) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const handleAddEvent = () => {
        axios.post("http://192.168.1.10:5000/events", { title, date: date.toISOString().split("T")[0] })
            .then(() => {
                navigation.goBack();
            })
            .catch(error => console.log(error));
    };

    return (
        <ImageBackground 
            source={{ uri: "https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154750.jpg?t=st=1743525303~exp=1743528903~hmac=6922292aec965f81f1113d7f3e11329a3d05fbc67dbd63f98f3f863aea2cb6a6&w=2000" }} 
            style={styles.container}
        >
            <Text style={styles.header}>📅 เพิ่มวันสำคัญ</Text>
            <TextInput
                style={styles.input}
                placeholder="ชื่อวันสำคัญ"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#aaa"
            />
            <Text style={styles.dateText} onPress={() => setShowPicker(true)}>
                📆 {date.toISOString().split("T")[0]}
            </Text>
            {showPicker && (
                <View style={styles.pickerContainer}>
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={(event, selectedDate) => {
                            setShowPicker(false);
                            if (selectedDate) setDate(selectedDate);
                        }}
                        themeVariant="light"
                        minimumDate={new Date()}
                    />
                </View>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleAddEvent} style={styles.button}>
                    <Text style={styles.buttonText}>บันทึก</Text>
                </TouchableOpacity>
            </View>
         </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: "#f7f7f7", 
        justifyContent: 'flex-start',
    },
    header: { 
        fontSize: 28, 
        fontWeight: "600", 
        textAlign: "center", 
        color: "#fff", 
        marginBottom: 20 
    },
    input: { 
        backgroundColor: "#fff", 
        padding: 15, 
        borderRadius: 8, 
        marginBottom: 20, 
        fontSize: 16, 
        shadowColor: "#fff", 
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
        elevation: 3,
    },
    dateText: { 
        fontSize: 18, 
        textAlign: "center", 
        padding: 15, 
        backgroundColor: "#e0e0e0", 
        borderRadius: 8, 
        marginBottom: 20, 
        color: "#333", 
        borderWidth: 2,
        borderColor: "#3498db",
    },
    buttonContainer: {
        marginTop: 20,
        borderRadius: 8,
        overflow: "hidden",
    },
    button: {
        backgroundColor: "#4CAF50", // ปุ่มสีเขียว
        paddingVertical: 10, // เพิ่ม padding ในแนวตั้ง
        borderRadius: 8, // มุมโค้ง
        alignItems: "center", // จัดตำแหน่งข้อความให้ตรงกลาง
    },
    buttonText: {
        color: "#fff", // สีข้อความในปุ่ม
        fontSize: 18, // ขนาดข้อความ
        fontWeight: "600", // ทำให้ข้อความหนา
    },
    pickerContainer: { 
        backgroundColor: "#fff", 
        borderWidth: 2, 
        borderColor: "#3498db", 
        borderRadius: 8, 
        marginBottom: 20, 
    },
});

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

export default function EventDetailScreen({ route }) {
    const { event } = route.params;

    const [timeLeft, setTimeLeft] = useState("");  // สถานะสำหรับเวลา
    const eventDate = new Date(event.date);

    // ฟังก์ชั่นสำหรับคำนวณเวลาเหลือ
    const calculateTimeLeft = () => {
        const now = new Date();
        
        // ปรับเวลาให้ตรงกับประเทศไทย (UTC+7)
        const timeZoneOffset = 7 * 60; // 7 ชั่วโมง (เป็นนาที)
        const localNow = new Date(now.getTime() + timeZoneOffset * 60000);

        const timeDiff = eventDate.getTime() - localNow.getTime();

        if (timeDiff <= 0) {
            setTimeLeft("Event has passed!");
            return;
        }

        const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysLeft >= 1) {
            // ถ้าเวลามากกว่า 1 วัน แสดงเฉพาะวัน
            setTimeLeft(`${daysLeft} วัน`);
        } else {
            // ถ้าเวลาน้อยกว่า 1 วัน แสดงเป็นชั่วโมง นาที วินาที
            const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setTimeLeft(`${hoursLeft} ชั่วโมง ${minutesLeft} นาที ${secondsLeft} วินาที`);
        }
    };

    // ใช้ useEffect เพื่อให้คำนวณและอัปเดตเวลาใหม่ทุกๆ 1 วินาที
    useEffect(() => {
        const interval = setInterval(calculateTimeLeft, 1000); // อัปเดตทุกๆ 1 วินาที
        return () => clearInterval(interval);  // เมื่อออกจากหน้าจอให้หยุดการทำงาน
    }, []);

    return (
        <ImageBackground
            source={{ uri: "https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154750.jpg?t=st=1743525303~exp=1743528903~hmac=6922292aec965f81f1113d7f3e11329a3d05fbc67dbd63f98f3f863aea2cb6a6&w=2000" }}
            style={styles.container}
        >
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.dateText}>📅 วันที่: {eventDate.toDateString()}</Text>
            <View style={styles.countdownContainer}>
                <Text style={styles.countdownText}>⏳ เหลือเวลา</Text>
                <Text style={styles.countdown}>{timeLeft}</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f9f9f9"
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#fff"
    },
    dateText: {
        fontSize: 18,
        marginBottom: 20,
        color: "#fff"
    },
    countdownContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    countdownText: {
        fontSize: 20,
        fontWeight: "500",
        color: "#fff",
        marginBottom: 5
    },
    countdown: {
        fontSize: 60,
        fontWeight: "bold",
        color: "#D32F2F",
        textShadowColor: "#B71C1C",
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
    },
});

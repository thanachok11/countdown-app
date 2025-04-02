import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import axios from "axios";

export default function HomeScreen({ navigation }) {
    const [events, setEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

    // โหลดข้อมูลเมื่อเข้า HomeScreen
    const fetchEvents = () => {
        axios.get("http://192.168.1.10:5000/events")
            .then(response => {
                const now = new Date();
                const futureEvents = response.data.filter(event => new Date(event.date) > now);
                const pastEvents = response.data.filter(event => new Date(event.date) <= now);

                setEvents(futureEvents); // เก็บเหตุการณ์ในอนาคต
                setPastEvents(pastEvents); // เก็บเหตุการณ์ในอดีต
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchEvents();
        const unsubscribe = navigation.addListener("focus", fetchEvents);
        return unsubscribe;
    }, [navigation]);

    return (
        <ImageBackground 
            source={{ uri: "https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154750.jpg?t=st=1743525303~exp=1743528903~hmac=6922292aec965f81f1113d7f3e11329a3d05fbc67dbd63f98f3f863aea2cb6a6&w=2000" }}  // ใช้ URL หรือ local path ของภาพที่ต้องการ
            style={styles.container}
        >
            <Text style={styles.header}>📆 นับถอยหลังวันสำคัญ</Text>

            {/* แสดงเหตุการณ์ในอนาคต */}
            <FlatList
                data={events}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.eventItem} 
                        onPress={() => navigation.navigate("EventDetail", { event: item })}
                    >
                        <Text style={styles.eventTitle}>{item.title}</Text>
                        <Text style={styles.eventDate}>📅 {new Date(item.date).toDateString()}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={events.length > 0 ? null : <Text style={styles.noEventsText}>ไม่มีวันสำคัญในอนาคต</Text>}
            />

            {/* แสดงเหตุการณ์ที่ผ่านไปแล้ว */}
            {pastEvents.length > 0 && (
                <>
                    <Text style={styles.pastHeader}>📜 ประวัติวันสำคัญ</Text>
                    <FlatList
                        data={pastEvents}
                        renderItem={({ item }) => (
                            <View style={styles.eventItem}>
                                <Text style={styles.eventTitle}>{item.title}</Text>
                                <Text style={styles.eventDate}>📅 {new Date(item.date).toDateString()}</Text>
                            </View>
                        )}
                        keyExtractor={(item) => item._id}
                    />
                </>
            )}

            <Button title="➕ เพิ่มวันสำคัญ" onPress={() => navigation.navigate("AddEvent")} />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: "#f5f5f5" 
    },
    header: { 
        fontSize: 24, 
        fontWeight: "bold", 
        textAlign: "center", 
        marginBottom: 20,
        color: "#fff"  // เปลี่ยนสีข้อความให้เห็นชัดขึ้น
    },
    eventItem: { 
        padding: 15, 
        backgroundColor: "rgba(255, 255, 255, 0.8)", // สีพื้นหลังโปร่งแสงเพื่อให้เห็นภาพพื้นหลัง
        marginVertical: 5, 
        borderRadius: 10, 
        elevation: 2 
    },
    eventTitle: { 
        fontSize: 18, 
        fontWeight: "bold" 
    },
    eventDate: { 
        fontSize: 14, 
        color: "#666" 
    },
    pastHeader: { 
        fontSize: 20, 
        fontWeight: "bold", 
        marginVertical: 20, 
        color: "#fff"  // สีข้อความสำหรับหัวข้อในอดีต
    },
    noEventsText: { 
        fontSize: 16, 
        textAlign: "center", 
        color: "#fff"  // สีข้อความเมื่อไม่มีเหตุการณ์
    }
});

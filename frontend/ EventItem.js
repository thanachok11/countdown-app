import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

export default function EventItem({ event }) {
    const daysLeft = moment(event.date).diff(moment(), "days");
    
    return (
        <View style={styles.eventItem}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.countdown}>{daysLeft} วัน</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    eventItem: { backgroundColor: "#fff", padding: 20, borderRadius: 10, marginBottom: 10 },
    title: { fontSize: 18, fontWeight: "bold" },
    countdown: { fontSize: 16, color: "gray" },
});

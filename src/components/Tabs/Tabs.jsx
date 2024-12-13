import * as React from "react";
import {Text, StyleSheet, View} from "react-native";

export default function Tabs({ showTab2 = true, showTab3 = true, showTab4 = true, showTab5 = true }) {
    return (
        <View style={styles.tabs}>
            <View style={[styles.tab, styles.activeTab]}>
                <Text style={[styles.label, styles.activeLabel]}>Label</Text>
            </View>
            {showTab2 && (
                <View style={styles.tab}>
                    <Text style={styles.label}>Label</Text>
                </View>
            )}
            {showTab3 && (
                <View style={styles.tab}>
                    <Text style={styles.label}>Label</Text>
                </View>
            )}
            {showTab4 && (
                <View style={styles.tab}>
                    <Text style={styles.label}>Label</Text>
                </View>
            )}
            {showTab5 && (
                <View style={styles.tab}>
                    <Text style={styles.label}>Label</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    tabs: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#757575",
        borderStyle: "solid",
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
    },
    activeTab: {
        borderColor: "#383838",
    },
    label: {
        fontSize: 13,
        fontFamily: "Comfortaa-Regular",
        color: "#757575",
        textAlign: "left",
    },
    activeLabel: {
        fontWeight: "700",
        fontFamily: "Comfortaa-Bold",
        color: "#1e1e1e",
    },
});
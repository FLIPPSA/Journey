import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function CheckboxField({ 
    state = "Default", 
    valueType = "Unchecked", 
    label = "Label", 
    hasDescription = true, 
    description = "Description" 
}) {
    const getCheckboxIcon = () => {
        switch (valueType) {
            case "Checked":
                return "Checked.png"; // Replace with the actual path
            case "Indeterminate":
                return "Indeterminate.png"; // Replace with the actual path
            default:
                return "Unchecked.png"; // Replace with the actual path
        }
    };

    return (
        <View style={styles.checkboxField}>
            <View style={styles.container}>
                <View style={[styles.checkboxAndLabel, styles.descriptionRowFlexBox]}>
                    <Image 
                        style={[styles.checkboxIcon, styles.spaceLayout]} 
                        resizeMode="cover" 
                        source={{ uri: getCheckboxIcon() }} 
                    />
                    <Text style={[styles.label, styles.labelTypo]}>{label}</Text>
                </View>
                {hasDescription && (
                    <View style={[styles.descriptionRow, styles.descriptionRowFlexBox]}>
                        <View style={styles.spaceLayout} />
                        <Text style={[styles.description, styles.labelTypo]}>{description}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    descriptionRowFlexBox: {
        gap: 8,
        flexDirection: "row",
        alignSelf: "stretch",
    },
    spaceLayout: {
        height: 16,
        width: 16,
        overflow: "hidden",
    },
    labelTypo: {
        textAlign: "left",
        fontFamily: "Comfortaa-Light",
        fontWeight: "300",
        flex: 1,
    },
    checkboxIcon: {
        borderRadius: 4,
    },
    label: {
        fontSize: 14,
        color: "#1e1e1e",
    },
    checkboxAndLabel: {
        alignItems: "flex-end",
    },
    description: {
        fontSize: 12,
        color: "#757575",
    },
    descriptionRow: {
        alignItems: "center",
    },
    container: {
        gap: 4,
        width: 240,
        position: "relative",
    },
    checkboxField: {
        borderRadius: 8,
        borderStyle: "dashed",
        borderColor: "#303030",
        borderWidth: 2,
        width: "100%",
        height: 72,
        overflow: "hidden",
    },
});
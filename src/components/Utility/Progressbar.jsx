import * as React from "react";
import { StyleSheet, View } from "react-native";

export default function ProgressBarSet({ progress = 0 }) {
  const getProgressWidth = () => {
    switch (progress) {
      case 0:
        return "0%";
      case 10:
        return "10%";
      case 25:
        return "25%";
      case 50:
        return "50%";
      case 75:
        return "75%";
      case 100:
        return "100%";
      default:
        return "0%";
    }
  };

  return (
    <View style={styles.progressBar}>
      <View style={[styles.track]}>
        <View
          style={[
            styles.activeTrack,
            { width: getProgressWidth() },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    borderRadius: 5,
    borderStyle: "dashed",
    borderColor: "#9747ff",
    borderWidth: 1,
    width: "100%",
    height: 12,
    overflow: "hidden",
    backgroundColor: "#e8b061",
  },
  track: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    overflow: "hidden",
  },
  activeTrack: {
    height: "100%",
    backgroundColor: "#82581c",
    borderRadius: 5,
  },
});
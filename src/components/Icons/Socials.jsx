import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { sizes } from "../../utils/design";

export default function Socials({ type }) {
  return (
    <Image
    style={styles.logo}
    resizeMode="cover"
    source={{ uri: `${type}.png` }}
/>
  )
}

const styles = StyleSheet.create({
    logo: {
		borderRadius: sizes.radius.circle,
		width: sizes.icon.large,
		height: sizes.icon.large,
	},
})
export const colors = {
	primitives: {
		brand: {
			100: "#FAE9D2",
			200: "#F3D5AA",
			300: "#F8CE94",
			400: "#EB8061",
			500: "#EEAC4E",
			600: "#EBA43F",
			700: "#C57E1B",
			800: "#AF731E",
			900: "#82581C",
			1000: "#694511",
		},
		gray: {
			100: "#F5F5F5",
			200: "#E6E6E6",
			300: "#D9D9D9",
			400: "#B3B3B3",
			500: "#757575",
			600: "#444444",
			700: "#383838",
			800: "#2C2C2C",
			900: "#1E1E1E",
			1000: "#111111",
		},
		black: {
			100: "#0C0C0D",
			200: "#0C0C0D", // opacity 10%
			300: "#0C0C0D", // opacity 20%
			400: "#0C0C0D", // opacity 40%
			500: "#0C0C0D", // opacity 70%
			600: "#0C0C0D", // opacity 80%
			700: "#0C0C0D", // opacity 85%
			800: "#0C0C0D", // opacity 90%
			900: "#0C0C0D", // opacity 95%
			1000: "#0C0C0D", // full opacity
		},
		white: {
			100: "#FFFFFF",
			200: "#FFFFFF", // opacity 10%
			300: "#FFFFFF", // opacity 20%
			400: "#FFFFFF", // opacity 40%
			500: "#FFFFFF", // opacity 70%
			600: "#FFFFFF", // opacity 80%
			700: "#FFFFFF", // opacity 85%
			800: "#FFFFFF", // opacity 90%
			900: "#FFFFFF", // opacity 95%
			1000: "#FFFFFF", // full opacity
		},
		green: {
			100: "#EBFFEE",
			200: "#CFF7D3",
			300: "#AFF4C6",
			400: "#85E0A3",
			500: "#1AAE5C",
			600: "#009951",
			700: "#008043",
			800: "#02542D",
			900: "#024023",
			1000: "#062D1B",
		},
		yellow: {
			100: "#FFFBEB",
			200: "#FFF1C2",
			300: "#FFE8A3",
			400: "#EB8931",
			500: "#E5A000",
			600: "#BF6A02",
			700: "#975102",
			800: "#682D03",
			900: "#522504",
			1000: "#401B01",
		},
		red: {
			100: "#FEE9E7",
			200: "#FDD3D0",
			300: "#FCB3AD",
			400: "#F4776A",
			500: "#EC221F",
			600: "#C00F0C",
			700: "#900B09",
			800: "#690807",
			900: "#4D080A",
			1000: "#300603",
		},
	},

	background: {
		brand: {
			default: () => colors.primitives.brand[700],
			active: () => colors.primitives.brand[1000],
			secondary: () => colors.primitives.brand[400],
			secondaryActive: () => colors.primitives.brand[900],
			tertiary: () => colors.primitives.brand[200],
			tertiaryActive: () => colors.primitives.brand[500],
		},
		default: {
			default: () => colors.primitives.white[100],
			defaultActive: () => colors.primitives.gray[100],
			secondary: () => colors.primitives.gray[200],
			secondaryActive: () => colors.primitives.gray[400],
			tertiary: () => colors.primitives.gray[500],
			tertiaryActive: () => colors.primitives.gray[600],
		},
		success: {
			default: () => colors.primitives.green[500],
			active: () => colors.primitives.green[700],
			secondary: () => colors.primitives.green[200],
			secondaryActive: () => colors.primitives.green[400],
			tertiary: () => colors.primitives.green[100],
			tertiaryActive: () => colors.primitives.green[300],
		},
		warning: {
			default: () => colors.primitives.yellow[400],
			active: () => colors.primitives.yellow[600],
			secondary: () => colors.primitives.yellow[200],
			secondaryActive: () => colors.primitives.yellow[400],
			tertiary: () => colors.primitives.yellow[100],
			tertiaryActive: () => colors.primitives.yellow[300],
		},
		danger: {
			default: () => colors.primitives.red[500],
			active: () => colors.primitives.red[700],
			secondary: () => colors.primitives.red[200],
			secondaryActive: () => colors.primitives.red[400],
			tertiary: () => colors.primitives.red[100],
			tertiaryActive: () => colors.primitives.red[300],
		},
	},

	text: {
		default: {
			default: () => colors.primitives.gray[900],
			secondary: () => colors.primitives.gray[500],
			tertiary: () => colors.primitives.gray[400],
			inverse: () => colors.primitives.gray[100],
		},
		brand: {
			default: () => colors.primitives.brand[900],
			secondary: () => colors.primitives.brand[600],
			tertiary: () => colors.primitives.brand[500],
		},
		success: {
			default: () => colors.primitives.green[800],
			secondary: () => colors.primitives.green[600],
			tertiary: () => colors.primitives.green[500],
		},
		warning: {
			default: () => colors.primitives.yellow[900],
			secondary: () => colors.primitives.yellow[700],
			tertiary: () => colors.primitives.yellow[600],
		},
		danger: {
			default: () => colors.primitives.red[900],
			secondary: () => colors.primitives.red[700],
			tertiary: () => colors.primitives.red[500],
		},
	},

	border: {
		default: {
			default: () => colors.primitives.gray[300],
			secondary: () => colors.primitives.gray[500],
			tertiary: () => colors.primitives.gray[700],
		},
		brand: {
			default: () => colors.primitives.brand[800],
			secondary: () => colors.primitives.brand[600],
			tertiary: () => colors.primitives.brand[500],
		},
		success: {
			default: () => colors.primitives.green[800],
			secondary: () => colors.primitives.green[600],
			tertiary: () => colors.primitives.green[500],
		},
		warning: {
			default: () => colors.primitives.yellow[800],
			secondary: () => colors.primitives.yellow[700],
			tertiary: () => colors.primitives.yellow[600],
		},
		danger: {
			default: () => colors.primitives.red[800],
			secondary: () => colors.primitives.red[700],
			tertiary: () => colors.primitives.red[500],
		},
	},

	icon: {
		default: {
			default: () => colors.primitives.gray[900],
			secondary: () => colors.primitives.gray[500],
			tertiary: () => colors.primitives.gray[400],
			inverse: () => colors.primitives.gray[100],
		},
		brand: {
			default: () => colors.primitives.brand[900],
			secondary: () => colors.primitives.brand[600],
			tertiary: () => colors.primitives.brand[500],
		},
		success: {
			default: () => colors.primitives.green[800],
			secondary: () => colors.primitives.green[600],
			tertiary: () => colors.primitives.green[500],
		},
		warning: {
			default: () => colors.primitives.yellow[900],
			secondary: () => colors.primitives.yellow[700],
			tertiary: () => colors.primitives.yellow[600],
		},
		danger: {
			default: () => colors.primitives.red[900],
			secondary: () => colors.primitives.red[700],
			tertiary: () => colors.primitives.red[500],
		},
	},
};

export const sizes = {
	space: {
		none: 0,
		2: 2,
		4: 4,
		6: 6,
		8: 8,
		12: 12,
		16: 16,
		24: 24,
		32: 32,
		40: 40,
		48: 48,
		64: 64,
		96: 96,
		160: 160,
		negative: {
			4: -4,
			8: -8,
			12: -12,
			16: -16,
			24: -24,
		},
	},
	radius: {
		4: 4,
		8: 8,
		16: 16,
		circle: 9999, // For fully rounded elements
	},
	stroke: {
		1: 1,
		2: 2,
		3: 3,
		4: 4,
	},
	icon: {
		xxxSmall: 12,
		xxSmall: 16,
		xSmall: 20,
		small: 24,
		medium: 32,
		large: 40,
		xLarge: 48,
		xxLarge: 52,
	},
};

export const typography = {
	primitives: {
		family: "Comfortaa",
		scale: {
			12: 12,
			13: 13,
			14: 14,
			16: 16,
			20: 20,
			24: 24,
			32: 32,
			40: 40,
			48: 48,
			64: 64,
			72: 72,
			100: 100,
		},
		weight: {
			light: "Light",
			regular: "Regular",
			medium: "Medium",
			semiBold: "SemiBold",
			bold: "Bold",
		},
	},
	styles: {
		titleHero: {
			fontFamily: () => typography.primitives.family,
			fontSize: () => typography.primitives.scale[48], // References primitives.scale.48
			fontWeight: () => typography.primitives.weight.bold, // References primitives.weight.bold
		},
		titlePage: {
			fontFamily: () => typography.primitives.family,
			sizes: {
				small: () => typography.primitives.scale[24], // References primitives.scale.24
				base: () => typography.primitives.scale[32], // References primitives.scale.32
				large: () => typography.primitives.scale[40], // References primitives.scale.40
			},
			fontWeight: () => typography.primitives.weight.bold, // References primitives.weight.bold
		},
		subtitle: {
			fontFamily: () => typography.primitives.family,
			sizes: {
				small: () => typography.primitives.scale[16], // References primitives.scale.16
				base: () => typography.primitives.scale[20], // References primitives.scale.20
				large: () => typography.primitives.scale[24], // References primitives.scale.24
			},
			fontWeight: () => typography.primitives.weight.light, // References primitives.weight.light
		},
		heading: {
			fontFamily: () => typography.primitives.family,
			sizes: {
				small: () => typography.primitives.scale[14], // References primitives.scale.14
				base: () => typography.primitives.scale[16], // References primitives.scale.16
				large: () => typography.primitives.scale[20], // References primitives.scale.20
			},
			fontWeight: () => typography.primitives.weight.bold, // References primitives.weight.bold
		},
		subheading: {
			fontFamily: () => typography.primitives.family,
			sizes: {
				small: () => typography.primitives.scale[12], // References primitives.scale.12
				base: () => typography.primitives.scale[14], // References primitives.scale.14
				large: () => typography.primitives.scale[16], // References primitives.scale.16
			},
			fontWeight: () => typography.primitives.weight.light, // References primitives.weight.light
		},
		body: {
			fontFamily: () => typography.primitives.family,
			sizes: {
                xsmall: () => typography.primitives.scale[12], // References primitives.scale.12
				small: () => typography.primitives.scale[14], // References primitives.scale.14
				base: () => typography.primitives.scale[16], // References primitives.scale.16
				large: () => typography.primitives.scale[20], // References primitives.scale.20
			},
			fontWeights: {
				regular: () => typography.primitives.weight.light, // References primitives.weight.light
				bold: () => typography.primitives.weight.bold, // References primitives.weight.bold
			},
		},
	},
};

import { CSSProperties } from "react";
import { SxProps, Theme } from "@mui/material/styles";
import { Variants } from "framer-motion";

interface PresentationStyleParams {
	isMobile: boolean;
	isVerySmall: boolean;
	isSmallTablet: boolean;
}

interface PresentationStyles {
	root: CSSProperties;
	floatingCircleTopRight: CSSProperties;
	floatingCircleBottomLeft: CSSProperties;
	imageContainer: CSSProperties;
	outerRing: CSSProperties;
	innerRing: CSSProperties;
	glow: CSSProperties;
	imageWrapper: CSSProperties;
	particleTopRight: CSSProperties;
	particleBottomLeft: CSSProperties;
	textContainer: CSSProperties;
	decorativeCircle: CSSProperties;
	backgroundOverlay: SxProps<Theme>;
	gridContainer: SxProps<Theme>;
	cardMedia: SxProps<Theme>;
	textBox: SxProps<Theme>;
	nameTypography: SxProps<Theme>;
	roleTypography: SxProps<Theme>;
	specialtyTypography: SxProps<Theme>;
	secondaryRoleTypography: SxProps<Theme>;
		contentLayer: CSSProperties;
}

export const getPresentationStyles = (
	params: PresentationStyleParams
): PresentationStyles => {
	const { isMobile, isVerySmall, isSmallTablet } = params;

	return {
		root: {
			width: "100%",
			position: "relative",
			overflow: "hidden"
		},
		backgroundOverlay: {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			background: `
				radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.036) 0%, transparent 50%),
				radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.036) 0%, transparent 50%),
				radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.024) 0%, transparent 50%)
			`,
			zIndex: 0
		},
		floatingCircleTopRight: {
			position: "absolute",
			top: "10%",
			right: "10%",
			width: "80px",
			height: "80px",
			borderRadius: "50%",
			background:
				"linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(147, 51, 234, 0.1))",
			zIndex: 1,
			display: isMobile ? "none" : "block"
		},
		floatingCircleBottomLeft: {
			position: "absolute",
			bottom: "15%",
			left: "5%",
			width: "60px",
			height: "60px",
			borderRadius: "50%",
			background:
				"linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(0, 255, 255, 0.1))",
			zIndex: 1,
			display: isMobile ? "none" : "block"
		},
		gridContainer: {
			minHeight: {
				xs: "auto",
				sm: "auto",
				md: "75vh",
				lg: "85vh"
			},
			display: "grid",
			gridTemplateColumns: {
				xs: "1fr",
				sm: "1fr",
				md: "1.2fr 1fr",
				lg: "1.3fr 1fr"
			},
			gridTemplateRows: {
				xs: "auto auto",
				sm: "auto auto",
				md: "1fr"
			},
			alignItems: "center",
			margin: {
				xs: "0 0.5rem",
				sm: "0 1rem",
				md: "0 1.5rem",
				lg: "0 2rem"
			},
			borderRadius: "20px",
			gap: {
				xs: "3rem",
				sm: "4rem",
				md: "3rem",
				lg: "4rem"
			},
			padding: {
				xs: "12vh 0 4rem 0",
				sm: "14vh 0 5rem 0",
				md: "8vh 0 4rem 0",
				lg: "10vh 0 6rem 0"
			},
			position: "relative",
			zIndex: 2
		},
		imageContainer: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			order: isMobile ? 1 : 0,
			position: "relative"
		},
		outerRing: {
			position: "absolute",
			width: isMobile ? "320px" : isSmallTablet ? "420px" : "680px",
			height: isMobile ? "320px" : isSmallTablet ? "420px" : "680px",
			borderRadius: "50%",
			border: "2px solid transparent",
			background: `
				linear-gradient(45deg, transparent, transparent) padding-box,
				linear-gradient(45deg, rgba(0, 255, 255, 0.3), rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3)) border-box
			`,
			zIndex: 1
		},
		innerRing: {
			position: "absolute",
			width: isMobile ? "290px" : isSmallTablet ? "390px" : "640px",
			height: isMobile ? "290px" : isSmallTablet ? "390px" : "640px",
			borderRadius: "50%",
			border: "1px solid rgba(0, 255, 255, 0.2)",
			zIndex: 1
		},
		glow: {
			position: "absolute",
			width: isMobile ? "280px" : isSmallTablet ? "380px" : "630px",
			height: isMobile ? "280px" : isSmallTablet ? "380px" : "630px",
			borderRadius: "50%",
			background:
				"radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)",
			zIndex: 0
		},
		imageWrapper: {
			position: "relative",
			zIndex: 2,
			borderRadius: "50%",
			overflow: "hidden"
		},
		cardMedia: {
			height: {
				xs: isVerySmall ? "240px" : "280px",
				sm: "320px",
				md: "480px",
				lg: "550px",
				xl: "600px"
			},
			width: {
				xs: isVerySmall ? "240px" : "280px",
				sm: "320px",
				md: "480px",
				lg: "550px",
				xl: "600px"
			},
			maxWidth: "75vw",
			maxHeight: "75vw",
			objectFit: "cover",
			borderRadius: "50%",
			boxShadow: `
				0 0 0 4px rgba(0, 255, 255, 0.1),
				0 0 0 8px rgba(147, 51, 234, 0.05),
				0 20px 40px rgba(0, 0, 0, 0.3),
				0 0 60px rgba(0, 255, 255, 0.2)
			`,
			border: "3px solid rgba(255, 255, 255, 0.1)",
			transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
			filter: "contrast(1.1) saturate(1.1)",
			"&:hover": {
				boxShadow: `
					0 0 0 4px rgba(0, 255, 255, 0.2),
					0 0 0 8px rgba(147, 51, 234, 0.1),
					0 25px 50px rgba(0, 0, 0, 0.4),
					0 0 80px rgba(0, 255, 255, 0.3)
				`
			}
		},
		particleTopRight: {
			position: "absolute",
			top: "10%",
			right: "15%",
			width: "8px",
			height: "8px",
			borderRadius: "50%",
			background: "rgba(0, 255, 255, 0.6)",
			zIndex: 3
		},
		particleBottomLeft: {
			position: "absolute",
			bottom: "20%",
			left: "10%",
			width: "6px",
			height: "6px",
			borderRadius: "50%",
			background: "rgba(147, 51, 234, 0.7)",
			zIndex: 3
		},
		textContainer: {
			width: "100%",
			height: "auto",
			order: isMobile ? 2 : 0,
			position: "relative"
		},
		textBox: {
			padding: {
				xs: isVerySmall ? "2rem" : "2.5rem",
				sm: "3rem",
				md: "3.5rem",
				lg: "4.5rem"
			},
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			gap: {
				xs: "2rem",
				sm: "2.5rem",
				md: "3rem"
			},
			background: `
				linear-gradient(135deg,
					rgba(15, 23, 42, 0.95) 0%,
					rgba(30, 41, 59, 0.9) 50%,
					rgba(15, 23, 42, 0.95) 100%
				)
			`,
			borderRadius: {
				xs: "20px",
				sm: "25px",
				md: "35px",
				lg: "45px"
			},
			border: "1px solid rgba(0, 255, 255, 0.1)",
			backdropFilter: "blur(20px)",
			position: "relative",
			overflow: "hidden",
			boxShadow: `
				0 25px 50px rgba(0, 0, 0, 0.5),
				inset 0 1px 0 rgba(255, 255, 255, 0.1),
				0 0 60px rgba(0, 255, 255, 0.05)
			`,
			"&::before": {
				content: '""',
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				height: "2px",
				background:
					"linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.4), rgba(168, 85, 247, 0.4), transparent)"
			},
			"&::after": {
				content: '""',
				position: "absolute",
				top: "20%",
				right: "-50%",
				width: "100%",
				height: "100%",
				background:
					"radial-gradient(circle, rgba(0, 255, 255, 0.03) 0%, transparent 50%)",
				transform: "rotate(45deg)",
				pointerEvents: "none"
			}
		},
		nameTypography: {
			fontSize: {
				xs: isVerySmall ? "1.6rem" : "2rem",
				sm: "2.5rem",
				md: "3rem",
				lg: "3.8rem",
				xl: "4.2rem"
			},
			fontWeight: 800,
			textAlign: isMobile ? "center" : "left",
			wordWrap: "break-word",
			overflowWrap: "break-word",
			lineHeight: 1.1,
			color: "#f8f9fa",
			position: "relative",
			"&::after": {
				content: '""',
				position: "absolute",
				bottom: "-8px",
				left: isMobile ? "50%" : "0",
				transform: isMobile ? "translateX(-50%)" : "none",
				width: "60px",
				height: "3px",
				background:
					"linear-gradient(90deg, rgba(34, 211, 238, 0.6), rgba(168, 85, 247, 0.6))",
				borderRadius: "2px"
			}
		},
		roleTypography: {
			fontSize: {
				xs: isVerySmall ? "1.6rem" : "2rem",
				sm: "2.5rem",
				md: "3rem",
				lg: "3.8rem",
				xl: "4.2rem"
			},
			fontWeight: 800,
			textAlign: isMobile ? "center" : "left",
			wordWrap: "break-word",
			overflowWrap: "break-word",
			lineHeight: 1.1,
			color: "#e9ecef"
		},
		specialtyTypography: {
			display: "block",
			fontSize: isMobile ? "0.8em" : "0.85em",
			fontWeight: 700,
			color: "#06b6d4",
			marginTop: "0.3rem"
		},
		secondaryRoleTypography: {
			fontSize: {
				xs: isVerySmall ? "1.6rem" : "2rem",
				sm: "2.5rem",
				md: "3rem",
				lg: "3.8rem",
				xl: "4.2rem"
			},
			fontWeight: 800,
			textAlign: isMobile ? "center" : "left",
			wordWrap: "break-word",
			overflowWrap: "break-word",
			lineHeight: 1.1,
			color: "#6d28d9"
		},
		decorativeCircle: {
			position: "absolute",
			bottom: "15px",
			right: "15px",
			width: "40px",
			height: "40px",
			background:
				"linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(147, 51, 234, 0.1))",
			borderRadius: "50%",
			border: "1px solid rgba(0, 255, 255, 0.2)",
			zIndex: 1
			},
			contentLayer: {
				position: "relative",
				zIndex: 2
		}
	};
};

export const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 1.2,
			staggerChildren: 0.3,
			delayChildren: 0.2
		}
	}
};

export const imageVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.8,
		rotateY: -15
	},
	visible: {
		opacity: 1,
		scale: 1,
		rotateY: 0,
		transition: {
			duration: 1,
			ease: [0.25, 0.46, 0.45, 0.94]
		}
	}
};

export const getTextContainerVariants = (isMobile: boolean): Variants => ({
	hidden: { opacity: 0, x: isMobile ? 0 : 50 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.8,
			ease: "easeOut",
			staggerChildren: 0.2
		}
	}
});

export const textVariants: Variants = {
	hidden: { opacity: 0, y: 30, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.46, 0.45, 0.94]
		}
	}
};

export const floatingVariants: Variants = {
	animate: {
		y: [-10, 10, -10],
		rotate: [0, 2, -2, 0],
		transition: {
			duration: 6,
			repeat: Infinity,
			ease: "easeInOut"
		}
	}
};

export const floatingCircleBottomLeftVariants: Variants = {
	animate: {
		y: [15, -15, 15],
		rotate: [0, -3, 3, 0],
		transition: {
			duration: 8,
			repeat: Infinity,
			ease: "easeInOut",
			delay: 2
		}
	}
};

export const outerRingAnimation = {
	animate: { rotate: 360 },
	transition: { duration: 20, repeat: Infinity, ease: "linear" }
};

export const innerRingAnimation = {
	animate: { rotate: -360 },
	transition: { duration: 15, repeat: Infinity, ease: "linear" }
};

export const glowAnimation = {
	animate: {
		scale: [1, 1.1, 1],
		opacity: [0.3, 0.6, 0.3]
	},
	transition: {
		duration: 4,
		repeat: Infinity,
		ease: "easeInOut"
	}
};

export const floatingParticleTopAnimation = {
	animate: {
		y: [-20, 20, -20],
		x: [-10, 10, -10],
		opacity: [0.3, 0.8, 0.3]
	},
	transition: {
			duration: 5,
			repeat: Infinity,
			ease: "easeInOut"
	}
};

export const floatingParticleBottomAnimation = {
	animate: {
		y: [15, -15, 15],
		x: [10, -10, 10],
		opacity: [0.4, 0.9, 0.4]
	},
	transition: {
			duration: 4,
			repeat: Infinity,
			ease: "easeInOut",
		delay: 1
	}
};

export const decorativeCircleAnimation = {
	animate: {
		rotate: [0, 180, 360],
		scale: [1, 1.2, 1]
	},
	transition: {
			duration: 10,
			repeat: Infinity,
			ease: "linear"
	}
};

export const imageHoverAnimation = {
	whileHover: {
		scale: 1.05,
		rotateY: 5,
		transition: { duration: 0.3 }
	}
};

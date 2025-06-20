"use client";

import { useState, useEffect } from "react";

const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
};

export const useResponsive = () => {
	const [screenSize, setScreenSize] = useState({
		width: typeof window !== "undefined" ? window.innerWidth : 1024,
		height: typeof window !== "undefined" ? window.innerHeight : 768,
	});

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);

		const handleResize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Prevent hydration mismatch
	if (!isMounted) {
		return {
			width: 1024,
			height: 768,
			isMobile: false,
			isTablet: false,
			isDesktop: true,
			isLarge: true,
			breakpoint: "lg",
			cols: {
				sm: 1,
				md: 2,
				lg: 3,
				xl: 4,
			},
		};
	}

	const { width, height } = screenSize;

	const isMobile = width < breakpoints.md;
	const isTablet = width >= breakpoints.md && width < breakpoints.lg;
	const isDesktop = width >= breakpoints.lg;
	const isLarge = width >= breakpoints.xl;

	const getBreakpoint = () => {
		if (width >= breakpoints["2xl"]) return "2xl";
		if (width >= breakpoints.xl) return "xl";
		if (width >= breakpoints.lg) return "lg";
		if (width >= breakpoints.md) return "md";
		return "sm";
	};

	const getGridCols = () => {
		if (isMobile) return { sm: 1, md: 1, lg: 1, xl: 1 };
		if (isTablet) return { sm: 1, md: 2, lg: 2, xl: 2 };
		if (isLarge) return { sm: 1, md: 2, lg: 3, xl: 4 };
		return { sm: 1, md: 2, lg: 3, xl: 3 };
	};

	return {
		width,
		height,
		isMobile,
		isTablet,
		isDesktop,
		isLarge,
		breakpoint: getBreakpoint(),
		cols: getGridCols(),
	};
};

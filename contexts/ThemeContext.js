"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("dark");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Load theme from localStorage on mount
		const savedTheme = localStorage.getItem("lumaone-theme");
		const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
			.matches
			? "dark"
			: "light";

		setTheme(savedTheme || systemTheme);
		setIsLoading(false);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		localStorage.setItem("lumaone-theme", newTheme);
	};

	const themeConfig = {
		dark: {
			background: "#0f0f0f",
			cardBackground: "#1a1a1a",
			headerBackground: "#0a0a0a",
			text: "#e2e8f0",
			textSecondary: "#94a3b8",
			textMuted: "#64748b",
			border: "rgba(148, 163, 184, 0.2)",
			accent: "#22c55e",
			accentSecondary: "#3b82f6",
			warning: "#f59e0b",
			error: "#ef4444",
			success: "#22c55e",
		},
		light: {
			background: "#ffffff",
			cardBackground: "#f8fafc",
			headerBackground: "#f1f5f9",
			text: "#1e293b",
			textSecondary: "#475569",
			textMuted: "#64748b",
			border: "rgba(148, 163, 184, 0.3)",
			accent: "#059669",
			accentSecondary: "#2563eb",
			warning: "#d97706",
			error: "#dc2626",
			success: "#059669",
		},
	};

	const value = {
		theme,
		toggleTheme,
		isLoading,
		colors: themeConfig[theme],
		isDark: theme === "dark",
		isLight: theme === "light",
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

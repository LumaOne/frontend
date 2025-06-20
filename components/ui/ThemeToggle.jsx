"use client";

import { useTheme } from "../../contexts/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle({ size = "md", className = "" }) {
	const { theme, toggleTheme, isLoading } = useTheme();

	if (isLoading) {
		return (
			<div
				className={`animate-pulse bg-gray-200 rounded-full ${
					size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-10 h-10"
				} ${className}`}
			/>
		);
	}

	const sizeClasses = {
		sm: "w-8 h-8 text-sm",
		md: "w-10 h-10 text-base",
		lg: "w-12 h-12 text-lg",
	};

	return (
		<button
			onClick={toggleTheme}
			className={`
        ${sizeClasses[size]}
        flex items-center justify-center
        rounded-full
        transition-all duration-300 ease-in-out
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
					theme === "dark"
						? "bg-gray-800 hover:bg-gray-700 text-yellow-400 focus:ring-yellow-400"
						: "bg-gray-100 hover:bg-gray-200 text-blue-600 focus:ring-blue-500"
				}
        ${className}
      `}
			aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
			title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
		>
			<div className="relative">
				{theme === "dark" ? (
					<FaSun
						className="transform transition-transform duration-300 rotate-0"
						size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
					/>
				) : (
					<FaMoon
						className="transform transition-transform duration-300 rotate-0"
						size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
					/>
				)}
			</div>
		</button>
	);
}

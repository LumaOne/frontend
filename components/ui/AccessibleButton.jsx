"use client";

import { forwardRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const AccessibleButton = forwardRef(
	(
		{
			children,
			variant = "primary",
			size = "md",
			disabled = false,
			loading = false,
			ariaLabel,
			ariaDescribedBy,
			onClick,
			onKeyDown,
			className = "",
			icon: Icon,
			...props
		},
		ref,
	) => {
		const { colors } = useTheme();

		const variants = {
			primary: {
				background: `linear-gradient(45deg, ${colors.accent}, ${colors.success})`,
				color: colors.background,
				border: "none",
				hoverBackground: `linear-gradient(45deg, ${colors.success}, ${colors.accent})`,
			},
			secondary: {
				background: colors.accentSecondary,
				color: "#ffffff",
				border: "none",
				hoverBackground: colors.accentSecondary + "CC",
			},
			outline: {
				background: "transparent",
				color: colors.text,
				border: `2px solid ${colors.border}`,
				hoverBackground: colors.accent + "20",
				hoverBorder: colors.accent,
				hoverColor: colors.accent,
			},
			ghost: {
				background: "transparent",
				color: colors.textSecondary,
				border: "none",
				hoverBackground: colors.accent + "10",
				hoverColor: colors.accent,
			},
		};

		const sizes = {
			sm: { padding: "6px 12px", fontSize: "12px" },
			md: { padding: "8px 16px", fontSize: "14px" },
			lg: { padding: "12px 24px", fontSize: "16px" },
			xl: { padding: "16px 32px", fontSize: "18px" },
		};

		const variantStyle = variants[variant];
		const sizeStyle = sizes[size];

		const handleKeyDown = (e) => {
			// Enhanced keyboard navigation
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				if (!disabled && !loading && onClick) {
					onClick(e);
				}
			}
			if (onKeyDown) {
				onKeyDown(e);
			}
		};

		const handleClick = (e) => {
			if (!disabled && !loading && onClick) {
				onClick(e);
			}
		};

		return (
			<button
				ref={ref}
				type="button"
				className={className}
				disabled={disabled || loading}
				aria-label={ariaLabel}
				aria-describedby={ariaDescribedBy}
				aria-busy={loading}
				aria-disabled={disabled}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				style={{
					...sizeStyle,
					background: variantStyle.background,
					color: variantStyle.color,
					border: variantStyle.border,
					borderRadius: "8px",
					fontFamily: '"JetBrains Mono", monospace',
					fontWeight: "600",
					cursor: disabled || loading ? "not-allowed" : "pointer",
					opacity: disabled ? 0.6 : 1,
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "8px",
					transition: "all 0.2s ease-in-out",
					outline: "none",
					position: "relative",
					overflow: "hidden",
					// Enhanced focus styles for accessibility
					boxShadow: "none",
				}}
				onMouseOver={(e) => {
					if (!disabled && !loading) {
						e.target.style.background =
							variantStyle.hoverBackground || variantStyle.background;
						if (variantStyle.hoverBorder)
							e.target.style.borderColor = variantStyle.hoverBorder;
						if (variantStyle.hoverColor)
							e.target.style.color = variantStyle.hoverColor;
						e.target.style.transform = "translateY(-1px)";
						e.target.style.boxShadow = `0 4px 12px ${colors.accent}30`;
					}
				}}
				onMouseOut={(e) => {
					if (!disabled && !loading) {
						e.target.style.background = variantStyle.background;
						e.target.style.borderColor = variantStyle.border?.includes("solid")
							? colors.border
							: "transparent";
						e.target.style.color = variantStyle.color;
						e.target.style.transform = "translateY(0)";
						e.target.style.boxShadow = "none";
					}
				}}
				onFocus={(e) => {
					// High-contrast focus ring for accessibility
					e.target.style.outline = `3px solid ${colors.accent}`;
					e.target.style.outlineOffset = "2px";
					e.target.style.boxShadow = `0 0 0 4px ${colors.accent}20`;
				}}
				onBlur={(e) => {
					e.target.style.outline = "none";
					e.target.style.outlineOffset = "0";
					e.target.style.boxShadow = "none";
				}}
				{...props}
			>
				{loading && (
					<div
						style={{
							width: "14px",
							height: "14px",
							border: `2px solid ${colors.background}`,
							borderTop: `2px solid transparent`,
							borderRadius: "50%",
							animation: "spin 1s linear infinite",
						}}
						aria-hidden="true"
					/>
				)}

				{Icon && !loading && (
					<Icon size={sizeStyle.fontSize} aria-hidden="true" />
				)}

				<span>{children}</span>

				<style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
			</button>
		);
	},
);

AccessibleButton.displayName = "AccessibleButton";

export default AccessibleButton;

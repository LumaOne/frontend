"use client";

import { lazy, Suspense } from "react";
import { useTheme } from "../../contexts/ThemeContext";

// Lazy load chart components for better performance
const ThreatChart = lazy(() => import("./charts/ThreatChart"));
const UsageChart = lazy(() => import("./charts/UsageChart"));
const DepartmentChart = lazy(() => import("./charts/DepartmentChart"));

const ChartSkeleton = ({ height = 300 }) => {
	const { colors } = useTheme();

	return (
		<div
			style={{
				height: `${height}px`,
				background: colors.cardBackground,
				borderRadius: "8px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				border: `1px solid ${colors.border}`,
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Skeleton animation */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: "-100%",
					width: "100%",
					height: "100%",
					background: `linear-gradient(90deg, transparent, ${colors.accent}20, transparent)`,
					animation: "skeleton-loading 1.5s infinite",
				}}
			/>

			<div
				style={{
					color: colors.textMuted,
					fontFamily: '"JetBrains Mono", monospace',
					fontSize: "14px",
				}}
			>
				{"// Loading chart data..."}
			</div>

			<style jsx>{`
        @keyframes skeleton-loading {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
		</div>
	);
};

export const LazyThreatChart = ({ height, className }) => (
	<Suspense fallback={<ChartSkeleton height={height} />}>
		<ThreatChart height={height} className={className} />
	</Suspense>
);

export const LazyUsageChart = ({ height, className }) => (
	<Suspense fallback={<ChartSkeleton height={height} />}>
		<UsageChart height={height} className={className} />
	</Suspense>
);

export const LazyDepartmentChart = ({ height, className }) => (
	<Suspense fallback={<ChartSkeleton height={height} />}>
		<DepartmentChart height={height} className={className} />
	</Suspense>
);

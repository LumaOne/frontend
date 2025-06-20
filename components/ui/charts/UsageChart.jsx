"use client";

import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../../contexts/ThemeContext";

const generateUsageData = () => {
	const now = new Date();
	const data = [];

	for (let i = 29; i >= 0; i--) {
		const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
		data.push({
			date: date.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			}),
			emails: Math.floor(Math.random() * 50000) + 20000,
			apiCalls: Math.floor(Math.random() * 25000) + 10000,
			storage: Math.floor(Math.random() * 5) + 40,
		});
	}

	return data;
};

export default function UsageChart({ height = 300, className = "" }) {
	const { colors, isDark } = useTheme();
	const data = generateUsageData();

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div
					style={{
						backgroundColor: colors.cardBackground,
						border: `1px solid ${colors.border}`,
						borderRadius: "8px",
						padding: "12px",
						fontFamily: '"JetBrains Mono", monospace',
					}}
				>
					<p style={{ color: colors.text, margin: 0, marginBottom: "8px" }}>
						{`Date: ${label}`}
					</p>
					{payload.map((entry) => (
						<p
							key={entry.dataKey}
							style={{
								color: entry.color,
								margin: 0,
								fontSize: "12px",
							}}
						>
							{`${entry.name}: ${entry.value.toLocaleString()}${entry.dataKey === "storage" ? " GB" : ""}`}
						</p>
					))}
				</div>
			);
		}
		return null;
	};

	return (
		<div className={`w-full ${className}`}>
			<ResponsiveContainer width="100%" height={height}>
				<AreaChart
					data={data}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
					<XAxis
						dataKey="date"
						stroke={colors.textMuted}
						fontSize={12}
						fontFamily="JetBrains Mono, monospace"
					/>
					<YAxis
						stroke={colors.textMuted}
						fontSize={12}
						fontFamily="JetBrains Mono, monospace"
					/>
					<Tooltip content={<CustomTooltip />} />
					<Legend
						wrapperStyle={{
							color: colors.text,
							fontFamily: '"JetBrains Mono", monospace',
							fontSize: "12px",
						}}
					/>
					<Area
						type="monotone"
						dataKey="emails"
						stackId="1"
						stroke={colors.accent}
						fill={`${colors.accent}40`}
						name="Emails Processed"
					/>
					<Area
						type="monotone"
						dataKey="apiCalls"
						stackId="1"
						stroke={colors.accentSecondary}
						fill={`${colors.accentSecondary}40`}
						name="API Calls"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

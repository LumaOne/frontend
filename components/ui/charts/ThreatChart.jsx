"use client";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../../contexts/ThemeContext";

const generateThreatData = () => {
	const now = new Date();
	const data = [];

	for (let i = 23; i >= 0; i--) {
		const time = new Date(now.getTime() - i * 60 * 60 * 1000);
		data.push({
			time: time.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			}),
			threats: Math.floor(Math.random() * 50) + 10,
			blocked: Math.floor(Math.random() * 45) + 8,
			quarantined: Math.floor(Math.random() * 15) + 2,
		});
	}

	return data;
};

export default function ThreatChart({ height = 300, className = "" }) {
	const { colors, isDark } = useTheme();
	const data = generateThreatData();

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
						{`Time: ${label}`}
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
							{`${entry.name}: ${entry.value}`}
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
				<LineChart
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
					<XAxis
						dataKey="time"
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
					<Line
						type="monotone"
						dataKey="threats"
						stroke={colors.error}
						strokeWidth={2}
						dot={{ fill: colors.error, strokeWidth: 2, r: 4 }}
						activeDot={{ r: 6, stroke: colors.error, strokeWidth: 2 }}
						name="Threats Detected"
					/>
					<Line
						type="monotone"
						dataKey="blocked"
						stroke={colors.success}
						strokeWidth={2}
						dot={{ fill: colors.success, strokeWidth: 2, r: 4 }}
						activeDot={{ r: 6, stroke: colors.success, strokeWidth: 2 }}
						name="Threats Blocked"
					/>
					<Line
						type="monotone"
						dataKey="quarantined"
						stroke={colors.warning}
						strokeWidth={2}
						dot={{ fill: colors.warning, strokeWidth: 2, r: 4 }}
						activeDot={{ r: 6, stroke: colors.warning, strokeWidth: 2 }}
						name="Quarantined"
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

"use client";

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../../contexts/ThemeContext";

const departmentData = [
	{
		name: "Engineering",
		budget: 4500,
		spent: 3200,
		threats: 89,
		emails: 12847,
	},
	{
		name: "Sales",
		budget: 3200,
		spent: 2800,
		threats: 156,
		emails: 18934,
	},
	{
		name: "Marketing",
		budget: 2800,
		spent: 2100,
		threats: 67,
		emails: 9876,
	},
	{
		name: "HR",
		budget: 1200,
		spent: 890,
		threats: 23,
		emails: 4567,
	},
	{
		name: "Finance",
		budget: 1500,
		spent: 1200,
		threats: 34,
		emails: 6789,
	},
];

export default function DepartmentChart({ height = 300, className = "" }) {
	const { colors, isDark } = useTheme();

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
						{`Department: ${label}`}
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
							{`${entry.name}: ${
								entry.dataKey === "budget" || entry.dataKey === "spent"
									? `$${entry.value.toLocaleString()}`
									: entry.value.toLocaleString()
							}`}
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
				<BarChart
					data={departmentData}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
					<XAxis
						dataKey="name"
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
					<Bar
						dataKey="budget"
						fill={colors.textMuted}
						name="Budget"
						radius={[4, 4, 0, 0]}
					/>
					<Bar
						dataKey="spent"
						fill={colors.warning}
						name="Spent"
						radius={[4, 4, 0, 0]}
					/>
					<Bar
						dataKey="threats"
						fill={colors.error}
						name="Threats Blocked"
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

"use client";

import {
	Card,
	Text,
	Group,
	Badge,
	Select,
	Button,
	SimpleGrid,
	Progress,
} from "@mantine/core";
import {
	FaChartLine,
	FaDownload,
	FaCalendarAlt,
	FaShieldAlt,
	FaExclamationTriangle,
	FaCheckCircle,
	FaClock,
} from "react-icons/fa";
import { useState } from "react";

export default function ReportsPage() {
	const [timeRange, setTimeRange] = useState("7d");
	const [reportType, setReportType] = useState("threats");

	// Mock data for different report types
	const threatData = {
		totalThreats: 1247,
		blocked: 1189,
		quarantined: 58,
		allowed: 0,
		avgResponseTime: "0.003s",
		topThreatTypes: [
			{ type: "Phishing", count: 542, percentage: 43.5 },
			{ type: "Malware", count: 389, percentage: 31.2 },
			{ type: "Spam", count: 231, percentage: 18.5 },
			{ type: "Social Engineering", count: 85, percentage: 6.8 },
		],
	};

	const performanceData = {
		emailsProcessed: 47382,
		avgProcessingTime: "0.0023s",
		uptime: "99.97%",
		accuracy: "99.94%",
		falsePositives: 3,
		falseNegatives: 1,
	};

	return (
		<div>
			{/* Header */}
			<Group position="apart" mb="xl">
				<div>
					<Text
						size="xl"
						weight={700}
						color="#e2e8f0"
						style={{ fontFamily: '"JetBrains Mono", monospace' }}
						mb={4}
					>
						analytics.generate_report()
					</Text>
					<Text
						size="sm"
						color="#64748b"
						style={{ fontFamily: '"JetBrains Mono", monospace' }}
					>
						{`// Advanced threat intelligence and performance analytics`}
					</Text>
				</div>

				<Group spacing="xs">
					<Select
						value={timeRange}
						onChange={setTimeRange}
						data={[
							{ value: "24h", label: "Last 24 Hours" },
							{ value: "7d", label: "Last 7 Days" },
							{ value: "30d", label: "Last 30 Days" },
							{ value: "90d", label: "Last 90 Days" },
						]}
						size="sm"
						styles={{
							input: {
								backgroundColor: "#1a1a1a",
								borderColor: "rgba(34, 197, 94, 0.2)",
								color: "#e2e8f0",
								fontFamily: '"JetBrains Mono", monospace',
							},
						}}
					/>
					<Button
						size="sm"
						style={{
							backgroundColor: "rgba(34, 197, 94, 0.1)",
							color: "#22c55e",
							border: "1px solid rgba(34, 197, 94, 0.2)",
							fontFamily: '"JetBrains Mono", monospace',
						}}
					>
						<FaDownload size={12} style={{ marginRight: "8px" }} />
						{`> export_report()`}
					</Button>
				</Group>
			</Group>

			{/* Report Type Selector */}
			<Card
				p="md"
				mb="xl"
				style={{
					backgroundColor: "#1a1a1a",
					border: "1px solid rgba(34, 197, 94, 0.2)",
					borderRadius: "12px",
				}}
			>
				<Group spacing="md">
					<Text
						size="sm"
						color="#64748b"
						style={{ fontFamily: '"JetBrains Mono", monospace' }}
					>
						{`// SELECT_REPORT_TYPE:`}
					</Text>
					<Group spacing="xs">
						{["threats", "performance", "compliance"].map((type) => (
							<Button
								key={type}
								size="sm"
								variant={reportType === type ? "filled" : "outline"}
								onClick={() => setReportType(type)}
								style={{
									backgroundColor:
										reportType === type
											? "rgba(34, 197, 94, 0.2)"
											: "transparent",
									color: reportType === type ? "#22c55e" : "#94a3b8",
									border: `1px solid ${reportType === type ? "rgba(34, 197, 94, 0.4)" : "rgba(148, 163, 184, 0.2)"}`,
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								{type}()
							</Button>
						))}
					</Group>
				</Group>
			</Card>

			{/* Threat Analytics Report */}
			{reportType === "threats" && (
				<div>
					{/* Summary Cards */}
					<SimpleGrid cols={4} spacing="lg" mb="xl">
						<Card
							p="md"
							style={{
								backgroundColor: "#1a1a1a",
								border: "1px solid rgba(239, 68, 68, 0.2)",
								borderRadius: "12px",
							}}
						>
							<Group position="apart" mb="xs">
								<FaExclamationTriangle size={20} color="#ef4444" />
								<Badge
									size="sm"
									style={{
										backgroundColor: "rgba(239, 68, 68, 0.1)",
										color: "#ef4444",
									}}
								>
									TOTAL
								</Badge>
							</Group>
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb={4}
							>
								{`threats_detected`}
							</Text>
							<Text
								size="xl"
								weight={700}
								color="#ef4444"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								{threatData.totalThreats.toLocaleString()}
							</Text>
							<Text
								size="xs"
								color="#94a3b8"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								+23% from last period
							</Text>
						</Card>

						<Card
							p="md"
							style={{
								backgroundColor: "#1a1a1a",
								border: "1px solid rgba(34, 197, 94, 0.2)",
								borderRadius: "12px",
							}}
						>
							<Group position="apart" mb="xs">
								<FaShieldAlt size={20} color="#22c55e" />
								<Badge
									size="sm"
									style={{
										backgroundColor: "rgba(34, 197, 94, 0.1)",
										color: "#22c55e",
									}}
								>
									BLOCKED
								</Badge>
							</Group>
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb={4}
							>
								{`threats_blocked`}
							</Text>
							<Text
								size="xl"
								weight={700}
								color="#22c55e"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								{threatData.blocked.toLocaleString()}
							</Text>
							<Text
								size="xs"
								color="#94a3b8"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								95.3% block rate
							</Text>
						</Card>

						<Card
							p="md"
							style={{
								backgroundColor: "#1a1a1a",
								border: "1px solid rgba(245, 158, 11, 0.2)",
								borderRadius: "12px",
							}}
						>
							<Group position="apart" mb="xs">
								<FaClock size={20} color="#f59e0b" />
								<Badge
									size="sm"
									style={{
										backgroundColor: "rgba(245, 158, 11, 0.1)",
										color: "#f59e0b",
									}}
								>
									QUARANTINED
								</Badge>
							</Group>
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb={4}
							>
								{`threats_quarantined`}
							</Text>
							<Text
								size="xl"
								weight={700}
								color="#f59e0b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								{threatData.quarantined}
							</Text>
							<Text
								size="xs"
								color="#94a3b8"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								4.7% quarantine rate
							</Text>
						</Card>

						<Card
							p="md"
							style={{
								backgroundColor: "#1a1a1a",
								border: "1px solid rgba(59, 130, 246, 0.2)",
								borderRadius: "12px",
							}}
						>
							<Group position="apart" mb="xs">
								<FaChartLine size={20} color="#3b82f6" />
								<Badge
									size="sm"
									style={{
										backgroundColor: "rgba(59, 130, 246, 0.1)",
										color: "#3b82f6",
									}}
								>
									RESPONSE
								</Badge>
							</Group>
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb={4}
							>
								{`avg_response_time`}
							</Text>
							<Text
								size="xl"
								weight={700}
								color="#3b82f6"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								{threatData.avgResponseTime}
							</Text>
							<Text
								size="xs"
								color="#94a3b8"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								-12% from last period
							</Text>
						</Card>
					</SimpleGrid>

					{/* Threat Type Breakdown */}
					<Card
						p="lg"
						mb="xl"
						style={{
							backgroundColor: "#1a1a1a",
							border: "1px solid rgba(34, 197, 94, 0.2)",
							borderRadius: "12px",
						}}
					>
						<Text
							size="lg"
							weight={600}
							color="#e2e8f0"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb="md"
						>
							threat_types.breakdown()
						</Text>

						<div style={{ display: "grid", gap: "16px" }}>
							{threatData.topThreatTypes.map((threat, index) => (
								<div key={threat.type}>
									<Group position="apart" mb="xs">
										<Text
											size="sm"
											color="#e2e8f0"
											style={{ fontFamily: '"JetBrains Mono", monospace' }}
										>
											{threat.type}
										</Text>
										<Group spacing="xs">
											<Text
												size="sm"
												color="#94a3b8"
												style={{ fontFamily: '"JetBrains Mono", monospace' }}
											>
												{threat.count.toLocaleString()}
											</Text>
											<Text
												size="sm"
												color="#22c55e"
												style={{ fontFamily: '"JetBrains Mono", monospace' }}
											>
												{threat.percentage}%
											</Text>
										</Group>
									</Group>
									<Progress
										value={threat.percentage}
										size="sm"
										color="#22c55e"
										style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
									/>
								</div>
							))}
						</div>
					</Card>
				</div>
			)}

			{/* Performance Report */}
			{reportType === "performance" && (
				<div>
					<SimpleGrid cols={3} spacing="lg" mb="xl">
						<Card
							p="md"
							style={{
								backgroundColor: "#1a1a1a",
								border: "1px solid rgba(34, 197, 94, 0.2)",
								borderRadius: "12px",
							}}
						>
							<Group position="apart" mb="xs">
								<FaCheckCircle size={20} color="#22c55e" />
								<Badge
									size="sm"
									style={{
										backgroundColor: "rgba(34, 197, 94, 0.1)",
										color: "#22c55e",
									}}
								>
									PROCESSED
								</Badge>
							</Group>
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb={4}
							>
								{`emails_processed`}
							</Text>
							<Text
								size="xl"
								weight={700}
								color="#22c55e"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								{performanceData.emailsProcessed.toLocaleString()}
							</Text>
						</Card>

						<Card
							p="md"
							style={{
								backgroundColor: "#1a1a1a",
								border: "1px solid rgba(59, 130, 246, 0.2)",
								borderRadius: "12px",
							}}
						>
							<Group position="apart" mb="xs">
								<FaClock size={20} color="#3b82f6" />
								<Badge
									size="sm"
									style={{
										backgroundColor: "rgba(59, 130, 246, 0.1)",
										color: "#3b82f6",
									}}
								>
									SPEED
								</Badge>
							</Group>
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb={4}
							>
								{`avg_processing_time`}
							</Text>
							<Text
								size="xl"
								weight={700}
								color="#3b82f6"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								{performanceData.avgProcessingTime}
							</Text>
						</Card>

						<Card
							p="md"
							style={{
								backgroundColor: "#1a1a1a",
								border: "1px solid rgba(34, 197, 94, 0.2)",
								borderRadius: "12px",
							}}
						>
							<Group position="apart" mb="xs">
								<FaShieldAlt size={20} color="#22c55e" />
								<Badge
									size="sm"
									style={{
										backgroundColor: "rgba(34, 197, 94, 0.1)",
										color: "#22c55e",
									}}
								>
									UPTIME
								</Badge>
							</Group>
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb={4}
							>
								{`system_uptime`}
							</Text>
							<Text
								size="xl"
								weight={700}
								color="#22c55e"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								{performanceData.uptime}
							</Text>
						</Card>
					</SimpleGrid>

					{/* Accuracy Metrics */}
					<Card
						p="lg"
						style={{
							backgroundColor: "#1a1a1a",
							border: "1px solid rgba(34, 197, 94, 0.2)",
							borderRadius: "12px",
						}}
					>
						<Text
							size="lg"
							weight={600}
							color="#e2e8f0"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb="md"
						>
							accuracy_metrics()
						</Text>

						<SimpleGrid cols={3} spacing="lg">
							<div>
								<Text
									size="sm"
									color="#64748b"
									style={{ fontFamily: '"JetBrains Mono", monospace' }}
									mb="xs"
								>
									Overall Accuracy
								</Text>
								<Text
									size="xl"
									weight={700}
									color="#22c55e"
									style={{ fontFamily: '"JetBrains Mono", monospace' }}
								>
									{performanceData.accuracy}
								</Text>
								<Progress
									value={99.94}
									size="sm"
									color="#22c55e"
									style={{
										backgroundColor: "rgba(34, 197, 94, 0.1)",
										marginTop: "8px",
									}}
								/>
							</div>

							<div>
								<Text
									size="sm"
									color="#64748b"
									style={{ fontFamily: '"JetBrains Mono", monospace' }}
									mb="xs"
								>
									False Positives
								</Text>
								<Text
									size="xl"
									weight={700}
									color="#f59e0b"
									style={{ fontFamily: '"JetBrains Mono", monospace' }}
								>
									{performanceData.falsePositives}
								</Text>
								<Text
									size="xs"
									color="#94a3b8"
									style={{
										fontFamily: '"JetBrains Mono", monospace',
										marginTop: "8px",
									}}
								>
									0.006% rate
								</Text>
							</div>

							<div>
								<Text
									size="sm"
									color="#64748b"
									style={{ fontFamily: '"JetBrains Mono", monospace' }}
									mb="xs"
								>
									False Negatives
								</Text>
								<Text
									size="xl"
									weight={700}
									color="#ef4444"
									style={{ fontFamily: '"JetBrains Mono", monospace' }}
								>
									{performanceData.falseNegatives}
								</Text>
								<Text
									size="xs"
									color="#94a3b8"
									style={{
										fontFamily: '"JetBrains Mono", monospace',
										marginTop: "8px",
									}}
								>
									0.002% rate
								</Text>
							</div>
						</SimpleGrid>
					</Card>
				</div>
			)}

			{/* Compliance Report */}
			{reportType === "compliance" && (
				<div>
					<Card
						p="lg"
						style={{
							backgroundColor: "#1a1a1a",
							border: "1px solid rgba(34, 197, 94, 0.2)",
							borderRadius: "12px",
						}}
					>
						<Text
							size="lg"
							weight={600}
							color="#e2e8f0"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb="md"
						>
							compliance.audit()
						</Text>

						<div style={{ display: "grid", gap: "16px" }}>
							{[
								{
									standard: "GDPR Compliance",
									status: "COMPLIANT",
									score: 100,
								},
								{ standard: "SOC 2 Type II", status: "COMPLIANT", score: 98 },
								{ standard: "ISO 27001", status: "COMPLIANT", score: 96 },
								{ standard: "HIPAA", status: "COMPLIANT", score: 99 },
							].map((item) => (
								<div key={item.standard}>
									<Group position="apart" mb="xs">
										<Text
											size="sm"
											color="#e2e8f0"
											style={{ fontFamily: '"JetBrains Mono", monospace' }}
										>
											{item.standard}
										</Text>
										<Group spacing="xs">
											<Badge
												size="sm"
												style={{
													backgroundColor: "rgba(34, 197, 94, 0.1)",
													color: "#22c55e",
												}}
											>
												{item.status}
											</Badge>
											<Text
												size="sm"
												color="#22c55e"
												style={{ fontFamily: '"JetBrains Mono", monospace' }}
											>
												{item.score}%
											</Text>
										</Group>
									</Group>
									<Progress
										value={item.score}
										size="sm"
										color="#22c55e"
										style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
									/>
								</div>
							))}
						</div>
					</Card>
				</div>
			)}
		</div>
	);
}

"use client";

import {
	Card,
	Text,
	Group,
	Badge,
	Button,
	SimpleGrid,
	Switch,
	TextInput,
	Select,
	Divider,
	Slider,
} from "@mantine/core";
import {
	FaBuilding,
	FaShieldAlt,
	FaGlobe,
	FaEnvelope,
	FaUsers,
	FaCog,
	FaExclamationTriangle,
	FaCheckCircle,
	FaLock,
} from "react-icons/fa";
import { useState } from "react";

export default function OrganizationPage() {
	const [orgSettings, setOrgSettings] = useState({
		enforceSSO: true,
		requireMFA: true,
		autoBlockThreats: true,
		quarantineUnknown: false,
		allowPersonalEmail: false,
		threatThreshold: 85,
		retentionDays: 90,
		auditLogging: true,
	});

	// Organization data
	const organizationData = {
		name: "Acme Corporation",
		domain: "acme.com",
		industry: "Technology",
		size: "250-500 employees",
		plan: "Enterprise",
		compliance: ["SOC 2", "GDPR", "HIPAA"],
		adminEmail: "admin@acme.com",
	};

	// Security policies
	const securityPolicies = [
		{
			name: "Single Sign-On (SSO)",
			description: "Require SSO authentication for all users",
			enabled: orgSettings.enforceSSO,
			critical: true,
			key: "enforceSSO",
		},
		{
			name: "Multi-Factor Authentication",
			description: "Require MFA for admin and manager roles",
			enabled: orgSettings.requireMFA,
			critical: true,
			key: "requireMFA",
		},
		{
			name: "Auto-Block High Threats",
			description: "Automatically block emails with high threat scores",
			enabled: orgSettings.autoBlockThreats,
			critical: false,
			key: "autoBlockThreats",
		},
		{
			name: "Quarantine Unrecognized Senders",
			description: "Quarantine emails from unrecognized senders",
			enabled: orgSettings.quarantineUnknown,
			critical: false,
			key: "quarantineUnknown",
		},
		{
			name: "Allow Personal Email",
			description: "Allow users to connect personal email accounts",
			enabled: orgSettings.allowPersonalEmail,
			critical: false,
			key: "allowPersonalEmail",
		},
		{
			name: "Comprehensive Audit Logging",
			description: "Log all user actions and system events",
			enabled: orgSettings.auditLogging,
			critical: true,
			key: "auditLogging",
		},
	];

	const handleSettingChange = (key, value) => {
		setOrgSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const complianceStatus = {
		"SOC 2": { status: "compliant", score: 98 },
		GDPR: { status: "compliant", score: 95 },
		HIPAA: { status: "compliant", score: 92 },
		"ISO 27001": { status: "in-progress", score: 87 },
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
						organization.configure()
					</Text>
					<Text
						size="sm"
						color="#64748b"
						style={{ fontFamily: '"JetBrains Mono", monospace' }}
					>
						{`// Configure enterprise policies and security settings`}
					</Text>
				</div>

				<Button
					size="sm"
					style={{
						backgroundColor: "rgba(34, 197, 94, 0.1)",
						color: "#22c55e",
						border: "1px solid rgba(34, 197, 94, 0.2)",
						fontFamily: '"JetBrains Mono", monospace',
					}}
				>
					<FaCog size={12} style={{ marginRight: "8px" }} />
					{`> save_config()`}
				</Button>
			</Group>

			{/* Organization Info */}
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
					organization_info()
				</Text>

				<SimpleGrid cols={2} spacing="lg">
					<div>
						<TextInput
							label="Organization Name"
							value={organizationData.name}
							styles={{
								label: {
									color: "#e2e8f0",
									fontFamily: '"JetBrains Mono", monospace',
									fontSize: "12px",
								},
								input: {
									backgroundColor: "#0a0a0a",
									borderColor: "rgba(34, 197, 94, 0.2)",
									color: "#e2e8f0",
									fontFamily: '"JetBrains Mono", monospace',
								},
							}}
						/>
					</div>

					<div>
						<TextInput
							label="Primary Domain"
							value={organizationData.domain}
							styles={{
								label: {
									color: "#e2e8f0",
									fontFamily: '"JetBrains Mono", monospace',
									fontSize: "12px",
								},
								input: {
									backgroundColor: "#0a0a0a",
									borderColor: "rgba(34, 197, 94, 0.2)",
									color: "#e2e8f0",
									fontFamily: '"JetBrains Mono", monospace',
								},
							}}
						/>
					</div>

					<div>
						<Select
							label="Industry"
							value={organizationData.industry}
							data={[
								"Technology",
								"Healthcare",
								"Finance",
								"Education",
								"Manufacturing",
								"Retail",
								"Government",
								"Other",
							]}
							styles={{
								label: {
									color: "#e2e8f0",
									fontFamily: '"JetBrains Mono", monospace',
									fontSize: "12px",
								},
								input: {
									backgroundColor: "#0a0a0a",
									borderColor: "rgba(34, 197, 94, 0.2)",
									color: "#e2e8f0",
									fontFamily: '"JetBrains Mono", monospace',
								},
							}}
						/>
					</div>

					<div>
						<Select
							label="Organization Size"
							value={organizationData.size}
							data={[
								"1-10 employees",
								"11-50 employees",
								"51-250 employees",
								"250-500 employees",
								"500-1000 employees",
								"1000+ employees",
							]}
							styles={{
								label: {
									color: "#e2e8f0",
									fontFamily: '"JetBrains Mono", monospace',
									fontSize: "12px",
								},
								input: {
									backgroundColor: "#0a0a0a",
									borderColor: "rgba(34, 197, 94, 0.2)",
									color: "#e2e8f0",
									fontFamily: '"JetBrains Mono", monospace',
								},
							}}
						/>
					</div>
				</SimpleGrid>
			</Card>

			{/* Security Policies */}
			<Card
				p="lg"
				mb="xl"
				style={{
					backgroundColor: "#1a1a1a",
					border: "1px solid rgba(239, 68, 68, 0.2)",
					borderRadius: "12px",
				}}
			>
				<Group mb="md">
					<FaShieldAlt size={20} color="#ef4444" />
					<Text
						size="lg"
						weight={600}
						color="#e2e8f0"
						style={{ fontFamily: '"JetBrains Mono", monospace' }}
					>
						security_policies()
					</Text>
				</Group>

				<div style={{ display: "grid", gap: "16px" }}>
					{securityPolicies.map((policy) => (
						<div
							key={policy.key}
							style={{
								padding: "16px",
								backgroundColor: "#0a0a0a",
								border: `1px solid ${policy.critical ? "rgba(239, 68, 68, 0.2)" : "rgba(148, 163, 184, 0.1)"}`,
								borderRadius: "8px",
							}}
						>
							<Group position="apart">
								<div style={{ flex: 1 }}>
									<Group spacing="xs" mb="xs">
										<Text
											size="sm"
											weight={600}
											color="#e2e8f0"
											style={{ fontFamily: '"JetBrains Mono", monospace' }}
										>
											{policy.name}
										</Text>
										{policy.critical && (
											<Badge
												size="xs"
												style={{
													backgroundColor: "rgba(239, 68, 68, 0.1)",
													color: "#ef4444",
												}}
											>
												CRITICAL
											</Badge>
										)}
									</Group>
									<Text
										size="xs"
										color="#94a3b8"
										style={{ fontFamily: '"JetBrains Mono", monospace' }}
									>
										{policy.description}
									</Text>
								</div>

								<Switch
									checked={policy.enabled}
									onChange={(event) =>
										handleSettingChange(policy.key, event.currentTarget.checked)
									}
									color={policy.critical ? "#ef4444" : "#22c55e"}
								/>
							</Group>
						</div>
					))}
				</div>
			</Card>

			{/* Threat Detection Settings */}
			<Card
				p="lg"
				mb="xl"
				style={{
					backgroundColor: "#1a1a1a",
					border: "1px solid rgba(245, 158, 11, 0.2)",
					borderRadius: "12px",
				}}
			>
				<Group mb="md">
					<FaExclamationTriangle size={20} color="#f59e0b" />
					<Text
						size="lg"
						weight={600}
						color="#e2e8f0"
						style={{ fontFamily: '"JetBrains Mono", monospace' }}
					>
						threat_detection.config()
					</Text>
				</Group>

				<SimpleGrid cols={2} spacing="lg">
					<div>
						<Text
							size="sm"
							color="#e2e8f0"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb="xs"
						>
							Threat Score Threshold: {orgSettings.threatThreshold}%
						</Text>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb="md"
						>
							Emails above this score will be automatically blocked
						</Text>
						<Slider
							value={orgSettings.threatThreshold}
							onChange={(value) =>
								handleSettingChange("threatThreshold", value)
							}
							min={50}
							max={99}
							step={5}
							marks={[
								{ value: 50, label: "50%" },
								{ value: 75, label: "75%" },
								{ value: 90, label: "90%" },
								{ value: 99, label: "99%" },
							]}
							color="#f59e0b"
							styles={{
								track: { backgroundColor: "rgba(245, 158, 11, 0.1)" },
								mark: { color: "#64748b" },
								markLabel: {
									fontFamily: '"JetBrains Mono", monospace',
									fontSize: "10px",
								},
							}}
						/>
					</div>

					<div>
						<Text
							size="sm"
							color="#e2e8f0"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb="xs"
						>
							Data Retention: {orgSettings.retentionDays} days
						</Text>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb="md"
						>
							How long to keep email logs and threat data
						</Text>
						<Slider
							value={orgSettings.retentionDays}
							onChange={(value) => handleSettingChange("retentionDays", value)}
							min={30}
							max={365}
							step={30}
							marks={[
								{ value: 30, label: "30d" },
								{ value: 90, label: "90d" },
								{ value: 180, label: "180d" },
								{ value: 365, label: "1y" },
							]}
							color="#3b82f6"
							styles={{
								track: { backgroundColor: "rgba(59, 130, 246, 0.1)" },
								mark: { color: "#64748b" },
								markLabel: {
									fontFamily: '"JetBrains Mono", monospace',
									fontSize: "10px",
								},
							}}
						/>
					</div>
				</SimpleGrid>
			</Card>

			{/* Compliance Status */}
			<Card
				p="lg"
				style={{
					backgroundColor: "#1a1a1a",
					border: "1px solid rgba(34, 197, 94, 0.2)",
					borderRadius: "12px",
				}}
			>
				<Group mb="md">
					<FaCheckCircle size={20} color="#22c55e" />
					<Text
						size="lg"
						weight={600}
						color="#e2e8f0"
						style={{ fontFamily: '"JetBrains Mono", monospace' }}
					>
						compliance_status()
					</Text>
				</Group>

				<SimpleGrid cols={2} spacing="lg">
					{Object.entries(complianceStatus).map(([standard, data]) => (
						<div
							key={standard}
							style={{
								padding: "16px",
								backgroundColor: "#0a0a0a",
								border: `1px solid ${data.status === "compliant" ? "rgba(34, 197, 94, 0.2)" : "rgba(245, 158, 11, 0.2)"}`,
								borderRadius: "8px",
							}}
						>
							<Group position="apart" mb="xs">
								<Text
									size="sm"
									weight={600}
									color="#e2e8f0"
									style={{ fontFamily: '"JetBrains Mono", monospace' }}
								>
									{standard}
								</Text>
								<Badge
									size="sm"
									style={{
										backgroundColor:
											data.status === "compliant"
												? "rgba(34, 197, 94, 0.1)"
												: "rgba(245, 158, 11, 0.1)",
										color: data.status === "compliant" ? "#22c55e" : "#f59e0b",
									}}
								>
									{data.status.toUpperCase()}
								</Badge>
							</Group>

							<div style={{ marginBottom: "8px" }}>
								<Text
									size="xs"
									color="#64748b"
									style={{ fontFamily: '"JetBrains Mono", monospace' }}
								>
									Compliance Score: {data.score}%
								</Text>
							</div>

							<div
								style={{
									width: "100%",
									height: "4px",
									backgroundColor: "rgba(148, 163, 184, 0.1)",
									borderRadius: "2px",
									overflow: "hidden",
								}}
							>
								<div
									style={{
										width: `${data.score}%`,
										height: "100%",
										backgroundColor:
											data.status === "compliant" ? "#22c55e" : "#f59e0b",
										transition: "width 0.3s ease",
									}}
								/>
							</div>
						</div>
					))}
				</SimpleGrid>
			</Card>
		</div>
	);
}

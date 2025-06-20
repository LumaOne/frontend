"use client";

import {
	Card,
	Text,
	Group,
	Badge,
	Button,
	SimpleGrid,
	Progress,
	Divider,
	Table,
	ActionIcon,
	Modal,
	TextInput,
	Select,
} from "@mantine/core";
import {
	FaCreditCard,
	FaDownload,
	FaClock,
	FaCheckCircle,
	FaExclamationTriangle,
	FaChartLine,
	FaCalendarAlt,
	FaArrowUp,
	FaUsers,
	FaBuilding,
	FaCog,
	FaEye,
	FaPlus,
} from "react-icons/fa";
import { useState } from "react";

export default function BillingPage() {
	const [currentPlan] = useState("enterprise");
	const [accountType] = useState("corporate"); // 'individual' or 'corporate'
	const [addBudgetModal, setAddBudgetModal] = useState(false);

	const subscriptionData = {
		plan: "Enterprise",
		status: "active",
		nextBilling: "2024-02-15",
		amount: 2450.0,
		currency: "USD",
		billingCycle: "monthly",
		daysLeft: 12,
		seats: 247,
		pricePerSeat: 9.92,
	};

	const usageData = {
		emailsProcessed: 1847263,
		emailsLimit: "unlimited",
		apiCalls: 425734,
		apiLimit: "unlimited",
		storage: 47.8,
		storageLimit: 500,
		seats: 247,
		seatsLimit: 500,
	};

	// Department budgets for enterprise accounts
	const departmentBudgets = [
		{
			id: 1,
			name: "Engineering",
			budget: 800,
			spent: 642,
			users: 45,
			emailsProcessed: 387542,
			apiCalls: 125834,
			lastMonth: 598,
		},
		{
			id: 2,
			name: "Sales",
			budget: 600,
			spent: 567,
			users: 32,
			emailsProcessed: 542187,
			apiCalls: 89432,
			lastMonth: 523,
		},
		{
			id: 3,
			name: "Marketing",
			budget: 450,
			spent: 389,
			users: 28,
			emailsProcessed: 298376,
			apiCalls: 67543,
			lastMonth: 412,
		},
		{
			id: 4,
			name: "HR",
			budget: 200,
			spent: 156,
			users: 12,
			emailsProcessed: 87432,
			apiCalls: 23187,
			lastMonth: 143,
		},
		{
			id: 5,
			name: "Finance",
			budget: 300,
			spent: 234,
			users: 15,
			emailsProcessed: 134587,
			apiCalls: 34298,
			lastMonth: 201,
		},
	];

	const invoiceHistory = [
		{
			id: "INV-2024-001",
			date: "2024-01-15",
			amount: 2450.0,
			status: "paid",
			description: "Enterprise Plan - 247 users",
			departments: ["Engineering", "Sales", "Marketing", "HR", "Finance"],
		},
		{
			id: "INV-2023-012",
			date: "2023-12-15",
			amount: 2398.0,
			status: "paid",
			description: "Enterprise Plan - 242 users",
			departments: ["Engineering", "Sales", "Marketing", "HR", "Finance"],
		},
		{
			id: "INV-2023-011",
			date: "2023-11-15",
			amount: 2287.0,
			status: "paid",
			description: "Enterprise Plan - 231 users",
			departments: ["Engineering", "Sales", "Marketing", "HR"],
		},
	];

	const plans = [
		{
			name: "Starter",
			price: 9,
			type: "individual",
			features: [
				"10K emails/month",
				"5K API calls/month",
				"1GB storage",
				"Basic support",
			],
			popular: false,
		},
		{
			name: "Pro",
			price: 29,
			type: "individual",
			features: [
				"100K emails/month",
				"50K API calls/month",
				"10GB storage",
				"Priority support",
				"Advanced analytics",
				"Custom integrations",
			],
			popular: false,
		},
		{
			name: "Team",
			price: 79,
			type: "team",
			features: [
				"500K emails/month",
				"250K API calls/month",
				"50GB storage",
				"Up to 10 users",
				"Team management",
				"Role-based access",
				"Priority support",
			],
			popular: false,
		},
		{
			name: "Enterprise",
			price: "Custom",
			type: "enterprise",
			features: [
				"Unlimited emails",
				"Unlimited API calls",
				"500GB+ storage",
				"Unlimited users",
				"Department management",
				"Advanced security policies",
				"Custom ML models",
				"24/7 dedicated support",
				"SLA guarantee",
				"On-premise deployment",
			],
			popular: true,
		},
	];

	const getStatusColor = (status) => {
		switch (status) {
			case "active":
				return "#22c55e";
			case "paid":
				return "#22c55e";
			case "pending":
				return "#f59e0b";
			case "overdue":
				return "#ef4444";
			default:
				return "#64748b";
		}
	};

	const getUsagePercentage = (used, limit) => {
		if (limit === "unlimited") return 0;
		return Math.min((used / limit) * 100, 100);
	};

	const getBudgetStatus = (spent, budget) => {
		const percentage = (spent / budget) * 100;
		if (percentage >= 90) return "danger";
		if (percentage >= 75) return "warning";
		return "good";
	};

	const getBudgetColor = (status) => {
		switch (status) {
			case "danger":
				return "#ef4444";
			case "warning":
				return "#f59e0b";
			case "good":
				return "#22c55e";
			default:
				return "#64748b";
		}
	};

	const getTotalBudget = () => {
		return departmentBudgets.reduce(
			(acc, dept) => ({
				budget: acc.budget + dept.budget,
				spent: acc.spent + dept.spent,
			}),
			{ budget: 0, spent: 0 },
		);
	};

	const totals = getTotalBudget();

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
						{accountType === "corporate"
							? "enterprise_billing()"
							: "billing.manage()"}
					</Text>
					<Text
						size="sm"
						color="#64748b"
						style={{ fontFamily: '"JetBrains Mono", monospace' }}
					>
						{accountType === "corporate"
							? `// Manage enterprise subscription and department budgets`
							: `// Manage your subscription and billing information`}
					</Text>
				</div>

				<Group spacing="xs">
					<Button
						size="sm"
						style={{
							backgroundColor: "rgba(59, 130, 246, 0.1)",
							color: "#3b82f6",
							border: "1px solid rgba(59, 130, 246, 0.2)",
							fontFamily: '"JetBrains Mono", monospace',
						}}
					>
						<FaCreditCard size={12} style={{ marginRight: "8px" }} />
						{`> update_payment()`}
					</Button>
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
						{`> download_invoices()`}
					</Button>
				</Group>
			</Group>

			{/* Current Subscription */}
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
					current_subscription()
				</Text>

				<SimpleGrid cols={accountType === "corporate" ? 5 : 4} spacing="lg">
					<div>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb={4}
						>
							PLAN
						</Text>
						<Group spacing="xs">
							<Text
								size="xl"
								weight={700}
								color="#22c55e"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								{subscriptionData.plan}
							</Text>
							<Badge
								size="sm"
								style={{
									backgroundColor: `rgba(${getStatusColor(
										subscriptionData.status,
									)
										.replace("#", "")
										.match(/.{2}/g)
										.map((x) => parseInt(x, 16))
										.join(", ")}, 0.1)`,
									color: getStatusColor(subscriptionData.status),
								}}
							>
								{subscriptionData.status.toUpperCase()}
							</Badge>
						</Group>
					</div>

					<div>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb={4}
						>
							MONTHLY_COST
						</Text>
						<Text
							size="xl"
							weight={700}
							color="#e2e8f0"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
						>
							${subscriptionData.amount.toLocaleString()}
						</Text>
					</div>

					{accountType === "corporate" && (
						<div>
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb={4}
							>
								ACTIVE_SEATS
							</Text>
							<Text
								size="xl"
								weight={700}
								color="#3b82f6"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								{subscriptionData.seats}
							</Text>
						</div>
					)}

					<div>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb={4}
						>
							NEXT_BILLING
						</Text>
						<Text
							size="sm"
							color="#f59e0b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
						>
							{subscriptionData.nextBilling}
						</Text>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
						>
							({subscriptionData.daysLeft} days)
						</Text>
					</div>

					<div>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb={4}
						>
							{accountType === "corporate" ? "COST_PER_SEAT" : "BILLING_CYCLE"}
						</Text>
						<Text
							size="sm"
							color="#94a3b8"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
						>
							{accountType === "corporate"
								? `$${subscriptionData.pricePerSeat}/user`
								: subscriptionData.billingCycle}
						</Text>
					</div>
				</SimpleGrid>
			</Card>

			{/* Enterprise Department Budgets */}
			{accountType === "corporate" && (
				<Card
					p="lg"
					mb="xl"
					style={{
						backgroundColor: "#1a1a1a",
						border: "1px solid rgba(245, 158, 11, 0.2)",
						borderRadius: "12px",
					}}
				>
					<Group position="apart" mb="md">
						<Text
							size="lg"
							weight={600}
							color="#e2e8f0"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
						>
							department_budgets()
						</Text>
						<Button
							size="sm"
							onClick={() => setAddBudgetModal(true)}
							style={{
								backgroundColor: "rgba(245, 158, 11, 0.1)",
								color: "#f59e0b",
								border: "1px solid rgba(245, 158, 11, 0.2)",
								fontFamily: '"JetBrains Mono", monospace',
							}}
						>
							<FaPlus size={12} style={{ marginRight: "8px" }} />
							{`> set_budget()`}
						</Button>
					</Group>

					{/* Budget Overview */}
					<SimpleGrid cols={3} spacing="lg" mb="lg">
						<div>
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb={4}
							>
								TOTAL_BUDGET
							</Text>
							<Text
								size="xl"
								weight={700}
								color="#e2e8f0"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								${totals.budget.toLocaleString()}
							</Text>
						</div>

						<div>
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb={4}
							>
								TOTAL_SPENT
							</Text>
							<Text
								size="xl"
								weight={700}
								color="#f59e0b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								${totals.spent.toLocaleString()}
							</Text>
						</div>

						<div>
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb={4}
							>
								REMAINING
							</Text>
							<Text
								size="xl"
								weight={700}
								color="#22c55e"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								${(totals.budget - totals.spent).toLocaleString()}
							</Text>
						</div>
					</SimpleGrid>

					{/* Department Budget Table */}
					<div style={{ overflowX: "auto" }}>
						<Table
							styles={{
								root: { backgroundColor: "transparent" },
								header: { backgroundColor: "#0a0a0a" },
								row: {
									backgroundColor: "transparent",
									borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
								},
							}}
						>
							<thead>
								<tr>
									<th
										style={{
											color: "#64748b",
											fontFamily: '"JetBrains Mono", monospace',
											fontSize: "12px",
										}}
									>
										DEPARTMENT
									</th>
									<th
										style={{
											color: "#64748b",
											fontFamily: '"JetBrains Mono", monospace',
											fontSize: "12px",
										}}
									>
										BUDGET
									</th>
									<th
										style={{
											color: "#64748b",
											fontFamily: '"JetBrains Mono", monospace',
											fontSize: "12px",
										}}
									>
										SPENT
									</th>
									<th
										style={{
											color: "#64748b",
											fontFamily: '"JetBrains Mono", monospace',
											fontSize: "12px",
										}}
									>
										USAGE
									</th>
									<th
										style={{
											color: "#64748b",
											fontFamily: '"JetBrains Mono", monospace',
											fontSize: "12px",
										}}
									>
										USERS
									</th>
									<th
										style={{
											color: "#64748b",
											fontFamily: '"JetBrains Mono", monospace',
											fontSize: "12px",
										}}
									>
										EMAILS_PROCESSED
									</th>
									<th
										style={{
											color: "#64748b",
											fontFamily: '"JetBrains Mono", monospace',
											fontSize: "12px",
										}}
									>
										ACTIONS
									</th>
								</tr>
							</thead>
							<tbody>
								{departmentBudgets.map((dept) => {
									const budgetStatus = getBudgetStatus(dept.spent, dept.budget);
									const usagePercentage = (dept.spent / dept.budget) * 100;

									return (
										<tr key={dept.id}>
											<td>
												<Text
													size="sm"
													weight={600}
													color="#e2e8f0"
													style={{ fontFamily: '"JetBrains Mono", monospace' }}
												>
													{dept.name}
												</Text>
											</td>
											<td>
												<Text
													size="sm"
													color="#94a3b8"
													style={{ fontFamily: '"JetBrains Mono", monospace' }}
												>
													${dept.budget}
												</Text>
											</td>
											<td>
												<Text
													size="sm"
													color="#f59e0b"
													style={{ fontFamily: '"JetBrains Mono", monospace' }}
												>
													${dept.spent}
												</Text>
											</td>
											<td>
												<div style={{ width: "100px" }}>
													<Progress
														value={usagePercentage}
														color={getBudgetColor(budgetStatus)}
														size="sm"
														styles={{
															root: {
																backgroundColor: "rgba(148, 163, 184, 0.1)",
															},
														}}
													/>
													<Text
														size="xs"
														color="#64748b"
														style={{
															fontFamily: '"JetBrains Mono", monospace',
														}}
														mt={2}
													>
														{Math.round(usagePercentage)}%
													</Text>
												</div>
											</td>
											<td>
												<Text
													size="sm"
													color="#3b82f6"
													style={{ fontFamily: '"JetBrains Mono", monospace' }}
												>
													{dept.users}
												</Text>
											</td>
											<td>
												<Text
													size="sm"
													color="#22c55e"
													style={{ fontFamily: '"JetBrains Mono", monospace' }}
												>
													{dept.emailsProcessed.toLocaleString()}
												</Text>
											</td>
											<td>
												<Group spacing="xs">
													<ActionIcon
														size="sm"
														style={{
															backgroundColor: "rgba(59, 130, 246, 0.1)",
															color: "#3b82f6",
															border: "1px solid rgba(59, 130, 246, 0.2)",
														}}
													>
														<FaCog size={12} />
													</ActionIcon>
													<ActionIcon
														size="sm"
														style={{
															backgroundColor: "rgba(34, 197, 94, 0.1)",
															color: "#22c55e",
															border: "1px solid rgba(34, 197, 94, 0.2)",
														}}
													>
														<FaEye size={12} />
													</ActionIcon>
												</Group>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
				</Card>
			)}

			{/* Usage Statistics */}
			<Card
				p="lg"
				mb="xl"
				style={{
					backgroundColor: "#1a1a1a",
					border: "1px solid rgba(59, 130, 246, 0.2)",
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
					usage_statistics()
				</Text>

				<SimpleGrid cols={accountType === "corporate" ? 4 : 3} spacing="lg">
					<div>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb={4}
						>
							EMAILS_PROCESSED
						</Text>
						<Text
							size="lg"
							weight={600}
							color="#22c55e"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb="xs"
						>
							{usageData.emailsProcessed.toLocaleString()}
						</Text>
						{usageData.emailsLimit !== "unlimited" && (
							<>
								<Progress
									value={getUsagePercentage(
										usageData.emailsProcessed,
										usageData.emailsLimit,
									)}
									color="#22c55e"
									size="sm"
									styles={{
										root: { backgroundColor: "rgba(148, 163, 184, 0.1)" },
									}}
								/>
								<Text
									size="xs"
									color="#64748b"
									style={{ fontFamily: '"JetBrains Mono", monospace' }}
									mt={4}
								>
									of {usageData.emailsLimit.toLocaleString()}
								</Text>
							</>
						)}
						{usageData.emailsLimit === "unlimited" && (
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								unlimited
							</Text>
						)}
					</div>

					<div>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb={4}
						>
							API_CALLS
						</Text>
						<Text
							size="lg"
							weight={600}
							color="#3b82f6"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb="xs"
						>
							{usageData.apiCalls.toLocaleString()}
						</Text>
						{usageData.apiLimit !== "unlimited" && (
							<>
								<Progress
									value={getUsagePercentage(
										usageData.apiCalls,
										usageData.apiLimit,
									)}
									color="#3b82f6"
									size="sm"
									styles={{
										root: { backgroundColor: "rgba(148, 163, 184, 0.1)" },
									}}
								/>
								<Text
									size="xs"
									color="#64748b"
									style={{ fontFamily: '"JetBrains Mono", monospace' }}
									mt={4}
								>
									of {usageData.apiLimit.toLocaleString()}
								</Text>
							</>
						)}
						{usageData.apiLimit === "unlimited" && (
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
							>
								unlimited
							</Text>
						)}
					</div>

					<div>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb={4}
						>
							STORAGE_USED
						</Text>
						<Text
							size="lg"
							weight={600}
							color="#f59e0b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb="xs"
						>
							{usageData.storage}GB
						</Text>
						<Progress
							value={getUsagePercentage(
								usageData.storage,
								usageData.storageLimit,
							)}
							color="#f59e0b"
							size="sm"
							styles={{
								root: { backgroundColor: "rgba(148, 163, 184, 0.1)" },
							}}
						/>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mt={4}
						>
							of {usageData.storageLimit}GB
						</Text>
					</div>

					{accountType === "corporate" && (
						<div>
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb={4}
							>
								ACTIVE_SEATS
							</Text>
							<Text
								size="lg"
								weight={600}
								color="#8b5cf6"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb="xs"
							>
								{usageData.seats}
							</Text>
							<Progress
								value={getUsagePercentage(
									usageData.seats,
									usageData.seatsLimit,
								)}
								color="#8b5cf6"
								size="sm"
								styles={{
									root: { backgroundColor: "rgba(148, 163, 184, 0.1)" },
								}}
							/>
							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mt={4}
							>
								of {usageData.seatsLimit}
							</Text>
						</div>
					)}
				</SimpleGrid>
			</Card>

			{/* Plan Options */}
			<Card
				p="lg"
				mb="xl"
				style={{
					backgroundColor: "#1a1a1a",
					border: "1px solid rgba(148, 163, 184, 0.2)",
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
					available_plans()
				</Text>

				<SimpleGrid cols={4} spacing="lg">
					{plans.map((plan) => (
						<div
							key={plan.name}
							style={{
								padding: "20px",
								backgroundColor: plan.popular
									? "rgba(34, 197, 94, 0.05)"
									: "#0a0a0a",
								border: plan.popular
									? "1px solid rgba(34, 197, 94, 0.2)"
									: "1px solid rgba(148, 163, 184, 0.1)",
								borderRadius: "8px",
								position: "relative",
							}}
						>
							{plan.popular && (
								<Badge
									size="sm"
									style={{
										position: "absolute",
										top: "-8px",
										right: "16px",
										backgroundColor: "rgba(34, 197, 94, 0.1)",
										color: "#22c55e",
									}}
								>
									CURRENT
								</Badge>
							)}

							<Text
								size="md"
								weight={600}
								color="#e2e8f0"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb="xs"
							>
								{plan.name}
							</Text>

							<Text
								size="xs"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb="md"
							>
								{plan.type.toUpperCase()}
							</Text>

							<Text
								size="xl"
								weight={700}
								color="#22c55e"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb="md"
							>
								{typeof plan.price === "number" ? `$${plan.price}` : plan.price}
								{typeof plan.price === "number" && (
									<Text
										size="xs"
										color="#64748b"
										style={{ fontFamily: '"JetBrains Mono", monospace' }}
										component="span"
									>
										/month
									</Text>
								)}
							</Text>

							<div style={{ marginBottom: "16px" }}>
								{plan.features.map((feature) => (
									<Text
										key={feature}
										size="xs"
										color="#94a3b8"
										style={{
											fontFamily: '"JetBrains Mono", monospace',
											marginBottom: "4px",
										}}
									>
										• {feature}
									</Text>
								))}
							</div>

							<Button
								fullWidth
								size="sm"
								disabled={plan.popular}
								style={{
									backgroundColor: plan.popular
										? "rgba(148, 163, 184, 0.1)"
										: "rgba(34, 197, 94, 0.1)",
									color: plan.popular ? "#64748b" : "#22c55e",
									border: plan.popular
										? "1px solid rgba(148, 163, 184, 0.2)"
										: "1px solid rgba(34, 197, 94, 0.2)",
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								{plan.popular
									? "> current_plan()"
									: `> upgrade_to_${plan.name.toLowerCase()}()`}
							</Button>
						</div>
					))}
				</SimpleGrid>
			</Card>

			{/* Invoice History */}
			<Card
				p="lg"
				style={{
					backgroundColor: "#1a1a1a",
					border: "1px solid rgba(148, 163, 184, 0.2)",
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
					invoice_history()
				</Text>

				<div style={{ overflowX: "auto" }}>
					<Table
						styles={{
							root: { backgroundColor: "transparent" },
							header: { backgroundColor: "#0a0a0a" },
							row: {
								backgroundColor: "transparent",
								borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
							},
						}}
					>
						<thead>
							<tr>
								<th
									style={{
										color: "#64748b",
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: "12px",
									}}
								>
									INVOICE_ID
								</th>
								<th
									style={{
										color: "#64748b",
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: "12px",
									}}
								>
									DATE
								</th>
								<th
									style={{
										color: "#64748b",
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: "12px",
									}}
								>
									AMOUNT
								</th>
								<th
									style={{
										color: "#64748b",
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: "12px",
									}}
								>
									STATUS
								</th>
								<th
									style={{
										color: "#64748b",
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: "12px",
									}}
								>
									DESCRIPTION
								</th>
								<th
									style={{
										color: "#64748b",
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: "12px",
									}}
								>
									ACTIONS
								</th>
							</tr>
						</thead>
						<tbody>
							{invoiceHistory.map((invoice) => (
								<tr key={invoice.id}>
									<td>
										<Text
											size="sm"
											weight={600}
											color="#e2e8f0"
											style={{ fontFamily: '"JetBrains Mono", monospace' }}
										>
											{invoice.id}
										</Text>
									</td>
									<td>
										<Text
											size="sm"
											color="#94a3b8"
											style={{ fontFamily: '"JetBrains Mono", monospace' }}
										>
											{invoice.date}
										</Text>
									</td>
									<td>
										<Text
											size="sm"
											color="#22c55e"
											style={{ fontFamily: '"JetBrains Mono", monospace' }}
										>
											${invoice.amount.toLocaleString()}
										</Text>
									</td>
									<td>
										<Badge
											size="sm"
											style={{
												backgroundColor: `rgba(${getStatusColor(invoice.status)
													.replace("#", "")
													.match(/.{2}/g)
													.map((x) => parseInt(x, 16))
													.join(", ")}, 0.1)`,
												color: getStatusColor(invoice.status),
											}}
										>
											{invoice.status.toUpperCase()}
										</Badge>
									</td>
									<td>
										<Text
											size="sm"
											color="#94a3b8"
											style={{ fontFamily: '"JetBrains Mono", monospace' }}
										>
											{invoice.description}
										</Text>
										{accountType === "corporate" && invoice.departments && (
											<Text
												size="xs"
												color="#64748b"
												style={{ fontFamily: '"JetBrains Mono", monospace' }}
											>
												Depts: {invoice.departments.join(", ")}
											</Text>
										)}
									</td>
									<td>
										<ActionIcon
											size="sm"
											style={{
												backgroundColor: "rgba(34, 197, 94, 0.1)",
												color: "#22c55e",
												border: "1px solid rgba(34, 197, 94, 0.2)",
											}}
										>
											<FaDownload size={12} />
										</ActionIcon>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</Card>

			{/* Add Budget Modal */}
			<Modal
				opened={addBudgetModal}
				onClose={() => setAddBudgetModal(false)}
				title={
					<Text
						size="lg"
						weight={600}
						color="#e2e8f0"
						style={{ fontFamily: '"JetBrains Mono", monospace' }}
					>
						set_department_budget()
					</Text>
				}
				styles={{
					modal: {
						backgroundColor: "#1a1a1a",
						border: "1px solid rgba(245, 158, 11, 0.2)",
					},
					header: {
						backgroundColor: "#1a1a1a",
						borderBottom: "1px solid rgba(245, 158, 11, 0.2)",
					},
				}}
			>
				<div style={{ display: "grid", gap: "16px" }}>
					<Select
						label="Department"
						placeholder="Select department"
						data={departmentBudgets.map((dept) => ({
							value: dept.name.toLowerCase(),
							label: dept.name,
						}))}
						styles={{
							label: {
								color: "#e2e8f0",
								fontFamily: '"JetBrains Mono", monospace',
								fontSize: "12px",
							},
							input: {
								backgroundColor: "#0a0a0a",
								borderColor: "rgba(245, 158, 11, 0.2)",
								color: "#e2e8f0",
								fontFamily: '"JetBrains Mono", monospace',
							},
						}}
					/>

					<TextInput
						label="Monthly Budget ($)"
						placeholder="500"
						styles={{
							label: {
								color: "#e2e8f0",
								fontFamily: '"JetBrains Mono", monospace',
								fontSize: "12px",
							},
							input: {
								backgroundColor: "#0a0a0a",
								borderColor: "rgba(245, 158, 11, 0.2)",
								color: "#e2e8f0",
								fontFamily: '"JetBrains Mono", monospace',
							},
						}}
					/>

					<Group position="right" mt="md">
						<Button
							onClick={() => setAddBudgetModal(false)}
							style={{
								backgroundColor: "rgba(148, 163, 184, 0.1)",
								color: "#94a3b8",
								border: "1px solid rgba(148, 163, 184, 0.2)",
								fontFamily: '"JetBrains Mono", monospace',
							}}
						>
							{`> cancel()`}
						</Button>
						<Button
							style={{
								backgroundColor: "rgba(245, 158, 11, 0.1)",
								color: "#f59e0b",
								border: "1px solid rgba(245, 158, 11, 0.2)",
								fontFamily: '"JetBrains Mono", monospace',
							}}
						>
							{`> set_budget()`}
						</Button>
					</Group>
				</div>
			</Modal>
		</div>
	);
}

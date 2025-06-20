"use client";

import {
	Card,
	Text,
	Group,
	Badge,
	Button,
	SimpleGrid,
	Table,
	ActionIcon,
	Modal,
	TextInput,
	Select,
	Switch,
	Avatar,
} from "@mantine/core";
import {
	FaUsers,
	FaUserPlus,
	FaUserShield,
	FaCrown,
	FaEdit,
	FaTrash,
	FaEye,
	FaBuilding,
	FaEnvelope,
	FaCalendarAlt,
} from "react-icons/fa";
import { useState } from "react";

export default function TeamPage() {
	const [addUserModal, setAddUserModal] = useState(false);
	const [editUserModal, setEditUserModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	// Mock organization data
	const organizationData = {
		name: "Acme Corporation",
		domain: "acme.com",
		totalUsers: 247,
		activeUsers: 243,
		pendingInvites: 4,
		departments: [
			"Engineering",
			"Sales",
			"Marketing",
			"HR",
			"Finance",
			"Operations",
		],
	};

	// Mock team data with different roles
	const teamMembers = [
		{
			id: 1,
			name: "John Smith",
			email: "john.smith@acme.com",
			role: "owner",
			department: "Engineering",
			status: "active",
			lastActive: "2024-01-15 14:32",
			emailsProtected: 1247,
			threatsBlocked: 23,
			joinedDate: "2023-01-15",
		},
		{
			id: 2,
			name: "Sarah Johnson",
			email: "sarah.johnson@acme.com",
			role: "admin",
			department: "IT Security",
			status: "active",
			lastActive: "2024-01-15 13:45",
			emailsProtected: 892,
			threatsBlocked: 17,
			joinedDate: "2023-03-22",
		},
		{
			id: 3,
			name: "Mike Chen",
			email: "mike.chen@acme.com",
			role: "manager",
			department: "Engineering",
			status: "active",
			lastActive: "2024-01-15 12:18",
			emailsProtected: 634,
			threatsBlocked: 12,
			joinedDate: "2023-06-10",
		},
		{
			id: 4,
			name: "Lisa Wang",
			email: "lisa.wang@acme.com",
			role: "user",
			department: "Marketing",
			status: "active",
			lastActive: "2024-01-15 11:22",
			emailsProtected: 423,
			threatsBlocked: 8,
			joinedDate: "2023-09-05",
		},
		{
			id: 5,
			name: "David Brown",
			email: "david.brown@acme.com",
			role: "user",
			department: "Sales",
			status: "pending",
			lastActive: "Never",
			emailsProtected: 0,
			threatsBlocked: 0,
			joinedDate: "2024-01-14",
		},
	];

	const getRoleColor = (role) => {
		switch (role) {
			case "owner":
				return "#ef4444";
			case "admin":
				return "#f59e0b";
			case "manager":
				return "#3b82f6";
			case "user":
				return "#22c55e";
			default:
				return "#64748b";
		}
	};

	const getRoleIcon = (role) => {
		switch (role) {
			case "owner":
				return FaCrown;
			case "admin":
				return FaUserShield;
			case "manager":
				return FaUsers;
			case "user":
				return FaUsers;
			default:
				return FaUsers;
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "active":
				return "#22c55e";
			case "pending":
				return "#f59e0b";
			case "inactive":
				return "#64748b";
			default:
				return "#64748b";
		}
	};

	const handleEditUser = (user) => {
		setSelectedUser(user);
		setEditUserModal(true);
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
						team_management()
					</Text>
					<Text
						size="sm"
						color="#64748b"
						style={{ fontFamily: '"JetBrains Mono", monospace' }}
					>
						{`// Manage your organization's users, roles, and permissions`}
					</Text>
				</div>

				<Button
					size="sm"
					onClick={() => setAddUserModal(true)}
					style={{
						backgroundColor: "rgba(34, 197, 94, 0.1)",
						color: "#22c55e",
						border: "1px solid rgba(34, 197, 94, 0.2)",
						fontFamily: '"JetBrains Mono", monospace',
					}}
				>
					<FaUserPlus size={12} style={{ marginRight: "8px" }} />
					{`> invite_user()`}
				</Button>
			</Group>

			{/* Organization Overview */}
			<Card
				p="lg"
				mb="xl"
				style={{
					backgroundColor: "#1a1a1a",
					border: "1px solid rgba(34, 197, 94, 0.2)",
					borderRadius: "12px",
				}}
			>
				<Group position="apart" mb="md">
					<Group>
						<FaBuilding size={20} color="#22c55e" />
						<Text
							size="lg"
							weight={600}
							color="#e2e8f0"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
						>
							{organizationData.name}
						</Text>
						<Badge
							size="sm"
							style={{
								backgroundColor: "rgba(34, 197, 94, 0.1)",
								color: "#22c55e",
							}}
						>
							@{organizationData.domain}
						</Badge>
					</Group>
				</Group>

				<SimpleGrid cols={4} spacing="lg">
					<div>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb={4}
						>
							TOTAL_USERS
						</Text>
						<Text
							size="xl"
							weight={700}
							color="#e2e8f0"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
						>
							{organizationData.totalUsers}
						</Text>
					</div>

					<div>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb={4}
						>
							ACTIVE_USERS
						</Text>
						<Text
							size="xl"
							weight={700}
							color="#22c55e"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
						>
							{organizationData.activeUsers}
						</Text>
					</div>

					<div>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb={4}
						>
							PENDING_INVITES
						</Text>
						<Text
							size="xl"
							weight={700}
							color="#f59e0b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
						>
							{organizationData.pendingInvites}
						</Text>
					</div>

					<div>
						<Text
							size="xs"
							color="#64748b"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
							mb={4}
						>
							DEPARTMENTS
						</Text>
						<Text
							size="xl"
							weight={700}
							color="#3b82f6"
							style={{ fontFamily: '"JetBrains Mono", monospace' }}
						>
							{organizationData.departments.length}
						</Text>
					</div>
				</SimpleGrid>
			</Card>

			{/* Team Members Table */}
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
					team_members.list()
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
									USER
								</th>
								<th
									style={{
										color: "#64748b",
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: "12px",
									}}
								>
									ROLE
								</th>
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
									STATUS
								</th>
								<th
									style={{
										color: "#64748b",
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: "12px",
									}}
								>
									EMAILS_PROTECTED
								</th>
								<th
									style={{
										color: "#64748b",
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: "12px",
									}}
								>
									THREATS_BLOCKED
								</th>
								<th
									style={{
										color: "#64748b",
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: "12px",
									}}
								>
									LAST_ACTIVE
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
							{teamMembers.map((member) => {
								const RoleIcon = getRoleIcon(member.role);
								return (
									<tr key={member.id}>
										<td>
											<Group spacing="xs">
												<Avatar
													size="sm"
													radius="xl"
													style={{ backgroundColor: getRoleColor(member.role) }}
												>
													{member.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</Avatar>
												<div>
													<Text
														size="sm"
														weight={600}
														color="#e2e8f0"
														style={{
															fontFamily: '"JetBrains Mono", monospace',
														}}
													>
														{member.name}
													</Text>
													<Text
														size="xs"
														color="#94a3b8"
														style={{
															fontFamily: '"JetBrains Mono", monospace',
														}}
													>
														{member.email}
													</Text>
												</div>
											</Group>
										</td>
										<td>
											<Group spacing="xs">
												<RoleIcon size={12} color={getRoleColor(member.role)} />
												<Badge
													size="sm"
													style={{
														backgroundColor: `rgba(${getRoleColor(member.role)
															.replace("#", "")
															.match(/.{2}/g)
															.map((x) => parseInt(x, 16))
															.join(", ")}, 0.1)`,
														color: getRoleColor(member.role),
													}}
												>
													{member.role.toUpperCase()}
												</Badge>
											</Group>
										</td>
										<td>
											<Text
												size="sm"
												color="#94a3b8"
												style={{ fontFamily: '"JetBrains Mono", monospace' }}
											>
												{member.department}
											</Text>
										</td>
										<td>
											<Badge
												size="sm"
												style={{
													backgroundColor: `rgba(${getStatusColor(member.status)
														.replace("#", "")
														.match(/.{2}/g)
														.map((x) => parseInt(x, 16))
														.join(", ")}, 0.1)`,
													color: getStatusColor(member.status),
												}}
											>
												{member.status.toUpperCase()}
											</Badge>
										</td>
										<td>
											<Text
												size="sm"
												color="#3b82f6"
												style={{ fontFamily: '"JetBrains Mono", monospace' }}
											>
												{member.emailsProtected.toLocaleString()}
											</Text>
										</td>
										<td>
											<Text
												size="sm"
												color="#ef4444"
												style={{ fontFamily: '"JetBrains Mono", monospace' }}
											>
												{member.threatsBlocked}
											</Text>
										</td>
										<td>
											<Text
												size="sm"
												color="#94a3b8"
												style={{ fontFamily: '"JetBrains Mono", monospace' }}
											>
												{member.lastActive}
											</Text>
										</td>
										<td>
											<Group spacing="xs">
												<ActionIcon
													size="sm"
													onClick={() => handleEditUser(member)}
													style={{
														backgroundColor: "rgba(59, 130, 246, 0.1)",
														color: "#3b82f6",
														border: "1px solid rgba(59, 130, 246, 0.2)",
													}}
												>
													<FaEdit size={12} />
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
												{member.role !== "owner" && (
													<ActionIcon
														size="sm"
														style={{
															backgroundColor: "rgba(239, 68, 68, 0.1)",
															color: "#ef4444",
															border: "1px solid rgba(239, 68, 68, 0.2)",
														}}
													>
														<FaTrash size={12} />
													</ActionIcon>
												)}
											</Group>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			</Card>

			{/* Add User Modal */}
			<Modal
				opened={addUserModal}
				onClose={() => setAddUserModal(false)}
				title={
					<Text
						size="lg"
						weight={600}
						color="#e2e8f0"
						style={{ fontFamily: '"JetBrains Mono", monospace' }}
					>
						invite_user()
					</Text>
				}
				styles={{
					modal: {
						backgroundColor: "#1a1a1a",
						border: "1px solid rgba(34, 197, 94, 0.2)",
					},
					header: {
						backgroundColor: "#1a1a1a",
						borderBottom: "1px solid rgba(34, 197, 94, 0.2)",
					},
				}}
			>
				<div style={{ display: "grid", gap: "16px" }}>
					<TextInput
						label="Email Address"
						placeholder="user@acme.com"
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

					<Select
						label="Role"
						placeholder="Select role"
						data={[
							{ value: "user", label: "User - Basic access" },
							{ value: "manager", label: "Manager - Department oversight" },
							{ value: "admin", label: "Admin - Full system access" },
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

					<Select
						label="Department"
						placeholder="Select department"
						data={organizationData.departments.map((dept) => ({
							value: dept.toLowerCase(),
							label: dept,
						}))}
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

					<Group position="right" mt="md">
						<Button
							onClick={() => setAddUserModal(false)}
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
								backgroundColor: "rgba(34, 197, 94, 0.1)",
								color: "#22c55e",
								border: "1px solid rgba(34, 197, 94, 0.2)",
								fontFamily: '"JetBrains Mono", monospace',
							}}
						>
							<FaEnvelope size={12} style={{ marginRight: "8px" }} />
							{`> send_invite()`}
						</Button>
					</Group>
				</div>
			</Modal>

			{/* Edit User Modal */}
			<Modal
				opened={editUserModal}
				onClose={() => setEditUserModal(false)}
				title={
					<Text
						size="lg"
						weight={600}
						color="#e2e8f0"
						style={{ fontFamily: '"JetBrains Mono", monospace' }}
					>
						edit_user({selectedUser?.name})
					</Text>
				}
				styles={{
					modal: {
						backgroundColor: "#1a1a1a",
						border: "1px solid rgba(34, 197, 94, 0.2)",
					},
					header: {
						backgroundColor: "#1a1a1a",
						borderBottom: "1px solid rgba(34, 197, 94, 0.2)",
					},
				}}
			>
				{selectedUser && (
					<div style={{ display: "grid", gap: "16px" }}>
						<Group>
							<Avatar
								size="lg"
								radius="xl"
								style={{ backgroundColor: getRoleColor(selectedUser.role) }}
							>
								{selectedUser.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</Avatar>
							<div>
								<Text
									size="md"
									weight={600}
									color="#e2e8f0"
									style={{ fontFamily: '"JetBrains Mono", monospace' }}
								>
									{selectedUser.name}
								</Text>
								<Text
									size="sm"
									color="#94a3b8"
									style={{ fontFamily: '"JetBrains Mono", monospace' }}
								>
									{selectedUser.email}
								</Text>
							</div>
						</Group>

						<Select
							label="Role"
							value={selectedUser.role}
							data={[
								{ value: "user", label: "User - Basic access" },
								{ value: "manager", label: "Manager - Department oversight" },
								{ value: "admin", label: "Admin - Full system access" },
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

						<Select
							label="Department"
							value={selectedUser.department.toLowerCase()}
							data={organizationData.departments.map((dept) => ({
								value: dept.toLowerCase(),
								label: dept,
							}))}
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

						<div>
							<Text
								size="sm"
								color="#64748b"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}
								mb="xs"
							>
								ACCOUNT_STATUS
							</Text>
							<Group spacing="xs">
								<Switch
									label="Active Account"
									checked={selectedUser.status === "active"}
									color="#22c55e"
									styles={{
										label: {
											color: "#e2e8f0",
											fontFamily: '"JetBrains Mono", monospace',
										},
									}}
								/>
							</Group>
						</div>

						<Group position="right" mt="md">
							<Button
								onClick={() => setEditUserModal(false)}
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
									backgroundColor: "rgba(34, 197, 94, 0.1)",
									color: "#22c55e",
									border: "1px solid rgba(34, 197, 94, 0.2)",
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								{`> save_changes()`}
							</Button>
						</Group>
					</div>
				)}
			</Modal>
		</div>
	);
}

"use client";

import { Container, Group, Text, Badge } from "@mantine/core";
import {
	FaTerminal,
	FaChartLine,
	FaShieldAlt,
	FaKey,
	FaDatabase,
	FaCog,
	FaSignOutAlt,
	FaFileAlt,
	FaPlug,
	FaCreditCard,
	FaBook,
	FaUsers,
	FaBuilding,
	FaSitemap,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useResponsive } from "../../hooks/useResponsive";
import ThemeToggle from "../../components/ui/ThemeToggle";

export default function DashboardLayout({ children }) {
	const pathname = usePathname();
	const { user, signOut } = useAuth();
	const { colors, isDark } = useTheme();
	const { isMobile, isTablet } = useResponsive();

	const navItems = [
		{ icon: FaChartLine, label: "Analytics", href: "/dashboard" },
		{ icon: FaShieldAlt, label: "Threats", href: "/dashboard/threats" },
		{ icon: FaDatabase, label: "Logs", href: "/dashboard/logs" },
		{ icon: FaUsers, label: "Team", href: "/dashboard/team" },
		{
			icon: FaSitemap,
			label: "Departments",
			href: "/dashboard/departments",
		},
		{
			icon: FaBuilding,
			label: "Organization",
			href: "/dashboard/organization",
		},
		{ icon: FaKey, label: "API Keys", href: "/dashboard/api-keys" },
		{ icon: FaFileAlt, label: "Reports", href: "/dashboard/reports" },
		{ icon: FaPlug, label: "Integrations", href: "/dashboard/integrations" },
		{ icon: FaCreditCard, label: "Billing", href: "/dashboard/billing" },
		{ icon: FaBook, label: "Docs", href: "/dashboard/docs" },
		{ icon: FaCog, label: "Settings", href: "/dashboard/settings" },
	];

	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<ProtectedRoute>
			<div
				style={{
					minHeight: "100vh",
					background: colors.background,
					fontFamily: '"JetBrains Mono", monospace',
				}}
			>
				{/* Header */}
				<div
					style={{
						backgroundColor: colors.headerBackground,
						borderBottom: `1px solid ${colors.border}`,
						padding: isMobile ? "12px 16px" : "16px 24px",
					}}
				>
					<Group position="apart">
						<Group spacing={isMobile ? "sm" : "md"}>
							<FaTerminal size={isMobile ? 20 : 24} color={colors.accent} />
							<Text
								size={isMobile ? "lg" : "xl"}
								weight={700}
								style={{
									color: colors.accent,
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								LumaOneAI
							</Text>
						</Group>

						<Group spacing={isMobile ? "xs" : "md"}>
							<ThemeToggle size={isMobile ? "sm" : "md"} />

							{!isMobile && (
								<Badge
									size="sm"
									style={{
										backgroundColor: `${colors.accent}20`,
										color: colors.accent,
										border: `1px solid ${colors.accent}40`,
									}}
								>
									LIVE
								</Badge>
							)}

							{!isMobile && (
								<div
									style={{
										padding: "8px 12px",
										backgroundColor: `${colors.accent}20`,
										border: `1px solid ${colors.accent}40`,
										borderRadius: "6px",
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									<Text size="xs" color={colors.textMuted}>
										API Calls
									</Text>
									<Text size="sm" color={colors.accent} weight={600}>
										47,382
									</Text>
								</div>
							)}

							{!isMobile && (
								<div
									style={{
										padding: "8px 12px",
										backgroundColor: `${colors.accentSecondary}20`,
										border: `1px solid ${colors.accentSecondary}40`,
										borderRadius: "6px",
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									<Text size="xs" color={colors.textMuted}>
										User
									</Text>
									<Text size="sm" color={colors.accentSecondary} weight={600}>
										{user?.email?.split("@")[0] || "user"}
									</Text>
								</div>
							)}

							<button
								type="button"
								onClick={handleSignOut}
								style={{
									background: "none",
									border: `1px solid ${colors.error}60`,
									borderRadius: "6px",
									padding: isMobile ? "6px 8px" : "8px 12px",
									color: colors.error,
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									gap: isMobile ? "4px" : "6px",
									fontSize: isMobile ? "10px" : "12px",
									fontFamily: '"JetBrains Mono", monospace',
									transition: "all 0.2s ease",
								}}
								onMouseOver={(e) => {
									e.target.style.backgroundColor = `${colors.error}20`;
								}}
								onFocus={(e) => {
									e.target.style.backgroundColor = `${colors.error}20`;
								}}
								onMouseOut={(e) => {
									e.target.style.backgroundColor = "transparent";
								}}
								onBlur={(e) => {
									e.target.style.backgroundColor = "transparent";
								}}
							>
								<FaSignOutAlt size={isMobile ? 10 : 12} />
								{isMobile ? "exit" : "logout()"}
							</button>
						</Group>
					</Group>
				</div>

				{/* Navigation */}
				<div
					style={{
						backgroundColor: colors.cardBackground,
						borderBottom: `1px solid ${colors.border}`,
						padding: isMobile ? "8px 16px" : "12px 24px",
						overflowX: "auto",
					}}
				>
					<Group spacing="xs" style={{ minWidth: isMobile ? "800px" : "auto" }}>
						{navItems.map((item) => {
							const isActive = pathname === item.href;
							const Icon = item.icon;

							return (
								<Link
									key={item.href}
									href={item.href}
									style={{
										textDecoration: "none",
										padding: isMobile ? "6px 12px" : "8px 16px",
										borderRadius: "6px",
										display: "flex",
										alignItems: "center",
										gap: isMobile ? "6px" : "8px",
										backgroundColor: isActive
											? `${colors.accent}20`
											: "transparent",
										border: isActive
											? `1px solid ${colors.accent}40`
											: "1px solid transparent",
										color: isActive ? colors.accent : colors.textSecondary,
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: isMobile ? "12px" : "14px",
										fontWeight: "500",
										transition: "all 0.2s ease",
										whiteSpace: "nowrap",
									}}
								>
									<Icon size={isMobile ? 12 : 14} />
									{isMobile
										? item.label.toLowerCase()
										: `${item.label.toLowerCase()}()`}
								</Link>
							);
						})}
					</Group>
				</div>

				{/* Content */}
				<Container
					size="xl"
					style={{
						padding: isMobile ? "16px" : "24px",
						maxWidth: "100%",
					}}
				>
					{children}
				</Container>
			</div>
		</ProtectedRoute>
	);
}

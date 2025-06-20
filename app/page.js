"use client";

import {
	FaCode,
	FaTerminal,
	FaBolt,
	FaShieldAlt,
	FaRocket,
	FaDatabase,
	FaArrowRight,
	FaCog,
	FaChartLine,
	FaLock,
	FaMicrochip,
	FaNetworkWired,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import { useResponsive } from "../hooks/useResponsive";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function LandingPage() {
	const { colors, isDark } = useTheme();
	const { isMobile, isTablet } = useResponsive();

	const handleButtonMouseOver = (e, bgColor, textColor = "white") => {
		e.target.style.background = bgColor;
		e.target.style.color = textColor;
		e.target.style.boxShadow = `0 0 20px ${colors.accent}66`;
	};

	const handleButtonMouseOut = (e, bgColor, textColor) => {
		e.target.style.background = bgColor;
		e.target.style.color = textColor;
		e.target.style.boxShadow = "none";
	};

	const backgroundGradient = isDark
		? "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
		: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)";

	return (
		<div
			style={{
				minHeight: "100vh",
				background: backgroundGradient,
				color: colors.text,
				fontFamily: '"JetBrains Mono", "Fira Code", monospace, system-ui',
			}}
		>
			{/* Navigation */}
			<nav
				style={{
					background: isDark
						? "rgba(10, 10, 10, 0.95)"
						: "rgba(255, 255, 255, 0.95)",
					backdropFilter: "blur(10px)",
					borderBottom: `1px solid ${colors.border}`,
					position: "sticky",
					top: 0,
					zIndex: 50,
				}}
			>
				<div
					style={{
						maxWidth: "1280px",
						margin: "0 auto",
						padding: isMobile ? "12px 16px" : "16px 24px",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div
						style={{
							fontSize: isMobile ? "20px" : "24px",
							fontWeight: "700",
							color: colors.accent,
							fontFamily: '"JetBrains Mono", monospace',
						}}
					>
						<FaTerminal
							style={{ marginRight: "8px", verticalAlign: "middle" }}
						/>
						LumaOneAI
					</div>
					<div
						style={{
							display: "flex",
							gap: isMobile ? "16px" : "32px",
							alignItems: "center",
						}}
					>
						<ThemeToggle size={isMobile ? "sm" : "md"} />

						{!isMobile && (
							<>
								<a
									href="#api"
									style={{
										color: colors.textSecondary,
										textDecoration: "none",
										fontWeight: "500",
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: "14px",
									}}
								>
									/api/docs
								</a>
								<a
									href="#sdk"
									style={{
										color: colors.textSecondary,
										textDecoration: "none",
										fontWeight: "500",
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: "14px",
									}}
								>
									/sdk
								</a>
								<a
									href="#github"
									style={{
										color: colors.textSecondary,
										textDecoration: "none",
										fontWeight: "500",
										fontFamily: '"JetBrains Mono", monospace',
										fontSize: "14px",
									}}
								>
									/github
								</a>
							</>
						)}

						<button
							type="button"
							style={{
								padding: isMobile ? "6px 12px" : "8px 20px",
								background: `linear-gradient(45deg, ${colors.accent}, ${colors.success})`,
								color: isDark ? "#0a0a0a" : "#ffffff",
								border: "none",
								borderRadius: "6px",
								fontWeight: "600",
								cursor: "pointer",
								fontFamily: '"JetBrains Mono", monospace',
								fontSize: isMobile ? "12px" : "14px",
								boxShadow: `0 0 10px ${colors.accent}50`,
							}}
						>
							{isMobile ? "> demo" : "> start_demo()"}
						</button>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section
				style={{
					padding: isMobile ? "40px 0 60px 0" : "80px 0 120px 0",
					position: "relative",
				}}
			>
				{/* Animated background grid */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						backgroundImage: `
            linear-gradient(${colors.accent}20 1px, transparent 1px),
            linear-gradient(90deg, ${colors.accent}20 1px, transparent 1px)
          `,
						backgroundSize: isMobile ? "30px 30px" : "50px 50px",
						opacity: 0.3,
					}}
				></div>

				<div
					style={{
						maxWidth: "1280px",
						margin: "0 auto",
						padding: isMobile ? "0 16px" : "0 24px",
						position: "relative",
					}}
				>
					<div
						style={{
							textAlign: "center",
							maxWidth: isMobile ? "100%" : "900px",
							margin: "0 auto",
						}}
					>
						{/* Terminal-style badge */}
						<div
							style={{
								display: "inline-flex",
								alignItems: "center",
								padding: isMobile ? "6px 12px" : "8px 16px",
								borderRadius: "8px",
								background: isDark
									? "rgba(10, 10, 10, 0.8)"
									: "rgba(255, 255, 255, 0.8)",
								border: `1px solid ${colors.border}`,
								marginBottom: isMobile ? "24px" : "32px",
								fontSize: isMobile ? "12px" : "14px",
								fontWeight: "500",
								color: colors.accent,
								fontFamily: '"JetBrains Mono", monospace',
								boxShadow: `0 0 20px ${colors.accent}20`,
							}}
						>
							<FaMicrochip
								style={{ width: "14px", height: "14px", marginRight: "8px" }}
							/>
							{"> status: AI_BEHAVIORAL_ENGINE_ACTIVE"}
						</div>

						<h1
							style={{
								fontSize: isMobile ? "36px" : isTablet ? "48px" : "72px",
								fontWeight: "900",
								lineHeight: "1.1",
								marginBottom: isMobile ? "16px" : "24px",
								color: colors.text,
								letterSpacing: "-0.02em",
								textShadow: `0 0 30px ${colors.accent}50`,
							}}
						>
							{"AI.detect("}
							<span style={{ color: colors.accent }}>threats</span>
							{")"}
							<br />
							<span
								style={{
									fontSize: isMobile ? "20px" : isTablet ? "28px" : "48px",
									color: colors.textMuted,
								}}
							>
								{`// before humans see them`}
							</span>
						</h1>

						<p
							style={{
								fontSize: isMobile ? "14px" : isTablet ? "16px" : "20px",
								color: colors.textSecondary,
								lineHeight: "1.6",
								marginBottom: isMobile ? "32px" : "48px",
								fontWeight: "400",
								fontFamily: '"JetBrains Mono", monospace',
							}}
						>
							Real-time behavioral analysis engine that processes 10M+
							emails/sec
							<br />
							{isMobile
								? ""
								: "> Machine learning models trained on 50B+ threat patterns"}
							<br />
							{"> 99.97% accuracy with <0.01% false positives"}
						</p>

						{/* Code snippet preview - hide on mobile */}
						{!isMobile && (
							<div
								style={{
									background: isDark
										? "rgba(10, 10, 10, 0.9)"
										: "rgba(255, 255, 255, 0.9)",
									border: `1px solid ${colors.border}`,
									borderRadius: "12px",
									padding: isTablet ? "16px" : "24px",
									marginBottom: "48px",
									textAlign: "left",
									fontFamily: '"JetBrains Mono", monospace',
									fontSize: isTablet ? "12px" : "14px",
									boxShadow: `0 0 30px ${colors.accent}20`,
								}}
							>
								<div
									style={{ color: colors.textMuted, marginBottom: "8px" }}
								>{`// Initialize LumaOne AI Engine`}</div>
								<div style={{ color: colors.accent }}>
									{"const"} <span style={{ color: colors.text }}>lumaone</span>{" "}
									= <span style={{ color: colors.warning }}>new</span>{" "}
									<span style={{ color: colors.accentSecondary }}>LumaOne</span>
									({"{"}
								</div>
								<div style={{ paddingLeft: "20px", color: colors.text }}>
									<span style={{ color: "#8b5cf6" }}>apiKey</span>:{" "}
									<span style={{ color: colors.success }}>'your-api-key'</span>,
									<br />
									<span style={{ color: "#8b5cf6" }}>model</span>:{" "}
									<span style={{ color: colors.success }}>
										'behavioral-ai-v3'
									</span>
									,<br />
									<span style={{ color: "#8b5cf6" }}>realtime</span>:{" "}
									<span style={{ color: colors.warning }}>true</span>
								</div>
								<div style={{ color: colors.text }}>{"});"}</div>
								<div
									style={{ marginTop: "12px", color: colors.textMuted }}
								>{`// Analyze threat patterns`}</div>
								<div style={{ color: colors.accent }}>lumaone</div>
								<span style={{ color: colors.text }}>
									.analyze(email).then(
								</span>
								<span style={{ color: colors.warning }}>result</span>{" "}
								<span style={{ color: colors.text }}>{`=>`}</span>{" "}
								<span style={{ color: colors.textMuted }}>{"{"}</span>
								<div
									style={{ paddingLeft: "20px", color: colors.textMuted }}
								>{`// Threat blocked in 0.003s`}</div>
								<div style={{ color: colors.textMuted }}>{"});"}</div>
							</div>
						)}

						<div
							style={{
								display: "flex",
								gap: isMobile ? "12px" : "16px",
								justifyContent: "center",
								marginBottom: isMobile ? "32px" : "48px",
								flexWrap: "wrap",
								flexDirection: isMobile ? "column" : "row",
								alignItems: "center",
							}}
						>
							<button
								type="button"
								style={{
									padding: isMobile ? "12px 24px" : "16px 32px",
									background: `linear-gradient(45deg, ${colors.accent}, ${colors.success})`,
									color: isDark ? "#0a0a0a" : "#ffffff",
									border: "none",
									borderRadius: "8px",
									fontSize: isMobile ? "14px" : "18px",
									fontWeight: "700",
									cursor: "pointer",
									fontFamily: '"JetBrains Mono", monospace',
									boxShadow: `0 0 20px ${colors.accent}40`,
									minWidth: isMobile ? "100%" : "auto",
								}}
								onMouseOver={(e) =>
									handleButtonMouseOver(
										e,
										`linear-gradient(45deg, ${colors.success}, ${colors.accent})`,
									)
								}
								onMouseOut={(e) =>
									handleButtonMouseOut(
										e,
										`linear-gradient(45deg, ${colors.accent}, ${colors.success})`,
										isDark ? "#0a0a0a" : "#ffffff",
									)
								}
								onFocus={(e) =>
									handleButtonMouseOver(
										e,
										`linear-gradient(45deg, ${colors.success}, ${colors.accent})`,
									)
								}
								onBlur={(e) =>
									handleButtonMouseOut(
										e,
										`linear-gradient(45deg, ${colors.accent}, ${colors.success})`,
										isDark ? "#0a0a0a" : "#ffffff",
									)
								}
							>
								<FaRocket style={{ marginRight: "8px" }} />
								{"> deploy_now()"}
							</button>

							<a
								href="/dashboard"
								style={{
									padding: isMobile ? "12px 24px" : "16px 32px",
									background: colors.accentSecondary,
									color: "#ffffff",
									textDecoration: "none",
									border: "none",
									borderRadius: "8px",
									fontSize: isMobile ? "14px" : "18px",
									fontWeight: "700",
									cursor: "pointer",
									fontFamily: '"JetBrains Mono", monospace',
									display: "inline-flex",
									alignItems: "center",
									boxShadow: `0 0 20px ${colors.accentSecondary}40`,
									minWidth: isMobile ? "100%" : "auto",
									justifyContent: "center",
								}}
								onMouseOver={(e) =>
									handleButtonMouseOver(e, colors.accentSecondary + "CC")
								}
								onMouseOut={(e) =>
									handleButtonMouseOut(e, colors.accentSecondary, "#ffffff")
								}
								onFocus={(e) =>
									handleButtonMouseOver(e, colors.accentSecondary + "CC")
								}
								onBlur={(e) =>
									handleButtonMouseOut(e, colors.accentSecondary, "#ffffff")
								}
							>
								<FaChartLine style={{ marginRight: "8px" }} />
								View Dashboard
							</a>

							<button
								type="button"
								style={{
									padding: isMobile ? "12px 24px" : "16px 32px",
									background: "transparent",
									color: colors.text,
									border: `2px solid ${colors.border}`,
									borderRadius: "8px",
									fontSize: isMobile ? "14px" : "18px",
									fontWeight: "600",
									cursor: "pointer",
									fontFamily: '"JetBrains Mono", monospace',
									minWidth: isMobile ? "100%" : "auto",
								}}
								onMouseOver={(e) => {
									e.target.style.background = colors.accent + "20";
									e.target.style.borderColor = colors.accent;
									e.target.style.color = colors.accent;
								}}
								onMouseOut={(e) => {
									e.target.style.background = "transparent";
									e.target.style.borderColor = colors.border;
									e.target.style.color = colors.text;
								}}
								onFocus={(e) => {
									e.target.style.background = colors.accent + "20";
									e.target.style.borderColor = colors.accent;
									e.target.style.color = colors.accent;
								}}
								onBlur={(e) => {
									e.target.style.background = "transparent";
									e.target.style.borderColor = colors.border;
									e.target.style.color = colors.text;
								}}
							>
								<FaCode style={{ marginRight: "8px" }} />
								{"> view_docs()"}
							</button>
						</div>

						{/* Real-time metrics */}
						<div
							style={{
								display: "grid",
								gridTemplateColumns: isMobile
									? "1fr"
									: isTablet
										? "repeat(2, 1fr)"
										: "repeat(3, 1fr)",
								gap: isMobile ? "16px" : "24px",
								marginTop: isMobile ? "32px" : "48px",
							}}
						>
							<div
								style={{
									textAlign: "center",
									padding: isMobile ? "16px" : "20px",
									background: isDark
										? "rgba(10, 10, 10, 0.6)"
										: "rgba(255, 255, 255, 0.6)",
									border: `1px solid ${colors.border}`,
									borderRadius: "12px",
									backdropFilter: "blur(10px)",
								}}
							>
								<div
									style={{
										fontSize: isMobile ? "24px" : "32px",
										fontWeight: "900",
										color: colors.accent,
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									47,382,941
								</div>
								<div
									style={{
										fontSize: isMobile ? "12px" : "14px",
										color: colors.textMuted,
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									threats_blocked_today
								</div>
							</div>

							<div
								style={{
									textAlign: "center",
									padding: isMobile ? "16px" : "20px",
									background: isDark
										? "rgba(10, 10, 10, 0.6)"
										: "rgba(255, 255, 255, 0.6)",
									border: `1px solid ${colors.border}`,
									borderRadius: "12px",
									backdropFilter: "blur(10px)",
								}}
							>
								<div
									style={{
										fontSize: isMobile ? "24px" : "32px",
										fontWeight: "900",
										color: colors.accentSecondary,
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									0.003s
								</div>
								<div
									style={{
										fontSize: isMobile ? "12px" : "14px",
										color: colors.textMuted,
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									avg_response_time
								</div>
							</div>

							<div
								style={{
									textAlign: "center",
									padding: isMobile ? "16px" : "20px",
									background: isDark
										? "rgba(10, 10, 10, 0.6)"
										: "rgba(255, 255, 255, 0.6)",
									border: `1px solid ${colors.border}`,
									borderRadius: "12px",
									backdropFilter: "blur(10px)",
									gridColumn: isMobile ? "1" : isTablet ? "span 2" : "3",
								}}
							>
								<div
									style={{
										fontSize: isMobile ? "24px" : "32px",
										fontWeight: "900",
										color: colors.success,
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									99.97%
								</div>
								<div
									style={{
										fontSize: isMobile ? "12px" : "14px",
										color: colors.textMuted,
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									accuracy_rate
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section
				style={{
					padding: isMobile ? "60px 0" : "120px 0",
					background: isDark
						? "rgba(10, 10, 10, 0.5)"
						: "rgba(248, 250, 252, 0.5)",
				}}
			>
				<div
					style={{
						maxWidth: "1280px",
						margin: "0 auto",
						padding: isMobile ? "0 16px" : "0 24px",
					}}
				>
					<div
						style={{
							textAlign: "center",
							marginBottom: isMobile ? "40px" : "80px",
						}}
					>
						<div
							style={{
								fontSize: isMobile ? "12px" : "14px",
								fontWeight: "600",
								color: colors.accent,
								textTransform: "uppercase",
								letterSpacing: "0.1em",
								marginBottom: "16px",
								fontFamily: '"JetBrains Mono", monospace',
							}}
						>
							{"// CORE_MODULES"}
						</div>
						<h2
							style={{
								fontSize: isMobile ? "32px" : "48px",
								fontWeight: "800",
								lineHeight: "1.2",
								color: colors.text,
								marginBottom: "24px",
								fontFamily: '"JetBrains Mono", monospace',
							}}
						>
							class <span style={{ color: colors.accent }}>ThreatEngine</span>{" "}
							{"{"}
						</h2>
						<p
							style={{
								fontSize: isMobile ? "14px" : "18px",
								color: colors.textSecondary,
								maxWidth: "600px",
								margin: "0 auto",
								fontFamily: '"JetBrains Mono", monospace',
							}}
						>
							{"// Advanced AI modules for real-time threat detection"}
						</p>
					</div>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: isMobile
								? "1fr"
								: "repeat(auto-fit, minmax(300px, 1fr))",
							gap: isMobile ? "24px" : "32px",
						}}
					>
						{/* Neural Network Module */}
						<div
							style={{
								padding: isMobile ? "24px" : "32px",
								background: isDark
									? "rgba(10, 10, 10, 0.8)"
									: "rgba(255, 255, 255, 0.8)",
								borderRadius: "12px",
								border: `1px solid ${colors.border}`,
								transition: "all 0.3s ease",
								position: "relative",
							}}
						>
							<div
								style={{
									width: "56px",
									height: "56px",
									background: `linear-gradient(45deg, ${colors.accent}, ${colors.success})`,
									borderRadius: "12px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginBottom: "24px",
									boxShadow: `0 0 20px ${colors.accent}50`,
								}}
							>
								<FaNetworkWired
									style={{
										width: "24px",
										height: "24px",
										color: isDark ? "#0a0a0a" : "#ffffff",
									}}
								/>
							</div>
							<h3
								style={{
									fontSize: isMobile ? "18px" : "20px",
									fontWeight: "700",
									marginBottom: "12px",
									color: colors.text,
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								neural_network_analysis()
							</h3>
							<p
								style={{
									color: colors.textSecondary,
									lineHeight: "1.6",
									fontFamily: '"JetBrains Mono", monospace',
									fontSize: isMobile ? "12px" : "14px",
								}}
							>
								{"// Deep learning models process email patterns"}
								<br />
								{"// 50B+ training samples, 99.97% accuracy"}
								<br />
								{"// Real-time inference in 0.003 seconds"}
							</p>
							<div
								style={{
									position: "absolute",
									top: "16px",
									right: "16px",
									fontSize: "12px",
									color: colors.accent,
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								[ACTIVE]
							</div>
						</div>

						{/* Behavioral Firewall */}
						<div
							style={{
								padding: isMobile ? "24px" : "32px",
								background: isDark
									? "rgba(10, 10, 10, 0.8)"
									: "rgba(255, 255, 255, 0.8)",
								borderRadius: "12px",
								border: `1px solid ${colors.border}`,
								transition: "all 0.3s ease",
								position: "relative",
							}}
						>
							<div
								style={{
									width: "56px",
									height: "56px",
									background: `linear-gradient(45deg, ${colors.accentSecondary}, #2563eb)`,
									borderRadius: "12px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginBottom: "24px",
									boxShadow: `0 0 20px ${colors.accentSecondary}50`,
								}}
							>
								<FaShieldAlt
									style={{ width: "24px", height: "24px", color: "#ffffff" }}
								/>
							</div>
							<h3
								style={{
									fontSize: isMobile ? "18px" : "20px",
									fontWeight: "700",
									marginBottom: "12px",
									color: colors.text,
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								behavioral_firewall()
							</h3>
							<p
								style={{
									color: colors.textSecondary,
									lineHeight: "1.6",
									fontFamily: '"JetBrains Mono", monospace',
									fontSize: isMobile ? "12px" : "14px",
								}}
							>
								{"// Monitors human interaction patterns"}
								<br />
								{"// Detects anomalies in user behavior"}
								<br />
								{"// Blocks zero-day social engineering"}
							</p>
							<div
								style={{
									position: "absolute",
									top: "16px",
									right: "16px",
									fontSize: "12px",
									color: colors.accentSecondary,
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								[LEARNING]
							</div>
						</div>

						{/* Threat Intelligence */}
						<div
							style={{
								padding: isMobile ? "24px" : "32px",
								background: isDark
									? "rgba(10, 10, 10, 0.8)"
									: "rgba(255, 255, 255, 0.8)",
								borderRadius: "12px",
								border: `1px solid ${colors.border}`,
								transition: "all 0.3s ease",
								position: "relative",
							}}
						>
							<div
								style={{
									width: "56px",
									height: "56px",
									background: `linear-gradient(45deg, ${colors.warning}, #d97706)`,
									borderRadius: "12px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginBottom: "24px",
									boxShadow: `0 0 20px ${colors.warning}50`,
								}}
							>
								<FaDatabase
									style={{
										width: "24px",
										height: "24px",
										color: isDark ? "#0a0a0a" : "#ffffff",
									}}
								/>
							</div>
							<h3
								style={{
									fontSize: isMobile ? "18px" : "20px",
									fontWeight: "700",
									marginBottom: "12px",
									color: colors.text,
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								threat_intelligence()
							</h3>
							<p
								style={{
									color: colors.textSecondary,
									lineHeight: "1.6",
									fontFamily: '"JetBrains Mono", monospace',
									fontSize: isMobile ? "12px" : "14px",
								}}
							>
								{"// Real-time threat feed integration"}
								<br />
								{"// 10M+ IOCs updated every second"}
								<br />
								{"// Global threat correlation engine"}
							</p>
							<div
								style={{
									position: "absolute",
									top: "16px",
									right: "16px",
									fontSize: "12px",
									color: colors.warning,
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								[SYNCING]
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer
				style={{
					background: isDark ? "#0a0a0a" : "#f8fafc",
					borderTop: `1px solid ${colors.border}`,
					padding: isMobile ? "40px 0 24px 0" : "64px 0 32px 0",
				}}
			>
				<div
					style={{
						maxWidth: "1280px",
						margin: "0 auto",
						padding: isMobile ? "0 16px" : "0 24px",
					}}
				>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: isMobile
								? "1fr"
								: "repeat(auto-fit, minmax(200px, 1fr))",
							gap: isMobile ? "32px" : "48px",
							marginBottom: isMobile ? "32px" : "48px",
						}}
					>
						<div>
							<div
								style={{
									fontSize: isMobile ? "20px" : "24px",
									fontWeight: "700",
									color: colors.accent,
									marginBottom: "16px",
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								<FaTerminal
									style={{ marginRight: "8px", verticalAlign: "middle" }}
								/>
								LumaOneAI
							</div>
							<p
								style={{
									color: colors.textMuted,
									lineHeight: "1.6",
									fontFamily: '"JetBrains Mono", monospace',
									fontSize: isMobile ? "12px" : "14px",
								}}
							>
								{"// AI-powered threat detection"}
								<br />
								{"// Built for developers, by developers"}
								<br />
								{"// Real-time protection at scale"}
							</p>
						</div>

						<div>
							<h4
								style={{
									fontSize: isMobile ? "14px" : "16px",
									fontWeight: "600",
									color: colors.text,
									marginBottom: "16px",
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								{"// DEVELOPERS"}
							</h4>
							<div
								style={{ display: "flex", flexDirection: "column", gap: "8px" }}
							>
								<a
									href="#api-docs"
									style={{
										color: colors.textMuted,
										textDecoration: "none",
										fontSize: isMobile ? "12px" : "14px",
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									/api/docs
								</a>
								<a
									href="#sdk"
									style={{
										color: colors.textMuted,
										textDecoration: "none",
										fontSize: isMobile ? "12px" : "14px",
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									/sdk/python
								</a>
								<a
									href="#github"
									style={{
										color: colors.textMuted,
										textDecoration: "none",
										fontSize: isMobile ? "12px" : "14px",
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									/github
								</a>
							</div>
						</div>

						<div>
							<h4
								style={{
									fontSize: isMobile ? "14px" : "16px",
									fontWeight: "600",
									color: colors.text,
									marginBottom: "16px",
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								{"// SYSTEM"}
							</h4>
							<div
								style={{
									fontSize: "12px",
									fontFamily: '"JetBrains Mono", monospace',
								}}
							>
								<div style={{ color: colors.accent, marginBottom: "4px" }}>
									{"> status: OPERATIONAL"}
								</div>
								<div style={{ color: colors.textMuted, marginBottom: "4px" }}>
									{"> uptime: 99.99%"}
								</div>
								<div style={{ color: colors.textMuted, marginBottom: "4px" }}>
									{"> latency: 0.003s"}
								</div>
								<div style={{ color: colors.accentSecondary }}>
									{"> threats_blocked: 47M+"}
								</div>
							</div>
						</div>
					</div>

					<div
						style={{
							borderTop: `1px solid ${colors.border}`,
							paddingTop: isMobile ? "24px" : "32px",
							display: "flex",
							justifyContent: isMobile ? "center" : "space-between",
							alignItems: "center",
							flexWrap: "wrap",
							gap: "16px",
							textAlign: isMobile ? "center" : "left",
						}}
					>
						<p
							style={{
								color: colors.textMuted,
								fontSize: isMobile ? "12px" : "14px",
								fontFamily: '"JetBrains Mono", monospace',
							}}
						>
							{"// © 2024 LumaOneAI - All systems operational"}
						</p>
						{!isMobile && (
							<div style={{ display: "flex", gap: "24px" }}>
								<a
									href="#terms"
									style={{
										color: colors.textMuted,
										fontSize: "14px",
										textDecoration: "none",
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									/terms
								</a>
								<a
									href="#privacy"
									style={{
										color: colors.textMuted,
										fontSize: "14px",
										textDecoration: "none",
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									/privacy
								</a>
								<a
									href="#security"
									style={{
										color: colors.textMuted,
										fontSize: "14px",
										textDecoration: "none",
										fontFamily: '"JetBrains Mono", monospace',
									}}
								>
									/security.txt
								</a>
							</div>
						)}
					</div>
				</div>
			</footer>
		</div>
	);
}

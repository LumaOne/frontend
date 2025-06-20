// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "../contexts/ThemeContext";

export const metadata = {
	title: "LumaOne - AI-Powered Email Security",
	description:
		"Enterprise-grade AI email security and threat detection platform",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript defaultColorScheme="dark" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>
			<body style={{ margin: 0, padding: 0, backgroundColor: "#0a0a0a" }}>
				<ThemeProvider>
					<MantineProvider
						defaultColorScheme="dark"
						theme={{
							fontFamily: "Inter, sans-serif",
							headings: {
								fontFamily: "Inter, sans-serif",
							},
							colors: {
								dark: [
									"#e2e8f0",
									"#94a3b8",
									"#64748b",
									"#475569",
									"#334155",
									"#1e293b",
									"#0f172a",
									"#0a0a0a",
									"#000000",
									"#000000",
								],
								light: [
									"#ffffff",
									"#f8fafc",
									"#f1f5f9",
									"#e2e8f0",
									"#cbd5e1",
									"#94a3b8",
									"#64748b",
									"#475569",
									"#334155",
									"#1e293b",
								],
							},
							primaryColor: "green",
							breakpoints: {
								xs: "30em",
								sm: "40em",
								md: "48em",
								lg: "64em",
								xl: "80em",
							},
							spacing: {
								xs: "0.5rem",
								sm: "0.75rem",
								md: "1rem",
								lg: "1.5rem",
								xl: "2rem",
							},
							radius: {
								xs: "0.25rem",
								sm: "0.5rem",
								md: "0.75rem",
								lg: "1rem",
								xl: "1.5rem",
							},
						}}
					>
						<Notifications />
						<AuthProvider>{children}</AuthProvider>
					</MantineProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import { FaDownload, FaFileAlt, FaSpinner } from "react-icons/fa";
import { useTheme } from "../../../contexts/ThemeContext";
import AccessibleButton from "../AccessibleButton";

const PDFGenerator = ({
	reportData,
	reportType = "threat-analysis",
	title = "Security Report",
	className = "",
}) => {
	const [isGenerating, setIsGenerating] = useState(false);
	const { colors, isDark } = useTheme();

	const generatePDF = async () => {
		setIsGenerating(true);

		try {
			const pdf = new jsPDF("p", "mm", "a4");
			const pageWidth = pdf.internal.pageSize.getWidth();
			const pageHeight = pdf.internal.pageSize.getHeight();
			const margin = 20;

			// Header
			pdf.setFontSize(24);
			pdf.setTextColor(34, 197, 94); // Green color
			pdf.text("LumaOneAI Security Report", margin, 30);

			pdf.setFontSize(12);
			pdf.setTextColor(100, 116, 139); // Gray color
			pdf.text(`Generated: ${format(new Date(), "PPpp")}`, margin, 40);
			pdf.text(
				`Report Type: ${reportType.replace("-", " ").toUpperCase()}`,
				margin,
				47,
			);

			// Line separator
			pdf.setDrawColor(34, 197, 94);
			pdf.line(margin, 55, pageWidth - margin, 55);

			let yPosition = 70;

			// Executive Summary
			pdf.setFontSize(16);
			pdf.setTextColor(0, 0, 0);
			pdf.text("Executive Summary", margin, yPosition);
			yPosition += 10;

			pdf.setFontSize(10);
			pdf.setTextColor(60, 60, 60);
			const summaryText = `This report provides a comprehensive analysis of security threats detected and blocked by the LumaOneAI system. The data covers threat patterns, system performance metrics, and departmental security posture.`;
			const splitSummary = pdf.splitTextToSize(
				summaryText,
				pageWidth - 2 * margin,
			);
			pdf.text(splitSummary, margin, yPosition);
			yPosition += splitSummary.length * 5 + 15;

			// Key Metrics Section
			pdf.setFontSize(16);
			pdf.setTextColor(0, 0, 0);
			pdf.text("Key Security Metrics", margin, yPosition);
			yPosition += 15;

			// Metrics boxes
			const metrics = [
				{
					label: "Threats Blocked Today",
					value: "47,382,941",
					color: [34, 197, 94],
				},
				{
					label: "Average Response Time",
					value: "0.003s",
					color: [59, 130, 246],
				},
				{ label: "Detection Accuracy", value: "99.97%", color: [34, 197, 94] },
				{ label: "Active Threats", value: "23", color: [245, 158, 11] },
			];

			metrics.forEach((metric, index) => {
				const xPos = margin + (index % 2) * ((pageWidth - 2 * margin) / 2);
				const yPos = yPosition + Math.floor(index / 2) * 25;

				// Metric box
				pdf.setFillColor(248, 250, 252);
				pdf.rect(xPos, yPos - 5, (pageWidth - 2 * margin) / 2 - 5, 20, "F");

				pdf.setFontSize(14);
				pdf.setTextColor(...metric.color);
				pdf.text(metric.value, xPos + 5, yPos + 5);

				pdf.setFontSize(8);
				pdf.setTextColor(100, 116, 139);
				pdf.text(metric.label, xPos + 5, yPos + 12);
			});

			yPosition += 60;

			// Threat Analysis Section
			if (yPosition > pageHeight - 50) {
				pdf.addPage();
				yPosition = 30;
			}

			pdf.setFontSize(16);
			pdf.setTextColor(0, 0, 0);
			pdf.text("Threat Analysis", margin, yPosition);
			yPosition += 15;

			// Recent threats table
			const threats = [
				{
					time: "14:32:18",
					type: "phishing_attempt",
					severity: "HIGH",
					status: "BLOCKED",
				},
				{
					time: "14:31:45",
					type: "malware_attachment",
					severity: "CRITICAL",
					status: "QUARANTINED",
				},
				{
					time: "14:30:12",
					type: "suspicious_link",
					severity: "MEDIUM",
					status: "DETECTED",
				},
				{
					time: "14:29:33",
					type: "spoofed_domain",
					severity: "HIGH",
					status: "BLOCKED",
				},
				{
					time: "14:28:56",
					type: "social_engineering",
					severity: "MEDIUM",
					status: "QUARANTINED",
				},
			];

			// Table header
			pdf.setFontSize(10);
			pdf.setTextColor(0, 0, 0);
			pdf.text("Time", margin, yPosition);
			pdf.text("Threat Type", margin + 30, yPosition);
			pdf.text("Severity", margin + 80, yPosition);
			pdf.text("Status", margin + 120, yPosition);

			pdf.setDrawColor(200, 200, 200);
			pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
			yPosition += 8;

			// Table rows
			threats.forEach((threat, index) => {
				pdf.setFontSize(9);
				pdf.setTextColor(60, 60, 60);
				pdf.text(threat.time, margin, yPosition);
				pdf.text(threat.type, margin + 30, yPosition);

				// Color-coded severity
				const severityColors = {
					CRITICAL: [239, 68, 68],
					HIGH: [245, 158, 11],
					MEDIUM: [59, 130, 246],
					LOW: [34, 197, 94],
				};
				pdf.setTextColor(...(severityColors[threat.severity] || [60, 60, 60]));
				pdf.text(threat.severity, margin + 80, yPosition);

				// Color-coded status
				const statusColors = {
					BLOCKED: [239, 68, 68],
					QUARANTINED: [245, 158, 11],
					DETECTED: [59, 130, 246],
					RELEASED: [34, 197, 94],
				};
				pdf.setTextColor(...(statusColors[threat.status] || [60, 60, 60]));
				pdf.text(threat.status, margin + 120, yPosition);

				yPosition += 6;
			});

			yPosition += 15;

			// System Health Section
			if (yPosition > pageHeight - 80) {
				pdf.addPage();
				yPosition = 30;
			}

			pdf.setFontSize(16);
			pdf.setTextColor(0, 0, 0);
			pdf.text("System Health", margin, yPosition);
			yPosition += 15;

			// Health metrics
			const healthMetrics = [
				{ label: "API Uptime", value: "99.97%", status: "excellent" },
				{ label: "Memory Usage", value: "67% (8.2GB / 12GB)", status: "good" },
				{ label: "CPU Load", value: "34% (4 cores)", status: "excellent" },
				{ label: "Storage", value: "45% (450GB / 1TB)", status: "good" },
			];

			healthMetrics.forEach((metric, index) => {
				const statusColors = {
					excellent: [34, 197, 94],
					good: [245, 158, 11],
					warning: [239, 68, 68],
				};

				pdf.setFontSize(10);
				pdf.setTextColor(0, 0, 0);
				pdf.text(metric.label + ":", margin, yPosition);

				pdf.setTextColor(...(statusColors[metric.status] || [60, 60, 60]));
				pdf.text(metric.value, margin + 60, yPosition);

				yPosition += 8;
			});

			// Footer
			const footerY = pageHeight - 20;
			pdf.setDrawColor(34, 197, 94);
			pdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

			pdf.setFontSize(8);
			pdf.setTextColor(100, 116, 139);
			pdf.text(
				"© 2024 LumaOneAI - Confidential Security Report",
				margin,
				footerY,
			);
			pdf.text(
				`Page ${pdf.internal.getNumberOfPages()}`,
				pageWidth - margin - 20,
				footerY,
			);

			// Save the PDF
			const fileName = `lumaone-security-report-${format(new Date(), "yyyy-MM-dd-HHmm")}.pdf`;
			pdf.save(fileName);
		} catch (error) {
			console.error("Error generating PDF:", error);
			alert("Failed to generate PDF report. Please try again.");
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<div className={className}>
			<AccessibleButton
				variant="primary"
				size="md"
				onClick={generatePDF}
				disabled={isGenerating}
				loading={isGenerating}
				icon={isGenerating ? FaSpinner : FaDownload}
				ariaLabel={
					isGenerating ? "Generating PDF report" : "Download PDF report"
				}
				style={{
					backgroundColor: colors.accent,
					color: isDark ? colors.background : "#ffffff",
				}}
			>
				{isGenerating ? "Generating..." : "Download PDF Report"}
			</AccessibleButton>

			{isGenerating && (
				<div
					style={{
						marginTop: "8px",
						fontSize: "12px",
						color: colors.textMuted,
						fontFamily: '"JetBrains Mono", monospace',
					}}
				>
					// Compiling security analytics...
				</div>
			)}
		</div>
	);
};

export default PDFGenerator;

import { Metadata } from "next";
import React from "react";
import "./globals.css"

export const metadata: Metadata = {
  title: "Inquiry Kanban Board",
  description: "ERP system for B2B event management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
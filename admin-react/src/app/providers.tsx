'use client'

import {ThemeProvider} from "@material-tailwind/react";
import React from "react";

export function Providers({ children }: any) {
	// material-tailwind provider 정의
	return <ThemeProvider>
		{children}
	</ThemeProvider>
}
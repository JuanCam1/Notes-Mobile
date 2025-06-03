import { ThemeContext } from "@/context/theme-context";
import { use } from "react";

const useTheme = () => {
	const context = use(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
};
export default useTheme;

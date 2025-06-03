import {
	createContext,
	type FC,
	type ReactNode,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_ASYNC_STORAGE_KEY = "task-theme";
type ThemeName = "dark" | "light";

interface PropsProvider {
	children: ReactNode;
}

export interface ThemeContextState {
	theme: ThemeName;
	toggleTheme: () => void;
	setTheme: (theme: ThemeName) => void;
}

export const ThemeContext = createContext<ThemeContextState | null>(null);

export const ThemeProvider: FC<PropsProvider> = ({ children }) => {
	const deviceColorScheme = useColorScheme();
	const [theme, setThemeState] = useState<ThemeName>(
		deviceColorScheme.colorScheme || "light",
	);

	useEffect(() => {
		loadTheme();
	}, []);

	const loadTheme = async () => {
		try {
			const savedTheme = await AsyncStorage.getItem(THEME_ASYNC_STORAGE_KEY);
			if (savedTheme) {
				setThemeState(savedTheme as ThemeName);
			} else if (deviceColorScheme) {
				setThemeState(deviceColorScheme.colorScheme);
			}
		} catch (error) {
			console.error("Failed to load theme:", error);
		}
	};

	const saveTheme = async (newTheme: ThemeName) => {
		try {
			await AsyncStorage.setItem(THEME_ASYNC_STORAGE_KEY, newTheme);
		} catch (error) {
			console.error("Failed to save theme:", error);
		}
	};

	const setTheme = (newTheme: ThemeName) => {
		setThemeState(newTheme);
		saveTheme(newTheme);
	};

	const toggleTheme = () => {
		deviceColorScheme.toggleColorScheme();
	};

	const values = useMemo(() => {
		return {
			theme,
			toggleTheme,
			setTheme,
		};
	}, [theme]);

	return (
		<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
	);
};

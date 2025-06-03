import { Tabs } from "expo-router";
import { Archive, Home, Settings } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme, View } from "react-native";

export default function TabLayout() {
	const inset = useSafeAreaInsets();
	const theme = useColorScheme();

	const tabBarClass =
		theme === "dark"
			? "bg-zinc-900 border-zinc-700 border-t-[1px]"
			: "bg-white border-b-2";

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					paddingTop: 10,
					height: 70 + inset.bottom,
					borderTopWidth: 0,
					paddingBottom: inset.bottom,
				},
				tabBarBackground: () => (
					<View
						className={tabBarClass}
						style={{ flex: 1, paddingBottom: inset.bottom }}
					/>
				),
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Inicio",
					tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="archived"
				options={{
					title: "Archivado",
					tabBarIcon: ({ color, size }) => (
						<Archive size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, size }) => (
						<Settings size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}

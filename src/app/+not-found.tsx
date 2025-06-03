import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View className="flex flex-1 items-center justify-center p-5 dark:bg-zinc-950">
				<Text className="text-xl font-semibold dark:text-white">
					Esta Página No Existe
				</Text>
				<Link href="/" className="mt-4 px-4 border-b border-blue-400 pb-2">
					<Text className="dark:text-white">Página Inicial</Text>
				</Link>
			</View>
		</>
	);
}

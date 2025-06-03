import React from "react";
import { View } from "react-native";
import type { LucideIcon } from "lucide-react-native";

type TabBarIconProps = {
	icon: LucideIcon;
	color: string;
	size: number;
};

const TabBarIcon = ({ icon: Icon, color, size }: TabBarIconProps) => {
	return (
		<View className="items-center justify-center">
			<Icon size={size} color={color} />
		</View>
	);
};

export default TabBarIcon;

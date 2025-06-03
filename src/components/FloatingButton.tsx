import React from "react";
import { Pressable, Text } from "react-native";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

export function FloatingButton() {
	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	const handlePressIn = () => {
		scale.value = withTiming(0.9, { duration: 100 });
	};

	const handlePressOut = () => {
		scale.value = withTiming(1, { duration: 100 });
	};

	const handlePress = () => {
		router.push("/create");
	};

	return (
		<Animated.View
			style={animatedStyle}
			className="absolute bottom-6 right-6 bg-blue-500 rounded-full "
		>
			<Pressable
				onPress={handlePress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				className="w-14 h-14 bg-primary-500 rounded-full justify-center items-center shadow-md"
			>
				<Plus size={24} color="white" />
			</Pressable>
		</Animated.View>
	);
}

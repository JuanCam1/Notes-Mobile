import type { FC, ReactNode } from "react";
import { TextInput, View } from "react-native";
import { cn } from "@/lib/util";

interface Props {
	value: string;
	placeholder?: string;
	onChangeText: (value: string) => void;
	classNameInput?: ReactNode;
	classNameIcon?: ReactNode;
	children?: ReactNode;
}
const FormInputIcon: FC<Props> = ({
	classNameInput,
	classNameIcon,
	value,
	placeholder,
	onChangeText,
	children,
}) => {
	return (
		<View className="flex flex-row items-center h-12 border border-zinc-600 rounded-md overflow-hidden">
			<View
				className={cn(
					"flex justify-center items-center px-3 py-2 h-full border border-r-0 rounded-l-md bg-white dark:bg-zinc-900",
					classNameIcon,
				)}
			>
				{children}
			</View>
			<TextInput
				className={cn(
					"h-full flex-1 text-md p-2.5 pl-3 border-none bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200",
					classNameInput,
				)}
				value={value}
				placeholder={placeholder || ""}
				onChangeText={onChangeText}
				placeholderTextColor="#9CA3AF"
			/>
		</View>
	);
};
export default FormInputIcon;

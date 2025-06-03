import type { FC } from "react";
import { TextInput, type TextInputProps } from "react-native";

interface FormInputProps extends TextInputProps {
	value: string;
	placeholder?: string;
	onChangeText: (value: string) => void;
}
const FormInput: FC<FormInputProps> = ({
	value,
	placeholder,
	onChangeText,
	...props
}) => {
	return (
		<TextInput
			className="h-full min-h-12 flex-1 text-md p-2.5 pl-3 border-none bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-md"
			value={value}
			placeholder={placeholder || ""}
			onChangeText={onChangeText}
			placeholderTextColor="#9CA3AF"
			{...props}
		/>
	);
};
export default FormInput;

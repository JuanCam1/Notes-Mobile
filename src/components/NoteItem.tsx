import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Edit } from "lucide-react-native";
import { STATUS_COLORS } from "@/constants/theme";

interface NoteItemProps {
	note: NoteModel;
}

export function NoteItem({ note }: NoteItemProps) {
	const { title, description, status, updatedAt } = note;
	const statusColors = STATUS_COLORS[status];

	const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	return (
		<View className="my-3">
			<Link href={`/note/${note.id}`} asChild>
				<Pressable>
					<View className={`p-4 rounded-lg border ${statusColors.border} `}>
						<View className="flex-row justify-between items-start">
							<Text
								className={`font-semibold text-lg mb-1 flex-1  ${statusColors.text}`}
								numberOfLines={1}
							>
								{title}
							</Text>
							<View className="flex-row items-center gap-5">
								<Text className="text-xs text-neutral-500 dark:text-neutral-300">
									{formattedDate}
								</Text>
								<Link href={`/note/${note.id}/edit`} asChild>
									<Pressable
										className="p-2 rounded-full bg-zinc-500 "
										hitSlop={8}
									>
										<Edit size={14} color="white" />
									</Pressable>
								</Link>
							</View>
						</View>
						<Text
							className="text-neutral-700 dark:text-neutral-300 mb-2"
							numberOfLines={2}
						>
							{description}
						</Text>
						<View className="flex-row">
							<Text
								className={`text-xs py-1 rounded-full  ${statusColors.text}`}
							>
								{status.charAt(0).toUpperCase() + status.slice(1)}
							</Text>
						</View>
					</View>
				</Pressable>
			</Link>
		</View>
	);
}

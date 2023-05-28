import { Avatar, H4, Text, XStack, YStack } from "tamagui";

export function Header() {
  return (
    <XStack space="$3" ai="center">
      <YStack gap="$2">
        <Text color="$gray10">Olá</Text>

        <H4 fontWeight="bold" mt="$-2">
          Paulo
        </H4>
      </YStack>
      <Avatar size="$5" circular>
        <Avatar.Image src="https://github.com/pauloricardorc.png" />

        <Avatar.Fallback backgroundColor="$blue10Dark" />
      </Avatar>
    </XStack>
  );
}

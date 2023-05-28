import { Moon, Sun } from "@tamagui/lucide-icons";
import { Switch, SwitchProps, XStack, useTheme } from "tamagui";

export function ChangeTheme({...rest} : SwitchProps) {
  const theme = useTheme()
  return (
    <XStack space="$2" ai="center">
      <Sun size="$2" fill={theme.yellow10.val} />
      <Switch size="$3" bg="$gray6" {...rest}>
        <Switch.Thumb animation="bouncy" />
      </Switch>
      <Moon size="$2" fill={theme.gray10.val} />
    </XStack>
  )
}
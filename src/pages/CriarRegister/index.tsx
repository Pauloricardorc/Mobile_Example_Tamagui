import { KeyboardType } from "react-native";
import { Button, H3, Input, Label, SizeTokens, Theme, XStack, YStack } from "tamagui";

export default function Criar() {
  return (
    <Theme name="dark">
      <YStack
        bg="$background"
        f={1}
        borderColor={"$blue9Dark"}
        p="$4"
        pt="$10"
        gap="$6"
        pb='$8'
      >
        <H3 alignSelf="center" fontWeight="700">
          Criar Novo Registro
        </H3>
        <YStack space f={1}>
          <InputDemo size="$4" text="Titulo" placeholder="Descrição da compra" />
          <InputDemo size="$4" text="Convidado" placeholder="Nome do convidado" />
          <InputDemo size="$4" text="Preço" placeholder="Total da compra" keyboardType="numeric" />
          <InputDemo size="$4" text="Data" placeholder="Data da compra" />
        </YStack>
        <Button hoverTheme pressTheme fontSize='$6' size='$5' backgroundColor="$blue8" >Salvar</Button>
      </YStack>
    </Theme>
  );
}

function InputDemo(props: { size: SizeTokens, placeholder: string, text: string, keyboardType?: KeyboardType | 'default' }) {
  return (
    <YStack space="$1.5" h='$8'>
      <Label htmlFor="convidado" size="$2" fontSize='$5'>{props.text}</Label>
      <Input flex={1} size={props.size} placeholder={props.placeholder} keyboardType={props.keyboardType} />
    </YStack>
  )
}

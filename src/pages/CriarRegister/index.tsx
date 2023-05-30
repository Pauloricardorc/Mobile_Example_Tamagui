import { ArrowLeft } from "@tamagui/lucide-icons";
import { KeyboardType, ReturnKeyType, TextInputTextInputEventData } from "react-native";
import { Button, H3, Input, InputProps, Label, SizeTokens, XStack, YStack } from "tamagui";
import { Header } from "../../components/header";
import { useForm, Controller } from "react-hook-form";
import { api } from "../../api/axios";
import { FormatterDate } from "../../hooks/formatterDate";
import Toast from "react-native-toast-message";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type RegisterProps = {
  descricao: string;
  comprador: string;
  convidado: string;
  preco: string;
  data: string;
};

const clearDefaultValues = {
  descricao: '',
  comprador: '',
  convidado: '',
  preco: '',  
  data: '',
}

export default function Criar({ navigation }: any) {
  const registerSchema = yup.object({
    descricao: yup.string().required("Informe a descrição"),
    convidado: yup.string().required("Informa o convidado"),
    preco: yup.string().required("Digite um preço"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    resetField,
  } = useForm<RegisterProps>({
    defaultValues: clearDefaultValues,
    resolver: yupResolver(registerSchema)
  });

  const date = new Date().toISOString();

  async function handleForm(data: RegisterProps) {
    const { descricao, convidado, preco } = data;

    await api.post('criar', {
      "descricao": descricao,
      "comprador": "Paulo",
      "convidado": convidado,
      "preco": Number(preco),
      "data": FormatterDate(date)
    }).then((e) => Toast.show({
      type: 'success',
      text1: 'Notificação',
      text2: 'O registro foi criado com sucesso👋',
      position: 'bottom',
      bottomOffset: 100,
      visibilityTime: 5000,
    })).then((e) => reset(clearDefaultValues))
  }

  return (
    <YStack
      bg="$background"
      f={1}
      borderColor={"$blue9Dark"}
      p="$4"
      pt="$10"
      gap="$6"
    >
      <Toast />
      <XStack jc="space-between" ai="center">
        <Button onPress={() => navigation.navigate("Home")} circular>
          <ArrowLeft />
        </Button>
        <Header />
      </XStack>
      <H3 alignSelf="center" fontWeight="700">
        Criar Novo Registro
      </H3>
      <YStack space="$1" f={1}>
        <Controller
          control={control}
          name="descricao"
          render={({ field: { onChange, value } }) => (
            <InputDemo
              size="$4"
              text="Titulo"
              placeholder="Descrição da compra"
              onChangeText={onChange}
              error={errors.descricao?.message}
              value={value}
              name="descricao"
            />
          )}
        />
        <Controller
          control={control}
          name="convidado"
          render={({ field: { onChange, value } }) => (
            <InputDemo
              size="$4"
              text="Convidado"
              placeholder="Nome do convidado"
              onChangeText={onChange}
              error={errors.convidado?.message}
              value={value}
              name="convidado"
            />
          )}
        />
        <Controller
          control={control}
          name="preco"
          render={({ field: { onChange, value } }) => (
            <InputDemo
              size="$4"
              text="Preço"
              placeholder="Total da compra"
              keyboardType="numeric"
              onChangeText={onChange}
              returnKeyType="done"
              error={errors.preco?.message}
              value={value}
              name="preco"
            />
          )}
        />
      </YStack>
      <YStack gap='$4'>
      <Button
        hoverTheme
        pressTheme
        fontSize="$6"
        size="$5"
        b="$-2"
        width={"100%"}
        backgroundColor="$blue9"
        onPress={handleSubmit(handleForm)}
      >
        Salvar
      </Button>
      </YStack>
    </YStack>
  );
}

function InputDemo(props: {
  size: SizeTokens;
  placeholder: string;
  text: string;
  keyboardType?: KeyboardType | "default";
  onChangeText: any;
  returnKeyType?: ReturnKeyType | "send";
  error?: string;
  name: string;
  value?: string;
}) {
  return (
    <YStack space="$1.5" h="$10">
      <Label htmlFor="convidado" size="$2" fontSize="$5">
        {props.text}
      </Label>
      <Input
        flex={1}
        size={props.size}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        boc={!!props.error ? "$red10" : "$gray5"}
        componentName={props.name}
        value={props.value}
      />
      <Label color="$red10" htmlFor="error" size="$1" fontSize="$2" pl="$2">
        {props.error}
      </Label>
    </YStack>
  );
}

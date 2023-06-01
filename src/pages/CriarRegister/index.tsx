import { ArrowLeft } from "@tamagui/lucide-icons";
import { MaskedTextInput } from "react-native-mask-text";
import { KeyboardType, ReturnKeyType, StyleSheet } from "react-native";
import {
  Button,
  H3,
  Input,
  Label,
  SizeTokens,
  Spinner,
  XStack,
  YStack,
} from "tamagui";
import { Header } from "../../components/header";
import { useForm, Controller } from "react-hook-form";
import { api } from "../../api/axios";
import { FormatterDate } from "../../hooks/formatterDate";
import Toast from "react-native-toast-message";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

type RegisterProps = {
  descricao: string;
  comprador: string;
  convidado: string;
  preco: string;
  data: string;
};

const clearDefaultValues = {
  descricao: "",
  comprador: "",
  convidado: "",
  preco: "",
  data: "",
};

const formatNumber = new Intl.NumberFormat('pt-BR')

export default function Criar({ navigation }: any) {
  const registerSchema = yup.object({
    descricao: yup.string().required("Informe a descrição"),
    convidado: yup.string().required("Informa o convidado"),
  });
  const [newPreco, setPreco] = useState<any>()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterProps>({
    defaultValues: clearDefaultValues,
    resolver: yupResolver(registerSchema),
  });

  const date = new Date().toISOString();

  async function handleForm(data: RegisterProps) {
    const { descricao, convidado } = data;
    console.log({        descricao: descricao,
      comprador: "Paulo",
      convidado: convidado,
      preco: Number(newPreco).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      data: FormatterDate(date),})
    await api
      .post("criar", {
        descricao: descricao,
        comprador: "Paulo",
        convidado: convidado,
        preco: Number(newPreco).toLocaleString(),
        data: FormatterDate(date),
      })
      .then((e) =>
        Toast.show({
          type: "success",
          text1: "Notificação",
          text2: "O registro foi criado com sucesso👋",
          position: "bottom",
          bottomOffset: 110,
          visibilityTime: 6000,
        })
      )
      .then((e) => reset(clearDefaultValues));
  }

  return (
    <YStack bg="$background" f={1} borderColor={"$blue9Dark"} p="$4" pt="$10">
      <Toast />

      <XStack jc="space-between" ai="center">
        <Button onPress={() => navigation.navigate("Home")} circular>
          <ArrowLeft />
        </Button>
        <Header />
      </XStack>

      <YStack mt="$6" space f={1}>
        <H3 alignSelf="center" fontWeight="700">
          Criar Novo Registro
        </H3>
        <YStack space="$1" f={1}>
          <Controller
            control={control}
            name="descricao"
            render={({ field: { onChange, value } }) => (
              <InputDemo
                size="$5"
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
                size="$5"
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
                size="$5"
                text="Preço"
                placeholder="Total da compra"
                keyboardType="numeric"
                onChangeText={(text: any, rawText: any) => formatNumber.format(Number(rawText))}
                returnKeyType="done"
                error={errors.preco?.message}
                value={newPreco}
                name="preco"
                mask
              />
            )}
          />
        </YStack>
      </YStack>

      <YStack backgroundColor="$background" mb="$4">
        <Button
          hoverTheme
          pressTheme
          fontSize="$6"
          size="$5"
          width={"100%"}
          backgroundColor={isSubmitting ? "$gray4" : "$blue9"}
          onPress={handleSubmit(handleForm)}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner color="white" size="large" /> : "Salvar"}
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
  mask?: true | false;
}) {
  return (
    <YStack space="$1.5" h="$10">
      <Label htmlFor="convidado" size="$2" fontSize="$5">
        {props.text}
      </Label>
      {!props.mask ? (
        <Input
          flex={1}
          size={props.size}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          onChangeText={props.onChangeText}
          returnKeyType={props.returnKeyType}
          boc={!!props.error ? "$red10" : "$gray5"}
          placeholderTextColor="$gray7"
          componentName={props.name}
          value={props.value}
        />
      ) : (
        <MaskedTextInput
          type="currency"
          options={{
            prefix: "$",
            decimalSeparator: ".",
            groupSeparator: ",",
            precision: 2,
          }}
          onChangeText={props.onChangeText}
          style={styles.input}
          keyboardType="numeric"
        />
      )}

      <Label color="$red10" htmlFor="error" size="$1" fontSize="$2" pl="$2">
        {props.error}
      </Label>
    </YStack>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderRadius: 6,
    paddingHorizontal: 20,
    fontSize: 20,
    borderColor: '#DDDDDD24',
    color: '#38E54D',
    fontWeight: '500',
    height: 50,
    borderWidth: 1,
  },
});

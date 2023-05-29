import { Toast, ToastProvider, ToastViewport, useToastState } from "@tamagui/toast";
import { ReactNode } from "react";

export function Notification({children}: any) {
  const toast = useToastState()

  // don't show any toast if no toast is present or it's handled natively
  if (!toast || toast.isHandledNatively) {
    return null
  }
  
  return (
    <ToastProvider>
      <Toast key={toast.id} duration={toast.duration} viewportName="viewport-custom">
        <Toast.Title>Status do Cadastro</Toast.Title>
        <Toast.Description>Registro realizado com sucesso</Toast.Description>

        <Toast.Action />

        <Toast.Close />
      </Toast>
      {children}
    </ToastProvider>
  );
}

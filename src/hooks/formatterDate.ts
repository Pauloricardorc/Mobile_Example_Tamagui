import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function FormatterDate (date: string) {
  return format(
    new Date(date),
    "'Dia' dd 'de' MMMM' de 'yyyy'",
    {locale: ptBR}
  )
}
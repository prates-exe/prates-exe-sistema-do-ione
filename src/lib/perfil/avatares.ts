import {
  Rocket,
  Bot,
  Cat,
  Dog,
  Panda,
  Bird,
  Rabbit,
  Turtle,
  Ghost,
  Zap,
  Gem,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";

export interface AvatarOpcao {
  id: string;
  label: string;
  Icon: LucideIcon;
  bg: string;
  fg: string;
}

// Avatares fixos (sem upload de imagem — evita moderação de conteúdo e
// mantém a página leve). Cores giram entre as três cores primárias do site.
export const AVATARES: AvatarOpcao[] = [
  { id: "foguete", label: "Foguete", Icon: Rocket, bg: "bg-brand-500", fg: "text-white" },
  { id: "robo", label: "Robô", Icon: Bot, bg: "bg-slate-900", fg: "text-white" },
  { id: "gato", label: "Gato", Icon: Cat, bg: "bg-dam-500", fg: "text-white" },
  { id: "cachorro", label: "Cachorro", Icon: Dog, bg: "bg-bd-500", fg: "text-slate-900" },
  { id: "panda", label: "Panda", Icon: Panda, bg: "bg-white", fg: "text-slate-900" },
  { id: "passaro", label: "Pássaro", Icon: Bird, bg: "bg-brand-600", fg: "text-white" },
  { id: "coelho", label: "Coelho", Icon: Rabbit, bg: "bg-bd-500", fg: "text-slate-900" },
  { id: "tartaruga", label: "Tartaruga", Icon: Turtle, bg: "bg-dam-600", fg: "text-white" },
  { id: "fantasma", label: "Fantasma", Icon: Ghost, bg: "bg-slate-200", fg: "text-slate-900" },
  { id: "raio", label: "Raio", Icon: Zap, bg: "bg-bd-600", fg: "text-slate-900" },
  { id: "gema", label: "Gema", Icon: Gem, bg: "bg-brand-700", fg: "text-white" },
  { id: "joystick", label: "Joystick", Icon: Gamepad2, bg: "bg-dam-700", fg: "text-white" },
];

export const AVATAR_PADRAO = "robo";

export function getAvatar(id: string | null | undefined): AvatarOpcao {
  return AVATARES.find((a) => a.id === id) ?? AVATARES.find((a) => a.id === AVATAR_PADRAO)!;
}

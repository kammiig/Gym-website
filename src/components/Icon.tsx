import {
  ArrowRight,
  Check,
  Code2,
  CreditCard,
  Globe2,
  Gauge,
  Headphones,
  LayoutDashboard,
  LifeBuoy,
  LockKeyhole,
  PanelTop,
  Plug,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ArrowRight,
  Check,
  Code2,
  CreditCard,
  Gauge,
  Globe2,
  Headphones,
  LayoutDashboard,
  LifeBuoy,
  LockKeyhole,
  PanelTop,
  Plug,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Zap
};

type IconProps = {
  name: string;
  className?: string;
  size?: number;
};

export function Icon({ name, className = "", size = 22 }: IconProps) {
  const Lucide = iconMap[name] ?? Sparkles;

  return <Lucide aria-hidden="true" className={className} size={size} strokeWidth={2} />;
}

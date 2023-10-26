import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
    iconClasses?: string,
    parentClasses?: string,
    Icon: LucideIcon
}

const IconBadge = ({ iconClasses, parentClasses, Icon }: Props) => {
  return (
    <div className={cn("bg-sky-700/20 p-1 rounded-full", parentClasses)}>
      <Icon className={cn("text-sky-700 text-3xl", iconClasses)} />
    </div>
  );
};

export default IconBadge

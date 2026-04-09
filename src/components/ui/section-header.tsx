import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  centered = true,
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {/* Badge / Accent */}
      <div className={cn(
        "flex items-center gap-3 mb-4",
        centered && "justify-center"
      )}>
        <span className={cn(
          "h-px w-8",
          dark ? "bg-[#0F766E]" : "bg-[#0F766E]"
        )}></span>
        {badge && (
          <span className={cn(
            "font-semibold tracking-wider uppercase text-sm",
            dark ? "text-[#0F766E]" : "text-[#0F766E]"
          )}>
            {badge}
          </span>
        )}
      </div>

      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-[1.1]",
          dark ? "text-white" : "text-gray-900"
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-base md:text-lg max-w-2xl leading-relaxed",
            centered && "mx-auto",
            dark ? "text-gray-400" : "text-gray-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

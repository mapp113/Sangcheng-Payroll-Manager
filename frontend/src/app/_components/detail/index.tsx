import Image from "next/image";
import type {ReactNode} from "react";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";

export type DetailHeaderLineVariant = "default" | "muted" | "accent";

export interface DetailHeaderLine {
    text: string;
    variant?: DetailHeaderLineVariant;
}

interface DetailHeaderProps {
    badgeLabel?: string;
    title: string;
    subtitle?: string;
    lines?: DetailHeaderLine[];
    avatarName?: string;
    avatarUrl?: string;
    summary?: ReactNode;
    summaryContainerClassName?: string;
}

const lineVariantClassMap: Record<DetailHeaderLineVariant, string> = {
    default: "text-sm text-muted-foreground",
    muted: "text-xs text-muted-foreground",
    accent: "text-xs font-semibold uppercase tracking-[0.3em] text-primary",
};

export function DetailHeader({
                                 badgeLabel,
                                 title,
                                 subtitle,
                                 lines,
                                 avatarName,
                                 avatarUrl,
                                 summary,
                                 summaryContainerClassName,
                             }: DetailHeaderProps) {
    return (
        <header className="flex flex-col gap-6 border-b p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                {avatarName ? (
                    <Avatar className="h-16 w-16 border">
                        {avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={avatarName} className="object-cover"/>
                        ) : (
                            <AvatarFallback className="text-lg font-semibold uppercase">
                                {getInitials(avatarName)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                ) : null}

                <div className="space-y-2">
                    {badgeLabel ? (
                        <span
                            className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wide text-secondary-foreground">
              {badgeLabel}
            </span>
                    ) : null}
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
                    {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
                    {lines?.map((line) => (
                        <p
                            key={`${line.text}-${line.variant ?? "default"}`}
                            className={cn(lineVariantClassMap[line.variant ?? "default"])}
                        >
                            {line.text}
                        </p>
                    ))}
                </div>
            </div>

            {summary ? (
                <div className={cn("w-full md:w-auto", summaryContainerClassName)}>{summary}</div>
            ) : null}
        </header>
    );
}

interface DetailSectionCardProps {
    title: string;
    iconSrc?: string;
    children: ReactNode;
}

export function DetailSectionCard({title, iconSrc, children}: DetailSectionCardProps) {
    return (
        <section className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="flex items-center gap-3 border-b px-5 py-3">
                {iconSrc ? (
                    <Image src={iconSrc} alt={title} width={24} height={24} className="h-6 w-6"/>
                ) : null}
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
            </div>
            <div className="px-5 pb-5 pt-4 text-sm">{children}</div>
        </section>
    );
}

interface DetailSummaryCardProps {
    label: string;
    value: number | string;
    highlight?: boolean;
    iconSrc?: string;
    unit?: string;
    formatValue?: (value: number) => string;
    align?: "center" | "left";
    valueSuffix?: ReactNode;
}

export function DetailSummaryCard({
                                      label,
                                      value,
                                      highlight,
                                      iconSrc,
                                      unit,
                                      formatValue,
                                      align = iconSrc ? "left" : "center",
                                      valueSuffix,
                                  }: DetailSummaryCardProps) {
    const isNumberValue = typeof value === "number";
    const formattedValue =
        isNumberValue && typeof formatValue === "function"
            ? formatValue(value)
            : value;

    return (
        <div
            className={cn(
                "rounded-xl border bg-card text-card-foreground shadow-sm",
                align === "left" ? "flex items-center gap-4 p-4 text-left" : "space-y-2 p-4 text-center",
                highlight && "border-primary bg-primary/5"
            )}
        >
            {iconSrc ? (
                <span className="flex h-11 w-11 items-center justify-center rounded-full border bg-background">
          <Image src={iconSrc} alt={label} width={24} height={24}/>
        </span>
            ) : null}

            <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
                <p className="text-2xl font-semibold text-foreground">
                    {formattedValue}
                    {unit ? (
                        <span className="ml-1 text-sm font-medium text-muted-foreground">{unit}</span>
                    ) : null}
                    {valueSuffix}
                </p>
            </div>
        </div>
    );
}

interface DetailShellProps {
    children: ReactNode;
    className?: string;
}

export function DetailShell({children, className}: DetailShellProps) {
    return (
        <article className={cn("rounded-2xl border bg-card text-card-foreground shadow-sm", className)}>
            {children}
        </article>
    );
}

export function getInitials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}
import { cn } from "@/lib/utils";
import React from "react";


export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    url,
    category,
    date,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    url?: string;
    category?: string;
    date?: string;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-(--s-card)/90 border border-(color:--s-line)/15 hover:border-[#6366F1]/30 justify-between flex flex-col space-y-4",
                className
            )}
        >
            <a href={url} target="_blank" rel="noopener noreferrer" className="h-full flex flex-col gap-4">
                {header}
                <div className="group-hover/bento:translate-x-2 transition duration-200">
                    <div className="flex items-center gap-2 mb-2">
                        {icon}
                        <span className="text-xs text-(--s-muted)">{category} • {date}</span>
                    </div>
                    <div className="font-sans font-bold text-(--s-fg) mb-2 mt-2">
                        {title}
                    </div>
                    <div className="font-sans font-normal text-(--s-text-2) text-xs">
                        {description}
                    </div>
                </div>
            </a>
        </div>
    );
};

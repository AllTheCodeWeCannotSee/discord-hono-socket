"use client";

import { Button } from "@/components/ui/button"
import { LucideProps } from "lucide-react";
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import * as TooltipRadix from '@radix-ui/react-tooltip';
import { cn } from "@/lib/utils";

type Props = {
    key: string;
    label: string;
    icon: React.ComponentType<LucideProps>;
    buttonClassName?: string;
    iconClassName?: string;
    onClick: () => void;
}

export const ActionButton = ({
    key,
    label,
    icon: Icon,
    buttonClassName,
    iconClassName,
    onClick,
}: Props) => {
    return (
        <TooltipProvider key={key}>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <Button
                        className={cn(
                            "group bg-neutral-700 rounded-full w-10 h-10  hover:rounded-xl transition-all duration-300 ease-in-out",
                            buttonClassName
                        )}
                        variant="ghost"
                        size="icon"
                        onClick={onClick}
                    >
                        <Icon
                            className={cn(
                                "",
                                iconClassName
                            )}
                            size={24}
                        />
                    </Button>
                </TooltipTrigger>
                <TooltipContent
                    className="bg-black text-white border-none"
                    side="right"
                    sideOffset={16}
                >
                    {label}
                    <TooltipRadix.Arrow className="" />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}
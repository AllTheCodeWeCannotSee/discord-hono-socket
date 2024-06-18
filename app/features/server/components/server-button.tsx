"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import * as TooltipRadix from '@radix-ui/react-tooltip';
import Image from "next/image";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

type Props = {

    key: string;
    serverId: string;
    label: string;
    imageUrl: string;
    buttonClassName?: string;
    iconClassName?: string;
    onClick: () => void;

}


export const ServerButton = ({

    key,
    serverId,
    label,
    imageUrl,
    buttonClassName,
    iconClassName,
    onClick,

}: Props) => {

    const params = useParams()

    return (
        <div className=" group relative flex w-full justify-center my-4">
            <div
                className={cn("p-[2px] bg-white absolute left-0 top-1/2 transform -translate-y-1/2 rounded-r-md h-2 group-hover:h-4 transition-all duration-500 ease-in-out",
                    params.serverId === serverId && "h-6"
                )}
            />
            <TooltipProvider key={key}>
                <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                        <Button
                            className={cn(
                                "relative flex group bg-neutral-700 rounded-full w-10 h-10  hover:rounded-xl transition-all duration-300 ease-in-out overflow-hidden ",
                                buttonClassName
                            )}
                            variant="ghost"
                            size="icon"
                            onClick={onClick}
                        >
                            <Image src={imageUrl} alt="logo" fill objectFit="cover" />
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

        </div>
    )
}
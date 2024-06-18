"use client";
import { useUpdateServerMember } from "@/app/features/server/api/use-update-server-member";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";



type InviteCodePageProps = {
    params: {
        inviteCode: string;
    }
}


const InviteCodePage = ({
    params
}: InviteCodePageProps) => {

    if (!params.inviteCode) {
        return redirect("/");
    }

    const router = useRouter();
    const mutation = useUpdateServerMember();

    return (
        <Button
            className="h-20 w-40 text-3xl"
            onClick={() => {
                mutation.mutate({ inviteCode: params.inviteCode }, {
                    onSuccess: (data) => {
                        return router.push("/");
                    }
                });
            }}
        >Join</Button>
    )
}

export default InviteCodePage;
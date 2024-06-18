
"use client";

import { useCreateProfile } from "@/app/features/profile/api//use-create-profile";
import { useRouter } from "next/navigation";
import { useGetProfile } from "../features/profile/api/use-get-profile";
import { useGetServers } from "../features/server/api/use-get-servers";

import { useEffect } from "react";
import { useCreateServerStore } from "../features/server/hooks/use-create-server-store";
import { CreateServerModal } from "../features/server/components/create-server-modal";
import { on } from "events";
import { Button } from "@/components/ui/button";

const Home = () => {
  const profileQuery = useGetProfile();
  const router = useRouter();
  const serverQuery = useGetServers();
  const profileMutation = useCreateProfile();
  const { isOpen, onClose, onOpen } = useCreateServerStore();


  useEffect(() => {
    if (!profileQuery.data && !profileQuery.isLoading && !profileQuery.isError) {
      profileMutation.mutate({
        name: "null",
        email: "null",
        imageUrl: "null",
      });
    }
  }, [profileQuery.data, profileQuery.isLoading, profileQuery.isError, profileMutation]);

  useEffect(() => {
    if (serverQuery.data && serverQuery.data.length > 0) {
      const serverId = serverQuery.data[0].server.id;
      router.push(`/servers/${serverId}`);
    }
  }, [serverQuery.data, router]);

  if (!profileQuery.data || profileQuery.isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="h-full flex items-center justify-center bg-neutral-800">
      <Button variant="outline" onClick={onOpen}>
        Create Server
      </Button>
    </div>
  )

}

export default Home;
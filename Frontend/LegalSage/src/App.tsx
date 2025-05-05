import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { UploadPage } from "@/pages/uploadPage"
import { MessagePage } from "@/pages/messagePage"

export default function Layout() {
  const [selectedPage, setSelectedPage] = useState<"upload" | "message">("message")

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar onSelectPage={setSelectedPage} />

        <div className="flex-1 p-6">
          <SidebarTrigger />
          {selectedPage === "upload" ? <UploadPage /> : <MessagePage />}
        </div>
      </SidebarProvider>
    </div>
  )
}



import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar";
  
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
  
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  onSelectPage: (page: "upload" | "message") => void;
}
  
export function AppSidebar({ onSelectPage }: AppSidebarProps) {
  return (
    <Sidebar className="bg-zinc-900 shadow-lg border-r border-zinc-800 w-64 dark">
      <SidebarHeader className="p-4">
        <Card className="bg-transparent shadow-none">
          <CardHeader className="p-0 text-center">
            <CardTitle className="text-3xl font-bold text-white">
              Legal Sage
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Your legal assistant
            </CardDescription>
          </CardHeader>
        </Card>
      </SidebarHeader>
  
      <SidebarContent className="px-4 py-2">
        <SidebarGroup title="Navigation">
          <Button variant="ghost" className="w-full justify-start text-zinc-300 hover:bg-zinc-800" onClick={() => onSelectPage("upload")}>Upload</Button>
          <Button variant="ghost" className="w-full justify-start text-zinc-300 hover:bg-zinc-800" onClick={() => onSelectPage("message")}>Ask</Button>
        </SidebarGroup>
      </SidebarContent>
  
      <SidebarFooter className="p-4 text-xs text-zinc-400">
        © 2025 Legal Sage
      </SidebarFooter>
    </Sidebar>
  );
}
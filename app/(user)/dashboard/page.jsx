import DashboardStats from "@/app/components/DashboardStats";
import DashboardContacts from "@/app/components/DashboardContacts";
import DashboardTeamMembers from "@/app/components/DashboardTeamMembers";
import DashboardConversation from "@/app/components/DashboardConversation"; 

export default function page() {
  return (
    <div className="px-4">
      
      <div className="mb-4">
        <DashboardStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 mb-5">
        
        <div>
          <DashboardContacts />
        </div>

        <div>
          <DashboardTeamMembers />
        </div>
      
      </div>
      
      <DashboardConversation />
      

    </div>
  );
}
import Image from "next/image";

const contacts = [
  {
    id: 1,
    name: "เฮียจิน",
    status: "Hello",
    avatar: "/Customer.jpg", 
    tag: "VIP",
    isOnline: true,
    avatarSize: 45,
    channel: "Facebook",
    manager: {
      name: "Andrew Smith",
      avatar: "/Manager.jpg", 
      avatarSize: 30 
    }
  },
];

// ------------------------------------

export default function DashboardContacts() {
  return (

    <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-4 h-90 w-193  flex flex-col">
      
      <h2 className="text-white/90 text-sm pb-3 mb-4 border-b border-white/20">
        Contacts
      </h2>
      
      <div className="flex flex-col gap-y-4">
        
        {contacts.map((contact) => (
          
          <div key={contact.id} className="flex items-center justify-between w-full">
            
           
            <div className="flex items-start gap-3"> 
              
              <div className="relative flex-shrink-0">
                {/* 1. Avatar */}
                <Image
                  src={contact.avatar}
                  alt={contact.name}
                  width={contact.avatarSize}  
                  height={contact.avatarSize} 
                  className="rounded-full"
                />
              </div>
              
              
              <div className="flex flex-col">
                
                
                <p className="text-white font-medium text-sm">{contact.name}</p>
                
                <div className="flex items-center gap-2">
                  
                  {contact.channel === 'Facebook' && <i className="fa-brands fa-facebook text-blue-500 text-xs"></i>}
                  
                  {contact.status && (
                    <p className="text-white/60 text-xs">{contact.status}</p>
                  )}

                  {contact.tag && (
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-yellow-500/30 text-yellow-300">
                      {contact.tag}
                    </span>
                  )}
                </div>
                
                </div>
            </div>

            {contact.manager && (
              <div className="flex items-center gap-2">
                <Image
                  src={contact.manager.avatar}
                  alt={contact.manager.name}
                  width={contact.manager.avatarSize}
                  height={contact.manager.avatarSize}
                  className="rounded-full"
                />
                <p className="text-white/80 font-medium text-sm">{contact.manager.name}</p>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
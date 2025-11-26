// file: app/data/mockData.js

import { time } from "framer-motion";

export const unifiedMockData = [
    // --- ID 1: Somchai ---
    {
        id: 1,
        name: "Somchai Mhaiprong",
        imgUrl: "https://ui-avatars.com/api/?name=Somchai+Mhaiprong&background=random", 
        channel: "Line",
        email: "somchai@example.com",
        phone: "0812345678",
        phonePrefix: "66+",
        company: "Siam Trading Co., Ltd.",
        country: "Thailand",
        time: "10:30 AM",
        
        tags: "VIP",
        status: "Pending",
        lastMessage: "โอนเงินเรียบร้อยแล้วครับ เช็คยอดให้หน่อย",
        lastMessageTime: "10:30 AM",
        unreadCount: 1,
        messages: [
            { from: "them", text: "โอนเงินเรียบร้อยแล้วครับ เช็คยอดให้หน่อย", time: "10:30 AM" }
        ]
    },

    // --- ID 2: Jinju ---
    {
        id: 2,
        name: "Jinju Jingjang",
        imgUrl: "https://ui-avatars.com/api/?name=Jinju+Jingjang&background=random",
        channel: "Facebook",
        email: null,
        phone: null,
        phonePrefix: null,
        company: null,
        country: null,
        time: "08:30 AM",

        tags: null,
        status: "New Chat",
        lastMessage: "สนใจสินค้าสีชมพูค่ะ มีของพร้อมส่งมั้ยคะ?",
        lastMessageTime: "08:30",
        unreadCount: 1,
        messages: [
            { from: "them", text: "สนใจสินค้าสีชมพูค่ะ มีของพร้อมส่งมั้ยคะ?", time: "08:30 AM" }
        ]
    },

    // --- ID 3: Jane Doe ---
    {
        id: 3,
        name: "Jane Doe",
        imgUrl: "https://ui-avatars.com/api/?name=Jane+Doe&background=random",
        channel: "Line",
        email: "jane.doe@example.com",
        phone: "0800000000",
        phonePrefix: "66+",
        company: "Global Corp",
        country: "Thailand",
        time: "09:00 AM",

        tags: null,
        status: "Closed",
        lastMessage: "ได้รับสินค้าเคลมแล้วค่ะ ขอบคุณมากนะคะ",
        lastMessageTime: "09:00 AM",
        unreadCount: 0,
        messages: [
            { from: "them", text: "ได้รับสินค้าเคลมแล้วค่ะ ขอบคุณมากนะคะ", time: "09:00 AM" }
        ]
    },

    // --- ID 4: Robert Brown ---
    {
        id: 4,
        name: "Robert Brown",
        imgUrl: "https://ui-avatars.com/api/?name=Robert+Brown&background=random",
        channel: "Facebook",
        email: "robert.b@techhub.com",
        phone: "2025550101",
        phonePrefix: "1+",
        company: "TechHub Solutions",
        country: "USA",
        time: "09:15 AM",
        
        tags: null,
        status: "Open",
        lastMessage: "รบกวนขอใบเสนอราคาสำหรับ 50 เครื่องครับ",
        lastMessageTime: "09:15 AM",
        unreadCount: 1,
        messages: [
            { from: "them", text: "รบกวนขอใบเสนอราคาสำหรับ 50 เครื่องครับ", time: "09:15 AM" }
        ]
    },

    // --- ID 5: Emily Chen ---
    {
        id: 5,
        name: "Emily Chen",
        imgUrl: "https://ui-avatars.com/api/?name=Emily+Chen&background=random",
        channel: "Line",
        email: "emily.c@design.co.jp",
        phone: "9011223344",
        phonePrefix: "81+",
        company: "Sakura Design",
        country: "Japan",
        time: "11:20 AM",
        
        tags: "VIP",
        status: "Open",
        lastMessage: "แบบร่างที่ส่งมาสวยมากค่ะ ชอบสีนี้เลย",
        lastMessageTime: "11:20 AM",
        unreadCount: 0,
        messages: [
            { from: "them", text: "แบบร่างที่ส่งมาสวยมากค่ะ ชอบสีนี้เลย", time: "11:20 AM" }
        ]
    },

    // --- ID 6: Michael Wilson ---
    {
        id: 6,
        name: "Michael Wilson",
        imgUrl: "https://ui-avatars.com/api/?name=Michael+Wilson&background=random",
        channel: "Line",
        email: null,
        phone: "0899988877",
        phonePrefix: "66+",
        company: "Siam Trading Co., Ltd.",
        country: "Thailand",
        time: "Monday",
        
        tags: null,
        status: "Closed",
        lastMessage: "ได้รับของแล้วครับ บริการรวดเร็วมาก",
        lastMessageTime: "Monday",
        unreadCount: 0,
        messages: [
            { from: "them", text: "ได้รับของแล้วครับ บริการรวดเร็วมาก", time: "Monday" }
        ]
    },

    // --- ID 7: Sarah O'Connor ---
    {
        id: 7,
        name: "Sarah O'Connor",
        imgUrl: "https://ui-avatars.com/api/?name=Sarah+Connor&background=random",
        channel: "Facebook",
        email: "sarah@skynet.com",
        phone: "3105550199",
        phonePrefix: "1+",
        company: "Cyberdyne Systems",
        country: "USA",
        time: "11:55 AM",
        
        tags: null,
        status: "Open",
        lastMessage: "ระบบหลังบ้านเข้าไม่ได้ค่ะ ช่วยเช็คด่วนเลย!",
        lastMessageTime: "11:55 AM",
        unreadCount: 1,
        messages: [
            { from: "them", text: "ระบบหลังบ้านเข้าไม่ได้ค่ะ ช่วยเช็คด่วนเลย!", time: "11:55 AM" }
        ]
    },

    // --- ID 8: David Kim ---
    {
        id: 8,
        name: "David Kim",
        imgUrl: "https://ui-avatars.com/api/?name=David+Kim&background=random",
        channel: "Line",
        email: "david.kim@seoulfood.kr",
        phone: null,
        phonePrefix: "82+",
        company: "Seoul Food Co., Ltd.",
        country: "Other",
        time: "09:45 AM",
        
        tags: null,
        status: "Open",
        lastMessage: "สินค้าล็อตใหม่จะส่งออกจากเกาหลีคืนนี้ครับ",
        lastMessageTime: "09:45 AM",
        unreadCount: 0,
        messages: [
            { from: "them", text: "สินค้าล็อตใหม่จะส่งออกจากเกาหลีคืนนี้ครับ", time: "09:45 AM" }
        ]
    },

    // --- ID 9: Jessica Jones ---
    {
        id: 9,
        name: "Jessica Jones",
        imgUrl: "https://ui-avatars.com/api/?name=Jessica+Jones&background=random",
        channel: "Line",
        email: "jessica@alias.com",
        phone: "9175550123",
        phonePrefix: "1+",
        company: null,
        country: "USA",
        time: "Sunday",
        
        tags: null,
        status: "Closed",
        lastMessage: "สวัสดีครับ มีสินค้าอะไรใหม่แนะนำบ้างครับ?",
        lastMessageTime: "Sunday",
        unreadCount: 0,
        messages: [
            { from: "them", text: "สวัสดีครับ มีสินค้าอะไรใหม่แนะนำบ้างครับ?", time: "Sunday" }
        ]
    },

    // --- ID 10: William Davis ---
    {
        id: 10,
        name: "William Davis",
        imgUrl: "https://ui-avatars.com/api/?name=William+Davis&background=random",
        channel: "Facebook",
        email: "william.d@globalcorp.com",
        phone: "2125550188",
        phonePrefix: "1+",
        company: "Global Corp",
        country: "USA",
        time: "11:00 AM",
        
        tags: null,
        status: "Open",
        lastMessage: "สนใจดีลที่เสนอมาครับ สะดวกนัดคุยอาทิตย์หน้ามั้ย",
        lastMessageTime: "11:00 AM",
        unreadCount: 1,
        messages: [
            { from: "them", text: "สนใจดีลที่เสนอมาครับ สะดวกนัดคุยอาทิตย์หน้ามั้ย", time: "11:00 AM" }
        ]
    },

    // --- ID 11: OH HO ---
    {
        id: 11, 
        name: "OH HO",
        imgUrl: "https://ui-avatars.com/api/?name=OH+HO&background=random",
        channel: "Line",
        email: null,
        phone: null,
        phonePrefix: null,
        company: null,
        country: null,
        time: "08:00 AM",
        
        tags: null,
        status: "New Chat",
        lastMessage: "สอบถามครับ ร้านเปิดกี่โมงครับ",
        lastMessageTime: "08:00 AM",
        unreadCount: 1,
        messages: [
            { from: "them", text: "สอบถามครับ ร้านเปิดกี่โมงครับ", time: "08:00 AM" }
        ]
    },
    
    // --- ID 12: Linda Garcia ---
    {
        id: 12,
        name: "Linda Garcia",
        imgUrl: "https://ui-avatars.com/api/?name=Linda+Garcia&background=random",
        channel: "Line",
        email: null,
        phone: null,
        phonePrefix: "66+",
        company: "Freelance",
        country: "Thailand",
        time: "12:05 PM",

        tags: null,
        status: "Open",
        lastMessage: "สวัสดีค่ะ ทางร้านรับกราฟิกเพิ่มมั้ยคะ?",
        lastMessageTime: "12:05 PM",
        unreadCount: 1,
        messages: [
            { from: "them", text: "สวัสดีค่ะ ทางร้านรับกราฟิกเพิ่มมั้ยคะ?", time: "12:05 PM" }
        ]
    },

    // --- ID 13: Thomas Anderson ---
    {
        id: 13,
        name: "Thomas Anderson",
        imgUrl: "https://ui-avatars.com/api/?name=Thomas+Anderson&background=random",
        channel: "Facebook",
        email: "neo@matrix.com",
        phone: null,
        phonePrefix: "1+",
        company: "Metaverse",
        country: "USA",
        time: "1:00 PM",

        tags: "VIP",
        status: "Open",
        lastMessage: "ผมต้องการอาวุธ... จำนวนมาก",
        lastMessageTime: "1:00 PM",
        unreadCount: 0,
        messages: [
            { from: "them", text: "ผมต้องการอาวุธ... จำนวนมาก", time: "1:00 PM" }
        ]
    },

    // --- ID 14: Nancy Drew ---
    {
        id: 14,
        name: "Nancy Drew",
        imgUrl: "https://ui-avatars.com/api/?name=Nancy+Drew&background=random",
        channel: "Facebook",
        email: "nancy@detective.com",
        phone: "3125550144",
        phonePrefix: "1+",
        company: "Private Detective",
        country: "USA",
        time: "Yesterday",

        tags: null,
        status: "Closed",
        lastMessage: "สวัสดีค่ะ",
        lastMessageTime: "Yesterday",
        unreadCount: 0,
        messages: [
            { from: "them", text: "สวัสดีค่ะ", time: "Yesterday" }
        ]
    }
];
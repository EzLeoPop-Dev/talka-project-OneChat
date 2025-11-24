import React from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import "@/app/assets/css/other.css";
import Navbar from './components/Navbar';


export default function TalkaLanding() {
    const features = [
        {
            img: "/images/chaticon.png",
            title: "LandlineIntegrations",
            description: "Seamlessly connect with traditional phone systems"
        },
        {
            img: "/images/usericon.png",
            title: "CloudBasedService",
            description: "Access from anywhere with cloud technology"
        },
        {
            img: "/images/dashbordicon.png",
            title: "ScalableAndCustomizable",
            description: "Grow your system as your needs expand"
        },
        {
            img: "/images/Tagicon.png",
            title: "AnalyticsAndReporting",
            description: "Track performance with detailed insights"
        },
        {
            img: "/images/Aiicon.png",
            title: "AIAssistanceAI",
            description: "Smart automation for better efficiency"
        },
        {
            img: "/images/layouticon.png",
            title: "VoiceAIAllInOne",
            description: "Complete voice solution in one platform"
        }
    ];

    const plans = [
        {
            name: "Starter",
            price: "$29",
            period: "/month/user",
            features: [
                "Unlimited Inbound",
                "Live Video + Screen",
                "IOS + Mobile App",
                "AI Agent",
                "Voicemail + Fax",
                "Real-Time Dashboard"
            ],
            highlighted: false
        },
        {
            name: "Professional",
            price: "$59",
            period: "/month/user",
            features: [
                "All Starter Features",
                "Unlimited US/Canada",
                "Call Recording",
                "Advanced Analytics",
                "Multi-Level IVR",
                "Ring Groups",
                "API Access",
                "Priority Support"
            ],
            highlighted: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "pricing",
            features: [
                "Unlimited Professional",
                "Custom Integration",
                "Dedicated Support 24/7",
                "SSO",
                "Advanced Security",
                "Custom Reports",
                "Onboarding"
            ],
            highlighted: false
        }
    ];

    return (
        <div className="min-h-screen relativ bg-black text-white overflow-hidden">
            <div className='container-main'>
                <div className="absolute left-[-480px] -top-50 w-150 h-150 bg-[rgba(184,110,159,0.69)] rounded-full mix-blend-normal filter blur-3xl opacity-40 animate-pulse"></div>
                <div className="absolute right-[-480px] -bottom-150 w-100 h-100 bg-[rgba(184,110,159,0.69)] rounded-full mix-blend-normal filter blur-3xl opacity-40 animate-pulse"></div>

                <Image
                    src={"/images/chaticon.png"}
                    width={500}
                    height={500}
                    alt={"Picture of the author"}
                    className="absolute -left-120 top-100"
                />


                {/* Header */}
                <Navbar />
            </div>

            {/* Hero Section */}
            <section className="max-w-6xl flex items-center mx-auto h-[700px] px-6 py-20 text-center relative z-10">
                {/* Decorative crystals */}
                <div className="relative z-10">
                    <div className='mb-[50px]'>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Welcome To Talka
                        </h1>
                        <p className='mb-8 text-[25px] font-medium'>แอบรวมเเชทจากหลายเเพตฟร์อม</p>
                    </div>
                    <p className="text-gray-300 max-w-6xl mx-auto mb-8 text-[14px]">
                        เปลี่ยนวิธีที่ธุรกิจของคุณสื่อสารกับลูกค้า ด้วยศูนย์รวมแชทอัจฉริยะที่นำทุกข้อความจากทุกแพลตฟอร์มมาอยู่ในอินบ็อกซ์เดียว พร้อม AI ช่วยตอบนอกเวลางาน ระบบติดแท็ก วิเคราะห์ลูกค้า และข้อมูลเชิงลึกที่ช่วยให้ทีมของคุณทำงานอย่างชาญฉลาดกว่าเดิม ไม่ว่าทีมจะใหญ่หรือเล็ก Scope จะช่วยทำให้ทุกบทสนทนากลายเป็นการบริการที่ราบรื่นและเป็นมืออาชีพ
                    </p>
                    <a href="/auth/register">
                        <button className="floating-btn-twinkle">
                            Get Started
                        </button>
                    </a>
                </div>
            </section>


            {/* Trusted By Section */}
            <section className="bg-white/5 backdrop-blur-sm py-8">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-center text-gray-400 mb-6">Trusted by Our Clients</p>
                    <div className="flex justify-center items-center gap-12 flex-wrap">
                        <span className="text-2xl font-semibold text-gray-300">Facebook</span>
                        <span className="text-2xl font-semibold text-gray-300">Line</span>
                        <span className="text-2xl font-semibold text-gray-300">Google</span>
                    </div>
                </div>
            </section>

            {/* Why Talka Section */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold text-center mb-16">
                    Why is Talka the best choice
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white/5 h-[350px] backdrop-blur-sm p-8 rounded-2xl hover:bg-white/10 transition border text-center border-white/10"
                        >
                            {/* ทำให้รูปอยู่ตรงกลาง */}
                            <div className="flex flex-col items-center justify-start">
                                <Image
                                    src={feature.img}
                                    width={150}
                                    height={150}
                                    alt={feature.title}
                                    className="mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </section>


            {/* Pricing Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold text-center mb-4">
                    Choose the package that's right for you
                </h2>
                <p className="text-center text-gray-400 mb-16">
                    Get the features you need at the price that fits your budget
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-8 pt-14 flex flex-col ${plan.highlighted
                                ? 'bg-white/5 border-2 border-[rgba(190,126,199,0.56)]'
                                : 'bg-white/5 border border-white/10'
                                }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[rgba(190,126,199)] text-white text-sm font-semibold py-2 px-6 rounded-full shadow-md">
                                    แนะนำ
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className="text-gray-400">{plan.period}</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* ใช้ mt-auto เพื่อดันปุ่มไปด้านล่าง และให้ flex-column ของ card จัดให้ปุ่มเท่ากัน */}
                            <button
                                className={`mt-auto w-full py-3 rounded-full font-semibold transition ${plan.highlighted
                                    ? 'bg-[rgba(190,126,199,0.56)] hover:bg-[rgba(190,126,199)]'
                                    : 'bg-white/10 hover:bg-white/20'
                                    }`}
                            >
                                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>


            {/* Footer */}
            <footer className="border-t border-white/10 py-8">
                <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
                    <p>© 2024 Talka. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
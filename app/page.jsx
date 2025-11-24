"use client";

import React from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import "@/app/assets/css/other.css";
import Navbar from './components/Navbar';
import DarkVeil from './components/Animetion/DarkVeil';
import LogoLoop from './components/Animetion/LogoLoop';
import AnimatedContent from './components/Animetion/AnimatedContent';
import SpotlightCard from './components/Animetion/SpotlightCard';
import TrueFocus from './components/Animetion/TrueFocus';

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

    const imageLogos = [
        { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
        { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
        { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
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

        <div className="min-h-screen relative bg-black text-white overflow-hidden">
            {/* ========= BACKGROUND LAYER ========= */}
            <div style={{ width: '100%', height: '600px', position: 'absolute' }}>
                <DarkVeil />
            </div>

            {/* ========= MAIN CONTENT LAYER ========= */}
            <div className="relative z-10">

                <div className="container-main">
                    <Navbar />
                </div>
                <AnimatedContent
                    distance={150}
                    direction="vertical"
                    reverse={false}
                    duration={1.2}
                    ease="power3.out"
                    initialOpacity={0.2}
                    animateOpacity
                    scale={1.1}
                    threshold={0.2}
                    delay={0.3}
                >
                    <section className="max-w-6xl flex items-center mx-auto h-[700px] px-6 py-20 text-center relative z-10">
                        <div className="relative z-10">
                            <div className='mb-[50px]'>
                                <TrueFocus
                                    sentence="Welcome to Talka"
                                    manualMode={false}
                                    blurAmount={2}
                                    borderColor="red"
                                    animationDuration={1}
                                    pauseBetweenAnimations={6}
                                />
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
                </AnimatedContent>
                {/* Hero Section */}

                {/* Trusted By Section */}
                <section className="bg-white/5 backdrop-blur-sm py-8">
                    <div className="max-w-6xl mx-auto px-6">
                        <p className="text-center text-gray-400 mb-6">Trusted by Our Clients</p>
                        <div className="flex justify-center items-center gap-12 flex-wrap">
                            <LogoLoop
                                logos={imageLogos}
                                speed={50}
                                direction="left"
                                logoHeight={48}
                                gap={40}
                                hoverSpeed={0}
                                scaleOnHover
                                fadeOut
                                ariaLabel="Technology partners"
                            />
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
                            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(190,126,199,0.56)">
                                <div
                                    key={index}
                                    className="bg-white/5 h-[350px] backdrop-blur-sm p-8 rounded-2xl hover:bg-white/10 transition border text-center border-white/10"
                                >
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
                            </SpotlightCard>

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
        </div>
    );
}

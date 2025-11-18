import Image from 'next/image';

export default function Navbar() {
    return (
        <header className='max-w-[1400px] mx-auto mt-3 bg-[rgba(32,41,59,0.25)] backdrop-blur-2xl border-[rgba(255,255,255,0.30)] border px-10  rounded-[40px] relative '>
            <nav className='flex justify-between items-center'>
                <div className="logo flex justify-between items-center">
                    <Image
                        src="/images/LogoNav.png"
                        width={70}
                        height={70}
                        alt="Picture of the author"
                    />
                    <p className='text-xl font-semibold'>Talka</p>
                </div>
                <div className="authen-btn flex items-center gap-8">
                    <div className="login-btn">
                        <a href="/auth/login"><button>Login</button></a>
                    </div>
                    <div className='getstart-btn'>
                        <a href="/auth/register" className='bg-[rgba(190,126,199,0.56)] px-5 py-3 rounded-4xl border border-[rgba(255,255,255,0.30)]'><button>Start Free Trial</button></a>
                    </div>
                </div>
            </nav>
        </header>
    )
}
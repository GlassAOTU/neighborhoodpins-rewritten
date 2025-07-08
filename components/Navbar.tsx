import { auth0 } from "@/lib/auth0";
import Link from "next/link";
import Branding from "./Branding";

export default async function Navbar() {

    const session = await auth0.getSession();

    return (
        <nav className="text-white bg-emerald-800 px-5 py-3">
            <div className="flex flex-row justify-between">

                <Branding />

                <div className="flex flex-row sm:gap-8 gap-4">

                    <Link href='/' className='text-glow flex flex-col items-center drop-shadow-black hover:drop-shadow-black hover:drop-shadow-md drop-shadow-sm/50 hover:scale-110 transition-all'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" /><path d="M15 5.764v15" /><path d="M9 3.236v15" /></svg>
                        <p className='text-xs sm:text-sm '>Map</p>
                    </Link>

                    <Link href='/reports' className='text-glow flex flex-col items-center drop-shadow-black hover:drop-shadow-black hover:drop-shadow-md drop-shadow-sm/50 hover:scale-110 transition-all'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 12h8" /><path d="M13 18h8" /><path d="M13 6h8" /><path d="M3 12h1" /><path d="M3 18h1" /><path d="M3 6h1" /><path d="M8 12h1" /><path d="M8 18h1" /><path d="M8 6h1" /></svg>
                        <p className='text-xs sm:text-sm'>Reports</p>
                    </Link>

                    <Link href='/resources' className='text-glow flex flex-col items-center drop-shadow-black hover:drop-shadow-black hover:drop-shadow-md drop-shadow-sm/50 hover:scale-110 transition-all'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7v14" /><path d="M16 12h2" /><path d="M16 8h2" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /><path d="M6 12h2" /><path d="M6 8h2" /></svg>
                        <p className='text-xs sm:text-sm'>Resources</p>
                    </Link>

                    <Link href='/' className='text-glow flex flex-col items-center drop-shadow-black hover:drop-shadow-black hover:drop-shadow-md drop-shadow-sm/50 hover:scale-110 transition-all'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                        <p className='text-xs sm:text-sm'>About</p>
                    </Link>

                    {session ?
                        <Link href='/auth/logout' className='text-glow flex flex-col items-center drop-shadow-black hover:drop-shadow-black hover:drop-shadow-md drop-shadow-sm/50 hover:scale-110 transition-all'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                            <p className='text-xs sm:text-sm'>Account</p>
                        </Link> :
                        <Link href='/auth/login' className='text-glow flex flex-col items-center drop-shadow-black hover:drop-shadow-black hover:drop-shadow-md drop-shadow-sm/50 hover:scale-110 transition-all'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10 17 5-5-5-5" /><path d="M15 12H3" /><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /></svg>
                            <p className='text-xs sm:text-sm'>Login</p>
                        </Link>}

                </div>
            </div>
        </nav>
    )
}
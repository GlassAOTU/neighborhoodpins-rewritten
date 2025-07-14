
// app/account/page.tsx
import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import UserPinsTable from '@/components/UserPinsTable'
import Link from 'next/link';
import Accordion from '@/components/Accordion';

export default async function AccountPage() {
    const session = await auth0.getSession();

    if (!session || !session.user) {
        redirect('/api/auth/login');
    }

    return (
        <main className="min-h-screen bg-stone-100 px-4 py-10">
            <section className="max-w-4xl mx-auto flex flex-col gap-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-stone-800">Your Account</h1>

                <div className=''>
                    <h2 className='text-2xl pb-4'>Your Submitted Pins</h2>
                    <UserPinsTable />
                </div>

                {/* </div> */}
                <section className="">
                    {/* <h2 className="text-2xl pb-4">Actions</h2> */}

                    <div className="bg-white rounded-lg shadow-md p-6 space-y-8 ">
                        <article>
                            <p className="mb-2 text-stone-700 text-xl">All done?</p>
                            <Link
                                href="/auth/logout"
                                className="inline-block py-2 px-4 bg-gradient-to-b from-stone-50 to-stone-100 rounded-lg border border-stone-300 transition-all text-stone-800 shadow-sm hover:brightness-95"
                            >
                                Log Out
                            </Link>
                        </article>


                        {/* reenable after figuring out how to delete account */}
                        {/* <Accordion title='Delete your account and data?'>
                            <Accordion title='Are you sure?'>
                                <div>
                                    <Link
                                        href="/api/delete-account" // fix: don’t reuse logout route!
                                        className="inline-block py-2 px-4 bg-gradient-to-b from-red-600 to-red-800 rounded-lg border border-red-900 text-white shadow-md hover:brightness-110 transition-all"
                                    >
                                        Delete Account
                                    </Link>

                                </div>
                            </Accordion>
                        </Accordion> */}

                    </div>
                </section>
            </section>
        </main>
    );
}


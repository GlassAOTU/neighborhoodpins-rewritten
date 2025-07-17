export default function About() {
    return (
        <main className="min-h-screen bg-stone-100 px-4 py-10">
            <section className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    About
                </h1>

                <div className="bg-white rounded-xl shadow-md p-8 space-y-8">

                    <section>
                        <h2 className="text-2xl">What is this?</h2>
                        <p>
                            NeighborhoodPins is a community-driven tool for reporting and tracking neighborhood issues like potholes, broken signs, and trash pileups.
                            Instead of waiting on the towns, locals can pin and share problems in seconds.
                            This was highly inspired by the way Waze will show crashes on your drive.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl">What did I learn?</h2>
                        <p>
                            The stack I used is Next.js, Auth0, and Neon PostgreSQL.
                            This site is a remake of one I made at the end of college, with a completely different stack that failed me after some time.
                            Everything from auth to database was handled for me, so this time I wanted to do everything myself.
                            I've only ever used traditional SQL, so learning PostresSQL felt very natural and was very easy.
                            Building it all myself gave me a much deeper understanding of how all the parts of this moving engine work together.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl">What I did</h2>
                        <p>
                            I designed and built the site from the ground up. Creating an interactive map used for this kind of user reporting was one of the most challenging parts, especially getting it to look well across devices.
                            Working with external APIs and learning how they interact with the frontend taught me a lot about handling async data, rate limits, and user experience trade-offs.
                            Designing the backend, especially the database schema, was the most fun part. I focused on keeping things efficient, scalable, and easy to query, even as more pins and users are added.
                            I also handled authentication, user sessions, basic access control, and error handling across the stack.
                        </p>
                    </section>

                    <section>

                        <h2 className="text-2xl">Have any questions or feedback?</h2>
                        <p>
                            If you have any questions about the project or want to get in touch, feel free to reach out:
                        </p>

                        <div className="flex flex-col gap-6 pt-4 text-emerald-800 md:flex-row md:gap-12">
                            <a href="mailto:abakhandev@gmail.com" target="_blank" className="flex flex-row gap-4 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 49.4 512 399.42"><g fill="none" fillRule="evenodd"><g fillRule="nonzero"><path fill="#4285f4" d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z" /><path fill="#34a853" d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z" /><path fill="#fbbc04" d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z" /></g><path fill="#ea4335" d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z" /><path fill="#c5221f" fillRule="nonzero" d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z" /></g></svg>
                                Email
                            </a>

                            <a href="https://www.linkedin.com/in/abaseen-khan/" target="_blank" className="flex flex-row gap-4 items-center">
                                <svg width="36" height="36" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256"><path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="#0A66C2" /></svg>
                                Linkedin
                            </a>

                            <a href="https://github.com/GlassAOTU" target="_blank" className="flex flex-row gap-4 items-center">
                                <svg width="36" height="36" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#0d1117" /></svg>
                                GitHub
                            </a>

                            <a href="https://x.com/aotudev" target="_blank" className="flex flex-row gap-4 items-center">
                                <svg viewBox="0 0 256 209" width="36" height="36" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45" fill="#55acee" /></svg>
                                Twitter
                            </a>
                        </div>
                        
                    </section>
                </div>

            </section>
        </main>

    )
}
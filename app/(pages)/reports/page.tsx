import ReportsTable from "@/components/ReportsTable";

export default function Reports() {
    return (
        <main className="min-h-screen bg-stone-100 px-4 py-10">
            <section className="max-w-4xl mx-auto flex flex-col gap-8">
                <div>
                <h1 className="text-3xl font-bold text-center mb-8 text-stone-800">All Reported Issues</h1>
                <ReportsTable />
                </div>
            </section>
        </main>
    )
}
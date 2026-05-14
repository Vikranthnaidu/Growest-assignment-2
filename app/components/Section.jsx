export default function Section() {
    return (
        <div className="flex flex-row bg-black text-white items-center justify-start pl-[120px]">
            <div className="justify-between flex flex-row items-center gap-20">
                <img className="w-[450px] h-[450px]"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhkm2FzKHky2n0m9_N1nBaXr2mRqJGu9stcQ&s"
                />
                <div className="flex flex-col gap-7 w-[700px]">
                    <h1 className="text-5xl font-bold">Why KFintech?</h1>
                    <p className="text-blue-400 text-3xl font-bold">Secure Hyperscale Platform</p>
                    <p className="text-gray-500 text-[20px]">KFintech’s asset management platforms are the leading investor and Issuer servicing platforms. Our platforms are highly resilient, secure and scalable even as they are built on mobile-first micro services 
                        architecture driven and cloud-ready frameworks.
                         KFintech has country specific platforms for asset classes of Mutual Funds, 
                         ETFs, Alternatives and Pensions for investor servicing & equities and bonds for issuer servicing. KFintech platforms and data are hosted in Tier IV data centers.</p>
                </div>
            </div>
        </div>
    )
}
export default function Landing() {
    return (
        <div className="text-white min-h-screen min-w-screen flex flex-col">
            <div className="flex flex-col lg:flex-row h-auto lg:h-[80vh] w-screen">
                {/* Left Section */}
                <div className="w-full lg:w-[45vw] h-auto lg:h-full flex flex-col items-center justify-center text-[#4F4242] league-spartan p-6">
                    <div className="text-left space-y-4 lg:space-y-6" style={{ lineHeight: "1", letterSpacing: '.3' }}>
                        <p className="text-[4em] sm:text-[6em] md:text-[8em] lg:text-[10em] xl:text-[14em] font-extrabold">ACM</p>
                        <p className="text-[4em] sm:text-[6em] md:text-[8em] lg:text-[10em] xl:text-[14em] font-extrabold">MITS.</p>
                        <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl">Connecting Technologies.</p>
                    </div>
                </div>

                {/* Right Section */}
                <div
                    className="w-full lg:w-[55vw] h-[50vh] lg:h-full relative"
                    style={{
                        clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        position: "relative",
                    }}
                >
                    <img
                        src="/college-drone.webp"
                        alt="landing"
                        className="object-cover h-full w-full"
                        style={{
                            maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1%, rgba(0, 0, 0, 1) 10%)",
                            WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1%, rgba(0, 0, 0, 1) 10%)",
                        }}
                    />
                </div>
            </div>

            <div className="w-[70vw] h-1 border-b-2 border-gray-500  self-center m-10"   />

            {/* About Section */}
            <div className="flex flex-col items-center justify-center text-[#4F4242] league-spartan p-6">
                <div className="text-center space-y-4 lg:space-y-6" style={{ lineHeight: "1", letterSpacing: '.3' }}>
                    <p className="text-[5em] font-extrabold">About</p>
                    <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl">ACM MITS is a student chapter of the Association for Computing Machinery, MITS.</p>
                </div>
            </div>
            


                        
        </div>
    );
}

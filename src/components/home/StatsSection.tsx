import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const STATS = [
    { value: 15, suffix: "+", label: "Years Experience" },
    { value: 50, suffix: "+", label: "Countries Exported" },
    { value: 10, suffix: "M+", label: "Gloves Annually" },
    { value: 500, suffix: "+", label: "Global Clients" },
];

function CountUp({ end, duration, suffix }: { end: number; duration: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTime: number;
                    let animationFrame: number;

                    const animate = (timestamp: number) => {
                        if (!startTime) startTime = timestamp;
                        const progress = timestamp - startTime;
                        const percentage = Math.min(progress / (duration * 1000), 1);
                        const easeOut = 1 - Math.pow(1 - percentage, 4);
                        setCount(Math.floor(easeOut * end));
                        if (progress < duration * 1000) {
                            animationFrame = requestAnimationFrame(animate);
                        }
                    };

                    animationFrame = requestAnimationFrame(animate);
                    return () => cancelAnimationFrame(animationFrame);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);

    return (
        <div ref={ref} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-none">
            {count}<span className="text-[#E0323C]">{suffix}</span>
        </div>
    );
}

export function StatsSection() {
    return (
        <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2000')`,
                }}
            />
            <div className="absolute inset-0 bg-[#212529]/90" />
            {/* Decorative blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E0323C]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container-wide relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
                    {STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="flex flex-col items-center gap-2 sm:gap-3 text-center"
                        >
                            <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                            <div className="w-8 sm:w-10 h-[2px] bg-[#E0323C] rounded-full" />
                            <div className="text-xs sm:text-sm font-sans font-medium text-white/60 tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

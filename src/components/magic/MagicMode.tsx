import { useEffect, useRef } from 'react';
import { useMagic } from '../../context/MagicContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function MagicMode() {
    const { isMagicMode } = useMagic();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const lastMousePos = useRef({ x: 0, y: 0 });
    const currentSpeed = useRef(25);

    // Track mouse for interactive effects
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Starfield & Particle Effect
    useEffect(() => {
        if (!isMagicMode || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number; pz: number; color: string }[] = [];
        let particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Terrazul Brand Colors (Blue, White, Navy)
        const colors = ['#1119B4', '#ffffff', '#0E1B4D', '#4A52FF'];

        const initStars = () => {
            stars = [];
            for (let i = 0; i < 2000; i++) {
                stars.push({
                    x: Math.random() * canvas.width - canvas.width / 2,
                    y: Math.random() * canvas.height - canvas.height / 2,
                    z: Math.random() * canvas.width,
                    pz: Math.random() * canvas.width,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        };

        const update = () => {
            if (!ctx) return;

            // Clear with trail effect - Deep Navy Background
            ctx.fillStyle = 'rgba(2, 4, 20, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Calculate speed based on mouse movement
            const dx = mousePos.current.x - lastMousePos.current.x;
            const dy = mousePos.current.y - lastMousePos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Update last pos
            lastMousePos.current = { ...mousePos.current };

            // Smoothly interpolate speed (Base 25 + boost from movement)
            const targetSpeed = 5 + (dist * 0.7);
            currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.05;

            const speed = currentSpeed.current;

            // Update Stars
            stars.forEach(star => {
                star.z -= speed;

                if (star.z <= 0) {
                    star.x = Math.random() * canvas.width - canvas.width / 2;
                    star.y = Math.random() * canvas.height - canvas.height / 2;
                    star.z = canvas.width;
                    star.pz = canvas.width;
                }

                const x = (star.x / star.z) * canvas.width + cx;
                const y = (star.y / star.z) * canvas.height + cy;

                const px = (star.x / star.pz) * canvas.width + cx;
                const py = (star.y / star.pz) * canvas.height + cy;

                star.pz = star.z;

                // Draw Star Trail
                const size = (1 - star.z / canvas.width) * 3;

                ctx.beginPath();
                ctx.strokeStyle = star.color;
                ctx.lineWidth = size;
                ctx.moveTo(px, py);
                ctx.lineTo(x, y);
                ctx.stroke();
            });

            // Mouse Particles - Sparse & Chaotic (Only on move)
            if (dist > 2 && Math.random() > 0.5) {
                particles.push({
                    x: mousePos.current.x + (Math.random() - 0.5) * 50,
                    y: mousePos.current.y + (Math.random() - 0.5) * 50,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    life: 0.5 + Math.random(),
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }

            // Update Particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }

            animationFrameId = requestAnimationFrame(update);
        };

        resizeCanvas();
        initStars();
        update();
        window.addEventListener('resize', resizeCanvas);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [isMagicMode]);

    // Global Style Override - Brand Colors
    useEffect(() => {
        if (!isMagicMode) return;

        // Apply Magic Styles
        document.body.style.setProperty('--bg-light', '#020415'); // Deep Navy
        document.body.style.setProperty('--text-black', '#ffffff'); // White text
        document.body.style.setProperty('--text-heading', '#ffffff'); // White headings
        document.body.style.setProperty('--primary-blue', '#1119B4'); // Brand Blue

        // Add a glow to buttons
        const style = document.createElement('style');
        style.id = 'magic-styles';
        style.innerHTML = `
            .btn-primary { 
                box-shadow: 0 0 15px #1119B4 !important; 
                border: 1px solid #fff !important;
                background-color: #1119B4 !important;
            }
            .product-card {
                background: rgba(17, 25, 180, 0.1) !important;
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255,255,255,0.2);
            }
        `;
        document.head.appendChild(style);

        // Cleanup function
        return () => {
            document.body.style.removeProperty('--bg-light');
            document.body.style.removeProperty('--text-black');
            document.body.style.removeProperty('--text-heading');
            document.body.style.removeProperty('--primary-blue');

            style.remove();
        };
    }, [isMagicMode]);

    return (
        <AnimatePresence>
            {isMagicMode && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: -1, // Behind everything
                        pointerEvents: 'none',
                        background: '#020415'
                    }}
                >
                    <canvas
                        ref={canvasRef}
                        style={{ display: 'block', width: '100%', height: '100%' }}
                    />

                    {/* Floating Elements - More Chaotic */}
                    <FloatingElement emoji="☕" delay={0} x="10%" duration={12} />
                    <FloatingElement emoji="✨" delay={2} x="80%" duration={15} />
                    <FloatingElement emoji="🪐" delay={4} x="20%" duration={18} />
                    <FloatingElement emoji="🚀" delay={1} x="70%" duration={10} />
                    <FloatingElement emoji="☄️" delay={3} x="40%" duration={14} />
                    <FloatingElement emoji="👾" delay={5} x="60%" duration={16} />
                    <FloatingElement emoji="🛸" delay={0.5} x="90%" duration={11} />
                    <FloatingElement emoji="⭐" delay={2.5} x="30%" duration={13} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const FloatingElement = ({ emoji, delay, x, duration }: { emoji: string, delay: number, x: string, duration: number }) => (
    <motion.div
        initial={{ y: '110vh', rotate: 0, scale: 0.5 }}
        animate={{
            y: '-10vh',
            rotate: 720,
            scale: [0.5, 1.2, 0.5],
            x: [0, 100, -100, 0]
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "linear"
        }}
        style={{
            position: 'absolute',
            left: x,
            fontSize: '3rem',
            filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.8))'
        }}
    >
        {emoji}
    </motion.div>
);

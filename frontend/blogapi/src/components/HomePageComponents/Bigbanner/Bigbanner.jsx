import React, { Suspense, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { MotionConfig, motion, useMotionValue } from "framer-motion";
import { Shapes } from "../shape/Shapes";
import { transition } from "../shape/setting";
import { useMeasure } from "react-use";
import { useSmoothTransform } from "../shape/use-smooth-transform"; // Add import
import "./Shapes.css";

const backgroundImage =
    'https://static.vecteezy.com/system/resources/previews/008/333/248/non_2x/cooking-spices-isolated-on-white-background-cook-recipe-free-photo.jpg';

const divStyle = {
    background: `url(${backgroundImage}) center / cover`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    minHeight: '50vh', // Ensure the div covers the entire viewport height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

export default function ProductHero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const resetMousePosition = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <div style={divStyle}>
            <img
                style={{ display: 'none' }}
                src={backgroundImage}
                alt="increase priority"
            />

            <Link to="/Register" style={{ textDecoration: 'none' }}>
                <RegisterButton
                    mouseX={mouseX}
                    mouseY={mouseY}
                    resetMousePosition={resetMousePosition}
                />
            </Link>
            <Typography variant="body2" color="inherit" style={{ marginTop: '2rem' }}>
                Discover the experience
            </Typography>
        </div>
    );
}

function RegisterButton({ mouseX, mouseY, resetMousePosition }) {
    const [isHover, setIsHover] = useState(false);
    const [isPress, setIsPress] = useState(false);
    const { ref, bounds } = useMeasure();
    
    const cameraX = useSmoothTransform(mouseX, spring, (x) => x / 350);
    const cameraY = useSmoothTransform(mouseY, spring, (y) => (-1 * y) / 350);

    return (
        <div ref={ref}>
            <MotionConfig transition={transition}>
                <motion.button
                    className="button1"
                    initial={false}
                    animate={isHover ? "hover" : "rest"}
                    whileTap="press"
                    variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.5 },
                        press: { scale: 1.4 }
                    }}
                    onHoverStart={() => {
                        resetMousePosition();
                        setIsHover(true);
                    }}
                    onHoverEnd={() => {
                        resetMousePosition();
                        setIsHover(false);
                    }}
                    onTapStart={() => setIsPress(true)}
                    onTap={() => setIsPress(false)}
                    onTapCancel={() => setIsPress(false)}
                    onPointerMove={(e) => {
                        // mouseX.set(e.clientX - bounds.x - bounds.width / 2);
                        // mouseY.set(e.clientY - bounds.y - bounds.height / 2);
                        mouseX.set(e.clientX - e.target.getBoundingClientRect().x - e.target.getBoundingClientRect().width / 2);
                        mouseY.set(e.clientY - e.target.getBoundingClientRect().y - e.target.getBoundingClientRect().height / 2);
                    }}
                >
                    <motion.div
                        className="shapes"
                        variants={{
                            rest: { opacity: 0 },
                            hover: { opacity: 1 }
                        }}
                    >
                        <div className="pink blush" />
                        <div className="blue blush" />
                        <div className="container">
                            <Suspense fallback={null}>
                                <Shapes
                                    isHover={isHover}
                                    isPress={isPress}
                                    mouseX={mouseX}
                                    mouseY={mouseY}
                                />
                            </Suspense>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={{ hover: { scale: 0.55 }, press: { scale: 1.1 } }}
                        className="label"
                    >
                        Register
                    </motion.div>
                </motion.button>
            </MotionConfig>
        </div>
    );
}

const spring = { stiffness: 600, damping: 30 };

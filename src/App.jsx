import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useMouseAnimation } from "./hooks/useMouseAnimation";
import { useMousePosition } from "./hooks/useMousePosition";
import { mouseEvents } from "./utils/animations";

import Homepage from "./pages/Homepage";
import Projects from "./pages/Projects";
import nightSvg from "../public/assets/night.svg";
import lightSvg from "../public/assets/brightness.svg";
import Contact from "./pages/Contact";
import { useDarkMode } from "./contexts/DarkModeContexte";

function App() {
    const location = useLocation();
    const { darkMode, handleDarkMode } = useDarkMode();
    const { mouseAnim, updateMouseAnim } = useMouseAnimation();
    const [x, y] = useMousePosition();

    const animMouse = (variants) => {
        return {
            initial: "initial",
            animate: mouseAnim,
            variants,
        };
    };

    const mouseMove = {
        out: {
            left: x - 37 / 2 + "px",
            top: y - 37 / 2 + "px",
            backgroundColor: darkMode ? "#FEFAE0" : "#0D0701",
            transition: {
                type: "tween",
                duration: 0,
            },
        },
        in: {
            left: x - 100 / 2 + "px",
            top: y - 100 / 2 + "px",
            opacity: 1,
            width: "100px",
            height: "100px",
            backgroundColor: "#FEFAE0",
            mixBlendMode: "difference",
            transition: {
                duration: 0.3,
                ease: "backOut",
            },
        },
    };

    return (
        <div className={`${darkMode && "dark"}`}>
            <motion.div
                {...animMouse(mouseMove)}
                className={`pointer-events-none fixed left-0 top-0 z-50 h-[37px] w-[37px] rounded-full bg-black dark:bg-white`}
            />
            <div
                onClick={handleDarkMode}
                {...mouseEvents(updateMouseAnim)}
                className="fixed bottom-15 left-10 z-30 flex h-40 w-40 cursor-pointer items-center justify-center rounded-full bg-black dark:bg-white"
            >
                <img
                    src={`${darkMode ? lightSvg : nightSvg}`}
                    alt="mode"
                    className="h-auto w-20 cursor-pointer"
                />
            </div>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        index
                        path="/"
                        element={<Homepage updateMouseAnim={updateMouseAnim} />}
                    />
                    <Route
                        path="projects"
                        element={<Projects updateMouseAnim={updateMouseAnim} />}
                    />
                    <Route
                        path="contact"
                        element={<Contact updateMouseAnim={updateMouseAnim} />}
                    />
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;

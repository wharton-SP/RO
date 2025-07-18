// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const animations = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
};

const AnimatedPage = ({ children }) => {
    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;

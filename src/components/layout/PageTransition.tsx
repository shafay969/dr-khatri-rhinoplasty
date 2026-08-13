import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  keyProp: string;
}

const variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function PageTransition({ children, keyProp }: PageTransitionProps) {
  return (
    <motion.div
      key={keyProp}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: 'spring', bounce: 0, duration: 0.45 }}
      className="page-transition-wrapper"
    >
      {children}
    </motion.div>
  );
}

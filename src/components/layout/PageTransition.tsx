import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  keyProp: string;
}

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function PageTransition({ children, keyProp }: PageTransitionProps) {
  return (
    <motion.div
      key={keyProp}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="page-transition-wrapper"
    >
      {children}
    </motion.div>
  );
}

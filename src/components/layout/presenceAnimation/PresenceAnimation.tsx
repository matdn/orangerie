import React from 'react';
import { motion } from "framer-motion";

const PresenceAnimation = (props: React.PropsWithChildren) => {
  return (
    <motion.div
      className="box h-screen w-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: "1"
      }}
    >
      {props.children}
    </motion.div>
  )
}

export default PresenceAnimation;

import React from "react";
import { motion } from "framer-motion";

import Popular from "../components/Popular";
import Korean from "../components/Korean";

function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Popular />
      <Korean />
    </motion.div>
  );
}

export default Home;

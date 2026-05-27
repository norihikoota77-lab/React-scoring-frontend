import { motion } from "framer-motion";

export default function ResultMessage({
  rank,
  message,
}) {

  const rankStyles = {

    S: "from-yellow-400 to-orange-500",

    A: "from-blue-400 to-cyan-400",

    B: "from-purple-400 to-pink-400",

    C: "from-slate-400 to-slate-600",

  };

  return (

    <motion.div

      initial={{
        opacity: 0,
        scale: 0.9,
      }}

      animate={{
        opacity: 1,
        scale: 1,
      }}

      transition={{
        duration: 0.5,
      }}

      className={`
        mt-8
        rounded-3xl
        p-8
        text-center
        shadow-2xl
        bg-gradient-to-r
        ${rankStyles[rank] || "from-red-500 to-pink-500"}
      `}
    >

      <p className="text-lg font-bold mb-2 text-white/80">

        RANK {rank}

      </p>

      <h2 className="text-4xl font-extrabold text-white mb-4">

        {rank}

      </h2>

      <p className="text-xl font-bold text-white">

        {message}

      </p>

    </motion.div>

  );
}
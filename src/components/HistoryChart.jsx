import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function HistoryChart({
  histories,
}) {

  const chartData = [...histories]
    .reverse()
    .map((history, index) => ({

      name: index + 1,

      percentage: Number(
        history.percentage
      ),

    }));

  const average = (

    chartData.reduce(
      (sum, item) =>
        sum + item.percentage,
      0
    ) / chartData.length

  ).toFixed(1);


  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="

      bg-white/10
      border
      border-white/20
      rounded-3xl
      p-6
      backdrop-blur-lg
      mb-10
    ">

      <h2 className="text-3xl font-bold mb-6">

        正答率推移

      </h2>

      <div className="h-[300px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={chartData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <ReferenceLine
              y={average}
              stroke="#22c55e"
              strokeDasharray="5 5"
              label={`平均 ${average}%`}
            />

            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#f43f5e"
              strokeWidth={4}
              isAnimationActive={true}
              animationDuration={2000}
              animationEasing="ease-out"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </motion.div>

  );
}
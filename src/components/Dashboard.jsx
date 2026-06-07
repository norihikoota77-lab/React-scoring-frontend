import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#4ade80", "#f87171"];

export default function Dashboard({ histories }) {

  if (!histories || histories.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-center text-slate-300">
        <p className="text-2xl mb-2">📊</p>
        <p>採点履歴がありません</p>
      </div>
    );
  }

  // ============================================================
  // 集計データ
  // ============================================================

  const totalCount = histories.length;
  const avgPercentage = (
    histories.reduce((sum, h) => sum + Number(h.percentage), 0) / totalCount
  ).toFixed(1);
  const passCount = histories.filter((h) => h.rank === "S" || h.rank === "A").length;
  const passRate = ((passCount / totalCount) * 100).toFixed(1);
  const uniqueUsers = new Set(histories.map((h) => h.user_name)).size;

  // ============================================================
  // 受験者ごとの平均正答率
  // ============================================================
  const userMap = {};
  histories.forEach((h) => {
    if (!userMap[h.user_name]) userMap[h.user_name] = [];
    userMap[h.user_name].push(Number(h.percentage));
  });
  const userChartData = Object.entries(userMap).map(([name, scores]) => ({
    name,
    平均正答率: Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)),
  }));

  // ============================================================
  // 試験ごとの平均点
  // ============================================================
  const examMap = {};
  histories.forEach((h) => {
    if (!examMap[h.exam_title]) examMap[h.exam_title] = [];
    examMap[h.exam_title].push(Number(h.percentage));
  });
  const examChartData = Object.entries(examMap).map(([title, scores]) => ({
    name: title.length > 10 ? title.slice(0, 10) + "…" : title,
    平均正答率: Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)),
  }));

  // ============================================================
  // 合格・不合格の割合（ランクA以上を合格とする）
  // ============================================================
  const pieData = [
    { name: "合格（A以上）", value: passCount },
    { name: "不合格", value: totalCount - passCount },
  ];

  // ============================================================
  // ランク分布
  // ============================================================
  const rankMap = { S: 0, A: 0, B: 0, C: 0 };
  histories.forEach((h) => {
    if (rankMap[h.rank] !== undefined) rankMap[h.rank]++;
  });
  const rankChartData = Object.entries(rankMap).map(([rank, count]) => ({
    name: rank,
    count,
  }));
  const rankColors = { S: "#F1C40F", A: "#4ade80", B: "#60a5fa", C: "#f87171" };

  return (
    <div className="space-y-6">

      {/* ============================================================
          集計カード
      ============================================================ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "総採点回数", value: totalCount, icon: "📋" },
          { label: "受験者数", value: uniqueUsers, icon: "👤" },
          { label: "平均正答率", value: `${avgPercentage}%`, icon: "📊" },
          { label: "合格率", value: `${passRate}%`, icon: "✅" },
        ].map(({ label, value, icon }) => (
          <div
            key={label}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-center shadow-xl"
          >
            <p className="text-2xl mb-1">{icon}</p>
            <p className="text-slate-300 text-xs mb-1">{label}</p>
            <p className="text-2xl font-extrabold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* ============================================================
          受験者ごとの平均正答率
      ============================================================ */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
        <h3 className="text-xl font-bold mb-4">👤 受験者ごとの平均正答率</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userChartData}>
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="平均正答率" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ============================================================
          試験ごとの平均点
      ============================================================ */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
        <h3 className="text-xl font-bold mb-4">📝 試験ごとの平均正答率</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={examChartData}>
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="平均正答率" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ============================================================
          合格・不合格の割合 ＋ ランク分布
      ============================================================ */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* 合格・不合格 */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-xl font-bold mb-4">✅ 合格・不合格の割合</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                />
                <Legend wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ランク分布 */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-xl font-bold mb-4">🏆 ランク分布</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rankChartData}>
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 14 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {rankChartData.map((entry) => (
                    <Cell key={entry.name} fill={rankColors[entry.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
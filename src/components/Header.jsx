export default function Header() {
  return (
    <header className="bg-white/10 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold text-xl shadow">
            🐎 KS
          </div>

          <div>
            <h1 className="text-2xl font-extrabold">
              競馬スコアラー
            </h1>

            <p className="text-sm text-slate-500">
              React × Django 採点システム
            </p>
          </div>

        </div>

        <div className="text-sm text-slate-400 hidden md:block">
          Scoring System
        </div>

      </div>
    </header>
  );
}
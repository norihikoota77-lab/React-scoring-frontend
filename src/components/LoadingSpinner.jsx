export default function LoadingSpinner() {

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[340px] text-center">

        {/* SPINNER */}

        <div className="flex justify-center mb-6">

          <div className="w-20 h-20 border-8 border-red-200 border-t-red-600 rounded-full animate-spin"></div>

        </div>

        {/* TITLE */}

        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">

          採点中...

        </h2>

        {/* SUB */}

        <p className="text-slate-500 leading-relaxed">

          AI騎手が全レースを解析しています

        </p>

      </div>

    </div>

  );
}
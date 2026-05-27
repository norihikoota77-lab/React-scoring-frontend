import { useState } from "react";

export default function UploadForm() {

  const [correctFile, setCorrectFile] = useState(null);
  const [userFile, setUserFile] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("correct_file", correctFile);
    formData.append("user_file", userFile);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/score/",
        {
          method: "POST",
          body: formData,
        }
      );

      // const text = await response.text();

      // console.log(text);

      const data = await response.json(); 

      console.log(data);

      alert("送信成功");

    } catch (error) {

      console.error(error);

      alert("エラー");

    }
  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-xl"
      >

        <h1 className="text-3xl font-bold mb-8">
          🐎 競馬スコアラー
        </h1>

        <div className="mb-6">

          <label className="block font-bold mb-2">
            正解マスタ
          </label>

          <input
            type="file"
            onChange={(e) => setCorrectFile(e.target.files[0])}
            className="w-full border p-3 rounded-xl"
          />

        </div>

        <div className="mb-8">

          <label className="block font-bold mb-2">
            ユーザー解答
          </label>

          <input
            type="file"
            onChange={(e) => setUserFile(e.target.files[0])}
            className="w-full border p-3 rounded-xl"
          />

        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-bold"
        >
          採点スタート
        </button>

      </form>

    </div>
  );
}
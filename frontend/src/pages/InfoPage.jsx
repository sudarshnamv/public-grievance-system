function InfoPage({ title, description }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-sm p-10 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-green-900 mb-4">
          {title}
        </h1>

        <p className="text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}

export default InfoPage;
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white border border-slate-100 rounded-3xl p-8 max-w-sm text-center shadow-md">
        <div className="mx-auto h-12 w-12 bg-slate-900 rounded-xl flex items-center justify-center text-amber-500 font-black text-xl shadow mb-4">
          404
        </div>
        <h1 className="font-extrabold text-slate-900 text-lg mb-2">Page not found</h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          The page you are looking for does not exist or was moved.
        </p>
        <Link
          to="/"
          className="block w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

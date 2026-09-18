import PropTypes from 'prop-types';

export default function EmptyState({ icon, title, message, action }) {
  return (
    <div className="bg-white border-2 border-dashed border-slate-300/80 rounded-3xl p-12 shadow-sm text-center flex flex-col items-center justify-center min-h-[280px] select-none">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-6 text-2xl">
        {icon || '📦'}
      </div>
      <h3 className="font-extrabold text-slate-900 text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm max-w-md leading-relaxed mb-6">{message}</p>
      {action}
    </div>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  action: PropTypes.node,
};

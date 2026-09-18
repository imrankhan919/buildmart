import PropTypes from 'prop-types';

export default function StatCard({ title, value, icon, desc }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 transition-shadow duration-200 hover:shadow-md">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-slate-400">{title}</span>
        <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg">{icon}</div>
      </div>
      <div>
        <div className="text-2xl font-black text-slate-900">{value}</div>
        <span className="text-[10px] font-semibold text-slate-400 mt-0.5 block">{desc}</span>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node,
  desc: PropTypes.string,
};

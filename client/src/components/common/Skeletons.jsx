import PropTypes from 'prop-types';

export function CardSkeleton({ lines = 3 }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm p-4 space-y-4 animate-pulse" aria-hidden="true">
      <div className="bg-slate-200 aspect-[4/3] rounded-xl" />
      <div className="h-4 bg-slate-200 rounded w-1/3" />
      <div className="h-6 bg-slate-200 rounded w-3/4" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-slate-200 rounded w-1/2" />
      ))}
      <div className="h-10 bg-slate-200 rounded-xl" />
    </div>
  );
}

CardSkeleton.propTypes = {
  lines: PropTypes.number,
};

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

GridSkeleton.propTypes = {
  count: PropTypes.number,
};

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3 animate-pulse" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 bg-slate-100 rounded-xl" />
      ))}
    </div>
  );
}

TableSkeleton.propTypes = {
  rows: PropTypes.number,
};

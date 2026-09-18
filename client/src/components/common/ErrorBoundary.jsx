import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch() {
    // Intentionally minimal: avoid leaking details to console in production.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-slate-50 min-h-[60vh] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 max-w-sm text-center shadow-md">
            <div className="text-3xl mb-4">⚠️</div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">Something went wrong</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              This section failed to load. Please try again or go back home.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                Reload
              </button>
              <Link
                to="/"
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 rounded-xl text-sm transition-colors text-center"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

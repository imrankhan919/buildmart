import { useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { Check, X } from 'lucide-react';
import { updateCredits } from '../../services/adminService';
import { useToast, getErrorMessage } from '../common/Toast.jsx';
import Loader from '../common/Loader';

const TransactionList = ({ credits }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => updateCredits(payload),
    onSuccess: () => {
      toast.success('Credit request updated.');
      queryClient.invalidateQueries({ queryKey: ['admin-overview'] });
    },
    onError: (err) => toast.error(getErrorMessage(err, 'Failed to update credits.')),
  });

  const handleApprove = (rid) => {
    mutate({ status: true, rid });
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <>
      {credits.map((credit) => (
        <div key={credit._id} className={credit.isGranted ? 'my-2 border border-slate-100 bg-green-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4' : 'my-2 border border-slate-100 bg-slate-50/50 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4'}>
          <div className="space-y-1.5">
            {credit.isGranted ? (
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-md border bg-emerald-50 text-green-700 border-green-200">Credit Granted</span>
            ) : (
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-md border bg-purple-50 text-purple-700 border-purple-200">Credit Request</span>
            )}
            <p className="text-xs text-slate-500 my-1">id : {credit._id}</p>
            <h4 className="font-extrabold text-slate-900 text-lg mt-1">Requesting : {credit.credits} Credits</h4>
            <p className="text-xs text-slate-500 my-1">Name : {credit.user?.name}</p>
            <p className="text-xs text-slate-500 my-1">Current Balance : {credit.user?.credits} </p>
          </div>

          <div className="flex gap-2 shrink-0">
            {!credit.isGranted && (
              <>
                <button
                  type="button"
                  onClick={() => handleApprove(credit._id)}
                  className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-2 rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
                <button
                  type="button"
                  aria-label="Deny credit request"
                  className="flex items-center gap-1 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-bold px-3 py-2 rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Deny</span>
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

TransactionList.propTypes = {
  credits: PropTypes.array.isRequired,
};

export default TransactionList;

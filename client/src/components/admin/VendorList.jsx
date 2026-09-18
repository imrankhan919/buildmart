import { useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { updateVendor } from '../../services/adminService';
import { Check, X } from 'lucide-react';
import { useToast, getErrorMessage } from '../common/Toast.jsx';

const VendorList = ({ item }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => updateVendor(payload),
    onSuccess: () => {
      toast.success('Vendor status updated.');
      queryClient.invalidateQueries({ queryKey: ['admin-overview'] });
    },
    onError: (err) => toast.error(getErrorMessage(err, 'Failed to update vendor.')),
  });

  const handleApprove = (id, status) => {
    mutate({ vendor: id, status });
  };

  const handleReject = (id, status) => {
    mutate({ vendor: id, status });
  };

  return (
    <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="space-y-1.5">
        <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-md border bg-blue-50 text-blue-700 border-blue-200">
          Vendor Application
        </span>
        <h4 className="font-extrabold text-slate-900 text-sm mt-1">{item.name}</h4>
        <p className="text-xs text-slate-500 my-1">Category : {item.category} , Phone : {item.phone} , Email : {item.email}</p>
        <p className="text-xs text-slate-500 my-1">Address : {item.address}</p>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleApprove(item._id, 'active')}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold px-3 py-2 rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Approve</span>
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleReject(item._id, 'rejected')}
          className="flex items-center gap-1 border border-red-200 bg-red-50 hover:bg-red-100 disabled:opacity-60 text-red-700 font-bold px-3 py-2 rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <X className="w-3.5 h-3.5" />
          <span>Deny</span>
        </button>
      </div>
    </div>
  );
};

VendorList.propTypes = {
  item: PropTypes.object.isRequired,
};

export default VendorList;

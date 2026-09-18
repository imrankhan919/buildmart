import { useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { updateUser } from '../../services/adminService';
import { useToast, getErrorMessage } from '../common/Toast.jsx';
import Loader from '../common/Loader';

const AllVendorList = ({ users }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => updateUser(payload),
    onSuccess: () => {
      toast.success('User updated.');
      queryClient.invalidateQueries({ queryKey: ['admin-overview'] });
    },
    onError: (err) => toast.error(getErrorMessage(err, 'Failed to update user.')),
  });

  const handleUserUpdate = (id) => {
    mutate({ uid: id });
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <table className="w-full text-left text-sm min-w-[560px]">
      <thead>
        <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <th className="pb-3">Name</th>
          <th className="pb-3">Email</th>
          <th className="pb-3">Phone</th>
          <th className="pb-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {users.map((item) => (
          <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
            <td className="py-4 font-bold text-slate-900 pr-4">{item.name}</td>
            <td className="py-4 text-slate-500 font-bold">{item.email}</td>
            <td className="py-4 font-extrabold text-slate-800">{item.phone}</td>
            <td className="py-4 text-right">
              <button
                type="button"
                onClick={() => handleUserUpdate(item._id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 ${item.isActive ? 'border-red-200 text-red-700 hover:bg-red-50' : 'border-green-200 text-green-700 hover:bg-green-50'}`}
              >
                {item.isActive ? 'Ban' : 'UnBan'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

AllVendorList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default AllVendorList;

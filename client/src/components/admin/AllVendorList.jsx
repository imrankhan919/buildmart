import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { updateUser, updateVendor } from '../../services/adminService';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUserUpdate } from '../../features/admin/adminSlice';
import Loader from '../common/Loader';

const AllVendorList = ({ users }) => {

    const { user } = useSelector(state => state.auth)
    const { mutate, data, isPending, isSuccess, isError, error } = useMutation({ mutationFn: (data) => updateUser(data) })

    const dispatch = useDispatch()



    const handleUserUpdate = (id) => {
        mutate({ token: user.token, uid: id })
    };


    useEffect(() => {
        if (isSuccess) {
            dispatch(setUserUpdate(data))
        }
    }, [data])



    if (isPending) {
        return <Loader />
    }



    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-450">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Phone</th>
                    <th className="pb-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {users.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50">
                        <td className="py-4 font-bold text-slate-900 pr-4">{item.name}</td>
                        <td className="py-4 text-slate-500 font-bold">{item.email}</td>
                        <td className="py-4 font-extrabold text-slate-800">₹{item.phone}</td>
                        <td className="py-4 text-right">
                            <button
                                onClick={() => handleUserUpdate(item._id)}
                                className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${item.isActive ? 'border-red-200 text-red-700 hover:bg-red-50'
                                    : 'border-green-200 text-green-700 hover:bg-green-50'
                                    }`}
                            >
                                {item.isActive ? 'Ban' : 'UnBan'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default AllVendorList

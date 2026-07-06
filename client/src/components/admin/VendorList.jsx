import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { updateVendor } from '../../services/adminService'
import { Check, X } from 'lucide-react'

const VendorList = ({ item, user }) => {

    const { mutate, data, isPending, isSuccess, isError, error } = useMutation({ mutationFn: (data) => updateVendor(data) })

    const handleApprove = (id, status) => {
        mutate({ token: user.token, vendor: id, status: status })
    };

    const handleReject = (id, status) => {
        mutate({ token: user.token, vendor: id, status: status })
    };

    return (
        <div key={item._id} className="border border-slate-100 bg-slate-50/50 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="space-y-1.5">
                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-md border ${item.type === 'vendor_app' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
                    {'Vendor Application'}
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm mt-1">{item.name}</h4>
                <p className="text-xs text-slate-500 my-1">Category : {item.category} , Phone : {item.phone} , Email : {item.email}</p>
                <p className="text-xs text-slate-500 my-1">Address : {item.address}</p>
            </div>

            <div className="flex gap-2 shrink-0">
                <button
                    onClick={() => handleApprove(item._id, "active")}
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-2 rounded-xl text-xs transition-colors"
                >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                </button>
                <button
                    onClick={() => handleReject(item._id, "rejected")}
                    className="flex items-center gap-1 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-bold px-3 py-2 rounded-xl text-xs transition-colors"
                >
                    <X className="w-3.5 h-3.5" />
                    <span>Deny</span>
                </button>
            </div>
        </div>
    )
}

export default VendorList

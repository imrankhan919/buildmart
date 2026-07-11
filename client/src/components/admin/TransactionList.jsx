import { useMutation } from '@tanstack/react-query';
import { Check, X } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateCredits } from '../../services/adminService';
import { useEffect } from 'react';
import { setCreditsUpdate } from '../../features/admin/adminSlice';
import Loader from '../common/Loader';

const TransactionList = ({ credits }) => {

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const { mutate, data, isPending, isSuccess, isError, error } = useMutation({ mutationFn: (data) => updateCredits(data) })

    const handleApprove = (rid) => {
        mutate({ token: user.token, status: true, rid: rid })
    };

    useEffect(() => {
        if (data && isSuccess) {

            console.log(isSuccess, data.creditRequest)


            dispatch(setCreditsUpdate(data.creditRequest))
        }
    }, [data, isSuccess])


    if (isPending) {
        return (
            <Loader />
        )
    }


    return (
        <>
            {
                credits.map(credit => {
                    return (
                        <div key={credit._id} className={credit.isGranted ? "my-2 border border-slate-100 bg-green-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4" : "border border-slate-100 bg-slate-50/50 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4"}>
                            <div className="space-y-1.5">
                                {
                                    credit.isGranted ? (
                                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-md border bg-emerald-50 text-green-700 border-green-200}`}>
                                            Credit Granted
                                        </span>
                                    ) : (
                                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-md border bg-purple-50 text-purple-700 border-purple-200}`}>
                                            Credit Request
                                        </span>
                                    )
                                }
                                <p className="text-xs text-slate-500 my-1">id : {credit._id}</p>
                                <h4 className="font-extrabold text-slate-900 text-lg mt-1">Requesting : {credit.credits} Credits</h4>
                                <p className="text-xs text-slate-500 my-1">Name : {credit.user.name}</p>
                                <p className="text-xs text-slate-500 my-1">Current Balance : {credit.user.credits} </p>
                            </div>

                            <div className="flex gap-2 shrink-0">
                                {
                                    !credit.isGranted && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(credit._id)}
                                                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-2 rounded-xl text-xs transition-colors"
                                            >
                                                <Check className="w-3.5 h-3.5" />
                                                <span>Approve</span>
                                            </button>
                                            <button

                                                className="flex items-center gap-1 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-bold px-3 py-2 rounded-xl text-xs transition-colors"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                                <span>Deny</span>
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default TransactionList

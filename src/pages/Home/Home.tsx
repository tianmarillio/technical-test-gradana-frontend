import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { logout } from '@/store/slices/mainSlice'
import {
  authMe,
  createMockToptup,
  getBalanceHistory,
  getTotalBalance,
} from '@/store/slices/mainSlice.actions'
import { formatDateToLocal } from '@/utils/formatDateToLocal'
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas'
import { FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BalanceHistory from './BalanceHistory'

const Home = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.main.user)
  const accessToken = useAppSelector((state) => state.main.accessToken)
  const totalBalance = useAppSelector((state) => state.main.totalBalance)
  const balanceHistory = useAppSelector((state) => state.main.balanceHistory)

  const [topupAmount, setTopupAmout] = useState(0)

  useEffect(() => {
    if (!accessToken) {
      return
    }

    dispatch(authMe(accessToken))
    dispatch(getTotalBalance(accessToken))
    dispatch(getBalanceHistory(accessToken))
  }, [accessToken])

  const handleSubmitTopup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!accessToken || !topupAmount) {
      return
    }

    dispatch(
      createMockToptup({
        accessToken,
        amount: topupAmount,
      }),
    )
  }

  return (
    <div className="container mx-auto min-h-screen">
      <main className="flex flex-col gap-4 px-4 pt-8">
        <div className="mb-4 flex items-center justify-between text-xl">
          <div>
            Hi, <span className="font-bold">{user?.name}</span>
          </div>

          <Link to="/login">
            <button
              className="rounded bg-red-600 px-2 py-1 text-sm font-bold text-white"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </Link>
        </div>

        <div className="space-y-2 border-2 p-2">
          <div className="text-sm font-bold">Current Balance</div>
          <div className="text-2xl">
            Rp {formatNumberWithCommas(totalBalance)}
          </div>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleSubmitTopup}>
          <label className="block text-sm">Add mock topup</label>
          <div>
            <input
              type="number"
              className="size-full rounded border-2 p-2"
              onChange={(e) => setTopupAmout(Number(e.target.value))}
            />
          </div>

          <button className="rounded bg-slate-800 px-2 py-1 text-white">
            Add
          </button>

          <div className="text-xs">
            this will create new topup for current user, saved in database
          </div>
        </form>

        <div className="max-w-[40rem] space-y-2 border-2 p-2">
          <div className="text-sm font-bold">Topup History</div>

          <div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              <div className="mb-2 text-sm font-bold">Date</div>
              <div className="text-sm font-bold">Amount</div>
              {balanceHistory.map((elem, i) => (
                <BalanceHistory key={i} {...elem}></BalanceHistory>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
// TODO: register error detail
// TODO: login error detail
// TODO: delete comment & consologs

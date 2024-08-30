import { formatDateToLocal } from '@/utils/formatDateToLocal'
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas'
import { FC } from 'react'

interface BalanceHistoryProps {
  amount: number
  createdAt: string
}

const BalanceHistory: FC<BalanceHistoryProps> = ({ amount, createdAt }) => {
  return (
    <>
      <div>{formatDateToLocal(createdAt)}</div>
      <div>Rp {formatNumberWithCommas(amount)}</div>
    </>
  )
}

export default BalanceHistory

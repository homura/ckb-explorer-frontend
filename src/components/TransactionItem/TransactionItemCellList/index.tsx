import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import TransactionCellListPanel from './styled'
import i18n from '../../../utils/i18n'

interface TransactionCellListProps {
  cells: State.Cell[]
  showSize: number
  transaction: State.Transaction
  render: (item: State.Cell) => ReactNode
}

export default ({ cells, showSize, transaction, render }: TransactionCellListProps) => {
  return (
    <TransactionCellListPanel>
      {cells && cells.map((cell, index) => index < showSize && render(cell))}
      {cells && cells.length >= showSize && (
        <div className="transaction_item__view_all">
          <Link to={`/transaction/${transaction.transactionHash}`}>{i18n.t('common.view_all')}</Link>
        </div>
      )}
    </TransactionCellListPanel>
  )
}

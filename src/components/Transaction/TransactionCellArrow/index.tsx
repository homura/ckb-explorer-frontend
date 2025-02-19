import { Link } from 'react-router-dom'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { CellType } from '../../../constants/common'
import RightGreenArrow from '../../../assets/right_green_arrow.png'
import RightBlueArrow from '../../../assets/right_blue_arrow.png'
import LiveCellIcon from '../../../assets/live_cell.png'
import LiveCellBlueIcon from '../../../assets/live_cell_blue.png'
import { isMainnet } from '../../../utils/chain'
import { RightArrowImage, LeftArrowImage } from './styled'

const CellInputIcon = ({ cell }: { cell: State.Cell }) =>
  cell.generatedTxHash ? (
    <Link to={`/transaction/${cell.generatedTxHash}#${cell.cellIndex}`}>
      <LeftArrowImage
        className="transactionCellLeftArrow"
        src={isMainnet() ? RightGreenArrow : RightBlueArrow}
        alt="left arrow"
      />
    </Link>
  ) : null

const CellOutputIcon = ({ cell }: { cell: State.Cell }) => {
  const { t } = useTranslation()

  if (cell.status === 'dead') {
    return (
      <Link to={`/transaction/${cell.consumedTxHash}`}>
        <RightArrowImage src={isMainnet() ? RightGreenArrow : RightBlueArrow} alt="right arrow" />
      </Link>
    )
  }
  return (
    <Tooltip placement="topRight" title={t('transaction.unspent_output')} arrowPointAtCenter>
      <RightArrowImage src={isMainnet() ? LiveCellIcon : LiveCellBlueIcon} alt="right arrow" />
    </Tooltip>
  )
}

export default ({ cell, cellType }: { cell: State.Cell; cellType: CellType }) =>
  cellType === CellType.Input ? <CellInputIcon cell={cell} /> : <CellOutputIcon cell={cell} />

import { getTransactionFee } from 'src/blockchain/gas'
import { Address } from 'src/components/Address'
import { MoneyValue } from 'src/components/MoneyValue'
import { Currency } from 'src/consts'
import { CeloTransaction } from 'src/features/feed/types'
import {
  TransactionProperty,
  TransactionPropertyGroup,
} from 'src/features/home/components/TransactionPropertyGroup'
import { TransactionStatusProperty } from 'src/features/home/components/TransactionStatusProperty'
import { Font } from 'src/styles/fonts'
import { Stylesheet } from 'src/styles/types'

interface Props {
  tx: CeloTransaction
}

export function GenericTransactionReview({ tx }: Props) {
  const { feeValue, feeCurrency } = getTransactionFee(tx)

  return (
    <TransactionPropertyGroup>
      <TransactionStatusProperty tx={tx} />
      <TransactionProperty label="Amount">
        <div css={style.value}>
          <span>Value: </span>
          <MoneyValue amountInWei={tx.value} currency={Currency.CELO} />
        </div>
        <div css={style.value}>
          <span>Fee: </span>
          <MoneyValue amountInWei={feeValue} currency={feeCurrency} />
        </div>
      </TransactionProperty>
      <TransactionProperty label="To Address">
        <div css={style.value}>
          <Address address={tx.to} />
        </div>
      </TransactionProperty>
    </TransactionPropertyGroup>
  )
}

const style: Stylesheet = {
  value: {
    ...Font.body,
    marginTop: '0.75em',
  },
}
import { BigNumber } from 'ethers'
import { Currency } from 'src/consts'
import { Balances } from 'src/features/wallet/walletSlice'
import { logger } from 'src/utils/logger'

export function isAmountValid(
  amountInWei: BigNumber,
  currency: Currency,
  balances: Balances,
  max: string
) {
  if (amountInWei.lte(0)) {
    logger.warn(`Invalid amount, too small: ${amountInWei.toString()}`)
    return false
  }

  if (amountInWei.gte(max)) {
    logger.warn(`Invalid amount, too big: ${amountInWei.toString()}`)
    return false
  }

  if (!balances.lastUpdated) {
    throw new Error('Checking amount validity without fresh balances')
  }

  if (currency === Currency.cUSD && amountInWei.gt(balances.cUsd)) {
    logger.warn(`Exceeds cUSD balance: ${amountInWei.toString()}`)
    return false
  }

  if (currency === Currency.CELO && amountInWei.gt(balances.celo)) {
    logger.warn(`Exceeds CELO balance: ${amountInWei.toString()}`)
    return false
  }

  return true
}

const numberFormatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 });

export function formatAmount(amt: number | BigNumber | string) {
  const value = parseFloat(amt.toString());
  return numberFormatter.format(value);
}
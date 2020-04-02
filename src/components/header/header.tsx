import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/rootReducer'
import { createWallet } from '../../features/wallet/walletSlice'

function Header() {
  const address = useSelector((s: RootState) => s.wallet.address)
  const dispatch = useDispatch()
  const onClickButton = React.useCallback(() => {
    dispatch(createWallet())
  }, [])

  return (
    <div>
      <h1
        css={{
          backgroundColor: 'green',
        }}
      >
        Your address is {address}
      </h1>
      <button onClick={onClickButton}>Create New Wallet</button>
    </div>
  )
}

export default Header
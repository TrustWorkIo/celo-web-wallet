import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'src/components/Button';
import ArrowBackIcon from 'src/components/icons/arrow_back_white.svg';
import QuestionIcon from 'src/components/icons/question_mark.svg';
import SendPaymentIcon from 'src/components/icons/send_payment_white.svg';
import { Identicon } from 'src/components/Identicon';
import { Box } from 'src/components/layout/Box';
import { ScreenFrameWithFeed } from 'src/components/layout/ScreenFrameWithFeed';
import { Currency } from 'src/consts';
import { SendTokenParams } from 'src/features/send/sendToken';
import { Color } from 'src/styles/Color';
import { Stylesheet } from 'src/styles/types';
import { formatAmount } from 'src/utils/amount';

const testState = {
  currency: Currency.cUSD,
  amount: 100.15,
  recipient: "0xa2972a33550c33ecfa4a02a0ea212ac98e77fa55",
  comment: "Thanks for all the fish!"
}

function currencyLabel(curr: Currency){
  return curr === Currency.CELO ? "CELO" : "cUSD";
}


export function SendConfirmationScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as SendTokenParams) ?? testState;
  const [fee] = useState(0.02);
  const total = useMemo(() => { return parseFloat(state.amount.toString()) + fee; }, [fee, state.amount]);
  
  function onGoBack(){
    navigate(-1);
  }

  return (
    <ScreenFrameWithFeed>
      <Box direction="column" styles={style.contentContainer}>
        <h1 css={style.title}>Review</h1>

        <Box direction="row" styles={style.inputRow}>
          <label css={style.inputLabel}>Amount</label>
          <Box direction="row" align="end">
            <label css={style.currencyLabel}>{currencyLabel(state.currency)}</label>
            <label css={style.valueLabel}>{formatAmount(state.amount)}</label>
          </Box>
        </Box>

        <Box direction="row" styles={style.inputRow}>
          <label css={style.inputLabel}>Security Fee</label>
          <Box direction="row" align="end">
            <label css={style.currencyLabel}>{currencyLabel(state.currency)}</label>
            <label css={style.valueLabel}>{formatAmount(fee)}</label>
            <img src={QuestionIcon} css={style.iconRight}/>
          </Box>
        </Box>

        <Box direction="row" styles={style.inputRow}>
          <label css={{...style.inputLabel, fontWeight: "bolder"}}>Total</label>
          <Box direction="row" align="end">
            <label css={style.currencyLabel}>{currencyLabel(state.currency)}</label>
            <label css={{...style.valueLabel, fontWeight: "bolder"}}>{formatAmount(total)}</label>
          </Box>
        </Box>

        <Box direction="row" styles={style.inputRow}>
          <label css={style.inputLabel}>Recipient</label>
          <Box direction="row" align="end">
            <Identicon address={state.recipient}/>
            {/* <label css={style.recipientLabel}>{state.recipient}</label> */}
          </Box>
        </Box>

        <Box direction="row" styles={style.inputRow}>
          <label css={style.inputLabel}>Comment</label>
          <label css={style.valueLabel}>{state.comment}</label>
        </Box>

        <Box direction="row" justify="between">
          <Box styles={{width: "48%"}}>
            <Button type="button" size="m" color={Color.primaryGrey} onClick={onGoBack}>
              <Box justify="center" align="center">
                <img src={ArrowBackIcon} css={style.iconLeft} color="white"/>
                Edit Payment
              </Box>
            </Button>
          </Box>
          <Box styles={{width: "48%"}}>
            <Button type="submit" size="m">
              <Box align="center" justify="center">
                <img src={SendPaymentIcon} css={style.iconLeft} color="white"/>
                Send Payment
              </Box>
            </Button>
          </Box>
        </Box>

      </Box>
    </ScreenFrameWithFeed>
  );
}

const style: Stylesheet = {
  contentContainer: {
    height: "100%",
    paddingLeft: 65,
    paddingTop: 30,
    maxWidth: 500,
    width: "100%",
  },
  title: {
    color: "#3488EC",
    fontWeight: 400,
    fontSize: 30,
    marginTop: 0,
    marginBottom: 20,
  },
  inputRow: {
    marginBottom: 30,
  },
  inputLabel: {
    fontWeight: 300,
    fontSize: 18,
    // marginBottom: 8,
    width: 150,
    minWidth: 150,
  },
  currencyLabel: {
    marginRight: 4,
    color: Color.primaryGreen,
    fontSize: 16,
    fontWeight: 400,
  },
  valueLabel: {
    color: Color.primaryBlack,
    fontSize: 20,
    fontWeight: 400,
  },
  button: {
    marginLeft: 8,
    marginRight: 8,
    background: "transparent",
    borderWidth: 0,
    cursor: "pointer",
    "&:focus": {
      outline: "none",
    }
  },
  copyIcon: {
    height: 14,
    width: 18,
  },
  radioBox: {
    height: "100%", 
    width: "100%",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  }
}
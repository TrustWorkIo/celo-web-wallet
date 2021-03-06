import { transparentButtonStyles } from 'src/components/Button'
import { Font } from 'src/styles/fonts'
import { Styles } from 'src/styles/types'

interface ButtonProps {
  onClick: () => void
  styles?: Styles
}

export function TextButton(props: React.PropsWithChildren<ButtonProps>) {
  const { onClick, styles } = props

  return (
    <button css={[defaultStyle, styles]} onClick={onClick}>
      {props.children}
    </button>
  )
}

const defaultStyle: Styles = {
  ...transparentButtonStyles,
  ...Font.linkLight,
  textRendering: 'geometricprecision',
}

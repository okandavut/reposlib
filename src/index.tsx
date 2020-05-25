import * as React from 'react'
import { render } from 'react-dom'

import Hello from './app/pages/hello'

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
} as React.CSSProperties

const App = () => (
  <div style={styles}>
    <Hello name='USER' />

    <h2>Start editing to see some magic happen {'\u2728'}</h2>
  </div>
)

render(<App />, document.getElementById('root'))

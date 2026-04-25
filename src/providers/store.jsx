import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { store } from '../redux/store'

function Providers({ children }) {
	return (
		<Provider store={store}>
			{children}
		</Provider>
	)
}

Providers.propTypes = {
	children : PropTypes.element
}
  
export default Providers

export {store}
import { C } from '@/theme/colors/colors'
import { createSystem } from '@chakra-ui/react'

import { defineConfig } from '@chakra-ui/react'

const config = defineConfig({
	cssVarsRoot: ':where(:root, :host)',
	globalCss: {
		'html, body': {
			background: '#282A36',
		},
	},
	theme: {
		tokens: {
			colors: C,
		},
	},
})

export default createSystem(config)

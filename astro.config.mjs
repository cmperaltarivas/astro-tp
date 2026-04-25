// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://liceotp.netlify.app',
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport',
	},
	head: [
		{
			tag: 'link',
			attributes: {
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com',
			},
		},
		{
			tag: 'link',
			attributes: {
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossorigin: 'anonymous',
			},
		},
		{
			tag: 'link',
			attributes: {
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
			},
		},
	],
	integrations: [
		starlight({
			title: 'Area Tecnico Profesional',
			description: 'Liceo Bicentenario Rector Anon Andrade Coloma - Especialidades tecnicas',
			logo: {
				src: './public/logo.svg',
				alt: 'Liceo TP',
			},
			defaultLocale: 'root',
			locales: {
				root: { label: 'Espanol', lang: 'es' },
			},
			customCss: ['./src/styles/tp.css'],
			components: {
				Header: './src/components/Navbar.astro',
				Sidebar: './src/components/Sidebar.astro',
			},
			sidebar: [],
			disable404Route: true,
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/cmperaltarivas/docusaurus-tp',
				},
			],
		}),
	],
});
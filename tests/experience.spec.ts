import { test, expect, type Page } from '@playwright/test';
import { ExperiencePage } from './pages/ExperiencePage';

test.describe.configure({ mode: 'serial' });

const experiences = [
	{
		id: 1,
		number: '01',
		company: 'Porto Seguro',
		position: 'Desenv. de Software Full-Stack',
		description:
			'Desenvolvo um portal de gestão de sinistros usando TypeScript, RxJS e Angular Material. Foco em performance com lazy loading e pré-carregamento inteligente.'
	},
	{
		id: 2,
		number: '02',
		company: 'Thoughtworks',
		position: 'Consultant Developer',
		description:
			'Atuei como Consultant Developer com React, TypeScript, TDD e NodeJS. Participei de projeto para tornar aplicativo 100% acessível seguindo WCAG'
	},
	{
		id: 3,
		number: '03',
		company: 'Arco Educação',
		position: 'Desenv. de Software',
		description:
			'Desenvolvi sistemas web com AngularJS, C# e ASP.NET MVC. Trabalhei em front-end responsivo e back-end robusto com NHibernate e Dapper.'
	},
	{
		id: 4,
		number: '04',
		company: 'Finger Consultoria',
		position: 'UX Designer',
		description:
			'Fundei a Finger Consultoria para fornecer serviços de consultoria de carreira para estudantes.'
	}
];

test.describe('Experience Section', () => {
	let experiencePage: ExperiencePage;

	test.beforeEach(async ({ page }: { page: Page }) => {
		experiencePage = new ExperiencePage(page);
		await experiencePage.goto();
		await experiencePage.scrollToSection();
		await expect(experiencePage.section).toBeVisible();
	});

	test('deve exibir o título principal da seção', async () => {
		await expect(experiencePage.heading).toBeVisible();
		await expect(experiencePage.heading).toHaveText('Empresas onde trabalhei e Aprendizados que conquistei');
	});

	test('deve renderizar todos os cards de experiência', async () => {
		const cards = experiencePage.getAllCards();
		await expect(cards).toHaveCount(experiences.length);
	});

	test('deve exibir os dados corretos de cada experiência', async () => {
		for (const experience of experiences) {
			await expect(experiencePage.getCard(experience.id)).toBeVisible();
			await expect(experiencePage.getNumber(experience.id)).toHaveText(experience.number);
			await expect(experiencePage.getCompany(experience.id)).toHaveText(experience.company);
			await expect(experiencePage.getPosition(experience.id)).toHaveText(experience.position);
			await expect(experiencePage.getDescription(experience.id)).toHaveText(experience.description);
		}
	});

	test('o grid da seção deve estar presente e visível', async () => {
		await expect(experiencePage.grid).toBeVisible();
	});

	test('a âncora da seção deve ser #experience', async () => {
		await expect(experiencePage.section).toHaveAttribute('id', 'experience');
	});
});

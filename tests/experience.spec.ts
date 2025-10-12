import { test, expect, type Page } from '@playwright/test';

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
	test.beforeEach(async ({ page }: { page: Page }) => {
		await page.goto('http://localhost:5173');
		const section = page.getByTestId('experience-section');
		await section.scrollIntoViewIfNeeded();
		await expect(section).toBeVisible();
	});

	test('deve exibir o título principal da seção', async ({ page }: { page: Page }) => {
		const heading = page.getByTestId('experience-heading');
		await expect(heading).toBeVisible();
		await expect(heading).toHaveText('Empresas onde trabalhei e Aprendizados que conquistei');
	});

	test('deve renderizar todos os cards de experiência', async ({ page }: { page: Page }) => {
		const cards = page.locator('[data-testid^="experience-card-"]');
		await expect(cards).toHaveCount(experiences.length);
	});

	test('deve exibir os dados corretos de cada experiência', async ({ page }: { page: Page }) => {
		for (const experience of experiences) {
			const card = page.getByTestId(`experience-card-${experience.id}`);
			await expect(card).toBeVisible();

			await expect(page.getByTestId(`experience-number-${experience.id}`)).toHaveText(experience.number);
			await expect(page.getByTestId(`experience-company-${experience.id}`)).toHaveText(experience.company);
			await expect(page.getByTestId(`experience-position-${experience.id}`)).toHaveText(experience.position);
			await expect(page.getByTestId(`experience-description-${experience.id}`)).toHaveText(experience.description);
		}
	});

	test('o grid da seção deve estar presente e visível', async ({ page }: { page: Page }) => {
		const grid = page.getByTestId('experience-grid');
		await expect(grid).toBeVisible();
	});

	test('a âncora da seção deve ser #experience', async ({ page }: { page: Page }) => {
		const section = page.getByTestId('experience-section');
		await expect(section).toHaveAttribute('id', 'experience');
	});
});

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  arXiv?: string;
  source?: string;
  description: string;
  type: 'arXiv' | 'Book Chapter' | 'Conference' | 'Journal';
  link: string;
  tags: string[];
}

export const publications: Publication[] = [
  {
    id: 'nlin-0509008',
    title: 'Description of Complex Systems in terms of Self-Organization Processes of Prime Integer Relations',
    authors: ['Victor Korotkikh', 'Galina Korotkikh'],
    year: 2005,
    arXiv: 'nlin/0509008',
    description: 'Describes complex systems via self-organization of prime integer relations as fractal geometric patterns. This work establishes a fundamental link between mathematical prime relations and the emergence of structural complexity in natural and artificial systems.',
    type: 'arXiv',
    link: 'https://arxiv.org/abs/nlin/0509008',
    tags: ['Complex Systems', 'Self-Organization', 'Prime Integer Relations', 'Fractals']
  },
  {
    id: '1105.0505',
    title: 'From Space and Time to a Deeper Reality as a Possible Way to Solve Global Problems',
    authors: ['Victor Korotkikh', 'Galina Korotkikh'],
    year: 2011,
    arXiv: '1105.0505',
    description: 'Proposes viewing systems in a hierarchical network of prime relations for global issue resolution. It suggests that by understanding the deeper mathematical reality of prime relations, we can develop more effective strategies for managing complex global challenges.',
    type: 'arXiv',
    link: 'https://arxiv.org/abs/1105.0505',
    tags: ['Global Problems', 'Depeer Reality', 'Hierarchical Networks', 'Systemic Action']
  },
  {
    id: 'nlin-0606023',
    title: 'On an Irreducible Theory of Complex Systems',
    authors: ['Victor Korotkikh', 'Galina Korotkikh'],
    year: 2006,
    arXiv: 'nlin/0606023',
    description: 'Explores irreducible concepts for complex systems theory, arguing that certain mathematical properties of prime integer relations provide an irreducible foundation for understanding system dynamics.',
    type: 'arXiv',
    link: 'https://arxiv.org/abs/nlin/0606023',
    tags: ['Irreducible Theory', 'Mathematical Complexity', 'Foundational Physics']
  },
  {
    id: '0710.3961',
    title: 'On a New Type of Information Processing for Efficient Management of Complex Systems',
    authors: ['Victor Korotkikh', 'Galina Korotkikh'],
    year: 2007,
    arXiv: '0710.3961',
    description: 'Discusses novel information processing paradigms based on the prime integer relations framework. The paper outlines potential computational advantages for managing high-dimensional complex systems.',
    type: 'arXiv',
    link: 'https://arxiv.org/abs/0710.3961',
    tags: ['Information Processing', 'Efficient Management', 'Computational Evidence']
  },
  {
    id: 'optimality-2005',
    title: 'On Optimality Condition of Complex Systems: Computational Evidence',
    authors: ['Victor Korotkikh', 'Galina Korotkikh'],
    year: 2005,
    source: 'Semantic Scholar',
    description: 'Provides computational support for the existence of optimality conditions in complex systems, linked to underlying prime number patterns.',
    type: 'arXiv',
    link: 'https://www.semanticscholar.org/paper/8410af80a44963bd2894d16481e0f52dc2641a21',
    tags: ['Optimality', 'Computational Complexity', 'Scientific Evidence']
  },
  {
    id: 'acm-quantization',
    title: 'On a new quantization in complex systems',
    authors: ['Victor Korotkikh', 'Galina Korotkikh'],
    year: 2003,
    source: 'ACM',
    description: 'A key paper linking faculty work at Central Queensland University to new methods of quantization within complex systems theory.',
    type: 'Conference',
    link: 'https://dl.acm.org/doi/10.5555/985805.985810',
    tags: ['Quantization', 'System Theory', 'Australian Research']
  },
  {
    id: 'elg-chapter',
    title: 'Complexity of a System as a Key to its Optimization',
    authors: ['Victor Korotkikh', 'Galina Korotkikh'],
    year: 2008,
    source: 'Edward Elgar Publishing',
    description: 'Book chapter focusing on how the inherent complexity of a system can be leveraged for its own optimization through prime-relation analysis.',
    type: 'Book Chapter',
    link: 'https://ideas.repec.org/h/elg/eechap/12824_9.html',
    tags: ['Optimization', 'Systemic Complexity', 'Theoretical Framework']
  },
  {
    id: 'optimization-industry-2003',
    title: 'Optimization and Industry: New Frontiers',
    authors: ['Victor Korotkikh', 'V.V. Korotkikh'],
    year: 2003,
    source: 'Springer / Kluwer Academic',
    description: 'A comprehensive entry in the New Frontiers of Optimization series, exploring practical industrial applications of the prime integer relations theory.',
    type: 'Book Chapter',
    link: 'https://www.kriso.ee/optimization-industry-new-frontiers-2003-ed-db-9781402011870.html?lang=en',
    tags: ['Industrial Optimization', 'Mathematical Modeling', 'New Frontiers']
  },
  {
    id: 'unifying-themes-2006',
    title: 'Unifying Themes in Complex Systems, Volume VI',
    authors: ['Victor Korotkikh', 'Galina Korotkikh'],
    year: 2006,
    source: 'Springer',
    description: 'Contributed work to the International Conference on Complex Systems, focusing on unifying mathematical principles across disparate system types.',
    type: 'Conference',
    link: 'https://link.springer.com/book/10.1007/978-3-642-14599-5',
    tags: ['Complex Systems', 'Interdisciplinary', 'Unifying Themes']
  }
];

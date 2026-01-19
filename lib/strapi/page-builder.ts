import HeroSection from '@/components/sections/hero-section';
import GridNumerosSection from '@/components/sections/grid-numeros';
import BeneficiosSection from '@/components/sections/beneficios-section';
import TextoRicoSection from '@/components/sections/texto-rico-section';
import CtaSection from '@/components/sections/cta-section';

type SectionComponent = React.ComponentType<any>;

const SECTION_COMPONENTS: Record<string, SectionComponent> = {
  'sections.hero': HeroSection,
  'sections.grid-numeros': GridNumerosSection,
  'sections.beneficios': BeneficiosSection,
  'sections.texto-rico': TextoRicoSection,
  'sections.cta': CtaSection,
};

export interface Section {
  __component: string;
  id: number;
  [key: string]: any;
}

export function renderSection(section: Section, index: number) {
  const Component = SECTION_COMPONENTS[section.__component];

  if (!Component) {
    console.warn(`Componente não encontrado: ${section.__component}`);
    return null;
  }

  return <Component key={section.id || index} {...section} />;
}

export function renderSections(sections: Section[]) {
  if (!sections || !Array.isArray(sections)) {
    return null;
  }
  return sections.map((section, index) => renderSection(section, index));
}

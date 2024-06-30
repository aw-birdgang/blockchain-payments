import { DefaultAccordion } from '../components/DefaultAccordion';
import PageTitle from '../components/PageTitle';
import { informationAccordionItems } from './constants';

export default function Information() {
    return (
        <>
            <PageTitle title="Information" subtitle="해피 545란 무엇인가"></PageTitle>
            <DefaultAccordion items={informationAccordionItems} defaultOpenIndex={1} />
        </>
    );
}

import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import { AccordionItemProps } from './types';

export const AccordionItem: React.FC<AccordionItemProps> = ({
    index,
    header,
    body,
    open,
    handleOpen,
}) => (
    <Accordion open={open === index}>
        <AccordionHeader onClick={() => handleOpen(index)}>{header}</AccordionHeader>
        <AccordionBody>{body}</AccordionBody>
    </Accordion>
);

import React from 'react';
import { DefaultAccordionProps } from './types';
import { AccordionItem } from './AccordionItem';

export const DefaultAccordion: React.FC<DefaultAccordionProps> = ({
    items,
    defaultOpenIndex = 0,
}) => {
    const [open, setOpen] = React.useState<number>(defaultOpenIndex);
    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    return (
        <>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    index={index + 1}
                    header={item.header}
                    body={item.body}
                    open={open}
                    handleOpen={handleOpen}
                />
            ))}
        </>
    );
};

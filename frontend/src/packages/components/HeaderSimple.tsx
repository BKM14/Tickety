import { useState } from 'react';
import { Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';

export interface HeaderProps  {
    linksArray: {
      link: string,
      label: string,
      onClick?: () => void,
    }[],
    user: "user" | "admin" | "agent"
}

export function HeaderSimple({ links }: {links: HeaderProps}) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links.linksArray[0]);

  const items = links.linksArray.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link || undefined}
      onClick={  link.onClick ? link.onClick : (event) => {
        event.preventDefault();
        setActive(link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container fluid className={classes.inner}>
        <div className='flex items-center'>
            <h1 className='flex font-bold items-center p-1 text-4xl'>Tickety</h1>
            <img src="Tickety.png" width={40} alt="Logo"/>
        </div>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
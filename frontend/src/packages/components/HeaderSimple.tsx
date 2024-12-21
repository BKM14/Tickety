import { useState } from 'react';
import { Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';

export interface HeaderProps  {
    link: string,
    label: string,
    onClick?: () => void
}

export function HeaderSimple({ links }: {links: HeaderProps[]}) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={  link.onClick ? link.onClick : (event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header} style={{marginBottom: 0}}>
      <Container fluid className={classes.inner}>
        <div style={{display: "flex"}}>
            <h1>Tickety</h1>
            <img src="Tickety.png" width={64} height={60} alt="Logo"  style={{marginTop: "10px"}}/>
        </div>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
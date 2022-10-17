import * as React from 'react';
import { Headline, Stack } from '@servicetitan/design-system';
import Styles from './header.module.scss';
import { Logo } from '../logo';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
    return (
        <Stack
            className={classNames('p-x-4', Styles.header)}
            justifyContent="space-between"
            alignItems="center"
        >
            <Logo />
            <Link to="/">
                <Headline>Sourcery Engine</Headline>
            </Link>
        </Stack>
    );
};

import * as React from 'react';
import { Headline, BodyText, Card, Button, Link, Stack } from '@servicetitan/design-system';
import Styles from './intro-page.module.scss';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';

const StackContainer = (props: any) => {
  return (
    <div>
        <Headline size="xlarge">Welcome to the Settings Copy Tool</Headline>
                <Card className="m-y-5">
                    <RouterLink to="/tenants">
                        <Button full primary>
                            Get Started
                        </Button>
                    </RouterLink>
                </Card>
    </div>
  );
};

export const IntroPage: React.FC = () => {
    return (
        <Stack alignItems="center" justifyContent="center">
            <StackContainer className="ta-center" />
        </Stack>
    );
};

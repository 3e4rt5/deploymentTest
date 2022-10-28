import * as React from 'react';
import { Headline, BodyText, Card, Button, Link, Stack } from '@servicetitan/design-system';
import Styles from './intro-page.module.scss';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';

const StackContainer = (props: any) => {
  return (
    <div className='ta-center'>
        <Headline size="xlarge">Welcome to the Settings Copy Tool</Headline>
        <BodyText className='ta-center m-y-2' size="large">
            The Settings Copy Tool allows you to easily copy over settings from one tenant to another.
        </BodyText>
                <Card className="m-y-3">
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

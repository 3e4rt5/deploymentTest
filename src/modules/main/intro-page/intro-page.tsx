import * as React from 'react';
import { Headline, BodyText, Card, Button, Link, Stack } from '@servicetitan/design-system';
import Styles from './intro-page.module.scss';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';

const StackContainer = (props: any) => {
  return (
    <div>
        <Headline size="xlarge">Let's create a new list!</Headline>
                <BodyText size="large">
                    Please select filters for your new list
                </BodyText>
                <Card className="m-y-5">
                    <RouterLink to="/tenants">
                        <Button full primary>
                            Create a new list
                        </Button>
                    </RouterLink>
                    <BodyText className={classNames(Styles.divider, 'ta-center', 'm-y-4')} />
                    <Button full primary>
                            Tool 2
                    </Button>
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

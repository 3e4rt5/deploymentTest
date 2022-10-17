import React, { SyntheticEvent, useState } from 'react';
import classNames from 'classnames';
import { Stack, Button, Headline, Form, BodyText } from '@servicetitan/design-system';
import Styles from './feedback.module.scss'
import { redirectTo } from '../../utils/constants';
import { Api } from '../../api/main.api';

enum State {
    Closed = 'CLOSED',
    Opened = 'OPENED',
    Report = 'REPORT_BUG_OR_ISSUE',
    Share = 'SHARE_FEEDBACK',
    Thanks = 'THANKS_FOR_SHARE_OR_REPORT',
}

enum FeedBack {
    REPORT = 'REPORT',
    FEEDBACK = 'FEEDBACK',
}

export const Feedback: React.FC = () => {
    return (
        <Stack direction="column" className={classNames('position-fixed', Styles.container)}>
            <FeedbackContent />
        </Stack>
    );
};

const FeedbackContent: React.FC = () => {
    const [state, setState] = useState(State.Closed);

    switch (state) {
        case State.Closed:
            return <ClosedState changeState={setState} />;
        case State.Opened:
            return <OpenedState changeState={setState} />;
        case State.Report:
            return <ReportState changeState={setState} />;
        case State.Share:
            return <ShareState changeState={setState} />;
        case State.Thanks:
            return <ThanksState changeState={setState} />;
        default:
            return null;
    }
};

interface FeedbackChildrenMainProps {
    changeState(state: State): void;
}

const ClosedState: React.FC<FeedbackChildrenMainProps> = ({ changeState }) => {
    const handleStateChange = React.useCallback(() => {
        changeState(State.Opened);
    }, [changeState]);

    return <Button onClick={handleStateChange} className={Styles.feedbackButton} iconName="help" />;
};

const OpenedState: React.FC<FeedbackChildrenMainProps> = ({ changeState }) => {
    const handleShareClick = React.useCallback(() => {
        changeState(State.Share);
    }, [changeState]);

    const handleReportClick = React.useCallback(() => {
        changeState(State.Report);
    }, [changeState]);

    return (
        <Stack className={Styles.openedContainer} spacing={2} direction="column">
            <HeaderActions changeState={changeState} withBack={false} />
            <Headline className="m-0" size="medium">
                Support & Feedback
            </Headline>
            <Button target="_blank" href={redirectTo.helpAndTrainings}>
                Help & Training
            </Button>
            <Button onClick={handleReportClick}>Report a Bug or Issue</Button>
            <Button onClick={handleShareClick}>Share Feedback</Button>
        </Stack>
    );
};

const ReportState: React.FC<FeedbackChildrenMainProps> = ({ changeState }) => {
    const [report, setReport] = useState('');
    const [email, setEmail] = useState('');

    const handleEmailChange = React.useCallback(
        (_: SyntheticEvent, data: any) => {
            setEmail(data.value);
        },
        [setEmail]
    );

    const handleReportChange = React.useCallback(
        (_: SyntheticEvent, data: any) => {
            setReport(data.value);
        },
        [setReport]
    );

    const handleSubmit = React.useCallback(() => {
        Api.feedback({
            feedbackEmail: email,
            feedbackResponse: report,
            feedbackType: FeedBack.REPORT,
        });
        changeState(State.Thanks);
    }, [email, report, changeState]);

    return (
        <Stack className={Styles.openedContainer} spacing={2} direction="column">
            <HeaderActions changeState={changeState} />
            <Headline className="m-0" size="medium">
                Report a Bug or Issue
            </Headline>
            <Form.TextArea
                value={report}
                onChange={handleReportChange}
                className="m-0"
                label="Please describe the issue you are experiencing:"
            />
            <Form.Input
                value={email}
                onChange={handleEmailChange}
                className="m-0"
                label="Your email address:"
            />
            <Button disabled={!report || !email} onClick={handleSubmit}>
                Submit
            </Button>
        </Stack>
    );
};

const ShareState: React.FC<FeedbackChildrenMainProps> = ({ changeState }) => {
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');

    const handleEmailChange = React.useCallback(
        (_: SyntheticEvent, data: any) => {
            setEmail(data.value);
        },
        [setEmail]
    );

    const handleFeedbackChange = React.useCallback(
        (_: SyntheticEvent, data: any) => {
            setFeedback(data.value);
        },
        [setFeedback]
    );

    const handleSubmit = React.useCallback(() => {
        Api.feedback({
            feedbackEmail: email,
            feedbackResponse: feedback,
            feedbackType: FeedBack.FEEDBACK,
        });
        changeState(State.Thanks);
    }, [email, feedback, changeState]);

    return (
        <Stack className={Styles.openedContainer} spacing={2} direction="column">
            <HeaderActions changeState={changeState} />
            <Headline className="m-0" size="medium">
                Share Feedback
            </Headline>
            <Form.TextArea
                value={feedback}
                onChange={handleFeedbackChange}
                className="m-0"
                label="Please use this form to provide feedback or suggestions:"
            />
            <Form.Input
                value={email}
                onChange={handleEmailChange}
                className="m-0"
                label="Your email address:"
            />
            <Button disabled={!email || !feedback} onClick={handleSubmit}>
                Submit
            </Button>
        </Stack>
    );
};

const ThanksState: React.FC<FeedbackChildrenMainProps> = ({ changeState }) => {
    return (
        <Stack spacing={2} className={Styles.openedContainer} direction="column">
            <HeaderActions withBack={false} changeState={changeState} />
            <Stack spacing={2} alignItems="center" justifyContent="center" direction="column">
                <BodyText className="ta-center">Thank you for your submission.</BodyText>
                <BodyText className="ta-center">Have a great day!</BodyText>
            </Stack>
        </Stack>
    );
};

interface HeaderActionsProps extends FeedbackChildrenMainProps {
    withBack?: boolean;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ changeState, withBack = true }) => {
    const handleClose = React.useCallback(() => {
        changeState(State.Closed);
    }, [changeState]);

    const handleBack = React.useCallback(() => {
        changeState(State.Opened);
    }, [changeState]);

    return (
        <Stack justifyContent="space-between">
            <Button
                disabled={!withBack}
                xsmall
                onClick={handleBack}
                iconName={withBack ? 'keyboard_arrow_left' : undefined}
                fill="subtle"
            >
                {withBack ? 'Back' : ''}
            </Button>
            <Button xsmall onClick={handleClose} iconName="close" fill="subtle">
                Close
            </Button>
        </Stack>
    );
};

import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:5000/api';


interface CopyPayload {
    sourceTenantName: string;
    destinationTenantName: string;
    actions: string[];
    settings: string[];
}

interface FeedbackPayload {
    feedbackType: string;
    feedbackResponse: string;
    feedbackEmail: string;
}

class MainApi {
    copy(copyPayload: CopyPayload) {
        const jsonData = {
            'actions': copyPayload.actions,
            'settings': copyPayload.settings,
            'sourceTenantName': copyPayload.sourceTenantName,
            'destinationTenantName': copyPayload.destinationTenantName
        };
        return axios.post(`/copy`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    feedback(feedbackPayload: FeedbackPayload) {
        const jsonFeedbackData = {
            'feedbackType': feedbackPayload.feedbackType,
            'feedbackResponse': feedbackPayload.feedbackResponse,
            'feedbackEmail': feedbackPayload.feedbackEmail
        }
        return axios.post(`/feedback`, jsonFeedbackData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export const Api = new MainApi();

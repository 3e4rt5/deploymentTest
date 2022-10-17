import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:5000/api';


interface CopyPayload {
    sourceTenantName: string;
    destinationTenantName: string;
    platforms: string[];
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
            'platforms': copyPayload.platforms,
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
        const formData = new FormData();
        formData.append('feedbackType', feedbackPayload.feedbackType);
        formData.append('feedbackResponse', feedbackPayload.feedbackResponse);
        formData.append('feedbackEmail', feedbackPayload.feedbackEmail);
        return axios.post(`/feedback`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}

export const Api = new MainApi();

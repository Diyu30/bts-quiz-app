import { useEffect, useState } from 'react';

import { postServerData } from '../helper/helper'
import * as Action from '../redux/result_reducer'

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}
export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log(error)
    }
}

/** insert user data */
export const usePublishResult = (resultData) => {
    const [published, setPublished] = useState(false);

    useEffect(() => {
        console.log("usePublishResult triggered:", resultData); // Debugging

        if (!resultData?.result?.length || !resultData?.username) {
            console.error("Couldn't get Result");
            return;
        }

        if (published) {
            console.warn("Already published, skipping...");
            return; // Prevent multiple calls
        }

        const publish = async () => {
            try {
                const response = await postServerData(`http://localhost:5000/api/result`, resultData);
                console.log("Result published successfully:", response);
                setPublished(true);
            } catch (error) {
                console.error("Error publishing result:", error);
            }
        };

        publish();
    }, []); // ✅ Empty dependency array ensures it runs only once
};



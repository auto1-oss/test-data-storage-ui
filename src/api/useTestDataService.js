/*-
 * #%L
 * test-data-storage-ui
 * %%
 * Copyright (C) 2023 Auto1 Group
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */

import {useState} from "react";
import {BASE_URL_API, REACT_APP_BASIC_AUTH_USER, REACT_APP_BASIC_AUTH_PASSWORD} from "./constants";
import axios from "axios";

export function useTestDataService() {

    const [queues, setQueues] = useState([]);
    const [testData, setTestData] = useState(null);
    const [queuesLoading, setQueuesLoading] = useState(false);

    async function fetchAllTestDataTypes() {
        setQueuesLoading(true);
        await axios.get(`${BASE_URL_API}/v1/queue/omni-types`, {
            auth: {
                username: REACT_APP_BASIC_AUTH_USER,
                password: REACT_APP_BASIC_AUTH_PASSWORD
            },
        }).then(res => {
            setQueues(res.data)
            setQueuesLoading(false);
        }).catch(function (error) {
            console.log(error)
            setQueuesLoading(true);
        });
    }

    async function getTestDataType(testDataType) {
        await axios.get(`${BASE_URL_API}/v1/queue/omni/${testDataType}`, {
            auth: {
                username: REACT_APP_BASIC_AUTH_USER,
                password: REACT_APP_BASIC_AUTH_PASSWORD
            },
        }).then(res => {
            setTestData(res.data)
        }).catch(function (error) {
            console.log(error)
        });
    }

    async function createDataQueue(payload) {
        await axios.post(`${BASE_URL_API}/v1/queue/omni-type`, payload, {
            auth: {
                username: REACT_APP_BASIC_AUTH_USER,
                password: REACT_APP_BASIC_AUTH_PASSWORD
            },
        }).then(res => {
            return res.data
        }).catch(function (error) {
            console.log(error)
        });
    }


    async function updateDataQueue(id, payload) {
        await axios.put(`${BASE_URL_API}/v1/queue/omni-type/${id}`, payload, {
            auth: {
                username: REACT_APP_BASIC_AUTH_USER,
                password: REACT_APP_BASIC_AUTH_PASSWORD
            },
        }).then(res => {
            setQueues(testDataQueue => {
                let foundIndex = queues.findIndex(element => element.id === id);
                queues.splice(foundIndex, 1, res.data);
                return queues
            });
            return res.data
        }).catch(function (error) {
            console.log(error)
        });
    }

    async function deleteQueue(id) {
        await axios.delete(`${BASE_URL_API}/v1/queue/omni-type/${id}`, {
            auth: {
                username: REACT_APP_BASIC_AUTH_USER,
                password: REACT_APP_BASIC_AUTH_PASSWORD
            },
        }).then(res => {

        }).catch(function (error) {
            console.log(error)
        });
    }



    return {
        queues,
        testData,
        fetchAllTestDataTypes,
        getTestDataType,
        queuesLoading,
        createDataQueue,
        updateDataQueue,
        deleteQueue
    };
}

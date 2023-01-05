import {useState} from "react";
import {BASE_URL_API} from "./constants";
import axios from "axios";

export function useTestDataService() {

    const [queues, setQueues] = useState([]);
    const [testData, setTestData] = useState(null);
    const [queuesLoading, setQueuesLoading] = useState(false);

    async function fetchAllTestDataTypes(payload) {
        setQueuesLoading(true);
        await axios.get(`${BASE_URL_API}/queue/omni-types`, payload).then(res => {
            setQueues(res.data)
            setQueuesLoading(false);
        }).catch(function (error) {
            console.log(error)
            setQueuesLoading(true);
        });
    }

    async function getTestDataType(testDataType) {
        await axios.get(`${BASE_URL_API}/queue/omni/${testDataType}`).then(res => {
            setTestData(res.data)
        }).catch(function (error) {
            console.log(error)
        });
    }

    async function createDataQueue(payload) {
        await axios.post(`${BASE_URL_API}/queue/omni-type`, payload).then(res => {
            return res.data
        }).catch(function (error) {
            console.log(error)
        });
    }


    async function updateDataQueue(id, payload) {
        await axios.put(`${BASE_URL_API}/queue/omni-type/${id}`, payload).then(res => {
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
        await axios.delete(`${BASE_URL_API}/queue/omni-type/${id}`).then(res => {

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

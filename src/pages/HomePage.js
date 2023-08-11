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

import {Box, Button, CircularProgress, Sheet, TextField, Typography} from "@mui/joy";
import Header from "../components/Header";
import React, {useEffect, useState, useCallback} from "react";
import {useTestDataService} from "../api/useTestDataService";
import DataViewModal from "../components/DataViewModal";
import SearchIcon from '@mui/icons-material/Search';
import QueueList from "../components/QueueList";
import AddQueueTypeDialog from "../components/AddQueueTypeDialog";
import DeleteDialogConfirmation from "../components/DeleteDialogConfirmation";

const styles = {
    container: {
        width: '100%', display: 'flex', justifyContent: 'center', padding: 4
    },
    queueList: {
        borderRadius: 'sm',
        p: 4,
        gap: 2
    }
}

export const HomePage = () => {

    const {
        queues,
        fetchAllTestDataTypes,
        queuesLoading,
        getTestDataType,
        testData,
        createDataQueue,
        updateDataQueue,
        deleteQueue
    } = useTestDataService()
    const [displayDataViewModal, setDisplayDataViewModal] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');
    const [displayAddQueueTypeDialog, setDisplayAddQueueTypeDialog] = useState(false);
    const [openedEditQueue, setOpenedEditQueue] = useState(null);
    const [displayDeleteQueueDialog, setDisplayDeleteQueueDialog] = useState(false);
    const [deleteQueueItem, setDeleteQueueItem] = useState(null);


    useEffect(() => {
        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.height = '';
            document.body.style.overflow = '';
        }

    }, []);


    const handleCreateNewDataQueue = async (payload) => {
        await createDataQueue(payload)
        await fetchAllTestDataTypes()
        setDisplayAddQueueTypeDialog(false)
        setOpenedEditQueue(null)
    }

    const handleUpdateDataQueue = async (payload) => {
        await updateDataQueue(payload.id, payload)
        setDisplayAddQueueTypeDialog(false)
        setOpenedEditQueue(null)

    }

    const handleChange = (event) => {
        setSearchFilter(event.target.value);
    };

    const handleCloseModal = () => {
        setDisplayDataViewModal(false)
    }

    const handleConfirmDeleteDataQueue = async () => {
        if (deleteQueueItem != null) {
            await deleteQueue(deleteQueueItem.id)
            await fetchAllTestDataTypes()
            setDisplayDeleteQueueDialog(false)
            setDeleteQueueItem(null)
        }
    }

    const handleCloseDeleteConfirmationModal = () => {
        setDisplayDeleteQueueDialog(false)
        setDeleteQueueItem(null)
    }

    const handleOpenDeleteConfirmationModal = (queue) => {
        setDeleteQueueItem(queue)
        setDisplayDeleteQueueDialog(true)
    }

    const handleOpenEditQueue = (data) => {
        setOpenedEditQueue(data)
        setDisplayAddQueueTypeDialog(true)
    }

    const handleCloseAddTypeQueueModal = () => {
        setDisplayAddQueueTypeDialog(false)
        setOpenedEditQueue(null)
    }

    const handleOpenAddTypeQueueModal = () => {
        setDisplayAddQueueTypeDialog(true)
    }

    const handleFetchTestData = useCallback(async (testDataType) => {
        await getTestDataType(testDataType)
        setDisplayDataViewModal(true)
    }, []);

    useEffect(() => {
        fetchAllTestDataTypes()
    }, []);

    return (
        <Box sx={{height: '100vh'}}>
            <Header/>
            {queuesLoading &&
                <Box sx={styles.container}>
                    <CircularProgress variant="soft" size={"md"}/>
                </Box>}
            {!queuesLoading && queues.length === 0 &&
                <Box sx={styles.container}>
                    <Typography textColor="neutral.600" fontWeight="lg" level="h4">Data queues are not
                        created</Typography>
                </Box>}
            <Sheet sx={styles.queueList}>
                {!queuesLoading && queues.length > 0 &&
                    <Box id={"searchBox"} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Box width={"20%"}>
                            <TextField
                                onChange={handleChange}
                                value={searchFilter}
                                placeholder="Search..."
                                startDecorator={<SearchIcon/>}
                            />
                        </Box>
                        <Box>
                            <Button onClick={handleOpenAddTypeQueueModal} variant="solid" size={"sm"}>
                                Add
                            </Button>
                        </Box>
                    </Box>
                }
                <QueueList
                    list={queues.filter(item => item.dataType.toLowerCase().includes(searchFilter.toLowerCase()))}
                    openEdit={handleOpenEditQueue}
                    openDelete={handleOpenDeleteConfirmationModal}
                    fetchData={handleFetchTestData}/>
            </Sheet>
            {displayDataViewModal &&
                <DataViewModal testData={testData} open={displayDataViewModal} close={handleCloseModal}/>}
            {displayDeleteQueueDialog &&
                <DeleteDialogConfirmation queueItem={deleteQueueItem} open={displayDeleteQueueDialog} confirmDelete={handleConfirmDeleteDataQueue} close={handleCloseDeleteConfirmationModal}/>}
            {displayAddQueueTypeDialog &&
                <AddQueueTypeDialog update={handleUpdateDataQueue} openedEditQueue={openedEditQueue} testData={testData} open={displayAddQueueTypeDialog}
                                    create={handleCreateNewDataQueue} close={handleCloseAddTypeQueueModal}/>}
        </Box>
    )
}
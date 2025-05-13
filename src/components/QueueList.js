/*
 * This file is part of the auto1-oss/test-data-storage-ui.
 *
 * (c) AUTO1 Group SE https://www.auto1-group.com
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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

import DataQueueCard from "./DataQueueCard";
import React, {memo} from 'react'
import {Box} from "@mui/joy";
import {Virtuoso} from 'react-virtuoso'

const styles = {
    cardsContainer: {
        borderRadius: 'sm',
        display: 'grid',
        gap: 2,
        paddingTop: 2
    }
}


const QueueList = ({list, fetchData, openEdit, openDelete}) => {

    function getListHeight() {
        const searchBar = document.getElementById('searchBox');
        if (searchBar != null) {
            const targetRect = searchBar.getBoundingClientRect();

            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            return  viewportHeight - targetRect.bottom - targetRect.height;
        } else return '90vh'
    }

    const handleClickFetchItem = (dataItem) => {
        fetchData(dataItem)
    }

    const handleOpenEdit = (dataItem) => {
        openEdit(dataItem)
    }

    const handleOpenDelete = (dataItem) => {
        openDelete(dataItem)
    }

    return (
        <Box sx={styles.cardsContainer}>
            <Virtuoso
                style={{height: getListHeight()}}
                data={list}
                itemContent={(index, queue) => (
                    <Box key={queue.dataType} sx={{paddingTop: '8px'}}>
                        <DataQueueCard key={queue.dataType} queue={queue} fetchItem={handleClickFetchItem}
                                       openDelete={handleOpenDelete} openEdit={handleOpenEdit}/>
                    </Box>
                )}
            />
        </Box>
    )
}

export default memo(QueueList);
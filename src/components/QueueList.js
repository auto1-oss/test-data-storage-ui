import DataQueueCard from "./DataQueueCard";
import React, {memo} from 'react'
import {Box} from "@mui/joy";

const styles = {
    cardsContainer: {
        borderRadius: 'sm',
        display: 'grid',
        gap: 2,
        bgcolor: 'background.componentBg'
    }
}


const QueueList = ({list, fetchData, openEdit, openDelete}) => {

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
            {list.map((queue) => (
                <DataQueueCard key={queue.dataType} queue={queue} fetchItem={handleClickFetchItem} openDelete={handleOpenDelete} openEdit={handleOpenEdit}/>
            ))}
        </Box>
    )
}

export default memo(QueueList);
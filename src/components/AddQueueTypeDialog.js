import React, {useState} from 'react';
import Button from '@mui/joy/Button';
import TextField from '@mui/joy/TextField';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import ModalClose from "@mui/joy/ModalClose";
import {Box, IconButton} from "@mui/joy";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

function isDuplicateKey(metadata, key) {
    if (metadata === null) {
        return false
    } else return Object.keys(metadata).includes(key)

}

const NewParameter = ({save, cancel, metadata}) => {

    const [values, setFields] = useState({
        name: '',
        value: ''
    });

    const handleChange = (event) => {
        setFields({...values, [event.target.name]: event.target.value})
    };

    const handleAdd = () => {
        save(values)
    };

    const handleCancel = () => {
        setFields({
            name: '',
            value: ''
        })
        cancel()
    };

    return (
        <Box sx={{display: 'flex', gap: 1, justifyContent: 'space-between', paddingTop: 1}}>
            <Box>
                <TextField onChange={handleChange} name="name" id="new-param-name" placeholder={"Name"}/>
            </Box>
            <Box>
                <TextField onChange={handleChange} name="value" id="new-param-value" placeholder={"Value"}/>
            </Box>
            <Box display={"flex"} alignItems={"center"} sx={{gap: 1}}>
                <IconButton disabled={values.name.length === 0 || values.value.length === 0 || isDuplicateKey(metadata, values.name)} color="success" variant={"plain"} onClick={handleAdd}>
                    <DoneIcon/>
                </IconButton>
                <IconButton onClick={handleCancel} color="danger" variant={"plain"}>
                    <CancelIcon/>
                </IconButton>
            </Box>

        </Box>
    );
};

const ParametersTable = ({metadata, deleteProperty}) => {


    return (
        <Box >
            {Object.entries(metadata).map(([key, value]) => {
                return(
                    <Box display={"flex"} key={key} sx={{paddingTop: 1, alignItems: 'center'}} >
                        <Box sx={{width: "40%"}} >
                            <Typography fontSize="sm" fontWeight="lg">
                                {key}
                            </Typography>
                        </Box>
                        <Box sx={{width: "40%"}} >
                            <Typography  fontSize="sm" fontWeight="lg">
                                {value}
                            </Typography>
                        </Box>
                        <Box  display={"flex"} alignItems={"center"} sx={{width: '10%'}}>
                            <IconButton onClick={e => {
                                e.preventDefault();
                                deleteProperty(key)
                            }} variant={"plain"}  color="neutral" >
                                <DeleteIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                )
            })}
        </Box>
    );


}

export default function AddQueueTypeDialog({openedEditQueue, open, close, create, update}) {

    const [dataQueueName, setDataQueueName] = useState(openedEditQueue != null ? openedEditQueue.dataType : '');
    const [displayNewPropertyLine, setDisplayNewPropertyLine] = useState(false);
    const [metadata, setMetadata] = useState(openedEditQueue != null && openedEditQueue.meta != null ? JSON.parse(openedEditQueue.meta) : null);

    const clickDisplayNewProperty = () => {
        setDisplayNewPropertyLine(true)
    }

    const handleClickAddParameter = (values) => {
        const newParam = {}
        newParam[values.name] = values.value
        setMetadata({...metadata, ...newParam})
        setDisplayNewPropertyLine(false);
    };

    const handleClickCancelAddParameter = () => {
        setDisplayNewPropertyLine(false);
    };

    const handleChangeName = (event) => {
        setDataQueueName(event.target.value);
    };

    const handleCreateDataQueueItem = () => {
        const payload = {"dataType": dataQueueName}
        if (metadata != null) {
            payload.meta = JSON.stringify(metadata);
        }
        create(payload)
    }

    const handleUpdateDataQueueItem = () => {
        const payload = {"id": openedEditQueue.id, "dataType": dataQueueName}
        if (metadata != null) {
            payload.meta = JSON.stringify(metadata);
        }
        update(payload)
    }


    function handleClickDelete(key) {
        const copyMeta = {...metadata}
        delete copyMeta[key]
        setMetadata(copyMeta)
    }

    return (
        <React.Fragment>
            <Modal open={open} onClose={close}>
                <ModalDialog
                    size={"lg"}
                    aria-labelledby="add-queue-modal-dialog-title"
                    aria-describedby="add-queue-modal-dialog-description"
                    sx={{
                        width: "40%",
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Typography
                        id="add-queue-modal-dialog-title"
                        component="h2"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                    >
                        {openedEditQueue != null ? "Edit Queue" : "Create Queue"}
                    </Typography>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            close();
                        }}
                    >
                        <Stack spacing={2}>
                            <TextField
                                autoFocus={true}
                                required
                                label="Name"
                                onChange={handleChangeName}
                                value={dataQueueName}
                                placeholder="Name"
                            />
                            <Box>
                                <Box sx={{display: 'flex', gap: 1}}>
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Typography level={"body1"} fontWeight="lg" textColor="neutral.700">
                                            Properties
                                        </Typography>
                                    </Box>
                                    {!displayNewPropertyLine &&
                                        <Box>
                                            <IconButton onClick={clickDisplayNewProperty} variant="plain">
                                                <AddIcon/>
                                            </IconButton>
                                        </Box>}
                                </Box>
                                {metadata != null &&
                                    <Box>
                                        <ParametersTable metadata={metadata} deleteProperty={handleClickDelete}/>
                                    </Box>}
                                {displayNewPropertyLine &&
                                    <Box>
                                        <NewParameter metadata={metadata} save={handleClickAddParameter} cancel={handleClickCancelAddParameter}/>
                                    </Box>}
                            </Box>
                            <Box sx={{display: 'flex', gap: 1, justifyContent: 'flex-end'}}>
                                <Button variant="plain" color="neutral" onClick={close}>
                                    Cancel
                                </Button>
                                <Button disabled={displayNewPropertyLine} variant="solid"
                                        onClick={openedEditQueue != null ? handleUpdateDataQueueItem : handleCreateDataQueueItem}>
                                    {openedEditQueue != null ? "Save" : "Add"}
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

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

import React, {useState} from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import {Box, ModalDialog} from "@mui/joy";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Divider from '@mui/joy/Divider';
import Button from '@mui/joy/Button';
import TextField from "@mui/joy/TextField";
import Stack from "@mui/joy/Stack";

export default function DeleteDialogConfirmation({open, close, confirmDelete, queueItem}) {

    const [dataQueueName, setDeleteFieldInput] = useState('');

    const handleChangeDeleteInput = (event) => {
        setDeleteFieldInput(event.target.value);
    };

    const handleClickConfirmDelete = () => {
        confirmDelete()
    }

    return (
        <Modal
            aria-labelledby="delete-dialog-modal-title"
            aria-describedby="delete-dialog-modal-description"
            open={open}
            onClose={close}
        >
            <ModalDialog variant="outlined" role="alertdialog">
                <Typography
                    id="alert-dialog-modal-title"
                    component="h2"
                    level="inherit"
                    fontSize="1.25em"
                    mb="0.25em"
                    startDecorator={<WarningRoundedIcon />}
                >
                    {`Delete ${queueItem.dataType} queue?`}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={2}>
                    <Typography
                        id="delete-dialog-modal-description"
                        textColor="text.tertiary"
                    >
                        Deleting the queue will delete all data associated with the queue. Type delete if you want to proceed and click delete button
                    </Typography>
                    <Box>
                        <TextField onChange={handleChangeDeleteInput} name="deleteInput" id="delete-input" placeholder={"Type 'Delete' to confirm"}/>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button variant="plain" color="neutral" onClick={close}>
                            Cancel
                        </Button>
                        <Button variant="solid" color="danger" onClick={handleClickConfirmDelete} disabled={dataQueueName.toLowerCase() !== "delete"}>
                            Permanently Delete
                        </Button>
                    </Box>
                </Stack>
            </ModalDialog>
        </Modal>
    );
}

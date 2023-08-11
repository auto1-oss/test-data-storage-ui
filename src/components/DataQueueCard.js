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

import * as React from 'react';
import Typography from '@mui/joy/Typography';
import {Box, Chip, IconButton, ListItemDecorator, Menu, MenuItem} from "@mui/joy";
import DownloadIcon from '@mui/icons-material/Download';
import Sheet from "@mui/joy/Sheet";
import {DeleteForever, Edit, MoreVert} from "@mui/icons-material";

export default function DataQueueCard({queue, fetchItem, addData, openEdit, openDelete}) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickFetchItem = () => {
        fetchItem(queue.dataType)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSelectEditMenu = () => {
        setAnchorEl(null);
        openEdit(queue)
    };

    const handleSelectDeleteMenu = () => {
        setAnchorEl(null);
        openDelete(queue)
    };

    const handleClickAddData = () => {
        addData()
    }

    return (
        <Sheet row variant="outlined"  sx={(theme) => ({
            borderRadius: "8px",
            p: 2,
            gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
            transition: 'transform 0.3s, border 0.3s',
            boxShadow: 'none',
            '&:hover': {
                borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                transform: 'translateY(-2px)',
            }
        })}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography fontWeight="md"  >
                        {queue.dataType}
                    </Typography>
                </Box>
                <Box sx={{gap: 1.5, display: 'flex', justifyContent: 'flex-end'}}>
                    <Chip variant={"soft"} color={queue.count === 0 ? 'danger' : 'primary'} sx={{borderRadius: '8px'}}>{queue.count}</Chip>
                    <IconButton
                        onClick={handleClickFetchItem}
                        disabled={queue.count === 0}
                        size="sm"
                        variant="outlined"
                        color="primary"
                    >
                        <DownloadIcon/>
                    </IconButton>
                    <IconButton
                        id="more-options-button"
                        aria-controls={open ? 'more-options-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        size="sm"
                        variant="outlined"
                        color="primary"
                        onClick={handleClickMenu}
                    >
                        <MoreVert />
                    </IconButton>
                    <Menu
                        id="more-options-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        aria-labelledby="more-options-button"
                        placement="bottom-end"
                    >
                        <MenuItem onClick={handleSelectEditMenu}>
                            <ListItemDecorator>
                                <Edit />
                            </ListItemDecorator>{' '}
                            Edit
                        </MenuItem>
                        <MenuItem onClick={handleSelectDeleteMenu} >
                            <ListItemDecorator >
                                <DeleteForever />
                            </ListItemDecorator>{' '}
                            Delete
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
        </Sheet>
    );
}

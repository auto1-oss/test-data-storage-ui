import * as React from 'react';
import Typography from '@mui/joy/Typography';
import {Box, Chip, IconButton, ListItemDecorator, Menu, MenuItem} from "@mui/joy";
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
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
                    <Typography fontWeight="md" textColor="neutral.700" >
                        {queue.dataType}
                    </Typography>
                </Box>
                <Box sx={{gap: 1.5, display: 'flex', justifyContent: 'flex-end'}}>
                    <Chip variant={"soft"} sx={{borderRadius: '8px'}}>{queue.count}</Chip>
                    {/*<Box>*/}
                    {/*    <IconButton*/}
                    {/*        onClick={handleClickAddData}*/}
                    {/*        size="sm"*/}
                    {/*        variant="outlined"*/}
                    {/*        color="primary"*/}
                    {/*    >*/}
                    {/*        <AddIcon/>*/}
                    {/*    </IconButton>*/}
                    {/*</Box>*/}
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

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
import {Box, IconButton, Typography} from "@mui/joy";
import GitHubIcon from '@mui/icons-material/GitHub';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useColorScheme } from '@mui/joy/styles';
import logoSvg from '../logo.svg';

const styles = {
    header: {
        p: 2,
        gap: 2,
        bgcolor: 'background.surface',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gridColumn: '1 / -1',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
    }
}

export default function Header() {

    function ColorSchemeToggle() {
        const { mode, setMode } = useColorScheme();
        const [mounted, setMounted] = React.useState(false);
        React.useEffect(() => {
            setMounted(true);
        }, []);
        if (!mounted) {
            return <IconButton size="sm" variant="soft" color="neutral" />;
        }
        return (
            <IconButton
                id="toggle-mode"
                size="sm"
                variant="outlined"
                color="primary"
                onClick={() => {
                    if (mode === 'light') {
                        setMode('dark');
                    } else {
                        setMode('light');
                    }
                }}
            >
                {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
            </IconButton>
        );
    }

    return (
        <Box
            sx={styles.header}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <Box paddingRight={2}>
                    <img style={{width: "30px", height: '30px'}} src={logoSvg} alt="Logo"  />
                </Box>
                <Typography component="h1" fontWeight="xl">
                    Test Data Service
                </Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="primary"
                    component="a"
                    href="https://github.com/auto1-oss/test-data-storage-ui"
                >
                    <GitHubIcon/>
                </IconButton>
                <Box paddingLeft={1}>
                    <ColorSchemeToggle />
                </Box>
            </Box>
        </Box>
    );
}
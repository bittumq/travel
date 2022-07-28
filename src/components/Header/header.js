import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './style';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';




const Header = ({ data, setCoordinates }) => {

    const classes = useStyles();
    const { themeToggle, isDarkMode } = data;
    const [autocomplete, setAutocomplete] = useState(null);

    const onLoad = (autoC) => setAutocomplete(autoC);
    // const onLoad = (a) => {
    //     alert("-----")

    // }

    const onPlaceChanged = () => {
        // const lat = autocomplete.getPlace().geometry?.location.lat();
        // const lng = autocomplete.getPlace().geometry?.location.lng();
        const latitude = autocomplete?.getPlace?.geometry?.location?.lat();
        const longitude = autocomplete?.getPlace?.geometry?.location?.lng();

        setCoordinates({ latitude, longitude });

        console.log(onPlaceChanged, "qqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
    };






    return (
        <AppBar position="static" style={{ backgroundColor: "#9d954df5" }}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title} >
                    {/* Travel Advisor */}
                    <div style={{
                        width: "136px",
                        height: "66px"
                    }}>
                        <img src="https://www.logo.wine/a/logo/Trivago/Trivago-Logo.wine.svg" alt="pic" style={{
                            objectFit: "cover",
                            width: "149%",
                            height: "100%"

                        }} />
                    </div>
                </Typography>
                {
                    isDarkMode ? <EmojiObjectsIcon onClick={themeToggle} fontSize={'large'
                    } /> : <EmojiObjectsIcon onClick={themeToggle} fontSize={'large'
                    } htmlColor="yellow" />
                }
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore New Places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder='Search...' className={{ root: classes.inputRoot, input: classes.inputInput }} style={{ marginLeft: "45px" }} />
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar >
    )
}
export default Header;
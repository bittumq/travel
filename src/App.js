import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/header';
import List from './components/List/list';
import Map from './components/Map/map';
import { getPlacesData } from './api';
//dark mode light mode  Functionality
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from "./components/Theme/theme";

const App = () => {
    const [places, setPlacses] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, [coordinates]);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating])

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true)
            getPlacesData(type, bounds?.sw, bounds?.ne)
                .then((data) => {
                    //console.log(data);
                    setPlacses(data?.filter((place) => place.name && place.num_reviews > 0));
                    setFilteredPlaces([]);
                    setIsLoading(false);
                })
        }
    }, [type, bounds]);



    // theme change toggle =================---------------->>>>>>>>>>>>
    const [isTheme, setTheme] = useState("light");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const themeToggle = () => {
        setIsDarkMode(!isDarkMode);
        isTheme === "light" ? setTheme("dark") : setTheme("light");
    };

    return (
        <>
            <ThemeProvider theme={isTheme === "light" ? lightTheme : darkTheme}>
                <GlobalStyles />
                <CssBaseline />
                <Header setCoordinates={setCoordinates} data={{ isTheme, setTheme, themeToggle, isDarkMode, setIsDarkMode }} />
                <Grid container spaceing={3} style={{ width: "100%" }}>
                    <Grid item xs={12} md={4}>
                        <List
                            places={filteredPlaces.length ? filteredPlaces : places}
                            childClicked={childClicked}
                            isLoading={isLoading}
                            type={type}
                            setType={setType}
                            rating={rating}
                            setRating={setRating}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Map
                            setCoordinates={setCoordinates}
                            setBounds={setBounds}
                            coordinates={coordinates}
                            places={filteredPlaces.length ? filteredPlaces : places}
                            setChildClicked={setChildClicked}
                        />
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}
export default App;
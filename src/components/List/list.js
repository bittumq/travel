import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import useStyles from './style';
import PlaceDetails from '../PlaceDetails/placeDetails';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();

    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, index) => elRefs[index] || createRef());

        setElRefs(refs);

    }, [places]);

    // const places = [
    //     { name: 'Cool Place' },
    //     { name: 'Best Beer' },
    //     { name: 'Steak' },
    //     { name: 'Cool Place' },
    //     { name: 'Best Beer' },
    //     { name: 'Steak' },
    //     { name: 'Cool Place' },
    //     { name: 'Best Beer' },
    //     { name: 'Steak' },
    // ];

    return (
        <div className={classes.container} >
            <Typography variant="h4" style={{ color: "#6c301a" }}>
                Restaurants, Hotel & Attractions around you
            </Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <div style={{ backgroundColor: "pink" }}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Types</InputLabel>
                            <Select value={type} onChange={(e) => setType(e.target.value)}>
                                <MenuItem value="restaurants">Resturents</MenuItem>
                                <MenuItem value="hotels">Hotels</MenuItem>
                                <MenuItem value="attractions">Attractions</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Rating</InputLabel>
                            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                                <MenuItem value={0}>All</MenuItem>
                                <MenuItem value={3}>Above 3.0</MenuItem>
                                <MenuItem value={4}>Above 4.0</MenuItem>
                                <MenuItem value={4.5}>Above 4.5</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, index) => (
                            <Grid ref={elRefs[index]} item key={index} xs={12}>
                                <PlaceDetails
                                    place={place}
                                    selected={Number(childClicked) === index}
                                    refProp={elRefs[index]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div >
    )
}

export default List;
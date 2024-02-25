import * as moment from 'moment';
import React from 'react'
import { Box, Grid, Typography } from '@mui/material';
import styles from './styles.module.css'
import clsx from 'clsx';
import WindImage from '../../images/wind.png';
import HumidityImage from '../../images/humidity-sensor.png';
import CloudImage from '../../images/cloud.png';
import CelsiusImage from '../../images/celsius.png';
import FahrenheitImage from '../../images/fahrenheit.png';
import { convertToCelsius, convertToF } from '../../services/utils';
export const WeatherCard = (props) => {
    const { dataList, isCelsius } = props;
    const renderTemperature = (min, max) => {
        if(isCelsius) return convertToCelsius(min, max);
        return (+min + +max)/2;
    }
    const convertIconNumber = (data) => {
        let urlImg = `https://developer.accuweather.com/sites/default/files/${data}-s.png`;
        if (+data < 10) urlImg = `https://developer.accuweather.com/sites/default/files/0${data}-s.png`;
        return urlImg;
    }
    const renderImageTemperature = () => {
        return isCelsius ? CelsiusImage : FahrenheitImage;
    }
    return (
        <Grid container ml={5} spacing={2}>
            {
                dataList.map((item, index) => (
                    <Grid key={index} item xs={3} className={clsx(styles.weatherTodayContainer, {[styles.activeWeatherToday]: index === 0})} mr={6} mt={4}>
                        <Grid container alignItems="center" mt={2} >
                            <Grid item xs={6} className={styles.textCenter} mb={3}>
                                <Typography className={clsx(styles.bold, styles.lgTitle)}>
                                    {moment(item?.Date).format('dddd')}
                                </Typography>
                                <Typography className={styles.light}>
                                    {item?.Day?.IconPhrase}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={styles.textCenter}>
                                <img src={convertIconNumber(item?.Day?.Icon)} alt="" className={styles.lgIcon} />
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" mb={2}>
                            <Grid item xs={6} className={styles.textCenter}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={1}>
                                    <img src={WindImage} alt="" className={styles.smallIcon} />
                                    <Typography pl={1} className={styles.mdSubtitle}>
                                        {item?.Day?.Wind?.Speed?.Value} mi/h
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src={HumidityImage} alt="" className={styles.smallIcon} />
                                    <Typography pl={1} className={styles.mdSubtitle}>
                                        {item?.Day?.RainProbability} %
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} className={styles.textCenter}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography className={styles.xlText} mr={1}>
                                        {renderTemperature(item?.Temperature?.Minimum?.Value, item?.Temperature?.Maximum?.Value)}
                                    </Typography>
                                    <img src={renderImageTemperature()} alt="" className={styles.mdIcon} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                ))
            }
        </Grid >
    )
}

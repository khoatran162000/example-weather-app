import React from 'react'
import WindImage from '../../images/wind.png';
import HumidityImage from '../../images/humidity-sensor.png';
import CloudImage from '../../images/cloud.png';
import StormImage from '../../images/storm.png';
import SnowImage from '../../images/snow.png';
import { Box, Grid, Typography } from '@mui/material';
import styles from './styles.module.css'
import clsx from 'clsx';
import CelsiusImage from '../../images/celsius.png';
import FahrenheitImage from '../../images/fahrenheit.png';
import { convertToCelsius, convertToF } from '../../services/utils';

export const TodayTab = (props) => {
    const {data, isCelsius} = props;
    const renderTemperature = (min, max) => {
        if(isCelsius) return convertToCelsius(min, max);
        return (+min + +max)/2;
    }
    const renderImageTemperature = () => {
        return isCelsius ? CelsiusImage : FahrenheitImage;
    }
    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={5} className={styles.weatherTodayContainer} mr={4}>
                <Grid container alignItems="center" mt={2} >
                    <Grid item xs={12} className={styles.textCenter}>
                        <Typography className={clsx(styles.bold, styles.lgTitle)}>
                            Day
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={styles.textCenter} mb={2} fontSize={14}>
                       {data?.Day?.LongPhrase}
                    </Grid>
                </Grid>
                <Grid container alignItems="center" mb={2}>
                    <Grid item xs={6} className={styles.textCenter}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={1}>
                            <img src={WindImage} alt="" className={styles.smallIcon} />
                            <Typography pl={1} className={styles.mdSubtitle}>
                                {data?.Day?.Wind?.Speed?.Value} mi/h
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={2}>
                            <img src={HumidityImage} alt="" className={styles.smallIcon} />
                            <Typography pl={1} className={styles.mdSubtitle}>
                                {data?.Day?.RainProbability} %
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={1}>
                            <img src={StormImage} alt="" className={styles.smallIcon} />
                            <Typography pl={1} className={styles.mdSubtitle}>
                                {data?.Day?.ThunderstormProbability} %
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} className={styles.textCenter}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={1}>
                            <Typography className={styles.xlText} mr={1}>
                            {renderTemperature(data?.Temperature?.Minimum?.Value, data?.Temperature?.Maximum?.Value)}
                            </Typography>
                            <img src={renderImageTemperature()} alt="" className={styles.mdIcon} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={1}>
                            <Typography pl={1} className={styles.mdSubtitle} mr={1}>
                                {data?.Day?.IceProbability} %
                            </Typography>
                            <img src={SnowImage} alt="" className={styles.smallIcon} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={5} className={styles.weatherTodayContainer} mr={4}>
                <Grid container alignItems="center" mt={2} >
                    <Grid item xs={12} className={styles.textCenter}>
                        <Typography className={clsx(styles.bold, styles.lgTitle)}>
                            Night
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={styles.textCenter} mb={2} fontSize={14}>
                       {data?.Night?.LongPhrase}
                    </Grid>
                </Grid>
                <Grid container alignItems="center" mb={2}>
                    <Grid item xs={6} className={styles.textCenter}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={1}>
                            <img src={WindImage} alt="" className={styles.smallIcon} />
                            <Typography pl={1} className={styles.mdSubtitle}>
                                {data?.Night?.Wind?.Speed?.Value} mi/h
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={2}>
                            <img src={HumidityImage} alt="" className={styles.smallIcon} />
                            <Typography pl={1} className={styles.mdSubtitle}>
                                {data?.Night?.RainProbability} %
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={1}>
                            <img src={StormImage} alt="" className={styles.smallIcon} />
                            <Typography pl={1} className={styles.mdSubtitle}>
                                {data?.Night?.ThunderstormProbability} %
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} className={styles.textCenter}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={1}>
                            <Typography className={styles.xlText} mr={1}>
                            {renderTemperature(data?.Temperature?.Minimum?.Value, data?.Temperature?.Maximum?.Value)}
                            </Typography>
                            <img src={renderImageTemperature()} alt="" className={styles.mdIcon} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mb={1}>
                            <Typography pl={1} className={styles.mdSubtitle} mr={1} >
                                {data?.Night?.IceProbability} %
                            </Typography>
                            <img src={SnowImage} alt="" className={styles.smallIcon} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
           
           
           
        </Grid>
    )
}

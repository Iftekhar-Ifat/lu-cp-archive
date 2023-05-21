import React from 'react'
import styles from '../../styles/Profile/profile.module.css';
import { Grid } from '@mui/material';

const SinglePlatform = ({ platform, isRegistered }) => {
    // change the props isRegistered to SEE the difference
    console.log(isRegistered);
    console.log(platform);
    return (
        <Grid item xs={2} sm={4} md={4} style={{marginBottom: '3rem'}}>
            <div className={styles.card_wrapper}>
                {/* icon and name */}
                <div className={styles.icon_and_name}>
                    <img src={platform.icon} style={{ width: '50px', height: '45px' }} alt="icon-image" />
                    <p className={styles.platform_name}> {platform.name}</p>
                </div>
                <hr className={styles.hr} />
                {/* take info */}
                <div className={styles.info}>
                    <img
                        src="../images/icons/person.svg"
                        style={{
                            width: '25px',
                            height: '25px',
                            borderRadius: '50%',
                            objectFit: 'contain',
                        }}
                        alt="site-icon"
                    />
                    {/* input */}
                    <input type="text" className={styles.input} placeholder='enter your handle...' />
                    {/* save button */}
                    {
                        isRegistered ? <button className={styles.save_button}>Edit</button> : <button className={styles.save_button}>Save</button>
                    }
                </div>
                {
                    isRegistered && (
                        <>
                            <div className={styles.extra_info}>
                                <p>Current Rating: <span style={{ color: '#5BD9EA', fontWeight: 600 }}>{platform.rating}</span></p>
                                <p style={{ marginTop: '-10px' }} >(Max Ratting: <span style={{ color: '#5BD9EA', fontWeight: 600 }}>{platform.maxRating}</span>) </p>
                            </div>
                            <div className={styles.extra_info}>
                                <p>Current Rank: <span style={{ color: '#B799FF', fontWeight: 600 }}>{platform.rank}</span></p>
                                <p style={{ marginTop: '-10px' }} >(Max Ranking: <span style={{ color: '#5BD9EA', fontWeight: 600 }}>{platform.maxRank}</span>) </p>
                            </div>
                        </>
                    )
                }
            </div>
        </Grid>

    )
}



export default SinglePlatform
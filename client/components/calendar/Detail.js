import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DataContext } from '../../store/GlobalState';
import moment from 'moment';
import { motion } from 'framer-motion';
import { User, MapPin } from 'react-feather';

import styles from '../../styles/calendar/Detail.module.scss';

const DetailModal = () => {
  const [open, setOpen] = useState(false);

  const { state, dispatch } = useContext(DataContext);

  const { detail } = state;

  useEffect(() => {
    if (Object.keys(detail).length !== 0) {
      setOpen(true);
    }
  }, [detail]);

  const closeDetail = () => {
    dispatch({ type: 'CALENDAR_DETAIL', payload: {} });
    setOpen(false);
  };

  if (!open) {
    return null;
  }
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={closeDetail}
      className={styles.modal}>
      <motion.div
        onClick={(e)=>{e.stopPropagation()}}
        animate={{ scale: [0.7, 1.05, 1] }}
        transition={{ duration: 0.3 }}
        className={styles.modalBody}>
        <h1 className={styles.title}>{detail.eventName}</h1>
          <div className={styles.info}>
            <User className={styles.icon} size={20} />
            <p>{detail.teacher}</p>
          </div>
          <div className={styles.info}>
            <MapPin className={styles.icon} size={20} />
            <p>{detail.location}</p>
        </div>
        <p>
          {moment(detail.startTime).format('HH:mm DD.MM.YYYY')} -{' '}
          {moment(detail.endTime).format('HH:mm DD.MM.YYYY')}
        </p>
        <p className={styles.description}>{detail.description}</p>
      </motion.div>
    </motion.div>
  );
};

export default DetailModal;
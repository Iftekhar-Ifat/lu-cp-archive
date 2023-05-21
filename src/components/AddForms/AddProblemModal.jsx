import { X } from '@geist-ui/icons';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from '../../styles/components/AddProblemModal.module.css';
import ModalItems from './ModalItems';

const AddProblemModal = ({ show, setShow, allTags }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalWrapper}>
            <OutsideClickHandler
                onOutsideClick={() => {
                    setShow(false);
                }}
            >
                <div className={styles.modal}>
                    <div className={styles.card_header}>
                        <div style={{ cursor: 'pointer' }}>
                            <X
                                size={28}
                                onClick={() => setShow(false)}
                                color="white"
                            />
                        </div>
                    </div>
                    <ModalItems
                        modalFor={'problems'}
                        show={show}
                        setShow={setShow}
                        allTags={allTags}
                    />
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default AddProblemModal;

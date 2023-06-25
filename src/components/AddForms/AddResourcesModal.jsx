import X from '@geist-ui/icons/x';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from '../../styles/components/AddProblemModal.module.css';
import ModalItems from './ModalItems';

const AddResourcesModal = ({ show, setShow }) => {
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
                <div className={styles.modal} style={{ minHeight: '250px' }}>
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
                        modalFor={'resources'}
                        show={show}
                        setShow={setShow}
                    />
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default AddResourcesModal;

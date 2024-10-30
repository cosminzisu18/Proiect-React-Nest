import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createPortfolio, updatePortfolio } from '../../../services/portfolioService';
import toastService from "../../../services/toastService";
import './PortfolioModal.css'; 

const PortfolioModal = ({ isOpen, onClose, formData, setFormData, onFormSubmit }) => {
    const [imageInputMethod, setImageInputMethod] = React.useState('url');
    const [descriptionLength, setDescriptionLength] = React.useState(formData.description.length);
    const [loading, setLoading] = React.useState(false);
    
    const titleRef = React.useRef(null);
    const descriptionRef = React.useRef(null);
    const imageRef = React.useRef(null);
    const clientLinkRef = React.useRef(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (name === "description") {
            setDescriptionLength(value.length);
        }
    };

    const handleImageInputMethodChange = (e) => {
        setImageInputMethod(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toastService.error('Te rugăm să încarci un fișier de tip imagine!');
                return;
            }
            setFormData((prevData) => ({
                ...prevData,
                image: file,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                image: '', 
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('clientLink', formData.clientLink);
            formDataToSend.append('status', formData.status);
    
            if (imageInputMethod === 'file' && formData.image) {
                formDataToSend.append('image', formData.image); 
            } else if (imageInputMethod === 'url') {
                formDataToSend.append('image', formData.image);
            } else {
                toastService.error('Trebuie să specifici o imagine validă!');
                    return; 
            }   
    
            let response;
            if (formData.id) {
                formDataToSend.append('id', formData.id);
                response = await updatePortfolio(formDataToSend);
                toastService.success('Portofoliul a fost modificat cu succes!');
            } else {
                response = await createPortfolio(formDataToSend);
                toastService.success('Portofoliul a fost creat cu succes!');
            }
            
            onFormSubmit();
            onClose();
        } catch (error) {
            console.error('Eroare la trimiterea formularului:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Eroare la salvarea portofoliului!';
            toastService.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="portfolio-modal-title"
            aria-describedby="portfolio-modal-description"
        >
            <Box className="modal-box">
                <form className="submission-form" onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Typography id="portfolio-modal-title" className="modal-title" component="h2" align="center">
                        {formData.id ? 'Editare Lucrare' : 'Adaugă o Lucrare'}
                    </Typography>

                   
                    <label className="modal-label">Titlu</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Titlu"
                        className="modal-input"
                        ref={titleRef}
                    />

                    <label className="modal-label">Descriere ({descriptionLength}/500)</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descriere"
                        className="modal-textarea"
                        ref={descriptionRef}
                    />

                    <label className="modal-label">Imagine</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                value="url"
                                checked={imageInputMethod === 'url'}
                                onChange={handleImageInputMethodChange}
                            />
                            URL Imagine
                        </label>
                        <label style={{ marginLeft: '16px' }}>
                            <input
                                type="radio"
                                value="file"
                                checked={imageInputMethod === 'file'}
                                onChange={handleImageInputMethodChange}
                            />
                            Încarcă din calculator
                        </label>
                    </div>

                    {imageInputMethod === 'url' ? (
                        <input
                            type="text"
                            name="image"
                            value={
                                formData.image && !formData.image.startsWith('http')
                                    ? `http://localhost:3002/uploads/${formData.image}`
                                    : formData.image || ''
                            }
                            onChange={handleChange}
                            placeholder="URL Imagine"
                            className="modal-input"
                            ref={imageRef}
                        />
                    ) : (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ marginBottom: '12px' }}
                        />
                    )}

                    <label className="modal-label">Link Client</label>
                    <input
                        type="text"
                        name="clientLink"
                        value={formData.clientLink}
                        onChange={handleChange}
                        placeholder="Link Client"
                        className="modal-input"
                        ref={clientLinkRef}
                    />

                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            name="status"
                            checked={formData.status}
                            onChange={handleChange}
                            className="toggle-input"
                        />
                        <span className="toggle-slider"></span>
                        {formData.status ? 'Vizibil' : 'Invizibil'}
                    </label>

                    <div className="modal-button-container">
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={onClose}
                            className="close-button mr-3"
                        >
                            Închide
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? 'Se încarcă...' : 'Trimite'} 
                        </Button>
                    </div>

                </form>
            </Box>
        </Modal>
    );
};

export default PortfolioModal;

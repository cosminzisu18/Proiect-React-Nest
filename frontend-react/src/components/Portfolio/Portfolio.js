import React, { useEffect, useState } from "react";
import { getPortfolios, getPortfolioById, deletePortfolio } from "../../services/portfolioService";
import "./Portfolio.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from "../Modal/ModalComponent";
import PortfolioModal from "./PortfolioModal/PortfolioModal"; 
import toastService from "../../services/toastService";
import { BounceLoader } from 'react-spinners';

const Portfolio = () => {
    const [portfolios, setPortfolios] = useState([]); 
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formModalIsOpen, setFormModalIsOpen] = useState(false);
    const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
    const [formData, setFormData] = useState({ id: null, title: '', description: '', image: '', clientLink: '', status: false });
    const [filter, setFilter] = useState('toate');
    const [selectedPortfolioTitle, setSelectedPortfolioTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    const fetchPortfolios = async () => {
        try {
            const data = await getPortfolios();
            setTimeout(() => {
                // Sortează portofoliile după ID
                const sortedData = data.sort((a, b) => a.id - b.id);
                setPortfolios(sortedData);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error("Error fetching portfolio data:", error);
            setLoading(false); 
        }
    };
    

    const getImageSrc = (image) => {
        if (image && (image.startsWith('http://') || image.startsWith('https://'))) {
            return image;
        }
        return image ? `http://localhost:3002/uploads/${image}` : "https://via.placeholder.com/334";
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolioById = async (id) => {
        try {
            const portfolioData = await getPortfolioById(id);
            setFormData({
                id: portfolioData.id || '',
                title: portfolioData.title || '',
                description: portfolioData.description || '',
                image: portfolioData.image || '',
                clientLink: portfolioData.clientLink || '',
                status: portfolioData.status || false,
            });
            setFormModalIsOpen(true);
        } catch (error) {
            console.error("Error fetching portfolio data:", error);
        }
    };

    const handleEdit = (id) => {
        setSelectedPortfolioId(id);
        fetchPortfolioById(id); 
    };

    const handleDelete = (id, title) => {
        setSelectedPortfolioId(id);
        setSelectedPortfolioTitle(title);
        setModalIsOpen(true);
    };
    
    const confirmDelete = async () => {
        try {
            await deletePortfolio(selectedPortfolioId);
            setPortfolios((prevPortfolios) => prevPortfolios.filter(portfolio => portfolio.id !== selectedPortfolioId));
            toastService.success('Portofoliul a fost șters!');
        } catch (error) {
            toastService.error('Eroare la ștergerea portofoliului!');
        } finally {
            setModalIsOpen(false);
            setSelectedPortfolioId(null);
        }
    };

    const handleFormSubmit = async () => {
        await fetchPortfolios();
        setFormModalIsOpen(false);
    };

    const filteredPortfolios = portfolios.filter(portfolio => {
        if (filter === 'afișate') return portfolio.status === true;
        if (filter === 'ascunse') return portfolio.status === false;
        return true;
    });

    const toggleDescription = (id) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const renderDescription = (description, id) => {
        const isExpanded = expandedDescriptions[id];
        return (
            <>
                <p className={`card-text ${isExpanded ? "expanded" : ""}`}>
                    {isExpanded ? description : `${description.slice(0, 150)}...`}
                </p>
                {description.length > 150 && (
                    <span className="toggle-text" onClick={() => toggleDescription(id)}>
                        {isExpanded ? " Vezi mai puțin" : " Vezi mai mult"}
                    </span>
                )}
            </>
        );
    };
    

    return (
        <div className="portfolio-container">
            {loading ? (
                <div className="loader-container">
                    <BounceLoader loading={loading} size={60} color="#36d7b7" />
                    <p>Se încarcă datele, te rugăm să aștepți...</p> 
                </div>
            ) : (
                <>
                    <div className="filter-button-container">
                        <div className="filter-container">
                            {/* Radio Buttons pentru Desktop */}
                            <div className="radio-filters">
                                <label>
                                <input
                                    type="radio"
                                    value="toate"
                                    checked={filter === 'toate'}
                                    onChange={() => setFilter('toate')}
                                />
                                <span className="custom-radio"></span> Toate
                                </label>
                                <label>
                                <input
                                    type="radio"
                                    value="afișate"
                                    checked={filter === 'afișate'}
                                    onChange={() => setFilter('afișate')}
                                />
                                <span className="custom-radio"></span> Afișate
                                </label>
                                <label>
                                <input
                                    type="radio"
                                    value="ascunse"
                                    checked={filter === 'ascunse'}
                                    onChange={() => setFilter('ascunse')}
                                />
                                <span className="custom-radio"></span> Ascunse
                                </label>
                            </div>

                            {/* Select Box pentru Mobil */}
                            <div className="select-filter">
                                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value="toate">Toate</option>
                                <option value="afișate">Afișate</option>
                                <option value="ascunse">Ascunse</option>
                                </select>
                            </div>
                            </div>
                        <button 
                            className="add-button" 
                            onClick={() => {
                                setFormData({ id: null, title: '', description: '', image: '', clientLink: '', status: false });
                                setSelectedPortfolioId(null); 
                                setFormModalIsOpen(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} className="add-icon" />
                            <span>Adaugă</span>
                        </button>
                    </div>
                    <div className="container-portfolio">
                        {filteredPortfolios.length === 0 ? (
                            <div className="no-data-message">
                                <p>Nu există date disponibile.</p>
                            </div>
                        ) : (
                            <div className="row">
                                {filteredPortfolios.map((portfolio) => (
                                    <div className="col-12 col-md-4 mb-4" key={portfolio.id}>
                                        <div className="card custom-card shadow-sm">
                                            <img
                                                className="card-img-top custom-card-img"
                                                src={getImageSrc(portfolio.image)}
                                                alt={portfolio.title || "No title available"}
                                            />
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title">{portfolio.title ? portfolio.title.toUpperCase() : "UNTITLED"}</h5>
                                                <div className="card-text flex-grow-1">
                                                    {renderDescription(portfolio.description, portfolio.id)}
                                                </div>
                                                <a href={portfolio.clientLink || "#"} className="btn btn-primary">Catre client</a>
                                            </div>
                                            <div className="d-flex justify-content-around align-items-center mb-2">
                                                <span className="portfolio-status">
                                                    {portfolio.status ? 'Vizibil' : 'Invizibil'}
                                                </span>
                                                <div className="icon-container">
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        className="edit-icon"
                                                        onClick={() => handleEdit(portfolio.id)}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className="delete-icon ms-4"
                                                        onClick={() => handleDelete(portfolio.id, portfolio.title)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <ModalComponent 
                        open={modalIsOpen}
                        onClose={() => setModalIsOpen(false)}
                        onConfirm={confirmDelete}
                        title="Confirmare Ștergere"
                        description={`Esti sigur ca vrei sa stergi proiectul ${selectedPortfolioTitle}?`}
                    />

                    <PortfolioModal 
                        isOpen={formModalIsOpen} 
                        onClose={() => setFormModalIsOpen(false)} 
                        formData={formData} 
                        setFormData={setFormData} 
                        onFormSubmit={handleFormSubmit}
                    />
                </>
            )}
        </div>
    );
};

export default Portfolio;

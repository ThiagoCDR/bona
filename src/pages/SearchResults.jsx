import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import CarCard from '../components/CarCard';
import '../components/Fleet.css'; // Reuse fleet styles

const SearchResults = () => {
    const location = useLocation();
    const { searchAvailableCars, filteredFleet, searchParams } = useData();
    const [loading, setLoading] = useState(true);

    const query = new URLSearchParams(location.search);
    const pickupDate = query.get('pickup');
    const returnDate = query.get('return');
    const type = query.get('type');

    useEffect(() => {
        if (pickupDate && returnDate && type) {
            setLoading(true);
            searchAvailableCars(pickupDate, returnDate, type)
                .then(() => setLoading(false));
        }
    }, [pickupDate, returnDate, type]);

    if (loading) {
        return (
            <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
                <h2>Buscando veículos disponíveis...</h2>
            </div>
        );
    }

    const displayedCars = filteredFleet ? filteredFleet.filter(car => {
        if (type === 'app') {
            return car.priceApp && Number(car.priceApp) > 0;
        } else {
            return car.price && Number(car.price) > 0;
        }
    }) : [];

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <div className="section-header">
                <h2>Veículos Disponíveis</h2>
                <p>Para o período de <strong>{pickupDate}</strong> até <strong>{returnDate}</strong> ({type === 'app' ? 'Motorista App' : 'Diária Normal'})</p>
            </div>

            {displayedCars.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <h3>Nenhum veículo disponível para este período.</h3>
                    <p>Tente datas diferentes ou verifique se o tipo de aluguel possui veículos compatíveis.</p>
                </div>
            ) : (
                <div className="fleet-grid">
                    {displayedCars.map(car => (
                        <CarCard key={car.id} car={car} showPrice={true} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;

import React, { useState } from 'react';
import { Button, Spin } from 'antd';
import { checkPrice } from '../../utils/priceChecker';
import './styles.css';

interface PriceCheckProps {
    price: number;
    name: string;
    description: string;
}

const PriceCheck: React.FC<PriceCheckProps> = ({
    price,
    name,
    description
}) => {
    const [loading, setLoading] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheck = async () => {
        setLoading(true);
        setShowAnswer(false);
        setDisplayText('');
        setError(null);
        
        try {
            const result = await checkPrice(price, name, description);
            
            if (result.error) {
                setError(result.error);
                setDisplayText("Sorry, I couldn't analyze the price at this moment.");
            } else if (result.answer) {
                setShowAnswer(true);
                let index = 0;
                const text = result.answer;
                const interval = setInterval(() => {
                    if (index < text.length) {
                        setDisplayText(prev => prev + text[index]);
                        index++;
                    } else {
                        clearInterval(interval);
                    }
                }, 50);
            } else {
                setError("No response received");
                setDisplayText("Sorry, I couldn't analyze the price at this moment.");
            }
        } catch (error) {
            console.error('Error checking price:', error);
            setError("Failed to check price");
            setDisplayText("Sorry, I couldn't analyze the price at this moment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="price-check-container">
            <Button
                type="default"
                onClick={handleCheck}
                loading={loading}
                className="price-check-button"
                disabled={loading}
            >
                <div className="ai-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                        <path d="M12 5.4L14.27 10.02L19.05 10.72L15.53 14.14L16.38 18.89L12 16.66L7.62 18.89L8.47 14.14L4.95 10.72L9.73 10.02L12 5.4Z" fill="currentColor" opacity="0.3" />
                        <path className="sparkle-1" d="M10 1L11 3L10 5L9 3L10 1Z" fill="currentColor" />
                        <path className="sparkle-2" d="M18 4L19 6L18 8L17 6L18 4Z" fill="currentColor" />
                        <path className="sparkle-3" d="M4 6L5 8L4 10L3 8L4 6Z" fill="currentColor" />
                    </svg>
                </div>
                <span>Is it ok for me?</span>
            </Button>
            
            {(showAnswer || error) && (
                <div className={`price-check-response ${error ? 'error' : ''}`}>
                    {loading ? (
                        <Spin />
                    ) : (
                        <div className="typing-text">{displayText}</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PriceCheck;

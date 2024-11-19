import Stripe from 'stripe';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// construct path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// Load env variables
dotenv.config({ path: path.join(PATH, '..', '.env') });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentControllers = {
    makePayment: async (req, res) => {
        const { amount } = req.body;
        try {
            const payment = await stripe.paymentIntent.create({
                amount: amount * 100,
                currency: 'eur'
            });
            res.status(200).json({ client_secret: payment.client_secret });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default paymentControllers;

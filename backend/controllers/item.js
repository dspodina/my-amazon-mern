import Item from '../models/item.js';

const itemControllers = {
    getItemsByUser: async (req, res) => {
        const { id } = req.params;
        try {
            const userItems = await Item.find({ user_id: id });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    createItem: async (req, res) => {
        const {
            title,
            description,
            category,
            price,
            quantity,
            user_id,
            image
        } = req.body;
        try {
            if (
                (title, description, category, price, quantity, user_id, image)
            ) {
                const newItem = new Item({
                    title,
                    description,
                    category,
                    price,

                    quantity,
                    user_id,
                    image
                });
                await newItem.save();
                res.status(201).json({
                    message: 'A new item has been created!'
                });
            } else {
                res.status(400).json({ message: 'All fields are required' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    },
    updateItem: async (req, res) => {
        const { id } = req.params;
        const { title, description, category, price, quantity, image } =
            req.body;
        try {
            const updatedItem = await Item.updateOne(
                { _id: id },
                { title, description, category, price, quantity, image }
            );
            if (updatedItem.modifiedCount > 0) {
                res.status(200).json({
                    message: 'The item updated successfully!'
                });
            } else {
                res.status(400).json({ message: 'All fields are required' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    },
    deleteItem: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedItem = await Item.deleteOne({ _id: id });
            if (deletedItem.deleteCount > 0) {
                res.status(200).json({ message: 'Item deleted successfully' });
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

export default itemControllers;

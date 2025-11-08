import { createContext, useContext, useState } from 'react';

const CartContex = createContext({
	cartItems: [],
	addTocart: () => {},
	removeFromCart: () => {},
	updateQuantity: () => {},
	getTotalItems: () => {},
	getTotalPrice: () => {},
});

export const useCartContext = () => {
	const context = useContext(CartContex);

	if (!context) {
		throw new Error('Nincs ilyen context');
	}

	return context;
};

function CartProvider({ children }) {
	const [cartItems, setCartItems] = useState([]);

	function addTocart(pizzaData) {
		const exsitingItem = cartItems.find(
			(item) => item.pizza_id === pizzaData.pizza_id && item.size === pizzaData.size
		);

		if (exsitingItem) {
			return { exsitingItem: true, massage: 'Ez a pizza ezzel a mérettel már a kosárban van' };
		}

		setCartItems([...cartItems, pizzaData]);
	}

	function removeFromCart(pizza_id, pizza_size) {
		const newCartItems = cartItems.filter(
			(cartItem) => !(cartItem.pizza_id === pizza_id && cartItem.size === pizza_size)
		);
		setCartItems(newCartItems);
	}

	function updateQuantity(pizza_id, pizza_size, newQuantitiy) {
		//Ha 0 akkor eltávolítjuk
		if (newQuantitiy == 0) {
			removeFromCart(pizza_id, pizza_size);
			return;
		}

		//Mennyiség módosítása
		const updatedCartItems = cartItems.map((item) => {
			if (item.pizza_id === pizza_id && item.size === pizza_size) {
				return { ...item, quantity: newQuantitiy };
			}
			return item;
		});

		setCartItems(updatedCartItems);
	}

	function getTotalItems() {
		const total = cartItems.reduce((sum, item) => {
			return sum + item.quantity;
		}, 0);

		return total;
	}

	function getTotalPrice() {
		const total = cartItems.reduce((sum, item) => {
			return sum + item.price * item.quantity;
		}, 0);

		return total;
	}

	return (
		<CartContex.Provider
			value={{ cartItems, addTocart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice }}
		>
			{children}
		</CartContex.Provider>
	);
}
export default CartProvider;

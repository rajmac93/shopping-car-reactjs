import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import data from './data/data';
import { useState } from 'react';

function App() {
	const { products } = data;
	const [cartItems, setCartItems] = useState([]);
	const onAdd = product => {
		const exist = cartItems.find(x => x.id === product.id);
		if (exist) {
			setCartItems(
				cartItems.map(cartItem =>
					cartItem.id === product.id
						? { ...exist, qty: exist.qty + 1 }
						: cartItem
				)
			);
		} else {
			setCartItems([...cartItems, { ...product, qty: 1 }]);
		}
	};
	const onRemove = product => {
		const exist = cartItems.find(
			cartItem => cartItem.id === product.id
		);
		if (exist.qty === 1) {
			setCartItems(
				cartItems.filter(
					cartItem => cartItem.id !== product.id
				)
			);
		} else {
			setCartItems(
				cartItems.map(cartItem =>
					cartItem.id === product.id
						? { ...exist, qty: exist.qty - 1 }
						: cartItem
				)
			);
		}
	};
	return (
		<div className='App'>
			<Header countCartItems={cartItems.length} />
			<div className='row'>
				<Main onAdd={onAdd} products={products} />
				<Basket
					onAdd={onAdd}
					onRemove={onRemove}
					cartItems={cartItems}
				/>
			</div>
		</div>
	);
}

export default App;

import React, { useState, useEffect } from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { Button, SelectControl, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Edit = ({ attributes, setAttributes }) => {
	const [menuItems, setMenuItems] = useState([]);
	const [newItemData, setNewItemData] = useState({
		category: 'starter',
		title: '',
		recipe: '',
		price: ''
	});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetchMenuItems();
	}, []);

	const fetchMenuItems = () => {
		fetch(`${wpApiSettings?.root}/wp-json/refact/v1/menu-items`)
			.then(response => {
				if (!response.ok) {
					throw new Error(__('Failed to fetch menu items.', 'text-domain'));
				}
				return response.json();
			})
			.then(data => {
				setMenuItems(data);
				setAttributes({ menuItems: data });
			})
			.catch(error => {
				console.error(error);
			});
	};

	const handleInputChange = (key, value) => {
		setNewItemData({
			...newItemData,
			[key]: value
		});
	};

	const handleAddMenuItem = () => {
		if (newItemData.title && newItemData.recipe && newItemData.price) {
			const newMenuItem = {
				category: newItemData.category,
				title: newItemData.title,
				recipe: newItemData.recipe,
				price: newItemData.price
			};
			setMenuItems([newMenuItem, ...menuItems]);
			setAttributes({ menuItems: [newMenuItem, ...menuItems] });
			setNewItemData({
				category: 'starter',
				title: '',
				recipe: '',
				price: ''
			});
			saveMenuItem(newMenuItem);
		} else {
			alert(__('Please fill out all fields.', 'text-domain'));
		}
	};

	const handleRemoveMenuItem = (index) => {
		const updatedMenuItems = [...menuItems];
		updatedMenuItems.splice(index, 1);
		setMenuItems(updatedMenuItems);
		setAttributes({ menuItems: updatedMenuItems });
		const itemId = menuItems[index]?.id;
		deleteMenuItem(itemId);
	};

	const saveMenuItem = (item) => {
		fetch(`${wpApiSettings?.root}/wp-json/refact/v1/menu-items`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(item)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(__('Failed to save menu items.', 'text-domain'));
				}
				return response.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.error(error);
			});
	};

	const deleteMenuItem = (itemId) => {
		fetch(`${wpApiSettings?.root}/refact/v1/delete-menu-item/${itemId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Failed to delete menu item.');
				}
				return response.json();
			})
			.then(data => {
				console.log('Menu item deleted successfully.');
			})
			.catch(error => {
				console.error('An error occurred while deleting the menu item.');
			});
	};

	return (
		<section {...useBlockProps()}>
			<div className="wp-block-my-restaurant-menu">
				<div className="wp-block-my-restaurant-menu__form">
					<h4 className="wp-block-my-restaurant-menu__form-title">{__('Add New Menu Item', 'text-domain')}</h4>
					<SelectControl
						label={__('Category', 'text-domain')}
						value={newItemData.category}
						options={[
							{ label: __('Starter', 'text-domain'), value: 'starter' },
							{ label: __('Main Dishes', 'text-domain'), value: 'main_dishes' },
							{ label: __('Desserts', 'text-domain'), value: 'desserts' },
						]}
						onChange={(value) => handleInputChange('category', value)}
					/>
					<TextControl
						value={newItemData.title}
						label={__('Title', 'text-domain')}
						onChange={(value) => handleInputChange('title', value)}
					/>
					<TextareaControl
						value={newItemData.recipe}
						label={__('Recipe', 'text-domain')}
						onChange={(value) => handleInputChange('recipe', value)}
					/>
					<TextControl
						value={newItemData.price}
						label={__('Price', 'text-domain')}
						type="number"
						onChange={(value) => handleInputChange('price', value)}
					/>
					<Button isPrimary onClick={handleAddMenuItem}>{__('Add Item', 'text-domain')}</Button>
				</div>
				<div className="wp-block-my-restaurant-menu__menu">
					{menuItems.map((item, index) => (
						<div key={index} className="wp-block-my-restaurant-menu__item">
							<div>
								<h4 className="wp-block-my-restaurant-menu__item-title">{item.title}
									 <span className="wp-block-my-restaurant-menu__item-category"> ({item.category})</span>
								</h4>
								<p className="wp-block-my-restaurant-menu__item-recipe">{item.recipe}</p>
							</div>
							<div className="wp-block-my-restaurant-menu__action">
								<span className="wp-block-my-restaurant-menu__item-price">${item.price}</span>
								<Button isDestructive onClick={() => handleRemoveMenuItem(index)}>{__('Remove', 'text-domain')}</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Edit;

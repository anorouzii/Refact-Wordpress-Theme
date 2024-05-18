export default function save(props) {
	const menuItems = props.attributes?.menuItems;

	const menuByCategory = {};
	menuItems.forEach(item => {
		if (!menuByCategory[item.category]) {
			menuByCategory[item.category] = [];
		}
		menuByCategory[item.category].push(item);
	});

	return (
		<section id="menu" className="menu">
			<div className="section-container menu__container">
				<div className="menu__head">
					<h4 className="section-title menu__title">Our Menu</h4>
					<ul className="menu__tabs">
						<li className="menu__tab active" data-tab="starter">Starter</li>
						<li className="menu__tab" data-tab="main_dishes">Main Dishes</li>
						<li className="menu__tab" data-tab="desserts">Desserts</li>
					</ul>
				</div>
				{Object?.keys(menuByCategory)?.reverse()?.map((category, index) => (
					<div key={index} id={category} className={`menu__content ${category == 'starter' ? 'active' : ''}`}>
						<div className="menu__list">
							{menuByCategory[category].map((item, idx) => (
								<div key={idx} className="menu__item">
									<div className="menu__item-details">
										<h5 className="menu__item-title">{item.title}</h5>
										<p className="menu__item-recipe">{item.recipe}</p>
									</div>
									<span className="menu__item-price">${item.price}</span>
								</div>
							))}
						</div>
					</div>
				))}
				{menuItems?.length === 0 && <p>No menu items available.</p>}
			</div>
		</section>
	);
}
